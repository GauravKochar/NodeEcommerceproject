
var loginbtn=document.getElementById('loginbtn');
var usertext=document.getElementById('usertext');
var userpass=document.getElementById('userpass');
var loginas=document.getElementById('loginas');

		var fname=document.getElementById('fname');
		var confirmpass=document.getElementById('confirmpass');
		var Password=document.getElementById('password');
		var emailid=document.getElementById('eid');
		var MobileNo=document.getElementById('mno');
		
		checklogin();

function checklogin()
{
		
loginbtn.addEventListener("click",function(event)
{
	var status=0;
	if(loginas.value=="Admin")
	{
		if(usertext.value=="gaurav123"&&userpass.value=="kochar123")
		{
		
			window.location.href="http://127.0.0.1:12000/dashboardInNodehtml2.html";
		}
		/*else	
		{
			
			for(var i=0;i<Admins.length;i++)
			{
				if(usertext.value==Admins[i].userid&&userpass.value==Admins[i].Password)
				{
						storeUser(Admins[i]);
						window.location.href="file:///C:/Users/Gaurav/Desktop/My javascriptproject/dashboard.html";
						
				}
				
			}
			
		}*/
	}
	else if(loginas.value=="User")
	{
		var i;
			var xmlhttp5=new XMLHttpRequest();
						xmlhttp5.onreadystatechange=function()
					{
						if(xmlhttp5.readyState==4&&xmlhttp5.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							console.log("jh"+responsetxt1);
							for( i=0;i<responsetxt1.length;i++)
							{
									if(usertext.value==responsetxt1[i].emailid&&userpass.value==responsetxt1[i].Password)
									{
										status=1;
									break;
									}
									
							}
							
									if(status==1)
									{
										getSessionuser(function(stat)
										{
											if(stat==0)
											{
											storesession(responsetxt1[i]);
											window.location.href="http://127.0.0.1:12000/userdahshboardhtmlNODE.html";
											}
											else
												alert("One User is already LogIn in this site");
										});
									}	
									else
										alert("Enter Correct USeraname and password");
						}
					}
					xmlhttp5.open("GET",'http://127.0.0.1:12000/Users',true);
					xmlhttp5.send();
		
	}
	else{
		alert("Something went wrong");
	}
});
}
function getSessionuser(callback)
{
	var stat=0;
	var xmlhttp5=new XMLHttpRequest();
						xmlhttp5.onreadystatechange=function()
					{
						if(xmlhttp5.readyState==4&&xmlhttp5.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							var ua=navigator.userAgent;
							for( i=0;i<responsetxt1.length;i++)
							{
								if(responsetxt1[i].browserId==ua)
								{
									stat=1;
									break;
								}	
									
							}
							callback(stat);
							
									
						}
					}
					xmlhttp5.open("GET",'http://127.0.0.1:12000/getSessionStorage',true);
					xmlhttp5.send();
}
function storesession(userobj)
{
						var xmlhttp8=new XMLHttpRequest();
						xmlhttp8.open("POST",'http://127.0.0.1:12000/storesession',true);
						userobj.browserId=navigator.userAgent;
						var stringifiedobj=JSON.stringify(userobj);
						
						xmlhttp8.send(stringifiedobj);
						/*xmlhttp8.onreadystatechange=function()
						{
						if(xmlhttp8.readyState==4&&xmlhttp8.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							if(responsetxt1=="already logged in")
							{
								alert("already logged in");
							}
						}
						}*/
}

usersigninbtn();
function usersigninbtn()
{	
 var labelmsg=document.getElementById('labelmsg');
  var labelmsgmobile=document.getElementById('labelmsgmobile');
var signinbtn=document.getElementById('signinbtn');

emailid.addEventListener("blur",function(event)
	{
		var status=1;
		var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							
							//labelmsg.setAttribute("style","display:block");
							for(var i=0;i<responsetxt1.length;i++)
							{
								console.log("responsetext"+responsetxt1);
								if(emailid.value==responsetxt1[i].emailid)
								{
									status=0;	
								}
								
								
							}
							if(status==0)
								{
									
									labelmsg.setAttribute("style","color:red");
									labelmsg.textContent="UserName already Exist";
									
								}
								else	{
									labelmsg.setAttribute("style","color:green");
									labelmsg.textContent="UserName Available";
									
									
								}
						}	
					}
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/Users',true);
					
					xmlhttp2.send();
			
	});
	MobileNo.addEventListener("blur",function(event)
	{
		  var phoneno = /^\d{10}$/;  
		  
		  if(MobileNo.value.match(phoneno))   
		  {
			  MobileNo.setAttribute("style","color:green"); 
			  labelmsgmobile.textContent="";
			    labelmsgmobile.setAttribute("style","display:none");
		  }			  
		  else   
		  {
			  labelmsgmobile.setAttribute("style","display:block");
			 labelmsgmobile.textContent="Not Valid";
			  labelmsgmobile.setAttribute("style","color:red"); 
			 MobileNo.setAttribute("style","color:red"); 
		  }
			    
	});
signinbtn.addEventListener("click",function(event)
{
	
		
		if(fname.value==""||MobileNo.value==""||Password.value==""||confirmpass.value==""||emailid.value=="")
		{
			alert("Textfield is Empty");
		}
		
	 else if(Password.value !=confirmpass.value)
		{
			alert("Your Password is not matching");
		}
		else if(labelmsg.textContent=="UserName already Exist")
			alert("Enter Another Username");
		else if(labelmsgmobile.textContent=="Not Valid")
			alert("Enter correct Mobile No");
		else if(labelmsg.textContent=="UserName Available")
		{
			var obj=new makeobject(fname.value,emailid.value,Password.value,MobileNo.value);
			var xmlhttp3=new XMLHttpRequest();
											xmlhttp3.open("POST",'http://127.0.0.1:12000/adduser',true);
											var stringifiedobj=JSON.stringify(obj);
						
											xmlhttp3.send(stringifiedobj);
			alert(" Congratulations! Your Account has been made..,Now You can LogIn as User..");
			hideTextInUserform();
			
		}
			
});
}



	
function makeobject(fname,emailid,Password,mobile)
{
	this.fname=fname;
	this.emailid=emailid;
	this.Password=Password;
	this.mobileno=mobile;
	
}
function hideTextInUserform()
{
fname.value="";
MobileNo.value="";
confirmpass.value="";
Password.value="";
labelmsgmobile.textContent="";
labelmsg.textContent="";
emailid.value="";
}
