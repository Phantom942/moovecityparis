'use strict';

/* ===== Tracking Google Ads / Analytics ===== */

function trackDevisCall() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            event_category: 'devis',
            event_label: 'Appel telephone devis',
            value: 1
        });
    }
}

function trackDevisWhatsApp() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            event_category: 'devis',
            event_label: 'WhatsApp devis',
            value: 1
        });
    }
}

function trackWhatsAppClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            event_category: 'contact',
            event_label: 'Clic WhatsApp nav',
            value: 1
        });
    }
}

window.trackDevisCall = trackDevisCall;
window.trackDevisWhatsApp = trackDevisWhatsApp;
window.trackWhatsAppClick = trackWhatsAppClick;

/* ===== Tarification ===== */

const SERVICE_PRICES = {
    urban:   { label: 'À partir de 40€',  basePrice: 40,  pricePerKm: 0.75, pricePerHour: 18, minPrice: 40  },
    express: { label: 'À partir de 50€',  basePrice: 50,  pricePerKm: 1.0,  pricePerHour: 22, minPrice: 50  },
    premium: { label: 'À partir de 70€',  basePrice: 70,  pricePerKm: 1.25, pricePerHour: 26, minPrice: 70  },
    titan:   { label: 'À partir de 110€', basePrice: 110, pricePerKm: 1.75, pricePerHour: 32, minPrice: 110 }
};

function calculatePrice(vehicleKey, durationHours) {
    if (!vehicleKey || !durationHours) return null;
    const v = SERVICE_PRICES[vehicleKey];
    if (!v) return null;
    return Math.max(Math.round(v.basePrice + durationHours * v.pricePerHour), v.minPrice);
}
window.calculatePrice = calculatePrice;

function calculatePriceWithDistanceImproved(vehicleKey, distanceKm, durationMinutes, selectedDate, selectedTime) {
    const v = SERVICE_PRICES[vehicleKey];
    if (!v) return null;

    const durationHours = Math.max(0.5, Math.ceil(durationMinutes / 30) * 0.5);

    let distanceCost = 0;
    if (distanceKm <= 5) {
        distanceCost = distanceKm * v.pricePerKm * 0.8;
    } else if (distanceKm <= 15) {
        distanceCost = 5 * v.pricePerKm * 0.8 + (distanceKm - 5) * v.pricePerKm;
    } else {
        distanceCost = 5 * v.pricePerKm * 0.8 + 10 * v.pricePerKm + (distanceKm - 15) * v.pricePerKm;
    }

    const durationCost = durationHours * v.pricePerHour;
    let totalPrice = v.basePrice + distanceCost + durationCost;

    let reservationDate = new Date();
    let reservationHour = reservationDate.getHours();
    let reservationDay = reservationDate.getDay();

    if (selectedDate) {
        try {
            const parts = selectedDate.split('-');
            if (parts.length === 3) {
                reservationDate = new Date(+parts[0], +parts[1] - 1, +parts[2]);
                reservationDay = reservationDate.getDay();
            }
        } catch (_) { /* keep defaults */ }
    }
    if (selectedTime && selectedTime !== 'Dès que possible') {
        const m = selectedTime.match(/(\d{1,2})[h:](\d{2})?/);
        if (m) reservationHour = +m[1];
    }

    const isPeakHours = (reservationHour >= 7 && reservationHour < 9) || (reservationHour >= 17 && reservationHour < 19);
    const isWeekend = reservationDay === 0 || reservationDay === 6;
    if (isPeakHours) totalPrice *= 1.15;
    if (isWeekend) totalPrice *= 1.1;
    totalPrice = Math.max(totalPrice, v.minPrice);

    return {
        total: Math.round(totalPrice),
        base: v.basePrice,
        distance: Math.round(distanceCost * 100) / 100,
        duration: Math.round(durationCost * 100) / 100,
        distanceKm: Math.round(distanceKm * 10) / 10,
        durationMinutes: Math.round(durationMinutes),
        durationHours: Math.round(durationHours * 10) / 10,
        isPeakHours,
        isWeekend
    };
}

/* ===== Calculateur de prix (formulaire hero) ===== */

