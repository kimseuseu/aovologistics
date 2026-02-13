"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ─── Reveal on scroll component ─── */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Counter animation ─── */
function Counter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView || !ref.current) return;
    let start = 0;
    const end = target;
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      if (ref.current) ref.current.textContent = prefix + start.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, target, suffix, prefix]);

  return <span ref={ref}>0</span>;
}

/* ─── Hero Section ─── */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden bg-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 hero-gradient" />

      {/* Floating geometric shapes */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-green-primary/[0.03] blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
        className="absolute bottom-32 left-[5%] w-96 h-96 rounded-full bg-green-primary/[0.04] blur-3xl"
      />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-primary/5 text-green-primary text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
                Smart Logistics Partner
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
            >
              물류의 미래를
              <br />
              <span className="text-gradient-green">지금 경험하세요</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              입고부터 출고, 배송까지. AOVO LOGISTICS가 제공하는 통합 물류 솔루션으로 비즈니스에만 집중하세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/inquiry"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white text-sm font-medium rounded-full hover:bg-green-dark transition-all duration-300 hover:shadow-lg hover:shadow-green-primary/20"
              >
                견적 문의하기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300"
              >
                서비스 둘러보기
              </Link>
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-square max-w-[500px] mx-auto">
              {/* Abstract logistics visual */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-primary/5 via-transparent to-green-primary/10 border border-green-primary/10" />
              <div className="absolute inset-8 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-primary/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-2">실시간 배송 추적</p>
                  <p className="text-xs text-gray-400">AI 기반 물류 최적화</p>

                  {/* Decorative elements */}
                  <div className="mt-8 space-y-3">
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-50 text-left">
                      <div className="w-2 h-2 rounded-full bg-green-accent" />
                      <span className="text-xs text-gray-500">서울 → 부산</span>
                      <span className="text-xs text-green-primary ml-auto font-medium">배송중</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-50 text-left">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span className="text-xs text-gray-500">인천 → 대구</span>
                      <span className="text-xs text-blue-500 ml-auto font-medium">출고완료</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-50 text-left">
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <span className="text-xs text-gray-500">수원 → 광주</span>
                      <span className="text-xs text-amber-500 ml-auto font-medium">입고중</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-100 text-xs font-medium text-gray-700"
              >
                99.8% 정시배송
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-4 px-4 py-2 bg-green-primary text-white rounded-xl shadow-lg text-xs font-medium"
              >
                24시간 모니터링
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-gray-400 tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Brand Authority Section (Sticky Parallax) ─── */
function BrandAuthoritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stats = [
    { number: 150, suffix: "+", label: "파트너사" },
    { number: 99, suffix: ".8%", label: "정시배송률" },
    { number: 50, suffix: "만+", label: "월 처리건수" },
    { number: 12, suffix: "개", label: "전국 물류센터" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-950 overflow-hidden">
      {/* Parallax background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-green-primary blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-green-accent blur-[120px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-green-accent text-xs font-medium tracking-widest uppercase">Why AOVO Logistics</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">
              신뢰할 수 있는 물류 파트너
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              데이터 기반의 스마트한 물류 시스템으로 고객의 비즈니스 성장을 돕고 있습니다.
            </p>
          </div>
        </Reveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <Counter target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Trust Badges */}
        <Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-primary/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">빠른 처리 속도</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                자동화된 시스템으로 주문 접수 후 평균 2시간 내 출고 처리를 완료합니다.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-primary/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">실시간 가시성</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                대시보드를 통해 재고 현황, 배송 상태, 비용 분석을 실시간으로 확인할 수 있습니다.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-primary/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">안전한 물류</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                CCTV 상시 모니터링, 온·습도 관리, 보험 적용으로 안심할 수 있는 물류 서비스를 제공합니다.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Product/Service Recommendation Section ─── */
function ServiceRecommendationSection() {
  const services = [
    {
      title: "풀필먼트",
      desc: "입고, 보관, 포장, 출고까지 원스톱 물류 대행 서비스",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      features: ["SKU별 재고 관리", "자동 피킹 시스템", "실시간 재고 현황"],
      color: "green",
    },
    {
      title: "창고 관리 (WMS)",
      desc: "클라우드 기반 창고 관리 시스템으로 효율적인 재고 운영",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      features: ["바코드/QR 스캔", "로케이션 관리", "입출고 이력 추적"],
      color: "blue",
    },
    {
      title: "배송 대행",
      desc: "전국 네트워크 기반의 빠르고 정확한 배송 서비스",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      features: ["당일/익일 배송", "실시간 추적", "고객 알림 서비스"],
      color: "emerald",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Services</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              맞춤형 물류 서비스
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              비즈니스 규모와 요구에 맞는 최적의 물류 솔루션을 제공합니다.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 0.15}>
              <div className="group relative p-8 rounded-2xl border border-gray-100 hover:border-green-primary/20 bg-white hover:shadow-xl hover:shadow-green-primary/5 transition-all duration-500 h-full">
                <div className="w-14 h-14 rounded-2xl bg-green-primary/5 group-hover:bg-green-primary/10 flex items-center justify-center mb-6 text-green-primary transition-colors duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2.5">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-gray-50">
                  <Link
                    href="/services"
                    className="text-sm font-medium text-green-primary hover:text-green-dark transition-colors inline-flex items-center gap-1 group/link"
                  >
                    자세히 보기
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Process Flow Section (Sticky Parallax) ─── */
function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const steps = [
    { step: "01", title: "상담 & 견적", desc: "비즈니스 요구사항을 분석하고 맞춤 견적을 제공합니다." },
    { step: "02", title: "계약 & 셋업", desc: "시스템 연동, 상품 등록, 바코드 세팅을 진행합니다." },
    { step: "03", title: "입고 & 보관", desc: "전용 물류센터에 안전하게 상품을 입고하고 관리합니다." },
    { step: "04", title: "출고 & 배송", desc: "자동화된 피킹과 포장으로 빠르게 배송합니다." },
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-gray-50 overflow-hidden">
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }}
        className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-primary/[0.02] blur-[100px]"
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              간단한 4단계로 시작하세요
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              복잡한 물류, AOVO가 간단하게 만들어 드립니다.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.12}>
              <div className="relative text-center group">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gray-200" />
                )}
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 rounded-full bg-white border-2 border-gray-100 group-hover:border-green-primary/30 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-green-primary/5">
                  <span className="text-2xl font-bold text-green-primary">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonial / Social Proof Section ─── */
function TestimonialSection() {
  const testimonials = [
    {
      name: "이정현",
      role: "파이브스타 대표",
      quote: "AOVO LOGISTICS 도입 후 물류 비용이 30% 절감되었고, 고객 만족도가 크게 향상되었습니다.",
    },
    {
      name: "김서연",
      role: "블룸커머스 운영팀장",
      quote: "실시간 대시보드로 재고와 배송을 한눈에 관리할 수 있어 업무 효율이 2배 이상 올랐습니다.",
    },
    {
      name: "박준호",
      role: "그린마켓 COO",
      quote: "전담 매니저의 빠른 대응과 체계적인 물류 시스템이 인상적입니다. 사업 확장에 큰 도움이 됩니다.",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">
              고객이 직접 말하는 AOVO
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="p-8 rounded-2xl bg-gray-50 border border-gray-100 h-full flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-green-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1 mb-6">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-green-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-green-primary">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
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

/* ─── CTA Section ─── */
function CTASection() {
  return (
    <section className="py-32 bg-green-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            물류 고민, 지금 해결하세요
          </h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            무료 상담을 통해 비즈니스에 최적화된 물류 솔루션을 제안받으세요.
            전문 컨설턴트가 맞춤 견적을 안내해 드립니다.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-primary text-sm font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg shadow-black/10"
            >
              무료 상담 신청
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <a
              href="tel:02-2683-4459"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              02-2683-4459
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Main Page ─── */
export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandAuthoritySection />
      <ServiceRecommendationSection />
      <ProcessSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
