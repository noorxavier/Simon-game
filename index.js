var buttonColors = ["blue", "green", "red", "yellow"];
var gamePattern = [];

var userclickedPattern=[];

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userclickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userclickedPattern.length-1);
})
var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level  " + level);
    nextSequence();
    started = true;
  }
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userclickedPattern[currentLevel]){
        console.log("success");
        if(userclickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        console.log("wrong");
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function nextSequence() {
    userclickedPattern=[];

    level++;

    $("#level-title").text("Level "+level);
    var randomNum = Math.floor(Math.random() * 4);
    
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
    
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}