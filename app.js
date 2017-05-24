var DEFAULT_SERVICE_CHARGE_PERCENT = 10
  angular.module('myApp', [])
            
            .controller("MainController", ['$filter', function($filter){
                
                //------------------
                var self = this;
                self.date = new Date();
                self.salary = 24000.5;
                
                self.message = "A Quick Brown Fox Jump Over the Lazy dog";

            }] )
           .filter('serviceCharge', function(){
               return (subtotal, percent = DEFAULT_SERVICE_CHARGE_PERCENT )=> {
                   return  subtotal * percent / 100;
               }
           })
           .filter('tax', ['$filter', function($filter){
               return (subtotal, service_charge_percent = DEFAULT_SERVICE_CHARGE_PERCENT) => {
                   //return (subtotal + service_charge) * 0.6
                   var serviceChargeCost = $filter('serviceCharge')(subtotal, service_charge_percent) ;
                   return (subtotal + serviceChargeCost) * 0.06
               }
           }])
           .filter('totalCost', ['$filter', function($filter){
            return (subtotal, service_charge_percent=DEFAULT_SERVICE_CHARGE_PERCENT) =>{
                var serviceChargeCost = $filter('serviceCharge')(subtotal, service_charge_percent) ;
                var taxCost = $filter('tax')(subtotal, serviceChargeCost);
                return subtotal + taxCost + serviceChargeCost
            }
           }])
          