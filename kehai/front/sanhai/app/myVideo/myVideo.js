/**
 * Created by slg on 2016/2/22.
 */
require.config({

    baseUrl:'/Nwork/web/front/sanhai/',
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "base":"module/base",
        "basePagebar":"module/sanhai-base-pagebar-standard-1.0.0",
        "myVideoDo":"app/myVideo/myVideoDo"
    },
    shim:{

    }
});

require(["myVideoDo"],function(myVideoDo){
    myVideoDo.Lists()
});