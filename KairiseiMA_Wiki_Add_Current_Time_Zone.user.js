// ==UserScript==
// @name        Kairisei MA Wiki - Add Current Time zone
// @namespace   test
// @include     http://wiki.famitsu.com/kairi/
// @version     16.10.10.0
// @description Add a '台灣時間' column and mark the current time
// @grant       none
// ==/UserScript==

(function MAWikiTwTime () {
    'use strict';

    let UTC_TIME_ZONE_CURRENT = -(new Date().getTimezoneOffset() / 60);
    let UTC_TIME_ZONE_JP = +9;
    let TIMEZONE_NAME = "台灣時間";

    let timeOffset = UTC_TIME_ZONE_CURRENT - UTC_TIME_ZONE_JP;

    function jpToTwTime(timeCol) {
        const timeField = timeCol.textContent.match(
            /([0-9]+):([0-9][0-9])～([0-9]+):([0-9][0-9])/
        );

        if (timeField === null) {
            if (timeCol.textContent === '時間') {
                timeCol.textContent = TIMEZONE_NAME;
            }
            return;
        }

        const beginHour = (parseInt(timeField[1], 10) + timeOffset + 24) % 24;
        const beginMin = parseInt(timeField[2], 10);
        const endHour = (parseInt(timeField[3], 10) + timeOffset + 24) % 24;
        const endMin = parseInt(timeField[4], 10);

        timeCol.textContent = `${beginHour}:${timeField[2]}～` +
                              `${endHour}:${timeField[4]}`;
        const beginTime = new Date(Date.now()).setHours(beginHour, beginMin);
        const endTime = new Date(Date.now()).setHours(endHour, endMin);

        if (beginTime < Date.now() && endTime > Date.now()) {
            timeCol.style.backgroundColor = 'yellow';
        }
    }

    const timeTables = document.querySelectorAll(
        'div.ie5 > table:nth-child(1) > tbody:nth-child(1)'
    );

    for (let timeTable of timeTables) {
        if (timeTable.childNodes[0].childNodes[0].textContent === '時間') {
            for (let row of timeTable.childNodes) {
                const jpTimeCol = row.childNodes[0];
                const twTimeCol = jpTimeCol.cloneNode(true);

                jpToTwTime(twTimeCol);
                row.insertBefore(twTimeCol, jpTimeCol);
            }
        }
    }
}());
