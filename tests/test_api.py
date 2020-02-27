import unittest
import requests
import json

API = 'http://localhost:8000/api/'

with open('test_accounts.json') as accounts:
    ACCOUNTS = json.load(accounts)

VALID_ACCOUNTS = ACCOUNTS['valid_accounts']

INVALID_ID = '000000'


class TestApi(unittest.TestCase):
    def test_api_ping(self):
        response = requests.get(API).json()

        self.assertEqual(response['message'], 'Server is running')

    def test_create_account(self):
        accounts_id = list()

        # Create valid accounts
        for account in VALID_ACCOUNTS:
            response = requests.post(f'{API}accounts/register', data=account)

            self.assertTrue(response.json()['account'])

            id = response.json()['account']
            accounts_id.append(id)

        # Create invalid accounts
        invalid_accounts = ACCOUNTS['invalid_accounts']

        for account in invalid_accounts:
            response = requests.post(f'{API}accounts/register', data=account)

            self.assertEqual(response.status_code, 400)
            self.assertTrue(response.json()['error'])

        email_exist = ACCOUNTS['email_exists']

        response = requests.post(f'{API}accounts/register', data=email_exist)

        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Email already exists')

        # Remove the accounts
        for id in accounts_id:
            requests.delete(f'{API}accounts/{id}')

    def test_get_account(self):
        # Create accounts
        for account in VALID_ACCOUNTS:
            requests.post(f'{API}accounts/register', data=account)

        # Get all accounts
        response = requests.get(f'{API}accounts/')

        accounts = response.json()

        self.assertEqual(len(accounts), 3)
        self.assertEqual(response.status_code, 200)

        # Get specific accounts
        for account in accounts:
            id = account['_id']
            response = requests.get(f'{API}accounts/{id}')

            self.assertTrue(response.json())
            self.assertEqual(response.json()['_id'], id)

        # Get inexistent accounts
        response = requests.get(f'{API}accounts/{INVALID_ID}')

        self.assertEqual(response.status_code, 204)

        # Delete accounts
        for account in accounts:
            id = account['_id']
            response = requests.delete(f'{API}accounts/{id}')

    def test_edit_account(self):
        # Create account
        response = requests.post(
            f'{API}accounts/register', data=VALID_ACCOUNTS[0])

        # Edit account
        id = response.json()['account']
        response = requests.patch(f'{API}accounts/{id}',
                                  data={"name": "modified name"})

        self.assertEqual(response.json()['ok'], 1)

        response = requests.get(f'{API}accounts/{id}')
        name = response.json()['name']

        self.assertEqual(name, "modified name")

        # Delete account
        requests.delete(f'{API}accounts/{id}')

    def test_delete_account(self):
        # Create accounts
        for account in VALID_ACCOUNTS:
            requests.post(f'{API}accounts/register', data=account)

        accounts = requests.get(f'{API}accounts/').json()

        # Deletes all account
        for account in accounts:
            id = account['_id']
            response = requests.delete(f'{API}accounts/{id}')

            self.assertEqual(response.json()['ok'], 1)

        # Delete an inexistent account
        response = requests.delete(f'{API}accounts/{INVALID_ID}')

        self.assertEqual(response.status_code, 204)


if __name__ == '__main__':
    unittest.main()
