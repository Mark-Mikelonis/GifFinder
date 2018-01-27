var topics = ["dogs", "coffee", "music", "food", "computers"];
var category= "";
var queryURL = "https://api.giphy.com/v1/gifs/search?"+ category +"&api_key=iJSldEMsjyMIEQCw3DQrFls1iJDX92Tp";
var lastIndex = 0;
$(document).ready(function() {
	makeButtons();
    function getImages(cat) {
        category = cat;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log(response.data[0]);
            // console.log(response.data[0].images.fixed_height.url)
        });
    }

    function makeButtons() {
        console.log("In makeButtons");
        $("#cat-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
        	
            var newBtn = $("<button>");
            newBtn.text(topics[i]);
            newBtn.addClass("buttons");
            newBtn.attr("data-category", topics[i]);
             console.log(topics.toString());
            // debugger;
            $(newBtn).on("click", function(element) {
            	element.preventDefault();
                var category = newBtn.attr("data-category");
                console.log("category: " +category);
                 console.log(topics.toString());
                 // debugger;
                getImages(category);
            });
            $("#cat-buttons").append(newBtn);
            // lastIndex++;
        }
    }
  
    $("#add-category").on("click", function(element) {
    	element.preventDefault();
        var category = $("#category-input").val().trim();
        
        console.log(category);
        topics[topics.length] = category;
        console.log(topics.toString());
        makeButtons();
    });
    // $(document).on("click", ".buttsons", getImages);
    
});