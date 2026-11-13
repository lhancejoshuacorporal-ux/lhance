const express = require('express');
const router = express.Router();

const { Shipment, Booking } = require('../models');

// GET ALL SHIPMENTS
router.get('/', async (req, res) => {
    try {
        const shipments = await Shipment.findAll({
            include: [Booking]
        });

        res.status(200).json(shipments);
    } catch (error) {
        console.error('Get Shipments Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// GET SHIPMENT BY ID
router.get('/:id', async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id, {
            include: [Booking]
        });

        if (!shipment) {
            return res.status(404).json({
                message: 'Shipment not found'
            });
        }

        res.status(200).json(shipment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// CREATE SHIPMENT
router.post('/', async (req, res) => {
    try {
        const { BookingId } = req.body;

        if (!BookingId) {
            return res.status(400).json({
                message: 'BookingId is required'
            });
        }

        const booking = await Booking.findByPk(BookingId);

        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found'
            });
        }

        const newShipment = await Shipment.create(req.body);

        res.status(201).json({
            message: 'Shipment created successfully',
            shipment: newShipment
        });

    } catch (error) {
        console.error('Create Shipment Error:', error);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE SHIPMENT
router.put('/:id', async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                message: 'Shipment not found'
            });
        }

        await shipment.update(req.body);

        res.status(200).json({
            message: 'Shipment updated successfully',
            shipment
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// DELETE SHIPMENT
router.delete('/:id', async (req, res) => {
    try {
        const shipment = await Shipment.findByPk(req.params.id);

        if (!shipment) {
            return res.status(404).json({
                message: 'Shipment not found'
            });
        }

        await shipment.destroy();

        res.status(200).json({
            message: 'Shipment deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
