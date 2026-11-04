/* ============================================
   DAIN'S SPACE — Gallery JavaScript
   gallery.js — 갤러리 렌더링 + Lightbox
   ============================================ */

'use strict';

(async function initGallery() {
  const galleryGrid = document.getElementById('gallery-grid');
  const tabButtons  = document.querySelectorAll('[data-gallery-tab]');

  if (!galleryGrid) return;

  let allPhotos = await window.DS.fetchData('data/gallery.json');
  let currentAlbum = 'all';
  let currentPhotos = [];
  let lightboxIndex = 0;

  if (!allPhotos || allPhotos.length === 0) {
    galleryGrid.innerHTML = `
      <div class="gallery-placeholder">
        <p style="font-size:2.5rem;margin-bottom:0.75rem;">🖼️</p>
        <p style="font-weight:500;margin-bottom:0.5rem;">사진이 아직 없습니다</p>
        <p style="font-size:var(--text-sm);color:var(--color-text-muted);">gallery.json에 사진을 추가해 주세요.</p>
      </div>`;
    return;
  }

  // ── 탭 이벤트 ──
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      currentAlbum = btn.dataset.galleryTab;
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderGallery();
    });
  });

  // ── 초기 렌더링 ──
  renderGallery();

  // ── 갤러리 렌더링 ──
  function renderGallery() {
    currentPhotos = currentAlbum === 'all'
      ? allPhotos
      : allPhotos.filter(p => p.album === currentAlbum);

    if (currentPhotos.length === 0) {
      galleryGrid.innerHTML = `
        <div class="gallery-placeholder">
          <p style="font-size:2rem;margin-bottom:0.5rem;">📂</p>
          <p>이 앨범에 사진이 없습니다.</p>
        </div>`;
      return;
    }

    galleryGrid.innerHTML = currentPhotos.map((photo, i) => {
      const imgContent = photo.src
        ? `<img src="${window.DS.escapeHtml(photo.src)}" alt="${window.DS.escapeHtml(photo.desc || photo.album || '사진')}" loading="lazy">`
        : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:2.5rem;color:var(--color-gray);background:linear-gradient(135deg,var(--color-secondary),var(--color-gray-light));">📷</div>`;

      return `
        <div class="gallery-item fade-in fade-in-delay-${(i % 4) + 1}"
             role="button"
             tabindex="0"
             aria-label="${window.DS.escapeHtml(photo.desc || '사진 확대 보기')}"
             data-index="${i}">
          ${imgContent}
          <div class="gallery-item-overlay" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
            </svg>
          </div>
        </div>`;
    }).join('');

    // 이벤트 바인딩
    galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.index, 10)));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(parseInt(item.dataset.index, 10));
        }
      });
    });

    // fade-in 재적용
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    galleryGrid.querySelectorAll('.fade-in').forEach(el => {
      if (prefersReduced) { el.classList.add('visible'); return; }
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      obs.observe(el);
    });
  }

  // ── Lightbox ──
  const lightbox         = document.getElementById('lightbox');
  const lightboxImg      = document.getElementById('lightbox-img');
  const lightboxDesc     = document.getElementById('lightbox-desc');
  const lightboxMeta     = document.getElementById('lightbox-meta');
  const lightboxClose    = document.getElementById('lightbox-close');
  const lightboxPrev     = document.getElementById('lightbox-prev');
  const lightboxNext     = document.getElementById('lightbox-next');
  const lightboxBackdrop = document.getElementById('lightbox-backdrop');

  function openLightbox(index) {
    if (!lightbox) return;
    lightboxIndex = index;
    updateLightbox();
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    lightboxClose && lightboxClose.focus();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function updateLightbox() {
    const photo = currentPhotos[lightboxIndex];
    if (!photo || !lightboxImg) return;

    lightboxImg.src = photo.src || '';
    lightboxImg.alt = photo.desc || '사진';

    if (lightboxDesc) lightboxDesc.textContent = photo.desc || '';

    if (lightboxMeta) {
      const parts = [];
      if (photo.date)     parts.push(window.DS.formatDate(photo.date));
      if (photo.location) parts.push(photo.location);
      lightboxMeta.textContent = parts.join(' · ');
    }

    // nav 표시/숨김
    if (lightboxPrev) lightboxPrev.style.visibility = lightboxIndex > 0 ? 'visible' : 'hidden';
    if (lightboxNext) lightboxNext.style.visibility = lightboxIndex < currentPhotos.length - 1 ? 'visible' : 'hidden';
  }

  if (lightboxClose)    lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', () => {
      if (lightboxIndex > 0) { lightboxIndex--; updateLightbox(); }
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener('click', () => {
      if (lightboxIndex < currentPhotos.length - 1) { lightboxIndex++; updateLightbox(); }
    });
  }

  // 키보드 지원
  document.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  { if (lightboxIndex > 0) { lightboxIndex--; updateLightbox(); } }
    if (e.key === 'ArrowRight') { if (lightboxIndex < currentPhotos.length - 1) { lightboxIndex++; updateLightbox(); } }
  });
})();
