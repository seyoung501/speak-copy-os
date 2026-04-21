import React, { useState, useMemo, useEffect } from "react";



const LEVELS = [
  { id:"1", label:"Brand Vision", color:"#3B82F6", desc:"The world Speak wants to create", subs:null },
  { id:"2", label:"Brand Philosophy", color:"#8B5CF6", desc:"What Speak believes", subs:null },
  { id:"3", label:"Brand Definition", color:"#10B981", desc:"나를 끌어주는 영어 앱", subs:null },
  { id:"4", label:"USP", color:"#F59E0B", desc:"Uncomfortable truth + solution", subs:[
    {id:"usp1",label:"Pulls Speech Out",tag:"USP1"},{id:"usp2",label:"Catches Until Right",tag:"USP2"},{id:"usp3",label:"Real Language",tag:"USP3"},{id:"usp4",label:"Won't Let Quit",tag:"USP4"},
  ]},
  { id:"5", label:"Targeting", color:"#EC4899", desc:"Target-specific messaging", subs:[
    {id:"t-career",label:"Career / Business",tag:"T-Career"},{id:"t-travel",label:"Travel",tag:"T-Travel"},{id:"t-growth",label:"Growth",tag:"T-Growth"},{id:"t-overseas",label:"Life Overseas",tag:"T-Overseas"},{id:"t-test",label:"Test Prep",tag:"T-Test"},{id:"t-parents",label:"Parents",tag:"T-Parents"},{id:"t-general",label:"General",tag:"T-General"},
  ]},
  { id:"6", label:"RTB", color:"#06B6D4", desc:"All evidence and proof", subs:[
    {id:"rtb-feat",label:"Features",tag:"RTB-Features"},{id:"rtb-tech",label:"Tech / Data",tag:"RTB-Tech"},{id:"rtb-awards",label:"Awards",tag:"RTB-Awards"},{id:"rtb-scale",label:"Scale",tag:"RTB-Scale"},{id:"rtb-reviews",label:"User Reviews",tag:"RTB-Reviews"},{id:"rtb-team",label:"Team / Expertise",tag:"RTB-Team"},{id:"rtb-price",label:"Pricing Value",tag:"RTB-Price"},
  ]},
  { id:"7", label:"CTA", color:"#EF4444", desc:"Action drivers", subs:[
    {id:"cta-gen",label:"General CTA",tag:"CTA-General"},{id:"cta-price",label:"Pricing CTA",tag:"CTA-Price"},{id:"cta-ch",label:"Channel CTA",tag:"CTA-Channel"},
  ]},
];

const FEAT_TAGS = [
  {tag:"feat-freetalk",label:"AI Free Talk"},{tag:"feat-tutor",label:"AI Tutor"},{tag:"feat-mylesson",label:"My Lesson"},{tag:"feat-smartreview",label:"Smart Review"},{tag:"feat-pronunciation",label:"Pronunciation Coach"},{tag:"feat-personalization",label:"Personalization"},{tag:"feat-3step",label:"3-Step Method"},{tag:"feat-curriculum",label:"Curriculum"},{tag:"feat-tracking",label:"Level Tracking"},{tag:"feat-circular",label:"Circular Learning"},{tag:"feat-gamification",label:"Gamification"},{tag:"feat-b2b",label:"B2B (S4B)"},
];

const FIT_TAGS = ["All","TO-BE aligned","Universal","AS-IS legacy"];
const CHANNELS = [
  {name:"Brand Campaign",levels:["1","2","3"],desc:"Philosophy + positioning"},
  {name:"Perf Ad (Headline)",levels:["4","5"],desc:"USP + Targeting"},
  {name:"Perf Ad (Sub)",levels:["6"],desc:"RTB backs it up"},
  {name:"Landing Page",levels:["3","4","5","6","7"],desc:"Hierarchy descends with scroll"},
  {name:"App Store",levels:["2","4","6"],desc:"Philosophy + USP + evidence"},
  {name:"CRM / Push",levels:["4","5","6","7"],desc:"USP + targeting + evidence + nudge"},
  {name:"Social / Owned",levels:["4","5","6"],desc:"USP + targeting + proof"},
  {name:"Influencer",levels:["4","5","6"],desc:"USP + targeting + user story"},
];

