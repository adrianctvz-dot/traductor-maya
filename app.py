from flask import Flask, render_template, request, jsonify
import json
import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

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

    respuesta = client.chat.completions.create(
        model="gpt-4.1-mini",

        messages=[
            {
                "role": "system",
                "content":
                "Eres un traductor experto de español a maya yucateco. "
                "Responde SOLO con la traducción y una pronunciación simple."
            },

            {
                "role": "user",
                "content":
                f"Traduce la palabra '{palabra}' al maya yucateco y agrega pronunciación."
            }
        ]
    )

    texto = respuesta.choices[0].message.content

    return jsonify({
        "resultado": texto
    })


if __name__ == "__main__":
    app.run(debug=True)