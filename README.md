# React Frontend with Java Servlet Backend

Based on [chen-dawn/react-servlet-test](https://github.com/chen-dawn/react-servlet-test).

## Run locally
```
// From frontend directory
yarn local
// From backend directory
mvn appengine:devserver
```

## Deploy to gcloud
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

## Change node version
```
node -v // Check node version
sudo npm install -g n
sudo n 10.21.0  // Change node version to 10.21.0
```