const priceCalculatorCache = {
    elements: null,
    init() {
        if (!this.elements) {
            this.elements = {
                depart: document.getElementById('depart'),
                arrivee: document.getElementById('arrivee'),
                vehicle: document.getElementById('vehicle'),
                calculator: document.getElementById('price-calculator'),
                priceResult: document.getElementById('calculated-price'),
                priceDetails: document.getElementById('price-details'),
                priceNote: document.getElementById('price-note'),
                priceLoading: document.getElementById('price-loading')
            };
        }
        return this.elements;
    }
};

let priceCalculationTimeout;
function calculatePriceWithDistance() {
    clearTimeout(priceCalculationTimeout);
    priceCalculationTimeout = setTimeout(() => {
        const el = priceCalculatorCache.init();
        if (!el.depart || !el.arrivee || !el.vehicle || !el.calculator || !el.priceResult) return;

        const departAddr  = el.depart.getAttribute('data-full-address') || el.depart.value.trim();
        const arriveeAddr = el.arrivee.getAttribute('data-full-address') || el.arrivee.value.trim();
        const vehicleVal  = el.vehicle.value;
        const selectedDate = document.getElementById('date')?.value || null;
        const selectedTime = document.getElementById('heure')?.value || null;

        let vehicleKey = null;
        if (vehicleVal?.includes('URBAN'))   vehicleKey = 'urban';
        else if (vehicleVal?.includes('EXPRESS'))  vehicleKey = 'express';
        else if (vehicleVal?.includes('PREMIUM'))  vehicleKey = 'premium';
        else if (vehicleVal?.includes('TITAN'))    vehicleKey = 'titan';

        if (!vehicleKey) { el.calculator.style.display = 'none'; return; }

        const hasDepart  = departAddr && departAddr.length > 3;
        const hasArrivee = arriveeAddr && arriveeAddr.length > 3;

        el.calculator.style.display = 'block';
        el.calculator.style.visibility = 'visible';
        el.calculator.style.opacity = '1';
        if (el.priceLoading) el.priceLoading.style.display = (hasDepart && hasArrivee) ? 'block' : 'none';
        el.priceResult.textContent = '--€';
        if (el.priceDetails) el.priceDetails.textContent = '';

        if (!hasDepart || !hasArrivee) {
            const v = SERVICE_PRICES[vehicleKey];
            const est = calculatePrice(vehicleKey, 2);
            el.priceResult.textContent = est + '€';
            if (el.priceDetails) el.priceDetails.innerHTML = '<div style="color:#64748b;font-size:0.85rem">Estimation basique (2h)</div>';
            if (el.priceNote) el.priceNote.textContent = '* ' + v.basePrice + '€ (base) + 2h × 10€/h = ' + est + '€ (estimation)';
            return;
        }

        const cacheKey = departAddr + '|' + arriveeAddr + '|' + vehicleKey + '|' + (selectedDate || '') + '|' + (selectedTime || '');

        if (typeof google !== 'undefined' && google.maps?.DistanceMatrixService) {
            const cacheId = 'priceCalc_' + btoa(cacheKey).substring(0, 50);
            try {
                const cached = JSON.parse(sessionStorage.getItem(cacheId));
                if (cached && Date.now() - cached.timestamp < 300000) {
                    if (el.priceLoading) el.priceLoading.style.display = 'none';
                    el.priceResult.textContent = cached.price + '€';
                    if (el.priceDetails) el.priceDetails.innerHTML = cached.details;
                    if (el.priceNote) el.priceNote.textContent = cached.note;
                    return;
                }
            } catch (_) { /* no valid cache */ }

            new google.maps.DistanceMatrixService().getDistanceMatrix({
                origins: [departAddr],
                destinations: [arriveeAddr],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC
            }, function (response, status) {
                if (el.priceLoading) el.priceLoading.style.display = 'none';
                if (status === 'OK' && response.rows[0]?.elements[0]?.distance) {
                    const r = response.rows[0].elements[0];
                    const calc = calculatePriceWithDistanceImproved(vehicleKey, r.distance.value / 1000, r.duration.value / 60, selectedDate, selectedTime);
                    let detail = calc.base + '€ (base) + ' + calc.distance.toFixed(2) + '€ (distance) + ' + calc.duration.toFixed(2) + '€ (durée)';
                    if (calc.isPeakHours) detail += ' + majoration heures de pointe';
                    if (calc.isWeekend) detail += ' + majoration weekend';
                    detail += ' = ' + calc.total + '€';

                    el.priceResult.textContent = calc.total + '€';
                    if (el.priceDetails) {
                        el.priceDetails.innerHTML =
                            '<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.5rem;margin-top:0.75rem;padding-top:0.75rem;border-top:1px solid rgba(15,23,42,0.2)">' +
                            '<div style="text-align:center"><div style="color:#64748b;font-size:0.7rem;margin-bottom:0.25rem">Distance</div><div style="color:#0f172a;font-weight:600;font-size:0.9rem">' + calc.distanceKm + ' km</div></div>' +
                            '<div style="text-align:center"><div style="color:#64748b;font-size:0.7rem;margin-bottom:0.25rem">Durée</div><div style="color:#0f172a;font-weight:600;font-size:0.9rem">' + calc.durationMinutes + ' min</div></div>' +
                            '<div style="text-align:center"><div style="color:#64748b;font-size:0.7rem;margin-bottom:0.25rem">Base</div><div style="color:#0f172a;font-weight:600;font-size:0.9rem">' + calc.base + '€</div></div>' +
                            '<div style="text-align:center"><div style="color:#64748b;font-size:0.7rem;margin-bottom:0.25rem">Total</div><div style="color:#10b981;font-weight:700;font-size:0.9rem">' + calc.total + '€</div></div>' +
                            '</div>' +
                            ((calc.isPeakHours || calc.isWeekend) ?
                                '<div style="margin-top:0.5rem;padding:0.5rem;background:rgba(255,193,7,0.1);border-radius:6px;text-align:center"><div style="color:#856404;font-size:0.75rem">' +
                                (calc.isPeakHours ? '⏰ Majoration heures de pointe (+15%)' : '') +
                                (calc.isPeakHours && calc.isWeekend ? ' • ' : '') +
                                (calc.isWeekend ? '📅 Majoration weekend (+10%)' : '') +
                                '</div></div>' : '');
                    }
                    if (el.priceNote) el.priceNote.textContent = '* ' + detail;

                    try {
                        sessionStorage.setItem(cacheId, JSON.stringify({
                            price: calc.total,
                            details: el.priceDetails?.innerHTML || '',
                            note: el.priceNote?.textContent || '',
                            timestamp: Date.now()
                        }));
                    } catch (_) { /* quota */ }
                } else {
                    fallbackPrice(vehicleKey, el);
                }
            });
        } else {
            fallbackPrice(vehicleKey, el);
        }
    }, 400);
}
window.calculatePriceWithDistance = calculatePriceWithDistance;

