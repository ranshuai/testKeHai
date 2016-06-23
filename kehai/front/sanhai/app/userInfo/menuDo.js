/*左部菜单*/
define(["jquery","common","lib/intro/intro"],function($,common,introJs){

    /*大学生个人信息--引导页面*/
    function startIntro_undPersonalCenter(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: '.und_step1',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_11.png' />",
                    position: 'right',
                    tooltipClass:'unds1'
                },
                {
                    element: '.und_step2',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_4.png' />",
                    position: 'right',
                    tooltipClass:'unds2'
                },
                {
                    element: '.und_step3',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_7.png' />",
                    position: 'right',
                    tooltipClass:'unds3',
                    highlightClass:'unds3_high'
                }
            ]
        });
        intro.start();
    };

    /*老师个人信息--引导页面*/
    function startIntro_teaPersonalCenter(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: '.tea_step1',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_10.png' />",
                    position: 'right',
                    tooltipClass:'teas1'
                },
                {
                    element: '.tea_step2',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_4.png' />",
                    position: 'right',
                    tooltipClass:'teas2'
                },
                {
                    element: '.tea_step3',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_7.png' />",
                    position: 'right',
                    tooltipClass:'teas3',
                    highlightClass:'teas3_high'
                }
            ]
        });
        intro.start();
    };

    /*学生个人信息--引导页面*/
    function startIntro_stuPersonalCenter(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: '.stu_step1',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_10.png' />",
                    position: 'right',
                    tooltipClass:'stus1'
                },
                {
                    element: '.stu_step2',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_4.png' />",
                    position: 'right',
                    tooltipClass:'stus2'
                },
                {
                    element: '.stu_step3',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_1.png' />",
                    position: 'right',
                    tooltipClass:'stus3'
                },
                {
                    element: '.stu_step4',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_3.png' />",
                    position: 'right',
                    tooltipClass:'stus4',
                    highlightClass:'stus4_high'
                }
            ]
        });
        intro.start();

    };

    /*学校个人信息--引导页面*/
    function startIntro_schPersonalCenter(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: '.sch_step1',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_5.png' />",
                    position: 'right',
                    tooltipClass:'schs1'
                },
                {
                    element: '.sch_step2',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_4.png' />",
                    position: 'right',
                    tooltipClass:'schs2'
                },
                {
                    element: '.sch_step3',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_1.png' />",
                    position: 'right',
                    tooltipClass:'schs3'
                },
                {
                    element: '.sch_step4',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_6.png' />",
                    position: 'right',
                    tooltipClass:'schs4'
                }
            ]
        });
        intro.start();
    };

    return function(flag){
        $.ajax({
            type:"post",
            dataType:"json",
            url:"/perfectInfo/leadInfo.do",
            data:{},
            success:function(data){
                if(navigator.userAgent.indexOf('MSIE 8.0')>=0){
                    return false;
                }else{
                    if(common.checkResponse(data) == false){
                        return;
                    }
                    if(data.data.flag == 0){
                        //引导信息
                        if( flag ==0){
                            startIntro_teaPersonalCenter();
                        }else if( flag ==1){
                            startIntro_undPersonalCenter();
                        }else if( flag ==2 ){
                            startIntro_stuPersonalCenter();
                        }else if( flag == 3){
                            startIntro_schPersonalCenter();
                        }
                    }else{
                        matchPath();
                    }
                }
            },
            error:function(data){}
        });
    }
});

