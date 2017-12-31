<?php

	require("config.php");
	
	if(isset($_GET["function_name"]) === true){
		
		switch($_GET["function_name"]){
			
			case "test_get":
		
				test_get();
			break;
		}
	}
	
	if(isset($_POST["function_name"]) === true){
		
		switch($_POST["function_name"]){
			
			case "test_post":
		
				test_post($_POST["stringInput"]);
			break;
		}
	}
	
	function is_return_echo($stringFunctionName){
		
		if(isset($_GET["function_name"]) === true || isset($_POST["function_name"]) === true){
			
			return true;
		}
		
		else{
			
			return false;
		}
	}
	
	function test_get(){
		
		if(is_return_echo(__FUNCTION__) === true){
			
			echo "GET OK";
		}
		
		else{
			
			return "GET OK";
		}
	}
	
	function test_post($stringInput){
		
		if(is_return_echo(__FUNCTION__) === true){
			
			echo "POST OK [".$stringInput."]";
		}
		
		else{
			
			return "POST OK [".$stringInput."]";
		}
	}
?>