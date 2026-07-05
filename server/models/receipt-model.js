import pool from '../db-connect.js'

const Receipt = {
    // Get all receipts
    async getAll (sort = 'created_date', page = 1, limit = 10) {
        const offset = (page - 1) * limit

        const query = 'SELECT * FROM receipts ORDER BY $1 DESC LIMIT $2 OFFSET $3'
        const result = await pool.query(query, [sort, limit, offset])
        return result.rows
    },

    // Get total count of receipts
    async getCount () {
        const query = 'SELECT COUNT(*) FROM receipts'
        const result = await pool.query(query)
        return parseInt(result.rows[0].count)
    },

    // Insert receipt
    async addReceipt (receipt) {
        const { createdDate, guestName, receiptData } = receipt

        const client = await pool.connect()

        try {
            await client.query('BEGIN')
            
            const receiptQuery = `
                INSERT INTO receipts (created_date, guest_name)
                VALUES ($1, $2)
                RETURNING id
            `
            const receiptResult = await client.query(receiptQuery, [createdDate, guestName])
            const receiptId = receiptResult.rows[0].id
            
            await handleReceiptItems(client, receiptId, receiptData)
            await client.query('COMMIT')

            return { id: receiptId }
        } catch (error) {
            await client.query('ROLLBACK')
            throw error
        } finally {
            client.release()
        }
    }
}

async function handleReceiptItems (client, receiptId, receiptData) {
    for (const item of receiptData) {
        const itemQuery = `
            INSERT INTO receipt_items (
                receipt_id, room_number, room_type, check_in, 
                check_out, price_per_night, stay_duration, extra_beds
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `
        await client.query(itemQuery, [
            receiptId,
            item.roomNumber,
            item.roomType,
            item.checkIn,
            item.checkOut,
            item.pricePerNight,
            item.stayDuration,
            item.extraBeds
        ])
    }
}

export default Receipt