function fallbackPrice(vehicleKey, el) {
    if (el.priceLoading) el.priceLoading.style.display = 'none';
    const v = SERVICE_PRICES[vehicleKey];
    const est = calculatePrice(vehicleKey, 2);
    el.priceResult.textContent = est + '€';
    if (el.priceDetails) el.priceDetails.textContent = 'Estimation basée sur 2h de transport';
    if (el.priceNote) el.priceNote.textContent = '* ' + v.basePrice + '€ (base) + 2h × 10€/h = ' + est + '€ (estimation)';
}

/* ===== Setup calculateur ===== */

let priceCalculatorInitialized = false;
function setupPriceCalculator() {
    const el = priceCalculatorCache.init();
    if (priceCalculatorInitialized) return;
    priceCalculatorInitialized = true;

    if (el.vehicle?.value) setTimeout(calculatePriceWithDistance, 100);

    const form = el.depart?.closest('.booking-form');
    const fields = ['depart', 'arrivee', 'vehicle', 'date', 'heure'];

    if (form) {
        form.addEventListener('input',  (e) => { if (fields.includes(e.target.id)) calculatePriceWithDistance(); }, { passive: true });
        form.addEventListener('change', (e) => { if (fields.includes(e.target.id)) calculatePriceWithDistance(); }, { passive: true });
        form.addEventListener('blur',   (e) => { if (e.target.id === 'depart' || e.target.id === 'arrivee') setTimeout(calculatePriceWithDistance, 200); }, { passive: true });
    }

    if (el.depart && el.arrivee) {
        new MutationObserver((mutations) => {
            mutations.forEach((m) => { if (m.attributeName === 'data-full-address') calculatePriceWithDistance(); });
        }).observe(el.depart,  { attributes: true, attributeFilter: ['data-full-address'] });
        new MutationObserver((mutations) => {
            mutations.forEach((m) => { if (m.attributeName === 'data-full-address') calculatePriceWithDistance(); });
        }).observe(el.arrivee, { attributes: true, attributeFilter: ['data-full-address'] });
    }
}
window.setupPriceCalculator = setupPriceCalculator;

