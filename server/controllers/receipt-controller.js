import Receipt from '../models/receipt-model.js'

const receiptController = {
    // GET all receipts
    async getAll (req, res, next) {
        const { sort, page, limit, guestName, createdDate } = req.query

        const pageNum = parseInt(page) || 1
        const limitNum = parseInt(limit) || 10

        try {
            const receipts = await Receipt.getAll(sort, pageNum, limitNum, guestName, createdDate)
            const totalRecords = await Receipt.getCount(guestName, createdDate)
            const pagination = {
                page: pageNum,
                limit: limitNum,
                totalRecords: totalRecords
            }

            res.status(200).json({
                code: 200,
                success: true,
                message: 'OK',
                data: receipts,
                pagination
            })
        } catch (error) {
            next(error)
        }
    },

    async addReceipt (req, res, next) {
        const { createdDate, guestName, receiptData } = req.body

        try {
            const receipt = await Receipt.addReceipt({
                createdDate,
                guestName,
                receiptData
            })
            res.status(200).json({
                code: 200,
                success: true,
                message: 'OK'
            })
        } catch (error) {
            next(error)
        }
    }
}

export default receiptController
