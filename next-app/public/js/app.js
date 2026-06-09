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

/* Utilisation de var + garde globale pour éviter l'erreur
   \"Identifier 'SERVICE_PRICES' has already been declared\"
   lorsque le script est évalué plusieurs fois (dev / HMR). */
var SERVICE_PRICES = (typeof window !== 'undefined' && window.SERVICE_PRICES) || {
    urban:   { label: 'À partir de 40€',  basePrice: 40,  pricePerKm: 0.75, pricePerHour: 18, minPrice: 40  },
    express: { label: 'À partir de 50€',  basePrice: 50,  pricePerKm: 1.0,  pricePerHour: 22, minPrice: 50  },
    premium: { label: 'À partir de 70€',  basePrice: 70,  pricePerKm: 1.25, pricePerHour: 26, minPrice: 70  },
    titan:   { label: 'À partir de 110€', basePrice: 110, pricePerKm: 1.75, pricePerHour: 32, minPrice: 110 }
};
if (typeof window !== 'undefined') {
    window.SERVICE_PRICES = SERVICE_PRICES;
}

function calculatePrice(vehicleKey, durationHours) {
    if (!vehicleKey || !durationHours) return null;
    const v = SERVICE_PRICES[vehicleKey];
    if (!v) return null;
    return Math.max(Math.round(v.basePrice + durationHours * v.pricePerHour), v.minPrice);
}
window.calculatePrice = calculatePrice;

/* ===== Rendu UI prix : 0€ -> fourchette réaliste ===== */

var PRICE_RANGES = {
    urban: { min: 39, max: 69 },
    express: { min: 59, max: 99 },
    premium: { min: 69, max: 129 },
    titan: { min: 99, max: 189 }
};

function getIndicativeRange(vehicleKey) {
    var key = (vehicleKey || "").toLowerCase();
    return PRICE_RANGES[key] || { min: 49, max: 99 };
}

function renderPriceSection(calculatedPrice, vehicleKey, el, breakdownText) {
    var range = getIndicativeRange(vehicleKey);
    var hasValidPrice = calculatedPrice && calculatedPrice > 0;

    if (el.priceResult) {
        el.priceResult.textContent = hasValidPrice
            ? calculatedPrice + "€"
            : "De " + range.min + "€ à " + range.max + "€";
    }

    if (el.priceNote) {
        el.priceNote.textContent = hasValidPrice
            ? "TTC · Tarif Ferme"
            : "TTC (Selon distance exacte et manutention)";
    }

    if (el.priceDetails) {
        var phone = "33751213255";
        var waText = hasValidPrice
            ? "Bonjour, je souhaite valider mon devis Moove City. Tarif estimé : " + calculatedPrice + "€"
            : "Bonjour, je souhaite valider mon devis Moove City. Tarif estimé : de " + range.min + "€ à " + range.max + "€";
        var waUrl = "https://wa.me/" + phone + "?text=" + encodeURIComponent(waText);

        var breakdownHtml = breakdownText
            ? '<div style="margin-top:8px;color:#64748b;font-size:0.82rem;text-align:center;">' + breakdownText + "</div>"
            : "";

        // WhatsApp uniquement “question / échange” (pas un CTA principal).
        el.priceDetails.innerHTML =
            '<div style="margin-top:12px;display:flex;flex-direction:column;gap:10px;align-items:center;">' +
                '<button type="button" onclick="if (window.handleCheckout) window.handleCheckout();" ' +
                    'style="width:100%;max-width:320px;background:#2563eb;color:#fff;font-weight:800;padding:12px 16px;border:none;border-radius:12px;cursor:pointer;box-shadow:0 8px 22px rgba(37,99,235,0.18);">' +
                    "Valider et Réserver ma course" +
                "</button>" +
                '<a href="' + waUrl + '" target="_blank" rel="noopener noreferrer" ' +
                    'style="width:100%;max-width:320px;display:flex;justify-content:center;align-items:center;gap:8px;background:#ecfdf5;color:#047857;border:1px solid rgba(5,150,105,0.25);font-weight:800;padding:10px 14px;border-radius:12px;text-decoration:none;font-size:0.85rem;">' +
                    "Une question ? Échanger sur WhatsApp" +
                "</a>" +
                breakdownHtml +
            "</div>";
    }
}

