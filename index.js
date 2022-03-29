const express       = require("express")
const bodyParser    = require("body-parser")
const cookieParser  = require("cookie-parser")
const nunjucks      = require("nunjucks")
const session       = require("express-session")
const multer        = require("multer")
var flash           = require('connect-flash');
const env           = require("dotenv")
                    env.config()
const path          = require("path")
const app           = express()

app.use(express.static(path.join(__dirname, '/public')))
app.use(session({
    secret:"secretkey",
    saveUninitialized:true,
    cookie:{maxAge:240000},
    resave:false
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(flash())

app.use(function(req, res, next){
    res.locals.message = req.flash();
    next();
});

nunjucks.configure("views", {
    autoescape:true,
    express:app
})

const routesHome	     = require("./routes/Admin/home")	
const routesEmail        = require("./routes/Admin/email")
const routesEmailGroup   = require("./routes/Admin/emailGroup")
const routesEmailSend    = require("./routes/Admin/emailSend")
//const routesWa   = require("./routes/Admin/wa")
//const routesSms  = require("./routes/Admin/sms")
const routesAdmin	= require("./routes/Admin/admin")	
const routesSettings= require("./routes/Admin/settings")	

//routes
app.use('/admin', routesHome)
app.use('/admin/emails', routesEmail)
app.use('/admin/emails_group', routesEmailGroup)
app.use('/admin/emails_send', routesEmailSend)
//app.use('/admin/wa', routesWa)
//app.use('/admin/sms', routesSms)
app.use('/admin/admin', routesAdmin)
app.use('/admin/settings', routesSettings)

var server          = app.listen(12345, function(){
    console.log("Server Start at PORT 12345")
})

