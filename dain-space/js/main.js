/* ============================================
   DAIN'S SPACE — Main JavaScript
   main.js — Navigation, Scroll Animations, Utils, Fallback Data
   ============================================ */

'use strict';

/* ── Fallback Data (file:// 프로토콜 또는 fetch 실패 시 안전망) ── */
const FALLBACK_DATA = {
  'data/profile.json': {
    "name": "이다인 (Dain Lee)",
    "major": "식품영양학과",
    "double_major": "경영학과",
    "grade": "4학년",
    "school": "한림대학교",
    "career_interest": "영양사 및 식품기업 마케팅·홍보·브랜드 관련 분야 탐색 중",
    "tagline": "작은 관심과 경험을 모아 나만의 이야기를 만들어 가는 중입니다.",
    "intro": "안녕하세요. 한림대학교에서 식품영양학을 전공하고 경영학을 복수전공하고 있는 이다인입니다. 식품과 영양에 관한 전문 지식을 배우는 동시에, 경영학을 통해 기업과 시장을 바라보는 시각을 넓혀가고 있습니다. 대학생활 동안 다양한 과제와 프로젝트를 수행하며 새로운 분야를 접하고, 배운 내용을 실제 사례에 적용하는 경험을 쌓아왔습니다. 아직 하나의 진로를 정하기보다는 여러 가능성을 탐색하며, 저만의 관심과 경험을 차곡차곡 쌓아가고 있습니다.",
    "traits": [
      {
        "keyword": "꼼꼼함",
        "description": "과제를 수행할 때 자료의 정확성과 세부 내용을 확인하려고 노력합니다."
      },
      {
        "keyword": "탐구심",
        "description": "익숙하지 않은 주제도 직접 알아보고 새로운 방법을 배우는 과정을 중요하게 생각합니다."
      }
    ],
    "values": [
      "저는 작은 경험도 배움의 기회가 될 수 있다고 생각합니다. 처음에는 낯설고 어려운 일도 직접 시도하고 하나씩 해결하는 과정에서 성장할 수 있다고 믿습니다. 완벽한 결과만을 추구하기보다는 그 과정에서 무엇을 배우고 어떻게 발전했는지를 중요하게 생각합니다."
    ],
    "interests": [
      "영화 감상",
      "드라마 시청",
      "음악 감상"
    ],
    "email": "0726dain@naver.com"
  },
  'data/projects.json': [
    {
      "id": "project-child-nutrition",
      "title": "아동 비만 예방 영양교육 프로그램 기획",
      "summary": "6~12세 아동을 대상으로 8주간의 영양교육 프로그램을 구상하고, BPRS 분석을 활용하여 사업의 필요성과 우선순위를 검토한 프로젝트입니다.",
      "major": "food",
      "type": "team",
      "featured": true,
      "image": "",
      "date": "",
      "tags": ["아동 비만 예방", "영양교육", "BPRS 분석"],
      "overview": "아동 비만 문제를 예방하고 건강한 식습관 형성을 돕기 위해 6~12세 아동을 대상으로 한 영양교육 프로그램을 기획한 프로젝트입니다. 아동기의 올바른 식습관 형성이 장기적인 건강관리에 중요하다는 점에 주목하여 체계적인 영양교육 방안을 마련하고자 했습니다.",
      "process": "아동 비만과 관련된 영양 문제를 살펴보고, 대상 연령과 주요 문제를 고려하여 8주간의 영양교육 프로그램을 구상했습니다. 또한 사업의 필요성과 우선순위를 검토하기 위해 BPRS 분석을 활용하고, 아동의 건강한 식생활 형성을 위한 교육 방향과 프로그램 운영 방안을 정리했습니다.",
      "role": "아동 비만 예방을 주제로 영양교육 프로그램을 기획하고, 대상자의 특성과 영양 문제를 고려한 개선 방안을 검토했습니다.",
      "result": "이번 과제를 통해 아동 비만 예방을 위해서는 단순히 식사량을 조절하는 것뿐 아니라 올바른 식습관과 생활습관을 형성할 수 있도록 지속적인 영양교육이 필요하다는 점을 이해했습니다. 또한 대상자의 연령과 특성을 고려하여 교육 프로그램을 구성하는 과정에서 지역사회 영양관리와 영양교육의 중요성을 배울 수 있었습니다.",
      "materials": []
    },
    {
      "id": "project-baemin-branding",
      "title": "배달의민족 PR·브랜딩 및 ESG 전략 제안",
      "summary": "배달의민족의 PR·브랜딩 전략과 CSR·ESG 활동을 검토하고, 브랜드 이미지와 지속가능성을 함께 고려한 개선 방향을 제안한 팀 프로젝트입니다.",
      "major": "business",
      "type": "team",
      "featured": false,
      "image": "",
      "date": "",
      "tags": ["PR·브랜딩", "CSR·ESG", "경영전략"],
      "overview": "배달의민족을 대상으로 기업의 PR 및 브랜딩 전략을 살펴보고, CSR·ESG 관점에서 기업의 사회적 책임과 지속가능성을 높일 수 있는 방안을 제안한 팀 프로젝트입니다. 기업의 브랜드 이미지와 사회적 책임 활동이 소비자와 기업에 미치는 영향을 이해하고, 이를 바탕으로 기업의 경쟁력을 높일 수 있는 방향을 모색하고자 했습니다.",
      "process": "배달의민족의 기업 및 브랜드 특성을 살펴보고, PR과 브랜딩 측면에서 고려할 수 있는 전략을 검토했습니다. 또한 CSR·ESG 관점에서 기업이 사회적 책임을 실천할 수 있는 방향을 논의하고, 브랜드 이미지와 기업의 지속가능성을 함께 고려한 개선 방안을 정리했습니다.",
      "role": "팀 프로젝트에 참여하여 배달의민족의 PR·브랜딩 및 CSR·ESG 관련 내용을 검토하고 기업의 발전 방향을 제안하는 활동을 수행했습니다.",
      "result": "이번 프로젝트를 통해 기업의 브랜드 이미지는 제품과 서비스뿐 아니라 기업이 사회적 책임을 실천하는 방식과도 연결될 수 있다는 점을 이해했습니다. 또한 기업의 마케팅과 홍보 전략을 수립할 때 소비자 관점뿐 아니라 사회적 가치와 지속가능성도 함께 고려해야 한다는 점을 배웠습니다.",
      "materials": []
    },
    {
      "id": "project-cfs-workforce",
      "title": "CFS 성수기 인력 부족 문제 해결 방안 제안",
      "summary": "CFS의 성수기 인력 부족 문제를 분석하고, 간편 채용과 현실적 직무 안내, 인센티브 및 AI 기반 인력 수요 예측 등의 개선 방안을 제안한 팀 프로젝트입니다.",
      "major": "business",
      "type": "team",
      "featured": false,
      "image": "",
      "date": "",
      "tags": ["인적자원관리", "인력 운영", "채용 전략"],
      "overview": "성수기 인력 부족으로 발생하는 CFS의 인력 운영 문제를 파악하고, 인력 확보와 효율적인 인력 운영을 위한 개선 방안을 제안한 팀 프로젝트입니다.",
      "process": "성수기 인력 수급의 어려움을 살펴보고, 채용 과정의 간소화와 지원자 확보를 위한 방안을 검토했습니다. 주요 개선 방향으로는 쿠펀치 앱을 활용한 간편 채용, 실제 업무를 미리 이해할 수 있는 현실적 직무 안내(RJP), 성수기 인센티브 제공, AI 기반 인력 수요 예측 및 인력 풀 활용 등을 제안했습니다.",
      "role": "팀 프로젝트에 참여하여 CFS의 성수기 인력 부족 문제와 인사관리 측면의 해결 방안을 검토했습니다.",
      "result": "인력 부족 문제를 해결하기 위해서는 단순히 채용 인원을 늘리는 것뿐 아니라 지원자의 접근성을 높이고, 근무 환경과 보상 체계를 함께 고려해야 한다는 점을 배웠습니다. 또한 인력 수요 예측과 데이터 활용이 효율적인 인사관리에 도움이 될 수 있다는 점을 이해했습니다.",
      "materials": []
    }
  ],
  'data/gallery.json': [
    {
      "id": "daily-01",
      "src": "assets/images/gallery/daily-01.jpg",
      "desc": "일상 속에서 함께하는 소중한 존재",
      "album": "daily",
      "date": "",
      "location": ""
    },
    {
      "id": "daily-02",
      "src": "assets/images/gallery/daily-02.jpg",
      "desc": "영화와 함께하는 여유로운 시간",
      "album": "daily",
      "date": "",
      "location": ""
    },
    {
      "id": "food-01",
      "src": "assets/images/gallery/food-01.jpg",
      "desc": "맛있게 즐긴 음식",
      "album": "food",
      "date": "",
      "location": ""
    },
    {
      "id": "food-02",
      "src": "assets/images/gallery/food-02.jpg",
      "desc": "기억에 남는 한 끼",
      "album": "food",
      "date": "",
      "location": ""
    },
    {
      "id": "travel-01",
      "src": "assets/images/gallery/travel-01.jpg",
      "desc": "여행 중 마주한 바다 풍경",
      "album": "travel",
      "date": "",
      "location": ""
    },
    {
      "id": "travel-02",
      "src": "assets/images/gallery/travel-02.jpg",
      "desc": "하늘 위에서 바라본 풍경",
      "album": "travel",
      "date": "",
      "location": ""
    }
  ]
};

