/**
 * sanitize.js - Sanitization stricte des entrées utilisateur
 * Protection XSS, injection et validation des formulaires
 */
(function(global) {
    'use strict';

    const ENTITY_MAP = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;'
    };

    function escapeHtml(str) {
        if (str == null || typeof str !== 'string') return '';
        return String(str).replace(/[&<>"'/]/g, function(s) { return ENTITY_MAP[s]; });
    }

    /**
     * Sanitize une chaîne texte (nom, message, adresse)
     * - Échappe les caractères HTML
     * - Limite la longueur
     * - Supprime les caractères de contrôle
     */
    function sanitizeString(input, maxLength) {
        if (input == null) return '';
        let s = String(input).trim();
        s = s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
        s = s.slice(0, maxLength || 500);
        return s;
    }

    /**
     * Sanitize pour affichage (échappe HTML)
     */
    function sanitizeForDisplay(input) {
        return escapeHtml(sanitizeString(input, 1000));
    }

    /**
     * Sanitize le nom (lettres, espaces, traits d'union, apostrophes)
     */
    function sanitizeName(input) {
        const s = sanitizeString(input, 100);
        return s.replace(/[^\p{L}\p{N}\s\-'.]/gu, '');
    }

    /**
     * Sanitize le téléphone (chiffres, +, espaces)
     */
    function sanitizePhone(input) {
        if (input == null) return '';
        return String(input).replace(/[^\d+\s]/g, '').slice(0, 20);
    }

    /**
     * Sanitize l'email (validation + format)
     */
    function sanitizeEmail(input) {
        const s = sanitizeString(input, 254);
        const emailRe = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
        return emailRe.test(s) ? s : '';
    }

    /**
     * Sanitize une date ISO (YYYY-MM-DD)
     */
    function sanitizeDate(input) {
        if (input == null) return '';
        const s = String(input).trim();
        if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return '';
        const d = new Date(s);
        return isNaN(d.getTime()) ? '' : s;
    }

    /**
     * Sanitize un message/description (texte long)
     */
    function sanitizeMessage(input) {
        const s = sanitizeString(input, 2000);
        return s.replace(/[<>]/g, '');
    }

    /**
     * Sanitize une adresse pour envoi (texte brut, pas d'HTML)
     */
    function sanitizeAddress(input) {
        return sanitizeString(input, 200).replace(/[<>]/g, '');
    }

    /**
     * Sanitize une adresse pour affichage DOM (échappe HTML)
     */
    function sanitizeAddressForDisplay(input) {
        return sanitizeForDisplay(sanitizeString(input, 200));
    }

    global.Sanitize = {
        escapeHtml,
        sanitizeString,
        sanitizeForDisplay,
        sanitizeName,
        sanitizePhone,
        sanitizeEmail,
        sanitizeDate,
        sanitizeMessage,
        sanitizeAddress,
        sanitizeAddressForDisplay
    };
})(typeof window !== 'undefined' ? window : this);
