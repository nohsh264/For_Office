let editIndex = null;
    
function saveEntry() {
    const title = document.querySelector('.title').value;
    const content = document.querySelector('.content').value;
    const date = document.querySelector('.date').value;
    const saveButton = document.querySelector('.save-btn');
    const cancelButton = document.querySelector('.cancel-btn');

    if (!title || !content || !date) {
        return alert('제목, 날짜, 내용을 입력하세요.');
    }

    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    const entry = { id: new Date().getTime(), title, content, date };

    if (editIndex !== null) {
        entries[editIndex] = entry;
        editIndex = null;
        saveButton.textContent = '저장하기'; // 버튼 텍스트 원래대로
        cancelButton.style.display = 'none'; // 취소 버튼 숨김
    } else {
        entries.push(entry);
    }

    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    displayEntries();
    clearForm();
}


function deleteEntry(id) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries = entries.filter(entry => entry.id !== id);  // 고유 ID를 기준으로 삭제
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
    displayEntries();
}

function editEntry(id) {
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    let entry = entries.find(entry => entry.id === id);

    if (entry) {
        document.querySelector('.title').value = entry.title;
        document.querySelector('.content').value = entry.content;
        document.querySelector('.date').value = entry.date;
        editIndex = entries.indexOf(entry);

        const saveButton = document.querySelector('.save-btn');
        const cancelButton = document.querySelector('.cancel-btn');
        saveButton.textContent = '수정 완료'; // 버튼 텍스트 변경
        cancelButton.style.display = 'inline-block'; // 취소 버튼 표시
    }
}

function cancelEdit() {
    clearForm();
    editIndex = null;
    document.querySelector('.save-btn').textContent = '저장하기';
    document.querySelector('.cancel-btn').style.display = 'none';   
}

function displayEntries() {
    const entriesDiv = document.querySelector('.entries');
    entriesDiv.innerHTML = '';
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    // 날짜 순으로 정렬 (최신 날짜가 앞에 오도록)
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    entries.forEach((entry) => {
        const div = document.createElement('div');
        div.classList.add('entry');
        div.setAttribute('data-id', entry.id);  // 각 항목에 고유 ID 저장
        div.innerHTML = `<h3>${entry.title}</h3><p>${entry.content}</p><small>${entry.date}</small>
                        <div class="buttons">
                            <button class="edit-btn" onclick="editEntry(${entry.id})">수정</button>
                            <button class="delete-btn" onclick="deleteEntry(${entry.id})">삭제</button>
                        </div>`;
        entriesDiv.appendChild(div);
    });
}

function clearForm() {
    document.querySelector('.title').value = '';
    document.querySelector('.content').value = '';
    document.querySelector('.date').value = '';
}


function displayEntries() {
    const entriesDiv = document.querySelector('.entries');
    entriesDiv.innerHTML = '';
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];

    // 날짜순 정렬 (최신 날짜가 앞에 오도록)
    entries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // 최근 5개만 먼저 표시
    let recentEntries = entries.slice(0, 5);
    let olderEntries = entries.slice(5);

    let groupedByMonth = {};

    olderEntries.forEach((entry) => {
        let monthKey = entry.date.substring(0, 7); // YYYY-MM 형식 (예: "2025-03")
        if (!groupedByMonth[monthKey]) {
            groupedByMonth[monthKey] = [];
        }
        groupedByMonth[monthKey].push(entry);
    });

    // 최근 5개 일기 표시
    recentEntries.forEach((entry) => {
        entriesDiv.appendChild(createEntryElement(entry));
    });

    // 과거 일기들을 월별로 묶어서 추가
    Object.keys(groupedByMonth).forEach((month) => {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month-group');
        monthDiv.innerHTML = `<h3>${month}월</h3>`;

        const toggleButton = document.createElement('button');
        toggleButton.classList.add('month-toggle-btn');
        toggleButton.textContent = '펼치기';
        toggleButton.onclick = () => toggleMonthEntries(toggleButton, monthDiv);

        monthDiv.appendChild(toggleButton);

        // 월별 일기들을 감출 컨테이너
        const monthEntriesDiv = document.createElement('div');
        monthEntriesDiv.classList.add('month-entries');
        monthEntriesDiv.style.display = 'none';

        groupedByMonth[month].forEach((entry) => {
            monthEntriesDiv.appendChild(createEntryElement(entry));
        });

        monthDiv.appendChild(monthEntriesDiv);
        entriesDiv.appendChild(monthDiv);
    });
}

