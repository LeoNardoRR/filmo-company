"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { whatsappLink } from "./content";

// Prévia simulada: tudo acontece no navegador, a foto nunca é enviada a lugar nenhum.
// Sem modelo de IA: o "fundo desfocado" usa uma máscara oval em volta do ponto de foco
// (toque na imagem para mudar), o recorte fechado imita uma 50 mm e o tratamento de cor
// e a vinheta dão o ar de foto de câmera profissional.

const OUT_W = 1080;
const OUT_H = 1350; // 4:5

type Aperture = { id: string; label: string; blur: number; focus: number };
const APERTURES: Aperture[] = [
  { id: "1.8", label: "f/1.8", blur: 14, focus: 0.3 },
  { id: "2.8", label: "f/2.8", blur: 9, focus: 0.4 },
  { id: "5.6", label: "f/5.6", blur: 4, focus: 0.52 },
];

function softBlur(src: HTMLCanvasElement, factor: number) {
  // Desfoque que funciona em qualquer navegador: reduz e amplia com suavização, em duas passadas.
  const out = document.createElement("canvas");
  out.width = src.width;
  out.height = src.height;
  const octx = out.getContext("2d")!;
  octx.imageSmoothingQuality = "high";
  let cur: HTMLCanvasElement = src;
  for (const f of [factor, factor * 0.6]) {
    const small = document.createElement("canvas");
    small.width = Math.max(8, Math.round(src.width / f));
    small.height = Math.max(8, Math.round(src.height / f));
    const sctx = small.getContext("2d")!;
    sctx.imageSmoothingQuality = "high";
    sctx.drawImage(cur, 0, 0, small.width, small.height);
    octx.clearRect(0, 0, out.width, out.height);
    octx.drawImage(small, 0, 0, out.width, out.height);
    cur = out;
  }
  return out;
}

function render(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  ap: Aperture,
  fx: number,
  fy: number,
) {
  canvas.width = OUT_W;
  canvas.height = OUT_H;
  const ctx = canvas.getContext("2d")!;

  // Recorte 4:5 centralizado, um pouco fechado (efeito de 50 mm).
  const zoom = 1.12;
  const targetRatio = OUT_W / OUT_H;
  let sw = img.naturalWidth;
  let sh = img.naturalHeight;
  if (sw / sh > targetRatio) sw = sh * targetRatio;
  else sh = sw / targetRatio;
  sw /= zoom;
  sh /= zoom;
  const sx = (img.naturalWidth - sw) / 2;
  const sy = (img.naturalHeight - sh) / 2;

  const base = document.createElement("canvas");
  base.width = OUT_W;
  base.height = OUT_H;
  base.getContext("2d")!.drawImage(img, sx, sy, sw, sh, 0, 0, OUT_W, OUT_H);

  // Camada desfocada, visível só fora da região de foco.
  const blurred = softBlur(base, ap.blur);
  const bctx = blurred.getContext("2d")!;
  bctx.globalCompositeOperation = "destination-in";
  const cx = fx * OUT_W;
  const cy = fy * OUT_H;
  const radius = OUT_H * ap.focus;
  bctx.save();
  bctx.translate(cx, cy);
  bctx.scale(0.78, 1); // oval em pé, mais natural para retratos
  const grad = bctx.createRadialGradient(0, 0, radius * 0.45, 0, 0, radius * 1.15);
  grad.addColorStop(0, "rgba(0,0,0,0)");
  grad.addColorStop(1, "rgba(0,0,0,1)");
  bctx.fillStyle = grad;
  bctx.fillRect(-OUT_W * 2, -OUT_H * 2, OUT_W * 4, OUT_H * 4);
  bctx.restore();

  ctx.drawImage(base, 0, 0);
  ctx.drawImage(blurred, 0, 0);

  // Vinheta suave.
  const vg = ctx.createRadialGradient(OUT_W / 2, OUT_H / 2, OUT_H * 0.45, OUT_W / 2, OUT_H / 2, OUT_H * 0.85);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.38)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, OUT_W, OUT_H);

  // Tratamento de cor: curva em S, saturação e leve calor, mais um pouco de grão.
  const data = ctx.getImageData(0, 0, OUT_W, OUT_H);
  const d = data.data;
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i] / 255;
    let g = d[i + 1] / 255;
    let b = d[i + 2] / 255;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const sat = 1.12;
    r = lum + (r - lum) * sat + 0.012;
    g = lum + (g - lum) * sat + 0.004;
    b = lum + (b - lum) * sat - 0.012;
    const curve = (v: number) => {
      const c = Math.min(1, Math.max(0, v));
      return c + 0.18 * Math.sin((c - 0.5) * Math.PI) * 0.5 + (c - 0.5) * 0.06;
    };
    const n = (Math.random() - 0.5) * 7;
    d[i] = Math.min(255, Math.max(0, curve(r) * 255 + n));
    d[i + 1] = Math.min(255, Math.max(0, curve(g) * 255 + n));
    d[i + 2] = Math.min(255, Math.max(0, curve(b) * 255 + n));
  }
  ctx.putImageData(data, 0, 0);
}

