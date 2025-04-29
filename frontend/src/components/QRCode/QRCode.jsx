import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCode.css';

const QRCode = () => {
  // Get the current website URL
  const websiteUrl = window.location.origin;

  return (
    <div className="qr-code" id='qr-code'>
        <hr />
      <h1>Scan QR Code</h1>
      <div className="qr-code-container">
        <QRCodeSVG
          value={websiteUrl}
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>
      <p>Scan this QR code with your mobile device to visit our website and learn more about our services.</p>
    </div>
  );
};

export default QRCode; 