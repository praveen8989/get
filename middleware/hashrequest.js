require('dotenv').config()
const crypto = require('crypto')
const {
    get_enc_key,
    get_iv,
    get_salt,
    get_domain
} = require('./get_info')
const change_request = async(dataset, payid) => {
    try {
        const domainname = await get_domain(payid)
        const data = dataset
        const cutAt = data.indexOf("RETURN_URL=")
        const cusOf = data.indexOf("~HASH")
        const returnurl = data.slice(cutAt + 11, cusOf)
        const newData = data.slice(0, cutAt + 11) + domainname + "/payment" + await get_salt(payid)
        const newDat = data.slice(0, cutAt + 11) + domainname+ "/payment" + `~HASH=${crypto.createHash("sha256").update(newData).digest("hex").toUpperCase()}`
        return { url: returnurl, data: newDat }
    } catch (error) {
        console.log(error)
    }
}

module.exports = change_request
