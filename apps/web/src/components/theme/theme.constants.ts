/** localStorage key for the visitor's explicit choice. Absent = follow the system. */
export const THEME_STORAGE_KEY = 'theme';

/** Runs before first paint (theme-script): marks JS as on and applies a saved choice, so nothing flashes. */
export const THEME_INIT_SCRIPT = `document.documentElement.classList.add('js');try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;

/** The sweep: the disc grows for this long, the theme swaps, then the disc fades for as long again. */
export const SKY_SWEEP_MS = 1500;
/** The disc's solid core is 42% of its radius; that core must reach the farthest corner. */
export const SKY_CORE = 0.42;
