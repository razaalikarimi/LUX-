/**
 * AURORE PARIS — Cinematic Luxury E-Commerce Experience
 * Complete Animation Engine
 * 
 * Architecture:
 * 1. Lenis Smooth Scrolling
 * 2. Brand Intro (Scene 00)
 * 3. Cinematic Hero & Video Scrubbing (Scene 01–03)
 * 4. Vault Horizontal Scroll (Scene 04)
 * 5. Heritage Parallax (Scene 05)
 * 6. Concierge Entrance (Scene 06)
 * 7. Custom Cursor System
 * 8. Cart / Bag System
 * 9. Navigation Behavior
 * 10. Toast Notifications
 * 11. Concierge Form
 * 12. Olfactory Accord Selector
 */

(function () {
  'use strict';

  // =========================================================================
  // 0. FEATURE DETECTION & CONFIGURATION
  // =========================================================================
  const CONFIG = {
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isMobile: window.innerWidth <= 768,
    dpr: Math.min(window.devicePixelRatio || 1, 2),
  };

  // =========================================================================
  // 1. SMOOTH SCROLLING (LENIS)
  // =========================================================================
  let lenisInstance = null;

  function initSmoothScroll() {
    if (typeof Lenis === 'undefined' || CONFIG.reducedMotion) return;

    lenisInstance = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      lenisInstance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }

  // =========================================================================
  // 2. SCENE 00 — BRAND INTRO
  // =========================================================================
  function initBrandIntro() {
    const loader = document.getElementById('auroreLoader');
    const brandMark = document.getElementById('loaderBrandMark');
    const brandSub = document.getElementById('loaderBrandSub');
    const lineEl = document.getElementById('loaderProgressLine');
    const statusEl = document.getElementById('loaderStatus');

    if (!loader) return;

    // If reduced motion, skip intro entirely
    if (CONFIG.reducedMotion) {
      loader.classList.add('loaded');
      document.body.classList.remove('loading-locked');
      return;
    }

    // Phase 1: Reveal brand typography
    const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    introTl
      .to(brandMark, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: 0.3,
      })
      .to(brandSub, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6')
      .to(statusEl, {
        opacity: 0.6,
        duration: 0.5,
      }, '-=0.4');

    // Phase 2: Progress line (simulates asset loading)
    let progress = 0;
    const loadTimer = setInterval(() => {
      progress += Math.floor(Math.random() * 12) + 8;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadTimer);
        if (lineEl) lineEl.style.width = '100%';

        // Phase 3: Exit intro
        setTimeout(() => {
          gsap.to(loader, {
            opacity: 0,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
              loader.classList.add('loaded');
              document.body.classList.remove('loading-locked');
              triggerHeroEntrance();
            }
          });
        }, 400);
      } else {
        if (lineEl) lineEl.style.width = progress + '%';
      }
    }, 40);
  }

  // =========================================================================
  // 3. HERO ENTRANCE ANIMATION
  // =========================================================================
  function triggerHeroEntrance() {
    if (typeof gsap === 'undefined') return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Kinetic background letters
    tl.fromTo('.kinetic-bg-word span',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 0.04, duration: 1.6, stagger: 0.06 }
    )
    // Editorial content reveal
    .fromTo('.hero-editorial-left > *',
      { y: 35, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.12 },
      '-=1.2'
    )
    // Navigation slide in
    .fromTo('.nav-pill-container',
      { y: -24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.8'
    )
    // Scroll indicator
    .fromTo('.scroll-cue-container',
      { opacity: 0 },
      { opacity: 1, duration: 0.6 },
      '-=0.3'
    )
    // Show cursor
    .add(() => {
      const cursor = document.getElementById('magneticCursor');
      if (cursor && !CONFIG.isTouchDevice) {
        cursor.classList.add('visible');
      }
    }, '-=0.5');
  }

  // =========================================================================
  // 4. CINEMATIC VIDEO SCRUBBER & SCROLL CHOREOGRAPHY
  // =========================================================================
  function initCinematicScroll() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const video = document.getElementById('heroScrubVideo');
    if (!video) return;

    video.pause();

    function setupVideoScrub() {
      const pinnedSection = document.getElementById('narrativePin');
      if (!pinnedSection) return;

      if (video.duration && video.currentTime === 0) {
        try { video.currentTime = 0.05; } catch (e) {}
      }

      // Main pinned narrative with video scrubbing
      ScrollTrigger.create({
        trigger: '#narrativePin',
        start: 'top top',
        end: '+=350%',
        pin: true,
        scrub: 0.1,
        onUpdate: (self) => {
          const p = self.progress;

          // Scrub video
          if (video.duration) {
            let targetTime = p * video.duration;
            targetTime = Math.min(Math.max(targetTime, 0.0), video.duration - 0.1);
            video.currentTime = targetTime;
          }

          // Chapter transitions
          const chap1 = document.getElementById('chapterIntro');
          const chap2 = document.getElementById('chapterCraft');
          const chap3 = document.getElementById('chapterOlfactory');

          if (chap1 && chap2 && chap3) {
            if (p < 0.3) {
              chap1.classList.add('active');
              chap2.classList.remove('active');
              chap3.classList.remove('active');
            } else if (p >= 0.3 && p < 0.65) {
              chap1.classList.remove('active');
              chap2.classList.add('active');
              chap3.classList.remove('active');
            } else {
              chap1.classList.remove('active');
              chap2.classList.remove('active');
              chap3.classList.add('active');
            }
          }

          // Hide scroll indicator as user scrolls
          const scrollCue = document.getElementById('scrollCue');
          if (scrollCue) {
            scrollCue.style.opacity = Math.max(0, 1 - p * 5);
          }

          // Video filter: gradually reveal more as we progress
          const brightness = 0.55 + p * 0.15;
          video.style.filter = `brightness(${brightness}) contrast(1.08) saturate(0.9)`;
        }
      });
    }

    // Ensure video metadata is loaded
    video.addEventListener('loadedmetadata', setupVideoScrub);
    if (video.readyState >= 1) setupVideoScrub();

    // Scene Progress Bar
    const progressBar = document.getElementById('sceneProgress');
    if (progressBar) {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          progressBar.style.width = (self.progress * 100) + '%';
        }
      });
    }

    // Setup remaining scenes
    setupVaultScene();
    setupHeritageScene();
    setupConciergeScene();
  }

  // =========================================================================
  // 5. SCENE 04 — VAULT HORIZONTAL SCROLL
  // =========================================================================
  function setupVaultScene() {
    const vaultSection = document.getElementById('vault');
    const vaultGrid = document.querySelector('.vault-grid');
    const vaultCards = document.querySelectorAll('.vault-card');

    if (!vaultSection || !vaultGrid || vaultCards.length === 0) return;

    // Section header reveal
    gsap.fromTo('.section-head-editorial > *', {
      y: 30,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: vaultSection,
        start: 'top 80%',
        end: 'top 40%',
        scrub: 1
      }
    });

    // Horizontal scroll
    const scrollTween = gsap.to(vaultGrid, {
      x: () => -(vaultGrid.scrollWidth - window.innerWidth + 80),
      ease: 'none',
      scrollTrigger: {
        trigger: vaultSection,
        start: 'center center',
        end: () => '+=' + (vaultGrid.scrollWidth - window.innerWidth + 80),
        pin: true,
        scrub: 1
      }
    });

    // Cards reveal with subtle 3D tilt
    vaultCards.forEach(card => {
      gsap.fromTo(card, {
        rotationY: 12,
        scale: 0.92,
        opacity: 0.3
      }, {
        rotationY: 0,
        scale: 1,
        opacity: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          containerAnimation: scrollTween,
          start: 'left 85%',
          end: 'left 45%',
          scrub: 1
        }
      });
    });
  }

  // =========================================================================
  // 6. SCENE 05 — HERITAGE PARALLAX
  // =========================================================================
  function setupHeritageScene() {
    const heritageSection = document.getElementById('heritage');
    if (!heritageSection) return;

    // Image parallax zoom
    gsap.fromTo('.heritage-img', {
      scale: 1.12,
      y: -30
    }, {
      scale: 1,
      y: 0,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heritageSection,
        start: 'top bottom',
        end: 'center center',
        scrub: 1
      }
    });

    // Text stagger reveal
    gsap.fromTo('.heritage-text > *', {
      y: 28,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: heritageSection,
        start: 'top 70%',
        end: 'center center',
        scrub: 1
      }
    });

    // Stats counter animation
    const stats = heritageSection.querySelectorAll('.h-num');
    stats.forEach(stat => {
      gsap.fromTo(stat, {
        y: 20,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
    });
  }

  // =========================================================================
  // 7. SCENE 06 — CONCIERGE ENTRANCE
  // =========================================================================
  function setupConciergeScene() {
    const conciergeSection = document.getElementById('concierge');
    if (!conciergeSection) return;

    gsap.fromTo('.concierge-box', {
      y: 60,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: conciergeSection,
        start: 'top 80%',
        end: 'center 60%',
        scrub: 1
      }
    });
  }

  // =========================================================================
  // 8. CUSTOM CURSOR
  // =========================================================================
  function initCursor() {
    if (CONFIG.isTouchDevice) return;

    const cursor = document.getElementById('magneticCursor');
    if (!cursor) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    const speed = 0.12;

    // Smooth cursor follow with lerp
    function updateCursor() {
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      const size = cursor.classList.contains('cursor-cta') ? 36
                 : cursor.classList.contains('cursor-hover') ? 26
                 : 14;

      cursor.style.transform = `translate3d(${cursorX - size}px, ${cursorY - size}px, 0)`;
      requestAnimationFrame(updateCursor);
    }

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    requestAnimationFrame(updateCursor);

    // Hover states
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (el.classList.contains('btn-gold-pill') || el.classList.contains('nav-concierge-btn') || el.classList.contains('btn-card-acquire')) {
          cursor.classList.add('cursor-cta');
        } else {
          cursor.classList.add('cursor-hover');
        }
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursor.classList.remove('cursor-cta');
      });
    });
  }

  // =========================================================================
  // 9. NAVIGATION BEHAVIOR
  // =========================================================================
  function initNavigation() {
    const navWrapper = document.getElementById('navWrapper');
    if (!navWrapper) return;

    // Scroll-based navigation state
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 80) {
        navWrapper.classList.add('scrolled');
      } else {
        navWrapper.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          if (lenisInstance) {
            lenisInstance.scrollTo(target, { offset: -60 });
          } else {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });
    });
  }

  // =========================================================================
  // 10. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  let toastTimer = null;

  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('show');

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // =========================================================================
  // 11. CART / BAG SYSTEM
  // =========================================================================
  function initBag() {
    const bagDrawer = document.getElementById('bagDrawer');
    const bagOverlay = document.getElementById('bagOverlay');
    const bagClose = document.getElementById('bagClose');
    const bagCountEls = document.querySelectorAll('.bag-count');
    const openBagTriggers = document.querySelectorAll('[data-open-bag]');
    const addBagButtons = document.querySelectorAll('[data-add-bag]');
    const bagItemsList = document.getElementById('bagItemsList');
    const bagSubtotal = document.getElementById('bagSubtotal');
    const bagEmptyState = document.getElementById('bagEmptyState');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = [];

    function updateBagUI() {
      const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

      // Update badge counts
      bagCountEls.forEach(el => el.textContent = totalCount);

      // Update subtotal
      if (bagSubtotal) {
        bagSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
      }

      // Render items using safe DOM creation (no innerHTML XSS risk)
      if (bagItemsList) {
        // Remove existing items (keep empty state)
        const existingItems = bagItemsList.querySelectorAll('.bag-item');
        existingItems.forEach(item => item.remove());

        if (cart.length === 0) {
          if (bagEmptyState) bagEmptyState.style.display = 'block';
        } else {
          if (bagEmptyState) bagEmptyState.style.display = 'none';

          cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'bag-item';

            const thumb = document.createElement('div');
            thumb.className = 'bag-item-thumb';
            const img = document.createElement('img');
            img.src = item.image || 'images/product4.jpg';
            img.alt = item.name;
            thumb.appendChild(img);

            const info = document.createElement('div');
            info.className = 'bag-item-info';

            const h4 = document.createElement('h4');
            h4.textContent = item.name;

            const price = document.createElement('span');
            price.className = 'bag-item-price';
            price.textContent = `₹${item.price.toLocaleString('en-IN')}`;

            const qty = document.createElement('div');
            qty.className = 'bag-item-qty';
            qty.textContent = `Qty: ${item.qty}`;

            info.appendChild(h4);
            info.appendChild(price);
            info.appendChild(qty);

            itemEl.appendChild(thumb);
            itemEl.appendChild(info);

            bagItemsList.appendChild(itemEl);
          });
        }
      }
    }

    function openBag() {
      if (bagDrawer) bagDrawer.classList.add('open');
      if (bagOverlay) bagOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeBag() {
      if (bagDrawer) bagDrawer.classList.remove('open');
      if (bagOverlay) bagOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    // Open triggers
    openBagTriggers.forEach(btn => btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBag();
    }));

    // Close triggers
    if (bagClose) bagClose.addEventListener('click', closeBag);
    if (bagOverlay) bagOverlay.addEventListener('click', closeBag);

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeBag();
    });

    // Add to bag
    addBagButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const productName = btn.getAttribute('data-product-name') || 'AURORE Flacon';
        const price = parseInt(btn.getAttribute('data-product-price') || '185000', 10);
        const image = btn.getAttribute('data-product-image') || 'images/product4.jpg';

        const existing = cart.find(i => i.name === productName);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ name: productName, price, image, qty: 1 });
        }

        updateBagUI();
        showToast(`${productName} added to your vault`);
        
        // Don't auto-open bag — use toast notification instead
        // openBag();
      });
    });

    // Checkout
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
          showToast('Your acquisitions vault is empty');
          return;
        }
        showToast('Redirecting to secure settlement portal...');
      });
    }

    updateBagUI();
  }

  // =========================================================================
  // 12. CONCIERGE FORM
  // =========================================================================
  function initConciergeForm() {
    const form = document.getElementById('conciergeForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Concierge inquiry received — your liaison will respond within 2 hours.');
      form.reset();
    });
  }

  // =========================================================================
  // 13. OLFACTORY ACCORD SELECTOR
  // =========================================================================
  function initAccordSelector() {
    const accordPills = document.querySelectorAll('.accord-pill');
    const accordDesc = document.getElementById('accordDesc');

    accordPills.forEach(pill => {
      pill.addEventListener('click', () => {
        accordPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        const desc = pill.getAttribute('data-accord-text');
        if (accordDesc && desc) {
          // Smooth text transition
          gsap.to(accordDesc, {
            opacity: 0,
            y: -8,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
              accordDesc.textContent = desc;
              gsap.to(accordDesc, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    });
  }

  // =========================================================================
  // 14. INTERACTIVE 3D BACCARAT FLACON STUDIO (THREE.JS)
  // =========================================================================
  let flaconScene, flaconCamera, flaconRenderer, flaconBottleGroup;
  let goldLeafParticles, liquidMesh, crystalMesh, capMesh;
  let isDragging = false, prevMouseX = 0, prevMouseY = 0;
  let targetRotationY = 0, currentRotationY = 0;
  let targetRotationX = 0.15, currentRotationX = 0.15;
  let animFrameId = null;

  function init3DFlaconModal() {
    const modal = document.getElementById('vessel3DModal');
    const openBtn = document.getElementById('open3DModalBtn');
    const openBtn2 = document.getElementById('open3DModalBtn2');
    const closeBtn = document.getElementById('close3DModalBtn');
    const closeBackdrop = document.getElementById('close3DBackdrop');
    const canvas = document.getElementById('flacon3DCanvas');
    const wrapper = document.getElementById('vesselCanvasWrapper');

    if (!modal || !canvas) return;

    function openModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('loading-locked');
      if (typeof THREE !== 'undefined' && !flaconRenderer) {
        initThreeScene();
      }
      setTimeout(resizeThree, 50);
      if (!animFrameId && flaconRenderer) {
        renderLoop();
      }
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('loading-locked');
      if (animFrameId) {
        cancelAnimationFrame(animFrameId);
        animFrameId = null;
      }
    }

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (openBtn2) openBtn2.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBackdrop) closeBackdrop.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    // Finish selector buttons
    const finishBtns = document.querySelectorAll('.btn-finish-opt');
    finishBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        finishBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const finish = btn.getAttribute('data-finish');
        applyFlaconFinish(finish);
      });
    });

    function initThreeScene() {
      if (typeof THREE === 'undefined') return;
      flaconScene = new THREE.Scene();

      const width = wrapper.clientWidth || 800;
      const height = wrapper.clientHeight || 500;
      flaconCamera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
      flaconCamera.position.set(0, 0.35, 7.5);

      flaconRenderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      flaconRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      flaconRenderer.setSize(width, height);
      if (flaconRenderer.toneMapping) {
        flaconRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        flaconRenderer.toneMappingExposure = 1.15;
      }

      // Studio Lighting
      const ambientLight = new THREE.AmbientLight(0x24242e, 2.2);
      flaconScene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xfff6e6, 3.4);
      keyLight.position.set(5, 8, 6);
      flaconScene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x99ccff, 2.5);
      rimLight.position.set(-6, 6, -5);
      flaconScene.add(rimLight);

      const goldGlow = new THREE.PointLight(0xd4af37, 3.8, 12);
      goldGlow.position.set(0, -2.5, 1.8);
      flaconScene.add(goldGlow);

      // Flacon Root Group
      flaconBottleGroup = new THREE.Group();
      flaconBottleGroup.position.y = -0.3;
      flaconScene.add(flaconBottleGroup);

      // 1. Heavy Baccarat Crystal Bottle (Octagonal cylinder)
      const crystalGeo = new THREE.CylinderGeometry(1.22, 1.34, 3.2, 8, 1, false);
      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transmission: 0.94,
        opacity: 1,
        transparent: true,
        roughness: 0.04,
        metalness: 0.05,
        ior: 1.54,
        reflectivity: 0.92,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04
      });
      crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
      flaconBottleGroup.add(crystalMesh);

      // 2. Inner Liquid Core (Rich Amber)
      const liquidGeo = new THREE.CylinderGeometry(1.04, 1.14, 2.7, 8, 1, false);
      const liquidMat = new THREE.MeshStandardMaterial({
        color: 0xd49b38,
        roughness: 0.12,
        metalness: 0.1,
        transparent: true,
        opacity: 0.82
      });
      liquidMesh = new THREE.Mesh(liquidGeo, liquidMat);
      liquidMesh.position.y = -0.15;
      flaconBottleGroup.add(liquidMesh);

      // 3. 24K Gold Suspension Leaf Particles
      const particleCount = 260;
      const particleGeo = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.85;
        posArray[i * 3] = Math.cos(angle) * rad;
        posArray[i * 3 + 1] = (Math.random() - 0.5) * 2.4 - 0.15;
        posArray[i * 3 + 2] = Math.sin(angle) * rad;
      }
      particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

      // Gold particle shimmer
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 16;
      pCanvas.height = 16;
      const ctx = pCanvas.getContext('2d');
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, '#fff3b0');
      grad.addColorStop(0.4, '#d4af37');
      grad.addColorStop(1, 'rgba(212, 175, 55, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
      const pTexture = new THREE.CanvasTexture(pCanvas);

      const particleMat = new THREE.PointsMaterial({
        size: 0.12,
        map: pTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      goldLeafParticles = new THREE.Points(particleGeo, particleMat);
      flaconBottleGroup.add(goldLeafParticles);

      // 4. Gold Neck & Guilloché Collar
      const neckGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.45, 24);
      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xe6c875,
        metalness: 0.94,
        roughness: 0.22
      });
      const neckMesh = new THREE.Mesh(neckGeo, goldMat);
      neckMesh.position.y = 1.78;
      flaconBottleGroup.add(neckMesh);

      // 5. Heavy 24K Sculpted Stopper / Cap
      const capGeo = new THREE.CylinderGeometry(0.72, 0.66, 0.85, 8);
      capMesh = new THREE.Mesh(capGeo, goldMat);
      capMesh.position.y = 2.4;
      flaconBottleGroup.add(capMesh);

      // 6. Gold Base Ring
      const baseRingGeo = new THREE.CylinderGeometry(1.36, 1.38, 0.12, 8);
      const baseRing = new THREE.Mesh(baseRingGeo, goldMat);
      baseRing.position.y = -1.62;
      flaconBottleGroup.add(baseRing);

      // Drag & Interaction Listeners
      wrapper.addEventListener('mousedown', (e) => {
        isDragging = true;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      wrapper.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - prevMouseX;
        const deltaY = e.clientY - prevMouseY;
        prevMouseX = e.clientX;
        prevMouseY = e.clientY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.006;
        targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
      });

      // Touch events
      wrapper.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          isDragging = true;
          prevMouseX = e.touches[0].clientX;
          prevMouseY = e.touches[0].clientY;
        }
      }, { passive: true });

      wrapper.addEventListener('touchmove', (e) => {
        if (!isDragging || e.touches.length !== 1) return;
        const deltaX = e.touches[0].clientX - prevMouseX;
        const deltaY = e.touches[0].clientY - prevMouseY;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;

        targetRotationY += deltaX * 0.01;
        targetRotationX += deltaY * 0.008;
        targetRotationX = Math.max(-0.4, Math.min(0.6, targetRotationX));
      }, { passive: true });

      wrapper.addEventListener('touchend', () => {
        isDragging = false;
      });

      // Zoom on wheel
      wrapper.addEventListener('wheel', (e) => {
        e.preventDefault();
        flaconCamera.position.z += e.deltaY * 0.005;
        flaconCamera.position.z = Math.max(4.8, Math.min(9.5, flaconCamera.position.z));
      }, { passive: false });

      window.addEventListener('resize', resizeThree);
    }

    function applyFlaconFinish(finish) {
      if (!liquidMesh || !crystalMesh || !capMesh) return;
      if (finish === 'amber-gold') {
        liquidMesh.material.color.setHex(0xd49b38);
        crystalMesh.material.color.setHex(0xffffff);
        capMesh.material.color.setHex(0xe6c875);
      } else if (finish === 'noir-gold') {
        liquidMesh.material.color.setHex(0x1a120b);
        crystalMesh.material.color.setHex(0x332a24);
        capMesh.material.color.setHex(0xc9a55c);
      } else if (finish === 'pure-crystal') {
        liquidMesh.material.color.setHex(0xfaf5eb);
        crystalMesh.material.color.setHex(0xffffff);
        capMesh.material.color.setHex(0xf0ede6);
      }
    }

    function resizeThree() {
      if (!flaconRenderer || !flaconCamera || !wrapper) return;
      const w = wrapper.clientWidth;
      const h = wrapper.clientHeight;
      if (w === 0 || h === 0) return;
      flaconCamera.aspect = w / h;
      flaconCamera.updateProjectionMatrix();
      flaconRenderer.setSize(w, h);
    }

    function renderLoop() {
      animFrameId = requestAnimationFrame(renderLoop);

      // Smooth inertia rotation
      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      if (!isDragging) {
        targetRotationY += 0.003; // Idle gentle turntable rotation
      }

      if (flaconBottleGroup) {
        flaconBottleGroup.rotation.y = currentRotationY;
        flaconBottleGroup.rotation.x = currentRotationX;
      }

      // Gently drift gold leaf suspension flakes
      if (goldLeafParticles) {
        goldLeafParticles.rotation.y -= 0.002;
        const positions = goldLeafParticles.geometry.attributes.position.array;
        const time = performance.now() * 0.001;
        for (let i = 1; i < positions.length; i += 3) {
          positions[i] += Math.sin(time + i) * 0.0008;
        }
        goldLeafParticles.geometry.attributes.position.needsUpdate = true;
      }

      flaconRenderer.render(flaconScene, flaconCamera);
    }
  }

  // =========================================================================
  // 15. VAULT CARDS 2.5D DEPTH TILT
  // =========================================================================
  function initVaultCardTilt() {
    if (CONFIG.isTouchDevice || CONFIG.reducedMotion || typeof gsap === 'undefined') return;
    const cards = document.querySelectorAll('.vault-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * 8,
          rotationX: -y * 8,
          transformPerspective: 1000,
          duration: 0.35,
          ease: 'power1.out'
        });
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            x: x * 10,
            y: y * 10,
            scale: 1.04,
            duration: 0.35,
            ease: 'power1.out'
          });
        }
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0,
          rotationX: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
        const img = card.querySelector('img');
        if (img) {
          gsap.to(img, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'power2.out'
          });
        }
      });
    });
  }

  // =========================================================================
  // INITIALIZATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    initBrandIntro();
    initCinematicScroll();
    initCursor();
    initNavigation();
    initBag();
    initConciergeForm();
    initAccordSelector();
    init3DFlaconModal();
    initVaultCardTilt();
  });

})();
