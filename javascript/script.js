const locationHead = document.querySelector("#location-head");
const weatherImage = document.querySelector("#weather-img");
const temperature = document.querySelector(".temperature");
const feelsLike = document.querySelector(".feels-like");
const inputValue = document.getElementById("input-value");

let inputTextValue = "hi";
inputValue.addEventListener("keyup", (e) => {
    inputTextValue = e.target.value;

    if (e.key === "Enter") {
        getData();
    }
});

async function getData() {
    let data = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=0c80b2b56f1943ada19100744230103&q=${inputTextValue}&aqi=no`
    ).then((data) => data.json());
    try {

        locationHead.innerHTML = inputTextValue;
        locationHead.style.textTransform = "capitalize";

        temperature.innerHTML = data.current.temp_c + "<sup>o</sup>";
        feelsLike.innerHTML = "Feels " + data.current.feelslike_c + "<sup>o</sup>";

        if (data.current.temp_c < 15) {
            document.getElementById("weather-img").src = "./images/cloud-thunder.png";
        }

        else if (data.current.temp_c > 15 && data.current.temp_c < 30) {
            document.getElementById("weather-img").src = "./images/rainy-weather.webp"
        }

        else {
            document.getElementById("weather-img").src = "./images/sunny-weather.png";
        }

        document.querySelector(".hide").style.display = "block";
    }

    catch (error) {
        document.getElementById("weather-img").src = "./images/cloud.png";
        temperature.innerHTML = 'No Data Found';
        feelsLike.innerHTML = "";
        document.querySelector(".hide").style.display = "none";
    }

    inputValue.value = "";
}
