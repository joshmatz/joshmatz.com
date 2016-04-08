#!/bin/bash
# This commits /public to another repo

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

# Clear our previous build of any unpublished content
cd public
git rm -r *
git commit -m "Cleaning before build"

# Build the project
cd ..
hugo

# Add the changes
cd public
git add -A

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back
cd ..
