from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

with open("palabras.json", "r", encoding="utf-8") as f:
    diccionario = json.load(f)

@app.route("/")
def inicio():
    return render_template("index.html")

@app.route("/traducir", methods=["POST"])
def traducir():

    palabra = request.json["palabra"].lower()

    resultado = diccionario.get(palabra)

    if resultado:

        if isinstance(resultado, dict):

            return jsonify({
                "resultado": resultado["maya"],
                "pronunciacion": resultado["pronunciacion"]
            })

        else:

            return jsonify({
                "resultado": resultado,
                "pronunciacion": ""
            })

    return jsonify({
        "resultado": "Palabra no encontrada",
        "pronunciacion": ""
    })

if __name__ == "__main__":
    app.run(debug=True)