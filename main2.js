
// Handle form Submissions
$("#todoForm").live("submit", function(event){

	console.log("I've submitted my form");

    //Get the value and add it to the list
    var itemText = $("#item").val();
    $("#todoList").append('<li><div class="item-text">' + itemText + '</div></li>');

    //Clear the form
    $("#item").val("");
    return false;
});
