"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "구독 플랜", href: "/plans" },
  { label: "이동식도크", href: "/equipment/dock" },
  { label: "리프트", href: "/equipment/lift" },
  { label: "롤테이너", href: "/equipment/rolltainer" },
  { label: "트레일러", href: "/equipment/trailer" },
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

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled ? "py-0" : "py-2"
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? "max-w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/60 shadow-sm"
              : "max-w-7xl mx-4 lg:mx-auto mt-2 rounded-2xl bg-white/70 backdrop-blur-xl border border-gray-200/50 shadow-sm"
          }`}
        >
          <div className={`mx-auto px-5 lg:px-8 transition-all duration-500 ${scrolled ? "max-w-7xl" : ""}`}>
            <div className={`relative flex items-center justify-between transition-all duration-500 ${scrolled ? "h-14" : "h-16"}`}>

              {/* Logo */}
              <Link href="/" className="relative flex-shrink-0 group z-10 flex items-center gap-2">
                <Image
                  src="/images/aovo_symbol.png"
                  alt="AOVO"
                  width={120}
                  height={40}
                  className={`w-auto transition-all duration-500 ${scrolled ? "h-[26px]" : "h-[30px]"}`}
                  priority
                />
                <div className="w-px self-stretch bg-gray-200/80 mx-0.5" />
                <div className="flex flex-col leading-none gap-[1px]">
                  <span
                    className={`font-extrabold tracking-[-0.02em] text-gray-900 transition-all duration-500 ${scrolled ? "text-[15px]" : "text-[17px]"}`}
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    AOVO
                  </span>
                  <span
                    className={`font-bold text-gray-400 uppercase transition-all duration-500 ${scrolled ? "text-[7px]" : "text-[7.5px]"}`}
                    style={{ fontFamily: "'Syne', sans-serif", letterSpacing: '0.32em' }}
                  >
                    LOGISTICS
                  </span>
                </div>
              </Link>

              {/* Center Nav — desktop (absolute center) */}
              <nav className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-0.5 rounded-full px-1 py-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setActiveNav(item.href)}
                      onMouseLeave={() => setActiveNav(null)}
                      className="relative px-4 py-1.5 text-[13px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 rounded-full"
                    >
                      {activeNav === item.href && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 bg-gray-100 rounded-full"
                          transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Right actions */}
              <div className="flex items-center gap-1.5 z-10">
                {/* Search */}
                <button
                  onClick={() => setSearchOpen(true)}
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  aria-label="검색"
                >
                  <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </button>

                {/* User */}
                <button
                  className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  aria-label="마이페이지"
                >
                  <svg className="w-[18px] h-[18px] text-gray-600" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </button>

                <div className="hidden lg:block w-px h-5 bg-gray-200 mx-1" />

                {/* Login */}
                <Link
                  href="/login"
                  className="hidden lg:inline-flex text-[13px] font-medium text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all duration-200"
                >
                  로그인
                </Link>

                {/* CTA */}
                <Link
                  href="/signup"
                  className="hidden lg:inline-flex items-center gap-1.5 text-[13px] font-semibold text-white px-5 py-2 rounded-xl bg-purple-primary hover:bg-purple-dark transition-colors duration-200"
                >
                  시작하기
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setMobileOpen(!mobileOpen)}
                  className="lg:hidden relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  aria-label="메뉴"
                >
                  <div className="w-[18px] h-[14px] relative flex flex-col justify-between">
                    <span className={`block h-[1.5px] bg-gray-500 rounded-full transition-all duration-500 origin-center ${mobileOpen ? "rotate-45 translate-y-[6.25px]" : ""}`} />
                    <span className={`block h-[1.5px] bg-gray-500 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                    <span className={`block h-[1.5px] bg-gray-500 rounded-full transition-all duration-500 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[6.25px]" : ""}`} />
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />

            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 h-full w-[min(85vw,360px)] bg-white border-l border-gray-200 flex flex-col shadow-2xl"
            >
              <div className="flex justify-end p-5">
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

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
                      className="flex items-center justify-between py-3.5 px-4 text-[15px] text-gray-700 hover:text-gray-900 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
                    >
                      <span>{item.label}</span>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="flex flex-col gap-3 mt-auto pt-6 border-t border-gray-100"
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-[14px] font-medium text-gray-700 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-[14px] font-semibold text-white py-3 rounded-xl bg-purple-primary hover:bg-purple-dark transition-colors"
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
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60]"
          >
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="relative max-w-2xl mx-auto mt-[15vh] px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="이동식도크, 리프트, 롤테이너 검색..."
                  className="w-full h-14 pl-14 pr-14 rounded-2xl bg-white border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-primary focus:ring-2 focus:ring-purple-100 transition-all duration-200 shadow-2xl"
                />
                <button
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-gray-100 text-[11px] text-gray-500 font-mono hover:bg-gray-200 transition-colors"
                >
                  ESC
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["이동식도크", "리프트", "롤테이너", "견적 문의"].map((tag) => (
                  <button key={tag} className="px-3.5 py-1.5 rounded-lg bg-white border border-gray-200 text-xs text-gray-600 hover:text-gray-800 hover:border-gray-300 transition-all duration-200 shadow-sm">
                    {tag}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className={`transition-all duration-500 ${scrolled ? "h-14" : "h-24"}`} />
    </>
  );
}
