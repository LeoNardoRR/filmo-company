"use client";

import Image from "next/image";
import { useRef } from "react";
import { whatsapp } from "./content";

type NavItem = { href: string; label: string };

export default function SiteHeader({ items }: { items: NavItem[] }) {
  const menu = useRef<HTMLDetailsElement>(null);

  function closeMenu() {
    menu.current?.removeAttribute("open");
  }

  return (
    <header className="site-header">
      <div className="site-header__inner shell">
        <a className="brand" href="#inicio" aria-label="Filmo Company, início">
          <Image src="/images/logo.png" alt="Filmo Company" width={396} height={154} priority />
        </a>

        <nav className="site-nav" aria-label="Navegação principal">
          {items.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="button button--yellow button--small" href={whatsapp} target="_blank" rel="noreferrer">
            Orçamento <span aria-hidden="true">↗</span>
          </a>

          <details className="menu" ref={menu}>
            <summary aria-label="Abrir menu de navegação">
              <span>Menu</span>
              <span className="menu__icon" aria-hidden="true">
                <i />
                <i />
              </span>
            </summary>
            <nav className="menu__panel" aria-label="Navegação mobile">
              {items.map((item, index) => (
                <a key={item.href} href={item.href} onClick={closeMenu}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.label}</strong>
                  <i aria-hidden="true">↘</i>
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
