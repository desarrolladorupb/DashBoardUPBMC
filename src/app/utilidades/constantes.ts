export class Constantes {
    private servidorExpa: String = "https://gis-api.aiesec.org/v2/";
    //private servidorMC: String = "http://138.197.119.196/";
    private servidorMC:String = "http://127.0.0.1:8000/";

    constructor() { }

    getServicioExpa() {
        return this.servidorExpa;
    }
    getServicioMC() {
        return this.servidorMC;
    }

    getNumeroPeticionesHoja(){
        return 50;
    }

    getNombreMes(codigo: string) {
        console.log(codigo)
        let nombreMes: string = "";
        switch (codigo) {
            case "1":
                nombreMes = "Enero";
                break;

            case "2":
                nombreMes = "Febrero";
                break;

            case "3":
                nombreMes = "Marzo";
                break;
            case "4":
                nombreMes = "Abril";
                break;

            case "5":
                nombreMes = "Mayo";
                break;

            case "6":
                nombreMes = "Junio";
                break;

            case "7":
                nombreMes = "Julio";
                break;

            case "8":
                nombreMes = "Agosto";
                break;

            case "9":
                nombreMes = "Septiembre";
                break;

            case "10":
                nombreMes = "Octubre";
                break;

            case "11":
                nombreMes = "Noviembre";
                break;

            case "12":
                nombreMes = "Diciembre";
                break;

        }
        return nombreMes;
    }
}