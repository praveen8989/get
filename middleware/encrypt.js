require('dotenv').config()
const crypto = require('crypto');
const {
    get_enc_key,
    get_iv,
    get_salt,
    get_domain
} = require('./get_info')


const encrypt = async (val, payid) => {
    try {
        let cipher = crypto.createCipheriv('aes-256-cbc', await get_enc_key(payid), await get_iv(payid));
        let encrypted = cipher.update(val, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        return encrypted
    } catch (error) {
        console.log(error)
    }
}


const decrypt = async (val, payid) => {
    try {
        let decipher = crypto.createDecipheriv('aes-256-cbc', await get_enc_key(payid), await get_iv(payid));
        let decrypted = decipher.update(val, 'base64', 'utf8');
        return (decrypted + decipher.final('utf8'));
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    encrypt,
    decrypt
}
