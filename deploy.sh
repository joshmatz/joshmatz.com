#!/bin/bash
# This commits /public to another repo

echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"


echo -e "\033[0;32mClean started...\033[0m"
cd public
git checkout master
git rm -rf *
git commit -a -m "Cleaning before build"
cd ..
echo -e "\033[0;32mClean complete...\033[0m"


echo -e "\033[0;32mBuild started...\033[0m"
hugo
echo -e "\033[0;32mBuild complete...\033[0m"


echo -e "\033[0;32mCommiting build to gh-pages...\033[0m"
cd public
git add .

msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

git push origin master
cd ..
echo -e "\033[0;32mBuild committed...\033[0m"


echo -e "\033[0;32mCommitting submodule changes...\033[0m"
git add .
git commit -m "$msg"
git push origin master
echo -e "\033[0;32mSubmodule updated...\033[0m"
