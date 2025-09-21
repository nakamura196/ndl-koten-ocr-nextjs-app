'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState('');
  const [jsonResult, setJsonResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');

  const handleOCR = async () => {
    if (!imageUrl) return;

    setLoading(true);
    setResult('');
    setJsonResult(null);
    setProgress('初期化中...');

    try {
      const { NDLKotenOCR } = await import('@nakamura196/ndl-koten-ocr-web');
      const ocr = new NDLKotenOCR();

      const basePath = process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : '';
      const modelPath = `${basePath}/models/`;

      // モデルファイルとコンフィグファイルを同じディレクトリから読み込む
      await ocr.init({
        modelPath: modelPath,
        progressCallback: (percent: number, message: string) => {
          setProgress(`${message} (${percent}%)`);
        }
      });

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      setProgress('処理中...');
      const ocrResult = await ocr.process(img);
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
  };

  return (
    <div style={styles.container}>
      <div style={styles.main}>
        <nav style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '32px',
          borderBottom: '1px solid #e5e5e5',
          paddingBottom: '16px',
        }}>
          <Link href="/" style={{
            color: '#000',
            textDecoration: 'none',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: '#f5f5f5',
            fontWeight: '500',
          }}>
            通常版
          </Link>
          <Link href="/worker" style={{
            color: '#666',
            textDecoration: 'none',
            fontSize: '14px',
            padding: '8px 16px',
            borderRadius: '6px',
            transition: 'background-color 0.2s',
          }}>
            Web Worker版
          </Link>
        </nav>

        <header style={styles.header}>
          <h1 style={styles.title}>NDL古典籍OCR Lite Web版 Next.js利用デモ</h1>
          <p style={styles.subtitle}>NDL古典籍OCR Liteのブラウザ版をNext.jsで実装したデモアプリケーション</p>
        </header>

        <div style={styles.grid}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Input</h2>

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