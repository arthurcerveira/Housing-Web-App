import unittest
import requests
import json
import os

FILE_DIRECTORY = os.path.dirname(os.path.abspath(__file__))

API = 'http://localhost:8000/api/'

with open(f'{FILE_DIRECTORY}/test_accounts.json') as accounts:
    ACCOUNTS = json.load(accounts)

class TestAuth(unnittest.Testcase):
    def test_login():
        pass

    def test_get_logged_account():
        pass