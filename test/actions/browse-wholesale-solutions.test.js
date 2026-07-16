const handler = require('../../actions/browse-wholesale-solutions/index.js')

describe('browse_wholesale_solutions handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Show me HDFC Bank\'s wholesale banking solutions" returns all segments', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.solutions.length).toBe(4)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.solutions)).toBe(true)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Wholesale Banking' })
        const solutions = out.structuredContent.solutions
        expect(solutions.length).toBe(4)
        expect(solutions.every((s) => s.category === 'Wholesale Banking')).toBe(true)
    })

    test('unknown category returns zero results', async () => {
        const out = await handler({ category: 'Retail Banking' })
        expect(out.structuredContent.solutions.length).toBe(0)
        expect(out.content[0].text).toMatch(/0 wholesale banking/i)
    })
})
