"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

/* ── Reveal ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const dur = 2000, start = performance.now();
    function tick(now: number) {
      const p = Math.min((now - start) / dur, 1);
      const v = Math.floor((1 - Math.pow(1 - p, 3)) * target);
      if (ref.current) ref.current.textContent = v.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, target, suffix]);
  return <span ref={ref}>0</span>;
}

/* ══════════════════════════════════════
   1. HERO
   ══════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 grid-dark" />
      <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] blob-purple animate-blob opacity-60" />
      <div className="absolute bottom-[-5%] right-[10%] w-[500px] h-[500px] blob-blue animate-blob opacity-50" style={{ animationDelay: "-4s" }} />

      <motion.div style={{ opacity, y }} className="relative max-w-7xl mx-auto px-6 py-32 w-full z-10">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-purple-light text-sm font-medium tracking-widest uppercase mb-6">
          Since 2026 — 물류장비 구독률 99%
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-5xl md:text-6xl lg:text-[5.5rem] font-bold leading-[1.08] tracking-tight mb-8 max-w-4xl">
          물류장비를 구독하는 기업,
          <br />
          <span className="text-gradient">비용은 줄이고 효율은 높입니다.</span>
        </motion.h1>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }} className="text-white/45 text-base md:text-lg leading-relaxed max-w-xl space-y-1 mb-12">
          <p>AOVO LOGISTICS는 물류장비 전문 구독 서비스입니다.</p>
          <p>지게차부터 컨베이어, 보관·포장장비까지</p>
          <p>초기 비용 없이 월 구독료로 도입하고 유지보수까지 해결합니다.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="flex flex-wrap gap-4">
          <Link href="/plans" className="px-8 py-3.5 rounded-full bg-purple-primary hover:bg-purple-dark text-white text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-primary/25 inline-flex items-center gap-2">
            구독 플랜 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
          <Link href="/inquiry" className="px-8 py-3.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/20 hover:bg-white/[0.03] text-sm font-medium transition-all duration-300">
            무료 상담 신청
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-white/25 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════
   2. BRAND INTRO — large typography + value props
   ══════════════════════════════════════ */
function BrandIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative py-40 overflow-hidden">
      <div className="divider-gradient mb-40" />
      <motion.div style={{ y: bgY }} className="absolute top-0 right-[-10%] w-[500px] h-[500px] blob-purple opacity-20" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Row 1 */}
        <div className="grid lg:grid-cols-2 gap-20 mb-40">
          <Reveal>
            <p className="text-purple-light text-sm font-medium tracking-widest uppercase mb-4">From purchase to subscription</p>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.15] tracking-tight">
              구매에서 구독으로,
              <br />
              물류장비의 <span className="text-gradient">새로운 기준.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="lg:pt-8 space-y-5 text-white/45 text-[15px] leading-relaxed">
              <p>AOVO LOGISTICS는 물류 현장의 장비 도입 방식을 혁신합니다.</p>
              <p>수천만 원의 초기 투자 없이, 월 구독료만으로 최신 장비를 즉시 도입하고 전문 유지보수까지 한번에 해결합니다.</p>
              <p>사업 규모에 맞춰 장비를 추가하거나 교체할 수 있어, 항상 최적의 운영 효율을 유지할 수 있습니다.</p>
            </div>
          </Reveal>
        </div>

        {/* Row 2 — icon cards */}
        <div className="grid lg:grid-cols-2 gap-20">
          <Reveal>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass glow-purple flex items-center justify-center">
              {/* Abstract visual */}
              <div className="absolute inset-0 blob-purple opacity-30 animate-blob" />
              <div className="absolute inset-0 blob-blue opacity-20 animate-blob" style={{ animationDelay: "-6s" }} />
              <div className="relative z-10 w-28 h-28 rounded-3xl glass-strong flex items-center justify-center">
                <svg className="w-14 h-14 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" /></svg>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-purple-light text-sm font-medium tracking-widest uppercase mb-4">One subscription for all</p>
            <h3 className="text-3xl md:text-4xl font-bold leading-[1.2] tracking-tight mb-6">
              장비 도입부터 유지보수까지,
              <br />하나의 구독으로.
            </h3>
            <div className="space-y-4 text-white/45 text-[15px] leading-relaxed">
              <p>지게차, 컨베이어, 보관·포장장비 등 물류 현장에 필요한 모든 장비를 하나의 구독 플랫폼에서 관리합니다.</p>
              <p>정기 점검, 긴급 수리, 부품 교체까지 모든 유지보수가 구독료에 포함되어 추가 비용 없이 장비를 최상 상태로 유지합니다.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   3. SERVICES — glassmorphism icon grid
   ══════════════════════════════════════ */
