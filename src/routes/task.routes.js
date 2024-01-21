const express = require('express');
const router = express.Router();

const Task = require('../models/task.models'); // mediante esta modelo hacemos consulta ala BD

router.get('/', async (req, res)=>{
    // res.send("hola mundo");
    const tasks = await Task.find();
    // console.log(tasks)
     res.json(tasks);
});

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.json(task);
})

router.post('/',  async (req, res)=>{
    const {title, description} = req.body;
    const task = new Task({title, description});
    console.log(task);
    await task.save();

    res.json({status: 'Task saved'});
})

router.put('/:id', async (req, res) => {
    const {title, description} = req.body;
    const newTask = {title, description};
    await Task.findByIdAndUpdate(req.params.id, newTask);
    // console.log(req.params.id);
    res.json({status: 'Task updated'});    
});

router.delete('/:id', async (req, res)=>{
    await Task.findByIdAndDelete(req.params.id); // proceso va tomar tiempo en la bd 
    res.json({status: "Task Deleted"});

})

module.exports = router;