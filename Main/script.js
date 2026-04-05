    
// script.js

        
        const form = document.getElementById('loanForm');
        const resultsDiv = document.getElementById('results');
        const principalInput = document.getElementById('principal');
        const rateInput = document.getElementById('rate');
        const yearsInput = document.getElementById('years');
        
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous errors
            document.querySelectorAll('.error').forEach(err => err.classList.remove('show'));
            
            // Get input values
            const principal = parseFloat(principalInput.value);
            const annualRate = parseFloat(rateInput.value);
            const years = parseFloat(yearsInput.value);
            
            // Validate inputs
            let isValid = true;
            if (principal <= 0) {
                document.getElementById('principalError').classList.add('show');
                isValid = false;
            }
            if (annualRate < 0) {
                document.getElementById('rateError').classList.add('show');
                isValid = false;
            }
            if (years <= 0) {
                document.getElementById('yearsError').classList.add('show');
                isValid = false;
            }
            
            if (!isValid) return;
            
            // Calculate loan payments
            const monthlyRate = annualRate / 100 / 12;
            const numberOfPayments = years * 12;
            
            let monthlyPayment;
            if (monthlyRate === 0) {
                monthlyPayment = principal / numberOfPayments;
            } else {
                monthlyPayment = principal * 
                    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
            }
            
            const totalPaid = monthlyPayment * numberOfPayments;
            const totalInterest = totalPaid - principal;
            
            // Display results
            document.getElementById('monthlyPayment').textContent = '$' + monthlyPayment.toFixed(2);
            document.getElementById('totalPaid').textContent = '$' + totalPaid.toFixed(2);
            document.getElementById('totalInterest').textContent = '$' + totalInterest.toFixed(2);
            
            resultsDiv.classList.add('show');
        });