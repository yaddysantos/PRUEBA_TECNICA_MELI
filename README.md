# DESAFÍO TÉCNICO
En este proceso se lleva a cabo como Scrapear un Website con Node.js

1. Se lleva a cabo la creación del proyecto con la siguiente línea de comando en la terminal. (Se crea por defecto un archivo llamado package.json ya que aquí iran las dependencias que iran del proyecto, y así estará en el repositorio de github).
```
npm init -y
```
2. Ahora, se requiere instalar Cheerio que es una herramienta rápida, flexible y facíl para analizar HTML, así mismo Axios, ya que este es un cliente HTTP que nos permitira hacer peticiones a un servidor basados en promesas para node.js
```
npm i axios cheerio
```
3. Y por último instalamos dependencia de MySql para poder hacer la conexión e inserción de los datos.
```
npm i mysql
```
4. Empezamos a inspeccionar la estructura HTML de la pagina web que se va a extraer los datos.

PASOS DEL DESARROLLO
* Importamos estas dependencias creadas
* Se tiene alojada la base de datos remotamente en un servidor, y luego se crea la conexión (Linea 11 y 18). 
* La idea es consultar los productos de las 5 primeras páginas del siguiente link https://listado.mercadolibre.com.ar/celular-smarphones, por medio de axios.get() se anexa dicho link y el resultado se carga con cheerio. (Linea 28, 29)
*  Se adquiere la clase padre que contendrá todos los hijos, en este caso la lista de los productos en base a la búsqueda de celular smartphone (Linea 31, 32). Tener en cuenta que para navegar en las 5 primeras páginas se modificaría la url (Linea 25) 
*  Luego se recorre cada producto de la página para adquirir la información y ser guardardad en nuestra base de datos. (Linea 35-49).
* Y por último se cierra la conexión y el proceso.

# DESAFÍO TEÓRICO

Procesos, hilos y corrutinas

* Un caso en el que usarías procesos para resolver un problema y por qué.
```
El caso para usar procesos sería una suma donde tenemos un elemento A y B, ya que conocemos dichos valores y se necesita el uno del otro para poder ejecutar la suma. 
```

* Un caso en el que usarías threads para resolver un problema y por qué.
```
En los threads podemos paralelizar K sumas diferentes, es decir, si necesitaramo ejecutar la suma de N grupos de valores, en este caso se podría ejecutar de a N hilos para que cada uno ejecute la suma siendo independiente.
```

* Un caso en el que usarías corrutinas para resolver un problema y por qué.
```
En las corrutinas tiene una diferencia a los anteriores, ya que este puede detenerse o reanudarse para evitar algún consumo innecesario, un problema sería una dll ejecutandose y este solo se activaría cada cierto tiempo o en cada acción que este reciba.
```

Optimización de recursos del sistema operativo

* Si tuvieras 1.000.000 de elementos y tuvieras que consultar para cada uno de ellos
información en una API HTTP. ¿Cómo lo harías? Explicar.
```
Al realizar la solicitud HTTP GET desde la API (modular) con la URI del elemento y nos devuelve los detalles de cada uno, las consultas al api se seccionarian por N cantidad de elementos o lotes de manera independiente, dado que la cantidad total tiene un tamaño demasiado grande para una única consulta.
```