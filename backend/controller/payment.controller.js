import Payment from "../models/payment.model.js";  // ปรับ path ให้ตรงกับที่เก็บไฟล์จริง

const PaymentController = {
  createTable: async (req, res) => {
    try {
      await Payment.createTable();
      res.status(201).json({ message: "Payment table created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating payment table", error: error.message });
    }
  },

  createPayment: async (req, res) => {
    try {
      const { payment_status, payment_amount, payment_method, payment_reference, date, booking_id } = req.body;
      await Payment.createPayment(payment_status, payment_amount, payment_method, payment_reference, date, booking_id);
      res.status(201).json({ message: "Payment created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error creating payment", error: error.message });
    }
  },

  getAllPayments: async (req, res) => {
    try {
      const payments = await Payment.getAllPayments();
      res.status(200).json(payments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching payments", error: error.message });
    }
  },

  getPaymentById: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.getPaymentById(id);
      if (!payment) return res.status(404).json({ message: "Payment not found" });
      res.status(200).json(payment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching payment", error: error.message });
    }
  },

  updatePayment: async (req, res) => {
    try {
      const { id } = req.params;
      const { payment_status, payment_amount, payment_method, payment_reference, date, booking_id } = req.body;

      const existingPayment = await Payment.getPaymentById(id);
      if (!existingPayment) return res.status(404).json({ message: "Payment not found" });

      await Payment.updatePayment(id, payment_status, payment_amount, payment_method, payment_reference, date, booking_id);
      res.status(200).json({ message: "Payment updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating payment", error: error.message });
    }
  },

  deletePaymentById: async (req, res) => {
    try {
      const { id } = req.params;
      const existingPayment = await Payment.getPaymentById(id);
      if (!existingPayment) return res.status(404).json({ message: "Payment not found" });

      await Payment.deletePaymentById(id);
      res.status(200).json({ message: "Payment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting payment", error: error.message });
    }
  }
};

export default PaymentController;
