
function getData() {
    let city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d45a463c73052c0c6c75b0f059fba9af`;

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            append(res);
            console.log("res:", res);
        })
        .catch(function (err) {
            console.log("err :", err);
        });
}
function getDataLocation(lat, long) {
    let city = document.getElementById("city").value;

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=d45a463c73052c0c6c75b0f059fba9af`;

    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (res) {
            append(res);
            console.log("res:", res);
        })
        .catch(function (err) {
            console.log("err :", err);
        });
}


let array=[];
function append(data) {

    let container = document.getElementById("container");
    let map = document.getElementById("gmap_canvas");
    container.innerHTML = null;



    let city = document.createElement("p");
    city.innerText = `${data.name}`;
    city.setAttribute("class","cit");

    let min = document.createElement("p");
    min.innerText = `Minimum Temperature ${(data.main.temp_min - 273.15).toFixed(2)}`;
    min.setAttribute("class","min");
    
    
    let max = document.createElement("p");
    max.innerText = `Maximum Temperature ${(data.main.temp_max- 273.15).toFixed(2)}`;
    max.setAttribute("class","max");
   
    let div=document.createElement("div");
    div.setAttribute("class","innerDiv");

    let dir = document.createElement("p");
    dir.innerText = `Wind Direction : ${data.wind.deg}`;
    
    let gust = document.createElement("p");
    gust.innerText = `Wind Gust : ${data.wind.gust} km/hr`;
    
    let speed = document.createElement("p");
    speed.innerText = `Wind Speed : ${data.wind.speed} km/hr`;
    
    div.append(dir, gust, speed);
    
    let div1=document.createElement("div");
    div1.setAttribute("class","innerDiv2");
   
    let des = document.createElement("p");
    des.innerText = `Description : ${data.weather[0].description}`;

    let sunrise = document.createElement("p");
    let res1 = data.sys.sunrise;
    let date1 = new Date(res1*1000);
    let ans1 = date1.getHours() + ":" + date1.getMinutes();
    sunrise.innerText = `Sunrise : ${ans1}`;

    let res2 = data.sys.sunset;
    let date2 = new Date(res2*1000)
    let ans2 = date2.getHours() + ":" + date2.getMinutes();
    let sunset = document.createElement("p");
    sunset.innerText = `Sunset : ${ans2}`;
    div1.append(des, sunrise, sunset);

    
    container.style.backgroundColor = "white";
    container.append(city, min, max, div, div1);

    array.push(data.coord.lat,data.coord.lon);
    localStorage.setItem("key",JSON.stringify(array));

    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
}
function getWeather() {
    navigator.geolocation.getCurrentPosition(success);
    function success(position) {
        var crd = position.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getDataLocation(crd.latitude, crd.longitude);
    }

}



