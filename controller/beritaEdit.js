const db = require('../config/database')
var sess;
let date_ob = new Date();
let date = ("0" + date_ob.getDate()).slice(-2);
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
let year = date_ob.getFullYear();
let datenow = year + "-" + month + "-" + date;

module.exports = {
  index: (req, res) => {
    sess = req.session;
    if (sess.id_user == undefined) {
      res.redirect('login')
    } else {
      db.query(
        'SELECT * FROM `user` WHERE `id_user`=(?)',
        [sess.id_user],
        (error, profil) => {
          if (error) console.log(error)
          else {
            db.query(
              "SELECT * FROM `berita` WHERE `id_berita`=?",
              [req.params.id_berita],
              (error, berita) => {
                if (error) console.log(error)
                else {
                  db.query(
                    'SELECT * FROM kategori_konten',
                    (error, kategori) => {
                      if (error) console.log(error)
                      else {
                        res.render('../views/admin/index.ejs', {profil, berita, kategori, page: 'beritaEdit'})
                      }
                    }
                  )
                }
              }
            )
          }
        }
      )
    }
  },

  crud: (req, res) => {
    if (req.body.submit=="edit") {
      var judul     = req.body.judul;
      var deskripsi = req.body.deskripsi;
      var isi       = req.body.isi;
      db.query(
        "UPDATE `berita` SET `judul`=?,`deskripsi`=?,`isi`=?,`id_kategori`=? WHERE `id_berita` = ?",
        [judul, deskripsi, isi, req.body.id_kategori, req.body.id_berita],
        (err, result) => {
          if (err) console.log(err)
          res.redirect('/berita')
        }
      )
    }
  }
}