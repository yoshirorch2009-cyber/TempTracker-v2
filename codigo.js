const claveApi = '126a3858b4164015bc434639260510'; // Tu API Key de WeatherAPI
const idioma = 'es';

const inpCiudad = document.getElementById('input-ciudad');

async function obtenerClima() {
    const ciudad = inpCiudad.value;

    if (!ciudad) {
        alert('Por favor, ingresa una ciudad');
        return;
    }

    // URL corregida con backticks (``), la ruta completa de la API y el $ antes de {ciudad}
    const apiClimaActual = `https://api.weatherapi.com/v1/current.json?q=${ciudad}&lang=${idioma}&key=${claveApi}`;

    try {
        const response = await fetch(apiClimaActual);

        // Verificamos si la respuesta fue exitosa (código 200)
        if (!response.ok) {
            alert("No se pudo encontrar la ciudad. Intenta de nuevo.");
            return;
        }

        const data = await response.json();
        mostrarClima(data);
    } catch (error) {
        console.error("Error al obtener los datos del clima:", error);
        alert("Ocurrió un error al conectar con el servicio del clima.");
    }
}

function mostrarClima(data) {
    // WeatherAPI devuelve la URL del icono iniciando con //cdn..., agregamos https:
    document.querySelector('.clima-icono').src = "https:" + data.current.condition.icon;
    document.querySelector('.clima-text').innerHTML = data.current.condition.text;
    document.querySelector('.temp').innerHTML = Math.round(data.current.temp_c) + '°C';
    document.querySelector('.ciudad').innerHTML = data.location.name;
    document.querySelector('.humedad').innerHTML = data.current.humidity + '%';
    document.querySelector('.viento').innerHTML = data.current.wind_kph + ' km/h';
}