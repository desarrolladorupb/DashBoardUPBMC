
import { Component, OnInit } from '@angular/core';

import { } from 'jquery';
import { } from 'select2'
import { } from 'bootstrap';
import { } from 'bootstrap-datepicker';
import { } from 'jquery.datatables';
import { AdministracionService } from '../services/administracion.service';
import { OperacionesService } from './../services/operaciones.service';


@Component({
    selector: 'app-od',
    templateUrl: './od.component.html',
    styleUrls: ['./od.component.css'],
    providers: [AdministracionService, OperacionesService]
})
export class OdComponent implements OnInit {

    lstWeeklyInicial: any[] = [];
    lstWeeklyFinal: any[] = [];
    lstPrograma: any[] = [];
    token: String = "";
    fechaInicio: String;
    fechaFin: String;
    lstResultado: any[] = [];

    constructor(private _administracionService: AdministracionService,
        private _operacionesService: OperacionesService) { }

    ngOnInit() {
        this.consultarSemana();
        this.consultarPrograma();
        this.crearLista();
    }

    crearLista() {
        $("#tblComites").DataTable({
            "scrollX": true
            , scrollCollapse: true
            ,paging: false
        });
    }

    consultarPrograma() {
        this._administracionService.getPrograma()
            .subscribe(resul => {
                this.lstPrograma = resul;
                $("#cmbPrograma").select2();
            },
            error => {
                console.log(<any>error)
            });
    }

    consultarSemana() {
        this._administracionService.getWeekly()
            .subscribe(result => {
                this.lstWeeklyFinal = result;
                this.lstWeeklyInicial = result;
                $("#cmbFechaInicial").select2();
                $("#cmbFechaFinal").select2();

            },
            erro => {
                console.log(<any>erro);
            });
    }

    getSelectPrograma() {
        for (let programa of this.lstPrograma) {
            if (programa.id == $("#cmbPrograma").val()) {
                return programa;
            }
        }
    }

    getSelectFechaInicial() {
        for (let fechaInicial of this.lstWeeklyInicial) {
            if (fechaInicial.init_date == $("#cmbFechaInicial").val()) {
                return fechaInicial;
            }
        }
    }
    getSelectFechaFinal() {
        for (let fechaFinal of this.lstWeeklyFinal) {
            if (fechaFinal.final_date == $("#cmbFechaFinal").val()) {
                return fechaFinal;
            }
        }
    }
    btnConsultarClick() {
        if (this.validar()) {
            $(".preload").css({ "display": "flex" }).show("slow");
            let programa = this.getSelectPrograma();
            let fechaFinal = this.getSelectFechaFinal();
            let fechaInicial = this.getSelectFechaInicial();
            this._administracionService.getLcPerformance(this.getSelectFechaInicial().init_date
                , this.getSelectFechaFinal().final_date
                , programa.id).subscribe(result => {
                    this.lstResultado = result;
                    this.crearTable();
                },
                error => {
                    console.log(<any>error);
                });
        }
    }

