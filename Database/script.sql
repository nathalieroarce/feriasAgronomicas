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

--create extension postgis;

CREATE TABLE enterprises
(
	enterpriseID SERIAL NOT NULL,
	enterpriseName VARCHAR(50) NOT NULL UNIQUE,
	logo TEXT NOT NULL,
	description TEXT NOT NULL,
	nameRepresentative VARCHAR(30) NOT NULL,
	representativeCard t_card NOT NULL,
	mail t_mail NOT NULL UNIQUE,
	e_password VARCHAR NOT NULL UNIQUE,
	telephone t_phone NOT NULL UNIQUE,
	expressService BOOLEAN NOT NULL DEFAULT FALSE,
	chargePerKilometer MONEY NOT NULL DEFAULT 0,
	locationName TEXT NOT NULL,
	CONSTRAINT enterprise_PK_enterpriseID PRIMARY KEY (enterpriseID)
);

SELECT AddGeometryColumn('public','enterprises','pointdeliveryorders', 4326, 'POINT',2);
SELECT AddGeometryColumn('public','enterprises','enterpriselocation', 4326, 'POINT',2);

CREATE TABLE productTypes
(
   typeID serial NOT NULL UNIQUE,
   typeName varchar(20) NOT NULL,
   CONSTRAINT productTypes_PK_typeID PRIMARY KEY (typeID)
);


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

CREATE TABLE clients
(  clientID Serial NOT NULL,
   clientName VARCHAR(50) NOT NULL,
   phone t_phone NOT NULL UNIQUE,
   mail t_mail NOT NULL UNIQUE,
   c_password VARCHAR NOT NULL UNIQUE,
   CONSTRAINT clients_PK_clientID PRIMARY KEY (clientID)
);


CREATE TABLE orders 
(
   orderID serial NOT NULL,
   enterpriseID INTEGER NOT NULL,
   clientID INTEGER NOT NULL,
   expressService BOOLEAN NOT NULL DEFAULT FALSE,
   totalAmount MONEY NOT NULL,
   orderDate DATE NOT NULL DEFAULT CURRENT_DATE,
   orderSent BOOLEAN NOT NULL DEFAULT FALSE,
   deliveryDate DATE NOT NULL DEFAULT CURRENT_DATE,
   accepted BOOLEAN NOT NULL DEFAULT TRUE,
   directionName TEXT NOT NULL,
   observations TEXT,
   paid BOOLEAN NOT NULL DEFAULT FALSE,

   CONSTRAINT orders_PK_orderID PRIMARY KEY (orderID),
   CONSTRAINT orders_FK_enterpriseID FOREIGN KEY (enterpriseID) REFERENCES enterprises(enterpriseID)ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT orders_FK_clientID FOREIGN KEY (clientID) REFERENCES clients(clientID) ON DELETE CASCADE ON UPDATE CASCADE
);

SELECT AddGeometryColumn('public','orders','destinationaddress', 4326, 'POINT',2); 

CREATE TABLE orderProducts
(
   orderID INTEGER,
   productID INTEGER,
   price Money,
   purchasedAmount SMALLINT,
   totalAmount MONEY,
   CONSTRAINT orderProducts_PK_orderID_prodcuctID PRIMARY KEY (orderID,productID),
   CONSTRAINT orderProcucts_FK_orderID FOREIGN KEY (orderID) REFERENCES orders(orderID) ON DELETE CASCADE ON UPDATE CASCADE,
   CONSTRAINT orderProcucts_FK_productID FOREIGN KEY (productID) REFERENCES products(productID) ON DELETE CASCADE ON UPDATE CASCADE
   
);

