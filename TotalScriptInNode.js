var table=document.getElementById('table');
var carttproducts;
var  products;
var globaltotal=0;
var Total;
var orderid;
var odid;
 

					displaydata();
					
			function tableheading()
			{
				var frow=document.createElement('tr');
	
				var pname=document.createElement('th');
				pname.textContent="Product Name";
				frow.appendChild(pname);

				var pprice=document.createElement('th');
				pprice.textContent="Product Price";
				frow.appendChild(pprice);
				
				
				var pQuant=document.createElement('th');
				pQuant.textContent="Product Quantity";
				frow.appendChild(pQuant);
				
				var psubtotal=document.createElement('th');
				psubtotal.textContent="Sub Total";
				frow.appendChild(psubtotal);
				
				var pDelete=document.createElement('th');
				pDelete.textContent="Delete";
				frow.appendChild(pDelete);
				table.appendChild(frow);
			}			
	function getrequest(callback)
	{
		var xmlhttp1=new XMLHttpRequest();
						xmlhttp1.onreadystatechange=function()
					{
								
						if(xmlhttp1.readyState==4&&xmlhttp1.status==200)
						{
							///console.log(this.responseText);
							callback(this.responseText);
						}
					}
				
					xmlhttp1.open("GET",'http://127.0.0.1:12000/cartproducts',true);
					
					xmlhttp1.send();
	}	
function displaydata()
{
	tableheading();
		
			getrequest(function(responseText)
			{
				//var total=0;
					responsetxt=JSON.parse(responseText);
							
							for(var i=0;i<responsetxt.length;i++)
							{
								displaydataintable(responsetxt[i]);
								
							}
				
			Summ();
			
			
	var tr=document.createElement('tr');
	
	var sum=document.createElement('td');
	sum.setAttribute("colspan","2");
	sum.innerHTML="<b>TOTAL</b>";
	tr.appendChild(sum);
	
	 Total=document.createElement('td');
	
	Total.setAttribute("colspan","2");
	//Total.innerHTML="<b>"+total+"</b>";
	
	tr.appendChild(Total);
					
	table.appendChild(tr);
	});
}
function Summ()
{
	var total=0;
getrequest(function(cartproducts)
{
	
	cartproducts=JSON.parse(cartproducts);
			for(i=0;i<cartproducts.length;i++)
			{
			var p=parseInt(cartproducts[i].Price);
			var q=parseInt(cartproducts[i].selectedquan);
			console.log(p);
			console.log(q);
			
		  total=total+p*q;
	 
			}
			globaltotal=total;
			Total.innerHTML="<b>"+total+"</b>";
	 
	
});
//console.log(total);
}
					
function displaydataintable(objcartProduct)
{
		var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.setAttribute("style","display:none");
	id.textContent=objcartProduct.ID;
	tr.appendChild(id);
	
	var name=document.createElement('td');
	name.textContent=objcartProduct.Name;
	tr.appendChild(name);

	var price=document.createElement('td');
	price.textContent=objcartProduct.Price;
	tr.appendChild(price);
	
	
	//var Quant=document.createElement('td');
	//Quant.innerHTML="<input type=\"number\" id=\"quanttext\" min=\"1\" value=\""+objcartProduct.Quan+"\"/>";
	var Quant=document.createElement('td');
	var Text=document.createElement('input');
	Text.setAttribute("type","number");
	Text.setAttribute("min","1");
	Text.setAttribute("id","quanttxt");
	Text.setAttribute("max",objcartProduct.selectedquan);
	
	Text.setAttribute("value",objcartProduct.selectedquan);
	Quant.appendChild(Text);
	tr.appendChild(Quant);
	Text.addEventListener("change",function(event)
	{
		var parentnode=event.target.parentNode;
		objcartProduct.selectedquan=parentnode.childNodes[0].value;
		
		 var targetParent = event.target.parentNode.parentNode;
		var obj=new Object();
		obj.ID=targetParent.childNodes[0].textContent;
		obj.quantity=parentnode.childNodes[0].value;
		console.log(obj);
		UpdateQuantity(obj,function()
		{
			window.location.reload();
		
		});
		
		subtotal.textContent=objcartProduct.Price*objcartProduct.selectedquan;
		
		
		
	});
	
	var subtotal=document.createElement('td');
	subtotal.textContent=objcartProduct.Price*objcartProduct.selectedquan;
	tr.appendChild(subtotal);
	
	var Delete=document.createElement('td');
	
	
	var Deletebtn=document.createElement('button');
	Deletebtn.textContent="Delete";
	
	Delete.appendChild(Deletebtn);
	tr.appendChild(Delete);
	table.appendChild(tr);
	Deletebtn.addEventListener('click',function(event)
{
	Del(event);
});
	
	}
	 
