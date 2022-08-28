export default {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                key: { type: 'string' },
                image: { type: 'string' },
            },
            required: ['key', 'image']
        }
    }
} as const;
