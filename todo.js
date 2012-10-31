
// Handle form Submissions
$(document).ready(function() {
    var sandbox = new Sandbox();

    $("#addListForm").on("submit", function(event){
        console.log("I've submitted my form");
        //Get the value and add it to the list if not empty
        var listName = $("#list").val();
        sandbox.addList(listName);
        
        //Clear the form
        $("#list").val("");
        return false;
    });

    $("#addItemForm").on("submit", function(event){
    	console.log("I've submitted my form");
        //Get the value and add it to the list if not empty
        var itemText = $("#item").val();
        sandbox.currentList.addItem(itemText);
        
        //Clear the form
        $("#item").val("");
        return false;
    });

    $(document).on("click", ".deleteList", function(event){
        //remove from the dom
        $(this).closest("li").remove();

        //remove from the sandbox
    });

    $(document).on("click", "li", function(event){
        console.log($(this).data().name);
    });
});

// Sandbox Class (Single instance for the site)
function Sandbox(){
    this.currentList = "";
    this.lists = [];
    //initializing sandbox
    this.addList("Default");
}

// Add a list to the sandbox. 
Sandbox.prototype.addList = function(name){
    if(!$.trim(name))
        return;

    console.log("Adding List");
    var newList = new List(name)
    this.lists.push({name:name, value:newList, order:this.lists.length});
    var domElement = newList.render();
    $(domElement).data(newList);
    $("#listOfLists").append(domElement);

    this.setCurrentList(name);
    // console.log(this.lists);

    //TODO use $.data to tie object to dom.
}

Sandbox.prototype.deleteList = function(name){
    console.log("delete list");

}

// Set the current List (fails to check against lists with the same name)
Sandbox.prototype.setCurrentList = function(name){
    console.log("set current list");
    for(var i = 0; i < this.lists.length; i++){
        if(this.lists[i].name == name)
            this.currentList = this.lists[i].value;
    }

    console.log(this.currentList);
}

// List Class
//  Methods:
//      addItem
//      deleteItem
//      toggleState
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
    var domElement = $('<li>').append('<div class="list-text">' + this.name + '<a class="deleteList" href="#">del</a></div>');
    return domElement;
}

