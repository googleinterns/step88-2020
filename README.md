# Packaged BEANS
[Design Document](https://docs.google.com/document/d/1wenfQkW7sKlqayKXsfdZ1LymAdhfE1ORGSWT_-pbG0Q/edit?ts=5ee37a05#) <br />
[Presentation](https://docs.google.com/presentation/d/16ic7o87Vzr8WgynWzaA1X_6zTZmoAjh93ASoStsMZEY/edit?ts=5f23316b#slide=id.g8b4189aea4_13_896)

## Demo
[insert demo here]

## General Setup
```
cd fontend
npm install
```
## Set up API Keys
Run:  
`$cat > frontend/src/ApiKeys.js`  
`$export const MAPS_API_KEY = '[INSERT KEY HERE]'` **Note: include quotes here  
Then press `Cntrl + D`  

Then Run:  
`$cat > backend/target/step-react-demo-1/.env`  
`$MAPS_API_KEY=[INSERT KEY HERE]` **Note: no quotes here  
Then press `Cntrl + D`  

## React Frontend with Java Servlet Backend
Based on [chen-dawn/react-servlet-test](https://github.com/chen-dawn/react-servlet-test).

### Run locally
```
// From frontend directory
yarn local
// From backend directory
mvn appengine:devserver
```

### Deploy to gcloud
```
gcloud init
gcloud config set project [Project_ID]
// From frontend directory
yarn build 
gcloud app deploy
// From backend directory
mvn package appengine:deploy
// From base directory
gcloud app deploy dispatch.yaml // Config routing
```

### Change node version
```
node -v // Check node version
sudo npm install -g n
sudo n 10.21.0  // Change node version to 10.21.0
```

## Formatting/linting
When you open a PR or push a new commit to a PR branch, github CI will automatically run a validator to check for formatting which prevents merging the PR if it fails.
See below for how to run the formatter/linter locally.
![image](https://user-images.githubusercontent.com/22455214/85607255-ecb9d880-b621-11ea-9d58-ffc24d841fbd.png)

##### Initial setup
You only need to run this once.
```bash
# From root directory
make node_modules
```

### Format files
Generally a good idea to run this command before committing or pushing a change.
```bash
# From root directory
make pretty
```

If you'd like, you can use a pre-commit hook. Create a file named `pre-commit` in the `.git/hooks` directory, then, add the following to the `.git/hooks/pre-commit` file.
```bash
#!/bin/sh
# Move to top level of git repo
cd `git rev-parse --show-toplevel`
 
FILES=$(git diff --cached --name-only --diff-filter=ACMR "*.js" "*.css" "*.java" | sed 's| |\\ |g')
if [ -z "$FILES" ]
then
 # Move back to original working directory
 cd -
 exit 0
fi
 
# Prettify/format all files
make pretty
 
# Add back the modified/prettified files to staging
echo "$FILES" | xargs git add
 
# Move back to original working directory
cd -
exit 0
```
Create a new file named `post-commit` in the `.git/hooks` directory and include the following:
```bash
#!/bin/sh
git update-index -g
```
Make sure the pre-commit and post-commit files are executable:
```bash
chmod 755 .git/hooks/pre-commit .git/hooks/post-commit
```

#### Lint JS files
```bash
# From root directory
make validate
```
