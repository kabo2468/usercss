const filterCategory = document.createElement('div');

const span = document.createElement('span');
span.textContent = 'カテゴリーフィルター: ';

const categories = [...new Set(Array.from(document.querySelectorAll('.work_category'), (e) => e.children[0].textContent))];

const checks = categories.map((cat) => {
    const label = document.createElement('label');
    label.textContent = cat;
    label.classList.add('dls_wl_tool-cat-label');
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');

    label.insertBefore(checkBox, label.firstChild);
    return label;
});

filterCategory.addEventListener('change', function () {
    const checkedDoms = checks.filter((e) => e.getElementsByTagName('input')[0].checked);
    const checkedCats = checkedDoms.map((e) => e.textContent);

    const countSpan = document.getElementById('dls_wl_tool-count');
    if (!countSpan) return;
    let count = Number(countSpan.textContent);

    const items = document.getElementsByClassName('_favorite_item') as HTMLCollectionOf<HTMLElement>;
    const itemsArr = Array.from(items);
    itemsArr.forEach((i) => {
        if (checkedCats.length) {
            const elmCat = i.querySelector('.work_category')?.children[0].textContent || '';
            if (checkedCats.includes(elmCat)) {
                const dis = i.style.display;
                i.style.display = '';
                if (dis === 'none') count += 1;
            } else {
                const dis = i.style.display;
                i.style.display = 'none';
                if (dis === '') count -= 1;
            }
        } else {
            const dis = i.style.display;
            i.style.display = '';
            if (dis === 'none') count += 1;
        }
    });
    countSpan.textContent = String(count);
});

filterCategory.append(
    span,
    ...checks.map((e) => {
        const div = document.createElement('div');
        div.append(e);
        return div;
    })
);

export { filterCategory };
