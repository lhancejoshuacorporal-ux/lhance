
const express = require('express');
const router = express.Router();

const { Booking, Customer, Shipment, Payment } = require('../models');

// GET ALL BOOKINGS
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.findAll({
            include: [
                Customer,
                Shipment,
                Payment
            ]
        });

        res.status(200).json(bookings);
    } catch (error) {
        console.error('Get Bookings Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET BOOKING BY ID
router.get('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id, {
            include: [Customer, Shipment, Payment]
        });

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        res.status(200).json(booking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// CREATE BOOKING
router.post('/', async (req, res) => {
    try {
        const { booking_date, status, CustomerId } = req.body;

        if (!booking_date || !status || !CustomerId) {
            return res.status(400).json({
                message: 'Please provide booking_date, status and CustomerId'
            });
        }

        const customer = await Customer.findByPk(CustomerId);

        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        const newBooking = await Booking.create({
            booking_date,
            status,
            CustomerId
        });

        res.status(201).json({
            message: 'Booking created successfully',
            booking: newBooking
        });

    } catch (error) {
        console.error('Create Booking Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE BOOKING
router.put('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        await booking.update(req.body);

        res.status(200).json({
            message: 'Booking updated successfully',
            booking
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE BOOKING
router.delete('/:id', async (req, res) => {
    try {
        const booking = await Booking.findByPk(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        await booking.destroy();

        res.status(200).json({
            message: 'Booking deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
