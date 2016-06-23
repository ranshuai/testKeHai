

require(
    [
        'common',
        'order-deal',
        'money',
        'course-history-1.0',
        'pageBar',
        'teaCourseHistory-1.0',
        'stuCourseHistory-1.0'
    ],function(common,deal,money,history,pagebar,tea,stu){


        tea.initTeaCourseHistory();

        $('.determineBtn').click(function(){
            $('#wrong_text').addClass('hide');
            $('#wrong_text_length').addClass('hide');
            stu.saveEvalua()

        });



    });
