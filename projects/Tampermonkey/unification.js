// ==UserScript==
// @name         设置
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       MonchiLin
// @match        https://www.v2ex.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const avatars = document.querySelectorAll("#Main .avatar")
  avatars.forEach(node => node.src = "https://cdn.v2ex.com/gravatar/81a2b3e19d8ca2ab40d3d87c6911a207?s=73&d=retro")

})();

