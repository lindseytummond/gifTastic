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
    $('#gifContainer').empty();
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

            //display gif images and ratings
            $('#emotion-input').empty();
            var searchDiv = $('<div class= "test1" id= "test2">');
            var rating = response.data[i].rating;
            var p = $('<p>').text('Rating: ' + rating .toUpperCase());

            
            //variable for gif while moving
            var animated = response.data[i].images.fixed_height.url;

            // variable for gif while still
            var still = response.data[i].images.fixed_height_still.url;

            //assiging attributes to image to make into gif
            var image = $('<img>');
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated);
            image.attr('data-state', 'still');
            image.addClass('searchImage');

            //attaching rating to bottom of div
            searchDiv.append(p);
            //attaching image to top of div
            searchDiv.prepend(image);
            $('#gifContainer').append(searchDiv);
        }
    });

});


$(document).on('click', '.searchImage', function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    console.log('hello')
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
