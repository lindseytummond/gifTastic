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
    var a = $("<button>", id ="btn");
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

$(document).on('click', '.emotion', function (){
    var emotion = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion + "&api_key=RHuh2HxJ0HyjttXzUCPTpHYqfilmC3Vy&limit=10";
    
    // Creating an AJAX call for the specific emotion button being clicked
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response){
        console.log(queryURL);

        console.log(response);

        var results = response.data;
        for (var i = 0; i < response.data.length; i++) {
            
            $("<p/>").addClass("ratings").text("Rating: " + results[i].rating
                .toUpperCase())
                .prependTo("#gifContainer");
            $("<img>").addClass("gif")
                .attr("src", results[i].images.fixed_height_still.url)
                .attr("data-still", results[i].images.fixed_height_still.url)
                .attr("data-animate", results[i].images.fixed_height.url)
                .attr("data-state", "still")
                .prependTo("#gifContainer");

        }
    });

});


$(".gif").on('click', '.emotion', function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
});
