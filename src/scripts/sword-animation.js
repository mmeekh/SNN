/* ===================================
   SWORD NEST - SWORD ANIMATION
   Interactive Sword Rotation System
   =================================== */

class SwordAnimation {
    constructor() {
        this.currentSwordIndex = 1;
        this.totalSwordImages = 120;
        this.swordImage = document.getElementById('swordImage');
        this.isLoaded = false;
        this.imageCache = new Map();
        
        this.init();
    }

    init() {
        this.preloadImages();
        this.bindEvents();
        this.updateSwordImage();
        this.updateScrollEffects();
    }

    // Preload sword images for smooth animation
    preloadImages() {
        console.log('🗡️ Sword images loading...');
        
        // Preload first 20 images immediately for quick start
        for (let i = 1; i <= 20; i++) {
            this.loadImage(i);
        }
        
        // Lazy load remaining images
        setTimeout(() => {
            for (let i = 21; i <= this.totalSwordImages; i++) {
                this.loadImage(i);
            }
        }, 1000);
    }

    loadImage(index) {
        const imageNumber = String(index).padStart(4, '0');
        const imagePath = `assets/images/sword-rotation/${imageNumber}.png`;
        
        if (!this.imageCache.has(index)) {
            const img = new Image();
            img.onload = () => {
                this.imageCache.set(index, imagePath);
                if (index === 1) this.isLoaded = true;
            };
            img.onerror = () => {
                console.warn(`❌ Failed to load sword image: ${imagePath}`);
            };
            img.src = imagePath;
        }
    }

    updateSwordImage() {
        if (!this.isLoaded) return;

        // Çok hızlı dönüş - scroll'un 30%'inde tüm resimleri göster
        const scrollPercent = Math.min(window.scrollY / (document.body.scrollHeight * 0.3), 1);
        const imageIndex = Math.min(Math.floor(scrollPercent * this.totalSwordImages) + 1, this.totalSwordImages);
        
        if (imageIndex !== this.currentSwordIndex && imageIndex >= 1) {
            this.currentSwordIndex = imageIndex;
            
            // Use cached image if available
            if (this.imageCache.has(imageIndex)) {
                this.swordImage.src = this.imageCache.get(imageIndex);
            } else {
                // Fallback to direct path
                const imageNumber = String(imageIndex).padStart(4, '0');
                this.swordImage.src = `assets/images/sword-rotation/${imageNumber}.png`;
            }
            
            // Trigger rotation effect
            this.triggerRotationEffect();
        }
    }

    triggerRotationEffect() {
        // Add subtle rotation animation on image change
        this.swordImage.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.swordImage.style.transform = 'scale(1)';
        }, 100);
    }

    updateScrollEffects() {
        const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const glowIntensity = 0.3 + (scrollPercent * 0.7);
        
        // Kılıç glow efekti
        this.swordImage.style.filter = `
            drop-shadow(0 0 ${20 * glowIntensity}px #38BDF8) 
            drop-shadow(0 0 ${40 * glowIntensity}px #38BDF8) 
            drop-shadow(0 0 ${60 * glowIntensity}px rgba(56, 189, 248, ${glowIntensity}))
        `;
        
        // Yazıyı hareket ettir
        this.updateTitleMovement();
        
        // Kılıç rotasyon efekti
        this.updateSwordRotation(scrollPercent);
    }

    updateTitleMovement() {
        const heroTitle = document.querySelector('.hero-title');
        if (!heroTitle) return;
        
        if (window.scrollY > 100) {
            heroTitle.style.opacity = '0';
            heroTitle.style.transform = 'translateX(-50%) translateY(-50px)';
        } else {
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateX(-50%) translateY(0)';
        }
    }

    updateSwordRotation(scrollPercent) {
        // Subtle sword container rotation based on scroll
        const rotation = scrollPercent * 5; // Max 5 degrees rotation
        const swordContainer = document.querySelector('.sword-container');
        
        if (swordContainer) {
            swordContainer.style.transform = `
                translate(-50%, -50%) 
                rotate(${rotation}deg)
            `;
        }
    }

    bindEvents() {
        // Throttled scroll event for performance
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.updateSwordImage();
                    this.updateScrollEffects();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Handle visibility change to pause/resume animations
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.swordImage.style.animationPlayState = 'paused';
            } else {
                this.swordImage.style.animationPlayState = 'running';
            }
        });

        // Debug info in console
        window.addEventListener('keydown', (e) => {
            if (e.key === 'D' && e.ctrlKey) {
                console.log('🗡️ Sword Debug Info:', {
                    currentIndex: this.currentSwordIndex,
                    totalImages: this.totalSwordImages,
                    cachedImages: this.imageCache.size,
                    scrollPercent: window.scrollY / (document.body.scrollHeight - window.innerHeight)
                });
            }
        });
    }

    // Public methods
    jumpToFrame(frameNumber) {
        if (frameNumber >= 1 && frameNumber <= this.totalSwordImages) {
            this.currentSwordIndex = frameNumber;
            const imageNumber = String(frameNumber).padStart(4, '0');
            this.swordImage.src = `assets/images/sword-rotation/${imageNumber}.png`;
        }
    }

    reset() {
        this.currentSwordIndex = 1;
        this.jumpToFrame(1);
        window.scrollTo(0, 0);
    }

    setSpeed(multiplier = 1) {
        // Adjust animation speed (1 = normal, 2 = 2x faster, 0.5 = 2x slower)
        this.speedMultiplier = multiplier;
    }
}

// Initialize sword animation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.swordAnimation = new SwordAnimation();
    console.log('🗡️ Sword Animation System Initialized');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SwordAnimation;
}