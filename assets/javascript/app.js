var topics = ["dogs", "coffee", "music", "food", "computers"];
var queryPre = "https://api.giphy.com/v1/gifs/search?q=";
var queryPro = "&api_key=iJSldEMsjyMIEQCw3DQrFls1iJDX92Tp";
var lastIndex = 0;
$(document).ready(function() {
    makeButtons();

    function getImages(cat) {
        var queryURL = queryPre + cat + queryPro;
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response) {
            console.log("response: " + response);

            for (var i = 0; i < response.data.length; i++) {
            var newDiv = $("<div>");
            var newP = $("<p>");
            var newImg = $("<img>");
            var still = response.data[i].images.fixed_height_still.url;
            var moving = response.data[i].images.fixed_height.url;
            newImg.attr("src", still);
            newImg.addClass("images");
            newImg.attr("data-still", still);
            newImg.attr("data-moving", moving);
            newImg.attr("data-state", "still");

            $("#image-view").append(newImg);
        }
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
            // console.log(topics.toString());
            // debugger;
            $(newBtn).on("click", function(element) {
                element.preventDefault();
                var category = newBtn.attr("data-category");
                console.log("category: " + category);
                // console.log(topics.toString());
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
        $("#category-input").empty();
        console.log(category);
        topics[topics.length] = category;
        console.log(topics.toString());
        makeButtons();
    });


    $(document).on("click", ".images", function(){

        if($(this).attr("data-state") === "still"){
            $(this).attr("data-state", "moving");
            $(this).attr("src", $(this).data().moving);
        } else if ($(this).attr("data-state") === "moving") {
            $(this).attr("data-state", "still");
            $(this).attr("src", $(this).data().still);
        }

    });
});