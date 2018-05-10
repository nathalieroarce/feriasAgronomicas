export class enterpriseRegistrationModel {

    private name:String;
    private description:String;
    private administratorName:String;
    private identificationNumber:string;
    private enterpriseEmail:String;
    private telephoneNumber: String;
    private password: String;
    private enterpriseLocation: [Number,Number];
    private enterpriseDeliveryPoint: [Number,Number];
    private image: String;
    private expressService: Boolean;
    private pricerPerKM: Number;

    constructor(){
        
        //set default values
        this.expressService=false;
        this.pricerPerKM=0;
    }

    public  getName():String{
        return this.name;
    }

    public  getDescription():String{
        return this.description;
    }

    public  getAdministratorName():String{
        return this.administratorName;
    }

    public  getIdentificationNumber():String{
        return this.identificationNumber;
    }

    public  getTelephoneNumber():String{
        return this.telephoneNumber;
    }

    public  getPassword():String{
        return this.password;
    }

    public  getEnterpriseLocation():any{
        return this.enterpriseLocation;
    }

    public  getEnterpriseDeliveryPoint():any{
        return this.enterpriseDeliveryPoint;
    }

    public  getImage():String{
        return this.image;
    }

    public  getExpressService():Boolean{
        return this.expressService;
    }

    public  getPricePerKM(): Number{
        return this.pricerPerKM;
    }



}