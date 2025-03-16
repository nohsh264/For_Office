// 계산기 입력
function appendToDisplay(value) {
  document.getElementById('display').value += value;
}
function clearDisplay_calc() {
  document.getElementById('display').value = '';
}
function calculate() {
  try {
      document.getElementById('display').value = eval(document.getElementById('display').value);
  } catch (e) {
      alert('잘못된 입력입니다.');
  }
}

// 계산기 키보드 입력
function handleKeyPress_calc(event) {
  if (event.key === 'Enter') {
      calculate();
  } else if (event.key === 'Escape') {
      clearDisplay_calc();
  }
}

// 원하는 계산기 선택하기
document.querySelectorAll("input[name='btnradio']").forEach(radio => {
  radio.addEventListener("change", function() {
      // 모든 UI 요소 숨기기
      document.querySelectorAll(".calculator").forEach(div => {
          div.classList.add("hidden");
      });

      // 선택된 라디오 버튼의 값(value)을 가져와 해당 UI 표시
      const targetId = this.value;
      document.getElementById(targetId).classList.remove("hidden");
  });
});

// 진법 변환
function convertNumber() {
  let inputElement = document.querySelector("#numberInput");
  let baseElement = document.querySelector("#baseSelect");
  let binaryElement = document.querySelector("#binary");
  let octalElement = document.querySelector("#octal");
  let decimalElement = document.querySelector("#decimal");
  let hexElement = document.querySelector("#hexadecimal");
  
  let inputValue = inputElement.value.trim();
  let base = parseInt(baseElement.value);
  
  if (!inputValue) {
      alert("숫자를 입력하세요.");
      return;
  }
  
  let num = parseInt(inputValue, base);
  if (isNaN(num)) {
      alert("올바른 숫자를 입력하세요.");
      return;
  }
  
  binaryElement.textContent = num.toString(2);
  octalElement.textContent = num.toString(8);
  decimalElement.textContent = num.toString(10);
  hexElement.textContent = num.toString(16).toUpperCase();
}

function handleKeyPress_calc_digit(event) {
  if (event.key === 'Enter') {
      convertNumber();
  } else if (event.key === 'Escape') {
      clearDisplay_calc_digit();
  }
}
function clearDisplay_calc_digit() {
  document.getElementById('numberInput').value = '';
  document.getElementById('result_digit').value = '';
}

// data 단위 변환
function convertSpeed() {
  const inputValue = document.querySelector("#dataSpeed").value;
  const unitFrom = document.querySelector("#unitFrom").value;

  if (inputValue === "") {
      alert("Please enter a value.");
      return;
  }

  let valueInBytesPerSecond; // Value in Bytes per second (B/s)

  // Convert to B/s first (Bytes per second)
  if (unitFrom === "MB/s") {
      valueInBytesPerSecond = inputValue * 1000000; // 1 MB/s = 1,000,000 B/s
  } else if (unitFrom === "MiB/s") {
      valueInBytesPerSecond = inputValue * 1048576; // 1 MiB/s = 1,048,576 B/s
  } else if (unitFrom === "KB/s") {
      valueInBytesPerSecond = inputValue * 1000; // 1 KB/s = 1,000 B/s
  } else if (unitFrom === "KiB/s") {
      valueInBytesPerSecond = inputValue * 1024; // 1 KiB/s = 1,024 B/s
  } else if (unitFrom === "B/s") {
      valueInBytesPerSecond = inputValue; // Already in B/s
  } else if (unitFrom === "GB/s") {
      valueInBytesPerSecond = inputValue * 1000000000; // 1 GB/s = 1,000,000,000 B/s
  } else if (unitFrom === "GiB/s") {
      valueInBytesPerSecond = inputValue * 1073741824; // 1 GiB/s = 1,073,741,824 B/s
  }

  // Convert B/s to other units
  const Bps = valueInBytesPerSecond;
  const KBps = (Bps / 1000).toFixed(1);
  const MBps = (KBps / 1000).toFixed(1); // MB/s conversion
  const MiBps = (Bps / 1048576).toFixed(1); // MiB/s conversion
  const GBps = (MBps / 1000).toFixed(1);
  const KiBps = (Bps / 1024).toFixed(1);
  const GiBps = (MiBps / 1024).toFixed(1);

  // Format numbers with commas
  const formattedBps = Bps.toLocaleString();
  const formattedKBps = (KBps).toLocaleString();
  const formattedMBps = (MBps).toLocaleString();
  const formattedMiBps = (MiBps).toLocaleString();
  const formattedGBps = (GBps).toLocaleString();
  const formattedKiBps = (KiBps).toLocaleString();
  const formattedGiBps = (GiBps).toLocaleString();

  document.querySelector("#result_data").innerHTML = `
      <div class="result_data">
          <div class="box">
              <p>Standard Units:</p>
              <ul>
                  <li>${formattedBps} B/s</li>
                  <li>${formattedKBps} KB/s</li>
                  <li>${formattedMBps} MB/s</li>
                  <li>${formattedGBps} GB/s</li>
              </ul>
          </div>
          <div class="box">
              <p>Binary Units:</p>
              <ul>
                  <li>${formattedKiBps} KiB/s</li>
                  <li>${formattedMiBps} MiB/s</li>
                  <li>${formattedGiBps} GiB/s</li>
              </ul>
          </div>
      </div>
  `;
}