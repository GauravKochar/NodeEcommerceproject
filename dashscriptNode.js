		console.log("Kahh");
		
		var username=1;
		var showadmins=document.getElementById('showadmins');
		var midright=document.getElementById('midright');
		
		var fname=document.getElementById('fname');
		var confirmpass=document.getElementById('confirmpass');
		var Password=document.getElementById('password');
		
		var emailid=document.getElementById('eid');
		var table=document.getElementById('admintable');
		
		var signinbtn=document.getElementById('signinbtn');
var editsavebutton=document.getElementById("savebtn");
		
		var MobileNo=document.getElementById('mno');
		var orders=document.getElementById('orders');
		
	//	var currentuser;


/*orders.addEventListener("click",function(event)
{
	
	window.location.href="http://127.0.0.1:12000/placeorderInNodeHtml.html";
	
});*/
//showadmindiv();

displaytable();
displaydata();



function  displaydata()
{
	//var lblname=document.getElementById('lblnameid');
	var logoutid=document.getElementById('logoutid');

	logoutid.addEventListener("click",function(event)
	{ 
		
		window.location.href="/";
	});


}

/*function showadmindiv()
{
showadmins.addEventListener("click",function(event)
{
	midright.setAttribute("style","display:block");
});
}*/

adminsigninbtn();
function adminsigninbtn()
{
	
 var labelmsg=document.getElementById('msgid');
  var labelmsgmobile=document.getElementById('labelmsgmobile');


emailid.addEventListener("blur",function(event)
	{
		var status=1;
		var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							
							for(var i=0;i<responsetxt1.length;i++)
							{
								if(emailid.value==responsetxt1[i].emailid)
								{
									status=0;	
								}
								
							}
							if(status==0)
								{
									
									labelmsg.setAttribute("style","color:red");
									labelmsg.textContent="This Admin is already Exist";
									
								}
								else	{
									labelmsg.setAttribute("style","color:green");
									labelmsg.textContent="Available";
								}
						}	
					}
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/Admins',true);
					alert("Send");
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
		else if(labelmsg.textContent=="This Admin is already Exist")
			alert("Enter Another Username");
		else if(labelmsgmobile.textContent=="Not Valid")
			alert("Enter correct Mobile No");
		else if(labelmsg.textContent=="Available")
		{
			var obj=new makeobject(fname.value,emailid.value,Password.value,MobileNo.value,"1","1");
			var xmlhttp3=new XMLHttpRequest();
			xmlhttp3.open("POST",'http://127.0.0.1:12000/addAdmin',true);
			var stringifiedobj=JSON.stringify(obj);
			xmlhttp3.send(stringifiedobj);
			//alert("Congratulations! Your Account has been made..,Now You can LogIn as Admin..");
			hidetextinadminform();
			window.location.reload();

			//showadmindiv();
			
		}
			
});


}



function makeobject(fname,emailid,Password,mobile,addedby,active)
{
	this.fname=fname;
	
	this.mobileno=mobile;
	this.Password=Password;
	this.emailid=emailid;
	this.addedby=addedby;
	this.active=active;
	
}


function displaytable()
{
	var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
							var responsetxt1=JSON.parse(this.responseText);
							
							for(var i=0;i<responsetxt1.length;i++)
							{
								if(responsetxt1[i].active=="1")
							addAdminToTable(responsetxt1[i]);
							}
							
						}	
					}
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/Admins',true);
					
					xmlhttp2.send();
	
}
 function addAdminToTable(adminobject)
{
	
	var tr=document.createElement('tr');
		
	var name=document.createElement('td');
	name.textContent=adminobject.fname;
	tr.appendChild(name);

	var adminname=document.createElement('td');
	adminname.textContent=adminobject.emailid;
	tr.appendChild(adminname);
	
	
	var dob=document.createElement('td');
	dob.textContent=adminobject.mobileno;
	tr.appendChild(dob);
	
	
	
	var Delete=document.createElement('td');
	var deletebtn=document.createElement("button");
	deletebtn.textContent="Delete";
	deletebtn.addEventListener("click",function(event)
	{
		Del(event);
	});
	Delete.appendChild(deletebtn);
	tr.appendChild(Delete);
	
	var Edit=document.createElement('td');
	Edit.setAttribute("style","display:none;")
	var Editbtn=document.createElement("button");
	Editbtn.textContent="Edit";
	Editbtn.addEventListener("click",function(event)
	{
		//Editadmin(event);
	});
	Edit.appendChild(Editbtn);
	
	tr.appendChild(Edit);
	
	var addedby=document.createElement('td');
	addedby.setAttribute("style","display:none;")
	addedby.textContent=adminobject.addedby;
	tr.appendChild(addedby);
	
	var active=document.createElement('td');
	active.setAttribute("style","display:none;")
	active.textContent=adminobject.active;
	
	tr.appendChild(active);

	table.appendChild(tr);
	hidetextinadminform();
	
}
 function Del(event)
{
	
var check=confirm("Do you really want to delete");
						if(check==true)
						{
										var targetParent = event.target.parentNode.parentNode;
										var id= (targetParent.childNodes[1].textContent); 
										 console.log(id);
										  var xmlhttp3=new XMLHttpRequest();
												var a=new Object();
												a.ID=id;
											xmlhttp3.open("POST",'http://127.0.0.1:12000/deleteAdmin',true);
											var stringifiedID=JSON.stringify(a);
											xmlhttp3.send(stringifiedID);
										   targetParent.parentNode.removeChild(targetParent);
										   
										   if(table.childElementCount==1)
											{
												table.setAttribute("style","display:none");
											}
						}
							
}

function Editadmin(event)
{
	
 var tr=event.target.parentNode.parentNode;
	
	hidetextinadminform();
	
	var AdminEmailId=tr.childNodes[1].textContent;
	ppricebox.value=tr.childNodes[2].textContent;
	pdescbox.value=tr.childNodes[3].textContent;
	pquantitybox.value=tr.childNodes[4].textContent;
	
	signinbtn.setAttribute("style","display:none");
	editsavebutton.setAttribute("style","display:block");
	
	editsavebutton.addEventListener('click',function(event)
	{
		
										var id=(tr.childNodes[0].textContent); 
										console.log(id);
										 	var a=new Object();
												a.ID=id;
												a.name=pnamebox.value;
												a.price=ppricebox.value;
												a.desc=pdescbox.value;
												a.quantity=pquantitybox.value;
												console.log(a);
										  var xmlhttp4=new XMLHttpRequest();
											
											xmlhttp4.open("POST",'http://127.0.0.1:12000/edit',true);
											var stringifiedobj=JSON.stringify(a);
											xmlhttp4.send(stringifiedobj);
	});
	
}

function addValueFromArrayToForm(selectedadminIndex)
{ 				var y;
			var x=document.getElementsByName("sex");
				fname.value=Admins[selectedadminIndex].fname;		
					Password.value=Admins[selectedadminIndex].Password;
					confirmpass.value=Admins[selectedadminIndex].Password;
					dateofbirth.value=Admins[selectedadminIndex].dob;
					
					emailid.value=Admins[selectedadminIndex].emailid;
					
					if(Admins[selectedadminIndex].gender=="Male")
						 y=0;
					else 
						y=1;
					
					x[y].checked=true;
					
}





function hidetextinadminform()
{
	fname.value="";
confirmpass.value="";
Password.value="";
MobileNo.value="";
emailid.value="";
}




