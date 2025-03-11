document.addEventListener('DOMContentLoaded', function() {
    const addExpenseForm = document.getElementById('add-expense-form');
    const expenseList = document.getElementById('expense-list-ul');
    const totalExpenseDisplay = document.getElementById('total-expense');
    const remainingBudgetDisplay = document.getElementById('remaining-budget');
    const setBudgetBtn = document.getElementById('set-budget-btn');
    const budgetInput = document.getElementById('budget-input');
    const saveBudgetBtn = document.getElementById('save-budget-btn');

    let expenses = [];
    let budget = 0;

    // Function to add an expense
    function addExpense(date, amount, category, description) {
        const expenseItem = document.createElement('li');
        expenseItem.classList.add('expense-item');
        expenseItem.innerHTML = `
            <span>Date: ${date}, Amount: $${amount}, Category: ${category}, Description: ${description}</span>
            <button class="delete-btn">Delete</button>
        `;

        expenseList.appendChild(expenseItem);

        // Add event listener for delete button
        expenseItem.querySelector('.delete-btn').addEventListener('click', function() {
            expenseItem.remove();
            updateExpenses();
        });
    }

    // Function to update expenses
    function updateExpenses() {
        expenses = Array.from(expenseList.children).map(expense => {
            const text = expense.querySelector('span').textContent;
            const parts = text.split(', ');
            return {
                date: parts[0].split(': ')[1],
                amount: parseFloat(parts[1].split(': $')[1]),
                category: parts[2].split(': ')[1],
                description: parts[3].split(': ')[1]
            };
        });

        const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalExpenseDisplay.textContent = `Total Expense: $${totalExpense.toFixed(2)}`;

        if (budget > 0) {
            const remainingBudget = budget - totalExpense;
            remainingBudgetDisplay.textContent = `Remaining Budget: $${remainingBudget.toFixed(2)}`;
        }
    }

    // Handle form submission
    addExpenseForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const date = document.getElementById('date').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value;
        const description = document.getElementById('description').value;

        addExpense(date, amount, category, description);
        updateExpenses();

        // Reset form fields
        document.getElementById('date').value = '';
        document.getElementById('amount').value = '';
        document.getElementById('category').value = '';
        document.getElementById('description').value = '';
    });

    // Set budget functionality
    setBudgetBtn.addEventListener('click', function() {
        budgetInput.style.display = 'block';
        saveBudgetBtn.style.display = 'block';
        setBudgetBtn.style.display = 'none';
    });

    saveBudgetBtn.addEventListener('click', function() {
        budget = parseFloat(budgetInput.value);
        budgetInput.style.display = 'none';
        saveBudgetBtn.style.display = 'none';
        setBudgetBtn.style.display = 'block';
        updateExpenses();
    });
});