    crearTable() {
        $("#tblComites").DataTable().clear().draw();
        $.each(this.lstResultado, function (index, value) {
            var planApplications = value["Applications"]["plan"];
            var cumplidoApplications = value["Applications"]["cumplido"];
            var cumplimientoPorApplications = "100";
            if (planApplications > 0){
                cumplimientoPorApplications = ((cumplidoApplications * 100) / planApplications).toFixed(1);
            }
            var gabApplications = planApplications - cumplidoApplications;
            var crecimientoAbsApplications = cumplidoApplications - value["Applications"]["cumplidoAnioanterior"];
            
            var crecimientoRelApplications = "100";

            if (value["Applications"]["cumplidoAnioanterior"] > 0){
                crecimientoRelApplications = ((crecimientoAbsApplications * 100) / value["Applications"]["cumplidoAnioanterior"]).toFixed(1);
            }

            var planAccepted = value["Accepted"]["plan"];
            var cumplidoAccepted = value["Matched"]["cumplido"];
            var cumplimientoPorAccepted = "100";
            if (planAccepted > 0 ){
                cumplimientoPorAccepted =  ((cumplidoAccepted * 100) / planAccepted).toFixed(1);   
            }
            var gabAccepted = planAccepted - cumplidoAccepted;
            var crecimientoAbsAccepted = cumplidoAccepted - value["Accepted"]["cumplidoAnioanterior"];
            var crecimientoRelAccepted = "100";
            if (value["Accepted"]["cumplidoAnioanterior"]){
                crecimientoRelAccepted = ((crecimientoAbsAccepted * 100) / value["Accepted"]["cumplidoAnioanterior"]).toFixed(1);
            }
            
            var planApprovals = value["Approvals"]["plan"];
            var cumplidoApprovals = value["Approvals"]["cumplido"];
            var cumplimientoPorApprovals = "100";
            if (planApprovals > 0){
                cumplimientoPorApprovals = ((cumplidoApprovals * 100) / planApprovals).toFixed(1);
            }
            var gabApprovals = planApprovals - cumplidoApprovals;
            var crecimientoAbsApprovals = cumplidoApprovals - value["Approvals"]["cumplidoAnioanterior"];
            var crecimientoRelApprovals = "100";
            if (value["Approvals"]["cumplidoAnioanterior"] > 0){
                crecimientoRelApprovals = ((crecimientoAbsApprovals * 100) / value["Approvals"]["cumplidoAnioanterior"]).toFixed(1);
            }
            
            var planRealized = value["Realized"]["plan"];
            var cumplidoRealized = value["Realized"]["cumplido"];
            var cumplimientoPorRealized = "100";
            if (planRealized > 0){
                cumplimientoPorRealized = ((cumplidoRealized * 100) / planRealized).toFixed(1);
            }
            var gabRealized = planRealized - cumplidoRealized;
            var crecimientoAbsRealized = cumplidoRealized - value["Realized"]["cumplidoAnioanterior"];
            
            var crecimientoRelRealized = "100";
            if(value["Realized"]["cumplidoAnioanterior"] > 0){
                var crecimientoRelRealized = ((crecimientoAbsRealized * 100) / value["Realized"]["cumplidoAnioanterior"]).toFixed(1);
            }

            var planCompleted = value["Completed"]["plan"];
            var cumplidoCompleted = value["Completed"]["cumplido"];
            var cumplimientoPorCompleted = "100";
            if (planCompleted > 0){
                cumplimientoPorCompleted = ((cumplidoCompleted * 100) / planCompleted).toFixed(1);
            }
            var gabCompleted = planCompleted - cumplidoCompleted;
            var crecimientoAbsCompleted = cumplidoCompleted - value["Completed"]["cumplidoAnioanterior"];
            
            var crecimientoRelCompleted = "100";
            
            if(value["Completed"]["cumplidoAnioanterior"] > 0){
                crecimientoRelCompleted = ((crecimientoAbsCompleted * 100) / value["Completed"]["cumplidoAnioanterior"]).toFixed(1);
            }
        
            var planFinished = value["Finished"]["plan"];
            var cumplidoFinished = value["Finished"]["cumplido"];
            var cumplimientoPorFinished = "100";
            if (planFinished > 0){
                cumplimientoPorFinished = ((cumplidoFinished * 100) / planFinished).toFixed(1);
            }
            var gabFinished = planFinished - cumplidoFinished;
            var crecimientoAbsFinished = cumplidoFinished - value["Finished"]["cumplidoAnioanterior"];

            var crecimientoRelFinished = "100";
            if (value["Finished"]["cumplidoAnioanterior"] > 0){
                crecimientoRelFinished = ((crecimientoAbsFinished * 100) / value["Finished"]["cumplidoAnioanterior"]).toFixed(1);
            }
            
            var lc = index;
            $("#tblComites").DataTable().row.add([
                lc
                , planApplications
                , cumplidoApplications
                , cumplimientoPorApplications + "%"
                , gabApplications
                , crecimientoAbsApplications
                , crecimientoRelApplications

                , planAccepted
                , cumplidoAccepted
                , cumplimientoPorAccepted + "%"
                , gabAccepted
                , crecimientoAbsAccepted
                , crecimientoRelAccepted

                , planApprovals
                , cumplidoApprovals
                , cumplimientoPorApprovals + "%"
                , gabApprovals
                , crecimientoAbsApprovals
                , crecimientoRelApprovals

                , planRealized
                , cumplidoRealized
                , cumplimientoPorRealized + "%"
                , gabRealized
                , crecimientoAbsRealized
                , crecimientoRelRealized

                , planCompleted
                , cumplidoCompleted
                , cumplimientoPorCompleted + "%"
                , gabCompleted
                , crecimientoAbsCompleted
                , crecimientoRelCompleted

            ]).draw();


        });
        $(".preload").hide("slow");
    }

    validar() {

        if ($("#cmbPrograma").val() == "Seleccione un Programa") {
            swal("Alerta", "Seleccione una un programa", "warning");
            return false;
        } else if ($("#cmbFechaInicial").val() == "Semana Inicial") {
            swal("Alerta", "Seleccione una fecha de inicio", "warning");
            return false;
        } else if ($("#cmbFechaFinal").val() == "Semana Final") {
            swal("Alerta", "Seleccione una fecha de final", "warning");
            return false
        } else {
            return true;
        }
    }
}


