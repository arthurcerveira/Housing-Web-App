import unittest
import requests
import json

API = 'http://localhost:8080/api/'

with open('test_accounts.json') as accounts:
    ACCOUNTS = json.load(accounts)

ACCOUNTS_ID = list()

INVALID_ID = '000000'


class TestApi(unittest.TestCase):
    def test1_api_is_running(self):
        response = requests.get(API).json()

        self.assertEqual(response['message'], 'Server s running')

    def test2_create_account(self):
        # Create valid accounts
        valid_accounts = ACCOUNTS['valid_accounts']

        for account in valid_accounts:
            response = requests.post(f'{API}accounts/register', data=account)

            self.assertTrue(response.json()['account'])

            id = response.json()['account']
            ACCOUNTS_ID.append(id)

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

    def test3_get_account(self):
        # Get all accounts
        response = requests.get(f'{API}accounts/')

        self.assertEqual(len(response.json()), 3)
        self.assertEqual(response.status_code, 200)

        # Get specific accounts
        for id in ACCOUNTS_ID:
            response = requests.get(f'{API}accounts/{id}')

            self.assertTrue(response.json())
            self.assertEqual(response.json()['_id'], id)

        # Get inexistent accounts
        response = requests.get(f'{API}accounts/{INVALID_ID}')

        self.assertEqual(response.status_code, 204)

    def test4_edit_account(self):
        # Edit first account
        id = ACCOUNTS_ID[0]
        response = requests.patch(f'{API}accounts/{id}',
                                  data={"name": "modified name"})

        self.assertEqual(response.json()['ok'], 1)

        response = requests.get(f'{API}accounts/{id}')
        name = response.json()['name']

        self.assertEqual(name, "modified name")

    def test5_delete_account(self):
        # Deletes all account
        for id in ACCOUNTS_ID:
            response = requests.delete(f'{API}accounts/{id}')

            self.assertEqual(response.json()['ok'], 1)

        # Delete an inexistent account
        response = requests.delete(f'{API}accounts/{INVALID_ID}')

        self.assertEqual(response.status_code, 204)


if __name__ == '__main__':
    unittest.main()
