// OCR Web Worker
importScripts('https://cdn.jsdelivr.net/npm/onnxruntime-web@1.20.0/dist/ort.min.js');

let ocrInstance = null;

// メッセージハンドラ
self.addEventListener('message', async (event) => {
  const { type, id, data } = event.data;

  try {
    switch (type) {
      case 'init':
        // 動的インポートを使用してOCRライブラリを読み込み
        const script = document.createElement('script');
        script.src = data.libPath || '/ndl-koten-ocr.min.js';

        // 簡易的な初期化レスポンス
        self.postMessage({
          type: 'init-complete',
          id: id,
          data: { success: true }
        });
        break;

      case 'process':
        // 画像処理（簡易版）
        self.postMessage({
          type: 'process-complete',
          id: id,
          data: {
            text: 'Web Worker版は現在開発中です',
            json: null
          }
        });
        break;

      default:
        throw new Error(`Unknown message type: ${type}`);
    }
  } catch (error) {
    self.postMessage({
      type: 'error',
      id: id,
      error: error.message
    });
  }
});