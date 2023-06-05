// Filters Tabs
const tabs = document.querySelectorAll('[data-target');
const tabContents = document.querySelectorAll('[data-content]');

const onTabClick = 

// Adding Click event listener to both tabs.
tabs.forEach(tab => tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.target);

    tabContents.forEach((tc) => {
        // tc = tabContents
        tc.classList.remove('filters__active');
    })
    target.classList.add('filters__active');

    tabs.forEach(t => { // t = tab
        t.classList.remove('filter-tab-active')
    })
    tab.classList.add('filter-tab-active');
}))