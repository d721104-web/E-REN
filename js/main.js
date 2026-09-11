document.addEventListener('DOMContentLoaded', () => {
  // Premium hero slider

  const toggle = document.querySelector('.nav-toggle-4');
  const panel = document.querySelector('.mobile-panel-4');
  if (toggle && panel) {
    toggle.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? closeIcon() : menuIcon();
    });
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        panel.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = menuIcon();
      });
    });
  }
  function menuIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>';
  }
  function closeIcon() {
    return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  // Premium hero slider
  const slider = document.querySelector('.hero-slider');
  if (slider) {
    const slides = Array.from(slider.querySelectorAll('.hero-slide'));
    const dotsWrap = slider.querySelector('.hero-dots');
    const prevBtn = slider.querySelector('.hero-arrow.prev');
    const nextBtn = slider.querySelector('.hero-arrow.next');
    let current = slides.findIndex(s => s.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = null;
    function renderDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = '';
      slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'hero-dot' + (i === current ? ' active' : '');
        btn.setAttribute('aria-label', `切換到第 ${i + 1} 張`);
        btn.addEventListener('click', () => { go(i); restart(); });
        dotsWrap.appendChild(btn);
      });
    }
    function go(i) {
      slides[current].classList.remove('is-active');
      current = (i + slides.length) % slides.length;
      slides[current].classList.add('is-active');
      renderDots();
    }
    function next() { go(current + 1); }
    function prev() { go(current - 1); }
    function autoplay() {
      const interval = Number(slider.dataset.interval || 5200);
      timer = window.setInterval(next, interval);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); autoplay(); }
    prevBtn && prevBtn.addEventListener('click', () => { prev(); restart(); });
    nextBtn && nextBtn.addEventListener('click', () => { next(); restart(); });
    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', autoplay);
    slider.addEventListener('focusin', stop);
    slider.addEventListener('focusout', restart);
    renderDots();
    if (slides.length > 1 && slider.dataset.autoplay === 'true') autoplay();
  }

  const revealEls = document.querySelectorAll('.reveal-4');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }


  // Fridge program profit calculator
  const fridgeSlider = document.getElementById('fridge-slider');
  if (fridgeSlider) {
    const hostProfitPerCup = 15; // NT$55 avg bottled price, estimated host share
    const valEl = document.getElementById('fridge-slider-val');
    const hostEl = document.getElementById('fridge-host-profit');
    const fmt = (n) => 'NT$ ' + n.toLocaleString('en-US');
    function updateFridge() {
      const cups = Number(fridgeSlider.value);
      valEl.textContent = cups + ' 瓶 / 日';
      hostEl.textContent = fmt(cups * hostProfitPerCup * 30);
    }
    fridgeSlider.addEventListener('input', updateFridge);
    updateFridge();
  }
});
