
const express = require('express');
const router = express.Router();

const { Customer } = require('../models');

// GET all customers
router.get('/', async (req, res) => {
    try {
        const customerList = await Customer.findAll();
        res.status(200).json(customerList);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// GET customer by ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// CREATE customer
router.post('/new', async (req, res) => {
    try {
        const newCustomer = await Customer.create(req.body);

        res.status(201).json(newCustomer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE customer
router.put('/:id', async (req, res) => {
    try {
        const customer = await Customer.findByPk(req.params.id);

        if (!customer) {
            return res.status(404).json({
                message: 'Customer not found'
            });
        }

        await customer.update(req.body);

        res.status(200).json(customer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
