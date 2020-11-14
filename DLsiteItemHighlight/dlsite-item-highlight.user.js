// ==UserScript==
// @name         DLsite Item Highlight
// @namespace    kabo2468.dihujs
// @version      1.1.0
// @description  Highlight works which is favorites or bought.
// @author       kabo2468
// @downloadURL  https://raw.githubusercontent.com/kabo2468/user-css-script/master/DLsiteItemHighlight/dlsite-item-highlight.user.js
// @updateURL    https://raw.githubusercontent.com/kabo2468/user-css-script/master/DLsiteItemHighlight/dlsite-item-highlight.user.js
// @homepageURL  https://github.com/kabo2468/user-css-script/tree/master/DLsiteItemHighlight
// @supportURL   https://github.com/kabo2468/user-css-script/issues
// @match        https://www.dlsite.com/*/fsr/*
// @match        https://www.dlsite.com/*/circle/profile/*
// @match        https://www.dlsite.com/*/campaign/*
// @match        https://www.dlsite.com/*/works/*
// @match        https://www.dlsite.com/*/genres/works*
// @require      https://openuserjs.org/src/libs/sizzle/GM_config.js
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_registerMenuCommand
// ==/UserScript==

GM_config.init({
    id: 'dihujsConfig',
    title: 'Script Settings',
    fields: {
        favoriteColor: {
            label: 'Favorite color',
            type: 'text',
            default: 'rgb(147 121 255 / 60%)'
        },
        boughtColor: {
            label: 'Bought color',
            type: 'text',
            default: 'rgb(255 155 104 / 60%)'
        }
    },
    css: '#dihujsConfig, #dihujsConfig_buttons_holder {text-align:center;}',
    events: {
        open: function () {
            GM_config.frame.setAttribute('style', 'display:block;position:fixed;overflow:auto;border:1px solid #000;margin:0;padding:0;left:calc(50% / 2);top:calc(50% / 2);height:50%;width:50%;z-index:9999;');
        }
    }
});

GM_registerMenuCommand('Configure', () => {
    GM_config.open();
});

function run() {
    const favColor = GM_config.get('favoriteColor');
    const boughtColor = GM_config.get('boughtColor');
    document
        .querySelectorAll(".search_result_img_box_inner")
        .forEach(function (element) {
            if (element.querySelector(".btn_favorite_in")) {
                element.style.backgroundColor = favColor;
            } else if (element.querySelector(".btn_dl")) {
                element.style.backgroundColor = boughtColor;
            }
        });
}

window.onload = function () {
    new MutationObserver(() => {
        run();
    }).observe(document.getElementById('search_result_list'), {
        childList: true,
        subtree: true
    });
    run();
};
