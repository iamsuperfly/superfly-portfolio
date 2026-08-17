insert into public.projects (
  title,
  slug,
  label,
  description,
  technologies,
  image_url,
  project_url,
  github_url,
  highlighted,
  display_order,
  published
)
values (
  'RepSolana',
  'repsolana',
  'On-Chain Reputation Passport',
  'Turns a Solana wallet''s real on-chain activity into a dynamic reputation score and soulbound compressed NFT passport.',
  array['Vite', 'React', 'TypeScript', 'Solana Web3.js', 'Metaplex', 'Vercel'],
  '/images/projects/eaf66f14-4035-4788-bdb1-06803cdcfe89.png',
  'https://rep-solana.vercel.app/',
  'https://github.com/iamsuperfly/rep-solana',
  true,
  0,
  true
)
on conflict (slug) do nothing;

-- After creating the private admin user in Supabase Auth, add its UUID here:
-- insert into public.admin_users (user_id, display_name)
-- values ('YOUR_AUTH_USER_UUID', 'Superfly');