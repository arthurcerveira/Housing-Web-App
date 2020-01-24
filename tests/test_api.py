import unittest
import requests
import json

API = 'http://localhost:8080/api/'

with open('test_accounts.json') as accounts:
    ACCOUNTS = json.load(accounts)

ACCOUNTS_ID = list()


class TestApi(unittest.TestCase):
    def test_api_is_running(self):
        response = requests.get(API).json()

        self.assertEqual(response['message'], 'Server is running')

    def test_create_account(self):
        valid_accounts = ACCOUNTS['valid_accounts']

        for account in valid_accounts:
            response = requests.post(f'{API}accounts/register', data=account)

            self.assertTrue(response.json()['account'])

            id = response.json()['account']
            ACCOUNTS_ID.append(id)

        invalid_accounts = ACCOUNTS['invalid_accounts']

        for account in invalid_accounts:
            response = requests.post(f'{API}accounts/register', data=account)

            self.assertEqual(response.status_code, 400)
            self.assertTrue(response.json()['message'])

        email_exist = ACCOUNTS['email_exists']

        response = requests.post(f'{API}accounts/register', data=email_exist)

        self.assertEqual(response.json()['message'], 'Email already exists')

    def test_get_account(self):
        pass

    def test_edit_account(self):
        pass

    def test_delete_account(self):
        for id in ACCOUNTS_ID:
            response = requests.delete(f'{API}accounts/{id}')

            self.assertTrue(response.json()['ok'])


if __name__ == '__main__':
    unittest.main()
