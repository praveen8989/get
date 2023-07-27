const fetch = require('node-fetch')

const check_resp = async(dataset)=>{
    try {
        const data = await fetch('https://priority.nexapay.in/pgws/transact', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(dataset)
        })
        return data.json()
    } catch (error) {
        console.log(error)
    }
}

module.exports = check_resp
