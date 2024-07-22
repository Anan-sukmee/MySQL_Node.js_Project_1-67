const express = require('express')
const app = express()
const PORT = 3000

app.listen(PORT,()=>{
    console.log('API Listening on PORT ${PORT}')
})
app.get("/item", async (req, res) =>{
    res.json(results)
})
module.exports =app
