require('dotenv').config()
const crypto = require('crypto')
const {
    get_enc_key,
    get_iv,
    get_salt,
    get_domain
} = require('./get_info')

const create_response = async (dataset, payID) => {
    try {
        const data = dataset
        const data1 = data.slice(0, data.indexOf("~CURRENCY_CODE=356") + 18)
        const data2 = data.slice(data.indexOf("~ORDER_ID"), data.indexOf("~PAYER_ADDRESS"))
        const data3 = `~PAY_ID=${payID}~TXNTYPE=STATUS${await get_salt(payID)}`
        const hash = crypto.createHash("sha256").update(data1 + data2 + data3).digest("hex").toUpperCase()
        const finalObj = {
            AMOUNT: data.slice(data.indexOf("AMOUNT=") + 7, data.indexOf("~CURRENCY_CODE")),
            CURRENCY_CODE: "356",
            ORDER_ID: data.slice(data.indexOf("ORDER_ID=") + 9, data.indexOf("~PAYER_ADDRESS")),
            PAY_ID: payID,
            TXNTYPE: "STATUS",
            HASH: hash
        }
        return finalObj
    } catch (error) {
        console.log(error)
    }
}

module.exports = create_response