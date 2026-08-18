create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  label text,
  description text not null,
  extended_description text,
  technologies text[] not null default '{}',
  image_url text,
  image_path text,
  project_url text,
  github_url text,
  highlighted boolean not null default false,
  display_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.projects
add column if not exists extended_description text;

create table if not exists public.project_gallery_items (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  image_url text not null,
  image_path text not null,
  label text not null,
  display_order smallint not null default 0 check (display_order between 0 and 2),
  created_at timestamptz not null default timezone('utc', now()),
  unique (project_id, display_order)
);

alter table public.project_gallery_items enable row level security;

drop policy if exists "Public can read gallery images" on public.project_gallery_items;
create policy "Public can read gallery images"
on public.project_gallery_items for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects
    where projects.id = project_gallery_items.project_id
      and projects.published = true
  )
);

drop policy if exists "Admins can read all gallery images" on public.project_gallery_items;
create policy "Admins can read all gallery images"
on public.project_gallery_items for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create gallery images" on public.project_gallery_items;
create policy "Admins can create gallery images"
on public.project_gallery_items for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update gallery images" on public.project_gallery_items;
create policy "Admins can update gallery images"
on public.project_gallery_items for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete gallery images" on public.project_gallery_items;
create policy "Admins can delete gallery images"
on public.project_gallery_items for delete
to authenticated
using (public.is_admin());

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists projects_set_updated_at on public.projects;
create trigger projects_set_updated_at
before update on public.projects
for each row execute procedure public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.admin_users enable row level security;
alter table public.projects enable row level security;

drop policy if exists "Admins can read own membership" on public.admin_users;
create policy "Admins can read own membership"
on public.admin_users for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Public can read published projects" on public.projects;
create policy "Public can read published projects"
on public.projects for select
to anon, authenticated
using (published = true);

drop policy if exists "Admins can read all projects" on public.projects;
create policy "Admins can read all projects"
on public.projects for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins can create projects" on public.projects;
create policy "Admins can create projects"
on public.projects for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update projects" on public.projects;
create policy "Admins can update projects"
on public.projects for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete projects" on public.projects;
create policy "Admins can delete projects"
on public.projects for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read project images" on storage.objects;
create policy "Public can read project images"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'project-images');

drop policy if exists "Admins can upload project images" on storage.objects;
create policy "Admins can upload project images"
on storage.objects for insert
to authenticated
with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins can update project images" on storage.objects;
create policy "Admins can update project images"
on storage.objects for update
to authenticated
using (bucket_id = 'project-images' and public.is_admin())
with check (bucket_id = 'project-images' and public.is_admin());

drop policy if exists "Admins can delete project images" on storage.objects;
create policy "Admins can delete project images"
on storage.objects for delete
to authenticated
using (bucket_id = 'project-images' and public.is_admin());