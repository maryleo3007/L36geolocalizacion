function initMap() {
  var laboratoriaLima = {lat: -12.1191427, lng: -77.0349046};
  var map = new google.maps.Map(document.getElementById("map"),{
    zoom: 18,
		center: laboratoriaLima
  });

  var marcadorLaboratoria = new google.maps.Marker({
    position: laboratoriaLima,
    map: map
  });

  function buscar() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito,funcionError);
    }
  }
  var inputOrigen = document.getElementById("inputOrigen");
  var inputDestino = document.getElementById("inputDestino");
  new google.maps.places.Autocomplete(inputOrigen);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function (directionsService, directionsDisplay) {
    directionsService.route({
      origin: inputOrigen.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    },function (response,status) {
      if (status === 'OK') {

        var distancia = Number((response.routes[0].legs[0].distance.text.replace(" km","")).replace(",","."));
        console.log(response.routes[0].legs[0].distance.text);

        tarifa.classList.remove("none");

        var costo = distancia*1.75;
        if(costo<4){
          tarifa.innerHTML="S/. 4";
        }
        tarifa.innerHTML = "S./"+parseInt(costo);
      }else{
        window.alert("no encontramos la ruta");
      }
      directionsDisplay.setDirections(response);
    });
  }

  directionsDisplay.setMap(map);

  var trazaruta = function () {
    calculateAndDisplayRoute(directionsService,directionsDisplay);
  }

  document.getElementById('trazaruta').addEventListener("click",trazaruta);
  
  document.getElementById("encuentrame").addEventListener("click",buscar);

	var latitud,longitud;
	var funcionExito = function(posicion) {
		latitud = posicion.coords.latitude;
		longitud = posicion.coords.longitude;

		var miUbicacion = new google.maps.Marker({
			position: {lat:latitud, lng:longitud},
			animation: google.maps.Animation.DROP,
			map: map
		});
		map.setZoom(18);
		map.setCenter({lat:latitud, lng:longitud});
	}
	var funcionError = function (error) {
		alert("Tenemos un problema con encontrar tu ubicación");
	}


}
