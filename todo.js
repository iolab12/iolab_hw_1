
// Handle form Submissions
$(document).ready(function() {

    $("#todoForm").on("submit", function(event){

    	console.log("I've submitted my form");

        //Get the value and add it to the list if not empty
        var itemText = $("#item").val();
        addItem(itemText);
        

        //Clear the form
        $("#item").val("");
        return false;
    });
});

function addList(name){

}

//Generates the HTML for the new item
function addItem(name){
    if(!name)
        return;

    var domElement =  '<li><div class="item-text">' + name + '</div></li>';
    $("#todoList").append(domElement);
}