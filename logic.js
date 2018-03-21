$(document).ready(function(){

new ClipboardJS('.copy');

var topics = ["manchester united", "arsenal", "tottenham" , "liverpool", "chelsea fc", 
"barcelona", "real madrid", "psg", "bayern munich", "dortmund", "juventus", "pogba", "lingard",
"aubameyang","ozil", "kane", "dele", "salah", "firmino", "eden hazard" , "willian", "messi", 
"suarez", "ronaldo", "gareth bale", "neymar","mbappe","muller","lewandowski","reus", "pulisic", "dybala", "adidas",
    "nike", "puma"];

for (i = 0; i < topics.length; i++){
    var gifButton = $("<button>" + topics[i] + "</button>");
    gifButton.attr({"class": "btn btn-outline-primary gifbtn", type: "button", "data-name": topics[i]});
    $(".buttons").append(gifButton);
    console.log("buttonsmade");
};

$(".btn-success").on("click", function(){
    var newValue = $("#newgifbar").val().trim();
    var newGifButton = $("<button>" + newValue + "</button>");
    newGifButton.attr({"class":"btn btn-outline-primary gifbtn", type: "button", "data-name": newValue});
    $(".buttons").append(newGifButton);
    $("#newgifbar").val("");
});


$(document).on("click", ".gifbtn", function(){

    $(".gif-section").empty();

    var searchTerm = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchTerm + "&api_key=dc6zaTOxFJmzC&limit=20";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        
        for (i = 0; i < response.data.length; i++){
            var newDiv = $("<div class='imgcard float-left'>");
            var newGif = $("<img id='gif'>");
            // var rating = $("<p class='rating'>");
            var copyButton = $("<button>copy gif to clipboard: </button>") //will hold copy to clipboard data
            var clipboard = $("<img src='assets/clipboard.svg'>")
            // var copylink = $("<span id='hidethis'>")
            var newRow1 = $("<div class='row'>")
            var newRow2 = $("<div class='row'>")
            
            newGif.attr("src", response.data[i].images.fixed_height_still.url);
            newGif.attr({
                        "data-state":"still",
                        "data-still": response.data[i].images.fixed_height_still.url,
                        "data-animate": response.data[i].images.fixed_height.url,
                        "class": "gif",
            });

            // rating.text("Rating: " + response.data[i].rating);

            clipboard.attr("class", "icon");
            
            // copyButton.val(response.data[i].url);
            // copylink.val(response.data[i].url);
            console.log (response.data[i].url)

            copyButton.attr({
                        "class": "btn-default copy",
                        id: "copydata",
                        "data-clipboard-text": response.data[i].url
            });
            
            //make a new invisible span with copy data info
            
            copyButton.append(clipboard);
            // newDiv.append(copylink);
            // newDiv.append(rating);
            newRow1.append(newGif)
            newRow2.append(copyButton)

            newDiv.append(newRow1);
            newDiv.append(newRow2);
            $(".gif-section").prepend(newDiv);

        };
    })

console.log("got data");
});

$(document).on("click", ".gif", function(){
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

})