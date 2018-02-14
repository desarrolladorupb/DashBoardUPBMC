import { Component, OnInit } from '@angular/core';
import { } from 'jquery';
import { } from 'select2'
import { } from 'bootstrap';
import { } from 'bootstrap-datepicker';
import { } from 'jquery.datatables';
import { } from 'sweetalert'
import { AdministracionService } from '../services/administracion.service';
import { OperacionesService } from './../services/operaciones.service';
import { Constantes } from './../utilidades/constantes';

@Component({
    selector: 'app-icx-coperaciones',
    templateUrl: './icx-coperaciones.component.html',
    styleUrls: ['./icx-coperaciones.component.css'],
    providers: [AdministracionService, OperacionesService]
})
export class IcxCoperacionesComponent implements OnInit {
    lstComite: any[] = [];
    lstPrograma: any[] = [];
    token: String = "";
    fechaInicio: String;
    fechaFin: String;
    lstResultado: any[] = [];
    lstResultadoApproved: any[] = [];
    resultados = 0;
    constantes: Constantes;

    constructor(private _administracionService: AdministracionService,
        private _operacionesService: OperacionesService) { 
            this.constantes = new Constantes();
        }

    ngOnInit() {
        this.consultarComite();
        this.consultarPrograma();
        this.inicializarTablas();
    }
    inicializarTablas() {
        $(document).ready(function () {
            $("#tblPaises").DataTable({ "paging": false, "searching": false });
            $("#tblComites").DataTable({ "paging": false, "searching": false });
        });
    }

    consultarComite() {

        this._administracionService.getComite()
            .subscribe(resul => {
                this.lstComite = resul;
                $("#cmbComite").select2();
            },
            error => {
                console.log(<any>error)
            });
    }

    consultarPrograma() {
        this._administracionService.getProgramaIcx()
            .subscribe(resul => {
                this.lstPrograma = resul;
                $("#cmbPrograma").select2();
            },
            error => {
                console.log(<any>error)
            });
    }
    getSelectPrograma() {
        for (let programa of this.lstPrograma) {
            if (programa.id == $("#cmbPrograma").val()) {
                return programa;
            }
        }
    }
    btnConsultarClick() {

        $("#tblPaises").DataTable().clear().draw();
        $("#tblComites").DataTable().clear().draw();
        this.lstResultado = [];
        this.lstResultadoApproved = [];
        if (this.token == "") {
            this._administracionService.getTokenAdministrador()
                .subscribe(result => {
                    this.token = result.token;
                    this.resultados = 2;
                    this.consultarApproved(1);
                    this.consultar(1);
                }
                , error => {
                    console.log(<any>error);
                });
        } else {
            this.resultados = 2;
            this.consultarApproved(1);
            this.consultar(1);
        }

    }
    consultar(pagina: number) {
        if (this.validar()) {
            $(".preload").css({ "display": "flex" }).show("slow");
            let codigoComite = $("#cmbComite").val();
            let programa = this.getSelectPrograma();
            console.log(codigoComite);
            this._operacionesService.getConsultaRealizeIgx(this.token,
                this.fechaInicio,
                this.fechaFin,
                <String>programa.code_expa
                , <String>codigoComite
                , pagina.toString())
                .subscribe(
                result => {
                    var data = result["data"];
                    var page = parseInt(result["paging"]["current_page"]);
                    for (let resultado of data) {
                        this.lstResultado.push(resultado);
                    }

                    if (data.length >= this.constantes.getNumeroPeticionesHoja()) {
                        ++page;
                        this.consultar(page);
                    } else {
                        --this.resultados;
                        if(this.resultados == 0){
                            $(".preload").hide("slow");
                            this.generarTablas();
                        }
                    }
                },
                error => {
                    console.log(<any>error);
                }
                );
        }
    }

    consultarApproved(pagina: number) {
        if (this.validar()) {
            $(".preload").css({ "display": "flex" }).show("slow");
            let codigoComite = $("#cmbComite").val();
            let programa = this.getSelectPrograma();
            console.log(codigoComite);
            this._operacionesService.getConsultaApprovedIgx(this.token,
                this.fechaInicio,
                this.fechaFin,
                <String>programa.code_expa
                , <String>codigoComite
                , pagina.toString())
                .subscribe(
                result => {
                    var data = result["data"];
                    var page = parseInt(result["paging"]["current_page"]);
                    for (let resultado of data) {
                        this.lstResultadoApproved.push(resultado);
                    }

                    if (data.length >= this.constantes.getNumeroPeticionesHoja()) {
                        ++page;
                        this.consultar(page);
                    } else {
                        --this.resultados;
                        if(this.resultados == 0){
                            $(".preload").hide("slow");
                            this.generarTablas();
                        }
                    }
                },
                error => {
                    console.log(<any>error);
                }
                );
        }
    }

    generarTablas() {
        let lstPais = {};
        let lstComite = {};
        for (let oportunidad of this.lstResultado) {
            let office = oportunidad["person"]["home_lc"];
            if (lstPais[office["country"]] != undefined) {
                lstPais[office["country"]]["realize"] += 1;
            } else {
                lstPais[office["country"]] = {"realize": 0, "approved": 0};
                lstPais[office["country"]]["realize"] = 1;
            }
            if (lstComite[office["name"]] != undefined) {
                lstComite[office["name"]]["realize"]  += 1;
            } else {
                lstComite[office["name"]] = {"realize": 0, "approved": 0};
                lstComite[office["name"]]["realize"] = 1;
            }
        }

        for (let oportunidadApproved of this.lstResultadoApproved){
            let office = oportunidadApproved["person"]["home_lc"];
            if (lstPais[office["country"]] != undefined) {
                lstPais[office["country"]]["approved"] += 1;
            } else {
                lstPais[office["country"]] = {"realize": 0, "approved": 0};
                lstPais[office["country"]]["approved"] = 1;
            }
            if (lstComite[office["name"]] != undefined) {
                lstComite[office["name"]]["approved"]  += 1;
            } else {
                lstComite[office["name"]] = {"realize": 0, "approved": 0};
                lstComite[office["name"]]["approved"] = 1;
            }
        }

        $.each(lstPais, (index, value) => {
            $("#tblPaises").DataTable().row.add([index, value.approved, value.realize]).draw();

        });

        $.each(lstComite, (index, value) => {
            $("#tblComites").DataTable().row.add([index, value.approved, value.realize]).draw();
        });

    }

    validar() {

        if ($("#cmbComite").val() == "Seleccione un Comite") {
            swal("Alerta", "Seleccione una un comite", "warning");
            return false;
        } else if ($("#cmbPrograma").val() == "Seleccione un Programa") {
            swal("Alerta", "Seleccione una un programa", "warning");
            return false;
        } else if (this.fechaInicio == undefined || this.fechaInicio == null) {
            swal("Alerta", "Seleccione una fecha de inicio", "warning");
            return false;
        } else if (this.fechaFin == undefined || this.fechaFin == null) {
            swal("Alerta", "Seleccione una fecha de final", "warning");
            return false
        } else {
            return true;
        }
    }

}
