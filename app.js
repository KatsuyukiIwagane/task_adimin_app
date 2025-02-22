$("#add_task").click(function(){
    const input_task = $("input").val();
    $("#task_list").append("<li><input type = 'checkbox'>" + input_task + "</li>");
    $("input").val("");
});

$(document).on("change", "input[type = checkbox]", function(){
    if($(this).is(":checked")){
        $(this).parent().css("text-decoration", "line-through");
    }
    else{
        $(this).parent().css("text-decoration", "none");
    }
});