// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Corporates',
        description: 'Banking solutions designed to meet all corporate needs, including large corporate banking, CBX internet banking, agricultural lending, and commercial credit cards.',
        image_url: 'https://s7ap1.scene7.com/is/image/hdfcbankPWS/wholesale-banking-corporates-card?fmt=webp-alpha',
        category: 'Wholesale Banking'
    },
    {
        name: 'Government & Institutional Business',
        description: 'One-stop banking solution for governmental and institutional needs across the public sector.',
        image_url: 'https://s7ap1.scene7.com/is/image/hdfcbankPWS/wholesale-banking-govt-and-financial-institutions-card?fmt=webp-alpha',
        category: 'Wholesale Banking'
    },
    {
        name: 'Financial Institutions',
        description: 'A wide range of banking solutions to streamline organisational performance for financial institutions.',
        image_url: 'https://s7ap1.scene7.com/is/image/hdfcbankPWS/wholsale-banner-new?fmt=webp-alpha',
        category: 'Wholesale Banking'
    },
    {
        name: 'Investment Banking',
        description: 'A smarter way for businesses to raise capital, with expert advisory and capital-market solutions.',
        image_url: 'https://s7ap1.scene7.com/is/image/hdfcbankPWS/wholesale-banking-investment-banking-card?fmt=webp-alpha',
        category: 'Wholesale Banking'
    }
]

module.exports = async ({ category = '' } = {}) => {
    const filter = typeof category === 'string' ? category.trim() : ''

    const results = MOCK_DATA.filter((item) => {
        if (filter && item.category.toLowerCase() !== filter.toLowerCase()) return false
        return true
    })

    const summary = filter
        ? `Found ${results.length} wholesale banking solution${results.length === 1 ? '' : 's'} in "${filter}".`
        : `Found ${results.length} wholesale banking solution${results.length === 1 ? '' : 's'}.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.solutions — bare array outputSchema; key derived from actionName "browse_wholesale_solutions"
        structuredContent: { solutions: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/wholesale-solutions?category=${category}
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
 *     `${process.env.API_BASE_URL}/wholesale-solutions?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
