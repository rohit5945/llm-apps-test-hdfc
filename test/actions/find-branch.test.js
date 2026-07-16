const handler = require('../../actions/find-branch/index.js');

describe('find_branch handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ location: 'Mumbai' });
        expect(Array.isArray(out.content)).toBe(true);
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) });
    });

    test('"Find an HDFC Bank branch near me" returns branch locations', async () => {
        const out = await handler({ location: 'Mumbai' });
        expect(out.content[0].text.length).toBeGreaterThan(0);
        expect(out.structuredContent.branches.length).toBeGreaterThan(0);
    });

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({ location: 'Mumbai' });
        expect(typeof out.structuredContent).toBe('object');
        expect(Array.isArray(out.structuredContent)).toBe(false);
    });

    test('returns error message when required arg is missing', async () => {
        const out = await handler({});
        expect(out.content[0].text).toMatch(/location|provide/i);
        expect(out.structuredContent.branches).toEqual([]);
    });

    test('filters branches by location query', async () => {
        const out = await handler({ location: 'BKC' });
        expect(out.structuredContent.branches.length).toBeGreaterThan(0);
        expect(out.structuredContent.branches.some((b) => b.address.includes('BKC'))).toBe(true);
    });

    test('unmatched location falls back to all branches', async () => {
        const out = await handler({ location: 'Nowhereville 999999' });
        expect(out.structuredContent.branches.length).toBeGreaterThan(0);
    });
});
