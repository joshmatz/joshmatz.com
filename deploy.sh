#!/bin/bash
# This commits /public to another repo

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

echo -e "\033[0;32mClean started...\033[0m"
# Clear our previous build of any unpublished content
cd public
git rm -rf *
git commit -a -m "Cleaning before build"
cd ..

echo -e "\033[0;32mClean complete...\033[0m"

echo -e "\033[0;32mBuild started...\033[0m"
# Build the project
# hugo

echo -e "\033[0;32mBuild complete...\033[0m"

# # Add the changes
# cd public
# git add .

# # Commit changes.
# msg="rebuilding site `date`"
# if [ $# -eq 1 ]
#   then msg="$1"
# fi
# git commit -m "$msg"

# Push source and build repos.
git push origin master

# Come Back
