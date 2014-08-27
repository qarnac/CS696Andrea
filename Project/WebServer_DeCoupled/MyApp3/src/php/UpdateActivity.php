<?php
require('./cyberScavengerAPIAdmin.php');

	function updateActivity($con, $obj)
	{

		$answera = $obj['answera'];
		$answerb = $obj['answerb'];
		$answerc = $obj['answerc'];
	
		$additionalAnswers = array("answera"=>$answera, "answerb"=>$answerb, "answerc"=>$answerc);
		$additionalAnswers = json_encode($additionalAnswers);
		
		//print $additionalAnswers;
		
		$sqlStmt = "UPDATE stud_activity SET additionalAnswers='".$additionalAnswers."'" .
				   " status=" . '"' . "unverified" . '"' .
				   ", interesting_url=" . '"' . $obj[''] . '"' .
				   ", mquestion=". '"' . $obj['multipleQuestion'] . '"' .	   
		           " WHERE id='22'";
				   
		/*
		mysql_query("UPDATE stud_activity" .
			" SET partner_names=" .'"'. mysql_escape_string($content->partner_names) .'"' .
			", additionalAnswers=" .'"' . mysql_escape_string($additionalAnswers) .'"' .
			" , choices=" . '"' . mysql_escape_string(choic($content)) .'"' . 
			" , status=" . '"' . mysql_escape_string($content->status) . '"' .
			" , mquestion=" . '"' . mysql_escape_string($content->mquestion) . '"' .  
			", interesting_url=" . '"' . mysql_escape_string($content->interesting_url) . '"' . // question 1
			" WHERE  `id` = " . mysql_escape_string($content->id) . ";") or die(mysql_error());
		*/
		
	}
	
	function choic($data)
	{
		$choic=array("choices"=>array());
		if($data['multipleChoiceAnswerA']!="")
		array_push($choic['choices'],array('choice'=>'a','content'=>$data['multipleChoiceAnswerA'],'ans'=> btos($data['multipleChoiceCorrectAnswer']=='a')));
		if($data['multipleChoiceAnswerB']!="")
		array_push($choic['choices'],array('choice'=>'b','content'=>$data['multipleChoiceAnswerB'],'ans'=> btos($data['multipleChoiceCorrectAnswer']=='b')));
		if($data['multipleChoiceAnswerC']!="")
		array_push($choic['choices'],array('choice'=>'c','content'=>$data['multipleChoiceAnswerC'],'ans'=> btos($data['multipleChoiceCorrectAnswer']=='c')));
		if($data['multipleChoiceAnswerD']!="")
		array_push($choic['choices'],array('choice'=>'d','content'=>$data['multipleChoiceAnswerD'],'ans'=> btos($data['multipleChoiceCorrectAnswer']=='d')));
		if($data['multipleChoiceAnswerE']!="")
		array_push($choic['choices'],array('choice'=>'e','content'=>$data['multipleChoiceAnswerE'],'ans'=> btos($data['multipleChoiceCorrectAnswer']=='e')));
		$choic=json_encode($choic);
		return $choic;
	}
	
	function btos($x)
	{
		if($x)
		return "true";
		else
		return "false";
	}
?>
