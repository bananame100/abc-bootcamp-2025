#http요청을 보낼 수 있도록 도와주는 라이브러리 (requests,httpx)
import json
import requests

url = "https://pyhub.kr/melon/20231204.json"

response = requests.get(url)
print(response)

#string -> object : deserialize (역직렬화)
json_string : str = response.text
response_obj = json.loads(json_string)
print(type(response_obj))
print(len(response_obj))

for song in response_obj:
    print(song["곡명"],song["가수"])