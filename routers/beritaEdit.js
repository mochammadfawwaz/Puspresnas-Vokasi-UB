const express = require('express')
const beritaEdit = express.Router()
const controller = require('../controller/beritaEdit')

beritaEdit.route('/beritaEdit/:id_berita')
    .get(controller.index)
    .post(controller.crud)

module.exports = beritaEdit