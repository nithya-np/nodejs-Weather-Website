const hbs=require('hbs')
const path=require('path')
const express=require('express')

const geocode=require("./utils/geocode.js")
const forecast=require("./utils/forecast.js")
const { send } = require('process')

//creating express app
const app=express()       
const port=3000

//Define paths for Express config
const publicDirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//console.log(__dirname)
//console.log(__filename)
//console.log(path.join(__dirname,'../public'))

//Setup handlebars engine and views location (for dynamic webpages)
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server (for static assets)
app.use(express.static(publicDirPath))

app.get('',(req,res)=>{                // or   app.get('/',(req,res)=>{
    res.render("index",{
        title: "Weather App",
        name: "Nithya"
    })                       // render---to use handlebars(hbs) syntax
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title: "About me",
        name: "Nithya"
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        title: "Help",
        name: "Nithya",
        helpText: "This page is for help!"
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error1,{latitude, longitude, location}={})=>{
        if(error1){
            return res.send({
                error: error1
            })
        }
    
        forecast(latitude, longitude, (error2, data) => {
            if(error2){
                return res.send({
                    error: error2
                })
            }

            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
            
        })
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// routes

// app.com or app.com/index        --hbs
// app.com/help                    --hbs
// app.com/about                   --hbs
// app.com/team.html               --html(static assets)
// app.com/weather                 --using res.send()
// app.com/products                --using res.send()

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Nithya",
        errorMsg: "Help article not found."
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title: "404",
        name: "Nithya",
        errorMsg:"Page not found."
    })
})

app.listen(port, ()=>{           
    console.log("Server is up on port "+port +". Example app listening at http://localhost:"+port)
})