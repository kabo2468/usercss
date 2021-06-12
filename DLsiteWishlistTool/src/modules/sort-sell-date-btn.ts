const tbody = document.querySelector('#wishlist_work > table > tbody');

const sortSellDateBtn = document.createElement('button');
sortSellDateBtn.textContent = '割引終了が早い順にする';
sortSellDateBtn.addEventListener('click', function () {
    const items = document.getElementsByClassName('_favorite_item');
    Array.from(items)
        .map(function (e) {
            const period = e.querySelector('.period_date');
            const date = (() => {
                if (period) {
                    const m = period?.textContent?.match(/(\d{4})年(\d{2})月(\d{2})日 (\d{2})?時?/);
                    const [, year, month, day, hour] = m || [];
                    return new Date(Number(year), Number(month) - 1, Number(day), Number(hour) || 23, 59, 59).getTime();
                }
                return new Date(new Date().getFullYear() + 1, 0, 1).getTime();
            })();
            return {
                dom: e,
                date,
            };
        })
        .sort(function (a, b) {
            return a.date - b.date;
        })
        .forEach(function (v) {
            return tbody?.append(v.dom, v.dom.nextSibling || '', v.dom.nextSibling?.nextSibling || '');
        });
});

export { sortSellDateBtn };
