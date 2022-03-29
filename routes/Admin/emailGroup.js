const {Router} 		= require("express")
const router		= Router()
const session       = require("express-session");
const nodemailer    = require("nodemailer")
const db			= require("../../controllers/db")
const SETTINGS		= require("../../controllers/Settings")

router.get('/list', function(req, res, next){
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

        res.render('../views/Admin/email/group/list.html', 
        {
            groups:rows, 
            name:name, 
            id_admin:id_admin,
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.get('/add', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    res.render('../views/Admin/email/group/add.html', 
    {
        name:name, 
        id_admin:id_admin,
        avatar_admin:avatar_admin, 
        settings:set,
    });
})

router.post('/add', function(req, res, next){
    var name      = req.body.name
    var status    = req.body.status

    db.query('INSERT INTO emails_group(name, creator, status) VALUES (?, ?, ?)', [name, 1, status], function(err, rows, fileds){
        if(err) throw err

        req.flash('success', 'Emails Group Successfully Added!');
        res.redirect('/admin/emails_group/list')
    })
})

router.get('/edit/:id', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM emails_group where id_group=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        console.log(rows)
        res.render('../views/Admin/email/group/edit.html', 
        {
            group:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/edit/:id', function(req, res, next){
    if(req.file!==undefined)
        req.body.thumbnail = req.file.filename

    db.query('UPDATE emails_group SET ? where id_group=?', [{...req.body}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Group Successfully Updated!');
        res.redirect('/admin/emails_group/edit/'+req.params.id)
    })
})

router.get('/delete/:id', function(req, res, next){
    sess                = req.session
    const id_admin      = sess.id_admin
    const name          = sess.name
    const email         = sess.email
    const avatar_admin  = sess.avatar
    const set           = SETTINGS.GENERAL 
    if(name==undefined){
        return res.redirect('/admin/login')
    }

    db.query('SELECT * FROM emails_group where id_group=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        res.render('../views/Admin/email/group/delete.html', 
        {
            group:rows, 
            id_admin:id_admin,
            name:name, 
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/delete/:id', function(req, res, next){
    db.query('UPDATE emails_group SET ? where id_group=?', [{status:-1}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Group Successfully Removed!');
        res.redirect('/admin/emails_group/list')
    })
})

module.exports = router