CREATE TABLE notifications
(
	notificationID SERIAL NOT NULL,
	clientID INTEGER NOT NULL,
	message TEXT NOT NULL,
	readNotification BOOLEAN NOT NULL DEFAULT FALSE,
	generatedDate DATE NOT NULL DEFAULT (CURRENT_TIMESTAMP),
	CONSTRAINT notifications_PK_notificationID PRIMARY KEY (notificationID),
	CONSTRAINT notification_FK_clientID FOREIGN KEY (clientID) REFERENCES clients (clientID) ON DELETE CASCADE ON UPDATE CASCADE
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
	IN i_password VARCHAR,
	IN i_telephone t_phone,
	IN i_expressService BOOLEAN,
	IN i_chargePerKilometer INTEGER,
	IN i_locationName TEXT,
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
			(i_enterpriseName, i_logo, i_description, i_nameRepresentative, i_representativeCard, i_mail, 
			md5(i_password || 'azZA'), i_telephone, i_expressService, 
			(i_chargePerKilometer::MONEY), i_locationName, ST_GeomFromText(i_pointDeliveryOrders, 4326),
			ST_GeomFromText(i_enterpriseLocation, 4326));
	RETURN TRUE;
	--EXCEPTION WHEN OTHERS THEN RETURN FALSE;
	
END;
$body$
LANGUAGE plpgsql;

-- Get enterprise's information by id
-- Require: enterpriseID
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_getEnterpriseInformation
(	
	IN i_enterpriseID INT,
	OUT o_name VARCHAR(50),
	OUT o_image TEXT,
	OUT o_description TEXT,
	OUT o_representative VARCHAR(30),
	OUT o_mail t_mail,
	OUT o_telephone t_phone,
	OUT o_chargePerKilometer INT,
	OUT o_locationname TEXT,
	OUT o_expressService BOOLEAN
)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query (SELECT enterpriseName, logo, description, nameRepresentative, mail, telephone, chargePerKilometer::NUMERIC::INT, locationName,expressService FROM enterprises WHERE enterpriseID= i_enterpriseID);
END;
$body$
LANGUAGE plpgsql;

-- Get product's information related with an enterprise
-- Require: enterpriseID
-- Restrictions: If product's stock is less than 0, product information isn't going to be returned
CREATE OR REPLACE FUNCTION sp_getEnterprises
(	
	OUT o_enterpriseid INTEGER,
	OUT o_enterprisename VARCHAR,
	OUT o_logo TEXT,
	OUT o_locationname TEXT
)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query (SELECT enterpriseid,enterprisename,logo,locationname FROM enterprises);
END;
$body$
LANGUAGE plpgsql;

-- Verify the existence of a enterprise or a client
-- Require: mail and password of the enterprise or client
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_doLogin(
	IN i_email t_mail, 
	IN i_password VARCHAR(10)
)
RETURNS
INTEGER AS
$body$
DECLARE
	actualID INTEGER;
BEGIN
	actualID = (SELECT enterpriseID FROM enterprises WHERE mail = i_email AND e_password = md5(i_password|| 'azZA'));
	IF (actualID ISNULL) THEN
		actualID = (SELECT clientID FROM clients WHERE mail = i_email AND c_password = md5(i_password|| 'azZA'));
		IF (actualID ISNULL) THEN
			RETURN -1;
		ELSE
			RETURN actualID;
		END IF;
	ELSE
		RETURN actualID;
	END IF;	
END;
$body$
LANGUAGE plpgsql;

/***********************
For table clients
************************/
--register a new cliente in the aplication
-- require client name, telephone, mail and password
-- Restrictions none
CREATE OR REPLACE FUNCTION sp_registerClient(
	i_name VARCHAR(50),
	i_phone t_phone,
	i_email t_mail,
	i_password VARCHAR(10) 
)
RETURNS
BOOLEAN AS
$body$
BEGIN
	INSERT INTO clients (clientName, phone, mail, c_password)
	VALUES (i_name, i_phone, i_email, md5(i_password || 'azZA'));
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
	OUT o_id INTEGER,
	OUT o_name TEXT,
	OUT o_price INT,
	OUT o_image TEXT,
	OUT o_unit t_unit,
	OUT o_description TEXT,
	OUT o_stock INTEGER,
	OUT o_enterprisename VARCHAR(50),
	OUT o_expressService BOOLEAN,
	OUT o_chargePerKilometer INT
)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	RETURN query (
		SELECT enterprises.enterpriseID,productID, productName, price::NUMERIC::INT,image,unit,products.description,stock, enterprisename,expressService, chargePerKilometer::NUMERIC::INT
		FROM
		products
		INNER JOIN
		enterprises
		ON enterprises.enterpriseID=products.enterpriseID

		WHERE enterprises.enterpriseID = i_enterpriseID and stock > 0);

END;
$body$
LANGUAGE plpgsql;

