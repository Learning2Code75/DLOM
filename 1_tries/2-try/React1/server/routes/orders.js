import express from 'express'

import {getOrders,createOrder} from '../controllers/orders.js'


const router = express.Router();

// localhost:5000/orders/
router.get('/',getOrders)

// localhost:5000/orders/
router.post('/',createOrder)


export default router;
