<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>

        <link href="https://fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="es6-shim/es6-shim.min.js"></script>
        <script src="systemjs/dist/system-polyfills.js"></script>
        <script src="angular2/es6/dev/src/testing/shims_for_IE.js"></script>
        <script src="angular2/bundles/angular2-polyfills.js"></script>
        <script src="systemjs/dist/system.src.js"></script>
        <script src="rxjs/bundles/Rx.js"></script>
        <script src="angular2/bundles/angular2.dev.js"></script>


        <script>
            System.config({
                "defaultJSExtensions": true,
                packages: {
                    app: {
                        format: 'register',
                        defaultExtension: 'js'
                    }
                }
            });

            System.import('boot')
                .then(null, console.error.bind(console));
        </script>
    </head>
    <body>
        <my-app>
            <div class="container">
                <div class="content">
                    <h2>Loading...</h2>
                </div>
             </div>
         </my-app>
    </body>
</html>

