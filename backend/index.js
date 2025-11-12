// const express = require('express')

import express from 'express'
import router from './routers/router.js'
import User from './models/user.model.js';
import Customer from './models/customer.model.js'
import { Room, Status, RoomType } from './models/room.model.js';
import Booking from './models/booking.model.js';
import Payment from './models/payment.model.js';
import cors from "cors";

const app = express()
const port = 3000

app.use(express.json()) 
app.use(cors());
app.use(router);

await User.createTable();
await Customer.createTable();
await Room.createTable();
await Status.createTable();
await RoomType.createTable();
await Status.fristCreate();
await RoomType.fristCreate();
await Room.fristCreate();
await Booking.createTable();
await Payment.createTable();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
