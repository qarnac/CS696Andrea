function QuestionHunt()
{
    this.currentPage = "";
    this.huntName  = "";


    this.partners  = "";
    this.url       = "";

    this.questionA = "";
    this.questionB = "";
    this.questionC = "";

    this.answerQuestion1 = "";
    this.answerQuestion2 = "";
    this.answerQuestion3 = "";

    this.qMultiple = "";
    this.answerA = "";
    this.answerB = "";
    this.answerC = "";
    this.answerD = "";
    this.answerE = "";
    this.correctAnswer = "";

    this.dataBlob = null; // for picture
    this.gpsLat = 0.0; // user lat
    this.gpsLng = 0.0; // user lng

    this.huntX1    = 0.0; //rectangle stuff
    this.huntX2    = 0.0; //rectangle stuff
    this.huntY1    = 0.0; //rectangle stuff
    this.huntY2    = 0.0; //rectangle stuff

}


QuestionHunt.prototype.clearQuestions = function()
{

    this.partners  = "";
    this.url       = "";

    this.answerQuestion1 = "";
    this.answerQuestion2 = "";
    this.answerQuestion3 = "";

    this.qMultiple = "";
    this.answerA = "";
    this.answerB = "";
    this.answerC = "";
    this.answerD = "";
    this.answerE = "";
    this.correctAnswer = "";

    this.dataBlob = null; // for picture
    this.gpsLat = 0.0; // user lat
    this.gpsLng = 0.0; // user lng

    this.huntX1    = 0.0; //rectangle stuff
    this.huntX2    = 0.0; //rectangle stuff
    this.huntY1    = 0.0; //rectangle stuff
    this.huntY2    = 0.0; //rectangle stuff

}


QuestionHunt.prototype.getWithinRegion = function()
{
    return 0.0;
}

