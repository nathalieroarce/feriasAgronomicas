export class product {

    private productID:Number;
    private enterpriseID: Number;
    private productName: String;
    private code: String; 
    private price: Number;
    private unit: String;  
    private image: String; 
    private productType: String; 
    private description: String;
    private stock: Number;


    constructor(){
        
        //set default values
        this.productID=-1;
        this.enterpriseID=-1;
    }

    public setProductID(productID:Number):void{
        this.productID=productID;
    }

    public setEnterpriseID(enterpriseID:Number):void{
        this.enterpriseID= enterpriseID;
    }

    public setProductName(name:String):void{
        this.productName=name;
    }

    public setProductCode(productCode:String):void{
        this.code= productCode;
    }

    public setProductPrice(productPrice:Number):void{
        this.price=productPrice;  
    }

    public setProductUnit(productUnit:String):void{
        this.unit=productUnit;
    }

    public setProductImage(productImage:String):void{
        this.image=productImage;
    }

    public setProductType(productType:String):void{
        this.productType=productType;
    }

    public setProductDescription(productDescription:String):void{
        this.description =productDescription;
    }

    public setProductStock(stock:Number):void{
        this.stock=stock;
    }

    public  getProductID():Number{
        return this.productID;
    }

    public  getEnterpriseID():Number{
        return this.enterpriseID;
    }

    public  getProductName():String{
        return this.productName;
    }

    public  getProductCode():String{
        return this.code;
    }

    public  getProductPrice():Number{
        return this.price;
    }

    public  getProductUnit():String{
        return this.unit;
    }

    public  getProductImage():String{
        return this.image;
    }

    public  getProductType():String{
        return this.productType;
    }

    public  getProductDescription():String{
        return this.description;
    }

    public  getProductStock():Number{
        return this.stock;
    }


    public resetProductData(){
        this.productID=-1;
        this.productName="";
        this.productType="";
        this.price=0;
        this.stock=0;
        this.image="";
        this.unit="";
        this.code="";
        this.description="";
    }
}