from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()
api_key = os.getenv("OPEN_API_KEY")
client = OpenAI(api_key=api_key)

stream=client.responses.create(
    model="gpy-4o",
    input="make python code for factorial",
    stream=True,
)

for event in stream:
    hasattr(event,"delta")
    print(event.delta,end="",flush=True)
    #flush - 출력 버퍼