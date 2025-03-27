document.addEventListener("DOMContentLoaded", () => {
    const savedMonth = localStorage.getItem("selectedMonth");
    if (savedMonth) {
        document.getElementById("monthPicker").value = savedMonth;
    }
    generateCalendar();
});

function saveSelectedMonth() {
    const monthPicker = document.getElementById("monthPicker").value;
    localStorage.setItem("selectedMonth", monthPicker);
}

function generateCalendar() {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = "";
    const monthPicker = document.getElementById("monthPicker").value;
    if (!monthPicker) return;
    
    const [year, month] = monthPicker.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += '<div class="day"></div>';
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month}-${day}`;
        const savedTasks = JSON.parse(localStorage.getItem(dateKey)) || ["", "", ""];
        
        let taskInputs = savedTasks.map((task, index) => 
            `<input type="text" value="${task}" oninput="saveTask('${dateKey}', ${index}, this.value)" onkeydown="handleKey(event, '${dateKey}', ${index})">`
        ).join("");
        
        calendar.innerHTML += `
            <div class="day">
                <strong>${day}</strong>
                <div class="tasks" id="tasks-${dateKey}">${taskInputs}</div>
            </div>`;
    }
}

function saveTask(dateKey, index, value) {
    let tasks = JSON.parse(localStorage.getItem(dateKey)) || ["", "", ""];
    tasks[index] = value;
    localStorage.setItem(dateKey, JSON.stringify(tasks));
}

function handleKey(event, dateKey, index) {
    if (event.key === "Enter") {
        event.preventDefault();
        let tasksContainer = document.getElementById(`tasks-${dateKey}`);
        let newIndex = tasksContainer.children.length;
        
        let newInput = document.createElement("input");
        newInput.type = "text";
        newInput.oninput = () => saveTask(dateKey, newIndex, newInput.value);
        newInput.onkeydown = (e) => handleKey(e, dateKey, newIndex);
        
        tasksContainer.appendChild(newInput);
        saveTask(dateKey, newIndex, "");
        newInput.focus();
    } else if (event.key === "Backspace" && event.target.value === "") {
        let tasksContainer = document.getElementById(`tasks-${dateKey}`);
        if (tasksContainer.children.length > 1) {
            tasksContainer.removeChild(event.target);
            let tasks = JSON.parse(localStorage.getItem(dateKey)) || [];
            tasks.splice(index, 1);
            localStorage.setItem(dateKey, JSON.stringify(tasks));
        }
    }
}