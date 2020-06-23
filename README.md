# Packaged BEANS
[Design Document](https://docs.google.com/document/d/1wenfQkW7sKlqayKXsfdZ1LymAdhfE1ORGSWT_-pbG0Q/edit?ts=5ee37a05#)
## General Setup
```
cd fontend
npm install
```

## Development Resources
* [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)
* [Markdown Guide](https://guides.github.com/features/mastering-markdown/)
* [Autoformat on Commit - Prettier](https://docs.google.com/document/d/1FQPR4w38ixA_ic0y0FEo_fQtRvLBiphEwx-XLEiLaTw/edit)

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
