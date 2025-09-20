# NDL Koten OCR Next.js App

国立国会図書館の古典籍OCRシステムのNext.jsアプリケーション実装です。

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. モデルファイルのコピー

OCRモデルとその設定ファイルをpublicディレクトリにコピーします：

```bash
mkdir -p public/node_modules/@nakamura196/ndl-koten-ocr-web
cp -r node_modules/@nakamura196/ndl-koten-ocr-web/models public/node_modules/@nakamura196/ndl-koten-ocr-web/
```

このステップにより、以下のファイルがコピーされます：
- `rtmdet-s-1280x1280.onnx` (レイアウト検出モデル)
- `parseq-ndl-32x384-tiny-10.onnx` (文字認識モデル)
- `NDLmoji.yaml` (文字リスト設定)
- `ndl.yaml` (システム設定)

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。

## 使い方

1. 「画像を選択」ボタンをクリックして画像ファイルを選択
2. 「OCR実行」ボタンをクリック
3. 処理完了後、テキスト結果とJSON出力が表示されます

## 機能

- 古典籍画像のOCR処理
- テキスト形式での結果表示
- JSON形式での詳細情報表示（レイアウト情報、信頼度スコア等）
- リアルタイム進捗表示
- モダンなミニマルUI

## 技術スタック

- **Next.js** 15.5 - Reactベースのフレームワーク
- **React** 19 - UIライブラリ
- **TypeScript** - 型安全な開発
- **@nakamura196/ndl-koten-ocr-web** - OCRエンジン

## プロジェクト構造

```
├── src/
│   └── app/
│       ├── layout.tsx    # ルートレイアウト
│       └── page.tsx       # メインページ（OCR UI）
├── public/
│   └── node_modules/      # OCRモデルファイル
├── next.config.js         # Next.js設定
├── tsconfig.json         # TypeScript設定
└── package.json          # 依存関係
```

## ビルド

本番用ビルド:

```bash
npm run build
npm run start
```

## システム要件

- Node.js 16以降
- モダンブラウザ（Chrome 90+, Firefox 90+, Safari 14+, Edge 90+）
- WebAssemblyサポート

## トラブルシューティング

### モデルのダウンロードが遅い

初回実行時は約110MBのONNXモデルファイルをダウンロードするため時間がかかります。
2回目以降はキャッシュから読み込まれます。

### OCRの精度を上げるには

- 画像の解像度を高くする（推奨: 300dpi以上）
- コントラストがはっきりした画像を使用
- 傾きを補正した画像を使用

## ライセンス

CC-BY-4.0

## 謝辞

このプロジェクトは国立国会図書館の [ndlkotenocr-lite](https://github.com/ndl-lab/ndlkotenocr-lite) を基にしています。
