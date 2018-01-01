var http = require('http');
var url = require('url');
var fs = require('fs');

var Detailsarray;
function readAndServe(path, contentType, response) 
{
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }

    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

function createTask(text, callback) 
{
  readproducts(function(products) 
  {
    products.push(text);
    writeproducts(products, callback);
  });
}

function createHeaderArray(headerobj, callback) 
{
  readHeader(function(OrderHeader) 
  {
    OrderHeader.push(headerobj);
    writeHeader(OrderHeader, callback);
  });
}

function createDetailArray(detailobj, callback) 
{
  readDetail(function(OrderDetail) 
  {
    OrderDetail.push(detailobj);
    writeDetail(OrderDetail, callback);
  });
}

function createOdrIdDetail(odrIdForDetails, callback) 
{
  readDetail(function(OrderDetail) 
  {
   
		pushIntoDetail(OrderDetail,odrIdForDetails,function(Detailsarray)
		{
			writeSpecificDetails(Detailsarray,callback);
		});
  });
}

function pushIntoDetail(OrderDetail,odrIdForDetails,callback)
{
	Detailsarray=[];
check(Detailsarray,OrderDetail,odrIdForDetails,function(Detailsarray)
{
callback(Detailsarray);
});
}

function check(Detailsarray,OrderDetail,odrIdForDetails,callback)
{
	var i,x;
	for(i=0,x=0;i<OrderDetail.length;i++)
{
	if(OrderDetail[i].orderid==odrIdForDetails.ID)
	{
		Detailsarray[x]=OrderDetail[i];
		x++;
	}
}
if(i==OrderDetail.length)
callback(Detailsarray);
}

function writeSpecificDetails(Detailsarray,callback)
{
	
  var DetailsarrayJSON = JSON.stringify(Detailsarray);
  fs.writeFile('Detailsarray', DetailsarrayJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });

}

function CreateSessionStorage(User,response,callback) 
{
  readsessionusers(function(sessionUsers) 
  {		
			{
				sessionUsers.push(User);
				writesessionUsers(sessionUsers, callback);
			}
			
		
  });
}

function createuser(user, callback) 
{
  readUsers(function(Users) 
  {
    Users.push(user);
    writeUsers(Users, callback);
  });
}
function createAdmin(admin, callback) 
{
  readAdmins(function(Admins) 
  {
    Admins.push(admin);
    writeAdmins(Admins, callback);
  });
}
function getAdminIndex(Admins,admin)
{
	for(i=0;i<Admins.length;i++)
	{
		if(Admins[i].emailid==admin.ID)
		{
			return i;
		}
	}
}
function deleteAdmin(admin, callback) 
{
  readAdmins(function(Admins) 
  {
     var selectedIndex=getAdminIndex(Admins,admin);
	  changeStatusinAdminsArray(selectedIndex,Admins,callback)
  });
}
function changeStatusinAdminsArray(selectedIndex,Admins,callback)
{
	Admins[selectedIndex].active="0";
	writeAdmins(Admins, callback);
}


function readUsers(callback)
{
	fs.readFile('Users',function(error, contents) 
		  {
			  
			if (error) 
			{
			  throw error;
			}
			var Users;
		
			if (contents.length === 0) 
			{
			  Users = [];
			 
			} 
			else 
			{
			  Users = JSON.parse(contents);
			}
		
			callback(Users);
		  });
	
	
}
function readAdmins(callback)
{
	fs.readFile('Admins',function(error, contents) 
		  {
			  
			if (error) 
			{
			  throw error;
			}
			var Admins;
		
			if (contents.length === 0) 
			{
			  Admins = [];
			 
			} 
			else 
			{
			  Admins = JSON.parse(contents);
			}
		
			callback(Admins);
		  });
	
	
}
function readHeader(callback)
{
	fs.readFile('OrderHeader',function(error, contents) 
		  {
			  
			if (error) 
			{
			  throw error;
			}
			var OrderHeader;
		
			if (contents.length === 0) 
			{
			  OrderHeader = [];
			 
			} 
			else 
			{
			  OrderHeader = JSON.parse(contents);
			}
		
			callback(OrderHeader);
		  });
	
	
}




