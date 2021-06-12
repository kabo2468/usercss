export function createDLsiteOnlyDiv(text: string, show: boolean): HTMLDivElement {
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.textContent = text;
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.addEventListener('change', function () {
        const count = showDLsiteOnlyCallback(checkBox.checked, show);
        const countDom = document.getElementById('dls_wl_tool-count');
        if (!countDom) return;
        countDom.textContent = String(count);
    });
    div.append(checkBox, label);
    return div;
}

function showDLsiteOnlyCallback(isChecked: boolean, show: boolean) {
    const countSpan = document.getElementById('dls_wl_tool-count');
    let count = Number(countSpan?.textContent);
    const items = document.getElementsByClassName('_favorite_item') as HTMLCollectionOf<HTMLElement>;
    Array.from(items).forEach(function (i) {
        const isDLsiteOnlyElement = i.querySelector('.icon_lead_01.type_exclusive');
        if (show) {
            if (isDLsiteOnlyElement !== null) return;
        } else {
            if (!isDLsiteOnlyElement) return;
        }
        i.style.display = isChecked ? 'none' : '';
        count += isChecked ? -1 : 1;
    });
    return count;
}
