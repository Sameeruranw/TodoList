const express = require("express")
const mongoose = require("mongoose")
const port = 5000
const TodoModel = require("../server/models/Todo")
const cors = require("cors")
const app = express()



//middleware
app.use(cors());
app.use(express.json())

mongoose.connect("mongodb+srv://admin:SKWCYim2f7CqcGRg@cluster0.tjjm57b.mongodb.net/todolist?retryWrites=true&w=majority")
.then(()=>{
    console.log("connected to database Successfully")
}).then(()=>{
    app.listen(port)
})
.catch((err)=>{
    console.log(err)
})

app.get('/get',(req,res)=>{
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.put("/update/:id",(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndUpdate({_id : id},{done : true})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.delete("/delete/:id",(req,res)=>{
    const {id} = req.params;
    TodoModel.findByIdAndDelete({_id : id})
    .then(result => res.json(result))
    .catch(err => res.json(err))
})
app.post("/add",(req,res)=>{
    const task = req.body.task;
    TodoModel.create({
        task : task
    }).then(result=>res.json(result))
    .catch(err=>{
        res.json(err)
    })
    
    
})


