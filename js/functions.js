function Conn(function_name, boolIsAsync, objectData){
	
	try{
		
		var conn = this;
		
		if(typeof function_name !== "string"){
			
			throw 'Conn expected function name as parameter 1 of 3; got nothing.';
		}
		
		if(boolIsAsync === undefined){
			
			throw 'Conn expected async boolean as parameter 3 of 3; got nothing.';
		}
		
		var fd = new FormData();
		fd.append('function_name',function_name);
		conn.fd = fd;
		
		if(objectData !== undefined){
			
			conn.method = 'post';
			conn.path = 'php/functions.php';
			
			for(elem in objectData){
				
				conn.fd.append(elem,objectData[elem]);
			}
		}
		
		else{
			
			conn.method = 'get';
			conn.path = 'php/functions.php?function_name=' + function_name;
		}
		
		if (window.XMLHttpRequest) {
		
			conn.object = XMLHttpRequest();
		} 
		
		else {
		
			conn.object = ActiveXObject("Microsoft.XMLHTTP");
		}
		
		conn.after = function(){};
		
		if(boolIsAsync === true){
			
			conn.object.onreadystatechange = function(){
		
				if(this.readyState == 4 && this.status == 200){
					
					try{
						
						conn.txt = this.responseText;
						conn.after();
					}

					catch(e){

						console.log(this.responseText);
						alert('functions.js -> clearNotification -> ' + e.message);
					}
				}
			};
		}
		
		conn.object.open(conn.method,conn.path,boolIsAsync);
		
		conn.run = function(){
			
			if(conn.method === 'get'){
				
				conn.object.send();
			}
			
			else{
				
				conn.object.send(conn.fd);
			}
			
			if(boolIsAsync === false){
				
				conn.txt = conn.object.responseText;
			}
		};
	}
	
	catch(e){
		
		if(typeof e === 'string'){
			
			alert('Conn - ' + e);
		}
		
		else{
			
			alert('Conn - ' + e.name + ' - ' + e.message);
		}
	}
}

function documentDownloadPDF(){
	
	try{
		
		window.open('documents/resume_javier_perez.pdf', '_blank');
		
	}
	
	catch(e){
		
		alert('documentDownload: ' + e.message);
	}
}

function testGet(){
	
	try{
		
		var conn = new Conn('test_get', true);
		conn.after = function(){
			
			alert(conn.txt);
		};
		
		conn.run();
	}
	
	catch(e){
		
		alert('testGet: ' + e.message);
	}
}

function testPost(){
	
	try{
		
		var conn = new Conn('test_post', true, {'stringInput' : 'MERA PAPI'});
		conn.after = function(){
			
			alert(conn.txt);
		};
		
		conn.run();
	}
	
	catch(e){
		
		alert('testPost: ' + e.message);
	}
}