const divUsers = document.querySelector('.trainingResult');

const get =(id=null)=>{

  let  url=`https://jsonplaceholder.typicode.com/users/`;
  if(id){
    url=`https://jsonplaceholder.typicode.com/users/${id}`;
  }
    
    return new Promise((resolve , reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
           if(this.readyState ===4){
              if(this.status === 200){
                  
                let users= JSON.parse(this.responseText);
                if(id){
                    console.log(id);
                    users = [users].filter(user =>{
                        return user.id === Number(id);
                    })
                }
                
                resolve(users);      
              }
              else{
                  reject( new Error(`<h1>Sorry</h1> <br />  ${this.status} - The User cannot be found`));  //this.responseText);   
              }
           }        
    }
    xhr.open('GET',url ,true);
    xhr.send();
  });
}


function print(users){
console.log(users);
    
//var tablearea = document.getElementById('tablearea'),
    //table = document.createElement('table');
     let result = "";
users.forEach(user => {
    
    result += `<div class="card">
                <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" style="width:100%">
                <div class="container">
                <h4><strong>${user.name}</strong></h4> 
                <p>${user.email}</p> 
                </div>
               </div>`;
     
    // var tr = document.createElement('tr');

    // tr.appendChild( document.createElement('td') );
    // tr.appendChild( document.createElement('td') );

    // tr.cells[0].appendChild( document.createTextNode(user.name) )
    // tr.cells[1].appendChild( document.createTextNode(user.email) );

    // table.appendChild(tr);
});

divUsers.innerHTML= result;    //.appendChild(table);

}
const getUsers = (id)=>{
    get(id)
    .then(users =>{
        
        if(users.length ===1){
             
            divUsers.classList.remove('trainingResult'); 
            divUsers.classList.add('trainingSearchResult');
         }
         else{
            divUsers.classList.add('trainingResult'); 
            divUsers.classList.remove('trainingSearchResult');
         }
        print(users);
    })
    .catch(err =>{
         //dry
         //const divUsers = document.querySelector('.trainingResult')
         divUsers.innerHTML=`<strong style="color:red"> ${err.message}</strong>`;
    }
         );
}



// const search = document.querySelector('.search');
// const test = document.querySelector('.test');
// search.addEventListener('keyup', (e)=>{
//     console.log(e.target.value);
//     document.querySelector('h1').innerHTML=(!e.target.value.trim())?'All Users':'User with Id: '+ e.target.value;
//     let val = e.target.value;
//     getUsers(val);
// })


//add users To DropDownList
//function must be precede with async
const fillddList=async ()=>{
    /*
    get is returning promise to use async/await instaed of then/catch
    asycn await code   is concise and look like synchronous
    */
   const ddList =document.querySelector('.ddusers');

   const users = await  get();
   users.forEach(user=>{
       console.log(user);
    var option = document.createElement("option");   
    option.value=user.id;
    option.text=user.name;
    ddList.add(option);
   });
}

window.onload=function(){
    
   fillddList();
    getUsers();
}

const ddusers = document.querySelector('.ddusers');
ddusers.addEventListener('change',(e)=>{
 //alert(e.target.value);
 const userId = e.target.value;
 if(userId){
    getUsers(userId);
 }
 else
 getUsers();
})