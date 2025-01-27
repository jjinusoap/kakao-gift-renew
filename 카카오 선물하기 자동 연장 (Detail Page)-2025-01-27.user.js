// ==UserScript==
// @name         카카오 선물하기 자동 연장 (Detail Page)
// @namespace    http://tampermonkey.net/
// @version      2025-01-27
// @description  츄파츕스 300개 받으셨나요? 전 받았어요
// @author       Jinuping
// @match        https://gift.kakao.com/giftbox/inbox/detail/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gift.kakao.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function countAdd() {
        if (window.localStorage.getItem('renewCount') == null) {
            window.localStorage.setItem('renewCount', '0');
        }
        window.localStorage.setItem('renewCount', parseInt(window.localStorage.getItem('renewCount')) + 1);

        const giftFrom = document.querySelector("#mArticle > app-pw-home > app-view-home-desktop > app-pw-inbox-detail > div > app-sender-profile > div.wrap_rctprofile > div > strong > span").innerText;
        const giftName = document.querySelector("#mArticle > app-pw-home > app-view-home-desktop > app-pw-inbox-detail > div > div > div > app-order-subject > div > strong").innerText.split('상품 명 :\n')[1]
        const kakaoGiftUrl = 'https://gift.kakao.com/giftbox/inbox?couponStatus=OPEN';

        console.log(`[*] ${giftFrom} | ${giftName} 연장 완료!`);
        await sleep(100);
        location.href = kakaoGiftUrl;
    }

    window.confirm = function(confirmMessage) {
        console.log(confirmMessage);
        return true
    }
    window.alert = function(alertMessage) {
        console.log(alertMessage);
        if (alertMessage == '유효기간이 정상적으로 연장되었습니다.') {
            countAdd();
        }
    }
    window.addEventListener('load', async function() {

        await sleep(1500);
        console.log('1.5초 대기중...');

        const renewBtn = Array.from(document.querySelectorAll("button")).find(element => element.innerHTML === ' 기간 연장 ');

        async function renew() {
            if (renewBtn) {
                console.log('기간 연장 버튼 발견');
                await sleep(1000);
                renewBtn.click();
                await sleep(100);
            }

        console.log(`${window.localStorage.getItem('renewCount')}개의 선물 연장 완료`);
    }
        await renew();
    });
})();
