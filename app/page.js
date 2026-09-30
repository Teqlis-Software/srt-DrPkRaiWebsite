'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState('hi'); // Default Hindi on reload or direct link
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // Closed initially on reload
  const [chatFormOpen, setChatFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Lightbox Modal state for full screen photo view
  const [lightboxImg, setLightboxImg] = useState(null);

  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitorMsg, setVisitorMsg] = useState('');

  const [joinName, setJoinName] = useState('');
  const [joinAddress, setJoinAddress] = useState('');
  const [joinAssembly, setJoinAssembly] = useState('तमकुहीराज विधानसभा');
  const [joinDistrict, setJoinDistrict] = useState('');

  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const photoList = Array.from({ length: 50 }, (_, i) => i + 1);

  // Scroll-triggered dynamic positioning for body items (excluding static headers)
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const animElements = document.querySelectorAll('.scroll-anim-item');
    animElements.forEach((el) => observer.observe(el));

    return () => {
      animElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Track active scrolling so elements move ONLY while scrolling
  useEffect(() => {
    let isScrollingTimeout;
    const handleBodyScroll = () => {
      document.body.classList.add('is-scrolling');
      clearTimeout(isScrollingTimeout);
      isScrollingTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling');
      }, 180);
    };
    window.addEventListener('scroll', handleBodyScroll);
    return () => window.removeEventListener('scroll', handleBodyScroll);
  }, []);

  // Language persistence and global sync using localStorage & storage event
  useEffect(() => {
    window.scrollTo(0, 0);
    const savedLang = localStorage.getItem('dr_pk_rai_lang');
    if (savedLang) {
      setLang(savedLang);
    }

    const handleStorageChange = () => {
      const updatedLang = localStorage.getItem('dr_pk_rai_lang');
      if (updatedLang) {
        setLang(updatedLang);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === 'hi' ? 'en' : 'hi';
    setLang(newLang);
    localStorage.setItem('dr_pk_rai_lang', newLang);
    window.dispatchEvent(new Event('storage'));
  };

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

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      setCanScrollLeft(scrollContainerRef.current.scrollLeft > 20);
    }
  };

  const triggerLoader = (targetUrlOrAction) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (typeof targetUrlOrAction === 'function') {
        targetUrlOrAction();
      } else if (typeof targetUrlOrAction === 'string') {
        window.location.href = targetUrlOrAction;
      }
    }, 250);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollGallery = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 300);
    }
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
      subtitle: "डॉ० पी० के० राय • पूर्व विधायक तमकुहीराज विधानसभा",
      desc: "समर्पित जननेता, वरिष्ठ ई.एन.टी. सर्जन और पूर्व विधायक जो जन कल्याण, ग्रामीण स्वास्थ्य और शिक्षा के लिए प्रतिबद्ध हैं।",
      viewProfile: "विस्तृत परिचय देखें",
      contactOffice: "कार्यालय संपर्क",
      home: "होम",
      about: "परिचय",
      journey: "राजनीतिक जीवन",
      photos: "फोटो",
      contact: "संपर्क करें",
      joinUs: "हमसे जुड़ें",
      portalBadge: "आधिकारिक पोर्टल • पूर्व विधायक",
      bioTitle: "संक्षिप्त परिचय एवं पारिवारिक पृष्ठभूमि",
      basicInfo: "बुनियादी जानकारी",
      familyBg: "पारिवारिक पृष्ठभूमि",
      familyTitle: "पारिवारिक विवरण एवं संतान",
      educationTitle: "शिक्षा एवं सरकारी सेवाएँ",
      basicList: [
        "नाम : डा0 प्रमोद कुमार राय ( डॉ० पी०के० राय)",
        "उम्र-73 वर्ष",
        "पिता : स्व० श्री परमानन्द राय ('स्वतंत्रता संग्राम सेनानी')",
        "जन्म स्थान : ग्राम-पटखौली, पोस्ट-फाजिलनगर, जनपद-कुशीनगर (उ०प्र०)",
        "पत्राचार का पता : गोरखपुर नर्सिंग होम, कसया रोड, पैडलेगंज गोरखपुर (273001)"
      ],
      familyList: [
        "माता-पिता : दोनों स्वतंत्रता संग्राम सेनानी एवं बिहार में 35-40 वर्षों तक सदस्य विधान-सभा / विधान परिषद रहे।",
        "बड़े भाई : स्व० रामायण राय (स्वतंत्रता संग्राम सेनानी, विधायक, मंत्री एवं देवरिया से सांसद रहे)।",
        "पत्नी : डॉ० श्रीमती नीला राय शर्मा, (एम०एस०), पूर्व प्रोफेसर बी०आर०डी० मेडिकल कॉलेज, गोरखपुर।"
      ],
      childrenList: [
        "1. डॉ० प्रियंका राय : प्रोफेसर सर्जरी राम मनोहर लोहिया इंस्टिट्यूट ऑफ़ मेडिकल साइंसेस, लखनऊ। पति - डॉ० आलोक श्रीवास्तव, प्रोफेसर यूरोलोजी राम मनोहर लोहिया इंस्टिट्यूट ऑफ़ मेडिकल साइंसेस, लखनऊ",
        "2. अनुपमा राय (इंजीनियर) • पति - श्री विजय सिंह राठौर • पी०जी० जर्नलिज्म एवं मास कम्युनिकेशन"
      ],
      eduSub: "शैक्षिक योग्यता :",
      eduDetails: "• एम०बी०बी०एस० - LLRM मेरठ\n• डी०एल०ओ० नाक, कान, गला रोग विशेषज्ञ - KGMC",
      govSub: "सरकारी सेवा :",
      govDetails: "• 1974 से 1996 तक पी०एम०एस० (प्रान्तीय चिकित्सा सेवा) - PHC परतावल, CHC तमकुहीराज, ई०एन०टी० सर्जन गोरखपुर सदर अस्पताल, वरिष्ठ ई०एन०टी० सर्जन बलरामपुर अस्पताल लखनऊ।\n• आई०एम०ए० गोरखपुर का सचिव एवं अध्यक्ष।\n• प्रदेश के 12000 सरकारी चिकित्सकों का पी०एम०एस० संघ उ०प्र० का निर्वाचित प्रदेश महामंत्री - प्रदेश अध्यक्ष एवं वर्तमान में प्रदेश संरक्षक।",
      journeyDesc: "समाज और जनता की सेवा में दशकों का समर्पण",
      journeyPoints: [
        "राजनीतिक कर्मभूमिः विधान-सभा सेवरही / तमकुहीराज",
        "राजनीतिक पृष्ठभूमिः स्वतंत्रता संग्राम सेनानी परिवार",
        "राजनीतिक क्षेत्र : विधान-सभा फाजिलनगर / सेवरही",
        "बड़े भाई स्व० रामायण राय स्वतंत्रता संग्राम सेनानी, विधायक, मंत्री एवं देवरिया से सांसद रहे।",
        "वर्ष 1996 में बलरामपुर अस्पताल लखनऊ से वरिष्ठ ई०एन०टी०सर्जन का पद त्यागकर समाजवादी पार्टी से राजनीति की शुरुआत की और वर्ष 1996 में सेवरहीं विधान-सभा, कुशीनगर से चुनाव लड़कर हार गया उसके बाद पांच वर्षों तक लगातार क्षेत्र में ही रहा, नर्सिंग होम पर नहीं बैठा, प्रैक्टिस छोड़ दिया, पूर्णकालिक राजनितिक कार्यकर्ता के रूप में रहा एवं निःशुल्क चिकित्सा परामर्श शिविर के माध्यम से जनसेवा में लगा रहा | जन समस्या के लिये जन-आंदोलन किया।",
        "वर्ष 1996 में नौकरी छोड़कर राजनीति में आने के बाद से जन सेवा के अलावा कोई व्यक्तिगत कार्य नही किया l",
        "वर्ष 1996 से लगातार तमकुहीराज एवं फाजिलनगर के दूरस्थ क्षेत्र के पिछड़े एवं ग्रामीण इलाकों में निःशुल्क चिकित्सा शिविर एवं दवा वितरण का कार्य करता रहा एवं वर्तमान में भी कर रहा हूँ l",
        "2002 से 2012 तक सेवरहीं विधान-सभा (वर्तमान में तमकुहीराज) 10 वर्षों तक 2 बार लगातार विधायक रहा।"
      ],
      journeyMiddle: [
        "2002 से 2007 के बीच सदस्य लोक-लेखा समिति, सदस्य-एस०जी०पी०जी०आई० एवं सदस्य वन्य-जीव बोर्ड (उ०प्र०)",
        "वर्ष 2004 में सी०पी०ए० (COMMON WEALTH PARLIAMENTRY ASSOCIATION) डेलिगेशन में - 5 यूरोपीय देशों क्रमश: डेनमार्क, स्पेन, रूस, लन्दन एवं पेरिस का दौरा किया।",
        "प्रदेश के तीन विधायकों के विरुद्ध स्टिंग आपरेशन के आरोपों की जाँच हेतु विधान-सभा द्वारा गठित समिति, जिसमें मा० लक्ष्मीकांत बाजपेयी जी, मा० नरेन्द्र सिंह गौड़ जी जैसे सम्मानित सदस्यों की समिति का अध्यक्ष रहा।",
        "वर्ष 2007 से 2012 तक सदन की अगली कतार में बैठकर विपक्ष की सशक्त भूमिका का निर्वाह किया साथ ही लगातार 4 वर्षों तक लोक-लेखा समिति के अध्यक्ष के पद पर रहते हुए कई महत्वपूर्ण कार्य किया |",
        "2012 में समाजवादी पार्टी से चुनाव लड़ा एवं पार्टी के मूल मतों के बिखराव से चुनाव हार गया|",
        "2012 में चुनाव हारने के बाद पिछड़े क्षेत्र में शिक्षा हेतु अपने गाँव में अपने जमीन पर और केवल अपने स्रोत से वर्ष 2014 में पी० के० स्नातकोत्तर महाविद्यालय की स्थापना किया, जिससे कि ग्रामीण क्षेत्र से छात्राओं को दूरस्थ ना जाना पड़े। इसमें लगभग 1800 छात्र-छात्राएं हैं, जिसमे ज्यादातर छात्राएं हैं। और विद्यालय की प्रबंधक डॉ० नीला राय शर्मा और मेरे द्वारा समय समय पर छात्र-छात्राओं का शिविर लगाकर स्वास्थ्य परिक्षण भी किया जाता है और जरुरतमंदों को आवश्यकतानुसार निःशुल्क दवा वितरण कार्य भी किया जाता है और सरकार की मंशानुसार इमानदारी से गुणवत्तापूर्ण शिक्षण चल रहा है और समय समय पर कार्यक्रमों के माध्यम से छात्रों को प्रोत्साहित भी किया जाता है वर्तमान मे विद्यालय प्रगति कर पी० के० स्नातकोत्तर महाविद्यालय हो गया है, जिस मे-"
      ],
      collegeSubjects: "विषय –\n• B.A. - हिन्दी, संस्कृत, इतिहास, समाजशास्त्र, शिक्षाशास्त्र, राजनीति शास्त्र, गृहविज्ञान\n• B.Com\n• M.Com\n• M.A. - हिन्दी, समाजशास्त्र, राजनीति विज्ञान, गृहविज्ञान\nमहाविद्यालय की प्रबंधक डॉ० नीला राय शर्मा जी महाविद्यालय के समस्त कार्यों और शिक्षण कार्यों का देखरेख करती हैं।",
      journeyEnd: [
        "2012 से 2017 तक राज्यमंत्री दर्जा प्राप्त, सामान्य प्रशासन, ग्राम्य विभाग l",
        "2017 मे “सपा और कांग्रेस” गठबंधन के कारण टिकट से वंचित होने के कारण बागी होकर चुनाव लड़ा और 30000 वोट पाकर हार गया l",
        "17 नवंबर 2017 को भाजपा की सदस्यता ग्रहण किया l",
        "दो बार लगातार प्रदेश कार्य समिति का सदस्य रहा l",
        "2017 से 2024 तक कोई जिम्मेदारी नहीं मिली l कोई चुनाव लड़ने का अवसर नहीं मिला, जब की भाजपा के हर कार्यक्रम मे कार्यकर्ता की तरह लगातार लगा रहा l",
        "करोना काल मे 1 लाख पी० एम० केयर फंड मे तथा 50000 सी०एम० केयर फंड मे दिया l",
        "राम जन्म भूमि तीर्थ क्षेत्र मे 1 लाख दिया l",
        "समर्थकों के दबाव मे भाजपा से त्याग-पत्र देकर 28 मई 2024 को मा० अखिलेश यादव राष्ट्रीय अध्यक्ष के समक्ष समाजवादी पार्टी की सदस्यता ग्रहण किया और उसी दिन से समाजवादी पार्टी के कार्यों मे लगा हुआ हूँ l"
      ],
      photosTitle: "फोटो गैलरी",
      seeAllPhotos: "सभी फोटो देखें ➔",
      mulayamCaption: "माननीय मुलायम सिंह यादव जी के साथ",
      akhileshCaption: "राष्ट्रीय अध्यक्ष अखिलेश यादव जी के साथ",
      footerDesc: "उत्तर प्रदेश के ग्रामीण इलाकों के विकास और उत्थान के लिए समर्पित समाज सेवक, चिकित्सा पेशेवर और पूर्व विधायक।",
      quickLinks: "त्वरित लिंक",
      socialHead: "आधिकारिक सोशल मीडिया और मुख्यालय",
      copyright: "कॉपीराइट © 2026 Dr. P. K. Rai (पूर्व विधायक) - सर्वाधिकार सुरक्षित।"
    },
    en: {
      subtitle: "Dr. P. K. Rai • Ex-MLA Tamkuhiraj Assembly",
      desc: "Dedicated Leader, Senior ENT Surgeon, and Ex-Legislator committed to public welfare, rural health, and education.",
      viewProfile: "View Detailed Profile",
      contactOffice: "Contact Office",
      home: "Home",
      about: "About",
      journey: "Political Life",
      photos: "Photos",
      contact: "Contact Us",
      joinUs: "Volunteer / Join Us",
      portalBadge: "Official Portal • Ex-MLA",
      bioTitle: "Brief Introduction & Family Background",
      basicInfo: "Basic Information",
      familyBg: "Family Background",
      familyTitle: "Family Details & Children",
      educationTitle: "Education & Government Services",
      basicList: [
        "Name : Dr. Pramod Kumar Rai (Dr. P. K. Rai)",
        "Age : 73 Years",
        "Father : Late Shri Parmanand Rai ('Freedom Fighter')",
        "Birthplace : Village-Patkhauli, Post-Fazilnagar, District-Kushinagar (U.P.)",
        "Correspondence Address : Gorakhpur Nursing Home, Kasya Road, Padleganj Gorakhpur (273001)"
      ],
      familyList: [
        "Parents : Both freedom fighters and served for 35-40 years in Legislative Assembly / Council in Bihar.",
        "Elder Brother : Late Ramayan Rai (Freedom Fighter, MLA, Minister & MP from Deoria).",
        "Wife : Dr. Smt. Neela Rai Sharma (MS), Former Professor, BRD Medical College, Gorakhpur."
      ],
      childrenList: [
        "1. Dr. Priyanka Rai : Professor of Surgery, Ram Manohar Lohia Institute of Medical Sciences, Lucknow. Spouse - Dr. Alok Srivastava, Professor of Urology, RMLIMS Lucknow",
        "2. Anupama Rai (Engineer) • Spouse - Shri Vijay Singh Rathore • PG in Journalism & Mass Communication"
      ],
      eduSub: "Educational Qualification :",
      eduDetails: "• MBBS - LLRM Meerut\n• DLO (ENT Specialist) - KGMC",
      govSub: "Government Service :",
      govDetails: "• PMS (Provincial Medical Service) from 1974 to 1996 - PHC Partawal, CHC Tamkuhiraj, ENT Surgeon Gorakhpur Sadar Hospital, Senior ENT Surgeon Balrampur Hospital Lucknow.\n• Secretary and President of IMA Gorakhpur.\n• Elected General Secretary, President, and current Patron of PMS Association UP representing 12,000 government doctors.",
      journeyDesc: "Decades of dedicated public service",
      journeyPoints: [
        "Political Karmabhoomi: Assembly Seorahi / Tamkuhiraj",
        "Political Background: Freedom Fighter Family",
        "Served 2 consecutive terms as MLA for 10 years from Seorahi Assembly from 2002 to 2012.",
        "Resigned as Senior ENT Surgeon from Balrampur Hospital Lucknow in 1996 and started politics with Samajwadi Party."
      ],
      journeyMiddle: [
        "Member of Public Accounts Committee, SGPGAI, and Wildlife Board (UP) between 2002 and 2007.",
        "Visited 5 European countries (Denmark, Spain, Russia, London, Paris) in 2004 as part of the CPA (Commonwealth Parliamentary Association) delegation.",
        "Chaired the Assembly committee investigating allegations against three MLAs, featuring esteemed members like Laxmikant Bajpai and Narendra Singh Gaur.",
        "Served in the front row of the opposition with strong leadership and chaired the Public Accounts Committee for 4 consecutive years (2007-2012).",
        "Fought the 2012 election from Samajwadi Party and lost due to vote scattering.",
        "Established PK Post Graduate College in 2014 in his village using personal funds to ensure rural girls didn't have to travel far for education, currently serving around 1800 students (mostly girls) alongside free health checkup camps and medication distribution by Dr. Neela Rai Sharma and himself."
      ],
      collegeSubjects: "Subjects –\n• B.A. - Hindi, Sanskrit, History, Sociology, Education, Political Science, Home Science\n• B.Com\n• M.Com\n• M.A. - Hindi, Sociology, Political Science, Home Science",
      journeyEnd: [
        "Accorded Minister of State status in General Administration & Rural Departments from 2012 to 2017.",
        "Joined Bharatiya Janata Party (BJP) on November 17, 2017.",
        "Resigned from BJP under supporters' pressure and rejoined Samajwadi Party in the presence of National President Akhilesh Yadav on May 28, 2024."
      ],
      photosTitle: "Photo Gallery",
      seeAllPhotos: "See All Photos ➔",
      mulayamCaption: "With Hon'ble Mulayam Singh Yadav Ji",
      akhileshCaption: "With National President Akhilesh Yadav",
      footerDesc: "Dedicated social worker, medical professional, and former legislator striving for the upliftment and development of the rural masses of Uttar Pradesh.",
      quickLinks: "Quick Links",
      socialHead: "Official Social Media & Headquarters",
      copyright: "Copyright © 2026 Dr. P. K. Rai (Ex-MLA) - All Rights Reserved."
    }
  };

  const curr = content[lang];
  const mainTitleText = lang === 'hi' ? 'डा0 प्रमोद कुमार राय' : 'Dr. Pramod Kumar Rai';

  return (
    <div id="home" className="min-h-screen flex flex-col bg-white text-gray-900 font-sans w-full overflow-x-hidden relative scroll-mt-24">

      {/* Static Header & Scroll Animation Style */}
      <style jsx>{`
        .scroll-anim-item {
          opacity: 0;
          transition: transform 0.4s ease-out, opacity 0.4s ease-out;
          will-change: transform, opacity;
        }
        .anim-left { transform: translateX(-120px); }
        .anim-right { transform: translateX(120px); }
        .anim-top { transform: translateY(-120px); }
        .anim-bottom { transform: translateY(120px); }
        .anim-scale { transform: scale(0.7); }

        body.is-scrolling .scroll-anim-item.in-view {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }
        .scroll-anim-item.in-view {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        /* Static Heading Container Fixes (No Clipping / No Animation) */
        .fixed-heading-box {
          position: relative;
          width: 100%;
          min-height: 4rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: visible;
        }

        .hero-heading-box {
          position: relative;
          width: 100%;
          min-height: 5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: visible;
        }
      `}</style>

      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl cursor-pointer transition z-50"
            >
              ✕
            </button>
            <img
              src={lightboxImg}
              alt="Fullscreen Zoom"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border-4 border-white cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#FE0000] border-t-[#018B00] rounded-full animate-spin"></div>
        </div>
      )}

      {/* Floating Language Switcher */}
      <button
        onClick={() => triggerLoader(toggleLanguage)}
        className="fixed bottom-5 left-5 z-40 bg-[#018B00] hover:bg-green-700 text-white font-extrabold px-4 py-2.5 rounded-full shadow-2xl border-2 border-white transition flex items-center space-x-2 text-xs sm:text-sm cursor-pointer"
      >
        <span>🌐 {lang === 'hi' ? 'English' : 'हिंदी'}</span>
      </button>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-40 bg-[#FE0000] hover:bg-red-700 text-white w-10 h-10 sm:w-12 sm:h-12 rounded-full shadow-2xl border-2 border-white transition flex items-center justify-center text-lg sm:text-xl font-bold cursor-pointer"
        >
          ⬆
        </button>
      )}

      {/* Floating Chat Bubble Widget */}
      <div className="fixed bottom-5 right-5 z-45">
        {!chatOpen ? (
          <button
            onClick={() => setChatOpen(true)}
            className="bg-[#FE0000] hover:bg-red-700 text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-2xl border-2 border-white flex items-center justify-center text-xl sm:text-2xl transition animate-pulse cursor-pointer"
          >
            💬
          </button>
        ) : (
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 w-[90vw] sm:w-96 overflow-hidden flex flex-col">
            <div className="bg-[#FE0000] text-white p-5 relative">
              <button
                onClick={() => { setChatOpen(false); setChatFormOpen(false); }}
                className="absolute top-4 right-4 bg-black/25 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
              <div className="text-center space-y-2 mt-1">
                <h3 className="text-lg font-black">{curr.contact}</h3>
                <div className="w-14 h-14 bg-white rounded-full mx-auto overflow-hidden border-2 border-white shadow-md flex items-center justify-center text-[#FE0000] font-black text-base">
                  <img src="/DrPkRaiProfile.jpg" alt="Dr. P. K. Rai" className="w-full h-full object-cover object-center" />
                </div>
              </div>
            </div>

            <div className="p-5 bg-gray-50 flex-grow space-y-3">
              {!chatFormOpen ? (
                <>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">Recent Conversations</div>
                  <div
                    onClick={() => setChatFormOpen(true)}
                    className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-200 hover:border-[#FE0000] cursor-pointer transition space-y-1"
                  >
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="font-bold text-gray-800">Dr. P. K. Rai EX MLA</span>
                      <span>Just now</span>
                    </div>
                    <p className="text-xs text-gray-600">I have a question / कोई प्रश्न है?</p>
                  </div>
                </>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!visitorName.trim() || !visitorPhone.trim() || !visitorMsg.trim()) {
                      alert("कृपया सभी जानकारी (नाम, मोबाइल नंबर और संदेश) भरें।");
                      return;
                    }
                    const subject = encodeURIComponent(`New Inquiry from ${visitorName} - Dr. P. K. Rai Portal`);
                    const body = encodeURIComponent(
                      `Name: ${visitorName}\nMobile: ${visitorPhone}\n\nMessage:\n${visitorMsg}`
                    );
                    
                    window.location.href = `mailto:drpkr350@gmail.com?subject=${subject}&body=${body}`;
                    
                    setVisitorName('');
                    setVisitorPhone('');
                    setVisitorMsg('');
                    setChatFormOpen(false);
                    setChatOpen(false);
                  }} 
                  className="space-y-3"
                >
                  <div className="text-xs font-bold text-[#FE0000] uppercase tracking-wider">Send Message via Gmail</div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Your Name</label>
                    <input type="text" required value={visitorName} onChange={(e) => setVisitorName(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:outline-none focus:border-[#FE0000] cursor-pointer" placeholder="Enter your name" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Mobile Number</label>
                    <input type="tel" required value={visitorPhone} onChange={(e) => setVisitorPhone(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:outline-none focus:border-[#FE0000] cursor-pointer" placeholder="Enter mobile number" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-gray-600 mb-1">Message</label>
                    <textarea rows={3} required value={visitorMsg} onChange={(e) => setVisitorMsg(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl text-xs focus:outline-none focus:border-[#FE0000] cursor-pointer" placeholder="Type your question..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-[#FE0000] hover:bg-red-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-lg cursor-pointer">Send to Gmail ✉️</button>
                  <button type="button" onClick={() => setChatFormOpen(false)} className="w-full text-center text-xs text-gray-500 hover:text-gray-800 pt-1 cursor-pointer">← Back</button>
                </form>
              )}
            </div>

            {!chatFormOpen && (
              <div className="p-3 bg-white border-t text-center">
                <button onClick={() => setChatFormOpen(true)} className="w-full bg-[#FE0000] text-white font-bold py-2.5 rounded-full text-xs shadow-md cursor-pointer">{curr.contact}</button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Contact Modal Popup */}
      {contactModalOpen && (
        <div
          onClick={() => setContactModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border-4 border-[#FE0000] cursor-default max-h-[90vh] flex flex-col scroll-anim-item anim-scale in-view"
          >
            <div className="bg-[#FE0000] text-white p-5 flex justify-between items-center flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div
                  onClick={() => setLightboxImg("/DrPkRaiProfile.jpg")}
                  className="w-10 h-10 bg-white text-[#FE0000] rounded-full overflow-hidden flex items-center justify-center font-black text-xs shadow cursor-pointer border-2 border-white"
                >
                  <img src="/DrPkRaiProfile.jpg" alt="Dr. P. K. Rai" className="w-full h-full object-cover object-center" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-green-200">Contact Us</h3>
                  <p className="text-[10px] text-white">Dr. P. K. Rai • Ex-MLA</p>
                </div>
              </div>
              <button onClick={() => setContactModalOpen(false)} className="bg-white/25 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer">✕</button>
            </div>

            <div className="p-6 space-y-6 text-gray-800 text-xs sm:text-sm overflow-y-auto flex-grow">
              
              <div className="text-center space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <p className="font-bold text-black text-sm">Parmanand Ashram, paidleganj, kasia road, kalepur, Gorakhpur, Uttar Pradesh, India</p>
                <a 
                  href="https://wa.me/917521921824" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center space-x-2 bg-[#25D366] hover:bg-green-600 text-white font-bold px-5 py-2.5 rounded-xl shadow transition text-xs cursor-pointer"
                >
                  <span>🟢 Message us on WhatsApp</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-extrabold text-[#FE0000] uppercase text-sm border-b pb-2">dr.p.k. rai</h4>
                  <p className="text-gray-700 font-medium">Parmanand Ashram,paidleganj,kasia road,kalepur,Gorakhpur, Uttar Pradesh, India</p>
                  <div className="space-y-1 font-bold">
                    <p><a href="tel:9415905658" className="text-[#FE0000] hover:underline">9415905658</a></p>
                    <p><a href="tel:8303138738" className="text-[#FE0000] hover:underline">8303138738</a></p>
                    <p><a href="mailto:drraipk@gmail.com" className="text-blue-600 hover:underline">drraipk@gmail.com</a></p>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-gray-200">
                  <h4 className="font-extrabold text-[#018B00] uppercase text-sm border-b pb-2">Hours</h4>
                  <div className="space-y-1 text-xs text-gray-700 font-semibold">
                    <div className="flex justify-between"><span>Mon</span><span>09:00 am - 05:00 pm</span></div>
                    <div className="flex justify-between"><span>Tue</span><span>09:00 am - 05:00 pm</span></div>
                    <div className="flex justify-between"><span>Wed</span><span>09:00 am - 05:00 pm</span></div>
                    <div className="flex justify-between"><span>Thu</span><span>09:00 am - 05:00 pm</span></div>
                    <div className="flex justify-between"><span>Fri</span><span>09:00 am - 05:00 pm</span></div>
                    <div className="flex justify-between"><span>Sat</span><span>09:00 am - 05:00 pm</span></div>
                    <div className="flex justify-between"><span>Sun</span><span>09:00 am - 05:00 pm</span></div>
                  </div>
                </div>
              </div>

              {/* Google Map Embedded */}
              <div className="w-full h-48 rounded-2xl overflow-hidden border border-gray-300 shadow-inner">
                <iframe
                  title="Gorakhpur Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3562.7594921677045!2d83.391!3d26.748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjZhNzQ4LDgzLjM5MQ!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
              </div>

            </div>

            <div className="bg-gray-100 p-3 text-center border-t flex-shrink-0">
              <button onClick={() => setContactModalOpen(false)} className="bg-gray-800 text-white font-bold px-5 py-2 rounded-xl text-xs cursor-pointer">Close / बंद करें</button>
            </div>
          </div>
        </div>
      )}

      {/* Join Us WhatsApp Modal */}
      {joinModalOpen && (
        <div
          onClick={() => setJoinModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border-4 border-[#FE0000] cursor-default scroll-anim-item anim-scale in-view"
          >
            <div className="bg-[#FE0000] text-white p-5 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-white text-[#FE0000] rounded-full flex items-center justify-center font-black text-xs shadow">JOIN</div>
                <h3 className="text-base font-bold">{curr.joinUs}</h3>
              </div>
              <button onClick={() => setJoinModalOpen(false)} className="bg-white/25 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm cursor-pointer">✕</button>
            </div>
            <form onSubmit={handleJoinSubmit} className="p-6 space-y-3 text-gray-800 text-xs sm:text-sm">
              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">आपका नाम (Full Name)</label>
                <input type="text" required value={joinName} onChange={(e) => setJoinName(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:border-[#FE0000] cursor-pointer" placeholder="पूरा नाम दर्ज करें" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">पूरा पता (Address)</label>
                <input type="text" required value={joinAddress} onChange={(e) => setJoinAddress(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:border-[#FE0000] cursor-pointer" placeholder="गाँव / मोहल्ला / वार्ड" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">विधानसभा क्षेत्र (Assembly)</label>
                <input type="text" required value={joinAssembly} onChange={(e) => setJoinAssembly(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:border-[#FE0000] cursor-pointer font-bold text-black" placeholder="तमकुहीराज विधानसभा" />
              </div>
              <div>
                <label className="block font-bold uppercase text-gray-600 mb-1">जिला (District)</label>
                <input type="text" required value={joinDistrict} onChange={(e) => setJoinDistrict(e.target.value)} className="w-full border border-gray-300 p-2.5 rounded-xl focus:outline-none focus:border-[#FE0000] cursor-pointer" placeholder="कुशीनगर" />
              </div>
              <button type="submit" className="w-full bg-[#FE0000] hover:bg-red-700 text-white font-black py-3 rounded-xl shadow-lg cursor-pointer">WhatsApp पर भेजें 🟢</button>
            </form>
          </div>
        </div>
      )}

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#FE0000] border-b-4 border-[#018B00] shadow-md w-full text-white">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link href="/" onClick={() => triggerLoader(() => { })} className="flex items-center space-x-2.5 cursor-pointer">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full overflow-hidden border-2 border-green-200 shadow-inner flex items-center justify-center">
                <img src="/DrPkRaiProfile.jpg" alt="Logo" className="w-full h-full object-cover object-center cursor-pointer" onClick={(e) => { e.preventDefault(); setLightboxImg("/DrPkRaiProfile.jpg"); }} />
              </div>
              <div>
                <span className="block text-sm sm:text-lg font-black uppercase tracking-tight text-white leading-none">
                  Dr. P. K. Rai
                </span>
                <span className="block text-[8px] sm:text-[10px] font-bold text-green-100 uppercase tracking-widest mt-1">
                  Ex-MLA (Seorahi / Tamkuhiraj)
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex space-x-4 lg:space-x-6 font-bold text-xs lg:text-sm text-white items-center">
              <Link href="/" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 cursor-pointer">{curr.home}</Link>
              <Link href="/#biodata" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 cursor-pointer">{curr.about}</Link>
              <Link href="/#journey" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 cursor-pointer">{curr.journey}</Link>
              <Link href="/photos" onClick={() => triggerLoader(() => { })} className="hover:text-green-200 cursor-pointer">{curr.photos}</Link>
              <button onClick={() => setContactModalOpen(true)} className="hover:text-green-200 cursor-pointer">{curr.contact}</button>
              <button onClick={() => setJoinModalOpen(true)} className="hover:text-green-200 cursor-pointer">{curr.joinUs}</button>
            </nav>

            {/* Social Icons Header */}
            <div className="hidden md:flex items-center space-x-3">
              <a href="https://www.instagram.com/drpkraisp?stkn=Zmh6bmVyczJzNG8z" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1KBQPpLKq2/" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.588 9 4.71V8z" /></svg>
              </a>
              <a href="https://youtube.com/@drpkraisp?si=ieFumAbesc03zygR" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2 bg-black/20 rounded-xl text-xl cursor-pointer"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="fixed inset-x-0 top-16 sm:top-20 bg-[#FE0000] z-40 px-6 py-6 space-y-4 font-bold text-lg shadow-2xl flex flex-col border-b-4 border-[#018B00]">
            <Link href="/" onClick={() => { setMobileMenuOpen(false); }} className="hover:text-green-200 border-b border-red-600 pb-2 cursor-pointer">🏠 {curr.home}</Link>
            <Link href="/#biodata" onClick={() => { setMobileMenuOpen(false); }} className="hover:text-green-200 border-b border-red-600 pb-2 cursor-pointer">ℹ️ {curr.about}</Link>
            <Link href="/#journey" onClick={() => { setMobileMenuOpen(false); }} className="hover:text-green-200 border-b border-red-600 pb-2 cursor-pointer">🗺️ {curr.journey}</Link>
            <Link href="/photos" onClick={() => { setMobileMenuOpen(false); }} className="hover:text-green-200 border-b border-red-600 pb-2 cursor-pointer">🖼️ {curr.photos}</Link>
            <button onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }} className="text-left hover:text-green-200 border-b border-red-600 pb-2 cursor-pointer">📞 {curr.contact}</button>
            <button onClick={() => { setMobileMenuOpen(false); setJoinModalOpen(true); }} className="text-left hover:text-green-200 pb-2 cursor-pointer">🤝 {curr.joinUs}</button>

            {/* Social Icons in Mobile Menu */}
            <div className="pt-4 border-t border-red-600 flex space-x-4">
              <a href="https://www.instagram.com/drpkraisp?stkn=Zmh6bmVyczJzNG8z" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2.5 rounded-lg shadow flex items-center justify-center cursor-pointer">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1KBQPpLKq2/" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2.5 rounded-lg shadow flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.588 9 4.71V8z" /></svg>
              </a>
              <a href="https://youtube.com/@drpkraisp?si=ieFumAbesc03zygR" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2.5 rounded-lg shadow flex items-center justify-center">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Spacer to prevent header from overlapping content */}
      <div className="h-16 sm:h-20"></div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-white via-red-600 to-[#018B00] text-white py-12 sm:py-20 px-4 sm:px-8 w-full flex items-center justify-center overflow-hidden scroll-mt-24">
        <div className="w-full max-w-7xl mx-auto flex flex-col items-center">
          
          {/* Cycle Logo Container (scroll-anim-item & anim-top removed so it stays permanently visible) */}
          <div className="w-full flex items-center justify-center mb-6">
            <div className="cursor-default group">
              <img 
                src="/samajwadi.jpg" 
                alt="Samajwadi" 
                className="w-[120px] sm:w-[160px] md:w-[190px] h-auto object-contain rounded-xl shadow-lg border-2 border-white transition-all duration-700 group-hover:scale-105 group-hover:shadow-2xl" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-center md:text-left w-full">
            
            <div className="md:col-span-4 flex justify-center scroll-anim-item anim-left">
              <div className="w-56 h-72 sm:w-72 sm:h-88 bg-white p-2.5 rounded-3xl shadow-2xl border-4 border-[#018B00] flex flex-col items-center justify-center transition-all duration-700 hover:scale-105 hover:shadow-green-500/50">
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center">
                  <img
                    src="/DrpkRaiPhoto.jpg"
                    alt="Dr. P. K. Rai"
                    className="w-full h-full object-cover object-center cursor-pointer transition-all duration-700 hover:scale-110"
                    onClick={() => setLightboxImg('/DrPkRaiPhoto.jpg')}
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-900 font-black mt-2.5">Dr. P. K. Rai</span>
              </div>
            </div>

            <div className="md:col-span-8 flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
              <div className="flex flex-col items-center md:items-start space-y-2">
                <span className="bg-white text-[#FE0000] px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-md inline-block">
                  {curr.portalBadge}
                </span>
              </div>
              <div className="hero-heading-box">
                <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-snug sm:leading-tight text-white drop-shadow-md">
                  {mainTitleText}
                </h1>
                <span className="block text-lg sm:text-2xl font-bold mt-2 text-green-100">({curr.subtitle})</span>
              </div>
              <p className="text-xs sm:text-base md:text-lg text-gray-100 max-w-2xl font-light leading-relaxed">
                {curr.desc}
              </p>
              <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                <a href="#biodata" className="bg-white text-[#FE0000] font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm shadow-lg cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-gray-100">
                  {curr.viewProfile}
                </a>
                <button onClick={() => setContactModalOpen(true)} className="bg-black/30 border-2 border-white text-white font-bold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-black/50">
                  {curr.contactOffice}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="biodata" className="w-full bg-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 scroll-mt-24">
        <div className="w-full max-w-7xl mx-auto space-y-8 sm:space-y-12">

          {/* STATIC HEADER (No Animation) */}
          <div className="text-center fixed-heading-box">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{curr.bioTitle}</h2>
            <div className="w-20 sm:w-24 h-1.5 bg-[#FE0000] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full">

            <div className="bg-slate-50 rounded-2xl shadow-lg p-6 sm:p-8 border-t-8 border-[#FE0000] border-x border-b border-gray-100 scroll-anim-item anim-left">
              <h3 className="text-lg sm:text-xl font-bold text-[#FE0000] mb-4 pb-3 border-b border-gray-200">
                {curr.basicInfo}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-bold leading-relaxed">
                {curr.basicList.map((item, idx) => (
                  <li key={idx} className={idx % 3 === 0 ? 'text-[#FE0000]' : idx % 3 === 1 ? 'text-[#018B00]' : 'text-black'}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl shadow-lg p-6 sm:p-8 border-t-8 border-[#018B00] border-x border-b border-gray-100 scroll-anim-item anim-bottom">
              <h3 className="text-lg sm:text-xl font-bold text-[#018B00] mb-4 pb-3 border-b border-gray-200">
                {curr.familyBg}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-bold leading-relaxed">
                {curr.familyList.map((item, idx) => (
                  <li key={idx} className={idx % 3 === 0 ? 'text-[#018B00]' : idx % 3 === 1 ? 'text-black' : 'text-[#FE0000]'}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-2xl shadow-lg p-6 sm:p-8 border-t-8 border-[#FE0000] border-x border-b border-gray-100 scroll-anim-item anim-right">
              <h3 className="text-lg sm:text-xl font-bold text-[#FE0000] mb-4 pb-3 border-b border-gray-200">
                {curr.familyTitle}
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm font-bold leading-relaxed">
                {curr.childrenList.map((item, idx) => (
                  <li key={idx} className={idx % 2 === 0 ? 'text-black' : 'text-[#018B00]'}>• {item}</li>
                ))}
              </ul>
            </div>

          </div>

          <div className="bg-gradient-to-br from-red-50 to-green-50 rounded-3xl shadow-xl p-6 sm:p-10 border-2 border-green-200 space-y-6 scroll-anim-item anim-bottom">
            <h3 className="text-xl sm:text-2xl font-black text-[#018B00] pb-3 border-b-2 border-green-300">
              {curr.educationTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 text-xs sm:text-sm text-gray-800 leading-relaxed">
              <div className="space-y-2.5 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-200 whitespace-pre-line text-black font-bold scroll-anim-item anim-left">
                <h4 className="font-extrabold text-[#FE0000] text-sm uppercase">{curr.eduSub}</h4>
                <p>{curr.eduDetails}</p>
              </div>

              <div className="space-y-2.5 bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-200 whitespace-pre-line text-black font-bold scroll-anim-item anim-right">
                <h4 className="font-extrabold text-[#018B00] text-sm uppercase">{curr.govSub}</h4>
                <p>{curr.govDetails}</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Photos Section */}
      <section className="w-full bg-slate-100 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 scroll-mt-24">
        <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-red-200 p-5 text-center scroll-anim-item anim-left">
            <div className="w-full h-60 sm:h-72 rounded-2xl overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center border border-gray-300 mb-4 cursor-pointer">
              <img src="/mulayam-photo.jpg" alt="Mulayam Singh Yadav" className="w-full h-full object-cover object-center cursor-pointer" onClick={() => setLightboxImg("/mulayam-photo.jpg")} />
            </div>
            <div className="inline-block bg-[#FE0000] text-white px-4 sm:px-6 py-1.5 rounded-full font-bold text-xs sm:text-sm">
              — {curr.mulayamCaption} —
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-2 border-green-200 p-5 text-center scroll-anim-item anim-right">
            <div className="w-full h-60 sm:h-72 rounded-2xl overflow-hidden shadow-inner bg-gray-100 flex items-center justify-center border border-gray-300 mb-4 cursor-pointer">
              <img src="/akhilesh.jpg" alt="Akhilesh Yadav" className="w-full h-full object-cover object-center cursor-pointer" onClick={() => setLightboxImg("/akhilesh.jpg")} />
            </div>
            <div className="inline-block bg-[#018B00] text-white px-4 sm:px-6 py-1.5 rounded-full font-bold text-xs sm:text-sm">
              — {curr.akhileshCaption} —
            </div>
          </div>
        </div>
      </section>

      {/* Political Life (Journey) */}
      <section id="journey" className="w-full bg-gradient-to-b from-slate-50 via-red-50 to-green-50 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-y border-gray-200 scroll-mt-24">
        <div className="w-full max-w-6xl mx-auto space-y-6">
          
          {/* STATIC HEADER (No Animation) */}
          <div className="text-center mb-10 sm:mb-16 fixed-heading-box" style={{ minHeight: '6rem' }}>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">{curr.journey}</h2>
            <p className="text-[#018B00] font-bold mt-2 text-xs sm:text-base">{curr.journeyDesc}</p>
            <div className="w-20 sm:w-24 h-1.5 bg-[#018B00] mx-auto mt-3 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curr.journeyPoints.map((point, idx) => (
              <div
                key={idx}
                className={`scroll-anim-item ${idx % 2 === 0 ? 'anim-left' : 'anim-right'} p-6 rounded-3xl shadow-lg border-2 bg-white transition hover:shadow-xl ${idx % 3 === 0 ? 'border-[#FE0000] text-[#FE0000]' : idx % 3 === 1 ? 'border-[#018B00] text-[#018B00]' : 'border-black text-black'
                  } font-bold text-xs sm:text-sm leading-relaxed`}
              >
                <p>• {point}</p>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {curr.journeyMiddle.map((point, idx) => (
              <div
                key={idx}
                className={`scroll-anim-item ${idx % 2 === 0 ? 'anim-left' : 'anim-right'} p-6 rounded-3xl shadow-lg border-2 bg-white transition hover:shadow-xl ${idx % 2 === 0 ? 'border-black text-black' : 'border-[#FE0000] text-[#FE0000]'
                  } font-bold text-xs sm:text-sm leading-relaxed`}
              >
                <p>• {point}</p>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-gray-300 shadow-md text-xs sm:text-sm whitespace-pre-line font-bold text-black scroll-anim-item anim-bottom">
            <p>{curr.collegeSubjects}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {curr.journeyEnd.map((point, idx) => (
              <div
                key={idx}
                className={`scroll-anim-item ${idx % 2 === 0 ? 'anim-right' : 'anim-left'} p-6 rounded-3xl shadow-lg border-2 bg-white transition hover:shadow-xl ${idx % 3 === 0 ? 'border-black text-black' : idx % 3 === 1 ? 'border-[#FE0000] text-[#FE0000]' : 'border-[#018B00] text-[#018B00]'
                  } font-bold text-xs sm:text-sm leading-relaxed`}
              >
                <p>• {point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ghar Vapasi Video Section */}
      <div 
        ref={(node) => {
          if (!node) return;
          const observer = new IntersectionObserver(
            ([entry]) => {
              const iframe = node.querySelector('iframe');
              if (!entry.isIntersecting && iframe) {
                iframe.src = '';
                setTimeout(() => {
                  iframe.src = 'https://www.youtube.com/embed/SJpXFtko62o';
                }, 100);
              }
            },
            { threshold: 0.2 }
          );
          observer.observe(node);
        }}
        className="w-full bg-slate-100 py-12 sm:py-16 px-4 sm:px-8 lg:px-12 border-t border-gray-200 scroll-mt-24"
      >
        <div className="w-full max-w-5xl mx-auto space-y-6 text-center">
          
          {/* STATIC HEADER (No Animation) */}
          <div className="fixed-heading-box" style={{ minHeight: '6rem' }}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              {lang === 'hi' ? 'घर वापसी' : 'Ghar Vapasi (Homecoming)'}
            </h2>
            <div className="w-20 h-1.5 bg-[#FE0000] mx-auto mt-2 rounded-full"></div>
            <p className="text-xs sm:text-sm text-gray-600 mt-2 font-bold">
              {lang === 'hi' 
                ? 'Dr. P. K. Rai - समाजवादी पार्टी में पुनरागमन और जनसभा का ऐतिहासिक क्षण' 
                : 'Dr. P. K. Rai - Historic moment of homecoming and public gathering in Samajwadi Party'}
            </p>
          </div>

          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-[#018B00] bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/SJpXFtko62o"
              title="Dr. P. K. Rai घर वापसी"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="pt-2">
            <a 
              href="https://youtu.be/SJpXFtko62o" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center space-x-2 bg-[#FE0000] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-lg transition cursor-pointer"
            >
              <span>
                {lang === 'hi' ? 'YouTube पर पूरा वीडियो देखें ▶' : 'Watch full video on YouTube ▶'}
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Expanded Photo Preview Section */}
      <section className="w-full bg-white py-12 sm:py-16 px-4 sm:px-8 lg:px-12 scroll-mt-24">
        <div className="w-full max-w-7xl mx-auto">
          
          {/* STATIC HEADER (No Animation) */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 sm:mb-10">
            <div className="flex flex-col items-start justify-center" style={{ minHeight: '4rem' }}>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">{curr.photosTitle}</h2>
              <div className="w-16 sm:w-20 h-1.5 bg-[#018B00] mt-2 rounded-full"></div>
            </div>
            <Link
              href="/photos"
              onClick={() => triggerLoader(() => { })}
              className="mt-4 md:mt-0 bg-[#FE0000] hover:bg-red-700 text-white font-bold px-5 sm:px-6 py-2.5 rounded-full shadow text-xs sm:text-sm transition cursor-pointer"
            >
              {curr.seeAllPhotos}
            </Link>
          </div>

          <div className="relative flex items-center">
            {canScrollLeft && (
              <button
                onClick={() => scrollGallery('left')}
                className="absolute left-[-15px] sm:left-[-20px] z-20 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md opacity-60 hover:opacity-100 transition cursor-pointer backdrop-blur-xs"
                title="Scroll Left"
              >
                ◀
              </button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={checkScrollPosition}
              className="flex overflow-x-auto space-x-6 pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth touch-pan-x w-full px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {photoList.map((item) => (
                <div
                  key={item}
                  onClick={() => setLightboxImg(`/drpkrai${item}.jpg`)}
                  className="min-w-[260px] sm:min-w-[300px] flex-shrink-0 bg-slate-50 border border-gray-200 rounded-2xl overflow-hidden shadow-lg p-4 cursor-pointer hover:shadow-xl transition snap-center group"
                >
                  <div className="w-full h-48 bg-gradient-to-br from-red-100 to-green-100 rounded-xl flex items-center justify-center text-gray-700 font-bold border border-gray-300 overflow-hidden relative">
                    <img src={`/drpkrai${item}.jpg`} alt={`Dr. P. K. Rai ${item}`} className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-300" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-xs font-bold">
                      🔍 Zoom Fullscreen
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollGallery('right')}
              className="absolute right-[-15px] sm:right-[-20px] z-20 bg-black/40 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-md opacity-60 hover:opacity-100 transition cursor-pointer backdrop-blur-xs"
              title="Scroll Right"
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FE0000] text-white border-t-4 border-[#018B00] w-full font-bold">
        <div className="w-full px-6 sm:px-10 lg:px-12 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white mb-3">Dr. P. K. Rai</h3>
            <p className="text-red-100 leading-relaxed">{curr.footerDesc}</p>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-green-200 mb-3">{curr.quickLinks}</h4>
            <ul className="space-y-2 text-red-100">
              <li><Link href="/" onClick={() => triggerLoader(() => { })} className="hover:text-white cursor-pointer">{curr.home}</Link></li>
              <li><Link href="/photos" onClick={() => triggerLoader(() => { })} className="hover:text-white cursor-pointer">{curr.photos}</Link></li>
              <li><button onClick={() => setContactModalOpen(true)} className="hover:text-white text-left cursor-pointer">{curr.contact}</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-black text-green-200 mb-3">{curr.socialHead}</h4>
            <p className="text-red-100 leading-relaxed mb-3">
              Parmanand Ashram, Padleganj, Kasya Road, Kalepur, Gorakhpur, Uttar Pradesh, 273001
            </p>
            <p className="text-red-100 mb-4">
              <strong>Phone:</strong> <a href="tel:+919415905658" className="underline hover:text-green-200 cursor-pointer">+91 9415905658</a>
            </p>
            {/* Real Social Icons Footer */}
            <div className="flex space-x-3 mt-3">
              <a href="https://www.instagram.com/drpkraisp?stkn=Zmh6bmVyczJzNG8z" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="https://www.facebook.com/share/1KBQPpLKq2/" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.588 9 4.71V8z" /></svg>
              </a>
              <a href="https://youtube.com/@drpkraisp?si=ieFumAbesc03zygR" target="_blank" rel="noopener noreferrer" className="bg-white text-[#FE0000] p-2 rounded-lg shadow hover:bg-gray-100 transition flex items-center justify-center cursor-pointer" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="bg-black py-3 text-center text-[10px] sm:text-xs text-gray-300 border-t border-red-700 w-full">
          {curr.copyright}
        </div>
      </footer>

    </div>
  );
}