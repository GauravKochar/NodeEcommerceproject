alert("jai ");
var productId=1;
var responsetxt;
var addbutton=document.getElementById('addproduct');
var newproduct=document.getElementById('newproduct');

var Editsavebutton=document.getElementById('editsavebutton');
//console.log(Editsavebutton);
var table=document.getElementById('table');
table.setAttribute("style","display:block");
	
addbutton.addEventListener("click",function(event){	
						
							event.preventDefault();
								clearbox();
							display();
							});
	
	
	
function Productfun(productId,name,price,desc,quantity)
{
	this.ID=productId;
	this.Name=name;
	this.Price=price;
	this.Desc=desc;
	this.Quantity=quantity;
}			

	
function addProducttoArray(productId)
{
	
	
 	 var name = document.getElementById("pnamebox").value;
	 var price = document.getElementById("ppricebox").value;
	 var desc = document.getElementById("pdescbox").value;
	 var quantity = document.getElementById("pquantitybox").value;
	 
	 if((name=="")||(price=="")||(desc=="")||(quantity==""))
		{
		alert("Enter all values");
		}
		else if(price>0&&quantity>0)
		{
			
			console.log(productId);
			var objProduct = new Productfun(productId,name,price,desc,quantity);
			
			
			var xmlhttp=new XMLHttpRequest();
			
			xmlhttp.open("POST",'http://127.0.0.1:12000/products',true);
			var stringifiedProduct=JSON.stringify(objProduct);
			xmlhttp.send(stringifiedProduct);
			
			
			
		}
		else{
			alert("Enter positive values");
		}
}
displaydata();
function giveID(callback)
	{
		var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
					
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
								
							var responsetxt1=JSON.parse(this.responseText);
							
							if(responsetxt1.length>0)
							{
								
								 productId=parseInt(responsetxt1[responsetxt1.length-1].ID)+1;
								 console.log(productId);
								 
								// return productId;
								
							}
							else
								productId=1;
						
					addProducttoArray(productId);
					callback();
						}
					}
					
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/products',true);
					
					xmlhttp2.send();
			
		
		
	}
function displaydata()
			{
			var xmlhttp1=new XMLHttpRequest();
						xmlhttp1.onreadystatechange=function()
					{
								
						if(xmlhttp1.readyState==4&&xmlhttp1.status==200)
						{
								
							 responsetxt=JSON.parse(this.responseText);
							
							for(var i=0;i<responsetxt.length;i++)
							{
								addProductTotable(responsetxt[i]);
							}
							
						}
					}
				
					xmlhttp1.open("GET",'http://127.0.0.1:12000/products',true);
					
					xmlhttp1.send();
			
			
			
			
			
			
			}
function display()
{
	

addproduct.setAttribute("style","display:none");
newproduct.setAttribute("style","display:block");
newsavebutton.setAttribute("style","display:block");
Editsavebutton.setAttribute("style","display:none");					
}

var newsavebutton=document.getElementById('savebutton');
newsavebutton.addEventListener("click",function(event){	

						giveID(function()
						{
							window.location.href="http://127.0.0.1:12000/addproductinnode.html";
						});
						
				
							});
function clearbox(){
		pnamebox.value="";
		ppricebox.value="";
		pdescbox.value="";
		pquantitybox.value="";
}

function addProductTotable(objProduct)
{
	newproduct.setAttribute("style","display:none");
	addbutton.setAttribute("style","display:block");
				
var pnamebox=document.getElementById("pnamebox");
var ppricebox=document.getElementById("ppricebox")
var pdescbox=document.getElementById("pdescbox")
var pquantitybox=document.getElementById("pquantitybox")



	table.setAttribute("style","display:block");
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.setAttribute("style","display:none;");
	id.textContent=objProduct.ID;
	tr.appendChild(id);
	
	var name=document.createElement('td');
	name.textContent=objProduct.Name;
	tr.appendChild(name);

	var price=document.createElement('td');
	price.textContent=objProduct.Price;
	tr.appendChild(price);
	
	var Desc=document.createElement('td');
	Desc.textContent=objProduct.Desc;
	tr.appendChild(Desc);
	
	var Quant=document.createElement('td');
	Quant.textContent=objProduct.Quantity;
	tr.appendChild(Quant);
	
	var Delete=document.createElement('td');
	var Deletebtn=document.createElement('button');
	Deletebtn.textContent="Delete";
	
	Delete.appendChild(Deletebtn);
	Deletebtn.addEventListener('click',function(event)
{
	Del(event);
});
	tr.appendChild(Delete);
	
	
	var edit=document.createElement('td');
	var Editbtn=document.createElement('button');
	Editbtn.textContent="Edit";
	
	edit.appendChild(Editbtn);
	Editbtn.addEventListener('click',function(event)
{
	Eedit(event);
});
	
	tr.appendChild(edit);
	table.appendChild(tr);
	
		

}

 function Del(event)
{
	
var check=confirm("Do you really want to delete");
						if(check==true)
						{
										var targetParent = event.target.parentNode.parentNode;
										var id= (targetParent.childNodes[0].textContent); 
										 console.log(id);
										  var xmlhttp3=new XMLHttpRequest();
												var a=new Object();
												a.ID=id;
											xmlhttp3.open("POST",'http://127.0.0.1:12000/delete',true);
											var stringifiedID=JSON.stringify(a);
											xmlhttp3.send(stringifiedID);
										   targetParent.parentNode.removeChild(targetParent);
										   
										   if(table.childElementCount==1)
											{
												table.setAttribute("style","display:none");
											}
						}
											

}



function clearbox(){
		pnamebox.value="";
		ppricebox.value="";
		pdescbox.value="";
		pquantitybox.value="";
}

function Eedit(event)
{
	
	display();
	Editintextboxes(pnamebox,ppricebox,pdescbox,pquantitybox,event);
	
}

function Editintextboxes(pnamebox,ppricebox,pdescbox,pquantitybox,event1)
{
	tr=event1.target.parentNode.parentNode;
	
	clearbox();
	pnamebox.value=tr.childNodes[1].textContent;
	ppricebox.value=tr.childNodes[2].textContent;
	pdescbox.value=tr.childNodes[3].textContent;
	pquantitybox.value=tr.childNodes[4].textContent;
	
	newsavebutton.setAttribute("style","display:none");
	Editsavebutton.setAttribute("style","display:block");
	
	Editsavebutton.addEventListener('click',function(event)
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