test("render item", function(){
    var testItem = new Item("test");
    equal($(testItem.render()).html(), '<div class="item-text"><input type="checkbox">test</div><a class="deleteItem" href="#">del</a><div style="clear:both;"></div>');
});








test("item add/delete", function(){
    var testList = new List("test list");
    equal(testList.addItem(""),false);
    equal(testList.addItem("         "),false);

    var domElement = testList.addItem("test item");
    equal($(domElement).html(),
        '<div class="item-text"><input type="checkbox">test item</div><a class="deleteItem" href="#">del</a><div style="clear:both;"></div>');
    equal($(domElement).children(".item-text").data().name, "test item");
    equal($(domElement).children(".item-text").data().completed, false);
    equal($("#todoList .item-text").data().name, "test item");
    equal(testList.deleteItem(domElement),undefined);
});

test("toggle item", function(){
    var testItem = new Item("test item");
    equal(testItem.completed,false);
    equal(testItem.toggle(),true);
    equal(testItem.toggle(),false);
});

test("user action", function(){
    var testList = new List("test list");
    testList.addItem("test item");
    equal($("#todoList").html(),'<li class="item"><div class="item-text"><input type="checkbox">test item</div><a class="deleteItem" href="#">del</a><div style="clear:both;"></div></li>');
    $("#todoList a").trigger("click");
    equal($("#todoList").html(),"");
});

// test("render list", function(){
//     var testList = new List("test");
//     equal($(testList.render()).html(), '<div class="list-text">test</div><a class="deleteList" href="#">del</a><div style="clear:both;"></div>');
// });