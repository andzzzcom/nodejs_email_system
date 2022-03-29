const mysql     = require("mysql")
const conn      = mysql.createConnection({
                    host:process.env.HOST,
                    database:process.env.DATABASE,
                    user:process.env.USER,
                    password:process.env.PASSWORD,
                    dateStrings:true,
                })    
module.exports = conn