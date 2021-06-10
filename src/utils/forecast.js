const request=require('request')


const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=05bf5bcfbd778d0a48e67328e9065b8a&query='+lat+','+long+'&units=f'
    
    request({url, json:true},(error,{ body }={})=>{
        if(error){
            callback("Unable to connect to weather services!")
        }else if(body.error){
            callback("Unable to find location.Try another search!")
        }else{
            const temp=body.current.temperature
            const feelslike=body.current.feelslike
            const pre=body.current.precip
            callback(undefined, body.current.weather_descriptions[0]+". It is currently "+temp+" degrees out. It feels like "+ feelslike+" degrees out.There is a "+pre+"% of rain")
        }
    })
}

module.exports=forecast