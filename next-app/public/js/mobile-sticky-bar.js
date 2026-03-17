/**
 * mobile-sticky-bar.js
 * Version HTML/JS vanilla du MobileStickyBar
 * Utilisable sans React - à inclure dans les pages
 * 
 * Affichage mobile uniquement, fade-in après 3 secondes, glassmorphism
 */
(function() {
    'use strict';

    const CONFIG = {
        phoneNumber: '+33751213255',
        whatsappNumber: '33751213255',
        whatsappMessage: 'Bonjour, je souhaite obtenir un devis pour un transport.',
        delayMs: 3000
    };

    const TEMPLATE = `
        <nav class="mobile-sticky-bar" role="navigation" aria-label="Contact rapide" hidden>
            <a href="tel:${CONFIG.phoneNumber.replace(/\s/g, '')}" class="msb-btn msb-call" aria-label="Appeler">📞 Appeler</a>
            <a href="https://wa.me/${CONFIG.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(CONFIG.whatsappMessage)}" 
               class="msb-btn msb-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Contacter sur WhatsApp">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                <span>WhatsApp</span>
            </a>
        </nav>
    `;

    const STYLES = `
        .mobile-sticky-bar {
            display: none;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 1001;
            padding: 14px 16px;
            padding-bottom: max(14px, env(safe-area-inset-bottom));
            gap: 12px;
            background: rgba(15, 23, 42, 0.65);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.12);
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        .mobile-sticky-bar.visible {
            display: flex;
            opacity: 1;
        }
        .mobile-sticky-bar .msb-btn {
            flex: 1;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 16px 20px;
            min-height: 52px;
            font-size: 1rem;
            font-weight: 600;
            border-radius: 12px;
            text-decoration: none;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            -webkit-tap-highlight-color: transparent;
        }
        .mobile-sticky-bar .msb-btn:active { transform: scale(0.98); }
        .mobile-sticky-bar .msb-call {
            background: linear-gradient(135deg, #475569 0%, #334155 100%);
            color: white;
            box-shadow: 0 2px 12px rgba(71, 85, 105, 0.3);
        }
        .mobile-sticky-bar .msb-call:hover { box-shadow: 0 4px 20px rgba(71, 85, 105, 0.4); }
        .mobile-sticky-bar .msb-whatsapp {
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            box-shadow: 0 2px 12px rgba(37, 211, 102, 0.4);
        }
        .mobile-sticky-bar .msb-whatsapp:hover { box-shadow: 0 4px 20px rgba(37, 211, 102, 0.5); }
        @media (min-width: 769px) { .mobile-sticky-bar { display: none !important; } }
    `;

    function init() {
        const style = document.createElement('style');
        style.textContent = STYLES;
        document.head.appendChild(style);

        const wrapper = document.createElement('div');
        wrapper.id = 'mobile-sticky-bar-root';
        wrapper.innerHTML = TEMPLATE;
        document.body.appendChild(wrapper);

        const bar = document.querySelector('.mobile-sticky-bar');
        if (!bar) return;

        function showIfMobile() {
            if (window.innerWidth < 768) {
                bar.removeAttribute('hidden');
                setTimeout(() => bar.classList.add('visible'), 50);
            } else {
                bar.classList.remove('visible');
                bar.setAttribute('hidden', '');
            }
        }

        setTimeout(() => {
            showIfMobile();
            window.addEventListener('resize', showIfMobile);
        }, CONFIG.delayMs);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
