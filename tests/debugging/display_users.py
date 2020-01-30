import requests
import pprint

API = 'http://localhost:8080/api/'

try:
    response = requests.get(f'{API}accounts/')
    accounts = response.json()

    pprint.pprint(accounts)

except ConnectionRefusedError:
    print("Server is not running")
