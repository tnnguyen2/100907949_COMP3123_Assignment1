const express = require('express')
const employeeModel = require('../models/employeeModel')

let employeeRoutes = express.Router()

employeeRoutes.get("/employees", async (req, res) => {
    //Retrieves all Employees
    try {
        const empList = await employeeModel.find();
        res.status(200).json(empList)
    } catch (error) {
        res.status(500).json(error)
    }
})

employeeRoutes.post('/employees', async (req, res) => {
    //Creates new employee
    try {
        const newEmployee = new employeeModel({
            ...req.body
        });
        await newEmployee.save()
        res.status(201).json(newEmployee)
    } catch (error) {
        res.status(500).send({message: "Employee info can not be empty"})
    }
});
employeeRoutes.get("/employees/:empid", async (req, res) => {
    //Retrieves Employee by Id
    try {
        const emp = await employeeModel.findById({_id: req.params.empid});
        res.status(200).json(emp)
    } catch (error) {
        res.status(500).json(error)
    }
})
employeeRoutes.put('/employees/:empid', async (req, res) => {
    //Update employee
    try {
        const updatedEmp = await employeeModel.findByIdAndUpdate({_id: req.params.empid}, req.body)
        if (!updatedEmp) {
            res.status(200).send({message: "Employee does not exist"})
        } else {
            res.status(200).json(updatedEmp)
        }
    }catch (error) {
        res.status(500).json(error)
    }
});

employeeRoutes.delete('/employees/:empid', async (req, res) => {
    //Delete employee
    try {
        const emp = await employeeModel.findOneAndDelete({_id: req.params.empid})
        if (!emp) {
            res.status(200).send({message: "Employee does not exist"})
        } else {
            res.status(204).json(emp)
        }
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = employeeRoutes