"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Link from "next/link";

/* ─── Reveal on scroll ─── */
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
    const end = target;
    const duration = 2000;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * end);
      if (ref.current) ref.current.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, target, suffix, prefix]);

  return <span ref={ref}>0</span>;
}

/* ═══════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[100vh] flex items-center overflow-hidden bg-white">
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 hero-gradient" />

      <motion.div style={{ y }} className="absolute top-20 right-[10%] w-72 h-72 rounded-full bg-green-primary/[0.03] blur-3xl" />
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }} className="absolute bottom-32 left-[5%] w-96 h-96 rounded-full bg-green-primary/[0.04] blur-3xl" />

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-6 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-primary/5 text-green-primary text-xs font-medium mb-8">
                <span className="w-1.5 h-1.5 rounded-full bg-green-primary animate-pulse" />
                Equipment Subscription
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6"
            >
              물류장비,
              <br />
              <span className="text-gradient-green">구독으로 시작하세요</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg text-gray-500 leading-relaxed mb-10 max-w-md"
            >
              지게차, 컨베이어, 보관장비까지. 초기 비용 없이 월 구독료만으로 최신 물류장비를 도입하고 유지보수까지 한번에 해결하세요.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/plans" className="inline-flex items-center gap-2 px-7 py-3.5 bg-green-primary text-white text-sm font-medium rounded-full hover:bg-green-dark transition-all duration-300 hover:shadow-lg hover:shadow-green-primary/20">
                구독 플랜 보기
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
              <Link href="/equipment" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                장비 둘러보기
              </Link>
            </motion.div>
          </div>

          {/* Hero visual - subscription dashboard mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative hidden lg:block">
            <div className="relative aspect-square max-w-[500px] mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-green-primary/5 via-transparent to-green-primary/10 border border-green-primary/10" />
              <div className="absolute inset-8 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center overflow-hidden">
                <div className="text-center p-8 w-full">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-green-primary/10 flex items-center justify-center">
                    <svg className="w-10 h-10 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900 mb-1">내 구독 현황</p>
                  <p className="text-xs text-gray-400 mb-6">실시간 장비 관리 대시보드</p>

                  <div className="space-y-3 text-left">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                      <div className="w-8 h-8 rounded-lg bg-green-primary/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-700 block">전동 지게차 3t</span>
                        <span className="text-[10px] text-gray-400">다음 정비: 3월 15일</span>
                      </div>
                      <span className="text-[10px] text-green-primary font-medium bg-green-primary/5 px-2 py-0.5 rounded-full">구독중</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-700 block">벨트 컨베이어 10m</span>
                        <span className="text-[10px] text-gray-400">설치일: 2026.01.10</span>
                      </div>
                      <span className="text-[10px] text-blue-500 font-medium bg-blue-500/5 px-2 py-0.5 rounded-full">운영중</span>
                    </div>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-medium text-gray-700 block">중량 랙 5단</span>
                        <span className="text-[10px] text-gray-400">배송 예정: 2월 20일</span>
                      </div>
                      <span className="text-[10px] text-amber-500 font-medium bg-amber-500/5 px-2 py-0.5 rounded-full">배송중</span>
                    </div>
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-4 -right-4 px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-100 text-xs font-medium text-gray-700">
                월 구독료로 해결
              </motion.div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-4 -left-4 px-4 py-2 bg-green-primary text-white rounded-xl shadow-lg text-xs font-medium">
                유지보수 무료 포함
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-[10px] text-gray-400 tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5">
          <div className="w-1 h-1.5 rounded-full bg-gray-400" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BRAND AUTHORITY SECTION (Sticky Parallax)
   ═══════════════════════════════════════════ */
