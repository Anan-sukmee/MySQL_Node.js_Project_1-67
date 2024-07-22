const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT,()=>{
    console.log('API Listening on PORT ${PORT}')
})
app.get("/item", async (req, res) => {
    try {
        connection.query("SELECT * FROM item", (err, results, fields) => {
            if (err) {
                console.log(err);
                return res.status(400).send();
            }
            res.status(200).json(results)
        })
    } catch(err) {
        console.log(err);
        return res.status(500).send();
    }
})
module.exports =app
