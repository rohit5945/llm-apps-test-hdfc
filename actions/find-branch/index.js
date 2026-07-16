// synthetic fixture — no sample data available from Action Planner
// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'HDFC Bank — Andheri West',
        address: 'Shop 4, Link Road, Andheri West, Mumbai 400058',
        phone: '+91 22 6160 6161',
        hours: 'Mon–Sat 9:30 AM–4:30 PM',
    },
    {
        name: 'HDFC Bank — Bandra Kurla Complex',
        address: 'Ground Floor, G Block, BKC, Mumbai 400051',
        phone: '+91 22 3395 8000',
        hours: 'Mon–Fri 9:30 AM–5:00 PM',
    },
    {
        name: 'HDFC Bank — Connaught Place',
        address: 'A-12, Inner Circle, Connaught Place, New Delhi 110001',
        phone: '+91 11 4000 4949',
        hours: 'Mon–Sat 10:00 AM–4:00 PM',
    },
];

module.exports = async ({ location = '' }) => {
    if (!location || typeof location !== 'string' || !location.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide a location (city, area name, or PIN code) to search branches near.' }],
            // structuredContent.branches — derived from action name "find_branch" (bare array outputSchema rule)
            structuredContent: { branches: [] },
        };
    }

    const query = location.trim().toLowerCase();
    let branches = MOCK_DATA.filter((branch) => (
        (branch.address && branch.address.toLowerCase().includes(query))
        || (branch.name && branch.name.toLowerCase().includes(query))
    ));

    // No direct match — fall back to returning all branches so the widget still shows nearby options.
    if (branches.length === 0) {
        branches = MOCK_DATA;
    }

    const summary = `Found ${branches.length} HDFC Bank branch${branches.length === 1 ? '' : 'es'} near "${location.trim()}".`;

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.branches — derived from action name "find_branch" (bare array outputSchema rule)
        structuredContent: { branches },
    };
};

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/branches?location=${location}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/branches?location=${encodeURIComponent(location)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