window.handleCheckout = function () {
    window.location.href = "/booking";
};

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

var priceCalculatorCache = (typeof window !== 'undefined' && window.priceCalculatorCache) || {
    elements: null,
    init: function() {
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
if (typeof window !== 'undefined') window.priceCalculatorCache = priceCalculatorCache;

let priceCalculationTimeout;
function calculatePriceWithDistance() {
    clearTimeout(priceCalculationTimeout);
    priceCalculationTimeout = setTimeout(() => {
        const el = priceCalculatorCache.init();
        if (!el.depart || !el.arrivee || !el.vehicle || !el.calculator || !el.priceResult) return;

        /* Toujours la valeur du champ : data-full-address ne doit pas masquer une saisie modifiée */
        const departAddr  = el.depart.value.trim() || el.depart.getAttribute('data-full-address') || '';
        const arriveeAddr = el.arrivee.value.trim() || el.arrivee.getAttribute('data-full-address') || '';
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
            renderPriceSection(null, vehicleKey, el);
            return;
        }

        const cacheKey = departAddr + '|' + arriveeAddr + '|' + vehicleKey + '|' + (selectedDate || '') + '|' + (selectedTime || '');

        if (typeof google !== 'undefined' && google.maps?.DistanceMatrixService) {
            const cacheId = 'priceCalc_' + btoa(cacheKey).substring(0, 50);
            try {
                const cached = JSON.parse(sessionStorage.getItem(cacheId));
                if (cached && cached.price > 0 && Date.now() - cached.timestamp < 300000) {
                    if (el.priceLoading) el.priceLoading.style.display = 'none';
                    renderPriceSection(cached.price, vehicleKey, el);
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
                    if (!calc || !calc.total || calc.total <= 0) {
                        fallbackPrice(vehicleKey, el);
                        return;
                    }
                    let detail = calc.base + '€ (base) + ' + calc.distance.toFixed(2) + '€ (distance) + ' + calc.duration.toFixed(2) + '€ (durée)';
                    if (calc.isPeakHours) detail += ' + majoration heures de pointe';
                    if (calc.isWeekend) detail += ' + majoration weekend';
                    detail += ' = ' + calc.total + '€';

                    renderPriceSection(calc.total, vehicleKey, el, detail);

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
    renderPriceSection(null, vehicleKey, el);
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
        function clearStaleFullAddress(input) {
            input.addEventListener('input', function () {
                var full = input.getAttribute('data-full-address');
                if (full != null && input.value.trim() !== full) {
                    input.removeAttribute('data-full-address');
                }
            }, { passive: true });
        }
        clearStaleFullAddress(el.depart);
        clearStaleFullAddress(el.arrivee);
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
    const rawDepart  = departInput?.value.trim() || departInput?.getAttribute('data-full-address') || '';
    const rawArrivee = arriveeInput?.value.trim() || arriveeInput?.getAttribute('data-full-address') || '';
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

/* ===== Google Places — widget legacy + API Data (liste .moove-places-dd) + repli web component ===== */

function legacyPlaceFormattedAddress(place) {
    if (!place) return '';
    if (place.formatted_address) return String(place.formatted_address);
    if (place.formattedAddress) return String(place.formattedAddress);
    if (place.name) return String(place.name);
    var dn = place.displayName;
    if (dn != null) {
        if (typeof dn === 'string') return dn;
        if (typeof dn === 'object' && dn.text) return String(dn.text);
    }
    return '';
}

/** Libellé affiché pour une PlacePrediction (formats string, LocalizedText, mainText/secondaryText). */
function moovePlacesPredictionLabel(pred) {
    if (!pred) return '';
    function loc(x) {
        if (x == null) return '';
        if (typeof x === 'string') return x;
        if (typeof x === 'object' && x.text != null) return String(x.text);
        if (typeof x.toString === 'function') return String(x.toString());
        return '';
    }
    var full = loc(pred.text);
    if (full) return full;
    var main = loc(pred.mainText);
    var sec = loc(pred.secondaryText);
    if (main && sec) return main + ', ' + sec;
    return main || sec;
}

function mooveInjectDataDropdownStyles() {
    if (document.getElementById('moove-places-data-dd-styles')) return;
    var style = document.createElement('style');
    style.id = 'moove-places-data-dd-styles';
    style.textContent = '.moove-places-wrap{position:relative;z-index:50}.moove-places-dd{position:fixed;z-index:2147483647;background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 8px 24px rgba(0,0,0,.12);max-height:min(280px,40vh);overflow-y:auto;margin:0;min-width:200px}.moove-places-dd[hidden]{display:none!important}.moove-places-dd-item{display:block;width:100%;text-align:left;padding:10px 14px;border:none;border-bottom:1px solid #f1f5f9;background:#fff;cursor:pointer;font-size:14px;color:#0f172a;font-family:inherit}.moove-places-dd-item:last-child{border-bottom:none}.moove-places-dd-item:hover{background:#f8fafc}';
    document.head.appendChild(style);
}

/** Web component recommandé par Google pour les comptes créés après mars 2025 (évite Autocomplete legacy). */
function mooveAttachPlaceAutocompleteElementImpl(input, onResolved, formatPlaceFn, Pel) {
    if (input.getAttribute('data-autocomplete-initialized') === 'true') return;
    if (!Pel || typeof Pel !== 'function') return;
    input.setAttribute('data-autocomplete-initialized', 'true');
    var el = new Pel({ includedRegionCodes: ['fr'] });
    el.classList.add('gmp-place-autocomplete-moove');
    if (input.placeholder) el.setAttribute('placeholder', input.placeholder);
    input.style.display = 'none';
    input.parentNode.insertBefore(el, input.nextSibling);
    el.addEventListener('gmp-select', function (ev) {
        var pp = ev.placePrediction;
        if (!pp || typeof pp.toPlace !== 'function') return;
        pp.toPlace().then(function (place) {
            return place.fetchFields({ fields: ['formattedAddress', 'displayName'] });
        }).then(function (place) {
            var addr = formatPlaceFn(place);
            if (addr) {
                input.value = addr;
                input.setAttribute('data-full-address', addr);
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                if (onResolved) onResolved();
            }
        }).catch(function () {});
    });
}

function mooveAttachPlaceAutocompleteElement(input, onResolved) {
    if (input.getAttribute('data-autocomplete-initialized') === 'true') return;
    google.maps.importLibrary('places').then(function (lib) {
        var Pel = (lib && lib.PlaceAutocompleteElement) ||
            (google.maps.places && google.maps.places.PlaceAutocompleteElement);
        mooveAttachPlaceAutocompleteElementImpl(input, onResolved, legacyPlaceFormattedAddress, Pel);
    }).catch(function () {});
}

/** API Data en priorité (champs natifs + liste blanche) ; repli PlaceAutocompleteElement. */
function mooveAttachPlacesDataAutocomplete(input, onResolved, formatPlaceFn) {
    formatPlaceFn = formatPlaceFn || legacyPlaceFormattedAddress;
    if (input.getAttribute('data-autocomplete-initialized') === 'true') return;
    if (input.getAttribute('data-autocomplete-pending') === 'true') return;
    input.setAttribute('data-autocomplete-pending', 'true');

    google.maps.importLibrary('places').then(function (lib) {
        var AutocompleteSessionToken = lib.AutocompleteSessionToken;
        var AutocompleteSuggestion = lib.AutocompleteSuggestion;
        if (AutocompleteSessionToken && AutocompleteSuggestion) {
        input.removeAttribute('data-autocomplete-pending');
        mooveInjectDataDropdownStyles();
        input.setAttribute('data-autocomplete-initialized', 'true');

        var wrap = input.parentNode;
        if (!wrap.classList.contains('moove-places-wrap')) {
            var w = document.createElement('div');
            w.className = 'moove-places-wrap';
            input.parentNode.insertBefore(w, input);
            w.appendChild(input);
            wrap = w;
        }

        var dropdown = document.createElement('div');
        dropdown.className = 'moove-places-dd';
        dropdown.setAttribute('hidden', '');
        dropdown.setAttribute('role', 'listbox');
        document.body.appendChild(dropdown);

        var sessionToken = new AutocompleteSessionToken();
        var debounceTimer;

        function refreshToken() {
            sessionToken = new AutocompleteSessionToken();
        }

        function positionDropdown() {
            if (dropdown.hasAttribute('hidden')) return;
            var r = input.getBoundingClientRect();
            dropdown.style.left = Math.max(8, r.left) + 'px';
            dropdown.style.top = (r.bottom + 4) + 'px';
            dropdown.style.width = r.width + 'px';
        }

        function hideDropdown() {
            dropdown.setAttribute('hidden', '');
            dropdown.replaceChildren();
        }

        function showSuggestions(suggestions) {
            dropdown.replaceChildren();
            if (!suggestions || suggestions.length === 0) {
                hideDropdown();
                return;
            }
            dropdown.removeAttribute('hidden');
            positionDropdown();
            suggestions.forEach(function (s) {
                var pred = s.placePrediction;
                if (!pred && s && typeof s.toPlace === 'function') pred = s;
                if (!pred) return;
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'moove-places-dd-item';
                btn.textContent = moovePlacesPredictionLabel(pred);
                btn.setAttribute('role', 'option');
                btn.addEventListener('mousedown', function (e) {
                    e.preventDefault();
                });
                btn.addEventListener('click', function () {
                    var placePromise = typeof pred.toPlace === 'function' ? pred.toPlace() : null;
                    if (!placePromise || typeof placePromise.then !== 'function') return;
                    placePromise.then(function (place) {
                        return place.fetchFields({ fields: ['formattedAddress', 'displayName'] });
                    }).then(function (place) {
                        var addr = formatPlaceFn(place);
                        if (addr) {
                            input.value = addr;
                            input.setAttribute('data-full-address', addr);
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                            input.dispatchEvent(new Event('change', { bubbles: true }));
                            if (onResolved) onResolved();
                        }
                        refreshToken();
                        hideDropdown();
                    }).catch(function () {
                        refreshToken();
                        hideDropdown();
                    });
                });
                dropdown.appendChild(btn);
            });
        }

        input.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            var q = (input.value || '').trim();
            if (q.length < 2) {
                hideDropdown();
                return;
            }
            debounceTimer = setTimeout(function () {
                AutocompleteSuggestion.fetchAutocompleteSuggestions({
                    input: q,
                    sessionToken: sessionToken,
                    includedRegionCodes: ['fr']
                }).then(function (res) {
                    var list = res && res.suggestions ? res.suggestions : (Array.isArray(res) ? res : null);
                    if (list && list.length) showSuggestions(list);
                    else hideDropdown();
                }).catch(function () {
                    hideDropdown();
                });
            }, 250);
        });

        input.addEventListener('blur', function () {
            setTimeout(hideDropdown, 200);
        });

        function onDocClick(e) {
            if (e.target !== input && !dropdown.contains(e.target)) hideDropdown();
        }
        document.addEventListener('click', onDocClick);
        window.addEventListener('scroll', positionDropdown, true);
        window.addEventListener('resize', positionDropdown);
        return;
        }

        var Pel = (lib && lib.PlaceAutocompleteElement) ||
            (google.maps.places && google.maps.places.PlaceAutocompleteElement);
        input.removeAttribute('data-autocomplete-pending');
        if (Pel && typeof Pel === 'function') {
            mooveAttachPlaceAutocompleteElementImpl(input, onResolved, formatPlaceFn, Pel);
            return;
        }

        console.warn('Moove City: Places — API Data et PlaceAutocompleteElement indisponibles.');
    }).catch(function (err) {
        input.removeAttribute('data-autocomplete-pending');
        console.warn('Moove City: importLibrary(places)', err);
    });
}

function setupAddressAutocompleteHome() {
    if (!window.mooveSetupAddressFields) return;
    window.mooveSetupAddressFields([
        {
            id: 'depart',
            onSelect: function () {
                if (window.calculatePriceWithDistance) setTimeout(window.calculatePriceWithDistance, 200);
            }
        },
        {
            id: 'arrivee',
            onSelect: function () {
                if (window.calculatePriceWithDistance) setTimeout(window.calculatePriceWithDistance, 200);
            }
        }
    ]);
}
window.setupAddressAutocompleteHome = setupAddressAutocompleteHome;

function setupPlacesAutocomplete() {
    var departInput  = document.getElementById('depart');
    var arriveeInput = document.getElementById('arrivee');
    if (!departInput || !arriveeInput) return;
    if (departInput.getAttribute('data-autocomplete-initialized') === 'true' &&
        arriveeInput.getAttribute('data-autocomplete-initialized') === 'true') {
        return;
    }

    if (!(window.google && google.maps)) {
        setTimeout(setupPlacesAutocomplete, 500);
        return;
    }

    function onPick() {
        if (window.calculatePriceWithDistance) {
            setTimeout(window.calculatePriceWithDistance, 200);
        }
    }

    function bindAutocomplete(input) {
        if (input.getAttribute('data-autocomplete-initialized') === 'true') return;
        if (input.getAttribute('data-address-autocomplete') === 'true') return;
        mooveAttachPlacesDataAutocomplete(input, onPick, legacyPlaceFormattedAddress);
    }

    bindAutocomplete(departInput);
    bindAutocomplete(arriveeInput);
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

/* Permet d’appeler depuis React/Next si le script charge après DOMContentLoaded */
window.initHeroVideo = initHeroVideo;

/* ===== Google Maps — lazy-loaded on form focus ===== */

let mapsScriptInjected = false;
function ensureGoogleMaps() {
    if (window.google && window.google.maps) {
        mapsScriptInjected = true;
        if (window.setupPlacesAutocomplete) setupPlacesAutocomplete();
        setTimeout(setupPriceCalculator, 200);
        return;
    }
    if (mapsScriptInjected) return;
    mapsScriptInjected = true;

    window.initGoogleMapsPlaces = function () {
        window.googleMapsLoaded = true;
        if (window.setupPlacesAutocomplete) setupPlacesAutocomplete();
        setTimeout(setupPriceCalculator, 200);
    };

    const s = document.createElement('script');
    s.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBj-30c7SBJUcHHdw_hBT17jtH__NRz0L8&libraries=places,marker&loading=async&callback=initGoogleMapsPlaces';
    s.async = false;
    s.defer = true;
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

document.addEventListener('DOMContentLoaded', runPageInit);
/* Si le script charge après que le DOM est prêt (ex. Next.js avec script injecté en defer) */
if (document.readyState !== 'loading') runPageInit();

function runPageInit() {
    prefillCityFromURL();
    enhanceServiceCards();
    setDefaultBookingDate();
    initStickyMobileFooter();
    initHeroVideo();
    setupAddressAutocompleteHome();

    // Le bloc “prix” contient déjà le bouton de validation : on évite les doublons.
    var externalPayBtn = document.getElementById('cta-pay-confirm');
    if (externalPayBtn) externalPayBtn.style.display = 'none';

    var departInput = document.getElementById('depart');
    var arriveeInput = document.getElementById('arrivee');
    if (departInput) departInput.addEventListener('focus', ensureGoogleMaps, { once: true });
    if (arriveeInput) arriveeInput.addEventListener('focus', ensureGoogleMaps, { once: true });

    if (window.google && window.google.maps) {
        setupPlacesAutocomplete();
    }

    document.querySelectorAll('.whatsapp-btn, a[href*="wa.me"]').forEach(function(btn) {
        btn.addEventListener('click', trackWhatsAppClick);
    });

    window.addEventListener('load', function() {
        var twemojiScript = document.createElement('script');
        twemojiScript.src = 'https://unpkg.com/twemoji@14.0.2/dist/twemoji.min.js';
        twemojiScript.crossOrigin = 'anonymous';
        twemojiScript.onload = function() { if (window.twemoji) twemoji.parse(document.body, { folder: 'svg', ext: '.svg' }); };
        document.head.appendChild(twemojiScript);
    });
}
