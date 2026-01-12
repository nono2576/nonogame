# ゲーム日記ブログ - セットアップガイド

## 📁 ファイル構成

```
your-blog/
├── index.html              # トップページ（記事一覧）
├── css/
│   └── style.css          # 共通スタイル
├── js/
│   └── main.js            # 共通スクリプト
├── images/                # 画像フォルダ
├── videos/                # 動画フォルダ
└── posts/
    └── posts.json         # 記事データ（ここを編集するだけ！）
```

## 🎮 使い方

### 1. 記事の追加方法

`posts/posts.json` を編集するだけ！以下の形式で記事を追加します:

```json
{
  "posts": [
    {
      "date": "2026-01-12",
      "template": "text-image",
      "title": "新しいゲームを始めました！",
      "content": "今日から○○というゲームを始めました。キャラクターがとても可愛くて...",
      "image": "images/screenshot1.jpg",
      "video": "",
      "tags": ["RPG", "はじめて"]
    }
  ]
}
```

### 2. テンプレート一覧

- **text-only**: 文字だけの記事
- **text-image**: 文字+画像1枚
- **text-images**: 文字+画像複数枚（最大4枚）
- **text-video**: 文字+動画
- **image-diary**: 画像メインの日記（文字は短め）
- **screenshot-gallery**: スクリーンショットギャラリー

### 3. 各テンプレートの使い方

#### text-only
```json
{
  "date": "2026-01-12",
  "template": "text-only",
  "title": "今日の感想",
  "content": "ここに文章を書く",
  "tags": ["日記"]
}
```

#### text-image
```json
{
  "date": "2026-01-12",
  "template": "text-image",
  "title": "ボス戦クリア！",
  "content": "やっとボスを倒せました...",
  "image": "images/boss-victory.jpg",
  "tags": ["攻略"]
}
```

#### text-images
```json
{
  "date": "2026-01-12",
  "template": "text-images",
  "title": "今日のスクショまとめ",
  "content": "いろいろ撮影しました",
  "images": [
    "images/pic1.jpg",
    "images/pic2.jpg",
    "images/pic3.jpg",
    "images/pic4.jpg"
  ],
  "tags": ["スクショ"]
}
```

#### text-video
```json
{
  "date": "2026-01-12",
  "template": "text-video",
  "title": "プレイ動画",
  "content": "今日のハイライト",
  "video": "videos/gameplay.mp4",
  "tags": ["動画"]
}
```

#### image-diary
```json
{
  "date": "2026-01-12",
  "template": "image-diary",
  "title": "可愛いシーン♡",
  "content": "このシーン最高...",
  "image": "images/cute-scene.jpg",
  "tags": ["お気に入り"]
}
```

#### screenshot-gallery
```json
{
  "date": "2026-01-12",
  "template": "screenshot-gallery",
  "title": "今週のベストショット",
  "images": [
    "images/shot1.jpg",
    "images/shot2.jpg",
    "images/shot3.jpg"
  ],
  "tags": ["ギャラリー"]
}
```

## 🚀 GitHub Pagesでの公開手順

### 初回セットアップ

1. GitHubで新規リポジトリを作成（例: `my-game-blog`）
2. ローカルでファイルを配置
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ユーザー名/my-game-blog.git
git push -u origin main
```

3. GitHubリポジトリの Settings > Pages
4. Source を「main」ブランチに設定
5. 数分後 `https://ユーザー名.github.io/my-game-blog/` でアクセス可能

### 記事を追加するとき

```bash
# posts.jsonを編集後
git add posts/posts.json
git commit -m "新しい記事を追加"
git push
```

数分後、自動的にサイトが更新されます！

## 💡 Tips

- 画像は `images/` フォルダに、動画は `videos/` フォルダに入れる
- 日付は新しい順に並べる（自動でソートされます）
- タグで記事を分類できます
- 画像は適度にリサイズしておくと読み込みが速い（推奨: 横幅1200px以下）
- 動画はMP4形式推奨

## 🎨 カスタマイズ

- `css/style.css` で色やフォントを変更
- `js/main.js` で動作をカスタマイズ
- `index.html` でレイアウト調整