const D=[
// ===1 VISION===
{l:"1",sub:null,g:null,ko:"To reinvent the way people learn, starting with language.",en:"",s:"Press Kit — Vision",f:"TO-BE aligned",k:true},
{l:"1",sub:null,g:null,ko:"스픽은 언어 교육의 혁신을 만들고 있습니다",en:"Speak is creating an innovation in language education",s:"Website — Brand Story",f:"Universal",k:false},
{l:"1",sub:null,g:null,ko:"언제, 어디서든, 누구나 쉽게 언어를 배울 수 있도록",en:"So that anyone, anywhere, can learn a language easily",s:"Website — Brand Story",f:"Universal",k:false},
{l:"1",sub:null,g:null,ko:"스픽은 이미 영어 학습의 새로운 패러다임이 되었습니다",en:"Speak has already become a new paradigm",s:"Website — Brand Story",f:"Universal",k:false},
{l:"1",sub:null,g:null,ko:"\"앞으로 10년 안에 언어 학습 방식은 완전히 달라질 겁니다.\"",en:"In 10 years, language learning will be completely different.",s:"Connor Zwick — Press Kit",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"\"스픽은 언어 학습을 누구에게나 평등하게 만들고 싶어요.\"",en:"We want to make language learning equal for everyone.",s:"Connor Zwick — EO Korea 2025",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"\"더 많은 사람들에게 기회의 문을 열어주고 싶어요.\"",en:"We want to open more doors of opportunity.",s:"Connor Zwick — EO Korea 2025",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"\"저희 목표는 언어를 배울 때 가장 먼저 떠올리는 기본 수단이 되는 거예요.\"",en:"Our goal: become the default way people learn a language.",s:"Connor Zwick — EO Korea 2025",f:"TO-BE aligned",k:false},
{l:"1",sub:null,g:null,ko:"언어 숙달의 길을 재정의하여, 언어 장벽을 넘어 나아가려는 삶을 지원한다.",en:"Redefine the path to fluency beyond the language barrier",s:"Brand Bible — Vision v0.2",f:"Universal",k:false},
// ===2 PHILOSOPHY===
{l:"2",sub:null,g:null,ko:"틀려라, 트일 것이다!",en:"Make mistakes — you'll break through!",s:"Press Kit — Philosophy",f:"TO-BE aligned",k:true},
{l:"2",sub:null,g:null,ko:"영어, 새해엔 트일 것이다",en:"English — it'll break through this new year",s:"Press Kit — 2026 Campaign",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"올해는 트일 것이다",en:"This year, it'll break through",s:"Press Kit — 2026 Campaign",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"틀려라 ▶ 된다!",en:"Make mistakes ▶ It works!",s:"Press Kit — 2026 Sub",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"언어는 지식이 아니라 '말하기 경험'입니다.",en:"Language is not knowledge — it's a 'speaking experience.'",s:"Press Kit — Philosophy",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"\"틀리는 것을 두려워하지 않는 용기\"가 영어를 잘하는 유일한 길",en:"Courage to not fear mistakes is the only path to fluency.",s:"Press Kit — 2026",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"틀려도 괜찮습니다. AI와의 안전한 환경에서 두려움 없이 말합니다.",en:"It's okay to make mistakes. Speak without fear in AI's safe environment.",s:"Press Kit — Key Messages",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"언어를 배우려면 소리 내어 말해야 합니다.",en:"To learn a language, you must speak out loud.",s:"Website",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"스픽의 핵심 철학은 당신이 소리내어 말하게 하는 데 있어요. 최대한 많이요!",en:"Speak's core philosophy: getting you to speak out loud. As much as possible!",s:"Website",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"\"To Speak, You Must Speak!\"",en:"",s:"Brand Bible",f:"TO-BE aligned",k:false},
{l:"2",sub:null,g:null,ko:"We do not overpromise. We support sustainable language learning.",en:"",s:"Brand Bible — 2021",f:"TO-BE aligned",k:false},
// ===3 DEFINITION===
{l:"3",sub:null,g:null,ko:"따라오면, 말이 된다 스픽",en:"Follow along — you'll speak. Speak.",s:"Refined Brand Positioning",f:"TO-BE aligned",k:true},
{l:"3",sub:null,g:null,ko:"나를 끌어주는 영어 앱",en:"The English app that pulls me along",s:"Brand Definition",f:"TO-BE aligned",k:true},
{l:"3",sub:null,g:null,ko:"당신을 말하게 할 영어 앱",en:"The English app that will make you speak",s:"Legacy key copy",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"당신을 실제로 말하게 하는 영어 앱",en:"The app that actually makes you speak",s:"Website — Main",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"스픽은 당신을 말하게 합니다",en:"Speak makes you speak",s:"Bloo Outcome LP",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"입이 트이는 영어 앱",en:"The English app that opens your mouth",s:"App Store",f:"Universal",k:false},
{l:"3",sub:null,g:null,ko:"이제 영어는 스픽입니다",en:"Now English is Speak",s:"Campaign LP",f:"AS-IS legacy",k:false},
{l:"3",sub:null,g:null,ko:"AI 영어 스피킹 앱",en:"AI English speaking app",s:"Press Kit",f:"AS-IS legacy",k:false},
{l:"3",sub:null,g:null,ko:"영어 스피킹은 스픽",en:"English speaking is Speak",s:"YouTube",f:"AS-IS legacy",k:false},
// ===4 USP===
{l:"4",sub:"USP1",g:null,ko:"몇 년을 공부했는데도 아직 말을 못 합니다. → 스픽은 말하기를 끌어냅니다.",en:"Years of studying, still can't speak → Speak pulls speech out.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP1",g:null,ko:"한국 사람들은 왜 영어를 몇십 년씩 배워도 말하기를 어려워할까?",en:"Why do Koreans struggle to speak after decades?",s:"Website",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"이제 말 못하는 영어는 버려야 합니다",en:"Time to drop the English you can't speak",s:"Campaign LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"영어는 말해야 늡니다",en:"English improves only when you speak",s:"Bloo Outcome LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"수업 1일차부터 미친듯이 말하게 합니다",en:"From day 1, makes you speak like crazy",s:"Campaign LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"누구라도 말을 할 수 밖에 없는 환경",en:"An environment where anyone must speak",s:"Campaign LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"7일만에 1,000문장 발화",en:"1,000 sentences in 7 days",s:"Playstore",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"하루 10분만 투자하면 150문장",en:"10 min/day → 150 sentences",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"30분에 150문장, 영어 스피킹 끝판왕",en:"150 sentences in 30 min",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"수영 인강이 아니라 물에 들어가야 하는 것처럼",en:"Like swimming — get in the water",s:"App Store",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"영어로 말하게 너무 어렵다 → 이제는 두렵지않아요!",en:"So hard to speak → Not scared anymore!",s:"Performance (B/A)",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"미드 보는 건 좋아하는데, 직접 말하는 건 어려운 사람?",en:"Love watching shows, can't speak?",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP1",g:null,ko:"말하면서 배워야 실제로 응용할 수 있어요!",en:"Learn by speaking to apply it!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"실수를 건너뛰면 성장은 없습니다. → 스픽은 될 때까지 마주하게 만듭니다.",en:"Skipping mistakes = skipping growth → Speak makes you face them.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP2",g:null,ko:"틀려도 괜찮아요 — 실시간 AI 피드백",en:"It's okay to make mistakes — real-time AI feedback",s:"Press Kit / Playstore",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"모든 문장을 즉각적으로 교정해주는 AI 피드백",en:"AI feedback corrects every sentence instantly",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"피드백 기반 복습 시스템",en:"Review system based on feedback",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP2",g:null,ko:"원어민 발음으로 만들어주는 AI 발음 코치",en:"AI pronunciation coach for native pronunciation",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"교과서 영어는 실제 상황에서 통하지 않습니다. → 스픽은 실제로 쓸 수 있는 언어를 가르칩니다.",en:"Textbook English doesn't work → Speak teaches usable language.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP3",g:null,ko:"배운대로만 말하는 게 아니라, 말하고 싶은대로 배울 수 있는 곳",en:"Learn what you want to say, not just what you were taught",s:"App Store",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"AI 롤플레이로 실전 같은 대화 연습",en:"Real conversation practice through AI roleplay",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"내 상황과 경험을 바탕으로 생성된 맞춤 수업",en:"Custom lessons based on my situation",s:"Performance sub",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP3",g:null,ko:"머릿 속 번역 없이 바로 말하게 됩니다",en:"Speak without translating in your head",s:"Business LP",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"의지만으로는 지속할 수 없습니다. → 스픽은 멈추지 않게 만듭니다.",en:"Willpower alone can't keep you going → Speak won't let you stop.",s:"Refined Positioning",f:"TO-BE aligned",k:true},
{l:"4",sub:"USP4",g:null,ko:"⚠ error: 올해 영어공부도 미루시겠습니까? YES / NO",en:"Will you put off English again this year?",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"영어 공부가 양치질처럼 당연한 습관이 됐어요",en:"English became as natural as brushing teeth",s:"SNS habit ad",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"하루에 딱 10분, 한 달 습관 완성!",en:"10 min/day, one month habit!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"출근길 인스타 대신 20분 영어 공부",en:"20 min English instead of Instagram",s:"Performance (Kim Woo-bin)",f:"TO-BE aligned",k:false},
{l:"4",sub:"USP4",g:null,ko:"영어공부와 습관을 한번에!",en:"English study + habit at once!",s:"Travel LP",f:"TO-BE aligned",k:false},
// ===5 TARGETING===
// Career / Business
{l:"5",sub:"T-Career",g:null,ko:"외국계처럼 말하는 한 끗 차이",en:"The subtle difference — foreign company level",s:"Performance (biz)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"영어 하나로 바뀌는 내 연봉 앞자리",en:"First digit of my salary changes with English",s:"Performance (Kim Woo-bin)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"미팅 때 할 수 있는 말이 많아졌어요!",en:"I can say so much more in meetings now!",s:"Instagram biz ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"아무 말도 못하던 미팅에서 의견제시 명확하게 하는 미팅으로!",en:"From silent meetings to clearly stating my opinions!",s:"Instagram biz ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"스픽으로 비즈니스 영어 시작하기→",en:"Start business English with Speak→",s:"Instagram CTA",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"하버드 출신 연구진이 개발, OpenAI 기술 제휴로 실리콘밸리에서도 주목",en:"Developed by Harvard researchers, noted in Silicon Valley via OpenAI partnership",s:"Business LP",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"직장인을 위한 비즈니스 영어",en:"Business English for working professionals",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Career",g:null,ko:"영어면접: 이젠 두렵지 않다!",en:"English interviews: no longer scary!",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
// Travel
{l:"5",sub:"T-Travel",g:null,ko:"여행에서 만날 수 있는 모든 상황 대비",en:"Prepared for every travel situation",s:"Travel LP",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"비행기까지 딱 남았는데 시간을 되돌릴수는 없잖아요 ✈",en:"Flight's coming and you can't turn back time ✈",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"상상할 수 있는 모든 여행 상황 스픽 하나로 완벽 미리 준비하기",en:"Prepare for every imaginable travel scenario with Speak",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행가서 바로 써먹는 해외 필수 표현.zip ✈",en:"Essential overseas expressions you'll use right away.zip ✈",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행 떠나기 전 궁극적 여행 준비",en:"The ultimate travel prep before departure",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"해외여행 계획하고 있으면 딱 하나만 준비하세요",en:"Planning a trip? Just prepare one thing",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행 필수 표현 이제 스픽 하나로 끝내세요!",en:"End travel expression prep with just Speak!",s:"Travel Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"해외여행 완벽대비, 만족 후기 폭발! 딱 하루 10분 스픽 여행 영어",en:"Perfect trip prep, reviews exploding! Just 10 min/day Speak travel English",s:"Travel LP Ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"🏆 BEST 여행 영어 코스 41강의",en:"🏆 BEST travel English course — 41 lessons",s:"Travel LP",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Travel",g:null,ko:"여행 전 벼락치기 스픽에서 완벽대비",en:"Last-minute cramming? Perfect prep with Speak",s:"Travel LP",f:"TO-BE aligned",k:false},
// Growth / Self-improvement
{l:"5",sub:"T-Growth",g:null,ko:"10년 넘게 영어 공부를 해도 스피킹은 힘드신가요?",en:"Still struggling with speaking after 10+ years?",s:"App Store",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"영어가 쉬워지니까, 선택지가 무한대!",en:"When English gets easier, choices become infinite!",s:"Performance",f:"AS-IS legacy",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"영어가 트이면 인생이 트인다",en:"When English opens up, life opens up",s:"Performance / KakaoTalk",f:"AS-IS legacy",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"전화영어 효과에 실망했다면? 딱 1달만 이거 해보세요",en:"Disappointed by phone English? Try this for 1 month",s:"Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"스픽을 꾸준히 하니까 내 영어가 고급지게 바뀜!",en:"Consistent Speak use made my English more sophisticated!",s:"User story video ad",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Growth",g:null,ko:"자꾸만 막히는 영어, '이렇게' 하면 입에 붙습니다.",en:"English keeps getting stuck? Do 'this' and it sticks.",s:"SNS Ad",f:"TO-BE aligned",k:false},
// Life Overseas
{l:"5",sub:"T-Overseas",g:null,ko:"해외에서 영어가 안 되면 아무것도 안 된다",en:"Without English overseas, nothing works",s:"Influencer LP (life-overseas)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Overseas",g:null,ko:"해외 생활 영어, 스픽으로 미리 준비하세요",en:"Prep your overseas life English with Speak",s:"Influencer LP (life-overseas)",f:"TO-BE aligned",k:false},
// Test Prep (OPIc / TOEIC Speaking)
{l:"5",sub:"T-Test",g:null,ko:"시험 점수는 높은데 말은 안 나온다",en:"High test scores but can't speak",s:"Audience Deep Dive",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Test",g:null,ko:"상황별 대화 구성으로 시험 대비는 물론 현실 변수까지 연습",en:"Situational conversations prep for tests AND real-life variables",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
// Parents
{l:"5",sub:"T-Parents",g:null,ko:"엄마빠 영어",en:"Mom & Dad English",s:"Website — Curriculum (Course name)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-Parents",g:null,ko:"자녀에게 영어로 말하고 싶은 부모",en:"Parents who want to speak English to their kids",s:"Audience Deep Dive",f:"TO-BE aligned",k:false},
// General
{l:"5",sub:"T-General",g:null,ko:"영어 좀 하는 사람은 다 아는 스픽!",en:"Everyone who speaks English knows Speak!",s:"Campaign LP",f:"AS-IS legacy",k:false},
{l:"5",sub:"T-General",g:null,ko:"꼼꼼히 따져볼 수록 영어는 스픽이 답이다",en:"The more you compare, the more Speak is the answer",s:"Performance (Kim Woo-bin)",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-General",g:null,ko:"올해, 영어부터 트이자!",en:"This year, let's start by breaking through English!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-General",g:null,ko:"이제 진짜 제대로 영어 스피킹 뽀개보자!",en:"Let's really crush English speaking for real!",s:"Performance",f:"TO-BE aligned",k:false},
{l:"5",sub:"T-General",g:null,ko:"영어로 말하기 부끄러운 사람들",en:"People embarrassed to speak English",s:"SNS Ad",f:"TO-BE aligned",k:false},
// ===6 RTB===
// RTB-Features
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"원어민 없이도 가능한 자유로운 대화 연습",en:"Free conversation practice without a native speaker",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"원하는 주제로 말하면 AI가 피드백 + 맞춤 수업 자동 생성",en:"AI gives feedback + auto-generates custom lessons",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"언제 어디서든, 어떤 주제에 대해서든 대화하세요",en:"Talk about any topic, anytime, anywhere",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"AI 프리톡이 '비주얼 모드'로 더 몰입감있게 돌아왔습니다.",en:"AI Free Talk — now with immersive Visual Mode.",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-freetalk",ko:"원하는 상황과 주제로 대화하며 실시간 피드백, 맞춤형 수업 생성",en:"Converse freely, get feedback, generate lessons from mistakes.",s:"Website — Curriculum",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tutor",ko:"스픽 튜터는 오로지 당신만을 위한 언어 선생님",en:"Speak Tutor is a language teacher exclusively for you.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tutor",ko:"스픽 튜터와 함께라면 당신은 혼자가 아닙니다.",en:"With Speak Tutor, you're not alone.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-mylesson",ko:"'나만의 수업' — 당장 내일 필요한 영어를 배울 수 있는 기능",en:"'My Lesson' — learn the English you need tomorrow.",s:"App Store",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-mylesson",ko:"배운 패턴을 '실제 내 상황'에 적용해 실시간 생성되는 수업",en:"Lessons generated real-time from your actual situation.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-smartreview",ko:"간격 반복 알고리즘으로 최적 타이밍에 복습 → 장기 기억화",en:"Spaced repetition → optimal review → long-term memory.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-smartreview",ko:"배운 패턴을 자동 복습 항목으로 저장, 맞는 복습 수업 제공",en:"Auto-saves patterns, provides tailored review lessons.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-pronunciation",ko:"학습자의 발음을 음소 단위로 정밀 분석",en:"Analyzes pronunciation at phoneme level.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-pronunciation",ko:"원어민 발음과 실시간 대조 → 교정 가이드",en:"Real-time native comparison → correction guide.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-personalization",ko:"나에게 딱 맞는 나만을 위한 맞춤 수업",en:"Lessons tailored just for me",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-personalization",ko:"목표/수준/관심사/학습 속도에 맞춰 계속 조정",en:"Continuously adjusts to goals, level, interests, pace.",s:"Press Kit — AI",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-personalization",ko:"여행/비즈니스/면접 등 목표에 맞는 수업을 AI가 추천",en:"AI recommends courses for travel, business, interviews.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-3step",ko:"나도 모르게 체득되는 3단계 학습법",en:"3-step method — internalize without realizing",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-3step",ko:"20분 동안 100문장 이상을 소리 내어 말하게 됩니다",en:"100+ sentences out loud in 20 minutes.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-3step",ko:"1단계 배우기 → 2단계 스피킹 연습 → 3단계 실전 대화",en:"Step 1 Learn → Step 2 Practice → Step 3 Real Conversation",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"왕초보부터 마스터까지 500일 분량 커리큘럼",en:"Beginner to master — 500 days of courses",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"왕초보부터 비즈니스까지 무제한 영어 수업",en:"Unlimited: beginner to business English",s:"Bloo Outcome LP",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"한국인 대상 10년+ 교육 전문가가 직접 기획",en:"Planned by 10+ year experts for Koreans.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-curriculum",ko:"현재 원어민이 사용하는 자연스러운 영어 표현",en:"Natural expressions currently used by natives.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tracking",ko:"'대화 유창성' 중심으로 학습 진전을 시각화",en:"Visualizes progress around conversation fluency.",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-tracking",ko:"CEFR 기반 내 영어 레벨 체크",en:"Check your level based on CEFR.",s:"Interview materials",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-circular",ko:"영어는 결국 말해야 트입니다. 스픽은 정말 말을 많이 시킵니다.",en:"English opens when you speak. Speak makes you speak a lot.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-gamification",ko:"매일 불꽃이 켜집니다. 100일 연속이면 특별한 선물!",en:"Daily streak flame. 100 days? Special gift!",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-gamification",ko:"매월 학습 챌린지에 참가, 아이패드 경품",en:"Monthly challenges, win iPad prizes.",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-b2b",ko:"기업 맞춤형 영어 교육 'S4B'",en:"Enterprise English 'S4B'",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Features",g:"feat-b2b",ko:"S4B 도입 기업 300+, 10대 대기업 채택률 80%",en:"300+ companies, 80% top 10 conglomerates",s:"Press Kit",f:"Universal",k:false},
// RTB-Tech
{l:"6",sub:"RTB-Tech",g:null,ko:"세계 최고 수준의 AI 음성 인식 기술",en:"World-class AI speech recognition",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"한국인 영어 음성 데이터 100만 명+ 학습",en:"Trained on 1M+ Korean voice data",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"93% 이상 ASR 정확도",en:"93%+ ASR accuracy",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"실리콘 밸리 자체 개발 AI 기술",en:"AI developed in-house in Silicon Valley",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"한국인 영어 학습 데이터 2만 시간+ 분석",en:"20,000+ hours Korean English data analyzed",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"영어교육학 박사가 만든 커리큘럼",en:"Curriculum by PhD in English education",s:"Press Kit",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"100% LA 자체 스튜디오 제작",en:"100% LA studio-produced",s:"Website",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Tech",g:null,ko:"하루 평균 100문장, 주 1,000문장",en:"100 sentences/day, 1,000/week",s:"Press Kit",f:"TO-BE aligned",k:false},
// RTB-Awards
{l:"6",sub:"RTB-Awards",g:null,ko:"구글 '올해를 빛낸 자기계발 앱'",en:"Google 'Best Self-improvement App'",s:"Press Kit (2019-20)",f:"Universal",k:false},
{l:"6",sub:"RTB-Awards",g:null,ko:"구글플레이 '올해의 베스트앱'",en:"Google Play 'Best App' 2024",s:"Press Kit (2024)",f:"Universal",k:false},
{l:"6",sub:"RTB-Awards",g:null,ko:"美 포브스 'AI 50' 유일 선정",en:"Forbes 'AI 50' — only language co.",s:"Press Kit (2025)",f:"Universal",k:false},
{l:"6",sub:"RTB-Awards",g:null,ko:"유튜브 웍스 어워드 '베스트 AI 파이오니어'",en:"YouTube Works 'Best AI Pioneer'",s:"Press Kit (2025)",f:"Universal",k:false},
// RTB-Scale
{l:"6",sub:"RTB-Scale",g:null,ko:"글로벌 1,500만 다운로드",en:"15M global downloads",s:"Press Kit",f:"Universal",k:false},
{l:"6",sub:"RTB-Scale",g:null,ko:"평점 4.8 (17만개 평가)",en:"4.8 rating (170K reviews)",s:"App Store",f:"Universal",k:false},
{l:"6",sub:"RTB-Scale",g:null,ko:"15만 개의 유저 후기가 증명하는 1위 앱",en:"#1 app proven by 150K reviews",s:"LP/Ads",f:"Universal",k:false},
{l:"6",sub:"RTB-Scale",g:null,ko:"구독 30일 후 50%+ 활성 유지율",en:"50%+ retention 30 days after sub",s:"EO Korea 2025",f:"Universal",k:false},
// RTB-Reviews
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"영어 실력이 고급지게 레벨업한 느낌!\"",en:"English leveled up!",s:"User: 엘리",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"자연스럽게 영어 공부 습관을 만들어 주더라고요!\"",en:"Naturally built a study habit!",s:"User: 킴벌리",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"다 해봤는데 스픽만큼 갓성비가 없어요!\"",en:"Tried everything — nothing beats Speak's value!",s:"User: 양지",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"스픽은 진짜 말하게 만드는 앱\"",en:"Speak truly makes you speak",s:"User: 정은영",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"피드백이 자세해서 자신감이 생겼습니다\"",en:"Detailed feedback gave me confidence",s:"User: 정구철",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"영어 울렁증이라 망설이다 해보니 놀라울정도로 편안\"",en:"Had anxiety, surprisingly comfortable",s:"User (Anon)",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Reviews",g:null,ko:"\"이것저것 시도만 하다 끝내길 반복, 현재 너무 재밌게 하고 있습니다\"",en:"Kept trying/quitting, now really enjoying it",s:"User (Anon)",f:"TO-BE aligned",k:false},
// RTB-Team
{l:"6",sub:"RTB-Team",g:null,ko:"하버드, 스탠포드, 예일 출신 창업자들",en:"Founders from Harvard, Stanford, Yale",s:"Website",f:"Universal",k:false},
{l:"6",sub:"RTB-Team",g:null,ko:"OpenAI 기술 제휴 + 스타트업 펀드 투자",en:"OpenAI partnership + Startup Fund investment",s:"Press Kit",f:"Universal",k:false},
{l:"6",sub:"RTB-Team",g:null,ko:"누적 투자 2,274억원 · 유니콘 1.4조",en:"₩227.4B invested · ₩1.4T unicorn",s:"Press Kit / Website",f:"Universal",k:false},
// RTB-Price
{l:"6",sub:"RTB-Price",g:null,ko:"매일 수업해도 월 1만원대",en:"Daily lessons at ₩10K/month",s:"LP common",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"월 1만원대 무제한 스피킹",en:"Unlimited speaking at ₩10K/month",s:"Campaign LP",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"대방어 중사이즈 = 스픽 3달 무제한",en:"Yellowtail sashimi = 3 months Speak",s:"Instagram",f:"TO-BE aligned",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"프리미엄 연간 ₩129,000 (60% OFF) — 월 ₩10,750",en:"Premium: ₩129K (60% OFF)",s:"App Store/LP",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"프리미엄 플러스 연간 ₩299,000 (68% OFF) — 월 ₩19,916",en:"Premium+: ₩299K (68% OFF)",s:"App Store/LP",f:"Universal",k:false},
{l:"6",sub:"RTB-Price",g:null,ko:"10명 중 8명은 프리미엄 플러스 선택",en:"8/10 choose Premium Plus",s:"Interview",f:"Universal",k:false},
// ===7 CTA===
{l:"7",sub:"CTA-General",g:null,ko:"지금 시작하기",en:"Start now",s:"Website",f:"Universal",k:false},
{l:"7",sub:"CTA-General",g:null,ko:"스피킹 시작",en:"Start speaking",s:"Website",f:"Universal",k:false},
{l:"7",sub:"CTA-General",g:null,ko:"구매하기",en:"Purchase",s:"LP common",f:"Universal",k:false},
{l:"7",sub:"CTA-Price",g:null,ko:"지금 할인가로 시작하기",en:"Start at discount now",s:"Campaign LP",f:"Universal",k:false},
{l:"7",sub:"CTA-Price",g:null,ko:"지금 최저가에 구매하기 →",en:"Buy at lowest price →",s:"Bloo Outcome LP",f:"Universal",k:false},
{l:"7",sub:"CTA-Price",g:null,ko:"올해 마지막 최저가, 구매하기",en:"Last lowest price — buy now",s:"SMS",f:"Universal",k:false},
{l:"7",sub:"CTA-Channel",g:null,ko:"월 1만원대 무제한 영어 공부 시작 →",en:"Start unlimited English ₩10K/mo →",s:"Instagram",f:"Universal",k:false},
{l:"7",sub:"CTA-Channel",g:null,ko:"지금 할인가에 스픽 시작하기→",en:"Start Speak at discount →",s:"Travel LP",f:"Universal",k:false},
];

const EVAL_PROMPT = `You are Speak's Brand Copy Evaluator. You evaluate Korean marketing copy against Speak's brand guidelines.

BRAND GUIDELINES:
- Vision: To reinvent the way people learn, starting with language.
- Philosophy: 틀려라, 트일 것이다 (Make mistakes — you'll break through)
- Definition: 나를 끌어주는 영어 앱 (The app that pulls me along) — Pacer concept
- Key Copy: 따라오면, 말이 된다 스픽
- Tone: Honest × Witty. Not Duolingo meme-humor, not lecture-platform authority.
- Positioning shift: Feature-led (AS-IS) → Method-led (TO-BE). Speak is the active agent pulling the user.

SPEAKNESS (brand attributes — at least one must be present):
- Confident: Plain claims, no hedging, let track record speak.
- Innovative: AI/tech only when it serves user outcome. Never lead with "AI" as buzzword.
- Authentic (CORE): No inflated claims. Acknowledge real effort. Straightforward.
- Witty: Smirk-worthy, never forced. True humor. Spider-Man quip, not Duolingo push.

NOT SPEAKNESS (must NOT be present):
- Frivolous: Too lightweight, childish, one-dimensional.
- Sensational: Exaggerated, clickbait, addictive framing, intensity for its own sake.
- Authoritative: Heavy, preachy, dogmatic, "teacher-knows-best."
- Gamification-first: Framing learning as a game, streak/score/competition.

COPY RULES:
DO: Outcomes > features. Short direct sentences. Acknowledge pain. Back with data. Peer tone.
DON'T: Celebrity language. Unrealistic timelines. "Fun and easy." Generic edtech. ALL CAPS. "Introducing..."

Evaluate the given copy and respond ONLY in valid JSON:
{
  "overall_score": number (1-10),
  "overall_verdict": "PASS" | "CAUTION" | "FAIL",
  "speakness": {
    "confident": number (0-10),
    "innovative": number (0-10),
    "authentic": number (0-10),
    "witty": number (0-10),
    "primary_attribute": "string"
  },
  "not_speakness": {
    "frivolous": boolean,
    "sensational": boolean,
    "authoritative": boolean,
    "gamification_first": boolean,
    "flags": ["string"] or []
  },
  "positioning_fit": {
    "score": number (1-10),
    "is_tobe": boolean,
    "note": "string"
  },
  "tone_check": {
    "honest": number (0-10),
    "witty": number (0-10),
    "note": "string"
  },
  "copy_rules": {
    "outcome_led": boolean,
    "concise": boolean,
    "no_exaggeration": boolean,
    "data_backed": boolean,
    "peer_tone": boolean,
    "violations": ["string"] or []
  },
  "suggestions": ["string"],
  "revised_copy": "string (improved version if score < 7, otherwise null)"
}`;

function Evaluator({gk}){
  const[input,setInput]=useState("");
  const[loading,setLoading]=useState(false);
  const[result,setResult]=useState(null);
  const[error,setError]=useState(null);
  const evaluate=async()=>{
    if(!input.trim())return;
    if(!gk){setError("🔑 먼저 상단의 'Set Key' 버튼을 눌러 Gemini API Key를 입력해주세요.");return}
    setLoading(true);setError(null);setResult(null);
    try{
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gk}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({system_instruction:{parts:[{text:EVAL_PROMPT}]},contents:[{parts:[{text:`Evaluate this Korean marketing copy for Speak:\n\n"${input}"`}]}],generationConfig:{temperature:0.7,maxOutputTokens:2000,responseMimeType:"application/json"}})
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error.message||"API error");
      const text=data.candidates?.[0]?.content?.parts?.[0]?.text||"";
      if(!text) throw new Error("빈 응답. 다시 시도해주세요.");
      setResult(JSON.parse(text.replace(/```json|```/g,"").trim()));
    }catch(e){setError("⚠️ "+(e.message||"생성 실패. 30초 후 다시 시도해주세요."))}
    setLoading(false);
  };

  const verdictColor={"PASS":"#10B981","CAUTION":"#F59E0B","FAIL":"#EF4444"};
  const ScoreBar=({label,score,max=10,color="#1C49FF"})=>(<div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
    <span style={{fontSize:11,color:"#6B7280",width:90,flexShrink:0}}>{label}</span>
    <div style={{flex:1,height:6,background:"#E8E9ED",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",width:`${(score/max)*100}%`,background:color,borderRadius:99,transition:"width 0.3s"}}/></div>
    <span style={{fontSize:11,fontWeight:600,color,fontFamily:"'Pretendard','Inter'",width:24,textAlign:"right"}}>{score}</span>
  </div>);

  return(<div style={{padding:"28px 32px",maxWidth:800}}>
    <h2 style={{fontSize:18,fontWeight:700,fontFamily:"'Pretendard','Inter',sans-serif",marginBottom:4}}>✅ Copy Evaluator</h2>
    <p style={{fontSize:13,color:"#4B5563",marginBottom:16}}>Paste any copy → Get a brand compliance score + improvement suggestions</p>

    <div style={{marginBottom:20}}>
      <label style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Copy to evaluate</label>
      <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="카피를 여기에 붙여넣으세요... (e.g. 영어가 쉬워지니까, 선택지가 무한대!)" rows={4} style={{width:"100%",padding:"14px 16px",borderRadius:10,border:"1px solid #E2E4E8",background:"#F0F1F3",color:"#1A1A1A",fontSize:15,outline:"none",resize:"vertical",fontFamily:"'Noto Sans KR','DM Sans',sans-serif",lineHeight:1.6}}/>
    </div>

    <button onClick={evaluate} disabled={loading||!input.trim()} style={{padding:"12px 32px",borderRadius:8,border:"none",background:loading?"#2A2A38":!input.trim()?"#E2E4E8":"#10B981",color:!input.trim()?"#4A4A60":"#fff",fontSize:15,fontWeight:700,cursor:loading?"wait":!input.trim()?"default":"pointer",fontFamily:"'Pretendard','Inter',sans-serif",opacity:loading?0.7:1}}>
      {loading?"Evaluating...":"✅ Evaluate Copy"}
    </button>

    {error&&<div style={{marginTop:16,padding:"12px 16px",background:"#EF444420",borderRadius:8,color:"#DC2626",fontSize:13}}>{error}</div>}

    {result&&<div style={{marginTop:28}}>
      {/* Overall verdict */}
      <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:24,padding:"20px 24px",background:"#FFFFFF",borderRadius:12,border:`1px solid ${verdictColor[result.overall_verdict]}44`}}>
        <div style={{width:64,height:64,borderRadius:99,background:verdictColor[result.overall_verdict]+"20",display:"flex",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:28,fontWeight:700,color:verdictColor[result.overall_verdict],fontFamily:"'Pretendard','Inter'"}}>{result.overall_score}</span>
        </div>
        <div>
          <div style={{fontSize:20,fontWeight:700,color:verdictColor[result.overall_verdict],fontFamily:"'Pretendard','Inter'"}}>{result.overall_verdict}</div>
          <div style={{fontSize:12,color:"#6B7280",marginTop:2}}>Overall Brand Compliance Score</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* Speakness */}
        <div style={{background:"#FFFFFF",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",marginBottom:12}}>Speakness Attributes</div>
          <ScoreBar label="Confident" score={result.speakness.confident} color="#3B82F6"/>
          <ScoreBar label="Innovative" score={result.speakness.innovative} color="#8B5CF6"/>
          <ScoreBar label="Authentic" score={result.speakness.authentic} color="#10B981"/>
          <ScoreBar label="Witty" score={result.speakness.witty} color="#F59E0B"/>
          <div style={{marginTop:8,fontSize:11,color:"#6B7280"}}>Primary: <strong style={{color:"#1A1A1A"}}>{result.speakness.primary_attribute}</strong></div>
        </div>

        {/* Tone */}
        <div style={{background:"#FFFFFF",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",marginBottom:12}}>Tone Check (Honest × Witty)</div>
          <ScoreBar label="Honest" score={result.tone_check.honest} color="#06B6D4"/>
          <ScoreBar label="Witty" score={result.tone_check.witty} color="#F59E0B"/>
          <div style={{marginTop:8,fontSize:11,color:"#6B7280",lineHeight:1.5}}>{result.tone_check.note}</div>
        </div>

        {/* Not Speakness */}
        <div style={{background:"#FFFFFF",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",marginBottom:12}}>Not Speakness Check</div>
          {[["Frivolous",result.not_speakness.frivolous],["Sensational",result.not_speakness.sensational],["Authoritative",result.not_speakness.authoritative],["Gamification",result.not_speakness.gamification_first]].map(([label,flagged])=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <span style={{width:20,height:20,borderRadius:5,background:flagged?"#EF444420":"#10B98120",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12}}>{flagged?"✗":"✓"}</span>
              <span style={{fontSize:12,color:flagged?"#EF4444":"#10B981"}}>{label}</span>
            </div>
          ))}
          {result.not_speakness.flags.length>0&&<div style={{marginTop:8,fontSize:11,color:"#EF4444",lineHeight:1.5}}>Flags: {result.not_speakness.flags.join(", ")}</div>}
        </div>

        {/* Positioning */}
        <div style={{background:"#FFFFFF",borderRadius:10,padding:"16px 18px"}}>
          <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",marginBottom:12}}>Positioning Fit</div>
          <ScoreBar label="TO-BE fit" score={result.positioning_fit.score} color={result.positioning_fit.is_tobe?"#10B981":"#EF4444"}/>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:4,marginBottom:8}}>
            <span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:result.positioning_fit.is_tobe?"#10B98120":"#EF444420",color:result.positioning_fit.is_tobe?"#10B981":"#EF4444",fontWeight:600}}>{result.positioning_fit.is_tobe?"TO-BE aligned":"AS-IS / Off-brand"}</span>
          </div>
          <div style={{fontSize:11,color:"#6B7280",lineHeight:1.5}}>{result.positioning_fit.note}</div>
        </div>
      </div>

      {/* Copy Rules */}
      <div style={{background:"#FFFFFF",borderRadius:10,padding:"16px 18px",marginTop:16}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",marginBottom:12}}>Copy Rules Check</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {[["Outcome-led",result.copy_rules.outcome_led],["Concise",result.copy_rules.concise],["No exaggeration",result.copy_rules.no_exaggeration],["Data-backed",result.copy_rules.data_backed],["Peer tone",result.copy_rules.peer_tone]].map(([label,pass])=>(
            <span key={label} style={{fontSize:11,padding:"4px 12px",borderRadius:99,background:pass?"#10B98115":"#EF444415",color:pass?"#10B981":"#EF4444",fontWeight:600}}>{pass?"✓":"✗"} {label}</span>
          ))}
        </div>
        {result.copy_rules.violations.length>0&&<div style={{marginTop:10,fontSize:11,color:"#EF4444",lineHeight:1.6}}>Violations: {result.copy_rules.violations.join(" · ")}</div>}
      </div>

      {/* Suggestions */}
      {result.suggestions.length>0&&<div style={{background:"#FFFFFF",borderRadius:10,padding:"16px 18px",marginTop:16}}>
        <div style={{fontSize:12,fontWeight:700,color:"#1A1A1A",marginBottom:10}}>💡 Improvement Suggestions</div>
        {result.suggestions.map((s,i)=><div key={i} style={{fontSize:12,color:"#6B7280",lineHeight:1.6,marginBottom:4}}>• {s}</div>)}
      </div>}

      {/* Revised copy */}
      {result.revised_copy&&<div style={{background:"#10B98110",borderRadius:10,padding:"16px 18px",marginTop:16,border:"1px solid #10B98130"}}>
        <div style={{fontSize:12,fontWeight:700,color:"#10B981",marginBottom:8}}>✨ Suggested Revision</div>
        <div style={{fontSize:16,fontWeight:600,color:"#1A1A1A",fontFamily:"'Noto Sans KR',sans-serif",lineHeight:1.6}}>{result.revised_copy}</div>
      </div>}
    </div>}
  </div>);
}

const FACTORY_CHANNELS = [
  {id:"paid",label:"Paid Ad",levels:["4","5","6"],rule:"Scroll-stopping. Lead with pain or surprising claim. Max 15 words for headline. Sub-copy backs with evidence.",
    formats:[{id:"h",label:"Headline only"},{id:"h+s",label:"Headline + Sub-copy"},{id:"h+s+cta",label:"Headline + Sub + CTA"}]},
  {id:"lp",label:"Landing Page",levels:["3","4","5","6","7"],rule:"Hierarchy descends with scroll: Hero → USP → Targeting → RTB → CTA. Each section answers one question.",
    formats:[{id:"hero",label:"Hero (headline + sub)"},{id:"section",label:"Section (headline + body)"},{id:"full",label:"Full section (headline + bullets + CTA)"}]},
  {id:"appstore",label:"App Store",levels:["2","4","6"],rule:"Front-load the most compelling claim. Include data. Limited space — every word counts.",
    formats:[{id:"title",label:"Title + Subtitle"},{id:"desc",label:"Short description (80 chars)"},{id:"full",label:"Full description paragraph"}]},
  {id:"crm",label:"CRM / Push",levels:["4","5","7"],rule:"Personal, direct, action-oriented. Gentle urgency. Respect character limits strictly.",
    formats:[{id:"push",label:"Push notification (<50 chars)"},{id:"push-pair",label:"Push title + body"},{id:"email",label:"Email subject + preview"},{id:"sms",label:"SMS (<80 chars)"}]},
  {id:"social",label:"Social",levels:["4","5","6"],rule:"Conversational, shareable. More playful OK. Must pass brand tone. No clickbait.",
    formats:[{id:"caption",label:"Instagram caption"},{id:"short",label:"Short (1 sentence + CTA)"},{id:"story",label:"Story text (<30 chars)"}]},
  {id:"influencer",label:"Influencer",levels:["4","5","6"],rule:"Natural spoken language. Real recommendation, not script. Personal story framing. Zero corporate tone.",
    formats:[{id:"hook",label:"Hook (first 3 seconds)"},{id:"talking",label:"Talking points (3-4 bullets)"},{id:"script",label:"Full script (30-60 sec)"}]},
  {id:"brand",label:"Brand Campaign",levels:["1","2","3"],rule:"Vision + Philosophy + Definition. Big-picture. Emotional resonance. Not seasonal.",
    formats:[{id:"slogan",label:"Campaign slogan"},{id:"manifesto",label:"Manifesto paragraph"},{id:"tagline",label:"Tagline + supporting line"}]},
];

const FACTORY_ANGLES = [
  {id:"usp",label:"💡 Value / USP",desc:"Why Speak — uncomfortable truth + solution",levels:["4"]},
  {id:"feature",label:"⚙️ Feature",desc:"What you can do — specific product capabilities",levels:["6"]},
  {id:"price",label:"💰 Price / Discount",desc:"How much — pricing, promotions, value comparison",levels:["6","7"]},
  {id:"proof",label:"👥 Social Proof",desc:"Who uses it — reviews, awards, numbers",levels:["6"]},
  {id:"habit",label:"🔥 Habit / Motivation",desc:"Why now — urgency, habit-building, momentum",levels:["4","5"]},
];

const FACTORY_TARGETS = ["General","Career / Business","Travel","Growth","Life Overseas","Test Prep (OPIc/TOEIC)","Parents"];

const SYSTEM_PROMPT = `You are Speak Korea's CopyOS Agent — an expert Korean marketing copywriter who has internalized Speak's brand identity.

═══ BRAND IDENTITY ═══

VISION: To reinvent the way people learn, starting with language.
PHILOSOPHY: 틀려라, 트일 것이다 (Make mistakes — you'll break through)
BRAND DEFINITION: 나를 끌어주는 영어 앱 (The app that pulls me along)
KEY COPY: 따라오면, 말이 된다 스픽 (Follow along — you'll speak. Speak.)

POSITIONING CONCEPT: "Pacer"
- NOT a teacher standing above → a guide slightly ahead, pulling you forward
- NOT a tool you use → an active agent that moves you
- NOT feature-led ("AI English app") → method-led ("the app that pulls me along")
- The user follows, Speak leads. The journey is structured but the user always feels agency.

═══ TONE: Honest × Witty ═══

HONEST means:
- No inflated claims. "7일만에 1,000문장" is okay (factual). "7일만에 영어 마스터" is NOT.
- Acknowledge real difficulty. "몇 년을 공부했는데도 말을 못 합니다" — don't sugarcoat.
- Data-backed: Forbes AI 50, 93% ASR, 100만 명+ 음성 데이터, 하루 100문장, 15M downloads.
- Peer tone, never instructor. "이제 진짜 해보자" not "지금 시작하세요!"

WITTY means:
- Spider-Man's cool quip — not Duolingo's chaotic owl
- Smirk-worthy, not laugh-out-loud. Clever, not cute.
- "대방어 중사이즈 = 스픽 3달 무제한" — Speak witty (unexpected comparison)
- "수영 인강이 아니라 물에 들어가야 하는 것처럼" — Speak witty (analogy that lands)

═══ 4 USPs ═══

USP1 "Pulls Speech Out": Years of study but can't speak → Speak makes you speak. (100+ sentences/day, Learn→Practice→Apply)
USP2 "Catches Until Right": Skipping mistakes = no growth → Speak makes you face them. (phoneme correction, spaced repetition, real-time AI feedback)
USP3 "Real Language": Textbook English doesn't work → Speak teaches usable language. (LA-produced, personalized, cultural context)
USP4 "Won't Let Quit": Willpower isn't enough → Speak won't let you stop. (streaks, challenges, adaptive nudges)

═══ NOT SPEAKNESS (must avoid) ═══
✗ Frivolous: Too lightweight, childish
✗ Sensational: Clickbait, exaggerated, "shocking" framing
✗ Authoritative: Preachy, dogmatic, teacher-knows-best
✗ Gamification-first: Learning as game, streak/score obsession

═══ COPY RULES ═══
DO: Outcomes > features. Short direct sentences. Acknowledge pain before solution. Back with data. Peer tone. "Uncomfortable Truth → Speak's Answer" structure for USP.
DON'T: Celebrity language. Unrealistic timelines. "Fun and easy." Generic edtech. ALL CAPS. "소개합니다/Introducing." Feature-first.

═══ DATA BANK (USE ONLY THESE NUMBERS) ═══
- 글로벌 1,500만 다운로드
- 평점 4.8 (17만개 평가)
- 93% 이상 ASR 정확도
- 한국인 영어 음성 데이터 100만 명+
- 하루 평균 100문장, 주 1,000문장
- 500일 분량 코스, 2,000개+ 콘텐츠
- 100% LA 자체 스튜디오 제작
- 구독 30일 후 50%+ 활성 유지율
- S4B 도입 기업 300+, 10대 대기업 채택률 80%
- 누적 투자 2,274억원, 유니콘 1.4조
- Forbes AI 50, Google Play 올해의 앱, YouTube Works Award
- 프리미엄 연간 ₩129,000 (월 ₩10,750), 프리미엄 플러스 연간 ₩299,000 (월 ₩19,916)
DO NOT invent numbers. If a claim needs data not here, state without a number.

═══ TARGET AUDIENCES ═══
- Career/Business: 25-34, English for work/meetings/salary. Highest LTV ($23.46), CVR 24.7%.
- Travel: 31.3% of signups (growing to 34%). Pre-trip urgency.
- Growth: Self-improvement. "Would be nice." Lower urgency, needs emotional hook.
- Life Overseas: Living/planning abroad. High stakes, daily necessity.
- Test Prep: OPIc, TOEIC Speaking. Deadline-driven, CVR 23.8%.
- Parents: Want to speak English to/with kids. Emotional motivation.
- General: Broad. Lead with universal pain.

═══ OUTPUT FORMAT ═══
Respond ONLY in valid JSON. Return an array of exactly 3 objects.
Keep ALL text values SHORT. Each object:
{"ko":"Korean copy text","en":"English translation (max 10 words)","sub":"optional supporting copy in Korean or null","tone":"safe|balanced|bold","note":"brand strategy in 10 words max"}`;

function Factory({copies,gk}){
  const[channelIdx,setChannelIdx]=useState(0);
  const[formatIdx,setFormatIdx]=useState(0);
  const[angles,setAngles]=useState(["usp"]);
  const[target,setTarget]=useState(FACTORY_TARGETS[0]);
  const[context,setContext]=useState("");
  const[loading,setLoading]=useState(false);
  const[results,setResults]=useState(null);
  const[error,setError]=useState(null);
  const[copiedIdx,setCopiedIdx]=useState(null);

  
  const ch=FACTORY_CHANNELS[channelIdx];
  const fmt=ch.formats[formatIdx]||ch.formats[0];
  const selectedAngles=FACTORY_ANGLES.filter(a=>angles.includes(a.id));
  const toggleAngle=(id)=>{setAngles(prev=>prev.includes(id)?prev.filter(a=>a!==id):[...prev,id]);setResults(null)};

  const relevantCopies = useMemo(()=>{
    const targetMap={"Career / Business":"T-Career","Travel":"T-Travel","Growth":"T-Growth","Life Overseas":"T-Overseas","Test Prep (OPIc/TOEIC)":"T-Test","Parents":"T-Parents","General":"T-General"};
    const tSub=targetMap[target];
    const angleLevels=[...new Set(selectedAngles.flatMap(a=>a.levels))];
    const allLevels=[...new Set([...ch.levels,...angleLevels])];
    const channelCopies=copies.filter(c=>allLevels.includes(c.l)).slice(0,10);
    const targetCopies=copies.filter(c=>c.sub===tSub).slice(0,8);
    const keyCopies=copies.filter(c=>c.k);
    // Angle-specific pulls
    let angleCopies=[];
    if(angles.includes("price")) angleCopies.push(...copies.filter(c=>c.sub==="RTB-Price").slice(0,5));
    if(angles.includes("proof")) angleCopies.push(...copies.filter(c=>c.sub==="RTB-Scale"||c.sub==="RTB-Awards"||c.sub==="RTB-Reviews").slice(0,6));
    if(angles.includes("feature")) angleCopies.push(...copies.filter(c=>c.sub==="RTB-Features").slice(0,6));
    if(angles.includes("habit")) angleCopies.push(...copies.filter(c=>c.sub==="USP4"||c.l==="5").slice(0,5));
    if(angles.includes("usp")) angleCopies.push(...copies.filter(c=>c.l==="4"&&!c.k).slice(0,5));
    const seen=new Set();
    return[...keyCopies,...targetCopies,...angleCopies,...channelCopies].filter(c=>{const k=c.ko;if(seen.has(k))return false;seen.add(k);return true}).slice(0,30);
  },[target,ch,angles,copies]);

  // Format spec based on channel+format
  const getFormatSpec=()=>{
    const f=fmt.id;
    if(f==="h") return `Each option's "copies" field: {"headline":"string (max 15 words)"}`;
    if(f==="h+s") return `Each option's "copies" field: {"headline":"string (max 15 words)","sub_copy":"string (1-2 sentences)"}`;
    if(f==="s") return `Each option's "copies" field: {"sub_copy":"string (1-2 sentences backing up a headline)"}`;
    if(f==="hero") return `Each option's "copies" field: {"headline":"string","sub_copy":"string (1-2 sentences)"}`;
    if(f==="hero-full") return `Each option's "copies" field: {"headline":"string","sub_copy":"string","cta":"string (button text)"}`;
    if(f==="section") return `Each option's "copies" field: {"section_headline":"string","body":"string (paragraph, 2-3 sentences)"}`;
    if(f==="multi") return `Each option's "copies" field: {"section_headline":"string","bullet_1":"string","bullet_2":"string","bullet_3":"string","cta":"string"}`;
    if(f==="title") return `Each option's "copies" field: {"app_title":"string (max 30 chars)","subtitle":"string (max 30 chars)"}`;
    if(f==="desc") return `Each option's "copies" field: {"short_description":"string (max 80 chars)"}`;
    if(f==="full") return `Each option's "copies" field: {"description":"string (1 paragraph, 3-4 sentences)"}`;
    if(f==="push") return `Each option's "copies" field: {"push_text":"string (MUST be under 50 characters)"}`;
    if(f==="push-pair") return `Each option's "copies" field: {"push_title":"string (max 20 chars)","push_body":"string (max 50 chars)"}`;
    if(f==="email") return `Each option's "copies" field: {"subject":"string (max 50 chars)","preview":"string (max 90 chars)"}`;
    if(f==="sms") return `Each option's "copies" field: {"sms_text":"string (MUST be under 80 characters)"}`;
    if(f==="caption") return `Each option's "copies" field: {"caption":"string (2-3 sentences + hashtags)"}`;
    if(f==="short") return `Each option's "copies" field: {"text":"string (1 sentence)","cta":"string"}`;
    if(f==="story") return `Each option's "copies" field: {"story_text":"string (MUST be under 30 characters)"}`;
    if(f==="hook") return `Each option's "copies" field: {"hook":"string (spoken, first 3 seconds, must grab attention)"}`;
    if(f==="talking") return `Each option's "copies" field: {"point_1":"string","point_2":"string","point_3":"string","point_4":"string (optional)"}`;
    if(f==="full-script") return `Each option's "copies" field: {"hook":"string","body":"string (main content, 3-4 sentences)","cta":"string (closing call to action)"}`;
    if(f==="slogan") return `Each option's "copies" field: {"slogan":"string (max 10 words)"}`;
    if(f==="manifesto") return `Each option's "copies" field: {"manifesto":"string (1 powerful paragraph, 3-5 sentences)"}`;
    if(f==="tagline") return `Each option's "copies" field: {"tagline":"string","supporting":"string (1 sentence)"}`;
    return `Each option's "copies" field: {"headline":"string","sub_copy":"string"}`;
  };

  const generate=async()=>{
    setLoading(true);setError(null);setResults(null);
    const refCopyText=relevantCopies.map(c=>{
      const lvl=LEVELS.find(l=>l.id===c.l);
      return`[${lvl?.label||c.l}${c.sub?"/"+c.sub:""}] ${c.ko}${c.en?` — ${c.en}`:""}`;
    }).join("\n");
    const angleLabels=selectedAngles.map(a=>`${a.label} — ${a.desc}`).join("\n- ");
    const angleGuidance=selectedAngles.map(a=>{
      if(a.id==="usp") return"• VALUE/USP: Lead with uncomfortable truth, position Speak as answer. Problem first, not features.";
      if(a.id==="feature") return"• FEATURE: Highlight capabilities (AI Free Talk, 3-Step, Smart Review etc). Frame as outcomes ('음소 분석' → '원어민처럼 자연스럽게').";
      if(a.id==="price") return"• PRICE: Lead with price/value. DATA BANK prices only. Comparisons ('대방어 중사이즈 = 스픽 3달'). Pair price with what you get.";
      if(a.id==="proof") return"• PROOF: Lead with social proof — downloads, ratings, awards, user quotes. Numbers first, emotion second.";
      return"• HABIT: Why start TODAY. Streak/routine framing without gamification-first. '양치질처럼 당연한 습관' style.";
    }).join("\n");
    const userMsg=`Generate Korean marketing copy for Speak.

═══ BRIEF ═══
Channel: ${ch.label}
Format: ${fmt.label}
Message Angles (combine these): 
- ${angleLabels}
Target audience: ${target}
${context?`Additional context: ${context}`:""}

═══ CHANNEL RULES ═══
${ch.rule}

═══ MESSAGE ANGLE GUIDANCE ═══
Combine the following angles naturally in each copy. Don't treat them as separate sections — weave them together.
${angleGuidance}

═══ FORMAT SPEC ═══
${getFormatSpec()}

═══ REFERENCE COPIES (${relevantCopies.length}) ═══
${refCopyText}

═══ INSTRUCTIONS ═══
Generate exactly 3 Korean copy options: one safe, one balanced, one bold.
Output format: [{"ko":"...","en":"...","sub":"...or null","tone":"safe|balanced|bold","note":"..."}]
Keep ALL values short. Return ONLY valid JSON array.`;

    const parseResult=(text)=>{
      if(!text) throw new Error("empty response");
      let clean=text.replace(/```json|```/g,"").trim();
      if(!clean.endsWith("]")){const last=clean.lastIndexOf("}");if(last>0)clean=clean.substring(0,last+1)+"]"}
      const parsed=JSON.parse(clean);
      return Array.isArray(parsed)?parsed:[parsed];
    };

    try{
      if(!gk){setError("🔑 먼저 상단의 'Set Key' 버튼을 눌러 Gemini API Key를 입력해주세요.");setLoading(false);return}
      const res=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gk}`,{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({system_instruction:{parts:[{text:SYSTEM_PROMPT}]},contents:[{parts:[{text:userMsg}]}],generationConfig:{temperature:0.7,maxOutputTokens:4000,responseMimeType:"application/json"}})
      });
      const data=await res.json();
      if(data.error) throw new Error(data.error.message||"API error");
      const text=data.candidates?.[0]?.content?.parts?.[0]?.text||"";
      if(!text) throw new Error("빈 응답. 다시 시도해주세요.");
      setResults(parseResult(text));
    }catch(e){setError("⚠️ "+(e.message||"생성 실패. 30초 후 다시 시도해주세요."))}
    setLoading(false);
  };

  const toneColors={"safe":"#10B981","balanced":"#F59E0B","bold":"#EF4444"};

  return(<div style={{padding:"28px 32px",maxWidth:900}}>
    <h2 style={{fontSize:18,fontWeight:700,fontFamily:"'Pretendard','Inter',sans-serif",marginBottom:4}}>🏭 Copy Factory</h2>
    <p style={{fontSize:13,color:"#4B5563",marginBottom:16}}>Channel → Angle → Target → Tone → Generate on-brand options</p>

    {/* ① Channel */}
    <div style={{marginBottom:20}}>
      <label style={{fontSize:11,fontWeight:700,color:"#5B7AFF",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:8}}>① Channel</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {FACTORY_CHANNELS.map((c,ci)=><button key={c.id} onClick={()=>{setChannelIdx(ci);setFormatIdx(0);setResults(null)}} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${channelIdx===ci?"#1C49FF":"#E2E4E8"}`,background:channelIdx===ci?"#1C49FF20":"#F0F1F3",color:channelIdx===ci?"#5B7AFF":"#7E7E96",fontSize:12,cursor:"pointer",fontWeight:channelIdx===ci?700:400}}>{c.label}</button>)}
      </div>
      {/* Format sub-options */}
      <div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>
        {ch.formats.map((f,fi)=><button key={f.id} onClick={()=>setFormatIdx(fi)} style={{padding:"5px 12px",borderRadius:6,border:`1px solid ${formatIdx===fi?"#1C49FF55":"#E2E4E8"}`,background:formatIdx===fi?"#1C49FF10":"transparent",color:formatIdx===fi?"#5B7AFF":"#5A5A72",fontSize:10,cursor:"pointer",fontWeight:formatIdx===fi?600:400}}>{f.label}</button>)}
      </div>
    </div>

    {/* ② Message Angle (multi-select) */}
    <div style={{marginBottom:20}}>
      <label style={{fontSize:11,fontWeight:700,color:"#F59E0B",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:8}}>② Message Angle <span style={{fontWeight:400,color:"#9CA3AF"}}>— select one or more</span></label>
      <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
        {FACTORY_ANGLES.map(a=>{const sel=angles.includes(a.id);return<button key={a.id} onClick={()=>toggleAngle(a.id)} style={{padding:"8px 16px",borderRadius:8,border:`1px solid ${sel?"#F59E0B":"#E2E4E8"}`,background:sel?"#F59E0B15":"#F0F1F3",color:sel?"#FCD34D":"#7E7E96",fontSize:12,cursor:"pointer",fontWeight:sel?700:400}}>{a.label}</button>})}
      </div>
      <div style={{marginTop:6,fontSize:12,color:"#4B5563"}}>{selectedAngles.map(a=>a.desc).join(" + ")}</div>
    </div>

    {/* ③ Target */}
    <div style={{marginBottom:20}}>
      <label style={{fontSize:11,fontWeight:700,color:"#EC4899",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:8}}>③ Target</label>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {FACTORY_TARGETS.map(t=><button key={t} onClick={()=>setTarget(t)} style={{padding:"6px 12px",borderRadius:7,border:`1px solid ${target===t?"#EC489944":"#E2E4E8"}`,background:target===t?"#EC489915":"#F0F1F3",color:target===t?"#DB2777":"#374151",fontSize:11,cursor:"pointer",fontWeight:target===t?600:400}}>{t}</button>)}
      </div>
    </div>

    {/* Additional context */}
    <div style={{marginBottom:20}}>
      <label style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.1em",display:"block",marginBottom:6}}>Additional Context (optional)</label>
      <textarea value={context} onChange={e=>setContext(e.target.value)} placeholder="e.g. Summer promo, emphasize travel English, 50% discount, 여행 시즌 강조..." rows={2} style={{width:"100%",padding:"10px 14px",borderRadius:8,border:"1px solid #E2E4E8",background:"#F0F1F3",color:"#1A1A1A",fontSize:13,outline:"none",resize:"vertical",fontFamily:"'Pretendard','Noto Sans KR',sans-serif"}}/>
    </div>

    {/* Reference copies preview */}
    <div style={{marginBottom:20,padding:"12px 14px",background:"#F0F1F3",borderRadius:8,border:"1px solid #E2E4E8"}}>
      <div style={{fontSize:10,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Reference copies from warehouse ({relevantCopies.length})</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:4}}>
        {relevantCopies.slice(0,8).map((c,i)=><span key={i} style={{fontSize:10,padding:"3px 8px",borderRadius:6,background:"#E8E9ED",color:"#4B5563",maxWidth:250,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.ko.slice(0,40)}...</span>)}
        {relevantCopies.length>8&&<span style={{fontSize:10,color:"#9CA3AF"}}>+{relevantCopies.length-8} more</span>}
      </div>
    </div>

    {/* Generate button */}
    <button onClick={generate} disabled={loading} style={{padding:"14px 36px",borderRadius:8,border:"none",background:loading?"#2A2A38":"#1C49FF",color:"#fff",fontSize:15,fontWeight:700,cursor:loading?"wait":"pointer",fontFamily:"'Pretendard','Inter',sans-serif",opacity:loading?0.7:1}}>
      {loading?"Generating 5-10 options...":"⚡ Generate Copy Options (5-10)"}
    </button>

    {error&&<div style={{marginTop:16,padding:"12px 16px",background:"#EF444420",borderRadius:8,color:"#DC2626",fontSize:13}}>{error}</div>}

    {/* Results */}
    {results&&<div style={{marginTop:28}}>
      <div style={{fontSize:14,fontWeight:700,color:"#1A1A1A",marginBottom:4,fontFamily:"'Pretendard','Inter',sans-serif"}}>Generated: {results.length} options</div>
      <div style={{fontSize:11,color:"#6B7280",marginBottom:16}}>{ch.label} · {fmt.label} · {target}</div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {results.map((r,i)=>{const tc=toneColors[r.tone]||"#F59E0B";return(
          <div key={i} style={{background:"#FFFFFF",borderRadius:10,padding:"16px 20px",borderLeft:`4px solid ${tc}`,position:"relative"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
              <span style={{fontSize:11,fontWeight:700,color:tc,fontFamily:"'Pretendard','Inter',sans-serif"}}>#{i+1}</span>
              <span style={{fontSize:10,padding:"2px 8px",borderRadius:99,background:tc+"18",color:tc,fontWeight:600}}>{r.tone}</span>
            </div>
            <div style={{fontSize:17,fontWeight:700,lineHeight:1.5,color:"#1A1A1A",fontFamily:"'Noto Sans KR',sans-serif",letterSpacing:"-0.015em",paddingRight:60}}>{r.ko}</div>
            {r.sub&&<div style={{fontSize:13,color:"#6B7280",marginTop:6,lineHeight:1.5}}>{r.sub}</div>}
            {r.en&&<div style={{fontSize:12,color:"#9CA3AF",marginTop:4,fontStyle:"italic"}}>{r.en}</div>}
            {r.note&&<div style={{fontSize:11,color:"#9CA3AF",marginTop:8}}>{r.note}</div>}
            <button onClick={()=>{navigator.clipboard.writeText(r.ko+(r.sub?"\n"+r.sub:""));setCopiedIdx(i);setTimeout(()=>setCopiedIdx(null),1200)}} style={{position:"absolute",top:14,right:14,border:"none",background:copiedIdx===i?"#10B981":"#E2E4E8",color:copiedIdx===i?"#fff":"#7E7E96",borderRadius:6,padding:"4px 12px",fontSize:11,cursor:"pointer",fontWeight:600}}>{copiedIdx===i?"✓ Copied":"Copy"}</button>
          </div>
        )})}
      </div>
    </div>}
  </div>);
}

function Card({item,lv}){const[cp,setCp]=useState(false);const fc=item.f==="TO-BE aligned"?"#10B981":item.f==="AS-IS legacy"?"#EF4444":"#6B7280";return(<div style={{background:"#FFFFFF",borderRadius:10,padding:"14px 18px",borderLeft:`4px solid ${lv.color}`,position:"relative",transition:"transform 0.12s,box-shadow 0.12s"}} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-1px)";e.currentTarget.style.boxShadow="0 6px 20px rgba(0,0,0,0.18)"}} onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=""}}>{item.k&&<span style={{position:"absolute",top:10,right:52,fontSize:9,padding:"2px 7px",borderRadius:99,background:"#F59E0B20",color:"#F59E0B",fontWeight:700}}>★ KEY</span>}<div style={{fontSize:16,fontWeight:item.k?700:500,lineHeight:1.55,color:"#1A1A1A",fontFamily:"'Noto Sans KR',sans-serif",letterSpacing:"-0.015em",paddingRight:60}}>{item.ko}</div>{item.en&&<div style={{fontSize:12.5,color:"#6B7280",marginTop:5,fontStyle:"italic",lineHeight:1.4}}>{item.en}</div>}<div style={{display:"flex",flexWrap:"wrap",gap:5,marginTop:10,alignItems:"center"}}><span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:lv.color+"18",color:lv.color,fontWeight:600}}>{lv.id}. {lv.label}</span>{item.g&&<span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:"#F3F4F612",color:"#6B7280"}}>{FEAT_TAGS.find(t=>t.tag===item.g)?.label}</span>}<span style={{fontSize:10,padding:"2px 7px",borderRadius:99,background:fc+"14",color:fc,fontWeight:600}}>{item.f}</span><span style={{fontSize:10,color:"#9CA3AF",marginLeft:"auto"}}>{item.s}</span></div><button onClick={()=>{navigator.clipboard.writeText(item.ko);setCp(true);setTimeout(()=>setCp(false),1000)}} style={{position:"absolute",top:10,right:10,border:"none",background:cp?"#10B981":"#E2E4E8",color:cp?"#fff":"#7E7E96",borderRadius:6,padding:"3px 9px",fontSize:10,cursor:"pointer",fontWeight:600}}>{cp?"✓":"Copy"}</button></div>)}

function SpeakKR(){const[sel,setSel]=useState("All");const[subSel,setSubSel]=useState(null);const[featTag,setFeatTag]=useState(null);const[fit,setFit]=useState("All");const[q,setQ]=useState("");const[ch,setCh]=useState(null);const[view,setView]=useState("about");const[keyOnly,setKeyOnly]=useState(false);
const[gk,setGk]=useState(()=>{try{return localStorage.getItem("gk")||""}catch{return""}});
const[showKey,setShowKey]=useState(false);
const saveGk=(v)=>{setGk(v);try{localStorage.setItem("gk",v)}catch{}};
const data=useMemo(()=>{let r=D;if(ch){const c=CHANNELS.find(x=>x.name===ch);if(c)r=r.filter(d=>c.levels.includes(d.l))}if(sel!=="All")r=r.filter(d=>d.l===sel);if(subSel)r=r.filter(d=>d.sub===subSel);if(featTag)r=r.filter(d=>d.g===featTag);if(fit!=="All")r=r.filter(d=>d.f===fit);if(keyOnly)r=r.filter(d=>d.k);if(q.trim()){const s=q.toLowerCase();r=r.filter(d=>d.ko.toLowerCase().includes(s)||d.en.toLowerCase().includes(s)||d.s.toLowerCase().includes(s))}return r},[sel,subSel,featTag,fit,q,ch,keyOnly]);
const counts=useMemo(()=>{const c={};LEVELS.forEach(l=>c[l.id]=0);data.forEach(d=>c[d.l]++);return c},[data]);
const totalCounts=useMemo(()=>{const c={};LEVELS.forEach(l=>c[l.id]=0);D.forEach(d=>c[d.l]++);return c},[]);
const filteredSubCounts=useMemo(()=>{const c={};data.forEach(d=>{if(d.sub)c[d.sub]=(c[d.sub]||0)+1});return c},[data]);
const subCounts=useMemo(()=>{const c={};D.forEach(d=>{if(d.sub)c[d.sub]=(c[d.sub]||0)+1});return c},[]);
const featCounts=useMemo(()=>{const c={};D.filter(d=>d.sub==="RTB-Features").forEach(d=>{if(d.g)c[d.g]=(c[d.g]||0)+1});return c},[]);
const showFeatTags=subSel==="RTB-Features";
const handleLevelClick=(id)=>{if(sel===id){setSel("All");setSubSel(null);setFeatTag(null)}else{setSel(id);setSubSel(null);setFeatTag(null)}};

return(<div style={{minHeight:"100vh",background:"#F8F9FB",color:"#1A1A1A",fontFamily:"'Pretendard','Noto Sans KR',sans-serif"}}>
<style>{`@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.min.css');@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:#D1D5DB;border-radius:99px}`}</style>

<div style={{padding:"24px 32px 18px",borderBottom:"1px solid #E2E4E8"}}>
<div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:24}}>🏭</span><h1 style={{fontSize:20,fontWeight:700,letterSpacing:"-0.03em",fontFamily:"'Pretendard','Inter',sans-serif"}}>Speak KR Copy Warehouse</h1><span style={{fontSize:9,padding:"2px 8px",borderRadius:99,background:"#1C49FF",color:"#fff",fontWeight:700}}>v9</span></div>
<p style={{color:"#6B7280",fontSize:12,marginTop:5}}>7-level hierarchy · {D.length} copies · Brand: 나를 끌어주는 영어 앱</p>
<div style={{display:"flex",gap:3,marginTop:14,background:"#FFFFFF",borderRadius:8,padding:2,width:"fit-content"}}>
{[["about","ℹ️ About"],["warehouse","📦 Warehouse"],["factory","🏭 Factory"],["channels","📡 Channels"],["map","📐 Hierarchy"]].map(([v,lb])=>(<button key={v} onClick={()=>{setView(v);if(v!=="warehouse")setCh(null)}} style={{padding:"6px 16px",borderRadius:6,border:"none",background:view===v?"#1C49FF":"transparent",color:view===v?"#fff":"#7E7E96",fontSize:11,fontWeight:600,cursor:"pointer"}}>{lb}</button>))}
<button onClick={()=>setShowKey(!showKey)} style={{padding:"6px 12px",borderRadius:6,border:"none",background:gk?"#10B98120":"#F59E0B20",color:gk?"#10B981":"#F59E0B",fontSize:11,fontWeight:600,cursor:"pointer",marginLeft:8}}>{gk?"🔑 Key ✓":"🔑 Set Key"}</button>
</div>
{showKey&&<div style={{marginTop:10,display:"flex",gap:6,alignItems:"center"}}>
<input value={gk} onChange={e=>saveGk(e.target.value)} placeholder="Gemini API Key (aistudio.google.com에서 무료 발급)" style={{flex:1,maxWidth:400,padding:"6px 10px",borderRadius:6,border:"1px solid #E2E4E8",background:"#F0F1F3",color:"#1A1A1A",fontSize:12,outline:"none",fontFamily:"'Pretendard','Inter',sans-serif"}}/>
<span style={{fontSize:10,color:"#9CA3AF"}}>Factory/Evaluate용 · <a href="https://aistudio.google.com" target="_blank" style={{color:"#5B7AFF"}}>무료 발급</a></span>
</div>}
</div>

{view==="map"&&<div style={{padding:"28px 32px",maxWidth:860}}>{LEVELS.map((l,i)=>{const keys=D.filter(d=>d.l===l.id&&d.k);return(<div key={l.id} style={{display:"flex",gap:14,marginBottom:4}}><div style={{width:36,display:"flex",flexDirection:"column",alignItems:"center"}}><div style={{width:28,height:28,borderRadius:99,background:l.color,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:12,fontWeight:700,fontFamily:"'Pretendard','Inter'"}}>{l.id}</div>{i<LEVELS.length-1&&<div style={{width:2,flex:1,background:"#E8E9ED",marginTop:2}}/>}</div><div style={{flex:1,background:"#FFFFFF",borderRadius:10,padding:"14px 18px",marginBottom:8,borderLeft:`3px solid ${l.color}`}}><div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}><span style={{fontSize:14,fontWeight:700,color:l.color}}>{l.label}</span><span style={{fontSize:10,color:"#9CA3AF",marginLeft:"auto"}}>{totalCounts[l.id]}</span></div><div style={{fontSize:11,color:"#6B7280"}}>{l.desc}</div>{l.subs&&<div style={{display:"flex",flexWrap:"wrap",gap:4,marginTop:8}}>{l.subs.map(s=><span key={s.id} style={{fontSize:9,padding:"2px 7px",borderRadius:99,background:l.color+"15",color:l.color,fontWeight:500}}>{s.label} ({subCounts[s.tag]||0})</span>)}</div>}{keys.map((kc,ki)=>(<div key={ki} style={{display:"flex",alignItems:"center",gap:6,marginTop:6,paddingTop:ki===0?8:0,borderTop:ki===0?"1px solid #E2E4E8":"none"}}><span style={{fontSize:8,padding:"1px 5px",borderRadius:99,background:"#F59E0B20",color:"#F59E0B",fontWeight:700}}>★</span><span style={{fontSize:13,fontWeight:600,fontFamily:"'Noto Sans KR'"}}>{kc.ko}</span></div>))}</div></div>)})}</div>}

{view==="factory"&&<Factory copies={D} gk={gk}/>}



{view==="about"&&<div style={{padding:"36px 40px",maxWidth:860,margin:"0 auto"}}>

<div style={{marginBottom:28}}>
<h2 style={{fontSize:28,fontWeight:700,fontFamily:"'Pretendard','Inter'",color:"#1A1A1A",letterSpacing:"-0.02em",marginBottom:6}}>Speak Copy OS</h2>
<p style={{fontSize:15,color:"#6B7280"}}>A centralized copy system for Speak marketing.</p>
</div>

<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>

<div style={{background:"#FFFFFF",borderRadius:10,padding:"20px 22px",border:"1px solid #E2E4E8"}}>
<h3 style={{fontSize:14,fontWeight:700,color:"#1C49FF",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>Why</h3>
<p style={{fontSize:13,color:"#374151",lineHeight:1.75}}>Every campaign started from scratch. Proven copy and brand messages lived in scattered docs or people\'s heads.</p>
<p style={{fontSize:13,color:"#374151",lineHeight:1.75,marginTop:8}}>Copy OS makes Speak\'s messaging history searchable and reusable — one system for every market.</p>
</div>

<div style={{background:"#FFFFFF",borderRadius:10,padding:"20px 22px",border:"1px solid #E2E4E8"}}>
<h3 style={{fontSize:14,fontWeight:700,color:"#1C49FF",marginBottom:10,textTransform:"uppercase",letterSpacing:"0.05em"}}>How it was built</h3>
<p style={{fontSize:13,color:"#374151",lineHeight:1.75}}>Collected every existing message across all channels — website, app store, LPs, paid ads, CRM, social, press kit.</p>
<p style={{fontSize:13,color:"#374151",lineHeight:1.75,marginTop:8}}>Classified into a <strong>7-level hierarchy</strong> with 170+ copies, each tagged with source and positioning fit.</p>
</div>

</div>

<div style={{background:"#FFFFFF",borderRadius:10,padding:"20px 22px",border:"1px solid #E2E4E8",marginBottom:24}}>
<h3 style={{fontSize:14,fontWeight:700,color:"#1C49FF",marginBottom:14,textTransform:"uppercase",letterSpacing:"0.05em"}}>How to use</h3>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
<div>
<p style={{fontSize:13,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>📦 Warehouse</p>
<p style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>Search and browse existing copy by hierarchy, keyword, or positioning.</p>
</div>
<div>
<p style={{fontSize:13,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>🏭 Factory</p>
<p style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>Generate on-brand copy. Pick channel, angle, target — AI creates options from the warehouse.</p>
</div>
<div>
<p style={{fontSize:13,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>📡 Channels</p>
<p style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>Which hierarchy levels apply to each marketing channel.</p>
</div>
<div>
<p style={{fontSize:13,fontWeight:600,color:"#1A1A1A",marginBottom:4}}>📐 Hierarchy</p>
<p style={{fontSize:12,color:"#6B7280",lineHeight:1.6}}>Visual map of the 7-level message structure with key copies.</p>
</div>
</div>
</div>

<div style={{background:"#F0F4FF",borderRadius:10,padding:"14px 20px",marginBottom:16}}>
<p style={{fontSize:12,color:"#1C49FF",fontWeight:500,lineHeight:1.6}}>
Vision → Philosophy → Definition → USP → Targeting → RTB → CTA
</p>
</div>

<p style={{fontSize:12,color:"#9CA3AF"}}>Speak Marketing Team · AI Hackathon 2026</p>
</div>}

{view==="channels"&&<div style={{padding:"28px 32px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:12}}>{CHANNELS.map(c=>(<div key={c.name} onClick={()=>{setCh(c.name);setView("warehouse")}} style={{background:"#FFFFFF",borderRadius:10,padding:16,cursor:"pointer",border:"1px solid #E2E4E8",transition:"border-color 0.12s"}} onMouseEnter={e=>e.currentTarget.style.borderColor="#1C49FF"} onMouseLeave={e=>e.currentTarget.style.borderColor="#E2E4E8"}><div style={{fontSize:14,fontWeight:700,marginBottom:4}}>{c.name}</div><div style={{fontSize:11,color:"#6B7280",marginBottom:10}}>{c.desc}</div><div style={{display:"flex",flexWrap:"wrap",gap:4}}>{c.levels.map(lid=>{const lv=LEVELS.find(x=>x.id===lid);return<span key={lid} style={{fontSize:9,padding:"2px 7px",borderRadius:99,background:lv.color+"20",color:lv.color,fontWeight:600}}>{lid}. {lv.label}</span>})}</div></div>))}</div></div>}

{view==="warehouse"&&<div style={{display:"flex",minHeight:"calc(100vh - 120px)"}}>
<div style={{width:280,borderRight:"1px solid #E2E4E8",padding:"16px 14px",flexShrink:0,overflowY:"auto"}}>
<input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search..." style={{width:"100%",padding:"8px 11px",borderRadius:7,border:"1px solid #E2E4E8",background:"#FFFFFF",color:"#1A1A1A",fontSize:13,outline:"none",marginBottom:10}}/>
<button onClick={()=>setKeyOnly(!keyOnly)} style={{width:"100%",padding:"7px 11px",borderRadius:7,border:`1px solid ${keyOnly?"#F59E0B55":"#E2E4E8"}`,background:keyOnly?"#F59E0B12":"transparent",color:keyOnly?"#F59E0B":"#7E7E96",fontSize:11,fontWeight:600,cursor:"pointer",marginBottom:12}}>★ Key Copies Only</button>
{ch&&<div style={{marginBottom:12,padding:"7px 11px",background:"#1C49FF12",borderRadius:7,border:"1px solid #1C49FF33"}}><div style={{fontSize:10,color:"#1C49FF",fontWeight:600}}>Channel: {ch}</div><button onClick={()=>setCh(null)} style={{fontSize:10,color:"#1C49FF",background:"none",border:"none",cursor:"pointer",textDecoration:"underline",marginTop:2}}>Clear</button></div>}
<div style={{fontSize:9,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:8}}>Message Hierarchy</div>
<button onClick={()=>{setSel("All");setSubSel(null);setFeatTag(null)}} style={{display:"flex",alignItems:"center",width:"100%",padding:"8px 11px",borderRadius:7,border:sel==="All"?"1px solid #1C49FF44":"1px solid transparent",background:sel==="All"?"#1C49FF12":"transparent",color:sel==="All"?"#5B7AFF":"#7E7E96",fontSize:12,fontWeight:600,cursor:"pointer",marginBottom:6}}>All Levels<span style={{marginLeft:"auto",fontSize:11,fontFamily:"'Pretendard','Inter'",color:"#9CA3AF"}}>{data.length}</span></button>

{LEVELS.map(l=>{const active=sel===l.id;const expanded=active&&l.subs;return(<div key={l.id} style={{marginBottom:4}}>
<button onClick={()=>handleLevelClick(l.id)} style={{display:"flex",alignItems:"flex-start",gap:10,width:"100%",textAlign:"left",padding:"10px 11px",borderRadius:8,border:active?`1px solid ${l.color}44`:"1px solid transparent",background:active?l.color+"10":"#F0F1F3",cursor:"pointer",transition:"all 0.12s"}} onMouseEnter={e=>{if(!active)e.currentTarget.style.background="#E8E9ED"}} onMouseLeave={e=>{if(!active)e.currentTarget.style.background="#F0F1F3"}}>
<div style={{width:24,height:24,borderRadius:6,background:active?l.color:l.color+"25",display:"flex",alignItems:"center",justifyContent:"center",color:active?"#fff":l.color,fontSize:11,fontWeight:700,fontFamily:"'Pretendard','Inter'",flexShrink:0,marginTop:1}}>{l.id}</div>
<div style={{flex:1,minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:active?l.color:"#1A1A1A"}}>{l.label}</div><div style={{fontSize:10,color:"#9CA3AF",marginTop:1}}>{l.desc}</div></div>
<span style={{fontSize:11,color:active?l.color:"#9CA3AF",fontFamily:"'Pretendard','Inter'",fontWeight:600,flexShrink:0,marginTop:2}}>{counts[l.id]||0}</span></button>
{expanded&&<div style={{marginLeft:20,marginTop:4,marginBottom:4,paddingLeft:14,borderLeft:`2px solid ${l.color}30`}}>
<button onClick={()=>{setSubSel(null);setFeatTag(null)}} style={{display:"flex",alignItems:"center",width:"100%",padding:"5px 10px",borderRadius:5,border:"none",background:!subSel?l.color+"15":"transparent",color:!subSel?l.color:"#9CA3AF",fontSize:11,fontWeight:!subSel?600:400,cursor:"pointer",marginBottom:2}}>All {l.label}<span style={{marginLeft:"auto",fontSize:10,fontFamily:"'Pretendard','Inter'"}}>{counts[l.id]||0}</span></button>
{l.subs.map(s=>{const sa=subSel===s.tag;return(<button key={s.id} onClick={()=>{setSubSel(sa?null:s.tag);setFeatTag(null)}} style={{display:"flex",alignItems:"center",width:"100%",padding:"5px 10px",borderRadius:5,border:"none",background:sa?l.color+"15":"transparent",color:sa?l.color:"#9CA3AF",fontSize:11,fontWeight:sa?600:400,cursor:"pointer",marginBottom:2}}>{s.label}<span style={{marginLeft:"auto",fontSize:10,fontFamily:"'Pretendard','Inter'"}}>{filteredSubCounts[s.tag]||0}</span></button>)})}
</div>}</div>)})}

<div style={{marginTop:16,paddingTop:12,borderTop:"1px solid #E2E4E8"}}>
<div style={{fontSize:9,fontWeight:700,color:"#374151",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:6}}>Positioning Fit</div>
{FIT_TAGS.map(f=>(<button key={f} onClick={()=>setFit(fit===f?"All":f)} style={{display:"block",width:"100%",textAlign:"left",padding:"4px 10px",borderRadius:5,border:"none",background:fit===f?"#1C49FF15":"transparent",color:fit===f?(f==="AS-IS legacy"?"#EF4444":"#5B7AFF"):"#5A5A72",fontSize:11,cursor:"pointer",marginBottom:1}}>{f==="AS-IS legacy"?"⚠️ ":""}{f}</button>))}
</div></div>

<div style={{flex:1,padding:"16px 24px",overflowY:"auto"}}>
<div style={{fontSize:12,color:"#6B7280",marginBottom:showFeatTags?10:14}}>
{data.length} {data.length===1?"copy":"copies"}
{ch&&<> in <strong style={{color:"#5B7AFF"}}>{ch}</strong></>}
{keyOnly&&<> · <span style={{color:"#F59E0B"}}>★ Key only</span></>}
{sel!=="All"&&<> · <span style={{color:LEVELS.find(l=>l.id===sel)?.color}}>{LEVELS.find(l=>l.id===sel)?.label}</span></>}
{subSel&&<> → <span style={{color:"#6B7280"}}>{LEVELS.flatMap(l=>l.subs||[]).find(s=>s.tag===subSel)?.label}</span></>}
{featTag&&<> → <span style={{color:"#06B6D4"}}>{FEAT_TAGS.find(t=>t.tag===featTag)?.label}</span></>}
</div>

{showFeatTags&&<div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16,padding:"12px 14px",background:"#F0F1F3",borderRadius:10,border:"1px solid #E2E4E8"}}>
<button onClick={()=>setFeatTag(null)} style={{padding:"5px 12px",borderRadius:99,border:"none",background:!featTag?"#06B6D4":"#E2E4E8",color:!featTag?"#fff":"#7E7E96",fontSize:11,fontWeight:600,cursor:"pointer"}}>All</button>
{FEAT_TAGS.map(ft=>{const c=featCounts[ft.tag]||0;const a=featTag===ft.tag;return(<button key={ft.tag} onClick={()=>setFeatTag(a?null:ft.tag)} style={{padding:"5px 12px",borderRadius:99,border:"none",background:a?"#06B6D4":"#E2E4E8",color:a?"#fff":"#7E7E96",fontSize:11,fontWeight:a?600:400,cursor:"pointer"}}>{ft.label} ({c})</button>)})}
</div>}

<div style={{display:"flex",flexDirection:"column",gap:8}}>
{data.length===0?<div style={{textAlign:"center",padding:50,color:"#9CA3AF"}}><div style={{fontSize:32,marginBottom:8}}>🔍</div>No copies match</div>:data.map((item,i)=><Card key={i} item={item} lv={LEVELS.find(l=>l.id===item.l)}/>)}
</div></div></div>}
</div>)}


// ============================================================
// JAPAN MARKET
// ============================================================

// JP components (imports shared with KR above)

// =============================================================================
// SPEAK JP — COPY WAREHOUSE v2
// Phase 1 scope: LP + Paid Ads (Motion) data, audience surveys, brief-driven
// generation, automated tone & claim guardrails.
// =============================================================================

// ---------- Categories (7-level hierarchy) ----------
const CATEGORIES = [
  { id: "1", label: "Brand Vision", color: "#3B82F6", desc: "Speakが描く世界", subs: null },
  { id: "2", label: "Brand Philosophy", color: "#8B5CF6", desc: "Speakが信じていること", subs: null },
  { id: "3", label: "Brand Definition", color: "#10B981", desc: "はじめての英会話はスピークで。", subs: null },
  {
    id: "4", label: "USP", color: "#F59E0B", desc: "Uncomfortable truth + solution",
    subs: [
      { id: "usp1", label: "Speak, a lot", tag: "USP1" },
      { id: "usp2", label: "No fear, AI partner", tag: "USP2" },
      { id: "usp3", label: "Real, practical English", tag: "USP3" },
      { id: "usp4", label: "Fits a busy life", tag: "USP4" },
    ],
  },
  {
    id: "5", label: "Targeting", color: "#EC4899", desc: "Target-specific messaging",
    subs: [
      { id: "t-career", label: "Career / Business", tag: "T-Career" },
      { id: "t-travel", label: "Travel", tag: "T-Travel" },
      { id: "t-growth", label: "Self-Growth", tag: "T-Growth" },
      { id: "t-overseas", label: "Life Overseas", tag: "T-Overseas" },
      { id: "t-test", label: "Test Prep", tag: "T-Test" },
      { id: "t-restart", label: "Restarters", tag: "T-Restart" },
      { id: "t-general", label: "General", tag: "T-General" },
    ],
  },
  {
    id: "6", label: "RTB", color: "#06B6D4", desc: "All evidence and proof",
    subs: [
      { id: "rtb-feat", label: "Features", tag: "RTB-Features" },
      { id: "rtb-tech", label: "Tech / Data", tag: "RTB-Tech" },
      { id: "rtb-awards", label: "Awards", tag: "RTB-Awards" },
      { id: "rtb-scale", label: "Scale", tag: "RTB-Scale" },
      { id: "rtb-reviews", label: "User Reviews", tag: "RTB-Reviews" },
      { id: "rtb-team", label: "Team / Investors", tag: "RTB-Team" },
      { id: "rtb-price", label: "Pricing Value", tag: "RTB-Price" },
    ],
  },
  {
    id: "7", label: "CTA", color: "#EF4444", desc: "Action drivers",
    subs: [
      { id: "cta-gen", label: "General CTA", tag: "CTA-General" },
      { id: "cta-trial", label: "Trial CTA", tag: "CTA-Trial" },
      { id: "cta-ch", label: "Channel CTA", tag: "CTA-Channel" },
    ],
  },
];

const FEATURES = [
  { tag: "feat-freetalk", label: "AI Free Talk" },
  { tag: "feat-tutor", label: "Speak Tutor" },
  { tag: "feat-mylesson", label: "My Lesson" },
  { tag: "feat-smartreview", label: "Smart Review" },
  { tag: "feat-pronunciation", label: "Pronunciation Coach" },
  { tag: "feat-personalization", label: "Personalization" },
  { tag: "feat-3step", label: "3-Step Method (0歳メソッド)" },
  { tag: "feat-curriculum", label: "Curriculum" },
  { tag: "feat-gamification", label: "Habit / Streak" },
  { tag: "feat-b2b", label: "B2B (S4B)" },
];

// =============================================================================
// AUDIENCE SUB-PERSONAS — more granular than segment alone
// Each segment (T-*) has distinct personas with their own pain & tone bias.
// =============================================================================
const PERSONAS = {
  "T-Career": [
    { id: "newgrad", label: "新卒・若手 (20s)", pain: "英語使う配属だけど自信ゼロ", tone: "nervous-eager" },
    { id: "mid", label: "中堅 (30s)", pain: "英語で発言できず機会損失", tone: "frustrated-driven" },
    { id: "manager", label: "マネージャー (30-40s)", pain: "会議仕切れない、部下に示しがつかない", tone: "composed-urgent" },
    { id: "foreign", label: "外資転職準備", pain: "英語面接が越えられない壁", tone: "high-stakes" },
  ],
  "T-Travel": [
    { id: "firsttrip", label: "初海外", pain: "空港で固まる、何も言えない", tone: "anxious-curious" },
    { id: "repeat", label: "リピーター", pain: "もっとローカルと話したい", tone: "confident-exploratory" },
    { id: "honeymoon", label: "特別な旅行（新婚等）", pain: "失敗したくない", tone: "high-stakes-warm" },
  ],
  "T-Growth": [
    { id: "selfimprove", label: "自己成長志向 (20-30s)", pain: "英語を一生モノのスキルにしたい", tone: "aspirational" },
    { id: "midlife", label: "学び直し (40-50s)", pain: "若い頃にやれなかったこと", tone: "reflective-determined" },
  ],
  "T-Overseas": [
    { id: "student", label: "留学準備", pain: "キャンパス英語についていけるか", tone: "prepared-anxious" },
    { id: "relocate", label: "海外赴任・移住", pain: "家族ごと海外、生活できるか", tone: "serious-practical" },
  ],
  "T-Test": [
    { id: "toeic", label: "TOEIC高得点・話せない", pain: "点数はあるのに口から出ない", tone: "analytical-frustrated" },
    { id: "eiken", label: "英検スピーキング対策", pain: "面接形式が苦手", tone: "exam-focused" },
    { id: "toefl", label: "TOEFL/IELTS", pain: "スコア要件を越えたい", tone: "goal-oriented" },
  ],
  "T-Restart": [
    { id: "multifail", label: "何度も挫折経験", pain: "また続かないのでは…", tone: "skeptical-hopeful" },
    { id: "dormant", label: "長期ブランク (5年以上)", pain: "もう手遅れかも", tone: "resigned-curious" },
    { id: "noconfidence", label: "人前で話せない", pain: "恥ずかしくて話せない", tone: "gentle-reassuring" },
  ],
  "T-General": [
    { id: "general", label: "一般", pain: "英語できたら人生変わりそう", tone: "neutral" },
    { id: "curious", label: "AI英会話に興味", pain: "新しいもの試したい", tone: "exploratory" },
  ],
};

// =============================================================================
// INTENT LEVELS — funnel stage
// =============================================================================
const INTENTS = [
  { id: "awareness", label: "Awareness", desc: "ブランドを知ってもらう" },
  { id: "consideration", label: "Consideration", desc: "比較検討中" },
  { id: "conversion", label: "Conversion", desc: "購入・登録直前" },
];

// =============================================================================
// CHANNEL FORMATS — each format has its own length constraint & tone hint
// =============================================================================
const CHANNEL_FORMATS = {
  paid: [
    { id: "meta-static", label: "Meta / Static", headlineMax: 28, subMax: 60, tone: "scroll-stopping" },
    { id: "meta-video", label: "Meta / Video (hook)", headlineMax: 20, subMax: 0, tone: "spoken-rhythm" },
    { id: "tiktok", label: "TikTok / Hook", headlineMax: 18, subMax: 0, tone: "native-rhythm" },
    { id: "youtube-preroll", label: "YouTube / Pre-roll", headlineMax: 24, subMax: 50, tone: "attention-grab" },
    { id: "line-flex", label: "LINE / Flex Message", headlineMax: 30, subMax: 80, tone: "personal" },
    { id: "x-post", label: "X (Twitter) / Post", headlineMax: 60, subMax: 0, tone: "witty-punchy" },
  ],
  lp: [
    { id: "lp-hero", label: "LP / Hero", headlineMax: 30, subMax: 80, tone: "bold-clear" },
    { id: "lp-section", label: "LP / Section", headlineMax: 40, subMax: 120, tone: "explanatory" },
    { id: "lp-cta", label: "LP / CTA section", headlineMax: 25, subMax: 60, tone: "action-driving" },
  ],
  appstore: [
    { id: "as-title", label: "App Store / Title", headlineMax: 30, subMax: 0, tone: "keyword-dense" },
    { id: "as-subtitle", label: "App Store / Subtitle", headlineMax: 30, subMax: 0, tone: "benefit-led" },
    { id: "as-short", label: "App Store / Short Desc", headlineMax: 80, subMax: 0, tone: "front-loaded" },
  ],
  crm: [
    { id: "push", label: "Push / Notification", headlineMax: 40, subMax: 60, tone: "personal-gentle" },
    { id: "email-subject", label: "Email / Subject line", headlineMax: 45, subMax: 0, tone: "curiosity" },
    { id: "line-msg", label: "LINE / Message", headlineMax: 120, subMax: 0, tone: "peer" },
  ],
  social: [
    { id: "ig-caption", label: "Instagram / Caption", headlineMax: 50, subMax: 200, tone: "conversational" },
    { id: "ig-story", label: "Instagram / Story text", headlineMax: 25, subMax: 0, tone: "punchy" },
    { id: "x-thread", label: "X / Thread opener", headlineMax: 70, subMax: 0, tone: "hook" },
  ],
  tvcm: [
    { id: "tvcm-tagline", label: "TVCM / Tagline", headlineMax: 20, subMax: 0, tone: "memorable" },
    { id: "tvcm-vo", label: "TVCM / Voice-over line", headlineMax: 40, subMax: 0, tone: "spoken" },
    { id: "tvcm-super", label: "TVCM / On-screen super", headlineMax: 15, subMax: 0, tone: "minimal" },
  ],
};

const JP_CHANNELS = [
  { id: "paid", label: "Paid Ad", levels: ["4", "5", "6"], rule: "Scroll-stopping. Lead with pain or surprising claim. Max 15 words for headline. Sub-copy backs with evidence.",
    formats: [{ id: "h", label: "Headline only" }, { id: "h+s", label: "Headline + Sub-copy" }, { id: "h+s+cta", label: "Headline + Sub + CTA" }] },
  { id: "lp", label: "Landing Page", levels: ["3", "4", "5", "6", "7"], rule: "Hierarchy descends with scroll: Hero → USP → Targeting → RTB → CTA. Each section answers one question.",
    formats: [{ id: "hero", label: "Hero (headline + sub)" }, { id: "section", label: "Section (headline + body)" }, { id: "full", label: "Full section (headline + bullets + CTA)" }] },
  { id: "appstore", label: "App Store", levels: ["2", "4", "6"], rule: "Front-load the most compelling claim. Include data. Limited space — every word counts.",
    formats: [{ id: "title", label: "Title + Subtitle" }, { id: "desc", label: "Short description (80 chars)" }, { id: "full", label: "Full description paragraph" }] },
  { id: "crm", label: "CRM / Push", levels: ["4", "5", "7"], rule: "Personal, direct, action-oriented. Gentle urgency. Respect character limits strictly.",
    formats: [{ id: "push", label: "Push notification (<50 chars)" }, { id: "email", label: "Email subject + preview" }, { id: "line", label: "LINE message (<120 chars)" }] },
  { id: "social", label: "Social", levels: ["4", "5", "6"], rule: "Conversational, shareable. More playful OK. Must pass brand tone. No clickbait.",
    formats: [{ id: "caption", label: "Instagram caption" }, { id: "short", label: "Short (1 sentence + CTA)" }, { id: "story", label: "Story text (<30 chars)" }] },
  { id: "tvcm", label: "TVCM / Video", levels: ["2", "3", "4"], rule: "Spoken rhythm. Memorable tagline. Emotional arc. Brand poem energy, not hard-sell.",
    formats: [{ id: "tagline", label: "TVCM tagline" }, { id: "vo", label: "Voice-over script" }, { id: "supers", label: "On-screen supers" }] },
];

// ---------- Copy items (127) ----------
const COPIES = [
  // ===== Level 1: Brand Vision =====
  { l: "1", sub: null, g: null, jp: "言語学習から学び方の変革を導く", en: "Transforming how we learn, starting with language learning", s: "speak.com/jp/careers (Mission)", f: "Universal", k: true },
  { l: "1", sub: null, g: null, jp: "言語は最も人生を変える力のあるスキルの一つである。", en: "Language is one of the most life-changing skills there is.", s: "speak.com/jp/careers (Story)", f: "Universal", k: false },
  { l: "1", sub: null, g: null, jp: "外国語での会話が格段に身近なものとなるようにし、本来ならば流暢になることが難しいとされる何百万人もの人々に言語習得の手助けをする。", en: "Make foreign-language conversation dramatically more accessible, helping millions who otherwise would struggle to become fluent.", s: "speak.com/jp/careers (Story)", f: "Universal", k: false },
  { l: "1", sub: null, g: null, jp: "言語学習のあり方を再構築します。", en: "We're reinventing how language is taught.", s: "speak.com/jp", f: "TO-BE aligned", k: false },

  // ===== Level 2: Brand Philosophy =====
  { l: "2", sub: null, g: null, jp: "英語を習得するには声に出して練習することが重要です", en: "To master English, speaking out loud and practicing is essential", s: "speak.com/jp (Homepage H2)", f: "TO-BE aligned", k: true },
  { l: "2", sub: null, g: null, jp: "英語は、自分で話してこそ身につくものです。", en: "You only master English by speaking it yourself.", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "2", sub: null, g: null, jp: "たくさん話すうちに、体は英語を覚えていきます。", en: "The more you speak, the more your body learns English.", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "2", sub: null, g: null, jp: "流暢に話せるようになるために一番大事なのは、頭の中で訳さずにそのまま口から英語が出てくる力です。", en: "The most important thing for fluency is English that comes out without translating in your head.", s: "speak.com/jp/content (Speak Method)", f: "TO-BE aligned", k: true },
  { l: "2", sub: null, g: null, jp: "文法や語彙を教えるアプリだけでは不十分です。実際に誰かと対話する必要があります。", en: "Apps that only teach grammar and vocabulary aren't enough — you need to actually converse.", s: "speak.com/jp/careers", f: "TO-BE aligned", k: false },
  { l: "2", sub: null, g: null, jp: "0歳は未完成じゃない——これから伸びていく可能性そのもの。", en: "A newborn isn't unfinished — it's pure potential, ready to grow.", s: "speak.com/jp/campaign/2026-jan (Brand poem)", f: "TO-BE aligned", k: true },
  { l: "2", sub: null, g: null, jp: "完璧じゃなくていい。だって声に出すたびに、英語はちゃんと育っていく。", en: "It doesn't have to be perfect. Every time you speak out loud, your English really does grow.", s: "speak.com/jp/campaign/2026-jan (Brand poem)", f: "TO-BE aligned", k: true },
  { l: "2", sub: null, g: null, jp: "いまからでも、今日からでも、声に出せば育っていく", en: "Starting now, starting today — speak out loud, and it grows", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },

  // ===== Level 3: Brand Definition =====
  { l: "3", sub: null, g: null, jp: "はじめての英会話はスピークで。", en: "Make your first English conversation with Speak.", s: "speak.com/jp/campaign/2026-jan (Hero)", f: "TO-BE aligned", k: true },
  { l: "3", sub: null, g: null, jp: "\"話したい\"なら AI英会話スピーク", en: "If you want to speak, choose AI English-conversation Speak", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "3", sub: null, g: null, jp: "スピーキング特化のAI英会話アプリ", en: "The speaking-focused AI English-conversation app", s: "speak.com/jp (Main H1)", f: "TO-BE aligned", k: true },
  { l: "3", sub: null, g: null, jp: "AIと間違えを恐れず英会話しよう", en: "Practice English conversation with AI — without fear of mistakes", s: "speak.com/jp/app", f: "TO-BE aligned", k: false },
  { l: "3", sub: null, g: null, jp: "シリコンバレー発のAI英会話アプリ", en: "The AI English-conversation app from Silicon Valley", s: "App Store / Google Play JP", f: "TO-BE aligned", k: false },
  { l: "3", sub: null, g: null, jp: "今までにないスピーキングに特化したAI英会話", en: "A never-before-seen, speaking-focused AI English conversation experience", s: "speak.com/jp/discount-secret", f: "TO-BE aligned", k: false },
  { l: "3", sub: null, g: null, jp: "The Language Learning App that Gets You Speaking.", en: "The Language Learning App that Gets You Speaking.", s: "speak.com/jp/b2b (Footer tagline)", f: "Universal", k: false },

  // ===== Level 4: USP1 — Speak, a lot =====
  { l: "4", sub: "USP1", g: null, jp: "勉強はナシ、話して覚えよう", en: "No studying — learn by speaking", s: "speak.com/jp/campaign/2026-jan (Pillar 1)", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP1", g: null, jp: "話しながら学ぶから、自然と英語が口から出る。", en: "Because you learn while speaking, English comes out of your mouth naturally.", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP1", g: null, jp: "文法、単語、発音も\"話しながら\"が一番", en: "Grammar, vocabulary, pronunciation — all best learned *while speaking*", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP1", g: null, jp: "わずか7日間で10,000語を超える英単語を話します。", en: "In just 7 days you'll speak over 10,000 English words.", s: "App Store / Google Play JP", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP1", g: null, jp: "従来の英会話サービスと比べて、約10倍のスピーキング練習が可能です。", en: "Roughly 10× more speaking practice than traditional English-conversation services.", s: "App Store / Google Play JP", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP1", g: null, jp: "業界トップのスピーキング量", en: "Industry-leading speaking volume", s: "App Store / Google Play JP", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP1", g: null, jp: "事前の完璧な文法や単語暗記はいりません。", en: "No need to perfect your grammar or memorize vocabulary upfront.", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP1", g: null, jp: "赤ちゃんの頃に母国語を習得したプロセスと同じ。", en: "The same process you used to master your native language as a baby.", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP1", g: null, jp: "声に出して、まねして、まちがえて、また話す。", en: "Speak out loud, mimic, mess up, speak again.", s: "speak.com/jp/campaign/2026-jan (Poem)", f: "TO-BE aligned", k: false },

  // ===== Level 4: USP2 — No fear, AI partner =====
  { l: "4", sub: "USP2", g: null, jp: "AIだから緊張しない", en: "No nerves, because it's AI", s: "speak.com/jp/campaign/2026-jan (Pillar 2)", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP2", g: null, jp: "考え込んでもゆっくり話しても大丈夫", en: "Take your time, speak slowly — it's all fine", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP2", g: null, jp: "AIが相手だから気を使わない・恥ずかしくない。", en: "No stress, no embarrassment — because your partner is AI.", s: "App Store / Google Play JP", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP2", g: null, jp: "自分の英語力やミスなどを気にせず、英語を話す練習ができます。", en: "Practice speaking without worrying about your level or your mistakes.", s: "App Store / Google Play JP", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP2", g: null, jp: "間違えや苦手からレッスンを生成", en: "Lessons generated from your mistakes and weak points", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP2", g: null, jp: "間違えれば間違えるほど成長できるシステム", en: "A system where the more mistakes you make, the more you grow", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP2", g: null, jp: "赤ちゃんのように、間違えを恐れず自由に話し、成長できる", en: "Speak freely — like a baby — without fearing mistakes, and keep growing", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },

  // ===== Level 4: USP3 — Real, practical English =====
  { l: "4", sub: "USP3", g: null, jp: "アメリカで実際に使われているビジネス英語", en: "Business English actually used in America", s: "speak.com/jp/business", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP3", g: null, jp: "ネイティブは完璧な文法で話さない", en: "Native speakers don't speak with perfect grammar", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP3", g: null, jp: "昔の海外ドラマに出てくるような古くて不自然な表現は省き、いま実際に使われている自然な英語だけを収録", en: "We drop outdated, unnatural expressions and record only the natural English people use today", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP3", g: null, jp: "スピークの学習コンテンツは、アメリカ・ロサンゼルスにある自社スタジオで制作", en: "Speak's learning content is produced at our own studio in Los Angeles", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP3", g: null, jp: "本当に通じるコミュニケーション", en: "English communication that truly gets through", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP3", g: null, jp: "教科書英語や母語のクセから抜け出し、もっとも実用的な英語をすぐに使えるように", en: "Break free from textbook English and start using the most practical English immediately", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 4: USP4 — Fits a busy life =====
  { l: "4", sub: "USP4", g: null, jp: "1日5分からスキマ時間に", en: "From 5 minutes a day, in your spare moments", s: "speak.com/jp/campaign/2026-jan (Pillar 3)", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP4", g: null, jp: "24時間 予約不要", en: "24/7, no reservations needed", s: "speak.com/jp/business", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP4", g: null, jp: "忙しい社会人こそ スピークでAI英会話", en: "Busy working adults, choose Speak for AI English conversation", s: "speak.com/jp/business", f: "TO-BE aligned", k: true },
  { l: "4", sub: "USP4", g: null, jp: "毎日のひとことが、英語の成長につながります。", en: "One daily phrase leads to real English growth.", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },
  { l: "4", sub: "USP4", g: null, jp: "場所と時間を選ばない英語学習。", en: "English learning anytime, anywhere.", s: "App Store / Google Play JP", f: "Universal", k: false },
  { l: "4", sub: "USP4", g: null, jp: "出かける準備などは一切不要。ちょっとしたスキマ時間にすぐ始められる。", en: "No getting-ready required. Start in any little pocket of spare time.", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — Career =====
  { l: "5", sub: "T-Career", g: null, jp: "忙しい社会人こそ スピークでAI英会話", en: "Busy working adults — this is why you should choose Speak", s: "speak.com/jp/business", f: "TO-BE aligned", k: true },
  { l: "5", sub: "T-Career", g: null, jp: "大事な会議の前はAIとロールプレイで事前に練習", en: "Before important meetings, rehearse with AI role-play", s: "speak.com/jp/business", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Career", g: null, jp: "どんな専門用語業界用語でもプロ並に話せる", en: "Talk like a pro, about any technical or industry-specific jargon", s: "speak.com/jp/business", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Career", g: null, jp: "一文ずつのフィードバックでより自然な表現を身につける", en: "Learn more natural expressions through sentence-by-sentence feedback", s: "speak.com/jp/business", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Career", g: null, jp: "ビジネス英語に特化したコース", en: "Business-English-specialized courses", s: "speak.com/jp/b2b", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — Travel =====
  { l: "5", sub: "T-Travel", g: null, jp: "英語が話せたら 海外旅行はもっと楽しい。", en: "If you can speak English, overseas travel is so much more fun.", s: "speak.com/jp/campaign/jtb", f: "TO-BE aligned", k: true },
  { l: "5", sub: "T-Travel", g: null, jp: "海外旅行英語コース、充実のカリキュラム", en: "Travel English course — a complete curriculum", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Travel", g: null, jp: "訪日客との英会話", en: "Conversations with inbound visitors to Japan", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Travel", g: null, jp: "おもてなし英語", en: "Hospitality English", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — Growth =====
  { l: "5", sub: "T-Growth", g: null, jp: "英語を学んできたのに、声に出して話す時間って、意外となかったのかもしれない。", en: "You've studied English all this time, yet maybe you never really had time to say it out loud.", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "5", sub: "T-Growth", g: null, jp: "グーグル 今年を輝かせた自己啓発アプリ選定", en: "Selected by Google as a self-improvement app that made the year shine", s: "App Store / Google Play JP", f: "Universal", k: false },
  { l: "5", sub: "T-Growth", g: null, jp: "英語が話せる、は一生の自信になる。", en: "Being able to speak English becomes a lifetime of confidence.", s: "Refined positioning", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — Overseas =====
  { l: "5", sub: "T-Overseas", g: null, jp: "留学に行く前の準備として英語を多くアウトプットしたい方", en: "For those who want to output lots of English before studying abroad", s: "App Store / Google Play JP", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Overseas", g: null, jp: "キャンパス英語 / 外資系ビジネス英語", en: "Campus English / Foreign-affiliated-company business English", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — Test Prep =====
  { l: "5", sub: "T-Test", g: null, jp: "TOEIC等の筆記試験では点数が取れるけど、英語を話すのは苦手な方", en: "Those who score well on written tests like TOEIC but struggle to speak", s: "App Store / Google Play JP", f: "TO-BE aligned", k: true },
  { l: "5", sub: "T-Test", g: null, jp: "TOEFL、IELTS、英検のスピーキングテストで良い成績を取りたい方", en: "Those who want to score well on TOEFL, IELTS, or Eiken speaking tests", s: "App Store / Google Play JP", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — Restarters =====
  { l: "5", sub: "T-Restart", g: null, jp: "これまで英会話に何度も挫折してきましたが、大丈夫でしょうか？", en: "I've given up on English conversation many times — will it work for me?", s: "speak.com/jp/campaign/2026-jan (FAQ)", f: "TO-BE aligned", k: true },
  { l: "5", sub: "T-Restart", g: null, jp: "スピークは、続かなかった方のための英会話アプリです。", en: "Speak is the English-conversation app for people who couldn't stick with it before.", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "5", sub: "T-Restart", g: null, jp: "英会話がまったく初めてでも大丈夫。", en: "Even if you've never done English conversation at all — it's fine.", s: "speak.com/jp/campaign/2026-jan (FAQ)", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-Restart", g: null, jp: "「知識はあるのに話せない」を解決します。", en: "We solve the classic \"I have the knowledge but I can't speak it\" problem.", s: "speak.com/jp/campaign/2026-jan (FAQ)", f: "TO-BE aligned", k: false },

  // ===== Level 5: Targeting — General =====
  { l: "5", sub: "T-General", g: null, jp: "AI新時代の英会話を体験してください", en: "Experience English conversation in the new AI era", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-General", g: null, jp: "AI英会話から はじめよう", en: "Start with AI English conversation", s: "speak.com/jp campaign pages", f: "TO-BE aligned", k: false },
  { l: "5", sub: "T-General", g: null, jp: "さぁ、話そう！", en: "Now — let's talk!", s: "speak.com/jp/campaign/2026-jan (Brand poem)", f: "TO-BE aligned", k: true },

  // ===== Level 6: RTB — Features (AI Free Talk) =====
  { l: "6", sub: "RTB-Features", g: "feat-freetalk", jp: "AIチューターとのフリートーク", en: "Free Talk with the AI Tutor", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Features", g: "feat-freetalk", jp: "レッスンで学んだ表現を使って、AIとリアルタイムでフリートーク", en: "Free-talk with AI in real time using the expressions you just learned", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-freetalk", jp: "実際のネイティブと話しているかのように自由に会話", en: "Converse freely as if talking with a real native speaker", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (Speak Tutor) =====
  { l: "6", sub: "RTB-Features", g: "feat-tutor", jp: "スピークチューターは24時間いつでもどこでもあなただけのプライベート講師", en: "Speak Tutor is your personal private teacher — 24/7, anywhere", s: "speak.com/jp", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-tutor", jp: "スピークチューターがあなたのことを知れば知るほど、ぴったりのカスタムレッスンを作ってくれます。", en: "The more Speak Tutor knows you, the better it builds lessons that fit you.", s: "speak.com/jp", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Features", g: "feat-tutor", jp: "目標達成のパートナー", en: "A partner for reaching your goals", s: "speak.com/jp", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (My Lesson) =====
  { l: "6", sub: "RTB-Features", g: "feat-mylesson", jp: "自分専用に最適化されたパーソナルプラン", en: "A personal plan optimized just for you", s: "speak.com/jp/campaign/jtb", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Features", g: "feat-mylesson", jp: "苦手や関心に応じた個別最適プラン", en: "An individually optimized plan based on your weak points and interests", s: "speak.com/jp/campaign/jtb", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (Smart Review) =====
  { l: "6", sub: "RTB-Features", g: "feat-smartreview", jp: "長期記憶の法則を利用し、ベストなタイミングで復習", en: "Leveraging the laws of long-term memory, review at the best moment", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-smartreview", jp: "間隔反復学習アルゴリズムで長期的に定着", en: "Spaced-repetition learning algorithm for long-term retention", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (Pronunciation Coach) =====
  { l: "6", sub: "RTB-Features", g: "feat-pronunciation", jp: "誤った発音を直すAI発音コーチ", en: "The AI Pronunciation Coach that fixes mispronunciations", s: "speak.com/jp/content", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-pronunciation", jp: "発音を音素レベルで細かく分析", en: "Analyzes your pronunciation in fine detail at the phoneme level", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (3-Step / 0歳メソッド) =====
  { l: "6", sub: "RTB-Features", g: "feat-3step", jp: "初めてでもたくさん話せる\"0歳メソッド\"", en: "The \"0-year-old Method\" — speak a lot, even as a total beginner", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-3step", jp: "たったの3ステップ：聞く・まねる・話す", en: "Just 3 steps: Listen, Mimic, Speak", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-3step", jp: "各レッスンで100文以上を声に出して話す", en: "Speak over 100 sentences out loud per lesson", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (Curriculum) =====
  { l: "6", sub: "RTB-Features", g: "feat-curriculum", jp: "超初級から上級まで細分化されたカリキュラム", en: "A curriculum finely divided from super-beginner to advanced", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Features", g: "feat-curriculum", jp: "英語を外国語として学ぶ人のために設計", en: "Designed from the ground up for people learning English as a foreign language", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (Gamification / Habit) =====
  { l: "6", sub: "RTB-Features", g: "feat-gamification", jp: "英語上達のカギは習慣", en: "The key to improving your English is habit", s: "speak.com/jp/content", f: "Universal", k: true },
  { l: "6", sub: "RTB-Features", g: "feat-gamification", jp: "毎日モチベーションを保てる仕組み", en: "Systems that help you stay motivated every day", s: "speak.com/jp/content", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Features (B2B) =====
  { l: "6", sub: "RTB-Features", g: "feat-b2b", jp: "スピーク for Businessで英語スピーキング", en: "English speaking with Speak for Business", s: "speak.com/jp/b2b", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Features", g: "feat-b2b", jp: "500社以上の企業がSpeakを導入", en: "Over 500 companies have adopted Speak", s: "speak.com/jp/b2b", f: "TO-BE aligned", k: true },

  // ===== Level 6: RTB — Tech / Data =====
  { l: "6", sub: "RTB-Tech", g: null, jp: "シリコンバレーで独自開発したスピークのAI技術", en: "Speak's AI technology, independently developed in Silicon Valley", s: "speak.com/jp/technology", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Tech", g: null, jp: "光のように速い認識スピードと93％以上の高い精度", en: "Lightning-fast recognition speed and over 93% accuracy", s: "speak.com/jp/technology", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Tech", g: null, jp: "100万人以上の非ネイティブ学習者の英語音声データ", en: "English audio data from over 1 million non-native learners", s: "speak.com/jp/technology", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Tech", g: null, jp: "日本人特有の発音を正確に認識", en: "Accurately recognizes the pronunciations particular to Japanese speakers", s: "speak.com/jp/technology", f: "TO-BE aligned", k: false },
  { l: "6", sub: "RTB-Tech", g: null, jp: "OpenAIとの技術提携", en: "Technical partnership with OpenAI", s: "speak.com/jp/technology", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Tech", g: null, jp: "ChatGPTを開発したOpenAIと提携", en: "Partnered with OpenAI, the makers of ChatGPT", s: "App Store / Google Play JP", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Awards =====
  { l: "6", sub: "RTB-Awards", g: null, jp: "AppStore教育カテゴリ1位獲得！(2023年3月)", en: "No. 1 in App Store Education category! (March 2023)", s: "App Store / Google Play JP", f: "Universal", k: true },
  { l: "6", sub: "RTB-Awards", g: null, jp: "グーグル 今年を輝かせた自己啓発アプリ選定（2020年12月）", en: "Google — selected as a self-improvement app that made the year shine (Dec 2020)", s: "App Store / Google Play JP", f: "Universal", k: false },
  { l: "6", sub: "RTB-Awards", g: null, jp: "4.7（9.95万件のレビュー）", en: "4.7 stars (99,500 reviews)", s: "Google Play JP", f: "Universal", k: false },

  // ===== Level 6: RTB — Scale =====
  { l: "6", sub: "RTB-Scale", g: null, jp: "全世界1500万ダウンロード突破！", en: "Over 15 million downloads worldwide!", s: "App Store / Google Play JP", f: "Universal", k: true },
  { l: "6", sub: "RTB-Scale", g: null, jp: "何百万人ものユーザーがスピークを楽しく活用しています", en: "Millions of users are happily using Speak", s: "speak.com/jp", f: "Universal", k: false },
  { l: "6", sub: "RTB-Scale", g: null, jp: "1年後には約57,200文章話しています", en: "After one year, you've spoken roughly 57,200 sentences", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Scale", g: null, jp: "80% \"話す\"ことに抵抗がなくなった", en: "80% — the resistance to \"speaking\" disappeared", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Reviews =====
  { l: "6", sub: "RTB-Reviews", g: null, jp: "2ヶ月で効果を実感 — 何年も一言も喋れなかった状況をわずか2ヶ月で変えてくれた", en: "\"Felt results in 2 months — it changed my years-long inability to speak\"", s: "speak.com/jp (ココナッツclsts)", f: "Universal", k: true },
  { l: "6", sub: "RTB-Reviews", g: null, jp: "AIだから緊張せず、間違えても恥ずかしくないのでどんどん話せます", en: "\"No nerves, no embarrassment — I just keep talking\"", s: "speak.com/jp (marie)", f: "Universal", k: false },
  { l: "6", sub: "RTB-Reviews", g: null, jp: "オンライン英会話700回以上、はるかにスピークで得られる学習体験の方がいい", en: "\"700+ online lessons behind me — Speak's experience is far better\"", s: "speak.com/jp (ほのぼの)", f: "Universal", k: false },
  { l: "6", sub: "RTB-Reviews", g: null, jp: "これまで学習が続いたことは人生初、無理せず継続できてます", en: "\"First time in my life I've kept going — and without forcing it\"", s: "speak.com/jp/business (さめじん)", f: "Universal", k: true },

  // ===== Level 6: RTB — Team / Investors =====
  { l: "6", sub: "RTB-Team", g: null, jp: "ハーバード、スタンフォード、イェール出身の創業メンバー", en: "Founding members from Harvard, Stanford, Yale", s: "speak.com/jp/technology", f: "Universal", k: true },
  { l: "6", sub: "RTB-Team", g: null, jp: "OpenAI Startup Fund、Founders Fund、Khosla Venturesから7,500万ドル以上を調達", en: "Raised over $75M from OpenAI Startup Fund, Founders Fund, Khosla Ventures", s: "speak.com/jp/b2b", f: "TO-BE aligned", k: true },
  { l: "6", sub: "RTB-Team", g: null, jp: "サム・アルトマン、ピーター・ティール、ドリュー・ヒューストンが個人投資家", en: "Individual investors include Sam Altman, Peter Thiel, Drew Houston", s: "speak.com/jp/b2b", f: "Universal", k: false },
  { l: "6", sub: "RTB-Team", g: null, jp: "ChatGPTのOpenAIから支援を受ける\"世界で選ばれた\"企業", en: "One of the \"chosen few\" worldwide, backed by ChatGPT's OpenAI", s: "speak.com/jp/campaign/2026-jan", f: "TO-BE aligned", k: false },

  // ===== Level 6: RTB — Pricing =====
  { l: "6", sub: "RTB-Price", g: null, jp: "7日間無料体験", en: "7-day free trial", s: "speak.com/jp", f: "Universal", k: true },
  { l: "6", sub: "RTB-Price", g: null, jp: "1ヶ月180円使い放題", en: "¥180 for 1 month unlimited", s: "speak.com/jp/lp/business", f: "Universal", k: true },
  { l: "6", sub: "RTB-Price", g: null, jp: "プレミアムプラス 年額29,800円 (月2,483円)", en: "Premium Plus: ¥29,800/year (¥2,483/month)", s: "speak.com/jp/business", f: "Universal", k: false },
  { l: "6", sub: "RTB-Price", g: null, jp: "体験期間内にいつでもキャンセル可能", en: "Cancel anytime during the trial period", s: "speak.com/jp/campaign/2026-jan", f: "Universal", k: false },
  { l: "6", sub: "RTB-Price", g: null, jp: "限定1,000円OFF 年間プラン限定特別割引", en: "Limited ¥1,000 OFF — annual plan special discount", s: "speak.com/jp/discount-secret", f: "Universal", k: false },

  // ===== Level 7: CTA =====
  { l: "7", sub: "CTA-General", g: null, jp: "今すぐはじめる", en: "Start now", s: "speak.com/jp (nav / hero)", f: "Universal", k: true },
  { l: "7", sub: "CTA-General", g: null, jp: "はじめる →", en: "Get started →", s: "speak.com/jp/content, /technology", f: "Universal", k: false },
  { l: "7", sub: "CTA-General", g: null, jp: "さっそくスピークを始めよう", en: "Let's get started with Speak right now", s: "speak.com/jp/b2b", f: "Universal", k: false },
  { l: "7", sub: "CTA-Trial", g: null, jp: "無料体験を始める", en: "Start your free trial", s: "speak.com/jp/content, /technology", f: "Universal", k: true },
  { l: "7", sub: "CTA-Trial", g: null, jp: "まずはお試し", en: "Try it first", s: "speak.com/jp/campaign/2026-jan (sticky nav)", f: "Universal", k: true },
  { l: "7", sub: "CTA-Trial", g: null, jp: "まずは試してみる", en: "Give it a try", s: "speak.com/jp/campaign/2026-jan", f: "Universal", k: false },
  { l: "7", sub: "CTA-Trial", g: null, jp: "7日間体験 0円", en: "7-day trial, ¥0", s: "speak.com/jp/campaign/2026-jan", f: "Universal", k: false },
  { l: "7", sub: "CTA-Channel", g: null, jp: "LINEで無料登録", en: "Sign up free with LINE", s: "speak.com/jp/business (sticky CTA)", f: "Universal", k: true },
  { l: "7", sub: "CTA-Channel", g: null, jp: "LINEからはじめる", en: "Start from LINE", s: "speak.com/jp/campaign/2026-jan", f: "Universal", k: false },
  { l: "7", sub: "CTA-Channel", g: null, jp: "無料WEBレッスンを試す", en: "Try a free web lesson", s: "speak.com/jp/app", f: "Universal", k: false },
];

// =============================================================================
// NEW: PAID ADS DATA (mocked from "Motion") — Phase 1
// =============================================================================
// Fields:
//   id, channel (Meta/TikTok/YouTube/LINE/X), format (static/video/carousel),
//   audience (segment tag), promo (promo flag), jp (primary copy), en (trans),
//   hook (opening line), cta, spend (JPY), impr, clicks, installs, trials, paid,
//   launched, status (live/paused/archived)
// CTR = clicks/impr, CVR_install = installs/clicks, CVR_trial = trials/installs
// CPA = spend/paid
const ADS = [
  { id: "A-001", ch: "Meta", fmt: "static", aud: "T-Restart", promo: false,
    jp: "10年やって話せない英語、0歳からやり直す。", en: "10 years of English without speaking — restart from year zero.",
    hook: "10年やって話せない英語、0歳からやり直す。", cta: "まずはお試し",
    spend: 1_240_000, impr: 892_340, clicks: 24_103, installs: 6_820, trials: 4_192, paid: 1_146,
    launched: "2026-01-14", status: "live", note: "Top 0歳メソッド hook. Restarter pain → brand poem." },
  { id: "A-002", ch: "Meta", fmt: "video", aud: "T-Career", promo: false,
    jp: "会議で黙るのはもう終わり。スピークで1日5分。", en: "No more silent meetings. 5 minutes a day with Speak.",
    hook: "会議で黙るのはもう終わり。", cta: "7日間無料体験",
    spend: 2_180_000, impr: 1_410_880, clicks: 31_238, installs: 7_094, trials: 4_802, paid: 1_410,
    launched: "2025-11-03", status: "live", note: "Business segment workhorse. Consistent CVR." },
  { id: "A-003", ch: "TikTok", fmt: "video", aud: "T-Growth", promo: false,
    jp: "英語、たった7日で完璧にペラペラ！", en: "Perfect fluent English in just 7 days!",
    hook: "たった7日でペラペラ！", cta: "今すぐはじめる",
    spend: 640_000, impr: 1_020_445, clicks: 8_233, installs: 1_120, trials: 412, paid: 58,
    launched: "2025-12-01", status: "paused", note: "⚠ Hyperbolic. Off-brand. Paused after QA flag." },
  { id: "A-004", ch: "YouTube", fmt: "video", aud: "T-General", promo: false,
    jp: "声に出して、まねして、まちがえて、また話す。", en: "Speak, mimic, mess up, speak again.",
    hook: "声に出して、まねして、まちがえて、また話す。", cta: "まずはお試し",
    spend: 3_420_000, impr: 4_208_112, clicks: 58_604, installs: 12_040, trials: 8_224, paid: 2_418,
    launched: "2026-01-14", status: "live", note: "TVCM brand-poem cutdown. Highest CVR_trial in portfolio." },
  { id: "A-005", ch: "Meta", fmt: "carousel", aud: "T-Travel", promo: true,
    jp: "海外旅行まであと30日。空港で困らない英語、スキマで完璧に。", en: "30 days to your trip. Nail airport English in the gaps.",
    hook: "海外旅行まであと30日。", cta: "1ヶ月180円でお試し",
    spend: 880_000, impr: 612_400, clicks: 19_882, installs: 4_102, trials: 2_388, paid: 612,
    launched: "2025-10-20", status: "live", note: "Seasonal + promo. Strong CTR in travel-intent audience." },
  { id: "A-006", ch: "LINE", fmt: "static", aud: "T-Career", promo: true,
    jp: "LINE限定：1ヶ月180円でスピーク使い放題。", en: "LINE only: ¥180 for 1 month of unlimited Speak.",
    hook: "LINE限定：1ヶ月180円。", cta: "LINEで無料登録",
    spend: 420_000, impr: 210_300, clicks: 9_844, installs: 2_980, trials: 2_108, paid: 748,
    launched: "2025-09-12", status: "live", note: "Best CPA in portfolio. LINE channel advantage." },
  { id: "A-007", ch: "Meta", fmt: "video", aud: "T-Restart", promo: false,
    jp: "続かなかったあなたへ。AIだから、緊張しない。", en: "For those who couldn't stick with it. No nerves — it's AI.",
    hook: "続かなかったあなたへ。", cta: "7日間0円で試す",
    spend: 1_820_000, impr: 1_104_220, clicks: 26_400, installs: 6_302, trials: 4_410, paid: 1_284,
    launched: "2025-12-15", status: "live", note: "Restarter + USP2 combo. Stable performance." },
  { id: "A-008", ch: "TikTok", fmt: "video", aud: "T-Growth", promo: false,
    jp: "出勤前の5分。インスタ閉じて、英語開こう。", en: "The 5 minutes before work. Close Instagram, open English.",
    hook: "インスタ閉じて、英語開こう。", cta: "まずはお試し",
    spend: 510_000, impr: 782_100, clicks: 18_240, installs: 3_108, trials: 1_842, paid: 402,
    launched: "2026-01-22", status: "live", note: "Habit-framing. Native TikTok rhythm, still on-brand." },
  { id: "A-009", ch: "X", fmt: "static", aud: "T-Test", promo: false,
    jp: "TOEIC900、でも話せない。— スピークが解決します。", en: "TOEIC 900, still can't speak. — Speak solves it.",
    hook: "TOEIC900、でも話せない。", cta: "無料で始める",
    spend: 280_000, impr: 184_000, clicks: 4_122, installs: 810, trials: 520, paid: 142,
    launched: "2025-11-28", status: "live", note: "Niche but high-intent. Good CVR_trial." },
  { id: "A-010", ch: "Meta", fmt: "static", aud: "T-Career", promo: false,
    jp: "絶対に誰でもペラペラになれる！奇跡のAI。", en: "Absolutely anyone becomes fluent! Miraculous AI.",
    hook: "絶対に誰でもペラペラ！", cta: "今すぐ",
    spend: 380_000, impr: 540_200, clicks: 6_044, installs: 702, trials: 248, paid: 38,
    launched: "2025-08-02", status: "archived", note: "⚠ Archived. Multiple brand violations. Reference: do-not-repeat." },
  { id: "A-011", ch: "YouTube", fmt: "video", aud: "T-General", promo: false,
    jp: "1年で57,200文章。気づけば、英語が口から出ている。", en: "57,200 sentences in a year. Before you know it, English comes out.",
    hook: "気づけば、英語が口から出ている。", cta: "7日間0円で試す",
    spend: 1_580_000, impr: 1_820_400, clicks: 33_100, installs: 7_442, trials: 5_088, paid: 1_542,
    launched: "2026-02-01", status: "live", note: "Data-backed claim + outcome framing. Top-3 performer." },
  { id: "A-012", ch: "Meta", fmt: "static", aud: "T-Travel", promo: false,
    jp: "空港、レストラン、ホテル。全部のシーン、先に練習。", en: "Airport, restaurant, hotel. Rehearse every scene first.",
    hook: "全部のシーン、先に練習。", cta: "旅行前の準備を始める",
    spend: 620_000, impr: 480_280, clicks: 12_480, installs: 2_744, trials: 1_608, paid: 384,
    launched: "2025-10-05", status: "live", note: "Scenario-based. Travel LP lineage." },
];

// =============================================================================
// NEW: SURVEY / RESEARCH INSIGHTS — Phase 1
// =============================================================================
const INSIGHTS = [
  { id: "S-01", aud: "T-Restart", stat: "68%", claim: "「何度も挫折した」と答えた英語学習者が、AI相手なら続けられそうと回答。",
    claimEn: "68% of learners who said they've \"given up many times\" said they could continue with an AI partner.",
    source: "Speak JP ユーザー調査 2025 Q4 (n=1,204)", pullQuote: "先生の前では恥ずかしくて話せなかった。AIなら気にならない。", date: "2025-12" },
  { id: "S-02", aud: "T-Career", stat: "79%", claim: "業務で英語が必要な会社員の79%が「話す機会が圧倒的に足りない」と感じている。",
    claimEn: "79% of business-English users feel they \"overwhelmingly lack speaking opportunities.\"",
    source: "社会人英語実態調査 2025 (n=890)", pullQuote: "読み書きはできる。でも会議で一言も出てこない。", date: "2025-10" },
  { id: "S-03", aud: "T-Career", stat: "5分", claim: "社会人ユーザーが最も継続しやすいと答えた1日あたりの学習時間は5〜10分。",
    claimEn: "Business users report 5–10 min/day as the most sustainable learning window.",
    source: "継続率インタビュー (n=42)", pullQuote: "30分は無理。5分なら通勤中にできる。", date: "2026-01" },
  { id: "S-04", aud: "T-Test", stat: "TOEIC 800+", claim: "TOEIC800点以上だが「会話になると話せない」と回答した層が全体の52%。",
    claimEn: "52% of high-TOEIC (800+) learners still self-report as \"unable to actually speak.\"",
    source: "Speak Test Prep Survey 2025 (n=612)", pullQuote: "点数はあるのに、口からは出てこない。", date: "2025-11" },
  { id: "S-05", aud: "T-Travel", stat: "3×", claim: "旅行直前30日以内の学習モチベーションは通常時の約3倍。",
    claimEn: "Learning motivation in the 30-day pre-trip window is ~3× normal baseline.",
    source: "JTB × Speak パートナーシップ調査", pullQuote: "空港で固まったら旅行が台無しになる。", date: "2025-09" },
  { id: "S-06", aud: "T-Growth", stat: "62%", claim: "20-30代の自己成長志向層は「英語が話せる」を一生モノのスキルとして最も価値が高いと評価。",
    claimEn: "62% of growth-minded 20s-30s rank speaking English as their highest-value lifetime skill.",
    source: "自己成長意識調査 2025 (n=1,500)", pullQuote: "資格より話せることのほうがずっと価値がある。", date: "2025-08" },
  { id: "S-07", aud: "T-Restart", stat: "8秒", claim: "LP離脱が急増するのは「効果を実感するまで何日？」の説明が8秒以内にないとき。",
    claimEn: "LP bounce rate spikes when \"time to first result\" isn't shown within 8 seconds.",
    source: "LP セッション分析 2026-01", pullQuote: "また長続きしないのでは…と疑ってしまう。", date: "2026-01" },
  { id: "S-08", aud: "T-General", stat: "2.1×", claim: "「声に出す」「口から出る」等の身体性ワードは、広告CTRを約2.1倍に押し上げる。",
    claimEn: "Body-first language (声に出す, 口から出る) lifts ad CTR by ~2.1× vs. abstract framings.",
    source: "Creative pattern analysis — Motion data Q4", pullQuote: null, date: "2025-12" },
];

// =============================================================================
// NEW: Brand-fit heuristics (shared by Evaluator + Factory guardrails)
// =============================================================================
function runBrandChecks(t) {
  const hyperbole = /(絶対|必ず|誰でも|たった.{0,5}日|瞬時|一瞬|すぐに.*ペラペラ|魔法のように|奇跡|100%)/.test(t);
  const gamify = /(ストリーク|ポイント|バッジ.*集め|スコア|ランキング|レベルアップ)/.test(t);
  const preachy = /(べきです|しなければならない|当然|常識|教え込む|ねばならない)/.test(t);
  const frivolous = /(かわいい|楽しい.*簡単|お気軽|ノリで|チョー|超簡単)/.test(t);
  const jargonLed = /^(AI|LLM|ASR|NLP)/i.test(t);
  const hasData = /(\d+%|\d+\s*倍|\d+社|\d+万|\d+年|\d+日|シリコンバレー|OpenAI|ハーバード|No\.\s*1|1位|93%|1500万)/.test(t);
  const outcomeLed = /(話せる|話そう|声に出|口から|身につ|使える|伝わる|通じる|出てくる)/.test(t);
  const concise = t.length < 80;
  const peerTone = !preachy && !/いたします|申し上げ|恐れ入りますが/.test(t);

  const violations = [];
  if (hyperbole) violations.push({ code: "HYPE", label: "誇張表現 (violates Authentic)", sev: "high" });
  if (gamify) violations.push({ code: "GAMIFY", label: "ゲーミフィケーション先行", sev: "high" });
  if (preachy) violations.push({ code: "PREACHY", label: "教師的/説教的トーン", sev: "med" });
  if (frivolous) violations.push({ code: "FRIV", label: "軽すぎる / 子供っぽい", sev: "med" });
  if (jargonLed) violations.push({ code: "JARGON", label: "AI等のジャーゴン先行（成果ではなく）", sev: "med" });

  const score =
    (outcomeLed ? 3 : 0) +
    (concise ? 2 : 0) +
    (peerTone ? 2 : 0) +
    (hasData ? 2 : 0) +
    (!hyperbole ? 1 : 0);

  return {
    score,
    pass: score >= 6 && violations.filter(v => v.sev === "high").length === 0,
    violations,
    flags: { hyperbole, gamify, preachy, frivolous, jargonLed, hasData, outcomeLed, concise, peerTone },
  };
}

// =============================================================================
// NEW: Winning-pattern extraction from ADS data
// =============================================================================
function extractWinningPatterns(ads) {
  // Rank ads by trial-CVR (trials/clicks) weighted by volume
  const scored = ads
    .filter(a => a.status !== "archived" && a.clicks > 0)
    .map(a => ({
      ...a,
      ctr: a.clicks / a.impr,
      cvr_trial: a.trials / a.clicks,
      cpa: a.paid > 0 ? a.spend / a.paid : Infinity,
      perfScore: (a.trials / a.clicks) * Math.log(1 + a.clicks), // CVR × log(volume)
    }))
    .sort((a, b) => b.perfScore - a.perfScore);

  // Build pattern list from top 6 performers
  const winners = scored.slice(0, 6);
  const patterns = winners.map(w => {
    const tokens = {
      hasNumber: /\d/.test(w.jp),
      hasPain: /(黙る|続かな|話せない|話せる|困ら|恥ずかし|固まる)/.test(w.jp),
      hasEmPoem: /、.*、/.test(w.jp),
      hasTimebox: /(\d+分|\d+日|\d+秒|スキマ)/.test(w.jp),
      startsWithPain: /^(10年|会議|続か|TOEIC)/.test(w.jp),
    };
    let signature = [];
    if (tokens.startsWithPain) signature.push("Pain-first opening");
    if (tokens.hasNumber) signature.push("Concrete number");
    if (tokens.hasTimebox) signature.push("Timeboxed commitment");
    if (tokens.hasEmPoem) signature.push("Rhythmic list (poem cadence)");
    if (!signature.length) signature.push("Outcome-led");
    return { ad: w, signature };
  });
  return { winners, patterns };
}

// =============================================================================
// NEW: Generator — brief → 5 copy variations
// =============================================================================
// Variation archetypes, each produces (headline, sub, cta) from warehouse parts + brief.
function generateCopy(brief, warehouseCopies) {
  const { audience, persona, intent, channel, format, promo, pain, feature } = brief;

  // Utility: get key copies by filter
  const pickByLevel = (l, sub, g) =>
    warehouseCopies.filter(c =>
      c.l === l &&
      (!sub || c.sub === sub) &&
      (!g || c.g === g)
    );

  // Persona + intent influence — find the persona object and derive anchor words
  const personaObj = (PERSONAS[audience] || []).find(p => p.id === persona) || null;
  const personaPain = personaObj?.pain || pain || "";
  const personaTone = personaObj?.tone || "neutral";

  // Format constraints (if specified)
  const formatList = CHANNEL_FORMATS[channel] || [];
  const formatObj = formatList.find(f => f.id === format) || null;
  const headlineMax = formatObj?.headlineMax || 60;
  const subMax = formatObj?.subMax || 120;
  const fmtTone = formatObj?.tone || null;

  const heroes = pickByLevel("3").filter(c => c.k);
  const philos = pickByLevel("2").filter(c => c.k);
  const targetLines = pickByLevel("5", audience).filter(c => c.k);
  const featLines = feature ? pickByLevel("6", "RTB-Features", feature) : [];
  const dataLines = pickByLevel("6", "RTB-Tech").concat(pickByLevel("6", "RTB-Scale")).filter(c => c.k);
  const reviews = pickByLevel("6", "RTB-Reviews").filter(c => c.k);
  const prices = pickByLevel("6", "RTB-Price").filter(c => c.k);
  const ctas = promo
    ? pickByLevel("7", "CTA-Trial")
    : pickByLevel("7", "CTA-General").concat(pickByLevel("7", "CTA-Trial"));

  const pick = (arr, i = 0) => arr[i % Math.max(1, arr.length)];

  // Trim text to max length, preserving natural breaks
  const trim = (t, max) => {
    if (!max || !t || t.length <= max) return t;
    const truncated = t.slice(0, max);
    const natural = truncated.match(/^(.*[。、！？])[^。、！？]*$/);
    return natural ? natural[1] : truncated + "…";
  };

  // Intent bias — awareness uses brand/philosophy, consideration uses USP,
  // conversion uses price/CTA-heavy framing
  const intentBias = intent || "consideration";

  // Effective pain: user-entered overrides persona default
  const effectivePain = pain.trim() || personaPain;

  // ---- Archetype 1: PAIN-FIRST (persona-aware) ----
  const v1Headline = effectivePain
    ? trim(`${effectivePain}、${heroes[0]?.jp || "スピークで話そう。"}`, headlineMax)
    : trim(targetLines[0]?.jp || "話せない英語、今日から話そう。", headlineMax);
  const v1Sub = trim(philos[0]?.jp || "英語は、自分で話してこそ身につく。", subMax);
  const v1Cta = pick(ctas, 0)?.jp || "まずはお試し";

  // ---- Archetype 2: DATA-LED ----
  const numberMatch = dataLines[0]?.jp.match(/[\d,.%％倍]+/)?.[0] || "10倍";
  const v2Headline = trim(
    intentBias === "conversion"
      ? `${numberMatch}のスピーキング量。だから、話せる。今すぐ。`
      : `${numberMatch}のスピーキング量。だから、話せる。`,
    headlineMax
  );
  const v2Sub = trim(featLines[0]?.jp || "AIが相手だから気を使わない・恥ずかしくない。", subMax);
  const v2Cta = pick(ctas, 1)?.jp || "7日間0円で試す";

  // ---- Archetype 3: BRAND POEM (0歳メソッド cadence) ----
  const poemLines = warehouseCopies.filter(c =>
    (c.l === "2" || c.l === "4") &&
    /声に出|まねして|まちがえて|0歳|赤ちゃん|完璧じゃなくて|育って/.test(c.jp)
  );
  const rhythmic = poemLines.find(c => /、.*、.*、/.test(c.jp)) || poemLines[0];
  const v3Headline = trim(rhythmic?.jp || "声に出して、まねして、まちがえて、また話す。", headlineMax);
  const v3Sub = trim(heroes.find(h => /スピークで/.test(h.jp))?.jp || "はじめての英会話はスピークで。", subMax);
  const v3Cta = pick(ctas, 0)?.jp || "まずはお試し";

  // ---- Archetype 4: PEER (review-voice, honest) ----
  // Persona-flavored: Restart/no-confidence → gentle reassurance, Career/manager → composed
  const pickReviewHeadline = (rv) => {
    if (!rv) return null;
    let t = rv.jp;
    t = t.replace(/^[^—]+— /, "");
    t = t.replace(/^[「"]+|[」"]+$/g, "");
    if (t.length > 42) {
      const cut = t.slice(0, 42).match(/^(.*?[。、！？])/);
      t = cut ? cut[1] : t.slice(0, 42) + "…";
    }
    return t;
  };
  const v4Headline = trim(
    pickReviewHeadline(reviews[0]) ||
    targetLines[0]?.jp ||
    "これまで続かなかった人ほど、スピークは合う。",
    headlineMax
  );
  const personaDefaultSub = personaObj
    ? ({
        "skeptical-hopeful": "続かなかった方のための英会話アプリ。AIだから、無理せず続けられる。",
        "composed-urgent": "会議で黙らなくていい。AIで事前練習、本番で迷わない。",
        "gentle-reassuring": "AIが相手だから、間違えても恥ずかしくない。",
        "analytical-frustrated": "知識はある。あとは口に出す経験だけ。",
        "anxious-curious": "空港で固まらない。全シーン、先に練習。",
      }[personaTone] || null)
    : null;
  const v4Sub = trim(
    personaDefaultSub ||
    targetLines[1]?.jp ||
    philos[1]?.jp ||
    "AIが相手だから、無理せず続けられる。",
    subMax
  );
  const v4Cta = pick(ctas, 2)?.jp || "7日間無料体験";

  // ---- Archetype 5: PROMO / LIFESTYLE (intent-aware) ----
  const uspTimebox = warehouseCopies.find(c => c.l === "4" && c.sub === "USP4" && c.k);
  const v5Headline = trim(
    promo && prices[1]
      ? `${prices[1].jp}。今だけ。`
      : promo
      ? "1ヶ月180円で、スピーク使い放題。"
      : intentBias === "awareness"
      ? heroes[0]?.jp || "はじめての英会話はスピークで。"
      : uspTimebox?.jp ||
        (targetLines[2] || targetLines[0])?.jp ||
        "忙しい日常に、5分の英語を。",
    headlineMax
  );
  const v5Sub = trim(
    (!promo && targetLines[0] && targetLines[0].jp !== v5Headline)
      ? targetLines[0].jp
      : featLines[0]?.jp ||
        "24時間予約不要、いつでもどこでも。毎日のひとことが、英語の成長につながる。",
    subMax
  );
  const v5Cta = promo ? "1ヶ月180円でお試し" : pick(ctas, 1)?.jp || "今すぐはじめる";

  // Build archetype label with brief context
  const contextLabel = (base) => {
    const tags = [];
    if (personaObj) tags.push(personaObj.label);
    if (intent) tags.push(intent);
    if (formatObj) tags.push(formatObj.label);
    return tags.length ? `${base}` : base;
  };

  const variants = [
    {
      archetype: "Pain-first",
      rationale: personaObj
        ? `「${personaObj.label}」の痛み（${personaObj.pain}）を起点に、解決をスピークへ繋げる。PaidでCTRが出やすい古典。`
        : "ユーザーの痛み → 解決の順。PaidでCTRが出やすい古典。USP特化で確実な球。",
      headline: v1Headline, sub: v1Sub, cta: v1Cta,
      leans: "Confident + Authentic",
    },
    {
      archetype: "Data-led",
      rationale: intentBias === "conversion"
        ? "数字 + 緊急性。Conversionファネル向けのハードセール寄り。"
        : "数字先行で信頼性を即座に担保。科学的/論理派オーディエンスに効く。Authenticを強化。",
      headline: v2Headline, sub: v2Sub, cta: v2Cta,
      leans: "Confident + Innovative",
    },
    {
      archetype: "Brand-poem",
      rationale: "0歳メソッドのリズム。感情的共鳴でブランド想起に寄与。動画/TVCM向き。Awarenessで強い。",
      headline: v3Headline, sub: v3Sub, cta: v3Cta,
      leans: "Authentic + Witty",
    },
    {
      archetype: "Peer-voice",
      rationale: personaObj
        ? `「${personaObj.label}」のトーン（${personaTone}）に合わせた共感リード。`
        : "レビュー文脈の再現。ピアトーンで「先生じゃない、隣にいる」感を演出。",
      headline: v4Headline, sub: v4Sub, cta: v4Cta,
      leans: "Authentic + Witty",
    },
    {
      archetype: promo ? "Promo / seasonal" : intentBias === "awareness" ? "Brand-first" : "Lifestyle / habit",
      rationale: promo
        ? "プロモ訴求。価格を前に出すため、Authentic損ねないよう添えるRTBで質を保つ。"
        : intentBias === "awareness"
        ? "Awarenessファネル向け。USPより先にブランド定義を。想起形成に重点。"
        : "ライフスタイル訴求。忙しい社会人層の文脈に密着、USP4（スキマ時間）起点。",
      headline: v5Headline, sub: v5Sub, cta: v5Cta,
      leans: "Confident + Authentic",
    },
  ];

  // Evaluate each
  return variants.map(v => {
    const combined = `${v.headline} ${v.sub}`;
    const check = runBrandChecks(combined);
    return { ...v, check };
  });
}

// =============================================================================
// STYLING
// =============================================================================
const COLORS = {
  bg: "#0A0A10", panel: "#111118", card: "#15151F", cardHover: "#1A1A27",
  border: "#1A1A24", borderStrong: "#252535", text: "#E8E8F0",
  textDim: "#9A9AB0", textMute: "#6A6A80",
  accent: "#E11D48", accentSoft: "#BE123C",
  ok: "#10B981", warn: "#F59E0B", bad: "#EF4444",
  motion: "#A855F7", // Motion/paid-ads color
  insight: "#14B8A6", // Survey/insights color
};
const FONT = "'IBM Plex Sans JP', 'Inter', system-ui, sans-serif";
const MONO = "'JetBrains Mono', 'IBM Plex Mono', 'Courier New', monospace";

// =============================================================================
// MAIN COMPONENT
// =============================================================================
function SpeakJP() {
  const [tab, setTab] = useState("warehouse");

  return (
    <div style={{ minHeight: "100vh", background: COLORS.bg, color: COLORS.text,
      fontFamily: FONT, fontSize: 13, WebkitFontSmoothing: "antialiased" }}>
      {/* Header */}
      <div style={{ padding: "24px 34px 16px", borderBottom: `1px solid ${COLORS.border}`,
        background: `linear-gradient(180deg, #13131D 0%, ${COLORS.bg} 100%)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 26 }}>🗾</span>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em",
            fontFamily: MONO, margin: 0,
            background: `linear-gradient(90deg, #FFFFFF 0%, ${COLORS.accent} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            Speak JP Copy Warehouse
          </h1>
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 99,
            background: COLORS.accent, color: "#fff", fontWeight: 700, fontFamily: MONO,
            letterSpacing: "0.08em" }}>v2</span>
          <span style={{ fontSize: 9, padding: "2px 8px", borderRadius: 99,
            background: COLORS.panel, color: COLORS.textDim, fontFamily: MONO,
            border: `1px solid ${COLORS.border}` }}>Phase 1 · Hackathon</span>
        </div>
        <p style={{ color: COLORS.textDim, fontSize: 12, marginTop: 6, marginBottom: 0 }}>
          {COPIES.length} copies · {ADS.length} paid ads (Motion) · {INSIGHTS.length} research insights · はじめての英会話はスピークで。
        </p>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 3, marginTop: 14, background: COLORS.panel,
          borderRadius: 8, padding: 2, width: "fit-content", flexWrap: "wrap" }}>
          {[
            ["warehouse", "📦 Warehouse"],
            ["ads", "📊 Paid Ads"],
            ["insights", "🔬 Insights"],
            ["factory", "🏭 Factory"],
            ["evaluate", "✅ Evaluate"],
            ["channels", "📡 Channels"],
          ].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ padding: "7px 16px", borderRadius: 6, border: "none",
                background: tab === id ? COLORS.accent : "transparent",
                color: tab === id ? "#fff" : COLORS.textDim,
                fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: FONT,
                letterSpacing: "-0.01em", transition: "all 120ms" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === "warehouse" && <WarehouseTab />}
      {tab === "ads" && <AdsTab />}
      {tab === "insights" && <InsightsTab />}
      {tab === "factory" && <FactoryTab />}
      {tab === "evaluate" && <EvaluateTab />}
      {tab === "channels" && <ChannelsTab />}
    </div>
  );
}

// =============================================================================
// WAREHOUSE TAB (simplified from v1)
// =============================================================================
function WarehouseTab() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);
  const [onlyKey, setOnlyKey] = useState(false);
  const [search, setSearch] = useState("");
  const [showEn, setShowEn] = useState(false);

  const categoryCounts = useMemo(() => {
    const c = {};
    COPIES.forEach(x => { c[x.l] = (c[x.l] || 0) + 1; });
    return c;
  }, []);
  const subCounts = useMemo(() => {
    const c = {};
    COPIES.forEach(x => { if (x.sub) c[x.sub] = (c[x.sub] || 0) + 1; });
    return c;
  }, []);

  const filtered = useMemo(() => {
    return COPIES.filter(x => {
      if (activeCategory && x.l !== activeCategory) return false;
      if (activeSub && x.sub !== activeSub) return false;
      if (onlyKey && !x.k) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!x.jp.toLowerCase().includes(q) && !x.en.toLowerCase().includes(q) && !x.s.toLowerCase().includes(q))
          return false;
      }
      return true;
    });
  }, [activeCategory, activeSub, onlyKey, search]);

  const currentCategory = CATEGORIES.find(c => c.id === activeCategory);

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 130px)" }}>
      {/* Sidebar */}
      <div style={{ width: 280, borderRight: `1px solid ${COLORS.border}`, padding: "20px 16px", overflowY: "auto" }}>
        <SectionLabel>Categories · {filtered.length} shown</SectionLabel>
        <button onClick={() => { setActiveCategory(null); setActiveSub(null); }}
          style={{ width: "100%", padding: "9px 12px",
            background: !activeCategory ? COLORS.card : "transparent",
            border: `1px solid ${!activeCategory ? COLORS.borderStrong : COLORS.border}`,
            borderRadius: 8, color: COLORS.text, fontSize: 12, textAlign: "left",
            cursor: "pointer", display: "flex", justifyContent: "space-between",
            marginBottom: 6, fontFamily: FONT }}>
          <span>All</span>
          <span style={{ color: COLORS.textMute, fontFamily: MONO, fontSize: 11 }}>{COPIES.length}</span>
        </button>
        {CATEGORIES.map(cat => {
          const isActive = activeCategory === cat.id;
          return (
            <div key={cat.id} style={{ marginBottom: 4 }}>
              <button onClick={() => { setActiveCategory(isActive ? null : cat.id); setActiveSub(null); }}
                style={{ width: "100%", padding: "10px 12px",
                  background: isActive ? COLORS.card : "transparent",
                  border: `1px solid ${isActive ? cat.color : COLORS.border}`,
                  borderRadius: 8, color: COLORS.text, cursor: "pointer", textAlign: "left",
                  display: "flex", flexDirection: "column", gap: 2, fontFamily: FONT }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 99, background: cat.color }} />
                    <span style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO }}>L{cat.id}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{cat.label}</span>
                  </span>
                  <span style={{ fontSize: 11, color: COLORS.textMute, fontFamily: MONO }}>
                    {categoryCounts[cat.id] || 0}
                  </span>
                </div>
                <span style={{ fontSize: 11, color: COLORS.textMute, paddingLeft: 14, lineHeight: 1.35 }}>
                  {cat.desc}
                </span>
              </button>
              {isActive && cat.subs && (
                <div style={{ marginTop: 4, marginLeft: 14, display: "flex", flexDirection: "column", gap: 2 }}>
                  {cat.subs.map(sub => (
                    <button key={sub.id} onClick={() => setActiveSub(activeSub === sub.tag ? null : sub.tag)}
                      style={{ padding: "6px 10px",
                        background: activeSub === sub.tag ? cat.color + "22" : "transparent",
                        border: `1px solid ${activeSub === sub.tag ? cat.color : "transparent"}`,
                        borderRadius: 6, color: activeSub === sub.tag ? cat.color : COLORS.textDim,
                        fontSize: 11, textAlign: "left", cursor: "pointer",
                        display: "flex", justifyContent: "space-between",
                        fontWeight: activeSub === sub.tag ? 600 : 500, fontFamily: FONT }}>
                      <span>{sub.label}</span>
                      <span style={{ fontFamily: MONO }}>{subCounts[sub.tag] || 0}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "20px 28px", overflowY: "auto" }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search 日本語 or English or source…"
            style={{ padding: "9px 14px", background: COLORS.panel,
              border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text,
              fontSize: 12, minWidth: 260, outline: "none", fontFamily: FONT }} />
          <Toggle checked={onlyKey} onChange={setOnlyKey} color={COLORS.accent} label="★ Key copy only" />
          <Toggle checked={showEn} onChange={setShowEn} color={COLORS.textDim} label="Show English" />
        </div>

        {currentCategory && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16,
            fontSize: 11, color: COLORS.textDim, fontFamily: MONO }}>
            <span style={{ color: currentCategory.color, fontWeight: 700 }}>
              L{currentCategory.id} / {currentCategory.label}
            </span>
            {activeSub && (<><span>›</span><span style={{ color: COLORS.text, fontWeight: 600 }}>
              {CATEGORIES.flatMap(c => c.subs || []).find(s => s.tag === activeSub)?.label || activeSub}
            </span></>)}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
          {filtered.map((x, idx) => {
            const cat = CATEGORIES.find(c => c.id === x.l);
            const sub = cat?.subs?.find(s => s.tag === x.sub);
            const feat = FEATURES.find(f => f.tag === x.g);
            return (
              <div key={idx} style={{ background: COLORS.card,
                border: `1px solid ${x.k ? COLORS.accent + "66" : COLORS.border}`,
                borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 }}>
                  {cat && <Tag color={cat.color}>L{cat.id} {cat.label}</Tag>}
                  {sub && <Tag color={cat.color} dim>{sub.label}</Tag>}
                  {feat && <Tag color={COLORS.warn} dim>{feat.label}</Tag>}
                  {x.k && <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 99,
                    background: COLORS.accent, color: "#fff", fontWeight: 700,
                    letterSpacing: "0.08em", fontFamily: MONO }}>★ KEY</span>}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.6, color: COLORS.text, fontWeight: 500 }}>
                  {x.jp}
                </div>
                {showEn && (
                  <div style={{ fontSize: 11.5, lineHeight: 1.5, color: COLORS.textDim,
                    marginTop: 8, paddingTop: 8, borderTop: `1px dashed ${COLORS.border}`, fontStyle: "italic" }}>
                    {x.en}
                  </div>
                )}
                <div style={{ display: "flex", gap: 8, marginTop: 10, paddingTop: 8,
                  borderTop: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.textMute,
                  fontFamily: MONO, alignItems: "center", flexWrap: "wrap" }}>
                  <span>{x.s}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ padding: "1px 6px", borderRadius: 4,
                    background: x.f === "TO-BE aligned" ? COLORS.ok + "22" : x.f === "Universal" ? COLORS.border : COLORS.warn + "22",
                    color: x.f === "TO-BE aligned" ? COLORS.ok : x.f === "Universal" ? COLORS.textDim : COLORS.warn,
                    fontWeight: 700, letterSpacing: "0.04em" }}>
                    {x.f}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// ADS TAB — NEW — Motion-style paid-ads performance data
// =============================================================================
function AdsTab() {
  const [sortBy, setSortBy] = useState("cvr");
  const [filterCh, setFilterCh] = useState(null);
  const [filterAud, setFilterAud] = useState(null);
  const [filterStatus, setFilterStatus] = useState("live");

  const enriched = useMemo(() =>
    ADS.map(a => ({
      ...a,
      ctr: (a.clicks / a.impr) * 100,
      cvr_trial: (a.trials / a.clicks) * 100,
      cvr_paid: (a.paid / a.trials) * 100,
      cpa: a.paid > 0 ? a.spend / a.paid : null,
      cpi: a.installs > 0 ? a.spend / a.installs : null,
    })),
    []
  );

  const filtered = useMemo(() => {
    let arr = enriched;
    if (filterCh) arr = arr.filter(a => a.ch === filterCh);
    if (filterAud) arr = arr.filter(a => a.aud === filterAud);
    if (filterStatus) arr = arr.filter(a => a.status === filterStatus);
    const sorters = {
      cvr: (a, b) => b.cvr_trial - a.cvr_trial,
      ctr: (a, b) => b.ctr - a.ctr,
      spend: (a, b) => b.spend - a.spend,
      cpa: (a, b) => (a.cpa || Infinity) - (b.cpa || Infinity),
      recent: (a, b) => b.launched.localeCompare(a.launched),
    };
    return [...arr].sort(sorters[sortBy]);
  }, [enriched, filterCh, filterAud, filterStatus, sortBy]);

  const totals = useMemo(() => ({
    spend: enriched.reduce((s, a) => s + a.spend, 0),
    impr: enriched.reduce((s, a) => s + a.impr, 0),
    trials: enriched.reduce((s, a) => s + a.trials, 0),
    paid: enriched.reduce((s, a) => s + a.paid, 0),
  }), [enriched]);

  const channels = ["Meta", "TikTok", "YouTube", "LINE", "X"];
  const audiences = Array.from(new Set(ADS.map(a => a.aud)));

  return (
    <div style={{ padding: "24px 34px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>📊 Paid Ads</h2>
        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 99,
          background: COLORS.motion + "22", color: COLORS.motion, fontFamily: MONO,
          fontWeight: 700, letterSpacing: "0.08em", border: `1px solid ${COLORS.motion}44` }}>
          MOCKED · MOTION API
        </span>
      </div>
      <p style={{ color: COLORS.textMute, fontSize: 12, margin: "0 0 20px" }}>
        Phase 2 will pull this live from Motion. For now, {ADS.length} representative JP ads with performance.
      </p>

      {/* Top stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12, marginBottom: 22 }}>
        <StatCard label="Total spend" value={`¥${(totals.spend / 1_000_000).toFixed(1)}M`} color={COLORS.motion} />
        <StatCard label="Impressions" value={`${(totals.impr / 1_000_000).toFixed(1)}M`} color={COLORS.text} />
        <StatCard label="Trials" value={totals.trials.toLocaleString()} color={COLORS.ok} />
        <StatCard label="Paid conversions" value={totals.paid.toLocaleString()} color={COLORS.accent} />
        <StatCard label="Blended CPA" value={`¥${Math.round(totals.spend / totals.paid).toLocaleString()}`} color={COLORS.warn} />
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <FilterPill label="All channels" active={!filterCh} onClick={() => setFilterCh(null)} />
        {channels.map(ch => (
          <FilterPill key={ch} label={ch} active={filterCh === ch} onClick={() => setFilterCh(filterCh === ch ? null : ch)} />
        ))}
        <span style={{ width: 1, background: COLORS.border, margin: "0 4px" }} />
        <FilterPill label="All audiences" active={!filterAud} onClick={() => setFilterAud(null)} />
        {audiences.map(aud => (
          <FilterPill key={aud} label={aud.replace("T-", "")} active={filterAud === aud} onClick={() => setFilterAud(filterAud === aud ? null : aud)} />
        ))}
        <span style={{ width: 1, background: COLORS.border, margin: "0 4px" }} />
        {["live", "paused", "archived"].map(s => (
          <FilterPill key={s} label={s} active={filterStatus === s} onClick={() => setFilterStatus(filterStatus === s ? null : s)} color={s === "live" ? COLORS.ok : s === "paused" ? COLORS.warn : COLORS.bad} />
        ))}
        <span style={{ flex: 1 }} />
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ padding: "6px 12px", background: COLORS.panel, border: `1px solid ${COLORS.border}`,
            borderRadius: 6, color: COLORS.text, fontSize: 11, fontFamily: MONO, cursor: "pointer" }}>
          <option value="cvr">Sort: CVR (trial)</option>
          <option value="ctr">Sort: CTR</option>
          <option value="spend">Sort: Spend</option>
          <option value="cpa">Sort: CPA (low→high)</option>
          <option value="recent">Sort: Recent</option>
        </select>
      </div>

      {/* Ads grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 14 }}>
        {filtered.map(a => {
          const audLabel = CATEGORIES.find(c => c.id === "5")?.subs?.find(s => s.tag === a.aud)?.label || a.aud;
          const brandCheck = runBrandChecks(a.jp);
          return (
            <div key={a.id} style={{ background: COLORS.card,
              border: `1px solid ${a.status === "archived" ? COLORS.bad + "44" : COLORS.border}`,
              borderRadius: 10, padding: "14px 16px",
              opacity: a.status === "archived" ? 0.6 : 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                <Tag color={COLORS.motion}>{a.ch}</Tag>
                <Tag color={COLORS.textDim} dim>{a.fmt}</Tag>
                <Tag color={COLORS.accent} dim>{audLabel}</Tag>
                {a.promo && <Tag color={COLORS.warn}>PROMO</Tag>}
                <span style={{ flex: 1 }} />
                <StatusDot status={a.status} />
                <span style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO }}>{a.id}</span>
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 500, marginBottom: 6 }}>{a.jp}</div>
              <div style={{ fontSize: 11, color: COLORS.textMute, fontStyle: "italic",
                marginBottom: 10, lineHeight: 1.4 }}>{a.en}</div>

              {/* Perf row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4,
                padding: "10px 0", borderTop: `1px solid ${COLORS.border}`,
                borderBottom: `1px solid ${COLORS.border}`, marginBottom: 10 }}>
                <Metric label="CTR" value={`${a.ctr.toFixed(2)}%`} good={a.ctr > 2.0} />
                <Metric label="CVR→Trial" value={`${a.cvr_trial.toFixed(1)}%`} good={a.cvr_trial > 15} />
                <Metric label="Trials" value={a.trials.toLocaleString()} />
                <Metric label="CPA" value={a.cpa ? `¥${Math.round(a.cpa).toLocaleString()}` : "—"}
                  good={a.cpa && a.cpa < 1200} />
              </div>

              {/* Spend + note */}
              <div style={{ fontSize: 11, color: COLORS.textDim, lineHeight: 1.5 }}>
                <strong style={{ color: COLORS.text, fontFamily: MONO }}>Spend:</strong> ¥{a.spend.toLocaleString()}
                {" · "}
                <strong style={{ color: COLORS.text, fontFamily: MONO }}>Launched:</strong> {a.launched}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMute, marginTop: 5,
                fontStyle: "italic", lineHeight: 1.4 }}>
                {a.note}
              </div>

              {/* Brand check */}
              {!brandCheck.pass && (
                <div style={{ marginTop: 10, padding: "6px 10px",
                  background: COLORS.warn + "11", border: `1px solid ${COLORS.warn}44`,
                  borderRadius: 6, fontSize: 10, color: COLORS.warn, fontFamily: MONO,
                  lineHeight: 1.5 }}>
                  🚩 Brand guardrails: {brandCheck.violations.map(v => v.code).join(" · ") || "Low fit score"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// INSIGHTS TAB — NEW — Research/survey cards
// =============================================================================
function InsightsTab() {
  const [filterAud, setFilterAud] = useState(null);
  const filtered = filterAud ? INSIGHTS.filter(i => i.aud === filterAud) : INSIGHTS;
  const audiences = Array.from(new Set(INSIGHTS.map(i => i.aud)));

  return (
    <div style={{ padding: "24px 34px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>🔬 Research Insights</h2>
        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 99,
          background: COLORS.insight + "22", color: COLORS.insight, fontFamily: MONO,
          fontWeight: 700, letterSpacing: "0.08em", border: `1px solid ${COLORS.insight}44` }}>
          SURVEYS · QUAL · LP ANALYTICS
        </span>
      </div>
      <p style={{ color: COLORS.textMute, fontSize: 12, margin: "0 0 20px" }}>
        Audience insights to anchor copy in evidence. Used by Factory to bias tone & claim.
      </p>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
        <FilterPill label="All audiences" active={!filterAud} onClick={() => setFilterAud(null)} />
        {audiences.map(aud => {
          const label = CATEGORIES.find(c => c.id === "5")?.subs?.find(s => s.tag === aud)?.label || aud;
          return <FilterPill key={aud} label={label} active={filterAud === aud} onClick={() => setFilterAud(filterAud === aud ? null : aud)} color={COLORS.accent} />;
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: 14 }}>
        {filtered.map(ins => {
          const audLabel = CATEGORIES.find(c => c.id === "5")?.subs?.find(s => s.tag === ins.aud)?.label || ins.aud;
          return (
            <div key={ins.id} style={{ background: COLORS.card,
              border: `1px solid ${COLORS.insight}33`, borderRadius: 10, padding: "16px 18px",
              position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, width: 3, height: "100%", background: COLORS.insight }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                <Tag color={COLORS.insight}>{ins.id}</Tag>
                <Tag color={COLORS.accent} dim>{audLabel}</Tag>
                <span style={{ flex: 1 }} />
                <span style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO }}>{ins.date}</span>
              </div>
              <div style={{ fontSize: 34, fontWeight: 700, color: COLORS.insight,
                letterSpacing: "-0.04em", fontFamily: MONO, lineHeight: 1, marginBottom: 6 }}>
                {ins.stat}
              </div>
              <div style={{ fontSize: 13.5, lineHeight: 1.55, fontWeight: 500, marginBottom: 8 }}>
                {ins.claim}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textDim, fontStyle: "italic",
                marginBottom: 10, lineHeight: 1.4 }}>
                {ins.claimEn}
              </div>
              {ins.pullQuote && (
                <div style={{ padding: "10px 12px", background: COLORS.panel,
                  borderLeft: `2px solid ${COLORS.insight}`, borderRadius: 4,
                  fontSize: 12, color: COLORS.text, lineHeight: 1.5, marginBottom: 10,
                  fontStyle: "italic" }}>
                  「{ins.pullQuote}」
                </div>
              )}
              <div style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO,
                paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
                📄 {ins.source}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =============================================================================
// REMIX MODE — secondary factory feature.
// Genuinely transforms picked copies: extracts semantic content (pain words,
// outcome verbs, numbers, subjects) and structural patterns (templates), then
// fills one pick's template with another pick's content. Also produces
// tone-shift, compression, and question→declarative transforms.
// =============================================================================

// --- Pattern templates detected in picks. Each has a matcher + a filler. ---
const REMIX_PATTERNS = [
  {
    id: "yearsthen",
    name: "[N]年○○、それでも",
    matcher: (t) => /(\d+年|何年).*?(話せない|やって|勉強)/.test(t),
    fill: (content) => {
      const years = content.numbers[0] || "10年";
      const outcome = content.outcomes[0] || "話せる";
      return `${years}やって${content.pains[0] || "話せない"}英語、今日から${outcome}。`;
    },
  },
  {
    id: "nomore",
    name: "○○はもう終わり",
    matcher: (t) => /もう終わり|もういらない|やめよう/.test(t),
    fill: (content) => {
      const pain = content.pains[0] || "黙る";
      return `${pain}のはもう終わり。${content.claims[0] || "スピークで話そう。"}`;
    },
  },
  {
    id: "ifwant",
    name: "\"話したい\"なら",
    matcher: (t) => /なら.*スピーク|話したい/.test(t),
    fill: (content) => {
      const goal = content.outcomes[0] || "話したい";
      return `"${goal}"なら、${content.claims[0] || "スピーク。"}`;
    },
  },
  {
    id: "triplet",
    name: "三連リズム (A、B、C。)",
    matcher: (t) => /、.*、.*[。！]/.test(t) && t.length < 40,
    fill: (content) => {
      const verbs = content.verbs.length >= 3
        ? content.verbs.slice(0, 3)
        : ["声に出し", "まねし", "話す"];
      return `${verbs[0]}、${verbs[1]}、${verbs[2]}。`;
    },
  },
  {
    id: "despite_X",
    name: "[X]、でも[Y]",
    matcher: (t) => /、でも|けど|が、/.test(t),
    fill: (content) => {
      const pos = content.strengths[0] || "知識はある";
      const gap = content.pains[0] || "話せない";
      return `${pos}、でも${gap}。— スピークが解決します。`;
    },
  },
  {
    id: "timebox",
    name: "1日[N]分",
    matcher: (t) => /(1日|毎日).*?(\d+分|\d+秒|スキマ)/.test(t),
    fill: (content) => {
      const minutes = content.numbers.find(n => /分/.test(n)) || "5分";
      const outcome = content.outcomes[0] || "話せる";
      return `1日${minutes}で、${outcome}英語。`;
    },
  },
  {
    id: "question",
    name: "質問→回答",
    matcher: (t) => /[？?]/.test(t),
    fill: (content) => {
      const pain = content.pains[0] || "話せない";
      return `${pain}のはなぜ？話す機会が足りないから。スピークが埋めます。`;
    },
  },
];

// Extract semantic content from a set of picked copies
function extractContent(picked) {
  const content = {
    pains: [], outcomes: [], numbers: [], verbs: [], claims: [], strengths: [],
    features: [], subjects: [],
  };
  for (const c of picked) {
    const t = c.jp;
    // Pain phrases
    const painMatches = t.match(/(話せない|続かな[いい]|恥ずかし[いく]|黙る|固まる|困[ら難]|挫折|話を切[り出]せ|言葉が出[ずな]|緊張[しす]|遅れ|ミス)/g) || [];
    content.pains.push(...painMatches);
    // Outcome verbs / phrases
    const outcomeMatches = t.match(/(話せる|話そう|身につ[くけ]|使える|口から出[るて]|伝わる|通じる|自然に.*?[るた]|できるようになる|ペラペラ)/g) || [];
    content.outcomes.push(...outcomeMatches);
    // Numbers (preserve unit) — broader
    const numMatches = t.match(/\d[\d,.]*\s*(倍|日|分|秒|%|％|年|文|語|社|円|万|時間|ヶ月|回|人)/g) || [];
    content.numbers.push(...numMatches);
    // Verbs (clean て-form — no leading particles)
    // Match at word boundaries or after common particles/kanji
    const verbMatches = Array.from(t.matchAll(/(?:^|[。、\s])([ぁ-んァ-ヶ一-龠]{1,4}(?:って|して|せて|れて|えて|いて))/g))
      .map(m => m[1])
      .filter(v => v.length >= 2);
    content.verbs.push(...verbMatches);
    // Feature-ish nouns
    const featMatches = t.match(/(AI|チューター|レッスン|発音|会話|フィードバック|ロールプレイ|スピーク|スマート)/g) || [];
    content.features.push(...featMatches);
    // Claim-like (short declaratives ending in 。)
    const claimMatches = t.match(/[^。、！？]{4,24}[。！]/g) || [];
    content.claims.push(...claimMatches);
    // Strengths (positive attributes)
    const strengthMatches = t.match(/(知識はある|読み書きは|TOEIC\d+|点数は|勉強は.*?した|業界.*?経験)/g) || [];
    content.strengths.push(...strengthMatches);
    // Subject phrases (before first particle は/が/を)
    const subjMatch = t.match(/^([^、。は]{2,12})[はがを]/);
    if (subjMatch) content.subjects.push(subjMatch[1]);
  }
  // Dedupe
  for (const k of Object.keys(content)) {
    content[k] = [...new Set(content[k])];
  }
  return content;
}

// Detect which pattern each picked copy exemplifies
function detectPattern(text) {
  for (const p of REMIX_PATTERNS) {
    if (p.matcher(text)) return p;
  }
  return null;
}

// Tone shifts — preserve content, change register
function toneShift(text, targetTone) {
  // formal → peer
  if (targetTone === "peer") {
    return text
      .replace(/いたします|申し上げます/g, "します")
      .replace(/でございます/g, "です")
      .replace(/ませんか？?/g, "ませんか？")
      .replace(/(します|です)。/g, "$1。");
  }
  // declarative → question (for awareness)
  if (targetTone === "question") {
    const stripped = text.replace(/[。！]$/, "");
    return `${stripped}、そう感じていませんか？`;
  }
  // compression — drop anything after last 。 or 、 if > 30 chars
  if (targetTone === "compress") {
    if (text.length <= 30) return text;
    // Keep first sentence
    const firstSentence = text.match(/^[^。！]*[。！]/);
    if (firstSentence) return firstSentence[0];
    return text.slice(0, 28) + "。";
  }
  return text;
}

function remixCopies(picked) {
  if (picked.length < 2) return [];

  const content = extractContent(picked);
  const patterns = picked.map(c => ({ src: c, pattern: detectPattern(c.jp) }));

  const outs = [];

  // --- Transformation 1: Pattern-transplant ---
  // Take pick A's pattern template, fill with content drawn from B (and C if present)
  for (let i = 0; i < patterns.length; i++) {
    const pat = patterns[i]?.pattern;
    if (!pat) continue;
    // Content drawn from the OTHER picks only
    const otherPicks = picked.filter((_, j) => j !== i);
    if (otherPicks.length === 0) continue;
    const otherContent = extractContent(otherPicks);
    // Merge with fallbacks
    const merged = {
      pains: otherContent.pains.concat(content.pains),
      outcomes: otherContent.outcomes.concat(content.outcomes),
      numbers: otherContent.numbers.concat(content.numbers),
      verbs: otherContent.verbs.concat(content.verbs),
      claims: otherContent.claims.concat(content.claims),
      strengths: otherContent.strengths.concat(content.strengths),
      features: otherContent.features.concat(content.features),
      subjects: otherContent.subjects.concat(content.subjects),
    };
    const filled = pat.fill(merged);
    if (filled && filled !== patterns[i].src.jp) {
      outs.push({
        label: `Transplant: ${pat.name}`,
        note: `${String.fromCharCode(65 + i)}の構文パターンに、他のピックの内容を注入。`,
        jp: filled,
        how: `Pattern「${pat.name}」× content from ${otherPicks.length} other pick(s)`,
        from: picked,
      });
    }
  }

  // --- Transformation 2: Content-splice ---
  // Combine: pain from A + outcome from B + proof from C
  if (content.pains.length >= 1 && content.outcomes.length >= 1) {
    const pain = content.pains[0];
    const outcome = content.outcomes[0];
    const number = content.numbers[0];
    const spliced = number
      ? `${pain}英語、${number}で${outcome}。`
      : `${pain}英語。スピークなら、${outcome}。`;
    outs.push({
      label: "Content-splice",
      note: "各ピックから「痛み」「成果」「数字」を抽出して合成。",
      jp: spliced,
      how: `pain「${pain}」+ outcome「${outcome}」${number ? ` + number「${number}」` : ""}`,
      from: picked,
    });
  }

  // --- Transformation 3: Tone-shift (compress) ---
  // Take longest pick, compress it
  const longest = [...picked].sort((a, b) => b.jp.length - a.jp.length)[0];
  if (longest && longest.jp.length > 28) {
    const compressed = toneShift(longest.jp, "compress");
    if (compressed !== longest.jp) {
      outs.push({
        label: "Compress (TVCM-ready)",
        note: "一番長いピックを短縮。TVCM・ストーリーズ向け。",
        jp: compressed,
        how: `${longest.jp.length}字 → ${compressed.length}字`,
        from: [longest],
      });
    }
  }

  // --- Transformation 4: Question-inversion ---
  // Take a declarative pick and flip to question (awareness stage)
  const declarative = picked.find(c => !/[？?]/.test(c.jp) && /[。！]$/.test(c.jp));
  if (declarative) {
    const asQuestion = toneShift(declarative.jp, "question");
    outs.push({
      label: "Flip to question",
      note: "断言を問いかけに変換。Awarenessファネル・ソーシャル向け。",
      jp: asQuestion,
      how: "declarative → question form",
      from: [declarative],
    });
  }

  // --- Transformation 5: Pain → Data hybrid ---
  // If we have both pain-bearing pick AND number-bearing pick, make a punchy combo
  const painPick = picked.find(c => /話せない|続かな|黙る|固まる|挫折/.test(c.jp));
  const numberPick = picked.find(c => /\d/.test(c.jp));
  if (painPick && numberPick && painPick !== numberPick) {
    const number = numberPick.jp.match(/\d[\d,]*\s*(倍|日|分|秒|%|％|年|文|語|社|円|万|時間|ヶ月|回|人)/)?.[0];
    const pain = painPick.jp.match(/(話せない|続かな[いい]|黙る|固まる|挫折)/)?.[0];
    if (number && pain) {
      outs.push({
        label: "Pain + Data fusion",
        note: "痛みと数字を一文に統合。Paid広告の鉄板。",
        jp: `${pain}のは、話す量が足りないから。スピークなら${number}。`,
        how: `pain「${pain}」× number「${number}」`,
        from: [painPick, numberPick],
      });
    }
  }

  // --- Transformation 6: Triplet rhythm (if we have enough verbs) ---
  if (content.verbs.length >= 3) {
    const v = content.verbs.slice(0, 3);
    outs.push({
      label: "Triplet rhythm",
      note: "3つの動詞を抽出、0歳メソッド風リズムに再構成。",
      jp: `${v[0]}、${v[1]}、${v[2]}また話す。`,
      how: "verb×3 rhythm",
      from: picked,
    });
  }

  // --- Transformation 7 (fallback): Concept-fusion ---
  // If none of the above fired (or very few), combine the FIRST MEANINGFUL PHRASE of
  // each pick at their natural breakpoints. This is always possible.
  if (outs.length < 2) {
    const phrases = picked.map(c => {
      const cleaned = c.jp.replace(/[。！？]+$/, "");
      const first = cleaned.split(/[、。]/)[0];
      return first.length <= 25 ? first : first.slice(0, 25);
    });
    if (phrases.length >= 2 && phrases[0] !== phrases[1]) {
      outs.push({
        label: "Concept-fusion",
        note: "各ピックの冒頭フレーズを統合。確実に生成できるフォールバック。",
        jp: `${phrases[0]}、${phrases[1]}${phrases[2] ? "、" + phrases[2] : ""}。`,
        how: `core phrase × ${phrases.length} picks`,
        from: picked,
      });
    }
  }

  // Score each, dedupe, keep unique
  const seen = new Set();
  const unique = outs.filter(o => {
    if (seen.has(o.jp)) return false;
    seen.add(o.jp);
    return true;
  });
  return unique.map(o => ({ ...o, check: runBrandChecks(o.jp) }));
}

// =============================================================================
// FACTORY TAB — brief-driven Generate (primary) + Remix (secondary)
// =============================================================================
function FactoryTab() {
  const [mode, setMode] = useState("generate"); // 'generate' | 'remix'

  // --- Generate state ---
  const [audience, setAudience] = useState("T-Restart");
  const [persona, setPersona] = useState("multifail");
  const [intent, setIntent] = useState("consideration");
  const [channel, setChannel] = useState("paid");
  const [format, setFormat] = useState("meta-static");
  const [feature, setFeature] = useState("");
  const [promo, setPromo] = useState(false);
  const [pain, setPain] = useState("");
  const [generated, setGenerated] = useState(null);

  // --- Remix state ---
  const [remixPicks, setRemixPicks] = useState([]);
  const [remixSearch, setRemixSearch] = useState("");
  const [remixOut, setRemixOut] = useState(null);

  const audienceSubs = CATEGORIES.find(c => c.id === "5").subs;
  const featureChoices = [{ tag: "", label: "— none —" }, ...FEATURES];

  // Derive personas for current audience; default to first if current persona is invalid
  const personaList = PERSONAS[audience] || [];
  const formatList = CHANNEL_FORMATS[channel] || [];

  // Sync dependent dropdowns when parent changes
  useEffect(() => {
    if (personaList.length && !personaList.find(p => p.id === persona)) {
      setPersona(personaList[0].id);
    }
  }, [audience, personaList, persona]);
  useEffect(() => {
    if (formatList.length && !formatList.find(f => f.id === format)) {
      setFormat(formatList[0].id);
    }
  }, [channel, formatList, format]);

  const personaObj = personaList.find(p => p.id === persona);
  const formatObj = formatList.find(f => f.id === format);

  const audienceInsights = useMemo(() =>
    INSIGHTS.filter(i => i.aud === audience || i.aud === "T-General"),
    [audience]
  );

  const audienceWinners = useMemo(() => {
    const adsForAud = ADS.filter(a => a.aud === audience && a.status === "live");
    return adsForAud
      .map(a => ({ ...a, cvr: a.trials / a.clicks, ctr: a.clicks / a.impr }))
      .sort((a, b) => b.cvr - a.cvr)
      .slice(0, 3);
  }, [audience]);

  const generate = () => {
    const brief = {
      audience, persona, intent, channel, format,
      promo, pain: pain.trim(), feature,
    };
    const variants = generateCopy(brief, COPIES);
    setGenerated({ brief, variants, at: new Date().toISOString() });
  };

  const toggleRemixPick = (copy) => {
    setRemixPicks(prev => {
      const exists = prev.find(p => p.jp === copy.jp);
      if (exists) return prev.filter(p => p.jp !== copy.jp);
      if (prev.length >= 3) return [prev[1], prev[2], copy];
      return [...prev, copy];
    });
    setRemixOut(null);
  };

  const runRemix = () => {
    setRemixOut(remixCopies(remixPicks));
  };

  const remixCandidates = useMemo(() => {
    let pool = COPIES.filter(c => c.l === "3" || c.l === "4" || c.l === "5" || c.k);
    if (remixSearch) {
      const q = remixSearch.toLowerCase();
      pool = pool.filter(c => c.jp.toLowerCase().includes(q) || c.en.toLowerCase().includes(q));
    }
    return pool.slice(0, 40);
  }, [remixSearch]);

  return (
    <div style={{ padding: "24px 34px", maxWidth: 1240 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.03em" }}>
          🏭 Copy Factory
        </h2>
        <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 99,
          background: COLORS.accent + "22", color: COLORS.accent, fontFamily: MONO,
          fontWeight: 700, letterSpacing: "0.08em", border: `1px solid ${COLORS.accent}44` }}>
          GENERATES · GUARDRAILED
        </span>
      </div>
      <p style={{ color: COLORS.textMute, fontSize: 12, margin: "0 0 18px" }}>
        Generate fresh copy from a brief, or remix existing warehouse lines into hybrids. Every output scored against brand rules.
      </p>

      {/* Mode switcher */}
      <div style={{ display: "flex", gap: 4, marginBottom: 22, background: COLORS.panel,
        padding: 3, borderRadius: 9, width: "fit-content", border: `1px solid ${COLORS.border}` }}>
        {[
          ["generate", "✨ Generate", "Primary"],
          ["remix", "🎛 Remix", "Secondary"],
        ].map(([id, label, tag]) => (
          <button key={id} onClick={() => setMode(id)}
            style={{ padding: "8px 18px", borderRadius: 7, border: "none",
              background: mode === id ? COLORS.accent : "transparent",
              color: mode === id ? "#fff" : COLORS.textDim,
              fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
              display: "flex", alignItems: "center", gap: 8 }}>
            {label}
            <span style={{ fontSize: 8, padding: "2px 6px", borderRadius: 99,
              background: mode === id ? "rgba(255,255,255,0.2)" : COLORS.border,
              color: mode === id ? "#fff" : COLORS.textMute, fontFamily: MONO,
              letterSpacing: "0.08em", fontWeight: 700 }}>{tag}</span>
          </button>
        ))}
      </div>

      {/* ============ GENERATE MODE ============ */}
      {mode === "generate" && (
        <>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
            <SectionLabel>1 · The Brief</SectionLabel>

            {/* Row A: Audience (segment → persona → intent) */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: COLORS.accent, fontFamily: MONO,
                letterSpacing: "0.12em", marginBottom: 8, textTransform: "uppercase",
                fontWeight: 700 }}>
                👥 Audience
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr",
                gap: 10 }}>
                <Field label="Segment">
                  <select value={audience} onChange={e => setAudience(e.target.value)} style={selectStyle}>
                    {audienceSubs.map(s => <option key={s.tag} value={s.tag}>{s.label}</option>)}
                  </select>
                </Field>
                <Field label="Sub-persona">
                  <select value={persona} onChange={e => setPersona(e.target.value)} style={selectStyle}>
                    {personaList.map(p => (
                      <option key={p.id} value={p.id}>{p.label}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Intent level">
                  <select value={intent} onChange={e => setIntent(e.target.value)} style={selectStyle}>
                    {INTENTS.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
                  </select>
                </Field>
              </div>
              {personaObj && (
                <div style={{ marginTop: 8, padding: "8px 12px",
                  background: COLORS.accent + "08", border: `1px solid ${COLORS.accent}22`,
                  borderRadius: 6, fontSize: 11, color: COLORS.textDim, lineHeight: 1.5 }}>
                  <strong style={{ color: COLORS.accent, fontFamily: MONO,
                    fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    {personaObj.tone}
                  </strong>
                  {" · 痛み: "}
                  <span style={{ color: COLORS.text }}>{personaObj.pain}</span>
                </div>
              )}
            </div>

            {/* Row B: Channel (channel → format) */}
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 10, color: COLORS.motion, fontFamily: MONO,
                letterSpacing: "0.12em", marginBottom: 8, textTransform: "uppercase",
                fontWeight: 700 }}>
                📡 Channel
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr",
                gap: 10 }}>
                <Field label="Channel">
                  <select value={channel} onChange={e => setChannel(e.target.value)} style={selectStyle}>
                    {JP_CHANNELS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </Field>
                <Field label="Format">
                  <select value={format} onChange={e => setFormat(e.target.value)} style={selectStyle}>
                    {formatList.map(f => (
                      <option key={f.id} value={f.id}>{f.label}</option>
                    ))}
                  </select>
                </Field>
              </div>
              {formatObj && (
                <div style={{ marginTop: 8, padding: "8px 12px",
                  background: COLORS.motion + "08", border: `1px solid ${COLORS.motion}22`,
                  borderRadius: 6, fontSize: 11, color: COLORS.textDim, lineHeight: 1.5,
                  display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                  <span>
                    <strong style={{ color: COLORS.motion, fontFamily: MONO, fontSize: 10,
                      letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Tone
                    </strong>{" "}
                    <span style={{ color: COLORS.text }}>{formatObj.tone}</span>
                  </span>
                  {formatObj.headlineMax > 0 && (
                    <span>
                      <strong style={{ color: COLORS.motion, fontFamily: MONO, fontSize: 10,
                        letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Headline max
                      </strong>{" "}
                      <span style={{ color: COLORS.text, fontFamily: MONO }}>{formatObj.headlineMax}字</span>
                    </span>
                  )}
                  {formatObj.subMax > 0 && (
                    <span>
                      <strong style={{ color: COLORS.motion, fontFamily: MONO, fontSize: 10,
                        letterSpacing: "0.08em", textTransform: "uppercase" }}>
                        Sub max
                      </strong>{" "}
                      <span style={{ color: COLORS.text, fontFamily: MONO }}>{formatObj.subMax}字</span>
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Row C: Content options */}
            <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr",
              gap: 10, marginBottom: 14 }}>
              <Field label="Feature to highlight (optional)">
                <select value={feature} onChange={e => setFeature(e.target.value)} style={selectStyle}>
                  {featureChoices.map(f => <option key={f.tag} value={f.tag}>{f.label}</option>)}
                </select>
              </Field>
              <Field label="Promotional use">
                <label style={{ display: "flex", alignItems: "center", gap: 8,
                  padding: "9px 12px", background: COLORS.panel,
                  border: `1px solid ${COLORS.border}`, borderRadius: 6, cursor: "pointer" }}>
                  <input type="checkbox" checked={promo} onChange={e => setPromo(e.target.checked)}
                    style={{ accentColor: COLORS.accent }} />
                  <span style={{ fontSize: 12 }}>Promo / discount</span>
                </label>
              </Field>
            </div>

            <Field label="Pain point / hook (optional — overrides persona pain for variant 1)">
              <input type="text" value={pain} onChange={e => setPain(e.target.value)}
                placeholder="e.g. 会議で黙るのはもう終わり / 10年やって話せない / TOEIC900、でも話せない"
                style={{ ...selectStyle, width: "100%" }} />
            </Field>

            <div style={{ display: "flex", gap: 10, marginTop: 20, alignItems: "center" }}>
              <button onClick={generate} style={{ padding: "11px 26px",
                background: COLORS.accent, border: "none", borderRadius: 8, color: "#fff",
                fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: FONT,
                letterSpacing: "0.02em", boxShadow: `0 4px 20px ${COLORS.accent}44` }}>
                ✨ Generate 5 variations
              </button>
              <span style={{ fontSize: 11, color: COLORS.textMute, fontFamily: MONO }}>
                From {COPIES.length} warehouse copies + brief + guardrails
              </span>
            </div>
          </div>

          {/* Reference panel — PASSIVE, user-only */}
          <div style={{ background: COLORS.panel, border: `1px dashed ${COLORS.border}`,
            borderRadius: 10, padding: "18px 22px", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <SectionLabel>Reference for this segment</SectionLabel>
              <span style={{ flex: 1 }} />
              <span style={{ fontSize: 9, color: COLORS.textMute, fontFamily: MONO,
                letterSpacing: "0.08em", textTransform: "uppercase" }}>
                ⓘ Read-only — doesn't bias generation
              </span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {/* Insights column */}
              <div>
                <div style={{ fontSize: 10, color: COLORS.insight, fontFamily: MONO,
                  letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>
                  🔬 Research insights
                </div>
                {audienceInsights.length ? audienceInsights.slice(0, 3).map(i => (
                  <div key={i.id} style={{ padding: "8px 10px", background: COLORS.insight + "08",
                    borderLeft: `2px solid ${COLORS.insight}`, borderRadius: 4, marginBottom: 6 }}>
                    <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>
                      <strong style={{ color: COLORS.insight, fontFamily: MONO }}>{i.stat}</strong> {i.claim}
                    </div>
                    {i.pullQuote && (
                      <div style={{ fontSize: 10.5, color: COLORS.textDim, fontStyle: "italic",
                        marginTop: 4, lineHeight: 1.4 }}>「{i.pullQuote}」</div>
                    )}
                  </div>
                )) : (
                  <div style={{ fontSize: 11, color: COLORS.textMute, padding: "8px 10px" }}>
                    No segment-specific insights yet.
                  </div>
                )}
              </div>
              {/* Top ads column */}
              <div>
                <div style={{ fontSize: 10, color: COLORS.motion, fontFamily: MONO,
                  letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8, fontWeight: 700 }}>
                  📊 Top-CVR ads in this segment
                </div>
                {audienceWinners.length ? audienceWinners.map(w => (
                  <div key={w.id} style={{ padding: "8px 10px", background: COLORS.motion + "08",
                    borderLeft: `2px solid ${COLORS.motion}`, borderRadius: 4, marginBottom: 6 }}>
                    <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 3 }}>
                      <Tag color={COLORS.motion} dim>{w.ch}</Tag>
                      <span style={{ fontSize: 10, color: COLORS.ok, fontFamily: MONO, fontWeight: 700 }}>
                        {(w.cvr * 100).toFixed(1)}% CVR
                      </span>
                      <span style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO }}>
                        · {(w.ctr * 100).toFixed(2)}% CTR
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.5 }}>{w.jp}</div>
                  </div>
                )) : (
                  <div style={{ fontSize: 11, color: COLORS.textMute, padding: "8px 10px" }}>
                    No live ads for this segment yet.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Generated output */}
          {generated && (
            <div>
              <SectionLabel>Generated Variations</SectionLabel>
              <div style={{ fontSize: 11, color: COLORS.textMute, fontFamily: MONO, marginBottom: 14 }}>
                Brief: {generated.brief.audience} · {generated.brief.channel}
                {generated.brief.promo && " · PROMO"}
                {generated.brief.feature && ` · feat:${generated.brief.feature}`}
                {generated.brief.pain && ` · pain:"${generated.brief.pain.slice(0, 30)}"`}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
                gap: 16 }}>
                {generated.variants.map((v, i) => (
                  <VariantCard key={i} variant={v} index={i} />
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "14px 18px", background: COLORS.panel,
                border: `1px dashed ${COLORS.border}`, borderRadius: 8, fontSize: 11,
                color: COLORS.textMute, lineHeight: 1.6, fontFamily: MONO }}>
                💡 <strong style={{ color: COLORS.text }}>How generation works:</strong> 5 archetypes
                (Pain-first · Data-led · Brand-poem · Peer-voice · Lifestyle/Promo) composed from warehouse
                blocks filtered by your brief. Every variant runs through the same brand guardrails as the Evaluate tab.
              </div>
            </div>
          )}
        </>
      )}

      {/* ============ REMIX MODE ============ */}
      {mode === "remix" && (
        <>
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "20px 24px", marginBottom: 20 }}>
            <SectionLabel>1 · Pick 2–3 warehouse copies to remix</SectionLabel>
            <p style={{ fontSize: 11.5, color: COLORS.textMute, margin: "0 0 14px", lineHeight: 1.5 }}>
              Pattern-level remix: the tool blends structural halves (anchor + punch) of your picks into hybrid lines.
              Good for finding new angles from existing proven copy.
            </p>

            {/* Picks display */}
            <div style={{ marginBottom: 14, minHeight: 48 }}>
              <div style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO,
                letterSpacing: "0.1em", marginBottom: 6, textTransform: "uppercase" }}>
                Selected ({remixPicks.length}/3)
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {remixPicks.length === 0 && (
                  <div style={{ fontSize: 12, color: COLORS.textMute, fontStyle: "italic",
                    padding: "8px 0" }}>Pick copies from the list below…</div>
                )}
                {remixPicks.map((p, i) => (
                  <div key={i} style={{ padding: "7px 12px", background: COLORS.accent + "22",
                    border: `1px solid ${COLORS.accent}`, borderRadius: 99, fontSize: 12,
                    color: COLORS.text, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 10, fontFamily: MONO, color: COLORS.accent,
                      fontWeight: 700 }}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {p.jp.length > 30 ? p.jp.slice(0, 28) + "…" : p.jp}
                    <button onClick={() => toggleRemixPick(p)}
                      style={{ background: "none", border: "none", color: COLORS.accent,
                        cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }}>×</button>
                  </div>
                ))}
              </div>
            </div>

            <input type="text" value={remixSearch} onChange={e => setRemixSearch(e.target.value)}
              placeholder="Search warehouse copies to pick…"
              style={{ ...selectStyle, width: "100%", marginBottom: 10 }} />
            <div style={{ maxHeight: 260, overflowY: "auto",
              border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 6,
              background: COLORS.bg }}>
              {remixCandidates.map((c, i) => {
                const isPicked = remixPicks.find(p => p.jp === c.jp);
                const cat = CATEGORIES.find(x => x.id === c.l);
                return (
                  <button key={i} onClick={() => toggleRemixPick(c)}
                    style={{ display: "block", width: "100%", textAlign: "left",
                      padding: "8px 10px", background: isPicked ? COLORS.accent + "22" : "transparent",
                      border: `1px solid ${isPicked ? COLORS.accent : "transparent"}`,
                      borderRadius: 5, color: COLORS.text, cursor: "pointer", fontSize: 12,
                      marginBottom: 2, fontFamily: FONT, display: "flex",
                      alignItems: "center", gap: 8 }}>
                    <span style={{ width: 4, height: 18, background: cat?.color || COLORS.border,
                      borderRadius: 99, flexShrink: 0 }} />
                    <span style={{ fontSize: 9, color: COLORS.textMute, fontFamily: MONO, width: 28 }}>
                      L{c.l}
                    </span>
                    <span style={{ flex: 1 }}>{c.jp}</span>
                    {c.k && <span style={{ fontSize: 8, color: COLORS.accent, fontFamily: MONO,
                      fontWeight: 700 }}>★</span>}
                  </button>
                );
              })}
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 16, alignItems: "center" }}>
              <button onClick={runRemix} disabled={remixPicks.length < 2}
                style={{ padding: "11px 26px",
                  background: remixPicks.length < 2 ? COLORS.border : COLORS.accent,
                  border: "none", borderRadius: 8,
                  color: remixPicks.length < 2 ? COLORS.textMute : "#fff",
                  fontSize: 13, fontWeight: 700,
                  cursor: remixPicks.length < 2 ? "not-allowed" : "pointer",
                  fontFamily: FONT, letterSpacing: "0.02em",
                  boxShadow: remixPicks.length < 2 ? "none" : `0 4px 20px ${COLORS.accent}44` }}>
                🎛 Remix into hybrids
              </button>
              {remixPicks.length > 0 && (
                <button onClick={() => { setRemixPicks([]); setRemixOut(null); }}
                  style={{ padding: "10px 16px", background: "transparent",
                    border: `1px solid ${COLORS.border}`, borderRadius: 8,
                    color: COLORS.textDim, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: FONT }}>
                  Clear picks
                </button>
              )}
              <span style={{ fontSize: 11, color: COLORS.textMute, fontFamily: MONO }}>
                {remixPicks.length < 2 ? "Need at least 2 picks" : `${remixPicks.length} picked — ready to remix`}
              </span>
            </div>
          </div>

          {/* Remix output */}
          {remixOut && remixOut.length > 0 && (
            <div>
              <SectionLabel>2 · Remixed Hybrids</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
                gap: 14 }}>
                {remixOut.map((r, i) => (
                  <RemixCard key={i} remix={r} index={i} />
                ))}
              </div>
              <div style={{ marginTop: 20, padding: "14px 18px", background: COLORS.panel,
                border: `1px dashed ${COLORS.border}`, borderRadius: 8, fontSize: 11,
                color: COLORS.textMute, lineHeight: 1.6, fontFamily: MONO }}>
                💡 <strong style={{ color: COLORS.text }}>How remix works:</strong> The tool extracts semantic content from your picks (pain phrases, outcomes, numbers, verbs) and structural patterns (templates like「1日[N]分」or「[X]、でも[Y]」). Then it applies six transformations — pattern-transplant, content-splice, compression, question-flip, pain+data fusion, triplet rhythm — to produce genuinely new lines rather than just concatenating.
              </div>
            </div>
          )}
          {remixOut && remixOut.length === 0 && (
            <div style={{ padding: "20px", textAlign: "center", color: COLORS.textMute, fontSize: 12 }}>
              Couldn't form clean hybrids from these picks. Try different copies with more comma-separated structure.
            </div>
          )}
        </>
      )}
    </div>
  );
}

function VariantCard({ variant, index }) {
  const { check } = variant;
  const [copiedKey, setCopiedKey] = useState(null);

  const copy = (text, key) => {
    if (!text) return;
    // navigator.clipboard preferred; textarea fallback for wider compat
    const doCopy = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const el = document.createElement("textarea");
          el.value = text;
          el.setAttribute("readonly", "");
          el.style.position = "absolute";
          el.style.left = "-9999px";
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        }
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(k => k === key ? null : k), 1400);
      } catch (e) {
        console.error("Copy failed", e);
      }
    };
    doCopy();
  };

  const fullText = `${variant.headline}\n${variant.sub}\n[CTA: ${variant.cta}]`;

  return (
    <div style={{ background: COLORS.card,
      border: `1px solid ${check.pass ? COLORS.ok + "55" : COLORS.warn + "55"}`,
      borderRadius: 12, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, height: "100%", width: 3,
        background: check.pass ? COLORS.ok : COLORS.warn }} />

      {/* Top row: var label + archetype + score + Copy-all */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 99,
          background: COLORS.accent, color: "#fff", fontWeight: 700, fontFamily: MONO,
          letterSpacing: "0.08em" }}>VAR {index + 1}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.text }}>{variant.archetype}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99,
          background: check.pass ? COLORS.ok + "22" : COLORS.warn + "22",
          color: check.pass ? COLORS.ok : COLORS.warn,
          fontFamily: MONO, fontWeight: 700 }}>
          {check.pass ? "✓ PASS" : "⚠ REVIEW"} · {check.score}/10
        </span>
      </div>

      {/* Headline + per-field copy */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.4, color: "#fff",
          letterSpacing: "-0.02em", flex: 1 }}>
          {variant.headline}
        </div>
        <CopyBtn label="Headline" copied={copiedKey === `h-${index}`}
          onClick={() => copy(variant.headline, `h-${index}`)} />
      </div>

      {/* Sub + per-field copy */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
        <div style={{ fontSize: 13, color: COLORS.textDim, lineHeight: 1.6, flex: 1 }}>
          {variant.sub}
        </div>
        <CopyBtn label="Sub" copied={copiedKey === `s-${index}`}
          onClick={() => copy(variant.sub, `s-${index}`)} />
      </div>

      {/* CTA + per-field copy */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
        <div style={{ display: "inline-block", padding: "7px 16px", background: COLORS.accent,
          color: "#fff", borderRadius: 6, fontSize: 12, fontWeight: 700 }}>
          {variant.cta} →
        </div>
        <CopyBtn label="CTA" copied={copiedKey === `c-${index}`}
          onClick={() => copy(variant.cta, `c-${index}`)} />
        <span style={{ flex: 1 }} />
        <button onClick={() => copy(fullText, `all-${index}`)}
          style={{ fontSize: 10, padding: "5px 10px", borderRadius: 5,
            background: copiedKey === `all-${index}` ? COLORS.ok : COLORS.panel,
            border: `1px solid ${copiedKey === `all-${index}` ? COLORS.ok : COLORS.borderStrong}`,
            color: copiedKey === `all-${index}` ? "#fff" : COLORS.textDim,
            cursor: "pointer", fontWeight: 700, fontFamily: MONO,
            letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 120ms" }}>
          {copiedKey === `all-${index}` ? "✓ Copied!" : "📋 Copy all"}
        </button>
      </div>

      <div style={{ paddingTop: 10, borderTop: `1px solid ${COLORS.border}`,
        fontSize: 10.5, color: COLORS.textMute, lineHeight: 1.6 }}>
        <div style={{ marginBottom: 5 }}>
          <strong style={{ color: COLORS.textDim, fontFamily: MONO }}>Why this:</strong> {variant.rationale}
        </div>
        <div>
          <strong style={{ color: COLORS.textDim, fontFamily: MONO }}>Leans:</strong> {variant.leans}
        </div>
      </div>
      {check.violations.length > 0 && (
        <div style={{ marginTop: 10, padding: "6px 10px",
          background: COLORS.warn + "11", border: `1px solid ${COLORS.warn}44`,
          borderRadius: 6, fontSize: 10, color: COLORS.warn, fontFamily: MONO, lineHeight: 1.5 }}>
          🚩 {check.violations.map(v => v.label).join(" · ")}
        </div>
      )}
    </div>
  );
}

// Shared small Copy button for inline per-field copying
function CopyBtn({ label, copied, onClick }) {
  return (
    <button onClick={onClick} title={`Copy ${label}`}
      style={{ fontSize: 9, padding: "4px 8px", borderRadius: 4,
        background: copied ? COLORS.ok : "transparent",
        border: `1px solid ${copied ? COLORS.ok : COLORS.border}`,
        color: copied ? "#fff" : COLORS.textMute,
        cursor: "pointer", fontWeight: 700, fontFamily: MONO,
        letterSpacing: "0.06em", textTransform: "uppercase",
        flexShrink: 0, transition: "all 120ms", whiteSpace: "nowrap" }}>
      {copied ? "✓" : "📋"}
    </button>
  );
}

// Helper hook to share copy logic across cards
function useCopyToClipboard() {
  const [copiedKey, setCopiedKey] = useState(null);
  const copy = (text, key) => {
    if (!text) return;
    const doCopy = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          const el = document.createElement("textarea");
          el.value = text;
          el.setAttribute("readonly", "");
          el.style.position = "absolute";
          el.style.left = "-9999px";
          document.body.appendChild(el);
          el.select();
          document.execCommand("copy");
          document.body.removeChild(el);
        }
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(k => k === key ? null : k), 1400);
      } catch (e) {
        console.error("Copy failed", e);
      }
    };
    doCopy();
  };
  return { copiedKey, copy };
}

// Remix output card with a copy button
function RemixCard({ remix, index }) {
  const { copiedKey, copy } = useCopyToClipboard();
  const r = remix;
  return (
    <div style={{ background: COLORS.card,
      border: `1px solid ${r.check.pass ? COLORS.ok + "55" : COLORS.warn + "55"}`,
      borderRadius: 12, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 10, padding: "3px 9px", borderRadius: 99,
          background: COLORS.accent, color: "#fff", fontWeight: 700, fontFamily: MONO,
          letterSpacing: "0.08em" }}>{r.label}</span>
        <span style={{ flex: 1 }} />
        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 99,
          background: r.check.pass ? COLORS.ok + "22" : COLORS.warn + "22",
          color: r.check.pass ? COLORS.ok : COLORS.warn,
          fontFamily: MONO, fontWeight: 700 }}>
          {r.check.pass ? "✓ PASS" : "⚠ REVIEW"} · {r.check.score}/10
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10 }}>
        <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4, color: "#fff",
          letterSpacing: "-0.02em", flex: 1 }}>
          {r.jp}
        </div>
        <button onClick={() => copy(r.jp, `remix-${index}`)}
          style={{ fontSize: 10, padding: "5px 10px", borderRadius: 5,
            background: copiedKey === `remix-${index}` ? COLORS.ok : COLORS.panel,
            border: `1px solid ${copiedKey === `remix-${index}` ? COLORS.ok : COLORS.borderStrong}`,
            color: copiedKey === `remix-${index}` ? "#fff" : COLORS.textDim,
            cursor: "pointer", fontWeight: 700, fontFamily: MONO,
            letterSpacing: "0.06em", textTransform: "uppercase",
            flexShrink: 0, transition: "all 120ms", whiteSpace: "nowrap" }}>
          {copiedKey === `remix-${index}` ? "✓ Copied!" : "📋 Copy"}
        </button>
      </div>

      <div style={{ fontSize: 10.5, color: COLORS.textMute, fontStyle: "italic",
        marginBottom: 10, lineHeight: 1.4 }}>{r.note}</div>
      {r.how && (
        <div style={{ fontSize: 10, color: COLORS.accent, fontFamily: MONO,
          marginBottom: 10, lineHeight: 1.4,
          padding: "5px 8px", background: COLORS.accent + "08", borderRadius: 4 }}>
          {r.how}
        </div>
      )}
      <div style={{ paddingTop: 10, borderTop: `1px solid ${COLORS.border}`,
        fontSize: 10, color: COLORS.textMute, lineHeight: 1.6, fontFamily: MONO }}>
        <div style={{ color: COLORS.textDim, fontWeight: 700, marginBottom: 3,
          letterSpacing: "0.1em", textTransform: "uppercase" }}>Built from</div>
        {r.from.map((src, j) => (
          <div key={j} style={{ fontSize: 10.5, color: COLORS.textDim,
            marginBottom: 2, fontFamily: FONT, lineHeight: 1.4 }}>
            <span style={{ color: COLORS.accent, fontFamily: MONO, fontWeight: 700,
              marginRight: 6 }}>{String.fromCharCode(65 + j)}</span>
            {src.jp}
          </div>
        ))}
      </div>
      {r.check.violations.length > 0 && (
        <div style={{ marginTop: 10, padding: "6px 10px",
          background: COLORS.warn + "11", border: `1px solid ${COLORS.warn}44`,
          borderRadius: 6, fontSize: 10, color: COLORS.warn, fontFamily: MONO }}>
          🚩 {r.check.violations.map(v => v.label).join(" · ")}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// EVALUATE TAB
// =============================================================================
function EvaluateTab() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const evaluate = () => {
    if (!input.trim()) return;
    const check = runBrandChecks(input);
    // Speakness scores
    const witty = check.flags.frivolous ? 2 : /[！？w]|笑|^えっ|なんと|まさか/.test(input) ? 6 : 4;
    const authentic = check.flags.hyperbole ? 2 : check.flags.preachy ? 3 : 8;
    const confident = check.flags.hyperbole ? 3 : check.flags.hasData ? 7 : 5;
    const innovative = /AI|スマート|パーソナライズ|音声認識|独自/.test(input) ? 7 : 4;
    let primary = "Authentic";
    if (witty > confident && witty > innovative && witty > authentic) primary = "Witty";
    else if (confident >= authentic && confident >= innovative) primary = "Confident";
    else if (innovative >= authentic) primary = "Innovative";

    setResult({
      speakness: { authentic, confident, innovative, witty, primary },
      check,
      revision: check.pass ? null :
        check.flags.hyperbole ? "Rewrite tip: Drop the superlative. State the concrete outcome plainly." :
        check.flags.preachy ? "Rewrite tip: Speak peer-to-peer. Cut imperatives; acknowledge the effort." :
        check.flags.jargonLed ? "Rewrite tip: Lead with the user outcome. Tech can come after." :
        "Rewrite tip: Lead with outcome, anchor one claim with a number, keep under 80 chars."
    });
  };

  return (
    <div style={{ padding: "24px 34px", maxWidth: 960 }}>
      <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.03em" }}>
        ✅ Brand Fit Evaluator
      </h2>
      <p style={{ color: COLORS.textMute, fontSize: 12, margin: "0 0 22px" }}>
        Paste any Japanese copy. Same guardrails as the Factory — score + specific violations + rewrite tip.
      </p>
      <textarea value={input} onChange={e => setInput(e.target.value)}
        placeholder="ここに日本語コピーを貼り付け…（例：AIで英語、たった7日で誰でもペラペラ！）"
        style={{ width: "100%", minHeight: 110, padding: 16, background: COLORS.panel,
          border: `1px solid ${COLORS.border}`, borderRadius: 10, color: COLORS.text,
          fontSize: 14, fontFamily: FONT, lineHeight: 1.6, resize: "vertical", outline: "none" }} />
      <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
        <button onClick={evaluate} style={{ padding: "10px 22px", background: COLORS.accent,
          border: "none", borderRadius: 8, color: "#fff", fontSize: 13, fontWeight: 700,
          cursor: "pointer", fontFamily: FONT }}>Evaluate</button>
        {input && (<button onClick={() => { setInput(""); setResult(null); }}
          style={{ padding: "10px 16px", background: "transparent",
            border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.textDim,
            fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: FONT }}>Clear</button>)}
      </div>

      {result && (
        <div style={{ marginTop: 26 }}>
          <div style={{ padding: "16px 20px",
            background: result.check.pass ? COLORS.ok + "11" : COLORS.warn + "11",
            border: `1px solid ${result.check.pass ? COLORS.ok : COLORS.warn}`,
            borderRadius: 10, marginBottom: 18, display: "flex", justifyContent: "space-between",
            alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em",
              color: result.check.pass ? COLORS.ok : COLORS.warn, fontFamily: MONO,
              textTransform: "uppercase" }}>
              {result.check.pass ? "TO-BE aligned ✓" : "Needs work"}
            </span>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 99,
              background: result.check.pass ? COLORS.ok : COLORS.warn, color: "#fff",
              fontWeight: 700, fontFamily: MONO }}>{result.check.score}/10</span>
          </div>

          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
            <SectionLabel>Speakness · Primary: {result.speakness.primary}</SectionLabel>
            <ScoreRow label="Authentic (core)" score={result.speakness.authentic} color="#10B981" />
            <ScoreRow label="Confident" score={result.speakness.confident} color="#3B82F6" />
            <ScoreRow label="Innovative" score={result.speakness.innovative} color="#8B5CF6" />
            <ScoreRow label="Witty" score={result.speakness.witty} color="#F59E0B" />
          </div>

          {result.check.violations.length > 0 && (
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.warn}44`,
              borderRadius: 10, padding: "16px 20px", marginBottom: 16 }}>
              <SectionLabel>Violations</SectionLabel>
              {result.check.violations.map((v, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "6px 0",
                  fontSize: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4,
                    background: v.sev === "high" ? COLORS.bad : COLORS.warn, color: "#fff",
                    fontFamily: MONO, fontWeight: 700 }}>{v.code}</span>
                  <span style={{ color: COLORS.text }}>{v.label}</span>
                </div>
              ))}
            </div>
          )}

          {result.revision && (
            <div style={{ background: COLORS.accent + "11", border: `1px solid ${COLORS.accent}`,
              borderRadius: 10, padding: "16px 20px" }}>
              <SectionLabel color={COLORS.accent}>Rewrite direction</SectionLabel>
              <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>{result.revision}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// CHANNELS TAB
// =============================================================================
function ChannelsTab() {
  const [selected, setSelected] = useState(null);
  const ch = JP_CHANNELS.find(c => c.id === selected);
  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 130px)" }}>
      <div style={{ width: 260, borderRight: `1px solid ${COLORS.border}`, padding: "20px 16px" }}>
        <SectionLabel>Channel rules</SectionLabel>
        {JP_CHANNELS.map(c => (
          <button key={c.id} onClick={() => setSelected(c.id)}
            style={{ display: "block", width: "100%", padding: "10px 12px",
              background: selected === c.id ? COLORS.card : "transparent",
              border: `1px solid ${selected === c.id ? COLORS.accent : COLORS.border}`,
              borderRadius: 8, color: selected === c.id ? COLORS.accent : COLORS.text,
              fontSize: 12, textAlign: "left", cursor: "pointer", fontWeight: 600,
              marginBottom: 4, fontFamily: FONT }}>
            {c.label}
            <div style={{ fontSize: 10, color: COLORS.textMute, marginTop: 2,
              fontWeight: 400, fontFamily: MONO }}>L{c.levels.join(" · L")}</div>
          </button>
        ))}
      </div>
      <div style={{ flex: 1, padding: "28px 34px" }}>
        {!ch ? (
          <div style={{ textAlign: "center", padding: "80px 20px", color: COLORS.textMute, fontSize: 13 }}>
            ← Select a channel
          </div>
        ) : (
          <>
            <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.03em" }}>
              📡 {ch.label}
            </h2>
            <div style={{ fontSize: 10, color: COLORS.textMute, marginBottom: 18,
              letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: MONO }}>
              Uses levels: {ch.levels.map(l => `L${l}`).join(" · ")}
            </div>
            <div style={{ padding: "16px 20px", background: COLORS.card,
              border: `1px solid ${COLORS.borderStrong}`, borderLeft: `3px solid ${COLORS.accent}`,
              borderRadius: 8, fontSize: 13, lineHeight: 1.7, color: COLORS.textDim, marginBottom: 22 }}>
              <strong style={{ color: COLORS.text, fontFamily: MONO, fontSize: 11, letterSpacing: "0.08em" }}>RULE</strong>
              <br />{ch.rule}
            </div>
            <SectionLabel>Format options</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 10, marginBottom: 28 }}>
              {ch.formats.map(f => (
                <div key={f.id} style={{ padding: "12px 14px", background: COLORS.card,
                  border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12,
                  color: COLORS.text, fontWeight: 500 }}>{f.label}</div>
              ))}
            </div>
            <SectionLabel>Suggested copy for this channel</SectionLabel>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 10 }}>
              {COPIES.filter(x => ch.levels.includes(x.l) && x.k).slice(0, 9).map((x, i) => {
                const cat = CATEGORIES.find(c => c.id === x.l);
                return (
                  <div key={i} style={{ padding: "10px 14px", background: COLORS.card,
                    border: `1px solid ${COLORS.border}`,
                    borderLeft: `3px solid ${cat?.color || COLORS.accent}`,
                    borderRadius: 6, fontSize: 12, lineHeight: 1.5 }}>
                    {x.jp}
                    <div style={{ fontSize: 10, color: COLORS.textMute, marginTop: 5, fontFamily: MONO }}>
                      L{x.l} · {x.s}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================================================
// SHARED UI COMPONENTS
// =============================================================================
function Tag({ children, color, dim }) {
  return (
    <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 99,
      background: dim ? color + "18" : color + "33", color, fontWeight: 700,
      letterSpacing: "0.03em", fontFamily: MONO, textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function SectionLabel({ children, color }) {
  return (
    <div style={{ fontSize: 10, color: color || COLORS.textMute, fontWeight: 700,
      letterSpacing: "0.12em", marginBottom: 10, textTransform: "uppercase", fontFamily: MONO }}>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, color, label }) {
  return (
    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11,
      cursor: "pointer", padding: "7px 12px",
      background: checked ? color + "22" : COLORS.panel,
      border: `1px solid ${checked ? color : COLORS.border}`,
      borderRadius: 8, userSelect: "none",
      color: checked ? color : COLORS.textDim, fontWeight: 600 }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
        style={{ accentColor: color }} />
      {label}
    </label>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 10, padding: "14px 18px" }}>
      <div style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO,
        letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, fontFamily: MONO,
        letterSpacing: "-0.03em" }}>{value}</div>
    </div>
  );
}

function Metric({ label, value, good }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 9, color: COLORS.textMute, fontFamily: MONO,
        textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{label}</div>
      <div style={{ fontSize: 13, fontWeight: 700,
        color: good === true ? COLORS.ok : good === false ? COLORS.textMute : COLORS.text,
        fontFamily: MONO }}>{value}</div>
    </div>
  );
}

function FilterPill({ label, active, onClick, color }) {
  const c = color || COLORS.accent;
  return (
    <button onClick={onClick} style={{ padding: "5px 12px",
      background: active ? c + "22" : "transparent",
      border: `1px solid ${active ? c : COLORS.border}`,
      borderRadius: 99, color: active ? c : COLORS.textDim, fontSize: 11,
      cursor: "pointer", fontWeight: 600, fontFamily: FONT }}>{label}</button>
  );
}

function StatusDot({ status }) {
  const map = { live: COLORS.ok, paused: COLORS.warn, archived: COLORS.bad };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10,
      color: map[status], fontFamily: MONO, fontWeight: 700, textTransform: "uppercase",
      letterSpacing: "0.08em" }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: map[status],
        boxShadow: status === "live" ? `0 0 8px ${map[status]}` : "none" }} />
      {status}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 10, color: COLORS.textMute, fontFamily: MONO,
        letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6, fontWeight: 600 }}>
        {label}
      </div>
      {children}
    </div>
  );
}

function ScoreRow({ label, score, color, max = 10 }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11,
        marginBottom: 3, color: COLORS.textDim }}>
        <span>{label}</span>
        <span style={{ fontFamily: MONO, color }}>{score}/{max}</span>
      </div>
      <div style={{ width: "100%", height: 5, background: COLORS.border,
        borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${(score / max) * 100}%`, height: "100%",
          background: color, transition: "width 280ms ease-out" }} />
      </div>
    </div>
  );
}

const selectStyle = {
  padding: "9px 12px", background: COLORS.panel, border: `1px solid ${COLORS.border}`,
  borderRadius: 6, color: COLORS.text, fontSize: 12, fontFamily: FONT, outline: "none",
  cursor: "pointer", width: "100%",
};

// ============================================================
// MARKET SWITCHER — Top-level App
// ============================================================
export default function App() {
  const [market, setMarket] = useState(() => {
    try { return localStorage.getItem("speak_market") || "kr"; } catch { return "kr"; }
  });
  const switchMarket = (m) => {
    setMarket(m);
    try { localStorage.setItem("speak_market", m); } catch {}
  };

  return (
    <div style={{minHeight:"100vh",background:"#F8F9FB"}}>
      {/* Market Switcher Bar */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:6,padding:"10px 0",background:"#FFFFFF",borderBottom:"1px solid #E2E4E8"}}>
        <span style={{fontSize:12,color:"#9CA3AF",marginRight:8,fontWeight:500}}>Market</span>
        {[
          {id:"kr",flag:"🇰🇷",label:"Korea"},
          {id:"jp",flag:"🇯🇵",label:"Japan"},
        ].map(m=>(
          <button key={m.id} onClick={()=>switchMarket(m.id)} style={{
            padding:"6px 16px",borderRadius:8,border:market===m.id?"2px solid #1C49FF":"1px solid #E2E4E8",
            background:market===m.id?"#EEF2FF":"#FFFFFF",color:market===m.id?"#1C49FF":"#374151",
            fontSize:13,fontWeight:market===m.id?700:400,cursor:"pointer",fontFamily:"'Pretendard','Inter',sans-serif",
            display:"flex",alignItems:"center",gap:6
          }}>
            <span style={{fontSize:16}}>{m.flag}</span> {m.label}
          </button>
        ))}
      </div>

      {/* Render selected market */}
      {market === "kr" && <SpeakKR />}
      {market === "jp" && <SpeakJP />}
    </div>
  );
}
