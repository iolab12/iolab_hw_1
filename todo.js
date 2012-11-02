
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
        event.stopPropagation();
        //remove from the dom
        $(this).closest("li").remove();

        //remove from the sandbox
        sandbox.clearList();
    });

    $(document).on("click", ".deleteItem", function(event){
        event.stopPropagation();
        //remove from the dom
        sandbox.currentList.deleteItem(this);
    });


    $(document).on("click", ".list", function(event){
        sandbox.setCurrentList($(this).closest("li").data());
        $("li").removeClass("selected");
        $(this).closest("li").addClass("selected");
    });

    $(document).on("click", ".item", function(event){
        console.log($(this).data().name);
        //TODO toggle item state
        // console.log($(this).data().toggle());
        // $(this).closest("input").attr('checked',$(this).data().completed);
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
    $(domElement).data(newList);
    $("#listOfLists").append(domElement);

    this.setCurrentList(newList);
    // console.log(this.lists);

    //TODO use $.data to tie object to dom.
}

// Set the current List (fails to check against lists with the same name)
Sandbox.prototype.setCurrentList = function(list){
    for(var i = 0; i < this.lists.length; i++){
        if(this.lists[i].name == list.name)
            this.currentList = this.lists[i].value;
    }
    $("#addItemForm label").html(list.name);

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
        return false;

    console.log("Add Item");
    //Save to Local Storage
    //localStorage.setItem("1_default", "name");
    var newItem = new Item(name);
    this.items.push(newItem);

    //Add to DOM
    var domElement = newItem.render();
    $(domElement).children(".item-text").data(newItem);
    $("#todoList").append(domElement);
    return domElement;
}


List.prototype.deleteItem =  function(element){
    $(element).closest("li").remove();
}


// Generates and returns the HTML of the List
List.prototype.render = function(){
    $("li").removeClass("selected");
    var domElement = $('<li>').append('<div class="list-text">' + this.name 
        + '</div><a class="deleteList" href="#">del</a><div style="clear:both;"></div>')
        .addClass("selected")
        .addClass("list");

    return domElement;
}


function Item(name){
    this.name = name;
    this.completed = false;
}

// Generates and returns the HTML of the list item.
Item.prototype.render = function(){
    var domElement =  $('<li>').append('<div class="item-text"><input type="checkbox">' + this.name 
        + '</div><a class="deleteItem" href="#">del</a><div style="clear:both;"></div>')
        .addClass("item");
    return domElement;
}

// Toggles the state of the item
Item.prototype.toggle = function(){
    // this.completed != this.completed;
    this.completed = !this.completed;
    return this.completed;
}