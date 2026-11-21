/** Core CropLink scheme-processing functions. Pure functions; no database/UI dependency. */
export function normalizeText(value = '') { return String(value).trim().toLowerCase().replace(/\s+/g, ' '); }

export function searchSchemes(schemes, query) {
  const q = normalizeText(query); if (!q) return [...schemes];
  return schemes.filter(s => [s.title, s.shortName, s.category, s.department, s.description, ...(s.eligibility || [])].some(v => normalizeText(v).includes(q)));
}

export function filterSchemesByCategory(schemes, category) {
  if (!category || category === 'All') return [...schemes];
  return schemes.filter(s => s.category === category);
}

export function rankSchemesForInterest(schemes, interest) {
  const idByInterest = { income: 'pm-kisan', solar: 'pm-kusum', drip: 'micro-irrigation', insurance: 'pmfby' };
  const target = idByInterest[interest];
  if (!target) return [...schemes];
  return [...schemes].sort((a, b) => Number(b.schemeId === target || b.id === target) - Number(a.schemeId === target || a.id === target));
}

export function validateFarmerInquiry(input) {
  const errors = {};
  if (!String(input?.name ?? '').trim()) errors.name = 'Name is required';
  const email = String(input?.email ?? '').trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'A valid email is required';
  const phone = String(input?.phone ?? '').replace(/[\s()-]/g, '');
  if (!/^\+?[0-9]{10,13}$/.test(phone)) errors.phone = 'Phone must contain 10–13 digits';
  if (!String(input?.topic ?? '').trim()) errors.topic = 'Topic is required';
  if (!String(input?.message ?? '').trim()) errors.message = 'Message is required';
  return { valid: Object.keys(errors).length === 0, errors };
}

export function calculateEligibilityMatches(schemes, { interest = 'all' } = {}) {
  // This is a recommendation/matching demo, not an official eligibility decision.
  const matchIds = { income: ['pm-kisan'], solar: ['pm-kusum'], drip: ['micro-irrigation'], insurance: ['pmfby'] };
  const selected = matchIds[interest];
  return schemes.filter(s => !selected || selected.includes(s.schemeId || s.id));
}
