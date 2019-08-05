
//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('results').style.display = 'none';
    //show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    
    e.preventDefault();
});


//calculating results
function calculateResults() {

  //UI variables

    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) / 12;

    //calculate the monthly payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);

    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){

        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);
        //show result
        document.getElementById('results').style.display = 'block';
        //hide loader
        document.getElementById('loading').style.display = 'none';
    }else {
        showError('Please check your numbers');
    }
    
}

//show error functions
function showError(error) {


       //show result
       document.getElementById('results').style.display = 'none';
       //hide loader
       document.getElementById('loading').style.display = 'none';
    //create a div

    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add class
    errorDiv.className = 'alert alert-danger';

    //create a textnode and append

    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}