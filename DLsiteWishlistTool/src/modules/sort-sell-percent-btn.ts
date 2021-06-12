const tbody = document.querySelector('#wishlist_work > table > tbody');

const sortSellPercentBtn = document.createElement('button');
sortSellPercentBtn.textContent = '割引率が高い順にする';
sortSellPercentBtn.addEventListener('click', function () {
    const items = document.getElementsByClassName('_favorite_item');
    Array.from(items)
        .map(function (e) {
            const percentElement = e.querySelector('.icon_campaign.type_sale');
            const percent = (() => {
                if (percentElement) {
                    const m = percentElement?.textContent?.match(/(\d+)/);
                    return Number((m || [])[1] || 0);
                }
                return 0;
            })();
            return {
                dom: e,
                percent,
            };
        })
        .sort(function (a, b) {
            return b.percent - a.percent;
        })
        .forEach(function (v) {
            tbody?.append(v.dom || '', v.dom.nextSibling || '', v.dom.nextSibling?.nextSibling || '');
        });
});

export { sortSellPercentBtn };
