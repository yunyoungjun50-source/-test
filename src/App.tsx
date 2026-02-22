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
  Zap
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
const NAV_STRUCTURE: NavItem[] = [
  {
    title: "센터소개",
    href: "/about",
    children: [
      { title: "센터 소개", href: "/about/intro", description: "성범죄 전문 심리치료 특화 기관" },
      { title: "원장 프로필", href: "/about/profile", description: "윤영준 원장의 전문성과 이력" },
      { title: "대표 인사말", href: "/about/greeting", description: "재범방지 중심의 치료 철학" },
      { title: "상담전문가", href: "/about/experts", description: "검증된 성범죄 특화 전문가" },
      { title: "방송/대외활동", href: "/about/activities", description: "공신력 있는 활동 내역" },
      { title: "공지사항", href: "/about/notice" },
      { title: "오시는 길", href: "/about/location", description: "부산 센터 위치 및 주차 안내" },
    ]
  },
  {
    title: "상담/치료",
    href: "/treatment",
    children: [
      { title: "가해자 심리상담", href: "/treatment/offender", description: "사건 전 심리구조 분석 및 교정" },
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
              <span className="text-base lg:text-lg font-bold tracking-tight text-slate-900 leading-none">
                성범죄심리상담치료센터<span className="text-[#4F46E5]">부산</span>
              </span>
              <span className="text-[10px] lg:text-[11px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-0.5">Busan Center</span>
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
            <Link to="/apply" className="px-5 py-2.5 bg-[#4F46E5] text-white text-[14px] font-semibold rounded-full hover:bg-[#4338ca] transition-all shadow-sm hover:shadow-md transform active:scale-95">
              상담 예약하기
            </Link>
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
                <Link to="/apply" className="block w-full py-4 bg-[#4F46E5] text-white text-center font-bold rounded-xl">
                  상담 예약하기
                </Link>
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
            부산 성범죄 특화 심리 상담, <br />
            <span className="text-[#4F46E5]">교정 치료</span> 및 전문 상담
          </h1>
          <p className="text-xl lg:text-2xl text-slate-500 font-medium leading-relaxed max-w-xl mb-12">
            처벌 이후가 아니라, 재발을 막는 것이 진정한 해결입니다. <br className="hidden lg:block" />
            우리는 당신의 변화를 위한 가장 객관적인 조력자가 됩니다.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link to="/apply" className="px-10 py-5 bg-[#4F46E5] text-white text-lg font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 transform hover:-translate-y-1 active:translate-y-0 flex items-center gap-3">
              상담 신청하기
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/legal/info" className="px-10 py-5 bg-white text-slate-900 text-lg font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all hover:bg-slate-50 flex items-center gap-2">
              양형자료 안내
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
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200" 
              alt="Professional Counseling" 
              className="w-full h-[600px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </div>
          
          {/* Floating Cards */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 p-6 bg-white rounded-3xl shadow-2xl border border-slate-100 z-20 max-w-[240px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-bold text-slate-900">신뢰와 보안</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">모든 상담 기록은 암호화되어 철저히 보호됩니다.</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-10 -left-10 p-6 bg-slate-900 text-white rounded-3xl shadow-2xl z-20 max-w-[240px]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <span className="font-bold">법적 조력</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">전문가 소견서 및 양형자료 준비를 완벽히 지원합니다.</p>
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
            name: "김도윤 부원장", 
            role: "범죄심리학 박사", 
            tags: ["재범위험성 평가", "디지털 성범죄"],
            desc: "디지털 성범죄의 심리적 기제 분석 전문가로, 인지 왜곡 교정 프로그램 개발을 주도하고 있습니다. IT 기술과 심리학을 결합한 고도화된 치료 솔루션을 제시합니다.",
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500" 
          },
          { 
            name: "박지은 수석상담사", 
            role: "청소년 성상담 전문가", 
            tags: ["아청법 사건", "가족 시스템 치료"],
            desc: "청소년 및 청년층의 성인지 감수성 향상과 가족 간의 갈등 해결을 통한 재발 방지에 집중합니다. 부모 상담과 병행하는 통합 치료 시스템을 운영합니다.",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500" 
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
          { icon: Users, title: "가해자 심리상담", desc: "사건 전 불안, 충동조절 실패 분석 및 인지왜곡 교정", color: "bg-blue-50 text-blue-600" },
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
  <footer className="bg-white border-t border-slate-100 pt-20 pb-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Scale className="w-6 h-6 text-[#4F46E5]" />
            <span className="text-xl font-bold text-slate-900">성범죄심리상담치료센터부산</span>
          </Link>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            부산 지역 최고의 성범죄 특화 심리치료 전문 기관입니다. 철저한 비밀 보장과 전문적인 개입을 통해 재발 없는 삶을 지원합니다.
          </p>
          <div className="flex gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#4F46E5] hover:text-white transition-all">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#4F46E5] hover:text-white transition-all">
              <PhoneCall className="w-5 h-5" />
            </button>
          </div>
        </div>

        {NAV_STRUCTURE.slice(0, 3).map((item) => (
          <div key={item.title}>
            <h4 className="text-slate-900 font-bold mb-6">{item.title}</h4>
            <ul className="space-y-4">
              {item.children?.map((child) => (
                <li key={child.title}>
                  <Link to={child.href} className="text-slate-500 text-sm hover:text-[#4F46E5] transition-colors">
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
          © 2026 성범죄심리상담치료센터부산. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

// --- Pages ---

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
      <h2 className="text-3xl font-bold text-slate-900 mb-12">자주 묻는 질문 (FAQ)</h2>
      <div className="space-y-6">
        {[
          { q: "음주 상태였는데도 책임이 있나요?", a: "음주 여부와 관계없이 행위에 대한 책임 인식은 매우 중요합니다. 상담은 술에 의존했던 당시의 인식 구조를 정밀하게 재정비하는 과정입니다." },
          { q: "상대방과 관계가 있었는데도 문제가 되나요?", a: "과거의 관계 유무와 무관하게, 해당 시점에서의 명확한 동의 구조가 핵심입니다. 본 센터는 동의 인식의 왜곡 여부를 객관적으로 점검합니다." },
          { q: "억울한 부분이 있어도 상담이 필요한가요?", a: "억울함의 감정과는 별개로, 본인의 행동 패턴에서 나타나는 반복 위험 요인을 점검하고 차단하는 것은 향후 삶을 위해 반드시 필요합니다." }
        ].map((faq, idx) => (
          <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-white">
            <div className="flex gap-4 mb-4">
              <span className="text-[#4F46E5] font-black text-xl">Q.</span>
              <h4 className="text-lg font-bold text-slate-900">{faq.q}</h4>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-300 font-black text-xl">A.</span>
              <p className="text-slate-600 leading-relaxed">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* 8. 이런 분들이 상담을 받습니다 */}
    <section className="p-12 lg:p-20 rounded-[48px] bg-indigo-50 border border-indigo-100">
      <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">이런 분들께 권장합니다</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          "음주 상황에서 의도치 않게 사건이 발생한 경우",
          "상대방과의 관계 해석이 극명하게 엇갈리는 경우",
          "특정 상황에서 충동 통제가 어려웠던 경험이 있는 경우",
          "법적 절차를 앞두고 자신의 심리 상태 정리가 필요한 경우",
          "다시는 같은 실수를 반복하고 싶지 않은 경우"
        ].map((text, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0"></div>
            <span className="text-slate-700 font-medium">{text}</span>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
        <Link to="/apply" className="inline-flex items-center gap-2 px-10 py-5 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-xl shadow-indigo-200">
          지금 바로 상담 신청하기
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  </div>
);

const CasePage = ({ title, slug }: { title: string; slug: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    {/* Page Header */}
    <div className="bg-slate-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 font-bold mb-8 hover:text-indigo-300 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          사건유형 전체보기
        </Link>
        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">{title} 전문 대응</h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          {title} 사건은 법적 처벌뿐만 아니라 심리적 왜곡을 바로잡는 것이 재발 방지의 핵심입니다.
        </p>
      </div>
    </div>

    {/* Content Sections */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {slug === 'rape' ? (
        <RapeCaseContent />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-20">
            
            {/* Section 1: Overview */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-[#4F46E5] flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
              사건 개요 및 심리 상태
            </h2>
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
              <p className="text-slate-600 leading-relaxed mb-8">
                {title} 관련 사건에 연루된 경우, 대다수의 내담자들은 극도의 공포와 수치심, 그리고 상황에 대한 합리화나 왜곡된 인지 상태를 경험하게 됩니다.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "공포/불안", desc: "법적 처벌 및 사회적 낙인에 대한 두려움" },
                  { label: "인지 왜곡", desc: "자신의 행동을 정당화하거나 축소하려는 경향" },
                  { label: "충동 조절", desc: "특정 상황에서의 통제력 상실" },
                  { label: "죄책감/수치심", desc: "자신에 대한 혐오 및 심리적 위축" }
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
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
          <div className="sticky top-32 space-y-6">
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
                <a href="tel:051-000-0000" className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors">
                  <PhoneCall className="w-5 h-5 text-[#4F46E5]" />
                  <span className="font-bold">051-000-0000</span>
                </a>
                <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors">
                  온라인 상담 신청
                </button>
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
    <div className="bg-indigo-600 py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
              <p className="text-slate-900 font-bold italic">"부산 성범죄 특화 심리 상담, 교정 치료 및 전문 상담을 지향합니다."</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* CTA */}
    <section className="py-24 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-slate-900 mb-6">지금 전문가와 상담하세요</h2>
        <p className="text-lg text-slate-500 mb-10">귀하의 고민을 가장 잘 이해하는 전문가가 철저한 비밀 보장 하에 도움을 드립니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-8 py-4 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-200">
            온라인 상담 예약
          </button>
          <a href="tel:051-000-0000" className="px-8 py-4 bg-slate-100 text-slate-900 font-bold rounded-2xl hover:bg-slate-200 transition-all flex items-center gap-2">
            <PhoneCall className="w-5 h-5" />
            051-000-0000
          </a>
        </div>
      </div>
    </section>
  </motion.div>
);

const LegalPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-slate-50 min-h-screen"
  >
    <div className="bg-slate-900 py-32 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
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
          <div>
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
          <div className="bg-slate-900 rounded-3xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-8">자료 발급 프로세스</h3>
            <div className="space-y-6">
              {[
                "1. 초기 상담 및 심리 평가 실시",
                "2. 맞춤형 교정 프로그램 이수 (최소 8회기 이상 권장)",
                "3. 중간/종결 평가 및 변화 분석",
                "4. 전문가 소견서 및 평가 보고서 작성",
                "5. 변호인 협의 후 법원/검찰 제출"
              ].map((step, idx) => (
                <div key={idx} className="text-slate-300 font-medium">{step}</div>
              ))}
            </div>
            <button className="w-full mt-12 py-4 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all">
              양형자료 관련 상담 신청
            </button>
          </div>
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
    <div className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8">{title}</h1>
          <p className="text-xl text-slate-500 leading-relaxed">
            성범죄심리상담치료센터부산은 단순한 비난이 아닌 실질적인 교정을 통해 재범 없는 안전한 사회를 만듭니다.
          </p>
        </div>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {slug === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-slate-900">설립 목적 및 차별점</h2>
            <p className="text-slate-600 leading-relaxed">
              본 센터는 성범죄 가해자의 심리적 구조를 심층 분석하여 재범의 고리를 끊어내는 특화 기관입니다. 일반 상담센터와 달리 법적 절차에 대한 깊은 이해를 바탕으로 실질적인 심리 개입을 진행합니다.
            </p>
            <div className="p-8 rounded-3xl bg-indigo-600 text-white">
              <h4 className="font-bold text-xl mb-4">“부산 성범죄 특화 심리 상담, 교정 치료 및 전문 상담”</h4>
              <p className="text-indigo-100">우리는 내담자가 자신의 책임을 온전히 인식하고, 변화된 삶을 살 수 있도록 돕는 것을 사명으로 합니다.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">재범방지 중심 구조</h4>
              <p className="text-sm text-slate-500">단순 정서 지원을 넘어 행동 교정과 재발 방지 루틴 설계에 집중합니다.</p>
            </div>
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm">
              <h4 className="font-bold text-slate-900 mb-2">법적 절차 이해 기반</h4>
              <p className="text-sm text-slate-500">수사 및 재판 과정에서 필요한 심리적 안정과 객관적 평가를 지원합니다.</p>
            </div>
          </div>
        </div>
      )}

      {slug === 'profile' && (
        <div className="space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-1 sticky top-32">
              <div className="rounded-3xl overflow-hidden shadow-2xl mb-8">
                <img 
                  src="https://tpqens1j9138.edge.naverncp.com/MNiExO50AC?src=https%3A%2F%2Fpage24.app%2Fapi%2Ffile%2FmodooImgPasre%3FsiteId%3Dcriminalmhs%26image_url%3Dhttps%3A%2F%2F9tsiiw6i9140.edge.naverncp.com%2Ffiles%2Fcriminalmhs%2F202507%2Ffffbec7c7fc9a06e84210f84e37366dc.jpg%26mcode%3D1112&type=m&w=1980&h=1980&ttype=png" 
                  alt="윤영준 원장" 
                  className="w-full aspect-[3/4] object-cover"
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

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  전문 자격 및 국제 인증
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">미국최면사고시위원회 (ACHE)</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 국제 최면전문가 (International Master Hypnotist)</li>
                      <li>• 국제 최면치료사 (International Hypnotherapist)</li>
                      <li>• 국제 임상최면치료사 (International Clinical Hypnotherapist)</li>
                      <li>• 국제 의학최면치료사 (International Medical Hypnotherapist)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">미국 최면대학 (HCC)</h4>
                    <ul className="space-y-2 text-sm text-slate-600">
                      <li>• 최면전문가 (Master Hypnotist)</li>
                      <li>• 최면치료사 (Hypnotherapist)</li>
                      <li>• 임상최면치료사 (Clinical Hypnotherapist)</li>
                      <li>• 의학최면치료사 (Medical Hypnotherapist)</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-slate-50">
                   <h4 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wider">NLP 및 코칭</h4>
                   <ul className="space-y-2 text-sm text-slate-600">
                      <li>• NLP 프랙티셔너 / 마스터 프랙티셔너</li>
                      <li>• NLP 프로코치 (전문가)</li>
                   </ul>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#4F46E5] rounded-full" />
                  주요 학회 및 활동
                </h3>
                <ul className="space-y-3 text-slate-600">
                  <li>• 기학아카데미 교육원장</li>
                  <li>• 미국 로렐라이즈 메디테이션 센터 원장</li>
                  <li>• 프라나요가협회 회장</li>
                  <li>• 제5심리과학회 회장</li>
                  <li>• 동서통합심리상담학회 회장</li>
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
                  <div>
                    <h4 className="font-bold text-slate-800 mb-3">공공 및 사회 활동</h4>
                    <p>대구가정법원 위탁보호위원, 학교폭력 자치위원, 경북교육지원청 위원 활동. 청소년 대상 인터넷 중독 및 자살 예방 교육 전문 강사.</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

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
            <p>안녕하십니까, 성범죄심리상담치료센터부산 원장 윤영준입니다.</p>
            <p>성범죄 사건에 직면했을 때, 대부분의 사람들은 극심한 혼란과 두려움, 그리고 사회적 비난에 대한 공포를 경험합니다. 하지만 진정한 해결은 단순히 처벌을 피하는 것이 아니라, 자신의 행동 이면에 숨겨진 심리적 구조를 직시하고 이를 교정하여 다시는 같은 실수를 반복하지 않는 삶을 설계하는 데 있습니다.</p>
            <p>본 센터는 단순한 정서적 지지를 넘어, 뇌인지과학과 임상심리학적 근거를 바탕으로 한 고도의 교정 프로그램을 제공합니다. 우리는 내담자가 자신의 책임을 온전히 인식하고, 왜곡된 성 인지를 바로잡아 건강한 사회 구성원으로 복귀할 수 있도록 가장 객관적이고 전문적인 조력자가 될 것입니다.</p>
            <p>변화는 용기 있는 직면에서 시작됩니다. 그 길에 저희가 함께하겠습니다.</p>
            <div className="pt-12 border-t border-slate-100 text-right">
              <p className="text-slate-500 mb-2">성범죄심리상담치료센터부산 대표원장</p>
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
              { name: "윤영준 원장", role: "상담학 박사 / 국제 임상최면치료사", image: "https://tpqens1j9138.edge.naverncp.com/MNiExO50AC?src=https%3A%2F%2Fpage24.app%2Fapi%2Ffile%2FmodooImgPasre%3FsiteId%3Dcriminalmhs%26image_url%3Dhttps%3A%2F%2F9tsiiw6i9140.edge.naverncp.com%2Ffiles%2Fcriminalmhs%2F202507%2Ffffbec7c7fc9a06e84210f84e37366dc.jpg%26mcode%3D1112&type=m&w=1980&h=1980&ttype=png" },
              { name: "김도윤 부원장", role: "범죄심리학 박사 / 재범위험성 평가 전문가", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" },
              { name: "박지은 실장", role: "청소년 성범죄 상담 / 놀이치료 전문가", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200" }
            ].map((expert, idx) => (
              <div key={idx} className="text-center group">
                <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 shadow-xl group-hover:scale-105 transition-transform duration-500">
                  <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{expert.name}</h3>
                <p className="text-sm text-[#4F46E5] font-bold mb-4">{expert.role}</p>
                <p className="text-xs text-slate-500 leading-relaxed px-8">성범죄 상담 경력 10년 이상, 법원 촉탁 상담위원 역임.</p>
              </div>
            ))}
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
    <div className="bg-slate-900 py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
        <p className="text-xl text-slate-400">투명하고 체계적인 상담 안내를 확인하세요.</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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

const ArchivePage = ({ title, slug }: { title: string; slug: string }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white min-h-screen"
  >
    <div className="bg-slate-50 py-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">{title}</h1>
        <p className="text-lg text-slate-500">성범죄 예방과 교정을 위한 전문 지식과 사례를 공유합니다.</p>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      {slug === 'check' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "성인지 감수성 자가진단", desc: "나의 성인지 관점은 객관적인가요?", items: 15 },
            { title: "디지털 성범죄 위험도 체크", desc: "온라인 활동 중 위험 요소가 있나요?", items: 12 },
            { title: "충동 조절 능력 평가", desc: "특정 상황에서 나의 통제력은 어느 정도인가요?", items: 20 },
            { title: "재범 위험성 간이 측정", desc: "전문 도구를 활용한 간이 위험도 체크", items: 10 }
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
              <button className="w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors">
                테스트 시작하기
              </button>
            </div>
          ))}
        </div>
      )}

      {slug === 'column' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { title: "성범죄, 왜 재발하는가? 심리적 메커니즘 분석", date: "2024.05.20", category: "심리 분석" },
            { title: "디지털 성범죄 가해자의 인지 왜곡과 교정 방향", date: "2024.05.15", category: "디지털 성범죄" },
            { title: "양형자료로서의 심리치료, 그 진정성의 가치", date: "2024.05.10", category: "법률/심리" },
            { title: "가족의 지지가 재범 방지에 미치는 영향", date: "2024.05.05", category: "가족 상담" },
            { title: "충동 조절 장애와 성범죄의 상관관계", date: "2024.04.28", category: "정신건강" },
            { title: "피해자 공감 능력이 변화의 시작이다", date: "2024.04.20", category: "공감 훈련" }
          ].map((post, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="aspect-video rounded-3xl bg-slate-100 mb-6 overflow-hidden relative">
                <img src={`https://picsum.photos/seed/${idx + 10}/800/450`} alt="Column" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold text-slate-900 uppercase tracking-wider">
                  {post.category}
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#4F46E5] transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-slate-400">{post.date}</p>
            </div>
          ))}
        </div>
      )}

      {slug !== 'check' && slug !== 'column' && (
        <div className="py-20 text-center text-slate-400">
        </div>
      )}
    </div>
  </motion.div>
);

const ApplicationPage = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-slate-50 min-h-screen py-24"
  >
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-[40px] p-12 lg:p-16 shadow-xl shadow-slate-200/50 border border-slate-100">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">상담 신청하기</h1>
          <p className="text-slate-500">모든 상담 내용은 철저히 비밀이 보장됩니다.</p>
        </div>

        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">성함 (또는 닉네임)</label>
              <input type="text" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="성함을 입력하세요" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">연락처</label>
              <input type="tel" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all" placeholder="010-0000-0000" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">상담 희망 분야</label>
            <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none">
              <option>분야를 선택하세요</option>
              <option>성범죄 가해자 심리상담</option>
              <option>디지털 성범죄 치료</option>
              <option>양형자료 준비 관련</option>
              <option>기타</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">문의 내용</label>
            <textarea className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all h-40 resize-none" placeholder="문의하실 내용을 자유롭게 입력하세요"></textarea>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-50 border border-indigo-100 flex gap-4">
            <input type="checkbox" className="mt-1 w-5 h-5 rounded border-indigo-300 text-indigo-600 focus:ring-indigo-500" id="privacy" />
            <label htmlFor="privacy" className="text-sm text-indigo-900 leading-relaxed">
              <span className="font-bold">[필수] 개인정보 수집 및 이용 동의</span><br />
              상담 신청 및 안내를 위해 성함, 연락처 등의 정보를 수집하며, 수집된 정보는 상담 목적 이외에 사용되지 않습니다.
            </label>
          </div>

          <button className="w-full py-5 bg-[#4F46E5] text-white font-bold rounded-2xl hover:bg-[#4338ca] transition-all shadow-lg shadow-indigo-200 text-lg">
            상담 신청 완료
          </button>
        </form>
      </div>
    </div>
  </motion.div>
);

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
              className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all text-center group"
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
                  element={<PlaceholderPage title={child.title} />} 
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