-- Get product's information related with an enterprise
-- Require: key, enterpriseID
-- Restrictions: If product's stock is less than 0, product information isn't going to be returned
CREATE OR REPLACE FUNCTION sp_getProductsByKey
(
	IN  i_key TEXT,
	IN  i_enterpriseID INTEGER,
	OUT o_id INTEGER,
	OUT o_enterpriseid INTEGER,
	OUT o_name TEXT,	
	OUT o_price INT,
	OUT o_unit  t_unit,
	OUT o_image TEXT,
	OUT o_description TEXT,
	OUT o_stock INTEGER,
	OUT o_enterprisename VARCHAR(50),
	OUT o_expressService BOOLEAN,
	OUT o_chargePerKilometer INT
)
RETURNS
SETOF RECORD AS
$body$
BEGIN
	IF i_enterpriseID = -1 THEN
		RETURN query
		(SELECT productid, products.enterpriseid, productname, price::NUMERIC::INT, unit, image, products.description,stock,enterprisename, expressService, chargePerKilometer::NUMERIC::INT  FROM
			products
			INNER JOIN
			producttypes
			ON producttype = typeid
			INNER JOIN
			enterprises
			ON enterprises.enterpriseID = products.enterpriseid
			WHERE stock > 0  and (lower(typename) LIKE '%'||lower(i_key)||'%' OR lower(productname) LIKE '%'||lower(i_key)||'%')    );
	ELSE
		RETURN query
			(SELECT productid, a.enterpriseid, productname, price, unit, image, a.description,stock,enterprisename
				FROM
					(SELECT * FROM products WHERE enterpriseid= i_enterpriseID) as a
				INNER JOIN
					(SELECT * FROM enterprises where enterpriseID = i_enterpriseID ) as e
				ON a.enterpriseid = e.enterpriseID
				INNER JOIN
					producttypes
				ON producttype = typeid
			WHERE stock > 0  and (lower(typename) LIKE '%'||lower(i_key)||'%' OR lower(productname) LIKE '%'||lower(i_key)||'%')    );
	END IF;
END;
$body$
LANGUAGE plpgsql;

-- Get enterprise's prducts by type
-- Require: The type ID and the enrepriseID
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_getProductsByType
(
	IN i_productTypeID INTEGER,
	IN i_enterpriseID INTEGER,
	OUT o_ID INTEGER, 
	OUT o_name TEXT,
	OUT o_price Money,
	OUT o_unit t_unit,
	OUT o_image TEXT,
	OUT o_description TEXT,
	OUT o_stock INTEGER
)

RETURNS SETOF RECORD AS 
$body$
BEGIN
	RETURN query
	SELECT p.productID, p.productName, p.price::NUMERIC::INT,p.unit,p.image, p.description , p.stock  FROM 
	(SELECT productID,productName,price,unit,image, productType ,description , stock FROM products WHERE enterpriseID = i_enterpriseID AND stock > 0) AS p
	WHERE p.productType = i_productTypeID;
END;
$body$
LANGUAGE plpgsql;

-- Get order's product by orderID 
-- Require: The order id
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_updateProductInformation
(
	IN i_productID INTEGER, 
	IN i_name TEXT,
	IN i_price INTEGER,
	IN i_unit t_unit,
	IN i_image TEXT,
	IN i_stock INTEGER,
	IN i_description TEXT
)

RETURNS BOOLEAN AS
$body$
BEGIN
	UPDATE products SET (productName, price,unit,image,stock,description)= (i_name,i_price::NUMERIC::MONEY,i_unit,i_image,i_stock,i_description)
	WHERE productID= i_productID;
	RETURN TRUE;	
	--EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

/***********************
For table orders
************************/	
-- Get the orders of an enterprise 
-- Require: The enterprise id
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_getPendingOrders
(
	IN i_enterpriseID INTEGER, 
	OUT o_orderID INTEGER,
	OUT o_expressService BOOLEAN,
	OUT o_totalAmount MONEY,
	OUT o_orderDate DATE, 
	OUT o_directionName TEXT, 
	OUT o_accepted BOOLEAN, 
	OUT o_observations TEXT
)
RETURNS SETOF RECORD AS 
$body$
BEGIN
	RETURN query
	SELECT orderID, expressService, totalAmount, orderDate, directionName, accepted, observations FROM orders 
	WHERE enterpriseID = i_enterpriseID AND orderSent = FALSE AND accepted = TRUE
	ORDER BY orderDate DESC;
END;
$body$
LANGUAGE plpgsql;



-- Get the orders that are already delivered of an enterprise 
-- Require: The enterprise id
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_getSentOrders
(
	IN i_enterpriseID INTEGER, 
	OUT o_orderID INTEGER,
	OUT o_expressService BOOLEAN,
	OUT o_totalAmount MONEY,
	OUT o_orderDate DATE, 
	OUT o_directionName TEXT, 
	OUT o_accepted BOOLEAN, 
	OUT o_observations TEXT
)
RETURNS SETOF RECORD AS 
$body$
BEGIN
	RETURN query
	SELECT orderID, expressService, totalAmount, orderDate, directionName, accepted, observations FROM orders 
	WHERE enterpriseID = i_enterpriseID AND orderSent = TRUE AND paid=FALSE 
	ORDER BY orderDate DESC;
