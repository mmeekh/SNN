class CookieConsent {
    constructor() {
        this.consentBox = document.getElementById('cookie-consent');
        if (!this.consentBox) return;

        // --- Configuration ---
        this.gaId = 'G-FHXW3S23M5'; // ✨ Centralized Google Analytics ID

        // --- Elements ---
        this.acceptBtn = this.consentBox.querySelector('.cookie-accept');
        this.rejectBtn = this.consentBox.querySelector('.cookie-reject');
        this.settingsBtn = this.consentBox.querySelector('.cookie-settings');
        this.saveSettingsBtn = this.consentBox.querySelector('.cookie-save-settings');
        this.detailsPanel = this.consentBox.querySelector('.cookie-details');

        // --- State ---
        this.cookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };

        this.init();
    }

    init() {
        const consent = this.getCookie('swordnest_cookie_consent');

        if (!consent) {
            setTimeout(() => this.showConsent(), 1500);
        } else {
            this.loadPreferences();
            this.applyPreferences();
        }

        this.setupEventListeners();
    }

    setupEventListeners() {
        if (this.acceptBtn) {
            this.acceptBtn.addEventListener('click', () => this.acceptAll());
        }
        if (this.rejectBtn) {
            this.rejectBtn.addEventListener('click', () => this.rejectAll());
        }
        if (this.settingsBtn) {
            this.settingsBtn.addEventListener('click', () => this.toggleSettings());
        }
        if (this.saveSettingsBtn) {
            this.saveSettingsBtn.addEventListener('click', () => this.saveSettings());
        }
    }

    showConsent() {
        this.consentBox.classList.add('show');
        document.body.style.paddingBottom = this.consentBox.offsetHeight + 'px';
    }

    hideConsent() {
        this.consentBox.classList.remove('show');
        setTimeout(() => {
            document.body.style.paddingBottom = '0';
        }, 500);
    }

    acceptAll() {
        this.cookiePreferences = { necessary: true, analytics: true, marketing: true };
        this.saveConsent();
        this.hideConsent();
        this.showNotification('Tüm çerezler kabul edildi! 🍪');
        this.loadTrackingScripts();
    }

    rejectAll() {
        this.cookiePreferences = { necessary: true, analytics: false, marketing: false };
        this.saveConsent();
        this.hideConsent();
        this.showNotification('Sadece zorunlu çerezler aktif 🛡️');
    }

    toggleSettings() {
        if (!this.detailsPanel) return;
        
        // ✨ CHANGED: Use classList.toggle for a cleaner approach
        this.detailsPanel.classList.toggle('hidden');

        if (!this.detailsPanel.classList.contains('hidden')) {
            this.consentBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    saveSettings() {
        const analyticsCheckbox = document.getElementById('analytics-cookies');
        const marketingCheckbox = document.getElementById('marketing-cookies');

        if (analyticsCheckbox) {
            this.cookiePreferences.analytics = analyticsCheckbox.checked;
        }
        if (marketingCheckbox) {
            this.cookiePreferences.marketing = marketingCheckbox.checked;
        }

        this.saveConsent();
        this.hideConsent();
        this.showNotification('Çerez tercihleri kaydedildi ✅');
        this.applyPreferences();
    }

    saveConsent() {
        const consentData = {
            timestamp: new Date().toISOString(),
            preferences: this.cookiePreferences
        };
        this.setCookie('swordnest_cookie_consent', JSON.stringify(consentData), 365);
        this.updateGoogleConsent(); // ✨ ADDED: Update Google's consent state on every save
    }

    loadPreferences() {
        const consent = this.getCookie('swordnest_cookie_consent');
        if (consent) {
            try {
                const data = JSON.parse(consent);
                if (data.preferences) {
                    this.cookiePreferences = data.preferences;
                }
            } catch (e) {
                console.error('Cookie preferences could not be loaded.');
            }
        }
    }

    applyPreferences() {
        if (this.cookiePreferences.analytics) this.loadAnalytics();
        if (this.cookiePreferences.marketing) this.loadMarketing();
    }

    loadTrackingScripts() {
        this.loadAnalytics();
        this.loadMarketing();
    }

    /**
     * ✨ ADDED: New method for Google Consent Mode v2
     * This function sends the user's choices to Google.
     */
    updateGoogleConsent() {
        if (typeof gtag !== 'function') {
            // If gtag isn't loaded yet, this won't do anything, which is fine.
            return;
        }
        
        gtag('consent', 'update', {
            'analytics_storage': this.cookiePreferences.analytics ? 'granted' : 'denied',
            'ad_storage': this.cookiePreferences.marketing ? 'granted' : 'denied'
        });
        
        console.log('Google consent state updated:', {
            analytics: this.cookiePreferences.analytics ? 'granted' : 'denied',
            marketing: this.cookiePreferences.marketing ? 'granted' : 'denied'
        });
    }

    loadAnalytics() {
        if (!this.gaId) {
            console.warn('Google Analytics ID is not configured.');
            return;
        }

        if (typeof gtag !== 'undefined') {
            console.log('Google Analytics already loaded.');
            return;
        }

        const script = document.createElement('script');
        script.async = true;
        // ✨ CHANGED: Use the class property for the ID
        script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`;
        
        script.onload = () => {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // This configures GA with the user's preferences
            gtag('config', this.gaId);
            
            console.log(`Google Analytics (ID: ${this.gaId}) successfully loaded.`);
        };

        script.onerror = () => {
            console.error('Google Analytics script failed to load. Check for ad blockers or network issues.');
        };

        document.head.appendChild(script);
    }

    loadMarketing() {
        if (this.cookiePreferences.marketing) {
            console.log('Marketing scripts would be loaded here.');
        }
    }

    showNotification(message) {
        // This function is well-written, no changes needed.
        const notification = document.createElement('div');
        notification.className = 'cookie-notification';
        notification.style.cssText = `
            position: fixed; top: 100px; right: 30px;
            background: linear-gradient(135deg, #38A169 0%, #38BDF8 100%);
            color: white; padding: 20px 30px; border-radius: 10px;
            font-weight: 500; z-index: 10000;
            transform: translateX(400px); transition: transform 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});