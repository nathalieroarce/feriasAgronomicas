CREATE DOMAIN t_unit CHAR(1) NOT NULL CONSTRAINT
CHK_t_unit CHECK (VALUE IN ('U','K','B'));

/***********************************************************
TABLES
************************************************************/

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
   productName TEXT NOT NULL,
   code VARCHAR(20) NOT NULL,
   price INTEGER NOT NULL,
   unit  t_unit, --U per units K in kg, B in bags
   image TEXT NOT NULL,
   productType INTEGER NOT NULL,
   description TEXT NOT NULL,
   stock INTEGER NOT NULL,

   CONSTRAINT products_PK_productID PRIMARY KEY (productID),
   CONSTRAINT products_FK_productType FOREIGN KEY (productType) REFERENCES productTypes(typeID) ON DELETE CASCADE ON UPDATE CASCADE
);



/*****************************************************************
STORED PROCDEDURES
******************************************************************/

/***********************
For table products
************************/

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
	(SELECT enterpriseID,productID, productName, price,image,unit,description,stock  FROM products WHERE enterpriseID=i_enterpriseID) AS p 
	 WHERE p.stock > 0;

END;
$body$
LANGUAGE plpgsql;

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

select sp_getProductsByEnterpriseID(3);