"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "구독 플랜", href: "/plans" },
  { label: "지게차", href: "/equipment/forklift" },
  { label: "컨베이어", href: "/equipment/conveyor" },
  { label: "보관장비", href: "/equipment/storage" },
  { label: "포장장비", href: "/equipment/packaging" },
  { label: "고객지원", href: "/support" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* ─── Main Header ─── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "py-0"
            : "py-2"
        }`}
      >
        {/* Floating bar container */}
        <div
          className={`mx-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled
              ? "max-w-full bg-[#08080f]/70 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/[0.04]"
              : "max-w-7xl mx-4 lg:mx-auto mt-2 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.06]"
          }`}
        >
          <div className={`mx-auto px-5 lg:px-8 transition-all duration-700 ${scrolled ? "max-w-7xl" : ""}`}>
            <div className={`flex items-center justify-between transition-all duration-700 ${scrolled ? "h-14" : "h-16"}`}>

              {/* Logo */}
              <Link href="/" className="relative flex-shrink-0 group">
                <Image
                  src="/images/aovologo_white.png"
                  alt="AOVO"
                  width={88}
                  height={30}
                  className={`w-auto transition-all duration-500 ${scrolled ? "h-[22px]" : "h-[26px]"}`}
                  priority
                />
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-gradient-to-r from-purple-primary to-blue-primary group-hover:w-full transition-all duration-500" />
              </Link>

              {/* Center Nav — desktop */}
              <nav className="hidden lg:flex items-center">
                <div className="flex items-center gap-0.5 bg-white/[0.02] rounded-full px-1 py-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setActiveNav(item.href)}
                      onMouseLeave={() => setActiveNav(null)}
                      className="relative px-4 py-1.5 text-[13px] font-medium text-white/50 hover:text-white transition-colors duration-300 rounded-full"
                    >
                      {activeNav === item.href && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-white/[0.06] rounded-full"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-2">
                {/* Search toggle */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="relative p-2.5 rounded-xl hover:bg-white/[0.05] transition-all duration-300 group"
                  aria-label="검색"
                >
                  <svg className="w-[18px] h-[18px] text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                {/* User icon */}
                <button
                  className="relative p-2.5 rounded-xl hover:bg-white/[0.05] transition-all duration-300 group"
                  aria-label="마이페이지"
                >
                  <svg className="w-[18px] h-[18px] text-white/40 group-hover:text-white/70 transition-colors" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>

                {/* Divider — desktop only */}
                <div className="hidden lg:block w-px h-5 bg-white/[0.08] mx-1" />

                {/* Login — desktop */}
                <Link
                  href="/login"
                  className="hidden lg:inline-flex text-[13px] font-medium text-white/45 hover:text-white px-4 py-2 rounded-xl hover:bg-white/[0.04] transition-all duration-300"
                >
                  로그인
                </Link>

                {/* CTA — desktop */}
                <Link
                  href="/signup"
                  className="hidden lg:inline-flex items-center gap-1.5 text-[13px] font-semibold text-white px-5 py-2 rounded-xl bg-gradient-to-r from-purple-primary to-purple-primary/80 hover:from-purple-dark hover:to-purple-primary transition-all duration-300 shadow-lg shadow-purple-primary/20 hover:shadow-purple-primary/30 hover:scale-[1.02] active:scale-[0.98]"
                >
                  시작하기
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden relative p-2.5 rounded-xl hover:bg-white/[0.05] transition-all duration-300"
                  aria-label="메뉴"
                >
                  <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
                    <span className={`block h-[1.5px] bg-white/50 rounded-full transition-all duration-500 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.25px]" : ""}`} />
                    <span className={`block h-[1.5px] bg-white/50 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                    <span className={`block h-[1.5px] bg-white/50 rounded-full transition-all duration-500 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.25px]" : ""}`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

            {/* Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-[min(85vw,360px)] bg-[#0c0c18]/95 backdrop-blur-2xl border-l border-white/[0.06] flex flex-col"
            >
              {/* Close */}
              <div className="flex justify-end p-5">
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-white/5 transition-colors">
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 px-5 pb-8 flex flex-col gap-1">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3.5 px-4 text-[15px] text-white/60 hover:text-white rounded-xl hover:bg-white/[0.04] transition-all duration-200 group"
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-white/15 group-hover:text-white/30 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col gap-3 mt-auto pt-6 border-t border-white/[0.06]"
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-[14px] font-medium text-white/60 py-3 rounded-xl border border-white/[0.08] hover:bg-white/[0.04] hover:text-white transition-all"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-[14px] font-semibold text-white py-3 rounded-xl bg-gradient-to-r from-purple-primary to-purple-primary/80 hover:from-purple-dark hover:to-purple-primary transition-all shadow-lg shadow-purple-primary/20"
                  >
                    시작하기
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Search Overlay ─── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60]"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[#08080f]/80 backdrop-blur-xl" onClick={() => setSearchOpen(false)} />

            {/* Search panel */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.97 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative max-w-2xl mx-auto mt-[15vh] px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="장비, 서비스, 플랜 검색..."
                  className="w-full h-14 pl-14 pr-14 rounded-2xl bg-white/[0.05] border border-white/[0.08] text-[15px] text-white/90 placeholder:text-white/25 focus:outline-none focus:border-purple-primary/40 focus:ring-1 focus:ring-purple-primary/20 focus:bg-white/[0.07] transition-all duration-300"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-white/[0.06] text-[11px] text-white/30 font-mono hover:bg-white/[0.1] transition-colors"
                >
                  ESC
                </button>
              </div>

              {/* Quick links */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["지게차", "컨베이어", "구독 플랜", "견적 문의"].map((tag) => (
                  <button key={tag} className="px-3.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs text-white/35 hover:text-white/60 hover:bg-white/[0.07] transition-all duration-200">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className={`transition-all duration-700 ${scrolled ? "h-14" : "h-24"}`} />
    </>
  );
}
