function loaderEffect() {
    const loader = document.querySelector("#loader");
    const mainContent = document.querySelector("#main");

    window.addEventListener('load', () => {
        if (loader) {
            loader.classList.add('hidden');
        }
        
        if (mainContent) {
            mainContent.classList.add('loaded');
        }
    });
}
loaderEffect();

function locomotive() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true,
    });
    
    locoScroll.on("scroll", ScrollTrigger.update);
    const footer = document.querySelector('#footer');
    if (footer) {
        locoScroll.on('scroll', (obj) => {
            footer.style.transform = `translateY(-${obj.scroll.y}px)`;
        });
    }
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length
                ? locoScroll.scrollTo(value, 0, 0)
                : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: document.querySelector("#main").style.transform
            ? "transform"
            : "fixed",
    });
    
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    
    return locoScroll;
}

window.locomotive = locomotive;

// OPTIMIZED IMAGE PRELOADING FUNCTION
function preloadCriticalSwordImages() {
    console.log('🚀 Preloading critical sword images...');
    
    const basePath = 'images/sword-sequence/';
    const criticalFrames = [1, 4, 7, 10]; // First few frames for immediate display
    
    criticalFrames.forEach(frameIndex => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.loading = 'eager';
        
        const frameFile = `${basePath}${String(frameIndex).padStart(4, '0')}.png`;
        
        img.onload = () => {
            console.log(`⚡ Critical frame ${frameIndex} preloaded`);
        };
        
        img.onerror = () => {
            console.warn(`⚠️ Failed to preload critical frame ${frameIndex}`);
        };
        
        img.src = frameFile;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🗡️ Sword Nest loading...');
    
    // Start critical image preloading immediately
    preloadCriticalSwordImages();
    
    // Initialize locomotive scroll
    const locoScroll = locomotive();
    
    // Initialize sword animation with optimized settings
    const mainCanvas = document.querySelector('canvas');
    if (mainCanvas) {
        console.log('🎯 Canvas found, initializing optimized sword animation...');
        
        const swordAnim = new SwordAnimation({
            canvas: mainCanvas,
            scrollBehavior: 'scroll',
            frameCount: 40, // Adjust based on your actual image count
            basePath: 'images/sword-sequence/',
            scrollTrigger: {
                trigger: '#page',
                start: 'top top',
                end: '400% top',
                scroller: '#main'
            }
        });
        
        // Initialize with performance monitoring
        const startTime = performance.now();
        swordAnim.init();
        
        // Monitor loading progress
        const loadingMonitor = setInterval(() => {
            const status = swordAnim.getLoadingStatus();
            console.log(`🗡️ Loading progress: ${status.percentage}% (${status.loaded}/${status.total})`);
            
            if (status.percentage >= 100) {
                clearInterval(loadingMonitor);
                const loadTime = performance.now() - startTime;
                console.log(`✅ Sword animation fully loaded in ${Math.round(loadTime)}ms`);
            }
        }, 1000);
        
        // Clear monitor after 30 seconds max
        setTimeout(() => clearInterval(loadingMonitor), 30000);
        
        window.swordAnimation = swordAnim;
        console.log('🚀 Optimized sword animation initialized!');
    } else {
        console.log('❌ Canvas element not found!');
    }
    
    // Optimize scroll handling
    let lastScroll = 0;
    let scrollTicking = false;
    
    function updateNavigation() {
        const currentScroll = window.pageYOffset;
        const nav = document.getElementById('nav');
        
        if (nav) {
            if (currentScroll > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
        scrollTicking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateNavigation);
            scrollTicking = true;
        }
    });
    
    // Optimized video lazy loading
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const iframe = entry.target;
                if (!iframe.dataset.loaded) {
                    iframe.dataset.loaded = 'true';
                    console.log('🎬 Video loaded:', iframe.src);
                    
                    // Preload video thumbnail
                    if (iframe.src.includes('youtube.com')) {
                        const videoId = iframe.src.match(/embed\/([^?]+)/)?.[1];
                        if (videoId) {
                            const thumbnail = new Image();
                            thumbnail.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
                        }
                    }
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '100px' // Load videos before they're fully visible
    });
    
    document.querySelectorAll('iframe').forEach(iframe => {
        videoObserver.observe(iframe);
    });
    
    // Initialize animations with delay to prioritize image loading
    setTimeout(() => {
        initGSAPAnimations();
    }, 500);
});

function initGSAPAnimations() {
    // Stagger animations to reduce initial load
    gsap.from("#loop h1", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
    });
    
    // Video containers with reduced motion for performance
    gsap.utils.toArray('.video-glow').forEach((video, index) => {
        gsap.fromTo(video, 
            {
                opacity: 0,
                scale: 0.9
            },
            {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: video,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    scroller: '#main',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Text animations with performance optimization
    gsap.utils.toArray('#page h3, #page h4').forEach((text, index) => {
        gsap.fromTo(text,
            {
                opacity: 0,
                x: -50
            },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: text,
                    start: 'top 85%',
                    scroller: '#main',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Optimized text animations for other sections
    gsap.utils.toArray('#left-text, #text1, #text2, #text3').forEach((text, index) => {
        const direction = text.id.includes('left') || text.id === 'text1' ? -50 : 50;
        
        gsap.fromTo(text,
            {
                opacity: 0,
                x: direction
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: text,
                    start: 'top 75%',
                    scroller: '#main',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Footer animation
    gsap.fromTo('#footer',
        {
            opacity: 0,
            y: 30
        },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '#footer',
                start: 'top 90%',
                scroller: '#main',
                toggleActions: 'play none none reverse'
            }
        }
    );
}

// Enhanced debug functions
window.debugSword = function() {
    if (window.swordAnimation) {
        console.log('🗡️ Sword Animation Instance:', window.swordAnimation);
        console.log('📊 Loading Status:', window.swordAnimation.getLoadingStatus());
        console.log('🎬 Current Frame:', window.swordAnimation.imageSeq.frame);
        console.log('🖼️ Images Loaded:', window.swordAnimation.images.filter(img => img && img.complete).length);
        console.log('✅ Is Ready:', window.swordAnimation.isLoaded);
    } else {
        console.log('❌ Sword animation instance not found!');
    }
};

// Performance monitoring
window.debugPerformance = function() {
    console.log('🚀 Performance Metrics:');
    console.log('- Page Load:', performance.timing.loadEventEnd - performance.timing.navigationStart, 'ms');
    console.log('- DOM Ready:', performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart, 'ms');
    console.log('- First Paint:', performance.getEntriesByType('paint')[0]?.startTime || 'N/A', 'ms');
    
    if (window.swordAnimation) {
        console.log('- Sword Status:', window.swordAnimation.getLoadingStatus());
    }
};

// Optimized resize handler
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
        
        // Update canvas size
        if (window.swordAnimation && window.swordAnimation.canvas) {
            window.swordAnimation.setCanvasSize();
            window.swordAnimation.render();
        }
    }, 250); // Debounce resize events
});

// Error handling with detailed logging
window.addEventListener('error', (e) => {
    console.error('🚨 JavaScript Error:', {
        message: e.error?.message || e.message,
        filename: e.filename,
        line: e.lineno,
        column: e.colno,
        stack: e.error?.stack
    });
});

// Success message
console.log('🗡️ Sword Nest - Optimized script loaded!');
console.log('🔧 Debug commands: window.debugSword(), window.debugSwordLoading(), window.debugPerformance()');
console.log('⚡ Image loading optimizations active');