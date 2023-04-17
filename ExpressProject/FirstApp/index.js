const express = require("express");
const app = express();

// console.dir(app)
//有关port 的一些东西和内容

app.use((req,res)=>{
    console.log("We got a new question!");
    console.dir(req);
    res.send('eweweweeewewee,this is jongee')
})

app.listen(8080,()=>{
    console.log("Listening on port 8080")
})

