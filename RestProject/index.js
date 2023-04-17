const express = require('express');
const app = express();

app.get('/tacos',(req,res)=>{
    res.send("Get tacos response")
})

app.listen(3000,()=>{
    console.log("On the port 3000")
})

