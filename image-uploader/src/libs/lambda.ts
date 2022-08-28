import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import middyJsonBodyParser from '@middy/http-json-body-parser';

export const middyfy = (handler, schema) => {
    return middy(handler)
        .use(middyJsonBodyParser())
        .use(validator({ inputSchema: schema }))
        .use(httpErrorHandler());
};
