/// <reference types="vite/client" />

import { describe, expect, it } from 'vitest';

const fixtures = import.meta.glob('./fixtures/*.ts', { eager: true, as: 'raw' });

function transform(code: string) {
    return code.toLowerCase();
}

Object.entries(fixtures).forEach(([path, code]) => {
    it(path, () => {
        const result = transform(code);
        expect(result).toMatchSnapshot()
    })
})
