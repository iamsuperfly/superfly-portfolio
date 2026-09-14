export const CASE_NOTES = {
  'emma-gentle': {
    label: 'Electrical catalogue',
    summary:
      'Public stock list for Emmanuel Enterprise: categories, search, product photos, and WhatsApp price checks. Staff update listings from a private admin desk.',
    detail:
      'Emma Gentle is the live catalogue for an electrical and hardware counter in Uli, Anambra. Visitors browse products and categories, search the list, and message the shop on WhatsApp to confirm price and stock. There is no checkout. A protected admin area handles products, categories, photos, hours, and the business WhatsApp number. Live site: emmagentle.vercel.app.',
  },
  repsolana: {
    label: 'On-chain reputation',
    summary:
      'Reads a Solana wallet\u2019s real activity and turns it into a reputation score plus a soulbound compressed NFT passport.',
    detail:
      'RepSolana looks at on-chain history instead of a profile form. It scores wallet activity and mints a compressed soulbound passport so reputation can travel with the wallet. Built with Vite, React, TypeScript, Solana web3.js, and Metaplex.',
  },
};

export function caseNote(slug) {
  return CASE_NOTES[slug] || null;
}
