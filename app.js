const bodyParser = require('body-parser')
const express = require('express')
const routes = require('./routes')
const port = process.env.PORT || 8080
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cors())
// app.set('view engine', 'hbs')
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.set('views', __dirname + '/views');
app.use(routes)
app.use(bodyParser.json());




app.use(function (err, req, res, next) {
    var responseData;
    if (err.name === 'JsonSchemaValidation') {
        console.log(err.message);
        res.status(400);
        responseData = {
            statusText: 'Bad Request',
            error: 'invalid data'
        }
        res.send(responseData)
    } else {
        next(err);
    }
});






app.listen(port, '127.0.0.1', () => {
    console.log(`server is running on port ${port} ------------------------------------------------------------------`)
})
