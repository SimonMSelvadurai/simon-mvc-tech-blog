async function loginFormHandler(event) {
  event.preventDefault();
  
  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();
  var response ;
  if (username && password) {
    console.log("username   : ",username,"password   :",password);
  
        response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
            username, 
            password
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    
 
if (response.status == 400) { 
    //const msg =  document.querySelector('#errormsg');
    console.log("-------------  msg with result 1111-----------> " );

    //console.log("-------------  msg with result -----------> " ,msg);
     return;
}
      if (response.ok) {
          document.location.replace('/dashboard');
      } else {
        const { message } = await response.json();
        console.log("------------- test message -----------> " ,message);
        //   alert(response.statusText);
        const msg =  document.querySelector('#errormsg');
        console.log("-------------  msg -----------> " ,msg);
         msg.innerText=message;
         console.log("-------------  msg with result -----------> " ,msg,message);
         // document.querySelector("#errormsg").innerText = message;

    }
  }

}  



document.querySelector('.login-form').addEventListener('submit', loginFormHandler);