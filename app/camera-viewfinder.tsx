"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { projects, whatsapp } from "./content";

type Mode = "foto" | "video";

const FORMATS = [
  { id: "9:16", label: "Reels 9:16", hud: "Reels 9:16", ratio: 9 / 16 },
  { id: "4:5", label: "Feed 4:5", hud: "Feed 4:5", ratio: 4 / 5 },
  { id: "1:1", label: "Quadrado 1:1", hud: "Quad. 1:1", ratio: 1 },
] as const;

type FormatId = (typeof FORMATS)[number]["id"];

const ROLL_SIZE = 36;
const FOCUS_TOLERANCE = 4;

function pad(value: number) {
  return String(value).padStart(2, "0");
}

function timecode(ms: number) {
  const seconds = Math.floor(ms / 1000);
  const frames = Math.floor((ms % 1000) / (1000 / 24));
  return `${pad(Math.floor(seconds / 3600))}:${pad(Math.floor(seconds / 60) % 60)}:${pad(seconds % 60)}:${pad(frames)}`;
}

function distanceLabel(focus: number) {
  if (focus >= 99) return "∞";
  const meters = 0.5 * Math.pow(40, focus / 100);
  const text = meters < 10 ? meters.toFixed(1).replace(".", ",") : String(Math.round(meters));
  return `${text} m`;
}

