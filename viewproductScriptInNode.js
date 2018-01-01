
var products;
var cart;


getProductFromServer();
function cartproduct(id,name,desc,Quant,price,quan)
{
	this.ID=id;
	this.Name=name;
	this.Desc=desc;
	this.Quantity=Quant;
	this.Price=price;
	this.selectedquan=quan;
}
function getProductFromServer()
{
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function()
	{
		if(xmlhttp.readyState==4&&xmlhttp.status==200)
		{
			var responsetxt=JSON.parse(this.responseText);
			for(var i=0;i<responsetxt.length;i++)
			{
				createviewdiv(responsetxt[i]);
			}
		}
	}
	xmlhttp.open("GET",'http://127.0.0.1:12000/products',true);
					
	xmlhttp.send();
}

function createviewdiv(objproduct)
{
	var orderedlist=document.getElementById("mylist");
	var listelem=document.createElement("li");
	 var division=document.createElement("div");
	division.setAttribute("class","divide");
	
	var leftdiv=document.createElement("div");
	leftdiv.setAttribute("class","left clear");
	
	console.log(typeof(objproduct));
	var lblprice = document.createElement("label");
	lblprice.innerHTML = "Price :"+parseInt(objproduct.Price*0.8);
	lblprice.setAttribute("class","price");
	lblprice.setAttribute("style","font-weight:bold");
	leftdiv.appendChild(lblprice);
	
	var lblquantity = document.createElement("label");
	lblquantity.innerHTML = "  Quantity :"+objproduct.Quantity;
	lblquantity.setAttribute("class","quantity");
	lblquantity.setAttribute("style","font-weight:bold");
	leftdiv.appendChild(lblquantity);
	
	
	var lbldesc = document.createElement("label");
	lbldesc.textContent = "  Description :"+objproduct.Desc;
	
	lbldesc.setAttribute("class","desc");
	lbldesc.setAttribute("style","font-weight:bold");
	leftdiv.appendChild(lbldesc);
	
	var lblid= document.createElement("label");
	lblid.innerHTML=""+objproduct.ID;
	lblid.setAttribute("class","id");
lblid.setAttribute("style","display:none;");
	leftdiv.appendChild(lblid);
	
	
	
	
	 
	
	
	var rightdiv=document.createElement("div");
	rightdiv.setAttribute("class","right clear");	
	
	var addtocartbtn=document.createElement("button");
	addtocartbtn.setAttribute("id","addcartbtnid");
	addtocartbtn.textContent="Add to Cart";
	
	

	
	var lblquan = document.createElement("label");
	lblquan.textContent ="Quantity : ";
	lblquan.setAttribute("style","font-weight:bold");
	
	
	var inputquantity = document.createElement("input");
	inputquantity.setAttribute("class","quantitytextbox");
	inputquantity.setAttribute("type","number");	
	inputquantity.setAttribute("min","1");
	inputquantity.setAttribute("value","1");
	inputquantity.setAttribute("max",objproduct.Quantity);
	
	rightdiv.appendChild(addtocartbtn);
	
	var brk=document.createElement("br");
	rightdiv.appendChild(brk);
	
		 brk=document.createElement("br");
	rightdiv.appendChild(brk);
	
	rightdiv.appendChild(lblquan);
	rightdiv.appendChild(inputquantity);
	
	
	var lblpname = document.createElement("h3");
	lblpname.setAttribute("id","lbpname");	
	lblpname.textContent=objproduct.Name;
	
	
	
		division.appendChild(lblpname);
		division.appendChild(leftdiv);
		division.appendChild(rightdiv);
		listelem.appendChild(division);
		orderedlist.appendChild(listelem);
		
	addtocartbtn.addEventListener("click",function(event)
	{
		var parentnode=event.target.parentNode.parentNode;
		
			var rghtdiv=event.target.parentNode;
			var quan=rghtdiv.querySelector('.quantitytextbox').value;
			
			
		 var idvalue=parentnode.querySelector('.id').textContent;
		  var pname=parentnode.querySelector('#lbpname').textContent;
		  var pdesc=parentnode.querySelector('.desc').textContent;
		  var pdescarr= pdesc.split(":");
		  var pquantity=parentnode.querySelector('.quantity').textContent;
		var pquantityarr= pquantity.split(":");
		
		   var price=parentnode.querySelector('.price').textContent;
		   var  ppricearr= price.split(":");
		 var mainquant= parseInt(pquantityarr[1]);
		var selectquantity=parseInt(quan);
		console.log(mainquant);
		console.log(selectquantity);
		
		 if(mainquant>=selectquantity)
		  {
		 var obj=new cartproduct(idvalue,pname,pdescarr[1],pquantityarr[1],ppricearr[1],quan);
		 console.log(obj);
		 sendpostrequest(obj,function()
		 {
			 window.location.reload();
		 });
		
		}
		  else{
			  alert("can't possible");
		  }
		
		 
		
	});
}
function sendpostrequest(obj,callback)
{
		 var xmlhttp3=new XMLHttpRequest();								
		xmlhttp3.open("POST",'http://127.0.0.1:12000/cartproducts',true);
		var stringifiedobj=JSON.stringify(obj);
		console.log(stringifiedobj);
		xmlhttp3.send(stringifiedobj);
		callback();

}