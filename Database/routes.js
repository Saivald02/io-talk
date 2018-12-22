var express = require('express');
var router = express.Router();

const Data = require("./data");

/*
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});
*/

router.get("/getData", (req, res) => {
    Data.find((err, data) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: data });
    });
});

// this is our create methid
// this method adds new data in our database
router.post("/putData", (req, res) => {
    let data = new Data();

    const { id, message } = req.body;

    if ((!id && id !== 0) || !message) {
        return res.json({
            success: false,
            error: "INVALID INPUTS"
        });
    }
    data.message = message;
    data.id = id;
    console.log('adding stuff to database');
    console.log(data);
    data.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our update method
// this method overwrites existing data in our database
router.post("/updateData", (req, res) => {
    const { id, update } = req.body;
    Data.findOneAndUpdate(id, update, err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
router.delete("/deleteData", (req, res) => {
    const { id } = req.body;
    Data.findOneAndDelete(id, err => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

//app.use("/api", router);

module.exports = router;
