<!---------------------------------------------------------------------------------------------
Example client script for JQUERY:AJAX -> PHP:MYSQL example
by Trystan Lea : openenergymonitor.org : GNU GPL

I recommend going to http://jquery.com/ for the great documentation there about all of this
---------------------------------------------------------------------------------------------->
<html>
  <head>
	<script language="javascript" type="text/javascript" src="js/vendor/jquery.js"></script>
  </head>
  <body>

  <!---------------------------------------------------------------------------------------------
  1) Create some html content that can be accessed by jquery
  ---------------------------------------------------------------------------------------------->
  <h2> Client example </h2>
  <h3>Output: </h3>
  <div id="output">this element will be accessed by jquery and this text will be replaced</div>

  <script id="source" language="javascript" type="text/javascript">

  $(function () 
  {

    //-------------------------------------------------------------------------------------------
    // 2) Send a http request with AJAX http://api.jquery.com/jQuery.ajax/
    //-------------------------------------------------------------------------------------------
    $.ajax({                                      
      url: 'apiCyberScavenger.php',                  //the script to call to get data          
      data: "",                        //you can insert url argumnets here to pass to api.php for example "id=5&parent=6"
      dataType: 'json',                //data format      
      success: function(data)          //on recieve of reply
      {
        var title = data[0]["title"];              //get id
        var teacherId = data[1]["teacher_id"];           //get name
        //--------------------------------------------------------------------------------------
        // 3) Update html content
        //--------------------------------------------------------------------------------------
        $('#output').html("<b>title: </b>"+title+"<b> name: </b>"+teacherId);     //Set output element html
        //recommend reading up on jquery selectors they are awesome http://api.jquery.com/category/selectors/
      } 
    });
  
  }); 
  </script>
   
  </body>
</html>  
