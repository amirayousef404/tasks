fs = require('fs')
readData = ()=>{
    try{
        data= JSON.parse(fs.readFileSync('tasks.json').toString())
    }
    catch(e){
        data = []
    }
    return data
}
writeData = (data)=>{
    try{
        fs.writeFileSync('tasks.json',JSON.stringify(data))
    }
    catch(e){
        fs.writeFileSync('tasks.json','[]')
    }
}

addTask = (task)=>{
    allData = readData()
    allData.push(task)
    writeData(allData)
}
addTaskController=(req , res)=>{
    task = {
        id:'',
        title:'',
        content:'',
        status:''
    }
    if(req.query.id == '' ||req.query.title=='' || req.query.content == ''||req.query.status==''){
        task = req.query
    }
     if(req.query.id && req.query.title  && req.query.content && req.query.status){
         addTask(req.query)
         res.redirect('/addTask')
     }
     res.render('contact',{pageTitle :'add new task', taskId : task.id,taskTitle : task.title, taskContent : task.content , taskStatus : task.status})
}

showAllTaskController = (req,res)=>{
    data={
        pageTitle: 'show all tasks',
        data:readData()
    }
    res.render('allTasks' ,data)
}

showSingleTask = (req,res)=>{
    allData = readData()
    console.log(allData[req.params.id])
    res.render('singleTask',{pageTitle : 'single task'},allData[req.params.id])
}
deleteSingleTask = (req,res)=>{
    allData = readData()
    allData.splice(req.params.id,1)
    allData.push(allData)
    console.log(allData)
    res.redirect('/allTask')
}
editSingleTask = (req,res)=>{
    allData = readData()
    console.log(allData[req.params.id])
    
     res.render('editTask',allData[req.params.id],{ pageTitle:'edit task' })
     
    }
module.exports = {
    addTaskController,
    showAllTaskController,
    showSingleTask,
    deleteSingleTask,
    editSingleTask
}