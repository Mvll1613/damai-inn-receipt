export const validateReceipt = (req, res, next) => {
    const { createdDate, guestName, receiptData } = req.body

    const errors = []

    if (!createdDate || createdDate.trim() === '') {
        errors.push('Tanggal pembuatan belum diisi.')
    }

    if (!guestName || guestName.trim() === '') {
        errors.push('Nama tamu belum diisi.')
    }

    if (!validateReceiptData(receiptData)) {
        errors.push('Data kwitansi tidak lengkap, mohon periksa kembali.')
    }

    if (errors.length > 0) {
        const error = new Error()
        error.errorMessage = errors
        error.statusCode = 400
        return next(error)
    }

    next()
}

const validateReceiptData = data => {
    if (!Array.isArray(data) || data.length === 0) { return false }

    return data.every(item => {
        return Object.values(item).every(value => value !== null && value !== undefined && value !== '')
    })
}
