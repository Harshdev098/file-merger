const express=require('express')
const path=require('path')
const {mergpdf}=require('./merge')
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const app=express()
app.use('/static',express.static('public'))
const port=3000
app.get('/',(req,res)=>{
    // res.send("hello harsh")
    res.sendFile(path.join(__dirname,"templates/index.html"))
})
app.post('/merge',upload.array('pdfs',2),async(req,res,next)=>{
    console.log(req.files)
    await mergpdf(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    // res.send({data:req.files})
    res.redirect("http://localhost:3000/static/merged.pdf")
})
app.listen(port,()=>{
    console.log("server is started")
})

