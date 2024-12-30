

const ex =require('express');
const app= ex();
const port =5000;
const path= require('path');
const  fs=require('fs');
const data=require ('./dummydata.json')
// middleware to get data from thunderclient (body) app.use(ex.json())
app.use(ex.json());

app.get('/',(req,res)=>{
   res.send('hello')
})
 
// To read/see the data of dummydata.json

app.get('/getdata',(req,res)=>{
   res.send(data);

})

// Creating new data in thunderclient under post method

app.post('/create',(req,res)=>{
   
   const body=req.body;

   data.push({...body, id:data.length+1})

   console.log(data)
   fs.writeFile('./dummydata.json',JSON.stringify(data),(err,d)=>{
      res.send('post req')
   })
})

// dynamic Routing http://localhost:5000/users/2

app.get('/users/:id',(req,res)=>{
   const id=Number(req.params.id);
   const user=data.find((user)=>user.id ===id)
   res.json(user)
})

// patch/put- to update data 

app.patch('/update/:id',(req,res)=>{
   const identitynumber=Number(req.params.id);
   const u=data.find((u)=>u.id===identitynumber);
   u.first_name='Sandyamala Aadil(edited)';
   fs.writeFile('./dummydata.json',JSON.stringify(data),(err,data)=>{
      res.send('updated data')
   })
   
})

app.delete('/delete/:id',(req,res)=>{
   const identitynumber=Number(req.params.id);
   // const u =data.find((u)=>u.id === identitynumber);

   const var1=delete data[identitynumber-1];
   
   if(var1===true){
      fs.writeFile('./dummydata.json',JSON.stringify(data),(err,data)=>{
            res.json({status:"successfully deleted",data:data})
         
      })
   }
 else{
   res.send('error in deleting that object')
 }

})

 app.listen(port ,(req,res)=>{
    console.log('server started at 5000')
 })