const fs = require("fs");
const path = require("path");
const dbDir = path.resolve(__dirname, "../db");
const json = require("../db/db.json");


module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        const a = fs.readFileSync(path.resolve(dbDir, "db.json"), "utf-8");
        const b = JSON.parse(a)
        res.json(b);
    });

    app.post("/api/notes", function (req, res) {
        res.redirect('back');
        if (!json.length) {
            req.body["id"] = 0;
        } else {
            for (i = 0; i < json.length; i++) {
                req.body["id"] = i;
            }
        }
        json.push(req.body);
        fs.writeFileSync(path.resolve(dbDir, "db.json"), JSON.stringify(json));

    });

    app.delete("/api/notes/:id", function (req, res) {
        res.redirect('back');
        for (var id in json) {
            if (id == req.params.id) {
                json.splice(id, 1);
                fs.writeFileSync(path.resolve(dbDir, "db.json"), JSON.stringify(json));

            }
        }
    });
};