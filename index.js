const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
var con = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b83c5dac6a4a40",
  password: "1bbc4399",
  database: "heroku_82bd4eac5871c46"
});
app.get('/', (req, res) => {
  con.getConnection(function (err, tempconnection) {
    if (err) { res.send("Error occured!"); }
    else {
      var sql = "SELECT * FROM staff";
      con.query(sql, function (err, result, fields) {
        if (err) { throw err; }
        else {
          res.send(result);
        }
      tempconnection.release();
      });
    }
  });
});
app.listen(4001, () => {
  console.log('Example app listening to Heroku port.');
});