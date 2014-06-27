function QuestionHunt()
{
    this.huntName  = "";
    this.huntX1    = 0.0;
    this.huntX2    = 0.0;
    this.huntY1    = 0.0;
    this.huntY2    = 0.0;

    this.question1 = "";
    this.question2 = "";
    this.question3 = "";
    this.question4 = "";

    this.dataBlob = null;
    this.gpsLat = 0.0;
    this.gpsLng = 0.0;

}



QuestionHunt.prototype.getWithinRegion = function()
{
    return 0.0;
}

