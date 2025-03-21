import createError from 'http-errors';

const notFoundError = createError(404, 'Resource not found');

export {
    notFoundError
}