function ServicesSection() {
  const services = [
    { icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", title: "지게차 구독", desc: "전동/디젤/LPG 1t~5t" },
    { icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5", title: "컨베이어 구독", desc: "벨트/롤러/체인" },
    { icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", title: "보관장비 구독", desc: "중량 랙/경량 랙/이동식" },
    { icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25", title: "포장장비 구독", desc: "박스포장기/랩핑기" },
    { icon: "M11.42 15.17l-5.1-5.1m0 0L3.14 12.9a.75.75 0 000 1.06l5.1 5.1m-5.1-5.1h11.48m0 0l2.17-2.83a.75.75 0 000-.94l-2.17-2.83M16.9 10.07h3.36a.75.75 0 01.75.75v2.36a.75.75 0 01-.75.75H16.9", title: "정기 유지보수", desc: "월간 점검 및 수리" },
    { icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z", title: "긴급 출동", desc: "24시간 장비 수리 대응" },
  ];

  return (
    <section className="relative py-40 overflow-hidden">
      <div className="divider-gradient" />
      <div className="relative max-w-7xl mx-auto px-6 pt-32">
        <Reveal>
          <p className="text-purple-light text-sm font-medium tracking-widest uppercase mb-4">구독 가능한 장비 & 서비스</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            물류 현장에 필요한<br />모든 것을 구독합니다.
          </h2>
          <p className="text-white/40 text-base max-w-xl mb-16">지게차부터 포장장비까지, 설치·유지보수·교체를 모두 포함한 올인원 구독 서비스.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.07}>
              <div className="glass glass-hover rounded-2xl p-7 group cursor-pointer transition-all duration-300 hover:glow-purple">
                <div className="w-12 h-12 rounded-xl bg-white/[0.04] flex items-center justify-center mb-5 group-hover:bg-purple-primary/10 transition-colors">
                  <svg className="w-6 h-6 text-white/40 group-hover:text-purple-light transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d={s.icon} /></svg>
                </div>
                <h4 className="text-sm font-semibold text-white/80 mb-1">{s.title}</h4>
                <p className="text-xs text-white/30">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   4. PLANS — pricing cards
   ══════════════════════════════════════ */
function PlansSection() {
  const plans = [
    { name: "스타터", desc: "소규모 물류 현장", price: "월 49만원~", features: ["장비 1~2대", "분기별 정기 점검", "평일 유지보수", "기본 리포트"], highlight: false },
    { name: "비즈니스", desc: "성장하는 물류 기업", price: "월 149만원~", features: ["장비 3~10대", "월 1회 정기 점검", "24시간 긴급 출동", "실시간 대시보드", "전담 매니저"], highlight: true },
    { name: "엔터프라이즈", desc: "대규모 물류센터", price: "맞춤 견적", features: ["장비 무제한", "주 1회 정기 점검", "전용 정비팀 상주", "API 연동 지원", "SLA 보장", "장비 교체 무제한"], highlight: false },
  ];

  return (
    <section className="relative py-40 overflow-hidden">
      <div className="divider-gradient" />
      <div className="relative max-w-7xl mx-auto px-6 pt-32">
        <Reveal>
          <div className="text-center mb-16">
            <p className="text-purple-light text-sm font-medium tracking-widest uppercase mb-4">Subscription Plans</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">구독 플랜</h2>
            <p className="text-white/40 text-base max-w-lg mx-auto">비즈니스 규모에 맞는 플랜을 선택하세요.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`relative rounded-2xl p-8 h-full flex flex-col ${p.highlight ? "glass-strong border-purple-primary/30 glow-purple" : "glass"}`}>
                {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-purple-primary text-white text-[11px] font-medium rounded-full">추천</span>}
                <h3 className="text-lg font-semibold text-white mb-1">{p.name}</h3>
                <p className="text-sm text-white/35 mb-6">{p.desc}</p>
                <p className={`text-3xl font-bold mb-8 ${p.highlight ? "text-gradient" : "text-purple-light"}`}>{p.price}</p>
                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/50">
                      <svg className="w-4 h-4 text-purple-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/inquiry" className={`mt-8 block text-center py-3 rounded-full text-sm font-medium transition-all duration-300 ${p.highlight ? "bg-purple-primary text-white hover:bg-purple-dark" : "bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]"}`}>
                  {p.price === "맞춤 견적" ? "견적 문의" : "구독 시작하기"}
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
   5. STATS MARQUEE
   ══════════════════════════════════════ */
function StatsSection() {
  const stats = [
    { number: 500, suffix: "+", label: "구독 기업" },
    { number: 3000, suffix: "대+", label: "운영 장비" },
    { number: 99, suffix: "%", label: "재구독률" },
    { number: 24, suffix: "h", label: "긴급 출동" },
  ];

  return (
    <section className="relative py-32 overflow-hidden">
      <div className="divider-gradient" />
      <div className="max-w-7xl mx-auto px-6 pt-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-8 text-center">
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2"><Counter target={s.number} suffix={s.suffix} /></p>
                <p className="text-sm text-white/35">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   6. CLIENTS — logo grid
   ══════════════════════════════════════ */
function ClientsSection() {
  const clients = [
    "CJ대한통운", "쿠팡 로지스틱스", "한진택배", "롯데글로벌로지스",
    "현대글로비스", "삼성SDS", "SSG닷컴", "마켓컬리",
    "오아시스마켓", "브이푸드", "올리브영", "에이치엘비",
  ];

  return (
    <section className="relative py-40 overflow-hidden">
      <div className="divider-gradient" />
      <div className="relative max-w-7xl mx-auto px-6 pt-32">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">클라이언트</h2>
            <p className="text-white/35 text-base max-w-lg mx-auto">다양한 규모의 물류 기업이 AOVO의 장비 구독 서비스를 이용하고 있습니다.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {clients.map((c, i) => (
            <Reveal key={c} delay={i * 0.04}>
              <div className="glass glass-hover rounded-xl h-20 flex items-center justify-center cursor-default transition-all duration-300">
                <span className="text-sm font-semibold text-white/30 tracking-wide">{c}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   7. CTA
   ══════════════════════════════════════ */
function CTASection() {
  return (
    <section className="relative py-40 overflow-hidden">
      <div className="divider-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] blob-purple opacity-25 animate-blob" />
        <div className="absolute bottom-[10%] right-[20%] w-[350px] h-[350px] blob-blue opacity-20 animate-blob" style={{ animationDelay: "-5s" }} />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 pt-32 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            장비 구매는 그만,
            <br /><span className="text-gradient">구독을 시작하세요.</span>
          </h2>
          <p className="text-white/40 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            무료 현장 컨설팅으로 맞춤 장비·플랜을 제안받으세요.
            <br />첫 달 구독료 50% 할인 혜택을 놓치지 마세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inquiry" className="px-9 py-4 rounded-full bg-purple-primary hover:bg-purple-dark text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-primary/25 inline-flex items-center gap-2">
              무료 컨설팅 신청
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href="tel:02-2683-4459" className="px-9 py-4 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all duration-300 inline-flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              02-2683-4459
            </a>
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
      <BrandIntro />
      <ServicesSection />
      <PlansSection />
      <StatsSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}