/* ── Navigation ── */
(function initNav() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.nav-mobile');

  // Scroll: nav 배경 활성화
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // 햄버거 토글
  if (toggle && mobileMenu) {
    toggle.addEventListener('click', () => {
      const isOpen = toggle.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      mobileMenu.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // 모바일 메뉴 링크 클릭 시 닫기
    mobileMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // 바깥 클릭 시 닫기
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle.classList.remove('open');
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  // 현재 페이지 active 클래스
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '' && href === 'index.html') ||
      (currentPath === 'index.html' && href === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();


/* ── Scroll Fade-In Animation ── */
(function initFadeIn() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();


/* ── Footer Back to Top ── */
(function initBackTop() {
  const btn = document.querySelector('.footer-back-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ── Utility Functions ── */

/**
 * 날짜 포맷 (YYYY-MM → YYYY년 MM월)
 */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const [year, month] = dateStr.split('-');
  if (!year) return dateStr;
  if (month) return `${year}년 ${parseInt(month, 10)}월`;
  return `${year}년`;
}

/**
 * HTML 이스케이프
 */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * JSON 데이터 fetch (CORS/file:// 환경 시 자동 fallback 제공)
 */
async function fetchData(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[DAIN'S SPACE] ${url} 로드 실패, 기본 Fallback 데이터를 사용합니다.`, err);
    // fallback 데이터 반환
    if (FALLBACK_DATA[url]) {
      return JSON.parse(JSON.stringify(FALLBACK_DATA[url]));
    }
    return null;
  }
}

/**
 * profile.json 데이터가 업데이트되었을 때 페이지에 안전하게 바인딩
 */
async function bindProfileData() {
  const profile = await fetchData('data/profile.json');
  if (!profile) return;

  // 학교명 반영
  const schoolEl = document.getElementById('profile-school');
  if (schoolEl && profile.school) {
    schoolEl.textContent = profile.school;
    if (!profile.school.includes('[')) {
      schoolEl.style.color = 'var(--color-text)';
      schoolEl.style.fontStyle = 'normal';
    }
  }


  // 자기소개는 about.html에 작성된 내용을 그대로 사용합니다.
  // profile.json의 intro 데이터로 HTML을 덮어쓰지 않습니다.


  // 이메일 반영 (Contact 페이지)
  const emailEl = document.getElementById('contact-email-val');
  if (emailEl && profile.email) {
    if (!profile.email.includes('[')) {
      emailEl.innerHTML = `<a href="mailto:${escapeHtml(profile.email)}" style="color:var(--color-primary-deep);font-weight:500;">${escapeHtml(profile.email)}</a>`;
    } else {
      emailEl.textContent = profile.email;
    }
  }

  // Instagram 반영 (Contact 페이지)
  const instaEl = document.getElementById('contact-insta-val');
  if (instaEl && profile.sns && profile.sns.instagram) {
    if (!profile.sns.instagram.includes('[')) {
      const handle = profile.sns.instagram.replace('@', '');
      instaEl.innerHTML = `<a href="https://instagram.com/${escapeHtml(handle)}" target="_blank" rel="noopener noreferrer" style="color:var(--color-primary-deep);font-weight:500;">${escapeHtml(profile.sns.instagram)}</a>`;
    } else {
      instaEl.textContent = profile.sns.instagram;
    }
  }
}

document.addEventListener('DOMContentLoaded', bindProfileData);

// 전역 노출
window.DS = { formatDate, escapeHtml, fetchData, FALLBACK_DATA };
