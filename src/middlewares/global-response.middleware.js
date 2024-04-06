

// Global response middleware
export const handlingGlobalError = (err, req, res, next) => {
    if (err) {
         res.status(err['cause'] || 500).json({
            message: 'Catch error',
            error_msg: err.message,
        })
        next()
    }
}
