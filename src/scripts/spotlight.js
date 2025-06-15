/* ===================================
   SWORD NEST - SPOTLIGHT EFFECTS
   Interactive Mouse Spotlight System
   =================================== */

class SpotlightEffect {
    constructor() {
        this.spotlight = document.querySelector('.spotlight');
        this.cursor = document.querySelector('.custom-cursor');
        this.isActive = true;
        this.mouseX = 0;
        this.mouseY = 0;
        this.spotlightSize = 300;
        this.cursorTrails = [];
        
        this.init();
    }

    init() {
        this.createCursorTrails();
        this.bindEvents();
        this.startAnimationLoop();
        
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        console.log('✨ Spotlight Effect System Initialized');
    }

    createCursorTrails() {
        // Create multiple cursor trail elements for smooth effect
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.cssText = `
                position: fixed;
                width: ${15 - i * 2}px;
                height: ${15 - i * 2}px;
                border: 1px solid rgba(56, 189, 248, ${0.8 - i * 0.15});
                border-radius: 50%;
                pointer-events: none;
                z-index: ${9998 - i};
                transform: translate(-50%, -50%);
                transition: all 0.${i + 1}s ease;
                background: rgba(56, 189, 248, ${0.1 - i * 0.02});
            `;
            document.body.appendChild(trail);
            this.cursorTrails.push(trail);
        }
    }

    updateSpotlight(e) {
        if (!this.isActive) return;
        
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
        
        // Update main spotlight
        if (this.spotlight) {
            this.spotlight.style.left = this.mouseX + 'px';
            this.spotlight.style.top = this.mouseY + 'px';
        }
        
        // Update custom cursor
        if (this.cursor) {
            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        }
        
        // Update cursor trails with delay
        this.cursorTrails.forEach((trail, index) => {
            setTimeout(() => {
                trail.style.left = this.mouseX + 'px';
                trail.style.top = this.mouseY + 'px';
            }, index * 50);
        });
        
        // Add interaction effects
        this.checkInteractiveElements(e);
    }

    checkInteractiveElements(e) {
        const element = document.elementFromPoint(e.clientX, e.clientY);
        
        if (element) {
            // Check if hovering over interactive elements
            const isInteractive = element.matches('button, a, .cta-button, .video-placeholder') || 
                                 element.closest('button, a, .cta-button, .video-placeholder');
            
            if (isInteractive) {
                this.setHoverState(true);
            } else {
                this.setHoverState(false);
            }
            
            // Special effects for content areas
            const isContent = element.closest('.left-content, .right-content, .video-section');
            if (isContent) {
                this.enhanceSpotlight(true);
            } else {
                this.enhanceSpotlight(false);
            }
        }
    }

    setHoverState(isHovering) {
        if (isHovering) {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            this.cursor.style.background = 'rgba(249, 115, 22, 0.3)';
            this.cursor.style.borderColor = '#F97316';
        } else {
            this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            this.cursor.style.background = 'rgba(56, 189, 248, 0.1)';
            this.cursor.style.borderColor = '#38BDF8';
        }
    }

    enhanceSpotlight(enhanced) {
        if (enhanced) {
            this.spotlight.style.width = '400px';
            this.spotlight.style.height = '400px';
            this.spotlight.style.background = 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.8) 70%)';
        } else {
            this.spotlight.style.width = '300px';
            this.spotlight.style.height = '300px';
            this.spotlight.style.background = 'radial-gradient(circle, transparent 0%, rgba(0, 0, 0, 0.9) 70%)';
        }
    }

    createSpotlightPulse(x, y) {
        const pulse = document.createElement('div');
        pulse.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 50px;
            height: 50px;
            border: 2px solid #38BDF8;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9997;
            transform: translate(-50%, -50%);
            animation: spotlightPulse 1s ease-out forwards;
        `;
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spotlightPulse {
                0% {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(3);
                }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(pulse);
        
        setTimeout(() => {
            document.body.removeChild(pulse);
            document.head.removeChild(style);
        }, 1000);
    }

    bindEvents() {
        // Mouse movement
        document.addEventListener('mousemove', (e) => {
            this.updateSpotlight(e);
        });

        // Click effects
        document.addEventListener('click', (e) => {
            this.createSpotlightPulse(e.clientX, e.clientY);
        });

        // Mouse enter/leave document
        document.addEventListener('mouseenter', () => {
            this.isActive = true;
            this.spotlight.style.opacity = '1';
            this.cursor.style.opacity = '1';
        });

        document.addEventListener('mouseleave', () => {
            this.spotlight.style.opacity = '0';
            this.cursor.style.opacity = '0';
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'h':
                case 'H':
                    this.toggle();
                    break;
                case '+':
                    this.adjustSize(50);
                    break;
                case '-':
                    this.adjustSize(-50);
                    break;
            }
        });

        // Touch support for mobile
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.updateSpotlight({
                clientX: touch.clientX,
                clientY: touch.clientY
            });
        });

        // Window focus/blur
        window.addEventListener('blur', () => {
            this.isActive = false;
        });

        window.addEventListener('focus', () => {
            this.isActive = true;
        });
    }

    startAnimationLoop() {
        // Smooth animation loop for performance
        const animate = () => {
            if (this.isActive) {
                // Add subtle floating animation to spotlight
                const time = Date.now() * 0.001;
                const wobbleX = Math.sin(time * 0.5) * 2;
                const wobbleY = Math.cos(time * 0.3) * 1;
                
                if (this.spotlight) {
                    this.spotlight.style.transform = `
                        translate(calc(-50% + ${wobbleX}px), calc(-50% + ${wobbleY}px))
                    `;
                }
            }
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    // Public methods
    toggle() {
        this.isActive = !this.isActive;
        const opacity = this.isActive ? '1' : '0';
        
        this.spotlight.style.opacity = opacity;
        this.cursor.style.opacity = opacity;
        this.cursorTrails.forEach(trail => {
            trail.style.opacity = opacity;
        });
        
        console.log(`✨ Spotlight ${this.isActive ? 'enabled' : 'disabled'}`);
    }

    adjustSize(delta) {
        this.spotlightSize = Math.max(100, Math.min(500, this.spotlightSize + delta));
        this.spotlight.style.width = this.spotlightSize + 'px';
        this.spotlight.style.height = this.spotlightSize + 'px';
        
        console.log(`✨ Spotlight size: ${this.spotlightSize}px`);
    }

    setColor(color = '#38BDF8') {
        this.cursor.style.borderColor = color;
        this.cursorTrails.forEach(trail => {
            trail.style.borderColor = color;
        });
    }

    destroy() {
        document.body.style.cursor = 'auto';
        this.cursorTrails.forEach(trail => {
            document.body.removeChild(trail);
        });
        this.isActive = false;
    }
}

// Initialize spotlight when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.spotlightEffect = new SpotlightEffect();
    
    // Add help text
    console.log(`
🌟 SPOTLIGHT CONTROLS:
• Press 'H' to toggle spotlight
• Press '+' to increase size
• Press '-' to decrease size
• Ctrl+D for debug info
    `);
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpotlightEffect;
}