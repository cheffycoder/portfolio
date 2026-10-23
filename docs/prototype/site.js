/* Shivam Bandral — portfolio v6. One file for both pages; each feature checks for its own elements. */
(() => {
  'use strict';

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const pad = (n) => String(n).padStart(2, '0');
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)');
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const small = matchMedia('(max-width: 734px)');
  const behavior = () => (reduceMotion.matches ? 'auto' : 'smooth');

  /* ================= Theme: sunrise / sunset ================= */
  const toggles = $$('[data-theme-toggle]');
  const sky = $('.sky');
  const effectiveTheme = () => root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
  const syncToggles = () => toggles.forEach((t) => {
    const mode = effectiveTheme();
    t.dataset.mode = mode;
    t.setAttribute('aria-label', mode === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  });
  const applyTheme = (next) => {
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
    syncToggles();
  };
  // Sunrise / sunset: a disc grows from the button with a band of sky colours on its edge until it
  // covers the farthest corner; the theme swaps while everything is covered; then the disc fades.
  let busy = false;
  const disc = sky && $('.sky-disc', sky);
  const toggleTheme = (from) => {
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    if (reduceMotion.matches || !disc || !disc.animate) return applyTheme(next);
    if (busy) return;
    busy = true;
    const origin = from || toggles.find((t) => t.getClientRects().length) || document.body;
    const r = origin.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    const far = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const size = (far / 0.42) * 2; // the solid core (42% of the radius) must reach the farthest corner
    Object.assign(disc.style, { width: `${size}px`, height: `${size}px`, left: `${x - size / 2}px`, top: `${y - size / 2}px` });
    sky.className = `sky ${next === 'dark' ? 'to-dark' : 'to-light'}`;
    sky.style.visibility = 'visible';
    disc.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1)', opacity: 1 }],
      { duration: 1500, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' })
      .finished.then(() => {
        root.classList.add('theme-switching');
        applyTheme(next);
        void document.body.offsetWidth;
        root.classList.remove('theme-switching');
        return disc.animate([{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1)', opacity: 0 }],
          { duration: 1500, easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)', fill: 'forwards' }).finished;
      })
      .finally(() => {
        disc.getAnimations().forEach((a) => a.cancel());
        sky.style.visibility = '';
        sky.className = 'sky';
        busy = false;
      });
  };
  toggles.forEach((t) => t.addEventListener('click', () => toggleTheme(t)));
  prefersDark.addEventListener?.('change', syncToggles);
  syncToggles();

  /* ================= Menus ================= */
  const menuBtn = $('[data-menu-toggle]');
  const setMenu = (open) => {
    root.classList.toggle('menu-open', open);
    menuBtn?.setAttribute('aria-expanded', String(open));
    menuBtn?.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    // move focus into the open menu, and back to the toggle when it closes
    if (open) $('[data-menu-close]')?.focus({ preventScroll: true });
    else if (root.contains(document.activeElement) && document.activeElement.closest('#flyout')) menuBtn?.focus({ preventScroll: true });
  };
  menuBtn?.addEventListener('click', () => setMenu(!root.classList.contains('menu-open')));
  $('#flyout')?.addEventListener('click', (e) => { if (e.target.closest('a, [data-menu-close]')) setMenu(false); });

  const localnav = $('[data-localnav]');
  const scrim = $('[data-scrim]');
  const explore = $('[data-explore]');
  const setExplore = (open) => {
    if (!localnav) return;
    localnav.classList.toggle('is-open', open);
    scrim?.classList.toggle('is-open', open);
    explore?.setAttribute('aria-expanded', String(open));
  };
  explore?.addEventListener('click', () => setExplore(!localnav.classList.contains('is-open')));
  scrim?.addEventListener('click', () => setExplore(false));
  localnav?.addEventListener('click', (e) => { if (e.target.closest('a')) setExplore(false); });

  /* ================= Snap screens ================= */
  const snap = $('[data-snap]');
  const screens = snap ? $$('.screen', snap) : [];
  const total = screens.length;
  const hooks = {};               // screen id -> { enter: [], leave: [] }
  const on = (id, type, fn) => { (hooks[id] ||= { enter: [], leave: [] })[type].push(fn); };
  let active = -1;

  const goTo = (target) => target?.scrollIntoView({ behavior: behavior(), block: 'start' });

  if (total) {
    // Footers, side rail and the local-nav menu all come from each screen's id + data-label.
    const rail = $('[data-rail]');
    const railCount = $('[data-rail-count]');
    const menu = $('[data-localnav-menu]');
    const footLink = (s, dir) => (dir === 'up'
      ? `<a href="#${s.id}"><svg class="ico nudge-up" aria-hidden="true"><use href="#i-arrow-up"/></svg><span class="word">Previous: </span>${s.dataset.label}</a>`
      : `<a href="#${s.id}"><span class="word">Next: </span>${s.dataset.label}<svg class="ico nudge-down" aria-hidden="true"><use href="#i-arrow-down"/></svg></a>`);

    screens.forEach((s, i) => {
      const prev = screens[i - 1];
      const next = screens[i + 1];
      const foot = $('.screen-foot', s);
      if (foot) {
        foot.innerHTML = `<div>${prev ? footLink(prev, 'up') : ''}</div>`
          + `<span class="count">${pad(i + 1)} / ${pad(total)}</span>`
          + `<div>${next ? footLink(next, 'down') : (foot.dataset.colophon || '')}</div>`;
      }
      rail?.insertAdjacentHTML('beforeend', `<li><a href="#${s.id}" aria-label="${pad(i + 1)} ${s.dataset.label}"><span class="tip" aria-hidden="true">${pad(i + 1)} ${s.dataset.label}</span></a></li>`);
      if (i > 0) menu?.insertAdjacentHTML('beforeend', `<li><a href="#${s.id}">${s.dataset.label}<span>${pad(i + 1)}</span></a></li>`);
    });
    menu?.insertAdjacentHTML('beforeend', '<li><a href="articles.html">Articles<span>Soon</span></a></li>');

    const railLinks = rail ? $$('a', rail) : [];
    const railWrap = $('[data-rail-wrap]');
    const now = $('[data-now]');
    const railPrev = $('[data-rail-prev]');
    const railNext = $('[data-rail-next]');
    railPrev?.addEventListener('click', () => goTo(screens[Math.max(0, active - 1)]));
    railNext?.addEventListener('click', () => goTo(screens[Math.min(total - 1, active + 1)]));
    const navLinks = $$('.localnav-links a[href^="#"]');
    const setActive = (i) => {
      if (i === active) return;
      if (active >= 0) (hooks[screens[active].id]?.leave || []).forEach((fn) => fn());
      active = i;
      const s = screens[i];
      s.classList.add('is-seen');
      railLinks.forEach((a, j) => a.setAttribute('aria-current', String(j === i)));
      if (railCount) railCount.textContent = `${pad(i + 1)} / ${pad(total)}`;
      if (now) now.innerHTML = `<b>${pad(i + 1)}</b> / ${pad(total)} · ${s.dataset.label}`;
      railWrap?.classList.toggle('is-visible', i > 0);
      if (railPrev) { railPrev.disabled = i === 0; railPrev.setAttribute('aria-label', i > 0 ? `Previous screen: ${screens[i - 1].dataset.label}` : 'Previous screen'); }
      if (railNext) { railNext.disabled = i === total - 1; railNext.setAttribute('aria-label', i < total - 1 ? `Next screen: ${screens[i + 1].dataset.label}` : 'Next screen'); }
      navLinks.forEach((a) => (a.hash === `#${s.id}` ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      localnav?.classList.toggle('is-visible', i > 0);
      if (i === 0) setExplore(false);
      (hooks[s.id]?.enter || []).forEach((fn) => fn());
    };

    // The screen crossing the middle of the viewport is the active one.
    const screenIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(screens.indexOf(e.target)); });
    }, { root: snap, rootMargin: '-49% 0px -49% 0px' });
    screens.forEach((s) => screenIO.observe(s));

    // In-page links scroll the snap container.
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const target = document.getElementById(a.getAttribute('href').slice(1));
      if (!target || !snap.contains(target)) return;
      e.preventDefault();
      setMenu(false);
      goTo(target);
    });

    // Arriving with a #screen (e.g. from the articles page).
    const fromHash = location.hash && document.getElementById(location.hash.slice(1));
    if (fromHash && snap.contains(fromHash)) requestAnimationFrame(() => fromHash.scrollIntoView({ block: 'start' }));
  }

  /* ================= Keyboard ================= */
  addEventListener('keydown', (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === 'Escape') { setExplore(false); setMenu(false); return; }
    const inField = e.target.closest?.('input, textarea, select, [contenteditable="true"], [role="slider"]');
    if (inField) return;
    if (total && (e.key === 'ArrowDown' || e.key === 'PageDown')) { e.preventDefault(); goTo(screens[Math.min(total - 1, active + 1)]); }
    else if (total && (e.key === 'ArrowUp' || e.key === 'PageUp')) { e.preventDefault(); goTo(screens[Math.max(0, active - 1)]); }
    else if (e.key.toLowerCase() === 't' && !e.repeat) toggleTheme();
  });

  /* ================= Web + mobile: explode on arrival, implode on leaving ================= */
  const pfArt = $('.pf-art');
  if (pfArt) {
    const host = pfArt.closest('.screen');
    on(host.id, 'enter', () => host.classList.add('is-exploded'));
    on(host.id, 'leave', () => host.classList.remove('is-exploded'));
  }

  /* ================= Here / there: two clocks on a 24-hour strip ================= */
  const timebar = $('[data-timebar]');
  if (timebar) {
    const IST = 330; // Mumbai, minutes east of UTC
    const fmt = (tz) => new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', ...(tz ? { timeZone: tz } : {}) });
    const fm = fmt('Asia/Kolkata'), fl = fmt();
    const clockM = $('[data-clock="mumbai"]', timebar), clockL = $('[data-clock="local"]', timebar);
    const markM = $('[data-mark="mumbai"]', timebar), markL = $('[data-mark="local"]', timebar);
    const youLabel = $('[data-you-label]', timebar);
    const youDiff = $('[data-you-diff]', timebar);
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const city = zone.split('/').pop().replace(/_/g, ' ');
    const span = (m) => { const h = Math.floor(Math.abs(m) / 60), mm = Math.abs(m) % 60; return `${h ? `${h}h` : ''}${h && mm ? ' ' : ''}${mm ? `${mm}m` : ''}`; };
    const tick = () => {
      const d = new Date();
      const utcMin = d.getUTCHours() * 60 + d.getUTCMinutes();
      const local = -d.getTimezoneOffset();
      const minsM = (utcMin + IST + 1440) % 1440;
      const minsL = (utcMin + local + 1440) % 1440;
      clockM.textContent = fm.format(d);
      clockL.textContent = fl.format(d);
      markM.style.left = `${(minsM / 1440) * 100}%`;
      markL.style.left = `${(minsL / 1440) * 100}%`;
      const diff = local - IST;
      const same = diff === 0;
      timebar.classList.toggle('is-same', same);
      markM.classList.toggle('same', same);
      markL.hidden = same;
      if (youLabel && !same) youLabel.textContent = city ? `You, in ${city}` : 'Your time';
      if (youDiff) youDiff.textContent = same ? '' : `${span(diff)} ${diff < 0 ? 'behind' : 'ahead of'} me`;
    };
    tick();
    setTimeout(() => { tick(); setInterval(tick, 60000); }, 60000 - (Date.now() % 60000));
  }

  /* ================= Number roll (from v2) ================= */
  const roll = (el) => {
    const target = el.dataset.final || (el.dataset.final = el.textContent);
    if (reduceMotion.matches) { el.textContent = target; return; }
    clearInterval(el._roll);
    let step = 0;
    el._roll = setInterval(() => {
      el.textContent = [...target].map((ch, i) => (/\d/.test(ch) && step <= i * 1.5 + 4 ? String((Math.random() * 10) | 0) : ch)).join('');
      if (++step > 18) { clearInterval(el._roll); el.textContent = target; }
    }, 40);
  };
  screens.forEach((s) => on(s.id, 'enter', () => $$('[data-roll]', s).forEach((el, i) => setTimeout(() => roll(el), 250 + i * 60))));

  /* ================= Mini dot figure ================= */
  $$('[data-dots]').forEach((el) => {
    const n = +el.dataset.dots, lit = +el.dataset.on;
    el.innerHTML = Array.from({ length: n }, (_, i) => `<i${i < lit ? ' class="on"' : ''}></i>`).join('');
  });

  /* ================= Pointer effect: contact spotlight ================= */
  const onPointer = (el, move, leave) => {
    let frame = 0;
    el.addEventListener('pointermove', (e) => {
      if (!finePointer.matches || reduceMotion.matches) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        move((e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height, r);
      });
    });
    el.addEventListener('pointerleave', () => { cancelAnimationFrame(frame); leave?.(); });
  };
  $$('[data-spotlight]').forEach((el) => onPointer(el, (px, py, r) => {
    el.style.setProperty('--mx', `${px * r.width}px`);
    el.style.setProperty('--my', `${py * r.height}px`);
  }));
  /* ================= Fill bar: the bar is the control ================= */
  const fillbar = $('[data-fillbar]');
  const lcStack = $('[data-lc-stack]');
  const fillApi = (() => {
    if (!fillbar) return null;
    const STEPS = ['Uploaded', 'Shared', 'Expiring', 'Deleted'];
    const max = STEPS.length - 1;
    const layers = [...$$('.fillbar-labels.on-track span', fillbar), ...$$('.fillbar-labels.on-fill span', fillbar)];
    const wins = lcStack ? [...lcStack.children] : [];
    let v = 0;
    let rect = null;
    let dragging = false;
    let settleTimer = 0;

    const paint = (value) => {
      v = value;
      fillbar.style.setProperty('--v', v.toFixed(3));
      // every label / state fades by its distance from the current value: one continuous transition
      const fade = (el, i) => {
        const d = i - v;
        el.style.setProperty('--o', clamp(1 - Math.abs(d) * 1.6, 0, 1).toFixed(3));
        el.style.setProperty('--d', clamp(d, -1, 1).toFixed(3));
        el.style.setProperty('--ad', Math.min(1, Math.abs(d)).toFixed(3));
      };
      layers.forEach((el, k) => fade(el, k % STEPS.length));
      wins.forEach(fade);
      const r = Math.round(v);
      fillbar.setAttribute('aria-valuenow', r);
      fillbar.setAttribute('aria-valuetext', STEPS[r]);
    };
    const settle = (value) => {
      fillbar.classList.add('is-settling');
      lcStack?.classList.add('is-settling');
      fillbar.style.setProperty('--stretch', 1);
      paint(clamp(Math.round(value), 0, max));
      clearTimeout(settleTimer);
      settleTimer = setTimeout(() => { fillbar.classList.remove('is-settling'); lcStack?.classList.remove('is-settling'); }, 550);
    };
    const fromX = (clientX) => {
      const usable = rect.width - 44;
      const raw = ((clientX - rect.left - 22) / usable) * max;
      // pulling past either end stretches the bar like rubber instead of moving the value
      if (raw < 0) { fillbar.style.setProperty('--origin', 'right'); fillbar.style.setProperty('--stretch', (1 + Math.min(0.06, (-raw / max) * 0.12)).toFixed(4)); }
      else if (raw > max) { fillbar.style.setProperty('--origin', 'left'); fillbar.style.setProperty('--stretch', (1 + Math.min(0.06, ((raw - max) / max) * 0.12)).toFixed(4)); }
      else fillbar.style.setProperty('--stretch', 1);
      return clamp(raw, 0, max);
    };
    const syncWidth = () => fillbar.style.setProperty('--bar-w', `${fillbar.clientWidth}px`);

    const touched = () => fillbar.classList.add('has-moved');
    fillbar.addEventListener('pointerdown', (e) => {
      touched();
      dragging = true;
      fillbar.setPointerCapture(e.pointerId);
      fillbar.style.setProperty('--stretch', 1);
      rect = fillbar.getBoundingClientRect();
      fillbar.classList.add('is-dragging', 'is-settling');
      lcStack?.classList.add('is-settling');
      paint(fromX(e.clientX));
    });
    fillbar.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      fillbar.classList.remove('is-settling');
      lcStack?.classList.remove('is-settling');
      paint(fromX(e.clientX));
    });
    const end = () => { if (!dragging) return; dragging = false; fillbar.classList.remove('is-dragging'); settle(v); };
    fillbar.addEventListener('pointerup', end);
    fillbar.addEventListener('pointercancel', end);
    fillbar.addEventListener('keydown', (e) => {
      touched();
      const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[e.key];
      if (step) { e.preventDefault(); settle(Math.round(v) + step); }
      if (e.key === 'Home') { e.preventDefault(); settle(0); }
      if (e.key === 'End') { e.preventDefault(); settle(max); }
    });
    if ('ResizeObserver' in window) new ResizeObserver(syncWidth).observe(fillbar);
    syncWidth();
    paint(v);
    return {
      intro() {
        syncWidth();
        if (reduceMotion.matches) return;
        fillbar.classList.remove('is-intro');
        void fillbar.offsetWidth;
        fillbar.classList.add('is-intro');
        fillbar.addEventListener('animationend', () => fillbar.classList.remove('is-intro'), { once: true });
      },
    };
  })();

  if (fillApi) {
    const host = fillbar.closest('.screen');
    if (host) on(host.id, 'enter', () => setTimeout(() => fillApi.intro(), 700));
  }

  /* ================= Segmented switches (numbers filter, skill groups) ================= */
  $$('[data-segmented]').forEach((group) => {
    const pill = $('.segmented-pill', group);
    const buttons = $$('button', group);
    const kind = group.dataset.segmented;
    const numbers = $('[data-numbers]');
    const sets = $$('[data-set]');
    const row = group.parentElement;
    const prev = $('[data-seg-prev]', row);
    const next = $('[data-seg-next]', row);
    const playBtn = $('[data-seg-play]', row);
    const duration = +group.dataset.timed || 0;
    const host = group.closest('.screen');
    let index = Math.max(0, buttons.findIndex((b) => b.getAttribute('aria-pressed') === 'true'));
    let playing = duration > 0 && !reduceMotion.matches;
    let inView = false;
    let timer = 0, startedAt = 0, remaining = duration;

    const move = (b) => { pill.style.width = `${b.offsetWidth}px`; pill.style.transform = `translateX(${b.offsetLeft}px)`; };
    const renderTimer = () => {
      if (!duration) return;
      group.style.setProperty('--dur', `${duration}ms`);
      group.classList.remove('is-running');
      void group.offsetWidth;
      group.classList.toggle('is-running', inView);
      group.classList.toggle('is-paused', !playing);
      if (playBtn) {
        playBtn.dataset.state = playing ? 'playing' : 'paused';
        playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
      }
    };
    const schedule = (ms) => {
      clearTimeout(timer);
      if (!duration || !playing || !inView) return;
      startedAt = performance.now();
      remaining = ms;
      timer = setTimeout(() => pick((index + 1) % buttons.length), ms);
    };
    function pick(i) {
      index = (i + buttons.length) % buttons.length;
      const b = buttons[index];
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      const value = b.dataset.value;
      if (kind === 'numbers' && numbers) numbers.dataset.filter = value;
      if (kind === 'skills') sets.forEach((set) => set.classList.toggle('is-active', set.dataset.set === value));
      move(b);
      if (group.scrollWidth > group.clientWidth) group.scrollTo({ left: b.offsetLeft - (group.clientWidth - b.offsetWidth) / 2, behavior: behavior() });
      renderTimer();
      schedule(duration);
    }
    buttons.forEach((b, i) => b.addEventListener('click', () => pick(i)));
    prev?.addEventListener('click', () => pick(index - 1));
    next?.addEventListener('click', () => pick(index + 1));
    playBtn?.addEventListener('click', () => {
      if (playing) { playing = false; clearTimeout(timer); remaining -= performance.now() - startedAt; group.classList.add('is-paused'); }
      else { playing = true; group.classList.remove('is-paused'); schedule(Math.max(400, remaining)); }
      playBtn.dataset.state = playing ? 'playing' : 'paused';
      playBtn.setAttribute('aria-label', playing ? 'Pause' : 'Play');
    });
    if (host && duration) {
      on(host.id, 'enter', () => { inView = true; renderTimer(); schedule(duration); });
      on(host.id, 'leave', () => { inView = false; clearTimeout(timer); group.classList.remove('is-running'); });
    }
    const sync = () => move(buttons[index]);
    addEventListener('resize', sync);
    document.fonts?.ready.then(sync);
    sync();
  });

  /* ================= Number tiles: "+" turns a tile over to its detail ================= */
  $$('.tile').forEach((tile) => {
    const btn = $('.tile-plus', tile);
    btn.addEventListener('click', () => {
      const open = !tile.classList.contains('is-open');
      tile.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ================= "Open to …" rolling phrase ================= */
  $$('[data-roll-words]').forEach((roll) => {
    const track = $('.roll-track', roll);
    const words = [...track.children];
    let n = 0;
    const fit = () => { roll.style.width = `${words[n].offsetWidth}px`; };
    const step = () => { n = (n + 1) % words.length; track.style.setProperty('--n', n); fit(); };
    document.fonts?.ready.then(fit);
    fit();
    if (!reduceMotion.matches) setInterval(() => { if (!document.hidden) step(); }, 2600);
  });

  /* ================= "Coming soon." — letters fly apart, scramble and drift, then re-type ================= */
  $$('[data-jumble]').forEach((el) => {
    const text = el.textContent;
    const note = el.closest('.screen, main')?.querySelector('[data-jumble-note]');
    const NOTES = ['Drafting…', 'Rewriting the intro…', 'Checking the numbers…', 'Almost there…'];
    const GLYPHS = 'abcdefghijklmnopqrstuvwxyz#%&*+=?/<>';
    el.textContent = '';
    const letters = [...text].map((ch) => {
      const span = document.createElement('span');
      span.className = 'ch';
      span.textContent = ch;
      span.setAttribute('aria-hidden', 'true');
      el.appendChild(span);
      return { span, ch, fixed: ch === ' ' || ch === '.', p: [Math.random() * 6.28, Math.random() * 6.28, Math.random() * 6.28], s: 0.7 + Math.random() * 0.6, tx: 0, ty: 0, tr: 0, nextSwap: 0 };
    });
    let amp = 0, target = 0, raf = 0, last = 0, scrambleUntil = 0, locked = false;
    let noteIdx = 0, noteHiddenAt = 0, tapTimer = 0, retype = [];
    const rand = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];
    // lock each letter's width so swapping glyphs never reflows the word
    const lockWidths = () => {
      if (locked) return; locked = true;
      letters.forEach((L) => { L.span.style.width = L.span.getBoundingClientRect().width + 'px'; });
    };
    const scatterTargets = () => letters.forEach((L) => {
      L.tx = (Math.random() - 0.5) * 48; L.ty = (Math.random() - 0.5) * 30; L.tr = (Math.random() - 0.5) * 28;
    });
    const frame = (t) => {
      const dt = Math.min(48, t - (last || t)); last = t;
      amp += (target - amp) * (1 - Math.exp(-dt / (target ? 380 : 520)));
      const sec = t / 1000;
      letters.forEach((L) => {
        // scattered position plus a slow, smooth drift
        const x = amp * (L.tx + 3 * Math.sin(sec * 0.6 * L.s + L.p[0]));
        const y = amp * (L.ty + 4 * Math.sin(sec * 0.7 * L.s + L.p[1]));
        const rot = amp * (L.tr + 4 * Math.sin(sec * 0.5 * L.s + L.p[2]));
        L.span.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg)`;
        L.span.style.opacity = (1 - amp * 0.3).toFixed(3);
        // jumble only during the entry burst, then hold still
        if (!L.fixed && target && t < scrambleUntil && t > L.nextSwap) { L.span.textContent = rand(); L.nextSwap = t + 60 + Math.random() * 50; }
      });
      if (amp < 0.002 && !target) {
        letters.forEach((L) => { L.span.style.transform = ''; L.span.style.opacity = ''; });
        raf = 0; last = 0; return;
      }
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (reduceMotion.matches) return;
      lockWidths();
      retype.forEach(clearTimeout); retype = [];
      if (target === 0 && amp < 0.3) scatterTargets();   // fresh scatter only after it has settled
      target = 1;
      scrambleUntil = performance.now() + 420;
      // the note changes only after it has been hidden for a while (no flicker on quick re-hovers)
      if (note) {
        if (!note.textContent || performance.now() - noteHiddenAt > 1600) note.textContent = NOTES[noteIdx++ % NOTES.length];
        note.classList.add('is-on');
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      target = 0; scrambleUntil = 0;
      // unjumble: a quick scramble, then letters re-type left to right as they glide home
      retype = letters.flatMap((L, k) => L.fixed ? [] : [
        setTimeout(() => { L.span.textContent = rand(); }, k * 28),
        setTimeout(() => { L.span.textContent = L.ch; }, 120 + k * 40),
      ]);
      if (note?.classList.contains('is-on')) { note.classList.remove('is-on'); noteHiddenAt = performance.now(); }
    };
    // a short grace period stops quick in-and-out passes from restarting everything
    let leaveTimer = 0;
    el.addEventListener('pointerenter', () => { clearTimeout(leaveTimer); start(); });
    el.addEventListener('pointerleave', () => { clearTimeout(leaveTimer); leaveTimer = setTimeout(stop, 140); });
    el.addEventListener('focus', start);
    el.addEventListener('blur', stop);
    el.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') { start(); clearTimeout(tapTimer); tapTimer = setTimeout(stop, 1800); } });
  });

  /* ================= Copy email ================= */
  $$('[data-copy]').forEach((btn) => {
    const label = $('[data-copy-label]', btn);
    const status = $('[data-copy-status]');
    const original = label.innerHTML;
    let t = 0;
    const report = (msg, html) => {
      label.innerHTML = html || msg;
      if (status) status.textContent = msg;
      clearTimeout(t);
      t = setTimeout(() => { label.innerHTML = original; if (status) status.textContent = ''; }, 2200);
    };
    btn.addEventListener('click', () => {
      const fallback = () => {
        report('Press ⌘/Ctrl + C to copy', `<span data-email>${btn.dataset.copy}</span>`);
        const r = document.createRange();
        r.selectNodeContents($('[data-email]', label));
        const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
      };
      if (!navigator.clipboard?.writeText) return fallback();
      navigator.clipboard.writeText(btn.dataset.copy).then(() => report('Copied to clipboard'), fallback);
    });
  });

  /* ================= Background art: hide cleanly if an image fails ================= */
  $$('img.bg-art').forEach((img) => {
    const hide = () => { img.hidden = true; };
    if (img.complete && img.naturalWidth === 0) hide();
    img.addEventListener('error', hide, { once: true });
  });

  // No snap container (articles page): mark the page as seen so reveals play.
  if (!total) $$('.screen').forEach((s) => s.classList.add('is-seen'));
})();
