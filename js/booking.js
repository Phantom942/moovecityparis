'use strict';

/* ===== Tracking Google Ads / Analytics ===== */

function trackBookingCall() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', { event_category: 'booking', event_label: 'Appel telephone booking', value: 1 });
    }
}

function trackBookingWhatsApp() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', { event_category: 'booking', event_label: 'WhatsApp booking', value: 1 });
    }
}

function redirectToWhatsAppBooking() {
    var vehicle = (document.getElementById('vehicle') || {}).value || '';
    var date = (document.getElementById('date') || {}).value || '';
    var departure = (document.getElementById('departure') || {}).value || '';
    var arrival = (document.getElementById('arrival') || {}).value || '';
    var time = (document.getElementById('time') || {}).value || '';
    var parts = ['Bonjour Moove City, je souhaite un devis'];
    if (vehicle) parts[0] += ' pour un camion ' + vehicle;
    if (date) parts.push('Date : ' + date);
    if (time) parts.push('Heure : ' + time);
    if (departure) parts.push('Depart : ' + departure);
    if (arrival) parts.push('Arrivee : ' + arrival);
    window.open('https://wa.me/33751213255?text=' + encodeURIComponent(parts.join('\n')), '_blank');
}

window.trackBookingCall = trackBookingCall;
window.trackBookingWhatsApp = trackBookingWhatsApp;
window.redirectToWhatsAppBooking = redirectToWhatsAppBooking;

/* ===== Auto-fill date / time ===== */

(function () {
    var dateInput = document.getElementById('date');
    if (dateInput) dateInput.valueAsDate = new Date();

    var now = new Date();
    now.setHours(now.getHours() + 1);
    var timeInput = document.getElementById('time');
    if (timeInput) timeInput.value = now.toTimeString().slice(0, 5);
})();

/* ===== Prix de base par véhicule ===== */

var VEHICLE_PRICES = {
    'URBAN':   { base: 40,  hourly: 18, perKm: 0.75 },
    'EXPRESS': { base: 50,  hourly: 22, perKm: 1.0  },
    'PREMIUM': { base: 60,  hourly: 26, perKm: 1.25 },
    'TITAN':   { base: 100, hourly: 32, perKm: 1.75 }
};

var MANUTENTION_FEE = 25;

var VEHICLE_ICONS = {
    'URBAN':   '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="1.5" class="w-10 h-7 text-emerald-600"><rect x="4" y="12" width="20" height="14" rx="2"/><path d="M24 14h12l4 6v6h-4"/><circle cx="10" cy="26" r="3"/><circle cx="38" cy="26" r="3"/></svg>',
    'EXPRESS': '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="1.5" class="w-11 h-7 text-emerald-600"><rect x="2" y="10" width="24" height="16" rx="2"/><path d="M26 12h14l2 4v8h-4"/><circle cx="8" cy="26" r="3"/><circle cx="40" cy="26" r="3"/></svg>',
    'PREMIUM': '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="1.5" class="w-12 h-8 text-emerald-600"><rect x="1" y="8" width="28" height="18" rx="2"/><path d="M29 10h16l2 5v7h-4"/><circle cx="7" cy="26" r="3"/><circle cx="41" cy="26" r="3"/></svg>',
    'TITAN':   '<svg viewBox="0 0 48 32" fill="none" stroke="currentColor" stroke-width="1.5" class="w-14 h-8 text-emerald-600"><rect x="0" y="6" width="32" height="20" rx="2"/><rect x="32" y="14" width="14" height="12" rx="1"/><path d="M34 14V10"/><circle cx="6" cy="26" r="3"/><circle cx="42" cy="26" r="3"/></svg>'
};

var EMPTY_ICON = '<svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>';

var calculatedDistance = null;
var distanceService = null;

/* ===== Calcul du prix ===== */

function calculatePrice(vehicle, duration, distance, manutention) {
    if (!vehicle || !duration) return null;
    var vehicleData = VEHICLE_PRICES[vehicle];
    if (!vehicleData) return null;

    var totalPrice = vehicleData.base + (duration * vehicleData.hourly);

    if (distance && distance > 0) {
        totalPrice += distance * vehicleData.perKm;
    }
    if (manutention) {
        totalPrice += MANUTENTION_FEE;
    }

    var dateInput = document.getElementById('date');
    if (dateInput && dateInput.value) {
        var selectedDate = new Date(dateInput.value);
        var dayOfWeek = selectedDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) totalPrice *= 1.1;
    }

    var timeInput = document.getElementById('time');
    if (timeInput && timeInput.value) {
        var hour = parseInt(timeInput.value.split(':')[0]);
        if ((hour >= 7 && hour < 9) || (hour >= 17 && hour < 19)) totalPrice *= 1.15;
    }

    return Math.round(totalPrice);
}

