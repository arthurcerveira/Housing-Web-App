import requests
import json

API = 'http://localhost:8000/api/'

with open('../test_accounts.json') as accounts:
    ACCOUNTS = json.load(accounts)

VALID_ACCOUNTS = ACCOUNTS['valid_accounts']

try:
    for account in VALID_ACCOUNTS:
        requests.post(f'{API}accounts/register', data=account)

    print(f"Created {len(VALID_ACCOUNTS)} accounts")

except:
    print("Server is not running")
