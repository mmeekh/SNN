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
  render();
});

function files(index) {
  return `./${String(index).padStart(4, '0')}.png`;
}

// --- KOD GÜNCELLEMELERİ BURADA BAŞLIYOR ---

const frameCount = 40; // Kare sayısı 40 olarak güncellendi.

const images = [];
const imageSeq = {
  frame: 1,
};

// Döngü, 1, 4, 7... şeklinde 3'er atlayan dosya adlarını yükleyecek şekilde güncellendi.
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

// İlk karenin yüklenmesi için 0. index kullanılıyor.
if (images.length > 0) {
    images[0].onload = render;
}


function render() {
  // GSAP'nin 1'den başlayan frame'i ile array'in 0'dan başlayan index'i arasındaki fark düzeltildi.
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
    
    gsap.to("#page1", {
      scrollTrigger: {
        trigger: `#page1`,
        start: `top top`,
        end: `bottom top`,
        pin: true,
        scroller: `#main`
      }
    });
    gsap.to("#page2", {
      scrollTrigger: {
        trigger: `#page2`,
        start: `top top`,
        end: `bottom top`,
        pin: true,
        scroller: `#main`
      }
    });
    gsap.to("#page3", {
      scrollTrigger: {
        trigger: `#page3`,
        start: `top top`,
        end: `bottom top`,
        pin: true,
        scroller: `#main`
      }
    });
  },
  "(max-width: 768px)": function() {
    // Mobilde JS ile pinleme yapılmıyor.
  }
});