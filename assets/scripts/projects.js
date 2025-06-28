
document.addEventListener('DOMContentLoaded', () => {
    initProjectsPage();
});


window.initProjectsPage = function() {

    setTimeout(() => {

        if (typeof window.locomotive === 'function') {
            const locoScroll = window.locomotive();
        }

        initProjectCards();
        initProjectModal();
        initStatsCounter();
        initSwordDecoration();
    }, 100);
};


const projectsData = {
    1: {
        title: 'Lojistikte Güç ve Hız Kampanyası',
        client: 'Lojistikte Güç ve Hız',
        category: 'ai-campaign',
        video: 'https://www.youtube.com/embed/8cTzFwAalJE?si=Fgx3u_e1YpAU8zGd',
        metrics: [
            '+420% Dönüşüm Artışı',
            '-65% Müşteri Edinme Maliyeti',
            '2.8M Video İzlenme',
            '+95% CTR Artışı'
        ],
        description: 'Lojistik sektöründe geliştirdiğimiz AI destekli kampanya, makine öğrenmesi algoritmaları ile operasyonel verimlilik ve hız sağladı.',
        process: [
            'AI ile rota ve filo optimizasyonu',
            'Gerçek zamanlı veri analitiği',
            'Dinamik içerik optimizasyonu',
            'Performans iyileştirme',
            'Çoklu kanal entegrasyonu'
        ]
    },
    2: {
        title: 'Projeniz Bitmeden Tanıtımı Hazır',
        client: 'Projeniz Bitmeden Tanıtımı Hazır',
        category: 'brand-film',
        video: 'https://www.youtube.com/embed/aZGH7VTsdXY?si=YP-L4F3gYQKWeo3z',
        metrics: [
            '12M Organik İzlenme',
            '%89 Pozitif Duygu Skoru',
            '3.2M Sosyal Paylaşım',
            '%178 Marka Bilinirliği Artışı'
        ],
        description: 'İnşaat ve proje sektöründe, tamamlanmadan önce tanıtım filmi ile fark yaratan bir marka hikayesi sunduk.',
        process: [
            '3D modelleme ve animasyon',
            'Sinematik prodüksiyon',
            'Drone ve dış çekimler',
            'Profesyonel renk düzenleme',
            'Çoklu platform yayını'
        ]
    },
    3: {
        title: 'Otel Reklamcılığında Yeni Dönem',
        client: 'Otel Reklamcılığında Yeni Dönem',
        category: 'fintech-rebranding',
        video: 'https://www.youtube.com/embed/tq9bNZ_LZZ8?si=tJaAv1ah8aH2nFKM',
        metrics: [
            '+280% Uygulama İndirme',
            '%156 Marka Bilinirliği',
            '4.1M Campaign Reach',
            '+67% User Retention'
        ],
        description: 'Otel ve turizm sektöründe dijital dönüşüm ile marka bilinirliğini ve müşteri sadakatini artıran yenilikçi bir kampanya.',
        process: [
            'Sektörel pazar analizi',
            'Yeni görsel kimlik tasarımı',
            'Dijital-first marka stratejisi',
            'Rezervasyon optimizasyonu',
            'Influencer ve partnership kampanyaları'
        ]
    },
    4: {
        title: 'Geleceğin Eğitimi',
        client: 'Geleceğin Eğitimi',
        category: 'luxury-positioning',
        video: 'https://www.youtube.com/embed/qS3IS0lpj7o?si=0Em_yQLBwnmsPOsu',
        metrics: [
            '+890% Engagement Rate',
            '%67 Satış Artışı',
            '1.8M Premium Reach',
            '+156% Brand Value'
        ],
        description: 'Eğitim sektöründe yenilikçi teknolojilerle hazırlanan, geleceğin eğitim vizyonunu yansıtan bir başarı hikayesi.',
        process: [
            'Eğitim teknolojileri analizi',
            'Yenilikçi içerik geliştirme',
            'Online ve hibrit eğitim stratejisi',
            'Çoklu kanal iletişimi',
            'Öğrenci deneyimi optimizasyonu'
        ]
    }
};


function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        let rotationY = 0;
        let isHovering = false;
        let idleAnimation = null;

        gsap.fromTo(card,
            {
                opacity: 0,
                y: 50,
                scale: 0.95,
                rotationY: -180
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 360,
                duration: 1.2,
                delay: index * 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse',
                    scroller: '#main'
                },
                onComplete: () => {
                    gsap.set(card, { rotationY: 0 });
                    rotationY = 0;
                    startIdleAnimation(card, index);
                }
            }
        );

        function startIdleAnimation(card, index) {
            idleAnimation = gsap.to(card, {
                y: '+=10',
                rotationY: '+=5',
                duration: 3 + index * 0.2,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut'
            });
        }
        function stopIdleAnimation() {
            if (idleAnimation) {
                idleAnimation.kill();
                gsap.to(card, {
                    y: 0,
                    duration: 0.3
                });
            }
        }
        card.addEventListener('mouseenter', () => {
            isHovering = true;
            card.style.cursor = 'grab';
            stopIdleAnimation();
        });
        card.addEventListener('mouseleave', () => {
            isHovering = false;
            card.style.cursor = 'pointer';
            gsap.to(card, {
                rotationY: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)',
                onComplete: () => {
                    startIdleAnimation(card, index);
                }
            });
            rotationY = 0;
        });
        let startX = 0;
        let isDragging = false;
        card.addEventListener('mousedown', (e) => {
            if (isHovering) {
                isDragging = true;
                startX = e.clientX;
                card.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });
        window.addEventListener('mousemove', (e) => {
            if (isDragging && isHovering) {
                const deltaX = e.clientX - startX;
                rotationY += deltaX * 0.5;
                gsap.set(card, {
                    rotationY: rotationY,
                    ease: 'none'
                });
                startX = e.clientX;
            }
        });
        window.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                card.style.cursor = isHovering ? 'grab' : 'pointer';
                const momentum = rotationY * 0.05;
                gsap.to(card, {
                    rotationY: rotationY + momentum,
                    duration: 1,
                    ease: 'power2.out',
                    onUpdate: function() {
                        rotationY = this.targets()[0]._gsap.rotationY;
                    }
                });
            }
        });
        card.addEventListener('click', () => {
            if (Math.abs(rotationY % 360) < 10) {
                const projectId = card.dataset.project;
                openProjectModal(projectId);
            }
        });
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


function initProjectModal() {
    const modal = document.getElementById('project-modal');
    const modalClose = modal.querySelector('.modal-close');
    

    modalClose.addEventListener('click', closeProjectModal);
    

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
}


function openProjectModal(projectId) {
    const modal = document.getElementById('project-modal');
    const data = projectsData[projectId];
    
    if (!data) return;
    

    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-video iframe').src = data.video;
    

    const metricsContainer = modal.querySelector('.modal-metrics');
    metricsContainer.innerHTML = data.metrics.map(metric => 
        `<span class="metric">${metric}</span>`
    ).join('');
    

    modal.querySelector('.modal-description').innerHTML = `<p>${data.description}</p>`;
    

    const processContainer = modal.querySelector('.modal-process');
    processContainer.innerHTML = `
        <h3>Süreç</h3>
        <ul>
            ${data.process.map(step => `<li>${step}</li>`).join('')}
        </ul>
    `;
    

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

function initSwordDecoration() {
    const swordDecoration = document.querySelector('.sword-decoration');
    if (!swordDecoration) return;
    
    gsap.to(swordDecoration, {
        x: '+=20',
        y: '-=10',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
    });
    
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