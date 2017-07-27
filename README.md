# Viva Con Agua - Barcheck App
This small wiki contains everything important to jump into development.
The implementation is based on AngularJS and further Web-Development Frameworks (see list below)
AngularJS is a Framework to design Single-Page-Applications. Get basic information about AngularJS [here](https://angularjs.org/).

## Stable / Presentation Version
There is a stable version for presentations that contains some mock up feature for the presentation purpose. You can find the deployment link [here](https://barcheckshow-acb28be61.dispatcher.hana.ondemand.com/?hc_reset).

## Used Frameworks (beside basic AngularJS)
- AngularJS Material
- jQuery

## Development Setup
For continuing the development you could either use local development with an editor of your choice or SAP's Web IDE.

### Local
1. Get NodeJS if you haven't yet (will be needed for testing to)
2. Install the 'http-server'-Module
```
npm install http-server -g
```
3. Run the http-server from console
```
http-server
```
The app will be available via localhost:8080

### Web-IDE
1. Open and login
2. Clone this repository
3. Edit / Run the App (-> No webserver specification required, because the Web-IDE provides one for the runtime of the app)

## Testing
TBD

## Services
To get a basic knowledge of the idea of services, check out [this](https://docs.angularjs.org/guide/services) page.

### Design Service
TBD

### Location Service
TBD

### Progress Service
TBD

### Contacts Service
TBD

## Routing
For routing, the app uses UI-Routing from AngularJS UI. In contrast to the routing concept of AngularJS, it is state based and not URL based. Check the following article

## Working with custom directives
See [this](https://github.com/Viva-con-Agua/barcheck/commit/d279760a3f269ec2b6834eda5842398ec40307ae) commit to get an idea of how to modularize your code to delete duplicates.

## Helpful links and ressources
- [Deployment link](https://vivaconagua-acb28be61.dispatcher.hana.ondemand.com/?hc_reset) on SAP Cloud Platform
- [AnglarJS Material](https://material.angularjs.org/latest/)
- [Material Design Icons](https://material.io/icons/#ic_mail)

## Q&A
- **My changes are not applied after saving and reloading..?**
Empty the cache ([help](https://www.technipages.com/google-chrome-clear-cache)).
