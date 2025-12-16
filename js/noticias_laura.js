const API_KEY = "8d2157ef3db2d465181cdf6922bc44b8"; // <--- Pega aquí tu API Key
const contenedorNoticias = document.getElementById("contenedor-noticias");

// Función para obtener noticias desde GNews
async function obtenerNoticias(filtro) {
  let query = "";

  switch(filtro) {
    case "plastico":
      query = "plástico OR plastic pollution OR contaminación";
      break;
    case "conservacion":
      query = "conservación marina océano mar";
      break;
    case "especies":
      query = "especies marinas OR sharks OR fishes";
      break;
    case "todas":
    default:
      query = "océano";
  }

  const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=es&max=10&token=${API_KEY}`;

  try {
    const respuesta = await fetch(url);
    const datos = await respuesta.json();

    if (!datos.articles) {
      contenedorNoticias.innerHTML = "<p>No se encontraron noticias.</p>";
      return;
    }

    mostrarNoticias(datos.articles);
  } catch (error) {
    console.error("Error al obtener noticias:", error);
    contenedorNoticias.innerHTML = "<p>Error al cargar noticias.</p>";
  }
}

// Función para mostrar noticias
function mostrarNoticias(articulos) {
  contenedorNoticias.innerHTML = "";

  articulos.forEach((articulo) => {
    const div = document.createElement("div");
    div.classList.add("noticia");
    div.innerHTML = `
      <h4>${articulo.title}</h4>
      <img src="${articulo.image || './img/default.png'}" alt="${articulo.title}">
      <p>${articulo.description || ''}</p>
      <a href="${articulo.url}" target="_blank">Leer más</a>
    `;
    contenedorNoticias.appendChild(div);
  });
}

// Función que vincula los botones con la API
function cargarYMostrar(filtro) {
  obtenerNoticias(filtro);
}

// Cargar todas las noticias al inicio
document.addEventListener("DOMContentLoaded", () => {
  cargarYMostrar("todas");
});
