from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()
client=OpenAI()

stream=client.responses.create(
    model="gpy-4o",
    input="make python code for factorial",
    stream=True,
)

for event in stream:
    hasattr(event,"delta")
    print(event.delta,end="",flush=True)
    #flush - 출력 버퍼