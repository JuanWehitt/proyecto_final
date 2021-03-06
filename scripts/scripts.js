user = "";
userId = "";
peliculas = []
comentarios = []
texto_busqueda = ""
filtro_busqueda = "Director"

pagina = 1;

function imprimir_footer(){
	fetch("http://localhost:5000/")
	.then( resp => {
		//console.log(resp.status);
	})
	.then( resp => {
		footer_div = document.createElement("footer");
		footer_div.className = "footer_div";
		footer_div.id = "footer_div";
		footer_p = document.createElement("p");
		footer_p.textContent = "Juan y Fran Web Pages - 2022";
		footer_div.appendChild(footer_p);
		padre = document.getElementById("principal")
		padre.insertBefore(footer_div,null)
		//return footer_div;
	})
}

function clickEnIngresarSalir(){
	//console.log("entro en clickEnLogin");
	if (user != "") {
		//console.log("va a salir")
		user = ""
		userId = ""
		pagina = 1
		texto_busqueda = ""
		filtro_busqueda = "Director"
		remove_childrens_tag_id("encabezado")		
		imprimir_encabezado("")
		imprimir_peliculas("ultimas 10")
		remove_childrens_tag_class("div_barra_usuario")
		
		return 0
	}else{
		imprimir_peliculas("ultimas 10")
	}
	div_atras = document.getElementById("boton_atras_div")
	div_atras!=null? div_atras.remove() : null

	input_usuario_elem = document.getElementById("input_usuario")
	usuario_input = input_usuario_elem.value;
	input_contrasenia_elem = document.getElementById("input_contrasenia");
	contrasenia_input = input_contrasenia_elem.value;
	//console.log(contrasenia_input + " " + usuario_input);

	let requestOptions = {
		method: 'POST',
		headers:  { 'Content-Type': 'application/json' },
		body: JSON.stringify({ usuario: usuario_input, contrasenia: contrasenia_input })
	};
	fetch('http://localhost:5000/usuarios/', requestOptions)
		.then( resp => {
			//console.log(resp.status);
			datos = resp.json();
			if (resp.status==404){
				//no se pudo loguear, no se encuentra el usuario registrado.
				imprimir_mensaje_de_login("El usuario o la contraseña no son correctos");						
			}
			return datos;
		})
		.then( resp => {
			//console.log(resp)
			if ("nombre" in resp) {
				//console.log("login exitoso");
				userId = resp['id']
				user = resp['nombre']
				remove_childrens_tag_id("encabezado")			
				imprimir_encabezado(user)
				imprimir_barra_de_usuario()
				imprimir_peliculas("todas")
				
			}else{
				
			}
			
		})

}

function imprimir_encabezado(nombre){ 
	fetch("http://localhost:5000/")
	.then( resp => {
		//console.log(resp.status);
	})
	.then( resp => {
		imagen_logo = document.createElement("img")
		imagen_logo.className = "imagen_logo"
		imagen_logo.src = "images/logo.png"	
		imagen_logo.alt = "imagen del logo de la pagina"
		encabezado = document.getElementById("encabezado")
		encabezado.appendChild(imagen_logo)
		boton_login = document.createElement("button")
		boton_login.className = "boton_login_logout"
		boton_login.id = "boton_login_logout"

		if(user=="") {
			div_login = document.createElement("div")
			div_login.className = "login"
			div_login.id = "login"
			input_login = document.createElement("input")
			input_login.className = "input_usuario"
			input_login.id = "input_usuario"
			input_login.type="text"
			input_login.placeholder = "usuario"

			input_contrasenia = document.createElement("input")
			input_contrasenia.className = "input_contrasenia"
			input_contrasenia.id = "input_contrasenia"
			input_contrasenia.type = "password"
			input_contrasenia.placeholder = "Contraseña"

			div_login.appendChild(input_login)
			div_login.appendChild(input_contrasenia)

			boton_login.textContent = "Ingresar"

			encabezado.appendChild(div_login)
			encabezado.appendChild(boton_login)

			//acciones del boton ingresar/salir
			

		}else {
			boton_login.textContent = "Salir"
			bienvenida_p = document.createElement("p")
			bienvenida_p.className = "bienvenida_usuario"
			bienvenida_p.textContent = "Hola " + nombre + "!"
			encabezado.appendChild(bienvenida_p)
			encabezado.appendChild(boton_login)
		}
		document.querySelector(".boton_login_logout").addEventListener("click", clickEnIngresarSalir, false);
	})
	.catch(function(error) {
		console.log('Hubo un problema con la petición Fetch:' + error.message);
		error_p = document.createElement("p")
		error_p.textContent = "ups! no hay conexion con el servidor"
		encabezado = document.getElementById("encabezado")
		error_p.className = "conexion_error"		
		encabezado.appendChild(error_p)
	  });
	
}

function imprimir_boton_limpiar(){
	input_busqueda = document.getElementById("input_busqueda")
	combo_box_busqueda = document.getElementById("combo_box_busqueda")
	boton_limpiar_busqueda = document.getElementById("boton_limpiar_busqueda")
	//console.log(boton_limpiar_busqueda);
	if (boton_limpiar_busqueda==null) {
		boton_limpiar_busqueda = document.createElement("button")
		boton_limpiar_busqueda.className = "boton_limpiar_busqueda"
		boton_limpiar_busqueda.id = "boton_limpiar_busqueda"
		boton_limpiar_busqueda.title = "Borrar la busqueda"
		img_limpiar_busqueda = document.createElement("img")
		img_limpiar_busqueda.src = "images/clean_search.png"
		img_limpiar_busqueda.alt = "images/clean_search.png"		
		boton_limpiar_busqueda.appendChild(img_limpiar_busqueda)
		mensaje_p = document.getElementById("mensaje_busqueda")
		div_busqueda.insertBefore(boton_limpiar_busqueda,mensaje_p)
		
	}
	boton_limpiar_busqueda.addEventListener("click",() => {
		texto_busqueda = ""
		input_busqueda.value = ""
		filtro_busqueda = "Director"
		combo_box_busqueda = document.getElementById("combo_box_busqueda")		
		combo_box_busqueda.value = filtro_busqueda
		imprimir_peliculas("todas")
		boton_limpiar_busqueda.remove()
	})
}