function createcartproduct(cart,callback) 
{
	
  readCartproducts(function(cartproducts) 
  {
	 
	 var   selectIndex=-1;
	  selectIndex=getcartProductIndex(cartproducts,cart);
	
	 if(selectIndex>=0)
	 {
		 console.log(selectIndex);
		 addquantityincart(cartproducts,cart,selectIndex);
	 }
	else{
		  cartproducts.push(cart);
	}
	changeinproductquantity(cartproducts,cart,callback);
    writeCartproducts(cartproducts, callback);
  });
}
function changeinproductquantity(cartproducts,cart,callback)
{
	readproducts(function(products) 
  {
	   selectIndex=getcartProductIndex(cartproducts,cart);
   var index=getproductIndexForview(products,cartproducts,cart);
   
   products[index].Quantity=parseInt(products[index].Quantity)-parseInt(cart.selectedquan);
   products[index].Quantity=""+products[index].Quantity;
    writeproducts(products, callback);
  });
}
function  getproductIndexForview(products,cartproducts,cart)
{
	for(var i=0;i<products.length;i++)
	{
		if(products[i].ID==cart.ID)
		{
			return i;
		}
	}
}
function addquantityincart(cartproducts,cart,selectedIndex)
{
	cartproducts[selectedIndex].selectedquan=parseInt(cartproducts[selectedIndex].selectedquan)+parseInt(cart.selectedquan);
	cartproducts[selectedIndex].selectedquan=""+cartproducts[selectedIndex].selectedquan;
}

function createTask1(objid, callback) 
{
  readproducts(function(products) 
  {
	  var selectedIndex=getProductIndex(products,objid);
	  removeFromProductsArray(selectedIndex,products,callback)
    
  });
}
function createcartProduct(objid, callback) 
{
  readCartproducts(function(cartproducts) 
  {
	  var selectedIndex=getcartProductIndex(cartproducts,objid);
	  removeFromCartArray(selectedIndex,cartproducts,callback)
    
  });
}
function Updatecartproduct(obj, callback) 
{
  readCartproducts(function(cartproducts) 
  {
	  var selectedIndex=getcartProductIndex(cartproducts,obj);
	  updateQuanInCartArray(selectedIndex,cartproducts,obj,callback)
    
  });
}
function createcartFlush(obj, callback) 
{
  readCartproducts(function(cartproducts) 
  {
	  cartproducts=[];
    writeCartproducts(cartproducts,callback)
  });
}

function createTask2(obj, callback) 
{
  readproducts(function(products) 
  {
	 
	  var selectedIndex=getProductIndex(products,obj);
	  EditInProductsArray(selectedIndex,products,obj,callback)
    
  });
}
function EditInProductsArray(selectedProductIndex,products,obj,callback)
{
				products[selectedProductIndex].Name=obj.name;
				products[selectedProductIndex].Price=obj.price;
				products[selectedProductIndex].Desc=obj.desc;
				products[selectedProductIndex].Quantity=obj.quantity;
						writeproducts(products,callback);
}
function removeFromCartArray(selectedProductIndex,cartproducts,callback)
{
	cartproducts.splice(selectedProductIndex,1);
	writeCartproducts(cartproducts,callback);
}
function updateQuanInCartArray(selectedProductIndex,cartproducts,obj,callback)
{
	cartproducts[selectedProductIndex].selectedquan=obj.quantity;
	writeCartproducts(cartproducts,callback);
}


function removeFromProductsArray(selectedProductIndex,products,callback)
{
	products.splice(selectedProductIndex,1);
	writeproducts(products,callback);
}
function getProductIndex(products,objid) 
{
    for (var i = 0; i < products.length; i++) 
	{
        if (products[i].ID == objid.ID) 
		{
			return i;
		}
    }
} 
function getcartProductIndex(cartproducts,obj) 
{
    for (var i = 0; i < cartproducts.length; i++) 
	{
		
        if (cartproducts[i].ID == obj.ID) 
		{
			return i;
		}
    }
} 


function readproducts(callback) 
{
	
		  fs.readFile('products', function(error, contents) 
		  {
			if (error) 
			{
			  throw error;
			}

			var products;
			if (contents.length === 0) 
			{
			  products = [];
			} 
			else 
			{
			  products = JSON.parse(contents);
			}
			callback(products);
		  });
	
	
}
function readDetail(callback) 
{
	
		  fs.readFile('OrderDetail', function(error, contents) 
		  {
			if (error) 
			{
			  throw error;
			}

			var OrderDetail;
			if (contents.length === 0) 
			{
			  OrderDetail = [];
			} 
			else 
			{
			  OrderDetail = JSON.parse(contents);
			}
			callback(OrderDetail);
		  });
	
	
}
function readsessionusers(callback) 
{
	
		  fs.readFile('sessionUsers', function(error, contents) 
		  {
			if (error) 
			{
			  throw error;
			}

			var sessionUsers;
			if (contents.length === 0) 
			{
			  sessionUsers = [];
			} 
			else 
			{
			  sessionUsers = JSON.parse(contents);
			}
			callback(sessionUsers);
		  });	
}
function readCartproducts(callback) 
{
	
		  fs.readFile('cartproducts',function(error, contents) 
		  {
			  
			if (error) 
			{
			  throw error;
			}
			var cartproducts;
		
			if (contents.length === 0) 
			{
			  cartproducts = [];
			 
			} 
			else 
			{
			  cartproducts = JSON.parse(contents);
			}
		
			callback(cartproducts);
		  });	
}

