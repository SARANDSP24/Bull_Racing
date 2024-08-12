let rowCount = 0; // Initialize row count

function addRow() {
    rowCount++;

    const table = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    newRow.id = `row${rowCount}`;

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);
    const cell3 = newRow.insertCell(2);
    const cell4 = newRow.insertCell(3);
    const cell5 = newRow.insertCell(4);
    const cell6 = newRow.insertCell(5);

    cell1.innerHTML = `<input type="text" id="cowName_${rowCount}" class="cow-name" placeholder="Cow Name">`;
    cell2.innerHTML = `<input type="text" id="registrationNumber_${rowCount}" class="registration-number" placeholder="Registration Number">`;
    cell3.innerHTML = `<input type="text" id="firstRun_${rowCount}" class="first-run">`;
    cell4.innerHTML = `<input type="text" id="secondRun_${rowCount}" class="second-run">`;
    cell5.innerHTML = `<span id="totalRunning_${rowCount}" class="total-running">0.00</span>`;
    cell6.innerHTML = `<span id="averageRunning_${rowCount}" class="average-running">0.00</span>`;
}

let stopwatchInterval;
let startTime = 0;
let elapsedTime = 0;
let running = false;

function startStopwatch() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateStopwatch, 10); // Update every 10 milliseconds
        running = true;
    }
}

function stopStopwatch() {
    if (running) {
        clearInterval(stopwatchInterval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    updateStopwatchDisplay();
    running = false;
}

function updateStopwatch() {
    elapsedTime = Date.now() - startTime;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const milliseconds = elapsedTime % 1000;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
    document.getElementById("stopwatch").textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
}

function calculateRunning() {
    let totalRunning = 0;
    let rowCount = 0;

    const rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        const firstTime = parseFloat(row.querySelector(".first-run").value) || 0;
        const secondTime = parseFloat(row.querySelector(".second-run").value) || 0;

        const totalTime = firstTime + secondTime;
        const averageTime = totalTime / 2;

        row.querySelector(".total-running").textContent = totalTime.toFixed(2);
        row.querySelector(".average-running").textContent = averageTime.toFixed(2);

        totalRunning += totalTime;
        rowCount++;
    });

    document.getElementById("totalTime").textContent = totalRunning.toFixed(2);
    document.getElementById("averageTime").textContent = (totalRunning / rowCount).toFixed(2);
}

let columnCount = 0; // Initialize column count

function addColumn() {
    columnCount++; // Increment column count

    const table = document.getElementById("dataTable");
    const headerRow = table.rows[0];
    
    // Add header cell
    const headerCell = document.createElement("th");
    headerCell.textContent = `Column ${columnCount}`;
    headerRow.appendChild(headerCell);

    // Add cells to each row
    const rows = table.rows;
    for (let i = 0; i < rows.length; i++) {
        const newRowCell = rows[i].insertCell();
        newRowCell.innerHTML = `<input type="text" id="data_${i}_${columnCount}" class="data" placeholder="Data">`;
    }
}
