document.getElementById('button1').addEventListener('click', loadCustomer);

document.getElementById('button2').addEventListener('click', loadCustomers);

function loadCustomers(e){
    //create xhr request

    const xhr = new XMLHttpRequest();

    xhr.open('GET','customers.json', true);

    xhr.onload =  function(){
        if(this.status === 200){
           // console.log(this.responseText);
           const customers = JSON.parse(this.responseText);
           let output = '';

           customers.forEach(function(customer){
             output += `
            <ul>
                 <li>ID : ${customer.id}</li>
                 <li>Name: ${customer.name}</li>
                 <li>company: ${customer.company}</li>
                 <li>phone: ${customer.phone}</li>
            </u>
            `;
           });
          
           document.getElementById('customers').innerHTML = output;
        }
    }

    xhr.send();
}

function loadCustomer(e){
    //create xhr request

    const xhr = new XMLHttpRequest();

    xhr.open('GET','customer.json', true);

    xhr.onload =  function(){
        if(this.status === 200){
           // console.log(this.responseText);
           const customer = JSON.parse(this.responseText);

           const output = `
           <ul>
                <li>ID : ${customer.id}</li>
                <li>Name: ${customer.name}</li>
                <li>company: ${customer.company}</li>
                <li>phone: ${customer.phone}</li>
           </u>
           `;
           document.getElementById('customer').innerHTML = output;
        }
    }

    xhr.send();
}