function readDetailsarray(callback) 
{
	
		  fs.readFile('Detailsarray',function(error, contents) 
		  {
			  
			if (error) 
			{
			  throw error;
			}
			if (contents.length === 0) 
			{
			  Detailsarray = [];
			 
			} 
			else 
			{
			  Detailsarray = JSON.parse(contents);
			}
		
			callback(Detailsarray);
		  });
	
	
}
function DeleteUserSession(sessionuser,callback)
{
	readsessionusers(function(sessionUsers)
	{
		var selectedIndex=getsessionUserIndex(sessionUsers,sessionuser);
		removeUserFormSession(selectedIndex,sessionUsers,callback);
	});
}
function removeUserFormSession(selectedIndex,sessionUsers,callback)
{
	sessionUsers.splice(selectedIndex,1);
	writesessionUsers(sessionUsers,callback);
}
function getsessionUserIndex(sessionUsers,sessionuser)
{
	for(var i=0;i<sessionUsers.length;i++)
	{
		if(sessionUsers[i].browserId==sessionuser.browserId)
		{
			return i;
		}
	}
}
function writeCartproducts(cartproducts,callback) 
{
  var cartproductsJSON = JSON.stringify(cartproducts);
  fs.writeFile('cartproducts', cartproductsJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}


function writeproducts(products, callback) 
{
  var productsJSON = JSON.stringify(products);
  fs.writeFile('products', productsJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}
function writeHeader(OrderHeader, callback) 
{
  var OrderHeaderJSON = JSON.stringify(OrderHeader);
  fs.writeFile('OrderHeader', OrderHeaderJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}
function writeDetail(OrderDetail, callback) 
{
  var OrderDetailJSON = JSON.stringify(OrderDetail);
  fs.writeFile('OrderDetail', OrderDetailJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}

function writeUsers(Users, callback) 
{
  var UsersJSON = JSON.stringify(Users);
  fs.writeFile('Users', UsersJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}
function writeAdmins(Admins, callback) 
{
  var AdminsJSON = JSON.stringify(Admins);
  fs.writeFile('Admins', AdminsJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}
function writesessionUsers(sessionUsers, callback) 
{
  var sessionUsersJSON = JSON.stringify(sessionUsers);
  fs.writeFile('sessionUsers', sessionUsersJSON, function(error) {
  if (error) 
  {
    throw error;
  }

    callback();
  });
}

/* Reads the JSON body of the request and parses it. Calls the given callback,
 * passing in the parsed object. */
function readJSONBody(request, callback) 
{
  var body = '';
  request.on('data', function(chunk) {
					 body += chunk;
			});

  request.on('end', function() {
					var data = JSON.parse(body);
					callback(data);
		   });
}

/* Serves files for the task list, and provides routes to create/delete products. */
http.createServer(function(request, response) 
{
  var pathname = url.parse(request.url).pathname;

  if (request.method === "GET") {
    if (pathname === "/") {
      readAndServe('loginpageINNODE.html', 'text/html', response);
    } 
	else if (pathname === "/loginpageScript.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if (pathname === "/viewproductScriptInNode.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if (pathname === "/userdashboardScript.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if (pathname === "/TotalScriptInNode.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if (pathname === "/TotalScriptinNode1.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	
	else if (pathname === "/dashScriptNode.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if (pathname === "/addproductScriptInNode.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if (pathname === "/placeorderScript.js")
	{
		 readAndServe('.' + pathname, 'text/javascript', response);
	}
	else if(pathname==="/dashboardInNodehtml2.html")
	{
		  readAndServe('.' + pathname, 'text/html', response);
	}
	else if(pathname==="/viewproductinNODE.html")
	{
		  readAndServe('.' + pathname, 'text/html', response);
	}
	else if(pathname==="/placeorderInNodeHtml.html")
	{
		  readAndServe('.' + pathname, 'text/html', response);
	}
	else if(pathname==="/userdahshboardhtmlNODE.html")
	{
		  readAndServe('.' + pathname, 'text/html', response);
	}
	
	else if(pathname==="/addproductinnode.html")
	{
		  readAndServe('.' + pathname, 'text/html', response);
	}
	else if(pathname==="/totalinNode.html")
	{
		  readAndServe('.' + pathname, 'text/html', response);
	}
	else if (pathname === "/myrealstyle.css") 
		{
      readAndServe('.' + pathname, 'text/css', response);
    }
	else if (pathname === "/dashboardstyle.css") 
		{
      readAndServe('.' + pathname, 'text/css', response);
    }
	else if (pathname === "/stylecss.css") 
		{
      readAndServe('.' + pathname, 'text/css', response);
    } 
	else if (pathname === "/loginstyle.css") 
		{
      readAndServe('.' + pathname, 'text/css', response);
    }else if (pathname === "addproductScriptInNode.js")
	{     
      readAndServe('.' + pathname, 'text/javascript', response);
    }  else if (pathname === "/products") {
      readproducts(function(products) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(products));
        response.end();
      });
    } 
	else if (pathname === "/Users") {
		
      readUsers(function(Users) {
        response.writeHead(200, {'Content-type': 'application/json'});
		console.log(Users);
        response.write(JSON.stringify(Users));
        response.end();
      });
    } 
	else if (pathname === "/getSessionStorage") {
		
      readsessionusers(function(sessionUsers) {
        response.writeHead(200, {'Content-type': 'application/json'});
		console.log(sessionUsers);
        response.write(JSON.stringify(sessionUsers));
        response.end();
      });
    } 
	else if (pathname === "/Admins") {
		
      readAdmins(function(Admins) {
        response.writeHead(200, {'Content-type': 'application/json'});
		console.log(Admins);
        response.write(JSON.stringify(Admins));
        response.end();
      });
    } 
	else if (pathname === "/OrderHeader") {
		
      readHeader(function(OrderHeader) {
        response.writeHead(200, {'Content-type': 'application/json'});
		console.log(OrderHeader);
        response.write(JSON.stringify(OrderHeader));
        response.end();
      });
    } 
	else if (pathname === "/OrderDetail") {
		
      readDetail(function(OrderDetail) {
        response.writeHead(200, {'Content-type': 'application/json'});
		console.log(OrderDetail);
        response.write(JSON.stringify(OrderDetail));
        response.end();
      });
    } 
	 else if (pathname === "/cartproducts") {
      readCartproducts(function(cartproducts) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(cartproducts));
        response.end();
      });
    }
	 else if (pathname === "/getOrderIdDetails") {
      readDetailsarray(function(Detailsarray) {
		  console.log(Detailsarray);
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(Detailsarray));
		Detailsarray=[];
        response.end();
      });
    }
	else {
      response.end();
    }
  } else if (request.method === "POST") {
	 
    if (pathname === "/products") {
      readJSONBody(request, function(task) {
        createTask(task, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/postheaderobj") {
		
      readJSONBody(request, function(headerobj) {
	  createHeaderArray(headerobj, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/delSession") {
		
      readJSONBody(request, function(sessionuser) {
	 DeleteUserSession(sessionuser, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/findOrderidDetails") {
		
      readJSONBody(request, function(odrIdForDetails) {
		  console.log(odrIdForDetails);
	  createOdrIdDetail(odrIdForDetails, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/updatequantity") {
		
      readJSONBody(request, function(cart) {
	  Updatecartproduct(cart, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/postdetailobj") {
		
      readJSONBody(request, function(detailobj) {
	  createDetailArray(detailobj, function() {
          
          response.end();
		  
        });
      });
    }
	
	else  if (pathname === "/cartproducts") {
		
      readJSONBody(request, function(cart) {
	  createcartproduct(cart, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/adduser") {
		
      readJSONBody(request, function(user) {
	  createuser(user, function() {
          
          response.end();
		  
        });
      });
    }
	else  if (pathname === "/addAdmin") {
		
      readJSONBody(request, function(admin) {
	  createAdmin(admin, function() {
          
          response.end();
		  
        });
      });
    }
	else if(pathname==="/delete")
	{
		readJSONBody(request, function(objid) {
        createTask1(objid, function() {
          
          response.end();
		  
        });
      });
	}
	else if(pathname==="/deleteAdmin")
	{
		readJSONBody(request, function(admin) {
        deleteAdmin(admin, function() {
          
          response.end();
		  
        });
      });
	}
	else if(pathname=="/storesession")
	{
		console.log("received");
		readJSONBody(request,function(User)
		{
			CreateSessionStorage(User,response,function()
			{
				response.end();
			});
			
		});
	}
	else if(pathname==="/cartdelete")
	{
		readJSONBody(request, function(objid) {
        createcartProduct(objid, function() {
          
          response.end();
		  
        });
      });
	}
	else if(pathname==="/flushusercart")
	{
		readJSONBody(request, function(obj) {
        createcartFlush(obj, function() {
          
          response.end();
		  
        });
      });
	}
	
	else if(pathname=="/edit")
	{
		readJSONBody(request, function(obj) {
        createTask2(obj, function() {
          
          response.end();
		});
		});
	}
	else {
      response.end();
    }
  } else {
    response.end();
  }
}).listen(12000,'127.0.0.1');

console.log('Running on 127.0.0.1:12000');
