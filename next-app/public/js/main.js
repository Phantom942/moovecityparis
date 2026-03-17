'use strict';

/* ===== Scroll reveal animations (IntersectionObserver) ===== */

function initScrollAnimations() {
    var els = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    if (!('IntersectionObserver' in window) || !els.length) {
        els.forEach(function (e) { e.classList.add('visible'); });
        return;
    }
    var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); o.unobserve(entry.target); }
        });
    }, { threshold: 0.2 });
    els.forEach(function (e) { obs.observe(e); });
}

/* ===== Header hide-on-scroll ===== */

function initHeaderScrollBehaviour() {
    var header = document.querySelector('header');
    if (!header || window.innerWidth <= 768) return;
    var last = 0;
    window.addEventListener('scroll', function () {
        var cur = window.pageYOffset || document.documentElement.scrollTop;
        header.style.transform = (cur > last && cur > 120) ? 'translateY(-100%)' : 'translateY(0)';
        last = Math.max(cur, 0);
    }, { passive: true });
}

/* ===== Scroll-to-top button ===== */

function initScrollToTop() {
    var btn = document.getElementById('scrollToTop');
    if (!btn) return;
    window.addEventListener('scroll', function () {
        btn.classList.toggle('visible', window.pageYOffset > 300);
    }, { passive: true });
    btn.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ===== Bootstrap ===== */

document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimations();
    initHeaderScrollBehaviour();
    initScrollToTop();
});
