export const errorHandler = (err, req, res, next) => {
    console.error(err.stack)

    const statusCode = err.statusCode || 500
    const message = statusCode === 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST'
    const errorMessage = err.errorMessage || null

    res.status(statusCode).json({
        code: statusCode,
        success: false,
        message,
        errorMessage
    })
}
