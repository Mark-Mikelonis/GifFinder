
var topics = ["dogs", "minions", "workaholics", "excited","archer", "family guy", "mind blown", "food", "animals being jerks", "adventure time", "reactions"];
var queryPre = "https://api.giphy.com/v1/gifs/search?q=";
var queryPro = "&api_key=iJSldEMsjyMIEQCw3DQrFls1iJDX92Tp&limit=10";

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
            var newSpan = $("<span>");
            newSpan.addClass("caption");
            newDiv = $("<div>");
            newDiv.addClass("col-2");
            var newImg = $("<img>");
            var still = response.data[i].images.fixed_height_still.url;
            var moving = response.data[i].images.fixed_height.url;
            newImg.attr("src", still);
            newImg.addClass("images float-left image-thumbnail");
            newImg.attr("data-still", still);
            newImg.attr("data-moving", moving);
            newImg.attr("data-state", "still");
            newImg.attr("alt", response.data[i].title);
            
            $(newSpan).text("Rating: " + response.data[i].rating.toUpperCase());
            newDiv.append(newImg);
            newDiv.append(newSpan);
            $("#image-view").append(newDiv);
           
            // $("#image-view").append(newSpan);
        }
        });
    }

    
    function makeButtons() {
        console.log("In makeButtons");
        $("#cat-buttons").empty();
        for (var i = 0; i < topics.length; i++) {
            var newBtn = $("<button>");
            newBtn.text(topics[i]);
            newBtn.addClass("buttons btn btn-primary");
            newBtn.attr("data-category", topics[i]);
            // console.log(topics.toString());
            // debugger;
            $(newBtn).on("click", function(element) {
                element.preventDefault();
                var category = $(this).attr("data-category");
                console.log("category: " + category);
                // console.log(topics.toString());
                // debugger;
                $("#image-view").empty();
                getImages(category);
                category = "";
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