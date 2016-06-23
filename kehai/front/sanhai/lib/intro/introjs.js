
$(function(){

    /*学生个人信息--引导页面*/
    startIntro_stuPersonalCenter=function(){
        var intro = intro.introJs();
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
    startIntro_schPersonalCenter=function(){
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
    /*大学生个人信息--引导页面*/
    startIntro_undPersonalCenter=function(){
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


    startIntro_heaPersonalCenter=function(){
        var intro = introJs();
        intro.setOptions({
            steps: [
                {
                    element: '.heastep1',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_8.png' />",
                    position: 'right',
                    tooltipClass:'heas1',
                    highlightClass:'heas1_high'
                },
                {
                    element: '.heastep2',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_9.png' />",
                    position: 'right',
                    tooltipClass:'heas2',
                    highlightClass:'heas2_high'
                },
                {
                    element: '.heastep3',
                    intro: "<img src='../../front/sanhai/images/intro/assetcenter_0.png' />",
                    position: 'right',
                    tooltipClass:'heas3',
                    highlightClass:'heas3_high'
                }
            ]
        });
        intro.start();
    };

});
