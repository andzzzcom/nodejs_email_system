const {Router} 		= require("express")
const router		= Router()
const session       = require("express-session");
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

    db.query('SELECT e.email, e.description, e.status, e.created_date, e.last_updated_date, eg.name FROM emails_group eg, emails e WHERE e.status != ? AND eg.id_group=e.id_group ORDER BY e.id_email DESC', -1, function(err, rows, fileds){
        if(err) throw err

        res.render('../views/Admin/email/list.html', 
        {
            emails:rows, 
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

    db.query('SELECT * FROM emails_group WHERE status = ? ORDER BY id_group DESC', 1, function(err, rows, fileds){
        if(err) throw err
        res.render('../views/Admin/email/add.html', 
        {
            groups:rows,
            name:name, 
            id_admin:id_admin,
            avatar_admin:avatar_admin, 
            settings:set,
        });
    })
})

router.post('/add', function(req, res, next){
    var email        = req.body.email
    var id_group     = req.body.id_group
    var description  = req.body.description
    var status       = req.body.status

    db.query('INSERT INTO emails(email, id_group, description, creator, status) VALUES (?, ?, ?, ?, ?)', [email, id_group, description, 1, status], function(err, rows, fileds){
        if(err) throw err

        req.flash('success', 'Email Successfully Added!');
        res.redirect('/admin/emails/list')
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

    db.query('SELECT * FROM emails where id_email=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        db.query('SELECT * FROM emails_group WHERE status= ? ORDER BY id_group DESC', 1, function(err2, rows2, fileds2){
            if(err2) throw err2

            res.render('../views/Admin/email/edit.html', 
            {
                groups:rows2, 
                email:rows, 
                id_admin:id_admin,
                name:name, 
                avatar_admin:avatar_admin, 
                settings:set,
            });
        })
    })
})

router.post('/edit/:id', function(req, res, next){
    db.query('UPDATE emails SET ? where id_email=?', [{...req.body}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Email Successfully Updated!');
        res.redirect('/admin/emails/edit/'+req.params.id)
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

    db.query('SELECT * FROM emails where id_email=?', req.params.id, function(err, rows, fileds){
        if(err) throw err
        
        db.query('SELECT * FROM emails_group WHERE status= ? ORDER BY id_group DESC', 1, function(err2, rows2, fileds2){
            if(err2) throw err2

            res.render('../views/Admin/email/delete.html', 
            {
                groups:rows2, 
                email:rows, 
                id_admin:id_admin,
                name:name, 
                avatar_admin:avatar_admin, 
                settings:set,
            });
        })
    })
})

router.post('/delete/:id', function(req, res, next){
    db.query('UPDATE emails SET ? where id_email=?', [{status:-1}, req.params.id], function(err, rows, fileds){
        if(err) throw err
        
        req.flash('success', 'Email Successfully Removed!');
        res.redirect('/admin/emails/list')
    })
})

module.exports = router