mysql=require('mysql')
conn=mysql.createConnection({
    host:'localhost',user:"root",password:"",database:"hotel"
})
util=require('util')
execute=util.promisify(conn.query).bind(conn)
module.exports=execute