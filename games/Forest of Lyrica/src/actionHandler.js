function mousedownHandler()
{
 button.style.background 
   = "-webkit-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
 button.style.background 
   = "-moz-linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
 button.style.background 
   = "linear-gradient(top, rgba(0,0,0,0.2), rgba(255,255,255,0.3))";
}

function mouseoutHandler()
{
 button.style.background 
   = "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
 button.style.background 
   = "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
 button.style.background 
   = "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
}

function clickHandler()
{
  button.style.background 
   = "-webkit-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
  button.style.background 
   = "-moz-linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
  button.style.background 
   = "linear-gradient(top, rgba(255,255,255,0.6), rgba(0,0,0,0.2))";
   
  playGame();
}

function keydownHandler(event)
{
  if(event.keyCode === 13)
  {
    playGame();
  }
}