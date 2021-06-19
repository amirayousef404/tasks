const dbConnection= require('../db/db')
const {ObjectID}=require('mongodb')
registershow = (req,res)=>{
    res.render('register')

}
registerSave = (req,res)=>{
  data = req.body
  dbConnection (db=>{
        if(!db) return console.log('error')
        db.collection('register').insertOne(data,(err,result)=>{
            if(err) console.log(err)
            else console.log(result)
        })
  })
  res.redirect('/')
}
homeShow = (req,res)=>{
    res.render('homePage')
}
homeSave = (req,res)=>{
    data = req.body
    dbConnection (db=>{
        if(!db)return console.log('error')
        db.collection('register').find({name : data.name},{pass: data.pass}).toArray( (err, user)=>{
            if (err) console.log(err)
            else {
                req.session.name = data.name
                req.session.pass = data.pass
                res.redirect('/myAccount')
            }
        }) 
    })
}
myAccountShow =(req,res)=>{
    dbConnection(db=>{
        if(!db) return console.log('error')
        db.collection('operation').find().toArray((err,result)=>{
            if(err) return console.log(err)
            else if(!req.session.name && !req.session.pass) res.redirect('/')
            else res.render('myAccount',{result})
        })
    })
}
addopShow = (req,res)=>{
    if(!req.session.name && !req.session.pass) res.redirect('/')
     else res.render('addOper')
}
addopSave =(req,res)=>{
    data = req.body
  dbConnection (db=>{
        if(!db) return console.log('error')
        db.collection('operation').insertOne(data,(err,result)=>{
            if(err) console.log(err)
            else res.redirect('/myAccount')
        })
  })
  
}
showSingleOp = (req,res)=>{
    let id = req.params.id
    dbConnection(db=>{
        if(!db) return console.log('error')
        db.collection('operation').findOne({_id:new ObjectID(id)}, (err, result)=>{
            if(err) console.log(err)
            else if(!req.session.name && !req.session.pass) res.redirect('/')
            else res.render('singlePage', {result})
        })
    })
}
deleteOp = (req,res)=>{
    let id = req.params.id
    dbConnection(db=>{
        if(!db) return console.log ('error')
        db.collection('operation').deleteOne({_id: new ObjectID(id)})
        .then(result=>res.redirect('/myAccount'))
        .catch(e=>console.log(e))
    })

}
editOp = (req,res)=>{
    let id = req.params.id
    dbConnection(db=>{
        if(!db) return console.log('error')
        db.collection('operation').findOne({_id:new ObjectID(id)}, (err,result)=>{
            if (err) console.log(err)
            else if(!req.session.name && !req.session.pass) res.redirect('/')
            else res.render('editOp',{result})
        })
    })
}
editSave = (req,res)=>{
    let id = req.params.id
     data = req.body
     dbConnection(db=>{
         if(!db) return console.log ('error')
         db.collection('operation').updateOne({_id:new ObjectID(id)},
         {$set:{amount:data.amount,date:data.date , location : data.location}})
         .then(result=> res.redirect('/myAccount'))
         .catch(e=>console.log(e))
     })
}

module.exports ={
    registershow,
    registerSave,
    homeShow,
    homeSave,
    addopShow,
    addopSave,
    myAccountShow,
    showSingleOp,
    editOp,
    deleteOp,
    editSave
}