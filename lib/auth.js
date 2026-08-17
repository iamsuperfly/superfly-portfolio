import { redirect } from 'next/navigation';
import { createClient } from './supabase/server';

export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const { data: admin, error } = await supabase
    .from('admin_users')
    .select('user_id, display_name')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error || !admin) {
    redirect('/admin/login?error=not-authorized');
  }

  return { supabase, user, admin };
}