import { Component } from '@angular/core';
declare var jQuery: any;
declare var $: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    sidebar_click() {
        if ($("#sidebar").hasClass('sidebar-hidde')) {
            $("#sidebar").removeClass('sidebar-hidde');
            $("#page").removeClass('page-witdh');
        } else {
            $("#sidebar").addClass('sidebar-hidde');
            $("#page").addClass('page-witdh');
        }
    }
}
