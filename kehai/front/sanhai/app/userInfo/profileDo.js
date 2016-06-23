
define(["jquery","common","myCalendar","order-deal","dialogs"],
    function($,common,myCalendar,orderDeal){
        return{
            init:function(){
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                $.get("/courses/"+ year + "/" + month +"/coursesList.do?" + Math.random(), function(resp){
                    if (common.checkResponse(resp) == false) return false;
                    if (resp.resCode == "000"){
                        var classes_arr =orderDeal.formatClasses2ArrJson(resp);
                        myCalendar.myCalendar(classes_arr,year, month, resp.data.userFlag);
                    }
                });
            }
        }
    });

