import requests

API = 'http://localhost:8000/api/'

try:
    response = requests.get(f'{API}accounts/')
    accounts = response.json()
    lenght = len(accounts)

    for account in accounts:
        id = account['_id']
        response = requests.delete(f'{API}accounts/{id}')

    print(f"Removed {lenght} accounts")

except:
    print("Server is not running")
