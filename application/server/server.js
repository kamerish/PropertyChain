var express=require('express');
var app=express();

var server=app.listen(3000,function() {});




app.get('/',function(req,res)
{
    res.send('Hello World!');
});

app.get('/init',function(req,res){
    let result;
    
    res.send(result);
})




