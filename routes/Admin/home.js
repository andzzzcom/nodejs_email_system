const {Router} 		= require("express");
const session       = require("express-session");
const bcrypt        = require("bcrypt")
const router		= Router()
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")

router.get('/', async function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar

    const set           = SETTINGS.GENERAL 
    const admins        = await getAdmins()
    const emails_group  = await getEmailsGroup()
    const emails        = await getEmails()
    
    
    if(email !== undefined)
    	res.render('../views/Admin/Home.html', 
        {
            admins:admins, 
            emails_group:emails_group,
            emails:emails,
            name:name, 
            id_admin:id_admin, 
            avatar_admin:avatar_admin, 
            settings:set
        });
    else
        res.redirect('/admin/login')
})

router.get('/login', function(req, res, next){
    const set        = SETTINGS.GENERAL 

	res.render('../views/Admin/Login.html', {settings:set});
})

router.post('/login', function(req, res, next){

    var email       = req.body.email
    var password    = req.body.password

    db.query('SELECT * FROM admins WHERE email = ? AND status = 1', email, async(err, rows, fileds)=>{
        if(err) throw err

        if(rows.length>0)
        {
            const validPassword = await bcrypt.compare(password, rows[0].password)
            if (validPassword){
                sess          = req.session
                sess.id_admin = rows[0].id_admin
                sess.name     = rows[0].name
                sess.email    = email
                sess.password = password
                sess.avatar   = rows[0].avatar
    
                res.redirect('/admin')
            }else{
                req.flash('failed', 'Old Password Not Correct!');
                res.redirect('/admin/login')
            }
        }else{
            req.flash('failed', 'Account Not Found!');
            res.redirect('/admin/login')
        }
    })
})

router.get('/logout', function(req, res, next){
    req.session.destroy();

    res.redirect('/admin')
})


function getEmailsGroup(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM emails_group WHERE status!=? ORDER BY id_group DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

function getEmails(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM emails WHERE status!=? ORDER BY id_email DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

function getAdmins(){
    return new Promise((resolve, reject)=>{
        db.query('SELECT * FROM admins WHERE status!=? ORDER BY id_admin DESC', -1, function(err, rows, fileds){
            if(err) 
                reject(err)
            else
                resolve(rows)
        })
    })
}

module.exports = router