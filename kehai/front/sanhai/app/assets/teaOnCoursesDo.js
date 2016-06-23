/**
 * Created by Administrator on 2015/12/17.
 */
define(['teaCourseHistory-1.0'],function(tea){

    tea.initTeaCourseHistory();
    $('.determineBtn').click(function(){
        $('#wrong_text').addClass('hide');
        $('#wrong_text_length').addClass('hide');
        tea.saveEvalua()

    });

});