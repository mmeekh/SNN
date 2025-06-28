class Navigation {
    constructor() {
        this.nav = document.getElementById('nav');
        this.mobileToggle = document.querySelector('. obile-toggle');
        this.mobileMenu = document.querySelector('.mobile-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        this.init();
    }
    
    init() {
        if (this.mobileToggle) {
            this.mobileToggle.addEventListener('click', () => this.toggleMobileMenu());
        }
        
        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
        
        this.initNavCanvas();
        
        this.setActivePage();
        
        this.initPageTransitions();
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.mobileToggle.classList.toggle('active');
        this.mobileMenu.classList.toggle('active');
        
        if (this.mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.mobileToggle.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    setActivePage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
        
        this.mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.classList.add('active');
            }
        });
    }
    
    initNavCanvas() {
        const navCanvas = document.getElementById('nav-canvas');
        if (!navCanvas) return;
        
        const navSwordAnim = new SwordAnimation({
            canvas: navCanvas,
            scrollBehavior: 'rotate',
            frameCount: 40,
            basePath: './images/sword-sequence/',
            autoplay: true,
            size: 'small'
        });
        navSwordAnim.init();
    }
    
    initPageTransitions() {
        const links = [...this.navLinks, ...this.mobileNavLinks];
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href && !href.startsWith('http') && !href.startsWith('#')) {
                    e.preventDefault();
                    
                    if (window.pageLoader) {
                        window.pageLoader.navigateTo(href);
                    } else {
                        window.location.href = href;
                    }
                }
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
});