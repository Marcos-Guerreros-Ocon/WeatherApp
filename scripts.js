let key = "f7ea0e4ebd8262a305d7ec7117f4f551";
let unidad = "metric";
let metodoBusqueda;

function getMetodoBusqueda(busqueda) {
  if (busqueda.lenght == 5 && Number.parseInt(busqueda) + "" == busqueda) {
    metodoBusqueda = "zip";
  } else {
    metodoBusqueda = "q";
  }
}

function buscarTiempo(busqueda) {
  getMetodoBusqueda(busqueda);
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${metodoBusqueda}=${busqueda}&APPID=${key}&unidad=${unidad}`
  )
    .then((result) => {
      return result.json();
    })
    .then((result) => {
      init(result);
    });
}

function init(resultado) {

  document.getElementById('pagina').style="display:flex";

  switch (resultado.weather[0].main) {
    case "Thunderstorm":
      document.body.style.backgroundImage = "url('img/thunderstorm.jpg')"
      break;

    case "Drizzle":
      document.body.style.backgroundImage = "url('img/drizzle.jpg')"
      break;

    case "Clear":
      document.body.style.backgroundImage = "url('img/clear.jpg')"
      break;

    case "Clouds":
      document.body.style.backgroundImage = "url('img/cloudy.jpg')"
      break;

    case "Rain":
      document.body.style.backgroundImage = "url('img/rain.jpg')"
      break;

    case "Snow":
      document.body.style.backgroundImage = "url('img/snow.jpg')"
      break;
  }

  let tiempo = document.getElementById('tiempo');
  let temperaturaTiempo = document.getElementById('temperaturaTiempo');
  let ciudadTiempo = document.getElementById('ciudadTiempo');

  let humedadTiempo = document.getElementById('humedadTiempo');
  let vientoTiempo = document.getElementById('vientoTiempo');
  let iconoTiempo = document.getElementById('iconoTiempo');

  let aux = resultado.weather[0].description;
  tiempo.innerText = aux.charAt(0).toUpperCase() + aux.slice(1);
  iconoTiempo.src = 'icons/' + resultado.weather[0].icon + '.png';

  temperaturaTiempo.innerText = 'Temperatura ' + Math.floor(resultado.main.temp)/10  + 'ºC'

  ciudadTiempo.innerText = 'Ciudad ' + resultado.name;
  vientoTiempo.innerText = 'Viento ' + resultado.wind.speed + 'm/s';
  humedadTiempo.innerText = 'Humedad ' + resultado.main.humidity + '%';  

}

document.getElementById("buscar").addEventListener("click", () => {
  buscarTiempo(document.getElementById("ciudad").value);
});
