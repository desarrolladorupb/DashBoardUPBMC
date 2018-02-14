import { Component, OnInit } from '@angular/core';
import { } from 'jquery';
import { } from 'select2'
import { } from 'bootstrap';
import { } from 'bootstrap-datepicker';
import { } from 'jquery.datatables';
import { Chart } from 'angular-highcharts';
import { AdministracionService } from '../services/administracion.service';
import { Constantes } from './../utilidades/constantes';

@Component({
    selector: 'app-ur',
    templateUrl: './ur.component.html',
    styleUrls: ['./ur.component.css'],
    providers: [AdministracionService]
})
export class UrComponent implements OnInit {
    lstComite: any[] = [];
    lstPrograma: any[] = [];
    token: String = "";
    fechaInicio: String;
    fechaFin: String;
    lstResultado: any[] = [];
    chartComoConocioaiesec: Chart;
    chartOpenMes: Chart;
    chartOpenUniversidad: Chart;
    constantes: Constantes;
    constructor(private _administracionService: AdministracionService) { }

    ngOnInit() {
        this.consultarComite();
        this.consultarPrograma();
        this.inicializarTablas();
        this.constantes = new Constantes();
    }

    inicializarTablas() {
        $("#tblComoConocioAiesec").DataTable({ "paging": false, "searching": false });
        $("#tblOpenMes").DataTable({ "paging": false, "searching": false });
        $("#tblOpenUniversidad").DataTable({ "paging": false, "searching": false });
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
        this._administracionService.getProgramaOgx()
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
        if (this.validar()) {
            $(".preload").css({ "display": "flex" }).show("slow");
            let programa = this.getSelectPrograma();

            let servicio = "open_ogv";
            switch (programa.id) {
                case 4:
                    servicio = "open_ogv";
                    break;
                case 5:
                    servicio = "open_oge";
                    break;
                case 6:
                    servicio = "open_ogt";
                    break;
            }
            this.lstResultado = [];

            let codigoComite = $("#cmbComite").val();

            this._administracionService.getInfoPodio(servicio
                , this.fechaInicio
                , this.fechaFin
                , <String>codigoComite).subscribe(
                result => {
                    this.lstResultado = result;
                    $("#tblComoConocioAiesec").DataTable().clear().draw();
                    $("#tblOpenMes").DataTable().clear().draw();
                    $("#tblOpenUniversidad").DataTable().clear().draw();
                    this.generarTabla();
                },
                error => {
                    console.log(<any>error);
                });

        }

    }

    generarTabla() {

        let lstResultadoHowMeet: any[] = this.lstResultado["lstResultadoHowMeet"];
        let lstResultadoOpenMes: any[] = this.lstResultado["lstResultadoOpenMes"];
        let lstResultadoOpenUniversidad: any[] = this.lstResultado["lstResultadoOpenUniversidad"];

        var seriesConocioAiesec: any[] = []
        var conocioAiesecMax = 0

        var seriesOpenPorMes: any[] = []
        var openPorMesMax = 0;

        var seriesOpenPorUniversidad: any[] = []
        var openPorUniversidadMax = 0

        let that = this;


        $.each(lstResultadoHowMeet, function (index, value) {
            conocioAiesecMax += value;
        });

        $.each(lstResultadoOpenMes, function (index2, value2) {
            openPorMesMax += value2;
        });

        $.each(lstResultadoOpenUniversidad, function (index3, value3) {
            openPorUniversidadMax += value3;
        });

        $.each(lstResultadoHowMeet, function (index, value) {
            $("#tblComoConocioAiesec").DataTable().row.add([
                index, value
            ]).draw();
            seriesConocioAiesec.push({
                name: index,
                y: (value * 100) / conocioAiesecMax,
                drilldown: index
            });
        });

        this.generarGraficaComoConocioAiesec(
            seriesConocioAiesec,
            "Como conocio aiesec",
            "Total open");

        $.each(lstResultadoOpenMes, function (index2, value2) {

            $("#tblOpenMes").DataTable().row.add([
                that.constantes.getNombreMes(index2 + ""), value2
            ]).draw();
            seriesOpenPorMes.push({
                name: index2,
                y: (value2 * 100) / openPorMesMax,
                drilldown: index2
            });
        });

        this.generarGraficaOpenMes(
            seriesOpenPorMes,
            "Open por mes",
            "Total open");

        $.each(lstResultadoOpenUniversidad, function (index3, value3) {
            $("#tblOpenUniversidad").DataTable().row.add([
                index3, value3
            ]).draw();
            seriesOpenPorUniversidad.push({
                name: index3,
                y: (value3 * 100) / openPorUniversidadMax,
                drilldown: index3
            });
        });

        this.generarGraficaUniversidad(
            seriesOpenPorUniversidad,
            "Open por universidad",
            "Total open");

        $(".preload").hide("slow");
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
            return false
        } else {
            return true;
        }
    }

    generarGraficaComoConocioAiesec(seriesConocioAiesec: any[], titulo: string, texto: string) {

        this.chartComoConocioaiesec = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: titulo
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: texto
                }

            },
            plotOptions: {
                series: {

                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
            },
            series: [{
                name: '%',
                data: seriesConocioAiesec
            }]
        });
    }

    generarGraficaOpenMes(seriesConocioAiesec: any[], titulo: string, texto: string) {

        this.chartOpenMes = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: titulo
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: texto
                }

            },
            plotOptions: {
                series: {

                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
            },
            series: [{
                name: '%',
                data: seriesConocioAiesec
            }]
        });
    }

    generarGraficaUniversidad(seriesConocioAiesec: any[], titulo: string, texto: string) {

        this.chartOpenUniversidad = new Chart({
            chart: {
                type: 'column'
            },
            title: {
                text: titulo
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: texto
                }

            },
            plotOptions: {
                series: {

                    dataLabels: {
                        enabled: true,
                        format: '{point.y:.1f}'
                    }
                }
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}</b><br/>'
            },
            series: [{
                name: '%',
                data: seriesConocioAiesec
            }]
        });
    }

}
