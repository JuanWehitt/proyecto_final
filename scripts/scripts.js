peliculas = [
  {
      "id":100,
      "titulo": "Piratas del caribe",
      "genero": ["Accion","Aventuras"],
      "director": "director",
      "anio": 2001,
      "imagen": "https://m.media-amazon.com/images/I/91fPdJwTMBL._SL1500_.jpg",
      "idUsuario":100,
      "comentarios": [100,101]
  },
  {
      "id":101,
      "titulo": "The social Network",
      "genero": ["Drama", "Biografica"],
      "director": "David Fincher",
      "anio": 2010,
      "imagen": "https://m.media-amazon.com/images/I/51-kSEvgImL.jpg",
      "idUsuario":100,
      "comentarios": [100,101]
  },
  {
      "id":102,
      "titulo": "Spider-Man: Sin camino a casa",
      "genero": ["Accion", "Aventura", "Fantasia"],
      "director": "Jon Watts",
      "anio": 2021,
      "imagen": "https://m.media-amazon.com/images/I/81QwUjiLJVL._SL1400_.jpg",
      "idUsuario":101,
      "comentarios": [100,101]
  },
  {
      "id":103,
      "titulo": "Rio 2",
      "genero": ["Animacion", "Aventura", "Comedia"],
      "director": "Carlos Saldanha",
      "anio": 2014,
      "imagen": "https://m.media-amazon.com/images/I/91JOXD13PSL._SL1500_.jpg",
      "idUsuario":101,
      "comentarios": [100,101]
  }
]



//al hacer click en una pelicula
function pelicula_mouseclick(id){
  let padre = document.getElementById("contenedor_resultados");
  padre.remove();
  //cargar la palicula con sus comentarios (numero)
  console.log("salia"+id);
}

//cargar las ultimas 10 peliculas (sin loguearse)
//tomo el nodo contenedor_resultados
miContenedor = document.getElementById("contenedor_resultados");
//console.log(miContenedor);
//agrego los nodos hijos a este.
for (i=0; i<peliculas.length; i++){
  //console.log(i);
  peliculaElement = document.createElement("article");
  peliculaElement.className ="pelicula";
  peliculaElement.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaImg = document.createElement("img");
  peliculaImg.src = peliculas[i].imagen;
  peliculaImg.className = "imagen_pelicula";
  peliculaImg.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaDiv = document.createElement("div");
  peliculaDiv.className = "info_pelicula";  
  peliculaDiv.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaH3_titulo = document.createElement("h3");
  peliculaH3_titulo.className="labels_pelicula";
  peliculaH3_titulo.textContent = "Título";
  peliculaH3_titulo.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaH2_titulo = document.createElement("h2");
  peliculaH2_titulo.className="nombre_pelicula";
  peliculaH2_titulo.textContent = peliculas[i].titulo;
  peliculaH2_titulo.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaH3_director = document.createElement("h3");
  peliculaH3_director.className="labels_pelicula";
  peliculaH3_director.textContent = "Director";
  peliculaH3_director.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaH2_director = document.createElement("h2");
  peliculaH2_director.className="nombre_director";
  peliculaH2_director.textContent = peliculas[i].director;
  peliculaH2_director.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaH3_genero = document.createElement("h3");
  peliculaH3_genero.className="labels_pelicula";
  peliculaH3_genero.textContent = "Genero";
  peliculaH3_genero.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  peliculaH2_genero = document.createElement("h2");
  peliculaH2_genero.className="nombre_genero"; 
  peliculaH2_genero.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));
  //peliculaH2_genero.textContent = peliculas[i].genero;
  //console.log(peliculas[i].genero);
  for(e=0; e<peliculas[i].genero.length; e++){ peliculaH2_genero.textContent += " "+peliculas[i].genero[e]}
  peliculaSpan = document.createElement("span");
  peliculaSpan.className = "anio_pelicula";
  peliculaSpan.textContent = peliculas[i].anio;
  peliculaSpan.setAttribute("idPelicula",String("pelicula"+peliculas[i].id));

  miContenedor.appendChild(peliculaElement);
  peliculaElement.appendChild(peliculaImg);
  peliculaElement.appendChild(peliculaDiv);
  peliculaDiv.appendChild(peliculaH3_titulo);
  peliculaDiv.appendChild(peliculaH2_titulo);
  peliculaDiv.appendChild(peliculaH3_director);
  peliculaDiv.appendChild(peliculaH2_director);
  peliculaDiv.appendChild(peliculaH3_genero);
  peliculaDiv.appendChild(peliculaH2_genero);
  peliculaElement.appendChild(peliculaSpan);
}
/*
  */
  document.querySelectorAll(".pelicula").forEach(el => {
    el.addEventListener("click", e => {
      const id = e.target.getAttribute("idPelicula");
      console.log("Se ha clickeado el id "+id);
    });
  });