import React from 'react';
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiPhp,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiXampp,
  SiGit,
  SiGithub,
  SiVite,
  SiVercel,
  SiGooglegemini,
  SiGooglechrome
} from 'react-icons/si';
import { FaHtml5, FaCss3Alt, FaFontAwesome } from 'react-icons/fa6';
import { VscVscode } from 'react-icons/vsc';
import { HiCodeBracket } from 'react-icons/hi2';

const ICON_MAP = {
  SiReact,
  SiJavascript,
  SiHtml5: FaHtml5,
  SiCss3: FaCss3Alt,
  FaHtml5,
  FaCss3Alt,
  FaFontAwesome,
  SiFontawesome: FaFontAwesome,
  SiTailwindcss,
  SiPython,
  SiPhp,
  SiMysql,
  SiSupabase,
  SiFirebase,
  SiXampp,
  SiGit,
  SiGithub,
  SiVite,
  SiVercel,
  SiGooglegemini,
  SiGooglechrome,
  VscVscode
};

export default function TechIcon({ name, size = 20, className = '', color }) {
  const IconComponent = ICON_MAP[name] || HiCodeBracket;
  return (
    <IconComponent
      size={size}
      style={color ? { color } : undefined}
      className={`shrink-0 ${className}`}
    />
  );
}
