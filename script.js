let history = JSON.parse(localStorage.getItem('history')) || [];

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    const expression = display.value;

    try {
        const result = eval(expression); // Evaluates the expression
        display.value = result;

        // Add the full expression (e.g., "5 + 3 = 8") to history
        const calculation = `${expression} = ${result}`;
        history.push(calculation);
        localStorage.setItem('history', JSON.stringify(history));

        updateHistory();
    } catch (error) {
        display.value = 'Error';
    }
}

function clearHistory() {
    history = [];
    localStorage.removeItem('history');
    updateHistory();
}

function updateHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    if (history.length === 0) {
        historyList.innerHTML = '<li>Vēsture ir tukša.</li>';
    } else {
        history.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${entry} <button onclick="deleteHistoryEntry(${index})">Dzēst</button>`;
            historyList.appendChild(li);
        });
    }
}

function deleteHistoryEntry(index) {
    history.splice(index, 1);
    localStorage.setItem('history', JSON.stringify(history));
    updateHistory();
}

// Update history when the page loads
document.addEventListener('DOMContentLoaded', updateHistory);
