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

// YENİ FONKSİYON: Sadece mobilse canvas'ı nav içine taşı
function setupMobileLayout() {
    if (window.innerWidth <= 768) {
        const canvas = document.querySelector("canvas");
        const nav = document.querySelector("#nav");
        const nestText = nav.children[1]; // Nav içindeki ikinci eleman ('NEST' başlığı)

        if (canvas && nav && nestText) {
            // canvas'ı nav'ın içine, 'NEST' yazısından önceye ekle
            nav.insertBefore(canvas, nestText);
        }
    }
}
// Fonksiyonu hemen çağır
setupMobileLayout();


const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

function setCanvasSize() {
  if (window.innerWidth > 768) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  } else {
    canvas.width = 50;
    canvas.height = 50;
  }
}

setCanvasSize();

window.addEventListener("resize", function () {
  setCanvasSize();
  // YENİ: Ekran boyutu değiştiğinde yerleşimi tekrar kontrol et (opsiyonel ama iyi bir pratik)
  // Not: Bu basit senaryoda sayfa yenilemesi daha garanti sonuç verir.
  render();
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
    
    // Sayfalar arası geçişlerde duraksama kaldırıldı - pin animasyonları iptal edildi
    
  },
  "(max-width: 768px)": function() {
    // Mobilde JS ile pinleme yapılmıyor.
  }
});