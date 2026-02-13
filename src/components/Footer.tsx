"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

type ModalType = "terms" | "privacy" | "guide" | "exchange" | "shipping" | null;

const modalContents: Record<string, { title: string; content: string }> = {
  terms: {
    title: "이용약관",
    content: `제1조 (목적)\n이 약관은 주식회사 킴샵(이하 "회사")이 운영하는 AOVO LOGISTICS 온라인 플랫폼(이하 "플랫폼")에서 제공하는 물류 관련 서비스(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.\n\n제2조 (정의)\n① "플랫폼"이란 회사가 물류 서비스를 이용자에게 제공하기 위하여 정보통신설비를 이용하여 설정한 가상의 영업장을 말합니다.\n② "이용자"란 "플랫폼"에 접속하여 이 약관에 따라 서비스를 받는 회원 및 비회원을 말합니다.\n\n제3조 (서비스의 제공)\n회사는 풀필먼트, 물류 관리, 배송 추적 등의 서비스를 제공합니다.\n\n부칙\n이 약관은 2026년 1월 1일부터 시행합니다.`,
  },
  privacy: {
    title: "개인정보처리방침",
    content: `주식회사 킴샵(이하 "회사")은 개인정보보호법에 따라 이용자의 개인정보 보호 및 권익을 보호하고 개인정보와 관련한 이용자의 고충을 원활하게 처리할 수 있도록 다음과 같은 처리방침을 두고 있습니다.\n\n제1조 (개인정보의 처리 목적)\n회사는 회원 가입 및 관리, 물류 서비스 제공, 고충처리 목적으로 개인정보를 처리합니다.\n\n제2조 (개인정보의 처리 및 보유기간)\n회원 가입 및 관리: 회원 탈퇴 시까지\n서비스 제공: 서비스 공급완료 및 요금결제·정산 완료 시까지\n\n개인정보 보호책임자\n성명: 김영식 | 직책: 대표이사\n연락처: 02-2683-4459 | 이메일: mbc8447289@naver.com`,
  },
  guide: {
    title: "구독 이용안내",
    content: `AOVO LOGISTICS 장비 구독 이용안내\n\n■ 구독 신청 방법\n1. 회원가입 후 필요한 장비와 구독 플랜을 선택합니다.\n2. 견적 요청 양식을 작성하여 제출합니다.\n3. 전문가가 현장을 방문하여 최적의 장비와 사양을 제안합니다.\n4. 계약 체결 후 장비 배송, 설치, 시운전을 진행합니다.\n\n■ 구독 관리\n- 마이페이지에서 구독 현황, 정비 일정, 비용 내역을 확인할 수 있습니다.\n- 장비 추가/교체/해지는 전담 매니저를 통해 신청하세요.\n\n■ 고객센터 안내\n전화번호: 02-2683-4459\n운영시간: 평일 10:00 ~ 17:00\n점심시간: 12:30 ~ 13:30\n휴무일: 토/일/공휴일\n이메일: mbc8447289@naver.com`,
  },
  exchange: {
    title: "구독 변경/해지 정책",
    content: `AOVO LOGISTICS 구독 변경/해지 정책\n\n■ 플랜 변경\n구독 기간 중 플랜 업그레이드 또는 장비 추가/교체가 가능합니다.\n전담 매니저에게 문의해 주세요.\n\n■ 구독 해지\n- 최소 구독 기간(6개월) 경과 후 해지 가능\n- 해지 희망 시 30일 전 서면 통지\n- 조기 해지 시 잔여 기간에 따른 위약금 발생 가능\n- 장비 회수 일정은 별도 협의\n\n■ 문의처\n고객센터: 02-2683-4459\n운영시간: 평일 10:00 ~ 17:00\n이메일: mbc8447289@naver.com`,
  },
  shipping: {
    title: "장비 배송/설치 정책",
    content: `AOVO LOGISTICS 장비 배송/설치 정책\n\n■ 배송 방법\n- 소형 장비: 화물 택배\n- 대형 장비(지게차, 컨베이어 등): 전문 운송 차량\n\n■ 설치 안내\n- 전문 설치 기사가 현장 방문하여 설치 및 시운전\n- 설치 비용은 구독료에 포함\n- 설치 소요 기간: 소형 1~2일, 대형 3~5일\n\n■ 배송 기간\n- 재고 장비: 계약 후 5~7영업일\n- 주문제작 장비: 2~4주\n\n■ 문의처\n고객센터: 02-2683-4459\n운영시간: 평일 10:00 ~ 17:00\n이메일: mbc8447289@naver.com`,
  },
};

