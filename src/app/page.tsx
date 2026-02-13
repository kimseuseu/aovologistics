"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

/* ── Reveal wrapper ── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
    const dur = 2200, start = performance.now();
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
   1. HERO
   ══════════════════════════════════════ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section ref={ref} className="relative min-h-[105vh] flex items-center overflow-hidden">
      {/* Aurora backgrounds */}
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="aurora aurora-purple w-[800px] h-[800px] top-[-20%] left-[-10%] animate-aurora" />
      <div className="aurora aurora-blue w-[600px] h-[600px] bottom-[-10%] right-[-5%] animate-aurora" style={{ animationDelay: "-5s" }} />
      <div className="aurora aurora-pink w-[400px] h-[400px] top-[20%] right-[20%] animate-aurora animate-pulse-glow" style={{ animationDelay: "-10s" }} />

      {/* 3D decorative shape */}
      <div className="absolute top-[15%] right-[8%] w-32 h-32 hidden lg:block">
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-purple-primary/20 to-blue-primary/10 border border-white/[0.06] rotate-12 animate-float shape-3d" />
      </div>
      <div className="absolute bottom-[20%] left-[5%] w-20 h-20 hidden lg:block">
        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-pink-accent/15 to-purple-primary/10 border border-white/[0.04] -rotate-12 animate-float" style={{ animationDelay: "-3s" }} />
      </div>

      <motion.div style={{ opacity, y, scale }} className="relative max-w-7xl mx-auto px-6 w-full z-10">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-light animate-pulse" />
            물류장비 구독 서비스 — Since 2026
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="font-headline mt-8 text-[clamp(2.8rem,7vw,6rem)] leading-[1.02] tracking-[-0.05em] max-w-5xl"
        >
          물류장비를
          <br />
          <span className="text-gradient">구독</span>하는 시대.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-7 text-white/40 text-lg md:text-xl leading-relaxed max-w-xl"
        >
          지게차부터 컨베이어까지, 초기 비용 없이 월 구독료로 도입하고
          유지보수까지 한번에 해결합니다.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link
            href="/plans"
            className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-purple-primary text-white text-[15px] font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-dark to-purple-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative">구독 플랜 보기</span>
            <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </Link>
          <Link
            href="/inquiry"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white/60 text-[15px] font-medium border border-white/[0.08] hover:border-white/[0.15] hover:text-white hover:bg-white/[0.03] transition-all duration-300"
          >
            무료 상담 신청
          </Link>
        </motion.div>

        {/* Hero stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl"
        >
          {[
            { value: 500, suffix: "+", label: "구독 기업" },
            { value: 3000, suffix: "+", label: "운영 장비" },
            { value: 99, suffix: "%", label: "재구독률" },
            { value: 24, suffix: "h", label: "긴급 출동" },
          ].map((s, i) => (
            <div key={s.label} className="glass-card rounded-2xl px-5 py-4">
              <p className="font-stat text-2xl md:text-3xl text-gradient">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="text-[13px] text-white/30 mt-1">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-1.5 rounded-full bg-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════
   2. BRAND INTRO
   ══════════════════════════════════════ */
function BrandIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} className="relative py-32 lg:py-44 overflow-hidden">
      <div className="divider-gradient" />
      <motion.div style={{ y: bgY }} className="aurora aurora-purple w-[500px] h-[500px] top-[10%] right-[-10%] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text side */}
          <div>
            <Reveal>
              <span className="tag mb-6">From purchase to subscription</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-[-0.05em] mt-4">
                구매에서 구독으로,
                <br />
                물류장비의 <span className="text-gradient">새로운 기준.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 space-y-4 text-white/40 text-[15px] leading-[1.8]">
                <p>수천만 원의 초기 투자 없이, 월 구독료만으로 최신 장비를 즉시 도입하고 전문 유지보수까지 한번에 해결합니다.</p>
                <p>사업 규모에 맞춰 장비를 추가하거나 교체할 수 있어 항상 최적의 운영 효율을 유지합니다.</p>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-6">
                {[
                  { num: "0원", label: "초기 비용" },
                  { num: "100%", label: "유지보수 포함" },
                  { num: "∞", label: "장비 교체 가능" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="font-stat text-2xl text-gradient">{item.num}</p>
                    <p className="text-[13px] text-white/30 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Visual side — abstract card */}
          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              {/* Layered aurora inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d1a] to-[#080812] rounded-3xl border border-white/[0.06] glow-card" />
              <div className="absolute inset-0">
                <div className="aurora aurora-purple w-[300px] h-[300px] top-[10%] left-[10%] opacity-60 animate-aurora" />
                <div className="aurora aurora-blue w-[250px] h-[250px] bottom-[10%] right-[10%] opacity-50 animate-aurora" style={{ animationDelay: "-5s" }} />
                <div className="aurora aurora-pink w-[200px] h-[200px] top-[40%] left-[40%] opacity-40 animate-aurora" style={{ animationDelay: "-8s" }} />
              </div>
              {/* Central icon */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-24 h-24 rounded-3xl glass-strong flex items-center justify-center shadow-2xl">
                  <svg className="w-12 h-12 text-purple-light/80" fill="none" stroke="currentColor" strokeWidth={0.8} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" />
                  </svg>
                </div>
              </div>
              {/* Corner decoration */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-white/[0.06] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-purple-primary/50 animate-pulse" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   3. SERVICES — icon grid
   ══════════════════════════════════════ */
function ServicesSection() {
  const services = [
    { icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", title: "지게차", desc: "전동 · 디젤 · LPG\n1t ~ 5t 라인업", tag: "Forklift" },
    { icon: "M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5", title: "컨베이어", desc: "벨트 · 롤러 · 체인\n맞춤형 설계", tag: "Conveyor" },
    { icon: "M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z", title: "보관장비", desc: "중량 · 경량 · 이동식\n랙 시스템", tag: "Storage" },
    { icon: "M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25", title: "포장장비", desc: "박스포장기 · 랩핑기\n자동화 라인", tag: "Packaging" },
    { icon: "M11.42 15.17l-5.1-5.1m0 0L3.14 12.9a.75.75 0 000 1.06l5.1 5.1m-5.1-5.1h11.48m0 0l2.17-2.83a.75.75 0 000-.94l-2.17-2.83M16.9 10.07h3.36a.75.75 0 01.75.75v2.36a.75.75 0 01-.75.75H16.9", title: "정기 유지보수", desc: "월간 점검 · 부품 교체\n구독료 포함", tag: "Maintenance" },
    { icon: "M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z", title: "긴급 출동", desc: "24시간 대응 · 전국망\n평균 2시간 도착", tag: "Emergency" },
  ];

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="divider-gradient" />
      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-16 lg:gap-20">
          {/* Left title */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="tag mb-6">Equipment & Services</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.05em] mt-4">
                물류 현장에 필요한
                <br />
                <span className="text-gradient">모든 것</span>을 구독합니다.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-white/35 text-[15px] leading-[1.8]">
                장비 도입부터 설치, 유지보수, 교체까지. 하나의 구독으로 물류 운영의 모든 것을 해결하세요.
              </p>
            </Reveal>
          </div>

          {/* Right cards grid */}
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06}>
                <div className="glass-card rounded-2xl p-6 h-full group cursor-default">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-purple-primary/10 group-hover:border-purple-primary/20 transition-all duration-400">
                      <svg className="w-5 h-5 text-white/35 group-hover:text-purple-light transition-colors duration-400" fill="none" stroke="currentColor" strokeWidth={1.3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                    </div>
                    <span className="text-[10px] text-white/15 font-mono tracking-wider uppercase">{s.tag}</span>
                  </div>
                  <h4 className="text-[15px] font-semibold text-white/80 mb-2">{s.title}</h4>
                  <p className="text-[13px] text-white/30 leading-relaxed whitespace-pre-line">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   4. PROCESS — How it works
   ══════════════════════════════════════ */
function ProcessSection() {
  const steps = [
    { num: "01", title: "상담 & 견적", desc: "전문가가 현장을 파악하고 최적의 장비와 플랜을 제안합니다." },
    { num: "02", title: "계약 & 배송", desc: "간편한 구독 계약 후 전문 운송팀이 장비를 배송·설치합니다." },
    { num: "03", title: "운영 & 관리", desc: "정기 점검과 실시간 대시보드로 장비 상태를 관리합니다." },
    { num: "04", title: "교체 & 확장", desc: "사업 규모에 따라 유연하게 장비를 교체하거나 추가합니다." },
  ];

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="divider-gradient" />
      <div className="aurora aurora-blue w-[500px] h-[500px] top-[30%] left-[-10%] opacity-20 animate-aurora" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <Reveal>
          <div className="text-center mb-20">
            <span className="tag mb-6">How it works</span>
            <h2 className="font-headline text-[clamp(2rem,4vw,3.2rem)] tracking-[-0.05em] mt-4">
              <span className="text-gradient">4단계</span>로 시작하는 장비 구독
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-7 h-full relative group">
                {/* Step number */}
                <span className="text-[4rem] font-bold leading-none text-white/[0.03] absolute top-4 right-5 select-none group-hover:text-purple-primary/[0.06] transition-colors duration-500">{step.num}</span>
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-purple-primary/10 border border-purple-primary/20 flex items-center justify-center mb-5">
                    <span className="text-[12px] font-bold text-purple-light">{step.num}</span>
                  </div>
                  <h4 className="text-[15px] font-semibold text-white/85 mb-3">{step.title}</h4>
                  <p className="text-[13px] text-white/30 leading-[1.7]">{step.desc}</p>
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
   5. PLANS — pricing
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
      desc: "대규모 물류센터",
      price: "맞춤",
      unit: "견적",
      features: ["장비 무제한", "주 1회 정기 점검", "전용 정비팀 상주", "API 연동 지원", "SLA 보장", "장비 교체 무제한"],
      highlight: false,
    },
  ];

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="divider-gradient" />
      <div className="aurora aurora-purple w-[600px] h-[600px] top-[20%] right-[-15%] opacity-15 animate-aurora" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <Reveal>
          <div className="text-center mb-16">
            <span className="tag mb-6">Pricing</span>
            <h2 className="font-headline text-[clamp(2rem,4vw,3.2rem)] tracking-[-0.05em] mt-4 mb-4">구독 플랜</h2>
            <p className="text-white/35 text-[15px] max-w-lg mx-auto">비즈니스 규모에 맞는 플랜을 선택하세요. 모든 플랜에 유지보수가 포함되어 있습니다.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div className={`relative rounded-2xl p-7 h-full flex flex-col transition-all duration-400 ${
                p.highlight
                  ? "glass-strong border-purple-primary/20 glow-purple"
                  : "glass-card"
              }`}>
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-primary to-purple-dark text-white text-[11px] font-semibold rounded-full shadow-lg shadow-purple-primary/25">
                    추천
                  </span>
                )}

                {/* Plan name */}
                <div className="mb-6">
                  <span className="text-[11px] text-white/20 font-mono tracking-wider uppercase">{p.name}</span>
                  <h3 className="text-lg font-semibold text-white mt-1">{p.nameKo}</h3>
                  <p className="text-[13px] text-white/30 mt-1">{p.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-7 pb-7 border-b border-white/[0.06]">
                  <div className="flex items-baseline gap-1">
                    <span className={`font-stat text-4xl ${p.highlight ? "text-gradient" : "text-white/90"}`}>{p.price}</span>
                    <span className="text-[14px] text-white/30">{p.unit}</span>
                  </div>
                  <p className="text-[12px] text-white/20 mt-1">/ 월</p>
                </div>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-[13px] text-white/45">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${p.highlight ? "bg-purple-primary/20" : "bg-white/[0.04]"}`}>
                        <svg className={`w-2.5 h-2.5 ${p.highlight ? "text-purple-light" : "text-white/30"}`} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/inquiry"
                  className={`mt-8 block text-center py-3.5 rounded-xl text-[14px] font-semibold transition-all duration-300 ${
                    p.highlight
                      ? "bg-purple-primary text-white hover:bg-purple-dark hover:shadow-lg hover:shadow-purple-primary/25"
                      : "bg-white/[0.04] border border-white/[0.06] text-white/50 hover:text-white hover:bg-white/[0.08]"
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
    { q: "최소 구독 기간이 있나요?", a: "기본 최소 구독 기간은 6개월입니다. 6개월 이후에는 언제든 구독 해지가 가능하며, 30일 전 사전 통보가 필요합니다." },
    { q: "장비 고장 시 대응은 어떻게 되나요?", a: "비즈니스 플랜 이상은 24시간 긴급 출동 서비스가 포함됩니다. 전국 네트워크를 통해 평균 2시간 이내 현장 도착합니다." },
    { q: "장비 교체가 가능한가요?", a: "네, 구독 기간 중 언제든 장비 업그레이드 또는 교체가 가능합니다. 전담 매니저에게 문의하시면 최적의 장비를 제안드립니다." },
    { q: "설치 비용이 별도로 발생하나요?", a: "아니요. 모든 플랜에 장비 배송, 설치, 시운전 비용이 포함되어 있습니다. 추가 비용 없이 바로 사용 가능합니다." },
    { q: "여러 지역에 장비 배치가 가능한가요?", a: "엔터프라이즈 플랜에서는 전국 다중 거점 배치가 가능합니다. 각 거점별 전담 정비팀 배치도 지원합니다." },
  ];

  return (
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="divider-gradient" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <div className="grid lg:grid-cols-[1fr,1.5fr] gap-16 lg:gap-24">
          {/* Left */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <span className="tag mb-6">FAQ</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-[clamp(2rem,4vw,3.2rem)] leading-[1.08] tracking-[-0.05em] mt-4">
                자주 묻는
                <br />
                <span className="text-gradient">질문</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-white/35 text-[15px] leading-[1.8]">
                궁금한 점이 해결되지 않으셨나요?<br />고객센터로 문의해 주세요.
              </p>
              <a href="tel:02-2683-4459" className="inline-flex items-center gap-2 mt-4 text-purple-light text-[14px] font-medium hover:text-white transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                02-2683-4459
              </a>
            </Reveal>
          </div>

          {/* Right — accordion */}
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <FAQItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details ref={ref} className="group glass-card rounded-2xl overflow-hidden">
      <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none">
        <span className="text-[14px] font-medium text-white/70 group-open:text-white transition-colors pr-4">{q}</span>
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-open:bg-purple-primary/10 group-open:border-purple-primary/20 transition-all duration-300">
          <svg className="w-3.5 h-3.5 text-white/30 group-open:text-purple-light group-open:rotate-45 transition-all duration-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </summary>
      <div className="px-6 pb-5">
        <p className="text-[13px] text-white/35 leading-[1.8] border-t border-white/[0.04] pt-4">{a}</p>
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
    <section className="relative py-32 lg:py-40 overflow-hidden">
      <div className="divider-gradient" />

      <div className="relative max-w-7xl mx-auto px-6 pt-20">
        <Reveal>
          <div className="text-center mb-16">
            <span className="tag mb-6">Our Clients</span>
            <h2 className="font-headline text-[clamp(1.8rem,3.5vw,2.8rem)] tracking-[-0.05em] mt-4 mb-4">
              <span className="text-gradient font-stat">500+</span> 기업이 선택한 파트너
            </h2>
            <p className="text-white/30 text-[15px] max-w-lg mx-auto">다양한 규모의 물류 기업이 AOVO의 장비 구독 서비스를 이용하고 있습니다.</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {clients.map((c, i) => (
            <Reveal key={c} delay={i * 0.03}>
              <div className="glass-card rounded-xl h-[72px] flex items-center justify-center cursor-default">
                <span className="text-[13px] font-medium text-white/20 tracking-wide group-hover:text-white/40">{c}</span>
              </div>
            </Reveal>
          ))}
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
    <section className="relative py-32 lg:py-44 overflow-hidden">
      <div className="divider-gradient" />

      {/* Aurora BG */}
      <div className="aurora aurora-purple w-[600px] h-[600px] top-[10%] left-[20%] opacity-25 animate-aurora" />
      <div className="aurora aurora-blue w-[500px] h-[500px] bottom-[0%] right-[15%] opacity-20 animate-aurora" style={{ animationDelay: "-5s" }} />
      <div className="aurora aurora-pink w-[300px] h-[300px] top-[40%] left-[50%] opacity-15 animate-aurora" style={{ animationDelay: "-8s" }} />

      <div className="relative max-w-4xl mx-auto px-6 pt-20 text-center">
        <Reveal>
          <span className="tag mb-8 mx-auto">Get Started Today</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-headline text-[clamp(2.2rem,5vw,4rem)] tracking-[-0.05em] leading-[1.05] mt-4 mb-6">
            장비 구매는 그만,
            <br />
            <span className="text-gradient-warm">구독을 시작하세요.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-white/35 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            무료 현장 컨설팅으로 맞춤 장비·플랜을 제안받으세요.
            <br />
            <span className="text-purple-light/70">첫 달 구독료 50% 할인</span> 혜택을 놓치지 마세요.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inquiry"
              className="group relative inline-flex items-center gap-2.5 px-10 py-4.5 rounded-2xl bg-purple-primary text-white text-[15px] font-semibold overflow-hidden transition-all duration-300 hover:shadow-[0_8px_40px_rgba(139,92,246,0.3)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-dark to-purple-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">무료 컨설팅 신청</span>
              <svg className="relative w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a
              href="tel:02-2683-4459"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/[0.08] text-white/50 text-[15px] font-medium hover:text-white hover:border-white/[0.15] hover:bg-white/[0.03] transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
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
      <ProcessSection />
      <PlansSection />
      <FAQSection />
      <ClientsSection />
      <CTASection />
    </>
  );
}
