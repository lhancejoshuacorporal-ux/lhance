const express = require('express')
const router = express.Router()

const { port } = require('../models');
const { where } = require('sequelize');

//get request => list of employees
router.get("/",async (req, res) => {
    try {
        const employeeList = await Employee.findAll({
            attributes:["id", "port_name", "location"],
        })
        res.status(200).json(employeeList);
    } catch (error){
        res.status(404).json({message: "An error occured!"});
    }
});
 router.get("/id", async(req, res) => {
    const {id} = req.params
    try{
        const port = await port.findAll({
            attributes: ["id", "port_name", "location"],
            where: {id: id},

        });
        console.log(port);
        res.status(200).json(port);
    } catch (error) {
    res.status(500).json({
    message: "databse error while fetching customer data"
});
   }
 });

router.post("/new" , async(req, res) => {
    try{
        const newPort = req.body
        await Port.create(newport)
        res.status(201).json({message: "new customer data created"})
     } catch(error){
            res.status(404).json({message: "an error occured while adding new customer"})

    }
})

module.exports = router;

//update employee data
router.put("/:id", async (req, res) => {
    const { id } = req.params
    const { port_name, location } = req.body
    try{
        const port = await  port.update(
            {
                port_name: port_name,
                location,
            
            },
            {
                where:{id : id}
            },
        );
        if (port ===0) {
            return res.status(404).json({ message: "updateerror: port data" });
    }
        res.status(200).json({message: "succesfully updated port"});
    }catch ( error ){}
});

