import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdComponent } from './od/od.component';
import { UrComponent } from './ur/ur.component';
import { OgxCoperacionesComponent } from './ogx-coperaciones/ogx-coperaciones.component';
import { OgxEstandaresComponent } from './ogx-estandares/ogx-estandares.component';
import { IcxCoperacionesComponent } from './icx-coperaciones/icx-coperaciones.component';
import { IcxEstandaresComponent } from './icx-estandares/icx-estandares.component';

// Importar componenetes

const appRouter: Routes = [
    { path: '', component: OgxCoperacionesComponent }
    , { path: 'od', component: OdComponent }
    , { path: 'ur', component: UrComponent }

    , { path: 'ogx_coperaciones', component: OgxCoperacionesComponent }
    , { path: 'ogx_standars', component: OgxEstandaresComponent }

    , { path: 'icx_coperaciones', component: IcxCoperacionesComponent }
    , { path: 'icx_standars', component: IcxEstandaresComponent }


];

export const appRouterProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouter);