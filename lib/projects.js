import { createClient } from './supabase/server';

export function parseTechnologies(value) {
  return String(value || '')
    .split(',')
    .map((technology) => technology.trim())
    .filter(Boolean);
}

export function projectImageSource(project) {
  return project?.image_url || null;
}

export async function getProjects({ highlightedOnly = false, limit, includeUnpublished = false } = {}) {
  const supabase = await createClient();
  let query = supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (!includeUnpublished) {
    query = query.eq('published', true);
  }

  if (highlightedOnly) {
    query = query.eq('highlighted', true);
  }

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Could not load projects: ${error.message}`);
  }

  return data || [];
}

export async function getProjectBySlug(slug) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('projects')
    .select(`
      *,
      gallery:project_gallery_items(
        id,
        project_id,
        image_url,
        image_path,
        label,
        display_order,
        created_at
      )
    `)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    throw new Error(`Could not load project: ${error.message}`);
  }

  if (data?.gallery) {
    data.gallery.sort((a, b) => a.display_order - b.display_order);
  }

  return data;
}