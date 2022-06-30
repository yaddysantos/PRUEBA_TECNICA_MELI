import axios from "axios"
import cheerio from "cheerio"
import mysql from "mysql"

// axios.get("https://listado.mercadolibre.com.co/listado-celular")
//     .then((res)=>{
//         res.data
//     })


var paginas = 5;
var CantidadItems = 0;
var Contador = 1;
var url = "";

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
    
}
console.log("Cantidad productos = " + CantidadItems + "\n" 
            +"Contador paginas = " + Contador + "\n") // contarlos


//conexion base de datos
var mysqlconection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    database: "",
    user: "",
    password:""
});
mysqlconection.connect();

mysqlconection.query("insert into values()")