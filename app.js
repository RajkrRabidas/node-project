const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    fs.readdir(`./files`, function (err, files) {
        if (err) {
            return res.status(500).send("Error reading files directory.");
        }
        res.render("index", { files: files });
    });
});

app.get("/file/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, filedata) {
        if (err) {
            return res.status(404).send("File not found.");
        }
        res.render("show", { filename: req.params.filename, filedata: filedata });
    });
});

app.post("/create", (req, res) => {
    const filename = req.body.name.split(' ').join('') + ".txt";
    fs.writeFile(`./files/${filename}`, req.body.details, function (err) {
        if (err) {
            return res.status(500).send("Error creating file.");
        }
        res.redirect("/");
    });
});

app.post("/delete", (req, res) => {
    const filename = req.body.name.split(' ').join('') + ".txt";
    fs.unlink(`./files/${filename}`, function (err) {
        if (err) {
            return res.status(500).send("Error deleting file.");
        }
        res.redirect("/");
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});
