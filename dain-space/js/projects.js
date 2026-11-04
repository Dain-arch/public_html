/* ============================================
   DAIN'S SPACE — Projects JavaScript
   projects.js — 목록 렌더링, 필터, 검색
   ============================================ */

'use strict';

(async function initProjects() {
  const featuredWrap = document.getElementById('featured-project');
  const projectsGrid = document.getElementById('projects-grid');
  const searchInput = document.getElementById('project-search');
  const noResults = document.getElementById('no-results');

  if (!projectsGrid) return;

  // 데이터 로드
  let projects = await window.DS.fetchData('data/projects.json');

  if (!projects || projects.length === 0) {
    renderEmpty(projectsGrid, '📁', '등록된 프로젝트가 없습니다.');
    return;
  }

  let currentMajor = 'all';
  let currentType = 'all';
  let currentQuery = '';

  // ── 초기 렌더링 ──
  const featured = projects.find(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  if (featured && featuredWrap) {
    renderFeatured(featured);
  }

  renderGrid(rest);

  // ── 검색 이벤트 ──
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      currentQuery = searchInput.value.trim().toLowerCase();
      applyFilters();
    });
  }

  // ── 필터 버튼 이벤트 ──
  document.querySelectorAll('[data-filter-major]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentMajor = btn.dataset.filterMajor;
      setActive(btn, '[data-filter-major]');
      applyFilters();
    });
  });

  document.querySelectorAll('[data-filter-type]').forEach(btn => {
    btn.addEventListener('click', () => {
      currentType = btn.dataset.filterType;
      setActive(btn, '[data-filter-type]');
      applyFilters();
    });
  });

  // ── 필터 적용 ──
  function applyFilters() {
    // 대표 프로젝트 필터링 동기화
    if (featured && featuredWrap) {
      const matchFeaturedMajor = currentMajor === 'all' || featured.major === currentMajor;
      const matchFeaturedType = currentType === 'all' || featured.type === currentType;
      const matchFeaturedQuery = !currentQuery ||
        featured.title.toLowerCase().includes(currentQuery) ||
        (featured.summary && featured.summary.toLowerCase().includes(currentQuery)) ||
        (featured.tags && featured.tags.some(t => t.toLowerCase().includes(currentQuery)));

      const showFeatured = matchFeaturedMajor && matchFeaturedType && matchFeaturedQuery;
      featuredWrap.style.display = showFeatured ? 'block' : 'none';
    }

    const filtered = projects.filter(p => {
      if (p.featured) return false; // 대표 프로젝트는 별도 영역
      const matchMajor = currentMajor === 'all' || p.major === currentMajor;
      const matchType = currentType === 'all' || p.type === currentType;
      const matchQuery = !currentQuery ||
        p.title.toLowerCase().includes(currentQuery) ||
        (p.summary && p.summary.toLowerCase().includes(currentQuery)) ||
        (p.tags && p.tags.some(t => t.toLowerCase().includes(currentQuery)));
      return matchMajor && matchType && matchQuery;
    });
    renderGrid(filtered);
  }

  // ── 대표 프로젝트 렌더링 ──
  function renderFeatured(p) {
    const imgHtml = p.image
      ? `<img src="${window.DS.escapeHtml(p.image)}" alt="${window.DS.escapeHtml(p.title)}" loading="lazy">`
      : `<div class="featured-img-placeholder">📌</div>`;

    const tags = renderTags(p);

    featuredWrap.innerHTML = `
      <a class="project-featured-card fade-in" href="project-detail.html?id=${window.DS.escapeHtml(p.id)}" aria-label="${window.DS.escapeHtml(p.title)} 상세 보기">
        <div class="featured-img">${imgHtml}</div>
        <div class="featured-content">
          <span class="section-label">✦ 대표 프로젝트</span>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">${tags}</div>
          <h2 class="project-card-title" style="font-size:var(--text-2xl);">${window.DS.escapeHtml(p.title)}</h2>
          <p class="project-card-summary" style="margin-top:0.5rem;">${window.DS.escapeHtml(p.summary || '')}</p>
                    ${p.date ? `<p class="project-card-date">${window.DS.formatDate(p.date)}</p>` : ''}
          <div class="summary-card-arrow" style="margin-top:1.25rem;">자세히 보기 →</div>
        </div>
      </a>`;

    // fade-in 옵저버 재적용
    triggerFadeIn(featuredWrap.querySelector('.fade-in'));
  }

  // ── 그리드 렌더링 ──
  function renderGrid(list) {
    if (!list || list.length === 0) {
      projectsGrid.innerHTML = `
        <div class="no-results">
          <p style="font-size:2rem;margin-bottom:0.75rem;">🔍</p>
          <p>조건에 맞는 프로젝트가 없습니다.</p>
          <p style="font-size:var(--text-sm);margin-top:0.5rem;">필터나 검색어를 변경해 보세요.</p>
        </div>`;
      return;
    }

    // 최신순 정렬
    const sorted = [...list].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });

    projectsGrid.innerHTML = sorted.map((p, i) => {
      const imgHtml = p.image
        ? `<img src="${window.DS.escapeHtml(p.image)}" alt="${window.DS.escapeHtml(p.title)}" loading="lazy">`
        : `<div class="project-card-img-placeholder">📂</div>`;

      const tags = renderTags(p);
      const delay = i < 4 ? ` fade-in-delay-${(i % 4) + 1}` : '';

      return `
        <a class="project-card fade-in${delay}" href="project-detail.html?id=${window.DS.escapeHtml(p.id)}" aria-label="${window.DS.escapeHtml(p.title)} 상세 보기">
          <div class="project-card-img">${imgHtml}</div>
          <div class="project-card-body">
            <div class="project-card-tags">${tags}</div>
            <h3 class="project-card-title">${window.DS.escapeHtml(p.title)}</h3>
            <p class="project-card-summary">${window.DS.escapeHtml(p.summary || '')}</p>
            ${p.date ? `<p class="project-card-date">${window.DS.formatDate(p.date)}</p>` : ''}
          </div>
        </a>`;
    }).join('');

    // fade-in 재적용
    projectsGrid.querySelectorAll('.fade-in').forEach(triggerFadeIn);
  }

  // ── 태그 렌더링 ──
  function renderTags(p) {
    const majorMap = { food: '식품영양학과', business: '경영학과' };
    const typeMap = { team: '팀 프로젝트', individual: '개인 과제' };
    let html = '';
    if (p.major && majorMap[p.major]) html += `<span class="tag tag-pink">${majorMap[p.major]}</span>`;
    if (p.type && typeMap[p.type]) html += `<span class="tag tag-cream">${typeMap[p.type]}</span>`;
    if (p.tags) p.tags.forEach(t => { html += `<span class="tag tag-gray">${window.DS.escapeHtml(t)}</span>`; });
    return html;
  }

  // ── Active 버튼 ──
  function setActive(btn, selector) {
    document.querySelectorAll(selector).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  // ── Fade-in 재트리거 ──
  function triggerFadeIn(el) {
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('visible');
      return;
    }
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  }

  function renderEmpty(container, icon, msg) {
    container.innerHTML = `
      <div class="no-results">
        <p style="font-size:2.5rem;margin-bottom:0.75rem;">${icon}</p>
        <p>${msg}</p>
      </div>`;
  }
})();
