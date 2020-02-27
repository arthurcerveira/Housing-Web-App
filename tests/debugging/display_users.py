import requests
import pprint

API = 'http://localhost:8000/api/'

try:
    response = requests.get(f'{API}accounts/')
    accounts = response.json()

    pprint.pprint(accounts)

except:
    print("Server is not running")
