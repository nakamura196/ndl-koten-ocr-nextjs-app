#!/bin/bash

echo "📦 Preparing build files..."

# Create necessary directories
mkdir -p public/models

# Copy model files
echo "📋 Copying model files..."
cp -r node_modules/@nakamura196/ndl-koten-ocr-web/models/* public/models/

# Copy Web Worker file (if available in npm package)
echo "👷 Copying Web Worker file..."
if [ -f node_modules/@nakamura196/ndl-koten-ocr-web/dist/worker/ocr.worker.global.js ]; then
  cp node_modules/@nakamura196/ndl-koten-ocr-web/dist/worker/ocr.worker.global.js public/ocr.worker.js
else
  echo "⚠️  Worker file not found in npm package. Web Worker version may not work."
fi

# Copy ONNX Runtime WASM files
echo "🔧 Copying ONNX Runtime WASM files..."
cp node_modules/onnxruntime-web/dist/*.wasm public/
cp node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.jsep.mjs public/

echo "✅ Prebuild complete!"