const wrapper = document.querySelector(".wrapper"),
  inputPart = wrapper.querySelector(".input-part"),
  infoTxt = inputPart.querySelector(".info-txt"),
  inputField = inputPart.querySelector("input"),
  locationBtn = inputPart.querySelector("button"),
  wIcon = document.querySelector(".weather-part img"),
  backButton = wrapper.querySelector(".back-button");

inputField.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputField.value != "") {
    requestApi(inputField.value);
  }
});

locationBtn.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  } else {
    console.log("Not Defined");
  }
});

backButton.addEventListener("click", showInput);

function onError(error) {
  console.log(error);
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6a95f19c45ce094eb66b5d431b630005`;
  fetchData(api);
}

function requestApi(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6a95f19c45ce094eb66b5d431b630005`;
  fetchData(api);
}

function weatherDetails(info) {
    if (info.cod == "404") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} Not Defined`;
      } else if (info.cod === "429") {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = "Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyin.";
      } else if (info.cod !== 200) {
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = "Bir hata oluştu. Tekrar deneyin.";
  } else {
    const city = info.name;
    const { description, id } = info.weather[0];
    const country = info.sys.country;
    const { feels_like, humidity, temp } = info.main;

    wrapper.querySelector(".temp .numb").innerText = Math.floor(temp);
    wrapper.querySelector(".weather").innerText = description;
    wrapper.querySelector(".location").innerText = `${city},${country}`;
    wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
    wrapper.querySelector(".humidity span").innerText = `${humidity}%`;

    infoTxt.classList.remove("pending", "error");
    wrapper.classList.add("active");
    console.log(info);
  }
}

function fetchData(api) {
  infoTxt.innerText = "Get Request...";
  infoTxt.classList.add("pending");
  axios.get(api)
    .then(response => response.data)
    .then(sonuc => weatherDetails(sonuc))
    .catch(error => {
      console.error("Axios Error:", error);
      infoTxt.classList.replace("pending", "error");
      infoTxt.innerText = "Bir hata oluştu. Tekrar deneyin.";
    });
}

function showInput() {
  inputPart.style.display = 'flex';
  wrapper.querySelector(".weather-part").style.display = 'none';
  backButton.style.display = 'none';
}







///Axios///
///try,catch///
///data mani//
///

