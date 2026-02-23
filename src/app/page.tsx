"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

/* ── Reveal wrapper ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Counter ── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const dur = 2000, start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      const v = Math.floor(ease * target);
      if (ref.current) ref.current.textContent = v.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ══════════════════════════════════════
   1. HERO — 숨고 스타일
   ══════════════════════════════════════ */
function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { label: "전체보기", href: "/equipment", image: "" },
    { label: "이동식도크", href: "/equipment/dock", image: "/images/categories/category-dock.png" },
    { label: "도크보드", href: "/equipment/dockboard", image: "/images/categories/category-dockboard.png" },
    { label: "리프트", href: "/equipment/lift", image: "/images/categories/category-lift.png" },
    { label: "롤테이너", href: "/equipment/rolltainer", image: "/images/categories/category-rolltainer.png" },
    { label: "메쉬파레트", href: "/equipment/mesh-pallet", image: "/images/categories/category-mesh.png" },
    { label: "자바라컨베이어", href: "/equipment/conveyor", image: "/images/categories/category-javara.png" },
    { label: "자키", href: "/equipment/jockey", image: "/images/categories/category-jockey.png" },
  ];

  const quickServices = [
    { top: "하역 작업 효율화", title: "이동식도크·도크보드", count: "하역 장비 3종", href: "/equipment/dock" },
    { top: "물류 운반 솔루션", title: "롤테이너·메쉬파레트", count: "운반 장비 3종", href: "/equipment/rolltainer" },
    { top: "물류 자동화 장비", title: "자바라컨베이어·리프트", count: "자동화 장비 2종", href: "/equipment/conveyor" },
    { top: "전문가 직접 관리", title: "유지보수·긴급출동", count: "관리 서비스 3종", href: "/services" },
  ];

  return (
    <section className="bg-white pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-4xl mx-auto px-6">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-headline text-center text-[clamp(1.8rem,4.5vw,2.8rem)] leading-[1.2] tracking-[-0.03em] text-gray-900"
        >
          물류장비, 구독으로 해결하세요
        </motion.h1>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-10 max-w-2xl mx-auto"
        >
          <div className="relative flex items-center">
            <div className="absolute left-5">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="어떤 물류장비가 필요하세요?"
              className="w-full h-14 pl-14 pr-36 rounded-2xl border border-gray-200 text-[15px] text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-primary focus:ring-2 focus:ring-purple-100 transition-all duration-200"
            />
            <Link
              href="/inquiry"
              className="absolute right-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-purple-primary text-white text-[13px] font-semibold hover:bg-purple-dark transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" /></svg>
              AI 견적 요청
            </Link>
          </div>
        </motion.div>

        {/* Category icons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex justify-center gap-4 md:gap-7 flex-wrap max-w-[860px] mx-auto"
        >
          {categories.map((cat) => (
            <Link
              key={cat.label}
              href={cat.href}
              className="flex flex-col items-center gap-2.5 group"
            >
              <div className="w-20 h-20 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center group-hover:bg-purple-50 group-hover:border-purple-100 transition-all duration-200 overflow-hidden">
                {cat.image ? (
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg className="w-7 h-7 text-gray-600 group-hover:text-purple-primary transition-colors duration-200" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                  </svg>
                )}
              </div>
              <span className="text-[13px] text-gray-700 group-hover:text-gray-900 font-medium transition-colors duration-200">{cat.label}</span>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Quick service cards */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="max-w-7xl mx-auto px-6 mt-16"
      >
        <h2 className="font-headline text-[20px] tracking-[-0.02em] text-gray-900 mb-6">
          지금 필요한 장비, 한번에 견적 받기
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {quickServices.map((svc) => (
            <Link
              key={svc.title}
              href={svc.href}
              className="group relative rounded-2xl border border-gray-100 bg-gray-50 overflow-hidden hover:shadow-lg hover:shadow-gray-100/80 hover:border-gray-200 transition-all duration-300"
            >
              <div className="p-5 pb-14">
                <p className="text-[12px] text-gray-500">{svc.top}</p>
                <p className="text-[17px] font-bold text-gray-900 mt-1">{svc.title}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-5 py-3.5 border-t border-gray-100 bg-white flex items-center justify-between">
                <span className="text-[13px] text-gray-600">{svc.count}</span>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-0.5 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto px-6 mt-14"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: 500, suffix: "+", label: "구독 기업" },
            { value: 3000, suffix: "+", label: "운영 장비" },
            { value: 99, suffix: "%", label: "재구독률" },
            { value: 24, suffix: "h", label: "긴급 출동" },
          ].map((s) => (
            <div key={s.label} className="text-center py-5 px-4 rounded-2xl bg-gray-50 border border-gray-100">
              <p className="font-stat text-2xl md:text-3xl text-purple-primary">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[13px] text-gray-600 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════
   2. VALUE — 핵심 가치
   ══════════════════════════════════════ */
function ValueSection() {
  const values = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "초기 비용 0원",
      desc: "수천만 원의 장비 구매 비용 없이 월 구독료만으로 이동식도크, 리프트 등 즉시 도입합니다.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L3.14 12.9a.75.75 0 000 1.06l5.1 5.1m-5.1-5.1h11.48m0 0l2.17-2.83a.75.75 0 000-.94l-2.17-2.83" />
        </svg>
      ),
      title: "올인원 유지보수",
      desc: "정기 점검, 부품 교체, 긴급 수리까지 도크·리프트·컨베이어 전 장비 구독료에 포함됩니다.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" />
        </svg>
      ),
      title: "자유로운 교체",
      desc: "사업 규모에 맞춰 롤테이너, 메쉬파레트 등 언제든 장비를 추가하거나 교체할 수 있습니다.",
    },
  ];

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
              구매에서 구독으로
            </h2>
            <p className="mt-3 text-gray-600 text-[15px]">물류장비 도입의 새로운 기준을 만들어갑니다</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.1}>
              <div className="bg-white rounded-2xl p-8 h-full border border-gray-100 hover:shadow-lg hover:shadow-gray-100/80 transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-primary mb-6">
                  {v.icon}
                </div>
                <h3 className="text-[17px] font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-[14px] text-gray-600 leading-[1.7]">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   3. SERVICES — 장비 · 서비스 탭
   ══════════════════════════════════════ */
function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  const categories = [
    {
      tab: "장비",
      items: [
        { title: "이동식도크", desc: "높이 조절형 이동식 도크로 다양한 차량에 맞춰 하역 작업을 수행합니다.", tag: "Dock", icon: "M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" },
        { title: "도크보드", desc: "고정식·이동식 도크보드로 차량과 건물 사이 높이 차이를 안전하게 연결합니다.", tag: "Dockboard", icon: "M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" },
        { title: "리프트", desc: "유압식·전동식 리프트로 중량물을 안전하게 상하 이동시킵니다.", tag: "Lift", icon: "M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-4.5L16.5 16.5m0 0L12 12m4.5 4.5V3" },
        { title: "롤테이너", desc: "접이식 롤테이너로 물류센터·매장 간 효율적인 운반이 가능합니다.", tag: "Rolltainer", icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" },
        { title: "메쉬파레트", desc: "철망 구조의 메쉬파레트로 적재·보관·운반을 한번에 해결합니다.", tag: "Mesh Pallet", icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" },
        { title: "인테이너", desc: "대형 컨테이너형 적재함으로 산업 현장의 대량 운송을 지원합니다.", tag: "In-tainer", icon: "M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" },
        { title: "자바라컨베이어", desc: "신축 가능한 자바라컨베이어로 상하차 작업 동선을 최적화합니다.", tag: "Conveyor", icon: "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" },
        { title: "자키", desc: "트레일러 연결·분리 작업에 특화된 자키(Jockey)로 야드 운영 효율을 높입니다.", tag: "Jockey", icon: "M11.42 15.17l-5.1-5.1m0 0L3.14 12.9a.75.75 0 000 1.06l5.1 5.1m-5.1-5.1h11.48m0 0l2.17-2.83a.75.75 0 000-.94l-2.17-2.83M16.9 10.07h3.36a.75.75 0 01.75.75v2.36a.75.75 0 01-.75.75H16.9" },
      ],
    },
    {
      tab: "서비스",
      items: [
        { title: "정기 유지보수", desc: "월간 정기 점검과 부품 교체를 구독료에 포함하여 제공합니다.", tag: "Maintenance", icon: "M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" },
        { title: "긴급 출동", desc: "24시간 전국 긴급 출동 — 도크·리프트·컨베이어 현장 수리 대응합니다.", tag: "Emergency", icon: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" },
        { title: "전담 매니저", desc: "비즈니스 플랜 이상 — 전담 매니저가 장비 상태를 직접 관리합니다.", tag: "Manager", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" },
        { title: "실시간 대시보드", desc: "전 장비의 상태, 가동률, 점검 이력을 실시간으로 모니터링합니다.", tag: "Dashboard", icon: "M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" },
      ],
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <Reveal>
            <div>
              <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
                물류 현장에 필요한 모든 것
              </h2>
              <p className="mt-2 text-gray-600 text-[15px]">장비 도입부터 유지보수까지, 하나의 구독으로 해결하세요</p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex gap-1 p-1 rounded-xl bg-gray-100">
              {categories.map((cat, i) => (
                <button
                  key={cat.tab}
                  onClick={() => setActiveTab(i)}
                  className={`px-5 py-2 rounded-lg text-[13px] font-semibold transition-all duration-200 ${
                    activeTab === i
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {cat.tab}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {categories[activeTab].items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group rounded-2xl border border-gray-100 bg-white p-6 hover:shadow-lg hover:shadow-gray-100/80 hover:border-gray-200 transition-all duration-300 cursor-default"
              >
                <div className="w-11 h-11 rounded-xl bg-purple-50 flex items-center justify-center mb-5 group-hover:bg-purple-100 transition-colors duration-300">
                  <svg className="w-5 h-5 text-purple-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>

                <h4 className="text-[15px] font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-[13px] text-gray-600 leading-[1.7]">{item.desc}</p>

                <div className="mt-5 flex items-center gap-1.5 text-[13px] text-gray-400 group-hover:text-purple-primary transition-colors duration-300">
                  <span>자세히 보기</span>
                  <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   4. PROCESS
   ══════════════════════════════════════ */
function ProcessSection() {
  const steps = [
    { num: "01", title: "상담 & 견적", desc: "전문가가 현장을 파악하고 이동식도크, 리프트 등 최적의 장비를 제안합니다." },
    { num: "02", title: "계약 & 배송", desc: "간편한 구독 계약 후 전문 운송팀이 장비를 배송·설치합니다." },
    { num: "03", title: "운영 & 관리", desc: "정기 점검과 실시간 대시보드로 전 장비 상태를 관리합니다." },
    { num: "04", title: "교체 & 확장", desc: "사업 규모에 따라 롤테이너, 트레일러 등 유연하게 교체·추가합니다." },
  ];

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
              4단계로 시작하는 장비 구독
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative bg-white rounded-2xl border border-gray-100 p-7 h-full hover:shadow-lg hover:shadow-gray-100/80 transition-shadow duration-300">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[44px] -right-[14px] w-[28px] h-px bg-gray-200 z-10" />
                )}

                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <span className="text-[13px] font-bold text-purple-primary">{step.num}</span>
                </div>

                <h4 className="text-[16px] font-bold text-gray-900 mb-3">{step.title}</h4>
                <p className="text-[13px] text-gray-600 leading-[1.7]">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   5. PLANS
   ══════════════════════════════════════ */
function PlansSection() {
  const plans = [
    {
      name: "Starter",
      nameKo: "스타터",
      desc: "소규모 물류 현장",
      price: "49",
      unit: "만원~",
      features: ["장비 1~2대", "분기별 정기 점검", "평일 유지보수", "기본 리포트"],
      highlight: false,
    },
    {
      name: "Business",
      nameKo: "비즈니스",
      desc: "성장하는 물류 기업",
      price: "149",
      unit: "만원~",
      features: ["장비 3~10대", "월 1회 정기 점검", "24시간 긴급 출동", "실시간 대시보드", "전담 매니저"],
      highlight: true,
    },
    {
      name: "Enterprise",
      nameKo: "엔터프라이즈",
      desc: "대규모 물류센터·항만",
      price: "맞춤",
      unit: "견적",
      features: ["장비 무제한", "주 1회 정기 점검", "전용 정비팀 상주", "API 연동 지원", "SLA 보장", "장비 교체 무제한"],
      highlight: false,
    },
  ];

  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900 mb-3">
              구독 플랜
            </h2>
            <p className="text-gray-600 text-[15px] max-w-lg mx-auto">비즈니스 규모에 맞는 플랜을 선택하세요. 모든 플랜에 유지보수가 포함되어 있습니다.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`relative rounded-2xl p-7 h-full flex flex-col transition-all duration-300 ${
                p.highlight
                  ? "bg-purple-primary text-white shadow-xl shadow-purple-primary/20 scale-[1.02]"
                  : "bg-white border border-gray-100 hover:shadow-lg hover:shadow-gray-100/80"
              }`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-purple-primary text-[11px] font-bold rounded-full shadow-md">
                    추천
                  </span>
                )}

                <div className="mb-6">
                  <span className={`text-[11px] font-mono tracking-wider uppercase ${p.highlight ? "text-white/60" : "text-gray-500"}`}>{p.name}</span>
                  <h3 className={`text-lg font-bold mt-1 ${p.highlight ? "text-white" : "text-gray-900"}`}>{p.nameKo}</h3>
                  <p className={`text-[13px] mt-1 ${p.highlight ? "text-white/70" : "text-gray-500"}`}>{p.desc}</p>
                </div>

                <div className={`mb-7 pb-7 border-b ${p.highlight ? "border-white/20" : "border-gray-100"}`}>
                  <div className="flex items-baseline gap-1">
                    <span className={`font-stat text-4xl ${p.highlight ? "text-white" : "text-gray-900"}`}>{p.price}</span>
                    <span className={`text-[14px] ${p.highlight ? "text-white/60" : "text-gray-500"}`}>{p.unit}</span>
                  </div>
                  <p className={`text-[12px] mt-1 ${p.highlight ? "text-white/50" : "text-gray-500"}`}>/ 월</p>
                </div>

                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className={`flex items-center gap-3 text-[13px] ${p.highlight ? "text-white/80" : "text-gray-700"}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? "bg-white/20" : "bg-purple-50"}`}>
                        <svg className={`w-2.5 h-2.5 ${p.highlight ? "text-white" : "text-purple-primary"}`} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/inquiry"
                  className={`mt-8 block text-center py-3.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${
                    p.highlight
                      ? "bg-white text-purple-primary hover:bg-gray-50"
                      : "bg-purple-50 text-purple-primary hover:bg-purple-100"
                  }`}
                >
                  {p.price === "맞춤" ? "견적 문의" : "구독 시작하기"}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   6. FAQ
   ══════════════════════════════════════ */
function FAQSection() {
  const faqs = [
    { q: "어떤 장비를 구독할 수 있나요?", a: "이동식도크, 리프트, 롤테이너, 메쉬파레트, 인테이너, 트레일러, 수상도크, 자키 등 물류 전 품목을 구독 방식으로 제공합니다." },
    { q: "최소 구독 기간이 있나요?", a: "기본 최소 구독 기간은 6개월입니다. 6개월 이후에는 언제든 구독 해지가 가능하며, 30일 전 사전 통보가 필요합니다." },
    { q: "장비 고장 시 대응은 어떻게 되나요?", a: "비즈니스 플랜 이상은 24시간 긴급 출동 서비스가 포함됩니다. 도크, 리프트, 트레일러 등 전 장비에 대해 전국 네트워크를 통해 평균 2시간 이내 현장 도착합니다." },
    { q: "장비 교체가 가능한가요?", a: "네, 구독 기간 중 언제든 장비 업그레이드 또는 교체가 가능합니다. 예를 들어 롤테이너에서 메쉬파레트로, 소형 리프트에서 대형 리프트로 변경할 수 있습니다." },
    { q: "설치 비용이 별도로 발생하나요?", a: "아니요. 모든 플랜에 장비 배송, 설치, 시운전 비용이 포함되어 있습니다. 이동식도크, 수상도크 등 대형 장비도 추가 비용 없이 설치합니다." },
    { q: "여러 지역에 장비 배치가 가능한가요?", a: "엔터프라이즈 플랜에서는 전국 다중 거점 배치가 가능합니다. 물류센터, 항만, 공장 등 각 거점별 전담 정비팀 배치도 지원합니다." },
  ];

  return (
    <section className="bg-gray-50 py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
              자주 묻는 질문
            </h2>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FAQItem q={faq.q} a={faq.a} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <div className="mt-10 text-center">
            <p className="text-[14px] text-gray-500 mb-3">궁금한 점이 해결되지 않으셨나요?</p>
            <a href="tel:02-2683-4459" className="inline-flex items-center gap-2 text-purple-primary text-[14px] font-semibold hover:underline">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              02-2683-4459
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow duration-200">
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <span className="text-[15px] font-medium text-gray-800 group-open:text-gray-900 transition-colors pr-4">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center group-open:bg-purple-50 transition-colors duration-200">
          <svg className="w-4 h-4 text-gray-400 group-open:text-purple-primary group-open:rotate-45 transition-all duration-200" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-5">
        <p className="text-[14px] text-gray-600 leading-[1.8] border-t border-gray-50 pt-4">{a}</p>
      </div>
    </details>
  );
}

/* ══════════════════════════════════════
   7. CLIENTS
   ══════════════════════════════════════ */
function ClientsSection() {
  const clients = [
    "CJ대한통운", "쿠팡 로지스틱스", "한진택배", "롯데글로벌로지스",
    "현대글로비스", "삼성SDS", "SSG닷컴", "마켓컬리",
    "오아시스마켓", "브이푸드", "올리브영", "에이치엘비",
  ];

  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center text-gray-500 text-[14px] mb-10">
            <span className="font-stat font-bold text-gray-800">500+</span> 기업이 AOVO와 함께하고 있습니다
          </p>
        </Reveal>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 w-max"
          >
            {[...clients, ...clients].map((c, i) => (
              <div key={`${c}-${i}`} className="flex-shrink-0 rounded-xl border border-gray-100 bg-gray-50/50 h-[52px] px-8 flex items-center justify-center">
                <span className="text-[13px] font-medium text-gray-500 whitespace-nowrap">{c}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   8. CTA
   ══════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="relative rounded-3xl bg-purple-primary p-12 lg:p-20 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/5" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/5" />

            <div className="relative">
              <h2 className="font-headline text-[clamp(1.8rem,4vw,3rem)] tracking-[-0.03em] leading-[1.15] text-white mb-4">
                장비 구매는 그만,
                <br />
                구독을 시작하세요
              </h2>
              <p className="text-white/70 text-[16px] leading-relaxed mb-3 max-w-xl mx-auto">
                이동식도크부터 트레일러까지, 무료 현장 컨설팅으로 맞춤 장비를 제안받으세요.
              </p>
              <p className="text-white/90 text-[14px] font-semibold mb-10">
                첫 달 구독료 50% 할인
              </p>

              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/inquiry"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-purple-primary text-[15px] font-bold hover:bg-gray-50 transition-colors duration-200 shadow-lg shadow-black/10"
                >
                  무료 컨설팅 신청
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
                <a
                  href="tel:02-2683-4459"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl border border-white/30 text-white text-[15px] font-medium hover:bg-white/10 transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  02-2683-4459
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ── PAGE ── */
export default function Home() {
  return (
    <>
      <Hero />
      <ValueSection />
      <ServicesSection />
      <ProcessSection />
      <PlansSection />
      <FAQSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}
