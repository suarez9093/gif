$(document).ready(function () {

    // Variables
    // ==========================================================================================

    // Array of topics
    var topics = ["sharks", "elephants", "baboons", "turtle"];

    // Functions
    // ====================================================================================================

    // renders the gif to the HTML
    function displayGiphy() {

        var gif = $(this).attr("data-name");

        // GIPHY API 
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=dc6zaTOxFJmzC&limit=5";

        // Performing an AJAX request with the queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);

                // storing an array of results in a results variable
                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    // create a div to hold the gif
                    var gifDiv = $("<div class='gif'>");

                    // Store the rating 
                    var gifRating = results[i].rating;
                    console.log(gifRating)

                    // p element to display the rating
                    var pOne = $("<p>").text("Rating: " + gifRating);

                    // display the rating
                    gifDiv.append(pOne);


                    // creating an image element to hold the imageURL
                    var image = $("<img>");
                 
                    image.attr("src", results[i].images.original_still.url);
                    image.attr("data-still", results[i].images.original_still.url)
                    image.attr("data-animate", results[i].images.original.url)
                    image.attr("data-state", "still")
                    image.attr("class", "gif")
                    console.log(image)
                    // appending the image
                    gifDiv.append(image);

                    // appending to the DOM
                    $("#gif-container").prepend(gifDiv);
                }
            });
    }
// function animates the gif
    function animateGif() {
        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");

        }
        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    // function for displaying buttons
    function renderButtons() {

        // clears gifs to avoid having repeat gifs
        $("#button-container").empty();
        // loop through the array of topics
        for (var i = 0; i < topics.length; i++) {
            // generate a button for each topic in array
            var a = $("<button>");
            // adding a class of gif-button to the button
            a.addClass("gif-button btn btn-warning");
            // adding a data-attr to the topics
            a.attr("data-name", topics[i]);
            // update the button text
            a.text(topics[i]);
            // add the buttons to the button div
            $("#button-container").append(a);
        }

    }

    // Function to add a new button
    $("#add-button").on("click", function (event) {
        event.preventDefault();
        // Grabs the input from the textbox
        var topic = $("#button-input").val().trim();

        // adding a topic to the array from the user input 
        topics.push(topic);
        // Calls reneder function
        renderButtons();

    });

    // adding an event listener to all the elements with a class of gif-button
    $(document).on("click", ".gif-button", displayGiphy);
    $(document).on("click", ".gif", animateGif);

    renderButtons();

   



})









































