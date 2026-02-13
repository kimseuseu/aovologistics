"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
  { label: "물류 서비스", href: "/services" },
  { label: "풀필먼트", href: "/fulfillment" },
  { label: "창고 관리", href: "/warehouse" },
  { label: "배송 추적", href: "/tracking" },
  { label: "파트너", href: "/partners" },
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
            ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
            : "bg-white"
        }`}
      >
        {/* Row 2 (Top) - Logo + Categories - collapses into combined row */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden ${
            isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/aovologo_black.png"
                alt="AOVO"
                width={90}
                height={32}
                className="h-7 w-auto"
                priority
              />
            </Link>

            {/* Center - Category menu */}
            <nav className="hidden lg:flex items-center gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="text-[13px] font-medium text-gray-700 hover:text-green-primary tracking-wide transition-colors duration-200 relative group"
                >
                  {cat.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-green-primary transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </nav>

            <div className="w-[90px]" />
          </div>
        </div>

        {/* Row 1 (Bottom) - Search + User buttons - transforms on scroll */}
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isScrolled ? "border-b-0" : "border-t border-gray-100"
          }`}
        >
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
            {/* Logo - only visible when scrolled (combined mode) */}
            <Link
              href="/"
              className={`flex-shrink-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled
                  ? "opacity-100 w-[90px] translate-x-0"
                  : "opacity-0 w-0 -translate-x-4 overflow-hidden"
              }`}
            >
              <Image
                src="/images/aovologo_black.png"
                alt="AOVO"
                width={90}
                height={32}
                className="h-6 w-auto"
              />
            </Link>

            {/* Categories - only visible when scrolled (combined mode) */}
            <nav
              className={`hidden lg:flex items-center gap-7 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4 pointer-events-none absolute"
              }`}
            >
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="text-[12px] font-medium text-gray-600 hover:text-green-primary tracking-wide transition-colors duration-200 whitespace-nowrap"
                >
                  {cat.label}
                </Link>
              ))}
            </nav>

            {/* Search bar - center when not scrolled, shrinks when scrolled */}
            <div
              className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isScrolled ? "flex-shrink-0 ml-auto" : "flex-1 max-w-lg mx-auto"
              }`}
            >
              {isScrolled ? (
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="검색"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              ) : (
                <div className="w-full relative">
                  <input
                    type="text"
                    placeholder="물류 서비스, 배송 추적, 견적 문의..."
                    className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-green-primary/40 focus:bg-white transition-all duration-200"
                  />
                  <svg
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* User buttons */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="마이페이지"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
              </button>
              <Link
                href="/login"
                className={`text-[12px] font-medium text-gray-600 hover:text-green-primary transition-colors px-3 py-1.5 rounded-full hover:bg-gray-50 ${
                  isScrolled ? "hidden xl:inline-flex" : ""
                }`}
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className={`text-[12px] font-medium text-white bg-foreground hover:bg-gray-800 transition-colors px-4 py-1.5 rounded-full ${
                  isScrolled ? "hidden xl:inline-flex" : ""
                }`}
              >
                회원가입
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden ml-1"
                aria-label="메뉴"
              >
                <svg
                  className="w-5 h-5 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.75 9h16.5m-16.5 6.75h16.5"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden border-t border-gray-100 ${
            mobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-gray-700 hover:text-green-primary py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
            <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
              <Link
                href="/login"
                className="flex-1 text-center text-sm text-gray-600 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="flex-1 text-center text-sm text-white bg-foreground py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
              >
                회원가입
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Expanded search overlay */}
      {searchOpen && isScrolled && (
        <div className="fixed inset-0 z-[60] bg-black/20 backdrop-blur-sm" onClick={() => setSearchOpen(false)}>
          <div
            className="absolute top-0 left-0 right-0 bg-white shadow-lg pt-20 pb-8 animate-in slide-in-from-top duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-2xl mx-auto px-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="물류 서비스, 배송 추적, 견적 문의..."
                  className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-50 border border-gray-200 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-green-primary/40 focus:bg-white transition-all"
                  autoFocus
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer for fixed header */}
      <div className={`transition-all duration-500 ${isScrolled ? "h-14" : "h-[120px]"}`} />
    </>
  );
}
