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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[80vh] bg-[#12121f]/95 backdrop-blur-2xl rounded-2xl border border-white/[0.08] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-sm text-white/60 leading-relaxed whitespace-pre-line">{content}</div>
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
      <footer className="relative bg-[#08080f] border-t border-white/[0.04]">
        {/* Features Bar */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-white/[0.06]">
            {[
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                ),
                label: "초기 비용",
                value: "0원 시작",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17l-5.1-5.1m0 0L3.14 12.9a.75.75 0 000 1.06l5.1 5.1m-5.1-5.1h11.48m0 0l2.17-2.83a.75.75 0 000-.94l-2.17-2.83M16.9 10.07h3.36a.75.75 0 01.75.75v2.36a.75.75 0 01-.75.75H16.9" />
                ),
                label: "유지보수",
                value: "구독료 포함",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182M21.038 4.656v4.992" />
                ),
                label: "장비 교체",
                value: "유연한 변경",
              },
              {
                icon: (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                ),
                label: "긴급 출동",
                value: "24시간 대응",
              },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-purple-primary/10 group-hover:bg-purple-primary/20 transition-colors duration-300">
                  <svg className="w-5 h-5 text-purple-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </div>
                <p className="text-[10px] text-white/30 tracking-wider uppercase mb-0.5">{item.label}</p>
                <p className="text-sm text-white/80 font-medium">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12">
            <div className="md:col-span-2">
              <Image
                src="/images/aovologo_white.png"
                alt="AOVO LOGISTICS"
                width={100}
                height={40}
                className="h-7 w-auto mb-6"
              />
              <div className="text-sm text-white/40 space-y-2 leading-relaxed">
                <p>상호 : 주식회사 킴샵 | 대표 : 김영식</p>
                <p>사업자등록번호 : 302-88-01373 | 통신판매업신고번호 : 제2019-인천중구-0276호</p>
                <p>전화 : 02-2683-4459</p>
                <p>주소 : 인천광역시 중구 항동 서해대로 111 킴샵그룹</p>
                <p>이메일 : mbc8447289@naver.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] text-white/30 tracking-[0.2em] uppercase mb-4 font-medium">고객센터</h4>
              <p className="text-2xl text-white mb-3 font-semibold tracking-tight">02-2683-4459</p>
              <div className="text-sm text-white/40 space-y-1.5">
                <p>평일 10:00 - 17:00</p>
                <p>점심 12:30 - 13:30</p>
                <p className="text-white/25">토/일/공휴일 휴무</p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] text-white/30 tracking-[0.2em] uppercase mb-4 font-medium">바로가기</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/plans" className="text-white/40 hover:text-purple-light transition-colors">구독 플랜</Link></li>
                <li><Link href="/equipment" className="text-white/40 hover:text-purple-light transition-colors">장비 카탈로그</Link></li>
                <li><Link href="/support" className="text-white/40 hover:text-purple-light transition-colors">고객지원</Link></li>
                <li><Link href="/faq" className="text-white/40 hover:text-purple-light transition-colors">자주 묻는 질문</Link></li>
                <li><Link href="/inquiry" className="text-white/40 hover:text-purple-light transition-colors">견적 문의</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/[0.06]">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-white/30 mb-6">
              <button onClick={() => openModal("terms")} className="hover:text-white/60 transition-colors">이용약관</button>
              <span className="text-white/10">|</span>
              <button onClick={() => openModal("privacy")} className="text-white/50 font-medium hover:text-purple-light transition-colors">개인정보처리방침</button>
              <span className="text-white/10">|</span>
              <button onClick={() => openModal("guide")} className="hover:text-white/60 transition-colors">구독 이용안내</button>
              <span className="text-white/10">|</span>
              <button onClick={() => openModal("exchange")} className="hover:text-white/60 transition-colors">구독 변경/해지</button>
              <span className="text-white/10">|</span>
              <button onClick={() => openModal("shipping")} className="hover:text-white/60 transition-colors">장비 배송/설치</button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-[11px] text-white/20 leading-relaxed text-center md:text-left">
                호스팅 제공 : Vercel Inc.
              </p>
              <div className="text-right">
                <p className="text-xs text-white/25">
                  &copy; 2026 AOVO LOGISTICS. All rights reserved.
                </p>
                <p className="text-[10px] text-white/15 mt-0.5">
                  design by aovo
                </p>
              </div>
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
