import { about } from './modules/about';
import { allLoadBtn } from './modules/all-load-btn';
import { excludeDLsiteOnlyDiv } from './modules/dlsite-only/exclude-dlsite-only-div';
import { showDLsiteOnlyDiv } from './modules/dlsite-only/show-dlsite-only-div';
import { filterCategory } from './modules/filter-category';
import { showCountItems } from './modules/show-count-items';
import { sortSellDateBtn } from './modules/sort-sell-date-btn';
import { sortSellPercentBtn } from './modules/sort-sell-percent-btn';
import { statusE } from './modules/status-e';

const form = document.getElementById('showList');
const style = document.createElement('style');
style.innerHTML = '#dls_wl_tool-form>* {margin: 0 .1rem;}';
document.getElementsByTagName('body')[0].append(style);

const filterForm = document.createElement('div');
filterForm.id = 'dls_wl_tool-form';
filterForm.classList.add('border_b', 'status_select_box');

filterForm.append(
    about,
    showCountItems,
    allLoadBtn,
    statusE,
    sortSellDateBtn,
    sortSellPercentBtn,
    excludeDLsiteOnlyDiv,
    showDLsiteOnlyDiv,
    filterCategory
);

form?.after(filterForm);
