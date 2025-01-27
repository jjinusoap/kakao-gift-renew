// ==UserScript==
// @name         카카오 선물하기 자동 연장 (Main Page)
// @namespace    http://tampermonkey.net/
// @version      2025-01-27
// @description  츄파츕스 300개 받으셨나요? 전 받았어요
// @author       Jinuping
// @match        https://gift.kakao.com/giftbox/inbox?couponStatus=OPEN
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gift.kakao.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // sleep 함수
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const i = 0 // 몇 번 째 선물부터 할건지 (가끔 연장안되는거 있음 그거 띄어넘으세요)
    window.addEventListener('load', async function() {
        console.log('3초 대기 중...');
        await sleep(3000);

        // DOM 요소 가져오기
        const giftLocationElement = document.querySelectorAll(".link_receive");
        const giftDeadlineElement = document.querySelectorAll(".badge_deadline");
        const giftNameElement = document.querySelectorAll(".tit_product");
        const giftFromElement = document.querySelectorAll(".info_sender");

        // 요소가 없을 경우 종료
        if (!giftLocationElement || !giftDeadlineElement || !giftNameElement || !giftFromElement) {
            console.error('필수 DOM 요소를 찾을 수 없습니다.');
            return;
        }

        const giftLocation = giftLocationElement[i].href;
        const giftDeadline = giftDeadlineElement[i].innerHTML;
        const giftName = giftNameElement[i].innerHTML;
        const giftFrom = giftFromElement[i].textContent;
        const deadlineDay = parseInt(giftDeadline.replace(/[^0-9]/g, ""));

        // 선물 확인 및 이동
        if (deadlineDay < 30) {
            console.log('30일 이내 만료 선물 발견');
            console.log(`${giftDeadline} | ${giftFrom} | ${giftName}`);
            location.href = giftLocation; // 페이지 이동
        } else {
            console.log('만료 임박 선물이 없습니다.');
        }
    });
})();
