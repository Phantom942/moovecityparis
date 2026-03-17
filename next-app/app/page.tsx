"use client";

import { useEffect } from "react";

export default function HomePage() {
  useEffect(() => {
    const mainScript = document.createElement("script");
    mainScript.src = "/js/main.js";
    mainScript.defer = true;
    document.body.appendChild(mainScript);

    const appScript = document.createElement("script");
    appScript.src = "/js/app.js";
    appScript.defer = true;
    document.body.appendChild(appScript);

    const sanitizeScript = document.createElement("script");
    sanitizeScript.src = "/js/sanitize.js";
    sanitizeScript.defer = true;
    document.body.appendChild(sanitizeScript);

    return () => {
      mainScript.remove();
      appScript.remove();
      sanitizeScript.remove();
    };
  }, []);

  return (
    <main
      dangerouslySetInnerHTML={{
        __html: `
    <header>
        <nav class="container">
            <a href="/" class="logo">
                <img src="/brand/moove-city-logo.svg" alt="Moove City - Logo transport urbain Paris, déménagement urgent, livraison gros volumes Île-de-France" width="96" height="96">
                Moove City
            </a>
            <ul class="nav-menu">
                <li><a href="#vehicules">Nos véhicules</a></li>
                <li><a href="#galerie">Galerie</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="/seo/articles/">Articles</a></li>
                <li><a href="/transport-entreprises.html">B2B</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
            <div class="nav-buttons">
                <a href="https://wa.me/33751213255" class="whatsapp-btn" target="_blank" rel="noopener noreferrer" onclick="trackWhatsAppClick()" aria-label="Contacter Moove City sur WhatsApp">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    WhatsApp
                </a>
                <a href="/booking" class="btn btn-primary" aria-label="Réserver un transport avec chauffeur Paris - Accéder au formulaire de devis">RÉSERVER MAINTENANT</a>
            </div>
        </nav>
    </header>

    <section class="hero" id="hero" role="banner">
        <video class="hero-video" muted loop playsinline autoplay
               poster="/images/hero-moove-city.jpg" width="1920" height="1080"
               aria-hidden="true">
            <source src="/videos/Work.mp4" type="video/mp4">
        </video>
        <div class="hero-overlay"></div>
        <div class="container">
            <div class="hero-content" style="text-align: center;">
                <h1 class="fade-in" style="text-align: center; font-size: clamp(2rem, 5vw, 3.2rem); margin-bottom: 1.5rem; letter-spacing: -0.02em; line-height: 1.1;">
                    Camion avec chauffeur Paris.<br>Transport, déménagement, livraison urgente.
                </h1>
                <p class="fade-in" style="font-size: clamp(1.1rem, 2vw, 1.4rem); margin: 0 auto 1.25rem; color: rgba(255, 255, 255, 0.95); max-width: 700px; line-height: 1.7; text-align: center; font-weight: 400;">
                    Transport simple, déménagement, livraison urgente, course urgente, mise à disposition événements, tournées entreprises. Intervention dans l'heure. 24h/24, 7j/7.
                </p>
                
                <div class="booking-form fade-in stagger-delay-2">
                    <div class="form-row">
                        <div class="form-group">
                            <label for="depart">Départ</label>
                            <input type="text" id="depart" placeholder="Adresse de départ" autocomplete="street-address">
                        </div>
                        <div class="form-group">
                            <label for="arrivee">Arrivée</label>
                            <input type="text" id="arrivee" placeholder="Adresse d'arrivée" autocomplete="street-address">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="date">Date</label>
                            <input type="date" id="date" min="" aria-label="Date de la réservation">
                        </div>
                        <div class="form-group">
                            <label for="heure">Heure</label>
                            <select id="heure" aria-label="Heure souhaitée pour le transport">
                                <option value="">Choisissez une heure</option>
                                <option value="Dès que possible">Dès que possible</option>
                                <option value="08:00">08h00</option>
                                <option value="09:00">09h00</option>
                                <option value="10:00">10h00</option>
                                <option value="11:00">11h00</option>
                                <option value="12:00">12h00</option>
                                <option value="14:00">14h00</option>
                                <option value="15:00">15h00</option>
                                <option value="16:00">16h00</option>
                                <option value="17:00">17h00</option>
                                <option value="18:00">18h00</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <label for="vehicle">Véhicule</label>
                            <select id="vehicle" aria-label="Choisir le type de camion pour le transport">
                                <option value="">Choisissez un véhicule</option>
                                <option value="URBAN - 6 m³">URBAN — 6 m³</option>
                                <option value="EXPRESS - 9 m³">EXPRESS — 9 m³</option>
                                <option value="PREMIUM - 12 m³">PREMIUM — 12 m³</option>
                                <option value="TITAN - 20 m³ avec hayon">TITAN — 20 m³ avec hayon</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group" style="grid-column: 1 / -1;">
                            <div id="price-calculator" style="padding: 1.5rem; background: rgba(255, 255, 255, 0.95); border-radius: 12px; display: none; margin-top: 0; text-align: center;">
                                <div id="price-loading" style="display: none; color: #64748b; font-size: 0.9rem;">Calcul en cours...</div>
                                <div style="color: #10b981; font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem;" id="calculated-price">--€</div>
                                <div id="price-details"></div>
                                <div style="color: #64748b; font-size: 0.9rem;" id="price-note">Estimation indicative</div>
                            </div>
                        </div>
                    </div>
                    <div class="form-row-center">
                        <a href="tel:+33751213255" id="cta-call-devis" class="cta-call" onclick="trackDevisCall()" aria-label="Appeler Moove City pour un devis gratuit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                            Obtenir un devis gratuit
                        </a>
                        <a href="#" id="cta-whatsapp-devis" class="cta-whatsapp" onclick="redirectToWhatsApp(); trackDevisWhatsApp(); return false;" aria-label="Demander un devis par WhatsApp">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/></svg>
                            Demander par WhatsApp
                        </a>
                        <p style="margin: 0.25rem 0 0; font-size: 0.95rem; color: #334155; text-align: center;">Reponse immediate par telephone 24h/7j</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div class="fade-in" style="background: rgba(5, 150, 105, 0.08); padding: 1rem 1.5rem; text-align: center; border-top: 1px solid rgba(5, 150, 105, 0.2); border-bottom: 1px solid rgba(5, 150, 105, 0.2);">
        <p style="margin: 0 0 0.5rem; font-size: 0.95rem; color: var(--text-primary);">
            <strong>Devis gratuit, sans engagement.</strong> Réponse sous 5 minutes · Intervention dans l’heure sur Paris et IDF · <a href="tel:+33751213255" style="color: #059669; font-weight: 600;">07 51 21 32 55</a> · <a href="https://wa.me/33751213255" style="color: #059669; font-weight: 600;">WhatsApp</a>
        </p>
        <p style="margin: 0; font-size: 0.85rem; color: #64748b;">
            Transport · Déménagement · Livraison urgente · Course urgente · Mise à disposition événements · Tournées entreprises
        </p>
    </div>

    <div class="services-features-bg">
    <section class="services" id="vehicules" aria-labelledby="section-vehicules">
        <div class="container">
            <h2 class="fade-in" id="section-vehicules">Nos véhicules</h2>
            <p class="fade-in" style="text-align: center; max-width: 600px; margin: 1rem auto 3rem; color: #ffffff; line-height: 1.6; font-size: 1.1rem;">
                De 6 m³ à 20 m³, nous avons le véhicule adapté à votre besoin.
            </p>
            <ul class="services-grid" role="list">
                <li class="service-card scale-in stagger-delay-1" data-vehicle="urban">
                    <h3>URBAN</h3>
                    <p><strong>6m³</strong><br>Parfait pour la ville, manœuvrable et efficace. Idéal pour vos courses et livraisons express.<br><span class="service-price">À partir de 40€</span></p>
                    <a class="service-link" href="/urban.html" title="Découvrir le camion URBAN 6m³ pour transport express Paris" aria-label="Réserver un camion URBAN 6m³ pour transport express Paris">Découvrir le camion URBAN 6m³</a>
                </li>
                <li class="service-card scale-in stagger-delay-2" data-vehicle="express">
                    <h3>EXPRESS</h3>
                    <p><strong>8 à 10m³</strong><br>Rapidité et fiabilité pour vos livraisons express et courses urgentes. Intervention dans l'heure.<br><span class="service-price">À partir de 50€</span></p>
                    <a class="service-link" href="/express.html" title="Découvrir le camion EXPRESS 8-10m³ pour livraison express Paris" aria-label="Réserver un camion EXPRESS 8-10m³ pour livraison express Paris">Découvrir le camion EXPRESS 8-10m³</a>
                </li>
                <li class="service-card scale-in stagger-delay-3" data-vehicle="premium">
                    <h3>PREMIUM</h3>
                    <p><strong>12m³ à 14m³</strong><br>Confort et espace pour vos transports et déménagements importants.<br><span class="service-price">À partir de 70€</span></p>
                    <a class="service-link" href="/premium.html" title="Découvrir le camion PREMIUM 12-14m³ pour déménagement Paris" aria-label="Réserver un camion PREMIUM 12-14m³ pour déménagement Paris">Découvrir le camion PREMIUM 12-14m³</a>
                </li>
                <li class="service-card scale-in stagger-delay-4" data-vehicle="titan">
                    <h3>TITAN</h3>
                    <p><strong>20 m³</strong><br>Avec hayon (500kg max). La puissance pour les gros volumes de déménagement et transport.<br><span class="service-price">À partir de 110€</span></p>
                    <a class="service-link" href="/titan.html" title="Découvrir le camion TITAN 20m³ avec hayon pour déménagement complet Paris" aria-label="Réserver un camion 20m³ avec hayon pour déménagement gros volumes Paris">Découvrir le camion TITAN 20m³</a>
                </li>
            </ul>
        </div>
    </section>

    <section class="features" id="features" aria-label="Nos engagements">
        <div class="container">
            <div class="features-grid">
                <div class="feature-card slide-in-left stagger-delay-1">
                    <span class="feature-icon" aria-hidden="true">⚡</span>
                    <h3>Disponible 24h/24 – intervention rapide</h3>
                    <p>Nos chauffeurs sont mobilisables à toute heure, avec intervention dans l'heure sur Paris et toute l'Île-de-France. Rapidité et urgence garanties pour vos transports, déménagements, livraisons et courses express.</p>
                </div>
                <div class="feature-card fade-in stagger-delay-2">
                    <span class="feature-icon" aria-hidden="true">📞</span>
                    <h3>Service client 24h/24</h3>
                    <p>Support WhatsApp, téléphone et email en continu pour suivre vos transports et ajuster vos missions professionnelles.</p>
                </div>
                <div class="feature-card slide-in-right stagger-delay-3">
                    <span class="feature-icon" aria-hidden="true">🛡</span>
                    <h3>Qualité garantie</h3>
                    <p>Nos chauffeurs sont sélectionnés selon des critères stricts : permis de conduire valide, expérience professionnelle et formation continue. Chaque transporteur est assuré et suit nos protocoles de sécurité.</p>
                </div>
                <div class="feature-card fade-in stagger-delay-4">
                    <span class="feature-icon" aria-hidden="true">💳</span>
                    <h3>Moyens de paiement flexibles</h3>
                    <p>Nous acceptons les paiements en espèces, carte bancaire et cryptomonnaie pour tous nos services de transport, déménagement et livraison. Flexibilité totale pour votre confort.</p>
                </div>
            </div>
        </div>
    </section>
    </div>

    <section class="gallery" id="galerie">
        <div class="container">
            <h2 class="fade-in">Sur le terrain</h2>
            <p class="fade-in stagger-delay-1">Quelques clichés de nos opérations à Paris et en Île-de-France : chargement, manutention sécurisée, livraisons express et déménagements. Transport rapide et professionnel pour vos marchandises.</p>
            <div class="gallery-grid">
                <figure class="gallery-item fade-in stagger-delay-1">
                    <img src="/images/operation-chariot.jpg" alt="Transport express Paris - Moove City, manutention diable, livraison gros volumes Île-de-France, intervention dans l'heure" loading="lazy" decoding="async" width="1200" height="800">
                    <span>Manutention sur diable – livraison express rapide</span>
                </figure>
                <figure class="gallery-item fade-in stagger-delay-2">
                    <img src="/images/operation-chargement.jpg" alt="Déménagement urgent Paris - Chargement camion 20 m³, transport avec chauffeur, livraison gros volumes Île-de-France" loading="lazy" decoding="async" width="1200" height="800">
                    <span>Chargement des camions 20 m³</span>
                </figure>
                <figure class="gallery-item fade-in stagger-delay-3">
                    <img src="/images/camion-interieur.jpg" alt="Livraison express Paris - Transport urbain sécurisé, calage cartons, déménagement et livraison Île-de-France" loading="lazy" decoding="async" width="1200" height="800">
                    <span>Protection et calage des cartons fragiles</span>
                </figure>
                <figure class="gallery-item fade-in stagger-delay-4">
                    <img src="/images/manutention-equipe.jpg" alt="Déménagement Paris - Équipe Moove City, transport avec chauffeur, livraison gros volumes, manutention professionnelle" loading="lazy" decoding="async" width="1200" height="800">
                    <span>Équipe dédiée pour vos déménagements et transports</span>
                </figure>
            </div>
        </div>
    </section>

    <hr style="width: 100%; height: 1px; border: none; background: linear-gradient(to right, transparent, rgba(15, 23, 42, 0.2), transparent); margin: 80px 0;">

    <section class="cities" id="couverture" style="padding: 60px 0;" aria-labelledby="section-couverture">
        <div class="container">
            <h2 class="fade-in" id="section-couverture" style="text-align: center; margin-bottom: 1rem;">Où intervenons-nous ?</h2>
            <p class="fade-in stagger-delay-1" style="text-align: center; max-width: 600px; margin: 0 auto 2rem; color: var(--text-secondary);">
                Île-de-France • France entière • Europe
            </p>
        </div>
    </section>

    <section class="content-section" id="resume" style="background: #f8fafc; padding: 60px 0;">
        <div class="container">
            <h2 class="fade-in" style="text-align: center; margin-bottom: 2rem;">Moove City en bref</h2>
            <div class="fade-in" style="max-width: 800px; margin: 0 auto; font-size: 1.05rem; line-height: 1.8; color: var(--text-primary);">
                <p><strong>Moove City</strong> est une entreprise de transport avec chauffeur basée à Paris, spécialisée dans la livraison urbaine, le déménagement et les courses urgentes en Île-de-France et en France.</p>
                <ul style="margin: 1.5rem 0; padding-left: 1.5rem;">
                    <li><strong>Services :</strong> transport avec chauffeur (6 à 20 m³), déménagement, livraison express, courses urgentes, B2B.</li>
                    <li><strong>Zone :</strong> Paris, Île-de-France (75, 91, 92, 93, 94, 95), France entière, Europe.</li>
                    <li><strong>Disponibilité :</strong> 24h/24, 7j/7. Intervention possible dans l'heure, réponse sous 5 minutes.</li>
                    <li id="tarifs"><strong>Tarifs indicatifs :</strong> à partir de 40€ (URBAN 6m³), 50€ (EXPRESS 9m³), 70€ (PREMIUM 12m³), 110€ (TITAN 20m³).</li>
                    <li><strong>Paiement :</strong> espèces, carte bancaire, cryptomonnaie.</li>
                    <li><strong>Contact :</strong> 07 51 21 32 55 — WhatsApp — contact@moovecity.fr — <a href="/booking">devis gratuit en ligne</a>.</li>
                </ul>
                <p style="margin-top: 1.5rem;">Réserver : <a href="/booking">formulaire de devis gratuit</a> sur le site ou par WhatsApp pour une confirmation rapide. <a href="/demenagement-paris.html">Déménagement Paris</a> · <a href="/livraison-express.html">Livraison express</a> · <a href="/transport-entreprises.html">Transport B2B</a>.</p>
            </div>
        </div>
    </section>

    <section class="content-section" id="avis" style="padding: 50px 0; background: #fff;">
        <div class="container">
            <h2 class="fade-in" style="text-align: center; margin-bottom: 1rem;">Retrouvez Moove City & laissez un avis</h2>
            <p class="fade-in" style="text-align: center; max-width: 600px; margin: 0 auto 2rem; color: var(--text-secondary);">
                Votre avis aide d'autres clients et renforce notre visibilité. Merci de nous noter sur Google ou Facebook après votre transport.
            </p>
            <div class="fade-in" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
                <a href="https://www.google.com/search?q=Moove+City+Paris" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                    Voir Moove City sur Google
                </a>
                <a href="https://www.facebook.com/profile.php?id=61585097790199" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem;">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    Facebook
                </a>
                <a href="https://www.instagram.com/moovecity/" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem;">Instagram</a>
                <a href="https://www.linkedin.com/company/moovecity" target="_blank" rel="noopener noreferrer" class="btn btn-outline" style="display: inline-flex; align-items: center; gap: 0.5rem;">LinkedIn</a>
            </div>
            <p style="text-align: center; margin-top: 1.5rem; font-size: 0.9rem; color: var(--text-secondary);">
                Inscrit sur PagesJaunes, 118712 et annuaires professionnels. <a href="/booking">Devis gratuit</a> · <a href="tel:+33751213255">07 51 21 32 55</a>
            </p>
        </div>
    </section>

    <section class="faq" id="faq">
        <div class="container">
            <h2 class="fade-in">Questions fréquentes</h2>
            <div class="faq-list">
                <details class="faq-item fade-in stagger-delay-1">
                    <summary>Dans quels délais pouvez-vous intervenir ?</summary>
                    <div>Dans l'heure sur Paris et Île-de-France. Réponse garantie en moins de 5 minutes.</div>
                </details>
                <details class="faq-item fade-in stagger-delay-2">
                    <summary>Quels moyens de paiement acceptez-vous ?</summary>
                    <div>Espèces, carte bancaire et cryptomonnaie.</div>
                </details>
                <details class="faq-item fade-in stagger-delay-3">
                    <summary>Comment obtenir un devis ?</summary>
                    <div>Remplissez le formulaire ci-dessus ou contactez-nous par WhatsApp. Devis gratuit en quelques minutes.</div>
                </details>
                <details class="faq-item fade-in stagger-delay-4">
                    <summary>Quels sont vos tarifs ?</summary>
                    <div>À partir de 40€ pour l'URBAN (6m³), 50€ pour l'EXPRESS (9m³), 70€ pour le PREMIUM (12m³) et 110€ pour le TITAN (20m³). Le prix final dépend de la distance et de la durée.</div>
                </details>
                <details class="faq-item fade-in stagger-delay-5">
                    <summary>Où intervenez-vous ?</summary>
                    <div>Île-de-France, France entière et Europe via notre réseau de partenaires.</div>
                </details>
            </div>
        </div>
    </section>

    <footer role="contentinfo" id="contact">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Moove City</h3>
                    <p style="font-size: 0.95rem;">Votre partenaire de confiance pour tous vos besoins de transport avec chauffeur.</p>
                </div>
                <div class="footer-section">
                    <h4>Liens rapides</h4>
                    <ul>
                        <li><a href="/booking">Réserver maintenant</a></li>
                        <li><a href="/demenagement-paris.html">Déménagement Paris</a></li>
                        <li><a href="/livraison-express.html">Livraison express</a></li>
                        <li><a href="/transport-entreprises.html">Transport entreprises</a></li>
                        <li><a href="/seo/articles/">Articles & Guides</a></li>
                        <li><a href="#contact">Contact</a></li>
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
                        <li><a href="#galerie">Galerie terrain</a></li>
                        <li><a href="#faq">Questions fréquentes</a></li>
                        <li><a href="#avis">Avis & Réseaux</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Contact</h4>
                    <p>📞 <a href="tel:+33751213255">+33 7 51 21 32 55</a></p>
                    <p style="margin-bottom: 0.75rem;">
                        <a href="https://wa.me/33751213255" target="_blank" rel="noopener noreferrer">
                            💬 WhatsApp
                        </a>
                    </p>
                    <p>📧 <a href="mailto:contact@moovecity.fr">contact@moovecity.fr</a></p>
                    <div class="social-links" style="margin-top: 1.75rem;">
                        <h4 style="margin-bottom: 1rem;">Suivez-nous</h4>
                        <div style="display: flex; gap: 0.75rem; align-items: center;">
                            <a href="https://www.facebook.com/profile.php?id=61585097790199" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; transition: all 0.3s ease; text-decoration: none;">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="color: rgba(255, 255, 255, 0.9);">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/moovecity/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; transition: all 0.3s ease; text-decoration: none;">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="color: rgba(255, 255, 255, 0.9);">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/company/moovecity" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: rgba(255, 255, 255, 0.1); border-radius: 50%; transition: all 0.3s ease; text-decoration: none;">
                                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" style="color: rgba(255, 255, 255, 0.9);">
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
                    <a href="/mentions-legales.html" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Mentions légales</a> | 
                    <a href="/politique-de-confidentialite.html" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Confidentialité</a> | 
                    <a href="/politique-cookies.html" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">Cookies</a> | 
                    <a href="/conditions-generales.html" style="color: rgba(255, 255, 255, 0.8); text-decoration: none;">CGU</a>
                </p>
                <p><a href="https://phantomdev.fr" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5em; color: rgba(255,255,255,0.8); text-decoration: none; font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; font-weight: 300; font-size: 0.85rem; letter-spacing: 0.15em; text-transform: uppercase; transition: opacity 0.2s ease;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'"><svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink: 0" aria-hidden="true"><path d="M16 4c-6 0-10 5-10 10 0 1.8.6 3.5 1.5 4.8v4.2l2.5-2.5 2 2.5 2-2.5 2.5 2.5v-4.2c.9-1.3 1.5-3 1.5-4.8 0-5-4-10-10-10z" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="11" cy="10.5" r="1.2" fill="currentColor"/><circle cx="21" cy="10.5" r="1.2" fill="currentColor"/></svg>Design by PhantomDev</a></p>
            </div>
        </div>
    </footer>

    <nav class="sticky-mobile-footer" id="stickyMobileFooter" role="navigation" aria-label="Contact rapide">
        <a href="tel:+33751213255" class="footer-btn footer-btn-call" aria-label="Appeler Moove City">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
            </svg>
            Appeler
        </a>
        <a href="https://wa.me/33751213255?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20pour%20un%20transport." 
           class="footer-btn footer-btn-whatsapp" target="_blank" rel="noopener noreferrer" aria-label="Contacter Moove City sur WhatsApp" onclick="typeof trackWhatsAppClick === 'function' && trackWhatsAppClick()">
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
            WhatsApp
        </a>
    </nav>

    <a href="https://wa.me/33751213255?text=Bonjour%2C%20je%20souhaite%20obtenir%20un%20devis%20pour%20un%20transport." 
       class="whatsapp-float" 
       target="_blank" 
       rel="noopener noreferrer"
       aria-label="Contacter Moove City sur WhatsApp"
       onclick="trackWhatsAppClick()">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
    </a>

    <button class="scroll-to-top" id="scrollToTop" aria-label="Retour en haut de la page">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    </button>
        `,
      }}
    />
  );
}
