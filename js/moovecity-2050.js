// 🚀 MOOVE CITY - JavaScript Niveau 2050
// Fonctionnalités avancées, performance optimale

/* ========================================
   CONFIGURATION
   ======================================== */

const MooveCity2050 = {
    config: {
        scrollReveal: true,
        lazyLoad: true,
        smoothScroll: true,
        performanceMonitoring: true
    },

    /* ========================================
       INITIALISATION
       ======================================== */

    init() {
        console.log('🚀 Moove City 2050 - Initialisation...');
        
        if (this.config.scrollReveal) this.initScrollReveal();
        if (this.config.lazyLoad) this.initLazyLoad();
        if (this.config.smoothScroll) this.initSmoothScroll();
        if (this.config.performanceMonitoring) this.initPerformance();
        
        this.initScrollProgress();
        this.initBackToTop();
        this.initFormEnhancements();
        this.initAccessibility();
        
        console.log('✅ Moove City 2050 - Prêt !');
    },

    /* ========================================
       SCROLL REVEAL (Animations au scroll)
       ======================================== */

    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observer tous les articles et sections
        document.querySelectorAll('.article-card, .highlight-box, section').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        console.log('✅ Scroll Reveal activé');
    },

    /* ========================================
       LAZY LOADING IMAGES
       ======================================== */

    initLazyLoad() {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            imageObserver.observe(img);
        });

        console.log('✅ Lazy Loading activé');
    },

    /* ========================================
       SMOOTH SCROLL
       ======================================== */

    initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const href = this.getAttribute('href');
                if (href === '#') return;

                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        console.log('✅ Smooth Scroll activé');
    },

    /* ========================================
       SCROLL PROGRESS BAR
       ======================================== */

    initScrollProgress() {
        // Créer barre de progression
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.prepend(progressBar);

        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            progressBar.style.width = `${scrolled}%`;
        });

        console.log('✅ Scroll Progress activé');
    },

    /* ========================================
       BACK TO TOP BUTTON
       ======================================== */

    initBackToTop() {
        const button = document.createElement('button');
        button.innerHTML = '↑';
        button.className = 'back-to-top';
        button.setAttribute('aria-label', 'Retour en haut');
        button.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, #059669 0%, #047857 100%);
            color: white;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        document.body.appendChild(button);

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        });

        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        console.log('✅ Back to Top activé');
    },

    /* ========================================
       FORM ENHANCEMENTS
       ======================================== */

    initFormEnhancements() {
        // Auto-save form (localStorage)
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            
            inputs.forEach(input => {
                // Restaurer valeurs sauvegardées
                const saved = localStorage.getItem(`form_${input.id}`);
                if (saved && input.value === '') {
                    input.value = saved;
                }

                // Sauvegarder au changement
                input.addEventListener('change', () => {
                    localStorage.setItem(`form_${input.id}`, input.value);
                });
            });
        });

        console.log('✅ Form Auto-Save activé');
    },

    /* ========================================
       ACCESSIBILITÉ (WCAG 2.1 AAA)
       ======================================== */

    initAccessibility() {
        // Skip to main content
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Aller au contenu principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            background: #059669;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
        `;
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        document.body.prepend(skipLink);

        // ARIA labels dynamiques
        document.querySelectorAll('a, button').forEach(el => {
            if (!el.getAttribute('aria-label') && el.textContent.trim() === '') {
                el.setAttribute('aria-label', 'Action');
            }
        });

        console.log('✅ Accessibilité renforcée');
    },

    /* ========================================
       PERFORMANCE MONITORING
       ======================================== */

    initPerformance() {
        if ('PerformanceObserver' in window) {
            // Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('📊 LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                list.getEntries().forEach(entry => {
                    console.log('⚡ FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });

            console.log('✅ Performance Monitoring activé');
        }
    },

    /* ========================================
       NOTIFICATION SYSTEM
       ======================================== */

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 1rem;
            right: 1rem;
            padding: 1rem 1.5rem;
            background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#3b82f6'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    /* ========================================
       ANALYTICS TRACKING AVANCÉ
       ======================================== */

    trackEvent(category, action, label = '') {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
            console.log('📊 Event tracked:', category, action, label);
        }
    },

    /* ========================================
       PREFETCH LINKS (Performance)
       ======================================== */

    prefetchLinks() {
        const links = document.querySelectorAll('a[href^="/"]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = document.createElement('link');
                    link.rel = 'prefetch';
                    link.href = entry.target.href;
                    document.head.appendChild(link);
                    observer.unobserve(entry.target);
                }
            });
        });

        links.forEach(link => observer.observe(link));
        console.log('✅ Link Prefetching activé');
    }
};

/* ========================================
   ANIMATIONS CSS
   ======================================== */

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

/* ========================================
   AUTO-INIT AU CHARGEMENT
   ======================================== */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MooveCity2050.init());
} else {
    MooveCity2050.init();
}

// Export pour utilisation externe
window.MooveCity2050 = MooveCity2050;
