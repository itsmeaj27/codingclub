"use client";

import React, { useState, useEffect, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Download, Printer, ShieldCheck, XCircle, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import jsPDF from "jspdf";

interface MediaObj {
  url?: string;
}

interface CertificateData {
  certificateId: string;
  studentName: string;
  department: string;
  course: string;
  semester: string;
  internship: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  isIssued: boolean;
  signatureInstructor?: MediaObj | null;
  signatureCoordinator?: MediaObj | null;
  signatureStudentCoordinator?: MediaObj | null;
}

function formatDate(dateInput: string) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ScaleWrapper() {
  useEffect(() => {
    const updateScale = () => {
      const container = document.getElementById("cert-container");
      const wrapper = document.getElementById("cert-scale-wrapper");
      if (!container || !wrapper) return;
      const targetWidth = 1123;
      const targetHeight = 794;
      const currentWidth = container.offsetWidth;
      const scale = currentWidth / targetWidth;
      wrapper.style.transform = `scale(${scale})`;
      container.style.height = `${targetHeight * scale}px`;
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return null;
}

export default function CertificateView() {
  const params = useParams();
  const certificateId = params.certificateId as string;
  const certificateRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(true);
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [isDownloadingPng, setIsDownloadingPng] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchCertificate() {
      try {
        const res = await fetch(
          `/api/certificates?where[certificateId][equals]=${certificateId}&depth=1`
        );
        const data = await res.json();
        if (data.docs && data.docs.length > 0) {
          const cert = data.docs[0];
          if (cert.isIssued) {
            setCertData(cert);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Failed to fetch certificate", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (certificateId) {
      fetchCertificate();
    }
  }, [certificateId]);

  const verifyUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/verify/${certificateId}`
      : `https://codingclubcuh.ac.in/verify/${certificateId}`;

  // Helper to load image as HTMLImageElement
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => resolve(img); // Resolve anyway to avoid blocking
      img.src = src;
    });
  };

  // Ultra-crisp Native 2D Canvas Renderer (Guaranteed 0 errors, no html2canvas/oklch issues)
  const generateCertificateCanvas = async (): Promise<HTMLCanvasElement> => {
    const W = 2246; // 2x high-resolution of 1123 x 794
    const H = 1588;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // 1. White Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    // 2. Background Waves (Left Side)
    ctx.save();
    // Wave 1
    const gradL1 = ctx.createLinearGradient(0, 0, 480, H);
    gradL1.addColorStop(0, "#137558");
    gradL1.addColorStop(0.5, "#1e9673");
    gradL1.addColorStop(1, "#0d503c");
    ctx.fillStyle = gradL1;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(120, 240, 340, 360, 260, 760);
    ctx.bezierCurveTo(180, 1160, 40, 1360, 0, H);
    ctx.closePath();
    ctx.fill();

    // Wave 2
    const gradL2 = ctx.createLinearGradient(0, 0, 480, H);
    gradL2.addColorStop(0, "#2ec49b");
    gradL2.addColorStop(1, "#137558");
    ctx.fillStyle = gradL2;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(170, 280, 400, 440, 310, 840);
    ctx.bezierCurveTo(220, 1240, 70, 1400, 0, H);
    ctx.closePath();
    ctx.fill();

    // Wave 3
    const gradL3 = ctx.createLinearGradient(0, 0, 480, H);
    gradL3.addColorStop(0, "#8be2c9");
    gradL3.addColorStop(1, "#2ec49b");
    ctx.fillStyle = gradL3;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(220, 320, 460, 520, 350, 920);
    ctx.bezierCurveTo(250, 1280, 100, 1440, 0, H);
    ctx.closePath();
    ctx.fill();

    // Wave 4 Inner Accent
    ctx.fillStyle = "#0e5641";
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(70, 160, 250, 280, 160, 640);
    ctx.bezierCurveTo(70, 1000, 20, 1300, 0, H);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 3. Background Waves (Right Side)
    ctx.save();
    const gradR1 = ctx.createLinearGradient(W, H, W - 500, 0);
    gradR1.addColorStop(0, "#137558");
    gradR1.addColorStop(0.5, "#1e9673");
    gradR1.addColorStop(1, "#0d503c");
    ctx.fillStyle = gradR1;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.moveTo(W, H);
    ctx.bezierCurveTo(W - 110, H - 240, W - 330, H - 360, W - 250, H - 760);
    ctx.bezierCurveTo(W - 170, H - 1160, W - 30, H - 1360, W, 0);
    ctx.closePath();
    ctx.fill();

    const gradR2 = ctx.createLinearGradient(W, H, W - 500, 0);
    gradR2.addColorStop(0, "#2ec49b");
    gradR2.addColorStop(1, "#137558");
    ctx.fillStyle = gradR2;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.moveTo(W, H);
    ctx.bezierCurveTo(W - 160, H - 280, W - 390, H - 440, W - 300, H - 840);
    ctx.bezierCurveTo(W - 210, H - 1240, W - 60, H - 1400, W, 0);
    ctx.closePath();
    ctx.fill();

    const gradR3 = ctx.createLinearGradient(W, H, W - 500, 0);
    gradR3.addColorStop(0, "#8be2c9");
    gradR3.addColorStop(1, "#2ec49b");
    ctx.fillStyle = gradR3;
    ctx.globalAlpha = 0.35;
    ctx.beginPath();
    ctx.moveTo(W, H);
    ctx.bezierCurveTo(W - 210, H - 320, W - 450, H - 520, W - 340, H - 920);
    ctx.bezierCurveTo(W - 240, H - 1280, W - 90, H - 1440, W, 0);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#0e5641";
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.moveTo(W, H);
    ctx.bezierCurveTo(W - 70, H - 160, W - 240, H - 280, W - 150, H - 640);
    ctx.bezierCurveTo(W - 60, H - 1000, W - 20, H - 1300, W, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // 4. Central Watermark (CUH Emblem)
    try {
      const cuhLogo = await loadImage("/cuh-logo.png");
      if (cuhLogo.complete && cuhLogo.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = 0.08;
        ctx.drawImage(cuhLogo, W / 2 - 310, H / 2 - 310, 620, 620);
        ctx.restore();
      }
    } catch {
      // Continue without watermark
    }

    // 5. Header Logos
    // Left: Coding Club Logo (filtered to solid black, larger)
    try {
      const ccLogo = await loadImage("/ccc_logo.png");
      if (ccLogo.complete && ccLogo.naturalWidth > 0) {
        const offCanvas = document.createElement("canvas");
        offCanvas.width = ccLogo.naturalWidth;
        offCanvas.height = ccLogo.naturalHeight;
        const offCtx = offCanvas.getContext("2d")!;
        offCtx.filter = "brightness(0)";
        offCtx.drawImage(ccLogo, 0, 0);
        ctx.drawImage(offCanvas, 120, 50, 220, 190);
      }
    } catch {
      // fallback
    }

    // Right: CUH Logo (larger)
    try {
      const cuhLogo = await loadImage("/cuh-logo.png");
      if (cuhLogo.complete && cuhLogo.naturalWidth > 0) {
        ctx.drawImage(cuhLogo, W - 340, 50, 210, 190);
      }
    } catch {
      // fallback
    }

    // 6. Header Typography (Bigger & Bolder)
    ctx.textAlign = "center";
    ctx.fillStyle = "#0f172a";
    ctx.font = "900 80px 'Segoe UI', Roboto, Arial, sans-serif";
    ctx.fillText("CODING CLUB CUH", W / 2, 115);

    ctx.fillStyle = "#137558";
    ctx.font = "bold 30px 'Segoe UI', Roboto, Arial, sans-serif";
    ctx.fillText("CENTRAL UNIVERSITY OF HARYANA", W / 2, 162);

    // Gold Divider Line
    ctx.save();
    const goldGradL = ctx.createLinearGradient(W / 2 - 240, 185, W / 2 - 25, 185);
    goldGradL.addColorStop(0, "transparent");
    goldGradL.addColorStop(1, "#d4af37");
    ctx.strokeStyle = goldGradL;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 240, 185);
    ctx.lineTo(W / 2 - 25, 185);
    ctx.stroke();

    const goldGradR = ctx.createLinearGradient(W / 2 + 25, 185, W / 2 + 240, 185);
    goldGradR.addColorStop(0, "#d4af37");
    goldGradR.addColorStop(1, "transparent");
    ctx.strokeStyle = goldGradR;
    ctx.beginPath();
    ctx.moveTo(W / 2 + 25, 185);
    ctx.lineTo(W / 2 + 240, 185);
    ctx.stroke();

    // Diamond
    ctx.fillStyle = "#d4af37";
    ctx.translate(W / 2, 185);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillRect(-9, -9, 18, 18);
    ctx.restore();

    // 7. CERTIFICATE OF COMPLETION (Much Bigger)
    ctx.fillStyle = "#137558";
    ctx.font = "900 115px Georgia, 'Times New Roman', serif";
    ctx.fillText("CERTIFICATE", W / 2, 295);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 34px 'Segoe UI', Roboto, Arial, sans-serif";
    ctx.fillText("OF COMPLETION", W / 2, 350);

    // 8. Programme Name
    ctx.fillStyle = "#1b3a57";
    ctx.font = "900 62px Georgia, 'Times New Roman', serif";
    ctx.fillText(`✦ ${certData!.internship.toUpperCase()} ✦`, W / 2, 450);

    // 9. "This is to certify that"
    ctx.fillStyle = "#475569";
    ctx.font = "italic 34px Georgia, serif";
    ctx.fillText("This is to certify that", W / 2, 515);

    // 10. Student Name (Big & Prestigious)
    ctx.fillStyle = "#137558";
    ctx.font = "700 105px Georgia, 'Times New Roman', serif";
    ctx.fillText(certData!.studentName, W / 2, 620);

    // Decorative underline with circles
    ctx.save();
    ctx.strokeStyle = "#137558";
    ctx.fillStyle = "#137558";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(W / 2 - 460, 655);
    ctx.lineTo(W / 2 + 460, 655);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(W / 2 - 465, 655, 9, 0, Math.PI * 2);
    ctx.arc(W / 2 + 465, 655, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 11. Body Paragraph (Larger & Clearer)
    ctx.fillStyle = "#334155";
    ctx.font = "32px 'Segoe UI', Roboto, Arial, sans-serif";
    const line1 = `has successfully completed a professional training program conducted from ${formatDate(certData!.startDate)} to ${formatDate(certData!.endDate)}.`;
    const line2 = `His/Her dedication and commitment to the learning process are truly commendable`;
    ctx.fillText(line1, W / 2, 725);
    ctx.fillText(line2, W / 2, 775);

    // Awarded on
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 32px 'Segoe UI', Roboto, Arial, sans-serif";
    ctx.fillText(`Awarded on ${formatDate(certData!.issueDate)}`, W / 2, 850);

    // 12. Signatures (Left side of bottom - Extra Large & Prominent)
    const sigConfigs = [
      { obj: certData!.signatureInstructor, label: "PROGRAM INSTRUCTOR", x: 440 },
      { obj: certData!.signatureCoordinator, label: "PROGRAM CO-ORDINATOR", x: 860 },
      { obj: certData!.signatureStudentCoordinator, label: "STUDENT CO-ORDINATOR", x: 1280 },
    ];

    for (const sig of sigConfigs) {
      if (sig.obj?.url) {
        try {
          const sImg = await loadImage(sig.obj.url);
          if (sImg.complete && sImg.naturalWidth > 0) {
            ctx.drawImage(sImg, sig.x - 150, 1235, 300, 110);
          }
        } catch {
          // ignore
        }
      }
      // Line
      ctx.strokeStyle = "#1e293b";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(sig.x - 175, 1355);
      ctx.lineTo(sig.x + 175, 1355);
      ctx.stroke();

      // Label (Larger font)
      ctx.fillStyle = "#0f172a";
      ctx.font = "bold 26px 'Segoe UI', Roboto, Arial, sans-serif";
      ctx.fillText(sig.label, sig.x, 1398);
    }

    // 13. QR Code & Verification Box (Bottom-Right - Extra Large)
    const qrSvg = document.querySelector("#certificate-node svg.qr-svg-node") as SVGSVGElement | null;
    let qrImg: HTMLImageElement | null = null;
    if (qrSvg) {
      try {
        const svgXml = new XMLSerializer().serializeToString(qrSvg);
        const svgDataUri = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgXml)));
        qrImg = await loadImage(svgDataUri);
      } catch {
        // ignore
      }
    }

    // QR Box container (Larger size)
    const qrBoxW = 440;
    const qrBoxH = 175;
    const qrBoxX = W - qrBoxW - 120;
    const qrBoxY = 1240;
    ctx.save();
    ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(qrBoxX, qrBoxY, qrBoxW, qrBoxH, 20);
    ctx.fill();
    ctx.stroke();

    if (qrImg && qrImg.complete && qrImg.naturalWidth > 0) {
      ctx.drawImage(qrImg, qrBoxX + 20, qrBoxY + 20, 135, 135);
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#137558";
    ctx.font = "bold 22px 'Segoe UI', Roboto, Arial, sans-serif";
    ctx.fillText("SCAN TO VERIFY", qrBoxX + 170, qrBoxY + 56);

    ctx.fillStyle = "#1e293b";
    ctx.font = "bold 19px 'Courier New', monospace";
    ctx.fillText(`ID: ${certData!.certificateId}`, qrBoxX + 170, qrBoxY + 95);

    ctx.fillStyle = "#475569";
    ctx.font = "bold 17px 'Segoe UI', Roboto, Arial, sans-serif";
    ctx.fillText(`Issued: ${formatDate(certData!.issueDate)}`, qrBoxX + 170, qrBoxY + 130);
    ctx.restore();

    return canvas;
  };

  // Direct 1-Click PDF Generator
  const downloadPdf = async () => {
    if (!certData) return;
    setIsDownloadingPdf(true);

    try {
      const canvas = await generateCertificateCanvas();
      const imgData = canvas.toDataURL("image/jpeg", 0.98);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(imgData, "JPEG", 0, 0, 297, 210);
      const cleanName = certData.studentName.replace(/[^a-zA-Z0-9]/g, "_");
      pdf.save(`Certificate_${cleanName}_${certData.certificateId}.pdf`);
    } catch (err) {
      console.error("PDF download failed:", err);
      alert("Failed to generate PDF: " + (err as Error).message);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Direct PNG Image Download
  const downloadPng = async () => {
    if (!certData) return;
    setIsDownloadingPng(true);

    try {
      const canvas = await generateCertificateCanvas();
      const link = document.createElement("a");
      const cleanName = certData.studentName.replace(/[^a-zA-Z0-9]/g, "_");
      link.download = `Certificate_${cleanName}_${certData.certificateId}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("PNG download failed:", err);
      alert("Failed to generate PNG: " + (err as Error).message);
    } finally {
      setIsDownloadingPng(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-[#137558] rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !certData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 max-w-lg w-full text-center">
          <XCircle className="text-red-500 mx-auto mb-4" size={56} />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Certificate Not Found
          </h2>
          <p className="text-slate-600 mb-6 text-sm">
            This certificate ID is invalid, or the certificate has not been issued yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#137558] text-white font-semibold rounded-lg hover:bg-[#0e5641] transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div id="cert-page-wrapper" className="min-h-screen bg-slate-100 text-slate-900 font-sans">
      <style>{`
        @page {
          size: A4 landscape;
          margin: 0 !important;
        }
        @media print {
          /* 1. Reset Root Page */
          html, body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* 2. Hide ALL page chrome, wrappers, headers, footers */
          header, nav, footer, button, .no-print {
            display: none !important;
          }
          #cert-page-wrapper {
            background: transparent !important;
            padding: 0 !important;
            margin: 0 !important;
            min-height: auto !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          #cert-preview-card {
            padding: 0 !important;
            margin: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: transparent !important;
            height: 100vh !important;
            overflow: hidden !important;
          }
          #cert-container {
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            overflow: hidden !important;
          }
          #cert-scale-wrapper {
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            transform: scale(1) !important;
          }
          #certificate-node {
            width: 100vw !important;
            height: 100vh !important;
            max-width: 100vw !important;
            max-height: 100vh !important;
            margin: 0 !important;
            padding: 24px 50px 18px 50px !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
            border: none !important;
            box-shadow: none !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-after: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>



      {/* Header Bar (Hidden on print) */}
      <header className="no-print bg-white border-b border-slate-200 px-6 py-3.5 flex flex-col sm:flex-row justify-between items-center sticky top-0 z-30 shadow-sm gap-3">
        <div className="flex items-center gap-3">
          <Link
            href="/student"
            className="text-slate-600 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-slate-800 tracking-tight">
              CODING CLUB CUH
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Certificate of Completion
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <Link
            href="/verify"
            className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg transition-colors"
          >
            <ShieldCheck size={15} /> Verify
          </Link>
          <button
            onClick={downloadPng}
            disabled={isDownloadingPng}
            className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3.5 py-2 rounded-lg font-bold text-xs shadow-sm transition-all"
          >
            {isDownloadingPng ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
            Save as PNG
          </button>
          <button
            onClick={downloadPdf}
            disabled={isDownloadingPdf}
            className="flex items-center gap-2 bg-[#137558] hover:bg-[#0e5641] text-white px-5 py-2 rounded-lg font-bold text-sm shadow-sm hover:shadow transition-all"
          >
            {isDownloadingPdf ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Generating PDF...
              </>
            ) : (
              <>
                <Download size={16} /> Download PDF (1-Click)
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="container mx-auto px-4 py-6 max-w-[1200px]">
        <div
          id="cert-preview-card"
          className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-slate-200 flex flex-col items-center"
        >
          {/* Certificate View Container */}
          <div
            id="cert-container"
            className="relative w-full max-w-[1123px] overflow-hidden rounded-lg shadow-md border border-slate-200 bg-white"
            style={{ height: "794px" }}
          >
            <div
              id="cert-scale-wrapper"
              className="absolute top-0 left-0 origin-top-left"
              style={{ width: "1123px", height: "794px" }}
            >
              {/* ══════════════ EXACT CERTIFICATE CANVAS (1123 x 794) ══════════════ */}
              <div
                ref={certificateRef}
                id="certificate-node"
                style={{
                  width: "1123px",
                  height: "794px",
                  position: "relative",
                  backgroundColor: "#ffffff",
                  color: "#1e293b",
                  overflow: "hidden",
                  boxSizing: "border-box",
                  padding: "32px 55px 22px 55px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
                }}
              >
                {/* ── Background Wave Graphic Left ── */}
                <svg
                  style={{ position: "absolute", top: 0, left: 0, height: "100%", width: "240px", pointerEvents: "none", zIndex: 0 }}
                  viewBox="0 0 240 794"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 0C60 120 170 180 130 380C90 580 20 680 0 794V0Z"
                    fill="url(#leftGreenGrad1)"
                    opacity="0.9"
                  />
                  <path
                    d="M0 0C85 140 200 220 155 420C110 620 35 700 0 794V0Z"
                    fill="url(#leftGreenGrad2)"
                    opacity="0.55"
                  />
                  <path
                    d="M0 0C110 160 230 260 175 460C125 640 50 720 0 794V0Z"
                    fill="url(#leftGreenGrad3)"
                    opacity="0.35"
                  />
                  <path
                    d="M0 0C35 80 125 140 80 320C35 500 10 650 0 794V0Z"
                    fill="#0e5641"
                    opacity="0.75"
                  />
                  <defs>
                    <linearGradient id="leftGreenGrad1" x1="0" y1="0" x2="240" y2="794" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#137558" />
                      <stop offset="0.5" stopColor="#1e9673" />
                      <stop offset="1" stopColor="#0d503c" />
                    </linearGradient>
                    <linearGradient id="leftGreenGrad2" x1="0" y1="0" x2="240" y2="794" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2ec49b" />
                      <stop offset="1" stopColor="#137558" />
                    </linearGradient>
                    <linearGradient id="leftGreenGrad3" x1="0" y1="0" x2="240" y2="794" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8be2c9" />
                      <stop offset="1" stopColor="#2ec49b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* ── Background Wave Graphic Right / Bottom Right ── */}
                <svg
                  style={{ position: "absolute", bottom: 0, right: 0, height: "100%", width: "250px", pointerEvents: "none", zIndex: 0 }}
                  viewBox="0 0 250 794"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M250 794C195 674 85 614 125 414C165 214 235 114 250 0V794Z"
                    fill="url(#rightGreenGrad1)"
                    opacity="0.9"
                  />
                  <path
                    d="M250 794C170 654 50 574 95 374C140 174 215 94 250 0V794Z"
                    fill="url(#rightGreenGrad2)"
                    opacity="0.55"
                  />
                  <path
                    d="M250 794C145 634 25 534 80 334C125 154 195 74 250 0V794Z"
                    fill="url(#rightGreenGrad3)"
                    opacity="0.35"
                  />
                  <path
                    d="M250 794C215 714 125 654 170 474C215 294 240 144 250 0V794Z"
                    fill="#0e5641"
                    opacity="0.8"
                  />
                  <defs>
                    <linearGradient id="rightGreenGrad1" x1="250" y1="794" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#137558" />
                      <stop offset="0.5" stopColor="#1e9673" />
                      <stop offset="1" stopColor="#0d503c" />
                    </linearGradient>
                    <linearGradient id="rightGreenGrad2" x1="250" y1="794" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2ec49b" />
                      <stop offset="1" stopColor="#137558" />
                    </linearGradient>
                    <linearGradient id="rightGreenGrad3" x1="250" y1="794" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#8be2c9" />
                      <stop offset="1" stopColor="#2ec49b" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* ── CUH Watermark Seal in Center ── */}
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 1 }}>
                  <img
                    src="/cuh-logo.png"
                    alt=""
                    style={{ width: "310px", height: "310px", objectFit: "contain", opacity: 0.08 }}
                  />
                </div>

                {/* ── 1. TOP HEADER SECTION ── */}
                <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingLeft: "15px", paddingRight: "15px" }}>
                    {/* Left: Real Coding Club Logo (With brightness filter so black lines are crisp & solid) */}
                    <div style={{ width: "110px", height: "95px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src="/ccc_logo.png"
                        alt="Coding Club Logo"
                        style={{ maxWidth: "105px", maxHeight: "90px", objectFit: "contain", filter: "brightness(0)" }}
                      />
                    </div>

                    {/* Center: Club Title & University */}
                    <div style={{ textAlign: "center", flex: 1, paddingLeft: "16px", paddingRight: "16px" }}>
                      <h1 style={{ fontSize: "40px", fontWeight: "900", letterSpacing: "2.5px", color: "#0f172a", textTransform: "uppercase", margin: 0, lineHeight: 1 }}>
                        CODING CLUB CUH
                      </h1>
                      <p style={{ fontSize: "15px", fontWeight: "700", color: "#137558", letterSpacing: "2.5px", textTransform: "uppercase", marginTop: "6px", marginBottom: 0 }}>
                        CENTRAL UNIVERSITY OF HARYANA
                      </p>

                      {/* Gold Ornament Line */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "8px" }}>
                        <div style={{ height: "2px", width: "120px", background: "linear-gradient(to right, transparent, #d4af37, #d4af37)" }} />
                        <div style={{ width: "9px", height: "9px", backgroundColor: "#d4af37", transform: "rotate(45deg)", flexShrink: 0 }} />
                        <div style={{ height: "2px", width: "120px", background: "linear-gradient(to left, transparent, #d4af37, #d4af37)" }} />
                      </div>
                    </div>

                    {/* Right: University Logo */}
                    <div style={{ width: "110px", height: "95px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <img
                        src="/cuh-logo.png"
                        alt="Central University of Haryana Logo"
                        style={{ maxWidth: "105px", maxHeight: "90px", objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  {/* CERTIFICATE OF COMPLETION */}
                  <div style={{ textAlign: "center", marginTop: "12px" }}>
                    <h2
                      style={{
                        fontSize: "56px",
                        fontWeight: "900",
                        color: "#137558",
                        letterSpacing: "5px",
                        textTransform: "uppercase",
                        margin: 0,
                        lineHeight: 1,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      CERTIFICATE
                    </h2>
                    <p style={{ fontSize: "17px", fontWeight: "700", color: "#1e293b", letterSpacing: "4px", textTransform: "uppercase", marginTop: "4px", marginBottom: 0 }}>
                      OF COMPLETION
                    </p>
                  </div>
                </div>

                {/* ── 2. MIDDLE BODY SECTION ── */}
                <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginTop: "auto", marginBottom: "auto", paddingTop: "8px", paddingBottom: "8px" }}>
                  {/* Programme Name */}
                  <h3
                    style={{
                      fontSize: "30px",
                      fontWeight: "900",
                      color: "#1b3a57",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      margin: "0 0 6px 0",
                      fontFamily: "Georgia, 'Times New Roman', serif",
                    }}
                  >
                    ✦ {certData.internship} ✦
                  </h3>

                  {/* "This is to certify that" */}
                  <p style={{ fontSize: "16px", color: "#475569", fontStyle: "italic", fontFamily: "Georgia, serif", margin: "0 0 4px 0" }}>
                    This is to certify that
                  </p>

                  {/* Candidate Name */}
                  <div>
                    <h4
                      style={{
                        fontSize: "50px",
                        fontWeight: "700",
                        color: "#137558",
                        letterSpacing: "0.5px",
                        lineHeight: 1.1,
                        margin: 0,
                        fontFamily: "Georgia, 'Times New Roman', serif",
                      }}
                    >
                      {certData.studentName}
                    </h4>
                    {/* Decorative underline with beads */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", maxWidth: "460px", marginLeft: "auto", marginRight: "auto", marginTop: "6px", marginBottom: "10px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "2px solid #137558" }} />
                      <div style={{ height: "2.5px", width: "100%", backgroundColor: "#137558" }} />
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "2px solid #137558" }} />
                    </div>
                  </div>

                  {/* Description Paragraph */}
                  <p style={{ fontSize: "15.5px", color: "#334155", lineHeight: "1.6", maxWidth: "800px", marginLeft: "auto", marginRight: "auto", margin: "0 auto 8px auto" }}>
                    has successfully completed a professional training program conducted from{" "}
                    <strong style={{ color: "#0f172a" }}>{formatDate(certData.startDate)}</strong> to{" "}
                    <strong style={{ color: "#0f172a" }}>{formatDate(certData.endDate)}</strong>.
                    His/Her dedication and commitment to the learning process are truly commendable
                  </p>

                  {/* Award Date */}
                  <p style={{ fontSize: "15.5px", fontWeight: "700", color: "#0f172a", margin: "4px 0 0 0" }}>
                    Awarded on {formatDate(certData.issueDate)}
                  </p>
                </div>

                {/* ── 3. BOTTOM SECTION: Signatures & Corner QR ── */}
                <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingLeft: "24px", paddingRight: "16px", paddingBottom: "8px" }}>
                  {/* Three Signatures */}
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "40px" }}>
                    {/* Signature 1: Program Instructor */}
                    <div style={{ textAlign: "center", width: "175px" }}>
                      <div style={{ height: "48px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "3px" }}>
                        {certData.signatureInstructor?.url ? (
                          <img
                            src={certData.signatureInstructor.url}
                            alt="Instructor Signature"
                            style={{ maxHeight: "45px", maxWidth: "160px", objectFit: "contain" }}
                          />
                        ) : (
                          <div style={{ width: "100%" }} />
                        )}
                      </div>
                      <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: "5px" }}>
                        <p style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", color: "#0f172a", letterSpacing: "0.5px", margin: 0 }}>
                          Program Instructor
                        </p>
                      </div>
                    </div>

                    {/* Signature 2: Program Co-ordinator */}
                    <div style={{ textAlign: "center", width: "175px" }}>
                      <div style={{ height: "48px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "3px" }}>
                        {certData.signatureCoordinator?.url ? (
                          <img
                            src={certData.signatureCoordinator.url}
                            alt="Coordinator Signature"
                            style={{ maxHeight: "45px", maxWidth: "160px", objectFit: "contain" }}
                          />
                        ) : (
                          <div style={{ width: "100%" }} />
                        )}
                      </div>
                      <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: "5px" }}>
                        <p style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", color: "#0f172a", letterSpacing: "0.5px", margin: 0 }}>
                          Program Co-ordinator
                        </p>
                      </div>
                    </div>

                    {/* Signature 3: Student Co-ordinator */}
                    <div style={{ textAlign: "center", width: "175px" }}>
                      <div style={{ height: "48px", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: "3px" }}>
                        {certData.signatureStudentCoordinator?.url ? (
                          <img
                            src={certData.signatureStudentCoordinator.url}
                            alt="Student Coordinator Signature"
                            style={{ maxHeight: "45px", maxWidth: "160px", objectFit: "contain" }}
                          />
                        ) : (
                          <div style={{ width: "100%" }} />
                        )}
                      </div>
                      <div style={{ borderTop: "1.5px solid #1e293b", paddingTop: "5px" }}>
                        <p style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", color: "#0f172a", letterSpacing: "0.5px", margin: 0 }}>
                          Student Co-ordinator
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code in Bottom Right Corner */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", backgroundColor: "rgba(255, 255, 255, 0.98)", padding: "8px 14px", borderRadius: "10px", border: "1.5px solid #cbd5e1", boxShadow: "0 2px 5px rgba(0,0,0,0.06)" }}>
                    <QRCodeSVG
                      className="qr-svg-node"
                      value={verifyUrl}
                      size={64}
                      level="M"
                      includeMargin={false}
                    />
                    <div style={{ textAlign: "left", fontFamily: "sans-serif" }}>
                      <span style={{ fontSize: "10.5px", fontWeight: "800", color: "#137558", textTransform: "uppercase", letterSpacing: "0.8px", display: "block" }}>
                        Scan to Verify
                      </span>
                      <span style={{ fontSize: "9px", fontFamily: "monospace", color: "#1e293b", fontWeight: "700", display: "block" }}>
                        ID: {certData.certificateId}
                      </span>
                      <span style={{ fontSize: "8px", color: "#475569", fontWeight: "500", display: "block" }}>
                        Issued: {formatDate(certData.issueDate)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* ══════════════ END CERTIFICATE ══════════════ */}
            </div>
          </div>

          {/* Bottom Action Area (Hidden on print) */}
          <div className="no-print w-full flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-3.5 border-t border-slate-200">
            <div className="text-xs text-slate-500">
              Certificate ID: <span className="font-mono font-semibold text-slate-700">{certData.certificateId}</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs transition-all"
              >
                <Printer size={15} /> System Print Dialog
              </button>
              <button
                onClick={downloadPng}
                disabled={isDownloadingPng}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2.5 rounded-xl font-bold text-xs transition-all"
              >
                {isDownloadingPng ? <Loader2 size={14} className="animate-spin" /> : <ImageIcon size={14} />}
                Download Image (PNG)
              </button>
              <button
                onClick={downloadPdf}
                disabled={isDownloadingPdf}
                className="flex items-center gap-2 bg-[#137558] hover:bg-[#0e5641] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all"
              >
                {isDownloadingPdf ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Generating PDF...
                  </>
                ) : (
                  <>
                    <Download size={16} /> Download Official PDF (1-Click)
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <ScaleWrapper />
    </div>
  );
}


