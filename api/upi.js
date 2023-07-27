require('dotenv').config()
const {
    get_enc_key,
    get_iv,
    get_salt,
    get_domain
} = require('../middleware/get_info')
const fetch = require('node-fetch')
const FormData = require('form-data');
const {
    encrypt,
    decrypt
} = require('../middleware/encrypt')
const change_request = require('../middleware/hashrequest')
const create_response = require('../middleware/hashresponse')
const initPayment = async (req, res) => {
    try {
        const data = await decrypt(req.body.ENCDATA, req.body.PAY_ID)
        console.log(data,"look here ====================")
        const newData = await change_request(data, req.body.PAY_ID)
        const req_obj = await create_response(data, req.body.PAY_ID)
        const finaldata = await encrypt(newData.data, req.body.PAY_ID)
        const form = new FormData()
        form.append("PAY_ID", req.body.PAY_ID)
        form.append("ENCDATA", finaldata)

        const resp = await fetch("https://priority.nexapay.in/pgui/jsp/merchantPaymentInit", {
            redirect: 'follow',
            follow: 100,
            method: 'POST',
            body: form
        })
        res.render("index", {
            statusObject: JSON.stringify(req_obj),
            returnUrl: newData.url,
            checkUrl: "https://payment.prokart.co.in"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = initPayment