function FooterModal({
  isOpen,
  onClose,
  title,
  content,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-xl"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[80vh] bg-[#0c0c18]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.06] shadow-2xl flex flex-col glow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
          <h2 className="text-[15px] font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/30 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            aria-label="닫기"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-[13px] text-white/50 leading-[1.8] whitespace-pre-line">{content}</div>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (type: ModalType) => {
    setActiveModal(type);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = "";
  };

  const currentModal = activeModal ? modalContents[activeModal] : { title: "", content: "" };

  return (
    <>
      <footer className="relative bg-[#06060b] border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main footer grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-16">
            {/* Brand column */}
            <div className="md:col-span-5">
              <Image
                src="/images/aovologo_white.png"
                alt="AOVO LOGISTICS"
                width={100}
                height={40}
                className="h-6 w-auto mb-5 opacity-70"
              />
              <p className="text-[13px] text-white/25 leading-[1.8] max-w-sm mb-6">
                물류장비 구독 서비스. 지게차부터 컨베이어까지,
                초기 비용 없이 월 구독료로 도입하고 유지보수까지 해결합니다.
              </p>
              <div className="text-[12px] text-white/15 space-y-1.5 leading-relaxed">
                <p>주식회사 킴샵 | 대표 김영식</p>
                <p>사업자등록번호 302-88-01373</p>
                <p>인천광역시 중구 항동 서해대로 111</p>
              </div>
            </div>

            {/* Links */}
            <div className="md:col-span-2">
              <h4 className="text-[11px] text-white/20 tracking-[0.15em] uppercase mb-5 font-medium">서비스</h4>
              <ul className="space-y-3">
                {[
                  { label: "구독 플랜", href: "/plans" },
                  { label: "장비 카탈로그", href: "/equipment" },
                  { label: "견적 문의", href: "/inquiry" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13px] text-white/30 hover:text-purple-light transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[11px] text-white/20 tracking-[0.15em] uppercase mb-5 font-medium">지원</h4>
              <ul className="space-y-3">
                {[
                  { label: "고객지원", href: "/support" },
                  { label: "자주 묻는 질문", href: "/faq" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[13px] text-white/30 hover:text-purple-light transition-colors duration-200">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="md:col-span-3">
              <h4 className="text-[11px] text-white/20 tracking-[0.15em] uppercase mb-5 font-medium">고객센터</h4>
              <a href="tel:02-2683-4459" className="text-xl font-semibold text-white/80 hover:text-purple-light transition-colors block mb-3 tracking-tight">
                02-2683-4459
              </a>
              <div className="text-[12px] text-white/20 space-y-1.5">
                <p>평일 10:00 – 17:00</p>
                <p>점심 12:30 – 13:30</p>
                <p>토/일/공휴일 휴무</p>
              </div>
              <a href="mailto:mbc8447289@naver.com" className="inline-block mt-3 text-[12px] text-white/25 hover:text-purple-light transition-colors">
                mbc8447289@naver.com
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-6 border-t border-white/[0.04]">
            {/* Policy links */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-[11px] text-white/20 mb-5">
              <button onClick={() => openModal("terms")} className="hover:text-white/40 transition-colors">이용약관</button>
              <button onClick={() => openModal("privacy")} className="text-white/35 font-medium hover:text-purple-light transition-colors">개인정보처리방침</button>
              <button onClick={() => openModal("guide")} className="hover:text-white/40 transition-colors">구독 이용안내</button>
              <button onClick={() => openModal("exchange")} className="hover:text-white/40 transition-colors">구독 변경/해지</button>
              <button onClick={() => openModal("shipping")} className="hover:text-white/40 transition-colors">장비 배송/설치</button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <p className="text-[11px] text-white/12">
                &copy; 2026 AOVO LOGISTICS. All rights reserved.
              </p>
              <p className="text-[10px] text-white/10">
                Hosted on Vercel · design by aovo
              </p>
            </div>
          </div>
        </div>
      </footer>

      <FooterModal
        isOpen={activeModal !== null}
        onClose={closeModal}
        title={currentModal.title}
        content={currentModal.content}
      />
    </>
  );
}
