
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constantes } from './../utilidades/constantes';


@Injectable()
export class AdministracionService {
    constantes: Constantes;
    constructor(private _http: Http) {
        this.constantes = new Constantes();
    }

    getTokenAdministrador() {
        let url: String = this.constantes.getServicioMC();
        return this._http.get(url + "administration/tokenadmin/")
            .map(res => res.json());
    }
    
    getProgramaOgx() {
        let url: String = this.constantes.getServicioMC();
        return this._http.get(url + "lcperformance/product_ogx/")
            .map(res => res.json());

    }

    getProgramaIcx() {
        let url: String = this.constantes.getServicioMC();
        return this._http.get(url + "lcperformance/product_icx/")
            .map(res => res.json());

    }

    getPrograma() {
        let url: String = this.constantes.getServicioMC();
        return this._http.get(url + "lcperformance/product/")
            .map(res => res.json());

    }

    getComite() {
        let url: String = this.constantes.getServicioMC();
        return this._http.get(url + "lcperformance/comite/")
            .map(res => res.json());
    }

    getWeekly() {
        let url: String = this.constantes.getServicioMC();
        return this._http.get(url + "lcperformance/weekly/")
            .map(res => res.json());
    }

    getInfoPodio(reporte: String, fechaInicio: String, fechaFin: String, comite: String) {
        let url: String = this.constantes.getServicioMC();
        url += "reporte_ogx/" + reporte + "/?";
        url += "fechaInicio=" + fechaInicio;
        url += "&fechaFin=" + fechaFin;
        url += "&comite=" + comite;
        return this._http.get(url + "")
            .map(res => res.json());

    }
    getLcPerformance(date_initial: String, date_final: String, programs: String) {
        let url: String = this.constantes.getServicioMC() + "lcperformance/lc_performance/?";
        url += "date_initial=" + date_initial;
        url += "&date_final=" + date_final;
        url += "&programs=" + programs;
        return this._http.get(url + "")
            .map(res => res.json());
    }

}
