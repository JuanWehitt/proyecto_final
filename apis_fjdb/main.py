from flask import Flask,jsonify,request
from http import HTTPStatus
import json

app = Flask(__name__)

data_peliculas = open("peliculas.json")
data_directores = open("directores.json")
data_generos = open("generos.json")

directores =json.load(data_directores)
generos = json.load(data_generos)
peliculas = json.load(data_peliculas)


@app.route("/directores",methods=['GET'])
def retornar_directores():
    return jsonify(directores)

@app.route("/generos",methods=['GET'])
def retornar_generos():
    return jsonify(generos)

@app.route("/",methods=['GET'])
def inicio():
    return "directores"

@app.route("/peliculas/<director>",methods=['GET'])
def retornar_peliculas_por_director(director):
    lista_filtrada = [x for x in peliculas if director in x["director"]]
    return jsonify(lista_filtrada)

@app.route("/peliculas/peliculas_con_portada",methods=['GET'])
def retornar_peliculas_con_portada():
    lista_filtrada = [x for x in peliculas if x["imagen"]!=""]
    return jsonify(lista_filtrada)


app.run()