function clickEnBuscar(){
	input_busqueda = document.getElementById("input_busqueda")
	mensaje_p = document.getElementById("mensaje_busqueda")
	if (input_busqueda.value == "") {		
		mensaje_p.textContent = "Ingrese un nombre por favor"		
	}else{
		texto_busqueda = input_busqueda.value
		mensaje_p.textContent = ""		
		combo_box_busqueda = document.getElementById("combo_box_busqueda")
		
		//console.log(texto_busqueda);

		imprimir_boton_limpiar()
		
		//console.log(combo_box.value);
		if (combo_box_busqueda.value=="Director"){	
			filtro_busqueda = "Director"
		}else if (combo_box_busqueda.value=="Titulo"){
			filtro_busqueda = "Titulo"
		}
		pagina = 1
		imprimir_peliculas(filtro_busqueda)
	}

}


function imprimir_barra_de_usuario() {
	div_barra_usuario = document.createElement("div")
	div_barra_usuario.className = "div_barra_usuario"
	div_barra_usuario.id = "div_barra_usuario"

	div_busqueda = document.createElement("div")
	div_busqueda.className = "barra_de_busqueda"
	div_busqueda.id = "barra_de_busqueda"
	input_busqueda = document.createElement("input")
	input_busqueda.className = "input_busqueda"
	input_busqueda.id = "input_busqueda"
	input_busqueda.type="text"
	input_busqueda.placeholder = "Nombre"

	combo_box_busqueda = document.createElement("select")
	combo_box_busqueda.className = "combo_box_busqueda"
	combo_box_busqueda.id = "combo_box_busqueda"

	combo_box_busqueda.name = "combo_box_busqueda"
	option_director = document.createElement("option")
	option_director.value = "Director"
	option_director.textContent = "Director"
	option_titulo = document.createElement("option")
	option_titulo.value = "Titulo"
	option_titulo.textContent = "Titulo"
	option_director.selected = true

	boton_buscar = document.createElement("button")
	boton_buscar.className = "boton_buscar"
	boton_buscar.id = "boton_buscar"
	imagen_buscar = document.createElement("img")
	imagen_buscar.className = "imagen_buscar"
	imagen_buscar.id = "imgen_buscar"
	imagen_buscar.src = "images/search.png"
	imagen_buscar.alt = "imagen del boton de busqueda"
	principal = document.getElementById("principal")
	contenedor_resultados = document.getElementById("contenedor_resultados")
	principal.insertBefore(div_barra_usuario,contenedor_resultados)
	div_busqueda.appendChild(input_busqueda)

	combo_box_busqueda.appendChild(option_titulo)
	combo_box_busqueda.appendChild(option_director)
	div_busqueda.appendChild(combo_box_busqueda)
	boton_buscar.appendChild(imagen_buscar)
	div_busqueda.appendChild(boton_buscar)
	mensaje_p = document.createElement("p")
	mensaje_p.className = "mensaje_busqueda"
	mensaje_p.id = "mensaje_busqueda"
	//barra_busqueda = document.getElementById("barra_de_busqueda")
	div_busqueda.appendChild(mensaje_p)
	
	input_busqueda.value = texto_busqueda
	
	combo_box_busqueda.value = filtro_busqueda
	if (texto_busqueda!=""){
		imprimir_boton_limpiar()		
	}/*else{
		imprimir_peliculas("todas")
	}*/
	div_barra_usuario.appendChild(div_busqueda)
	boton_buscar.addEventListener("click",clickEnBuscar,false)

	boton_agregar_pelicula = document.createElement("button")
	boton_agregar_pelicula.className = "boton_agregar_pelicula"
	boton_agregar_pelicula.id = "boton_agregar_pelicula"
	boton_agregar_pelicula.textContent = "+"
	boton_agregar_pelicula.title = "Agregar película"
	div_barra_usuario.appendChild(boton_agregar_pelicula)

	boton_agregar_pelicula.addEventListener("click", () => {

		div_barra_usuario.remove()
		remove_childrens_tag_id("contenedor_resultados")	

		div_nueva_pelicula = document.createElement("div")		
		div_nueva_pelicula.className = "div_nueva_pelicula"
		div_nueva_pelicula.id = "div_nueva_pelicula"
		titular_nueva_pelicula = document.createElement("h3")
		titular_nueva_pelicula.className = "titular_nueva_pelicula"
		titular_nueva_pelicula.textContent = "Agregar una película"

		div_formulario_nueva_pelicula = document.createElement("div")
		div_formulario_nueva_pelicula.className = "div_formulario_nueva_pelicula"

		label_titulo = document.createElement("label")
		label_titulo.for = "input_titulo_nueva_pelicula"
		label_titulo.textContent = "Título"
		input_titulo_nueva_pelicula = document.createElement("input")
		input_titulo_nueva_pelicula.className = "inputs_nueva_pelicula"
		input_titulo_nueva_pelicula.name ="input_titulo_nueva_pelicula"
		div_formulario_nueva_pelicula.appendChild(label_titulo)
		div_formulario_nueva_pelicula.appendChild(input_titulo_nueva_pelicula)

		label_director = document.createElement("label")
		label_director.for = "select_director_nueva_pelicula"
		label_director.textContent = "Director"
		select_director_nueva_pelicula = document.createElement("select")
		select_director_nueva_pelicula.className = "inputs_nueva_pelicula"
		select_director_nueva_pelicula.name ="select_director_nueva_pelicula"
		div_formulario_nueva_pelicula.appendChild(label_director)
		div_formulario_nueva_pelicula.appendChild(select_director_nueva_pelicula)

		label_genero = document.createElement("label")
		label_genero.for = "select_genero_nueva_pelicula"
		label_genero.textContent = "Género (seleccione varios con Ctrl)"
		select_genero_nueva_pelicula = document.createElement("select")
		select_genero_nueva_pelicula.className = "inputs_nueva_pelicula"
		select_genero_nueva_pelicula.name ="select_genero_nueva_pelicula"
		select_genero_nueva_pelicula.id ="select_genero_nueva_pelicula"
		div_formulario_nueva_pelicula.appendChild(label_genero)
		div_formulario_nueva_pelicula.appendChild(select_genero_nueva_pelicula)		
		fetch('http://localhost:5000/generos/')
		.then( resp => {
			//console.log(resp.status);
			datos = resp.json();
			return datos;
		})
		.then( resp => {
			//console.log(resp.length);
			resp.forEach(element => {
				//console.log(element);
				option_genero = document.createElement("option")
				//option_genero.id = element.nombre
				//option_director = document.createElement("option")
				//option_genero.placeholder = "Seleccione"
				option_genero.value = element.nombre
				option_genero.textContent = element.nombre
				select_genero_nueva_pelicula.multiple = "multiple"
				select_genero_nueva_pelicula.name = "select_genero_nueva_pelicula[]"
				select_genero_nueva_pelicula.appendChild(option_genero)
			});
			
			//select_genero_nueva_pelicula.
		})
		fetch('http://localhost:5000/directores/')
		.then( resp => {
			datos = resp.json();
			return datos;
		})
		.then( resp => {
			resp.forEach(element => {
				option_director = document.createElement("option")
				option_director.value = element.nombre
				option_director.textContent = element.nombre
				select_director_nueva_pelicula.appendChild(option_director)
			});
		})

		label_anio = document.createElement("label")
		label_anio.for = "input_anio_nueva_pelicula"
		label_anio.textContent = "Año"
		input_anio_nueva_pelicula = document.createElement("input")
		input_anio_nueva_pelicula.className = "inputs_nueva_pelicula"
		input_anio_nueva_pelicula.name ="input_anio_nueva_pelicula"
		div_formulario_nueva_pelicula.appendChild(label_anio)
		div_formulario_nueva_pelicula.appendChild(input_anio_nueva_pelicula)

		label_imagen = document.createElement("label")
		label_imagen.for = "input_anio_nueva_pelicula"
		label_imagen.textContent = "Imagen"
		input_imagen_nueva_pelicula = document.createElement("input")
		input_imagen_nueva_pelicula.className = "inputs_nueva_pelicula"
		input_imagen_nueva_pelicula.name ="input_anio_nueva_pelicula"
		input_imagen_nueva_pelicula.placeholder = "link de la imagen"
		div_formulario_nueva_pelicula.appendChild(label_imagen)
		div_formulario_nueva_pelicula.appendChild(input_imagen_nueva_pelicula)

		label_sinopsis = document.createElement("label")
		label_sinopsis.for = "input_anio_nueva_pelicula"
		label_sinopsis.textContent = "Sinopsis"
		input_sinopsis_nueva_pelicula = document.createElement("textarea")
		input_sinopsis_nueva_pelicula.rows = "5"
		input_sinopsis_nueva_pelicula.className = "inputs_nueva_pelicula"
		input_sinopsis_nueva_pelicula.name ="input_anio_nueva_pelicula"
		div_formulario_nueva_pelicula.appendChild(label_sinopsis)
		div_formulario_nueva_pelicula.appendChild(input_sinopsis_nueva_pelicula)

		div_botones_aceptar_cancelar = document.createElement("div")
		div_botones_aceptar_cancelar.className = "div_botones_aceptar_cancelar"
		boton_cancelar_nueva_pelicula = document.createElement("button")
		boton_cancelar_nueva_pelicula.textContent = "Cancelar"
		boton_aceptar_nueva_pelicula = document.createElement("button")
		boton_aceptar_nueva_pelicula.textContent = "Aceptar"
		div_botones_aceptar_cancelar.appendChild(boton_cancelar_nueva_pelicula)
		div_botones_aceptar_cancelar.appendChild(boton_aceptar_nueva_pelicula)
		div_formulario_nueva_pelicula.appendChild(div_botones_aceptar_cancelar)

		//principal = document.getElementById("principal")
		contenedor_resultados.appendChild(div_nueva_pelicula)

		footer_div = document.getElementById("footer_div")
		//principal.insertBefore(div_nueva_pelicula, footer_div)
		div_nueva_pelicula.appendChild(titular_nueva_pelicula)
		div_nueva_pelicula.appendChild(div_formulario_nueva_pelicula)

		boton_cancelar_nueva_pelicula.addEventListener("click", () => {
			div_nueva_pelicula.remove()
			imprimir_barra_de_usuario()
			imprimir_peliculas("todas")
		})
		boton_aceptar_nueva_pelicula.addEventListener("click", () => {
			lista3 = []
			a = Array.from(select_genero_nueva_pelicula.options)
			lista2 = a.filter(function(element){ return element.selected})
			lista3 = lista2.map(function(element){ return element.value})
			faltan_datos = false			
			if (input_titulo_nueva_pelicula.value=="" || lista3.length==0 || input_anio_nueva_pelicula.value=="" ){
				faltan_datos = true
			}
			let requestOptions = {
				method: 'POST',
				headers:  { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					titulo: input_titulo_nueva_pelicula.value,
					genero: lista3,
					director: select_director_nueva_pelicula.value,
					anio: input_anio_nueva_pelicula.value,
					imagen: input_imagen_nueva_pelicula.value,
					sinopsis: input_sinopsis_nueva_pelicula.value,
					idUsuario: userId,					
				 })
			}
			if (!faltan_datos) {
				fetch("http://localhost:5000/peliculas/",requestOptions)
					.then(
						resp => {
							datos = resp.json()
							return datos
						})
					.then( resp => {
						//console.log(resp);
						div_nueva_pelicula.remove()
						imprimir_barra_de_usuario()
						//console.log(filtro_busqueda);
						imprimir_peliculas("todas")
					})
			}else{
				mensaje_p = document.getElementById("mensaje_p")
				if (mensaje_p==null) {
					mensaje_p = document.createElement("p")
					mensaje_p.id = "mensaje_p"
				}
				mensaje_p.textContent = " Faltan completar datos"
				div_formulario_nueva_pelicula.insertBefore(mensaje_p,div_botones_aceptar_cancelar)

			}	
		})

	})
}

