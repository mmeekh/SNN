function loaderEffect() {
    const loader = document.querySelector("#loader");
    const mainContent = document.querySelector("#main");

    // 'window.onload', görseller dahil tüm içeriğin yüklenmesini bekler.
    window.addEventListener('load', () => {
        // Yükleyiciyi gizle
        loader.classList.add('hidden');
        
        // Ana içeriği göster
        mainContent.classList.add('loaded');
    });
}
loaderEffect();
// --- SAYFA YÜKLENME EFEKTİ LOGIĞI SONU ---
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
}
locomotive();

const canvas = document.querySelector("canvas");
const nav = document.querySelector("#nav");
const page = document.querySelector("#page"); // Canvas'ın orijinal ebeveyni
const nestText = nav.children[1]; // Nav içindeki 'NEST' başlığı

function handleDynamicLayout() {
    const isMobile = window.innerWidth <= 768;
    // Canvas'ın anlık olarak navigasyon çubuğunun içinde olup olmadığını kontrol et
    const isCanvasInNav = nav.contains(canvas);

    // EĞER: Mobil ekrandaysak VE canvas navigasyonda DEĞİLSE...
    if (isMobile && !isCanvasInNav) {
        // Canvas'ı navigasyonun içine, 'NEST' yazısından önceye ekle
        if (canvas && nav && nestText) {
            nav.insertBefore(canvas, nestText);
        }
    } 
    // EĞER: Mobil ekranda DEĞİLSEK (masaüstü) VE canvas navigasyondaysa...
    else if (!isMobile && isCanvasInNav) {
        // Canvas'ı orijinal ebeveyni olan #page elementinin sonuna geri ekle
        page.appendChild(canvas);
    }
}

handleDynamicLayout();



const context = canvas.getContext("2d");

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
  return `./${String(index).padStart(4, '0')}.png`;
}

const frameCount = 40; 

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const frameIndex = 1 + (i * 3);
  const img = new Image();
  img.src = files(frameIndex);
  images.push(img);
}

gsap.to(imageSeq, {
  frame: frameCount,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: 0.15,
    trigger: `#page`,
    start: `top top`,
    end: `600% top`,
    scroller: `#main`,
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
    ratio *= 0.95;
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
      scroller: `#main`,
      start: `top top`,
      end: `600% top`,
    });
  },
  "(max-width: 768px)": function() {
    // Mobilde JS ile pinleme yapılmıyor.
  }
});