// 더보기/접기 기능
function toggleExpand(button) {
    const entryDiv = button.parentElement;
    entryDiv.classList.toggle('expanded');

    if (entryDiv.classList.contains('expanded')) {
        button.textContent = '접기';
    } else {
        button.textContent = '더보기';
    }
}

function createEntryElement(entry) {
    const div = document.createElement('div');
    div.classList.add('entry');
    div.setAttribute('data-id', entry.id);

    const formattedContent = entry.content.replace(/\n/g, '<br>');

    div.innerHTML = `
        <h3>${entry.title}</h3>
        <p class="entry-content">${formattedContent}</p>
        <button class="more-btn" onclick="toggleExpand(this)">더보기</button>
        <small>${entry.date}</small>
        <div class="buttons">
            <button class="edit-btn" onclick="editEntry(${entry.id})">수정</button>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">삭제</button>
        </div>
    `;

    // 더보기 버튼 표시 여부 결정
    const contentParagraph = div.querySelector('.entry-content');
    const moreBtn = div.querySelector('.more-btn');

    if (contentParagraph.scrollHeight > contentParagraph.clientHeight) {
        moreBtn.style.display = 'inline';
    }

    return div;
}

function toggleMonthEntries(button, monthDiv) {
    const monthEntriesDiv = monthDiv.querySelector('.month-entries');

    if (monthEntriesDiv.style.display === 'none') {
        monthEntriesDiv.style.display = 'block';
        button.textContent = '접기';
    } else {
        monthEntriesDiv.style.display = 'none';
        button.textContent = '펼치기';
    }
}

function searchEntries() {
    const searchTerm = document.querySelector('.search-bar').value.toLowerCase();
    const entriesDiv = document.querySelector('.entries');
    const allMonthGroups = entriesDiv.querySelectorAll('.month-group');
    const recentEntries = entriesDiv.querySelectorAll('.entry');
    let hasResults = false;

    // 최근 5개 일기 필터링
    recentEntries.forEach(entry => {
        const title = entry.querySelector('h3').textContent.toLowerCase();
        const content = entry.querySelector('.entry-content').textContent.toLowerCase();

        if (title.includes(searchTerm) || content.includes(searchTerm)) {
            entry.style.display = 'block';
            hasResults = true;
        } else {
            entry.style.display = 'none';
        }
    });

    // 월별 그룹 필터링
    allMonthGroups.forEach(monthGroup => {
        const monthEntries = monthGroup.querySelector('.month-entries');
        const monthToggleBtn = monthGroup.querySelector('.month-toggle-btn');
        let monthHasResults = false;

        if (monthEntries) {
            const monthEntriesList = monthEntries.querySelectorAll('.entry');

            monthEntriesList.forEach(entry => {
                const title = entry.querySelector('h3').textContent.toLowerCase();
                const content = entry.querySelector('.entry-content').textContent.toLowerCase();

                if (title.includes(searchTerm) || content.includes(searchTerm)) {
                    entry.style.display = 'block';
                    monthHasResults = true;
                    hasResults = true;
                } else {
                    entry.style.display = 'none';
                }
            });

            // 검색 결과가 있는 월만 표시
            if (monthHasResults) {
                monthGroup.style.display = 'block';
                monthEntries.style.display = 'block'; // 검색 시 자동으로 펼침
                monthToggleBtn.textContent = '접기';
            } else {
                monthGroup.style.display = 'none';
            }
        }
    });

    // 검색 결과가 없을 때 메시지 표시
    let noResultsMsg = document.querySelector('.no-results');
    if (!hasResults) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('p');
            noResultsMsg.classList.add('no-results');
            noResultsMsg.textContent = '검색 결과 없음';
            entriesDiv.appendChild(noResultsMsg);
        }
    } else {
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }
}




window.onload = function() {
    // 오늘 날짜 가져오기
    const today = new Date().toISOString().split('T')[0];
    document.querySelector('.date').value = today; // 날짜 입력 필드 기본값 설정
    displayEntries();
};