import { useState, useEffect, useRef } from "react";
import React from "react";

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "work", label: "Work Experience" },
  { id: "exploring", label: "Exploring" },
  { id: "beyond", label: "Beyond Tech" },
  { id: "contact", label: "Contact" },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Mono:wght@300;400;500&family=Manrope:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --white: #FAFAF8;
    --off-white: #F2F1EE;
    --ink: #1A1A18;
    --mid: #6B6B6B;
    --light-gray: #E4E3DF;
    --tech: #00C896;
    --tech-dim: #00C89618;
    --tech-mid: #00A87A;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--white);
    color: var(--ink);
    font-family: 'Manrope', sans-serif;
    overflow-x: hidden;
  }

  /* ── NAV ── */
  .nav {
    position: sticky; top: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px;
    height: 60px;
    background: rgba(250,250,248,0.97);
    border-bottom: 1.5px solid var(--light-gray);
    box-shadow: 0 2px 20px rgba(0,0,0,0.05);
    backdrop-filter: blur(12px);
    width: 100%;
  }
  .nav-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 17px; color: var(--ink);
    white-space: nowrap; flex-shrink: 0;
    cursor: pointer; text-decoration: none;
  }
  .nav-logo span { color: var(--tech); }

  .nav-links {
    display: flex; align-items: center;
    list-style: none; gap: 2px; flex-wrap: nowrap;
  }
  .nav-link {
    font-size: 12.5px; font-weight: 500;
    letter-spacing: 0.03em; color: var(--mid);
    background: none; border: none; cursor: pointer;
    padding: 6px 11px; border-radius: 3px;
    position: relative;
    transition: color 0.2s, background 0.2s;
    white-space: nowrap; font-family: 'Manrope', sans-serif;
  }
  .nav-link::after {
    content: ''; position: absolute;
    bottom: 1px; left: 11px; right: 11px;
    height: 2px; background: var(--tech); border-radius: 2px;
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.25s cubic-bezier(0.4,0,0.2,1);
  }
  .nav-link:hover { color: var(--ink); background: var(--off-white); }
  .nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }
  .nav-link.active { color: var(--ink); }
  .nav-link.contact-btn {
    background: var(--ink); color: var(--white) !important;
    margin-left: 8px; padding: 6px 16px;
  }
  .nav-link.contact-btn::after { display: none; }
  .nav-link.contact-btn:hover { background: var(--tech-mid); }

  /* ── MOBILE NAV HAMBURGER ── */
  .nav-menu-btn {
    display: none;
    flex-direction: column; justify-content: center; align-items: center;
    gap: 5px; width: 36px; height: 36px;
    background: none; border: none; cursor: pointer;
    padding: 4px; flex-shrink: 0;
  }
  .nav-menu-btn span {
    display: block; width: 22px; height: 2px;
    background: var(--ink); border-radius: 2px;
    transition: transform 0.25s, opacity 0.2s;
  }
  .nav-menu-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-menu-btn.open span:nth-child(2) { opacity: 0; }
  .nav-menu-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  .nav-mobile-menu {
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: rgba(250,250,248,0.98);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--light-gray);
    z-index: 99;
    padding: 10px 16px 18px;
    display: flex; flex-direction: column; gap: 2px;
    animation: menuSlide 0.2s ease;
  }
  @keyframes menuSlide {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .nav-mobile-link {
    font-family: 'Manrope', sans-serif;
    font-size: 14px; font-weight: 500; color: var(--mid);
    background: none; border: none;
    padding: 11px 14px; border-radius: 4px;
    cursor: pointer; text-align: left;
    transition: background 0.15s, color 0.15s;
  }
  .nav-mobile-link:hover,
  .nav-mobile-link.active { background: var(--off-white); color: var(--ink); }
  .nav-mobile-link.contact-m {
    background: var(--ink); color: var(--white) !important;
    margin-top: 6px; text-align: center; border-radius: 3px;
  }
  .nav-mobile-link.contact-m:hover { background: var(--tech-mid); }

  /* ── HERO ── */
  .hero-section {
    min-height: calc(100vh - 60px);
    display: grid; grid-template-columns: 1fr 1fr;
    align-items: center;
    padding: 60px 64px; gap: 40px;
    position: relative; overflow: hidden;
  }
  .hero-grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--light-gray) 1px, transparent 1px),
      linear-gradient(90deg, var(--light-gray) 1px, transparent 1px);
    background-size: 48px 48px; opacity: 0.45; pointer-events: none;
  }
  .hero-glow {
    position: absolute; width: 420px; height: 420px; border-radius: 50%;
    background: radial-gradient(circle, #00C89622 0%, transparent 70%);
    top: 5%; right: 5%; pointer-events: none;
    animation: blobFloat 8s ease-in-out infinite;
  }
  @keyframes blobFloat {
    0%,100% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-24px) scale(1.04); }
  }
  .hero-left { position: relative; z-index: 1; animation: fadeUp 0.85s ease both; }
  @keyframes fadeUp {
    from { opacity:0; transform: translateY(22px); }
    to   { opacity:1; transform: translateY(0); }
  }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--tech-mid); background: var(--tech-dim);
    border: 1px solid #00C89644; padding: 5px 14px;
    border-radius: 2px; margin-bottom: 28px;
  }
  .hero-tag-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: var(--tech); animation: pulseDot 2s infinite;
  }
  @keyframes pulseDot {
    0%,100% { opacity:1; transform:scale(1); }
    50% { opacity:0.3; transform:scale(0.7); }
  }
  .hero-name {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(44px, 5vw, 76px);
    line-height: 1.06; letter-spacing: -0.02em;
    color: var(--ink); margin-bottom: 14px; white-space: nowrap;
  }
  .hero-name em { font-style: italic; color: var(--tech-mid); }
  .hero-role {
    font-family: 'DM Mono', monospace; font-size: 13px;
    color: var(--mid); letter-spacing: 0.07em; margin-bottom: 24px;
  }
  .hero-desc {
    font-size: 16px; line-height: 1.78; color: #4A4A46;
    max-width: 420px; margin-bottom: 40px;
  }
  .hero-desc strong { color: var(--ink); font-weight: 600; }
  .btn-connect {
    display: inline-flex; align-items: center; gap: 10px;
    background: var(--ink); color: var(--white);
    font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.04em; padding: 14px 32px;
    border: none; border-radius: 2px; cursor: pointer;
    position: relative; overflow: hidden;
  }
  .btn-connect-fill {
    position: absolute; inset: 0; background: var(--tech);
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); z-index: 0;
  }
  .btn-connect:hover .btn-connect-fill { transform: translateX(0); }
  .btn-connect-text, .btn-connect-arrow { position: relative; z-index: 1; }
  .btn-connect-arrow { transition: transform 0.2s; display: flex; align-items: center; }
  .btn-connect:hover .btn-connect-arrow { transform: translateX(4px); }

  /* PHOTO */
  .hero-right {
    position: relative; z-index: 1;
    display: flex; justify-content: center; align-items: center;
    animation: fadeUp 0.85s 0.18s ease both;
    padding: 20px 40px 20px 20px;
  }
  .photo-frame {
    position: relative; width: 350px;
    flex-shrink: 0; padding-bottom: 24px;
  }
  .photo-border {
    position: absolute;
    top: 12px; left: 12px; right: -12px; bottom: -12px;
    border: 2px solid var(--tech); border-radius: 4px; z-index: 0;
  }
  .photo-inner {
    position: relative; z-index: 1; width: 100%; min-height: 200px;
    border-radius: 4px; overflow: hidden; background: var(--off-white);
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 10px;
  }
  .photo-inner img { width: 100%; height: 400px; object-fit: cover; display: block; }
  .photo-initials {
    font-family: 'DM Serif Display', serif; font-size: 72px;
    color: var(--light-gray); line-height: 1;
  }
  .photo-label {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.1em; color: #C0BFB9; text-transform: uppercase;
  }
  .photo-monogram {
    position: absolute; bottom: 0; right: -18px;
    width: 52px; height: 52px; background: var(--tech); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Serif Display', serif; font-size: 17px; color: white;
    z-index: 3; box-shadow: 0 4px 16px rgba(0,200,150,0.3);
  }
  .photo-badge {
    position: absolute; bottom: 40px; left: -24px;
    background: var(--white); border: 1px solid var(--light-gray);
    border-radius: 4px; padding: 10px 14px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.08); z-index: 4;
    animation: badgeBob 5s ease-in-out infinite; white-space: nowrap;
  }
  @keyframes badgeBob {
    0%,100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  .badge-top {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.08em; color: var(--tech-mid);
    text-transform: uppercase; margin-bottom: 3px;
  }
  .badge-val { font-size: 13px; font-weight: 700; color: var(--ink); }

  /* SCROLL HINT */
  .scroll-hint {
    position: absolute; bottom: 28px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    z-index: 2; pointer-events: none;
    animation: fadeUp 1s 0.6s ease both;
  }
  .scroll-hint-text {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.14em; text-transform: uppercase; color: #C0BFB9;
  }
  .scroll-line {
    width: 1px; height: 40px;
    background: linear-gradient(to bottom, #C0BFB9, transparent);
    animation: scrollAnim 2s ease-in-out infinite;
  }
  @keyframes scrollAnim {
    0%   { transform: scaleY(0); transform-origin: top; opacity:0; }
    50%  { transform: scaleY(1); transform-origin: top; opacity:1; }
    100% { transform: scaleY(0); transform-origin: bottom; opacity:0; }
  }

  /* ── SECTION BASE ── */
  .section {
    padding: 96px 64px; border-top: 1px solid var(--light-gray); position: relative;
  }
  .section-label {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--tech-mid); margin-bottom: 12px;
  }
  .section-title {
    font-family: 'DM Serif Display', serif;
    font-size: clamp(36px, 4vw, 52px);
    color: var(--ink); margin-bottom: 48px; line-height: 1.1;
  }

  /* ── ABOUT ── */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
  .about-bio { font-size: 16px; line-height: 1.82; color: #4A4A46; text-align: justify; }
  .about-bio p + p { margin-top: 18px; }
  .about-bio strong { color: var(--ink); font-weight: 600; }
  .skills-title {
    font-family: 'DM Mono', monospace; font-size: 11px;
    letter-spacing: 0.12em; text-transform: uppercase; color: var(--mid); margin-bottom: 16px;
  }
  .skills-wrap { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 32px; }
  .skill-tag {
    font-family: 'DM Mono', monospace; font-size: 12px;
    padding: 6px 14px; border-radius: 2px;
    border: 1px solid #00C89644; color: var(--tech-mid); background: var(--tech-dim);
    transition: border-color 0.2s, color 0.2s, background 0.2s; cursor: default;
  }
  .skill-tag:hover { border-color: var(--tech); background: #00C89628; }
  .btn-view-work {
    display: inline-flex; align-items: center; gap: 10px; margin-top: 28px;
    background: transparent; color: var(--ink);
    font-family: 'Manrope', sans-serif; font-size: 14px; font-weight: 600;
    letter-spacing: 0.04em; padding: 13px 28px;
    border: 1.5px solid var(--ink); border-radius: 2px; cursor: pointer;
    position: relative; overflow: hidden; transition: color 0.3s;
  }
  .btn-view-work::before {
    content: ''; position: absolute; inset: 0; background: var(--tech);
    transform: translateX(-100%);
    transition: transform 0.35s cubic-bezier(0.4,0,0.2,1); z-index: 0;
  }
  .btn-view-work:hover::before { transform: translateX(0); }
  .btn-view-work:hover { color: var(--white); border-color: var(--tech); }
  .btn-view-work span, .btn-view-work svg { position: relative; z-index: 1; }
  .btn-view-work svg { transition: transform 0.2s; }
  .btn-view-work:hover svg { transform: translateX(4px); }

  /* ── PROJECTS ── */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }
  .project-card {
    background: var(--white); border: 1px solid var(--light-gray);
    border-radius: 4px; padding: 28px;
    transition: border-color 0.25s, box-shadow 0.25s, transform 0.2s;
    position: relative; overflow: hidden;
  }
  .project-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0;
    height: 2px; background: var(--tech);
    transform: scaleX(0); transform-origin: left; transition: transform 0.3s;
  }
  .project-card:hover { border-color: #C8C7C3; box-shadow: 0 8px 32px rgba(0,0,0,0.07); transform: translateY(-2px); }
  .project-card:hover::before { transform: scaleX(1); }
  .project-type {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--tech-mid); margin-bottom: 10px;
  }
  .project-name { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); margin-bottom: 10px; }
  .project-desc { font-size: 14px; line-height: 1.7; color: var(--mid); margin-bottom: 20px; text-align: justify; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
  .project-tag {
    font-family: 'DM Mono', monospace; font-size: 11px;
    padding: 3px 10px; background: var(--off-white); border-radius: 2px; color: var(--mid);
  }
  .project-links { display: flex; gap: 12px; }
  .project-link {
    font-family: 'DM Mono', monospace; font-size: 12px;
    color: var(--tech-mid); text-decoration: none;
    display: flex; align-items: center; gap: 5px; transition: color 0.2s;
  }
  .project-link:hover { color: var(--ink); }
  .project-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .project-card-top .project-type { margin-bottom: 0; }
  .status-badge {
    font-family: 'DM Mono', monospace; font-size: 10px;
    letter-spacing: 0.06em; padding: 4px 10px; border-radius: 20px; font-weight: 500;
  }
  .status-badge.completed { background: #00C89618; color: var(--tech-mid); border: 1px solid #00C89640; }
  .status-badge.in-progress { background: #FFF3E0; color: #E07A00; border: 1px solid #FFCC8040; }

  /* ── WORK ── */
  .work-timeline { position: relative; padding-left: 48px; }
  .work-timeline::before {
    content: ''; position: absolute;
    left: 15px; top: 8px; bottom: 8px;
    width: 1px; background: var(--light-gray);
  }
  .work-item { position: relative; padding-bottom: 52px; }
  .work-item:last-child { padding-bottom: 0; }
  .work-dot {
    position: absolute; left: -23px; top: 8px;
    width: 12px; height: 12px; border-radius: 50%;
    background: var(--white); border: 2px solid #C8C7C3; transition: border-color 0.4s;
  }
  .work-dot.passed { border-color: var(--tech); background: #00C89618; }
  .timeline-agent {
    position: absolute; left: -31px;
    width: 28px; height: 28px; border-radius: 50%;
    background: radial-gradient(circle at 38% 35%, #00E8A8, #00A87A 60%, #007A58);
    box-shadow: 0 0 0 5px #00C89625, 0 0 18px #00C89655, inset 0 2px 3px rgba(255,255,255,0.3);
    z-index: 10; animation: agentGlow 2s ease-in-out infinite; pointer-events: none;
  }
  .timeline-agent::before, .timeline-agent::after {
    content: ''; position: absolute; inset: -6px; border-radius: 50%;
    border: 1.5px solid #00C896; animation: agentRipple 2s ease-out infinite;
  }
  .timeline-agent::after { animation-delay: 0.7s; }
  @keyframes agentGlow {
    0%,100% { box-shadow: 0 0 0 5px #00C89625, 0 0 14px #00C89645; }
    50%      { box-shadow: 0 0 0 8px #00C89635, 0 0 24px #00C89665; }
  }
  @keyframes agentRipple {
    0%   { opacity: 0.5; transform: scale(0.8); }
    100% { opacity: 0;   transform: scale(1.6); }
  }
  .work-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 6px; flex-wrap: wrap; }
  .work-period { font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.08em; color: var(--mid); }
  .work-duration {
    font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.06em;
    color: var(--white); background: var(--tech-mid); padding: 2px 9px; border-radius: 20px;
  }
  .work-role { font-family: 'DM Serif Display', serif; font-size: 22px; color: var(--ink); margin-bottom: 4px; }
  .work-company { font-size: 14px; font-weight: 600; color: var(--tech-mid); margin-bottom: 12px; }
  .work-desc { font-size: 14.5px; line-height: 1.75; color: #4A4A46; max-width: 620px; text-align: justify; }

  /* ── BRAIN ── */
  .brain-scene {
    position: relative; width: 100%; height: 600px;
    display: flex; align-items: center; justify-content: center;
    background: radial-gradient(ellipse at center, #0A1A12 0%, #050E08 60%, #020A05 100%);
    border-radius: 16px; overflow: hidden;
  }
  .brain-frozen-overlay {
    position: absolute; inset: 0;
    background: rgba(250,250,248,0.6); backdrop-filter: blur(1.5px);
    z-index: 15; border-radius: 12px; pointer-events: none;
    animation: overlayIn 0.3s ease;
  }
  @keyframes overlayIn { from { opacity:0; } to { opacity:1; } }
  .brain-core {
    position: relative; z-index: 5; width: 160px; height: 160px;
    display: flex; align-items: center; justify-content: center;
    flex-direction: column; gap: 3px;
  }
  .brain-svg { animation: brainPulse 3s ease-in-out infinite; }
  @keyframes brainPulse {
    0%,100% { transform: scale(1); filter: drop-shadow(0 0 12px #00C89660) drop-shadow(0 0 30px #00C89630); }
    50%      { transform: scale(1.04); filter: drop-shadow(0 0 28px #00C896AA) drop-shadow(0 0 60px #00C89650); }
  }
  .brain-label {
    font-family: 'DM Mono', monospace; font-size: 9px;
    letter-spacing: 0.15em; text-transform: uppercase; color: #00C896AA; margin-top: 6px;
  }
  .thought-node { position: absolute; top: 50%; left: 50%; z-index: 10; cursor: pointer; }
  .thought-pill {
    transform: translate(-50%, -50%);
    background: rgba(255,255,255,0.10); border: 1px solid rgba(255,255,255,0.25);
    border-radius: 40px; padding: 10px 18px;
    font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.04em;
    color: rgba(255,255,255,0.80); white-space: nowrap;
    transition: border-color 0.25s, box-shadow 0.25s, background 0.25s, color 0.25s;
    box-shadow: 0 2px 16px rgba(0,0,0,0.3); backdrop-filter: blur(6px); user-select: none;
  }
  .thought-node:hover .thought-pill { border-color: #00C896; background: rgba(0,200,150,0.15); color: #fff; box-shadow: 0 4px 24px #00C89445; }
  .thought-node.active .thought-pill { border-color: #00C896; background: rgba(0,200,150,0.2); color: #fff; box-shadow: 0 0 0 3px #00C89622, 0 4px 28px #00C89455; z-index: 30; }
  .thought-dot {
    position: absolute; top: 50%; left: 50%;
    width: 6px; height: 6px; border-radius: 50%; background: #00C896;
    transform: translate(-50%, -50%); opacity: 0.35; transition: opacity 0.25s;
  }
  .thought-node:hover .thought-dot, .thought-node.active .thought-dot { opacity: 1; }
  .insight-card {
    position: absolute; z-index: 30; width: 280px;
    background: #FFFFFF; border: 1.5px solid var(--tech); border-radius: 10px;
    padding: 20px 22px 18px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5), 0 0 0 1px #00C89618;
    animation: insightIn 0.3s cubic-bezier(0.34,1.56,0.64,1); pointer-events: all;
  }
  @keyframes insightIn {
    from { opacity: 0; transform: scale(0.84) translateY(10px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }
  .insight-title { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #00C896; margin-bottom: 12px; }
  .insight-text { font-size: 13px; line-height: 1.78; color: #5A5A54; }
  .insight-text strong { color: #1A1A18; font-weight: 600; }
  .insight-close {
    position: absolute; top: 12px; right: 14px; font-size: 18px; color: #AAAAAA;
    cursor: pointer; pointer-events: all; line-height: 1;
    background: none; border: none; padding: 2px 4px; transition: color 0.2s;
  }
  .insight-close:hover { color: #00C896; }

  /* ── BEYOND ── */
  .beyond-tabs { display: flex; gap: 6px; margin-bottom: 36px; flex-wrap: wrap; }
  .beyond-tab {
    font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.06em;
    padding: 8px 18px; border-radius: 30px;
    border: 1.5px solid var(--light-gray); background: transparent; color: var(--mid);
    cursor: pointer; transition: all 0.2s;
  }
  .beyond-tab:hover { border-color: var(--tech); color: var(--tech); }
  .beyond-tab.active { background: var(--ink); border-color: var(--ink); color: var(--white); }
  .books-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .book-card { border-radius: 6px; overflow: hidden; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; position: relative; }
  .book-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.14); }
  .book-cover { height: 160px; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 16px; text-align: center; gap: 8px; position: relative; }
  .book-cover-title { font-family: 'DM Serif Display', serif; font-size: 14px; line-height: 1.3; }
  .book-cover-author { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; opacity: 0.55; }
  .book-badge { position: absolute; top: 8px; right: 8px; font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.08em; text-transform: uppercase; background: #00C896; color: #0A1A12; padding: 2px 7px; border-radius: 10px; font-weight: 700; }
  .book-reflection { background: #FAFAF6; padding: 14px 16px; font-size: 12px; line-height: 1.7; color: #5A5A54; border-top: 1px solid #E8E6E0; animation: slideDown 0.25s ease; font-style: italic; }
  @keyframes slideDown { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
  .writing-list { display: flex; flex-direction: column; gap: 16px; }
  .writing-card { border: 1px solid var(--light-gray); border-radius: 6px; padding: 20px 22px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
  .writing-card:hover { border-color: #C8C7C3; background: var(--white); }
  .writing-card.open { border-color: var(--tech); background: var(--white); }
  .writing-card-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
  .writing-title { font-family: 'DM Serif Display', serif; font-size: 18px; color: var(--ink); margin-bottom: 6px; }
  .writing-preview { font-size: 13.5px; color: var(--mid); line-height: 1.65; }
  .writing-toggle { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--tech); white-space: nowrap; margin-top: 3px; flex-shrink: 0; }
  .writing-full { font-size: 14px; line-height: 1.8; color: #4A4A46; margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--light-gray); animation: slideDown 0.25s ease; }
  .story-btn { display: inline-flex; align-items: center; gap: 10px; padding: 11px 22px; border-radius: 30px; border: 1.5px solid var(--tech); background: transparent; color: var(--tech); font-family: 'DM Mono', monospace; font-size: 12px; letter-spacing: 0.06em; cursor: pointer; transition: all 0.2s; }
  .story-btn:hover { background: var(--tech); color: #fff; }
  @keyframes storyIn { from { opacity:0; transform:scale(1.04); } to { opacity:1; transform:scale(1); } }
  .speaking-intro { margin-bottom: 24px; padding: 20px 24px; border-left: 3px solid var(--tech); background: #F7FBF8; border-radius: 0 6px 6px 0; }
  .speaking-intro-text { font-family: 'DM Serif Display', serif; font-size: 17px; line-height: 1.75; color: #2A2A26; }
  .beyond-panel { animation: fadeIn 0.25s ease; }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  /* ── CONTACT ── */
  .contact-links { display: flex; flex-direction: column; gap: 14px; }
  .contact-link-item { display: flex; align-items: center; gap: 14px; font-size: 14px; color: var(--ink); text-decoration: none; font-weight: 500; transition: color 0.2s; }
  .contact-link-item:hover { color: var(--tech-mid); }
  .contact-link-icon { width: 40px; height: 40px; background: var(--off-white); border: 1px solid var(--light-gray); border-radius: 3px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; transition: border-color 0.2s, background 0.2s; }
  .contact-link-item:hover .contact-link-icon { border-color: var(--tech); background: var(--tech-dim); }

  /* ── FOOTER ── */
  .footer { border-top: 1px solid var(--light-gray); padding: 28px 64px; display: flex; align-items: center; justify-content: space-between; }
  .footer-name { font-family: 'DM Serif Display', serif; font-size: 15px; color: var(--ink); }
  .footer-name span { color: var(--tech); }
  .footer-copy { font-family: 'DM Mono', monospace; font-size: 11px; color: #C0BFB9; letter-spacing: 0.06em; }

  /* ═══════════════════════════════
     RESPONSIVE
  ═══════════════════════════════ */

  /* TABLET ≤ 900px */
  @media (max-width: 900px) {
    .nav { padding: 0 20px; }
    .nav-links { display: none; }
    .nav-menu-btn { display: flex; }

    .hero-section { grid-template-columns: 1fr; padding: 40px 28px 80px; text-align: center; gap: 32px; }
    .hero-left { display: flex; flex-direction: column; align-items: center; }
    .hero-right { order: -1; padding: 8px 20px; justify-content: center; }
    .hero-desc { margin: 0 auto 36px; max-width: 480px; }
    .photo-frame { width: 160px; }
    .photo-inner img { height: 200px; }

    .section { padding: 64px 28px; }
    .section-title { margin-bottom: 36px; }
    .about-grid { grid-template-columns: 1fr; gap: 36px; }
    .projects-grid { grid-template-columns: 1fr; }
    .brain-scene { height: 460px; }
    .insight-card { width: 240px; }
    .books-grid { grid-template-columns: repeat(3, 1fr); }
    .footer { padding: 24px 28px; flex-direction: column; gap: 8px; text-align: center; }
  }

  /* MOBILE ≤ 600px */
  @media (max-width: 600px) {
    .nav { padding: 0 16px; height: 52px; }
    .nav-mobile-menu { top: 52px; }

    .hero-section { padding: 28px 16px 72px; gap: 20px; }
    .hero-name { font-size: 36px; white-space: normal; }
    .hero-tag { font-size: 10px; padding: 4px 11px; }
    .hero-desc { font-size: 14.5px; }
    .photo-frame { width: 160px; padding-bottom: 12px; }
    .photo-inner img { height: 220px; }
    .photo-badge { font-size: 9px; padding: 6px 8px; left: -4px; white-space: normal; max-width: 130px; 
    .photo-border { top: 8px; left: 8px; right: -8px; bottom: -8px; }
    .badge-top { font-size: 9px; }
    .badge-val { font-size: 10px; }
    .photo-monogram { width: 40px; height: 40px; font-size: 13px; right: -12px; }
    .photo-initials { font-size: 52px; }

    .section { padding: 48px 16px; }
    .section-title { font-size: 28px; margin-bottom: 28px; }
    .about-bio { font-size: 14.5px; }
    .skill-tag { font-size: 11px; padding: 5px 10px; }

    .project-card { padding: 20px 16px; }
    .project-name { font-size: 19px; }

    .work-timeline { padding-left: 32px; }
    .work-role { font-size: 18px; }
    .work-desc { font-size: 13.5px; }

    .brain-scene { height: 360px; border-radius: 10px; }
    .insight-card { width: 190px; padding: 14px 14px 12px; }
    .insight-text { font-size: 12px; }
    .thought-pill { font-size: 9.5px; padding: 7px 12px; }

    .beyond-tab { font-size: 10px; padding: 6px 12px; }
    .books-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .book-cover { height: 130px; }
    .book-cover-title { font-size: 12px; }
    .writing-card { padding: 14px 16px; }
    .writing-title { font-size: 16px; }
    .speaking-intro-text { font-size: 15px; }

    .footer { padding: 20px 16px; }
  }

  /* SMALL MOBILE ≤ 380px */
  @media (max-width: 380px) {
    .hero-name { font-size: 30px; }
    .photo-frame { width: 175px; }
    .photo-badge { left: -4px; }
    .beyond-tab { font-size: 9px; padding: 5px 9px; }
  }
`;

/* ── DATA ── */
const projects = [
  {
    type: "AI / NLP",
    name: "Student Profile Analyzer",
    desc: "An AI-powered application that generates personalized cover letters by analyzing uploaded resume PDFs. Used Gemini + Flask 2.0 for text processing and cover letter generation. Integrated Sentence Transformers for semantic similarity and context extraction. Built LangChain pipelines for RAG-based cover letter generation.",
    tags: ["Flask 2.0", "Gemini", "Sentence Transformers", "LangChain", "FAISS", "Gradio", "Python"],
    link: "#", demo: "#", status: "completed",
  },
  {
    type: "Machine Learning",
    name: "PCOS Detection System",
    desc: "A machine learning–based system that predicts PCOS risk and tracks symptoms for early detection and health monitoring. Developed a predictive model and symptom tracker using patient health data with feature selection and ML algorithms.",
    tags: ["Python", "Logistic Regression", "Random Forest", "SVM", "Pandas", "NumPy", "scikit-learn", "Matplotlib", "Google Colab"],
    link: "#", demo: "#", status: "completed",
  },
  {
    type: "Robotics / AI",
    name: "Mini-ROS",
    desc: "A hybrid robotics system using ROS2 with integrated AI-based object detection using CNNs. Combines real-time robotic control with cloud connectivity while supporting reliable offline operation.",
    tags: ["ROS2", "Python", "CNN", "Machine Learning", "Regression Models", "Linux"],
    link: "#", demo: null, status: "in-progress",
  },
];

const workItems = [
  { period: "Sep '25 — Present", duration: "Ongoing", role: "AI/ML Intern", company: "FinxtApp", desc: "Working on machine learning to train and evaluate models. Contributing to AI-driven features and building intelligent pipelines for the platform." },
  { period: "Jun '25 — Aug '25", duration: "3 months", role: "Business Intelligence Intern", company: "Technocolabs Software Inc.", desc: "Created comprehensive interactive dashboards and reports using Power BI, SQL, and Looker Studio to analyze data trends and deliver actionable business insights for decision-making." },
  { period: "Sep '24 — Oct '24", duration: "2 months", role: "Cloud Intern", company: "IBM", desc: "Leveraged AWS services, Docker containerization, and Node-RED for workflow automation to streamline application deployments and optimize cloud-based solutions." },
];

const thoughtNodes = [
  { id: "rag",    label: "RAG Systems",                  angle: 0,   rx: 140, ry: 60,  speed: 0.40, insight: "<strong>Retrieval-Augmented Generation</strong> is evolving beyond simple vector search pipelines. New approaches such as <strong>page-level indexing</strong>, <strong>structured retrieval</strong>, and <strong>hybrid search</strong> are emerging to improve grounding and accuracy." },
  { id: "deploy", label: "AI Deployment",                angle: 90,  rx: 220, ry: 95,  speed: 0.28, insight: "Local AI applications running on localhost can now be shared securely through tools like <strong>Cloudflare Tunnel</strong>. This allows developers to expose local services to the internet <strong>without managing full cloud infrastructure</strong>." },
  { id: "tpm",    label: "Technical Project Management", angle: 180, rx: 270, ry: 130, speed: 0.20, insight: "Strong TPMs combine <strong>system understanding</strong> with <strong>execution leadership</strong>. Core skills include system design awareness, <strong>stakeholder communication</strong>, roadmap planning, <strong>risk management</strong>, and coordinating cross-functional engineering teams." },
  { id: "vibe",   label: "Vibe Coding",                  angle: 270, rx: 185, ry: 165, speed: 0.34, insight: "<strong>Vibe coding</strong> is emerging as developers prototype ideas with AI-assisted tools. Instead of rigid cycles, builders <strong>rapidly experiment and iterate</strong>. AI coding assistants dramatically reduce <strong>friction between ideas and working prototypes</strong>." },
];

const books = [
  { title: "Mahabharata Unravelled", author: "Ami Ganatra", color: "#F5ECD7", textColor: "#2A1A06", currently: false, reflection: "This book reframed the Mahabharata for me — not as mythology but as a lens on human nature. Every character's decision is logical in their own context. Dharma isn't a fixed rule; it's a constant negotiation between duty, love, and consequence." },
  { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", color: "#F2E0E8", textColor: "#2A0A18", currently: false, reflection: "Told from Draupadi's perspective, this book made me see how the same story changes entirely based on who is living it. It reminded me that the most important voices are often the ones history sidelines." },
  { title: "The Diary of a Young Girl", author: "Anne Frank", color: "#E8F0E0", textColor: "#0A1A06", currently: false, reflection: "Anne's ability to find hope, humour, and dreams in the darkest circumstances is humbling. It's a reminder that inner life — curiosity, ambition, feeling — cannot be taken away even when everything else is." },
  { title: "Days at the Morisaki Bookshop", author: "Satoshi Yagisawa", color: "#E8EEF5", textColor: "#061020", currently: false, reflection: "A quiet, gentle book about healing through books and human connection. It reminded me that sometimes the best thing for a restless mind is to sit still, be surrounded by stories, and let time move at its own pace." },
  { title: "One Indian Girl", author: "Chetan Bhagat", color: "#FFF0E0", textColor: "#2A1000", currently: true, reflection: "Currently reading. A story about ambition, identity, and the impossible standards placed on women who dare to be successful. Radhika's inner voice feels uncomfortably real at times." },
];

const writings = [
  { title: "The Quiet Wonder", preview: "Zoning out is one of the best or the worst things that I have been doing since the moment I became conscious...", content: "Zoning out is one of the best or the worst things that I have been doing since the moment I became conscious.\n\nBut what exactly do I zone out to? I don't have the answer because there is no memory of that space.\n\nIt sometimes feels peaceful and sometimes cloudy — as if I'm slowly disappearing.\n\nHow is that a voice which was audible some minutes ago gets muted?\n\nAnd the worst part — \"This wondering is of no use.\"" },
  { title: "No More Sunflowers 🌻", preview: "I and many of us once associated ourselves with Sunflowers because they felt unique. As they were not mainstream...", content: "But Why? I and many of us once associated ourselves with Sunflowers because they felt unique.\n\nAs they were not mainstream but now it has caught the eyes of many people. It doesn't feel personal anymore.\n\nWhy is it that we look for things to set us apart from the herd? Is it healthy, or just a psychological need of individuality??" },
  { title: "Loss Aversion: The Fear of Loss", preview: "In life, fear of loss always outweighs potential gains. We know letting go of that fear can result in something better...", content: "Loss Aversion: The fear of loss.\n\nIn life, fear of loss always outweighs potential gains.\nWe know letting go of that fear can result in something better.\nStill holding on out of fear." },
  { title: "Honesty:", preview: "It lies in the intent of the speaker. Really????? Should we only see the intent?...", content: "It lies in the intent of the speaker.\nReally?????\nShould we only see the intent?\nThen why does karma only see actions and vibrations — not intent?\n(Then maybe intent isn't enough.)\n\nWe argue we were dishonest due to circumstantial reasons. But unfortunately, the loop never ends. We tend to repeat the wrong actions, justify them with logic, and defend ourselves by pretending that what we are doing is necessary for some obvious reason.\n\nWe forget that a particular instant of decision defines whether \"the inertia of honesty will persist or the motion rests.\"" },
];

const speakingPhotos = [{ img: "/anchoring2.jpeg" }, { img: "/anchoring1.jpeg" }];
const eventPhotos = [{ img: "/event1.jpeg" }, { img: "/event2.jpeg" }, { img: "/event3.jpeg" }, { img: "/event4.jpeg" }];

/* ── COMPONENTS ── */

function Navbar({ activeSection }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <>
      <nav className="nav">
        <div className="nav-logo" onClick={() => scrollTo("intro")}>prakriti<span>.</span>dev</div>
        <ul className="nav-links">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <button
                className={`nav-link${id === "contact" ? " contact-btn" : ""}${activeSection === id ? " active" : ""}`}
                onClick={() => scrollTo(id)}
              >{label}</button>
            </li>
          ))}
        </ul>
        <button
          className={`nav-menu-btn${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>
      {menuOpen && (
        <div className="nav-mobile-menu">
          {SECTIONS.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-mobile-link${id === "contact" ? " contact-m" : ""}${activeSection === id ? " active" : ""}`}
              onClick={() => scrollTo(id)}
            >{label}</button>
          ))}
        </div>
      )}
    </>
  );
}

function HeroSection() {
  return (
    <section id="intro" className="hero-section">
      <div className="hero-grid-bg" />
      <div className="hero-glow" />
      <div className="hero-left">
        <div className="hero-tag"><div className="hero-tag-dot" />Available for opportunities</div>
        <h1 className="hero-name">Prakriti <em>Rai</em></h1>
        <p className="hero-role">AI &amp; LLM Developer</p>
        <p className="hero-desc">
          Surfing the realm of <strong>AI and its subsets</strong> to learn and explore — building intelligent systems, experimenting with large language models, and finding what's possible at the edge of the known.
        </p>
        <button className="btn-connect" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
          <div className="btn-connect-fill" />
          <span className="btn-connect-text">Let's Connect</span>
          <span className="btn-connect-arrow">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </span>
        </button>
      </div>
      <div className="hero-right">
        <div className="photo-frame">
          <div className="photo-border" />
          <div className="photo-inner">
           <img src="/image.jpeg" alt="Prakriti Rai" />
          </div>
          <div className="photo-monogram">PR</div>
          <div className="photo-badge">
            <div className="badge-top">Currently learning</div>
            <div className="badge-val">Artificial Intelligence</div>
          </div>
        </div>
      </div>
      <div className="scroll-hint">
        <span className="scroll-hint-text">scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}

function AboutSection() {
  const skills = ["Python", "LLM", "AWS", "Vector Database", "FastAPI", "Problem Solving", "NGINX", "Pandas", "Matplotlib", "NumPy", "PyTorch", "HuggingFace", "LangChain", "RAG", "GitHub", "Prompt Engineering", "Tableau"];
  return (
    <section id="about" className="section">
      <p className="section-label">01 — About</p>
      <h2 className="section-title">Who Am I?</h2>
      <div className="about-grid">
        <div className="about-bio">
          <p>My interest in technology began in <strong>11th grade with Python</strong>, where the logic of programming quickly drew me in. Over time, that curiosity evolved into a deeper interest in <strong>artificial intelligence and machine learning</strong>.</p>
          <p>I practice <strong>data structures and algorithms</strong> to sharpen my problem-solving skills while exploring <strong>LLMs, retrieval-augmented generation (RAG), generative AI</strong>, and machine learning models.</p>
          <p>Most of my learning happens through <strong>building and experimenting</strong> with intelligent systems — turning curiosity into working code.</p>
        </div>
        <div>
          <p className="skills-title">Tech Stack</p>
          <div className="skills-wrap">{skills.map(s => <span className="skill-tag" key={s}>{s}</span>)}</div>
          <button className="btn-view-work" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            <span>View My Work</span>
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="section" style={{ background: "var(--off-white)" }}>
      <p className="section-label">02 — Projects</p>
      <h2 className="section-title">Things I've Built</h2>
      <div className="projects-grid">
        {projects.map((p) => (
          <div className="project-card" key={p.name}>
            <div className="project-card-top">
              <p className="project-type">{p.type}</p>
              <span className={p.status === "in-progress" ? "status-badge in-progress" : "status-badge completed"}>
                {p.status === "in-progress" ? "🔧 In Progress" : "✅ Completed"}
              </span>
            </div>
            <h3 className="project-name">{p.name}</h3>
            <p className="project-desc">{p.desc}</p>
            <div className="project-tags">{p.tags.map(t => <span className="project-tag" key={t}>{t}</span>)}</div>
            <div className="project-links">
              <a href={p.link} className="project-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/></svg>
                GitHub
              </a>
              {p.demo && (
                <a href={p.demo} className="project-link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function WorkSection() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const animRef = useRef(null);
  const [agentY, setAgentY] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { cancelAnimationFrame(animRef.current); setAgentY(null); setTimeout(startJourney, 500); } },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => { observer.disconnect(); cancelAnimationFrame(animRef.current); };
  }, []);

  const startJourney = () => {
    const tl = timelineRef.current;
    if (!tl) return;
    const totalHeight = tl.getBoundingClientRect().height;
    const duration = 3000;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setAgentY((totalHeight - 16) * (1 - eased));
      if (p < 1) animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  return (
    <section id="work" className="section" ref={sectionRef} style={{ position: "relative" }}>
      <p className="section-label">03 — Experience</p>
      <h2 className="section-title">Work Experience</h2>
      <div className="work-timeline" style={{ position: "relative" }} ref={timelineRef}>
        {agentY !== null && <div className="timeline-agent" style={{ top: agentY }} />}
        {workItems.map((w) => (
          <div className="work-item" key={w.role}>
            <div className="work-dot" />
            <div className="work-meta">
              <span className="work-period">{w.period}</span>
              <span className="work-duration">{w.duration}</span>
            </div>
            <h3 className="work-role">{w.role}</h3>
            <p className="work-company">{w.company}</p>
            <p className="work-desc">{w.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ExploringSection() {
  const [activeId, setActiveId] = useState(null);
  const [offsets, setOffsets] = useState({});
  const [frozenOffsets, setFrozenOffsets] = useState(null);
  const animRef = useRef(null);
  const pausedAtRef = useRef(null);
  const startRef = useRef(null);

  const computeOffsets = (t) => {
    const w = window.innerWidth;
    const scale = w < 600 ? 0.50 : w < 900 ? 0.68 : 1;
    const result = {};
    thoughtNodes.forEach((node) => {
      const a = (node.angle * Math.PI) / 180 + t * node.speed;
      result[node.id] = { x: Math.cos(a) * node.rx * scale, y: Math.sin(a) * node.ry * scale };
    });
    return result;
  };

  const startOrbit = (fromT = 0) => {
    const base = performance.now() - fromT * 1000;
    startRef.current = base;
    const tick = (now) => {
      const t = (now - base) / 1000;
      pausedAtRef.current = t;
      setOffsets(computeOffsets(t));
      animRef.current = requestAnimationFrame(tick);
    };
    animRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => { startOrbit(0); return () => cancelAnimationFrame(animRef.current); }, []);

  const handleNodeClick = (id) => {
    if (activeId === id) return;
    cancelAnimationFrame(animRef.current);
    setFrozenOffsets(offsets);
    setActiveId(id);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setActiveId(null);
    setFrozenOffsets(null);
    startOrbit(pausedAtRef.current || 0);
  };

  const displayOffsets = frozenOffsets || offsets;

  const getInsightPos = (id) => {
    const o = displayOffsets[id];
    if (!o) return {};
    return {
      left: o.x > 0 ? `calc(50% + ${o.x + 24}px)` : "auto",
      right: o.x <= 0 ? `calc(50% + ${-o.x + 24}px)` : "auto",
      top: `calc(50% + ${o.y - 70}px)`,
    };
  };

  return (
    <section id="exploring" className="section" style={{ background: "var(--off-white)" }}>
      <p className="section-label">04 — Currently</p>
      <h2 className="section-title">What I'm Exploring</h2>
      <div className="brain-scene">
        {activeId && <div className="brain-frozen-overlay" />}
        <div className="brain-core">
          <svg className="brain-svg" width="130" height="130" viewBox="0 0 100 100" fill="none">
            <path d="M50 22 C38 22 28 28 24 37 C21 43 22 49 25 53 C22 56 20 61 21 66 C23 74 30 79 38 78 C41 78 44 77 46 75 L46 24 C47.2 22.8 48.6 22 50 22 Z" fill="#00C896" opacity="0.9"/>
            <path d="M50 22 C62 22 72 28 76 37 C79 43 78 49 75 53 C78 56 80 61 79 66 C77 74 70 79 62 78 C59 78 56 77 54 75 L54 24 C52.8 22.8 51.4 22 50 22 Z" fill="#00C896" opacity="0.85"/>
            <line x1="50" y1="22" x2="50" y2="78" stroke="#0A1A12" strokeWidth="1.5" opacity="0.6"/>
            <path d="M38 32 Q32 38 35 46" stroke="#0A1A12" strokeWidth="1.2" opacity="0.4" fill="none" strokeLinecap="round"/>
            <path d="M32 44 Q29 52 33 58" stroke="#0A1A12" strokeWidth="1.2" opacity="0.35" fill="none" strokeLinecap="round"/>
            <path d="M36 58 Q32 65 35 70" stroke="#0A1A12" strokeWidth="1" opacity="0.3" fill="none" strokeLinecap="round"/>
            <path d="M62 32 Q68 38 65 46" stroke="#0A1A12" strokeWidth="1.2" opacity="0.4" fill="none" strokeLinecap="round"/>
            <path d="M68 44 Q71 52 67 58" stroke="#0A1A12" strokeWidth="1.2" opacity="0.35" fill="none" strokeLinecap="round"/>
            <path d="M64 58 Q68 65 65 70" stroke="#0A1A12" strokeWidth="1" opacity="0.3" fill="none" strokeLinecap="round"/>
            <circle cx="38" cy="32" r="2.5" fill="#E0FFF5" opacity="0.9"/>
            <circle cx="62" cy="32" r="2.5" fill="#E0FFF5" opacity="0.9"/>
            <circle cx="30" cy="52" r="2" fill="#E0FFF5" opacity="0.8"/>
            <circle cx="70" cy="52" r="2" fill="#E0FFF5" opacity="0.8"/>
            <circle cx="36" cy="68" r="2" fill="#E0FFF5" opacity="0.7"/>
            <circle cx="64" cy="68" r="2" fill="#E0FFF5" opacity="0.7"/>
            <rect x="45" y="76" width="10" height="10" rx="3" fill="#00C896" opacity="0.7"/>
          </svg>
          <span className="brain-label">thinking</span>
        </div>
        <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:2 }}>
          {thoughtNodes.map(node => (
            <ellipse key={node.id} cx="50%" cy="50%" rx={node.rx} ry={node.ry}
              fill="none" stroke="rgba(0,200,150,0.12)" strokeWidth="1" strokeDasharray="6 5" />
          ))}
        </svg>
        {thoughtNodes.map((node) => {
          const o = displayOffsets[node.id] || { x: 0, y: 0 };
          const isActive = activeId === node.id;
          return (
            <React.Fragment key={node.id}>
              <svg style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:3 }}>
                <line x1="50%" y1="50%" x2={`calc(50% + ${o.x}px)`} y2={`calc(50% + ${o.y}px)`} stroke="#00C89625" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
              <div
                className={"thought-node" + (isActive ? " active" : "")}
                style={{ marginLeft: o.x, marginTop: o.y, zIndex: isActive ? 30 : 10 }}
                onClick={() => handleNodeClick(node.id)}
              >
                <div className="thought-pill">{node.label}</div>
                <div className="thought-dot" />
              </div>
              {isActive && (
                <div className="insight-card" style={getInsightPos(node.id)}>
                  <p className="insight-title">{node.label}</p>
                  <p className="insight-text" dangerouslySetInnerHTML={{ __html: node.insight }} />
                  <button className="insight-close" onClick={handleClose}>×</button>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}

const moodSongs = [];

function MusicSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
      <div style={{ width: 220 }}>
        <svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="130" r="95" fill="#1A1A18" />
          <circle cx="110" cy="130" r="88" fill="none" stroke="#2A2A28" strokeWidth="1" />
          <circle cx="110" cy="130" r="72" fill="none" stroke="#2A2A28" strokeWidth="0.8" />
          <circle cx="110" cy="130" r="56" fill="none" stroke="#2A2A28" strokeWidth="0.8" />
          <circle cx="110" cy="130" r="40" fill="none" stroke="#2A2A28" strokeWidth="0.8" />
          <circle cx="110" cy="130" r="28" fill="#F5ECD7" />
          <circle cx="110" cy="130" r="22" fill="none" stroke="#D4C4A0" strokeWidth="0.8" />
          <text x="110" y="124" textAnchor="middle" fill="#8A7A5A" fontSize="6" fontFamily="Georgia, serif" letterSpacing="1">PRAKRITI</text>
          <text x="110" y="134" textAnchor="middle" fill="#8A7A5A" fontSize="5" fontFamily="monospace" letterSpacing="0.5">PLAYS</text>
          <circle cx="110" cy="130" r="3" fill="#1A1A18" />
          <path d="M 30 80 Q 110 130 190 80" stroke="#2E2E2C" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M 25 110 Q 110 130 195 110" stroke="#2E2E2C" strokeWidth="0.5" fill="none" opacity="0.4"/>
          <path d="M 25 150 Q 110 130 195 150" stroke="#2E2E2C" strokeWidth="0.5" fill="none" opacity="0.4"/>
          <path d="M 30 180 Q 110 130 190 180" stroke="#2E2E2C" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <line x1="175" y1="20" x2="145" y2="110" stroke="#888" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="175" cy="20" r="6" fill="#AAA" />
          <circle cx="144" cy="113" r="4" fill="#AAA" />
          <text x="20" y="50" fill="#00C896" fontSize="14" opacity="0.7" fontFamily="serif">♪</text>
          <text x="185" y="45" fill="#00C896" fontSize="10" opacity="0.5" fontFamily="serif">♫</text>
          <text x="15" y="200" fill="#00C896" fontSize="10" opacity="0.4" fontFamily="serif">♩</text>
          <text x="190" y="210" fill="#00C896" fontSize="13" opacity="0.6" fontFamily="serif">♪</text>
        </svg>
        <p style={{ fontFamily: "'DM Serif Display', serif", fontSize: 15, color: "#8A8A84", lineHeight: 1.7, marginTop: 8, fontStyle: "italic", textAlign: "center" }}>
          For every mood, I know exactly which song to reach for.
        </p>
      </div>
    </div>
  );
}

const SLIDE_DURATION = 3000;
function StorySlider({ photos, icon, onClose }) {
  const [idx, setIdx] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const rafRef = React.useRef(null);
  const startRef = React.useRef(null);
  const idxRef = React.useRef(0);
  const pausedRef = React.useRef(false);
  pausedRef.current = paused;
  idxRef.current = idx;

  const goTo = React.useCallback((next) => {
    cancelAnimationFrame(rafRef.current);
    if (next >= photos.length) { onClose(); return; }
    if (next < 0) return;
    setIdx(next); setProgress(0); startRef.current = null;
  }, [photos.length, onClose]);

  React.useEffect(() => {
    startRef.current = null;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      if (!pausedRef.current) {
        const pct = Math.min(((ts - startRef.current) / SLIDE_DURATION) * 100, 100);
        setProgress(pct);
        if (pct >= 100) { goTo(idxRef.current + 1); return; }
      } else {
        startRef.current = ts - (progress / 100) * SLIDE_DURATION;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [idx, goTo]);

  return (
    <div style={{ position:"fixed", inset:0, zIndex:1000, background:"#000", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
      <div style={{ position:"absolute", top:14, left:14, right:14, display:"flex", gap:4, zIndex:10 }}>
        {photos.map((_, i) => (
          <div key={i} style={{ flex:1, height:3, borderRadius:2, background:"rgba(255,255,255,0.25)", overflow:"hidden" }}>
            <div style={{ height:"100%", borderRadius:2, background:"#fff", width: i < idx ? "100%" : i === idx ? `${progress}%` : "0%" }} />
          </div>
        ))}
      </div>
      <button onClick={onClose} style={{ position:"absolute", top:28, right:16, background:"none", border:"none", color:"#fff", fontSize:32, cursor:"pointer", zIndex:10, lineHeight:1, padding:"0 4px" }}>×</button>
      <div
        onMouseDown={() => setPaused(true)} onMouseUp={() => setPaused(false)}
        onTouchStart={() => setPaused(true)} onTouchEnd={() => setPaused(false)}
        style={{ width:"min(92vw, 88vh)", maxWidth:560, background:"#111", borderRadius:10, overflow:"hidden", display:"flex", alignItems:"center", justifyContent:"center", position:"relative" }}
      >
        {photos[idx]
          ? <img key={idx} src={photos[idx]} alt="" style={{ width:"100%", height:"auto", maxHeight:"85vh", objectFit:"contain", display:"block", animation:"storyIn 0.35s ease" }} />
          : <div style={{ padding:"80px 40px", display:"flex", flexDirection:"column", alignItems:"center", gap:12, opacity:0.2 }}>
              <span style={{ fontSize:52 }}>{icon}</span>
              <span style={{ color:"#fff", fontFamily:"monospace", fontSize:9, letterSpacing:"0.1em" }}>ADD PHOTO</span>
            </div>
        }
        <div onClick={() => goTo(idx - 1)} style={{ position:"absolute", left:0, top:0, width:"30%", height:"100%", cursor:"pointer", zIndex:5 }} />
        <div onClick={() => goTo(idx + 1)} style={{ position:"absolute", right:0, top:0, width:"30%", height:"100%", cursor:"pointer", zIndex:5 }} />
        {paused && <div style={{ position:"absolute", bottom:12, left:"50%", transform:"translateX(-50%)", background:"rgba(0,0,0,0.55)", color:"#fff", fontFamily:"monospace", fontSize:9, letterSpacing:"0.1em", padding:"4px 12px", borderRadius:20 }}>PAUSED</div>}
      </div>
      <style>{`@keyframes storyIn { from { opacity:0; transform:scale(1.04); } to { opacity:1; transform:scale(1); } }`}</style>
    </div>
  );
}

function BeyondSection() {
  const [tab, setTab] = useState("reading");
  const [openBook, setOpenBook] = useState(null);
  const [openWriting, setOpenWriting] = useState(null);
  const [sliderOpen, setSliderOpen] = useState(null);

  const tabs = [
    { id: "reading",  label: "📚 Reading" },
    { id: "music",    label: "🎧 Music" },
    { id: "writing",  label: "✍️ Writing" },
    { id: "speaking", label: "🎤 Speaking" },
    { id: "events",   label: "🏆 Events" },
  ];

  return (
    <section id="beyond" className="section">
      <p className="section-label">05 — Beyond</p>
      <h2 className="section-title">Beyond Tech</h2>
      <div className="beyond-tabs">
        {tabs.map(t => (
          <button key={t.id} className={"beyond-tab" + (tab === t.id ? " active" : "")}
            onClick={() => { setTab(t.id); setOpenBook(null); setOpenWriting(null); }}
          >{t.label}</button>
        ))}
      </div>
      <div className="beyond-panel">
        {tab === "reading" && (
          <div className="books-grid">
            {books.map((book, i) => (
              <div className="book-card" key={book.title} onClick={() => setOpenBook(openBook === i ? null : i)}>
                <div className="book-cover" style={{ background: book.color, color: book.textColor }}>
                  {book.currently && <span className="book-badge">Reading</span>}
                  <span className="book-cover-title" style={{ color: book.textColor }}>{book.title}</span>
                  <span className="book-cover-author" style={{ color: book.textColor }}>{book.author}</span>
                </div>
                {openBook === i && <div className="book-reflection">"{book.reflection}"</div>}
              </div>
            ))}
          </div>
        )}
        {tab === "music" && <MusicSection />}
        {tab === "writing" && (
          <div className="writing-list">
            {writings.map((w, i) => (
              <div key={w.title} className={"writing-card" + (openWriting === i ? " open" : "")}
                onClick={() => setOpenWriting(openWriting === i ? null : i)}
              >
                <div className="writing-card-header">
                  <div>
                    <p className="writing-title">{w.title}</p>
                    <p className="writing-preview">{w.preview}</p>
                  </div>
                  <span className="writing-toggle">{openWriting === i ? "Close ↑" : "Read →"}</span>
                </div>
                {openWriting === i && (
                  <div className="writing-full">
                    {w.content.split("\n").map((line, j) => line === "" ? <br key={j}/> : <p key={j} style={{margin:"0 0 2px"}}>{line}</p>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {tab === "speaking" && (
          <div>
            <div className="speaking-intro">
              <p className="speaking-intro-text">From the age of 8, I took the mic and never looked back. Whether it's anchoring a fest, hosting a ceremony, or moderating a panel — being on stage feels like home.</p>
            </div>
            <button className="story-btn" onClick={() => setSliderOpen("speaking")}>▶ View Photos</button>
            {sliderOpen === "speaking" && <StorySlider photos={speakingPhotos.map(p => p.img)} icon="🎤" onClose={() => setSliderOpen(null)} />}
          </div>
        )}
        {tab === "events" && (
          <div>
            <div className="speaking-intro" style={{ marginBottom: 24 }}>
              <p className="speaking-intro-text">I've stepped onto the stage as a participant — in debates, declamations, and competitions — but more often, I've been the one building the stage itself. From tech events and hackathons to cultural fests, I've hosted, organised, and made sure the show runs.</p>
            </div>
            <button className="story-btn" onClick={() => setSliderOpen("events")}>▶ View Photos</button>
            {sliderOpen === "events" && <StorySlider photos={eventPhotos.map(p => p.img)} icon="📷" onClose={() => setSliderOpen(null)} />}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="section" style={{ background: "var(--off-white)" }}>
      <p className="section-label">06 — Contact</p>
      <h2 className="section-title">Let's Connect</h2>
      <p style={{ fontSize: 15, color: "#4A4A46", lineHeight: 1.78, marginBottom: 40, maxWidth: 480 }}>
        Whether it's a collaboration, an opportunity, or just a conversation about AI — reach out on any of these.
      </p>
      <div className="contact-links">
        <a href="https://linkedin.com/in/prakriti-rai" target="_blank" rel="noopener noreferrer" className="contact-link-item">
          <span className="contact-link-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </span>
          LinkedIn
        </a>
        <a href="https://github.com/prak-kriti" target="_blank" rel="noopener noreferrer" className="contact-link-item">
          <span className="contact-link-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#1A1A18"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
          </span>
          GitHub
        </a>
        <a href="mailto:prak.kriti06@gmail.com" className="contact-link-item">
          <span className="contact-link-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457l.06-.468L12 13.09 23.94 4.99l.06.467z" fill="#EA4335"/>
              <path d="M23.94 4.99L12 13.09.06 4.99C.413 4.147 1.23 3.548 2.182 3.548h.363L12 10.09l9.455-6.542h.363c.952 0 1.769.599 2.122 1.442z" fill="#FBBC05"/>
              <path d="M0 5.457v.532L6.545 11.73v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457z" fill="#34A853"/>
              <path d="M17.455 11.73L24 5.989v13.377c0 .904-.732 1.636-1.636 1.636h-4.909V11.73z" fill="#4285F4"/>
            </svg>
          </span>
          Gmail: prak.kriti06@gmail.com
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-name">prakriti<span>.</span>dev</div>
      <div className="footer-copy">© 2026 Prakriti Rai</div>
    </footer>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.3 }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <Navbar activeSection={activeSection} />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <WorkSection />
      <ExploringSection />
      <BeyondSection />
      <ContactSection />
      <Footer />
    </>
  );
}
