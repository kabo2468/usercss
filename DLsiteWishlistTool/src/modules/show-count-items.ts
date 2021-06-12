const tbody = document.querySelector('#wishlist_work > table > tbody');

const showCountItems = document.createElement('div');
showCountItems.innerHTML = '表示中: ';
const countSpan = document.createElement('span');
countSpan.id = 'dls_wl_tool-count';
countSpan.textContent = String((tbody?.childElementCount || 0) / 3);
showCountItems.append(countSpan);

export { showCountItems, countSpan };
