############################  proyecto de simulación financiera #############################

Se ha desarrollado utilizando Node.js con Express para el backend y React para el frontend. Se desarrollo una API REST para el registro de pagos generando un recurso QR y consulta de estatus de pagos

Herramientas:

* Nodejs

* Express.js

* Axios

* Reactjs

* Jest

############################  Instrucciones de instalacion #############################

1. - Para instalar

Clonamos o desacargamos el repositorio git clone https://github.com/thenoise2000/mern-simulator Dirijase a la raiz del proyecto

2. - Instalar dependencias

cd mern-simulator/server
npm install

cd ../client
npm install

3. - Ejecutar el servidor
cd ../server
npm run dev (o npm start)

4. - Ejecutar el cliente
cd ../client
npm start

############################  Instrucciones de ejecucion #############################

- Paso 1: Para utilizar esta api primero debera Realiza una solicitud POST en la url http://localhost:5000/api/create-payment

Primero, necesitamos obtener una dirección de billetera válida. Para hacer esto, realiza una solicitud POST al endpoint /api/create-payment con un valor para fundsGoal. Por ejemplo:

URL: http://localhost:5000/api/create-payment
Método: POST
Encabezados:
client-api-key: o0z8y85rjdx28iqef32f4mrl6e56b71742437588342
content-type: application/json

![image1](https://github.com/user-attachments/assets/afdd4b7f-d603-428b-ad6b-b69fdd8fc3bc)

Cuerpo (raw/JSON):

JSON

{
  "fundsGoal": 10
}

############## IMage2 ##################

Envía la solicitud.
En la respuesta, busca el campo "address" dentro del objeto "data". Este valor es la dirección de la billetera que necesitamos para las consultas de estatus de pago.

- Paso 2: Usa la dirección de la billetera en la solicitud http://localhost:5000/api/payment-status

Realiza una solicitud GET al endpoint con los parámetros de consulta:

URL: http://localhost:5000/api/payment-status
Método: GET
Headers:

client-api-key: o0z8y85rjdx28iqef32f4mrl6e56b71742437588342
content-type: application/json
Parámetros (Params):

network: BSC
address: 0xF0aa1D166d26f18E0EDdB06E4cfCfc13B705B655

############## IMage3 ##################


Envía la solicitud.

############## IMage4 ##################


- Paso 3: Para ejecutar tests

Ejecutar el cliente
cd ../client
npm run test

                       /** Analisis de la solucion **/

Esquema de Arquitectura

La arquitectura del proyecto se divide en dos partes principales:

* Frontend (React):
Interfaz de usuario interactiva para la simulación financiera.
Comunicación con el backend a través de peticiones HTTP.
Gestión del estado de la aplicación con React Hooks.

* Backend (Node.js con Express):
API REST para manejar las peticiones del frontend.
Lógica de negocio para los cálculos financieros.
Posible integración con una base de datos para persistencia de datos (si es necesario).

###########################  Image 5 ################################

Secuencia para la Simulación de un Pago:

1 - El usuario introduce los datos del pago en el frontend.
2 - El frontend envía una petición POST al backend con los datos del pago.
3 - El backend realiza los cálculos necesarios y devuelve el resultado al frontend.
4 - El frontend muestra el resultado al usuario.

Secuencia para la Consulta del Estado de un Pago:

1 - El usuario solicita el estado de un pago en el frontend.
2 - El frontend envía una petición GET al backend con el ID del pago.
3 - El backend consulta el estado del pago y lo devuelve al frontend.
4 - El frontend muestra el estado del pago al usuario.

Simulacion de pago
 
El usuario introduce los datos del pago en el frontend y envia una peticion POST con los datos del pago

###########################  Image 6 ################################


El backend realiza los cálculos necesarios y devuelve el resultado al frontend


###########################  Image 7 ################################


Generacion del QA correspondiente al pago realizado

###########################  Image 8 ################################

Exportacion de resultados a un archivo CSV 

###########################  Image 9 ################################

###########################  Image 10 ################################

Revisar Pago 

El botón hará una consulta sobre si ya recibió pago la wallet creada en el Single payment. Esta 
consulta se hace cada vez que hacemos click en el botón

###########################  Image 11 ################################
