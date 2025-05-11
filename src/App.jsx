import React, { useState } from 'react';
import QRCode from 'qrcode';

function App() {
  const [qrContent, setQrContent] = useState('');
  const [qrColor, setQrColor] = useState('#059669');
  const [qrSize, setQrSize] = useState(400);
  const [errorCorrection, setErrorCorrection] = useState('L');
  const [qrImageUrl, setQrImageUrl] = useState('');

  const generateQRCode = async () => {
    if (!qrContent.trim()) return;
    try {
      const url = await QRCode.toDataURL(qrContent, {
        width: qrSize,
        color: {
          dark: qrColor,
          light: '#ffffff',
        },
        errorCorrectionLevel: errorCorrection,
      });
      setQrImageUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadImage = (type) => {
    if (!qrImageUrl) return;
    const link = document.createElement('a');
    link.href = qrImageUrl;
    link.download = `qr-code.${type}`;
    link.click();
  };

  const colorOptions = [
    '#000000',
    '#3730a3',
    '#0891b2',
    '#059669',
    '#ca8a04',
    '#dc2626',
    '#be185d',
  ];

  return (
    <div
      style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 mt-12 px-5">
        QR Code Generator
      </h1>
      <p className="text-center text-lg text-indigo-100 mb-12 px-5">
        Create custom QR codes for your website, social media, or business in seconds
      </p>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 w-[80%]">
        <div className="md:flex">
          <div className="md:w-1/2 bg-indigo-50 p-8 flex flex-col items-center justify-center">
            {qrImageUrl && (
              <div className="bg-white p-6 rounded-xl shadow-md mb-6 w-64 h-64 flex items-center justify-center">
                <img src={qrImageUrl} alt="QR Code" className="w-full h-full object-contain" />
              </div>
            )}
            {qrImageUrl && (
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={() => downloadImage('png')}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all"
                >
                  Download PNG
                </button>
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Customize Your QR Code</h2>

            <div className="mb-6">
              <label htmlFor="qrContent" className="block text-sm font-medium text-gray-700 mb-1">
                QR Code Content
              </label>
              <input
                type="text"
                id="qrContent"
                placeholder="Enter URL or text"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">QR Code Color</label>
              <div className="flex space-x-3">
                {colorOptions.map((color) => (
                  <div
                    key={color}
                    className={`w-6 h-6 rounded-full cursor-pointer border-2 ${
                      qrColor === color ? 'border-indigo-500' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setQrColor(color)}
                  ></div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Error Correction Level
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="L">Low (7%)</option>
                <option value="M">Medium (15%)</option>
                <option value="Q">Quartile (25%)</option>
                <option value="H">High (30%)</option>
              </select>
              <p className="mt-1 text-sm text-gray-500">
                Higher correction allows QR code to be readable even if partially damaged
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor="qrSize" className="block text-sm font-medium text-gray-700 mb-1">
                QR Code Size
              </label>
              <input
                type="range"
                id="qrSize"
                min="100"
                max="400"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Small</span>
                <span>Medium</span>
                <span>Large</span>
              </div>
            </div>

            <button
              onClick={generateQRCode}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-all"
            >
              Generate QR Code
            </button>
          </div>
        </div>
        
      </div>
      <h1 className='text-white mb-2'>Designed and Developed by ©Saveen Nidukshan</h1>
    </div>
  );
}

export default App;
