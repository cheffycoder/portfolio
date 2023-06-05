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


// Dark/Light Theme
const themeButton = document.getElementById('theme-button');

const darkTheme = 'dark-theme';
const sunIcon = 'ri-sun-line';

// Previously selected topic (if user selected)
const storedTheme = localStorage.getItem('selected-theme')
const storedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(sunIcon) ? 'ri-moon-line' : 'ri-sun-line'

// We validate if the user previously chose a topic
if (storedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[storedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[storedIcon === 'ri-moon-line' ? 'add' : 'remove'](sunIcon)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(sunIcon)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})



// Scroll Reveal Animation

const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 2500,
    delay: 400,
});

sr.reveal(`.profile__border`)
sr.reveal(`.profile__name`, {delay: 300})
sr.reveal(`.profile__profession`, {delay: 400})
sr.reveal(`.profile__social`, {delay: 500})
sr.reveal(`.profile__info-group`, {interval: 100, delay: 600})
sr.reveal(`.profile__buttons`, {delay: 700})
sr.reveal(`.filters__content`, {delay: 800})
sr.reveal(`.filters`, {delay: 900})