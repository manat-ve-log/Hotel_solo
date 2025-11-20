import express from "express";
import customerController from "../controller/customer.controller.js";
import roomController from "../controller/room.controller.js";
import bookingController from "../controller/booking.controller.js";
import paymentController from "../controller/payment.controller.js";
import userController from "../controller/user.controller.js";
const router = express.Router()

// ----------------------------------- Login ------------------------------
router.post('/login',userController.login);
router.post('/register',userController.register);


// ----------------------------------- Customer ---------------------------
router.get('/customer', customerController.getAllCustomer);
router.get('/customer/:id', customerController.getCustomerById);
router.post('/customer/create', customerController.createCustomer);
router.delete('/customer/:id', customerController.deleteCustomerById);

// ----------------------------------- Room -------------------------------
router.get('/room',roomController.getAll);
router.get('/room/:id',roomController.getRoomById);
router.post('/room/create',roomController.createRoom);
router.put('/room/update',roomController.updateRoom);
router.delete('/room/:id',roomController.deleteRoomById);

router.get('/room/status',roomController.getStatus);
router.get('/room/type',roomController.getRoomType);

// ----------------------------------- booking ----------------------------
router.get('/booking', bookingController.getAllBookings);
router.get('/booking/:id',bookingController.getBookingById);
router.post('/booking/create',bookingController.createBooking);
router.put('/booking/update',bookingController.updateBooking);
router.delete('/booking/:id',bookingController.deleteBookingById);

// ----------------------------------- payment ----------------------------
router.get('/payment', paymentController.getAllPayments);
router.get('/payment/:id',paymentController.getPaymentById);
router.post('/payment/create',paymentController.createPayment);
router.put('/payment/update',paymentController.updatePayment);
router.delete('/payment/:id',paymentController.deletePaymentById);




export default router;