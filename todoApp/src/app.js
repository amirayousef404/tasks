const taskController = require('../controllers/tasks')
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express()
app.set('view engine', 'hbs')

const publicDir = path.join(__dirname,'../frontend')
const viewDir = path.join(__dirname,'../resources/views')
const layoutsDir = path.join(__dirname,'../resources/layouts')

app.use(express.static(publicDir))
app.set('views', viewDir)
hbs.registerPartials(layoutsDir)
app.get('',(req,res)=>{
    resData = {pageTitle:'home page' , err:false, tasks : null}
    taskController.taskApi((err,data)=>{
        if(err) resData.err=true
        else resData.tasks = data
        res.render('index',resData)
    })
})
app.get('/tasks',(req,res)=>{
    res.render('tasks',{pageTitle:"tasks page"})
})

const todo = require('../controllers/todoApp.controller')
app.get('/addTask',todo.addTaskController)
app.get('/allTask',todo.showAllTaskController)
app.get('/showSingle/:id', todo.showSingleTask)
app.get('/delete/:id', todo.deleteSingleTask)
app.get('/editSingle/:id', todo.editSingleTask)
module.exports= app