var PORT = process.env.PORT || 8080
const express = require('express')
const http = require('http');
const path = require('path')
const app = express()
const server = http.createServer(app);
const multer = require("multer");
const fs = require('fs')




app.set('views', './views')
app.set('view engine', 'ejs')
app.use('/assets', express.static('public'))
app.get('/*', (req, res) => {
res.render('index.ejs')
})
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
      const {
        originalname
      } = file;
      cb(null, originalname);
    }
  });
  const upload = multer({
    storage
  })
const handleError = (err, res) => {
  res.render("index.ejs")

};
app.post(
    "/upload",
    upload.single("file" /* name attribute of <file> element in your form */),
    (req, res) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "./public/uploads");
        fs.rename(tempPath, targetPath, err => {
          if (err) return handleError(err, res);
          res.render("index.ejs")
        });
    }
  );

  server.listen(PORT, () => console.log("Server started"))