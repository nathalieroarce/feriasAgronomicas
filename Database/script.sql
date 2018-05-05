/***********************************************************
DOMAINS
************************************************************/

CREATE DOMAIN t_unit CHAR(1) NOT NULL CONSTRAINT
CHK_t_unit CHECK (VALUE IN ('U','K','B'));

CREATE DOMAIN t_mail VARCHAR(50) NOT NULL CONSTRAINT
CHK_t_mail CHECK (VALUE SIMILAR TO '[A-z]%@[A-z]%.[A-z]%');

CREATE DOMAIN t_phone VARCHAR(9) NOT NULL CONSTRAINT
CHK_t_phone CHECK (VALUE SIMILAR TO '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]');

/***********************************************************
TABLES
************************************************************/
CREATE TABLE enterprises
( 
	enterpriseID SERIAL NOT NULL,
	enterpriseName VARCHAR(50) NOT NULL UNIQUE,
	description TEXT NOT NULL, 
	nameRepresentative VARCHAR(30) NOT NULL,
	representativeCard VARCHAR(11) NOT NULL,
	mail t_mail NOT NULL,
	telephone t_phone NOT NULL,
	expressService BOOLEAN NOT NULL DEFAULT FALSE,
	chargePerKilometer MONEY NOT NULL DEFAULT 0,
	
	CONSTRAINT enterprise_PK_enterpriseID PRIMARY KEY (enterpriseID)
);

SELECT AddGeometryColumn('public','enterprises','pointDeliveryOrders', 4326, 'POINT',2)
SELECT AddGeometryColumn('public','enterprises','enterpriseLocation', 4326, 'POINT',2)

CREATE TABLE productTypes
(
   typeID serial NOT NULL UNIQUE,
   typeName varchar(20) NOT NULL,
   CONSTRAINT productTypes_PK_typeID PRIMARY KEY (typeID)
)

CREATE TABLE products
( 
   productID serial NOT NULL,
   enterpriseID INTEGER NOT NULL,
   productName TEXT NOT NULL UNIQUE,
   code VARCHAR(20) NOT NULL,
   price MONEY NOT NULL,
   unit  t_unit, --U per units K in kg, B in bags
   image TEXT NOT NULL,
   productType INTEGER NOT NULL,
   description TEXT NOT NULL,
   stock INTEGER NOT NULL,

   CONSTRAINT products_PK_productID PRIMARY KEY (productID),
   CONSTRAINT products_FK_enterpriseID FOREIGN KEY (enterpriseID) REFERENCES enterprises(enterpriseID) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT products_FK_productType FOREIGN KEY (productType) REFERENCES productTypes(typeID) ON DELETE CASCADE ON UPDATE CASCADE
);

/*****************************************************************
STORED PROCDEDURES
******************************************************************/

/***********************
For table enterprises
************************/

-- Insert an enterprise 
-- Require: None
-- Restrictions: The name is unique so it must not be registered
CREATE OR REPLACE FUNCTION sp_insertEnterprise
(
	IN i_enterpriseName VARCHAR(50),
	IN i_description TEXT, 
	IN i_nameRepresentative VARCHAR(30),
	IN i_representativeCard VARCHAR(11),
	IN i_mail t_mail,
	IN i_telephone t_phone,
	IN i_expressService BOOLEAN
	IN i_chargePerKilometer MONEY,
	IN i_pointDeliveryOrders POINT,
	IN i_enterpriseLocation POINT,
)
RETURNS
BOOLEAN AS
$body$
BEGIN
	INSERT INTO enterprises (enterpriseName, description, nameRepresentative, representativeCard, mail, telephone, expressService, chargePerKilometer, pointDeliveryOrders, enterpriseLocation) 
	VALUES (i_enterpriseName, i_description, i_nameRepresentative, i_representativeCard, i_mail, i_telephone, i_expressService, i_chargePerKilometer, i_pointDeliveryOrders, i_enterpriseLocation);
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;

END;
$body$
LANGUAGE plpgsql;

/***********************
For table products
************************/

-- Insert a product
-- Require: None
-- Restrictions: The name is unique so it must not be registered
CREATE OR REPLACE FUNCTION sp_insertProduct
(
	IN i_enterpriseID INTEGER,
    IN i_productName TEXT,
    IN i_code VARCHAR(20),
    IN i_price MONEY,
    IN i_unit  t_unit,
    IN i_image TEXT,
    IN i_productType INTEGER,
    IN i_description TEXT,
    IN i_stock 	INTEGER
)
RETURNS
BOOLEAN AS
$body$
BEGIN
	INSERT INTO products (enterpriseID, productName, code, price, unit, image, productType, descriptio, stock) 
	VALUES (i_enterpriseID, i_productName, i_code, i_price, i_unit, i_image, i_productType, i_description, i_stock);
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;

END;
$body$
LANGUAGE plpgsql;

-- Get product's information related with an enterprise
-- Require: enterpriseID
-- Restrictions: If product's stock is less than 0, product information isn't going to be returned
CREATE OR REPLACE FUNCTION sp_getProductsByEnterpriseID
(
	IN i_enterpriseID INTEGER,
	OUT o_enterpriseID INTEGER,
	OUT o_productID INTEGER,
	OUT o_productName TEXT,
	OUT o_price MONEY,
	OUT o_productImage TEXT,
	OUT o_productUnit t_unit,
	OUT o_productDescription TEXT,
	OUT o_productStock INTEGER
	
)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query SELECT p.* FROM
	(SELECT enterpriseID,productID, productName, price,image,unit,description,stock  FROM products WHERE enterpriseID=i_enterpriseID) AS p 
	 WHERE p.stock > 0;

END;
$body$
LANGUAGE plpgsql;

select sp_insertEnterprise('Empresa1', 'descripcion', 'Josua Carranza', '1-1232-1113', 'se@gmail.com','2343-4242', false, (0::money), (SELECT ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326)), (SELECT ST_SetSRID(ST_MakePoint(-71.1043443253471, 42.3150676015829),4326)))

select sp_insertProduct(3,'Piña','00rt',600,'U','manzanatestimage.png',1,'Piña del atlántico',10)

/*
insert into productTypes(typeName) values ('Frutas')
select * from productTypes
delete from productTypes
drop table products
select * from products

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
) values(1,'Manzana','00rt',600,'U','manzanatestimage.png',1,'manzana del atlántico',30),
  (2,'Manzana2','00rt',600,'U','manzanatestimage.png',1,'manzana del atlántico',0),
  (3,'Manzana3','00rt',600,'U','manzanatestimage.png',1,'manzana del atlántico',10),
  (2,'Mango','00rt',600,'B','manzanatestimage.png',1,'mango del atlántico',0),
  (2,'Naranja','00rt',600,'U','manzanatestimage.png',1,'Naranja del atlántico',30),
  (3,'Piña','00rt',600,'U','manzanatestimage.png',1,'Piña del atlántico',10);

select sp_getProductsByEnterpriseID(3);*/