function UpdateQuantity(obj,callback)
	{
		 var xmlhttp3=new XMLHttpRequest();
												
		xmlhttp3.open("POST",'http://127.0.0.1:12000/updatequantity',true);
		var stringifiedobj=JSON.stringify(obj);
		xmlhttp3.send(stringifiedobj);
		callback();
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
											xmlhttp3.open("POST",'http://127.0.0.1:12000/cartdelete',true);
											var stringifiedID=JSON.stringify(a);
											xmlhttp3.send(stringifiedID);
										   targetParent.parentNode.removeChild(targetParent);
										   
										   if(table.childElementCount==1)
											{
												table.setAttribute("style","display:none");
											}
											window.location.reload();
						}
											

}
function postHeader(headerobj,callback)
{
	var xmlhttp3=new XMLHttpRequest();
	xmlhttp3.open("POST",'http://127.0.0.1:12000/postheaderobj',true);
	var stringifiedobj=JSON.stringify(headerobj);
	xmlhttp3.send(stringifiedobj);
	callback();
}


var orderplace=document.getElementById("placeorder");
orderplace.addEventListener("click",function(event)
{
	
	uid="1";
	giveorderid(function(orderid)
	{
		var headerobj=new makeheaderobj(orderid,"1","Orderplace",uid);
		var cartproducts;
			postHeader(headerobj,function()
			{
				
				
				getrequest(function(cartproduct)
				{
					var i;
					 cartproducts=JSON.parse(cartproduct);
					// console.log(cartproducts.length);
					makedetailobject(cartproducts,function(i,detailobj)
					{
							senddetailobject(i,detailobj,function(i)
							{
								if(i==cartproducts.length-1)
								{
										var xmlhttpp=new XMLHttpRequest();
					xmlhttpp.open("POST",'http://127.0.0.1:12000/flushusercart');
					var stringifieduser=JSON.stringify(headerobj);
					xmlhttpp.send(stringifieduser);
					alert("send"+i+""+cartproducts);
					window.location.reload();
					
								}
							});
							
								
					});
										
				});
				
			});
			
			
	
	
	});
	

});
function senddetailobject(i,detailobj,callback)
{
							var xmlhttp3=new XMLHttpRequest();
							xmlhttp3.open("POST",'http://127.0.0.1:12000/postdetailobj',true);
							var stringifiedobj=JSON.stringify(detailobj);
							xmlhttp3.send(stringifiedobj);
							alert("send to detailed object "+i);
							callback(i);
}
function makedetailobject(cartproducts,callback)
{
	var i;
	for( i=0;i<cartproducts.length;i++)
		{
								
								giveodid(i,function(i,odid)
								{
									//console.log(cartproducts[i]);
									var detailobj=new makedetailobj(cartproducts[i],orderid,odid);
									callback(i,detailobj);
								});
		}
		
}
 function giveorderid(callback)
 {
	
		var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
					
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
								
							var responsetxt1=JSON.parse(this.responseText);
							
							if(responsetxt1.length>0)
							{
								
								 orderid=parseInt(responsetxt1[responsetxt1.length-1].orderid)+1;
								 orderid=""+orderid;
								 
							}
							else
								orderid="1";
						
					callback(orderid);
						}
					}
					
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/OrderHeader',true);
					
					xmlhttp2.send();
			
	 
 }
 function giveodid(i,callback)
 {
	
		var xmlhttp2=new XMLHttpRequest();
						xmlhttp2.onreadystatechange=function()
					{
					
						if(xmlhttp2.readyState==4&&xmlhttp2.status==200)
						{
							
							var responsetxt1=JSON.parse(this.responseText);
							//console.log(responsetxt1);
							
							if(responsetxt1.length>0)
							{
								
								 odid=parseInt(responsetxt1[responsetxt1.length-1].odid)+1;
								odid=""+odid;
								// console.log(odid);
								
							}
							else
								odid="1";
						
						
					callback(i,odid);
						}
					}
					
				
					xmlhttp2.open("GET",'http://127.0.0.1:12000/OrderDetail',true);
					
					xmlhttp2.send();
			
	 
 }
 
 
function  makeheaderobj(orderid,active,Status,userid)
{
	
	this.orderid=orderid;
	this.active=active;
	this.Status=Status;
	this.userid=userid;
	this.date=new Date();
	Summ();
	this.grandtotal=""+globaltotal;
	
}
function makedetailobj(carttproduct,orderid,odid)
{
	
	this.odid=odid;
	this.orderid=orderid;
	this.productid=carttproduct.ID;
	this.productname=carttproduct.Name;
	this.productquantity=carttproduct.selectedquan;
	this.productprice=carttproduct.Price;
	
}



