const skillData = {
  languages: {
    category: "Languages",
    title: "言葉を選び、処理を組み立てる",
    description:
      "Python を軸に、データ処理、API、実験コードを行き来します。必要に応じて Web 側の言語も使い、検証から見える形までつなぎます。",
    tags: ["Python", "SQL", "JavaScript", "TypeScript", "C++", "Java"],
  },
  ai: {
    category: "AI & Data",
    title: "言葉の奥行きを、データから観察する",
    description:
      "自然言語処理、LLM、BERT 系モデル、データ分析を使い、主観表現や医療テキストの扱い方を実験します。",
    tags: ["NLP", "LLMs", "BERT", "PyTorch", "NumPy", "Pandas"],
  },
  backend: {
    category: "Backend",
    title: "研究の気配を、使える入口へつなぐ",
    description:
      "API、データベース、クラウド環境を組み合わせ、試作をシステムとして動かせる状態に整えます。",
    tags: ["API development", "PostgreSQL", "AWS", "REST", "Auth"],
  },
  tools: {
    category: "Tools",
    title: "手入れし続けるための道具箱",
    description:
      "GitHub、VS Code、検証用の小さなスクリプトを使い、作ったものを記録しながら改善していきます。",
    tags: ["Git", "GitHub", "VS Code", "Search Console", "Automation"],
  },
};

const themes = [
  {
    title: "小さな評価指標をひとつ作る",
    body: "今日は、モデルの出力を眺めるだけで終わらせず、良し悪しを比べるための小さなものさしを作る日です。",
  },
  {
    title: "データの前処理を一段だけ丁寧にする",
    body: "表記ゆれ、欠損、不要な記号。地味な整え方が、あとで結果の読みやすさを助けます。",
  },
  {
    title: "LLMに同じ質問を別の聞き方で投げる",
    body: "プロンプトを少し変え、答えの揺れを観察します。主観表現の扱いを見るには、揺れそのものが手がかりになります。",
  },
  {
    title: "APIの返り値を人にやさしくする",
    body: "正しく動くことに加えて、読めるエラー、扱いやすいJSON、次に直しやすい構造を意識します。",
  },
  {
    title: "研究メモを一枚だけ公開できる形にする",
    body: "未来の自分が読み返せるように、目的、試したこと、結果、次の一手を短く残します。",
  },
  {
    title: "失敗例をひとつ保存する",
    body: "うまくいかなかった出力や実験条件は、次の改善の地図になります。きれいな結果だけを残さない日です。",
  },
];

function setSkill(key) {
  const data = skillData[key] || skillData.languages;
  const category = document.querySelector("#skill-category");
  const title = document.querySelector("#skill-title");
  const description = document.querySelector("#skill-description");
  const tags = document.querySelector("#skill-tags");

  category.textContent = data.category;
  title.textContent = data.title;
  description.textContent = data.description;
  tags.replaceChildren(
    ...data.tags.map((tag) => {
      const item = document.createElement("span");
      item.textContent = tag;
      return item;
    })
  );

  document.querySelectorAll(".skill-tab").forEach((button) => {
    const active = button.dataset.skill === key;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });
}

function setupSkillTabs() {
  document.querySelectorAll(".skill-tab").forEach((button) => {
    button.addEventListener("click", () => setSkill(button.dataset.skill));
  });
}

function setupRecordFilters() {
  const filterButtons = document.querySelectorAll(".filter-button");
  const records = document.querySelectorAll(".record-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });

      records.forEach((record) => {
        const show = filter === "all" || record.dataset.kind === filter;
        record.classList.toggle("is-hidden", !show);
      });
    });
  });
}

function setupThemeLottery() {
  const title = document.querySelector("#theme-title");
  const body = document.querySelector("#theme-body");
  const drawButton = document.querySelector("#theme-draw");
  let currentThemeIndex = -1;
  const dayKey = new Date().toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const initialIndex = [...dayKey].reduce((sum, char) => sum + char.charCodeAt(0), 0) % themes.length;

  function draw(index) {
    let nextIndex = typeof index === "number" ? index : Math.floor(Math.random() * themes.length);
    if (themes.length > 1 && nextIndex === currentThemeIndex) {
      nextIndex = (nextIndex + 1) % themes.length;
    }
    currentThemeIndex = nextIndex;

    const theme = themes[nextIndex];
    title.textContent = theme.title;
    body.textContent = theme.body;
  }

  draw(initialIndex);
  drawButton.addEventListener("click", () => draw());
}

function formatDate(value) {
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(value));
}

function renderRepos(repos) {
  const list = document.querySelector("#repo-list");
  const status = document.querySelector("#repo-status");
  const visibleRepos = repos.filter((repo) => !repo.fork).slice(0, 6);

  if (!visibleRepos.length) {
    status.textContent = "公開リポジトリが見つかりませんでした。";
    return;
  }

  status.textContent = `公開リポジトリ ${visibleRepos.length} 件を更新順に表示しています。`;
  list.replaceChildren(
    ...visibleRepos.map((repo) => {
      const card = document.createElement("article");
      card.className = "repo-card reveal is-visible";

      const meta = document.createElement("p");
      meta.className = "repo-meta";
      meta.textContent = `Updated ${formatDate(repo.updated_at)}`;

      const title = document.createElement("h3");
      title.textContent = repo.name;

      const description = document.createElement("p");
      description.textContent = repo.description || "説明文はまだありません。これから育つ余白です。";

      const tags = document.createElement("div");
      tags.className = "repo-tags";
      [repo.language, `${repo.stargazers_count} stars`].filter(Boolean).forEach((text) => {
        const tag = document.createElement("span");
        tag.textContent = text;
        tags.append(tag);
      });

      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "リポジトリを見る";

      card.append(meta, title, description, tags, link);
      return card;
    })
  );
}

async function loadGitHubRepos() {
  const status = document.querySelector("#repo-status");

  try {
    const response = await fetch("https://api.github.com/users/s1300200/repos?sort=updated&per_page=12");
    if (!response.ok) {
      throw new Error(`GitHub API status: ${response.status}`);
    }
    renderRepos(await response.json());
  } catch (error) {
    status.innerHTML =
      'GitHub の読み込みに失敗しました。時間をおいて再読み込みするか、<a href="https://github.com/s1300200">GitHub プロフィール</a> を見てください。';
  }
}

function setupRevealAnimations() {
  const targets = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  targets.forEach((target) => observer.observe(target));
}

document.addEventListener("DOMContentLoaded", () => {
  setupSkillTabs();
  setupRecordFilters();
  setupThemeLottery();
  setupRevealAnimations();
  loadGitHubRepos();
});
