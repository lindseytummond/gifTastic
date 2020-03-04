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
          a.addClass("movie");
          // Adding a data-attribute with a value of the emotion at index i
          a.attr("data-name", emotions[i]);
          // Providing the button's text with a value of the emotion at index i
          a.text(emotions[i]);
          // Adding the button to the HTML
          $("#buttons-view").append(a);
        }
      }

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