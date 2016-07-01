/**
 * Created by successive on 28/6/16.
 */

import {Component} from 'angular2/core';
import { RouteConfig, RouterOutlet } from 'angular2/router';

import { HomeComponent } from './pages/home/components/home';
console.log("here");
@Component({
    selector: 'my-app',
    template:
    `
        <div class="container body-container">
            <router-outlet></router-outlet>
        </div>
    `,
    directives : [RouterOutlet]
})

@RouteConfig([
    {path: '/', component: HomeComponent, name: 'Home', useAsDefault: true}
])

export class AppComponent { }

