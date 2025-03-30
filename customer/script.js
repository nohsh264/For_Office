function savePost() {
  const post = document.getElementById("userPost").value;
  if (post.trim() === "") {
      alert("내용을 입력하세요!");
      return;
  }
  localStorage.setItem("userPost", post);
  alert("글이 저장되었습니다!");
  document.getElementById("userPost").value = "";
}

function checkAdmin() {
  const password = document.getElementById("adminPassword").value;
  const adminPass = "admin123"; // 보안 강화를 위해 서버 연동 추천

  if (password === adminPass) {
      document.getElementById("adminContent").classList.remove("hidden");
      document.getElementById("adminLogin").classList.add("hidden");
      const savedPost = localStorage.getItem("userPost");
      document.getElementById("storedPost").innerText = savedPost ? savedPost : "저장된 글이 없습니다.";
  } else {
      alert("비밀번호가 틀렸습니다!");
  }
}

// 단축키를 누르면 관리자 로그인 창 표시
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.shiftKey && event.key === "M") {
      document.getElementById("adminLogin").classList.toggle("hidden");
  }
});