export default function CameraViewfinder() {
  const [mode, setMode] = useState<Mode>("foto");
  const [formatId, setFormatId] = useState<FormatId>("4:5");
  const [focus, setFocus] = useState(22);
  const [target, setTarget] = useState(64);
  const [af, setAf] = useState({ x: 50, y: 50 });
  const [index, setIndex] = useState(0);
  const [shots, setShots] = useState(0);
  const [recording, setRecording] = useState(false);
  const [recordStart, setRecordStart] = useState(0);
  const [now, setNow] = useState(0);
  const [flash, setFlash] = useState(false);
  const [message, setMessage] = useState("Nenhum disparo ainda");
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!recording) return;
    const timer = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(timer);
  }, [recording]);

  useEffect(
    () => () => {
      if (flashTimer.current) clearTimeout(flashTimer.current);
    },
    [],
  );

  const isVideo = mode === "video";
  const format = FORMATS.find((item) => item.id === formatId) ?? FORMATS[1];
  const project = projects[index % projects.length];
  const difference = Math.abs(focus - target);
  const sharp = difference <= FOCUS_TOLERANCE;
  const blur = sharp ? 0 : Math.min(18, Math.round(difference * 3.4) / 10);
  const rollFull = !isVideo && shots >= ROLL_SIZE;
  const elapsed = recording ? Math.max(0, now - recordStart) : 0;
  const blinkOn = Math.floor(elapsed / 500) % 2 === 0;

  function changeMode(next: Mode) {
    if (next === mode) return;
    setRecording(false);
    setMode(next);
    if (next === "video") setFormatId("9:16");
    setMessage(next === "video" ? "Pronto para gravar" : "Pronto para fotografar");
  }

  function shoot() {
    if (isVideo) {
      if (recording) {
        setRecording(false);
        setMessage(`Clipe gravado · ${timecode(Date.now() - recordStart).slice(0, 8)}`);
      } else {
        const start = Date.now();
        setRecordStart(start);
        setNow(start);
        setRecording(true);
        setMessage("Gravando…");
      }
      return;
    }

    if (rollFull) return;

    const next = shots + 1;
    if (flashTimer.current) clearTimeout(flashTimer.current);
    setFlash(true);
    setShots(next);
    setMessage(`Disparo ${pad(next)} · ${sharp ? "nítido" : "fora de foco"}`);
    flashTimer.current = setTimeout(() => {
      flashTimer.current = null;
      setFlash(false);
      setIndex((value) => value + 1);
      setTarget(18 + Math.round(Math.random() * 64));
    }, 90);
  }

  function newRoll() {
    setShots(0);
    setMessage("Novo rolo carregado");
  }

  function moveAutofocus(event: PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const x = Math.max(10, Math.min(90, ((event.clientX - box.left) / box.width) * 100));
    const y = Math.max(14, Math.min(86, ((event.clientY - box.top) / box.height) * 100));
    setAf({ x, y });
  }

  const shutterLabel = isVideo ? (recording ? "Parar gravação" : "Gravar") : rollFull ? "Rolo cheio" : "Disparar";

  return (
    <section className="viewer section section--dark" id="visor" aria-labelledby="visor-title">
      <div className="shell">
        <div className="section-head">
          <div className="section-head__title">
            <p className="eyebrow eyebrow--yellow">Experimente o visor</p>
            <h2 id="visor-title" className="display">
              Nosso olhar, <em>em suas mãos.</em>
            </h2>
          </div>
          <p className="section-head__note">
            Troque o formato, gire o anel de foco e dispare. É assim que pensamos cada quadro antes de gravar.
          </p>
        </div>

        <div className="viewer__layout">
          <div className="viewer__screen">
            <div className="viewer__stage" role="group" aria-label="Visor da câmera">
              <div
                className="viewer__frame"
                style={{ "--ratio": format.ratio, "--blur": `${blur}px` } as CSSProperties}
                onPointerMove={moveAutofocus}
                onPointerLeave={() => setAf({ x: 50, y: 50 })}
              >
                <div className="viewer__photo">
                  <Image
                    key={project.image}
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 900px) 92vw, 640px"
                  />
                </div>

                <div className="viewer__grid" aria-hidden="true">
                  <i className="v-line v-line--1" />
                  <i className="v-line v-line--2" />
                  <i className="h-line h-line--1" />
                  <i className="h-line h-line--2" />
                  <i className="corner corner--tl" />
                  <i className="corner corner--tr" />
                  <i className="corner corner--bl" />
                  <i className="corner corner--br" />
                </div>

                <div
                  className={`viewer__af${sharp ? " is-sharp" : ""}`}
                  style={{ left: `${af.x}%`, top: `${af.y}%` }}
                  aria-hidden="true"
                >
                  <i /><i /><i /><i /><b />
                </div>

                <div className="viewer__hud viewer__hud--top" aria-hidden="true">
                  <span className="hud-group">
                    <span className="hud-group">
                      <span
                        className={`rec-dot${isVideo ? " rec-dot--video" : ""}`}
                        style={{ opacity: isVideo ? (recording ? (blinkOn ? 1 : 0.15) : 0.45) : 1 }}
                      />
                      {isVideo ? (recording ? "REC" : "STBY") : "Foto"}
                    </span>
                    <span className={sharp ? "hud-af is-sharp" : "hud-af"}>AF</span>
                  </span>
                  <span className="hud-group">
                    {format.hud}
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none" aria-hidden="true">
                      <rect x="0.75" y="0.75" width="18" height="10.5" rx="2" stroke="#fff" strokeWidth="1.5" />
                      <rect x="3" y="3" width="11" height="6" fill="#fff" />
                      <rect x="20" y="4" width="1.5" height="4" fill="#fff" />
                    </svg>
                  </span>
                </div>

                <div className="viewer__hud viewer__hud--bottom" aria-hidden="true">
                  <span className="hud-group">
                    <span>ISO {isVideo ? "400" : "200"}</span>
                    <span>{isVideo ? "1/50" : "1/250"}</span>
                    <span>f/2.8</span>
                    <span>{isVideo ? "24p" : "RAW"}</span>
                  </span>
                  <span className={isVideo && recording ? "hud-counter is-rec" : "hud-counter"}>
                    {isVideo ? timecode(elapsed) : `${pad(shots)} / ${ROLL_SIZE}`}
                  </span>
                </div>

                <div className={`viewer__flash${flash ? " is-on" : ""}`} aria-hidden="true" />
              </div>
            </div>
            <p className="viewer__caption">
              <span>Mova o cursor sobre o visor</span>
              <span>{project.category} · {project.title}</span>
            </p>
          </div>

          <div className="viewer__controls">
            <div className="control">
              <span className="control__label" id="visor-modo">Modo</span>
              <div className="chips" role="group" aria-labelledby="visor-modo">
                <button type="button" className="chip" aria-pressed={mode === "foto"} onClick={() => changeMode("foto")}>
                  Foto
                </button>
                <button type="button" className="chip" aria-pressed={mode === "video"} onClick={() => changeMode("video")}>
                  Vídeo
                </button>
              </div>
            </div>

            <div className="control">
              <span className="control__label" id="visor-formato">Formato</span>
              <div className="chips" role="group" aria-labelledby="visor-formato">
                {FORMATS.map((item) => (
                  <button
                    type="button"
                    className="chip"
                    key={item.id}
                    aria-pressed={formatId === item.id}
                    onClick={() => setFormatId(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="control">
              <div className="control__row">
                <label className="control__label" htmlFor="visor-foco">
                  Anel de foco · {distanceLabel(focus)}
                </label>
                <span className={`control__status${sharp ? " is-sharp" : ""}`} aria-live="polite">
                  {sharp ? "Foco OK" : "Ajuste o foco"}
                </span>
              </div>
              <input
                id="visor-foco"
                className="range"
                type="range"
                min={0}
                max={100}
                step={1}
                value={focus}
                onChange={(event) => setFocus(Number(event.target.value))}
              />
              <div className="range-scale" aria-hidden="true">
                <span>0,5 m</span>
                <span>∞</span>
              </div>
            </div>

            <div className="shutter-row">
              <button
                type="button"
                className={`shutter${isVideo ? " shutter--video" : ""}${recording ? " is-recording" : ""}`}
                onClick={shoot}
                disabled={rollFull}
                aria-label={shutterLabel}
              >
                <span aria-hidden="true" />
              </button>
              <div className="shutter-row__text">
                <span className="shutter-row__title">{shutterLabel}</span>
                <span className="shutter-row__msg" aria-live="polite">{message}</span>
              </div>
            </div>

            {rollFull && (
              <div className="viewer__done">
                <a className="button button--yellow" href={whatsapp} target="_blank" rel="noreferrer">
                  Rolo cheio. Bora fazer o seu? <span aria-hidden="true">↗</span>
                </a>
                <button type="button" className="text-button" onClick={newRoll}>
                  Carregar novo rolo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
