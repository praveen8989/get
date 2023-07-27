const check_resp = require('../middleware/fetch_status')

const checkStatus = async(req,res)=>{
    try {
        console.log(req.body)
        const data = await check_resp(req.body)
        console.log(data)
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = checkStatus