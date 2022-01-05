/*obtengo todos los elementos con la clase pelicula */
const peliculas = document.getElementsByClassName('pelicula');

for(i=0 ; i<peliculas.length ; i++){
    peliculas[i].addEventListener("mouseclick", pelicula_mouseclick(peliculas[i].ATTRIBUTE_NODE), false);
    peliculas[i].ATTRIBUTE_NODE
  }

function pelicula_mouseclick(numero){
    console.log("Hoal "+numero);
}
