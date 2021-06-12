const filterCategory = document.createElement('div');

let checks = createCheckboxes();

const tbody = document.querySelector('#wishlist_work > table > tbody');
if (tbody) {
    new MutationObserver(() => {
        checks = createCheckboxes();
        filterCategory.innerHTML = '';
        append(checks);
    }).observe(tbody, {
        childList: true,
        subtree: true,
    });
}

const span = document.createElement('span');
span.textContent = 'カテゴリーフィルター: ';

filterCategory.addEventListener('change', function () {
    const checkedDoms = checks.filter((e) => e.getElementsByTagName('input')[0].checked);
    const checkedCats = checkedDoms.map((e) => e.textContent);

    const countSpan = document.getElementById('dls_wl_tool-count');
    if (!countSpan) return;
    let count = Number(countSpan.textContent);

    const items = document.getElementsByClassName('_favorite_item') as HTMLCollectionOf<HTMLElement>;
    Array.from(items).forEach((i) => {
        const dis = i.style.display;
        const elmCat = i.querySelector('.work_category')?.children[0].textContent || '';
        if (checkedCats.length && !checkedCats.includes(elmCat)) {
            i.style.display = 'none';
            if (dis === '') count -= 1;
        } else {
            i.style.display = '';
            if (dis === 'none') count += 1;
        }
    });
    countSpan.textContent = String(count);
});

append(checks);

export { filterCategory };

function append(checks: HTMLLabelElement[]) {
    filterCategory.append(
        span,
        ...checks.map((e) => {
            const div = document.createElement('div');
            div.append(e);
            return div;
        })
    );
}

function createCheckboxes() {
    const categories = [...new Set(Array.from(document.querySelectorAll('.work_category'), (e) => e.children[0].textContent))];
    return categories.map((cat) => {
        const label = document.createElement('label');
        label.textContent = cat;
        label.classList.add('dls_wl_tool-cat-label');
        const checkBox = document.createElement('input');
        checkBox.setAttribute('type', 'checkbox');

        label.insertBefore(checkBox, label.firstChild);
        return label;
    });
}
