'use strict';

/**
 * Suggestions d'adresses via l'API BAN (api-adresse.data.gouv.fr).
 * Fonctionne sans clé API, idéal pour la France (Paris & IDF).
 */
(function () {
    var BAN_API = 'https://api-adresse.data.gouv.fr/search/';
    var STYLE_ID = 'moove-address-dd-styles';

    function injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        var style = document.createElement('style');
        style.id = STYLE_ID;
        style.textContent =
            '.moove-address-wrap{position:relative;z-index:50}' +
            '.moove-address-dd{position:fixed;z-index:2147483647;background:#fff;border:1px solid #e2e8f0;border-radius:10px;box-shadow:0 10px 28px rgba(15,23,42,.14);max-height:min(280px,45vh);overflow-y:auto;margin:0;min-width:220px}' +
            '.moove-address-dd[hidden]{display:none!important}' +
            '.moove-address-dd-item{display:block;width:100%;text-align:left;padding:11px 14px;border:none;border-bottom:1px solid #f1f5f9;background:#fff;cursor:pointer;font-size:14px;line-height:1.35;color:#0f172a;font-family:inherit}' +
            '.moove-address-dd-item:last-child{border-bottom:none}' +
            '.moove-address-dd-item:hover,.moove-address-dd-item:focus{background:#f0fdf4;outline:none}' +
            '.moove-address-dd-item strong{display:block;font-weight:600;color:#0f172a}' +
            '.moove-address-dd-item span{display:block;font-size:12px;color:#64748b;margin-top:2px}' +
            '.moove-address-dd-loading{padding:12px 14px;font-size:13px;color:#64748b;text-align:center}';
        document.head.appendChild(style);
    }

    function wrapInput(input) {
        var parent = input.parentNode;
        if (parent && parent.classList.contains('moove-address-wrap')) return parent;
        var wrap = document.createElement('div');
        wrap.className = 'moove-address-wrap';
        parent.insertBefore(wrap, input);
        wrap.appendChild(input);
        return wrap;
    }

    function fetchSuggestions(query, callback) {
        var url = BAN_API + '?q=' + encodeURIComponent(query) + '&limit=6&autocomplete=1';
        fetch(url, { method: 'GET', headers: { Accept: 'application/json' } })
            .then(function (res) {
                if (!res.ok) throw new Error('BAN ' + res.status);
                return res.json();
            })
            .then(function (data) {
                var features = (data && data.features) || [];
                callback(null, features.map(function (f) {
                    var p = f.properties || {};
                    return {
                        label: p.label || '',
                        name: p.name || '',
                        city: p.city || '',
                        postcode: p.postcode || ''
                    };
                }).filter(function (item) { return item.label; }));
            })
            .catch(function () {
                callback(new Error('fetch'), []);
            });
    }

    /**
     * @param {HTMLInputElement} input
     * @param {function(): void} [onSelect]
     */
    function mooveAttachAddressAutocomplete(input, onSelect) {
        if (!input || input.getAttribute('data-address-autocomplete') === 'true') return;
        input.setAttribute('data-address-autocomplete', 'true');
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('role', 'combobox');
        input.setAttribute('aria-autocomplete', 'list');
        input.setAttribute('aria-expanded', 'false');

        injectStyles();
        wrapInput(input);

        var dropdown = document.createElement('div');
        dropdown.className = 'moove-address-dd';
        dropdown.setAttribute('hidden', '');
        dropdown.setAttribute('role', 'listbox');
        document.body.appendChild(dropdown);

        var debounceTimer;
        var requestId = 0;
        var listId = 'moove-addr-list-' + Math.random().toString(36).slice(2, 9);
        dropdown.id = listId;
        input.setAttribute('aria-controls', listId);

        function positionDropdown() {
            if (dropdown.hasAttribute('hidden')) return;
            var r = input.getBoundingClientRect();
            dropdown.style.left = Math.max(8, r.left) + 'px';
            dropdown.style.top = (r.bottom + 4) + 'px';
            dropdown.style.width = Math.max(r.width, 220) + 'px';
        }

        function hideDropdown() {
            dropdown.setAttribute('hidden', '');
            dropdown.replaceChildren();
            input.setAttribute('aria-expanded', 'false');
        }

        function selectAddress(label) {
            input.value = label;
            input.setAttribute('data-full-address', label);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            hideDropdown();
            if (typeof onSelect === 'function') onSelect();
        }

        function showLoading() {
            dropdown.replaceChildren();
            dropdown.removeAttribute('hidden');
            var loading = document.createElement('div');
            loading.className = 'moove-address-dd-loading';
            loading.textContent = 'Recherche d\u2019adresses\u2026';
            dropdown.appendChild(loading);
            positionDropdown();
            input.setAttribute('aria-expanded', 'true');
        }

        function showSuggestions(items) {
            dropdown.replaceChildren();
            if (!items || items.length === 0) {
                hideDropdown();
                return;
            }
            dropdown.removeAttribute('hidden');
            input.setAttribute('aria-expanded', 'true');
            items.forEach(function (item) {
                var btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'moove-address-dd-item';
                btn.setAttribute('role', 'option');
                var main = item.name || item.label.split(',')[0];
                var sub = item.postcode && item.city ? (item.postcode + ' ' + item.city) : item.label;
                btn.innerHTML = '<strong>' + escapeHtml(main) + '</strong><span>' + escapeHtml(sub) + '</span>';
                btn.addEventListener('mousedown', function (e) { e.preventDefault(); });
                btn.addEventListener('click', function () { selectAddress(item.label); });
                dropdown.appendChild(btn);
            });
            positionDropdown();
        }

        input.addEventListener('input', function () {
            clearTimeout(debounceTimer);
            var q = (input.value || '').trim();
            input.removeAttribute('data-full-address');
            if (q.length < 2) {
                hideDropdown();
                return;
            }
            debounceTimer = setTimeout(function () {
                var currentRequest = ++requestId;
                showLoading();
                fetchSuggestions(q, function (_err, items) {
                    if (currentRequest !== requestId) return;
                    showSuggestions(items);
                });
            }, 220);
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') hideDropdown();
        });

        input.addEventListener('blur', function () {
            setTimeout(hideDropdown, 180);
        });

        function onDocClick(e) {
            if (e.target !== input && !dropdown.contains(e.target)) hideDropdown();
        }
        document.addEventListener('click', onDocClick);
        window.addEventListener('scroll', positionDropdown, true);
        window.addEventListener('resize', positionDropdown);
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    }

    function mooveSetupAddressFields(pairs) {
        pairs.forEach(function (pair) {
            var input = document.getElementById(pair.id);
            if (input) mooveAttachAddressAutocomplete(input, pair.onSelect);
        });
    }

    window.mooveAttachAddressAutocomplete = mooveAttachAddressAutocomplete;
    window.mooveSetupAddressFields = mooveSetupAddressFields;
})();
