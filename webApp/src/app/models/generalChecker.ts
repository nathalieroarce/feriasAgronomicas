export class generalChecker {

    constructor(){

    }

    /**
     * check if there is empty values in form
     * @param dataList list that contains the data that require to be checked
     * true : there is not null values , false: there are some null values
     */
    public notNullValues(dataList: Array<any>):Boolean{
        
        dataList.forEach(element => {
            if (element==undefined || element===null){
                return false
            }
        });
        return true;
        
    }


}