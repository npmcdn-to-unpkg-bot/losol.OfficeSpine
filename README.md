# losol.OfficeSpine

## Adding Angular 2
* package.json lists packages and defines some useful scripts. Right click on npm in the Dependencies folder and choose "Open package.json"
* typings.json identifies TypeScript definition files. Add the file to the root folder
* systemjs.config.js, the SystemJS configuration file. Add it to the wwwroot folder
* Add a folder named scripts in your root folder
** Add tsconfig.json, which is the TypeScript compiler configuration file. 

Edit gulpfile.js in your projects root

### Add the hello world sample from angular.io
1. In the scripts folder: add main.ts

```ts
///<reference path="./../typings/browser/ambient/core-js/index.d.ts"/>
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
bootstrap(AppComponent);
```

2. In the scripts folder, add app.component.ts
```ts
import { Component } from '@angular/core';
@Component({
    selector: 'my-app',
    template: '<h1>Hello World, this is Angular2</h1>'
})
export class AppComponent { }
```

### Edit Views\Shared\_Layout.cshtml
Add this code from the Angular Quickstart tutorial to the head part. 

```html
	<!-- 1. Load libraries -->
    <!-- Polyfill(s) for older browsers -->
    <script src="lib/core-js/client/shim.min.js"></script>
    <script src="lib/zone.js/dist/zone.js"></script>
    <script src="lib/reflect-metadata/Reflect.js"></script>
    <script src="lib/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
      System.import('app').catch(function(err){ console.error(err); });
    </script>
```

### Run some tasks and configure Task runner
* Run the CopyScripts task once for copying libraries from the node_modules folderto the wwwroot/lib folder
* Set up binding for the ts task to run after each build.
