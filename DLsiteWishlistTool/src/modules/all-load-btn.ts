import { countSpan } from './show-count-items';

const tbody = document.querySelector('#wishlist_work > table > tbody');

const allLoadBtn = document.createElement('button');
allLoadBtn.textContent = 'すべて読み込む';
allLoadBtn.addEventListener('click', async function () {
    const statusDom = document.getElementById('dls_wl_tool-status');
    if (!statusDom) return;
    statusDom.textContent = 'Fetching...';
    const countE = document.createElement('span');
    statusDom.append(countE);

    allLoadBtn.disabled = true;
    const allNum = document.querySelector('#wishlist > div.sort_box.border_b > div.page_total > strong:nth-child(1)')?.textContent;

    const pagers = document.querySelectorAll('#wishlist > table.search_pager');
    pagers.forEach((el) => {
        el.parentNode?.removeChild(el);
    });

    document.querySelector('#wishlist > table')?.remove();

    const per = document.querySelector('.display_num_select > ul > li.on > a')?.textContent;
    const pages = Math.ceil(Number(allNum) / Number(per));

    let separatorNum = 0;
    for (let i = 2; i <= pages; i++) {
        countE.textContent = `${i} / ${pages}`;
        console.log('Get page:', i);
        const page = await getItemsDOM(location.href, i);

        const items = page.querySelector('#wishlist_work > table > tbody')?.children;
        if (!items) return;

        const separator = document.createElement('tr');
        separator.innerHTML = `<p>Page: ${i}</p>`;
        separator.style.fontSize = '16px';
        separator.style.display = 'flex';
        separator.style.justifyContent = 'center';
        separator.style.backgroundColor = '#424242';
        separator.style.borderBottom = '1px solid #ccc';
        separatorNum++;

        tbody?.append(separator, ...items);
        console.log('Append page:', i);
    }
    countSpan.textContent = String(((tbody?.childElementCount || 0) - separatorNum) / 3);
    statusDom.textContent = 'Done!';
});

export { allLoadBtn };

function getItemsDOM(url: string, i: number): Promise<Document> {
    return new Promise((resolve) => {
        fetch(`${url}/page/${i}`)
            .then((res) => res.text())
            .then((text) => new DOMParser().parseFromString(text, 'text/html'))
            .then((dom) => resolve(dom));
    });
}
