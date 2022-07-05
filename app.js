import axios from "axios"
import cheerio from "cheerio"
import mysql from "mysql"

var paginas = 5;
var CantidadItems = 0;
var Contador = 1;
var url = "";

//conexion base de datos Azure MySQL, remotamente
var mysqlconection = mysql.createConnection({
    host: "mysql-repository.mysql.database.azure.com",
    port: 3306,
    database: "productos_meli",
    user: "invitado",
    password: "invitado1234"
});
mysqlconection.connect(null, (err) => {
    if (err)
        console.log(err)
});

//Recorrer las (5) paginas 
for (let page = 1; page <= paginas; page++) {

    if (page > 1) { //Si es >1 quiere decir que esta en la siguiente pagina, se anexa en la url lo faltante
        Contador += 50;
        url = "_Desde_" + Contador + "_Nopage_True"
    }
    //obtener la pagina y la renderizada
    var { data } = await axios.get("https://listado.mercadolibre.com.ar/celular-smarphones" + url)
    const $ = cheerio.load(data)
    //Buscar los elementos por la clase
    const listaItems = $(".ui-search-layout__item")
    CantidadItems += listaItems.length

    for (let i = 0; i < listaItems.length; i++) {
        var padreItem = cheerio.load(listaItems.get(i))
        const DetalleProducto = padreItem(".ui-search-item__title").text()
        const PrecioProducto = padreItem(".price-tag-fraction").text()
        const DctoProducto = padreItem(".ui-search-price__second-line .price-tag-fraction").text()
        const Dcto = padreItem(".ui-search-price__discount").text()
        const VendedorProducto = padreItem(".ui-search-official-store-label").text()

        var Ranking = 0, startFull = 0, startHalf = 0;
        if (padreItem != undefined) {
            startFull = padreItem(".ui-search-icon--star-full").length;
            startHalf = padreItem(".ui-search-icon--star-half").length * 0.5;
        }
        Ranking += startFull + startHalf;
        //Insercion de la información requerida a la BD
        mysqlconection.query(`insert into PRODUCTOS values ('${VendedorProducto}', '${DetalleProducto}', '${PrecioProducto}', '${Dcto}', '${DctoProducto}', '${Ranking}', ${page})`);
    }
    console.log("Cantidad productos = " + CantidadItems)
}

console.log("Proceso guardado XD.")
//Cerrar el proceso del MySql
mysqlconection.end();
process.exit(0);