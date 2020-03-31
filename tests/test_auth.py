import unittest
import requests
import json
import os

FILE_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

API = 'http://localhost:8000/api/'

with open(f'{FILE_DIRECTORY}/test_accounts.json') as accounts:
    ACCOUNTS = json.load(accounts)

VALID_ACCOUNTS = ACCOUNTS['valid_accounts']


class TestAuth(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        # Remove all accounts before starting the test
        accounts = requests.get(f'{API}accounts/').json()
        for account in accounts:
            requests.delete(f'{API}accounts/{account["_id"]}')

    def test_login(self):
        # Create account
        requests.post(f'{API}accounts/register', data=VALID_ACCOUNTS[0])

        # Login account
        email = VALID_ACCOUNTS[0]["email"]
        password = VALID_ACCOUNTS[0]["password"]

        response = requests.post(f'{API}accounts/login', data={"email": email,
                                                               "password": password}).json()

        self.assertTrue(response["token"])

        # Invalid email
        email = "invalid@email.com"

        response = requests.post(f'{API}accounts/login', data={"email": email,
                                                               "password": password}).json()

        self.assertEqual(response["error"], "Email not found")

        # Invalid password
        email = VALID_ACCOUNTS[0]["email"]
        password = "invalid-password"

        response = requests.post(f'{API}accounts/login', data={"email": email,
                                                               "password": password}).json()

        self.assertEqual(response["error"], "Invalid password")

    def test_get_logged_account(self):
        # Create account
        requests.post(f'{API}accounts/register', data=VALID_ACCOUNTS[0])

        # Login account
        email = VALID_ACCOUNTS[0]["email"]
        password = VALID_ACCOUNTS[0]["password"]

        response = requests.post(f'{API}accounts/login', data={"email": email,
                                                               "password": password}).json()

        token = response["token"]
        header = {"Authorization": f'Bearer {token}'}

        # Send request with header
        response = requests.get(f'{API}logged', headers=header).json()

        self.assertEqual(response["email"], email)

        # Send request without header
        response = requests.get(f'{API}logged').json()

        self.assertEqual(response["error"], "Access denied")

        # Send request with invalid header
        invalid_header = {
            "Authorization": f'Bearer invalid-token'}

        response = requests.get(f'{API}logged', headers=invalid_header).json()

        self.assertEqual(response["error"], "Invalid token")


if __name__ == '__main__':
    unittest.main()
