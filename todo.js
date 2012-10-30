
// Handle form Submissions
$(document).ready(function() {
    var sandbox = new Sandbox();
    sandbox.addList("second");

    $("#addListForm").on("submit", function(event){
        console.log("I've submitted my form");
        //Get the value and add it to the list if not empty
        var listName = $("#list").val();
        addList(listName);
        
        //Clear the form
        $("#list").val("");
        return false;
    });

    $("#addItemForm").on("submit", function(event){
    	console.log("I've submitted my form");
        //Get the value and add it to the list if not empty
        var itemText = $("#item").val();
        addItem(itemText);
        
        //Clear the form
        $("#item").val("");
        return false;
    });
});

function Sandbox(){

    this.currentList = "Default"
    this.lists = [];
    //initializing sandbox
    this.addList("Default");
}

Sandbox.prototype.addList = function(name){
    if(!$.trim(name))
        return;

    var newList = new List(name)
    this.lists.push(newList);
    newList.render();

    console.log(this.lists);
}

function List(name){
    this.name = name;
    this.items = [];
}

List.prototype.addItem = function(name) {
    //Generates the HTML for the new item
    if(!$.trim(name))
        return;

    //Save to Local Storage
    //localStorage.setItem("1_default", "name");
    this.items.push(name);
    console.log(this.items);

    //Add to DOM
    var domElement =  '<li><div class="item-text"><input type="checkbox">' + name + '<a href="#">del</a></div></li>';
    $("#todoList").append(domElement);
}

List.prototype.render = function(){
    var domElement =  '<li><div class="list-text">' + this.name + '<a href="#">del</a></div></li>';
    $("#listOfLists").append(domElement);
}

