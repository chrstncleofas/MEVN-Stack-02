const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST a new student
router.post('/', async (req, res) => {
    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update student
router.put('/:id', async (req, res) => {
    try {
      const updatedStudent = await Student.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, age: req.body.age, email: req.body.email },
        { new: true }
      );
      res.json(updatedStudent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
// DELETE a student
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
