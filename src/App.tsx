/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Scale, 
  Search, 
  Globe, 
  Menu, 
  MapPin, 
  Contact2, 
  Star, 
  PhoneCall, 
  ArrowLeft, 
  ArrowRight,
  X,
  ChevronDown,
  ShieldCheck,
  FileText,
  Users,
  MessageSquare,
  BookOpen,
  ClipboardCheck,
  AlertCircle,
  Gavel,
  Lock,
  Zap,
  Smartphone,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// --- Types ---
interface NavItem {
  title: string;
  href: string;
  children?: { title: string; href: string; description?: string }[];
}

// --- Constants & Data ---
const NAVER_PLACE_URL = "https://map.naver.com/p/search/%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%B9%98%EB%A3%8C%EC%84%BC%ED%84%B0%EC%B0%BD%EC%9B%90/place/2032665535";
const CONTACT_PHONE = "0507-1391-9997";

const NAV_STRUCTURE: NavItem[] = [
  {
    title: "센터소개",
    href: "/about",
    children: [
      { title: "센터 소개", href: "/about/intro", description: "성범죄 전문 심리치료 특화 기관" },
      { title: "원장 프로필", href: "/about/profile", description: "윤영준 원장의 전문성과 이력" },
      { title: "부원장 프로필", href: "/about/vice-profile", description: "소윤주 부원장의 전문성과 이력" },
      { title: "대표 인사말", href: "/about/greeting", description: "재범방지 중심의 치료 철학" },
      { title: "상담전문가", href: "/about/experts", description: "검증된 성범죄 특화 전문가" },
      { title: "방송/대외활동", href: "/about/activities", description: "공신력 있는 활동 내역" },
      { title: "공지사항", href: "/about/notice" },
      { title: "오시는 길", href: "/about/location", description: "창원 센터 위치 및 주차 안내" },
    ]
  },
  {
    title: "상담/치료",
    href: "/treatment",
    children: [
      { title: "성범죄 가해자 심리상담", href: "/treatment/offender", description: "사건 전 심리구조 분석 및 교정" },
      { title: "디지털 성범죄", href: "/treatment/digital", description: "불법촬영, 딥페이크, 중독 구조 해체" },
      { title: "성도착/행동교정", href: "/treatment/paraphilia", description: "공연음란, 특정행동 교정 프로그램" },
      { title: "성중독/행동중독", href: "/treatment/addiction", description: "충동-자극-행동 루프 해체" },
    ]
  },
  {
    title: "사건유형별 대응",
    href: "/cases",
    children: [
      { title: "강간 / 준강간", href: "/cases/rape" },
      { title: "강제추행", href: "/cases/molestation" },
      { title: "불법촬영 / 유포", href: "/cases/filming" },
      { title: "딥페이크 / 합성물", href: "/cases/deepfake" },
      { title: "통신매체이용음란", href: "/cases/tongmaeum" },
      { title: "아청법 관련 사건", href: "/cases/juvenile" },
      { title: "스토킹 / 주거침입", href: "/cases/stalking" },
      { title: "직장/학교 사건", href: "/cases/workplace" },
    ]
  },
  {
    title: "양형자료",
    href: "/legal",
    children: [
      { title: "양형자료 안내", href: "/legal/info", description: "심리치료의 법적 효력과 필요성" },
      { title: "심리평가/소견서", href: "/legal/assessment", description: "재범위험성 및 인지왜곡 평가" },
      { title: "반성문 코칭", href: "/legal/coaching", description: "책임 인식 기반 진술서 가이드" },
      { title: "변호사 협업", href: "/legal/collaboration", description: "법률-심리 통합 대응 프로세스" },
      { title: "성범죄 재범방지교육", href: "/legal/education/prevention", description: "재발 방지를 위한 핵심 교육" },
      { title: "성인지 감수성 교육", href: "/legal/education/sensitivity", description: "성적 권리와 존중의 이해" },
      { title: "성인지 왜곡 교정 교육", href: "/legal/education/distortion", description: "잘못된 성 관념의 인지적 교정" },
      { title: "준법정신 강화교육", href: "/legal/education/compliance", description: "법질서 준수 및 사회적 책임" },
      { title: "성차별 교육", href: "/legal/education/discrimination", description: "평등한 성 역할과 차별 해소" },
    ]
  },
  {
    title: "상담안내",
    href: "/guide",
    children: [
      { title: "상담 절차", href: "/guide/process", description: "문의부터 프로그램 설계까지" },
      { title: "비용 안내", href: "/guide/cost" },
      { title: "비밀보장 원칙", href: "/guide/privacy", description: "철저한 기록 관리 및 보안" },
      { title: "자주 묻는 질문", href: "/guide/faq" },
    ]
  },
  {
    title: "자료실",
    href: "/archive",
    children: [
      { title: "전문가 칼럼", href: "/archive/column", description: "성인지 왜곡과 충동 조절" },
      { title: "자가진단", href: "/archive/check", description: "충동 통제 및 위험도 체크" },
      { title: "익명 사례", href: "/archive/cases", description: "변화와 회복의 기록" },
      { title: "미디어 자료", href: "/archive/media" },
    ]
  }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location]);

  return (
    <nav className="border-b border-slate-100 bg-white z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative">
              <div className="absolute -inset-2 bg-indigo-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative text-[#4F46E5] transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Scale className="w-9 h-9" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm lg:text-lg font-bold tracking-tight text-slate-900 leading-none">
                성범죄심리상담치료센터<span className="text-[#4F46E5]">창원</span>
              </span>
              <span className="text-[10px] lg:text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-0.5">Changwon Center</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-0 h-full">
            {NAV_STRUCTURE.map((item) => (
              <div 
                key={item.title}
                className="relative h-full flex items-center"
                onMouseEnter={() => setActiveMenu(item.title)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className={`px-3 py-2 text-[14px] font-medium transition-colors flex items-center gap-1 ${activeMenu === item.title ? 'text-[#4F46E5]' : 'text-slate-600 hover:text-slate-900'}`}>
                  {item.title}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeMenu === item.title ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Menu Dropdown */}
                <AnimatePresence>
                  {activeMenu === item.title && item.children && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 w-[480px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-6 grid grid-cols-2 gap-x-8 gap-y-2"
                    >
                      {item.children.map((child) => (
                        <Link 
                          key={child.title} 
                          to={child.href}
                          className="group p-3 rounded-xl hover:bg-slate-50 transition-all"
                        >
                          <div className="text-[14px] font-semibold text-slate-900 group-hover:text-[#4F46E5] mb-0.5">{child.title}</div>
                          {child.description && (
                            <div className="text-[12px] text-slate-500 leading-tight">{child.description}</div>
                          )}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#4F46E5] text-white text-[14px] font-semibold rounded-full hover:bg-[#4338ca] transition-all shadow-sm hover:shadow-md transform active:scale-95"
            >
              상담 예약하기
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed inset-0 top-20 bg-white z-50 overflow-y-auto"
          >
            <div className="p-6 space-y-8">
              {NAV_STRUCTURE.map((item) => (
                <div key={item.title} className="space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{item.title}</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {item.children?.map((child) => (
                      <Link 
                        key={child.title} 
                        to={child.href}
                        className="flex flex-col"
                      >
                        <span className="text-lg font-semibold text-slate-900">{child.title}</span>
                        {child.description && <span className="text-sm text-slate-500">{child.description}</span>}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-8 border-t border-slate-100">
                <a 
                  href={NAVER_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-[#4F46E5] text-white text-center font-bold rounded-xl"
                >
                  상담 예약하기
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => (
  <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 overflow-hidden bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-[#4F46E5] text-sm font-bold mb-8">
            <ShieldCheck className="w-4 h-4" />
            성범죄 특화 심리치료 전문 기관
          </div>
          <h1 className="text-4xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8">
            창원 성범죄 특화 심리 상담, <br />
            <span className="text-[#4F46E5]">교정 치료</span> 및 전문 상담
          </h1>
          <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl mb-12">
            처벌 이후가 아니라, 재발을 막는 것이 진정한 해결입니다. <br className="hidden lg:block" />
            우리는 당신의 변화를 위한 가장 객관적인 조력자가 됩니다.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-[#4F46E5] text-white text-lg font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
            >
              상담 예약하기
              <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/legal/info" className="px-10 py-5 bg-white text-slate-900 text-lg font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50 flex items-center gap-2">
              양형자료 안내
            </Link>
            <Link to="/legal/education/prevention" className="px-10 py-5 bg-white text-slate-900 text-lg font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50 flex items-center gap-2">
              재범방지교육 안내
            </Link>
          </div>

          <div className="mt-16 flex items-center gap-8 border-t border-slate-200 pt-8">
            <div>
              <div className="text-3xl font-bold text-slate-900">100%</div>
              <div className="text-sm text-slate-500 font-medium">비밀보장 원칙</div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <div className="text-3xl font-bold text-slate-900">10+</div>
              <div className="text-sm text-slate-500 font-medium">전문가 그룹</div>
            </div>
            <div className="w-px h-10 bg-slate-200"></div>
            <div>
              <div className="text-3xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-500 font-medium">긴급 상담 지원</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="relative z-10 rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl border-4 lg:border-8 border-white">
            <img 
              src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/4a50ee1d8c22f9992951cf64c1105d47.png" 
              alt="Professional Counseling" 
              className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
          
          {/* Floating Cards - Hidden on mobile for better focus */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 p-4 lg:p-6 bg-white rounded-2xl lg:rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[180px] lg:max-w-[240px] hidden sm:block"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="font-bold text-slate-900 text-sm lg:text-base">신뢰와 보안</span>
            </div>
            <p className="text-[10px] lg:text-xs text-slate-500 leading-relaxed">모든 상담 기록은 암호화되어 철저히 보호됩니다.</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 p-4 lg:p-6 bg-slate-900 text-white rounded-2xl lg:rounded-3xl shadow-2xl z-20 max-w-[180px] lg:max-w-[240px] hidden sm:block"
          >
            <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Scale className="w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="font-bold text-sm lg:text-base">법적 조력</span>
            </div>
            <p className="text-[10px] lg:text-xs text-slate-400 leading-relaxed">전문가 소견서 및 양형자료 준비를 완벽히 지원합니다.</p>
          </motion.div>

          {/* Decorative Circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-slate-200 rounded-full -z-10 opacity-50"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-slate-200 rounded-full -z-10 opacity-30"></div>
        </motion.div>
      </div>
    </div>
    
    {/* Background Gradients */}
    <div className="absolute top-0 right-0 w-1/2 h-full -z-10 opacity-20 pointer-events-none">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
    </div>
  </section>
);

const HomeIntro = () => (
  <section className="py-32 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
        <div className="relative">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
              <img src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] shadow-xl" referrerPolicy="no-referrer" />
              <div className="p-8 bg-indigo-600 rounded-[32px] text-white">
                <h4 className="text-3xl font-bold mb-2">10+</h4>
                <p className="text-indigo-100 text-sm">성범죄 상담 특화 경력</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-8 bg-slate-100 rounded-[32px]">
                <h4 className="text-3xl font-bold text-slate-900 mb-2">1,200+</h4>
                <p className="text-slate-500 text-sm">누적 상담 케이스</p>
              </div>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600" className="rounded-[32px] shadow-xl" referrerPolicy="no-referrer" />
            </div>
          </div>
          {/* Decorative element */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-50 rounded-full blur-[100px] opacity-50"></div>
        </div>

        <div>
          <span className="text-[#4F46E5] font-bold tracking-widest uppercase text-sm mb-6 block">Our Philosophy</span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
            우리는 왜 <br />
            <span className="text-[#4F46E5]">성범죄 심리</span>에 <br />
            집중하는가?
          </h2>
          <div className="space-y-8">
            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                <Zap className="w-8 h-8 text-[#4F46E5]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">재범 방지가 최고의 피해자 보호입니다</h4>
                <p className="text-slate-500 leading-relaxed">단순한 처벌은 일시적인 격리일 뿐입니다. 근본적인 심리 구조를 교정하여 다시는 같은 잘못을 반복하지 않게 하는 것이 우리 센터의 존재 이유입니다.</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                <Users className="w-8 h-8 text-[#4F46E5]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">비난보다는 변화의 가능성을 믿습니다</h4>
                <p className="text-slate-500 leading-relaxed">우리는 내담자를 비난하는 심판자가 아닙니다. 내담자가 자신의 문제를 직시하고, 건강한 사회 구성원으로 복귀할 수 있도록 돕는 전문 가이드입니다.</p>
              </div>
            </div>
            <div className="flex gap-6 group">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                <ShieldCheck className="w-8 h-8 text-[#4F46E5]" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">객관적 데이터와 임상 경험의 조화</h4>
                <p className="text-slate-500 leading-relaxed">수많은 케이스를 통해 축적된 데이터와 고도화된 심리 평가 도구를 활용하여, 가장 효과적인 교정 솔루션을 제공합니다.</p>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <Link to="/about/intro" className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2">
              센터 소개 더보기 <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Expert" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                +12
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "전문성", 
            desc: "성범죄 교정 치료에 특화된 임상심리사 및 범죄심리학자들로 구성된 전문 팀이 함께합니다.",
            icon: Star
          },
          { 
            title: "신뢰성", 
            desc: "법원 및 수사기관에서 인정받는 객관적인 평가 도구와 공신력 있는 소견서를 제공합니다.",
            icon: ShieldCheck
          },
          { 
            title: "비밀성", 
            desc: "철저한 익명 보장과 암호화된 기록 관리를 통해 내담자의 프라이버시를 완벽하게 보호합니다.",
            icon: Lock
          }
        ].map((item, idx) => (
          <div key={idx} className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100/50 transition-all group">
            <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <item.icon className="w-8 h-8 text-[#4F46E5]" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const HomeExperts = () => (
  <section className="py-32 bg-slate-50 relative overflow-hidden">
    {/* Decorative background text */}
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
      <div className="text-[20vw] font-black uppercase leading-none">PROFESSIONAL</div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <span className="text-[#4F46E5] font-bold tracking-widest uppercase text-sm mb-6 block">Expert Group</span>
          <h2 className="text-4xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter leading-tight">
            국내 최고 수준의 <br />
            <span className="text-[#4F46E5]">성범죄 특화</span> 전문가
          </h2>
          <p className="text-xl text-slate-500 leading-relaxed font-medium">
            단순 심리상담사가 아닌, 범죄 심리와 행동 교정에 특화된 임상 전문가들이 당신의 변화를 책임집니다.
          </p>
        </div>
        <Link to="/about/experts" className="px-10 py-5 bg-white text-slate-900 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
          전체 전문가 보기
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {[
          { 
            name: "윤영준 원장", 
            role: "대표원장 / 상담학 박사", 
            tags: ["성범죄 교정 특화", "국제 임상최면치료사"],
            desc: "동국대 심리상담 석사 및 로드랜드대 상담학 박사 학위를 보유한 심리치료 전문가입니다. 미국최면사고시위원회(ACHE) 국제 의학최면치료사로서 뇌인지과학과 심리치료를 결합한 고도의 교정 프로그램을 운영합니다.",
            image: "https://tpqens1j9138.edge.naverncp.com/MNiExO50AC?src=https%3A%2F%2Fpage24.app%2Fapi%2Ffile%2FmodooImgPasre%3FsiteId%3Dcriminalmhs%26image_url%3Dhttps%3A%2F%2F9tsiiw6i9140.edge.naverncp.com%2Ffiles%2Fcriminalmhs%2F202507%2Ffffbec7c7fc9a06e84210f84e37366dc.jpg%26mcode%3D1112&type=m&w=1980&h=1980&ttype=png" 
          },
          { 
            name: "소윤주 부원장", 
            role: "부원장 / 기능의학·최면 전문가", 
            tags: ["기능의학", "최면전문가", "MHS전문가"],
            desc: "원광대 의대 출신의 기능의학 전문가이자 최면 치료 전문가입니다. 몸과 마음의 통합적 치유를 위해 기능의학, 명상, 심신정화 식이요법을 결합한 독창적인 MHS 프로그램을 운영합니다.",
            image: "https://mhsjoy.mycafe24.com/wp-content/uploads/2024/05/KakaoTalk_20240521_123825759.jpg" 
          },
          { 
            name: "허선무 변호사", 
            role: "변호사 / 성범죄 전문", 
            tags: ["사법시험 54회", "성범죄 전문"],
            desc: "사법시험 54회 합격 및 사법연수원(44기)을 수료한 법률 전문가입니다. 창원지방법원 조정위원, 창원지방검찰청 형사조정위원, 창원지방법원 법인파산관재인, 대한법률구조공단 창원지부 구조위원 등을 역임하며 대한변호사협회에 등록된 성범죄 전문 변호사로 활동하고 있습니다.",
            image: "https://www.soullaw.co.kr/images/sub/member/member_view23.jpg" 
          }
        ].map((expert, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.8 }}
            className="group bg-white rounded-[48px] overflow-hidden shadow-sm hover:shadow-3xl transition-all border border-slate-100"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img 
                src={expert.image} 
                alt={expert.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {expert.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold rounded-full uppercase tracking-wider border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{expert.name}</h3>
                <p className="text-indigo-300 font-bold text-sm uppercase tracking-widest">{expert.role}</p>
              </div>
            </div>
            <div className="p-12">
              <p className="text-slate-500 text-sm leading-relaxed mb-10 font-medium">
                {expert.desc}
              </p>
              <button className="w-full py-5 rounded-2xl bg-slate-50 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                상담 예약하기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const CoreServices = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">전문 특화 프로그램</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          단순한 대화가 아닌, 과학적 근거에 기반한 구조적 개입을 통해 확실한 변화를 이끌어냅니다.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: Users, title: "성범죄 가해자 심리상담", desc: "사건 전 불안, 충동조절 실패 분석 및 인지왜곡 교정", color: "bg-blue-50 text-blue-600" },
          { icon: Zap, title: "디지털 성범죄", desc: "도파민-충동 루프 해체 및 피해자 비가시화 문제 해결", color: "bg-purple-50 text-purple-600" },
          { icon: AlertCircle, title: "성도착/행동교정", desc: "공연음란, 특정행동 집착 등 행동 교정 프로그램", color: "bg-amber-50 text-amber-600" },
          { icon: Lock, title: "성중독/행동중독", desc: "음란물, 섹스 중독 등 자극-행동 루프 완벽 해체", color: "bg-rose-50 text-rose-600" },
        ].map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 rounded-3xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:shadow-2xl hover:shadow-slate-200/50 transition-all"
          >
            <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-6`}>
              <service.icon className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
            <p className="text-slate-500 leading-relaxed text-[15px]">{service.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const LegalSection = () => (
  <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="text-[#818CF8] font-bold tracking-widest uppercase text-sm mb-4 block">Sentencing Materials</span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8 tracking-tight leading-tight">
            법원·검찰 제출용<br />
            <span className="text-[#818CF8]">전문 양형자료</span> 지원
          </h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            심리치료는 단순한 반성을 넘어, 재범 위험성이 현저히 낮아졌음을 입증하는 가장 강력한 객관적 자료입니다. 전문가의 소견서와 평가 보고서로 당신의 변화를 증명하세요.
          </p>
          
          <div className="space-y-6 mb-12">
            {[
              "재범위험성/인지왜곡/충동성 정밀 평가",
              "상담확인서 및 전문가 소견서 발급",
              "책임 인식 기반 반성문/진술서 코칭",
              "변호사 협업 통합 대응 프로세스"
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4 text-white" />
                </div>
                <span className="text-slate-200 font-medium">{item}</span>
              </div>
            ))}
          </div>
          
          <Link to="/legal/info" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-all">
            양형자료 상세 안내
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
        
        <div className="relative">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                <Gavel className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-xl">양형자료 패키지</h4>
                <p className="text-sm text-slate-400">법적 효력을 갖춘 전문 문서 지원</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-slate-300">상담 확인서</span>
                <span className="text-xs font-bold text-indigo-400 uppercase">Available</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-slate-300">전문가 소견서</span>
                <span className="text-xs font-bold text-indigo-400 uppercase">Available</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-slate-300">재범위험성 평가서</span>
                <span className="text-xs font-bold text-indigo-400 uppercase">Available</span>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <span className="text-slate-300">반성문 가이드</span>
                <span className="text-xs font-bold text-indigo-400 uppercase">Available</span>
              </div>
            </div>
          </div>
          
          {/* Decorative Glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -z-10"></div>
        </div>
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 tracking-tight">상담 진행 절차</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          체계적인 단계를 통해 당신의 심리 구조를 분석하고 최적의 교정 솔루션을 제공합니다.
        </p>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
          {[
            { step: "01", title: "문의/접수", desc: "전화 또는 온라인을 통한 초기 상담 예약", icon: MessageSquare },
            { step: "02", title: "초기 평가", desc: "심리 상태 및 사건 구조 정밀 진단", icon: ClipboardCheck },
            { step: "03", title: "프로그램 설계", desc: "개인별 맞춤형 교정 개입 계획 수립", icon: FileText },
            { step: "04", title: "집중 치료", desc: "인지왜곡 교정 및 충동 차단 훈련", icon: Zap },
            { step: "05", title: "사후 관리", desc: "재발 방지 루틴 점검 및 지속 관리", icon: ShieldCheck },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all text-center">
              <div className="w-12 h-12 rounded-full bg-[#4F46E5] text-white flex items-center justify-center font-bold text-sm mx-auto mb-6">
                {item.step}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 pt-20 pb-12 relative z-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6 relative z-10">
            <Scale className="w-6 h-6 text-[#4F46E5]" />
            <span className="text-xl font-bold text-slate-900">성범죄심리상담치료센터창원</span>
          </Link>
          <div className="text-slate-500 text-sm leading-relaxed mb-6 space-y-2">
            <p>창원 지역 최고의 성범죄 특화 심리치료 전문 기관입니다. 철저한 비밀 보장과 전문적인 개입을 통해 재발 없는 삶을 지원합니다.</p>
            <div className="pt-2 space-y-1">
              <p className="flex items-center gap-2"><MapPin className="w-4 h-4" /> 경남 창원시 마산회원구 석전북11길 17 2층</p>
              <p className="flex items-center gap-2"><PhoneCall className="w-4 h-4" /> {CONTACT_PHONE}</p>
            </div>
          </div>
          <div className="flex gap-4 relative z-10">
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#4F46E5] hover:text-white transition-all cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
            </a>
            <a 
              href={`tel:${CONTACT_PHONE}`}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#4F46E5] hover:text-white transition-all cursor-pointer"
            >
              <PhoneCall className="w-5 h-5" />
            </a>
          </div>
        </div>

        {NAV_STRUCTURE.slice(0, 3).map((item) => (
          <div key={item.title}>
            <h4 className="text-slate-900 font-bold mb-6">{item.title}</h4>
            <ul className="space-y-4">
              {item.children?.map((child) => (
                <li key={child.title}>
                  <Link 
                    to={child.href} 
                    className="text-slate-500 text-sm hover:text-[#4F46E5] transition-colors block py-1 relative z-10 cursor-pointer"
                  >
                    {child.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900">Terms of Service</a>
          <a href="#" className="hover:text-slate-900">Cookie Policy</a>
        </div>
        <p className="text-slate-400 text-xs">
          © 2026 성범죄심리상담치료센터창원. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- Pages ---

const WorkplaceCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">직장과 학교는 단순한 공간이 아닙니다. 나의 경력과 미래, 사회적 신뢰가 연결된 공간입니다.</p>
            <p>그곳에서 사건이 발생했다는 사실만으로도 이미 큰 불안과 수치심, 두려움, 억울함을 동시에 경험하게 됩니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“왜 이렇게까지 커졌을까…”</p>
              <p>“나는 그런 의도가 아니었는데…”</p>
              <p>“앞으로 직장은? 학교는? 인생은 어떻게 되는 걸까…”</p>
            </div>
            <p>저희는 그 마음부터 이해합니다. 직장·학교 사건은 신분·평판·경력에 직접적인 영향을 주기 때문에 심리적 충격이 훨씬 크게 작용합니다.</p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/8117b97c4f504f2544908af2745f2723.png" 
            alt="Workplace Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-bold italic">"사건의 맥락과 관계의 구조를 전문적으로 분석합니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-4">주요 사건 유형</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>• 직장 내 성희롱·성추행 신고</li>
            <li>• 교수–학생 간 부적절한 관계</li>
            <li>• 동료·상사와의 사적 메시지 문제</li>
            <li>• 교내 성비위 조사</li>
            <li>• 술자리 이후 오해 및 진술 충돌</li>
          </ul>
        </div>
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
          <h4 className="font-bold text-slate-900 mb-4">흔히 겪는 심리 상태</h4>
          <ul className="space-y-2 text-sm text-slate-500">
            <li>• 극심한 불안, 공황, 수면장애</li>
            <li>• 억울함과 분노, 자책</li>
            <li>• 반복적인 상황 재생(플래시백)</li>
            <li>• 직장·학교 복귀에 대한 공포</li>
            <li>• 주변 시선에 대한 과도한 위축</li>
          </ul>
        </div>
        <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
          <h4 className="font-bold text-slate-900 mb-4">사건의 특수성</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            법적 문제와 함께 ‘조직 내 징계’가 동시에 진행된다는 점이 가장 큰 특징입니다. 저희는 사건의 맥락, 관계의 구조, 감정의 흐름을 전문적으로 분석합니다.
          </p>
        </div>
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          직장·학교 사건은 ‘성 문제’이기도 하지만 동시에 <br />
          관계 경계와 권력 구조에 대한 이해 부족 문제이기도 합니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "사건 구조 분석", icon: Search },
            { title: "재발 방지 구조 확립", icon: ShieldCheck },
            { title: "인지 왜곡 교정", icon: Zap },
            { title: "심리적 안정 회복", icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
              <item.icon className="w-8 h-8 text-indigo-400 mx-auto mb-6" />
              <h4 className="text-xl font-bold">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. 양형자료 및 징계 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 및 징계 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>직장·학교 사건은 형사 절차뿐 아니라 <span className="font-bold text-slate-900">내부 징계위원회, 인사위원회, 교권·학폭위원회</span> 등이 동시에 진행될 수 있습니다.</p>
            <p>따라서 양형자료 역시 단순 반성문 수준으로는 부족합니다. 판단하는 기관이 궁금해하는 것은 단 하나, “이 사람이 다시 이런 행동을 할 가능성이 있는가?”입니다. 저희는 감정적인 글이 아니라 구조적이고 설득력 있는 자료를 준비합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {[
                { title: "사건 이해 및 분석", desc: "관계 구조 및 맥락 분석" },
                { title: "재발 방지 계획", desc: "구체적이고 실천적인 전략" },
                { title: "심리평가 소견", desc: "전문가 진단 및 평가" },
                { title: "상담 참여 증빙", desc: "실질적 노력의 기록" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900 mb-2">✔ {item.title}</div>
                  <div className="text-sm text-slate-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">이런 분들께 권합니다</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 직장 내 성희롱 신고를 받은 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 학교 조사위원회 출석 예정인 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 교수·강사·교사로 징계 절차 중인 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 억울함과 불안을 동시에 겪는 분</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>

    <section className="bg-slate-50 p-12 rounded-[48px]">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold text-slate-900 mb-12">저희 센터의 원칙</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "비난하지 않습니다", desc: "있는 그대로의 사실을 직시합니다." },
            { title: "객관적으로 분석합니다", desc: "맥락과 구조를 파헤칩니다." },
            { title: "재발 방지 중심", desc: "미래의 안전을 최우선으로 합니다." },
            { title: "실질적 도움", desc: "설득력 있는 자료를 만듭니다." }
          ].map((item, idx) => (
            <div key={idx} className="text-center">
              <div className="text-indigo-500 font-bold mb-2">{item.title}</div>
              <p className="text-slate-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

const StalkingCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 분석 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태 분석
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">스토킹 및 주거침입 사건은 단순한 감정 문제로 시작되었을 수 있지만, 법적으로는 매우 무겁게 다뤄지는 사안입니다.</p>
            <p>많은 내담자분들이 이렇게 말씀하십니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“좋아하는 마음이었는데 이렇게까지 될 줄 몰랐습니다.”</p>
              <p>“상대가 오해한 것 같습니다.”</p>
              <p>“헤어진 뒤 감정이 정리되지 않았습니다.”</p>
              <p>“한 번 찾아간 것뿐인데 범죄가 될 줄 몰랐습니다.”</p>
            </div>
            <p>이러한 사건은 집착, 거절 수용의 어려움, 분리불안, 왜곡된 기대감 등이 복합적으로 작용한 결과인 경우가 많습니다. 우리 센터는 실질적인 재발 방지와 법적 대응을 함께 고려하는 구조화된 개입을 진행합니다.</p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/3c964b98d9be3d76c9a43b274660a27e.png" 
            alt="Stalking Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-bold italic">"감정의 왜곡을 바로잡고, 법적 대응과 심리 회복을 함께합니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "관계 단절 거부", desc: "“이대로 끝날 수 없다”는 강한 집착과 오해" },
          { title: "정서적 의존", desc: "관계 단절 시 극심한 공허감과 분리불안" },
          { title: "왜곡된 합리화", desc: "“만나서 이야기하면 해결된다”는 생각" },
          { title: "통제력 저하", desc: "밤 시간대 감정 증폭 및 음주 후 연락/방문" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          스토킹 및 주거침입 사건은 재발 위험성을 낮추는 구체적 개입이 필요합니다. <br />
          단순 상담이 아닌 구조화된 재범방지 프로그램을 운영합니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "집착/왜곡 사고 교정", icon: Zap },
            { title: "감정/충동 통제 훈련", icon: ShieldCheck },
            { title: "정서적 독립성 회복", icon: Users },
            { title: "재범 방지 행동 계획", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 text-center">
              <item.icon className="w-8 h-8 text-indigo-400 mx-auto mb-6" />
              <h4 className="text-xl font-bold">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>법원은 <span className="font-bold text-slate-900">재범 가능성, 피해자에 대한 인식 변화, 접근 통제 가능성</span> 등을 중요하게 봅니다.</p>
            <p>형식적인 반성문이 아니라 구체적인 변화 과정이 입증되어야 합니다. 스토킹 사건은 “계속될 가능성”이 가장 중요한 판단 기준이 되므로, 재발 가능성이 구조적으로 낮아졌다는 점을 전문적으로 입증하는 것이 핵심입니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { title: "심리 분석 보고", desc: "사건 당시 심리 구조 분석" },
                { title: "상담 경과 보고", desc: "실질적인 변화 과정 기록" },
                { title: "재범 방지 계획", desc: "구체적인 행동 지침 수립" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900 mb-2">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">이런 분들께 권합니다</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 헤어진 연인에게 반복 연락한 경우</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 상대 주거지 인근을 방문한 경우</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 차단 이후에도 연락을 시도한 경우</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 감정이 조절되지 않아 찾아간 경우</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>

    <section className="bg-indigo-50 p-12 rounded-[48px] text-center">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">당신은 지금 두려울 수 있습니다</h3>
      <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
        경찰 조사, 접근금지, 주변 시선... 머리가 하얘지는 것이 정상입니다. <br />
        하지만 중요한 것은 지금부터의 대응 방식입니다. 심리 구조를 정확히 이해하고 재발 방지 계획을 세우면 결과는 달라질 수 있습니다.
      </p>
    </section>
  </div>
);

const JuvenileCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 분석 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태 분석
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">아동·청소년 관련 사건은 법적·사회적 파장이 크고, 수사 과정 또한 매우 엄격하게 진행됩니다.</p>
            <p>사건에 연루된 많은 분들이 이렇게 말씀하십니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“이렇게까지 커질 줄 몰랐습니다.”</p>
              <p>“단순한 대화라고 생각했습니다.”</p>
              <p>“상대가 미성년자인 줄 몰랐습니다.”</p>
              <p>“순간적인 충동이었고, 깊이 생각하지 못했습니다.”</p>
            </div>
            <p>지금 가장 힘든 것은 법적 처벌의 두려움, 그리고 동시에 가족과 사회에 대한 죄책감, 수치심, 혼란일 것입니다. 저희 센터는 비난이 아닌 사실 기반 분석과 심리 구조 이해를 통해, 당신이 현재 상황을 정리하고 재발을 막을 수 있도록 돕습니다.</p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/5b23ae94a4d182dd2f6590a7e39c8e28.png" 
            alt="Juvenile Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-bold italic">"행동을 가능하게 만든 심리 구조를 분석하지 않으면, 재발 방지는 불가능합니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { 
            title: "① 인지 왜곡", 
            items: ["“상대가 동의했다.”", "“요즘은 다 이런다.”", "“실제 접촉은 없었다.”", "“사진만 본 건데 큰 문제인가?”"] 
          },
          { 
            title: "② 충동 및 자극 의존", 
            items: ["음주 후 반복되는 행동", "야동·음란채팅 중독", "스트레스 해소 방식의 왜곡", "디지털 환경 속 점진적 둔감화"] 
          },
          { 
            title: "③ 정서적 결핍", 
            items: ["인정 욕구 및 관계 단절감", "통제감 상실", "현실 관계에서의 좌절", "왜곡된 친밀감 추구"] 
          }
        ].map((group, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4">{group.title}</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              {group.items.map((item, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-indigo-400">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          저희 센터의 목표는 단순한 “반성문 작성”이 아닙니다. <br />
          진짜 목표는 재범 방지와 심리 구조 교정입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "인지 왜곡 교정", icon: Zap },
            { title: "충동 조절 훈련", icon: ShieldCheck },
            { title: "성적 자극 재구조화", icon: Search },
            { title: "정서 회복 및 자기통제", icon: Users }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
              <item.icon className="w-8 h-8 text-indigo-400 mx-auto mb-4" />
              <h4 className="font-bold">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-center">
          <p className="text-lg leading-relaxed">
            저희는 상담 과정을 통해 <br />
            <span className="text-white font-bold">“나는 왜 그 행동을 했는가?” → “다시는 하지 않기 위해 무엇을 바꿀 것인가?”</span> <br />
            이 질문에 구체적으로 답하도록 돕습니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응 (아동청소년법 특화)
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>아동청소년법 사건은 <span className="font-bold text-slate-900">재범 위험성 판단</span>이 핵심 요소입니다.</p>
            <p>저희 센터는 단순한 형식적 문서가 아니라, 객관적 심리 변화와 구조적 개선을 보여주는 전문적 심리 보고를 제공합니다.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {[
                { title: "심리 평가", desc: "객관적 지표를 통한 진단" },
                { title: "변화 과정 기록", desc: "상담 참여 및 인식 변화" },
                { title: "재범방지 계획", desc: "구체적이고 실천적인 전략" }
              ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="font-bold text-slate-900 mb-2">{item.title}</div>
                  <div className="text-xs text-slate-500">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">이런 분들께 권합니다</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 수사 중 불안과 공황을 겪는 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 재범이 두려운 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 양형자료 준비가 필요한 분</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 성적 충동을 통제하고 싶은 분</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const TongmaeumCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">통신매체이용음란 사건은 대부분 온라인 공간에서 발생합니다.</p>
            <p>상담실에서 많은 분들이 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“장난처럼 시작했습니다.”</p>
              <p>“상대가 불쾌할 거라고 깊이 생각하지 못했습니다.”</p>
              <p>“온라인이라 현실과 다르게 느껴졌습니다.”</p>
            </div>
            <p>디지털 환경은 익명성과 거리감을 제공합니다. 이 거리감은 순간적으로 공감 기능을 약화시키고, 충동을 빠르게 행동으로 연결시킬 수 있습니다.</p>
            <p className="bg-indigo-50 p-6 rounded-2xl text-indigo-900 font-medium">
              사건을 정확히 이해하는 것이 재발 방지의 출발점입니다. 저희 센터는 그 당시의 심리 상태를 구조적으로 분석합니다.
            </p>
          </div>
        </div>
        <div className="relative lg:col-span-1 max-w-sm mx-auto lg:mx-0">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/f178f4a48cb6a50a5a1352119518e6e3.png" 
            alt="Tongmaeum Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-6 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-[200px]">
            <p className="text-slate-900 text-sm font-bold italic">"중요한 것은 환경을 피하는 것이 아니라 그 안에서 스스로를 통제할 수 있는 능력을 갖추는 것입니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "작동 감정 분석", desc: "당시 어떤 감정이 작동했는지" },
          { title: "행동 정당화 기제", desc: "어떤 생각이 행동을 정당화했는지" },
          { title: "반복 가능성 탐색", desc: "반복 가능성은 어디에서 비롯되는지" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          통신매체이용음란 문제의 핵심은 <br />
          “다시는 같은 상황에서 같은 선택을 하지 않도록 만드는 것”입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "왜곡된 인식 교정", icon: Zap },
            { title: "디지털 충동 관리 훈련", icon: ShieldCheck },
            { title: "공감 능력 회복", icon: Users },
            { title: "자극-행동 구조 분석", icon: Search },
            { title: "현실적 재발 방지 계획", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <item.icon className="w-8 h-8 text-indigo-400 mb-6" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-center">
          <p className="text-lg leading-relaxed">
            후회만으로는 구조가 바뀌지 않을 수 있습니다. <br />
            막연한 다짐이 아니라 구조적 변화가 필요합니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>통신매체이용음란 사건에서는 <span className="font-bold text-slate-900">온라인에서의 인식 변화와 책임 인식의 성숙</span>이 중요합니다.</p>
            <p>저희 센터는 상담을 통해 형성된 변화의 흐름을 차분하고 전문적인 기준 안에서 정리합니다. 형식적인 반성이 아니라 실질적인 인식 전환과 재발 방지 의지가 자연스럽게 드러나도록 준비합니다.</p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-8">
              <p className="text-slate-900 font-medium italic">이러한 과정은 현재의 상태와 앞으로의 가능성을 설명하는 자료로서 의미 있게 참고될 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">전문적 정리</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              변화의 흐름을 전문적인 기준 안에서 정리하여 실질적인 인식 전환을 보여줍니다.
            </p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const DeepfakeCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">딥페이크 및 합성물 사건은 직접적인 접촉이 없다는 이유로 처음에는 심각하게 인식되지 않는 경우가 많습니다.</p>
            <p>많은 내담자들이 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“실제 촬영은 아니었습니다.”</p>
              <p>“장난처럼 시작했습니다.”</p>
              <p>“온라인에서 흔히 보이는 일이라고 생각했습니다.”</p>
            </div>
            <p>그러나 시간이 지나면서 상황의 무게를 체감하게 됩니다. 딥페이크·합성물은 기술의 문제처럼 보이지만 실제로는 심리 구조의 문제일 수 있습니다.</p>
            <p className="bg-indigo-50 p-6 rounded-2xl text-indigo-900 font-medium">
              특히 온라인 환경은 “가상”이라는 착각을 만들지만, 결과는 현실에 영향을 줍니다. 사건 이후 남는 것은 강한 불안과 자기 의문입니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/67d97b84c9f7063f52c317540fa1688a.png" 
            alt="Deepfake Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-bold italic">"정확한 이해가 변화의 시작입니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "현실감 약화", desc: "디지털 공간에서의 현실감 약화" },
          { title: "대상 거리감", desc: "대상에 대한 심리적 거리감" },
          { title: "인지 왜곡", desc: "‘직접적인 피해가 아닐 것’이라는 왜곡" },
          { title: "자극 추구 패턴", desc: "자극 추구 성향과 반복 패턴" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          딥페이크·합성물 문제의 핵심은 기술을 멈추는 것이 아니라 <br />
          왜곡된 인식과 충동 구조를 교정하는 것입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "왜곡된 인지 교정", icon: Zap },
            { title: "디지털 책임 인식 강화", icon: ShieldCheck },
            { title: "공감 능력 회복", icon: Users },
            { title: "자극-행동 구조 분석", icon: Search },
            { title: "재발 방지 계획 수립", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <item.icon className="w-8 h-8 text-indigo-400 mb-6" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-center">
          <p className="text-lg leading-relaxed">
            충동은 억제만으로는 사라지지 않습니다. 이해하고 재구성해야 약화됩니다. <br />
            막연한 다짐이 아니라 구조적 변화가 필요합니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>사건 이후 많은 분들이 느끼는 것은 불안과 막막함입니다. <span className="font-bold text-slate-900">“내가 어떤 노력을 하고 있다는 것을 과연 어떻게 전달할 수 있을까.”</span></p>
            <p>중요한 것은 말의 길이가 아니라 과정의 존재입니다. 상담은 단순한 참여가 아니라 시간을 들여 이어가는 변화의 흐름입니다. 그 흐름은 스스로에게도, 그리고 외부에서도 확인 가능한 형태로 남을 필요가 있습니다.</p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-8">
              <p className="text-slate-900 font-medium italic">시간을 들여 이어온 상담의 과정은 그 자체로 현재의 상태와 앞으로의 가능성을 설명하는 근거가 되며, 이러한 정리된 변화의 흐름은 판단 과정에서 의미 있게 참고될 수 있습니다.</p>
            </div>
            <p className="text-xl font-bold text-[#4F46E5] mt-8">결국 중요한 것은 말이 아니라 과정이며, 그 과정이 정리될 때 변화는 더욱 설득력을 갖습니다.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">안전한 출발</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              딥페이크·합성물 사건은 “가상이었다”는 이유로 가볍게 끝나지 않습니다. 그 선택의 구조를 이해하고 다시는 같은 판단을 반복하지 않도록 준비하는 것이 진짜 대응입니다.
            </p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const FilmingCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">최근 불법촬영 사건의 상당수는 휴대전화 카메라를 이용한 ‘카촬’ 형태로 발생합니다.</p>
            <p>많은 내담자들이 상담실에서 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“그때는 들킬 거라고 생각하지 못했습니다.”</p>
              <p>“순간적인 호기심이었습니다.”</p>
              <p>“심각성을 제대로 인식하지 못했습니다.”</p>
              <p>“지금 생각하면 왜 그랬는지 스스로도 이해가 안 됩니다.”</p>
            </div>
            <p>카촬은 대부분 계획적 범죄라기보다 짧은 순간의 충동과 왜곡된 판단에서 시작됩니다. 디지털 환경은 판단을 빠르게 만들고, 충동을 더 쉽게 행동으로 연결시킵니다.</p>
            <p className="bg-indigo-50 p-6 rounded-2xl text-indigo-900 font-medium">
              사건을 정확히 이해하는 것이 재발 방지의 시작입니다. 저희 센터는 그 순간의 심리 구조를 함께 정리합니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/a2e502646d4ab5610566f267760a51ca.png" 
            alt="Filming Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-bold italic">"환경을 없애는 것이 아니라 그 안에서 통제 가능한 자신을 만드는 것이 목표입니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "자기 합리화", desc: "‘한 번쯤은 괜찮겠지’라는 생각" },
          { title: "거리감/비현실감", desc: "화면 속 대상에 대한 거리감" },
          { title: "현실감 약화", desc: "디지털 환경에서의 판단력 저하" },
          { title: "즉각적 반응", desc: "자극에 대한 즉각적 충동 반응" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          카촬 문제의 핵심은 단순한 반성이 아니라 반복 가능성의 차단입니다. <br />
          디지털 자극은 계속 존재합니다. 환경을 피하는 것이 아니라 통제력을 갖추는 것이 핵심입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "인지 및 합리화 교정", icon: Zap },
            { title: "디지털 충동 관리 훈련", icon: ShieldCheck },
            { title: "자극-행동 구조 분석", icon: Search },
            { title: "공감 능력 회복", icon: Users },
            { title: "현실적 재발 방지 계획", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <item.icon className="w-8 h-8 text-indigo-400 mb-6" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-center">
          <p className="text-lg leading-relaxed">
            충동은 억누르는 것이 아니라 이해하고 재구성해야 줄어듭니다. <br />
            막연한 다짐이 아니라 구조적인 변화가 필요합니다.
          </p>
          <p className="text-2xl font-bold mt-6 text-indigo-300">
            “다시는 안 하겠다”는 다짐이 실질적인 결과로 이어지는 과정을 만듭니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>사건 이후 많은 분들이 <span className="font-bold text-slate-900">“내가 정말 변화하고 있다는 것을 어떻게 보여줄 수 있을까”</span> 고민합니다.</p>
            <p>저희 센터는 상담 과정을 기반으로 양형자료를 체계적으로 정리합니다. 이는 형식적인 반성문이 아니라 실제 변화의 과정을 담은 자료입니다.</p>
            <p>구체적인 노력과 구조화된 변화는 법원의 양형 판단 과정에서 의미 있게 참고될 수 있습니다.</p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-8">
              <p className="text-slate-900 font-medium">카촬 문제는 “한 번의 실수”로만 정리되기 어렵습니다. 그 순간을 이해하고 다시는 같은 선택을 반복하지 않도록 준비하는 것, 그것이 진짜 대응입니다.</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">변화의 시작</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              혼자 고민하며 불안을 키우기보다 지금 이 시점에서 구조를 정리하는 것이 가장 안전한 선택일 수 있습니다.
            </p>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const MolestationCaseContent = () => (
  <div className="space-y-24">
    {/* 1. 사건 개요 및 심리 상태 */}
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            사건 개요 및 심리 상태
          </h2>
          <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
            <p className="font-bold text-slate-900">강제추행 사건은 단순한 “신체 접촉”의 문제가 아닙니다. <br />그 순간, 무엇이 판단을 흐리게 했는가가 핵심입니다.</p>
            <p>많은 내담자들은 이렇게 말합니다.</p>
            <div className="pl-6 border-l-4 border-slate-200 space-y-2 py-2 italic text-slate-500">
              <p>“의도는 그게 아니었습니다.”</p>
              <p>“분위기를 오해했습니다.”</p>
              <p>“순간적으로 선을 넘었습니다.”</p>
            </div>
            <p>그러나 그 이면에는 감정 조절의 취약성, 성인지 왜곡, 관계 해석의 오류, 충동과 합리화가 동시에 작동한 심리 구조가 존재하는 경우가 많습니다.</p>
            <p className="bg-rose-50 p-6 rounded-2xl text-rose-900 font-medium">
              사건을 정확히 이해하지 못하면 반성은 감정에 머무르고, 변화는 구조로 이어지지 않습니다.
            </p>
          </div>
        </div>
        <div className="relative">
          <img 
            src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/fff22c558386aeb6f29c77afcb70056b.png" 
            alt="Molestation Case Analysis" 
            className="rounded-[40px] shadow-2xl w-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
            <p className="text-slate-900 font-bold italic">"사건을 객관적으로 해부해야 재발 가능성을 낮출 수 있습니다."</p>
          </div>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "상황 인식 왜곡", desc: "상황 인식은 어떻게 왜곡되었는가" },
          { title: "의사 해석 오류", desc: "상대의 의사를 왜 잘못 해석했는가" },
          { title: "감정-충동 연결", desc: "충동은 어떤 감정과 연결되어 있었는가" },
          { title: "반복 위험 요인", desc: "반복 위험 요인은 무엇인가" }
        ].map((item, idx) => (
          <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 text-center">
            <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 2. 상담 및 치료 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12 text-center">상담 및 치료 목표</h2>
        <p className="text-xl text-indigo-200 text-center mb-16">
          강제추행 대응의 핵심은 “다시는 같은 상황을 만들지 않는 것”입니다. <br />
          상담은 단순한 반성 유도가 아닙니다. 행동의 구조를 바꾸는 과정입니다.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "성인지 왜곡 교정", icon: Zap },
            { title: "충동 조절 능력 강화", icon: ShieldCheck },
            { title: "감정 조절 및 스트레스 관리", icon: Zap },
            { title: "공감 능력 회복", icon: Users },
            { title: "재발 방지 계획 구체화", icon: ClipboardCheck }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <item.icon className="w-8 h-8 text-indigo-400 mb-6" />
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-indigo-600/20 border border-indigo-500/30 text-center">
          <p className="text-lg leading-relaxed">
            막연한 다짐은 오래가지 않습니다. 구조를 바꾸어야 행동이 바뀝니다. <br />
            상담을 통해 충동이 작동하는 지점을 명확히 알고, 위험 상황을 예측하며, 실제 대응 전략을 훈련합니다.
          </p>
          <p className="text-2xl font-bold mt-6 text-indigo-300">
            이 과정이 있을 때 “다시는 하지 않겠다”는 말이 실질적인 가능성으로 바뀝니다.
          </p>
        </div>
      </div>
    </section>

    {/* 3. 양형자료 대응 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <Gavel className="w-6 h-6" />
        </div>
        양형자료 대응
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="prose prose-lg text-slate-600 max-w-none">
            <p>강제추행 사건에서 중요한 것은 단순한 반성 표현이 아니라 <span className="font-bold text-slate-900">구조적 변화의 근거</span>입니다.</p>
            <p>저희 센터는 상담 과정을 기반으로 양형자료를 체계적으로 정리합니다. 형식적인 문서가 아니라 실질적인 변화 과정을 담은 자료를 준비합니다.</p>
            <p>이는 단순한 방어를 위한 문서가 아니라 사건에 대한 인식 변화와 재발 방지 노력을 객관적으로 정리하는 과정입니다.</p>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-8">
              <p className="text-slate-900 font-medium">상담을 통해 형성된 구체적 변화 과정과 구조화된 재발 방지 계획은 당사자의 책임 인식과 개선 의지를 보다 명확하게 보여줄 수 있으며, 이러한 전문적이고 체계적인 자료는 양형과정에서 매우 의미 있게 참고될 수 있습니다.</p>
            </div>
            <p className="text-xl font-bold text-[#4F46E5] mt-8">중요한 것은 형식이 아니라 실질적인 변화의 내용입니다.</p>
          </div>
        </div>
        <div className="space-y-6">
          <div className="p-8 rounded-3xl bg-indigo-50 border border-indigo-100">
            <h4 className="font-bold text-slate-900 mb-4">전문 대응의 가치</h4>
            <ul className="space-y-4 text-sm text-slate-600">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 행동 원인에 대한 직면</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 재발 방지를 위한 구체적 준비</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" /> 삶의 방향성 재설정</li>
            </ul>
          </div>
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-5 bg-[#4F46E5] text-white text-center font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-100"
          >
            상담 및 자료 준비 시작하기
          </a>
        </div>
      </div>
    </section>
  </div>
);

const RapeCaseContent = () => (
  <div className="space-y-24">
    {/* 2. 사건 개요 설명 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <FileText className="w-6 h-6" />
        </div>
        강간 / 준강간 사건의 특징
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "동의 여부의 핵심성", desc: "사건의 실체적 진실을 가리는 가장 중요한 쟁점은 '동의'의 유무와 그 인식 과정입니다." },
          { title: "복합적 상황 맥락", desc: "음주 상황, 관계의 깊이, 당시의 분위기 등 여러 복합적 요소가 사건 해석에 영향을 미칩니다." },
          { title: "심리적 혼란의 극치", desc: "사건 이후 가해자와 피해자 모두 극심한 심리적 혼란과 인지적 왜곡을 경험하기 쉽습니다." }
        ].map((item, idx) => (
          <div key={idx} className="p-8 rounded-3xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-3">{item.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* 3. 사건 이후 자주 나타나는 심리 상태 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-8 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
          <AlertCircle className="w-6 h-6" />
        </div>
        사건 이후의 심리적 구조
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            title: "극심한 불안과 공포", 
            items: ["수사 및 재판 과정에 대한 압박", "구속 가능성에 대한 두려움", "사회적 지위 및 가족 관계 붕괴 걱정"],
            color: "bg-rose-50 border-rose-100 text-rose-900"
          },
          { 
            title: "수치심과 자기혐오", 
            items: ["\"인생이 끝났다\"는 절망감", "사회적 낙인에 대한 극도의 공포", "자신의 행위에 대한 혼란스러운 감정"],
            color: "bg-slate-50 border-slate-100 text-slate-900"
          },
          { 
            title: "억울함과 분노", 
            items: ["\"상대방도 원했다고 생각했다\"는 주장", "상황 해석의 차이에서 오는 분노", "자신만 가해자가 되었다는 피해의식"],
            color: "bg-amber-50 border-amber-100 text-amber-900"
          },
          { 
            title: "인지 왜곡과 합리화", 
            items: ["동의에 대한 자의적 해석(동의 착각)", "관계 맥락을 통한 행위 정당화", "책임 분산 및 상황 탓으로 돌리기"],
            color: "bg-indigo-50 border-indigo-100 text-indigo-900"
          }
        ].map((group, idx) => (
          <div key={idx} className={`p-8 rounded-[32px] border ${group.color}`}>
            <h4 className="text-xl font-bold mb-6">{group.title}</h4>
            <ul className="space-y-3">
              {group.items.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm opacity-80">
                  <span className="shrink-0">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* 4. 상담 목표 */}
    <section className="bg-slate-900 rounded-[48px] p-12 lg:p-20 text-white">
      <div className="max-w-3xl">
        <h2 className="text-3xl lg:text-4xl font-bold mb-12">본 센터의 개입 목표</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {[
            "사건 발생 당시의 심리구조 정밀 분석",
            "동의 인식 구조의 근본적 재점검",
            "성인지 관점의 왜곡 현상 교정",
            "고위험 상황에서의 충동 통제력 강화",
            "객관적 지표를 통한 재발 위험 차단"
          ].map((goal, idx) => (
            <div key={idx} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center shrink-0 font-bold text-sm">
                {idx + 1}
              </div>
              <p className="font-medium text-slate-200">{goal}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 5. 프로그램 구성 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">단계별 전문 프로그램</h2>
      <div className="space-y-4">
        {[
          { step: "01", title: "초기 위기 안정", desc: "불안 및 공황 관리, 가족 대응 전략 수립, 심리적 안정화" },
          { step: "02", title: "사건 구조 분석", desc: "당시 심리 상태 복기, 음주·흥분 상태 분석, 동의 해석 과정 점검, 인지왜곡 패턴 확인" },
          { step: "03", title: "성인지 교정 개입", desc: "동의 개념의 재구성, 관계 권력 구조 이해, 피해 영향력 인식 강화" },
          { step: "04", title: "충동 통제 훈련", desc: "고위험 상황 차단 전략, 음주 상황 관리, 위험 환경 회피 계획 수립" },
          { step: "05", title: "재발방지 설계", desc: "개인별 트리거 목록화, 대응 루틴 설계, 자기통제 프로토콜 구축" }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
            <div className="text-4xl font-black text-indigo-100 group-hover:text-indigo-500 transition-colors shrink-0">{item.step}</div>
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
              <p className="text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 7. 자주 묻는 질문 */}
    <section>
      <h2 className="text-3xl font-bold text-slate-900 mb-12">자주 �        ) : slug === 'offender' ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">성범죄 가해자 심리상담은 단순한 반성 과정이 아닙니다</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 분들이 성범죄 가해자 심리상담을 <span className="text-slate-900 font-bold">"잘못을 인정하는 과정"</span>이라고 생각하기도 합니다.</p>
                  <p>하지만 실제 성범죄 가해자 심리상담은 그보다 훨씬 넓은 의미를 가지고 있습니다.</p>
                  
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <p className="font-bold text-slate-900">성범죄 가해자 심리상담에서는</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <span>사건이 발생한 상황과 배경을 차분하게 정리하고</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <span>자신의 감정과 행동 패턴을 이해하며</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <span>비슷한 상황이 다시 발생하지 않도록 준비하는 과정이 이루어집니다.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-indigo-600 font-bold">
                    이 과정은 단순히 사건만을 다루는 것이 아니라 앞으로의 삶을 안정적으로 정리하는 과정이기도 합니다.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/44741954c21f7b7bc7e4cb7feee9ef2e.png" 
                  alt="Counseling Session" 
                  className="rounded-[40px] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                  <p className="text-slate-900 font-bold italic">"변화는 구조를 바꿀 때 시작됩니다."</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-10 lg:p-16 shadow-sm border border-slate-100 mb-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-8">성범죄 가해자 심리상담은 변화하려는 의지를 보여주는 과정이기도 합니다</h3>
              <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                <p>사건 이후 어떤 태도를 보이는지는 이후 과정에서 중요한 의미를 가질 수 있습니다.</p>
                <p>사건이 발생한 뒤 자신의 행동을 돌아보고 재발을 방지하려는 노력을 시작하는 것은 <span className="font-bold text-slate-900">개인의 삶을 위해서도 매우 중요한 과정</span>입니다.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <p className="font-bold text-slate-900">실제로 많은 분들이 사건 이후 성범죄 가해자 심리상담을 통해</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                        <span>자신의 행동 원인을 이해하고</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                        <span>충동이나 판단 오류가 발생했던 상황을 분석하며</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                        <span>다시 같은 일이 발생하지 않도록 행동을 교정하는 과정을 시작합니다.</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
                    <p className="text-indigo-900 font-medium">
                      이러한 과정은 단순히 개인의 심리 회복에만 의미가 있는 것이 아니라 <span className="font-bold">변화를 위해 실제로 어떤 노력을 했는지를 보여주는 과정</span>이 되기도 합니다.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-8 border-t border-slate-100">
                  <p>
                    전문 상담기관에서의 성범죄 가해자 심리상담 참여, 교육 과정, 행동 교정 노력 등은 필요할 경우 <span className="font-bold text-indigo-600 underline decoration-2 underline-offset-4">객관적인 자료나 전문가 의견 형태로 정리될 수 있으며 재판 과정에서 비중있게 참고되는 요소가 됩니다.</span>
                  </p>
                  <p>
                    물론 성범죄 가해자 심리상담이 재판의 결과를 직접적으로 결정하는 것은 아닙니다. 그러나 사건 이후 아무런 변화 노력 없이 시간을 보내는 것보다 자신의 행동을 이해하고 재발을 방지하려는 노력을 실제로 시작하는 것은 <span className="font-bold text-slate-900">양형 과정에서 충분히 고려될 수 있는 중요한 요소</span>가 될 수 있습니다.
                  </p>
                  <p className="bg-slate-900 text-white p-8 rounded-2xl">
                    즉, 사건 이후 어떤 태도로 변화 노력을 했는지, 재발 방지를 위해 어떤 과정을 시작했는지는 <span className="text-indigo-300 font-bold">양형 판단 과정에서 의미 있게 반영될 가능성이 높습니다.</span>
                  </p>
                  <p className="text-center font-bold text-xl text-slate-900">
                    따라서 성범죄 가해자 심리상담은 단순히 마음을 정리하는 시간이 아니라 <br className="hidden sm:block" />
                    <span className="text-indigo-600">앞으로의 삶을 다시 정리하고 변화의 과정을 시작하는 첫 단계</span>가 될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">혼자 고민할수록 상황은 더 복잡해질 수 있습니다</h3>
                <p className="text-slate-600 mb-8">사건 이후 많은 분들이 주변에 이야기하지 못한 채 혼자 고민을 이어가게 됩니다.</p>
                <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 space-y-4">
                  <p className="font-bold text-rose-900">하지만 혼자서 생각이 계속 반복되면</p>
                  <ul className="space-y-3 text-rose-800">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>불안이 더 커지거나</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>분노가 더 커지거나</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>상황 판단이 흐려질 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
                <p className="mt-8 text-slate-900 font-bold text-center">
                  전문가와 함께 상황을 정리하면 생각보다 빠르게 마음이 정리되는 경우도 많습니다.
                </p>
              </div>
              <div className="bg-indigo-600 text-white p-10 rounded-[40px] flex flex-col justify-center text-center space-y-8">
                <h3 className="text-3xl font-bold">성범죄 가해자 심리상담은 삶을 다시 정리하는 출발점이 될 수 있습니다</h3>
                <div className="space-y-4 text-lg text-indigo-100">
                  <p>성범죄 가해자 심리상담을 시작하는 것은 자신을 포기하는 것이 아니라 <br />오히려 자신의 삶을 다시 정리하려는 선택입니다.</p>
                  <p>사건 이후의 삶은 아직 끝난 것이 아닙니다.</p>
                  <p className="text-2xl font-black text-white">지금의 선택이 앞으로의 방향을 바꿀 수 있습니다.</p>
                </div>
                <p className="text-indigo-200 font-medium">
                  혼자 고민하기보다 전문가와 함께 상황을 차분히 정리해 보는 것이 도움이 될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        ) : slug === 'paraphilia' ? (
 border border-slate-200 shadow-sm">
                    <div className="font-bold text-slate-900 mb-1">{item.label}</div>
                    <div className="text-sm text-slate-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Goals */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              상담 및 치료 목표
            </h2>
            <div className="space-y-6">
              {[
                { title: "인지 구조 재구성", desc: "성적 대상화 및 왜곡된 성인지 관점을 객관적으로 분석하고 교정합니다." },
                { title: "책임 인식 훈련", desc: "피해자의 고통을 가시화하고 자신의 행동에 대한 진정한 책임을 수용합니다." },
                { title: "재발 방지 루틴 설계", desc: "고위험 상황을 식별하고 충동을 차단할 수 있는 구체적인 행동 지침을 수립합니다." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="text-4xl font-black text-slate-100 shrink-0">0{idx + 1}</div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Program */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <ClipboardCheck className="w-5 h-5" />
              </div>
              프로그램 구성
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-4">초기 집중 개입 (1-4회)</h4>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• 심리 평가 및 사건 구조 분석</li>
                  <li>• 위기 관리 및 정서적 안정화</li>
                  <li>• 인지 왜곡 탐색</li>
                </ul>
              </div>
              <div className="p-8 rounded-3xl border border-slate-100 bg-slate-50">
                <h4 className="font-bold text-slate-900 mb-4">심화 교정 훈련 (5-12회)</h4>
                <ul className="text-sm text-slate-500 space-y-2">
                  <li>• 성인지 감수성 향상 교육</li>
                  <li>• 충동 조절 및 행동 수정</li>
                  <li>• 대인관계 기술 훈련</li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Sticky */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-32 space-y-6">
            <div className="p-8 rounded-3xl bg-[#4F46E5] text-white shadow-xl shadow-indigo-200">
              <h3 className="text-xl font-bold mb-4">양형자료 연계</h3>
              <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                본 프로그램 이수 시, 법원 및 검찰 제출용 전문가 소견서와 재범위험성 평가 보고서 발급이 가능합니다.
              </p>
              <Link to="/legal/info" className="block w-full py-3 bg-white text-[#4F46E5] text-center font-bold rounded-xl hover:bg-indigo-50 transition-colors">
                양형자료 상세 보기
              </Link>
            </div>

            <div className="p-8 rounded-3xl border border-slate-200 bg-white">
              <h3 className="text-lg font-bold text-slate-900 mb-4">상담 문의</h3>
              <div className="space-y-4">
                <a href={`tel:${CONTACT_PHONE}`} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <PhoneCall className="w-5 h-5 text-[#4F46E5]" />
                  <span className="font-bold">{CONTACT_PHONE}</span>
                </a>
                <a 
                  href={NAVER_PLACE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-slate-900 text-white text-center font-bold rounded-2xl hover:bg-slate-800 transition-colors"
                >
                  온라인 상담 신청
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  </motion.div>
);

const TreatmentPage = ({ title, slug }: { title: string; slug: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    {/* Page Header */}
    <div className="relative bg-indigo-600 py-16 lg:py-32 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <img 
          src={`https://picsum.photos/seed/treat-${slug}/1920/1080`} 
          alt="Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-200 font-bold mb-8 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          상담/치료 전체보기
        </Link>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">{title} 프로그램</h1>
        <p className="text-xl text-indigo-100 max-w-2xl leading-relaxed">
          단순한 억제가 아닌, 행동의 근본 원인을 분석하고 심리적 루프를 해체하는 전문 치료 과정입니다.
        </p>
      </div>
    </div>

    {/* Treatment Flow Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">치료 프로세스</h2>
        <p className="text-slate-500">평가부터 재발방지까지, 체계적인 5단계 개입을 진행합니다.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { step: "평가", desc: "심리 상태 및 위험도 정밀 진단", icon: ClipboardCheck },
          { step: "원인 분석", desc: "행동의 심리적 기제 및 루프 파악", icon: Search },
          { step: "교정 개입", desc: "인지 왜곡 교정 및 사고 전환", icon: Zap },
          { step: "훈련", desc: "충동 차단 및 대안 행동 습득", icon: ShieldCheck },
          { step: "재발방지", desc: "지속적인 모니터링 및 루틴 관리", icon: Lock }
        ].map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 text-center hover:bg-white hover:shadow-xl transition-all h-full">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{item.step}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
            {idx < 4 && (
              <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-10">
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* Detailed Content */}
    <div className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {slug === 'addiction' ? (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-12 text-center">왜 성중독 · 행동중독 치료가 필요할까요?</h2>
            
            <div className="bg-white rounded-[40px] p-8 lg:p-16 shadow-xl border border-slate-100 space-y-12">
              <div className="text-center space-y-4">
                <p className="text-2xl font-medium text-slate-400 italic">“이번이 마지막입니다.”</p>
                <p className="text-lg text-slate-600">많은 분들이 그렇게 말합니다. 그리고 또 반복됩니다.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    성중독과 행동중독은 <span className="font-bold text-indigo-600">단순한 의지의 문제가 아닙니다.</span><br />
                    반복된 자극이 뇌에 학습되고, 스트레스와 감정을 처리하는 방식이 왜곡되며 특정 상황에서 통제가 무너지는 구조가 형성됩니다.
                  </p>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    처벌은 행동을 멈추게 할 수는 있습니다. 하지만 <span className="font-bold text-rose-500">충동의 구조까지 바꾸지는 못합니다.</span>
                  </p>
                  <p className="text-lg text-slate-700 font-medium">
                    문제는 한 번의 행동이 아니라 계속 이어지는 패턴입니다.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-6">이런 반복을 겪고 계신가요?</h4>
                  <ul className="space-y-4">
                    {[
                      "멈추고 싶은데 잘 되지 않는다",
                      "술이나 특정 상황에서 반복된다",
                      "후회하면서도 다시 같은 선택을 한다"
                    ].map((text, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2" />
                        <span>{text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm text-slate-500 italic">
                    이것은 도덕성의 문제가 아니라 충동 조절과 감정 처리 시스템의 문제일 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="pt-12 border-t border-slate-100">
                <p className="text-xl text-slate-800 leading-relaxed mb-8">
                  치료는 “하지 말라”는 조언이 아닙니다.<br />
                  <span className="font-bold text-indigo-600">왜 반복되는지, 어디서 통제가 무너지는지, 어떤 왜곡된 인식이 개입하는지</span> 그 구조를 객관적으로 분석하고 교정하는 과정입니다.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-rose-50 rounded-2xl border border-rose-100">
                    <p className="text-rose-800 font-medium">치료받지 않은 충동은 사라지지 않습니다. 잠시 멈췄다가 다른 방식으로 나타날 수 있습니다.</p>
                  </div>
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <p className="text-emerald-800 font-medium">지금 멈추는 선택은 자신을 보호하는 결정입니다.</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white p-10 rounded-[32px] text-center">
                <p className="text-lg text-slate-300 mb-4">저희 센터는 구조를 분석하고, 재발 위험을 낮추며, 다시 통제 가능한 삶으로 돌아갈 수 있도록 돕습니다.</p>
                <p className="text-2xl font-bold">반복을 끝내고 싶다면, 지금이 시작입니다.</p>
              </div>
            </div>
          </div>
        ) : slug === 'offender' ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">성범죄 가해자 심리상담은 단순한 반성 과정이 아닙니다</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 분들이 성범죄 가해자 심리상담을 <span className="text-slate-900 font-bold">"잘못을 인정하는 과정"</span>이라고 생각하기도 합니다.</p>
                  <p>하지만 실제 성범죄 가해자 심리상담은 그보다 훨씬 넓은 의미를 가지고 있습니다.</p>
                  
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <p className="font-bold text-slate-900">성범죄 가해자 심리상담에서는</p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <span>사건이 발생한 상황과 배경을 차분하게 정리하고</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <span>자신의 감정과 행동 패턴을 이해하며</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2.5 shrink-0" />
                        <span>비슷한 상황이 다시 발생하지 않도록 준비하는 과정이 이루어집니다.</span>
                      </li>
                    </ul>
                  </div>
                  
                  <p className="text-indigo-600 font-bold">
                    이 과정은 단순히 사건만을 다루는 것이 아니라 앞으로의 삶을 안정적으로 정리하는 과정이기도 합니다.
                  </p>
                </div>
              <div className="relative">
                <img 
                  src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/44741954c21f7b7bc7e4cb7feee9ef2e.png" 
                  alt="Counseling Session" 
                  className="rounded-[40px] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                  <p className="text-slate-900 font-bold italic">"변화는 구조를 바꿀 때 시작됩니다."</p>
                </div>
              </div>
            </div>

            <div className=");

const EducationPage = ({ title, slug }: { title: string; slug: string }) => {
�� 수 있는 중요한 요소</span>가 될 수 있습니다.
                  </p>
                  <p className="bg-slate-900 text-white p-8 rounded-2xl">
                    즉, 사건 이후 어떤 태도로 변화 노력을 했는지, 재발 방지를 위해 어떤 과정을 시작했는지는 <span className="text-indigo-300 font-bold">양형 판단 과정에서 의미 있게 반영될 가능성이 높습니다.</span>
                  </p>
                  <p className="text-center font-bold text-xl text-slate-900">
                    따라서 성범죄 가해자 심리상담은 단순히 마음을 정리하는 시간이 아니라 <br className="hidden sm:block" />
                    <span className="text-indigo-600">앞으로의 삶을 다시 정리하고 변화의 과정을 시작하는 첫 단계</span>가 될 수 있습니다.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">혼자 고민할수록 상황은 더 복잡해질 수 있습니다</h3>
                <p className="text-slate-600 mb-8">사건 이후 많은 분들이 주변에 이야기하지 못한 채 혼자 고민을 이어가게 됩니다.</p>
                <div className="bg-rose-50 p-8 rounded-3xl border border-rose-100 space-y-4">
                  <p className="font-bold text-rose-900">하지만 혼자서 생각이 계속 반복되면</p>
                  <ul className="space-y-3 text-rose-800">
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>불안이 더 커지거나</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>분노가 더 커지거나</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>상황 판단이 흐려질 수 있습니다.</span>
                    </li>
                  </ul>
                </div>
                <p className="mt-8 text-slate-900 font-bold text-center">
                  전문가와 함께 상황을 정리하면 생각보다 빠르게 마음이 정리되는 경우도 많습니다.
                </p>
              </div>
              <div className="bg-indigo-600 text-white p-10 rounded-[40px] flex flex-col justify-center text-center space-y-8">
                <h3 className="text-3xl font-bold">성범죄 가해자 심리상담은 삶을 다시 정리하는 출발점이 될 수 있습니다</h3>
                <div className="space-y-4 text-lg text-indigo-100">
                  <p>성범죄 가해자 심리상담을 시작하는 것은 자신을 포기하는 것이 아니라 <br />오히려 자신의 삶을 다시 정리하려는 선택입니다.</p>
                  <p>사건 이후의 삶은 아직 끝난 것이 아닙니다.</p>
                  <p className="text-2xl font-black text-white">지금의 선택이 앞으로의 방향을 바꿀 수 있습니다.</p>
                </div>
                <p className="text-indigo-200 font-medium">
                  혼자 고민하기보다 전문가와 함께 상황을 차분히 정리해 보는 것이 도움이 될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        ) : slug === 'paraphilia' ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">왜 성도착 · 행동교정 치료가 필요합니까?</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 분들이 처음에는 이렇게 생각합니다.</p>
                  <div className="pl-6 border-l-4 border-slate-200 space-y-3 py-2 italic text-slate-500">
                    <p>“남들에게 피해만 주지 않으면 괜찮지 않을까.”</p>
                    <p>“이건 나만의 취향일 뿐이다.”</p>
                    <p>“통제만 잘하면 문제는 없다.”</p>
                  </div>
                  <p>하지만 시간이 지나면서 불안이 생깁니다.</p>
                  <ul className="space-y-2 text-slate-900 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-rose-500" /> 생각이 점점 강해진다.</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-rose-500" /> 자극이 점점 강해진다.</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-rose-500" /> 통제하는 데 점점 더 많은 에너지가 든다.</li>
                  </ul>
                  <p className="text-xl font-bold text-slate-900 pt-4">
                    그리고 스스로 묻게 됩니다.<br />
                    <span className="text-indigo-600">“나는 이 패턴을 계속 안고 살아가도 괜찮은가.”</span>
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/7782b34c496fd1e121ea57e02d77e129.png" 
                  alt="Behavioral Correction" 
                  className="rounded-[40px] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -right-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                  <p className="text-slate-900 font-bold italic">"치료의 핵심은 억제가 아니라 재구성입니다."</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">문제는 ‘취향’이 아니라 ‘통제력’입니다</h3>
                <p className="text-slate-600 mb-8">모든 성적 관심이 문제가 되는 것은 아닙니다. 그러나 다음과 같은 경우라면 치료가 필요할 수 있습니다.</p>
                <ul className="space-y-4">
                  {[
                    "특정 자극에 과도하게 집착한다",
                    "점점 더 강한 자극을 찾아가게 된다",
                    "현실 관계보다 왜곡된 상상에 의존한다",
                    "멈추고 싶은데 잘 되지 않는다",
                    "불안과 죄책감이 함께 따라온다"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold">✓</div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 p-4 bg-slate-50 rounded-2xl text-sm text-slate-500 leading-relaxed">
                  이것은 단순한 기호의 문제가 아니라 <span className="font-bold text-slate-900">학습된 자극 구조와 강화된 행동 패턴</span>의 문제일 수 있습니다.
                </p>
              </div>
              <div className="bg-slate-900 text-white p-10 rounded-[40px] flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-6">행동은 반복될수록 강화됩니다</h3>
                <div className="space-y-6 text-slate-300">
                  <p>성적 자극과 행동은 뇌의 보상체계와 깊이 연결되어 있습니다.</p>
                  <p>반복될수록 회로는 강화되고, 강화될수록 통제는 어려워집니다.</p>
                  <p className="text-white font-medium">의지로 누르는 것은 잠시 멈출 수는 있어도 구조를 바꾸지는 못합니다.</p>
                  <div className="pt-6 border-t border-slate-800">
                    <p className="text-xl font-bold text-white">치료의 핵심은 억제가 아니라 <span className="text-indigo-400">재구성</span>입니다.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 mb-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">성도착 · 행동교정 치료는 이렇게 진행됩니다</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "왜곡된 인지 패턴 교정", icon: Zap },
                  { title: "자극 반응 구조 분석", icon: Search },
                  { title: "충동 조절 능력 강화", icon: ShieldCheck },
                  { title: "건강한 성적 에너지 재설계", icon: Zap },
                  { title: "재발 방지 계획 수립", icon: ClipboardCheck }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl text-center hover:bg-indigo-50 transition-colors group">
                    <item.icon className="w-8 h-8 mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-center text-lg text-slate-600">이는 단순한 상담이 아니라 <span className="text-indigo-600 font-bold">행동 시스템을 다시 설계하는 과정</span>입니다.</p>
            </div>

            <div className="bg-emerald-600 text-white p-12 rounded-[40px] text-center space-y-6">
              <h3 className="text-3xl font-bold">지금 멈추는 선택이 가장 안전합니다</h3>
              <p className="text-xl text-emerald-100">많은 문제는 “더 심각해진 뒤”에 상담실을 찾습니다.</p>
              <div className="max-w-3xl mx-auto space-y-6 text-lg">
                <p>그러나 진짜 변화는 아직 통제 가능할 때 시작하는 것이 가장 효과적입니다.</p>
                <p className="bg-white/10 p-8 rounded-3xl backdrop-blur-sm">
                  성도착 · 행동교정 치료는 누군가를 판단하기 위한 과정이 아니라 <br />
                  <span className="font-bold text-2xl">자신을 안전하게 지키기 위한 선택입니다.</span>
                </p>
                <p className="text-xl">혼자 해결하려 애쓰지 않으셔도 됩니다.</p>
              </div>
              <p className="text-3xl font-black pt-6">반복을 끝내고 싶다면, 지금이 시작입니다.</p>
            </div>
          </div>
        ) : slug === 'digital' ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8 leading-tight">왜 디지털 성범죄 치료가 필요합니까?</h2>
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>많은 분들이 이렇게 말합니다.</p>
                  <div className="pl-6 border-l-4 border-slate-200 space-y-3 py-2 italic text-slate-500">
                    <p>“직접적인 접촉은 없었습니다.”</p>
                    <p>“순간적인 호기희이었습니다.”</p>
                    <p>“온라인이라 현실과는 다르다고 생각했습니다.”</p>
                  </div>
                  <p>하지만 사건 이후에는 다른 생각이 따라옵니다.</p>
                  <ul className="space-y-2 text-slate-900 font-medium">
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500" /> 왜 그 순간에 멈추지 못했는가.</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500" /> 왜 화면 속에서는 판단이 느슨해졌는가.</li>
                    <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-indigo-500" /> 나는 다시 같은 상황이 오면 통제할 수 있는가.</li>
                  </ul>
                  <p className="bg-indigo-50 p-6 rounded-2xl text-indigo-900 mt-6">
                    디지털 성범죄는 기술의 문제가 아니라 <br />
                    <span className="font-bold">심리 구조의 문제</span>입니다.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/67d97b84c9f7063f52c317540fa1688a.png" 
                  alt="Digital Crime Therapy" 
                  className="rounded-[40px] shadow-2xl w-full"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                  <p className="text-slate-900 font-bold italic">"온라인 환경의 특수성과 심리적 제동 장치의 약화"</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
              <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">온라인에서는 왜 판단이 약해질까요?</h3>
                <p className="text-slate-600 mb-8">디지털 환경은 익명성, 거리감, 즉각적인 자극을 제공하여 도덕적 제동 장치를 약화시킵니다.</p>
                <ul className="space-y-4">
                  {[
                    "“다들 하는 일 같다”는 합리화",
                    "“상대는 크게 상처받지 않았을 것”이라는 왜곡",
                    "“이번 한 번쯤은 괜찮다”는 자기 설득"
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0 text-xs font-bold">!</div>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 text-sm text-slate-500 italic">
                  이러한 인지 왜곡이 반복되면 행동은 자연스러워지고 통제는 어려워집니다.
                </p>
              </div>
              <div className="bg-slate-900 text-white p-10 rounded-[40px]">
                <h3 className="text-2xl font-bold mb-6">문제는 기술이 아니라 ‘패턴’입니다</h3>
                <p className="text-slate-400 mb-8">자극 → 행동 → 불안 → 자기합리화 → 반복의 구조가 형성되면 다시 유사한 선택이 일어날 가능성이 높습니다.</p>
                <div className="space-y-4">
                  <p className="text-indigo-400 font-bold">상담은 묻습니다:</p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-2"><span className="text-indigo-500">•</span> 어떤 감정이 그 행동을 촉발했는가</li>
                    <li className="flex gap-2"><span className="text-indigo-500">•</span> 어떤 왜곡된 생각이 개입했는가</li>
                    <li className="flex gap-2"><span className="text-indigo-500">•</span> 어떤 상황에서 통제가 무너졌는가</li>
                    <li className="flex gap-2"><span className="text-indigo-500">•</span> 다시 같은 환경이 오면 어떻게 다르게 반응할 것인가</li>
                  </ul>
                </div>
                <p className="mt-8 text-white font-bold">막연한 반성이 아니라 구체적인 재발 방지 전략을 세웁니다.</p>
              </div>
            </div>

            <div className="bg-white rounded-[40px] p-12 shadow-sm border border-slate-100 mb-24">
              <h3 className="text-3xl font-bold text-slate-900 mb-12 text-center">디지털 성범죄 치료는 구조를 바꾸는 과정입니다</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { title: "왜곡된 인지 교정", icon: Zap },
                  { title: "충동 조절 능력 강화", icon: ShieldCheck },
                  { title: "온라인 환경 트리거 관리", icon: Search },
                  { title: "공감 능력 회복", icon: Users },
                  { title: "재발 방지 계획 수립", icon: ClipboardCheck }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-3xl text-center hover:bg-indigo-50 transition-colors group">
                    <item.icon className="w-8 h-8 mx-auto mb-4 text-indigo-600 group-hover:scale-110 transition-transform" />
                    <p className="font-bold text-slate-900 text-sm leading-tight">{item.title}</p>
                  </div>
                ))}
              </div>
              <p className="mt-12 text-center text-lg text-slate-600">단순한 다짐이 아니라 <span className="text-indigo-600 font-bold">행동 시스템을 재설계하는 과정</span>입니다.</p>
            </div>

            <div className="bg-slate-900 text-white p-12 rounded-[40px] text-center space-y-6">
              <h3 className="text-3xl font-bold">지금이 가장 중요한 시점입니다</h3>
              <p className="text-xl text-slate-400">디지털 환경은 사라지지 않습니다. 스마트폰과 인터넷은 일상 속에 계속 존재합니다.</p>
              <div className="max-w-3xl mx-auto space-y-6 text-lg">
                <p>중요한 것은 환경을 피하는 것이 아니라 그 안에서 통제 가능한 자신을 만드는 것입니다.</p>
                <div className="bg-indigo-600 p-8 rounded-3xl">
                  <p className="font-bold text-2xl">디지털 성범죄 치료는 낙인을 위한 과정이 아니라 <br />다시는 같은 선택을 반복하지 않기 위한 준비입니다.</p>
                </div>
                <p className="text-xl">혼자 해결하려 애쓰지 않으셔도 됩니다.</p>
              </div>
              <p className="text-3xl font-black pt-6">반복을 끝내고 싶다면, 지금이 변화의 시작입니다.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">왜 {title} 치료가 필요한가?</h2>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">행동 루프의 해체</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">충동-자극-행동으로 이어지는 고착화된 심리적 루프를 분석하여 근본적인 변화를 이끌어냅니다.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">객관적 자기 인식</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">자신의 행동이 타인에게 미치는 영향을 객관적으로 바라보고 책임을 수용하는 과정을 거칩니다.</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2">실질적 대처 기술</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">고위험 상황에서 즉각적으로 사용할 수 있는 충동 차단 기술을 훈련합니다.</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800" 
                alt="Counseling" 
                className="rounded-3xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-xs">
                <p className="text-slate-900 font-bold italic">"창원 성범죄 특화 심리 상담, 교정 치료 및 전문 상담을 지향합니다."</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* CTA */}
    <section className="py-24 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">지금 전문가와 상담하세요</h2>
        <p className="text-lg text-slate-500 mb-10">귀하의 고민을 가장 잘 이해하는 전문가가 철저한 비밀 보장 하에 도움을 드립니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href={NAVER_PLACE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-200"
          >
            온라인 상담 예약
          </a>
          <a href={`tel:${CONTACT_PHONE}`} className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
            <PhoneCall className="w-5 h-5" />
            {CONTACT_PHONE}
          </a>
        </div>
      </div>
    </section>
  </motion.div>
);

      {slug === 'greeting' && (
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200" 
              alt="Greeting" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">"비난을 넘어, 책임 있는 변화의 길로 안내하겠습니다."</h2>
            <p>안녕하십니까, 성범죄심리상담치료센터창원 원장 윤영준입니다.</p>
            <p>성범죄 사건에 직면했을 때, 대부분의 사람들은 극심한 혼란과 두려움, 그리고 사회적 비난에 대한 공포를 경험합니다. 하지만 진정한 해결은 단순히 처벌을 피하는 것이 아니라, 자신의 행동 이면에 숨겨진 심리적 구조를 직시하고 이를 교정하여 다시는 같은 실수를 반복하지 않는 삶을 설계하는 데 있습니다.</p>
            <p>본 센터는 단순한 정서적 지지를 넘어, 뇌인지과학과 임상심리학적 근거를 바탕으로 한 고도의 교정 프로그램을 제공합니다. 우리는 내담자가 자신의 책임을 온전히 인식하고, 왜곡된 성 인지를 바로잡아 건강한 사회 구성원으로 복귀할 수 있도록 가장 객관적이고 전문적인 조력자가 될 것입니다.</p>
            <p>변화는 용기 있는 직면에서 시작됩니다. 그 길에 저희가 함께하겠습니다.</p>
            <div className="pt-12 border-t border-slate-100 text-right">
              <p className="text-slate-500 mb-2">성범죄심리상담치료센터창원 대표원장</p>
              <p className="text-2xl font-bold text-slate-900">윤 영 준</p>
            </div>
          </div>
        </div>
      )}�� 사회 구성원으로 복귀할 수 있도록 가장 객관적이고 전문적인 조력자가 될 것입니다.</p>
            <p>변화는 용기 있는 직면에서 시작됩니다. 그 길에 저희가 함께하겠습니다.</p>
            <div className="pt-12 border-t border-slate-100 text-right">
              <p className="text-slate-500 mb-2">성범죄심리상담치료센터창원 대표원장</p>
              <p className="text-2xl font-bold text-slate-900">윤 영 준</p>
            </div>
const EducationPage = ({ title, slug }: { title: string; slug: string }) => {
  const getEducationDetails = (slug: string) => {
    switch (slug) {
      case 'prevention':
        return {
          subtitle: "재발 방지를 위한 핵심 심리 교육",
          details: [
            "성범죄 발생의 심리적 기제 분석",
            "재범 위험 요인 파악 및 통제 전략",
            "충동 조절 및 상황 대처 훈련",
            "건강한 성적 가치관 확립"
          ]
        };
      case 'sensitivity':
        return {
          subtitle: "성적 권리와 존중의 이해",
          details: [
            "성인지 감수성의 개념과 중요성",
            "성적 자기결정권의 이해",
            "일상 속의 성차별적 요소 인지",
            "타인의 성적 경계 존중하기"
          ]
        };
      case 'distortion':
        return {
          subtitle: "잘못된 성 관념의 인지적 교정",
          details: [
            "성 관련 인지 왜곡의 유형 파악",
            "피해자 유발론 등 잘못된 신념 교정",
            "객관적 상황 판단 능력 배양",
            "공감 능력 향상 프로그램"
          ]
        };
      case 'compliance':
        return {
          subtitle: "법질서 준수 및 사회적 책임",
          details: [
            "성범죄 관련 법률 체계 이해",
            "범죄 행위의 사회적 파급력 인식",
            "준법 의식 내면화 과정",
            "사회 복귀를 위한 책임감 강화"
          ]
        };
      case 'discrimination':
        return {
          subtitle: "평등한 성 역할과 차별 해소",
          details: [
            "성차별의 역사적·사회적 배경",
            "고정관념 탈피와 다양성 존중",
            "평등한 소통 방식 연습",
            "건강한 공동체 의식 함양"
          ]
        };
      default:
        return {
          subtitle: "법원 제출용 전문 교육 이수 프로그램입니다.",
          details: [
            "전문 커리큘럼 이수",
            "심리 상태 분석 및 평가",
            "변화 양상 기록",
            "이수 확인서 발급"
          ]
        };
    }
  };

  const content = getEducationDetails(slug);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div className="bg-slate-50 py-12 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">{title}</h1>
          <p className="text-lg text-slate-500">{content.subtitle}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">교육 프로그램 상세</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-4">주요 교육 내용</h4>
                  <ul className="space-y-3">
                    {content.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">이수 확인서 발급</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">교육 이수 후 법원 및 검찰 제출용 공식 이수 확인서와 전문가 소견서를 발급해 드립니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-[40px] overflow-hidden shadow-2xl">
              <img 
                src={`https://picsum.photos/seed/edu-${slug}/800/600`} 
                alt={title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LegalPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-slate-50 min-h-screen"
  >
    <div className="relative bg-slate-900 py-40 text-white text-center overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1920" 
          alt="Legal Background" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <h1 className="text-4xl lg:text-6xl font-bold mb-8 tracking-tight">법원·검찰 제출용 양형자료</h1>
        <p className="text-xl text-slate-400 leading-relaxed">
          심리치료는 당신의 진지한 반성과 재범 방지 의지를 입증하는 객관적인 증거입니다.
        </p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "전문가 소견서", desc: "상담 과정과 변화 양상을 전문적으로 기술한 공식 문서", icon: FileText },
          { title: "재범위험성 평가", desc: "표준화된 검사 도구를 통한 객관적 위험도 측정 보고서", icon: ClipboardCheck },
          { title: "반성문 코칭", desc: "책임 인식을 바탕으로 한 진정성 있는 진술 가이드", icon: MessageSquare }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100 text-center">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center mx-auto mb-8">
              <item.icon className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 bg-white rounded-[40px] p-12 lg:p-20 shadow-sm border border-slate-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">왜 심리치료가 양형에 중요한가요?</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">재범 위험성 감소의 입증</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">법원은 단순히 '반성한다'는 말보다, 구체적으로 어떤 노력을 통해 재범 가능성을 낮췄는지를 중요하게 평가합니다.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Gavel className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">교정 의지의 객관화</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">전문 기관에서의 상담 이력은 피고인이 자신의 문제를 직시하고 해결하려는 강력한 의지가 있음을 보여줍니다.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800" 
                alt="Legal Consultation" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24">
        <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">성범죄 재범방지 교육 프로그램</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { title: "성범죄 재범방지교육", href: "/legal/education/prevention", desc: "재발 방지를 위한 핵심 심리 교육" },
            { title: "성인지 감수성 교육", href: "/legal/education/sensitivity", desc: "성적 권리와 존중의 이해" },
            { title: "성인지 왜곡 교정 교육", href: "/legal/education/distortion", desc: "잘못된 성 관념의 인지적 교정" },
            { title: "준법정신 강화교육", href: "/legal/education/compliance", desc: "법질서 준수 및 사회적 책임" },
            { title: "성차별 교육", href: "/legal/education/discrimination", desc: "평등한 성 역할과 차별 해소" }
          ].map((edu, idx) => (
            <Link key={idx} to={edu.href} className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{edu.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{edu.desc}</p>
              <div className="text-[#4F46E5] text-sm font-bold flex items-center gap-1">
                상세보기 <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  </motion.div>
);

const AboutPage = ({ title, slug }: { title: string; slug: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    <div className="bg-slate-50 py-12 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-8">{title}</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            성범죄심리상담치료센터창원은 단순한 비난이 아닌 실질적인 교정을 통해 재범 없는 안전한 사회를 만듭니다.
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      {slug === 'greeting' && (
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1200" 
              alt="Greeting" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed space-y-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">"비난을 넘어, 책임 있는 변화의 길로 안내하겠습니다."</h2>
            <p>안녕하십니까, 성범죄심리상담치료센터창원 원장 윤영준입니다.</p>
            <p>성범죄 사건에 직면했을 때, 대부분의 사람들은 극심한 혼란과 두려움, 그리고 사회적 비난에 대한 공포를 경험합니다. 하지만 진정한 해결은 단순히 처벌을 피하는 것이 아니라, 자신의 행동 이면에 숨겨진 심리적 구조를 직시하고 이를 교정하여 다시는 같은 실수를 반복하지 않는 삶을 설계하는 데 있습니다.</p>
            <p>본 센터는 단순한 정서적 지지를 넘어, 뇌인지과학과 임상심리학적 근거를 바탕으로 한 고도의 교정 프로그램을 제공합니다. 우리는 내담자가 자신의 책임을 온전히 인식하고, 왜곡된 성 인지를 바로잡아 건강한 사회 구성원으로 복귀할 수 있도록 가장 객관적이고 전문적인 조력자가 될 것입니다.</p>
            <p>변화는 용기 있는 직면에서 시작됩니다. 그 길에 저희가 함께하겠습니다.</p>
            <div className="pt-12 border-t border-slate-100 text-right">
              <p className="text-slate-500 mb-2">성범죄심리상담치료센터창원 대표원장</p>
              <p className="text-2xl font-bold text-slate-900">윤 영 준</p>
            </div>
          </div>
        </div>
      )}
      {slug === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">설립 목적 및 차별점</h2>
            <p className="text-slate-600 leading-relaxed">
              본 센터는 성범죄 가해자의 심리적 구조를 심층 분석하여 재범의 고리를 끊어내는 특화 기관입니다. 일반 상담센터와 달리 법적 절차에 대한 깊은 이해를 바탕으로 실질적인 심리 개입을 진행합니다.
            </p>
            <div className="p-8 rounded-3xl bg-indigo-600 text-white">
              <h4 className="font-bold text-xl mb-4">“창원 성범죄 특화 심리 상담, 교정 치료 및 전문 상담”</h4>
              <p className="text-indigo-100">우리는 내담자가 자신의 책임을 온전히 인식하고, 변화된 삶을 살 수 있도록 돕는 것을 사명으로 합니다.</p>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-[48px] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                alt="Center Interior" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 grid grid-cols-1 gap-4 w-64">
              <div className="p-6 rounded-2xl bg-white shadow-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">재범방지 중심 구조</h4>
                <p className="text-xs text-slate-500">단순 정서 지원을 넘어 행동 교정과 재발 방지 루틴 설계에 집중합니다.</p>
              </div>
              <div className="p-6 rounded-2xl bg-white shadow-xl border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-2">법적 절차 이해 기반</h4>
                <p className="text-xs text-slate-500">수사 및 재판 과정에서 필요한 심리적 안정과 객관적 평가를 지원합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {slug === 'profile' && (
        <div className="space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 lg:sticky lg:top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://tpqens1j9138.edge.naverncp.com/MNiExO50AC?src=https%3A%2F%2Fpage24.app%2Fapi%2Ffile%2FmodooImgPasre%3FsiteId%3Dcriminalmhs%26image_url%3Dhttps%3A%2F%2F9tsiiw6i9140.edge.naverncp.com%2Ffiles%2Fcriminalmhs%2F202507%2Ffffbec7c7fc9a06e84210f84e37366dc.jpg%26mcode%3D1112&type=m&w=1980&h=1980&ttype=png" 
                  alt="윤영준 원장" 
                  className="w-full aspect-square lg:aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">윤영준 <span className="text-lg font-medium text-slate-500">원장</span></h3>
                <p className="text-[#4F46E5] font-bold">상담학 박사 / 국제 임상최면치료사</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  학력 및 학위
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 동국대학교 대학원 심리상담 석사</li>
                  <li>• 로드랜드 대학교 상담학 박사</li>
                  <li>• 서불대학교 심신통합치유학과 뇌인지과학 박사 수료</li>
                  <li>• 원광대학교 동양학대학원 기공학 전문과정 전공</li>
                </ul>
              </section>

              <section className="bg-slate-50/50 p-8 rounded-[32px] border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  전문 자격 및 국제 인증
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-4 h-4 text-indigo-500" />
                      미국최면사고시위원회 (ACHE)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 국제 최면전문가 (International Master Hypnotist)</li>
                      <li>• 국제 최면치료사 (International Hypnotherapist)</li>
                      <li>• 국제 임상최면치료사 (International Clinical Hypnotherapist)</li>
                      <li>• 국제 의학최면치료사 (International Medical Hypnotherapist)</li>
                    </ul>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      미국 최면대학 (HCC)
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 최면전문가 (Master Hypnotist)</li>
                      <li>• 최면치료사 (Hypnotherapist)</li>
                      <li>• 임상최면치료사 (Clinical Hypnotherapist)</li>
                      <li>• 의학최면치료사 (Medical Hypnotherapist)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-200/50">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                       <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                         <Zap className="w-4 h-4 text-indigo-500" />
                         NLP 및 코칭
                       </h4>
                       <ul className="space-y-2 text-sm text-slate-600">
                          <li>• NLP 프랙티셔너 / 마스터 프랙티셔너</li>
                          <li>• NLP 프로코치 (전문가)</li>
                       </ul>
                     </div>
                     <div className="bg-indigo-600 p-6 rounded-2xl shadow-xl shadow-indigo-100 border border-indigo-500">
                       <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
                         <ShieldCheck className="w-4 h-4 text-indigo-200" />
                         기타 전문 자격
                       </h4>
                       <ul className="space-y-2 text-sm text-indigo-50">
                          <li>• 성폭력 전문 상담사</li>
                          <li>• 가정폭력 전문 상담사</li>
                          <li>• 뇌교육 상담사</li>
                       </ul>
                     </div>
                   </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  주요 학회 및 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 성범죄심리상담학회 회장</li>
                  <li>• 미국 로렐라이즈 메디테이션 센터 원장</li>
                  <li>• (전)제5심리과학회 회장</li>
                  <li>• (전)동서통합심리상담학회 회장</li>
                  <li>• 사단법인 장애어린이집 이사</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  수상 및 교수 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 로드랜드 대학교 총장상 수상</li>
                  <li>• 로드랜드 대학교 객원교수</li>
                  <li>• 한국 B&S 교육문화진흥원 교육원장</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  강의 및 상담 경력
                </h3>
                <div className="space-y-8 text-sm text-slate-600 leading-relaxed">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">대학 및 교육기관</h4>
                    <p>금오공과대학교, 상지대학교, 광운대학교, 춘해대학교, 부산외국어대학교, 한국폴리텍대학교, 구미대학교 등 다수 대학 강의 및 심리검사 교육 진행</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">기업 및 관공서</h4>
                    <p>삼성, LG, 대우, 기아자동차, 웅진코웨이, SK가스 등 대기업 임직원 대상 심리 프로그램 진행. 경찰서(상주, 군위, 구미, 점촌), 구미시청 등 관공서 출강 및 상담.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100">
                    <h4 className="font-bold text-indigo-900 mb-3">공공 및 사회 활동 (성범죄 및 위기 상담 특화)</h4>
                    <ul className="space-y-2 text-indigo-800">
                      <li>• 대구가정법원 위탁보호위원</li>
                      <li>• 경북권 전경, 의경 담당 심리상담사</li>
                      <li>• 경북 소방대원 심리상담 및 교육</li>
                      <li>• 학교폭력 자치위원, 경북교육지원청 위원 활동</li>
                      <li>• 청소년 대상 인터넷 중독 및 자살 예방 교육 전문 강사</li>
                    </ul>
                  </div>
                </div>
              </section>
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  저서 및 논문
                </h3>
                <div className="space-y-6 text-slate-600">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">주요 저서</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 삶과 운명을 바꾸는 마음의 기술 (부제: 내면을 깨우면 무엇이든 가능하다)</li>
                      <li>• 자기탐구 내면아이 워크북</li>
                      <li>• The Secret of Korean Power (영문판)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">출판 예정</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• 리얼리티 코드 (부제: 당신의 현실을 다시 쓰는 법)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">학술 논문</h4>
                    <p className="text-sm">• 정서인식명확성이 청소년의 학업스트레스로 인한 우울에 미치는 영향 연구</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {slug === 'vice-profile' && (
        <div className="space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 lg:sticky lg:top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://mhsjoy.mycafe24.com/wp-content/uploads/2024/05/KakaoTalk_20240521_123825759.jpg" 
                  alt="소윤주 부원장" 
                  className="w-full aspect-square lg:aspect-[3/4] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-slate-900">소윤주 <span className="text-lg font-medium text-slate-500">부원장</span></h3>
                <p className="text-[#4F46E5] font-bold">기능의학전문가 │ 최면전문가 │ MHS전문가</p>
              </div>
            </div>
            
            <div className="lg:col-span-2 space-y-16">
              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  학력 및 약력
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 원광대학교 의과대학</li>
                  <li>• 전) 부산서울피부과의원</li>
                  <li>• 전) 대전 DS피부과의원</li>
                  <li>• 전) 대전 J의원</li>
                  <li>• 전) 대구 파르베의원</li>
                  <li>• 현) 미안의원 부원장</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  주요 학회 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 제5심리과학학회 이사</li>
                  <li>• 동서통합심리학회 이사</li>
                  <li>• 대한레이저피부모발학회</li>
                  <li>• 대한미용성형레이저학회</li>
                  <li>• 대한일차진료학회</li>
                  <li>• 대한필러학회</li>
          const getResult = (score: number) => {
    if (score <= 15) return { title: "낮은 위험군", color: "text-emerald-600", bg: "bg-emerald-50", desc: "비교적 통제 가능하나 주의가 필요한 상태입니다. 현재의 건강한 온라인 활동 습관을 유지하시되, 자극적인 콘텐츠에 대한 경계심을 늦추지 마세요." };
    if (score <= 30) return { title: "경계군", color: "text-amber-600", bg: "bg-amber-50", desc: "반복적인 패턴이 존재하며, 인지 왜곡이 시작될 수 있는 단계입니다. 전문가와의 상담을 통해 자신의 온라인 활동 패턴을 객관적으로 점검하고 교정 개입을 받는 것을 권장합니다." };
    if (score <= 45) return { title: "고위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "충동 조절의 어려움과 왜곡된 사고 구조가 형성된 상태입니다. 법적 위험성이 매우 높으며, 혼자만의 의지로는 통제가 어려울 수 있습니다. 즉각적인 전문 상담이 필요합니다." };
    return { title: "재범 위험군", color: "text-red-600", bg: "bg-red-50", desc: "매우 심각한 수준의 중독 증상과 왜곡된 인지 구조를 보이고 있습니다. 즉각적인 상담 및 외부 자극 차단 개입이 필수적이며, 체계적인 치료 프로그램 이수가 시급합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Sticky Progress Bar */}
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-[#4F46E5]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-slate-900 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                디지털 성범죄 <br /> 위험도 자가 체크
              </h2>
              <p className="text-slate-400 max-w-lg leading-relaxed">
                온라인 활동 중 나도 모르게 형성된 위험 요소를 객관적으로 점검합니다. <br />
                최근 6개월간의 활동을 기준으로 솔직하게 답변해 주세요.
              </p>
            </div>
          </header>��학과 임상심리학적 근거를 바탕으로 한 고도의 교정 프로그램을 제공합니다. 우리는 내담자가 자신의 책임을 온전히 인식하고, 왜곡된 성 인지를 바로잡아 건강한 사회 구성원으로 복귀할 수 있도록 가장 객관적이고 전문적인 조력자가 될 것입니다.</p>
            <p>변화는 용기 있는 직면에서 시작됩니다. 그 길에 저희가 함께하겠습니다.</p>
            <div className="pt-12 border-t border-slate-100 text-right">
              <p className="text-slate-500 mb-2">성범죄심리상담치료센터창원 대표원장</p>
              <p className="text-2xl font-bold text-slate-900">윤 영 준</p>
            </div>
          </div>
        </div>
      )}

      {slug === 'experts' && (
        <div className="space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">성범죄 특화 전문가 그룹</h2>
            <p className="text-slate-500">단순 심리상담사가 아닌, 구조적 개입과 행동 교정의 전문가들이 함께합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "윤영준 원장", 
                role: "상담학 박사 / 국제 임상최면치료사", 
                image: "https://tpqens1j9138.edge.naverncp.com/MNiExO50AC?src=https%3A%2F%2Fpage24.app%2Fapi%2Ffile%2FmodooImgPasre%3FsiteId%3Dcriminalmhs%26image_url%3Dhttps%3A%2F%2F9tsiiw6i9140.edge.naverncp.com%2Ffiles%2Fcriminalmhs%2F202507%2Ffffbec7c7fc9a06e84210f84e37366dc.jpg%26mcode%3D1112&type=m&w=1980&h=1980&ttype=png",
                desc: "성범죄 상담 경력 10년 이상, 법원 촉탁 상담위원 역임."
              },
              { 
                name: "소윤주 부원장", 
                role: "기능의학 / 최면 / MHS 전문가", 
                image: "https://mhsjoy.mycafe24.com/wp-content/uploads/2024/05/KakaoTalk_20240521_123825759.jpg",
                desc: "기능의학 기반의 심신 통합 치유 전문가."
              },
              { 
                name: "허선무 변호사", 
                role: "사법시험 54회 / 성범죄 전문 변호사", 
                image: "https://www.soullaw.co.kr/images/sub/member/member_view23.jpg",
                desc: "창원지방법원 조정위원 및 형사조정위원 역임, 성범죄 전문 법률 조력자."
              }
            ].map((expert, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{expert.name}</h3>
                <p className="text-sm text-[#4F46E5] font-bold mb-4">{expert.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed px-8">{expert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {slug === 'location' && (
        <div className="space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-[#4F46E5]" />
                  센터 위치 안내
                </h3>
                <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 space-y-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">주소</p>
                    <p className="text-lg font-bold text-slate-900">경남 창원시 마산회원구 석전북11길 17 2층</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">문의 및 예약</p>
                    <p className="text-2xl font-bold text-[#4F46E5]">{CONTACT_PHONE}</p>
                  </div>
                  <div className="pt-6 flex flex-col sm:flex-row gap-4">
                    <a 
                      href="https://map.naver.com/p/search/%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%B9%98%EB%A3%8C%EC%84%BC%ED%84%B0%EC%B0%BD%EC%9B%90/place/2032665535?placePath=/home?bk_query=%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%B9%98%EB%A3%8C%EC%84%BC%ED%84%B0%EC%B0%BD%EC%9B%90&entry=pll&fromNxList=true&fromPanelNum=2&timestamp=202603062006&locale=ko&svcName=map_pcv5&searchText=%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%B9%98%EB%A3%8C%EC%84%BC%ED%84%B0%EC%B0%BD%EC%9B%90&entry=pll&fromNxList=true&fromPanelNum=2&timestamp=202603062006&locale=ko&svcName=map_pcv5&searchText=%EC%84%B1%EB%B2%94%EC%A3%84%EC%8B%AC%EB%A6%AC%EC%83%81%EB%8B%B4%EC%B9%98%EB%A3%8C%EC%84%BC%ED%84%B0%EC%B0%BD%EC%9B%90&from=nx&searchType=place&c=15.00,0,0,0,dh"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-8 py-4 bg-[#03C75A] text-white rounded-2xl font-bold text-center hover:bg-[#02b351] transition-colors flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-5 h-5" />
                      네이버 상담 예약
                    </a>
                    <a 
                      href={`tel:${CONTACT_PHONE}`}
                      className="flex-1 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-center hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                    >
                      <PhoneCall className="w-5 h-5" />
                      전화 문의하기
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-1.5 h-5 bg-[#4F46E5] rounded-full" />
                  교통편 안내
                </h4>
                <div className="grid grid-cols-1 gap-4">
                  <div className="p-6 rounded-2xl border border-slate-100 bg-white">
                    <p className="font-bold text-slate-800 mb-2">자가용 이용 시</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      네비게이션에 '성범죄심리상담치료센터창원' 또는 주소를 검색해 주세요. 건물 주변 주차 공간 이용이 가능합니다.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl border border-slate-100 bg-white">
                    <p className="font-bold text-slate-800 mb-2">대중교통 이용 시</p>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      마산역 인근 버스 정류장에서 하차 후 도보로 약 5~10분 거리입니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[500px] lg:h-auto min-h-[400px] rounded-[48px] overflow-hidden shadow-2xl border-8 border-white">
              <iframe 
                src="https://maps.google.com/maps?q=경남%20창원시%20마산회원구%20석전북11길%2017%202층&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps"
              />
            </div>
          </div>
        </div>
      )}

      {slug !== 'intro' && slug !== 'experts' && slug !== 'profile' && slug !== 'greeting' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
);

const GuidePage = ({ title, slug }: { title: string; slug: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    <div className="bg-slate-900 py-12 lg:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl text-slate-400">투명하고 체계적인 상담 안내를 확인하세요.</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
      {slug === 'faq' && (
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: "상담이 양형에 실제로 도움이 되나요?", a: "네, 전문 기관에서의 상담 이력과 재범 위험성 감소에 대한 소견서는 법원에서 피고인의 교정 의지를 확인하는 중요한 객관적 자료로 활용됩니다." },
            { q: "초범인데 꼭 상담을 받아야 하나요?", a: "초범일수록 자신의 행동 기제를 정확히 파악하여 재범을 방지하는 것이 중요합니다. 또한 수사 단계에서의 초기 대응이 향후 결과에 큰 영향을 미칩니다." },
            { q: "회사나 가족에게 알려지나요?", a: "본 센터는 철저한 비밀 보장 원칙을 준수합니다. 상담 기록은 본인의 동의 없이 외부로 유출되지 않으며, 방문 사실 또한 엄격히 보호됩니다." },
            { q: "억울한 부분이 있는데 상담이 필요한가요?", a: "억울함이 분노나 왜곡된 인지로 이어져 상황을 악화시킬 수 있습니다. 상담을 통해 상황을 객관적으로 정리하고 법적 대응을 위한 심리적 안정을 찾는 것이 필요합니다." }
          ].map((item, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-start gap-3">
                <span className="text-[#4F46E5]">Q.</span>
                {item.q}
              </h3>
              <p className="text-slate-600 leading-relaxed pl-7">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      )}

      {slug === 'privacy' && (
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-[40px] bg-slate-900 text-white">
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                <Lock className="w-6 h-6 text-indigo-400" />
              </div>
              <h2 className="text-3xl font-bold">비밀보장 및 윤리규정</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-indigo-400">철저한 기록 관리</h4>
                <p className="text-slate-400 leading-relaxed">모든 상담 기록은 암호화되어 안전하게 보관되며, 법적 의무 사항(자해/타해 위험 등)을 제외하고는 절대 외부로 공개되지 않습니다.</p>
              </div>
              <div className="space-y-6">
                <h4 className="text-xl font-bold text-indigo-400">개인정보 보호</h4>
                <p className="text-slate-400 leading-relaxed">상담 신청부터 종결까지 모든 과정에서 내담자의 신원 보호를 최우선으로 합니다. 익명 상담 신청도 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {slug !== 'faq' && slug !== 'privacy' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
);

const ImpulseControlTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "감정 촉발 상황", text: "스트레스를 받으면 즉각적인 자극을 찾게 된다." },
    { category: "감정 촉발 상황", text: "외로울 때 충동적인 행동을 할 가능성이 높아진다." },
    { category: "감정 촉발 상황", text: "화가 나거나 억울하면 판단력이 흐려진다." },
    { category: "감정 촉발 상황", text: "술을 마시면 통제력이 약해진다." },
    { category: "감정 촉발 상황", text: "피곤하거나 지칠 때 충동 행동이 늘어난다." },
    { category: "충동 발생 순간", text: "“한 번 정도는 괜찮다”는 생각이 든다." },
    { category: "충동 발생 순간", text: "행동하기 전에 충분히 생각하지 못하는 경우가 있다." },
    { category: "충동 발생 순간", text: "행동 후에 후회하는 일이 반복된다." },
    { category: "충동 발생 순간", text: "충동이 올라오면 참기 어렵다고 느낀다." },
    { category: "충동 발생 순간", text: "순간적인 욕구가 이성적 판단을 이기는 경우가 있다." },
    { category: "통제 전략", text: "충동이 올라올 때 스스로 멈추는 방법을 알고 있다.", isReverse: true },
    { category: "통제 전략", text: "위험 상황을 피하려고 노력한다.", isReverse: true },
    { category: "통제 전략", text: "스트레스를 건강한 방식으로 해소한다.", isReverse: true },
    { category: "통제 전략", text: "문제가 생길 수 있는 상황을 미리 피한다.", isReverse: true },
    { category: "통제 전략", text: "자신의 행동 패턴을 객관적으로 돌아본다.", isReverse: true },
    { category: "반복 패턴", text: "같은 실수를 반복한 경험이 있다." },
    { category: "반복 패턴", text: "하지 말아야 할 행동이라는 것을 알면서도 하게 된다." },
    { category: "반복 패턴", text: "“이번이 마지막”이라고 생각한 적이 여러 번 있다." },
    { category: "반복 패턴", text: "충동 행동 이후 죄책감이나 후회가 크게 느껴진다." },
    { category: "반복 패턴", text: "스스로 통제하기 어렵다는 생각이 든다." },
  ];

  const calculateScore = () => {
    return answers.reduce((acc, curr, idx) => {
      if (curr === -1) return acc;
      const q = questions[idx];
      return acc + (q.isReverse ? (3 - curr) : curr);
    }, 0);
  };

  const totalScore = calculateScore();
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "충동 조절 능력 양호", color: "text-emerald-600", bg: "bg-emerald-50", desc: "현재 충동 조절 능력이 비교적 양호한 상태입니다. 스트레스 상황에서도 이성적인 판단을 유지하려 노력하고 계시네요. 지금의 건강한 대처 방식을 유지하세요." };
    if (score <= 30) return { title: "통제력 흔들림 (주의)", color: "text-amber-600", bg: "bg-amber-50", desc: "스트레스나 특정 감정 상태에서 통제력이 일시적으로 흔들릴 수 있는 단계입니다. 충동이 올라올 때 잠시 멈추고 상황을 객관화하는 연습이 필요합니다." };
    if (score <= 45) return { title: "충동 패턴 형성 (위험)", color: "text-orange-600", bg: "bg-orange-50", desc: "반복적인 충동 행동 패턴이 형성되어 자제력이 약해진 상태입니다. 이는 의도치 않은 법적·사회적 문제로 이어질 수 있으므로, 전문가와의 상담을 통해 충동 조절 전략을 수립해야 합니다." };
    return { title: "충동 조절 어려움 (심각)", color: "text-red-600", bg: "bg-red-50", desc: "스스로의 의지만으로는 충동을 통제하기 매우 어려운 상태입니다. 반복되는 후회와 죄책감이 삶의 질을 떨어뜨리고 있습니다. 즉각적인 전문 심리치료와 약물 치료 등을 포함한 통합적 개입을 강력히 권장합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-emerald-900 overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                충동 조절 능력 <br /> 자가 평가
              </h2>
              <p className="text-emerald-100/60 max-w-lg leading-relaxed">
                특정 상황에서 나의 통제력은 어느 정도인가요? <br />
                지난 6개월간의 경험을 바탕으로 가장 가까운 항목을 선택해 주세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["감정 촉발 상황", "충동 발생 순간", "통제 전략", "반복 패턴"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        id={`impulse-q-${globalIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-emerald-600 transition-colors">
                            <span className="text-emerald-500 font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-emerald-200 hover:bg-emerald-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              onClick={() => {
                if (!isComplete) {
                  const firstUnanswered = answers.findIndex(a => a === -1);
                  if (firstUnanswered !== -1) {
                    const element = document.getElementById(`impulse-q-${firstUnanswered}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                  return;
                }
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-emerald-900 text-white shadow-2xl shadow-emerald-200 hover:bg-black hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-emerald-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Zap className="w-12 h-12 text-emerald-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-emerald-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-emerald-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-emerald-500/20 transition-colors" />
              <h4 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-emerald-400" />
                충동 조절의 메커니즘
              </h4>
              <p className="text-emerald-100/60 leading-relaxed text-lg">
                충동 조절은 뇌의 전두엽 기능과 밀접하게 연관되어 있습니다. 스트레스나 피로, 음주는 이 기능을 일시적으로 약화시켜 평소라면 하지 않았을 행동을 하게 만듭니다. 자신의 취약 상황을 파악하고 '멈춤' 신호를 만드는 훈련이 중요합니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-emerald-50 border border-emerald-100">
              <h4 className="font-bold text-2xl text-emerald-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
                조절 능력 강화 솔루션
              </h4>
              <ul className="space-y-6">
                {[
                  "충동 발생 시 10초간 심호흡하며 상황 분리하기",
                  "자신의 감정 상태를 기록하는 '감정 일기' 작성",
                  "전문가와 함께하는 인지행동치료(CBT) 프로그램"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-emerald-500 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-emerald-600 text-white text-center font-black text-lg rounded-[24px] hover:bg-emerald-700 transition-all shadow-2xl shadow-emerald-100 active:scale-95"
            >
              전문가 상담 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const DigitalRiskTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "음란물 및 자극 노출 영역", text: "야동·성적 쇼츠·SNS 노출 콘텐츠를 주 3회 이상 시청한다." },
    { category: "음란물 및 자극 노출 영역", text: "자극 강도가 점점 높아지는 경향이 있다." },
    { category: "음란물 및 자극 노출 영역", text: "미성년으로 보이는 콘텐츠에 노출된 적이 있다." },
    { category: "음란물 및 자극 노출 영역", text: "“이 정도는 괜찮겠지”라고 스스로 합리화한 적이 있다." },
    { category: "음란물 및 자극 노출 영역", text: "시청 후 죄책감이 들지만 반복된다." },
    { category: "온라인 관계 위험 영역", text: "오픈채팅·DM 등에서 성적 대화를 시도한 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "상대 나이를 명확히 확인하지 않은 채 대화한 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "익명성이 있으니 괜찮다고 느낀 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "사진이나 영상을 요구하거나 받은 적이 있다." },
    { category: "온라인 관계 위험 영역", text: "저장해 둔 이미지·영상이 있다." },
    { category: "충동 통제 영역", text: "스트레스나 음주 후 온라인 접속이 증가한다." },
    { category: "충동 통제 영역", text: "외로움이나 분노가 들 때 자극 콘텐츠를 찾는다." },
    { category: "충동 통제 영역", text: "“한 번만 더”라는 생각이 반복된다." },
    { category: "충동 통제 영역", text: "스스로 통제하기 어렵다고 느낀 적이 있다." },
    { category: "충동 통제 영역", text: "지우고 다시 반복한 경험이 있다." },
    { category: "법적 위험 인식 영역", text: "아청법 기준을 정확히 모른다." },
    { category: "법적 위험 인식 영역", text: "포렌식으로 복원 가능하다는 사실을 가볍게 여긴 적이 있다." },
    { category: "법적 위험 인식 영역", text: "“다운만 받았지 유포는 안 했다”고 안심한 적이 있다." },
    { category: "법적 위험 인식 영역", text: "캡처·저장도 처벌 대상이 될 수 있음을 충분히 인식하지 못했다." },
    { category: "법적 위험 인식 영역", text: "디지털 기록이 영구적으로 남는다는 점을 깊이 생각하지 않았다." },
  ];

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "낮은 위험군", color: "text-emerald-600", bg: "bg-emerald-50", desc: "비교적 통제 가능하나 주의가 필요한 상태입니다. 현재의 건강한 온라인 활동 습관을 유지하시되, 자극적인 콘텐츠에 대한 경계심을 늦추지 마세요." };
    if (score <= 30) return { title: "경계군", color: "text-amber-600", bg: "bg-amber-50", desc: "반복적인 패턴이 존재하며, 인지 왜곡이 시작될 수 있는 단계입니다. 전문가와의 상담을 통해 자신의 온라인 활동 패턴을 객관적으로 점검하고 교정 개입을 받는 것을 권장합니다." };
    if (score <= 45) return { title: "고위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "충동 조절�          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              onClick={() => {
                if (!isComplete) {
                  const firstUnanswered = answers.findIndex(a => a === -1);
                  if (firstUnanswered !== -1) {
                    const element = document.getElementById(`recidivism-q-${firstUnanswered}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                  return;
                }
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-slate-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Scale className="w-12 h-12 text-slate-900" />�험 요소를 객관적으로 점검합니다. <br />
                최근 6개월간의 활동을 기준으로 솔직하게 답변해 주세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["음란물 및 자극 노출 영역", "온라인 관계 위험 영역", "충동 통제 영역", "법적 위험 인식 영역"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        id={`digital-q-${globalIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-[#4F46E5] transition-colors">
                            <span className="text-[#4F46E5] font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-[#4F46E5] border-[#4F46E5] text-white shadow-xl shadow-indigo-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:bg-indigo-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                              {answers[globalIdx] === item.score && (
                                <motion.div 
                                  layoutId={`active-indicator-${globalIdx}`}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"
                                >
                                  <div className="w-2 h-2 bg-[#4F46E5] rounded-full" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4F46E5] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              onClick={() => {
                if (!isComplete) {
                  const firstUnanswered = answers.findIndex(a => a === -1);
                  if (firstUnanswered !== -1) {
                    const element = document.getElementById(`digital-q-${firstUnanswered}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                  return;
                }
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-indigo-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Smartphone className="w-12 h-12 text-[#4F46E5]" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-indigo-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors" />
              <h4 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-400" />
                위험성 분석
              </h4>
              <p className="text-slate-400 leading-relaxed text-lg">
                디지털 성범죄는 '기록의 영구성'과 '확산의 신속성' 때문에 피해자에게 씻을 수 없는 고통을 줍니다. 또한 수사 기관의 포렌식 기술은 매우 정교하여 삭제된 기록도 복원이 가능합니다. 단순 시청이나 소지도 엄격한 처벌 대상이 됨을 명심해야 합니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-indigo-50 border border-indigo-100">
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                솔루션 가이드
              </h4>
              <ul className="space-y-6">
                {[
                  "디지털 기기 사용 환경의 물리적 차단 설정",
                  "충동 조절 및 스트레스 관리 전문 상담",
                  "디지털 성범죄 관련 법률 및 윤리 교육"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-indigo-500 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-[#4F46E5] text-white text-center font-black text-lg rounded-[24px] hover:bg-[#4338ca] transition-all shadow-2xl shadow-indigo-100 active:scale-95"
            >
              전문가 상담 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const GenderSensitivityTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "피해 인식 영역", text: "상대방이 명확히 거부하지 않았다면 동의했다고 볼 수 있다고 생각한다." },
    { category: "피해 인식 영역", text: "술에 취한 상태에서는 판단력이 떨어지므로 어느 정도는 이해할 수 있다고 본다." },
    { category: "피해 인식 영역", text: "상대가 평소 호의적으로 행동했다면 성적 의도가 있었다고 해석한 적이 있다." },
    { category: "피해 인식 영역", text: "피해자가 즉시 신고하지 않았다면 상황이 심각하지 않았다고 생각한 적이 있다." },
    { category: "피해 인식 영역", text: "피해자의 복장이나 행동이 오해를 불러일으킬 수 있다고 자주 생각한다." },
    { category: "책임 인식 영역", text: "상황이 그렇게 된 것은 서로의 책임이라고 느낀 적이 있다." },
    { category: "책임 인식 영역", text: "억울하다는 생각이 먼저 떠오른다." },
    { category: "책임 인식 영역", text: "상대가 명확히 거부하지 않았으니 문제 될 줄 몰랐다고 생각한다." },
    { category: "책임 인식 영역", text: "나는 의도하지 않았으니 큰 잘못은 아니라고 느낀 적이 있다." },
    { category: "책임 인식 영역", text: "법이 너무 엄격하다고 느낀 적이 있다." },
    { category: "공감 능력 영역", text: "상대가 느꼈을 두려움이나 불안을 구체적으로 상상하기 어렵다." },
    { category: "공감 능력 영역", text: "“그 정도로 상처받을 일인가?”라고 생각한 적이 있다." },
    { category: "공감 능력 영역", text: "상대 입장에서 감정 일기를 써본 적이 없다." },
    { category: "공감 능력 영역", text: "피해자의 삶이 이후 어떻게 달라졌을지 깊이 생각해본 적이 없다." },
    { category: "공감 능력 영역", text: "사건 이후 나의 억울함이 상대의 고통보다 더 크게 느껴졌다." },
    { category: "왜곡 사고 영역", text: "“남자라면 그럴 수 있다”는 말을 이해하는 편이다." },
    { category: "왜곡 사고 영역", text: "성적 충동은 어쩔 수 없는 본능이라고 생각한다." },
    { category: "왜곡 사고 영역", text: "음란물의 영향은 실제 행동과는 별개라고 본다." },
    { category: "왜곡 사고 영역", text: "대부분의 성범죄는 과장되었다고 느낀 적이 있다." },
    { category: "왜곡 사고 영역", text: "성인지 교육은 형식적이라고 생각한 적이 있다." },
  ];

  const totalScore = answers.reduce((acc, curr) => acc + (curr === -1 ? 0 : curr), 0);
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "비교적 건강한 성인지 관점", color: "text-emerald-600", bg: "bg-emerald-50", desc: "현재 성인지 관점이 비교적 객관적이고 건강한 상태입니다. 하지만 성인지 감수성은 지속적인 학습과 성찰이 필요한 영역이므로 꾸준한 관심을 권장합니다." };
    if (score <= 30) return { title: "부분적 왜곡 존재 (교정 필요)", color: "text-amber-600", bg: "bg-amber-50", desc: "일부 문항에서 성인지 왜곡이 발견됩니다. 특정 상황에서 피해자의 입장을 충분히 고려하지 못할 위험이 있으므로, 전문가와의 상담을 통해 자신의 인지 구조를 점검해보는 것이 좋습니다." };
    if (score <= 45) return { title: "성인지 왜곡 위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "성인지 관점에 상당한 왜곡이 존재하며, 이는 실제 행동으로 이어질 위험이 높은 상태입니다. 자신의 사고 패턴이 타인에게 어떤 고통을 줄 수 있는지 깊이 있는 성찰과 전문적인 교정 교육이 시급합니다." };
    return { title: "고위험 왜곡 사고 패턴", color: "text-red-600", bg: "bg-red-50", desc: "매우 위험한 수준의 성인지 왜곡 사고를 보이고 있습니다. 이는 법적 문제뿐만 아니라 심각한 사회적 갈등을 초래할 수 있는 패턴입니다. 즉시 전문적인 심리치료와 행동 교정 프로그램에 참여하시기를 강력히 권고합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {/* Sticky Progress Bar */}
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-[#4F46E5]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-indigo-50 border border-indigo-100 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                  <ClipboardCheck className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="text-indigo-500 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">
                성인지 감수성 <br /> 자가진단 테스트
              </h2>
              <p className="text-slate-500 max-w-lg leading-relaxed">
                나의 성인지 관점은 얼마나 객관적인가요? <br />
                솔직한 답변을 통해 자신의 인지 구조를 점검해 보세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["피해 인식 영역", "책임 인식 영역", "공감 능력 영역", "왜곡 사고 영역"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        id={`gender-q-${globalIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-[#4F46E5] transition-colors">
                            <span className="text-[#4F46E5] font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-[#4F46E5] border-[#4F46E5] text-white shadow-xl shadow-indigo-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:bg-indigo-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                              {answers[globalIdx] === item.score && (
                                <motion.div 
                                  layoutId={`active-indicator-sensitivity-${globalIdx}`}
                                  className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm"
                                >
                                  <div className="w-2 h-2 bg-[#4F46E5] rounded-full" />
                                </motion.div>
                              )}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#4F46E5] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              onClick={() => {
                if (!isComplete) {
                  const firstUnanswered = answers.findIndex(a => a === -1);
                  if (firstUnanswered !== -1) {
                    const element = document.getElementById(`gender-q-${firstUnanswered}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                  return;
                }
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-indigo-100 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <ClipboardCheck className="w-12 h-12 text-[#4F46E5]" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-indigo-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors" />
              <h4 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-400" />
                전문가 소견
              </h4>
              <p className="text-slate-400 leading-relaxed text-lg">
                성인지 왜곡은 단순한 생각의 차이가 아니라, 타인의 권리를 침해할 수 있는 위험한 인지 구조입니다. 특히 '피해자 유발론'이나 '책임 회피'적 사고는 재범의 가장 큰 원인이 됩니다. 저희 센터는 이러한 왜곡된 인지 구조를 객관적으로 분석하고 교정하는 특화 프로그램을 운영하고 있습니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-indigo-50 border border-indigo-100">
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                다음 단계 안내
              </h4>
              <ul className="space-y-6">
                {[
                  "전문가와의 1:1 심층 인지 분석 상담",
                  "성인지 왜곡 교정 특화 교육 이수",
                  "재범 방지를 위한 행동 계약 수립"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-indigo-500 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-[#4F46E5] text-white text-center font-black text-lg rounded-[24px] hover:bg-[#4338ca] transition-all shadow-2xl shadow-indigo-100 active:scale-95"
            >
              상담 및 교육 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const RecidivismRiskTest = () => {
  const [answers, setAnswers] = useState<number[]>(new Array(20).fill(-1));
  const [showResult, setShowResult] = useState(false);

  const questions = [
    { category: "충동 통제 영역", text: "충동적인 행동을 한 후 후회하는 경우가 있다." },
    { category: "충동 통제 영역", text: "스트레스 상황에서 통제력이 약해진다." },
    { category: "충동 통제 영역", text: "음주 후 판단력이 흐려진 경험이 있다." },
    { category: "충동 통제 영역", text: "순간적인 욕구가 이성적 판단을 이긴 적이 있다." },
    { category: "충동 통제 영역", text: "하지 말아야 할 행동을 반복한 경험이 있다." },
    { category: "인지 왜곡 영역", text: "상황이 그렇게 심각하지 않았다고 생각한 적이 있다." },
    { category: "인지 왜곡 영역", text: "상대도 어느 정도 책임이 있다고 느낀 적이 있다." },
    { category: "인지 왜곡 영역", text: "억울함이 먼저 떠오른 적이 있다." },
    { category: "인지 왜곡 영역", text: "법 기준이 지나치게 엄격하다고 느낀 적이 있다." },
    { category: "인지 왜곡 영역", text: "“그 정도는 괜찮다”는 생각이 든 적이 있다." },
    { category: "생활 안정성 영역", text: "최근 스트레스가 많다." },
    { category: "생활 안정성 영역", text: "수면이나 생활 패턴이 불규칙하다." },
    { category: "생활 안정성 영역", text: "음주나 자극적인 콘텐츠 사용이 잦다." },
    { category: "생활 안정성 영역", text: "외로움이나 정서적 고립감을 자주 느낀다." },
    { category: "생활 안정성 영역", text: "건강한 취미나 스트레스 해소 방법이 부족하다." },
    { category: "자기 인식 영역", text: "자신의 행동 패턴을 객관적으로 돌아본 적이 있다.", isReverse: true },
    { category: "자기 인식 영역", text: "비슷한 상황을 피하려는 노력을 하고 있다.", isReverse: true },
    { category: "자기 인식 영역", text: "자신의 감정 상태를 인식하려고 노력한다.", isReverse: true },
    { category: "자기 인식 영역", text: "재발 가능성에 대해 진지하게 고민해 본 적이 있다.", isReverse: true },
    { category: "자기 인식 영역", text: "필요한 도움을 받을 의지가 있다.", isReverse: true },
  ];

  const calculateScore = () => {
    return answers.reduce((acc, curr, idx) => {
      if (curr === -1) return acc;
      const q = questions[idx];
      return acc + (q.isReverse ? (3 - curr) : curr);
    }, 0);
  };

  const totalScore = calculateScore();
  const completedCount = answers.filter(a => a !== -1).length;
  const progress = (completedCount / questions.length) * 100;
  const isComplete = completedCount === questions.length;

  const getResult = (score: number) => {
    if (score <= 15) return { title: "낮은 위험군", color: "text-emerald-600", bg: "bg-emerald-50", desc: "현재 재범 위험성이 매우 낮은 상태입니다. 자신의 행동을 객관적으로 인식하고 있으며, 생활 안정성도 양호합니다. 지금의 긍정적인 변화를 유지하세요." };
    if (score <= 30) return { title: "주의군", color: "text-amber-600", bg: "bg-amber-50", desc: "일부 위험 요인이 존재하며, 특정 상황에서 통제력이 흔들릴 수 있습니다. 인지 왜곡이 고착되지 않도록 주의가 필요하며, 정기적인 자기 점검을 권장합니다." };
    if (score <= 45) return { title: "위험군", color: "text-orange-600", bg: "bg-orange-50", desc: "구조적인 위험 패턴이 형성되어 재범 가능성이 높은 상태입니다. 특히 인지 왜곡과 생활 불균형이 심화되어 있으므로, 즉각적인 전문가의 개입과 체계적인 치료가 필요합니다." };
    return { title: "고위험군", color: "text-red-600", bg: "bg-red-50", desc: "매우 높은 수준의 재범 위험성을 보이고 있습니다. 스스로의 통제가 불가능한 상태이며, 심각한 법적·사회적 문제를 재발시킬 위험이 큽니다. 즉시 전문적인 집중 치료 프로그램에 참여해야 합니다." };
  };

  const result = getResult(totalScore);

  return (
    <div className="max-w-4xl mx-auto pb-24">
      {!showResult && (
        <div className="fixed top-0 left-0 w-full h-1.5 bg-slate-100 z-50">
          <motion.div 
            className="h-full bg-slate-900"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      )}

      {!showResult ? (
        <div className="space-y-16">
          <header className="relative py-12 px-8 rounded-[40px] bg-slate-900 overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full -mr-32 -mt-32" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-indigo-400" />
                </div>
                <span className="text-indigo-400 font-bold tracking-widest text-xs uppercase">Self-Diagnosis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                재범 위험성 <br /> 간이 측정
              </h2>
              <p className="text-slate-400 max-w-lg leading-relaxed">
                전문 도구 기반의 간이 위험도 체크입니다. <br />
                최근 6개월간의 행동 패턴을 기준으로 솔직하게 답변해 주세요.
              </p>
            </div>
          </header>

          <div className="space-y-24">
            {["충동 통제 영역", "인지 왜곡 영역", "생활 안정성 영역", "자기 인식 영역"].map((cat, catIdx) => (
              <section key={cat} className="space-y-10">
                <div className="flex items-baseline gap-4 border-b border-slate-100 pb-6">
                  <span className="text-4xl font-black text-slate-100 leading-none">0{catIdx + 1}</span>
                  <h3 className="text-xl font-bold text-slate-900">{cat}</h3>
                </div>
                
                <div className="space-y-12">
                  {questions.filter(q => q.category === cat).map((q, qIdx) => {
                    const globalIdx = questions.findIndex(item => item.text === q.text);
                    return (
                      <motion.div 
                        key={globalIdx}
                        id={`recidivism-q-${globalIdx}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="group"
                      >
                        <div className="mb-8">
                          <span className="inline-block px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                            Question {globalIdx + 1}
                          </span>
                          <p className="text-xl md:text-2xl text-slate-800 font-medium leading-snug group-hover:text-indigo-600 transition-colors">
                            <span className="text-indigo-500 font-black mr-3 opacity-30 group-hover:opacity-100 transition-opacity">{globalIdx + 1}.</span>
                            {q.text}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { score: 0, label: "전혀 아니다" },
                            { score: 1, label: "가끔 그렇다" },
                            { score: 2, label: "자주 그렇다" },
                            { score: 3, label: "매우 그렇다" }
                          ].map(item => (
                            <button
                              key={item.score}
                              onClick={() => {
                                const newAnswers = [...answers];
                                newAnswers[globalIdx] = item.score;
                                setAnswers(newAnswers);
                              }}
                              className={`relative flex flex-col items-center justify-center py-5 px-4 rounded-2xl transition-all border-2 ${
                                answers[globalIdx] === item.score 
                                  ? 'bg-slate-900 border-slate-900 text-white shadow-xl shadow-slate-100 -translate-y-1' 
                                  : 'bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:bg-indigo-50/30'
                              }`}
                            >
                              <span className={`text-2xl font-black mb-1 ${answers[globalIdx] === item.score ? 'text-white' : 'text-slate-200'}`}>
                                {item.score}
                              </span>
                              <span className="text-[10px] font-bold opacity-80">{item.score}: {item.label}</span>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="pt-20 flex flex-col items-center gap-8">
            <div className="text-center">
              <p className="text-slate-400 text-sm mb-2">진행률 {Math.round(progress)}%</p>
              <div className="w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-900 transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {!isComplete && (
              <p className="text-amber-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4" />
                남은 문항을 모두 완료해 주세요.
              </p>
            )}
            
            <button
              onClick={() => {
                if (!isComplete) {
                  const firstUnanswered = answers.findIndex(a => a === -1);
                  if (firstUnanswered !== -1) {
                    const element = document.getElementById(`recidivism-q-${firstUnanswered}`);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                  return;
                }
                setShowResult(true);
                window.scrollTo(0, 0);
              }}
              className={`w-full max-w-md py-6 rounded-[24px] font-black text-xl tracking-tight transition-all ${
                isComplete 
                  ? 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95' 
                  : 'bg-slate-900 text-white shadow-2xl shadow-slate-200 hover:bg-black hover:-translate-y-1 active:scale-95'
              }`}
            >
              결과 분석 리포트 보기
            </button>
          </div>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-12"
        >
          <div className={`relative p-16 rounded-[60px] text-center ${result.bg} border border-slate-200 overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-24 h-24 rounded-[32px] bg-white shadow-2xl flex items-center justify-center mx-auto mb-10">
                <Scale className="w-12 h-12 text-slate-900" />
              </div>
              <h2 className="text-xl font-bold text-slate-400 mb-2 uppercase tracking-[0.2em]">Analysis Result</h2>
              <div className="text-7xl font-black text-slate-900 mb-10 tracking-tighter">
                {totalScore} <span className="text-2xl font-bold text-slate-300">/ 60</span>
              </div>
              
              <div className={`inline-flex items-center gap-3 px-10 py-4 rounded-full font-black text-2xl mb-10 ${result.color} bg-white shadow-xl shadow-slate-500/5`}>
                <div className={`w-3 h-3 rounded-full animate-pulse bg-current`} />
                {result.title}
              </div>
              
              <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto text-xl font-medium">
                {result.desc}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[40px] bg-slate-900 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full -mr-16 -mt-16 group-hover:bg-indigo-500/20 transition-colors" />
              <h4 className="font-bold text-2xl mb-8 flex items-center gap-3">
                <Zap className="w-6 h-6 text-indigo-400" />
                위험 요인 분석
              </h4>
              <p className="text-slate-400 leading-relaxed text-lg">
                재범 위험성은 고정된 것이 아니라 생활 환경과 인지 상태에 따라 변화합니다. 특히 스트레스 관리 실패와 인지 왜곡의 심화는 가장 큰 위험 신호입니다. 자신의 취약점을 명확히 알고 이를 보완하는 체계적인 관리가 필요합니다.
              </p>
            </div>
            <div className="p-10 rounded-[40px] bg-slate-50 border border-slate-200">
              <h4 className="font-bold text-2xl text-slate-900 mb-8 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-indigo-500" />
                재발 방지 솔루션
              </h4>
              <ul className="space-y-6">
                {[
                  "고위험 상황(High-Risk Situation) 식별 및 회피 전략 수립",
                  "인지 왜곡 교정을 위한 전문 심리치료 프로그램 참여",
                  "생활 안정성 확보를 위한 규칙적인 생활 습관 형성"
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm font-black text-slate-900 shrink-0 shadow-sm">
                      {idx + 1}
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-12">
            <button 
              onClick={() => {
                setAnswers(new Array(20).fill(-1));
                setShowResult(false);
                window.scrollTo(0, 0);
              }}
              className="flex-1 py-6 bg-white text-slate-900 font-black text-lg rounded-[24px] border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95"
            >
              다시 테스트하기
            </button>
            <a 
              href={NAVER_PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-[2] py-6 bg-slate-900 text-white text-center font-black text-lg rounded-[24px] hover:bg-black transition-all shadow-2xl shadow-slate-100 active:scale-95"
            >
              상담 및 교육 신청하기
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const COLUMN_POSTS = [
  { 
    id: "sentencing-material",
    title: "성범죄 가해자의 양형자료로서의 심리치료, 그 진정성의 가치", 
    category: "법률/심리",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/5c20fe13d89f0e3eed075d6b0ba90a74.png",
    content: [
      { type: 'text', value: '사건이 발생한 이후 많은 분들이 깊은 혼란과 두려움 속에서 시간을 보내게 됩니다. 수사와 재판 과정은 낯설고, 앞으로 삶이 어떻게 될지에 대한 불안도 커집니다. 이 과정에서 많은 분들이 "양형자료"라는 말을 듣게 됩니다.\n\n양형자료는 재판 과정에서 판사가 피고인의 삶, 태도, 변화 가능성을 이해하는 데 참고하는 자료입니다. 단순히 서류 몇 장으로 만들어지는 것이 아니라, 그 사람이 사건을 어떻게 바라보고 있는지, 어떤 반성과 변화의 과정을 겪고 있는지를 보여주는 중요한 자료입니다.\n\n그중에서도 심리치료와 상담 기록은 매우 중요한 의미를 가집니다.' },
      { type: 'text', value: '하지만 상담을 단순히 "재판에 도움이 되는 서류" 정도로 생각한다면, 그 가치는 절반도 발휘되지 않습니다. 심리치료의 진짜 의미는 처벌을 줄이기 위한 기술이 아니라, 자신을 이해하고 같은 일이 반복되지 않도록 삶의 방향을 바꾸는 과정에 있습니다.' },
      { type: 'text', value: '많은 성범죄 사건을 상담하다 보면, 대부분의 분들이 스스로를 이렇게 말합니다.\n\n"저도 왜 그런 행동을 했는지 잘 모르겠습니다."\n\n이 말은 단순한 변명이 아니라, 실제로 많은 사람들이 자신의 감정과 충동을 충분히 이해하지 못한 채 행동했다는 것을 보여줍니다. 외로움, 스트레스, 분노, 성에 대한 왜곡된 인식, 관계에서의 좌절감 등 다양한 심리적 요인이 복합적으로 작용하는 경우가 많습니다.' },
      { type: 'text', value: '심리치료는 이러한 마음의 구조를 하나씩 살펴보는 과정입니다. 왜 그런 선택을 하게 되었는지, 어떤 상황에서 충동이 올라오는지, 그리고 앞으로 같은 상황에서 어떻게 다른 선택을 할 수 있을지를 함께 탐색합니다.' },
      { type: 'header', value: '이 과정에서 중요한 것은 "진정성"입니다.' },
      { type: 'text', value: '판사나 조사기관은 단순한 형식적인 상담과, 실제로 변화하려는 사람의 태도를 생각보다 정확하게 구분합니다. 상담을 통해 자신의 행동을 돌아보고, 피해자에게 미쳤을 영향을 이해하려 노력하며, 재발을 막기 위한 구체적인 노력을 시작하는 사람은 분명히 다르게 보입니다.' },
      { type: 'text', value: '또 하나 중요한 점은, 심리치료는 재판을 위한 과정이기도 하지만 동시에 "앞으로의 삶을 위한 과정"이라는 것입니다.\n\n사건 이후 많은 분들이 말합니다.\n\n"이 일을 겪고 나서야 제 삶을 돌아보게 되었습니다."\n\n상담은 단순히 사건을 설명하는 시간이 아니라, 그동안 미뤄두었던 자신의 마음을 정리하고, 더 건강한 방식으로 살아갈 방법을 배우는 시간입니다.' },
      { type: 'text', value: '우리 상담센터에서는 사건의 법적 상황만을 바라보지 않습니다. 한 사람의 삶 전체를 함께 바라보며, 왜 이런 일이 일어났는지 이해하고 다시는 같은 일이 반복되지 않도록 돕는 것을 가장 중요한 목표로 삼고 있습니다.' },
      { type: 'text', value: '심리치료 기록과 상담 소견은 이러한 변화의 과정을 객관적으로 정리하여 양형자료로 활용될 수 있습니다. 그러나 그보다 더 중요한 것은, 상담 과정 자체가 한 사람의 삶을 다시 정리하는 출발점이 될 수 있다는 점입니다.' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 어렵고 혼란스럽습니다. 하지만 그 시간을 어떻게 보내느냐에 따라 앞으로의 삶은 분명히 달라질 수 있습니다.\n\n만약 지금 마음이 복잡하고, 어디서부터 정리해야 할지 모르겠다면 상담을 통해 자신의 이야기를 차분히 풀어보는 것도 하나의 방법이 될 수 있습니다.' },
      { type: 'header', value: '진정한 변화는 이해에서 시작됩니다.' },
      { type: 'text', value: '그리고 그 이해는 혼자서보다, 함께 이야기할 때 더 분명해집니다.' }
    ]
  },
  { 
    id: "what-judges-look-for",
    title: "성범죄 사건에서 판사가 실제로 보는 것 7가지", 
    subtitle: "재판은 단순히 사건의 사실만 보는 과정이 아닙니다.\n판사는 사건의 내용뿐 아니라 그 사람의 태도, 변화 가능성, 사건 이후의 행동까지 함께 살펴보게 됩니다.",
    category: "법률/심리",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/78477f2b9e3e7de356790d754d394f12.png",
    content: [
      { type: 'text', value: '성범죄 사건을 겪게 되면 많은 사람들이 가장 궁금해하는 질문이 있습니다.\n\n“판사는 무엇을 가장 중요하게 볼까요?”\n\n재판은 단순히 사건의 사실만 보는 과정이 아닙니다.\n판사는 사건의 내용뿐 아니라 그 사람의 태도, 변화 가능성, 사건 이후의 행동까지 함께 살펴보게 됩니다.\n\n실제 많은 사건을 보면 판사가 중요하게 보는 요소에는 몇 가지 공통적인 부분이 있습니다.' },
      { type: 'header', value: '1. 사건의 구체적인 내용' },
      { type: 'text', value: '가장 기본적으로는 사건 자체의 내용입니다.\n\n어떤 상황에서 사건이 발생했는지\n피해자와의 관계는 어떠했는지\n행동의 정도는 어떠했는지\n\n이러한 요소들은 판결에서 매우 중요한 기준이 됩니다.' },
      { type: 'header', value: '2. 사건 이후의 태도' },
      { type: 'text', value: '판사는 사건 이후 피고인이 어떤 태도를 보이는지도 중요하게 봅니다.\n\n예를 들어\n자신의 행동을 어떻게 바라보고 있는지\n사건에 대해 어떤 인식을 가지고 있는지\n책임을 회피하려 하는지, 아니면 돌아보려 하는지\n\n이러한 태도는 그 사람이 사건을 어떻게 이해하고 있는지를 보여주는 중요한 요소가 됩니다.' },
      { type: 'header', value: '3. 피해자에 대한 인식' },
      { type: 'text', value: '성범죄 사건에서는 특히 피해자의 관점에 대한 이해가 중요하게 고려됩니다.\n\n자신의 행동이 상대에게 어떤 영향을 주었는지\n피해자가 느꼈을 수 있는 감정\n피해 상황에 대한 인식\n\n이러한 부분을 이해하려는 태도가 보일 때\n그 반성은 더 설득력을 가지게 됩니다.' },
      { type: 'header', value: '4. 재발 가능성' },
      { type: 'text', value: '판사는 사건 자체뿐 아니라 앞으로 같은 일이 반복될 가능성도 중요하게 봅니다.\n\n그래서 다음과 같은 부분을 살펴보게 됩니다.\n\n충동적인 행동 패턴이 있는지\n사건 이후 어떤 노력을 하고 있는지\n행동을 바꾸기 위한 과정이 있는지\n\n이러한 요소들은 재범 위험성을 판단하는 데 중요한 기준이 됩니다.' },
      { type: 'header', value: '5. 사건 이후의 노력' },
      { type: 'text', value: '많은 사건에서 판사는 사건 이후 어떤 노력을 하고 있는지를 함께 봅니다.\n\n예를 들어\n자신의 행동을 돌아보는 과정\n심리상담이나 치료 참여\n재발 방지를 위한 노력\n\n이러한 과정은 단순한 말이 아니라 실제 변화하려는 행동으로 평가될 수 있습니다.' },
      { type: 'header', value: '6. 일관된 태도' },
      { type: 'text', value: '판사는 한 사람의 태도를 전체적으로 일관되게 살펴봅니다.\n\n진술 내용\n반성문\n상담 기록\n사건 이후의 행동\n\n이 모든 부분이 서로 일관되게 나타날 때\n그 사람의 태도는 더 신뢰를 얻을 수 있습니다.' },
      { type: 'header', value: '7. 앞으로의 변화 가능성' },
      { type: 'text', value: '마지막으로 판사는 그 사람이 앞으로 어떻게 살아갈 가능성이 있는지도 중요하게 봅니다.\n\n사람은 누구나 실수를 할 수 있습니다.\n하지만 중요한 것은 그 이후에 어떤 선택을 하느냐입니다.\n\n자신의 행동을 이해하려 노력하는지\n같은 일이 반복되지 않도록 준비하고 있는지\n삶의 방향을 다시 세우려 하는지\n\n이러한 과정은 변화 가능성을 보여주는 중요한 요소가 됩니다.' },
      { type: 'header', value: '재판은 과거만 보는 것이 아닙니다' },
      { type: 'text', value: '많은 사람들이 재판을 이미 지나간 사건만 평가하는 과정이라고 생각합니다.\n하지만 실제로는 사건 이후의 태도와 변화 과정도 함께 고려됩니다.\n\n그래서 사건 이후의 시간은 매우 중요합니다.\n그 시간을 단순히 두려움 속에서 보내기보다\n자신의 삶을 돌아보고 정리하는 과정으로 사용한다면\n앞으로의 삶에도 분명 의미 있는 시간이 될 수 있습니다.' },
      { type: 'header', value: '사건 이후의 시간' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 어렵습니다.\n불안과 후회 속에서 시간을 보내는 경우도 많습니다.\n하지만 그 시간이 삶을 다시 정리하는 시작이 될 수도 있습니다.\n\n우리 상담센터에서는 단순히 사건만을 바라보지 않습니다.\n한 사람의 삶 전체를 함께 바라보며\n사건을 이해하고\n재발을 막고\n앞으로 더 건강한 삶의 방향을 찾을 수 있도록 돕는 것을 목표로 합니다.\n\n혼자서 모든 것을 감당하려 하지 않아도 됩니다.\n때로는 누군가와 함께 이야기하는 것만으로도\n많은 것이 정리되기 시작합니다.' }
    ]
  },
  { 
    id: "importance-of-investigation-stage-counseling",
    title: "수사 단계에서 심리상담이 중요한 이유", 
    subtitle: "성범죄 사건이 발생하면 대부분의 사람들은 먼저 법적인 문제에 집중하게 됩니다. 하지만 수사 단계에서 상담을 시작하는 것이 훨씬 의미 있는 경우가 많습니다.",
    category: "수사 대응",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/be87f24080fec71969109cbf32b4e081.png",
    content: [
      { type: 'text', value: '성범죄 사건이 발생하면 대부분의 사람들은 먼저 법적인 문제에 집중하게 됩니다. 변호사를 선임하고, 조사에 대비하고, 앞으로 재판이 어떻게 진행될지 걱정하게 됩니다. 그래서 많은 분들이 이렇게 생각합니다.\n\n"상담은 재판 전에 양형자료 준비할 때 받으면 되는 것 아닌가요?"\n\n하지만 실제 상담 현장에서 보면 **수사 단계에서 상담을 시작하는 것이 훨씬 의미 있는 경우가 많습니다.**\n\n왜냐하면 수사 단계는 단순히 사건이 진행되는 시간이 아니라, **자신의 삶과 행동을 정리해야 하는 가장 중요한 시기**이기 때문입니다.' },
      { type: 'header', value: '1. 수사 단계는 가장 혼란스러운 시기입니다' },
      { type: 'text', value: '사건이 발생한 직후 사람들은 매우 복잡한 감정 상태에 놓이게 됩니다.\n\n* 앞으로 어떻게 될지 모른다는 불안\n* 주변 사람들에게 알려질까 하는 두려움\n* 후회와 억울함이 동시에 올라오는 감정\n* 경찰 조사나 수사 과정에 대한 긴장\n\n이러한 감정 속에서는 자신의 상황을 **차분하고 객관적으로 바라보기 어렵습니다.**\n\n그래서 이 시기에는 단순히 법적인 대응뿐 아니라 **마음을 정리하는 과정**이 함께 필요합니다.\n\n심리상담은 이러한 혼란 속에서 자신의 감정을 정리하고 사건을 조금 더 차분하게 바라볼 수 있도록 돕는 과정이 됩니다.' },
      { type: 'header', value: '2. 사건을 객관적으로 바라볼 수 있게 됩니다' },
      { type: 'text', value: '많은 내담자들이 상담실에서 이렇게 말합니다.\n\n"그때는 왜 그런 판단을 했는지 지금도 잘 이해가 안 됩니다."\n\n사건이 발생하는 순간에는\n\n* 감정이 격해져 있거나\n* 술이나 스트레스 상황에 있거나\n* 관계 속에서 판단이 흐려져 있는 경우가 많습니다.\n\n심리상담에서는 이러한 상황을 하나씩 돌아보면서\n\n* 사건 당시의 감정 상태\n* 판단이 흐려진 순간\n* 관계 속에서의 오해\n* 충동이 올라오는 패턴\n\n이러한 요소들을 함께 살펴보게 됩니다.\n\n이 과정은 단순히 사건을 설명하는 것이 아니라 **자신의 행동을 이해하는 과정**입니다.' },
      { type: 'header', value: '3. 재발을 막기 위한 준비가 시작됩니다' },
      { type: 'text', value: '성범죄 사건에서 가장 중요한 것은 단순한 사과보다 **같은 일이 반복되지 않는 것**입니다.\n\n그래서 상담에서는 다음과 같은 부분을 함께 다루게 됩니다.\n\n* 어떤 상황에서 충동이 올라오는지 이해하기\n* 성에 대한 왜곡된 생각이나 판단 점검하기\n* 감정과 스트레스를 건강하게 다루는 방법 배우기\n* 관계 속에서의 경계와 책임 이해하기\n\n이러한 과정은 단순한 대화가 아니라 **행동을 바꾸기 위한 실제적인 준비 과정**입니다.' },
      { type: 'header', value: '4. 변화의 과정이 기록으로 남습니다' },
      { type: 'text', value: '수사 단계에서 시작된 상담은 일정 기간 동안 자신의 행동을 돌아보고 변화하려는 과정을 기록으로 남길 수 있습니다.\n\n재판 과정에서는 피고인이 사건 이후 **어떤 태도로 자신의 행동을 바라보고 있는지**가 중요한 요소로 고려됩니다.\n\n단기간에 급하게 작성된 반성문보다\n\n* 일정 기간 동안 상담을 통해 자신의 행동을 성찰한 기록\n* 재발 방지를 위해 노력하는 과정\n* 자신의 생각과 태도의 변화\n\n이러한 과정이 드러날 때 그 기록은 훨씬 의미 있는 자료가 될 수 있습니다.\n\n하지만 상담의 목적은 단순히 재판을 위한 자료를 만드는 데 있지 않습니다.\n\n상담의 가장 중요한 목적은 **사건 이후의 삶을 다시 정리하는 것**입니다.' },
      { type: 'header', value: '5. 사건 이후의 시간을 어떻게 보내느냐가 중요합니다' },
      { type: 'text', value: '사건 이후 많은 사람들이 두려움과 불안 속에서 시간을 보내게 됩니다.\n\n어떤 분들은 혼자서 모든 것을 감당하려고 하면서 더 큰 스트레스를 경험하기도 합니다.\n\n하지만 이 시간을 **어떻게 보내느냐에 따라 앞으로의 삶은 분명히 달라질 수 있습니다.**\n\n심리상담은 단순히 사건을 이야기하는 자리가 아니라\n\n* 자신의 행동을 이해하고\n* 같은 일이 반복되지 않도록 준비하고\n* 앞으로의 삶의 방향을 다시 정리하는 과정이 될 수 있습니다.\n\n우리 상담센터에서는 사건의 법적 상황만을 바라보지 않습니다.\n\n한 사람의 삶 전체를 함께 바라보며\n\n* 사건이 왜 발생했는지 이해하고\n* 재발을 막고\n* 더 건강한 삶의 방향을 찾을 수 있도록 돕는 것을 목표로 합니다.\n\n사건 이후의 시간은 누구에게나 어렵게 느껴질 수 있습니다.\n\n하지만 그 시간이 **삶을 다시 정리하는 시작이 될 수도 있습니다.**\n\n혼자서 모든 것을 버티려고 하지 않아도 됩니다.\n\n때로는 전문가와 함께 이야기하는 것만으로도 생각보다 많은 것이 정리되기 시작합니다.' }
    ]
  },
  { 
    id: "recidivism-mechanism",
    title: "성범죄는 왜 반복되는가", 
    subtitle: "행동 뒤에 숨겨진 심리적 메커니즘\n“멈추고 싶지만 반복되는 이유”",
    category: "심리 분석",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/796d18ec61eaf3bd47cfd442a68b326a.png",
    content: [
      { type: 'text', value: '성범죄 사건을 상담하다 보면 많은 사람들이 비슷한 이야기를 합니다.\n\n“저도 왜 그런 행동을 했는지 잘 모르겠습니다.”\n“그 순간에는 그렇게까지 큰 문제가 될 거라고 생각하지 못했습니다.”\n“지금 생각해 보면 왜 그랬는지 이해가 안 됩니다.”\n\n이 말은 단순한 변명이 아니라, 실제로 많은 사람들이 자신의 행동을 정확히 이해하지 못한 채 행동했다는 사실을 보여줍니다.\n\n성범죄는 단순히 한 번의 선택으로만 설명되기 어려운 경우가 많습니다.\n그 뒤에는 여러 심리적 요인이 복합적으로 작용하는 구조가 존재합니다.' },
      { type: 'header', value: '1. 순간적인 충동과 판단의 흐려짐' },
      { type: 'text', value: '많은 사건이 순간적인 충동 속에서 발생합니다.\n\n예를 들어\n\n술에 취한 상태\n감정이 격해진 상황\n관계에서의 오해\n인터넷이나 자극적인 콘텐츠에 노출된 상태\n\n이러한 상황에서는 평소보다 판단력이 크게 떨어질 수 있습니다.\n\n문제는 그 순간에는 “이 정도는 괜찮겠지”라는 생각이 들지만,\n사건이 발생한 뒤에는 그 선택이 매우 큰 결과를 가져온다는 것입니다.' },
      { type: 'header', value: '2. 성에 대한 왜곡된 인식' },
      { type: 'text', value: '상담을 하다 보면 일부 사람들은 성에 대해 잘못된 인식을 가지고 있는 경우가 있습니다.\n\n예를 들어\n\n상대도 싫지 않았을 것이라고 생각했다\n이 정도 행동은 큰 문제가 아니라고 생각했다\n상대가 거절하지 않았다고 느꼈다\n\n하지만 이러한 생각은 실제 상황과 다르게 해석된 경우가 많습니다.\n\n특히 현대 사회에서는 동의와 경계에 대한 기준이 매우 중요하게 여겨지고 있기 때문에,\n과거의 잘못된 인식이 그대로 행동으로 이어질 경우 큰 문제가 될 수 있습니다.' },
      { type: 'header', value: '3. 외로움과 관계의 좌절' },
      { type: 'text', value: '생각보다 많은 사건에서 외로움이나 관계의 좌절이 배경으로 존재하기도 합니다.\n\n인간관계의 단절\n연애 관계의 실패\n성적 욕구의 왜곡된 해소 방식\n\n이러한 상황에서 사람들은 건강하지 않은 방식으로 욕구를 해소하려 하기도 합니다.\n\n하지만 이런 방식은 문제를 해결하기보다 더 큰 문제를 만들게 되는 경우가 많습니다.' },
      { type: 'header', value: '4. 반복되는 행동 패턴' },
      { type: 'text', value: '성범죄가 반복되는 가장 큰 이유 중 하나는 행동 패턴을 이해하지 못하기 때문입니다.\n\n예를 들어\n\n특정 상황에서 충동이 올라온다\n특정 감정 상태에서 판단이 흐려진다\n특정 자극에 반복적으로 노출된다\n\n이러한 패턴을 이해하지 못하면,\n같은 상황이 다시 왔을 때 비슷한 선택을 할 가능성이 생길 수 있습니다.\n\n그래서 성범죄 사건에서는 단순한 사과보다 재발 방지를 위한 이해와 변화 과정이 중요하게 여겨집니다.' },
      { type: 'header', value: '5. 변화는 이해에서 시작됩니다' },
      { type: 'text', value: '많은 사람들은 사건 이후 이렇게 말합니다.\n\n“이 일을 겪고 나서야 제 삶을 돌아보게 되었습니다.”\n\n심리상담은 단순히 사건을 설명하는 시간이 아니라,\n\n자신의 행동을 이해하고\n잘못된 인식을 바로잡고\n같은 일이 반복되지 않도록 삶의 방식을 바꾸는 과정입니다.\n\n이 과정에서 사람들은 자신의 감정, 충동, 관계 방식에 대해 처음으로 깊이 이해하게 되는 경우가 많습니다.' },
      { type: 'header', value: '사건 이후의 시간' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 쉽지 않습니다.\n\n두려움, 후회, 혼란 속에서 시간을 보내는 경우도 많습니다.\n하지만 그 시간을 어떻게 보내느냐에 따라 앞으로의 삶은 분명히 달라질 수 있습니다.\n\n우리 상담센터에서는 단순히 사건만을 바라보지 않습니다.\n한 사람의 삶 전체를 함께 바라보며\n\n왜 이런 일이 발생했는지 이해하고\n같은 일이 반복되지 않도록 돕고\n앞으로 더 건강한 방식으로 살아갈 수 있도록 지원하는 것을 목표로 합니다.\n\n진정한 변화는 처벌이 아니라 이해에서 시작됩니다.\n\n그리고 그 이해는 혼자보다, 전문가와 함께할 때 더 분명해질 수 있습니다.' }
    ]
  },
  { 
    id: "digital-distortion",
    title: "디지털 성범죄 가해자의 인지 왜곡과 교정 방향", 
    subtitle: "디지털 성범죄, “나는 그렇게까지 나쁜 사람은 아니다”라는 생각에서 시작됩니다",
    category: "디지털 성범죄",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/a097200e74874a98b864261e7a3ab6c5.jpg",
    content: [
      { type: 'text', value: '디지털 성범죄로 조사를 받거나, 이미 처벌을 경험하신 분들 중 상당수는 이렇게 말합니다.\n“그냥 호기심이었다.”\n“다들 보는 줄 알았다.”\n“실제 만난 것도 아닌데 그렇게 큰 문제인가요?”\n“저는 피해를 줄 생각은 없었습니다.”\n이 말들은 변명이 아니라, 그 당시 당신의 진짜 생각이었을 가능성이 큽니다.\n그리고 바로 그 지점이, 우리가 함께 들여다봐야 할 ‘인지 왜곡’의 출발점입니다.' },
      { type: 'header', value: '1. 디지털 성범죄 가해자의 ‘인지 왜곡’이란 무엇인가' },
      { type: 'text', value: '인지 왜곡은 쉽게 말해,\n내가 나를 지키기 위해 스스로를 설득하는 생각의 방식입니다.\n디지털 성범죄 영역에서는 이런 생각들이 자주 나타납니다.\n“상대도 어느 정도는 동의했을 것이다.”\n“온라인이니까 현실과는 다르다.”\n“이미 인터넷에 떠도는 건데 내가 본다고 달라질 게 있나.”\n“저 사람도 노출을 했으니 책임이 있다.”\n“나는 촬영만 했지 유포는 안 했다.”\n이 생각들은 순간적으로는 마음을 편하게 해줍니다.\n하지만 그 편안함이 반복되면, 행동은 점점 더 쉽게 넘어가게 됩니다.\n죄책감이 줄어들수록, 충동은 빨라집니다.' },
      { type: 'header', value: '2. 왜 이런 왜곡이 생길까요?' },
      { type: 'text', value: '많은 분들이 “내가 원래 그런 사람이냐”고 묻습니다.\n그렇지 않습니다.\n디지털 환경은 다음과 같은 특징을 가지고 있습니다.\n상대의 표정이 보이지 않는다.\n고통이 즉각적으로 느껴지지 않는다.\n클릭 한 번이면 접근이 가능하다.\n자극이 강할수록 뇌는 더 빨리 반응한다.\n이 환경 속에서 사람은 점점 감각이 무뎌집니다.\n특히 반복적으로 자극적인 영상, 이미지, 채팅을 접하면\n뇌는 점점 더 강한 자극을 찾게 됩니다.\n그러다 보면 어느 순간\n“이 정도는 괜찮겠지”라는 생각이 자연스럽게 올라옵니다.\n그게 바로 왜곡의 자동화입니다.' },
      { type: 'header', value: '3. 디지털 성범죄의 핵심 문제는 ‘충동’이 아니라 ‘해석’입니다' },
      { type: 'text', value: '많은 분들이 “충동이 문제다”라고 생각합니다.\n하지만 실제 상담을 해보면, 더 근본적인 문제는 사건을 바라보는 해석 구조입니다.\n예를 들어,\n외로움 → 자극적인 콘텐츠 탐색 → 일시적 해소 → 죄책감 → 다시 외로움\n스트레스 → 음주 → 판단력 저하 → 온라인 접촉 → 후회\n이 과정에서 중요한 것은\n“나는 통제할 수 없었다”는 생각입니다.\n하지만 실제로는 통제 불능이 아니라\n왜곡된 해석이 행동을 정당화한 것에 가깝습니다.' },
      { type: 'header', value: '4. 교정은 ‘혼내는 것’이 아니라 ‘다시 보는 것’입니다' },
      { type: 'text', value: '저희 상담센터에서는 가해자를 비난하지 않습니다.\n그 대신 묻습니다.\n그때 당신은 무엇을 느끼고 있었나요?\n그 행동 전, 어떤 생각이 스쳤나요?\n그 생각은 정말 사실이었나요?\n피해자는 어떤 감정을 겪었을까요?\n처벌은 이미 받았거나 받게 될 것입니다.\n상담은 처벌을 대신하는 것이 아닙니다.\n상담은 재발을 막기 위한 구조를 만드는 과정입니다.\n인지 왜곡을 교정한다는 것은\n“나는 나쁜 사람이다”라고 몰아붙이는 게 아니라,\n“내 생각이 어디서부터 잘못 해석되었는지”를 차분히 살펴보는 일입니다.' },
      { type: 'header', value: '5. 많은 가해자들이 공통적으로 말하는 것' },
      { type: 'text', value: '상담을 진행하다 보면 이런 말을 자주 듣습니다.\n“그때는 그렇게 심각한 줄 몰랐습니다.”\n“지금 생각하면 왜 그랬는지 모르겠습니다.”\n“다시는 그러고 싶지 않습니다.”\n이 말이 진심이라면,\n그 다음 단계는 구조를 바꾸는 것입니다.\n트리거(유발 상황) 파악\n왜곡된 생각 문장 교정\n피해자 공감 훈련\n온라인 사용 습관 재설계\n충동 차단 전략 수립\n이 과정 없이 “다짐”만으로는 오래가기 어렵습니다.' },
      { type: 'header', value: '6. 당신이 상담을 받아야 하는 이유' },
      { type: 'text', value: '상담은 유리한 자료를 만들기 위한 형식 절차가 아닙니다.\n물론 양형자료에 도움이 될 수는 있습니다.\n하지만 더 중요한 것은,\n“나는 다시는 같은 실수를 반복하지 않겠다”는 것을\n구체적인 계획으로 증명하는 과정이라는 점입니다.\n재범을 막지 못하면\n인생은 같은 자리에서 다시 무너집니다.\n하지만 구조를 바꾸면,\n사건은 인생의 끝이 아니라 전환점이 될 수 있습니다.' },
      { type: 'header', value: '마지막으로, 당신에게 묻고 싶습니다' },
      { type: 'text', value: '지금 이 글을 읽고 있다면\n마음 한쪽에 이런 생각이 있을 수 있습니다.\n“나는 정말 바뀔 수 있을까?”\n네, 바뀔 수 있습니다.\n하지만 혼자서 왜곡을 교정하기는 어렵습니다.\n왜냐하면 왜곡은\n이미 당신의 생각처럼 느껴지기 때문입니다.\n전문적인 심리 상담은\n당신을 판단하기 위해 존재하는 것이 아니라,\n당신이 스스로를 다시 이해하도록 돕기 위해 존재합니다.\n잘못은 분명히 책임져야 합니다.\n그러나 그 책임이\n당신의 삶 전체를 파괴하도록 둘 필요는 없습니다.\n지금이 바로,\n생각의 구조를 바꾸는 출발점이 될 수 있습니다.\n저희는 비난보다 구조를 봅니다.\n감정보다 원인을 봅니다.\n그리고 재발 방지라는 현실적인 목표를 봅니다.\n당신이 진심으로 멈추고 싶다면,\n그 출발은 혼자가 아니라 함께 가야 합니다.' }
    ]
  },
  { 
    id: "family-support",
    title: "가족의 지지가 재범 방지에 미치는 영향", 
    category: "가족 상담",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/e1c1a882b51b29c3b836a615b1f12eea.png",
    content: [
      { type: 'text', value: '성범죄 사건 이후 많은 분들이 깊은 혼란과 두려움 속에 시간을 보내게 됩니다. 사건 자체도 충격이지만, 그 이후의 삶이 어떻게 될지에 대한 불안이 더 크게 다가오기도 합니다. 이 과정에서 가장 중요한 요소 중 하나가 바로 가족의 지지입니다.' },
      { type: 'header', value: '사건 이후의 심리 상태' },
      { type: 'text', value: '사건 이후 많은 사람들은 죄책감, 수치심, 두려움, 억울함, 분노 등 복잡한 감정을 동시에 경험합니다. 이러한 감정은 스스로를 고립시키거나 삶을 포기하고 싶게 만들기도 합니다. 하지만 이런 상태에서 혼자 버티는 것은 매우 어렵습니다.\n\n이때 가족의 태도는 매우 큰 영향을 미칩니다. 비난과 단절은 사람을 더 깊은 절망으로 밀어 넣을 수 있지만, 차분한 지지와 책임을 함께 바라보는 태도는 변화의 가능성을 만들어 줍니다.' },
      { type: 'header', value: '왜 가족의 지지가 중요한가' },
      { type: 'text', value: '많은 심리 연구에서도 재범 방지에 가장 큰 영향을 미치는 요소 중 하나로 지지적 관계가 언급됩니다. 사람은 완전히 혼자가 되었을 때 오히려 자신의 행동을 직면하기보다 회피하려는 경향이 강해집니다.\n\n반대로 가족이 "문제는 분명히 있지만, 함께 해결해보자"는 태도를 보일 때 사람은 자신의 행동을 돌아보고 변화하려는 힘을 얻기 시작합니다.\n\n이는 단순한 위로가 아니라, 책임과 변화의 방향을 함께 바라보는 건강한 지지입니다.' },
      { type: 'header', value: '변화는 혼자서 이루어지지 않는다' },
      { type: 'text', value: '재범을 막는 가장 중요한 과정은 자신의 행동을 이해하고 통제하는 능력을 회복하는 것입니다. 충동이 왜 발생했는지, 어떤 상황에서 위험이 커지는지, 앞으로 어떻게 다른 선택을 할 수 있는지를 배우는 과정이 필요합니다.\n\n이 과정에서 가족의 역할은 단순한 보호가 아니라 변화를 함께 지켜보는 사람이 되는 것입니다.\n\n가족이 관심을 가지고 변화 과정을 함께 이해할 때, 당사자 역시 자신의 삶을 다시 정리할 용기를 얻을 수 있습니다.' },
      { type: 'header', value: '심리상담이 필요한 이유' },
      { type: 'text', value: '많은 분들이 사건 이후 "시간이 지나면 괜찮아지겠지"라고 생각합니다. 그러나 충동의 구조나 왜곡된 생각은 스스로 정리하기가 쉽지 않습니다.\n\n전문적인 심리상담은 다음과 같은 부분을 다룹니다.\n\n• 사건을 일으킨 심리적 배경 이해\n• 왜곡된 인식과 판단 교정\n• 충동 관리와 감정 조절 훈련\n• 재범 위험 상황에 대한 대비\n\n또한 상담 과정은 가족에게도 큰 도움이 됩니다. 가족이 어떻게 지지하고, 어떤 태도를 취해야 하는지에 대한 방향을 함께 이해할 수 있기 때문입니다.' },
      { type: 'header', value: '다시 삶을 정리하는 과정' },
      { type: 'text', value: '사건 이후의 삶은 누구에게나 쉽지 않습니다. 그러나 중요한 것은 지금 이후의 선택입니다.\n\n자신의 행동을 돌아보고, 필요한 도움을 받고, 삶을 다시 정리하려는 노력은 분명히 의미 있는 변화의 시작이 될 수 있습니다.\n\n심리상담은 단순히 문제를 해결하기 위한 절차가 아니라, 자신의 삶을 다시 책임 있게 살아가기 위한 과정입니다.\n\n혼자서 버티기 어렵다면 전문가의 도움을 받는 것도 하나의 용기 있는 선택이 될 수 있습니다.\n\n변화는 비난 속에서 시작되지 않습니다.\n\n이해와 책임, 그리고 지지 속에서 시작됩니다.' }
    ]
  },
  { 
    id: "impulse-correlation",
    title: "충동 조절 장애와 성범죄의 상관관계", 
    category: "정신건강",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/c8e33c77f1c750bb6cd1ce25a6b907f1.png",
    content: [
      { type: 'text', value: '많은 성범죄 사건을 상담 현장에서 만나면서 공통적으로 발견되는 특징 중 하나는 ‘충동을 조절하는 어려움’입니다. 물론 모든 사건이 동일한 원인에서 발생하는 것은 아닙니다. 하지만 순간적인 욕구나 자극을 통제하지 못하는 문제는 여러 사건에서 중요한 심리적 배경으로 나타납니다.' },
      { type: 'text', value: '충동은 인간이라면 누구나 경험합니다. 어떤 이미지를 보거나, 특정한 상황에 놓이거나, 감정이 강하게 올라올 때 순간적인 욕구가 생길 수 있습니다. 문제는 충동 자체가 아니라 그 충동을 어떻게 다루느냐입니다.' },
      { type: 'text', value: '어떤 사람은 충동이 올라와도 잠시 멈추고 생각합니다. ‘이 행동이 어떤 결과를 가져올까?’ ‘지금 이 행동이 옳은 선택일까?’ 이런 과정이 작동하면 행동은 멈추거나 다른 방향으로 바뀌게 됩니다.' },
      { type: 'text', value: '하지만 충동 조절이 약해져 있는 상태에서는 이러한 과정이 충분히 작동하지 않습니다. 순간적인 자극에 반응해 행동이 먼저 나가고, 그 이후에 후회가 따라오는 경우가 많습니다.' },
      { type: 'text', value: '특히 디지털 환경에서는 이러한 문제가 더 쉽게 발생합니다. 스마트폰, 인터넷, 익명성, 빠른 자극은 사람의 충동을 더 강하게 자극합니다. 평소에는 하지 않았을 행동도 특정 상황에서는 판단이 흐려질 수 있습니다.' },
      { type: 'text', value: '상담을 하다 보면 많은 분들이 비슷한 말을 합니다.\n\n“그때 왜 그랬는지 모르겠습니다.”\n“순간적으로 판단을 못 했습니다.”\n“지금 생각하면 정말 어리석은 행동이었습니다.”\n\n이 말들은 단순한 변명이 아니라 실제 심리 상태를 보여주는 경우가 많습니다. 충동이 강하게 올라오는 순간에는 뇌의 판단 기능이 일시적으로 약해질 수 있기 때문입니다.' },
      { type: 'header', value: '충동 조절 능력은 훈련을 통해 개선될 수 있습니다' },
      { type: 'text', value: '심리상담에서는 단순히 “다시는 그러지 않겠습니다”라는 다짐을 만드는 것이 목표가 아닙니다. 왜 그런 상황이 발생했는지, 어떤 감정과 환경이 충동을 키웠는지, 그리고 앞으로 그 순간을 어떻게 다르게 지나갈 수 있는지를 함께 탐색합니다.\n\n예를 들어 다음과 같은 부분을 함께 다루게 됩니다.\n\n• 어떤 상황에서 충동이 강하게 올라오는지\n• 어떤 감정 상태에서 판단이 흐려지는지\n• 자극을 피하거나 차단하는 방법\n• 충동이 올라오는 순간 멈추는 훈련\n• 건강한 방식으로 욕구를 관리하는 방법' },
      { type: 'text', value: '이 과정은 단순한 반성이 아니라 ‘재발을 막기 위한 실제적인 훈련’이라고 볼 수 있습니다.' },
      { type: 'text', value: '많은 분들이 상담을 시작하기 전에는 이렇게 말합니다.\n\n“이미 벌어진 일인데 상담이 무슨 의미가 있을까요?”\n\n하지만 상담은 과거를 바꾸기 위한 것이 아니라 앞으로의 삶을 바꾸기 위한 과정입니다.' },
      { type: 'text', value: '사건 이후의 태도와 변화 노력은 스스로에게도, 주변 사람들에게도, 그리고 사회적으로도 매우 중요한 의미를 가집니다. 특히 자신의 문제를 직면하고 도움을 받으려는 태도는 진정한 변화의 시작이 될 수 있습니다.' },
      { type: 'text', value: '혼자서 모든 것을 해결하려고 하기보다는 전문가의 도움을 통해 자신의 패턴을 이해하고, 충동을 다루는 방법을 배우는 것이 훨씬 현실적인 해결 방법이 될 수 있습니다.' },
      { type: 'text', value: '심리상담은 누군가를 판단하거나 비난하기 위한 공간이 아닙니다. 오히려 자신의 문제를 솔직하게 바라보고, 더 나은 방향으로 삶을 바꾸기 위한 안전한 공간입니다.' },
      { type: 'text', value: '만약 현재 사건으로 인해 혼란과 불안 속에 있다면, 그리고 스스로의 행동을 돌아보며 변화가 필요하다고 느낀다면 전문가와의 상담이 중요한 전환점이 될 수 있습니다.' },
      { type: 'header', value: '변화는 이해에서 시작됩니다' },
      { type: 'text', value: '변화는 멀리 있는 것이 아니라, 문제를 이해하려는 작은 시작에서부터 만들어집니다.' }
    ]
  },
  { 
    id: "post-trauma-anxiety",
    title: "성범죄 사건 이후 불안과 공포가 계속되는 이유", 
    category: "심리 상담",
    image: "https://9tsiiw6i9140.edge.naverncp.com/files/sgrsoft/202603/9b2da1459e997e0abd235c1aa8eb29c2.png",
    content: [
      { type: 'text', value: '성범죄 사건에 연루된 이후 많은 사람들이 비슷한 이야기를 합니다.\n\n"잠을 제대로 못 잡니다."\n"계속 사건 생각이 납니다."\n"앞으로 어떻게 될지 모르겠어서 너무 불안합니다."\n\n사건 이후 느끼는 불안과 공포는 단순한 걱정 수준을 넘어서는 경우가 많습니다. 수사, 재판, 사회적 시선, 가족 문제 등 여러 요소가 동시에 작용하면서 심리적으로 매우 큰 압박을 경험하게 됩니다.\n\n상담 현장에서 보면 많은 분들이 사건 이후 특정한 심리 패턴을 경험합니다.' },
      { type: 'header', value: '1. 계속 반복되는 생각' },
      { type: 'text', value: '사건 이후 가장 흔하게 나타나는 현상은 생각의 반복입니다.\n\n• "그때 왜 그렇게 행동했을까"\n• "앞으로 어떻게 되는 걸까"\n• "사람들이 알게 되면 어떻게 하지"\n\n이러한 생각이 계속 반복되면서 머릿속에서 사건이 끊임없이 재생되는 것처럼 느껴지기도 합니다.\n\n이런 상태가 지속되면 집중력이 떨어지고 일상생활에도 영향을 주게 됩니다.' },
      { type: 'header', value: '2. 미래에 대한 극단적인 불안' },
      { type: 'text', value: '사건 이후 많은 사람들이 미래에 대해 매우 비관적인 생각을 하게 됩니다.\n\n• "내 인생은 끝난 것 같다"\n• "앞으로 아무것도 할 수 없을 것 같다"\n• "모든 것이 무너질 것 같다"\n\n하지만 이러한 생각은 실제 상황보다 훨씬 더 극단적으로 확대되는 경우가 많습니다.\n\n불안이 커질수록 사람은 상황을 더 부정적으로 해석하는 경향이 있기 때문입니다.' },
      { type: 'header', value: '3. 수치심과 자기비난' },
      { type: 'text', value: '사건 이후 많은 사람들이 강한 수치심을 느끼기도 합니다.\n\n• "나는 정말 문제가 있는 사람인가"\n• "내가 왜 이런 일을 했을까"\n• "사람들이 나를 어떻게 볼까"\n\n이러한 생각이 계속 반복되면 자기비난이 커지고 자존감이 크게 떨어질 수 있습니다.' },
      { type: 'header', value: '4. 주변 시선에 대한 두려움' },
      { type: 'text', value: '많은 분들이 사건 자체보다 주변 사람들의 시선을 더 두려워하기도 합니다.\n\n• 가족\n• 직장\n• 친구\n• 사회적 관계\n\n이러한 관계 속에서 어떤 일이 벌어질지 모른다는 불안이 커지면서 사람들은 점점 더 위축되기도 합니다.' },
      { type: 'header', value: '5. 감정을 혼자서 견디려는 태도' },
      { type: 'text', value: '사건 이후 많은 사람들이 자신의 감정을 혼자서 견디려고 합니다.\n\n• 누구에게도 말하지 못하고\n• 도움을 요청하지 못하고\n• 혼자서 모든 것을 해결하려고 합니다.\n\n하지만 이러한 방식은 오히려 불안을 더 크게 만드는 경우가 많습니다.' },
      { type: 'header', value: '사건 이후의 불안은 자연스러운 반응입니다' },
      { type: 'text', value: '사건 이후 느끼는 불안과 공포는 이상한 반응이 아닙니다. 갑작스러운 상황과 큰 스트레스 속에서 나타나는 자연스러운 심리 반응일 수 있습니다.\n\n하지만 이러한 상태가 오래 지속되면 일상생활과 판단에도 영향을 줄 수 있습니다.\n\n그래서 이 시기에는 자신의 감정을 정리하고 상황을 객관적으로 바라보는 과정이 필요합니다.' },
      { type: 'header', value: '상담이 도움이 되는 이유' },
      { type: 'text', value: '심리상담은 단순히 사건을 이야기하는 시간이 아닙니다.\n\n상담을 통해 많은 사람들이 다음과 같은 과정을 경험합니다.\n\n• 반복되는 생각을 정리하는 과정\n• 사건을 조금 더 객관적으로 이해하는 과정\n• 불안을 조절하는 방법을 배우는 과정\n• 앞으로의 삶을 다시 정리하는 과정\n\n이러한 과정 속에서 처음에는 매우 불안한 상태로 상담을 시작했던 사람들도 시간이 지나면서 점차 마음의 균형을 찾는 경우가 많습니다.' },
      { type: 'header', value: '혼자서 버티지 않아도 됩니다' },
      { type: 'text', value: '사건 이후의 시간은 누구에게나 어렵습니다. 그러나 그 시간을 혼자서만 버틸 필요는 없습니다.\n\n우리 상담센터에서는 사건의 법적 문제만을 바라보지 않습니다. 한 사람의 삶 전체를 함께 바라보며 사건 이후의 불안과 혼란을 정리하고 앞으로의 삶을 다시 세울 수 있도록 돕는 것을 목표로 합니다.\n\n지금의 시간이 매우 힘들게 느껴질 수 있습니다. 하지만 그 시간이 삶을 다시 정리하는 출발점이 될 수도 있습니다.\n\n때로는 누군가와 함께 이야기를 나누는 것만으로도 마음이 조금씩 정리되기 시작합니다.' }
    ]
  }
];

const ArchivePage = ({ title, slug }: { title: string; slug: string }) => {
  const [activeTest, setActiveTest] = useState<string | null>(null);
  const [activePost, setActivePost] = useState<typeof COLUMN_POSTS[0] | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTest, activePost]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white min-h-screen"
    >
      <div className="bg-slate-50 py-12 lg:py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            {(activeTest || activePost) && (
              <button 
                onClick={() => {
                  setActiveTest(null);
                  setActivePost(null);
                }}
                className="p-2 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-[#4F46E5] transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <h1 className="text-2xl lg:text-4xl font-bold text-slate-900">
              {activeTest ? activeTest : activePost ? activePost.category : title}
            </h1>
          </div>
          <p className="text-lg text-slate-500">
            {activeTest 
              ? "객관적인 자가진단을 통해 자신의 상태를 점검해보세요." 
              : activePost
              ? activePost.title
              : "성범죄 예방과 교정을 위한 전문 지식과 사례를 공유합니다."
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24">
        {slug === 'check' && !activeTest && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: "성인지 감수성 자가진단", desc: "나의 성인지 관점은 객관적인가요?", items: 20, id: 'gender' },
              { title: "디지털 성범죄 위험도 체크", desc: "온라인 활동 중 위험 요소가 있나요?", items: 20, id: 'digital' },
              { title: "충동 조절 능력 평가", desc: "특정 상황에서 나의 통제력은 어느 정도인가요?", items: 20, id: 'impulse' },
              { title: "재범 위험성 간이 측정", desc: "전문 도구를 활용한 간이 위험도 체크", items: 20, id: 'recidivism' }
            ].map((item, idx) => (
              <div key={idx} className="p-10 rounded-[32px] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] flex items-center justify-center group-hover:bg-[#4F46E5] group-hover:text-white transition-colors">
                    <ClipboardCheck className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{item.items} 문항</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-8">{item.desc}</p>
                <button 
                  onClick={() => (item.id === 'gender' || item.id === 'digital' || item.id === 'impulse' || item.id === 'recidivism') && setActiveTest(item.title)}
                  className={`w-full py-4 font-bold rounded-2xl transition-colors ${
                    (item.id === 'gender' || item.id === 'digital' || item.id === 'impulse' || item.id === 'recidivism')
                      ? 'bg-slate-900 text-white hover:bg-slate-800' 
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {(item.id === 'gender' || item.id === 'digital' || item.id === 'impulse' || item.id === 'recidivism') ? '테스트 시작하기' : '준비 중입니다'}
                </button>
              </div>
            ))}
          </div>
        )}

        {slug === 'check' && activeTest === "성인지 감수성 자가진단" && (
          <GenderSensitivityTest />
        )}

        {slug === 'check' && activeTest === "디지털 성범죄 위험도 체크" && (
          <DigitalRiskTest />
        )}

        {slug === 'check' && activeTest === "충동 조절 능력 평가" && (
          <ImpulseControlTest />
        )}

        {slug === 'check' && activeTest === "재범 위험성 간이 측정" && (
          <RecidivismRiskTest />
        )}

        {slug === 'column' && !activePost && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {COLUMN_POSTS.map((post, idx) => (
            <div 
              key={idx} 
              className="group cursor-pointer"
              onClick={() => post.content && setActivePost(post)}
            >
              <div className="aspect-video rounded-3xl bg-slate-100 mb-6 overflow-hidden relative">
                <img 
                  src={post.image || `https://picsum.photos/seed/${idx + 10}/800/450`} 
                  alt="Column" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#4F46E5] transition-colors leading-snug">
                  {post.title}
                </h3>
                {post.content && (
                  <div className="flex items-center gap-2 text-[#4F46E5] font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    자세히 보기 <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        )}

        {slug === 'column' && activePost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider">
                  {activePost.category}
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
                {activePost.title}
              </h2>
              {activePost.subtitle && (
                <p className="text-2xl text-slate-500 font-medium italic">
                  “{activePost.subtitle}”
                </p>
              )}
            </div>

            <div className="aspect-video rounded-[40px] overflow-hidden mb-16 shadow-2xl">
              <img 
                src={activePost.image} 
                alt="Post Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-12">
              {activePost.content?.map((block, idx) => (
                <div key={idx}>
                  {block.type === 'header' ? (
                    <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <div className="w-1.5 h-8 bg-indigo-500 rounded-full" />
                      {block.value}
                    </h3>
                  ) : (
                    <p className="text-lg text-slate-600 leading-relaxed whitespace-pre-line">
                      {block.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-24 pt-12 border-t border-slate-100 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-indigo-500" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">변화는 혼자서 어렵지만, 함께라면 가능합니다.</h4>
              <p className="text-slate-500 mb-10 max-w-lg">
                우리 센터는 비난이 아닌 분석으로 접근합니다. <br />
                막연한 후회가 아니라 구체적인 변화 전략을 세우는 공간입니다.
              </p>
              <a 
                href={NAVER_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-5 bg-slate-900 text-white text-center font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-200 active:scale-95"
              >
                전문가와 상담 시작하기
              </a>
            </div>
          </motion.div>
        )}

      {slug !== 'check' && slug !== 'column' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
  );
};

const ApplicationPage = () => {
  useEffect(() => {
    window.location.href = NAVER_PLACE_URL;
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-50 min-h-screen flex items-center justify-center py-24"
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-indigo-100 text-[#4F46E5] rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
          <Calendar className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">네이버 예약으로 이동 중입니다</h1>
        <p className="text-slate-500 mb-8">잠시만 기다려 주세요...</p>
        <a 
          href={NAVER_PLACE_URL}
          className="px-8 py-4 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all"
        >
          이동하지 않는다면 여기를 클릭하세요
        </a>
      </div>
    </motion.div>
  );
};

const Home = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <Hero />
    <HomeIntro />
    <CoreServices />
    <HomeExperts />
    <LegalSection />
    <ProcessSection />
    
    {/* Case Types Quick Grid */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">사건 유형별 전문 대응</h2>
          <p className="text-slate-500">각 사건의 특수성을 고려한 맞춤형 심리 개입 프로그램을 제공합니다.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {NAV_STRUCTURE[2].children?.map((child, idx) => (
            <Link 
              key={idx} 
              to={child.href}
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all text-center group relative z-10 cursor-pointer"
            >
              <span className="text-slate-900 font-bold group-hover:text-[#4F46E5]">{child.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  </motion.div>
);

const PlaceholderPage = ({ title }: { title: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center"
  >
    <h1 className="text-4xl font-bold text-slate-900 mb-6">{title}</h1>
    <p className="text-xl text-slate-500 mb-12">이 페이지는 현재 준비 중입니다. 상세 기획안에 따라 곧 업데이트될 예정입니다.</p>
    <Link to="/" className="inline-flex items-center gap-2 text-[#4F46E5] font-bold hover:underline">
      <ArrowLeft className="w-5 h-5" />
      홈으로 돌아가기
    </Link>
  </motion.div>
);

// --- Main App ---

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* About Routes */}
            {NAV_STRUCTURE[0].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<AboutPage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Treatment Routes */}
            {NAV_STRUCTURE[1].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<TreatmentPage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Case Routes */}
            {NAV_STRUCTURE[2].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<CasePage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Legal Routes */}
            <Route path="/legal/info" element={<LegalPage />} />
            {NAV_STRUCTURE[3].children?.filter(c => c.href !== '/legal/info').map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={child.href.includes('/education/') ? <EducationPage title={child.title} slug={child.href.split('/').pop() || ''} /> : <PlaceholderPage title={child.title} />} 
                />
              </React.Fragment>
            ))}

            {/* Guide Routes */}
            {NAV_STRUCTURE[4].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<GuidePage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}
            
            {/* Archive Routes */}
            {NAV_STRUCTURE[5].children?.map(child => (
              <React.Fragment key={child.href}>
                <Route 
                  path={child.href} 
                  element={<ArchivePage title={child.title} slug={child.href.split('/').pop() || ''} />} 
                />
              </React.Fragment>
            ))}

            {/* Application Route */}
            <Route path="/apply" element={<ApplicationPage />} />
            
            {/* Other Routes */}
            {NAV_STRUCTURE.filter((_, i) => i !== 0 && i !== 1 && i !== 2 && i !== 3 && i !== 4 && i !== 5).map(item => (
              <React.Fragment key={item.title}>
                {item.children?.map(child => (
                  <React.Fragment key={child.href}>
                    <Route 
                      path={child.href} 
                      element={<PlaceholderPage title={child.title} />} 
                    />
                  </React.Fragment>
                ))}
              </React.Fragment>
            ))}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}