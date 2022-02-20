user = "";
peliculas = [
  {
      "id":100,
      "titulo": "Piratas del caribe",
      "genero": ["Accion","Aventuras"],
      "director": "director",
      "anio": 2001,
      "imagen": "https://m.media-amazon.com/images/I/91fPdJwTMBL._SL1500_.jpg",
      "sinopsis": "El capitán Barbossa le roba el barco al pirata Jack Sparrow y secuestra a Elizabeth, amiga de Will Turner. Barbossa y su tripulación son víctimas de un conjuro que los condena a vivir eternamente y a transformarse cada noche en esqueletos vivientes.",
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
      "sinopsis":"La historia de los jóvenes fundadores de la popular red social Facebook, especialmente de su creador más conocido, Mark Zuckerberg. Su leyenda reza: 'No se hacen 500 millones de amigos sin hacer unos cuantos enemigos'",
      "idUsuario":100,
      "comentarios": [102]
  },
  {
      "id":102,
      "titulo": "Spider-Man: Sin camino a casa",
      "genero": ["Accion", "Aventura", "Fantasia"],
      "director": "Jon Watts",
      "anio": 2021,
      "imagen": "https://m.media-amazon.com/images/I/81QwUjiLJVL._SL1400_.jpg",
      "sinopsis":"Tras descubrirse la identidad secreta de Peter Parker como Spider-Man, la vida del joven se vuelve una locura. Peter decide pedirle ayuda al Doctor Extraño para recuperar su vida. Pero algo sale mal y provoca una fractura en el multiverso.",
      "idUsuario":101,
      "comentarios": [103,104]
  },
  {
      "id":103,
      "titulo": "Rio 2",
      "genero": ["Animacion", "Aventura", "Comedia"],
      "director": "Carlos Saldanha",
      "anio": 2014,
      "imagen": "https://m.media-amazon.com/images/I/91JOXD13PSL._SL1500_.jpg",
      "sinopsis": "Blu, Perla y sus tres hijos son unas perfectas 'aves de ciudad' que viven tranquilamente en su casa de las afueras de Río de Janeiro. Sin embargo, Perla cree que los niños deberían aprender cómo viven las auténticas aves en el Amazonas. Por eso, toda la familia se aventura a viajar a la selva. Mientras Blu intenta encajar con los nuevos vecinos del Amazonas, le preocupa la posibilidad de que Perla y los chicos no quieran regresar a Río.",
      "idUsuario":101,
      "comentarios": []
  }
]
comentarios = [
  {
    "id":100,
    "texto":"100",
  },
  {
    "id":101,
    "texto":"101",
  },
  {
    "id":102,
    "texto":"102Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum reprehenderit consequuntur nam error velit nihil, nobis officiis? Maxime, minus.",
  },
  {
    "id":103,
    "texto":"103Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum reprehenderit consequuntur nam error velit nihil, nobis officiis? Maxime, minus.",
  },
  {
    "id":104,
    "texto":"104Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium earum reprehenderit consequuntur nam error velit nihil, nobis officiis? Maxime, minus.",
  }
]

usuarios = [
  {
    "id":101,
    "nombre": "Juan Cruz",
    "apellido": "Wehitt",
    "nickname": "juan01",
    "pass": "yutuvw"
},
{
    "id":100,
    "nombre": "Gonzalo",
    "apellido": "Alo",
    "nickname": "gonza01",
    "pass": "yutuvw"
}
]
/*
//al hacer click en una pelicula
function pelicula_mouseclick(id){
	let padre = document.getElementById("contenedor_resultados");
	let footer = document.getElementById("footer_div");
	padre.remove();
	footer.remove();
	//cargar la palicula con sus comentarios (numero)
	console.log("salida"+id);
}
*/
function footer(){
	footer_div = document.createElement("div");
	footer_div.className = "footer_div";
	footer_div.id = "footer_div";
	footer_p = document.createElement("p");
	footer_p.textContent = "Juan y Fran Web Pages - 2022";
	footer_div.appendChild(footer_p);
	return footer_div;
}

