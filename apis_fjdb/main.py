from flask import Flask,jsonify,request
from http import HTTPStatus
import json
import uuid

app = Flask(__name__)

data_peliculas = open("peliculas.json")
data_directores = open("directores.json")
data_generos = open("generos.json")

directores =json.load(data_directores)
generos = json.load(data_generos)
peliculas = json.load(data_peliculas)


@app.route("/directores",methods=['GET'])
def retornar_directores():
    return jsonify(directores), HTTPStatus.OK

@app.route("/generos",methods=['GET'])
def retornar_generos():
    return jsonify(generos), HTTPStatus.OK

@app.route("/",methods=['GET'])
def inicio():
    return "APIS DE JFDB, CONSULTE LA DOCUMENTACION"

@app.route("/peliculas/<director>",methods=['GET'])
def retornar_peliculas_por_director(director):
    lista_filtrada = [x for x in peliculas if director in x["director"]]
    if lista_filtrada != []:
        return jsonify(lista_filtrada), HTTPStatus.OK
    else:
        return jsonify({"mensaje":"No se encontro la pelicula con el director ingresado"}), HTTPStatus.OK


@app.route("/peliculas/peliculas_con_portada",methods=['GET'])
def retornar_peliculas_con_portada():
    lista_filtrada = [x for x in peliculas if x["imagen"]!=""]
    return jsonify(lista_filtrada), HTTPStatus.OK

@app.route("/peliculas/<id>", methods=['GET'])
def retornar_pelicula(id):
    lista = [x for x in peliculas if id in x['id']]
    if lista != []:
        return jsonify(lista[0]),HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro la pelicula a retornar, el id es incorrecto."}), HTTPStatus.NOT_FOUND

@app.route("/peliculas/<nombre>", methods=['GET'])
def retornar_peliculas_por_nombre(nombre):
    return jsonify([x for x in peliculas if nombre==x['nombre']]),HTTPStatus.OK


def generar_nuevo_id_pelicula():
    not_id = True
    while not_id:
        id = uuid.uuid4()
        not_id = not ( [x for x in peliculas if x['id']==id] == [] )
    return id

def generar_nuevo_id_usuario():
    not_id = True
    while not_id:
        id = uuid.uuid4()
        not_id = not ( [x for x in peliculas if x['id']==id] == [] )
    return id


def json_ok_pelicula(datos_pelicula):
    if 'titulo' and 'genero' and 'director' and 'anio' and 'imagen' and 'sinopsis' and 'idUsuario' and 'comanetarios' in datos_pelicula:
        return True
    else:
        return False

@app.route("/peliculas", methods=['POST'])
def agregar_pelicula():
    nuevo_id = generar_nuevo_id_pelicula()
    datos_pelicula = request.get_json()

    if json_ok_pelicula(datos_pelicula) :
        peliculas.append({
            "id":nuevo_id,
            "titulo":datos_pelicula['titulo'],
            "genero":datos_pelicula['genero'],
            "director":datos_pelicula['director'],
            "anio":datos_pelicula['anio'],
            "imagen":datos_pelicula['imagen'],
            "sinopsis":datos_pelicula['sinopsis'],
            "idUsuario":datos_pelicula['idUsuario'],
            "comentarios":datos_pelicula['comentarios']
        })
        return jsonify({"mensaje":"La pelicula ha sido agregada con exito"}),HTTPStatus.OK
    else :
        return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura"}), HTTPStatus.BAD_REQUEST

@app.route("/peliculas/<id>", methods=['DELETE'])
def eliminar_pelicula(id):
    lista = [x for x in peliculas if x['id']==id]
    if (lista!=[]):
        peliculas.remove(lista[0])
        return jsonify({"mensaje":"La pelicula ha sido eliminada con exito"}), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro la pelicula a eliminar, el id es incorrecto."}), HTTPStatus.NOT_FOUND

@app.route("peliculas/<id>", methods=['PUT'])
def actualizar_pelicula(id):
    lista = [x for x in peliculas if x['id']==id]
    if lista!=[] :
        datos_pelicula = request.get_json()
        if json_ok_pelicula(datos_pelicula) :
            pelicula = lista[0]
            pelicula = {
                "titulo": datos_pelicula['titulo'],
                "genero": datos_pelicula['genero'],
                "director": datos_pelicula['director'],
                "anio": datos_pelicula['anio'],
                "imagen": datos_pelicula['imagen'],
                "sinopsis": datos_pelicula['sinopsis'],
                "idUsuario": datos_pelicula['idUsuario'],
                "comentarios": datos_pelicula['comentarios']
            }
            return jsonify({"mensaje":"La pelicula ha sido modificda con exito"}), HTTPStatus.OK
        else:
            return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura"}), HTTPStatus.BAD_REQUEST
    else:
        return jsonify({"mensaje": "No se encontro la pelicula a modificar, el id es incorrecto."}), HTTPStatus.NOT_FOUND


app.run()
