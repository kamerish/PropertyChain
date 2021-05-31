const utils = require('./app.js');

var express=require('express');
var app=express();
var cors = require('cors');


app.use(cors());
var server = app.listen(3000,function() {});


var contract;

utils.start().then((gateway_contract) => {

    console.log('Connected to Network.');
    contract = gateway_contract;

    //  Setup events and monitor for events from HLFabric
    

})


app.get('/',function(req,res)
{
    res.send('Hello World!');
});




var num = '558'; 


app.get('/create', function(request, response) {
    
    console.log(request.query);
    let recordname = request.query.name;
    let recordNumber = request.query.id;
    async function ll(){
                console.log("Initation Reading Request");
                try{
                    result = await contract.submitTransaction('createLandRecord',recordNumber,recordname);
                    result = {"value":"The Land Record "+ recordNumber+" Has Been Succesfuly Created"};
                }catch(err){
                    result = {"value":"The Land Record "+ recordNumber+" aldready Exists"};
                }finally{
                    response.send(result);
                }
            }
            ll(); 
    
  })




app.get('/read', function(request, response) {
    
    console.log(request.query);
    let recordNumber = request.query.id;
    async function ll(){
                console.log("Initation Reading Request");
                try{
                    result = await contract.submitTransaction('readLandRecord',recordNumber);
                    result = result+"";
                }catch(err){
                    result = {"value":"The Land Record "+ recordNumber+" does not Exists"};
                }finally{
                    response.send(result);
                }
            }
            ll(); 
    
  })

  app.get('/update', function(request, response) {
    
    console.log(request.query);
    let recordname = request.query.name;
    let recordNumber = request.query.id;
    async function ll(){
                console.log("Initation Updation Request");
                try{
                    result = await contract.submitTransaction('updateLandRecord',recordNumber,recordname);
                    result = {"value":"The Land Record "+ recordNumber+" Has Been Transferred to "+ recordname};
                }catch(err){
                    result = {"value":"The Land Record "+ recordNumber+" does not Exists"};
                }finally{
                    response.send(result);
                }
            }
            ll(); 
    
  })





app.get('/delete', function(request, response) {
    
    console.log(request.query);
    let recordNumber = request.query.id;
    async function ll(){
                console.log("Initation Deleting Request");
                try{
                    result = await contract.submitTransaction('deleteLandRecord',recordNumber);
                    result = {"value":"The Land Record "+ recordNumber+" Has Been Deleted"};
                }catch(err){
                    result = {"value":"The Land Record "+ recordNumber+" does not Exists"};
                }finally{
                    response.send(result);
                }
            }
            ll(); 
    
  })


  app.get('/history', function(request, response) {
    
    console.log(request.query);
    let recordNumber = request.query.id;
    async function ll(){
                console.log("Initation History Request");
                try{
                    result = await contract.submitTransaction('getHistoryOfLand',recordNumber);
                    result = result+"";
                }catch(err){
                    result = {"value":"The Land Record "+ recordNumber+" does not Exists"};
                }finally{
                    response.send(result);
                }
            }
            ll(); 
    
  })

