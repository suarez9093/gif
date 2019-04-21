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
                console.log(response)
                console.log(gif)

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

                    // get the url for the image
                    var stillImageURL = results[i].images.fixed_height_still.url;


                    // // get the animated images URL
                    var animatedImageURL = results[i].images.fixed_height.url;


                    // creating an image elenement to hold the animated image URL
                    var animatedImage = $("<img>").attr("src", animatedImageURL)


                    // creating an image element to hold the imageURL
                    var stillImage = $("<img class=image>").attr("src", stillImageURL);


                    // appending the image
                    gifDiv.append(stillImage);

                    // appending to the DOM
                    $("#gif-container").prepend(gifDiv);
                }
                function animateGif() {

                    $(".image").on("click", function () {
                        if ($(this).attr("src", stillImageURL)) { $(this).attr("src", animatedImageURL) }
                        else if ($(this).attr("src", animatedImageURL)) { $(this).attr("src", animatedImageURL) }
                    });
                }

                animateGif();

            });
    }

    // function for displaying gif data
    function renderButtons() {

        // clears gifs to avoid having repeat gifs
        $("#button-container").empty();

        // loop through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // generate a button for each movie in array
            var a = $("<button>");
            // adding a class of gif-button to the button
            a.addClass("gif-button");
            // adding a data-attr
            a.attr("data-name", topics[i]);
            // update the button text
            a.text(topics[i]);
            // add the buttons to the button div
            $("#button-container").append(a);
        }
    }

    // Function handles events when button is clicked
    $("#add-button").on("click", function (event) {
        event.preventDefault();
        // Grabs the input from the textbox
        var topic = $("#button-input").val().trim();

        // adding a gif from the textbox of array
        topics.push(topic);

        renderButtons();

    });

    // adding an event listener to all the elements with a class of gif-button
    $(document).on("click", ".gif-button", displayGiphy);

    renderButtons();



})









































