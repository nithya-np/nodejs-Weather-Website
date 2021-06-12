//console.log("Client side js file is loaded!!")

// ---------------fetch json data from url and parse it into js object
// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })

// fetch("http://localhost:3000/weather?address=india").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location)
//             console.log(data.forecast)
//         }
//     })
// })

// const image = document.createElement("img")

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector("#message1")
const messageTwo=document.querySelector("#message2")
const messageThree=document.querySelector("#message3")
const messageFour=document.querySelector("#message4")
const messageFive=document.querySelector("#message5")
const messageSix=document.querySelector("#message6")
const messageSeven=document.querySelector("#message7")

//messageOne.textContent="From JS"

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()

    const location=search.value
    
    messageOne.textContent="Loading..."
    messageTwo.textContent=''
    messageThree.textContent=''
    messageFour.textContent=''
    messageFive.textContent=''
    messageSix.textContent=''
    messageSeven.textContent=''

    fetch("/weather?address="+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                //console.log(data.error)
                messageOne.textContent=data.error
                
            }else{
                //console.log(data.location)
                //console.log(data.forecast)
                messageOne.textContent=data.location
                messageTwo.textContent=data.weather
                messageThree.textContent=data.temp
                messageFour.textContent=data.feelslike
                messageFive.textContent=data.humidity
                messageSix.textContent=data.windspeed
                messageSeven.textContent=data.rainfall
            }
        })
    })
})