function BrandAuthoritySection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const stats = [
    { number: 500, suffix: "+", label: "구독 기업" },
    { number: 3000, suffix: "대+", label: "운영 장비" },
    { number: 99, suffix: "%", label: "재구독률" },
    { number: 24, suffix: "h", label: "긴급 출동" },
  ];

  return (
    <section ref={ref} className="relative py-32 bg-gray-950 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-green-primary blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-green-accent blur-[120px]" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-green-accent text-xs font-medium tracking-widest uppercase">Why Subscribe</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 tracking-tight">구매 대신, 구독하는 이유</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              초기 투자 비용 제로. 유지보수 걱정 제로. 물류장비의 새로운 도입 방식을 경험하세요.
            </p>
          </div>
        </Reveal>

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

        <Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-primary/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">초기 비용 ZERO</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                수천만 원의 장비 구매 비용 없이 월 구독료만으로 최신 물류장비를 바로 도입할 수 있습니다.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-primary/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L3.14 12.9a.75.75 0 000 1.06l5.1 5.1m-5.1-5.1h11.48m0 0l2.17-2.83a.75.75 0 000-.94l-2.17-2.83M16.9 10.07h3.36a.75.75 0 01.75.75v2.36a.75.75 0 01-.75.75H16.9" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">유지보수 올인원</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                정기 점검, 고장 수리, 부품 교체까지 모든 유지보수가 구독료에 포함되어 추가 비용이 없습니다.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-green-primary/20 flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-green-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">유연한 교체</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                사업 규모 변동에 맞춰 장비를 추가하거나 교체할 수 있어 항상 최적의 운영 환경을 유지합니다.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   EQUIPMENT CATEGORY SECTION
   ═══════════════════════════════════════════ */
function EquipmentSection() {
  const equipment = [
    {
      title: "지게차",
      desc: "전동/디젤/LPG 지게차부터 리치트럭까지, 물류 현장에 최적화된 운반 장비",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      ),
      price: "월 89만원~",
      features: ["1t ~ 5t 다양한 톤급", "배터리/충전기 포함", "정기 점검 무료"],
    },
    {
      title: "컨베이어",
      desc: "벨트, 롤러, 체인 컨베이어 등 자동화 물류 라인 구축에 필요한 이송 장비",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      ),
      price: "월 45만원~",
      features: ["맞춤 길이 설계", "속도 조절 가능", "설치/철거 포함"],
    },
    {
      title: "보관장비",
      desc: "중량 랙, 경량 랙, 이동식 랙 등 창고 공간을 효율적으로 활용하는 보관 솔루션",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      price: "월 12만원~",
      features: ["내진 설계 적용", "적재 하중 맞춤", "레이아웃 컨설팅"],
    },
    {
      title: "포장장비",
      desc: "자동 박스 포장기, 스트레칭 랩핑기, 테이핑 머신 등 출하 효율을 높이는 장비",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
        </svg>
      ),
      price: "월 35만원~",
      features: ["소형~대형 라인업", "소모품 정기 배송", "원격 모니터링"],
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Equipment</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">구독 가능한 물류장비</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              현장에 필요한 장비를 골라 구독하세요. 설치부터 유지보수까지 모두 포함됩니다.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.1}>
              <div className="group relative p-7 rounded-2xl border border-gray-100 hover:border-green-primary/20 bg-white hover:shadow-xl hover:shadow-green-primary/5 transition-all duration-500 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-green-primary/5 group-hover:bg-green-primary/10 flex items-center justify-center mb-5 text-green-primary transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed flex-1">{item.desc}</p>
                <p className="text-xl font-bold text-green-primary mb-4">{item.price}</p>
                <ul className="space-y-2 mb-6">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-3.5 h-3.5 text-green-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/plans" className="text-sm font-medium text-green-primary hover:text-green-dark transition-colors inline-flex items-center gap-1 group/link mt-auto">
                  구독하기
                  <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SUBSCRIPTION PROCESS (Sticky Parallax)
   ═══════════════════════════════════════════ */
function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const steps = [
    { step: "01", title: "장비 선택", desc: "필요한 물류장비와 수량을 선택하고 구독 플랜을 결정합니다." },
    { step: "02", title: "현장 컨설팅", desc: "전문가가 현장을 방문하여 최적의 장비 배치와 사양을 제안합니다." },
    { step: "03", title: "설치 & 세팅", desc: "장비 배송, 설치, 시운전까지 원스톱으로 진행합니다." },
    { step: "04", title: "운영 & 관리", desc: "정기 점검과 긴급 수리로 장비가 항상 최상의 상태를 유지합니다." },
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-gray-50 overflow-hidden">
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [50, -50]) }} className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-green-primary/[0.02] blur-[100px]" />

      <div className="relative max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-20">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Process</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">구독 시작까지 4단계</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">견적부터 설치까지, 빠르고 간편하게 진행됩니다.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.12}>
              <div className="relative text-center group">
                {i < steps.length - 1 && <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-[1px] bg-gray-200" />}
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

/* ═══════════════════════════════════════════
   PRICING / PLAN COMPARISON
   ═══════════════════════════════════════════ */
function PricingSection() {
  const plans = [
    {
      name: "스타터",
      desc: "소규모 물류 현장에 적합",
      price: "월 49만원~",
      features: ["장비 1~2대", "분기별 정기 점검", "평일 유지보수", "기본 리포트"],
      highlight: false,
    },
    {
      name: "비즈니스",
      desc: "성장하는 물류 기업을 위한 플랜",
      price: "월 149만원~",
      features: ["장비 3~10대", "월 1회 정기 점검", "24시간 긴급 출동", "실시간 대시보드", "전담 매니저 배정"],
      highlight: true,
    },
    {
      name: "엔터프라이즈",
      desc: "대규모 물류 운영에 최적화",
      price: "맞춤 견적",
      features: ["장비 무제한", "주 1회 정기 점검", "전용 정비팀 상주", "API 연동 지원", "SLA 보장", "장비 교체 무제한"],
      highlight: false,
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Plans</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">구독 플랜</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">비즈니스 규모에 맞는 플랜을 선택하세요. 모든 플랜에 유지보수가 포함됩니다.</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div className={`relative p-8 rounded-2xl h-full flex flex-col ${plan.highlight ? "bg-gray-950 text-white border-2 border-green-primary/30 shadow-2xl shadow-green-primary/10" : "bg-white border border-gray-100"}`}>
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-green-primary text-white text-xs font-medium rounded-full">
                    추천
                  </span>
                )}
                <h3 className={`text-lg font-semibold mb-1 ${plan.highlight ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.highlight ? "text-gray-400" : "text-gray-500"}`}>{plan.desc}</p>
                <p className={`text-3xl font-bold mb-8 ${plan.highlight ? "text-green-accent" : "text-green-primary"}`}>{plan.price}</p>
                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.highlight ? "text-gray-300" : "text-gray-600"}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${plan.highlight ? "text-green-accent" : "text-green-primary"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 12.75l6 6 9-13.5" /></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/inquiry" className={`mt-8 block text-center py-3 rounded-full text-sm font-medium transition-all duration-300 ${plan.highlight ? "bg-green-primary text-white hover:bg-green-light" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                  {plan.price === "맞춤 견적" ? "견적 문의" : "구독 시작하기"}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════ */
function TestimonialSection() {
  const testimonials = [
    { name: "이정현", role: "파이브스타 물류 대표", quote: "지게차 3대를 구독으로 전환한 후 연간 장비 관련 비용이 40% 줄었습니다. 고장 나면 바로 대체 장비가 오니 운영 공백도 없어요." },
    { name: "김서연", role: "블룸커머스 운영팀장", quote: "컨베이어 구독으로 물류센터를 세팅했는데, 초기 투자 없이 자동화 라인을 구축할 수 있어 스타트업에 딱입니다." },
    { name: "박준호", role: "그린마켓 COO", quote: "성수기에 장비를 추가하고 비수기에 줄이는 게 가능해서 비용 최적화에 큰 도움이 됩니다. 전담 매니저 대응도 빠르고요." },
  ];

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-green-primary text-xs font-medium tracking-widest uppercase">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6 tracking-tight">고객이 말하는 구독 효과</h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <div className="p-8 rounded-2xl bg-white border border-gray-100 h-full flex flex-col">
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-green-primary" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
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

/* ═══════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="py-32 bg-green-primary relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-white/5 blur-[80px]" />
      </div>
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">장비 구매는 그만,<br />구독을 시작하세요</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            무료 현장 컨설팅으로 우리 현장에 딱 맞는 장비와 플랜을 제안받으세요.<br />
            첫 달 구독료 50% 할인 혜택도 놓치지 마세요.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-primary text-sm font-semibold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg shadow-black/10">
              무료 컨설팅 신청
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
            <a href="tel:02-2683-4459" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              02-2683-4459
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandAuthoritySection />
      <EquipmentSection />
      <ProcessSection />
      <PricingSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
