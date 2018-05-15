select sp_insertEnterprise('Empresa1', 'https://es.freelogodesign.org/img/logo-ex-7.png', 'descripcion', 'Josua Carranza', '1-1232-1113','se@gmail.com',
	'112dydfe64', '2343-4242', false, 0, 'lugar','POINT(-71.060316 48.432044)', 'POINT(-71.060316 48.432044)');

select sp_insertEnterprise('Empresa 2', 'https://es.freelogodesign.org/img/logo-ex-7.png', 'descripcion', 'Josua Carranza', '1-1232-1113','se@gmail.com',
	'112dydfe64', '2343-4242', false, 0, 'lugar','POINT(-71.060316 48.432044)', 'POINT(-71.060316 48.432044)');




insert into productTypes(typeName) values ('Frutas'),('Legumbres'),('Vegetales');


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