/* ===== Service cards ===== */

function enhanceServiceCards() {
    Object.keys(SERVICE_PRICES).forEach((key) => {
        const card = document.querySelector('[data-vehicle="' + key + '"] .service-price');
        if (card) card.textContent = SERVICE_PRICES[key].label;
    });
}

/* ===== Date par défaut ===== */

function setDefaultBookingDate() {
    const dateInput = document.getElementById('date');
    if (!dateInput) return;
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value) dateInput.value = today;
}

/* ===== WhatsApp redirect ===== */

let whatsAppRateLimit = 0;
function redirectToWhatsApp() {
    if (whatsAppRateLimit > Date.now()) return;
    whatsAppRateLimit = Date.now() + 3000;

    const departInput  = document.getElementById('depart');
    const arriveeInput = document.getElementById('arrivee');
    const rawDepart  = departInput?.getAttribute('data-full-address') || departInput?.value.trim() || '';
    const rawArrivee = arriveeInput?.getAttribute('data-full-address') || arriveeInput?.value.trim() || '';
    const startAddress = typeof Sanitize !== 'undefined' ? Sanitize.sanitizeAddress(rawDepart) : rawDepart;
    const endAddress   = typeof Sanitize !== 'undefined' ? Sanitize.sanitizeAddress(rawArrivee) : rawArrivee;
    const date    = document.getElementById('date')?.value;
    const heure   = document.getElementById('heure')?.value;
    const vehicle = document.getElementById('vehicle')?.value || '';

    if (!startAddress || !endAddress || !date) {
        showErrorMessage('⚠️ Merci de remplir le départ, l\'arrivée et la date avant de réserver.');
        return;
    }
    if (date < new Date().toISOString().split('T')[0]) {
        showErrorMessage('⚠️ La date ne peut pas être dans le passé.');
        return;
    }

    const parts = [
        '🚛 Bonjour ! Je souhaite réserver un transport avec Moove City.',
        '',
        '📋 Détails de ma demande :',
        '📍 Départ : ' + startAddress,
        '📍 Arrivée : ' + endAddress,
        '📅 Date : ' + date,
        '🕐 Heure : ' + (heure || 'Dès que possible')
    ];
    if (vehicle) parts.push('🚛 Véhicule : ' + vehicle);
    parts.push('', 'Pouvez-vous me faire un devis personnalisé ? Merci !');

    window.open('https://wa.me/33751213255?text=' + encodeURIComponent(parts.join('\n')), '_blank');
}
window.redirectToWhatsApp = redirectToWhatsApp;

function showErrorMessage(message) {
    document.querySelector('.error-message')?.remove();
    const div = document.createElement('div');
    div.className = 'error-message';
    div.textContent = message;
    const form = document.querySelector('.booking-form');
    if (!form?.parentNode) return;
    form.parentNode.insertBefore(div, form.nextSibling);
    setTimeout(() => div.remove(), 5000);
}

/* ===== Google Places Autocomplete ===== */

function setupPlacesAutocomplete() {
    const departInput  = document.getElementById('depart');
    const arriveeInput = document.getElementById('arrivee');
    if (!departInput || !arriveeInput) return;
    if (departInput.getAttribute('data-autocomplete-initialized') === 'true') return;

    if (!(window.google && google.maps && google.maps.places)) {
        setTimeout(setupPlacesAutocomplete, 500);
        return;
    }

    function attachAutocomplete(input) {
        const autocomplete = new google.maps.places.Autocomplete(input, {
            types: ['address'],
            componentRestrictions: { country: 'fr' }
        });

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place && place.formatted_address) {
                input.value = place.formatted_address;
                input.setAttribute('data-full-address', place.formatted_address);
                if (window.calculatePriceWithDistance) {
                    setTimeout(window.calculatePriceWithDistance, 200);
                }
            }
        });
    }

    attachAutocomplete(departInput);
    attachAutocomplete(arriveeInput);
    departInput.setAttribute('data-autocomplete-initialized', 'true');
    arriveeInput.setAttribute('data-autocomplete-initialized', 'true');
}
window.setupPlacesAutocomplete = setupPlacesAutocomplete;

