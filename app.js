const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '/public')))
app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    fs.readdir(`./files`, function(err, files){
        res.render("index", {files: files})
    })
})

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.name.split(' ').join('')}.txt`,req.body.details, function(err){
        res.redirect("/")
    })
})

app.listen(3000, ()=>{
    console.log("app is running")
})