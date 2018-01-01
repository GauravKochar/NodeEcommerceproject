var table=document.getElementById('headertable');
var detailtable=document.getElementById('detailtable');
var headerarray;
var detailarray;

	function tableheading()
	{
		var frow=document.createElement('tr');

		var pname=document.createElement('th');
		pname.textContent="OrderId";
		frow.appendChild(pname);

		var pprice=document.createElement('th');
		pprice.textContent="UserId";
		frow.appendChild(pprice);
		
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Status";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Active";
		frow.appendChild(psubtotal);
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Total";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Order Date";
		frow.appendChild(psubtotal);
		
		var completed=document.createElement('th');
		completed.textContent="Completed";
		frow.appendChild(completed);
		
		var update=document.createElement('th');
		update.textContent="Update";
		frow.appendChild(update);
		
		var detail=document.createElement('th');
		detail.textContent="Detail";
		frow.appendChild(detail);
		
		
		
		table.appendChild(frow);
	}		
	
	
	function detailtableheading()
	{
		var frow=document.createElement('tr');

		var pname=document.createElement('th');
		pname.textContent="OdId";
		frow.appendChild(pname);

		var pprice=document.createElement('th');
		pprice.textContent="OrderId";
		frow.appendChild(pprice);
		
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Product Id";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Product Name";
		frow.appendChild(psubtotal);
		
		var pQuant=document.createElement('th');
		pQuant.textContent="Product Quantity ";
		frow.appendChild(pQuant);
		
		var psubtotal=document.createElement('th');
		psubtotal.textContent="Product Price";
		frow.appendChild(psubtotal);
		detailtable.appendChild(frow);
		
	}
	tableheading();
	function getReqForOrderHeader(callback)
	{
		var	xmlhttp=new XMLHttpRequest();
		xmlhttp.onreadystatechange=function()
		{
			if(xmlhttp.readyState==4&&xmlhttp.status==200)
			{
				var responsetxt=JSON.parse(this.responseText);
				callback(responsetxt);
			}
		}
		xmlhttp.open("GET","http://127.0.0.1:12000/OrderHeader");
		xmlhttp.send();
		
	}
	getReqForOrderHeader(function(responsetxt)
	{
		for(var i=0;i<responsetxt.length;i++)
	{
		 displaydataintable(responsetxt[i]);
		
	}
	});


function displaydataintable(objectarray)
{
	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objectarray.orderid;
	tr.appendChild(id);
	
	var userid=document.createElement('td');
	userid.textContent=objectarray.userid;
	tr.appendChild(userid);

	
	
	var Status=document.createElement('td');
 var inputtxt=document.createElement("input");
	inputtxt.setAttribute("type","text");
	inputtxt.value=objectarray.Status;
	Status.appendChild(inputtxt);
	tr.appendChild(Status);
	
	var active=document.createElement('td');
	active.textContent=objectarray.active;
	tr.appendChild(active);


	var total=document.createElement('td');
	total.textContent=objectarray.grandtotal;
	tr.appendChild(total);
	
	var date=document.createElement('td');
	date.textContent=objectarray.date;
	tr.appendChild(date);
	
	
	var tdBtn=document.createElement('td');
	 var completebtn=document.createElement("button");
	  completebtn.setAttribute("class","completebtn");
	completebtn.textContent="Completed"
	tdBtn.appendChild(completebtn);
	completebtn.addEventListener("click",function()
	{
		//complete(tr);
	});
	tr.appendChild(tdBtn);
	
	
	


	var tdBtn2=document.createElement('td');
	 var updatebtn=document.createElement("button");
	 updatebtn.setAttribute("class","updatebtn");
	updatebtn.textContent="Update"
	tdBtn2.appendChild(updatebtn);
	updatebtn.addEventListener("click",function()
	{
		//update(tr);
	});
	tr.appendChild(tdBtn2);
	
	
	
	var tdBtn3=document.createElement('td');
	 var detbtn=document.createElement("button");
	  detbtn.setAttribute("class","detailbtn")
	detbtn.textContent="Details";
	detbtn.addEventListener("click",function()
	{
		details(event);
	});
	tdBtn3.appendChild(detbtn);
	
	tr.appendChild(tdBtn3);
	
	table.appendChild(tr);
	}
function postorderIDForDetails(obj,callback)
{
	
	
		var xmlhttp3=new XMLHttpRequest();
		xmlhttp3.open("POST",'http://127.0.0.1:12000/findOrderidDetails',true);
		var stringifiedobj=JSON.stringify(obj);
		
	
	xmlhttp3.onreadystatechange = function() 
	{
		if(xmlhttp3.readyState == 4 && xmlhttp3.status == 200) {
		   callback();
		}
	}
xmlhttp3.send(stringifiedobj);
	
}
		
		
function getSpecificDetails(callback)
{
	
	var xmlhttp3=new XMLHttpRequest();	
	
	xmlhttp3.onreadystatechange=function()
	{
		if(xmlhttp3.readyState==4&&xmlhttp3.status==200)
		{	
			var responsetxt=JSON.parse(this.responseText);
			
			callback(responsetxt);
		}
	}

xmlhttp3.open("GET",'http://127.0.0.1:12000/getOrderIdDetails',true);
xmlhttp3.send();


}


 function details(event)
 {
	
		 var targetparent=event.target.parentNode.parentNode;	
		 detailtable.textContent="";
		detailtable.setAttribute("style","display:block");
		detailtableheading();
		
		var obj=new Object();
		obj.ID=(targetparent.childNodes[0].textContent);
		console.log(obj);
		postorderIDForDetails(obj,function()
		{
			getSpecificDetails(function(responsetxt)
			{
				for(i=0;i<responsetxt.length;i++)
				{
					
					displaydetailtable(responsetxt[i]);
				}
			});
			
		});
		
 }	
		
	
 

	function displaydetailtable(objectarray)
{
	
	var tr=document.createElement('tr');
	
	var id=document.createElement('td');
	id.textContent=objectarray.odid;
	tr.appendChild(id);
	
	var orderid=document.createElement('td');
	orderid.textContent=objectarray.orderid;
	tr.appendChild(orderid);

	
	
	
	var productid=document.createElement('td');
	productid.textContent=objectarray.productid;
	tr.appendChild(productid);


	var productname=document.createElement('td');
	productname.textContent=objectarray.productname;
	tr.appendChild(productname);
	
	var productquantity=document.createElement('td');
	productquantity.textContent=objectarray.productquantity;
	tr.appendChild(productquantity);
	
	var productprice=document.createElement('td');
	productprice.textContent=objectarray.productprice;
	tr.appendChild(productprice);
	detailtable.appendChild(tr);
}