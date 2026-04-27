import { Router } from 'express'

import receiptController from '../controllers/receipt-controller.js'
import { validateReceipt } from '../middlewares/validation.js'

const router = Router()

router.get('/list', receiptController.getAll)

router.post('/add', validateReceipt, receiptController.addReceipt)

export default router
