const {Router} 		= require("express")
const router		= Router()
const session       = require("express-session");
const nodemailer    = require("nodemailer")
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")

router.get('/single', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    res.render('../views/Admin/email/send.html', 
    {
        name:name, 
        id_admin:id_admin,
        avatar_admin:avatar_admin, 
        settings:set,
    });
})

router.get('/multi', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM emails_group WHERE status != ? ORDER BY id_group DESC', -1, function(err, rows, fileds){
        if(err) throw err
        res.render('../views/Admin/email/send_multi.html', 
        {
            groups:rows,
            name:name, 
            id_admin:id_admin,
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/send', function(req, res, next){
    var subject   = req.body.subject
    var content   = req.body.content
    var email     = req.body.email
    console.log(subject, content, email)

    const params  = {
        subject:subject,
        content:content,
        email:email
    }
    sendEmail(params)

    res.send({status:1})
})

router.post('/send_group', function(req, res, next){
    var subject   = req.body.subject
    var content   = req.body.content
    var group     = req.body.group
    console.log(subject, content, group)

    db.query('SELECT * FROM emails_group eg, emails e WHERE eg.id_group=e.id_group AND eg.id_group = ?', group, function(err, rows, fileds){
        if(err) throw err

        Object.keys(rows).forEach(function(key){
            const params  = {
                subject:subject,
                content:content,
                email:rows[key].email
            }
            sendEmail(params)
        })
    })
    res.send({status:1})
})

function sendEmail(params){
    return new Promise((resolve, reject)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
        
        var mailOptions = {
            from: 'youremail@gmail.com',
            to: params.email,
            subject: params.subject,
            text: params.content
        };
        
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) 
                reject(err)
            else
            {
                resolve(
                    console.log('Email sent: ' + info.response)
                )
            }
        })
    })
}

module.exports = router