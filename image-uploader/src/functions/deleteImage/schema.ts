export default {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                key: { type: 'string' }
            },
            required: ['key']
        }
    }
} as const;
