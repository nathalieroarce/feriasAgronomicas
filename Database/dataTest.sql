select sp_insertEnterprise('Empresa2', 'https://es.freelogodesign.org/img/logo-ex-7.png', 'descripcion', 'Josua Car', '1-1232-1113','se@gmail.com',
	'112dydfe64', '2343-4242', false, 0, 'lugar','POINT(-71.060316 48.432044)', 'POINT(-71.060316 48.432044)');

select sp_insertEnterprise('Empresa 3', 'https://es.freelogodesign.org/img/logo-ex-7.png', 'descripcion', 'Josua Carranza', '1-1232-1113','se@gmail.com',
	'112dydfe64', '2343-4242', false, 0, 'lugar','POINT(-71.060316 48.432044)', 'POINT(-71.060316 48.432044)');


insert into orders (enterpriseID, clientID, totalAmount, directionName, observations, destinationAddress) 
VALUES (1,2, 3226, 'Limón', '-', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326)),
(1,5, 3576, 'Palmares', '-', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326)),
(1,2, 4566, 'Santa Rosa', '-', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326)),
(1,5, 8566, 'Guatuso', '-', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326));

insert into orders (enterpriseID, clientID, totalAmount, directionName, observations, destinationAddress,paid)  values
(1,5, 357996, 'Heredia', 'heredia 21', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326),false);
select sp_getPendingOrders(1);
select * from orders where orderID=3
update orders set orderSent=true where orderID=3

update orders set paid=true where orderID=19

select * from products

select * from notifications

select * from orders where paid=true

insert into productTypes(typeName) values ('Frutas'),('Legumbres'),('Vegetales');

select * from enterprises

select * from enterprises

insert into products(
   enterpriseID ,
   productName ,
   code ,
   price,
   unit, --true sell in kg, false in bags
   image,
   productType,
   description ,
   stock
) values
  (1,'Manzana','00rt',600,'U','"https://storage.googleapis.com/feriasagronomicasproductos/1525918318224mango-transportado-en-avion.jpg.jpg',1,'manzana del atlántico',30),
  (1,'Manzana2','00rt',600,'U','https://storage.googleapis.com/feriasagronomicasproductos/1525918318224mango-transportado-en-avion.jpg.jpg',1,'manzana del atlántico',0),
  (1,'Manzana3','00rt',600,'U','https://storage.googleapis.com/feriasagronomicasproductos/1525918318224mango-transportado-en-avion.jpg.jpg',1,'manzana del atlántico',10),
  (2,'Mango','00rt',600,'B','https://storage.googleapis.com/feriasagronomicasproductos/1525918318224mango-transportado-en-avion.jpg.jpg',1,'mango del atlántico',0),
  (2,'Naranja','00rt',600,'U','https://storage.googleapis.com/feriasagronomicasproductos/1525918318224mango-transportado-en-avion.jpg.jpg',1,'Naranja del atlántico',30),
  (2,'Piña','00rt',600,'U','https://storage.googleapis.com/feriasagronomicasproductos/1525918318224mango-transportado-en-avion.jpg.jpg',1,'Piña del atlántico',10);

select * from orders

select * from productTypes

select * from products

select * from orderProducts
-- para pruebas
insert into orderProducts(orderID,productID,price, purchasedAmount, totalAmount) VALUES
(10, 1, 4545,2 , 4545*2),
(10, 2, 6000, 3, 6000*3 ),
(10, 3, 2000, 4, 2000*4),
(10, 7, 3000, 5,3000*5 )

select * from enterprises

