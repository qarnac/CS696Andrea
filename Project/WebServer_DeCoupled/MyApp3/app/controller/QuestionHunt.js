function QuestionHunt()
{
    this.currentPage = "";
    this.huntName  = "";
    this.huntX1    = 0.0; //rectangle stuff
    this.huntX2    = 0.0; //rectangle stuff
    this.huntY1    = 0.0; //rectangle stuff
    this.huntY2    = 0.0; //rectangle stuff

    this.partners  = "";
    this.url       = "";

    this.answerQuestion1 = "";
    this.answerQuestion2 = "";
    this.answerQuestion3 = "";

    this.dataBlob = null; // for picture
    this.gpsLat = 0.0; // user lat
    this.gpsLng = 0.0; // user lng

    this.multipleChoice = "";
    this.answerA = "";
    this.answerB = "";
    this.answerC = "";
    this.answerD = "";
    this.answerE = "";
    this.correctAnswer = "";

}

QuestionHunt.prototype.clearAll = function()
{
    /*
    currentPage = "";
    huntName  = "";
    huntX1    = 0.0;
    huntX2    = 0.0;
    huntY1    = 0.0;
    huntY2    = 0.0;

    question1 = "";
    question2 = "";
    question3 = "";
    question4 = "";

    dataBlob = null;
    gpsLat = 0.0;
    gpsLng = 0.0;

    multipleChoiceText = "";
    answerA = "";
    answerB = "";
    answerC = "";
    answerD = "";
    answerE = "";
    correctAnswer = "";
    */
}



QuestionHunt.prototype.getWithinRegion = function()
{
    return 0.0;
}

