/**
 * structured-data-reviews.js
 * Injecte les données structurées Review + AggregateRating pour Moove City
 * Compatible HTML statique - à inclure dans les pages concernées
 * 
 * Configuration ajustable ci-dessous
 */
(function() {
    'use strict';

    const CONFIG = {
        ratingValue: 4.9,
        reviewCount: 50,
        bestRating: 5,
        worstRating: 1,
        address: {
            streetAddress: '',        // À compléter si adresse physique connue (ex: "12 rue Example, 75011 Paris")
            addressLocality: 'Paris',
            addressRegion: 'Île-de-France',
            postalCode: '75000',      // Générique Paris - adapter au besoin
            addressCountry: 'FR'
        },
        businessName: 'Moove City',
        businessUrl: 'https://www.moovecity.fr/'
    };

    // Exemples d'avis (à remplacer par de vrais avis clients)
    const SAMPLE_REVIEWS = [
        { author: 'Marie L.', date: '2025-01-15', body: 'Livraison express parfaite. Équipe ponctuelle et professionnelle. Je recommande vivement Moove City.', rating: 5 },
        { author: 'Thomas D.', date: '2025-01-10', body: 'Déménagement studio réalisé en 2h. Prix respecté, service impeccable.', rating: 5 },
        { author: 'Sophie M.', date: '2025-01-05', body: 'Très bon rapport qualité-prix. Intervention dans l\'heure comme promis.', rating: 5 },
        { author: 'Pierre K.', date: '2024-12-28', body: 'Service fiable pour nos livraisons B2B. Chauffeurs toujours à l\'heure.', rating: 5 },
        { author: 'Claire R.', date: '2024-12-20', body: 'Quelques minutes de retard mais expliqué. Sinon très satisfaite du transport.', rating: 4 }
    ];

    function buildSchema() {
        const address = {
            '@type': 'PostalAddress',
            addressLocality: CONFIG.address.addressLocality,
            addressRegion: CONFIG.address.addressRegion,
            postalCode: CONFIG.address.postalCode,
            addressCountry: CONFIG.address.addressCountry
        };
        if (CONFIG.address.streetAddress) {
            address.streetAddress = CONFIG.address.streetAddress;
        }

        const reviews = SAMPLE_REVIEWS.map(r => ({
            '@type': 'Review',
            author: {
                '@type': 'Person',
                name: r.author
            },
            datePublished: r.date,
            reviewBody: r.body,
            reviewRating: {
                '@type': 'Rating',
                ratingValue: r.rating,
                bestRating: CONFIG.bestRating,
                worstRating: CONFIG.worstRating
            }
        }));

        return {
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: CONFIG.businessName,
            url: CONFIG.businessUrl,
            address: address,
            aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: String(CONFIG.ratingValue),
                reviewCount: String(CONFIG.reviewCount),
                bestRating: CONFIG.bestRating,
                worstRating: CONFIG.worstRating
            },
            review: reviews
        };
    }

    function injectSchema() {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.textContent = JSON.stringify(buildSchema());
        script.id = 'structured-data-reviews';
        document.head.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectSchema);
    } else {
        injectSchema();
    }

    window.MooveCityReviewsConfig = CONFIG;
})();
