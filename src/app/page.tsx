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
   2. PRODUCT LINEUP — 제품 라인업 (큰 이미지 그리드)
   ══════════════════════════════════════ */
function ProductLineupSection() {
  const products = [
    { name: "이동식도크", desc: "높이 조절형 하역 장비", image: "/images/categories/category-dock.png", href: "/equipment/dock" },
    { name: "도크보드", desc: "차량·건물 연결 장비", image: "/images/categories/category-dockboard.png", href: "/equipment/dockboard" },
    { name: "리프트", desc: "유압·전동 상하 이동", image: "/images/categories/category-lift.png", href: "/equipment/lift" },
    { name: "롤테이너", desc: "접이식 운반 장비", image: "/images/categories/category-rolltainer.png", href: "/equipment/rolltainer" },
    { name: "메쉬파레트", desc: "적재·보관·운반 일체형", image: "/images/categories/category-mesh.png", href: "/equipment/mesh-pallet" },
    { name: "인테이너", desc: "대형 컨테이너 적재함", image: "/images/categories/category-intainer.png", href: "/equipment/intainer" },
    { name: "자바라컨베이어", desc: "신축형 자동 운반 라인", image: "/images/categories/category-javara.png", href: "/equipment/conveyor" },
    { name: "자키", desc: "트레일러 야드 특화 장비", image: "/images/categories/category-jockey.png", href: "/equipment/jockey" },
  ];

  return (
    <section className="bg-white pt-16 lg:pt-24">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Reveal>
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
                제품 라인업
              </h2>
              <p className="mt-2 text-gray-500 text-[15px]">물류 현장을 위한 전문 장비 8종</p>
            </div>
            <Link href="/equipment" className="hidden sm:inline-flex items-center gap-1.5 text-[14px] text-purple-primary font-semibold hover:underline">
              전체보기
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* 풀와이드 4열 그리드 — gap 없이 꽉 채움 */}
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.04}>
            <Link
              href={p.href}
              className="group relative block overflow-hidden bg-gray-100 aspect-square"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={600}
                height={600}
                className="w-full h-full object-contain p-6 lg:p-10 group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-5 lg:p-6">
                <h3 className="text-white text-[16px] lg:text-[20px] font-bold">{p.name}</h3>
                <p className="text-white/60 text-[12px] lg:text-[13px] mt-0.5">{p.desc}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   3. HOW TO SUBSCRIBE — 구독 방법
   ══════════════════════════════════════ */
