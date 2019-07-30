$(document).ready(function() {

  //Declaring a variable that is an array of strings of animal names
  var animals = [
    "dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
    "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken",
    "capybara", "teacup pig", "serval", "salamander", "frog"
  ];

  function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    //Function that first checks to see if there is an HTML element called "areaToAddTo" and empties it
    $(areaToAddTo).empty();

    //Uses a for loop for the length of arrayToUse
    for (var i = 0; i < arrayToUse.length; i++) {
      //Create a variable that holds a button tag
      var a = $("<button>");
      //adds a class to the button tag from the classToAdd variable
      a.addClass(classToAdd);
      //adds an attribute called datatype to the button tag that is populated from the index of arrayToUse
      a.attr("data-type", arrayToUse[i]);
      //populate the content of the button tag with the current index of arrayToUse
      a.text(arrayToUse[i]);
      //appends our button tag to the element for areaToAddTo
      $(areaToAddTo).append(a);
    }

  }
  //This is an on-click listener function for the html element with the class "animal-button"
  $(document).on("click", ".animal-button", function() {
    //clears the html element with the ID "animals"
    $("#animals").empty();
    //removes the class "active" from the button tag with the .animal-button class
    $(".animal-button").removeClass("active");
    //adds the active class to the button that was clicked
    $(this).addClass("active");

    //creates a variable that holds this button + an attribute called "data-type"
    var type = $(this).attr("data-type");
    //creates a variable that holds the URL we are passing the API that includes our type variable
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    //Our ajax function that submits a GET call using our query URL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      //callback function for when our ajax call completes using the response
      .then(function(response) {
        //creates a variable that holds the data key value pair from our result
        var results = response.data;
        //for loop for the length of our results variable
        for (var i = 0; i < results.length; i++) {
          //variable that holds a div tag with the class "animal-item"
          var animalDiv = $("<div class=\"animal-item\">");
          //saves a variable using the current index of the results value key pair from the results object
          var rating = results[i].rating;
          //saves a variable of a p tag that is populated with the rating retrieves from the previous line.
          var p = $("<p>").text("Rating: " + rating);
          //creates a variable that is a URL for the animaged gif retrieved from our api call
          var animated = results[i].images.fixed_height.url;
          //creates a variable that is a URL for the still image of the gif retreived from our api call
          var still = results[i].images.fixed_height_still.url;
          // created a variable that holds an image tag
          var animalImage = $("<img>");
          //assignes an attribute called source to our img tag that contains the URL to the still image
          animalImage.attr("src", still);
          //assingns an attribute called data-still to our img tag that contains the URL to the still image
          animalImage.attr("data-still", still);
          //assigns an attribute called data-animage to our img tag that contains a URL to the animaged gif
          animalImage.attr("data-animate", animated);
          //assigns an attribute called data-state and sets it to still. This will be used to toggle between animated and still
          animalImage.attr("data-state", "still");
          //adds a class to our image tag called "animal-image"
          animalImage.addClass("animal-image");

          //Targets our variable "animalDiv" that contains an html div tag and appends our p variable that contains an html p tag
          animalDiv.append(p);
          //Targets our variable "animalDiv" that contains an html div tag and appends our animalImage variable that contains an html image tag
          animalDiv.append(animalImage);
          //targets our html element with an ID "animals" and appends our animalDiv variable
          $("#animals").append(animalDiv);
        }
      });
  });
  //an onclick event listener function for our html element that contains the class "animal-image"
  $(document).on("click", ".animal-image", function() {
    //creates a variable called state which includes the html element for our click function with an appended attribute called "data-state"
    var state = $(this).attr("data-state");
    //if statement that reads the current data-state value of the html element that was clicked and checks if it is currently still
    if (state === "still") {
      //changes the attribute for "src" of the element to our variable for data-animate, which contains the URL to the moving gif.
      $(this).attr("src", $(this).attr("data-animate"));
      //changes the data-state attribute to animage, indicating that the img is currently animated.
      $(this).attr("data-state", "animate");
    }
    //if the current data-state for the HTML is not still
    else {
      //changes the attribute for "src" of the element to our variable for data-still, which contains the URL to the static image of the gif.
      $(this).attr("src", $(this).attr("data-still"));
      //toggles the data-state to still
      $(this).attr("data-state", "still");
    }
  });

  //and on click event listener function targeting the HTML element with the ID "add-animal"
  $("#add-animal").on("click", function(event) {
    //Stops the default activity of the html element being clicked, in this case, stopping the page from refreshing
    event.preventDefault();
    //creates a variable that contains the input from the user
    var newAnimal = $("input").eq(0).val();
    //if statement checking if the length of our new animal variable is less than 2
    if (newAnimal.length > 2) {
      //pushes the value of newAnimal to our animals array
      animals.push(newAnimal);
    }
    //runs our "populateButtons" function from above and passes in parameters for our animals array variable, along with html elements called animal-button, and our html elements that contain the id "animal buttons"
    populateButtons(animals, "animal-button", "#animal-buttons");

  });
  //runs our "populateButtons" function from above and passes in parameters for our animals array variable, along with html elements called animal-button, and our html elements that contain the id "animal buttons"
  populateButtons(animals, "animal-button", "#animal-buttons");
});
