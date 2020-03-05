// Initial array of Coding Emotions
var emotions = ["Denial", "Anger", "Bargaining", "Depression", "Acceptance"];

// Function for displaying emotion data
function renderButtons() {

    // Deleting the emotion buttons prior to adding new emotion buttons
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of emotions
    for (var i = 0; i < emotions.length; i++) {

    // Then dynamicaly generating buttons for each emotion in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class
    a.addClass("emotion");
    // Adding a data-attribute with a value of the emotion at index i
    a.attr("data-name", emotions[i]);
    // Providing the button's text with a value of the emotion at index i
    a.text(emotions[i]);
    // Adding the button to the HTML
    $("#buttons-view").append(a);
    }
};

// This function handles events where one button is clicked
$("#add-emotion").on("click", function(event) {
    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var emotion = $("#emotion-input").val().trim();
    // The emotion from the textbox is then added to our array
    emotions.push(emotion);

    // calling renderButtons which handles the processing of the emotion array
    renderButtons();
});

// Calling the renderButtons function at least once to display the initial list of emotions
renderButtons();

// displayEmotionInfo function re-renders the HTML to display the appropriate content
//function displayEmotionInfo() 
$(document).on('click', '.emotion', function (){
    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=RHuh2HxJ0HyjttXzUCPTpHYqfilmC3Vy&q=" + emotion + "limit=10&offset=0&lang=en";

    // Creating an AJAX call for the specific emotion button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
        
        var results = response.data;
        for (var i = 0; i < response.data.length; i++) {

            //$("<p/>").addClass("ratings").text("Rating: " + results[i].rating
                        //.toUpperCase())
                        //.prependTo("#gifContainer");
            
            // Creating a div to hold the emotion
            var emotionDiv = $("<div class='emotion'>");

            // Storing the gif data
            var gif = response.data[i].images.fixed_height_still.url;

            // Creating an element to have the gif displayed
            var pOne = $("<img>").attr("src", gif);
            
            // Displaying the gif
            emotionDiv.append(pOne);


            // Storing the rating data
            var rating = response.data[i].rating;

            // Creating an element to have the rating displayed
            var pTwo = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            emotionDiv.append(pTwo);

            $("#gifContainer").prepend(emotionDiv);


            

        }

    });

});
        //$('#emotion-input').empty();
        //var searchDiv = $('<div class= "card" id= "search-item">');

        // Appending the image
        //emotionDiv.append(image);

        // Putting the entire emotion above the previous emotions
        //$("#movies-view").prepend(movieDiv)