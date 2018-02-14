import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Constantes } from './../utilidades/constantes';

@Injectable()
export class OperacionesService {
    constantes: Constantes;
    constructor(private _http: Http) {
        this.constantes = new Constantes();
        
    }

    getConsultaRealize(token: String, fechaInicial: String, fechaFinal: String, programa: String, comite: String, pagina: String) {
        var url = this.constantes.getServicioExpa() + "applications.json?access_token=" + token;
        url += "&filters%5Bdate_realized%5Bfrom%5D%5D=" + fechaInicial;
        url += "&filters%5Bdate_realized%5Bto%5D%5D=" + fechaFinal;
        url += "&filters%5Bprogrammes%5D%5B%5D=" + programa;
        url += "&filters%5Bperson_committee%5D=" + comite + "&page=" + pagina + "&per_page="+this.constantes.getNumeroPeticionesHoja();
        console.log(url)
        return this._http.get(url).map(result => result.json());
    }

    getConsultaApproved(token: String, fechaInicial: String, fechaFinal: String, programa: String, comite: String, pagina: String) {
        var url = this.constantes.getServicioExpa() + "applications.json?access_token=" + token;
        url += "&filters%5Bdate_approved%5Bfrom%5D%5D=" + fechaInicial;
        url += "&filters%5Bdate_approved%5Bto%5D%5D=" + fechaFinal;
        url += "&filters%5Bprogrammes%5D%5B%5D=" + programa;
        url += "&filters%5Bperson_committee%5D=" + comite + "&page=" + pagina + "&per_page="+this.constantes.getNumeroPeticionesHoja();
        console.log(url)
        return this._http.get(url).map(result => result.json());
    }

    getConsultaRealizeIgx(token: String, fechaInicial: String, fechaFinal: String, programa: String, comite: String, pagina: String) {
        var url = this.constantes.getServicioExpa() + "applications.json?access_token=" + token;
        url += "&filters%5Bdate_realized%5Bfrom%5D%5D=" + fechaInicial;
        url += "&filters%5Bdate_realized%5Bto%5D%5D=" + fechaFinal;
        url += "&filters%5Bprogrammes%5D%5B%5D=" + programa;
        url += "&filters%5Bopportunity_committee%5D=" + comite + "&page=" + pagina + "&per_page="+this.constantes.getNumeroPeticionesHoja();
        url += "&filters%5Bfor%5D=opportunities&sort=status"
        console.log(url)
        return this._http.get(url).map(result => result.json());
    }

    getConsultaApprovedIgx(token: String, fechaInicial: String, fechaFinal: String, programa: String, comite: String, pagina: String) {
        var url = this.constantes.getServicioExpa() + "applications.json?access_token=" + token;
        url += "&filters%5Bdate_approved%5Bfrom%5D%5D=" + fechaInicial;
        url += "&filters%5Bdate_approved%5Bto%5D%5D=" + fechaFinal;
        url += "&filters%5Bprogrammes%5D%5B%5D=" + programa;
        url += "&filters%5Bopportunity_committee%5D=" + comite + "&page=" + pagina + "&per_page="+this.constantes.getNumeroPeticionesHoja();
        url += "&filters%5Bfor%5D=opportunities&sort=status"
        console.log(url)
        return this._http.get(url).map(result => result.json());
    }

}
