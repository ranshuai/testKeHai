/**
 * Created by cc on 2016/1/19.
 */
define(['app/roc/rocModule'], function(rocModule) {

    rocModule.filter("gradeName",['grades',function(grades){
        return function(input){
            var gradeName ;
            angular.forEach(angular.fromJson(grades),function(value){
                if( value.code == input){
                    gradeName =value.name;
                    return false;
                }
            });
            return gradeName;
        }

    }]);
});