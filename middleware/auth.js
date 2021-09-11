var connection = require('../koneksi');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

exports.registrasi = function (req, res) {
    var post = {
        username: req.body.username,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        tanggal_daftar: new Date()
    };

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {

            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok('Berhasil add user', res)
                    }
                })
            } else {
                response.ok('Email Exist in DB!', res)
            }

        }
    })
}

exports.login = function (req,res) {
    var post = {
        email:req.body.email,
        password:md5(req.body.password),
    };

    var query = 'SELECT * from ?? where ??=? AND ??=?';
    var table =['user','email',post.email,'password',post.password];
    query=mysql.format(query,table);

    connection.query(query,function(error,rows){
        if(error){
            console.log(Error);
        }else{
            if(rows.length == 1){
                let token =  jwt.sign({rows},config.secret,{
                    expiresIn:1440
                })

                id_user = rows[0].id;
                user = rows[0]
                var data ={
                    id_user:id_user,
                    access_token:token,
                    ip_address:ip.address()
                };

                var query = 'INSERT INTO ?? SET ?';
                var table = ['akses_token'];
                query = mysql.format(query,table);
                connection.query(query,data,function(error,rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.success(user,token,res);
                    }
                });
            }else{
                response.error('Username Password Tidak Ditemukan',res);
            }
        }
    })
}

exports.halamanrahasia = function (req,res){
    response.ok('Ini halaman rahasia',res);
}