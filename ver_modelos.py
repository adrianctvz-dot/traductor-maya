import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

for modelo in genai.list_models():
    if "generateContent" in modelo.supported_generation_methods:
        print(modelo.name)