const express = require("express")
const router = express.Router()
const initPayment = require('./api/upi')
const checkStatus = require('./api/response')
router.post('/initPayment', initPayment)
router.post('/status', checkStatus)
router.get('/', (req,res)=>{
    res.send({status: 200,message:"uni",version:1.3})
})

// router.post('/get', async(req,res)=>{
//     console.log(req.body)
//     res.send({data: 'hello'})
// })

module.exports = router
