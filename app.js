$("#add_task").click(function(){
    const input_task = $("input").val();
    $("#task_list").append("<li><input type = 'checkbox'>" + input_task + "</li>");
    $("input").val("");
});