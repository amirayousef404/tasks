const express = require('express')
const router = new express.Router()
const bankController = require('../controller/bank.controller')
router.get('/register',bankController.registershow)
router.post('/register',bankController.registerSave)
router.get ('',bankController.homeShow)
router.post('',bankController.homeSave)
router.get('/addop',bankController.addopShow)
router.post('/addop',bankController.addopSave)
router.get('/edit/:id',bankController.editOp)
router.get('/myAccount',bankController.myAccountShow)
router.post('/edit/:id',bankController.editSave)
router.get('/delete/:id',bankController.deleteOp)
router.get('/showSingle/:id',bankController.showSingleOp)
module.exports = router