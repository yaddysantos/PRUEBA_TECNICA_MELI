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
//     user: "administrador",
//     password:"%uTVtNe7"
// });
// mysqlconection.connect();

//Valores

//Recorrer las (5) paginas 
for (let index = 1; index <= paginas; index++) {

    if (index > 1) { //Si es >1 quiere decir que esta en la siguiente pagina, se anexa en la url lo faltante
        Contador += 50;
        url = "_Desde_" + Contador + "_NoIndex_True"
    }
    //obtener la pagina y la renderizada
    var { data } = await axios.get("https://listado.mercadolibre.com.ar/celular-smarphones" + url)
    const $ = cheerio.load(data)
    //buscar los elementos por la clase
    const listaItems = $(".ui-search-layout__item")
    CantidadItems += listaItems.length

    for (let index = 0; index < listaItems.length; index++) {
        const DetalleProducto = $(".ui-search-item__title").get(index).children[0].data
        //const PrecioProducto = Padre(".price-tag-fraction").get(index).text()
        const startFull = $(".ui-search-reviews__ratings .ui-search-icon--star-full").get(0).children.length;
        const startHalf = $(".ui-search-reviews__ratings .ui-search-icon--star-half").get(0).children.length * 0.5;
        const Ranking = startFull + startHalf;
        console.log(DetalleProducto +"  "+ Ranking)
    }
}
//console.log("Cantidad productos = " + CantidadItems + "\n"
   // + "Contador paginas = " + Contador + "\n") // contarlos



//mysqlconection.query("insert into PRODUCTO (detalle, precio, tipo_envio, ranking, disponibilidad) values()")