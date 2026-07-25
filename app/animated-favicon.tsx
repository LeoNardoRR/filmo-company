"use client";

import { useEffect } from "react";

const staticFavicon = "/filmo-o.png";

export default function AnimatedFavicon() {
  useEffect(() => {
    const faviconLinks = Array.from(
      document.querySelectorAll<HTMLLinkElement>('link[data-filmo-favicon="true"]'),
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!faviconLinks.length || reduceMotion.matches) return;

    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;

    const context = canvas.getContext("2d");
    const mark = new Image();
    let frame = 0;
    let interval: number | undefined;

    function drawFrame() {
      if (!context) return;

      const progress = (frame % 48) / 48;
      const eased = 0.5 - Math.cos(progress * Math.PI * 2) / 2;
      const rotation = progress * Math.PI * 2;
      const scale = 0.86 + Math.sin(eased * Math.PI) * 0.11;

      context.clearRect(0, 0, 64, 64);
      context.save();
      context.translate(32, 32);
      context.rotate(rotation);
      context.scale(scale, scale);
      context.drawImage(mark, -30, -30, 60, 60);
      context.restore();

      const animatedFavicon = canvas.toDataURL("image/png");
      faviconLinks.forEach((link) => {
        link.href = animatedFavicon;
      });
      frame += 1;
    }

    function start() {
      if (interval || document.hidden) return;
      drawFrame();
      interval = window.setInterval(drawFrame, 90);
    }

    function stop() {
      if (interval) {
        window.clearInterval(interval);
        interval = undefined;
      }
    }

    function handleVisibilityChange() {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    }

    mark.onload = start;
    mark.src = staticFavicon;
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      faviconLinks.forEach((link) => {
        link.href = staticFavicon;
      });
    };
  }, []);

  return null;
}
