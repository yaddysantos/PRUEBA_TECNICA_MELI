import axios from "axios"
import cheerio from "cheerio"
import mysql from "mysql"

// axios.get("https://listado.mercadolibre.com.co/listado-celular")
//     .then((res)=>{
//         res.data
//     })


var paginas = 1;
var CantidadItems = 0;
var Contador = 1;
var url = "";

//conexion base de datos
// var mysqlconection = mysql.createConnection({
//     host: "http://mysql-repository.mysql.database.azure.com/",
//     port: 3306,
//     database: "productos_meli",
//     user: "invitado",
//     password:"invitado1234"
// });
// mysqlconection.connect();

//Valores

//Recorrer las (5) paginas 
for (let page = 1; page <= paginas; page++) {

    if (page > 1) { //Si es >1 quiere decir que esta en la siguiente pagina, se anexa en la url lo faltante
        Contador += 50;
        url = "_Desde_" + Contador + "_Nopage_True"
    }
    //obtener la pagina y la renderizada
    var { data } = await axios.get("https://listado.mercadolibre.com.ar/celular-smarphones" + url)
    const $ = cheerio.load(data)
    //buscar los elementos por la clase
    const listaItems = $(".ui-search-layout__item")
    CantidadItems += listaItems.length

    for (let i = 0; i < listaItems.length; i++) {
        var padreItem = cheerio.load(listaItems.get(i))
        const DetalleProducto = padreItem(".ui-search-item__title").text()
        console.log(DetalleProducto);
        const PrecioProducto = padreItem(".price-tag-fraction").text()
        
        console.log("indice i="+i+" /// "+(padreItem != undefined));
        var Ranking = 0, startFull = 0, startHalf =0;
        if (padreItem != undefined) {
            startFull = padreItem(".ui-search-icon--star-full").length;
            startHalf = padreItem(".ui-search-icon--star-half").length * 0.5;
        }
        Ranking += startFull + startHalf;
        console.log(Ranking);
    }
}
//console.log("Cantidad productos = " + CantidadItems + "\n"
   // + "Contador paginas = " + Contador + "\n") // contarlos



//mysqlconection.query("insert into PRODUCTO (detalle, precio, tipo_envio, ranking, disponibilidad) values()")