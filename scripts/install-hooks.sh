#!/bin/bash

GIT_DIR=$(git rev-parse --git-dir)

# Goes to the root of the project
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR
cd ..

echo "Installing hooks..."

FILE=$GIT_DIR/hooks/pre-commit

# If pre-commit already exists, overwrite it
if test -f "$FILE"; then
    rm $FILE
fi

cp -l ./scripts/pre-commit.sh $FILE

echo "Done!"
