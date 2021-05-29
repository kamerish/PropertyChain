var express=require('express');
var app=express();

var server = app.listen(3000,function() {});

const utils = require('./app.js');

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
app.get('/create',function(req,res){
    
    async function ll(){
        console.log("Initation creating Request");
        result = await contract.submitTransaction('createLandRecord',num,'kamerish');
        res.send(result+"\n created");
        
    }
    ll();  
    
})

app.get('/read',function(req,res){
    
    async function ll(){
        console.log("Initation Reading Request");
        result = await contract.submitTransaction('readLandRecord',num);
        res.send(result+"\n read");
        
    }
    ll();    
})

app.get('/update',function(req,res){
    
    async function ll(){
        console.log("Initation updating Request");
        result = await contract.submitTransaction('updateLandRecord',num,"Subiksha");
        res.send(result+"\n Updated");
        
    }
    ll();    
})
app.get('/delete',function(req,res){
    
    async function ll(){
        console.log("Initation deleting Request");
        result = await contract.submitTransaction('deleteLandRecord',num);
        res.send(result+"\n Deleted");
        
    }
    ll();    
})



