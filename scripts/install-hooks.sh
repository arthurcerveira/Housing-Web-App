#!/bin/bash

GIT_DIR=$(git rev-parse --git-dir)

# Goes to the root of the project
cd ~/Desktop/GitHub/Housing-Web-App

echo "Installing hooks..."

FILE=$GIT_DIR/hooks/pre-commit

# If pre-commit already exists, overwrite it
if test -f "$FILE"; then
    rm $FILE
fi

cp -l ./scripts/pre-commit.sh $FILE

echo "Done!"
