#!/bin/bash

# Goes to the root of the project
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR
cd ../..

echo "Running pre-commit hook"
./scripts/run-tests.sh

# $? stores exit value of the last command
if [ $? -ne 0 ]; then
 echo "Tests must pass before commit!"
 exit 1
fi
