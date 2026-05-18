from flask import Flask, render_template, request, jsonify
import json
import os

from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

modelo = genai.GenerativeModel("gemini-flash-latest")

app = Flask(__name__)

with open("palabras.json", "r", encoding="utf-8") as f:
    diccionario = json.load(f)


@app.route("/")
def inicio():
    return render_template("index.html")


@app.route("/traducir", methods=["POST"])
def traducir():

    datos = request.get_json()

    palabra = datos["palabra"].lower()

    if palabra in diccionario:

        resultado = diccionario[palabra]["maya"]
        pronunciacion = diccionario[palabra]["pronunciacion"]

    else:

        resultado = "Palabra no encontrada"
        pronunciacion = "Sin pronunciación"

    return jsonify({
        "resultado": resultado,
        "pronunciacion": pronunciacion
    })


@app.route("/traducir-ia", methods=["POST"])
def traducir_ia():

    datos = request.get_json()

    palabra = datos["palabra"]

    prompt = f"""
    Traduce la palabra o frase '{palabra}'
    del español al maya yucateco.

    Responde EXACTAMENTE así:

    Traducción: ...
    Pronunciación: ...

    Usa pronunciación simple para hispanohablantes.
    """

    respuesta = modelo.generate_content(prompt)

    return jsonify({
        "resultado": respuesta.text
    })


@app.route("/chat-ia", methods=["POST"])
def chat_ia():

    datos = request.get_json()

    mensaje = datos["mensaje"]

    prompt = f"""
    Eres un tutor experto y amigable
    de maya yucateco llamado Kaambal.

    Tu trabajo es:

    - enseñar palabras mayas
    - corregir suavemente
    - motivar al estudiante
    - hacer preguntas cortas
    - enseñar pronunciación
    - usar ejemplos simples

    Reglas:
    - responde corto
    - usa emojis ocasionalmente
    - enseña maya y español
    - mantén conversación educativa
    - motiva siempre al usuario

    Usuario:
    {mensaje}
    """

    respuesta = modelo.generate_content(prompt)

    return jsonify({
        "respuesta": respuesta.text
    })


if __name__ == "__main__":
    app.run(debug=True)
