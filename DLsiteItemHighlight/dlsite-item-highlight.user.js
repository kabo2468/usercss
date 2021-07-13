// ==UserScript==
// @name         DLsite Item Highlight
// @namespace    kabo2468.dihujs
// @version      1.3.0
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

// --------------------
// Changelog: https://github.com/kabo2468/user-css-script/blob/master/DLsiteItemHighlight/README.md
// --------------------

GM_config.init({
    id: 'dihujsConfig',
    title: 'DLsite Item Highlight Settings',
    fields: {
        favoriteColor: {
            label: 'Favorite color',
            type: 'color',
            default: '#9379ff'
        },
        boughtColor: {
            label: 'Bought color',
            type: 'color',
            default: '#ff9b68'
        },
        opacity: {
            label: 'Opacity (%)',
            type: 'int',
            size: 3,
            min: 0,
            max: 100,
            default: 60
        }
    },
    types: {
        color: {
            default: null,
            toNode: function () {
                const configId = this.configId;
                const field = this.settings;
                const value = this.value || this['default'];
                const id = this.id;
                const create = this.create;
                const retNode = create('div', {
                    className: 'config_var',
                    id: `${configId}_${id}_var`,
                    title: field.title
                });
                this.format = '#ffffff';

                retNode.appendChild(create('label', {
                    innerHTML: field.label,
                    id: `${configId}_${id}_field_label`,
                    for: `${configId}_field_${id}`,
                    className: 'field_label'
                }));

                retNode.appendChild(create('input', {
                    id: `${configId}_field_${id}`,
                    type: 'color',
                    value: value
                }));

                return retNode;
            },
            toValue: function () {
                return this.wrapper ? this.wrapper.getElementsByTagName('input')[0].value : null;
            },
            reset: function () {
                if (this.wrapper) this.wrapper.getElementsByTagName('input')[0].value = this['default'];
            }
        }
    },
    css: '#dihujsConfig, #dihujsConfig_buttons_holder {text-align:center;}',
    events: {
        open: function () {
            GM_config.frame.setAttribute('style', 'display:block;position:fixed;overflow:auto;border:1px solid #000;margin:0;padding:0;left:calc(50% / 2);top:calc(50% / 2);height:50%;width:50%;z-index:9999;');
        },
        save: run
    }
});

GM_registerMenuCommand('Configure', () => {
    GM_config.open();
});

function convertHexToRGBA(hexCode, opacity) {
    const hex = hexCode.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

function run() {
    const fav = GM_config.get('favoriteColor');
    const bought = GM_config.get('boughtColor');
    const opacity = GM_config.get('opacity');

    const favColor = convertHexToRGBA(fav, opacity);
    const boughtColor = convertHexToRGBA(bought, opacity);

    document
        .querySelectorAll(".search_result_img_box_inner")
        .forEach(function (element) {
            if (element.querySelector(".btn_favorite_in")) {
                element.style.backgroundColor = favColor;
            }
            if (element.querySelector(".btn_dl")) {
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