END;
$body$
LANGUAGE plpgsql;



-- Check an order as sent 
-- Require: The order id and the delivery date
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_sendOrder
(
	IN i_orderID INTEGER,
	IN i_deliveryDate DATE
)
RETURNS BOOLEAN AS 
$body$
BEGIN
	UPDATE orders SET (orderSent, deliveryDATE) = (TRUE, i_deliveryDate) WHERE orderID = i_orderID;
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

-- Check an order as rejected  
-- Require: The order id and the justification of why it was rejected
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_cancelOrder
(
	IN i_orderID INTEGER,
	IN i_justification TEXT)
RETURNS BOOLEAN AS 
$body$
DECLARE 
	d_clientID INTEGER;
BEGIN
	SELECT clientID INTO d_clientID FROM orders WHERE orderID = i_orderID;
	UPDATE orders set accepted = FALSE WHERE orderID = i_orderID;
	INSERT INTO notifications (clientID,message) VALUES (d_clientID, i_justification);
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

-- Get order's product by orderID 
-- Require: The order id
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_getOrderProducts
(
	IN i_orderID INTEGER, 
	OUT o_name TEXT,
	OUT o_price Money,
	OUT o_purchasedAmount SMALLINT,
	OUT o_totalAmount MONEY
)
RETURNS SETOF RECORD AS 
$body$
BEGIN
	RETURN query
	SELECT p.productName,op.price, op.purchasedAmount, op.totalAmount FROM
	(SELECT * FROM orderProducts WHERE orderID= i_orderID ) AS op
	INNER JOIN products AS p ON op.productID= p.productID;
END;
$body$
LANGUAGE plpgsql;

-- Get the orders that are already paid of an enterprise 
-- Require: The enterprise id
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_getPaidOrders
(
	IN i_enterpriseID INTEGER, 
	OUT o_orderID INTEGER,
	OUT o_expressService BOOLEAN,
	OUT o_totalAmount MONEY,
	OUT o_orderDate DATE, 
	OUT o_directionName TEXT, 
	OUT o_accepted BOOLEAN, 
	OUT o_observations TEXT
)
RETURNS SETOF RECORD AS 
$body$
BEGIN
	RETURN query
	SELECT orderID, expressService, totalAmount, orderDate, directionName, accepted, observations FROM orders 
	WHERE enterpriseID = i_enterpriseID AND paid = TRUE 
	ORDER BY orderDate DESC;
END;
$body$
LANGUAGE plpgsql;

-- Check an order as paid
-- Require: The order id 
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_setPaid
(
	IN i_orderID INTEGER
)
RETURNS BOOLEAN AS 
$body$
BEGIN
	UPDATE orders SET paid = TRUE WHERE orderID = i_orderID;
	RETURN TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;

-- Register an order 
-- Require: The client id, enterprise id, if an expressService, total amount, direccion name, observation and destination address 
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_registerOrder
( 
	IN i_clientID INT, 
	IN i_enterpriseID INT, 
	IN i_expressService Boolean,
	IN i_totalAmount INT,
	IN i_directionName TEXT,
	IN i_observations TEXT, 
	IN i_destinationAddress TEXT 
)
RETURNS
INTEGER AS
$body$
BEGIN
	INSERT INTO orders (enterpriseID, clientID, expressService, totalAmount, directionName, observations, destinationaddress) 
	VALUES (i_enterpriseID, i_clientID, i_expressService, i_totalAmount::MONEY, i_directionName, i_observations, ST_GeomFromText(i_destinationaddress, 4326));
	RETURN  currval('orders_orderid_seq');
	EXCEPTION WHEN OTHERS THEN RETURN -1;
END;
$body$
LANGUAGE plpgsql;

-- Register a product of an order 
-- Require: The order id, product id, purchased amount, unit price, total price  
-- Restrictions: None
CREATE OR REPLACE FUNCTION sp_registerOrderProduct
( 
	IN i_orderID INT, 
	IN i_productID INT,
	IN i_purchasedAmount INT,
	IN i_unitPrice INT, 
	IN i_totalPrice INT
)
RETURNS
BOOLEAN AS
$body$
BEGIN
	INSERT INTO orderProducts (orderID, productID, price, purchasedAmount, totalAmount) 
	VALUES (i_orderID, i_productID, i_unitPrice::MONEY, i_purchasedAmount, i_totalPrice);
	RETURN  TRUE;
	EXCEPTION WHEN OTHERS THEN RETURN FALSE;
END;
$body$
LANGUAGE plpgsql;
