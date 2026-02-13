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
    title: "이용안내",
    content: `AOVO LOGISTICS 서비스 이용안내\n\n■ 서비스 신청 방법\n1. 회원가입 후 물류 서비스를 선택합니다.\n2. 견적 요청 양식을 작성하여 제출합니다.\n3. 담당자가 맞춤 견적을 안내드립니다.\n4. 계약 체결 후 서비스가 시작됩니다.\n\n■ 고객센터 안내\n전화번호: 02-2683-4459\n운영시간: 평일 10:00 ~ 17:00\n점심시간: 12:30 ~ 13:30\n휴무일: 토/일/공휴일\n이메일: mbc8447289@naver.com`,
  },
  exchange: {
    title: "서비스 변경/해지 정책",
    content: `AOVO LOGISTICS 서비스 변경/해지 정책\n\n■ 서비스 변경\n서비스 계약 기간 중 서비스 플랜 변경을 원하시는 경우 담당자에게 문의해 주세요.\n\n■ 서비스 해지\n계약 기간 만료 30일 전까지 서면 통지를 통해 해지 가능합니다.\n조기 해지 시 잔여 계약 기간에 따른 위약금이 발생할 수 있습니다.\n\n■ 문의처\n고객센터: 02-2683-4459\n운영시간: 평일 10:00 ~ 17:00\n이메일: mbc8447289@naver.com`,
  },
  shipping: {
    title: "물류 정책",
    content: `AOVO LOGISTICS 물류 정책\n\n■ 배송 방법\n- 일반 택배 배송 (CJ대한통운, 롯데택배)\n- 화물 배송\n- 국제 물류 (해상/항공)\n\n■ 배송 기간\n- 일반 택배: 결제 완료 후 2~5영업일\n- 화물 배송: 상품 특성에 따라 별도 안내\n- 국제 물류: 목적지에 따라 7~30영업일\n\n■ 문의처\n고객센터: 02-2683-4459\n운영시간: 평일 10:00 ~ 17:00\n이메일: mbc8447289@naver.com`,
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[80vh] bg-white rounded-2xl shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="닫기"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{content}</div>
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
      <footer className="bg-white border-t border-gray-100">
        {/* Features Bar */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-gray-100">
            <div className="text-center group">
              <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-green-primary/5 group-hover:bg-green-primary/10 transition-colors duration-300">
                <svg className="w-5 h-5 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-0.5">전국 배송</p>
              <p className="text-sm text-gray-900 font-medium">당일/익일 출고</p>
            </div>
            <div className="text-center group">
              <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-green-primary/5 group-hover:bg-green-primary/10 transition-colors duration-300">
                <svg className="w-5 h-5 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>
              </div>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-0.5">풀필먼트</p>
              <p className="text-sm text-gray-900 font-medium">통합 물류 관리</p>
            </div>
            <div className="text-center group">
              <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-green-primary/5 group-hover:bg-green-primary/10 transition-colors duration-300">
                <svg className="w-5 h-5 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-0.5">안전 보장</p>
              <p className="text-sm text-gray-900 font-medium">실시간 추적</p>
            </div>
            <div className="text-center group">
              <div className="mx-auto mb-3 w-12 h-12 flex items-center justify-center rounded-full bg-green-primary/5 group-hover:bg-green-primary/10 transition-colors duration-300">
                <svg className="w-5 h-5 text-green-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <p className="text-[10px] text-gray-400 tracking-wider uppercase mb-0.5">1:1 상담</p>
              <p className="text-sm text-gray-900 font-medium">전담 매니저</p>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 py-12">
            <div className="md:col-span-2">
              <Image
                src="/images/aovologo_black.png"
                alt="AOVO LOGISTICS"
                width={100}
                height={40}
                className="h-7 w-auto mb-6"
              />
              <div className="text-sm text-gray-500 space-y-2 leading-relaxed">
                <p>상호 : 주식회사 킴샵 | 대표 : 김영식</p>
                <p>사업자등록번호 : 302-88-01373 | 통신판매업신고번호 : 제2019-인천중구-0276호</p>
                <p>전화 : 02-2683-4459</p>
                <p>주소 : 인천광역시 중구 항동 서해대로 111 킴샵그룹</p>
                <p>이메일 : mbc8447289@naver.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] text-gray-400 tracking-[0.2em] uppercase mb-4 font-medium">고객센터</h4>
              <p className="text-2xl text-gray-900 mb-3 font-semibold tracking-tight">02-2683-4459</p>
              <div className="text-sm text-gray-500 space-y-1.5">
                <p>평일 10:00 - 17:00</p>
                <p>점심 12:30 - 13:30</p>
                <p className="text-gray-400">토/일/공휴일 휴무</p>
              </div>
            </div>

            <div>
              <h4 className="text-[11px] text-gray-400 tracking-[0.2em] uppercase mb-4 font-medium">바로가기</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/services" className="text-gray-500 hover:text-green-primary transition-colors">물류 서비스</Link></li>
                <li><Link href="/fulfillment" className="text-gray-500 hover:text-green-primary transition-colors">풀필먼트</Link></li>
                <li><Link href="/tracking" className="text-gray-500 hover:text-green-primary transition-colors">배송 추적</Link></li>
                <li><Link href="/support" className="text-gray-500 hover:text-green-primary transition-colors">고객지원</Link></li>
                <li><Link href="/inquiry" className="text-gray-500 hover:text-green-primary transition-colors">1:1 문의</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-gray-400 mb-6">
              <button onClick={() => openModal("terms")} className="hover:text-gray-700 transition-colors">이용약관</button>
              <span className="text-gray-200">|</span>
              <button onClick={() => openModal("privacy")} className="text-gray-700 font-medium hover:text-green-primary transition-colors">개인정보처리방침</button>
              <span className="text-gray-200">|</span>
              <button onClick={() => openModal("guide")} className="hover:text-gray-700 transition-colors">이용안내</button>
              <span className="text-gray-200">|</span>
              <button onClick={() => openModal("exchange")} className="hover:text-gray-700 transition-colors">서비스 변경/해지</button>
              <span className="text-gray-200">|</span>
              <button onClick={() => openModal("shipping")} className="hover:text-gray-700 transition-colors">물류 정책</button>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-[11px] text-gray-400 leading-relaxed text-center md:text-left">
                호스팅 제공 : Vercel Inc.
              </p>
              <div className="text-right">
                <p className="text-xs text-gray-400">
                  &copy; 2026 AOVO LOGISTICS. All rights reserved.
                </p>
                <p className="text-[10px] text-gray-300 mt-0.5">
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