/* ===== Icône véhicule ===== */

function updateVehicleIcon() {
    var vehicleEl = document.getElementById('vehicle');
    if (!vehicleEl) return;
    var vehicle = vehicleEl.value;
    var iconContainer = document.getElementById('vehicleIcon');
    var priceIconContainer = document.getElementById('priceVehicleIcon');
    if (!iconContainer) return;

    var svg = vehicle && VEHICLE_ICONS[vehicle] ? VEHICLE_ICONS[vehicle] : EMPTY_ICON;
    iconContainer.innerHTML = svg;
    iconContainer.classList.toggle('opacity-50', !vehicle);
    iconContainer.classList.toggle('bg-emerald-50', !!vehicle);
    iconContainer.classList.toggle('bg-slate-100', !vehicle);

    if (priceIconContainer) {
        priceIconContainer.innerHTML = vehicle && VEHICLE_ICONS[vehicle] ? VEHICLE_ICONS[vehicle] : '';
    }
}

/* ===== Counter-up animation ===== */

function animateCounter(element, targetValue, duration) {
    duration = duration || 500;
    var start = parseInt(element.textContent) || 0;
    if (start === targetValue) return;
    var startTime = performance.now();
    function step(currentTime) {
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        element.textContent = Math.round(start + (targetValue - start) * eased);
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

/* ===== Distance entre adresses ===== */

function calculateDistanceBetweenAddresses(departure, arrival, callback) {
    if (!window.google || !window.google.maps || !window.google.maps.DistanceMatrixService) {
        callback(null);
        return;
    }
    if (!distanceService) {
        try { distanceService = new google.maps.DistanceMatrixService(); }
        catch (e) { callback(null); return; }
    }
    if (!departure || !arrival || departure.trim() === '' || arrival.trim() === '') {
        callback(null);
        return;
    }

    distanceService.getDistanceMatrix({
        origins: [departure],
        destinations: [arrival],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }, function (response, status) {
        if (status === 'OK' && response.rows[0] && response.rows[0].elements[0]) {
            var el = response.rows[0].elements[0];
            if (el.status === 'OK') {
                calculatedDistance = el.distance.value / 1000;
                callback(calculatedDistance);
            } else { callback(null); }
        } else { callback(null); }
    });
}

/* ===== Mise à jour du prix ===== */

function updatePriceDisplay() {
    var vehicleEl = document.getElementById('vehicle');
    var durationEl = document.getElementById('duration');
    if (!vehicleEl || !durationEl) return;
    var vehicle = vehicleEl.value;
    var duration = parseFloat(durationEl.value);
    var manutentionInput = document.querySelector('input[name="manutention"]:checked');
    var manutention = manutentionInput ? manutentionInput.value === 'oui' : false;
    var priceEstimateDiv = document.getElementById('priceEstimate');
    var priceValueSpan = document.getElementById('estimatedPriceValue');
    var priceDetailsDiv = document.getElementById('priceDetails');

    updateVehicleIcon();

    if (!vehicle || !duration || duration <= 0) {
        priceEstimateDiv.classList.add('hidden');
        return;
    }

    var price = calculatePrice(vehicle, duration, calculatedDistance, manutention);

    if (price) {
        animateCounter(priceValueSpan, price, 450);

        var vehicleData = VEHICLE_PRICES[vehicle];
        var details = 'Prix de base : ' + vehicleData.base + '\u20AC + ' + duration + 'h \u00D7 ' + vehicleData.hourly + '\u20AC/h';

        if (manutention) details += ' + manutention (' + MANUTENTION_FEE + '\u20AC)';
        if (calculatedDistance) {
            var distanceCost = Math.round(calculatedDistance * vehicleData.perKm);
            details += ' + ' + calculatedDistance.toFixed(1) + 'km (' + distanceCost + '\u20AC)';
        }

        var dateInput = document.getElementById('date');
        var timeInput = document.getElementById('time');
        var surcharges = [];
        if (dateInput && dateInput.value) {
            var sel = new Date(dateInput.value);
            if (sel.getDay() === 0 || sel.getDay() === 6) surcharges.push('Weekend (+10%)');
        }
        if (timeInput && timeInput.value) {
            var h = parseInt(timeInput.value.split(':')[0]);
            if ((h >= 7 && h < 9) || (h >= 17 && h < 19)) surcharges.push('Heures de pointe (+15%)');
        }
        if (surcharges.length > 0) details += ' | ' + surcharges.join(', ');

        priceDetailsDiv.textContent = details;
        priceEstimateDiv.classList.remove('hidden');
    } else {
        priceEstimateDiv.classList.add('hidden');
    }
}

/* ===== Setup calculateur de prix ===== */

function setupPriceCalculator() {
    var vehicleSelect = document.getElementById('vehicle');
    var durationInput = document.getElementById('duration');
    var departureInput = document.getElementById('departure');
    var arrivalInput = document.getElementById('arrival');
    var dateInput = document.getElementById('date');
    var timeInput = document.getElementById('time');

    if (vehicleSelect) vehicleSelect.addEventListener('change', function () { updateVehicleIcon(); updatePriceDisplay(); });
    if (durationInput) { durationInput.addEventListener('input', updatePriceDisplay); durationInput.addEventListener('change', updatePriceDisplay); }
    if (dateInput) dateInput.addEventListener('change', updatePriceDisplay);
    if (timeInput) timeInput.addEventListener('change', updatePriceDisplay);
    document.querySelectorAll('input[name="manutention"]').forEach(function (radio) {
        radio.addEventListener('change', updatePriceDisplay);
    });

    var distanceTimeout;
    function updateDistance() {
        clearTimeout(distanceTimeout);
        distanceTimeout = setTimeout(function () {
            var dep = departureInput ? departureInput.value.trim() : '';
            var arr = arrivalInput ? arrivalInput.value.trim() : '';
            if (dep && arr && dep.length > 5 && arr.length > 5) {
                if (window.google && window.google.maps && window.google.maps.DistanceMatrixService) {
                    calculateDistanceBetweenAddresses(dep, arr, function () { updatePriceDisplay(); });
                } else { calculatedDistance = null; updatePriceDisplay(); }
            } else { calculatedDistance = null; updatePriceDisplay(); }
        }, 800);
    }

    if (departureInput) { departureInput.addEventListener('blur', updateDistance); departureInput.addEventListener('change', updateDistance); }
    if (arrivalInput) { arrivalInput.addEventListener('blur', updateDistance); arrivalInput.addEventListener('change', updateDistance); }

    updateVehicleIcon();
    setTimeout(updatePriceDisplay, 500);
}

/* ===== Validation ===== */

function isValidEmail(email) {
    if (!email || typeof email !== 'string') return false;
    var trimmed = email.trim();
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return re.test(trimmed) && trimmed.length <= 254;
}

function isValidFrenchPhone(phone) {
    if (!phone || typeof phone !== 'string') return false;
    var digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return /^0[1-9]\d{8}$/.test(digits);
    if (digits.length === 11 && digits.startsWith('33')) return /^33[1-9]\d{8}$/.test(digits);
    return false;
}

function isValidDate(dateStr) {
    if (!dateStr) return false;
    var date = new Date(dateStr);
    if (isNaN(date.getTime())) return false;
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date >= today;
}

/* ===== Autocomplétion Google Places (booking) — API Data programmatique + dropdown ===== */

function initBookingPlacesAutocomplete() {
    if (!(window.google && google.maps)) return false;

    var departureInput = document.getElementById('departure');
    var arrivalInput = document.getElementById('arrival');
    if (!departureInput || !arrivalInput) return false;
    if (departureInput.getAttribute('data-autocomplete-initialized') === 'true') return true;

    if (!document.getElementById('gmp-autocomplete-dropdown-styles')) {
        var style = document.createElement('style');
        style.id = 'gmp-autocomplete-dropdown-styles';
        style.textContent = '.gmp-autocomplete-dropdown{position:absolute;left:0;right:0;top:100%;z-index:9999;background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.15);max-height:280px;overflow-y:auto;margin-top:4px}.gmp-autocomplete-dropdown[hidden]{display:none!important}.gmp-autocomplete-item{padding:10px 14px;cursor:pointer;font-size:14px;border-bottom:1px solid #f1f5f9}.gmp-autocomplete-item:last-child{border-bottom:none}.gmp-autocomplete-item:hover,.gmp-autocomplete-item:focus{background:#f8fafc}.gmp-autocomplete-wrapper{position:relative}';
        document.head.appendChild(style);
    }

    google.maps.importLibrary('places').then(function (lib) {
        var AutocompleteSessionToken = lib.AutocompleteSessionToken;
        var AutocompleteSuggestion = lib.AutocompleteSuggestion;
        if (!AutocompleteSessionToken || !AutocompleteSuggestion) return;

        function attachDataAutocomplete(input) {
            if (input.getAttribute('data-autocomplete-initialized') === 'true') return;
            input.setAttribute('data-autocomplete-initialized', 'true');

            var wrapper = input.parentNode;
            if (!wrapper.classList.contains('gmp-autocomplete-wrapper')) {
                var w = document.createElement('div');
                w.className = 'gmp-autocomplete-wrapper';
                input.parentNode.insertBefore(w, input);
                w.appendChild(input);
                wrapper = w;
            }
            var dropdown = document.createElement('div');
            dropdown.className = 'gmp-autocomplete-dropdown';
            dropdown.setAttribute('hidden', '');
            dropdown.setAttribute('role', 'listbox');
            wrapper.appendChild(dropdown);

            var sessionToken = new AutocompleteSessionToken();
            var debounceTimer;

            function refreshToken() { sessionToken = new AutocompleteSessionToken(); }
            function hideDropdown() {
                dropdown.setAttribute('hidden', '');
                dropdown.replaceChildren();
            }

            function showSuggestions(suggestions) {
                dropdown.replaceChildren();
                if (!suggestions || suggestions.length === 0) { hideDropdown(); return; }
                dropdown.removeAttribute('hidden');
                suggestions.forEach(function (s) {
                    var pred = s.placePrediction;
                    if (!pred) return;
                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'gmp-autocomplete-item';
                    btn.textContent = (pred.text && pred.text.toString) ? pred.text.toString() : (pred.text || '');
                    btn.setAttribute('role', 'option');
                    btn.addEventListener('click', function () {
                        var placePromise = typeof pred.toPlace === 'function' ? pred.toPlace() : pred.toPlace;
                        if (!placePromise || typeof placePromise.then !== 'function') return;
                        placePromise.then(function (place) {
                            return place.fetchFields({ fields: ['formattedAddress'] });
                        }).then(function (place) {
                            if (place && place.formattedAddress) {
                                input.value = place.formattedAddress;
                                input.setAttribute('data-full-address', place.formattedAddress);
                                input.dispatchEvent(new Event('input', { bubbles: true }));
                            }
                            refreshToken();
                            hideDropdown();
                        }).catch(function () { refreshToken(); hideDropdown(); });
                    });
                    dropdown.appendChild(btn);
                });
            }

            input.addEventListener('input', function () {
                clearTimeout(debounceTimer);
                var q = (input.value || '').trim();
                if (q.length < 2) { hideDropdown(); return; }
                debounceTimer = setTimeout(function () {
                    var request = {
                        input: q,
                        sessionToken: sessionToken,
                        includedRegionCodes: ['fr'],
                        includedPrimaryTypes: ['street_address', 'premise', 'subpremise', 'establishment']
                    };
                    AutocompleteSuggestion.fetchAutocompleteSuggestions(request).then(function (res) {
                        if (res && res.suggestions) showSuggestions(res.suggestions);
                        else hideDropdown();
                    }).catch(function () { hideDropdown(); });
                }, 300);
            });

            input.addEventListener('blur', function () { setTimeout(hideDropdown, 200); });
            input.addEventListener('focus', function () {
                var q = (input.value || '').trim();
                if (q.length >= 2 && dropdown.children.length) dropdown.removeAttribute('hidden');
            });
            document.addEventListener('click', function (e) {
                if (!wrapper.contains(e.target)) hideDropdown();
            });
        }

        attachDataAutocomplete(departureInput);
        attachDataAutocomplete(arrivalInput);
    }).catch(function () {});

    return true;
}

/* ===== Callback Google Maps ===== */

window.initBookingAutocomplete = function () {
    function tryInit() {
        if (initBookingPlacesAutocomplete()) {
            var departure = document.getElementById('departure');
            var arrival = document.getElementById('arrival');
            if (departure && arrival && departure.value.trim() && arrival.value.trim()) {
                setTimeout(function () {
                    calculateDistanceBetweenAddresses(departure.value.trim(), arrival.value.trim(), function () { updatePriceDisplay(); });
                }, 500);
            }
            return;
        }
        setTimeout(tryInit, 200);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () { setTimeout(tryInit, 300); });
    } else { setTimeout(tryInit, 300); }
};

window.initBookingPlacesAutocomplete = initBookingPlacesAutocomplete;

/* ===== Error display ===== */

function showErrorMessage(message, success) {
    var errorBox = document.getElementById('formError');
    if (!errorBox) return;
    errorBox.style.display = 'block';
    errorBox.style.background = success ? '#ecfdf5' : '#fee2e2';
    errorBox.style.borderColor = success ? '#6ee7b7' : '#fca5a5';
    errorBox.style.color = success ? '#047857' : '#b91c1c';
    errorBox.textContent = message;
    errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (success) setTimeout(function () { errorBox.style.display = 'none'; }, 4000);
}

/* ===== Bootstrap ===== */

setupPriceCalculator();

(function () {
    function pollGoogleMaps() {
        var checkCount = 0;
        var checkInterval = setInterval(function () {
            checkCount++;
            if (window.google && window.google.maps) {
                clearInterval(checkInterval);
                initBookingPlacesAutocomplete();
            } else if (checkCount >= 25) {
                clearInterval(checkInterval);
            }
        }, 200);
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', pollGoogleMaps);
    } else { pollGoogleMaps(); }
})();
