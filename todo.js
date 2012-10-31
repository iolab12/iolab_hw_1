
// Handle form Submissions
$(document).ready(function() {
    var sandbox = new Sandbox();

    $("#addListForm").on("submit", function(event){
        var listName = $("#list").val();
        sandbox.addList(listName);
        
        //Clear the form
        $("#list").val("");
        return false;
    });

    $("#addItemForm").on("submit", function(event){
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
        sandbox.clearList();
    });

    $(document).on("click", ".deleteItem", function(event){
        //remove from the dom
        $(this).closest("li").remove();
    });


    $(document).on("click", "#listOfLists .list-text", function(event){
        sandbox.setCurrentList($(this).data());
    });

    $(document).on("click", "#todoList .item-text", function(event){
        console.log($(this).data().name);
        //TODO toggle item state
        
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
// Methods:
//      addList
//      deleteList
//      setCurrentList
Sandbox.prototype.addList = function(name){
    if(!$.trim(name))
        return;

    var newList = new List(name);
    this.lists.push({name:name, value:newList, order:this.lists.length});
    var domElement = newList.render();
    $(domElement).children(".list-text").data(newList);
    $("#listOfLists").append(domElement);

    this.setCurrentList(newList);
    // console.log(this.lists);

    //TODO use $.data to tie object to dom.
}

// Set the current List (fails to check against lists with the same name)
Sandbox.prototype.setCurrentList = function(list){
    console.log("set current list");
    for(var i = 0; i < this.lists.length; i++){
        if(this.lists[i].name == list.name)
            this.currentList = this.lists[i].value;
    }
    $("#addItemForm label").html(list.name);
    console.log(this.currentList.name);

    this.clearList();
    this.populateListItems();
}

// Clear the TODO box
Sandbox.prototype.clearList = function(){
    console.log("clear List");
    $("#todoList").empty();
}

// Populate the TODO with the current List
Sandbox.prototype.populateListItems = function(){
    console.log("populate items");
    for(var i = 0; i < this.currentList.items.length; i++){
        var domElement = this.currentList.items[i].render();
        console.log(domElement);
        $("#todoList").append(domElement);
    }
}

// List Class
// Methods:
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

    console.log("Add Item");
    //Save to Local Storage
    //localStorage.setItem("1_default", "name");
    var newItem = new Item(name);
    this.items.push(newItem);

    //Add to DOM
    var domElement = newItem.render();
    $(domElement).children(".item-text").data(newItem);
    $("#todoList").append(domElement);
    // var domElement =  '<li><div class="item-text"><input type="checkbox">' + name 
    //     + '<a class="deleteItem" href="#">del</a></div></li>';
    // $("#todoList").append(domElement);
}


// List.prototype.deleteItem =  function(element){
//     // $(element).remove();
// }

List.prototype.render = function(){
    var domElement = $('<li>').append('<div class="list-text">' + this.name 
        + '</div><a class="deleteList" href="#">del</a>');
    return domElement;
}


function Item(name){
    this.name = name;
    this.completed = false;
}

Item.prototype.render = function(){
    var domElement =  $('<li>').append('<div class="item-text"><input type="checkbox">' + this.name 
        + '</div><a class="deleteItem" href="#">del</a>');
    return domElement;
}