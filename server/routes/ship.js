const express = require('express')
const router = express.Router()

const { ship } = require('../models');
const { where } = require('sequelize');

//get request => list of employees
router.get("/",async (req, res) => {
    try {
        const employeeList = await Employee.findAll({
            attributes:["id","ship_name","ship_type","capacity","status"],
        })
        res.status(200).json(employeeList);
    } catch (error){
        res.status(404).json({message: "An error occured!"});
    }
});
 router.get("/id", async(req, res) => {
    const {id} = req.params
    try{
        const ship = await ship.findAll({
            attributes: ["id","ship_name","ship_type","capacity","status"],
            where: {id: id},

        });
        console.log(ship);
        res.status(200).json(ship);
    } catch (error) {
    res.status(500).json({
    message: "databse error while fetching customer data"
});
   }
 });

router.post("/new" , async(req, res) => {
    try{
        const newShip = req.body
        await Ship.create(newship)
        res.status(201).json({message: "new customer data created"})
     } catch(error){
            res.status(404).json({message: "an error occured while adding new customer"})

    }
})

module.exports = router;

//update employee data
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { ship_name, ship_type, capacity, status } = req.body
    try{
        const ship = await  ship.update(
            {
                ship_name: ship_name,
                ship_type: ship_type,
                capacity: capacity,
                status: status,

            },
            {
                where:{id : id}
            },
        );
        if (ship ===0) {
            return res.status(404).json({ message: "updateerror: customer data" });
    }
        res.status(200).json({message: "succesfully updated customer"});
    }catch ( error ){}
});

