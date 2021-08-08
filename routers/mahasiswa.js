const express = require('express')
const mahasiswa = express.Router()
const controller = require('../controller/mahasiswa')

mahasiswa.route('/mahasiswa')
    .get(controller.index)
    .post(controller.crud)

    mahasiswa.get('/api/mahasiswa', controller.findAll)
    mahasiswa.get("/api/mahasiswa/:id", controller.findOne)
    
module.exports = mahasiswa

// module.exports = app => {
//     const controller = require('../controller/artikel')

//     let router = require("express").Router();
   
//    // Retrieve all posts
//    router.get("/", controller.findAll);
   
//    app.use("/api/artikel", router);
// }