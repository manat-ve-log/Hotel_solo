import Booking from "../models/booking.model.js";
import Customer from "../models/customer.model.js";
import { Room } from "../models/room.model.js";

const bookingController = {
    getAllBookings: async (req, res) => {
        try{
            const booking = await Booking.getAllBooking();
            res.status(200).json(booking)
        }
        catch (error) {
            console.error(error);
            res.status(500).json({message:'Error fetching booking'})
        }
    },
    getBookingById: async (req, res) => {
        const {id} = req.params;
        try{

            const booking = await Booking.getBookingById( id );
            res.status(200).json(booking)

            if (!booking) {
                return res.status(404).json({ message: 'booking not found' });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({message:'Error fetching booking'})
        }
    },

    createBooking: async (req, res) => {
        const {
            booking_people,
            booking_check_in,
            booking_check_out,
            booking_status,
            room_number,
            name,
            email,
            phone
        } = req.body;

        try {

            const room = await Room.getRoomByNumber(room_number);
            if (!room) {
                return res.status(404).json({ message: "Room not found" });
            }

            let customer = await Customer.getCustomerByEmail(email);

            if (!customer) {
                const result = await Customer.createCustomer(name, email, phone);
                customer = await Customer.getCustomerByEmail(email);
            }

            await Booking.createBooking(
                booking_people,
                booking_check_in,
                booking_check_out,
                booking_status,
                room.id,
                customer.id
            );

            res.status(201).json({ message: "Booking created successfully" });

        } catch (error) {
            console.error("Error creating booking:", error);
            res.status(500).json({
                message: "Error creating booking",
                error: error.message
            });
        }
    },

    updateBooking: async (req, res) => {
        const { 
            id,
            booking_people, 
            booking_check_in, 
            booking_check_out, 
            booking_total_price, 
            booking_status, 
            booking_room_id, 
            booking_customer_id 
        } = req.body;

        try {
            // ตรวจสอบว่ามี booking นี้อยู่ไหมก่อนอัปเดต
            const booking = await Booking.getBookingById(id);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }

            // เรียกใช้ model สำหรับ update
            await Booking.updateBooking(
                id,
                booking_people,
                booking_check_in,
                booking_check_out,
                booking_total_price,
                booking_status,
                booking_room_id,
                booking_customer_id
            );

        res.status(200).json({ message: "Booking updated successfully" });
        } catch (error) {
            console.error("Error updating booking:", error);
            res.status(500).json({
                message: "Error updating booking",
                error: error.message
            });
        }
    },

    deleteBookingById: async (req, res) => {
        const { id } = req.params;

        try {
            const booking = await Booking.getBookingById(id);
            if (!booking) {
                return res.status(404).json({ message: "Booking not found" });
            }

            await Booking.deleteBookingById(id);
            res.status(200).json({ message: "Booking deleted successfully" });
        } catch (error) {
            console.error("Error deleting booking:", error);
            res.status(500).json({
                message: "Error deleting booking",
                error: error.message
            });
        }
    }

}


export default bookingController;