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

// KILIÇ ANİMASYONU - ESKİ ÇALIŞAN VERSİYONA GÖRE DÜZELTİLDİ
let canvas, nav, page, nestText, context;
let frameCount = 40; // 0001, 0004, 0007, ..., 0118 = 40 frame
let images = [];
let imageSeq = { frame: 1 };

function initSwordAnimation() {
    canvas = document.querySelector("canvas");
    nav = document.querySelector("#nav");
    page = document.querySelector("#page");
    
    if (!canvas || !nav || !page) {
        console.error('❌ Required elements not found for sword animation');
        return;
    }

    function handleDynamicLayout() {
        const isMobile = window.innerWidth <= 768;
        const isCanvasInNav = nav.contains(canvas);

        if (isMobile && !isCanvasInNav) {
            if (canvas && nav) {
                // Mobilde canvas'ı nav-brand'den sonra ekle
                const navBrand = nav.querySelector('.nav-brand');
                if (navBrand) {
                    nav.insertBefore(canvas, navBrand.nextSibling);
                }
            }
        } else if (!isMobile && isCanvasInNav) {
            page.appendChild(canvas);
        }
    }

    handleDynamicLayout();

    context = canvas.getContext("2d");

    function setCanvasSize() {
        if (window.innerWidth > 768) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        } else {
            canvas.width = 60;
            canvas.height = 60;
        }
    }

    setCanvasSize();

    window.addEventListener("resize", function () {
        setCanvasSize();
        render();
        handleDynamicLayout();
    });

    function files(index) {
        return `images/sword-sequence/${String(index).padStart(4, '0')}.png`;
    }

    // Load images
    for (let i = 0; i < frameCount; i++) {
        const frameIndex = 1 + (i * 3);
        const img = new Image();
        img.src = files(frameIndex);
        images.push(img);
    }

    gsap.to(imageSeq, {
        frame: frameCount,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            scrub: 0.15,
            trigger: "#page",
            start: "top top",
            end: "400% top",
            scroller: "#main",
        },
        onUpdate: render,
    });

    if (images.length > 0) {
        images[0].onload = render;
    }

    function render() {
        const currentImage = images[imageSeq.frame - 1];
        if (currentImage) {
            scaleImage(currentImage, context);
        }
    }

    function scaleImage(img, ctx) {
        var canvas = ctx.canvas;
        var hRatio = canvas.width / img.width;
        var vRatio = canvas.height / img.height;
        var ratio = Math.max(hRatio, vRatio);

        if (window.innerWidth > 768) {
            ratio *= 0.85;
        }

        var centerShift_x = (canvas.width - img.width * ratio) / 2;
        var centerShift_y = (canvas.height - img.height * ratio) / 2;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
            img,
            0,
            0,
            img.width,
            img.height,
            centerShift_x,
            centerShift_y,
            img.width * ratio,
            img.height * ratio
        );
    }

    ScrollTrigger.matchMedia({
        "(min-width: 769px)": function() {
            ScrollTrigger.create({
                trigger: "#page>canvas",
                pin: true,
                scroller: "#main",
                start: "top top",
                end: "600% top",
            });
        },
        "(max-width: 768px)": function() {
            // Mobilde JS ile pinleme yapılmıyor.
        }
    });
    
    console.log('🗡️ Sword animation initialized successfully!');
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('🗡️ Sword Nest loading...');
    
    // Initialize locomotive scroll
    const locoScroll = locomotive();
    
    // Initialize sword animation
    initSwordAnimation();
    
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
    
    // SADELEŞTİRİLMİŞ FOOTER ANİMASYONU - Sadece opacity
    const footer = document.querySelector('#footer');
    if (footer) {
        gsap.fromTo(footer,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" }
        );
    }
}

// Enhanced debug functions
window.debugSword = function() {
    console.log('🗡️ Sword Animation Debug:');
    console.log('- Canvas:', canvas);
    console.log('- Context:', context);
    console.log('- Images loaded:', images.filter(img => img && img.complete).length);
    console.log('- Current frame:', imageSeq.frame);
    console.log('- Frame count:', frameCount);
    console.log('- First image src:', images[0]?.src);
    console.log('- Last image src:', images[images.length-1]?.src);
    console.log('- Images array length:', images.length);
    console.log('- Canvas size:', canvas ? `${canvas.width}x${canvas.height}` : 'N/A');
    console.log('- Canvas position:', canvas ? canvas.getBoundingClientRect() : 'N/A');
};

// Footer debug function
window.debugFooter = function() {
    const footer = document.querySelector('#footer');
    if (footer) {
        const rect = footer.getBoundingClientRect();
        const styles = window.getComputedStyle(footer);
        console.log('🦶 Footer Debug Info:');
        console.log('- Position:', styles.position);
        console.log('- Transform:', styles.transform);
        console.log('- Opacity:', styles.opacity);
        console.log('- Z-index:', styles.zIndex);
        console.log('- Bounding Rect:', rect);
        console.log('- Scroll Y:', window.pageYOffset);
        console.log('- Visible:', rect.top < window.innerHeight && rect.bottom > 0);
    } else {
        console.log('❌ Footer not found!');
    }
};

// Performance monitoring
window.debugPerformance = function() {
    console.log('🚀 Performance Metrics:');
    console.log('- Page Load:', performance.timing.loadEventEnd - performance.timing.navigationStart, 'ms');
    console.log('- DOM Ready:', performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart, 'ms');
    console.log('- First Paint:', performance.getEntriesByType('paint')[0]?.startTime || 'N/A', 'ms');
};

// Optimized resize handler
window.addEventListener('resize', () => {
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    
    // Update canvas size
    setCanvasSize();
    render();
    
    // Ensure footer stays visible
    const footer = document.querySelector('#footer');
    if (footer) {
        gsap.set(footer, { 
            clearProps: "transform",
            opacity: 1 
        });
    }
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
console.log('🗡️ Sword Nest - Fixed script loaded!');
console.log('🔧 Debug commands: window.debugSword(), window.debugPerformance(), window.debugFooter()');
console.log('⚡ Footer issue resolved - no more disappearing!');
console.log('🦶 Footer will stay visible once scrolled into view');