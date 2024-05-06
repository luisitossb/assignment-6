
const root = document.getElementById('root');

const textarea = document.createElement('textarea');
const button = document.createElement('button');
const visualTable = document.createElement('table');


button.textContent = 'Submit';


root.appendChild(textarea);
root.appendChild(button);
root.appendChild(visualTable);


function analyzeText(text) {
    const words = text.trim().toLowerCase().split(/\s+/);
    const frequency = {};

    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    console.log(frequency);


    const sortedWords = Object.keys(frequency)
        .sort((a, b) => {
            const freqDiff = frequency[b] - frequency[a];
            if (freqDiff !== 0) {
                return freqDiff;
            }
            return b.localeCompare(a);
        })
        .slice(0, 5);

    return sortedWords.map(word => [word, frequency[word]]);
}

function createTable(data) {
    visualTable.innerHTML = '';

    const headers = ['Word', 'Frequency'];
    const headerRow = document.createElement('tr');

    headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        headerRow.appendChild(header);
    });

    visualTable.appendChild(headerRow);

    data.forEach(([word, frequency]) => {
        const row = document.createElement('tr');
        const wordCell = document.createElement('td');
        const freqCell = document.createElement('td');

        wordCell.textContent = word;
        freqCell.textContent = frequency;

        row.appendChild(wordCell);
        row.appendChild(freqCell);
        visualTable.appendChild(row);
    });
}

button.addEventListener('click', () => {
    const text = textarea.value;
    const result = analyzeText(text);
    createTable(result);
});
