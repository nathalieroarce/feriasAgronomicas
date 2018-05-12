/***********************************************************
DOMAINS
************************************************************/
CREATE DOMAIN t_unit CHAR(1) NOT NULL CONSTRAINT
CHK_t_unit CHECK (VALUE IN ('U','K','B'));

CREATE DOMAIN t_mail VARCHAR(50) NOT NULL CONSTRAINT
CHK_t_mail CHECK (VALUE SIMILAR TO '[A-z]%@[A-z]%.[A-z]%');

CREATE DOMAIN t_phone VARCHAR(9) NOT NULL CONSTRAINT
CHK_t_phone CHECK (VALUE SIMILAR TO '[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]');

CREATE DOMAIN t_card VARCHAR(11) NOT NULL CONSTRAINT
CHK_t_phone CHECK (VALUE SIMILAR TO '[0-9]-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]');

/***********************************************************
TABLES
************************************************************/
DROP TABLE enterprises
CREATE TABLE enterprises
( 
	enterpriseID SERIAL NOT NULL,
	enterpriseName VARCHAR(50) NOT NULL UNIQUE,
	logo TEXT NOT NULL,
	description TEXT NOT NULL, 
	nameRepresentative VARCHAR(30) NOT NULL,
	representativeCard t_card NOT NULL,
	mail t_mail NOT NULL,
	e_password VARCHAR(10) NOT NULL,
	telephone t_phone NOT NULL,
	expressService BOOLEAN NOT NULL DEFAULT FALSE,
	chargePerKilometer MONEY NOT NULL DEFAULT 0,
	locationName VARCHAR(50) NOT NULL,		
	CONSTRAINT enterprise_PK_enterpriseID PRIMARY KEY (enterpriseID)
);
SELECT AddGeometryColumn('public','enterprises','pointdeliveryorders', 4326, 'POINT',2);
SELECT AddGeometryColumn('public','enterprises','enterpriselocation', 4326, 'POINT',2);

DROP TABLE productTypes
CREATE TABLE productTypes
(
   typeID serial NOT NULL UNIQUE,
   typeName varchar(20) NOT NULL,
   CONSTRAINT productTypes_PK_typeID PRIMARY KEY (typeID)
)

DROP TABLE products
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
For table productTypes
************************/
-- Insert a product type 
-- Require: None
-- Restrictions: The name is unique so it must not be registered
CREATE OR REPLACE FUNCTION sp_getProductTypes
(
    OUT o_productTypeID INTEGER,
    OUT o_productTypeName VARCHAR(20)

)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query SELECT  * FROM productTypes;
END;
$body$
LANGUAGE plpgsql;

/***********************
For table enterprises
************************/
-- Insert an enterprise 
-- Require: None
-- Restrictions: The name is unique so it must not be registered
CREATE OR REPLACE FUNCTION sp_insertEnterprise
(
	IN i_enterpriseName VARCHAR(50),
	IN i_logo TEXT,
	IN i_description TEXT, 
	IN i_nameRepresentative VARCHAR(30),
	IN i_representativeCard t_card,
	IN i_mail t_mail,
	IN i_password VARCHAR(10),
	IN i_telephone t_phone,
	IN i_expressService BOOLEAN,
	IN i_chargePerKilometer INTEGER,
	IN i_locationName VARCHAR(50),
	IN i_pointDeliveryOrders TEXT,
	IN i_enterpriseLocation TEXT
)
RETURNS
BOOLEAN AS
$body$
BEGIN
	INSERT INTO enterprises (enterpriseName, logo, description, nameRepresentative, representativeCard, 
			mail, e_password, telephone, expressService, chargePerKilometer, locationName, 
			pointdeliveryorders, enterpriselocation) VALUES 
			(i_enterpriseName, i_logo, i_description, i_nameRepresentative, i_representativeCard, i_mail, i_password, 
	 		i_telephone, i_expressService, (i_chargePerKilometer::MONEY), i_locationName, 
			ST_GeomFromText(i_pointDeliveryOrders, 4326),
			ST_GeomFromText(i_enterpriseLocation, 4326));
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
    IN i_price INTEGER,
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
	INSERT INTO products (enterpriseID, productName, code, price, unit, image, productType, description, stock) 
	VALUES (i_enterpriseID, i_productName, i_code, (i_price::MONEY), i_unit, i_image, i_productType, i_description, i_stock);
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
	OUT o_price INTEGER,
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
	(SELECT enterpriseID,productID, productName, (price::MONEY::NUMERIC::INTEGER),image,unit,description,stock  FROM products WHERE enterpriseID=i_enterpriseID) AS p 
	 WHERE p.stock > 0;

END;
$body$
LANGUAGE plpgsql;


insert into productTypes(typeName) values ('Frutas'),('Legumbres'),('Vegetales');



/*Prueba:

select sp_insertEnterprise('Empresa1', 'logo', 'descripcion', 'Josua Carranza', '1-1232-1113', 
						   'se@gmail.com', '112dydfe64', '2343-4242', false, 0, 'lugar', 
						   'POINT(-71.060316 48.432044)', 'POINT(-71.060316 48.432044)');
						   
insert into productTypes(typeName) values ('Frutas'),('Legumbres'),('Vegetales');

select sp_insertProduct(1,'Piña','00rt',600,'U','manzanatestimage.png',1,'Piña del atlántico',10)

INSERT INTO enterprises (enterpriseName, logo, description, nameRepresentative, representativeCard, 
			mail, e_password, telephone, expressService, chargePerKilometer, locationName, 
			 pointdeliveryorders, enterpriselocation) values
			('Empresa prueba','logo','nada','alguien','1-2345-5445','empresa@gmail.com',
			 'gdsg53574f','3434-3434',true,(1000::MONEY),'lugar', ST_GeomFromText('POINT(-71.060316 48.432044)', 4326),
			ST_GeomFromText('POINT(-71.060316 48.432044)', 4326))

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
*/
