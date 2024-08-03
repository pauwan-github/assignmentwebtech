document.addEventListener('DOMContentLoaded', () => {
    fetchExpenses();
  });
  
  function fetchExpenses() {
    fetch('/api/expenses') // Adjust the API endpoint as needed
      .then(response => response.json())
      .then(data => {
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = data.map(expense => `
          <li>${expense.description}: $${expense.amount}</li>
        `).join('');
      })
      .catch(error => console.error('Error fetching expenses:', error));
  }
  