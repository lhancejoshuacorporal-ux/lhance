
const express = require('express');
const router = express.Router();

const { Payment, Booking } = require('../models');

// GET ALL PAYMENTS
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.findAll({
            include: [Booking]
        });

        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET PAYMENT BY ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id, {
            include: [Booking]
        });

        if (!payment) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        res.status(200).json(payment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE PAYMENT
router.post('/', async (req, res) => {
    try {
        const {
            amount,
            payment_date,
            payment_status,
            BookingId
        } = req.body;

        // VALIDATE PAYMENT DETAILS
        if (!amount || !payment_date || !payment_status || !BookingId) {
            return res.status(400).json({
                message: 'Please provide all payment details'
            });
        }

        // CHECK BOOKING
        const booking = await Booking.findByPk(BookingId);

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        // CREATE PAYMENT
        const payment = await Payment.create({
            amount,
            payment_date,
            payment_status,
            BookingId
        });

        res.status(201).json({
            message: 'Payment created successfully',
            payment
        });

    } catch (error) {
        console.error('Create Payment Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// UPDATE PAYMENT
router.put('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        await payment.update(req.body);

        res.status(200).json({
            message: 'Payment updated successfully',
            payment
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// DELETE PAYMENT
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({
                message: 'Payment not found'
            });
        }

        await payment.destroy();

        res.status(200).json({
            message: 'Payment deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
