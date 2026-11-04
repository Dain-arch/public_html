/* ============================================
   DAIN'S SPACE — Project Detail JavaScript
   project-detail.js — 쿼리스트링 기반 상세 렌더링
   ============================================ */

'use strict';

(async function initProjectDetail() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id');
  const container = document.getElementById('project-detail-content');
  const titleEl = document.getElementById('project-detail-title');

  if (!container) return;

  if (!projectId) {
    showError(container, '프로젝트 ID가 지정되지 않았습니다.', '프로젝트 목록으로 돌아가 주세요.');
    return;
  }

  const projects = await window.DS.fetchData('data/projects.json');

  if (!projects) {
    showError(container, '데이터를 불러올 수 없습니다.', '잠시 후 다시 시도해 주세요.');
    return;
  }

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    showError(container, '해당 프로젝트를 찾을 수 없습니다.', '프로젝트 목록으로 돌아가 주세요.');
    return;
  }

  // 페이지 타이틀 업데이트
  if (titleEl) titleEl.textContent = project.title;
  document.title = `${project.title} — DAIN'S SPACE`;

  // 메타 태그
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && project.summary) {
    metaDesc.content = project.summary;
  }

  const majorMap = { food: '식품영양학과', business: '경영학과' };
  const typeMap = { team: '팀 프로젝트', individual: '개인 과제' };

  const majorLabel = majorMap[project.major] || project.major || '';
  const typeLabel = typeMap[project.type] || project.type || '';

  // 태그
  let tagsHtml = '';
  if (majorLabel) tagsHtml += `<span class="tag tag-pink">${majorLabel}</span>`;
  if (typeLabel) tagsHtml += `<span class="tag tag-cream">${typeLabel}</span>`;
  if (project.tags) project.tags.forEach(t => {
    tagsHtml += `<span class="tag tag-gray">${window.DS.escapeHtml(t)}</span>`;
  });

  // 대표 이미지
  const heroImgHtml = project.image
    ? `<img src="${window.DS.escapeHtml(project.image)}" alt="${window.DS.escapeHtml(project.title)}" style="width:100%;border-radius:var(--radius-lg);margin-bottom:var(--space-8);max-height:480px;object-fit:cover;" loading="lazy">`
    : '';

  // 섹션 빌더
  function buildSection(icon, title, content, id) {
    const body = content
      ? `<div style="line-height:1.9;color:var(--color-text);">${window.DS.escapeHtml(content)}</div>`
      : `<div class="placeholder-block">
           <div class="placeholder-icon">✏️</div>
           <p class="placeholder-label">추후 작성 예정</p>
           <p class="placeholder-text">[${title} 내용을 입력해 주세요]</p>
         </div>`;
    return `
      <div class="detail-section fade-in" id="${id}">
        <h2 class="detail-section-title">
          <span>${icon}</span> ${title}
        </h2>
        ${body}
      </div>`;
  }

  // 관련 자료 섹션
  function buildMaterialsSection(materials) {
    if (!materials || materials.length === 0) {
      return `
        <div class="detail-section fade-in" id="materials">
          <h2 class="detail-section-title"><span>📎</span> 관련 자료</h2>
          <div class="placeholder-block">
            <div class="placeholder-icon">📂</div>
            <p class="placeholder-label">추후 추가 예정</p>
            <p class="placeholder-text">[발표자료, 결과물 이미지 등을 추가해 주세요]</p>
          </div>
        </div>`;
    }

    const items = materials.map(m => `
      <a href="${window.DS.escapeHtml(m.url || '#')}" class="contact-method-item" target="_blank" rel="noopener noreferrer">
        <div class="contact-method-icon">${m.icon || '📎'}</div>
        <div class="contact-method-info">
          <div class="method-label">${window.DS.escapeHtml(m.type || '자료')}</div>
          <div class="method-value">${window.DS.escapeHtml(m.label || m.url)}</div>
        </div>
      </a>`).join('');

    return `
      <div class="detail-section fade-in" id="materials">
        <h2 class="detail-section-title"><span>📎</span> 관련 자료</h2>
        <div class="contact-methods">${items}</div>
      </div>`;
  }

  container.innerHTML = `
    ${heroImgHtml}

    <!-- 메타 헤더 -->
    <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem;">${tagsHtml}</div>
    ${project.date ? `
      <p style="font-size:var(--text-sm);color:var(--color-text-muted);margin-bottom:2.5rem;font-family:var(--font-sans);">
        ${window.DS.formatDate(project.date)}
      </p>
    ` : ''}

    ${buildSection('📋', '프로젝트 개요 및 목적', project.overview, 'overview')}
    ${buildSection('🔄', '진행 과정', project.process, 'process')}
    
    ${buildSection('👤', '본인의 역할', project.role, 'role')}
    ${buildSection('✅', '결과 및 느낀 점', project.result, 'result')}
    ${project.materials && project.materials.length > 0 ? buildMaterialsSection(project.materials) : ''}
  `;

  // fade-in 재적용
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  container.querySelectorAll('.fade-in').forEach((el, i) => {
    if (prefersReduced) { el.classList.add('visible'); return; }
    el.style.transitionDelay = `${i * 0.08}s`;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    obs.observe(el);
  });

  function showError(el, title, desc) {
    el.innerHTML = `
      <div class="placeholder-block" style="padding:var(--space-16);">
        <div class="placeholder-icon">⚠️</div>
        <p class="placeholder-label">${title}</p>
        <p class="placeholder-text">${desc}</p>
        <a href="projects.html" class="btn btn-outline" style="margin-top:1.5rem;display:inline-flex;">← 목록으로 돌아가기</a>
      </div>`;
  }
})();
