echo "Parse parameters"
set github_org=%1
set github_repo=%2
set username=%3
set pat=%4
set build_id=%5

echo "clone the master branch"
git clone https://github.com/%github_org%/%github_repo%.git
cd %github_repo%

echo "Set up git global identity"
git config --global user.email "aigallery@microsoft.com"
git config --global user.name "Azure AI Gallery Team"

echo "create staging branch"
git checkout -b staging

echo "Remove everything from the local git"
git rm -r .

echo "copy from Build's ArtifactStagingDirectory"
robocopy %BUILD_ARTIFACTSTAGINGDIRECTORY% . /E

echo "Add contents"
git add . 

git status

echo "Commit contents"
git commit -m "VSTS CI Commit: Build %build_id%"

echo "Set up git remote"
git remote add origin_staging https://%username%:%pat%@github.com/%github_org%/%github_repo%.git

echo "push to github"
git push origin_staging staging -f