export default function PortraitLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const urlRef = useRef<string | null>(null);
  const [apertureId, setApertureId] = useState("1.8");
  const [focus, setFocus] = useState({ x: 0.5, y: 0.42 });
  const [original, setOriginal] = useState<string | null>(null);
  const [showOriginal, setShowOriginal] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  const aperture = APERTURES.find((a) => a.id === apertureId) ?? APERTURES[0];

  const draw = useCallback(() => {
    if (!imgRef.current || !canvasRef.current) return;
    render(canvasRef.current, imgRef.current, aperture, focus.x, focus.y);
  }, [aperture, focus]);

  useEffect(() => {
    if (ready) draw();
  }, [ready, draw]);

  useEffect(() => () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
  }, []);

  function onFile(file: File | undefined) {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Escolha um arquivo de imagem (JPG, PNG ou WebP).");
      return;
    }
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    const url = URL.createObjectURL(file);
    urlRef.current = url;
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setOriginal(url);
      setFocus({ x: 0.5, y: 0.42 });
      setShowOriginal(false);
      setReady(true);
    };
    img.onerror = () => setError("Não consegui abrir essa foto. Tente outra.");
    img.src = url;
  }

  function onPick(e: React.PointerEvent<HTMLDivElement>) {
    if (!ready) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setFocus({
      x: Math.min(0.95, Math.max(0.05, (e.clientX - rect.left) / rect.width)),
      y: Math.min(0.95, Math.max(0.05, (e.clientY - rect.top) / rect.height)),
    });
  }

  function download() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "previa-filmo-company.jpg";
    a.href = canvas.toDataURL("image/jpeg", 0.92);
    a.click();
  }

  return (
    <section className="section section--dark" id="teste" aria-labelledby="teste-title">
      <div className="shell lab">
        <div className="lab__copy">
          <p className="eyebrow eyebrow--yellow">Teste na sua foto</p>
          <h2 id="teste-title" className="display">
            Veja sua foto com <em>olhar de câmera.</em>
          </h2>
          <p className="lab__lead">
            Envie uma foto sua e veja uma prévia com fundo desfocado, recorte de lente 50 mm e cor tratada. Sua foto
            fica só no seu aparelho: nada é enviado.
          </p>

          <label className="button button--yellow button--large lab__upload">
            {ready ? "Trocar foto" : "Enviar uma foto"}
            <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} />
          </label>
          {error && <p className="lab__error" role="alert">{error}</p>}

          <div className={ready ? "lab__controls" : "lab__controls is-off"}>
            <p className="lab__label" id="lab-ap">Abertura</p>
            <div className="chips" role="group" aria-labelledby="lab-ap">
              {APERTURES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  className="chip"
                  aria-pressed={a.id === apertureId}
                  disabled={!ready}
                  onClick={() => setApertureId(a.id)}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <p className="lab__label" id="lab-view">Ver</p>
            <div className="chips" role="group" aria-labelledby="lab-view">
              <button type="button" className="chip" aria-pressed={!showOriginal} disabled={!ready} onClick={() => setShowOriginal(false)}>
                Com a Filmo
              </button>
              <button type="button" className="chip" aria-pressed={showOriginal} disabled={!ready} onClick={() => setShowOriginal(true)}>
                Original
              </button>
            </div>
            <p className="lab__hint">Toque na imagem para escolher onde fica o foco.</p>
          </div>

          <div className="lab__actions">
            <a
              className="button button--ghost button--large"
              href={whatsappLink("Olá! Testei a prévia no site da Filmo Company e quero um ensaio assim.")}
              target="_blank"
              rel="noreferrer"
            >
              Quero um ensaio assim <span aria-hidden="true">↗</span>
            </a>
            {ready && (
              <button type="button" className="chip" onClick={download}>
                Baixar prévia
              </button>
            )}
          </div>
          <p className="lab__fine">Prévia simulada. O resultado de uma sessão com a equipe usa câmera e lente reais.</p>
        </div>

        <div className="lab__stage" onPointerDown={onPick} aria-live="polite">
          {!ready && (
            <div className="lab__empty">
              <span>Sua foto aparece aqui</span>
            </div>
          )}
          {ready && original && showOriginal && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="lab__original" src={original} alt="Sua foto original" />
          )}
          <canvas
            ref={canvasRef}
            className="lab__canvas"
            hidden={!ready || showOriginal}
            role="img"
            aria-label="Prévia da sua foto com fundo desfocado e cor tratada"
          />
          {ready && !showOriginal && (
            <span
              className="lab__af"
              aria-hidden="true"
              style={{ left: `${focus.x * 100}%`, top: `${focus.y * 100}%` }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
