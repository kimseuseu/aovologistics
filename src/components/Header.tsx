"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { label: "구독 플랜", href: "/plans" },
  { label: "지게차", href: "/equipment/forklift" },
  { label: "컨베이어", href: "/equipment/conveyor" },
  { label: "보관장비", href: "/equipment/storage" },
  { label: "포장장비", href: "/equipment/packaging" },
  { label: "고객지원", href: "/support" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "bg-[#08080f]/80 backdrop-blur-2xl border-b border-white/[0.04]"
            : "bg-transparent"
        }`}
      >
        {/* Row 2 (Top) — Logo + Categories */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <Image src="/images/aovologo_white.png" alt="AOVO" width={90} height={32} className="h-7 w-auto" priority />
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {categories.map((cat) => (
                <Link key={cat.href} href={cat.href} className="text-[13px] font-medium text-white/60 hover:text-white tracking-wide transition-colors duration-200 relative group">
                  {cat.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-purple-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <div className="w-[90px]" />
          </div>
        </div>

        {/* Row 1 (Bottom) — Search + User */}
        <div className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "" : "border-t border-white/[0.04]"}`}>
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
            {/* Logo (scrolled) */}
            <Link href="/" className={`flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "opacity-100 w-[90px]" : "opacity-0 w-0 overflow-hidden"}`}>
              <Image src="/images/aovologo_white.png" alt="AOVO" width={90} height={32} className="h-6 w-auto" />
            </Link>

            {/* Categories (scrolled) */}
            <nav className={`hidden lg:flex items-center gap-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "opacity-100" : "opacity-0 pointer-events-none absolute"}`}>
              {categories.map((cat) => (
                <Link key={cat.href} href={cat.href} className="text-[12px] font-medium text-white/50 hover:text-white tracking-wide transition-colors duration-200 whitespace-nowrap">
                  {cat.label}
                </Link>
              ))}
            </nav>

            {/* Search */}
            <div className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? "flex-shrink-0 ml-auto" : "flex-1 max-w-lg mx-auto"}`}>
              {isScrolled ? (
                <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-full hover:bg-white/5 transition-colors" aria-label="검색">
                  <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </button>
              ) : (
                <div className="w-full relative">
                  <input type="text" placeholder="지게차, 컨베이어, 보관장비 검색..." className="w-full h-10 pl-10 pr-4 rounded-full bg-white/[0.04] border border-white/[0.06] text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-purple-primary/40 focus:bg-white/[0.06] transition-all duration-200" />
                  <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                </div>
              )}
            </div>

            {/* User buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button className="p-2 rounded-full hover:bg-white/5 transition-colors" aria-label="마이페이지">
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
              </button>
              <Link href="/login" className={`text-[12px] font-medium text-white/50 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-white/5 ${isScrolled ? "hidden xl:inline-flex" : ""}`}>로그인</Link>
              <Link href="/signup" className={`text-[12px] font-medium text-white bg-purple-primary hover:bg-purple-dark transition-colors px-4 py-1.5 rounded-full ${isScrolled ? "hidden xl:inline-flex" : ""}`}>회원가입</Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-full hover:bg-white/5 transition-colors lg:hidden ml-1" aria-label="메뉴">
                <svg className="w-5 h-5 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {mobileMenuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 9h16.5m-16.5 6.75h16.5" />}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`lg:hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden border-t border-white/[0.04] ${mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {categories.map((cat) => (
              <Link key={cat.href} href={cat.href} onClick={() => setMobileMenuOpen(false)} className="text-sm text-white/60 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-colors">{cat.label}</Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.04]">
              <Link href="/login" className="flex-1 text-center text-sm text-white/60 py-2.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors">로그인</Link>
              <Link href="/signup" className="flex-1 text-center text-sm text-white bg-purple-primary py-2.5 rounded-lg hover:bg-purple-dark transition-colors">회원가입</Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Search overlay */}
      {searchOpen && isScrolled && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div className="absolute top-0 left-0 right-0 bg-[#0e0e1a]/95 backdrop-blur-2xl shadow-2xl pt-20 pb-8" onClick={(e) => e.stopPropagation()}>
            <div className="max-w-2xl mx-auto px-6">
              <div className="relative">
                <input type="text" placeholder="지게차, 컨베이어, 보관장비 검색..." className="w-full h-12 pl-12 pr-4 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-white/80 placeholder:text-white/30 focus:outline-none focus:border-purple-primary/40 transition-all" autoFocus />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={`transition-all duration-500 ${isScrolled ? "h-14" : "h-[120px]"}`} />
    </>
  );
}
