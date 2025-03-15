const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const razorpay = new Razorpay({
  key_id: "yourzp_test_rV94YCrbPGlJTf",
  key_secret: "0XzX8w0FHGL9iDJYCZNutjZB",
});

// Create an order
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount, // Razorpay works in paise (1 INR = 100 paise)
      currency: "INR",
      receipt: "receipt_order_" + new Date().getTime(),
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Verify payment
app.post("/verify-payment", async (req, res) => {
  try {
    const { orderId, paymentId, amount } = req.body;
    // Here you would typically verify the payment with Razorpay and store the transaction
    res.json({ success: true, orderId, paymentId, amount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
