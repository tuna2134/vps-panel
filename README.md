# VPS-PANEL
VPSの操作パネルを作るだけのプロジェクトです。

## が通るか
`.env.sample`に例が載っています。`.env`としてファイルをコピーしてください。

説明：
- `NEXT_PUBLIC_API_ENDPOINT` - APIのエンドポイントです。`https://api.stuvps.app`を設定しても動くと思います。

## 開発時
```
pnpm dev
```
以上のコマンドを実行すれば、開発しながらサイトの様子を見れます。

## ビルどなど
プルリクエストを送る前に、以下のコマンドを実行してビルドが通るか確認してください。
```
pnpm build
```

## ライセンス関係
本プロジェクトはUIの開発の効率化のため、`shadcn`氏の`shadcn-ui/ui`のコードを一部利用しています。
- components/ui/*
- lib/utils.ts
がそれらにあたります。
```
MIT License

Copyright (c) 2023 shadcn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```