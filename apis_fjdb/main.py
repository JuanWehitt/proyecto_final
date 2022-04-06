from flask import Flask, jsonify, request
from http import HTTPStatus
import json
import uuid
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app, resources={r"/*/*/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

data_collections = open("collections.json", encoding="utf-8")
lista_collections = json.load(data_collections)
directores = lista_collections['directores']
generos = lista_collections['generos']
comentarios = lista_collections['comentarios']
peliculas = lista_collections['peliculas']
usuarios = lista_collections['usuarios']

@app.route("/directores/",methods=['GET'])
def retornar_directores():
    return jsonify(directores), HTTPStatus.OK

@app.route("/generos/",methods=['GET'])
def retornar_generos():
    return jsonify(generos), HTTPStatus.OK

@app.route("/peliculas/<id>",methods=['GET'])
def retornar_pelicula(id):
    lista = [x for x in peliculas if id== x["id"]]
    if lista:
        return jsonify(lista[0]), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro la pelicula a retornar, el id es incorrecto."}), HTTPStatus.NOT_FOUND

@app.route("/peliculas/director/<nombre>",methods=['GET'])
def retornar_peliculas_por_director(nombre):
    lista_filtrada = [x for x in peliculas if nombre in x["director"]]
    if lista_filtrada:
        return jsonify(lista_filtrada), HTTPStatus.OK
    else:
        return jsonify({"mensaje":"No se encontro la pelicula con el director ingresado"}), HTTPStatus.OK


@app.route("/peliculas/peliculas_con_portada/",methods=['GET'])
def retornar_peliculas_con_portada():
    lista_filtrada = [x for x in peliculas if x["imagen"] != ""]
    return jsonify(lista_filtrada), HTTPStatus.OK

@app.route("/peliculas/",methods=['GET'])
# @cross_origin(origin="*", headers=['Conent-Type','Autorization'])
def retornar_peliculas():
    return jsonify(peliculas), HTTPStatus.OK

#Funciones de soporte para las películas

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

def generar_nuevo_id_comentario():
    not_id = True
    while not_id:
        id = uuid.uuid4()
        not_id = not ( [x for x in comentarios if x['id']==id] == [] )
    return id

def json_ok_pelicula(datos_pelicula):
    if 'titulo' and 'genero' and 'director' and 'anio' and 'imagen' and 'sinopsis' and 'idUsuario' in datos_pelicula:
        return True
    else:
        return False

@app.route("/peliculas/", methods=['POST'])
def agregar_pelicula():
    nuevo_id = generar_nuevo_id_pelicula()
    datos_pelicula = request.get_json()
    # print(datos_pelicula)
    if json_ok_pelicula(datos_pelicula):
        peliculas.insert(0,{
            "id": str(nuevo_id),
            "titulo": datos_pelicula['titulo'],
            "genero": datos_pelicula['genero'],
            "director": datos_pelicula['director'],
            "anio": datos_pelicula['anio'],
            "imagen": datos_pelicula['imagen'],
            "sinopsis": datos_pelicula['sinopsis'],
            "idUsuario": datos_pelicula['idUsuario'],
            "comentarios": []
        })
        return jsonify({"mensaje":"La pelicula ha sido agregada con exito"}), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura"}), HTTPStatus.BAD_REQUEST

@app.route("/peliculas/<id>", methods=['DELETE'])
def eliminar_pelicula(id):
    lista = [x for x in peliculas if x['id']==id]
    lista_ids_comentarios = lista[0]["comentarios"]
    lista_comentarios = list(filter(lambda x: x['id'] in lista_ids_comentarios,comentarios))
    for comentario in lista_comentarios :
        comentarios.remove(comentario)
    if lista:
        peliculas.remove(lista[0])
        return jsonify({"mensaje":"La pelicula ha sido eliminada con exito"}), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro la pelicula a eliminar, el id es incorrecto."}), HTTPStatus.NOT_FOUND

@app.route("/peliculas/<id>", methods=['PUT'])
def actualizar_pelicula(id):
    lista = [x for x in peliculas if x['id'] == id]
    if lista:
        datos_pelicula = request.get_json()
        if 'titulo' and 'genero' and 'director' and 'anio' and 'imagen' and 'sinopsis' in datos_pelicula:
            pelicula = lista[0]
            pelicula["titulo"] = datos_pelicula['titulo']
            pelicula["genero"] = datos_pelicula['genero']
            pelicula["director"]= datos_pelicula['director']
            pelicula["anio"]= datos_pelicula['anio']
            pelicula["imagen"]= datos_pelicula['imagen']
            pelicula["sinopsis"]= datos_pelicula['sinopsis']

            return jsonify({"mensaje":"La pelicula ha sido modificda con exito"}), HTTPStatus.OK
        else:
            return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura"}), HTTPStatus.BAD_REQUEST
    else:
        return jsonify({"mensaje": "No se encontro la pelicula a modificar, el id es incorrecto."}), HTTPStatus.NOT_FOUND

@app.route("/comentarios/", methods=["GET"])
def retornar_comentarios():
    return jsonify(comentarios), HTTPStatus.OK

@app.route("/comentarios/usuarios/<id>", methods=['GET'])
@cross_origin(origin="*", headers=['Conent-Type','Autorization'])
def retornar_autor_de_comentario(id):
    comentario = [x for x in comentarios if x['id'] == id]
    if comentario :
        idUsuario = comentario[0]['idUsuario']
        usuario = [x for x in usuarios if x['id'] == idUsuario]
        if usuario :
            return jsonify({"nombre":usuario[0]['nombre']}), HTTPStatus.OK
        else :
            return jsonify({"mensaje": "No se encontro el usuario"}),  HTTPStatus.NOT_FOUND
    else:
        return jsonify({"mensaje": "No se encontro el comentario, error de id"}), HTTPStatus.NOT_FOUND


@app.route("/comentarios/<id>", methods=["GET"])
def retornar_comentario(id):
    lista = [x for x in comentarios if id in x['id']]
    if lista:
        return jsonify(lista[0]), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro el comentario, el id es incorrecto."}), HTTPStatus.NOT_FOUND

# Obtiene todos los comentarios de una pelicula según el Id de la película
@app.route("/peliculas/comentarios/<id>", methods=['GET'])
def retornar_comentarios_de_pelicula(id):
    pelicula = [x for x in peliculas if x['id'] == id]
    if pelicula :
        comentarios_de_pelicula = pelicula[0]['comentarios']
        lista_comentarios = list(filter(lambda x: x['id'] in comentarios_de_pelicula, comentarios))
        return jsonify(lista_comentarios), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro la pelicula"}), HTTPStatus.NOT_FOUND


def json_ok_comentario(datos_comentario):
    #print(datos_comentario)
    return ("comentario" and "idPelicula" and "idUsuario") in datos_comentario


@app.route("/comentarios/", methods=['POST'])
def agregar_comentario():
    nuevo_id = generar_nuevo_id_comentario()
    datos_comentario = request.get_json()
    if json_ok_comentario(datos_comentario):

        usuario_l = [x for x in usuarios if x['id'] == datos_comentario['idUsuario']]
        pelicula_l = [x for x in peliculas if x['id']==datos_comentario['idPelicula']]


        if pelicula_l and usuario_l:
            comentarios.insert(0, {
                "id": str(nuevo_id),
                "comentario": datos_comentario['comentario'],
                "idUsuario": datos_comentario['idUsuario']
            })
            pelicula = pelicula_l[0]
            pelicula['comentarios'].insert(0,str(nuevo_id))
        else:
            return jsonify({"mensaje": "El id de la pelicula o del usuario es incorrecto"}), HTTPStatus.NOT_FOUND
        return jsonify({"mensaje": "El comentario ha sido agregado con exito","id":str(nuevo_id)}), HTTPStatus.OK
    else :
        return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura"}), HTTPStatus.BAD_REQUEST

@app.route("/comentarios/<id>", methods=['PUT'])
def actualizar_comentario(id):
    lista = [x for x in comentarios if x['id'] == id]
    if lista:
        datos_comentario = request.get_json()
        if "comentario" in datos_comentario :
            comentario = lista[0]
            comentario["comentario"] = datos_comentario['comentario']
            return jsonify({"mensaje":"El comentario ha sido modificdo con exito"}), HTTPStatus.OK
        else:
            return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura"}), HTTPStatus.BAD_REQUEST
    else:
        return jsonify({"mensaje": "No se encontro el comentario a modificar, el id es incorrecto."}), HTTPStatus.NOT_FOUND

@app.route("/comentarios/<id>", methods=['DELETE'])
def eliminar_comentario(id):
    lista = [x for x in comentarios if x['id'] == id]                               #obtengo la referencia al comentario con listcomprehencion
    pelicula = list(filter(lambda x: id in x["comentarios"], peliculas))[0]         #busco la pelicula con el comentario y guardo una referencia                                                  #me quedo con la primer pelicula encontrada
    pelicula["comentarios"].remove(id)                                              #remuevo el comentario de la lista de comentarios en la pelicula.
    if lista:
        comentarios.remove(lista[0])                                                #remuevo el comentario de la coleccion de comentarios.
        return jsonify({"mensaje":"El comentario ha sido eliminado con exito"}), HTTPStatus.OK
    else:
        return jsonify({"mensaje": "No se encontro el comentario a eliminar, el id es incorrecto."}), HTTPStatus.NOT_FOUND


#servicios de usuarios

def json_ok_usuario(json):
    if 'usuario' and 'contrasenia' in json:
        return True
    else:
        return False

#Prueba de Login retorna el usuario solo si el ususario y contraseña coincide
@app.route("/usuarios/", methods=['POST'])
def retornar_usuario():
    datos_usuario = request.get_json()
    #print(datos_usuario)
    if not (datos_usuario == None) and json_ok_usuario(datos_usuario):
        lista = [x for x in usuarios if ( x['usuario'] == datos_usuario['usuario'] ) and ( x['contrasenia'] == datos_usuario['contrasenia'] )]
        if lista:
            return jsonify({
                "apellido": lista[0]['apellido'],
                "id": lista[0]['id'],
                "nombre": lista[0]['nombre']
            }), HTTPStatus.OK
        else:
            return jsonify({"mensaje": "No se encuentra el usuario, revise los datos ingresados"}), HTTPStatus.NOT_FOUND
    else:
        return jsonify({"mensaje": "Uno o mas campos no coinciden con la estructura, consulte la documentacion"}), HTTPStatus.BAD_REQUEST

#print(generar_nuevo_id_pelicula())
app.run(debug=True)
