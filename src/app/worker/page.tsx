'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function WorkerPage() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [jsonResult, setJsonResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const workerRef = useRef<Worker | null>(null);

  const handleOCR = async () => {
    if (!imageUrl) return;

    setLoading(true);
    setResult('');
    setJsonResult(null);
    setProgress('初期化中...');

    try {
      // Web Workerを作成
      if (!workerRef.current) {
        const basePath = process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : '';
        workerRef.current = new Worker(`${basePath}/ocr.worker.js`);
      }

      const worker = workerRef.current;

      // Workerからのメッセージを処理
      const processWithWorker = () => {
        return new Promise<any>(async (resolve, reject) => {
          let initComplete = false;

          const messageHandler = (event: MessageEvent) => {
            const { type, data, error } = event.data;

            if (type === 'error') {
              reject(new Error(error));
            } else if (type === 'progress') {
              setProgress(`${data.message} (${data.progress}%)`);
            } else if (type === 'success') {
              if (!initComplete) {
                // 初期化完了
                initComplete = true;
                setProgress('画像を処理中...');

                // 画像をImageDataに変換
                const img = new Image();
                img.onload = () => {
                  const canvas = document.createElement('canvas');
                  canvas.width = img.width;
                  canvas.height = img.height;
                  const ctx = canvas.getContext('2d');
                  if (ctx) {
                    ctx.drawImage(img, 0, 0);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

                    // 画像処理を開始
                    worker.postMessage({
                      type: 'process',
                      id: 'process-1',
                      data: {
                        imageData: imageData,
                        options: {}
                      }
                    });
                  }
                };
                img.src = imageUrl;
              } else {
                // 処理完了
                worker.removeEventListener('message', messageHandler);
                resolve(data);
              }
            }
          };

          worker.addEventListener('message', messageHandler);

          // Workerを初期化
          const basePath = process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : '';
          worker.postMessage({
            type: 'init',
            id: 'init-1',
            data: {
              modelPath: `${basePath}/models/`,
              progressCallback: true
            }
          });
        });
      };

      const ocrResult: any = await processWithWorker();
      setResult(ocrResult.text || '認識結果なし');
      setJsonResult(ocrResult.json || null);

    } catch (error: any) {
      setResult(`エラー: ${error.message}`);
      setJsonResult(null);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '40px 20px',
    },
    nav: {
      display: 'flex',
      gap: '20px',
      marginBottom: '32px',
      borderBottom: '1px solid #e5e5e5',
      paddingBottom: '16px',
    },
    navLink: {
      color: '#666',
      textDecoration: 'none',
      fontSize: '14px',
      padding: '8px 16px',
      borderRadius: '6px',
      transition: 'background-color 0.2s',
    },
    navLinkActive: {
      backgroundColor: '#f5f5f5',
      color: '#000',
      fontWeight: '500',
    },
    header: {
      marginBottom: '48px',
    },
    title: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#000',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '16px',
      color: '#666',
    },
    badge: {
      display: 'inline-block',
      padding: '4px 8px',
      backgroundColor: '#000',
      color: '#fff',
      fontSize: '11px',
      fontWeight: '600',
      borderRadius: '4px',
      marginLeft: '8px',
      verticalAlign: 'middle',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '32px',
    },
    section: {
      backgroundColor: '#fff',
      border: '1px solid #e5e5e5',
      borderRadius: '8px',
      padding: '24px',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#000',
      marginBottom: '16px',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.5px',
    },
    fileInput: {
      display: 'none',
    },
    fileLabel: {
      display: 'inline-block',
      padding: '10px 20px',
      backgroundColor: '#f5f5f5',
      borderRadius: '6px',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#333',
      transition: 'background-color 0.2s',
      marginBottom: '16px',
    },
    button: {
      padding: '10px 24px',
      backgroundColor: '#000',
      color: '#fff',
      border: 'none',
      borderRadius: '6px',
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'opacity 0.2s',
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    image: {
      width: '100%',
      height: 'auto',
      borderRadius: '4px',
      marginTop: '16px',
    },
    result: {
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.6',
      color: '#333',
      backgroundColor: '#f9f9f9',
      padding: '16px',
      borderRadius: '4px',
      whiteSpace: 'pre-wrap' as const,
      wordBreak: 'break-word' as const,
    },
    json: {
      fontFamily: 'monospace',
      fontSize: '12px',
      lineHeight: '1.4',
      color: '#333',
      backgroundColor: '#f9f9f9',
      padding: '16px',
      borderRadius: '4px',
      maxHeight: '400px',
      overflow: 'auto',
    },
    progress: {
      fontSize: '12px',
      color: '#666',
      marginTop: '8px',
    },
    info: {
      padding: '12px 16px',
      backgroundColor: '#f0f9ff',
      border: '1px solid #e0f2fe',
      borderRadius: '6px',
      fontSize: '13px',
      color: '#0369a1',
      marginBottom: '16px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <nav style={styles.nav}>
          <Link href="/" style={styles.navLink}>
            通常版
          </Link>
          <Link href="/worker" style={{...styles.navLink, ...styles.navLinkActive}}>
            Web Worker版
          </Link>
          <Link href="/iiif" style={styles.navLink}>
            IIIF版
          </Link>
        </nav>

        <header style={styles.header}>
          <h1 style={styles.title}>
            NDL古典籍OCR Lite Web版 Next.js利用デモ
            <span style={styles.badge}>Web Worker</span>
          </h1>
          <p style={styles.subtitle}>Web Workerを使用してバックグラウンドで処理を実行します</p>
        </header>

        <div style={styles.grid}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Input</h2>

            <div style={styles.info}>
              💡 Web Worker版はバックグラウンドで処理を実行するため、UIがフリーズしません。大きな画像の処理に最適です。
            </div>

            <label style={styles.fileLabel}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={styles.fileInput}
              />
              画像を選択
            </label>

            {imageUrl && (
              <>
                <img src={imageUrl} alt="Selected" style={styles.image} />
                <button
                  onClick={handleOCR}
                  disabled={loading}
                  style={{
                    ...styles.button,
                    ...(loading ? styles.buttonDisabled : {}),
                    marginTop: '16px',
                    width: '100%',
                  }}
                >
                  {loading ? '処理中...' : 'OCR実行'}
                </button>
                {progress && <p style={styles.progress}>{progress}</p>}
              </>
            )}
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Output</h2>

            {result && (
              <>
                <h3 style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>テキスト</h3>
                <div style={styles.result}>{result}</div>
              </>
            )}

            {jsonResult && (
              <>
                <h3 style={{ fontSize: '12px', color: '#666', marginTop: '24px', marginBottom: '8px' }}>JSON</h3>
                <pre style={styles.json}>
                  {JSON.stringify(jsonResult, null, 2)}
                </pre>
              </>
            )}

            {!result && !jsonResult && (
              <p style={{ color: '#999', fontSize: '14px' }}>
                画像を選択してOCRを実行してください
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}