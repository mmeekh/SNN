/* ===================================
   SWORD NEST - MAIN APPLICATION
   Core JavaScript Controller
   =================================== */

class SwordNestApp {
    constructor() {
        this.isInitialized = false;
        this.debugMode = false;
        this.components = {
            swordAnimation: null,
            spotlightEffect: null,
            heroSection: null,
            portfolioSection: null
        };
        
        this.state = {
            currentSection: 'hero',
            scrollProgress: 0,
            isScrolling: false,
            isMobile: window.innerWidth <= 768
        };
        
        this.init();
    }

    async init() {
        try {
            console.log('🗡️ Sword Nest Application Starting...');
            
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.startup());
            } else {
                this.startup();
            }
            
        } catch (error) {
            console.error('❌ Application initialization failed:', error);
        }
    }

    async startup() {
        // Initialize core systems
        this.setupErrorHandling();
        this.detectDevice();
        this.initializeComponents();
        this.bindGlobalEvents();
        this.setupPerformanceOptimizations();
        this.initializeAnalytics();
        
        // Mark as initialized
        this.isInitialized = true;
        
        // Debug info
        if (this.debugMode) {
            this.enableDebugMode();
        }
        
        console.log('✅ Sword Nest Application Ready!');
        this.displayWelcomeMessage();
    }

    setupErrorHandling() {
        window.addEventListener('error', (event) => {
            console.error('🚨 Global Error:', event.error);
            this.logError('Global Error', event.error);
        });

        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Unhandled Promise Rejection:', event.reason);
            this.logError('Promise Rejection', event.reason);
        });
    }

    detectDevice() {
        // Update mobile state
        this.state.isMobile = window.innerWidth <= 768;
        
        // Touch device detection
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // High DPI detection
        const isHighDPI = window.devicePixelRatio > 1;
        
        // Performance tier detection
        const isLowEndDevice = navigator.hardwareConcurrency <= 2;
        
        // Apply device-specific optimizations
        if (this.state.isMobile) {
            document.body.classList.add('mobile-device');
        }
        
        if (isTouchDevice) {
            document.body.classList.add('touch-device');
        }
        
        if (isLowEndDevice) {
            document.body.classList.add('low-end-device');
            this.enablePerformanceMode();
        }
        
        console.log('📱 Device Info:', {
            mobile: this.state.isMobile,
            touch: isTouchDevice,
            highDPI: isHighDPI,
            lowEnd: isLowEndDevice
        });
    }

    initializeComponents() {
        // Initialize sword animation if available
        if (window.SwordAnimation && document.getElementById('swordImage')) {
            this.components.swordAnimation = new window.SwordAnimation();
        }
        
        // Initialize spotlight effect if available
        if (window.SpotlightEffect) {
            this.components.spotlightEffect = new window.SpotlightEffect();
        }
        
        // Initialize navigation
        this.initializeNavigation();
        
        // Initialize scroll handlers
        this.initializeScrollHandlers();
        
        // Initialize section managers
        this.initializeSectionManagers();
    }

    initializeNavigation() {
        // Smooth scroll implementation
        window.scrollToSection = (sectionId) => {
            const element = document.getElementById(sectionId);
            if (element) {
                const offsetTop = element.offsetTop - 100; // Account for fixed elements
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update current section
                this.state.currentSection = sectionId;
                
                // Analytics tracking
                this.trackEvent('navigation', 'scroll_to_section', sectionId);
            }
        };

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Home':
                    e.preventDefault();
                    window.scrollToSection('hero');
                    break;
                case 'End':
                    e.preventDefault();
                    window.scrollToSection('contact');
                    break;
                case 'ArrowDown':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.scrollToNextSection();
                    }
                    break;
                case 'ArrowUp':
                    if (e.ctrlKey) {
                        e.preventDefault();
                        this.scrollToPreviousSection();
                    }
                    break;
            }
        });
    }

    initializeScrollHandlers() {
        let scrollTimeout;
        let lastScrollTop = 0;
        
        // Throttled scroll handler for performance
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = Math.min(scrollTop / scrollHeight, 1);
            
            // Update scroll state
            this.state.scrollProgress = scrollProgress;
            this.state.isScrolling = true;
            
            // Detect scroll direction
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;
            
            // Update current section
            this.updateCurrentSection();
            
            // Custom scroll events
            this.dispatchCustomEvent('scroll-progress', {
                progress: scrollProgress,
                direction: scrollDirection,
                position: scrollTop
            });
            
            // Clear scrolling state after delay
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.state.isScrolling = false;
                this.dispatchCustomEvent('scroll-end');
            }, 150);
        };
        
        // Use throttled scroll for performance
        window.addEventListener('scroll', this.throttle(handleScroll, 16)); // ~60fps
    }

    initializeSectionManagers() {
        // Section visibility observer
        const observerOptions = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-50px 0px'
        };
        
        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                const visibility = entry.intersectionRatio;
                
                if (visibility > 0.5) {
                    this.state.currentSection = sectionId;
                    entry.target.classList.add('section-active');
                } else {
                    entry.target.classList.remove('section-active');
                }
                
                // Section-specific handlers
                this.handleSectionVisibility(sectionId, visibility, entry.isIntersecting);
            });
        }, observerOptions);
        
        // Observe all sections
        document.querySelectorAll('section[id]').forEach(section => {
            this.sectionObserver.observe(section);
        });
    }

    handleSectionVisibility(sectionId, visibility, isIntersecting) {
        switch(sectionId) {
            case 'hero':
                if (isIntersecting && visibility > 0.3) {
                    this.trackEvent('section', 'view', 'hero');
                }
                break;
                
            case 'portfolio':
                if (isIntersecting && visibility > 0.2) {
                    this.trackEvent('section', 'view', 'portfolio');
                    this.triggerPortfolioAnimations();
                }
                break;
                
            case 'contact':
                if (isIntersecting && visibility > 0.3) {
                    this.trackEvent('section', 'view', 'contact');
                }
                break;
        }
    }

    bindGlobalEvents() {
        // Window resize handler
        window.addEventListener('resize', this.debounce(() => {
            const wasMobile = this.state.isMobile;
            this.state.isMobile = window.innerWidth <= 768;
            
            if (wasMobile !== this.state.isMobile) {
                this.handleDeviceChange();
            }
            
            this.dispatchCustomEvent('viewport-change', {
                width: window.innerWidth,
                height: window.innerHeight,
                isMobile: this.state.isMobile
            });
        }, 250));
        
        // Visibility change handler
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });
        
        // Before unload handler
        window.addEventListener('beforeunload', () => {
            this.cleanup();
        });
    }

    setupPerformanceOptimizations() {
        // Preload critical images
        this.preloadCriticalAssets();
        
        // Lazy load non-critical content
        this.setupLazyLoading();
        
        // Optimize animations for low-end devices
        if (document.body.classList.contains('low-end-device')) {
            this.enablePerformanceMode();
        }
        
        // Reduce motion if user prefers
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
        }
    }

    preloadCriticalAssets() {
        // Preload first few sword images
        const criticalImages = [
            'assets/images/sword-rotation/0001.png',
            'assets/images/sword-rotation/0002.png',
            'assets/images/sword-rotation/0003.png'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        lazyImageObserver.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                lazyImageObserver.observe(img);
            });
        }
    }

    enablePerformanceMode() {
        document.body.classList.add('performance-mode');
        
        // Reduce animation complexity
        document.documentElement.style.setProperty('--animation-duration', '0.2s');
        
        // Disable particle effects
        const particles = document.querySelector('.hero-particles');
        if (particles) {
            particles.style.display = 'none';
        }
        
        console.log('⚡ Performance mode enabled');
    }

    initializeAnalytics() {
        // Track page load
        this.trackEvent('app', 'load', 'sword_nest_portfolio');
        
        // Track performance metrics
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    this.trackEvent('performance', 'load_time', Math.round(perfData.loadEventEnd));
                }, 1000);
            });
        }
    }

    // Utility Methods
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    dispatchCustomEvent(eventName, detail = {}) {
        const event = new CustomEvent(eventName, { detail });
        document.dispatchEvent(event);
    }

    // Section Navigation
    updateCurrentSection() {
        const sections = ['hero', 'about', 'portfolio', 'contact'];
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        
        for (const sectionId of sections) {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    if (this.state.currentSection !== sectionId) {
                        this.state.currentSection = sectionId;
                        this.dispatchCustomEvent('section-change', { section: sectionId });
                    }
                    break;
                }
            }
        }
    }

    scrollToNextSection() {
        const sections = ['hero', 'about', 'portfolio', 'contact'];
        const currentIndex = sections.indexOf(this.state.currentSection);
        const nextIndex = Math.min(currentIndex + 1, sections.length - 1);
        
        if (nextIndex !== currentIndex) {
            window.scrollToSection(sections[nextIndex]);
        }
    }

    scrollToPreviousSection() {
        const sections = ['hero', 'about', 'portfolio', 'contact'];
        const currentIndex = sections.indexOf(this.state.currentSection);
        const prevIndex = Math.max(currentIndex - 1, 0);
        
        if (prevIndex !== currentIndex) {
            window.scrollToSection(sections[prevIndex]);
        }
    }

    // Event Handlers
    handleDeviceChange() {
        console.log('📱 Device type changed:', this.state.isMobile ? 'Mobile' : 'Desktop');
        
        // Reinitialize components that depend on device type
        if (this.components.spotlightEffect) {
            this.components.spotlightEffect.handleDeviceChange();
        }
    }

    handlePageHidden() {
        // Pause animations and save resources
        if (this.components.swordAnimation) {
            this.components.swordAnimation.pause();
        }
        
        this.trackEvent('app', 'page_hidden');
    }

    handlePageVisible() {
        // Resume animations
        if (this.components.swordAnimation) {
            this.components.swordAnimation.resume();
        }
        
        this.trackEvent('app', 'page_visible');
    }

    triggerPortfolioAnimations() {
        // Trigger portfolio demo animations when section becomes visible
        const demoContainers = document.querySelectorAll('.demo-container');
        demoContainers.forEach((container, index) => {
            setTimeout(() => {
                container.classList.add('visible');
            }, index * 200);
        });
    }

    // Debug Mode
    enableDebugMode() {
        console.log(`
🗡️ SWORD NEST DEBUG MODE
========================
Commands:
- app.state: View application state
- app.components: View loaded components
- app.trackEvent(category, action, label): Manual event tracking
- app.performance(): View performance metrics
- app.reset(): Reset application state
        `);
        
        // Add debug panel
        this.createDebugPanel();
        
        // Expose app to window for debugging
        window.app = this;
    }

    createDebugPanel() {
        const debugPanel = document.createElement('div');
        debugPanel.id = 'debug-panel';
        debugPanel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: #38BDF8;
            padding: 1rem;
            border-radius: 10px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10001;
            max-width: 300px;
        `;
        
        debugPanel.innerHTML = `
            <h4>🗡️ Sword Nest Debug</h4>
            <div>Section: <span id="debug-section">${this.state.currentSection}</span></div>
            <div>Scroll: <span id="debug-scroll">0%</span></div>
            <div>Mobile: <span id="debug-mobile">${this.state.isMobile}</span></div>
            <button onclick="app.performance()" style="margin-top: 10px; background: #38BDF8; border: none; padding: 5px; border-radius: 5px;">Performance</button>
        `;
        
        document.body.appendChild(debugPanel);
        
        // Update debug info
        document.addEventListener('scroll-progress', (e) => {
            document.getElementById('debug-scroll').textContent = 
                Math.round(e.detail.progress * 100) + '%';
        });
        
        document.addEventListener('section-change', (e) => {
            document.getElementById('debug-section').textContent = e.detail.section;
        });
    }

    // Analytics & Tracking
    trackEvent(category, action, label = '', value = 0) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label,
                value: value
            });
        }
        
        // Console log for development
        console.log(`📊 Event: ${category}/${action}${label ? '/' + label : ''}${value ? ' (' + value + ')' : ''}`);
    }

    // Performance Monitoring
    performance() {
        if ('performance' in window) {
            const perfData = {
                navigation: performance.getEntriesByType('navigation')[0],
                paint: performance.getEntriesByType('paint'),
                memory: performance.memory
            };
            
            console.table(perfData.navigation);
            console.log('🎨 Paint Metrics:', perfData.paint);
            if (perfData.memory) {
                console.log('💾 Memory Usage:', {
                    used: Math.round(perfData.memory.usedJSHeapSize / 1024 / 1024) + ' MB',
                    total: Math.round(perfData.memory.totalJSHeapSize / 1024 / 1024) + ' MB',
                    limit: Math.round(perfData.memory.jsHeapSizeLimit / 1024 / 1024) + ' MB'
                });
            }
            
            return perfData;
        }
    }

    // Cleanup
    cleanup() {
        if (this.sectionObserver) {
            this.sectionObserver.disconnect();
        }
        
        // Cleanup components
        Object.values(this.components).forEach(component => {
            if (component && typeof component.destroy === 'function') {
                component.destroy();
            }
        });
        
        console.log('🧹 Application cleanup completed');
    }

    // Reset
    reset() {
        window.location.reload();
    }

    // Welcome Message
    displayWelcomeMessage() {
        console.log(`
🗡️ SWORD NEST - YAPAY ZEKA ÇÖZÜMLERİ
=====================================
Dinamik & Yaratıcı AI Portfolio

🚀 Ready for action!
💡 Press Ctrl+Shift+I to open debug mode
⌨️  Keyboard shortcuts:
   • Home: Go to top
   • End: Go to contact
   • Ctrl+↑/↓: Navigate sections
   • H: Toggle spotlight
        `);
        
        // Enable debug mode in development
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            this.debugMode = true;
            this.enableDebugMode();
        }
    }

    // Error Logging
    logError(type, error) {
        const errorData = {
            type: type,
            message: error.message || error,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        };
        
        // In production, you would send this to an error tracking service
        console.error('Error Log:', errorData);
        
        this.trackEvent('error', type, error.message || error.toString());
    }
}

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', () => {
    window.swordNestApp = new SwordNestApp();
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SwordNestApp;
}