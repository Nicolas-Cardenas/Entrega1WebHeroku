# 202120_S1_E1
Descripcion Proyecto:
* Tellevo.com es una plataforma de car-pooling que une a usuarios conductores que tienen cupos libres en sus viajes con usuarios pasajeros que necesitan movilizarse en la misma ruta del conductor. En la aplicación web, los conductores, antes de realizar un viaje intermunicipal, van a poder registrar el viaje en la plataforma, junto con datos como los cupos disponibles, la ruta y el precio que cobrará. Los usuarios por su parte pueden ver los viajes que estén disponibles y reservar su cupo en el viaje de su preferencia. A su vez, también van a poder enviarle mensajes al conductor y escoger el método de pago que prefieran. Si deciden pagar con tarjeta, la aplicación también permite que el usuario almacene la tarjeta para futuros pagos.  Los viajes realizados van a contar con un mapa donde se desplegara su trayecto, un conductor, el cual tiene un vehículo asociado, y la ubicación de tal vehículo durante el recorrido del viaje. 

URL live demo de la aplicación:

Instrucciones de uso: 
* Para realizar las pruebas, se deben ejecutar las colecciones que están en Postman. Todas las pruebas incluyen el login de un usuario. Por tal motivo, para poder ver la funcionalidad de los endpoints, primero se debe crear el usuario usando la prueba y, posteriormente, utilizando el token que el servidor devuelve, realizar las pruebas de los end-points. De no hacerse de tal forma, no se tendrá acceso a los end-points hasta que no se autentique. 

Algunas urls que se pueden probar tanto para POST, GET, DELETE y PUT: 

POST y GET all
* http://localhost:3001/api/pagos
* http://localhost:3001/api/pasajeros
* http://localhost:3001/api/viajes
* http://localhost:3001/api/tarjetas
* http://localhost:3001/api/calificaciones 
...

PUT, GET, DELETE
* http://localhost:3001/api/pagos/1
* http://localhost:3001/api/pasajeros/1
* http://localhost:3001/api/viajes/1
...

URL funcionalidad del proyecto: 
https://youtu.be/w5TWfgOQ2aU