/* initScrollAnimations, initHeaderScrollBehaviour → moved to js/main.js */

/* ===== URL cleanup ===== */

if (window.location.pathname.includes('index.html')) {
    try {
        if (window.location.protocol !== 'file:') {
            window.history.replaceState({}, '', (window.location.pathname.replace(/index\.html$/, '') || '/') + window.location.search + window.location.hash);
        }
    } catch (_) { /* file:// */ }
}

/* initScrollToTop → moved to js/main.js */

/* ===== Sticky mobile footer ===== */

function initStickyMobileFooter() {
    const footer = document.getElementById('stickyMobileFooter');
    if (!footer) return;
    function update() {
        if (window.innerWidth >= 768) { footer.classList.remove('visible'); return; }
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        footer.classList.toggle('visible', scrollable > 0 && window.pageYOffset > scrollable * 0.2);
    }
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
}

/* ===== Hero video — lazy-loaded after window.load, desktop only ===== */

function initHeroVideo() {
    const video = document.querySelector('.hero-video');
    if (!video) return;

    if (window.innerWidth < 768) { video.remove(); return; }

    function loadAndPlay() {
        const source = video.querySelector('source[data-src]');
        if (source && !source.src) {
            source.src = source.getAttribute('data-src');
            source.removeAttribute('data-src');
            video.load();
        }
        video.play().catch(() => {});
    }

    video.addEventListener('error', () => { video.style.display = 'none'; });

    if (document.readyState === 'complete') setTimeout(loadAndPlay, 200);
    else window.addEventListener('load', () => setTimeout(loadAndPlay, 200));
}

/* ===== Google Maps — lazy-loaded on form focus ===== */

let mapsScriptInjected = false;
function ensureGoogleMaps() {
    if (mapsScriptInjected || window.google?.maps?.places) return;
    mapsScriptInjected = true;

    window.initGoogleMapsPlaces = function () {
        window.googleMapsLoaded = true;
        if (window.setupPlacesAutocomplete) setupPlacesAutocomplete();
        setTimeout(setupPriceCalculator, 200);
    };

    const s = document.createElement('script');
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBj-30c7SBJUcHHdw_hBT17jtH__NRz0L8&libraries=places,marker&loading=async&callback=initGoogleMapsPlaces';
    s.async = true;
    document.head.appendChild(s);
}

/* ===== Bootstrap ===== */

function initPriceCalculator() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(setupPriceCalculator, 100));
    } else {
        setTimeout(setupPriceCalculator, 100);
    }
}
initPriceCalculator();

if (window.initGoogleMapsPlaces) {
    const orig = window.initGoogleMapsPlaces;
    window.initGoogleMapsPlaces = function () { orig(); setTimeout(setupPriceCalculator, 200); };
}

/* ===== Pré-remplissage via paramètre ?city= ===== */
function prefillCityFromURL() {
    const params = new URLSearchParams(window.location.search);
    const city = params.get('city');
    if (!city) return;
    const decoded = decodeURIComponent(city);
    const depart = document.getElementById('depart');
    if (depart && !depart.value) {
        depart.value = decoded;
        depart.dispatchEvent(new Event('input', { bubbles: true }));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    prefillCityFromURL();
    enhanceServiceCards();
    setDefaultBookingDate();
    initStickyMobileFooter();
    initHeroVideo();

    const departInput = document.getElementById('depart');
    const arriveeInput = document.getElementById('arrivee');
    if (departInput) departInput.addEventListener('focus', ensureGoogleMaps, { once: true });
    if (arriveeInput) arriveeInput.addEventListener('focus', ensureGoogleMaps, { once: true });

    if (window.google?.maps?.places) {
        setupPlacesAutocomplete();
    }

    document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]').forEach((btn) => {
        btn.addEventListener('click', trackWhatsAppClick);
    });

    window.addEventListener('load', () => {
        const twemojiScript = document.createElement('script');
        twemojiScript.src = 'https://unpkg.com/twemoji@14.0.2/dist/twemoji.min.js';
        twemojiScript.crossOrigin = 'anonymous';
        twemojiScript.onload = () => { twemoji.parse(document.body, { folder: 'svg', ext: '.svg' }); };
        document.head.appendChild(twemojiScript);
    });
});
