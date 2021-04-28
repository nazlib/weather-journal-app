/* Global Variables */

const baseURL='api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=8024c2d567c0ceec90295e597e40771d';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',callback);
function callback(){
    var zipcode=document.getElementById('zipcode').value;
    getWeather(baseURL,zipcode,key)
    .then(function(data){
        
    });
}
const getWeather = async (baseURL, zipcode, key)=>{

    const res = await fetch(baseURL+zipcode+key)
    try {
  
      const data = await res.json();
      console.log(data)
      return data;
    }  catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  }