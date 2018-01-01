		
var currentuser;

var lblname=document.getElementById('lblnameid');
	var logoutid=document.getElementById('logoutid');

getdata(function(currentuser)
{
	
	logoutid.addEventListener("click",function(event)
	{ 
	
		
			var xmlhttp3=new XMLHttpRequest();
			xmlhttp3.open("POST",'http://127.0.0.1:12000/delSession',true);
			var stringifiedobj=JSON.stringify(currentuser);
			xmlhttp3.send(stringifiedobj);
		alert("send");
		currentuser=null;
		
	});
console.log(currentuser	);
	if(currentuser==null)
	{
	window.location.href="http://127.0.0.1:12000/loginpageINNODE.html";
	}
	else
	{
		lblname.textContent="Hi "+currentuser.fname+" !";
	}
});

	
function getdata(callback)
{
	currentuser=null;
				var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
					
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							var ua=navigator.userAgent;
							for(var i=0;i<responsetxt1.length;i++)
							{
								if(responsetxt1[i].browserId==ua)
								{
									//lblname.textContent="Hi "+responsetxt1[i].fname+" !";
									currentuser=new Object();
									currentuser.fname=responsetxt1[i].fname;
									currentuser.browserId=responsetxt1[i].browserId;
									
									break;
								}
								
							}
							
						callback(currentuser);
					
						}
					}
					
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/getSessionStorage',true);
					
					xmlhttp2.send();
			
	 
	
}

