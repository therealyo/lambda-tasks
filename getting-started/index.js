const cache = [0, 1];

const fibonacci = (number) => {
    if (number === 0) {
        return cache;
    } else {
        cache.push(cache.at(-1) + cache.at(-2));
        return fibonacci(number - 1);
    }
};

exports.handler = async (event) => {
    const response = {
        statusCode: 200
    };

    try {
        if (event.queryStringParameters.name) {
            response.body = JSON.stringify(
                `Hello ${event.queryStringParameters.name}`
            );
        } else {
            throw 'no name provided';
        }
    } catch (err) {
        response.body = JSON.stringify(fibonacci(10));
    }
    return response;
};
