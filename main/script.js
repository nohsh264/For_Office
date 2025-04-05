const spyEls=document.querySelectorAll('section.scroll-spy') //특정한 세션이 화면에 보이기 시작하면 애니메이션 추가해 줄 수 있는 기능
spyEls.forEach(function(spyEl){
    new ScrollMagic
        .Scene({
            triggerElement:spyEl, //보여짐 여부를 감시할 요소를 지정
            triggerHook: 1 //뷰포트 0.8 지점에서 보여지면 setClassToggle 매소드 실행
        })
        .setClassToggle(spyEl, 'show') //해당 요소에 show를 넣었다 뺏다 함.
        .addTo(new ScrollMagic.Controller()); //우리가 추가한 옵션들을 내부의 컨트롤러의 내용을 할당해서 실제로 동작할 수 있는 구조를 만듦.
}); 