
// Handle form Submissions
$(document).ready(function() {

    $("#todoForm").on("submit", function(event){

    	console.log("I've submitted my form");

        //Get the value and add it to the list if not empty
        var itemText = $("#item").val();
        if(itemText)
            $("#todoList").append(generateItem(itemText));

        //Clear the form
        $("#item").val("");
        return false;
    });
});

//Generates the HTML for the new item
function generateItem(name){
    var domElement =  '<li><div class="item-text">' + name + '</div></li>';
    return domElement;
}