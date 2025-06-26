// Projects Page Scripts
document.addEventListener('DOMContentLoaded', () => {
    initProjectsPage();
});

// Global function for page transitions
window.initProjectsPage = function() {
    // Wait for DOM to be ready
    setTimeout(() => {
        // Initialize Locomotive Scroll
        if (typeof window.locomotive === 'function') {
            const locoScroll = window.locomotive();
        }
        // Initialize projects page components
        initProjectCards();
        initProjectModal();
        initStatsCounter();
        initSwordDecoration();
    }, 100);
};

// Project data (in real app, this would come from a database)
const projectsData = {
    1: {
        title: 'AI Teknoloji Lansmanı',
        client: 'TechVision',
        category: 'ai-campaign',
        video: 'https://www.youtube.com/embed/8cTzFwAalJE?si=Fgx3u_e1YpAU8zGd',
        metrics: [
            '+420% Dönüşüm Artışı',
            '-65% Müşteri Edinme Maliyeti',
            '2.8M Video İzlenme',
            '+95% CTR Artışı'
        ],
        description: 'TechVision için geliştirdiğimiz AI destekli lansman kampanyası, makine öğrenmesi algoritmaları ile hedef kitle analizi yaparak kişiselleştirilmiş içerikler üretti.',
        process: [
            'AI ile rakip analizi ve pazar araştırması',
            'Machine learning ile hedef kitle segmentasyonu',
            'Dinamik içerik optimizasyonu',
            'Gerçek zamanlı performans iyileştirme',
            'Multivariate testing ve optimizasyon'
        ]
    },
    2: {
        title: 'EcoLife Marka Hikayesi',
        client: 'EcoLife',
        category: 'brand-film',
        video: 'https://www.youtube.com/embed/aZGH7VTsdXY?si=YP-L4F3gYQKWeo3z',
        metrics: [
            '12M Organik İzlenme',
            '%89 Pozitif Duygu Skoru',
            '3.2M Sosyal Paylaşım',
            '%178 Marka Bilinirliği Artışı'
        ],
        description: 'Sürdürülebilirlik odaklı bu sinematik marka filmi, duygusal storytelling ile çevre bilinci yaratan güçlü bir anlatım sundu.',
        process: [
            'Sürdürülebilirlik odaklı konsept geliştirme',
            '4K sinematik prodüksiyon',
            'Doğal lokasyon çekimleri',
            'Profesyonel renk düzenleme',
            'Multi-platform dağıtım stratejisi'
        ]
    },
    3: {
        title: 'FinNext Dijital Dönüşüm',
        client: 'FinNext',
        category: 'fintech-rebranding',
        video: 'https://www.youtube.com/embed/tq9bNZ_LZZ8?si=tJaAv1ah8aH2nFKM',
        metrics: [
            '+280% Uygulama İndirme',
            '%156 Marka Bilinirliği',
            '4.1M Campaign Reach',
            '+67% User Retention'
        ],
        description: 'FinNext\'in dijital dönüşüm sürecinde marka kimliğini yenileyerek fintech sektöründe güçlü bir konum elde ettik.',
        process: [
            'Fintech pazar analizi ve pozisyonlama',
            'Yeni görsel kimlik tasarımı',
            'Digital-first marka stratejisi',
            'Uygulama store optimizasyonu',
            'Influencer ve partnership kampanyaları'
        ]
    },
    4: {
        title: 'Prestige Collection',
        client: 'Prestige',
        category: 'luxury-positioning',
        video: 'https://www.youtube.com/embed/qS3IS0lpj7o?si=0Em_yQLBwnmsPOsu',
        metrics: [
            '+890% Engagement Rate',
            '%67 Satış Artışı',
            '1.8M Premium Reach',
            '+156% Brand Value'
        ],
        description: 'Lüks marka positioningu ile Prestige\'i premium segmentte güçlü bir oyuncu haline getiren 360° kampanya.',
        process: [
            'Lüks tüketici davranış analizi',
            'Premium brand positioning',
            'High-end visual production',
            'Exclusive distribution strategy',
            'VIP customer experience design'
        ]
    }
};

// Initialize project cards
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 50,
                scale: 0.95
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                }
            }
        );
        
        // Click handler for modal
        card.addEventListener('click', () => {
            const projectId = card.dataset.project;
            openProjectModal(projectId);
        });
        
        // Hover effect on metrics
        const metrics = card.querySelectorAll('.metric');
        metrics.forEach(metric => {
            card.addEventListener('mouseenter', () => {
                gsap.to(metric, {
                    scale: 1.05,
                    duration: 0.3,
                    stagger: 0.05
                });
            });
            
            card.addEventListener('mouseleave', () => {
                gsap.to(metric, {
                    scale: 1,
                    duration: 0.3,
                    stagger: 0.05
                });
            });
        });
    });
}

// Project Modal System
function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = modal.querySelector('.modal-close');
    
    // Close modal
    modalClose.addEventListener('click', closeProjectModal);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}

// Open project modal
function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const data = projectsData[projectId];
    
    if (!data) return;
    
    // Update modal content
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-video iframe').src = data.video;
    
    // Update metrics
    const metricsContainer = modal.querySelector('.modal-metrics');
    metricsContainer.innerHTML = data.metrics.map(metric => 
        `<span class="metric">${metric}</span>`
    ).join('');
    
    // Update description
    modal.querySelector('.modal-description').innerHTML = `<p>${data.description}</p>`;
    
    // Update process
    const processContainer = modal.querySelector('.modal-process');
    processContainer.innerHTML = `
        <h3>Süreç</h3>
        <ul>
            ${data.process.map(step => `<li>${step}</li>`).join('')}
        </ul>
    `;
    
    // Show modal with animation
    modal.classList.add('active');
    gsap.fromTo(modal.querySelector('.modal-content'),
        {
            scale: 0.9,
            opacity: 0
        },
        {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out'
        }
    );
}

// Close project modal
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    
    gsap.to(modal.querySelector('.modal-content'), {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
            // Clear iframe src to stop video
            modal.querySelector('.modal-video iframe').src = '';
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        
        const counter = {
            value: 0
        };
        
        gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: stat,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
                scroller: '#main'
            },
            onUpdate: () => {
                stat.textContent = Math.round(counter.value);
            }
        });
    });
}

// Sword Decoration Animation
function initSwordDecoration() {
    const swordDecoration = document.querySelector('.sword-decoration');
    if (!swordDecoration) return;
    
    // Continuous animation
    gsap.to(swordDecoration, {
        x: '+=20',
        y: '-=10',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
    
    // Glow effect on scroll
    gsap.to(swordDecoration, {
        opacity: 0.5,
        boxShadow: '0 0 40px rgba(56, 189, 248, 0.8)',
        scrollTrigger: {
            trigger: '#projects-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            scroller: '#main'
        }
    });
}

// Enhanced CTA button
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    let hoverAnimation;
    
    ctaButton.addEventListener('mouseenter', () => {
        hoverAnimation = gsap.to(ctaButton, {
            scale: 1.05,
            boxShadow: '0 15px 40px rgba(249, 115, 22, 0.4)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        if (hoverAnimation) hoverAnimation.kill();
        gsap.to(ctaButton, {
            scale: 1,
            boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3)',
            duration: 0.3,
            ease: 'power2.out'
        });
    });
}