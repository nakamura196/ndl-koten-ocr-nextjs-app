'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function IIIFPage() {
  const [manifestUrl, setManifestUrl] = useState('');
  const [result, setResult] = useState('');
  const [teiResult, setTeiResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [images, setImages] = useState<any[]>([]);
  const [maxCanvases, setMaxCanvases] = useState<number>(-1); // -1 = すべて処理

  const loadManifest = async () => {
    if (!manifestUrl) return;

    setProgress('IIIFマニフェストを読み込み中...');
    setImages([]); // 既存の画像リストをクリア

    try {
      // ライブラリのIIIFProcessorを使用
      const { IIIFProcessor } = await import('@nakamura196/ndl-koten-ocr-web');

      // マニフェストから画像リストを取得
      const imageInfos = await IIIFProcessor.getImagesFromManifest(manifestUrl);

      console.log('Loaded images:', imageInfos); // デバッグ用

      // アプリ用の形式に変換
      const imageList = imageInfos.map(info => ({
        id: info.canvasId,
        label: info.label,
        url: info.imageUrl,
        thumbnailUrl: info.thumbnailUrl,
        index: info.index
      }));

      setImages(imageList);
      setProgress(imageList.length > 0 ? `${imageList.length}枚の画像を検出しました` : 'IIIFマニフェストに画像が見つかりません');
    } catch (error: any) {
      console.error('Manifest loading error:', error);
      setProgress(`エラー: ${error.message}`);

      // CORSエラーの場合の追加情報
      if (error.message.includes('Failed to fetch')) {
        setProgress(`エラー: マニフェストの取得に失敗しました。CORSエラーの可能性があります。`);
      }
    }
  };

  const handleOCR = async () => {
    if (images.length === 0) return;

    setLoading(true);
    setResult('');
    setTeiResult('');
    setProgress('初期化中...');

    try {
      console.log('Starting OCR process...');

      // Worker版とTEIConverterを両方インポート
      const { NDLKotenOCRWorker, TEIConverter } = await import('@nakamura196/ndl-koten-ocr-web');

      console.log('Imported library, creating Worker...');

      // Web Worker版OCRを使用 - Worker URLを明示的に指定
      const workerUrl = `${process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : ''}/ocr.worker.js`;
      const ocr = new NDLKotenOCRWorker(workerUrl);

      const basePath = process.env.NODE_ENV === 'production' ? '/ndl-koten-ocr-nextjs-app' : '';
      const modelPath = `${basePath}/models/`;

      console.log('Initializing OCR with modelPath:', modelPath);

      try {
        // progressCallbackなしで初期化（Workerに関数を渡せないため）
        await ocr.init({
          modelPath: modelPath
        });
        console.log('OCR initialized successfully');
        setProgress('OCR初期化完了');
      } catch (initError) {
        console.error('OCR initialization failed:', initError);
        throw initError;
      }

      // 処理する画像のリストを準備（maxCanvasesが-1の場合はすべて処理）
      const imagesToProcess = maxCanvases === -1
        ? images
        : images.slice(0, maxCanvases);

      let allTexts: string[] = [];
      let allOcrResults: any[] = [];

      // 各画像を処理
      for (let i = 0; i < imagesToProcess.length; i++) {
        const imageInfo = imagesToProcess[i];
        if (!imageInfo) continue;

        setProgress(`処理中 (${i + 1}/${imagesToProcess.length}): ${imageInfo.label}`);

        const img = new Image();
        img.crossOrigin = 'anonymous';

        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = imageInfo.url;
        });

        const ocrResult = await ocr.process(img);
        allTexts.push(`[${imageInfo.label}]\n${ocrResult.text || '認識結果なし'}\n`);

        // デバッグ: OCR結果の構造を確認
        console.log('OCR Result:', {
          hasText: !!ocrResult.text,
          hasJson: !!ocrResult.json,
          jsonKeys: ocrResult.json ? Object.keys(ocrResult.json) : [],
          hasRegions: !!ocrResult.json?.regions,
          regionsCount: ocrResult.json?.regions?.length || 0,
          firstRegion: ocrResult.json?.regions?.[0]
        });

        // jsonの中身を詳しく確認
        if (ocrResult.json) {
          console.log('OCR JSON content:', ocrResult.json);
        }

        // OCR結果をそのまま保存
        allOcrResults.push({
          ...ocrResult,
          imageUrl: imageInfo.url,
          imageInfo: {
            label: imageInfo.label,
            width: img.width,
            height: img.height
          }
        });
      }

      // 結果を設定
      setResult(allTexts.join('\n---\n\n'));

      // TEI/XML形式に変換（シンプルな呼び出し）
      if (TEIConverter && allOcrResults.length > 0) {
        try {
          const xmlContent = TEIConverter.convertFromOCRResults(
            allOcrResults,
            {
              title: `IIIF Document - ${imagesToProcess.length} canvases`,
              manifestUrl: manifestUrl
            }
          );
          setTeiResult(xmlContent);
        } catch (teiError) {
          console.error('TEI変換エラー:', teiError);
          setTeiResult(''); // TEI変換失敗
        }
      }
    } catch (error: any) {
      setResult(`エラー: ${error.message}`);
    } finally {
      setLoading(false);
      setProgress('');
    }
  };

  const downloadTEI = () => {
    if (!teiResult) return;

    const blob = new Blob([teiResult], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;

    // タイムスタンプを追加してファイル名の重複を避ける
    const timestamp = new Date().toISOString().replace(/[:]/g, '-').replace(/\..+/, '');
    a.download = `ocr-result-${timestamp}.xml`;

    a.click();
    URL.revokeObjectURL(url);
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
      backgroundColor: '#1e40af',
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
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #e5e5e5',
      borderRadius: '6px',
      marginBottom: '12px',
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
      marginRight: '8px',
    },
    buttonSecondary: {
      padding: '10px 24px',
      backgroundColor: '#f5f5f5',
      color: '#333',
      border: '1px solid #e5e5e5',
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
    select: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #e5e5e5',
      borderRadius: '6px',
      marginBottom: '16px',
      backgroundColor: '#fff',
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
      marginBottom: '16px',
    },
    tei: {
      fontFamily: 'monospace',
      fontSize: '12px',
      lineHeight: '1.4',
      color: '#333',
      backgroundColor: '#f9f9f9',
      padding: '16px',
      borderRadius: '4px',
      maxHeight: '400px',
      overflow: 'auto',
      marginBottom: '16px',
    },
    progress: {
      fontSize: '12px',
      color: '#666',
      marginTop: '8px',
    },
    info: {
      padding: '12px 16px',
      backgroundColor: '#eff6ff',
      border: '1px solid #dbeafe',
      borderRadius: '6px',
      fontSize: '13px',
      color: '#1e40af',
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
          <Link href="/worker" style={styles.navLink}>
            Web Worker版
          </Link>
          <Link href="/iiif" style={{...styles.navLink, ...styles.navLinkActive}}>
            IIIF版
          </Link>
        </nav>

        <header style={styles.header}>
          <h1 style={styles.title}>
            NDL古典籍OCR Lite Web版 Next.js利用デモ
            <span style={styles.badge}>IIIF</span>
          </h1>
          <p style={styles.subtitle}>IIIFマニフェストから画像を読み込み、TEI/XML形式で出力します</p>
        </header>

        <div style={styles.grid}>
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Input</h2>

            <div style={styles.info}>
              📚 IIIFマニフェストURLを入力して画像を選択するか、直接画像URLを入力してください
            </div>

            <div style={{ marginBottom: '8px' }}>
              <small style={{ color: '#666', fontSize: '11px' }}>
                サンプル：
                <button
                  onClick={() => setManifestUrl('https://touda.tohoku.ac.jp/collection/iiif/0/metadata/10010030014902/manifest.json')}
                  style={{
                    marginLeft: '8px',
                    padding: '2px 8px',
                    fontSize: '11px',
                    backgroundColor: '#f5f5f5',
                    border: '1px solid #e5e5e5',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  東北大学デジタルコレクション
                </button>
              </small>
            </div>

            <input
              type="text"
              placeholder="IIIFマニフェストURL (例: https://example.org/manifest.json)"
              value={manifestUrl}
              onChange={(e) => setManifestUrl(e.target.value)}
              style={styles.input}
            />

            <button
              onClick={loadManifest}
              disabled={!manifestUrl || loading}
              style={{
                ...styles.button,
                ...((!manifestUrl || loading) ? styles.buttonDisabled : {}),
              }}
            >
              マニフェストを読み込む
            </button>

            {images.length > 0 && (
              <>
                <h3 style={{ fontSize: '12px', color: '#666', marginTop: '16px', marginBottom: '8px' }}>
                  処理するCanvas数の上限:
                </h3>
                <input
                  type="text"
                  value={maxCanvases === -1 ? '' : maxCanvases.toString()}
                  onChange={(e) => {
                    const value = e.target.value.trim();

                    // 空の場合
                    if (value === '') {
                      setMaxCanvases(-1);
                      return;
                    }

                    // 数値に変換
                    const num = parseInt(value);

                    // -1または0以下は「すべて」
                    if (num === -1 || num <= 0) {
                      setMaxCanvases(-1);
                    }
                    // 正の数値
                    else if (!isNaN(num)) {
                      setMaxCanvases(num);
                    }
                  }}
                  placeholder="すべて処理（空欄または-1）"
                  style={{ ...styles.input, marginBottom: '8px' }}
                />
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '16px' }}>
                  {maxCanvases === -1
                    ? `すべてのCanvas（${images.length}枚）を処理します`
                    : `最大${maxCanvases}枚のCanvasを処理します（全${images.length}枚中）`
                  }
                </div>

                {/* プレビュー: 処理される画像のリスト */}
                <div style={{ fontSize: '12px', color: '#999', marginBottom: '8px' }}>
                  処理対象:
                </div>
                <div style={{ maxHeight: '150px', overflow: 'auto', border: '1px solid #e5e5e5', borderRadius: '4px', padding: '8px', fontSize: '12px' }}>
                  {(maxCanvases === -1 ? images : images.slice(0, maxCanvases)).map((img, index) => (
                    <div key={index} style={{ marginBottom: '2px' }}>
                      {index + 1}. {img.label || `画像 ${index + 1}`}
                    </div>
                  ))}
                </div>
              </>
            )}

            {images.length > 0 && (
              <>
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
                  {loading ? '処理中...' :
                    maxCanvases === -1
                      ? `すべての画像（${images.length}枚）をOCR処理`
                      : `${Math.min(images.length, maxCanvases)}枚の画像をOCR処理`
                  }
                </button>
                {progress && <p style={styles.progress}>{progress}</p>}
                <div style={{ ...styles.info, marginTop: '8px' }}>
                  ⚡ Web Worker版OCRを使用（バックグラウンドで実行）
                </div>
              </>
            )}
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Output</h2>

            {result && (
              <>
                <h3 style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>テキスト</h3>
                <details open>
                  <summary style={{ cursor: 'pointer', fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                    テキストプレビュー（最初の2000文字）
                  </summary>
                  <div style={styles.result}>
                    {result.substring(0, 2000)}
                    {result.length > 2000 && '\n...\n（以下省略）'}
                  </div>
                </details>
                <div style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>
                  全文字数: {result.length.toLocaleString()}文字
                </div>
              </>
            )}

            {teiResult && (
              <>
                <h3 style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                  TEI/XML
                </h3>
                <div style={{ padding: '16px', backgroundColor: '#f9f9f9', borderRadius: '6px' }}>
                  <button
                    onClick={downloadTEI}
                    style={{
                      ...styles.button,
                      width: '100%',
                      marginBottom: '12px',
                    }}
                  >
                    📥 TEI/XMLファイルをダウンロード
                  </button>

                  <details style={{ marginTop: '12px' }}>
                    <summary style={{ cursor: 'pointer', fontSize: '12px', color: '#666', marginBottom: '8px' }}>
                      XMLプレビュー（最初の1000文字）
                    </summary>
                    <pre style={{ ...styles.tei, maxHeight: '200px' }}>
                      {teiResult.substring(0, 1000)}
                      {teiResult.length > 1000 && '\n...\n（以下省略）'}
                    </pre>
                  </details>

                  <div style={{ fontSize: '11px', color: '#999', marginTop: '8px' }}>
                    ファイルサイズ: {(new Blob([teiResult]).size / 1024).toFixed(2)} KB
                  </div>
                </div>
              </>
            )}

            {!result && !teiResult && (
              <p style={{ color: '#999', fontSize: '14px' }}>
                IIIFマニフェストを読み込んで画像を選択するか、直接画像URLを入力してください
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}