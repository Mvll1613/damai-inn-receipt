import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import receiptRoute from './routes/receipt-route.js'
import { errorHandler } from './middlewares/error-handler.js'

const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, '../client/dist')))
app.use(express.json())

app.use('/api/receipts', receiptRoute)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
