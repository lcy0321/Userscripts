// ==UserScript==
// @name        Kancolle WikiWiki - Add "Collapse All" Button
// @namespace   https://github.com/lcy0321
// @version     15.08.15.0
// @match       *://wikiwiki.jp/*
// @grant       none
// @noframes
// ==/UserScript==

(function AddCollapseButton () {
  'use strict';

  function CollapseAll() {
    console.log('Collapse All');
    let objCount = '1';
    while (document.getElementById('rgn_summary' + objCount)) {
      document.getElementById('rgn_summary' + objCount).style.display = 'block';
      document.getElementById('rgn_content' + objCount).style.display = 'none';
      document.getElementById('rgn_bracket' + objCount).style.borderStyle = 'none';
      document.getElementById('rgn_button' + objCount).innerHTML = '＋';
      ++objCount;
    }
  }

  let collapseButton = document.createElement('input');
  collapseButton.id = 'collapse_all';
  collapseButton.type = 'button';
  collapseButton.value = 'Collapse All';
  collapseButton.onclick = CollapseAll;
  collapseButton.style.position = 'absolute';
  collapseButton.style.right = '5px';
  collapseButton.style.top = '5px';
  collapseButton.style.fontSize = '12px';

  document.body.appendChild(collapseButton);
}());
