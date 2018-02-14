import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { OgxCoperacionesComponent } from './ogx-coperaciones/ogx-coperaciones.component';
import { OdComponent } from './od/od.component';
import { appRouterProviders, routing } from './app.routing';
import { OgxEstandaresComponent } from './ogx-estandares/ogx-estandares.component';
import { UrComponent } from './ur/ur.component';
import { ChartModule } from 'angular-highcharts';
import { IcxCoperacionesComponent } from './icx-coperaciones/icx-coperaciones.component';
import { IcxEstandaresComponent } from './icx-estandares/icx-estandares.component';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        OgxCoperacionesComponent,
        OdComponent,
        OgxEstandaresComponent,
        UrComponent,
        IcxCoperacionesComponent,
        IcxEstandaresComponent,

    ],
    imports: [
        BrowserModule,
        routing,
        HttpModule,
        FormsModule,
        ChartModule
    ],
    providers: [appRouterProviders],
    bootstrap: [AppComponent]
})
export class AppModule { }
