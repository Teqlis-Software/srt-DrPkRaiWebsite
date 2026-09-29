'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('hi'); // Default Hindi
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatFormOpen, setChatFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loader State

  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorMsg, setVisitorMsg] = useState('');

  const [joinName, setJoinName] = useState('');
  const [joinAddress, setJoinAddress] = useState('');
  const [joinAssembly, setJoinAssembly] = useState('');
  const [joinDistrict, setJoinDistrict] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerLoader = (targetUrlOrAction) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (typeof targetUrlOrAction === 'function') {
        targetUrlOrAction();
      } else if (typeof targetUrlOrAction === 'string') {
        window.location.href = targetUrlOrAction;
      }
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChatSubmit = (e) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(`Message from ${visitorName} (${visitorPhone})`);
    const mailBody = encodeURIComponent(`Name: ${visitorName}\nPhone: ${visitorPhone}\n\nMessage:\n${visitorMsg}`);
    window.location.href = `mailto:drraipk@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  };

  const handleJoinSubmit = (e) => {
    e.preventDefault();
    const waMessage = encodeURIComponent(
      `Hello Dr. P. K. Rai Team,\n\nI want to join/volunteer as a supporter.\n\nName: ${joinName}\nAddress: ${joinAddress}\nAssembly (विधानसभा): ${joinAssembly}\nDistrict (जिला): ${joinDistrict}`
    );
    window.open(`https://wa.me/917521921824?text=${waMessage}`, '_blank');
  };

  const content = {
    hi: {
      home: "होम",
      about: "परिचय",
      journey: "राजनीतिक जीवन",
      photos: "फोटो",
      contact: "संपर्क करें",
      joinUs: "हमसे जुड़ें",
      heading: "संपर्क करें",
      subheading: "डॉ. पी. के. राय (पूर्व विधायक) के कार्यालय से संपर्क करें",
      headquarters: "मुख्यालय",
      officeDetails: "आधिकारिक पता और विवरण",
      desc: "आधिकारिक पत्राचार, जनसभाओं या समस्याओं के समाधान के लिए आप सीधे फोन या ईमेल के माध्यम से संपर्क कर सकते हैं।",
      addressLabel: "कार्यालय का पता:",
      addressVal: "परमानंद आश्रम, पैडलेगंज, कसया रोड, कालेपुर, गोरखपुर, उत्तर प्रदेश, 273001",
      phoneLabel: "फोन नंबर:",
      emailLabel: "ईमेल:",
      footerDesc: "उत्तर प्रदेश के ग्रामीण इलाकों के विकास और उत्थान के लिए समर्पित समाज सेवक, चिकित्सा पेशेवर और पूर्व विधायक।",
      quickLinks: "त्वरित लिंक",
      socialHead: "आधिकारिक सोशल मीडिया और मुख्यालय",
      copyright: "कॉपीराइट © 2026 Dr. P. K. Rai (पूर्व विधायक) - सर्वाधिकार सुरक्षित।"
    },
    en: {
      home: "Home",
      about: "About",
      journey: "Political Life",
      photos: "Photos",
      contact: "Contact Us",
      joinUs: "Volunteer / Join Us",
      heading: "Contact Us",
      subheading: "Get in touch with the office of Dr. P. K. Rai (Ex-MLA)",
      headquarters: "Headquarters",
      officeDetails: "Official Address & Details",
      desc: "For official correspondence, public meetings, or grievances, you can visit or contact us directly via phone or email.",
      addressLabel: "Office Address:",
      addressVal: "Parmanand Ashram, Padleganj, Kasya Road, Kalepur, Gorakhpur, Uttar Pradesh, 273001",
      phoneLabel: "Phone Numbers:",
      emailLabel: "Email:",
      footerDesc: "Dedicated social worker, medical professional, and former legislator striving for the upliftment and development of the rural masses of Uttar Pradesh.",
      quickLinks: "Quick Links",
      socialHead: "Official Social Media & Headquarters",
      copyright: "Copyright © 2026 Dr. P. K. Rai (Ex-MLA) - All Rights Reserved."
    }
  };

  const curr = content[lang];

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans w-full overflow-x-hidden relative">

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-200">
          <div className="w-16 h-16 border-4 border-[#FE0000] border-t-[#018B00] rounded-full animate-spin"></div>
          <div className="text-xl font-black text-[#FE0000] tracking-wider animate-pulse">
            Dr. P. K. Rai Portal...
          </div>
        </div>
      )}

      <button
        onClick={() => triggerLoader(() => setLang(lang === 'hi' ? 'en' : 'hi'))}
        className="fixed bottom-6 left-6 z-40 bg-[#018B00] hover:bg-green-700 text-white font-extrabold px-5 py-2.5 rounded-full shadow-2xl border-2 border-white transition flex items-center space-x-2 text-sm"
      >
        <span>🌐 {lang === 'hi' ? 'English' : 'हिंदी'}</span>
      </button>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 bg-[#FE0000] hover:bg-red-700 text-white w-12 h-12 rounded-full shadow-2xl border-2 border-white transition flex items-center justify-center text-xl font-bold"
        >
          ⬆
        </button>
      )}

      {/* Floating Chat Bubble Widget */}
      <div className="fixed bottom-6 right-6 z-40">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-[#FE0000] hover:bg-red-700 text-white w-14 h-14 rounded-full shadow-2xl border-2 border-white flex items-center justify-center text-2xl transition animate-pulse"
          >
            💬
          </button>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 w-80 sm:w-96 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
            <div className="bg-[#FE0000] text-white p-6 relative">
              <button
                onClick={() => { setChatOpen(false); setChatFormOpen(false); }}
                className="absolute top-4 right-4 bg-black/25 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition"
              >
                ✕
              </button>
              <div className="text-center space-y-2 mt-2">
                <h3 className="text-xl font-black">{curr.contact}</h3>
                <div className="w-16 h-16 bg-white rounded-full mx-auto overflow-hidden border-2 border-white shadow-md flex items-center justify-center text-[#FE0000] font-black text-lg">
                  PK
                </div>
                <p className="text-xs text-red-100 font-medium">We'll respond as soon as we can.</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 flex-grow space-y-4">
              {!chatFormOpen ? (
                <>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Conversations</div>
                  <div
                    onClick={() => setChatFormOpen(true)}
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 hover:border-[#FE0000] cursor-pointer transition space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="font-bold text-gray-800">Dr. P. K. Rai EX MLA</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-xs text-gray-600">I have a question / कोई प्रश्न है?</p>
                  </div>
                </>
              ) : (
                <form onSubmit={handleChatSubmit} className="space-y-3">
                  <div className="text-xs font-bold text-[#FE0000] uppercase tracking-wider">Send Message via Gmail</div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Your Name</label>
                    <input type="text" required value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:outline-none focus:border-[#FE0000]" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Mobile Number</label>
                    <input type="tel" required value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:outline-none focus:border-[#FE0000]" placeholder="Enter mobile number" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Message</label>
                    <textarea rows={3} required value={visitorMsg} onChange={(e) => setVisitorMsg(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:outline-none focus:border-[#FE0000]" placeholder="Type your question..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#FE0000] hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg transition">Send to Gmail ✉️</button>
                  <button type="button" onClick={() => setChatFormOpen(false)} className="w-full text-center text-xs text-gray-500 hover:text-gray-800 pt-1">← Back</button>
                </form>
              )}
            </div>

            {!chatFormOpen && (
              <div className="p-4 bg-white border-t text-center">
                <button onClick={() => setChatFormOpen(true)} className="w-full bg-[#FE0000] hover:bg-red-700 text-white font-bold py-3 rounded-full text-sm shadow-md transition">{curr.contact}</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Modal Popup */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border-4 border-[#FE0000]">
            <div className="bg-[#FE0000] text-white p-6 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white text-[#FE0000] rounded-full flex items-center justify-center font-black text-sm shadow">PK</div>
                <div>
                  <h3 className="text-lg font-bold">Dr. P. K. Rai Office</h3>
                  <p className="text-xs text-green-200">Ex-MLA (Seorahi / Tamkuhiraj)</p>
                </div>
              </div>
              <button
                onClick={() => setContactModalOpen(false)}
                className="bg-white/25 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition"
              >
                ✕
              </button>
            </div>
            <div className="p-8 space-y-6 text-gray-800">
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FE0000] uppercase tracking-wider">📍 Headquarter Address</h4>
                <p className="text-sm leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-200">
                  Parmanand Ashram, Padleganj, Kasya Road, Kalepur, Gorakhpur, Uttar Pradesh, 273001
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#018B00] uppercase tracking-wider">📞 Phone Numbers (Tap to Call)</h4>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="tel:+919415905658" className="bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 font-bold px-4 py-2.5 rounded-xl text-center text-sm shadow-sm transition">
                    +91 9415905658
                  </a>
                  <a href="tel:+918303138738" className="bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 font-bold px-4 py-2.5 rounded-xl text-center text-sm shadow-sm transition">
                    +91 8303138738
                  </a>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-[#FE0000] uppercase tracking-wider">✉️ Official Email</h4>
                <a href="mailto:drraipk@gmail.com" className="block bg-red-50 hover:bg-red-100 text-red-800 border border-red-300 font-bold px-4 py-2.5 rounded-xl text-center text-sm shadow-sm transition">
                  drraipk@gmail.com
                </a>
              </div>
            </div>
            <div className="bg-gray-100 p-4 text-center border-t">
              <button
                onClick={() => setContactModalOpen(false)}
                className="bg-gray-800 hover:bg-black text-white font-bold px-6 py-2 rounded-xl text-sm transition"
              >
                Close / बंद करें
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Join Us WhatsApp Modal Popup */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border-4 border-[#FE0000]">
            <div className="bg-[#FE0000] text-white p-6 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white text-[#FE0000] rounded-full flex items-center justify-center font-black text-sm shadow">JOIN</div>
                <div>
                  <h3 className="text-lg font-bold">{curr.joinUs}</h3>
                  <p className="text-xs text-red-100">Dr. P. K. Rai Campaign</p>
                </div>
              </div>
              <button
                onClick={() => setJoinModalOpen(false)}
                className="bg-white/25 text-white w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleJoinSubmit} className="p-8 space-y-4 text-gray-800">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">आपका नाम (Full Name)</label>
                <input type="text" required value={joinName} onChange={(e) => setJoinName(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:border-[#FE0000]" placeholder="पूरा नाम दर्ज करें" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">पूरा पता (Address)</label>
                <input type="text" required value={joinAddress} onChange={(e) => setJoinAddress(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:border-[#FE0000]" placeholder="गाँव / मोहल्ला / वार्ड" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">विधानसभा क्षेत्र (Assembly Constituency)</label>
                <input type="text" required value={joinAssembly} onChange={(e) => setJoinAssembly(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:border-[#FE0000]" placeholder="जैसे: तमकुहीराज / सेवरहीं" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">जिला (District)</label>
                <input type="text" required value={joinDistrict} onChange={(e) => setJoinDistrict(e.target.value)} className="w-full border border-gray-300 p-3 rounded-xl text-sm focus:outline-none focus:border-[#FE0000]" placeholder="जैसे: कुशीनगर / गोरखपुर" />
              </div>
              <button type="submit" className="w-full bg-[#FE0000] hover:bg-red-700 text-white font-black py-3.5 rounded-xl text-sm shadow-lg transition flex items-center justify-center space-x-2">
                <span>WhatsApp पर भेजें (7521921824) 🟢</span>
              </button>
            </form>
            <div className="bg-gray-100 p-4 text-center border-t">
              <button onClick={() => setJoinModalOpen(false)} className="text-xs text-gray-600 font-bold hover:text-black">बंद करें / Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FE0000] border-b-4 border-[#018B00] shadow-md w-full text-white">
        <div className="w-full px-4 sm:px-10 lg:px-16">
          <div className="flex justify-between items-center h-20">
            <Link href="/" onClick={() => triggerLoader(() => { })} className="flex items-center space-x-3 cursor-pointer">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#FE0000] font-black text-xs shadow-inner border-2 border-green-200 overflow-hidden text-center px-1">
                P.K. Rai
              </div>
              <div>
                <span className="block text-lg sm:text-xl font-black uppercase tracking-tight text-white leading-none">
                  Dr. P. K. Rai
                </span>
                <span className="block text-[9px] sm:text-[10px] font-bold text-green-100 uppercase tracking-widest mt-1">
                  Ex-MLA (Seorahi / Tamkuhiraj)
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-5 font-bold text-sm text-white items-center">
              <Link href="/" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 transition-colors">{curr.home}</Link>
              <Link href="/#biodata" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 transition-colors">{curr.about}</Link>
              <Link href="/#journey" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 transition-colors">{curr.journey}</Link>
              <Link href="/photos" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 transition-colors">{curr.photos}</Link>
              <button onClick={() => setContactModalOpen(true)} className="hover:text-green-200 transition-colors focus:outline-none">{curr.contact}</button>
              <button onClick={() => setJoinModalOpen(true)} className="bg-white text-[#FE0000] hover:bg-gray-100 px-4 py-2 rounded-lg font-black shadow transition">{curr.joinUs}</button>
            </nav>

            <div className="hidden md:flex items-center space-x-3">
              <a href="https://www.instagram.com/drpkraisp?stkn=Zmh6bmVyczJzNG8z" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1KBQPpLKq2/" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.588 9 4.71V8z" /></svg>
              </a>
              <a href="https://youtube.com/@drpkraisp?si=ieFumAbesc03zygR" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white focus:outline-none p-2.5 bg-black/20 hover:bg-black/40 rounded-xl text-2xl transition flex items-center justify-center shadow z-50"
              aria-label="Menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 top-20 bg-[#FE0000] z-40 px-8 py-8 space-y-6 font-bold text-xl shadow-2xl flex flex-col justify-start overflow-y-auto">
            <Link href="/" onClick={() => { setMobileMenuOpen(false); triggerLoader(() => { }); }} className="block hover:text-green-200 border-b border-red-600 pb-3">🏠 {curr.home}</Link>
            <Link href="/#biodata" onClick={() => { setMobileMenuOpen(false); triggerLoader(() => { }); }} className="block hover:text-green-200 border-b border-red-600 pb-3">ℹ️ {curr.about}</Link>
            <Link href="/#journey" onClick={() => { setMobileMenuOpen(false); triggerLoader(() => { }); }} className="block hover:text-green-200 border-b border-red-600 pb-3">🗺️ {curr.journey}</Link>
            <Link href="/photos" onClick={() => { setMobileMenuOpen(false); triggerLoader(() => { }); }} className="block hover:text-green-200 border-b border-red-600 pb-3">🖼️ {curr.photos}</Link>
            <button onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }} className="block text-left hover:text-green-200 border-b border-red-600 pb-3 w-full">📞 {curr.contact}</button>
            <button onClick={() => { setMobileMenuOpen(false); setJoinModalOpen(true); }} className="block text-left hover:text-green-200 border-b border-red-600 pb-3 w-full">🤝 {curr.joinUs}</button>
          </div>
        )}
      </header>

      <div className="h-20"></div>

      <section className="bg-gradient-to-r from-[#FE0000] to-[#018B00] text-white py-16 px-6 text-center w-full">
        <h1 className="text-4xl font-black">{curr.galleryTitle}</h1>
        <p className="text-sm mt-2 text-gray-100">{curr.gallerySubtitle}</p>
      </section>

      <section className="w-full max-w-7xl mx-auto py-16 px-6 sm:px-10 lg:px-16 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photoList.map((item) => (
            <div key={item} className="bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition p-4">
              <div className="w-full h-48 bg-gradient-to-br from-red-100 to-green-100 rounded-xl flex items-center justify-center text-gray-700 font-bold border border-gray-300">
                Dr. P. K. Rai #{item}
              </div>
              <p className="mt-3 text-center text-xs font-bold text-gray-800">Dr. P. K. Rai #{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Red Footer with Bold Text */}
      <footer className="bg-[#FE0000] text-white border-t-4 border-[#018B00] w-full font-bold">
        <div className="w-full px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="text-2xl font-black text-white mb-4">Dr. P. K. Rai</h3>
            <p className="text-red-100 text-sm leading-relaxed font-bold">{curr.footerDesc}</p>
          </div>
          <div>
            <h4 className="text-lg font-black text-green-200 mb-4">{curr.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-red-100 font-bold">
              <li><Link href="/" onClick={() => triggerLoader(() => { })} className="hover:text-white font-bold">{curr.home}</Link></li>
              <li><Link href="/#biodata" onClick={() => triggerLoader(() => { })} className="hover:text-white font-bold">{curr.about}</Link></li>
              <li><Link href="/#journey" onClick={() => triggerLoader(() => { })} className="hover:text-white font-bold">{curr.journey}</Link></li>
              <li><Link href="/photos" onClick={() => triggerLoader(() => { })} className="hover:text-white font-bold">{curr.photos}</Link></li>
              <li><button onClick={() => setContactModalOpen(true)} className="hover:text-white text-left focus:outline-none font-bold">{curr.contact}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-black text-green-200 mb-4">{curr.socialHead}</h4>
            <p className="text-sm text-red-100 leading-relaxed mb-3 font-bold">
              Parmanand Ashram, Padleganj, Kasya Road, Kalepur, Gorakhpur, Uttar Pradesh, 273001
            </p>
            <p className="text-sm text-red-100 mb-4 font-bold">
              <strong>Phone:</strong> <a href="tel:+919415905658" className="underline hover:text-green-200 font-bold">+91 9415905658</a>, <a href="tel:+918303138738" className="underline hover:text-green-200 font-bold">+91 8303138738</a>
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <a href="https://www.instagram.com/drpkraisp?stkn=Zmh6bmVyczJzNG8z" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] px-3 py-1.5 rounded font-black text-xs shadow">Instagram</a>
              <a href="https://www.facebook.com/share/1KBQPpLKq2/" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] px-3 py-1.5 rounded font-black text-xs shadow">Facebook</a>
              <a href="https://youtube.com/@drpkraisp?si=ieFumAbesc03zygR" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] px-3 py-1.5 rounded font-black text-xs shadow">YouTube</a>
            </div>
          </div>
        </div>
        <div className="bg-black py-4 text-center text-xs text-gray-300 border-t border-red-700 w-full font-bold">
          {curr.copyright}
        </div>
      </footer>

    </div>
  );
}