function SubscribeProcessSection() {
  const steps = [
    { num: "01", title: "상담 & 견적", desc: "전문가가 현장을 파악하고 최적의 장비를 제안합니다.", icon: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" },
    { num: "02", title: "계약 & 배송", desc: "간편한 구독 계약 후 전문팀이 장비를 배송·설치합니다.", icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H21M3.375 14.25h5.25m5.25 0h2.25m-2.25 0V9.75m0 4.5V9.75m0 0h5.625a1.125 1.125 0 011.125 1.125v2.25M16.875 9.75L15 6.75h-3.75" },
    { num: "03", title: "운영 & 관리", desc: "정기 점검과 실시간 모니터링으로 장비를 관리합니다.", icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" },
    { num: "04", title: "교체 & 확장", desc: "사업 규모에 따라 유연하게 장비를 교체·추가합니다.", icon: "M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" },
  ];

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
              4단계로 시작하는 장비 구독
            </h2>
            <p className="mt-2 text-gray-500 text-[15px]">복잡한 절차 없이, 간편하게 시작하세요</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.08}>
              <div className="relative bg-white rounded-2xl border border-gray-100 p-7 h-full hover:shadow-lg hover:shadow-gray-100/80 transition-shadow duration-300">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[44px] -right-[14px] w-[28px] h-px bg-gray-200 z-10" />
                )}
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-purple-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={step.icon} />
                  </svg>
                </div>
                <span className="text-[12px] font-bold text-purple-primary/60 tracking-wider">STEP {step.num}</span>
                <h4 className="text-[17px] font-bold text-gray-900 mt-1 mb-3">{step.title}</h4>
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
   4. REVIEWS — 고객 리뷰
   ══════════════════════════════════════ */
function ReviewsSection() {
  const reviews = [
    { name: "김물류 팀장", company: "대형 물류센터", text: "이동식도크 5대를 구독 중인데, 유지보수까지 포함이라 관리 부담이 확 줄었습니다. 초기 비용 0원이 가장 큰 장점이에요.", rating: 5 },
    { name: "이운영 과장", company: "식품 유통사", text: "롤테이너 100대를 구독으로 전환했더니 자산 관리도 편해지고, 고장 나면 바로 교체해주니 업무 효율이 좋아졌습니다.", rating: 5 },
    { name: "박센터장", company: "풀필먼트 센터", text: "자바라컨베이어와 리프트를 함께 구독하고 있어요. 24시간 긴급 출동 서비스 덕분에 새벽 작업도 안심됩니다.", rating: 5 },
    { name: "최대표", company: "중소 택배 대리점", text: "도크보드 2대로 시작했는데, 사업이 커지면서 장비도 유연하게 늘릴 수 있어서 구독 모델이 딱 맞습니다.", rating: 4 },
    { name: "정매니저", company: "항만 물류사", text: "자키와 이동식도크를 함께 사용 중입니다. 전담 매니저가 장비 상태를 직접 관리해줘서 신경 쓸 일이 없어요.", rating: 5 },
    { name: "한실장", company: "전자상거래 기업", text: "메쉬파레트 50대 구독 중인데 품질이 일정하고, 파손 시 즉시 교체해줘서 재고 관리가 훨씬 수월해졌습니다.", rating: 5 },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
              고객 후기
            </h2>
            <p className="mt-2 text-gray-500 text-[15px]">AOVO와 함께하는 기업들의 생생한 이야기</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <Reveal key={i} delay={i * 0.06}>
              <div className="bg-gray-50 rounded-2xl p-7 h-full border border-gray-100 hover:shadow-lg hover:shadow-gray-100/80 transition-shadow duration-300">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <svg key={s} className={`w-4 h-4 ${s < r.rating ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[14px] text-gray-700 leading-[1.8] mb-5">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-[12px] font-bold text-purple-primary">{r.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">{r.name}</p>
                    <p className="text-[12px] text-gray-500">{r.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   5. PORTFOLIO — 포트폴리오 (큰 이미지 그리드)
   ══════════════════════════════════════ */
function PortfolioSection() {
  const portfolios = [
    { title: "대형 물류센터 도크 시스템", desc: "이동식도크 12대 + 도크보드 설치", image: "/images/categories/category-dock.png" },
    { title: "풀필먼트센터 자동화 라인", desc: "자바라컨베이어 + 리프트 통합 구축", image: "/images/categories/category-javara.png" },
    { title: "유통사 롤테이너 대량 공급", desc: "롤테이너 200대 구독 운영", image: "/images/categories/category-rolltainer.png" },
    { title: "항만 야드 자키 시스템", desc: "자키 8대 + 전담 정비팀 상주", image: "/images/categories/category-jockey.png" },
    { title: "식품센터 메쉬파레트 공급", desc: "메쉬파레트 100대 + 인테이너 50대", image: "/images/categories/category-mesh.png" },
  ];

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
                포트폴리오
              </h2>
              <p className="mt-2 text-gray-500 text-[15px]">다양한 현장에서 검증된 AOVO 구독 서비스</p>
            </div>
          </div>
        </Reveal>

        {/* 2+3 불균형 그리드 — 참고 이미지처럼 큰 이미지 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolios.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className={`group relative rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer ${
                i < 2 ? "aspect-[4/3]" : "aspect-square"
              }`}>
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-gray-50">
                  <Image
                    src={p.image}
                    alt={p.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                  <h3 className="text-white text-[18px] font-bold">{p.title}</h3>
                  <p className="text-white/70 text-[13px] mt-1">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   6. BRANCHES — 지점 안내
   ══════════════════════════════════════ */
function BranchesSection() {
  const branches = [
    { name: "본사 (인천)", addr: "인천광역시 중구 항동 서해대로 111", tel: "02-2683-4459" },
    { name: "서울 영업소", addr: "서울특별시 금천구 가산디지털로", tel: "02-2683-4459" },
    { name: "경기 물류센터", addr: "경기도 이천시 물류단지로", tel: "02-2683-4459" },
  ];

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
              지점 안내
            </h2>
            <p className="mt-2 text-gray-500 text-[15px]">전국 네트워크로 빠르게 찾아갑니다</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {branches.map((b, i) => (
            <Reveal key={b.name} delay={i * 0.08}>
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-7 hover:shadow-lg hover:shadow-gray-100/80 transition-shadow duration-300">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-purple-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <h4 className="text-[17px] font-bold text-gray-900 mb-2">{b.name}</h4>
                <p className="text-[13px] text-gray-600 leading-[1.7] mb-1">{b.addr}</p>
                <a href={`tel:${b.tel}`} className="text-[13px] text-purple-primary font-medium hover:underline">{b.tel}</a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   7. INSTAGRAM — 인스타그램 피드 (큰 이미지)
   ══════════════════════════════════════ */
function InstagramSection() {
  /* 실제 이미지가 없으므로 카테고리 이미지를 재활용 + placeholder */
  const posts = [
    { image: "/images/categories/category-dock.png", caption: "이동식도크 설치 현장" },
    { image: "/images/categories/category-lift.png", caption: "리프트 정비 완료" },
    { image: "/images/categories/category-rolltainer.png", caption: "롤테이너 대량 납품" },
    { image: "/images/categories/category-javara.png", caption: "자바라컨베이어 라인 구축" },
    { image: "/images/categories/category-jockey.png", caption: "자키 야드 운영" },
    { image: "/images/categories/category-mesh.png", caption: "메쉬파레트 적재 현장" },
    { image: "/images/categories/category-dockboard.png", caption: "도크보드 시공" },
    { image: "/images/categories/category-intainer.png", caption: "인테이너 보관 현장" },
  ];

  return (
    <section className="bg-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-headline text-[clamp(1.6rem,3vw,2.4rem)] tracking-[-0.03em] text-gray-900">
                INSTAGRAM
              </h2>
              <p className="mt-2 text-gray-500 text-[15px]">AOVO의 물류 현장 이야기</p>
            </div>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-[14px] text-purple-primary font-semibold hover:underline"
            >
              @aovo_logistics
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </a>
          </div>
        </Reveal>

        {/* 4열 큰 이미지 그리드 — 참고 이미지처럼 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((p, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <div className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-gray-100 hover:shadow-xl hover:shadow-gray-200/60 transition-all duration-300 cursor-pointer">
                <Image
                  src={p.image}
                  alt={p.caption}
                  width={400}
                  height={400}
                  className="w-full h-full object-contain p-4 bg-gray-50 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <p className="text-white text-[14px] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4">
                    {p.caption}
                  </p>
                </div>
                {/* Instagram icon overlay */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   8. CTA — 문의 폼 이동
   ══════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-white py-20 lg:py-28">
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
                이동식도크부터 자키까지, 무료 현장 컨설팅으로 맞춤 장비를 제안받으세요.
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
      <ProductLineupSection />
      <SubscribeProcessSection />
      <ReviewsSection />
      <PortfolioSection />
      <BranchesSection />
      <InstagramSection />
      <CTASection />
    </>
  );
}