function imprimir_home(){
	//cargar las ultimas 10 peliculas (sin loguearse)
	//tomo el nodo contenedor_resultados
	miContenedor = document.getElementById("contenedor_resultados");
	//console.log(miContenedor);
	//agrego los nodos hijos a este.
	if (user=="" && peliculas.length>=10){
		cant = 10;
	}else{
		cant = peliculas.length;
	}
	for (i=0; i<cant; i++){
		//console.log(i);
		peliculaElement = document.createElement("article");
		peliculaElement.className ="pelicula";
		peliculaElement.setAttribute("idPelicula",peliculas[i].id);
		peliculaImg = document.createElement("img");
		peliculaImg.src = peliculas[i].imagen;
		peliculaImg.className = "imagen_pelicula";
		peliculaImg.setAttribute("idPelicula",peliculas[i].id);
		peliculaDiv = document.createElement("div");
		peliculaDiv.className = "info_pelicula";  
		peliculaDiv.setAttribute("idPelicula",peliculas[i].id);
		peliculaH3_titulo = document.createElement("h3");
		peliculaH3_titulo.className="labels_pelicula";
		peliculaH3_titulo.textContent = "Título";
		peliculaH3_titulo.setAttribute("idPelicula",peliculas[i].id);
		peliculaH2_titulo = document.createElement("h2");
		peliculaH2_titulo.className="nombre_pelicula";
		peliculaH2_titulo.textContent = peliculas[i].titulo;
		peliculaH2_titulo.setAttribute("idPelicula",peliculas[i].id);
		peliculaH3_director = document.createElement("h3");
		peliculaH3_director.className="labels_pelicula";
		peliculaH3_director.textContent = "Director";
		peliculaH3_director.setAttribute("idPelicula",peliculas[i].id);
		peliculaH2_director = document.createElement("h2");
		peliculaH2_director.className="nombre_director";
		peliculaH2_director.textContent = peliculas[i].director;
		peliculaH2_director.setAttribute("idPelicula",peliculas[i].id);
		peliculaH3_genero = document.createElement("h3");
		peliculaH3_genero.className="labels_pelicula";
		peliculaH3_genero.textContent = "Genero";
		peliculaH3_genero.setAttribute("idPelicula",peliculas[i].id);
		peliculaH2_genero = document.createElement("h2");
		peliculaH2_genero.className="nombre_genero"; 
		peliculaH2_genero.setAttribute("idPelicula",peliculas[i].id);
		//peliculaH2_genero.textContent = peliculas[i].genero;
		//console.log(peliculas[i].genero);
		for(e=0; e<peliculas[i].genero.length; e++){ peliculaH2_genero.textContent += " "+peliculas[i].genero[e]}
		peliculaSpan = document.createElement("span");
		peliculaSpan.className = "anio_pelicula";
		peliculaSpan.textContent = peliculas[i].anio; 
		peliculaSpan.setAttribute("idPelicula",peliculas[i].id);

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
	principal = document.getElementById("principal");
	principal.appendChild(footer());
}

/*
  */
//obtiene los comentarios a partir de los id de una lista
function obtenerLosComentarios_array(id_array){
	const coment_array = comentarios.filter( coment => {
		return id_array.includes(coment.id);
	});
	return coment_array;
}


//retorna un texto conteniendo el autor del comentario del id usuario
function autor_del_comentario(id){
  const elemento = usuarios.find(element => {
    return element.id == id;
  })
  return elemento.nombre;
}

function remove_tag_class(clase){
	let elemento = document.getElementsByClassName(clase);
	while(elemento[0]){
		elemento[0].remove();
	}
}

function remove_tag_id_childrens(id){
  	// Eliminando todos los hijos de un elemento
  	let elemento = document.getElementById(id);
  	while (elemento.firstChild) {
    	elemento.removeChild(elemento.firstChild);
  	}
}






  ///crear la pagina de comentarios de una pelicula seleccionada

  function cargarPeliculaYComentarios(id){

    const pelicula_seleccionada = peliculas.find(function(element) {
      return element.id == id;
    });
    //console.log(pelicula_seleccionada);
    principal = document.getElementById("principal");
    boton_atras_div = document.createElement("div");
    boton_atras_div.className = "boton_atras";
    boton_atras_div.id = "boton_atras";
    boton_atras_img = document.createElement("img");
    boton_atras_img.src = "images/atras.png";
    boton_atras_img.alt="img atras";
    boton_atras_p = document.createElement("p");
    boton_atras_p.textContent = "Atrás";

    principal.appendChild(boton_atras_div);
    boton_atras_div.appendChild(boton_atras_img);
    boton_atras_div.appendChild(boton_atras_p);

    miContenedor = document.createElement("div");
    miContenedor.className = "contenedor_resultados";
    miContenedor.id = "contenedor_resultados";

    //miContenedor = document.getElementById("contenedor_resultados");    
    pelicula_com = document.createElement("div");
    pelicula_com.className = "pelicula_com";
    imagen_com = document.createElement("img");
    imagen_com.className = "imagen_pelicula_com";
    imagen_com.src = pelicula_seleccionada.imagen;
    imagen_com.alt = "imagen de la pelicula";
    
    peliculaDiv_com = document.createElement("div");
    peliculaDiv_com.className = "info_pelicula_com";  

    peliculaH3_com_titulo = document.createElement("h3");
    peliculaH3_com_titulo.className="labels_pelicula_com";
    peliculaH3_com_titulo.textContent = "Título";

    peliculaH2_com_titulo = document.createElement("h2");
    peliculaH2_com_titulo.className="nombre_pelicula_com";
    peliculaH2_com_titulo.textContent = pelicula_seleccionada.titulo;

    peliculaH3_com_director = document.createElement("h3");
    peliculaH3_com_director.className="labels_pelicula_com";
    peliculaH3_com_director.textContent = "Director";

    peliculaH2_com_director = document.createElement("h2");
    peliculaH2_com_director.className="nombre_director_com";
    peliculaH2_com_director.textContent = pelicula_seleccionada.director;

    peliculaH3_com_genero = document.createElement("h3");
    peliculaH3_com_genero.className="labels_pelicula_com";
    peliculaH3_com_genero.textContent = "Genero";

    peliculaH2_com_genero = document.createElement("h2");
    peliculaH2_com_genero.className="nombre_genero_com"; 

    pelicula_sinopsis = document.createElement("div");
    pelicula_sinopsis.className ="pelicula_sinopsis";
    pelicula_sinopsis_h3 = document.createElement("h3");
    pelicula_sinopsis_h3.textContent = "Sinopsis";    
    pelicula_sinopsis.appendChild(pelicula_sinopsis_h3);
    pelicula_sinopsis_p = document.createElement("p");
    pelicula_sinopsis.appendChild(pelicula_sinopsis_p);
    pelicula_sinopsis_p.textContent = pelicula_seleccionada.sinopsis;

    //peliculaH2_genero.textContent = peliculas[i].genero;
    //console.log(peliculas[i].genero);
    for(e=0; e<pelicula_seleccionada.genero.length; e++){ peliculaH2_com_genero.textContent += " "+pelicula_seleccionada.genero[e]}
    peliculaSpan_com = document.createElement("span_com");
    peliculaSpan_com.className = "anio_pelicula_com";
    peliculaSpan_com.textContent = pelicula_seleccionada.anio;

    principal.appendChild(miContenedor);
    miContenedor.appendChild(pelicula_com);
    pelicula_com.appendChild(imagen_com);
    pelicula_com.appendChild(peliculaDiv_com);
    peliculaDiv_com.appendChild(peliculaH3_com_titulo);
    peliculaDiv_com.appendChild(peliculaH2_com_titulo);
    peliculaDiv_com.appendChild(peliculaH3_com_director);
    peliculaDiv_com.appendChild(peliculaH2_com_director);
    peliculaDiv_com.appendChild(peliculaH3_com_genero);
    peliculaDiv_com.appendChild(peliculaH2_com_genero);
    pelicula_com.appendChild(peliculaSpan_com);
    miContenedor.appendChild(pelicula_sinopsis);

    pelicula_comentarios_h3 = document.createElement("h3");
    pelicula_comentarios_h3.className = "pelicula_comentarios_h3";
    pelicula_comentarios_h3.textContent = "Comentarios";  

    

    // carga y muestra de los comentarios

    comentarios_contenedor = document.createElement("div");
    comentarios_contenedor.className ="comentarios";
    miContenedor.appendChild(comentarios_contenedor);

    comentarios_contenedor.appendChild(pelicula_comentarios_h3);

    //filtrar los comentarios:
    comentarios_array = obtenerLosComentarios_array(pelicula_seleccionada.comentarios);
    comentarios_array.forEach(element => {
      	comentario_tag = document.createElement("article");
		comentario_tag.className = "comentario";
		comentario_tag.setAttribute("idComentario",element.id);
		comentario_p = document.createElement("p");
		comentario_p.className = "texto_com";
		comentario_p.textContent = element.texto;
		comentario_autor = document.createElement("h3");
		comentario_autor.className = "autor_com";
		comentario_autor.textContent = "Lo dijo @"+autor_del_comentario(pelicula_seleccionada.idUsuario);
		comentarios_contenedor.appendChild(comentario_tag);
		comentario_tag.appendChild(comentario_p);
		comentario_tag.appendChild(comentario_autor);
    });
	principal.appendChild(footer());
}

imprimir_home();

document.querySelectorAll(".pelicula").forEach(el => {
    el.addEventListener("click", e => {
      const id = e.target.getAttribute("idPelicula");
      //console.log("Se ha clickeado el id "+id);
      remove_tag_class("titular_de_contenedor");
      remove_tag_class("contenedor_resultados");
	  remove_tag_class("footer_div");
      //remove_tag_id_childrens("contenedor_resultados");
      cargarPeliculaYComentarios(id);
    });
  });

