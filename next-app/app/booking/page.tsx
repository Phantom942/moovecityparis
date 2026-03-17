"use client";

import { useEffect } from "react";
import "./booking.css";

export default function BookingPage() {
  useEffect(() => {
    const bookingScript = document.createElement("script");
    bookingScript.src = "/js/booking.js";
    bookingScript.defer = true;
    document.body.appendChild(bookingScript);

    const mapsScript = document.createElement("script");
    mapsScript.src =
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBj-30c7SBJUcHHdw_hBT17jtH__NRz0L8&loading=async&callback=initBookingAutocomplete";
    mapsScript.async = true;
    mapsScript.defer = true;
    document.body.appendChild(mapsScript);

    const sanitizeScript = document.createElement("script");
    sanitizeScript.src = "/js/sanitize.js";
    sanitizeScript.defer = true;
    document.body.appendChild(sanitizeScript);

    return () => {
      bookingScript.remove();
      mapsScript.remove();
      sanitizeScript.remove();
    };
  }, []);

  return (
    <main
      dangerouslySetInnerHTML={{
        __html: `
    <nav aria-label="Fil d'Ariane" class="breadcrumb-nav">
        <div class="container">
            <ol itemscope itemtype="https://schema.org/BreadcrumbList" class="breadcrumb-list">
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" style="display: inline-flex; align-items: center;">
                    <a href="/" itemprop="item" style="color: #0ea5e9; text-decoration: none; transition: color 0.2s;">
                        <span itemprop="name">Accueil</span>
                    </a>
                    <meta itemprop="position" content="1">
                </li>
                <li style="color: #cbd5e1;">/</li>
                <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem" class="breadcrumb-current">
                    <span itemprop="name">Devis Gratuit</span>
                    <meta itemprop="position" content="2">
                </li>
            </ol>
        </div>
    </nav>
    <header class="topbar">
        <div class="container">
            <a class="logo" href="/">
                <img src="brand/moove-city-logo.svg" alt="Logo Moove City" width="96" height="96">
                Moove City
            </a>
            <nav aria-label="Navigation principale">
                <ul>
                    <li><a href="/#galerie">Galerie</a></li>
                    <li><a href="/#faq">FAQ</a></li>
                    <li><a href="/transport-entreprises.html">B2B</a></li>
                    <li><a href="/#contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <section class="hero booking-hero" id="hero" role="banner">
        <video class="hero-video" muted loop playsinline autoplay
               poster="/images/hero-moove-city.jpg" width="1920" height="1080"
               aria-hidden="true">
            <source src="/videos/Work.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
        <div class="container hero-grid">
            <div class="hero-content-block">
                <h1>Votre devis transport & déménagement en moins d’une minute</h1>
                <p>Renseignez votre trajet, choisissez un véhicule et recevez instantanément un message WhatsApp pré-rempli pour échanger directement avec notre équipe disponible 24h/24 et 7j/7.</p>
                <a class="hero-cta" href="https://wa.me/33751213255" target="_blank" rel="noopener noreferrer">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    Contacter un conseiller
                </a>
            </div>
        </div>
    </section>

    <section class="container booking-grid" id="devis" aria-label="Formulaire et informations">
        <div class="booking-col-left">
        <div class="card form-card">
            <h2 class="form-title">Votre demande</h2>
            <form id="quoteForm" autocomplete="on" novalidate>
                <input type="text" name="_honey" id="honey" tabindex="-1" autocomplete="off" style="display:none;" aria-hidden="true">
                <div class="form-grid">
<div class="form-row">
                    <div class="form-field">
                        <label for="departure">📍 Départ *</label>
                        <input type="text" id="departure" name="departure" placeholder="Ex : 12 rue de la Paix, Paris" autocomplete="street-address" required>
                    </div>
                    <div class="form-field">
                        <label for="arrival">📍 Arrivée *</label>
                        <input type="text" id="arrival" name="arrival" placeholder="Ex : 18 av. de Lyon, Créteil" autocomplete="street-address" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-field">
                        <label for="date">📅 Date *</label>
                        <input type="date" id="date" name="date" required>
                    </div>
                    <div class="form-field">
                        <label for="time">🕐 Heure *</label>
                        <input type="time" id="time" name="time" required>
                    </div>
                </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="vehicle">🚐 Type de véhicule *</label>
                            <select id="vehicle" name="vehicle">
                                <option value="">Sélectionnez un véhicule</option>
                                <option value="URBAN">URBAN — 6 m³</option>
                                <option value="EXPRESS">EXPRESS — 9 m³</option>
                                <option value="PREMIUM">PREMIUM — 12 m³</option>
                                <option value="TITAN">TITAN — 20 m³ avec hayon</option>
                            </select>
                        </div>
                        <div class="form-field">
                            <label for="duration">Durée estimée (h) *</label>
                            <input type="number" id="duration" name="duration" min="1" max="12" step="0.5" placeholder="Ex: 2" required>
                        </div>
                    </div>
                    <div class="form-field form-field-inline">
                        <span class="form-label">Manutention</span>
                        <div class="radio-group">
                            <label class="radio-label"><input type="radio" name="manutention" value="non" id="manutentionNon" checked> Non</label>
                            <label class="radio-label"><input type="radio" name="manutention" value="oui" id="manutentionOui"> Oui (+25€)</label>
                        </div>
                    </div>
                    <div class="form-field">
                        <label for="description">📝 Infos complémentaires (optionnel)</label>
                        <textarea id="description" name="description" placeholder="Volume, objets fragiles, ascenseur..."></textarea>
                    </div>
                    <div id="priceEstimate" class="price-estimate-box hidden">
                        <div class="price-estimate-inner">
                            <div>
                                <span class="price-estimate-label">Estimation</span>
                                <div class="price-estimate-value"><span id="estimatedPriceValue">0</span> €</div>
                                <div id="priceDetails" class="price-estimate-details"></div>
                            </div>
                            <div id="priceVehicleIcon" class="price-estimate-icon"></div>
                        </div>
                        <p class="price-estimate-note">Prix indicatif. Tarif final selon distance et options.</p>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="name">👤 Votre nom *</label>
                            <input type="text" id="name" name="name" placeholder="Votre nom complet" autocomplete="name" required>
                        </div>
                        <div class="form-field">
                            <label for="email">📧 Votre email *</label>
                            <input type="email" id="email" name="email" placeholder="votre@email.fr" autocomplete="email" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-field">
                            <label for="phone">📞 Votre téléphone *</label>
                            <input type="tel" id="phone" name="phone" placeholder="06 12 34 56 78" autocomplete="tel" required>
                        </div>
                    </div>
                </div>
                <div class="form-footer">
                    <a href="tel:+33751213255" id="cta-call-booking" onclick="trackBookingCall()" class="btn-primary btn-cta">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        Obtenir mon devis gratuit
                    </a>
                    <a href="#" id="cta-whatsapp-booking" onclick="redirectToWhatsAppBooking(); trackBookingWhatsApp(); return false;" class="btn-whatsapp">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                        Demander par WhatsApp
                    </a>
                    <p class="form-footer-note">Réponse immédiate 24h/7j</p>
                </div>
                <div id="formError" class="error-message" style="display:none;" role="alert" aria-live="polite"></div>
            </form>
        </div>

        <div class="card card-pourquoi-choisir" id="pourquoi-choisir-moove-city">
            <h3>Pourquoi choisir Moove City ?</h3>
            <ul class="bullet-list">
                <li>Chauffeurs expérimentés et assurés pour vos biens.</li>
                <li>Devis personnalisés en quelques minutes par WhatsApp.</li>
                <li>Service 24/7 partout en Île-de-France et départs province.</li>
                <li>Option manutention complète et matériaux de protection.</li>
                <li>Suivi en temps réel et interlocuteur unique jusqu'à la livraison.</li>
            </ul>
        </div>
        </div>

        <div class="booking-col-right">
        <aside class="card contact-card">
            <div>
                <h3>Besoin d’un devis express ?</h3>
                <p>Notre équipe est disponible 7j/7, 24h/24 pour confirmer votre trajet, réserver un créneau et vous aider à choisir le véhicule adapté.</p>
            </div>
            <div class="contact-list">
                <div class="contact-item">
                    <span>Téléphone</span>
                    <a href="tel:+33751213255">+33 7 51 21 32 55</a>
                </div>
                <div class="contact-item">
                    <span>WhatsApp</span>
                    <a href="https://wa.me/33751213255" target="_blank" rel="noopener noreferrer">Discuter en direct</a>
                </div>
                <div class="contact-item">
                    <span>🕒 Disponibilités</span>
                    24h/24 – 7j/7 en Île-de-France
                </div>
            </div>
            <div class="contact-actions">
                <a class="btn-outline" href="mailto:contact@moovecity.fr">Envoyer un email</a>
                <a class="btn-outline" href="/#faq">Consulter la FAQ</a>
            </div>
        </aside>

        <div class="card">
            <h3>🚛 Nos véhicules disponibles</h3>
            <div class="vehicle-grid">
                <div class="vehicle-card">
                    <h4>URBAN</h4>
                    <p>6 m³<br>Idéal pour un studio ou quelques meubles.</p>
                    <p><strong>À partir de 40€</strong></p>
                </div>
                <div class="vehicle-card">
                    <h4>EXPRESS</h4>
                    <p>9 m³<br>Livraison express, événements, tournée commerciale.</p>
                    <p><strong>À partir de 50€</strong></p>
                </div>
                <div class="vehicle-card">
                    <h4>PREMIUM</h4>
                    <p>12 m³<br>Déménagement T2/T3, mobilier volumineux.</p>
                    <p><strong>À partir de 60€</strong></p>
                </div>
                <div class="vehicle-card">
                    <h4>TITAN</h4>
                    <p>20 m³ avec hayon<br>Plateaux palettes, matériels lourds.</p>
                    <p><strong>À partir de 100€</strong></p>
                </div>
            </div>
        </div>
        </div>
    </section>

    <section class="cta-strip" aria-label="Réserver ou nous contacter">
        <div class="cta-strip-inner container">
            <h3>Prêt à réserver votre chauffeur ?</h3>
            <p>Choisissez la solution la plus pratique pour vous, nous intervenons en moins de 2 heures sur Paris et sa région.</p>
            <div class="cta-strip-actions">
                <a class="cta-strip-btn cta-strip-btn-whatsapp" href="https://wa.me/33751213255" target="_blank" rel="noopener noreferrer">Démarrer la discussion WhatsApp</a>
                <a class="cta-strip-btn cta-strip-btn-phone" href="tel:+33751213255">Appeler Moove City</a>
            </div>
        </div>
    </section>

    <footer role="contentinfo" id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Moove City</h3>
                    <p class="footer-desc">Votre partenaire de confiance pour tous vos besoins de transport avec chauffeur.</p>
                </div>
                <div class="footer-section">
                    <h4>Liens rapides</h4>
                    <ul>
                        <li><a href="/booking">Réserver maintenant</a></li>
                        <li><a href="/demenagement-paris.html">Déménagement Paris</a></li>
                        <li><a href="/livraison-express.html">Livraison express</a></li>
                        <li><a href="/transport-entreprises.html">Transport entreprises</a></li>
                        <li><a href="/#contact">Contact</a></li>
                        <li><a href="/seo/villes-idf.html">Villes desservies</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Nos Véhicules</h4>
                    <ul>
                        <li><a href="/urban.html">URBAN — 6 m³</a></li>
                        <li><a href="/express.html">EXPRESS — 9 m³</a></li>
                        <li><a href="/premium.html">PREMIUM — 12 m³</a></li>
                        <li><a href="/titan.html">TITAN — 20 m³</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Services</h4>
                    <ul>
                        <li><a href="/demenagement-paris.html">Déménagements</a></li>
                        <li><a href="/livraison-express.html">Livraisons express</a></li>
                        <li><a href="/transport-entreprises.html">Transport entreprises</a></li>
                        <li><a href="/#galerie">Galerie terrain</a></li>
                        <li><a href="/#faq">Questions fréquentes</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>📞 <a href="tel:+33751213255">+33 7 51 21 32 55</a></p>
                    <p class="footer-contact-line">
                        <a href="https://wa.me/33751213255" target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp
                        </a>
                    </p>
                    <p>📧 <a href="mailto:contact@moovecity.fr">contact@moovecity.fr</a></p>
                    <div class="social-links">
                        <h4>Suivez-nous</h4>
                        <div>
                            <a href="https://www.facebook.com/profile.php?id=61585097790199" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/moovecity/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/moovecity" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>© 2026 Moove City. Tous droits réservés.</p>
                <p>
<a href="/mentions-legales.html">Mentions légales</a> |
                    <a href="/politique-de-confidentialite.html">Confidentialité</a> |
                    <a href="/politique-cookies.html">Cookies</a> |
                    <a href="/conditions-generales.html">CGU</a>
                </p>
                <p><a href="https://phantomdev.fr" target="_blank" rel="noopener" class="footer-credit"><svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M16 4c-6 0-10 5-10 10 0 1.8.6 3.5 1.5 4.8v4.2l2.5-2.5 2 2.5 2-2.5 2.5 2.5v-4.2c.9-1.3 1.5-3 1.5-4.8 0-5-4-10-10-10z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="10.5" r="1.2" fill="currentColor"/><circle cx="21" cy="10.5" r="1.2" fill="currentColor"/></svg>Design by PhantomDev</a></p>
            </div>
        </div>
    </footer>
        `,
      }}
    />
  );
}
