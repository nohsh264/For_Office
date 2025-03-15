// 계산기 입력
function appendToDisplay(value) {
  document.getElementById('display').value += value;
}
function clearDisplay() {
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
function handleKeyPress(event) {
  if (event.key === 'Enter') {
      calculate();
  } else if (event.key === 'Escape') {
      clearDisplay();
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
