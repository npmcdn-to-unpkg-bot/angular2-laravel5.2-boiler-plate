/**
 * Created by successive on 28/6/16.
 */



import {Component} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App</h1>',
    directives
})

@RouteConfig([
    {
        path : '/list',
        name : 'List',
        component : Home
    }
])
export class AppComponent { }

