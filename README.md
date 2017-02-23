# SpreadsheetToJson
Descripción de como leer la info de una planilla de cálculo de gdocs y convertirlo a json

Hoy en día a pesar de las variadas tecnologías que existen, Las planillas de cálculo siguen siendo herramientas muy importantes dado que cualquier persona sabe utilizarlas y muchas veces la info que recibimos viene en este formato. Pero para poder utilizarla dentro de una app necesitamos transformarla y publicarla y puede parecer un proceso muy tedioso, pero afortunadamente las planillas de cálculo de G suite permiten ejecutar macros para poder hacer que esta info sea útil para las apps

Como utilizarlo:
En primer lugar, debemos crear una planilla en SpreadSheet. En la primera fila pondremos los nombres de los campos o propiedades. Luego tenemos que seleccionar en el menú “Herramientas” la opción “Editor de secuencia de comandos” se nos abrirá una ventana del editor de scripts.google.com 
![IMAGEN01](/../master/IMAGEN01.png?raw=true "IMAGEN01")


En ese editor tendremos que copiar el contenido del archivo Codigo.gs que está en este repositorio y luego grabar el archivo con el nombre q deseen.
![IMAGEN02](/../master/IMAGEN02.png?raw=true "IMAGEN02")


A continuación, dentro del menú “Publicar” clickeen en el ítem “Implementar como aplicación web” en el input que pregunta que ha cambiado pongan cualquier texto. 
![IMAGEN03](/../master/IMAGEN03.png?raw=true "IMAGEN03")


En el combo titulado “Ejecutar la aplicación como:” elijan la opción Yo(xxxxxxx@gmail.com) y en el siguiente “Quien tiene acceso a la aplicación:” seleccionen la opción “Cualquier persona, incluso de forma anónima” y finalmente hagan click en “Implementar” les mostrara cual será la url que deberán utilizar, será similar a esta
https://script.google.com/macros/s/AKfycbxb53scZkag8_Brvq0ZMaYDdA3Fn9gly_-vrhvI4eW46-9Y5O-9/exec

Pero, aunque esto está publicado para que funcione deberán agregar algunos parámetros:
spreadsheetID: este es obligatorio es el id del documento a modo de ejemplo les muestro en el link de mi planilla de calculo
https://docs.google.com/spreadsheets/d/17aURH2JZ87dG3gEkhAzxj-gRvD-2V6RBoSfV3Ovq11o/edit#gid=0 el id es 17aURH2JZ87dG3gEkhAzxj-gRvD-2V6RBoSfV3Ovq11o
sheet: este parámetro es opcional, pueden indicar el número de hoja iniciando desde cero o el nombre de la misma
userTimestamp: este parámetro también es opcional, si la fecha que envían es anterior a la fecha de la última modificación de la planilla (o nula) el servicio les transformara el contenido de la planilla en un array de objetos JSON. En la respuesta del servicio se encuentra el timestamp de cada planilla, ese dato es el que deberán enviar la próxima vez que vuelvan a consultarlo

Les dejo el ejemplo del que hice yo
https://script.google.com/macros/s/AKfycbxb53scZkag8_Brvq0ZMaYDdA3Fn9gly_-vrhvI4eW46-9Y5O-9/exec?spreadsheetID=17aURH2JZ87dG3gEkhAzxj-gRvD-2V6RBoSfV3Ovq11o

Espero que les sea útil ☺
TuTa
