# 佐藤滉太 公式プロフィールサイト

GitHub Pages で公開している自己紹介サイトです。

公開URL: https://s1300200.github.io/

高級旅館の案内のような世界観で、AI、自然言語処理、LLM、医療NLP、バックエンド開発への関心と制作の足あとをまとめています。

## 構成

```text
.
├── index.html
├── README.md
├── robots.txt
├── sitemap.xml
├── google89e9586c2d322157.html
└── assets
    ├── css
    │   └── styles.css
    ├── js
    │   └── main.js
    └── ryokan-hero-generated.jpg
```

## 編集する場所

- `index.html`: ページ本文、SEOメタ情報、構造化データ
- `assets/css/styles.css`: レイアウト、色、レスポンシブ対応、スクロール演出
- `assets/js/main.js`: スキル切り替え、実績フィルター、GitHub一覧、おみくじ
- `robots.txt`: 検索エンジン向けのクロール設定
- `sitemap.xml`: Search Console に登録するサイトマップ

## 実装済みの機能

- スキルカテゴリのクリック切り替え
- 研究・制作・学習の実績フィルター
- GitHub API から公開リポジトリ一覧を自動表示
- スクロールに合わせた表示演出
- おみくじ風の「今日の研究テーマ」
- Search Console 用の確認ファイル
- SEO向けの title、description、canonical、OGP、Person JSON-LD

## ローカル確認

```sh
python3 -m http.server 4173
```

ブラウザで `http://localhost:4173/` を開きます。

## 公開

このリポジトリは GitHub Pages のユーザーサイトです。

`main` ブランチの内容が `https://s1300200.github.io/` に公開されます。

## メモ

Search Console の所有権確認に使っている `google89e9586c2d322157.html` は削除しないでください。
