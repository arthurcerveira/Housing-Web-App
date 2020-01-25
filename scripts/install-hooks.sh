#!/bin/bash

GIT_DIR=$(git rev-parse --git-dir)

# Goes to the root of the project
cd ~/Desktop/GitHub/Housing-Web-App

echo "Installing hooks..."
# This command creates symlink to our pre-commit script
ln -s ./scripts/pre-commit.sh $GIT_DIR/hooks/pre-commit
echo "Done!"
