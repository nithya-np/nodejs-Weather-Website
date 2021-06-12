const request=require('request')


const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=05bf5bcfbd778d0a48e67328e9065b8a&query='+lat+','+long+'&units=m'
    
    request({url, json:true},(error,{ body }={})=>{
        if(error){
            callback("Unable to connect to weather services!")
        }else if(body.error){
            callback("Unable to find location.Try another search!")
        }else{
            const wea=body.current.weather_descriptions[0]
            const temp=body.current.temperature
            const feelslike=body.current.feelslike
            const pre=body.current.precip
            const humidity=body.current.humidity
            const wind=body.current.wind_speed

            callback(undefined, {
                weather: wea,
                temp,
                feelslike,
                rainfall: pre,
                humidity,
                windspeed: wind
               // wea+". It is currently "+temp+" degrees out. It feels like "+ feelslike+" degrees out.There is a "+pre+"% of rain")
            })
        }
    })
}

module.exports=forecast