//imprime en pantalla las peliculas segun el filtro de entrada. 
//Las ultimas 10 ("ultimas 10")
//Todas las peliculas ("todas")
//Las peliculas por "Director", filtra segun el campo de busqueda
//Las peliculas por "Titulo", filtra segun el campo de busqueda
function imprimir_peliculas(filtro){
	fetch("http://localhost:5000/peliculas/")
		.then( resp => {
			if (resp.status==200) {
				datos = resp.json();								
			}else if (resp.status==404){
				datos = []
			}
			return datos;
		})
		.then( resp => {
			peliculas = resp					
			remove_childrens_tag_id("contenedor_resultados")			
			miContenedor = document.getElementById("contenedor_resultados")
			titulo_div = document.createElement("div");
			titulo_div.id = "titulo_contenedor_resultados"
			titulo_p = document.createElement("p");
			titulo_div.className ="titular_de_contenedor";
			
			titulo_div.appendChild(titulo_p);
			miContenedor.appendChild(titulo_div);			
			
			if (filtro=="ultimas 10"){
				peliculas.length<10? cant=peliculas.length : cant = 10;
				peliculas_filtradas = peliculas				
				titulo_p.textContent = "Últimas 10 películas";
			}else if (filtro=="todas"){
				cant = peliculas.length;
				titulo_div = document.getElementById("titulo_contenedor_resultados")	
				titulo_div.textContent = "Todas las peliculas"	
				peliculas_filtradas = peliculas				
			}else if (filtro=="Director"){				
				input_busqueda = document.getElementById("input_busqueda")
				peliculas_filtradas = peliculas.filter((pelicula) => pelicula['director']==input_busqueda.value)
				if (peliculas_filtradas.length == 1 )
					titulo_p.textContent = "Se encontro 1 pelicula";
				else if (peliculas_filtradas.length != 0){
					titulo_p.textContent = "Se encontraron "+peliculas_filtradas.length+" peliculas";
				}
				else {
					titulo_p.textContent = "No se encontraron peliculas "
				}
				cant = peliculas_filtradas.length;
			}else {
				//filtro es titulo
				input_busqueda = document.getElementById("input_busqueda")
				peliculas_filtradas = peliculas.filter((pelicula) => pelicula['titulo']==input_busqueda.value)
				if (peliculas_filtradas.length == 1 )
					titulo_p.textContent = "Se encontro 1 pelicula";
				else if (peliculas_filtradas.length != 0){
					titulo_p.textContent = "Se encontraron "+peliculas_filtradas.length+" peliculas";
				}
				else {
					titulo_p.textContent = "No se encontraron peliculas "
				}
				cant = peliculas_filtradas.length;
			}

			
			for (i=0; i<cant; i++){
				//segun la variable global pagina, imprime de a cuatro peliculas.
				//la pelicula 1(0) es de la pagina 1 porque esta entre 0 y 4
				//la pelicula 5(4) es de la pagina 2 porque esta entre 4 y 8

				if ((pagina-1)*4 < i+1 && i+1 <= pagina*4){
					//imprime la pelicula
					
					//console.log(i);
					peliculaElement = document.createElement("article");
					peliculaElement.className ="pelicula";
					peliculaElement.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaImg = document.createElement("img");
					peliculas_filtradas[i].imagen==""? peliculaImg.src="images/no-image.jpg" : peliculaImg.src = peliculas_filtradas[i].imagen		
					peliculaImg.className = "imagen_pelicula";
					peliculaImg.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaDiv = document.createElement("div");
					peliculaDiv.className = "info_pelicula";  
					peliculaDiv.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaH3_titulo = document.createElement("h3");
					peliculaH3_titulo.className="labels_pelicula";
					peliculaH3_titulo.textContent = "Título";
					peliculaH3_titulo.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaH2_titulo = document.createElement("h2");
					peliculaH2_titulo.className="nombre_pelicula";
					peliculaH2_titulo.textContent = peliculas_filtradas[i].titulo;
					peliculaH2_titulo.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaH3_director = document.createElement("h3");
					peliculaH3_director.className="labels_pelicula";
					peliculaH3_director.textContent = "Director";
					peliculaH3_director.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaH2_director = document.createElement("h2");
					peliculaH2_director.className="nombre_director";
					peliculaH2_director.textContent = peliculas_filtradas[i].director;
					peliculaH2_director.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaH3_genero = document.createElement("h3");
					peliculaH3_genero.className="labels_pelicula";
					peliculaH3_genero.textContent = "Genero";
					peliculaH3_genero.setAttribute("idPelicula",peliculas_filtradas[i].id);
					peliculaH2_genero = document.createElement("h2");
					peliculaH2_genero.className="nombre_genero"; 
					peliculaH2_genero.setAttribute("idPelicula",peliculas_filtradas[i].id);

					for(e=0; e<peliculas_filtradas[i].genero.length; e++){
						 peliculaH2_genero.textContent += " "+peliculas_filtradas[i].genero[e]
						}
					
					peliculaSpan = document.createElement("span");
					peliculaSpan.className = "anio_pelicula";
					peliculaSpan.textContent = peliculas_filtradas[i].anio; 
					peliculaSpan.setAttribute("idPelicula",peliculas_filtradas[i].id);

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
			}			

			document.querySelectorAll(".pelicula").forEach(el => {
				el.addEventListener("click", e => {
				const id = e.target.getAttribute("idPelicula");
				remove_childrens_tag_class("titular_de_contenedor");
				remove_childrens_tag_id("contenedor_resultados");				
				remove_childrens_tag_class("div_barra_usuario")
				imprimirPeliculaYComentarios(id);
				});
			});

			if (cant>4){		
				//si la cantidad de peliculas filtradas para imprimir son mayor a 4 imprimo los botones siguiente y anterior
				btnAnterior = document.createElement("button")
				btnSiguiente = document.createElement("button")
				btnSiguiente.id = "btnSiguiente"
				btnAnterior.id = "btnAnterior"
				btnSiguiente.textContent = "Siguiente"
				btnAnterior.textContent = "Anterior"

				div_botones_sig_ant = document.createElement("div")

				p_pagina = document.createElement("p")
				p_pagina.id = "p_pagina"
				cant_paginas = Math.ceil(cant/4)
				p_pagina.textContent = pagina+"/"+cant_paginas

				div_paginacion = document.createElement("div")
				div_paginacion.className = "paginacion"

				div_paginacion.appendChild(p_pagina)
				div_botones_sig_ant.appendChild(btnAnterior)
				div_botones_sig_ant.appendChild(btnSiguiente)
				div_paginacion.appendChild(div_botones_sig_ant)
				miContenedor.appendChild(div_paginacion)

				btnSiguiente.addEventListener('click', () => {
					if(pagina < cant_paginas){
						pagina += 1;
						p_pagina.textContent = pagina+"/"+cant_paginas
						if (user!="") {						
							if (texto_busqueda=="")
								imprimir_peliculas("todas")				
							else
								imprimir_peliculas(filtro_busqueda)
							}
						else
							imprimir_peliculas("ultimas 10")
						
					}
				});
				
				btnAnterior.addEventListener('click', () => {
					if(pagina > 1){
						pagina -= 1;
						p_pagina.textContent = pagina+"/"+cant_paginas
						if (user!="") {							
							if (texto_busqueda=="")
								imprimir_peliculas("todas")				
							else
								imprimir_peliculas(filtro_busqueda)
							}
						else
							imprimir_peliculas("ultimas 10")
					}
				});
			}

		});
}

//Elimina los nodos hijos del padre con una clase que ingresa en el parametro de entrada.
function remove_childrens_tag_class(clase){
	let elemento = document.getElementsByClassName(clase);
	while(elemento[0]){
		elemento[0].remove();
	}
}

//Elimina los nodos hijos del padre con id que ingresa en el parametro de entrada.
function remove_childrens_tag_id(id){
  	// Eliminando todos los hijos de un elemento
	  //console.log(id);
  	let elemento = document.getElementById(id);
  	while (elemento.firstChild) {
    	elemento.removeChild(elemento.firstChild);
  	}
}

//Imprime un texto que entra como parametro, en el encabezado
function imprimir_mensaje_de_login(texto){
	div_login = document.getElementById("login");
	texto_p = document.getElementById("status_login")
	if(texto_p!=null){
		texto_p.textContent = texto;
	}else{
		texto_p = document.createElement("p");
		texto_p.className = "status_login";
		texto_p.id = "status_login";
		texto_p.textContent = texto;
		div_login.appendChild(texto_p);
	}

}

  ///muestra la pelicula seleccionada segu el id de entrada y los comentarios asociados.
  function imprimirPeliculaYComentarios(id){
	fetch("http://localhost:5000/peliculas/comentarios/"+id)
		.then(
			resp => {
				datos = resp.json()
				return datos
			})
		.then( resp => {			
			comentarios = resp
			const pelicula_seleccionada = peliculas.find(function(element) {
				return element.id == id;
			  });			  
			principal = document.getElementById("principal");
			boton_atras_div = document.createElement("div");
			boton_atras_div.className = "boton_atras_div";
			boton_atras_div.id = "boton_atras_div";
			boton_atras_img = document.createElement("img");
			boton_atras_img.src = "images/atras.png";
			boton_atras_img.alt="img atras";
			boton_atras_p = document.createElement("p");
			boton_atras_p.textContent = "Atrás";
		
			contenedor_resultados = document.getElementById("contenedor_resultados")
			boton_atras_div.appendChild(boton_atras_img);
			boton_atras_div.appendChild(boton_atras_p);
		
			boton_atras_div.onclick = function(){
				remove_childrens_tag_class("div_atras_y_botones");
				if (user!="") {
					imprimir_barra_de_usuario();
					if (texto_busqueda=="")
						imprimir_peliculas("todas")				
					else
						imprimir_peliculas(filtro_busqueda)
					}
				else
					imprimir_peliculas("ultimas 10")				
				
			}

			pelicula_com = document.createElement("div");
			pelicula_com.className = "pelicula_com";
			imagen_com = document.createElement("img");
			imagen_com.className = "imagen_pelicula_com";
			pelicula_seleccionada.imagen==""? imagen_com.src = "images/no-image.jpg" : imagen_com.src = pelicula_seleccionada.imagen;			
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
		
			for(e=0; e<pelicula_seleccionada.genero.length; e++){ peliculaH2_com_genero.textContent += pelicula_seleccionada.genero[e]+", "}
			//console.log(peliculaH2_com_genero.textContent[peliculaH2_com_genero.textContent.length-2]);
			cadena = peliculaH2_com_genero.textContent.slice(0,peliculaH2_com_genero.textContent.length-2);
			peliculaH2_com_genero.textContent = cadena
			peliculaSpan_com = document.createElement("span_com");
			peliculaSpan_com.className = "anio_pelicula_com";
			peliculaSpan_com.textContent = pelicula_seleccionada.anio;
		
			//principal.appendChild(contenedor_resultados);
			contenedor_resultados.appendChild(pelicula_com);
			pelicula_com.appendChild(imagen_com);
			pelicula_com.appendChild(peliculaDiv_com);
			peliculaDiv_com.appendChild(peliculaH3_com_titulo);
			peliculaDiv_com.appendChild(peliculaH2_com_titulo);
			peliculaDiv_com.appendChild(peliculaH3_com_director);
			peliculaDiv_com.appendChild(peliculaH2_com_director);
			peliculaDiv_com.appendChild(peliculaH3_com_genero);
			peliculaDiv_com.appendChild(peliculaH2_com_genero);
			pelicula_com.appendChild(peliculaSpan_com);
			contenedor_resultados.appendChild(pelicula_sinopsis);

			div_atras_y_botones = document.createElement("div")
			div_atras_y_botones.className = "div_atras_y_botones"
			
			//principal.insertBefore(div_atras_y_botones,contenedor_resultados)
			contenedor_resultados.insertAdjacentElement("afterbegin",div_atras_y_botones)
			
			div_botones_editar_eliminar_pelicula = document.createElement("div")
			div_botones_editar_eliminar_pelicula.className = "div_botones_editar_eliminar_pelicula"
			div_atras_y_botones.appendChild(boton_atras_div)
			div_atras_y_botones.appendChild(div_botones_editar_eliminar_pelicula)
			
			//impresion de los botones de eliminar pelicula y modificar pelicula
			// si el usuario esta logueado 
			if (userId!="") {
				//el usuario registrado puede editar la pelicula
				btn_editar = document.createElement("button")				
				div_botones_editar_eliminar_pelicula.appendChild(btn_editar)
				btn_editar.textContent = "Editar"
				//verifica si existen comentarios de otros usuarios en la pelicula.
				hay_com_de_otros = false
				for (i=0; i<comentarios.length; i++){
					if (comentarios[i].idUsuario!=userId){
						hay_com_de_otros = true
					}
				}
				//si no ha comentarios de otros usuarios, puede eliminar la pelicula
				if (!hay_com_de_otros){			
					btn_eliminar = document.createElement("button")				
					div_botones_editar_eliminar_pelicula.appendChild(btn_eliminar)
					btn_eliminar.textContent = "Eliminar"					
					btn_eliminar.addEventListener("click", () => {
						//peticion al servidor para eliminar la pelicula		
						let requestOptions = {
							method: 'DELETE',
							headers:  { 'Content-Type': 'application/json' },
						}				
						fetch("http://localhost:5000/peliculas/"+id, requestOptions)
						.then( resp => {
							datos = resp.json()
						})
						.then( resp => {
							div_atras_y_botones.remove()
							remove_childrens_tag_id("contenedor_resultados")
							imprimir_barra_de_usuario();
							pagina = 1
							if (texto_busqueda=="")
								imprimir_peliculas("todas")				
							else
								imprimir_peliculas(filtro_busqueda)						
						})
						
					})
				}
				// puede editar si esta logueado
				btn_editar.addEventListener("click", () => {
					div_atras_y_botones.remove()
					remove_childrens_tag_id("contenedor_resultados")	
					contenedor_resultados = document.getElementById("contenedor_resultados")
					div_pelicula = document.createElement("div")						
					div_pelicula.className = "div_nueva_pelicula"
					div_pelicula.id = "div_nueva_pelicula"
					div_pelicula.style.backgroundImage = "url("+pelicula_seleccionada.imagen+")"
					titular_pelicula = document.createElement("h3")
					titular_pelicula.className = "titular_nueva_pelicula"
					titular_pelicula.textContent = "Editar película"
			
					div_formulario_pelicula = document.createElement("div")
					div_formulario_pelicula.className = "div_formulario_nueva_pelicula"
			
					label_titulo = document.createElement("label")
					label_titulo.for = "input_titulo_nueva_pelicula"
					label_titulo.textContent = "Título"
					input_titulo_pelicula = document.createElement("input")
					input_titulo_pelicula.className = "inputs_nueva_pelicula"
					input_titulo_pelicula.name ="input_titulo_nueva_pelicula"
					input_titulo_pelicula.value = pelicula_seleccionada.titulo
					div_formulario_pelicula.appendChild(label_titulo)
					div_formulario_pelicula.appendChild(input_titulo_pelicula)
			
					label_director = document.createElement("label")
					label_director.for = "select_director_nueva_pelicula"
					label_director.textContent = "Director"
					select_director_pelicula = document.createElement("select")
					select_director_pelicula.className = "inputs_nueva_pelicula"
					select_director_pelicula.name ="select_director_nueva_pelicula"

					div_formulario_pelicula.appendChild(label_director)
					div_formulario_pelicula.appendChild(select_director_pelicula)
					//solicita los directores al servidor
					fetch('http://localhost:5000/directores/')
					.then( resp => {
						datos = resp.json();
						return datos;
					})
					.then( resp => {
						resp.forEach(element => {
							option_director = document.createElement("option")
							option_director.value = element.nombre
							option_director.textContent = element.nombre
							select_director_pelicula.appendChild(option_director)
						});
						select_director_pelicula.value = pelicula_seleccionada.director							
					})
			
					label_genero = document.createElement("label")
					label_genero.for = "select_genero_nueva_pelicula"
					label_genero.textContent = "Género (seleccione varios con Ctrl)"
					select_genero_pelicula = document.createElement("select")
					select_genero_pelicula.className = "inputs_nueva_pelicula"
					select_genero_pelicula.name ="select_genero_nueva_pelicula"
					select_genero_pelicula.id ="select_genero_nueva_pelicula"
					div_formulario_pelicula.appendChild(label_genero)
					div_formulario_pelicula.appendChild(select_genero_pelicula)		
					//obtiene los generos de la api
					fetch('http://localhost:5000/generos/')
					.then( resp => {						
						datos = resp.json();
						return datos;
					})
					.then( resp => {						
						resp.forEach(element => {							
							option_genero = document.createElement("option")							
							option_genero.value = element.nombre
							option_genero.textContent = element.nombre
							select_genero_pelicula.multiple = "multiple"
							select_genero_pelicula.name = "select_genero_nueva_pelicula[]"
							select_genero_pelicula.appendChild(option_genero)
							//selecciona los correspondientes a la pelicula selecionada para editar
							pelicula_seleccionada.genero.indexOf(element.nombre)!=-1 ? option_genero.selected = true: option_genero.selected = false
						});						
					})
					
			
					label_anio = document.createElement("label")
					label_anio.for = "input_anio_nueva_pelicula"
					label_anio.textContent = "Año"
					input_anio_pelicula = document.createElement("input")
					input_anio_pelicula.className = "inputs_nueva_pelicula"
					input_anio_pelicula.name ="input_anio_nueva_pelicula"

					input_anio_pelicula.value = pelicula_seleccionada.anio
					div_formulario_pelicula.appendChild(label_anio)
					div_formulario_pelicula.appendChild(input_anio_pelicula)
			
					label_imagen = document.createElement("label")
					label_imagen.for = "input_anio_nueva_pelicula"
					label_imagen.textContent = "Imagen"
					input_imagen_pelicula = document.createElement("input")
					input_imagen_pelicula.className = "inputs_nueva_pelicula"
					input_imagen_pelicula.name ="input_anio_nueva_pelicula"
					input_imagen_pelicula.value = pelicula_seleccionada.imagen
					input_imagen_pelicula.placeholder = "link de la imagen"					
					div_formulario_pelicula.appendChild(label_imagen)
					div_formulario_pelicula.appendChild(input_imagen_pelicula)
			
					label_sinopsis = document.createElement("label")
					label_sinopsis.for = "input_anio_nueva_pelicula"
					label_sinopsis.textContent = "Sinopsis"
					input_sinopsis_pelicula = document.createElement("textarea")
					input_sinopsis_pelicula.rows = "5"
					input_sinopsis_pelicula.className = "inputs_nueva_pelicula"
					input_sinopsis_pelicula.name ="input_anio_nueva_pelicula"
					input_sinopsis_pelicula.textContent = pelicula_seleccionada.sinopsis
					div_formulario_pelicula.appendChild(label_sinopsis)
					div_formulario_pelicula.appendChild(input_sinopsis_pelicula)
			
					div_botones_aceptar_cancelar = document.createElement("div")
					div_botones_aceptar_cancelar.className = "div_botones_aceptar_cancelar"
					boton_cancelar_pelicula = document.createElement("button")
					boton_cancelar_pelicula.textContent = "Cancelar"
					boton_aceptar_pelicula = document.createElement("button")
					boton_aceptar_pelicula.textContent = "Aceptar"
					div_botones_aceptar_cancelar.appendChild(boton_cancelar_pelicula)
					div_botones_aceptar_cancelar.appendChild(boton_aceptar_pelicula)
					div_formulario_pelicula.appendChild(div_botones_aceptar_cancelar)
			
					principal = document.getElementById("principal")
					footer_div = document.getElementById("footer_div")
					//principal.insertBefore(div_pelicula, footer_div)
					contenedor_resultados.appendChild(div_pelicula)
					div_pelicula.appendChild(titular_pelicula)
					div_pelicula.appendChild(div_formulario_pelicula)
			
					boton_cancelar_pelicula.addEventListener("click", () => {
						div_pelicula.remove()
						imprimirPeliculaYComentarios(id)
					})
					boton_aceptar_pelicula.addEventListener("click", () => {
						//verificacion de seleccion de un genero
						lista_generos = []
						opciones = Array.from(select_genero_pelicula.options)
						opciones_seleccionadas = opciones.filter(function(element){ return element.selected})
						lista_generos = opciones_seleccionadas.map(function(element){ return element.value})
						faltan_datos = false			
						if (input_titulo_pelicula.value=="" || lista_generos.length==0 || input_anio_pelicula.value=="" ){
							faltan_datos = true
						}
						let requestOptions = {
							method: 'PUT',
							headers:  { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								titulo: input_titulo_pelicula.value,
								genero: lista_generos,
								director: select_director_pelicula.value,
								anio: input_anio_pelicula.value,
								imagen: input_imagen_pelicula.value,
								sinopsis: input_sinopsis_pelicula.value,																					
							 })
						}
						if (!faltan_datos) {
							fetch("http://localhost:5000/peliculas/"+id,requestOptions)
								.then(
									resp => {
										datos = resp.json()
										return datos
									})
								.then( resp => {
									pelicula_seleccionada.titulo = input_titulo_pelicula.value
									pelicula_seleccionada.genero = lista_generos
									pelicula_seleccionada.director = select_director_pelicula.value
									pelicula_seleccionada.anio = input_anio_pelicula.value
									pelicula_seleccionada.imagen = input_imagen_pelicula.value
									pelicula_seleccionada.sinopsis = input_sinopsis_pelicula.value
									div_pelicula.remove()
									imprimirPeliculaYComentarios(id)

								})
						}else{
							mensaje_p = document.getElementById("mensaje_p")
							if (mensaje_p==null) {
								mensaje_p = document.createElement("p")
								mensaje_p.id = "mensaje_p"
							}
							mensaje_p.textContent = " Faltan completar datos"
							div_formulario_pelicula.insertBefore(mensaje_p,div_botones_aceptar_cancelar)
			
						}	
					})
				})//fin click editar pelicula
				
			}

		
			pelicula_comentarios_h3 = document.createElement("h3");
			pelicula_comentarios_h3.className = "pelicula_comentarios_h3";
			pelicula_comentarios_h3.textContent = "Comentarios";  

			// carga y muestra de los comentarios
		
			comentarios_contenedor = document.createElement("div");
			comentarios_contenedor.className ="comentarios_contenedor";

			comentarios_cabecera = document.createElement("div")
			comentarios_cabecera.className ="comentarios_cabecera";
			comentarios_cabecera.appendChild(pelicula_comentarios_h3)

			div_lista_de_comentarios = document.createElement("div")
			div_lista_de_comentarios.className = "div_lista_de_comentarios"

			contenedor_resultados.appendChild(comentarios_contenedor);
			comentarios_contenedor.appendChild(comentarios_cabecera)
			comentarios_contenedor.appendChild(div_lista_de_comentarios)

			if (user!=""){
				boton_agregar_comentario = document.createElement("button")
				boton_agregar_comentario.className = "boton_agregar_comentario"
				boton_agregar_comentario.id ="boton_agregar_comentario"				
				boton_agregar_comentario.textContent = "+"
				comentarios_cabecera.appendChild(boton_agregar_comentario)
				boton_agregar_comentario.addEventListener("click", () => {
					div_nuevo_comentario = document.createElement("div")
					div_nuevo_comentario.className = "div_nuevo_comentario"
					div_nuevo_comentario.id = "div_nuevo_comentario"
					input_comentario = document.createElement("textarea")
					input_comentario.className = "input_comentario"
					input_comentario.id = "input_comentario"
					input_comentario.type = "text"
					input_comentario.rows = "5"					
					div_botones_nuevo_comentario = document.createElement("div")
					div_botones_nuevo_comentario.className = "div_botones_nuevo_comentario"
					boton_cancelar = document.createElement("button")
					boton_cancelar.textContent = "Cancelar"
					boton_cancelar.className = "boton_cancelar"
					boton_aceptar = document.createElement("button")
					boton_aceptar.textContent = "Aceptar"
					boton_aceptar.className = "boton_aceptar"
					div_botones_nuevo_comentario.appendChild(boton_cancelar)
					div_botones_nuevo_comentario.appendChild(boton_aceptar)
					div_nuevo_comentario.appendChild(input_comentario)					
					div_nuevo_comentario.appendChild(div_botones_nuevo_comentario)
					div_lista_de_comentarios.insertAdjacentElement("afterbegin",div_nuevo_comentario)
					input_comentario.focus()
					boton_agregar_comentario.disabled = true
					boton_cancelar.addEventListener("click", () => {
						boton_agregar_comentario.disabled = false
						div_nuevo_comentario.remove()
					})

					boton_aceptar.addEventListener("click", () => {
						if (input_comentario.value!=""){
							let requestOptions = {
								method: 'POST',
								headers:  { 'Content-Type': 'application/json' },
								body: JSON.stringify({ comentario: input_comentario.value, idPelicula: id, idUsuario:userId })
							};
							fetch("http://localhost:5000/comentarios/",requestOptions)
							.then(
								resp => {
									datos = resp.json()
									return datos
								})
							.then( resp => {			
								
								idComentario = resp['id']				
								comentario_tag = document.createElement("article");
								comentario_tag.className = "comentario";
								comentario_tag.setAttribute("idComentario",idComentario);
								comentario_p = document.createElement("p");
								comentario_p.className = "texto_com";
								comentario_p.textContent = input_comentario.value;
								comentario_autor = document.createElement("h3");
								comentario_autor.className = "autor_com";
								comentario_autor.textContent = "Lo dijo @"+user
								div_nuevo_comentario.remove()
								div_lista_de_comentarios.insertAdjacentElement("afterbegin",comentario_tag);
								comentario_tag.appendChild(comentario_p);
								comentario_tag.appendChild(comentario_autor);
								boton_agregar_comentario.disabled = false
							})
						}

					})
				})
			}
			
				


			//filtrar los comentarios:
			
			comentarios.forEach(element => {
				comentario_tag = document.createElement("article");
				comentario_tag.className = "comentario";
				comentario_tag.setAttribute("idComentario",element.id);
				comentario_p = document.createElement("p");
				comentario_p.className = "texto_com";
				comentario_p.textContent = element.comentario;
				comentario_autor = document.createElement("h3");
				comentario_autor.className = "autor_com";
				comentario_autor.id = element.id

				fetch("http://localhost:5000/comentarios/usuarios/"+element.id)
				.then(
					resp => {
						datos = resp.json()
						return datos
					})
				.then( resp => {
					comentario_autor = document.getElementById(element.id)
					comentario_autor.textContent = "Lo dijo @"+resp['nombre']
					})

				div_lista_de_comentarios.appendChild(comentario_tag);
				comentario_tag.appendChild(comentario_p);
				comentario_tag.appendChild(comentario_autor);
			});
		});
    
}
imprimir_encabezado("");
imprimir_peliculas("ultimas 10");
imprimir_footer();






