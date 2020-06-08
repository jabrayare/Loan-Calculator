//Listen for submit.
let container = document.querySelector('.error-container');
let calculate = document.querySelector('.loan-group');
calculate.addEventListener('submit',function(e){
  document.querySelector('#loader').style.display = 'block';
  setTimeout(calculateResult,2000);
  e.preventDefault();
});

// Calculate results.
function calculateResult(){
  
  //UI variables.
  const amount = document.getElementById('amount');
  const interest = document.getElementById('interest');
  const years = document.getElementById('years');

  const monthly_payment = document.getElementById('monthly-payment');
  const total_payment = document.getElementById('total-payment');
  const total_interest = document.getElementById('total-interest');
  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value)/100/12;
  const calculatedPayment = parseFloat(years.value)*12;

  // compute monthly Payment.

  const x = Math.pow((1+calculatedInterest), calculatedPayment);
  const monthly = (principal*x*calculatedInterest)/(x-1);
  const load = document.querySelector('#loader');
  if(amount.value != '' && interest.value != '' && years.value != ''){
    monthly_payment.value = monthly.toFixed(2);
    total_payment.value = (monthly *calculatedPayment).toFixed(2);
    total_interest.value = ((monthly * calculatedPayment) -  principal).toFixed(2);

    document.querySelector('#loader').style.display = 'none';
    // Showing up the result after it loads.
    document.querySelector('.card-result').style.display = 'block';

  }
  else{
    const errorMsg = 'Please fill out all the fields!!!';
      showError(errorMsg);
  }
}

function showError(errorMsg){
  // hiding both the loader and the results container.
  document.querySelector('#loader').style.display = 'none';
  document.querySelector('.card-result').style.display = 'none';

  // Creating a div element.
  const error = document.createElement('div');
  error.className = 'error input-result';
  error.appendChild(document.createTextNode(errorMsg));
  error.style.color = 'red'
  container.append(error);
  // Clear error after 3 seconds.

  setTimeout(clearError,3000);
}
// clear Error message.

function clearError(){
  document.querySelector('.error').remove();
}
