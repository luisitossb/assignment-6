
// Create elements using DOM API
const root = document.getElementById('root');
const textarea = document.createElement('textarea');
const button = document.createElement('button');
const resultTable = document.createElement('table');

button.textContent = 'Submit';

// Add created elements to root div
root.appendChild(textarea);
root.appendChild(button);
root.appendChild(resultTable);

// Function to analyze text and create frequency table
function analyzeText(text) {
    const words = text.trim().toLowerCase().split(/\s+/);
    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    console.log(frequency);

    // Sort by frequency (desc) and then lexicographically
    const sortedWords = Object.keys(frequency)
        .sort((a, b) => frequency[b] - frequency[a] || a.localeCompare(b))
        .slice(0, 5);

    return sortedWords.map(word => [word, frequency[word]]);
}

// Function to render table
function renderTable(data) {
    resultTable.innerHTML = '';

    const headers = ['Word', 'Frequency'];
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    resultTable.appendChild(headerRow);

    data.forEach(([word, frequency]) => {
        const row = document.createElement('tr');
        const wordCell = document.createElement('td');
        const freqCell = document.createElement('td');

        wordCell.textContent = word;
        freqCell.textContent = frequency;

        row.appendChild(wordCell);
        row.appendChild(freqCell);
        resultTable.appendChild(row);
    });
}

// Add event listener to button
button.addEventListener('click', () => {
    const text = textarea.value;
    const result = analyzeText(text);
    renderTable(result);
});
