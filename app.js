// ── Configuration & Security ────────────────────────────────────────────────
const CONFIG = {
  API_KEY: 'AIzaSyC9JFBaS5xnNt6CYXHWTzNIl7hBMSJrUCQ',
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};

const API_URL = `${CONFIG.BASE_URL}?key=${CONFIG.API_KEY}`;

const UI_STRINGS = {
  en: {
    onboarding: [
      { q: 'Are you registered to vote?', h: 'Helps tailor your roadmap.', c: ['✅ Yes', '❌ No', '🤔 Unsure'] },
      { q: 'Do you have Voter ID?', h: 'Other IDs work too.', c: ['📄 Yes', '😟 No'] },
      { q: 'Enter Pincode', h: 'e.g. 395006 for Surat', p: 'Pincode' }
    ],
    nav: ['Registration', 'Documents', 'Booth Finder', 'Poll Day'],
    phases: ['Phase 1 of 4', 'Phase 2 of 4', 'Phase 3 of 4', 'Phase 4 of 4'],
    buttons: { next: 'Next', back: 'Back', continue: 'Continue →', register: 'Register Now', download: 'Download', share: 'Share' },
    titles: { reg: 'Registration Status', docs: 'Document Preparation', booth: 'Find Polling Booth', vote: 'Poll Day Guide' },
    docs: ['Voter ID (EPIC Card)','Aadhaar Card','PAN Card','Driving License','Passport','Class X/XII Certificate'],
    steps: [
      {n:1,e:'🏫',t:'Reach the Booth',d:'Arrive early. Carry your Voter ID or any valid photo ID.'},
      {n:2,e:'🪪',t:'Identity Check',d:'Officer checks your name in the electoral roll & verifies your ID.'},
      {n:3,e:'👆',t:'Ink & Register',d:'Finger inked with indelible ink. Sign register (Form 17A).'},
      {n:4,e:'🗳️',t:'Cast Your Vote',d:'Press the blue button beside your candidate on the EVM. Wait for the beep.'},
      {n:5,e:'📋',t:'VVPAT Check',d:'Check VVPAT window for 7 seconds to confirm your vote.'}
    ]
  },
  gu: {
    onboarding: [
      { q: 'શું તમે મતદાન કરવા માટે નોંધાયેલા છો?', h: 'તમારા રોડમેપને તૈયાર કરવામાં મદદ કરે છે.', c: ['✅ હા', '❌ ના', '🤔 ખાતરી નથી'] },
      { q: 'શું તમારી પાસે વોટર આઈડી છે?', h: 'અન્ય આઈડી પણ કામ કરે છે.', c: ['📄 હા', '😟 ના'] },
      { q: 'પિનકોડ દાખલ કરો', h: 'દા.ત. સુરત માટે 395006', p: 'પિનકોડ' }
    ],
    nav: ['નોંધણી', 'દસ્તાવેજો', 'બૂથ શોધો', 'મતદાન દિવસ'],
    phases: ['તબક્કો 1 થી 4', 'તબક્કો 2 થી 4', 'તબક્કો 3 થી 4', 'તબક્કો 4 થી 4'],
    buttons: { next: 'આગળ', back: 'પાછળ', continue: 'આગળ વધો →', register: 'હમણાં નોંધણી કરો', download: 'ડાઉનલોડ', share: 'શેર કરો' },
    titles: { reg: 'નોંધણી સ્થિતિ', docs: 'દસ્તાવેજ તૈયારી', booth: 'મતદાન મથક શોધો', vote: 'મતદાન દિવસ માર્ગદર્શિકા' },
    docs: ['ચૂંટણી કાર્ડ (EPIC)', 'આધાર કાર્ડ', 'પાન કાર્ડ', 'ડ્રાઇવિંગ લાયસન્સ', 'પાસપોર્ટ', 'ધોરણ 10/12 નું પ્રમાણપત્ર'],
    steps: [
      {n:1,e:'🏫',t:'મથક પર પહોંચો',d:'વહેલા પહોંચો. તમારું વોટર આઈડી અથવા કોઈપણ માન્ય ફોટો આઈડી સાથે રાખો.'},
      {n:2,e:'🪪',t:'ઓળખ તપાસ',d:'અધિકારી મતદાર યાદીમાં તમારું નામ તપાસે છે અને તમારી આઈડીની ચકાસણી કરે છે.'},
      {n:3,e:'👆',t:'શાહી અને નોંધણી',d:'આંગળી પર અમીટ શાહી લગાવવામાં આવે છે. રજિસ્ટર (ફોર્મ 17A) માં સહી કરો.'},
      {n:4,e:'🗳️',t:'તમારો મત આપો',d:'EVM પર તમારા ઉમેદવારની બાજુનું બ્લુ બટન દબાવો. બીપ અવાજની રાહ જુઓ.'},
      {n:5,e:'📋',t:'VVPAT તપાસ',d:'તમારા મતની પુષ્ટિ કરવા માટે 7 સેકન્ડ માટે VVPAT વિન્ડો તપાસો.'}
    ]
  },
  hi: {
    onboarding: [
      { q: 'क्या आप वोट देने के लिए पंजीकृत हैं?', h: 'आपके रोडमैप को तैयार करने में मदद करता है।', c: ['✅ हाँ', '❌ नहीं', '🤔 पक्का नहीं'] },
      { q: 'क्या आपके पास वोटर आईडी है?', h: 'अन्य आईडी भी काम करती हैं।', c: ['📄 हाँ', '😟 नहीं'] },
      { q: 'पिनकोड दर्ज करें', h: 'उदा. सूरत के लिए 395006', p: 'पिनकोड' }
    ],
    nav: ['पंजीकरण', 'दस्तावेज', 'बूथ खोजें', 'मतदान दिवस'],
    phases: ['चरण 1 से 4', 'चरण 2 से 4', 'चरण 3 से 4', 'चरण 4 से 4'],
    buttons: { next: 'अगला', back: 'पीछे', continue: 'आगे बढ़ें →', register: 'अभी पंजीकरण करें', download: 'डाउनलोड', share: 'शेयर करें' },
    titles: { reg: 'पंजीकरण स्थिति', docs: 'दस्तावेज तैयारी', booth: 'मतदान केंद्र खोजें', vote: 'मतदान दिवस गाइड' },
    docs: ['वोटर आईडी (EPIC)', 'आधार कार्ड', 'पैन कार्ड', 'ड्राइविंग लाइसेंस', 'पासपोर्ट', 'कक्षा 10/12 का प्रमाण पत्र'],
    steps: [
      {n:1,e:'🏫',t:'बूथ पर पहुंचें',d:'जल्दी पहुंचें। अपना वोटर आईडी या कोई भी वैध फोटो आईडी साथ रखें।'},
      {n:2,e:'🪪',t:'पहचान की जाँच',d:'अधिकारी मतदाता सूची में आपका नाम जांचता है और आपकी आईडी सत्यापित करता है।'},
      {n:3,e:'👆',t:'स्याही और पंजीकरण',d:'उंगली पर अमिट स्याही लगाई जाती है। रजिस्टर (फॉर्म 17A) पर हस्ताक्षर करें।'},
      {n:4,e:'🗳️',t:'अपना वोट डालें',d:'EVM पर अपने उम्मीदवार के बगल वाला नीला बटन दबाएं। बीप की प्रतीक्षा करें।'},
      {n:5,e:'📋',t:'VVPAT जाँच',d:'अपने वोट की पुष्टि के लिए 7 सेकंड तक VVPAT विंडो देखें।'}
    ]
  }
};

const DATA = {
  links: {
    search: 'https://electoralsearch.eci.gov.in/',
    register: 'https://voters.eci.gov.in/registration/form6'
  }
};

let state = { phase: 1, mode: 'normal', lang: 'en', registered: null, hasID: null, pincode: '' };

// ── Onboarding ──────────────────────────────────────────────────────────────
function startOnboarding() {
  document.getElementById('screen-hero').classList.add('hidden');
  document.getElementById('screen-onboarding').classList.remove('hidden');
  renderQuestion(0);
}

function renderQuestion(idx) {
  const area = document.getElementById('onboarding-area');
  const s = UI_STRINGS[state.lang];
  const q = s.onboarding[idx];
  if (!q) { launchDashboard(); return; }

  area.innerHTML = `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm fade-in">
      <h3 class="text-lg font-bold text-gray-900 mb-1">${q.q}</h3>
      <p class="text-sm text-gray-500 mb-4">${q.h}</p>
      ${q.p ? `
        <input id="pincode-input" type="tel" maxlength="6" class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg font-bold" placeholder="${q.p}">
        <button onclick="submitPincode()" class="mt-3 w-full btn-main bg-primary text-white justify-center">${s.buttons.continue}</button>
      ` : `
        <div class="flex flex-col gap-2">
          ${q.c.map((l,i)=>`<button onclick="selectChip('${idx===0?'q1':'q2'}','${i===0?'yes':i===1?'no':'unsure'}')" class="chip text-left px-4 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-800 hover:border-primary hover:bg-blue-50">${l}</button>`).join('')}
        </div>
      `}
    </div>
  `;
}

function selectChip(qid, val) {
  if (qid==='q1') state.registered = val;
  if (qid==='q2') state.hasID = val;
  renderQuestion(state.registered && state.hasID ? 2 : 1);
}

function submitPincode() {
  state.pincode = document.getElementById('pincode-input').value;
  launchDashboard();
}

function launchDashboard() {
  document.getElementById('screen-onboarding').classList.add('hidden');
  document.getElementById('screen-dashboard').classList.remove('hidden');
  translateUI();
  showPhase(1);
}

// ── Dashboard Logic ──────────────────────────────────────────────────────────
function setMode(v) { 
  state.mode = v; 
  state.lang = (v === 'gu' || v === 'hi') ? v : 'en';
  translateUI();
  showPhase(state.phase); 
}

function translateUI() {
  const s = UI_STRINGS[state.lang];
  // Translate Sidebar
  document.querySelectorAll('.sidebar-nav').forEach((el, i) => {
    if(s.nav[i]) el.textContent = s.nav[i];
  });
  // Translate Progress Labels
  document.querySelectorAll('#journey-progress span').forEach((el, i) => {
    if(s.nav[i]) el.textContent = s.nav[i].split(' ')[0];
  });
  // Update Header Title
  const titleEl = document.getElementById('dash-title');
  if(titleEl) titleEl.textContent = Object.values(s.titles)[state.phase-1];
}

function updateNav(p) {
  state.phase = p;
  document.querySelectorAll('.sidebar-nav').forEach((el,i)=>{
    const active = i+1===p;
    el.classList.toggle('bg-blue-50', active);
    el.classList.toggle('text-primary', active);
    el.classList.toggle('font-bold', active);
    el.setAttribute('aria-current', active ? 'page' : 'false');
  });

  [1,2,3,4].forEach(n=>{
    const el = document.getElementById('step-'+n);
    if(!el) return;
    const circle = el.querySelector('div');
    if (n < p) { circle.className='w-9 h-9 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold'; circle.innerHTML='✓'; }
    else if (n===p) { circle.className='w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shadow-lg'; circle.innerHTML=n; }
    else { circle.className='w-9 h-9 rounded-full bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center text-xs font-bold'; circle.innerHTML=n; }
    const line = document.getElementById('line-'+n);
    if(line) line.className='flex-1 h-0.5 '+(n<p?'bg-secondary':'bg-gray-200');
  });
}

function showPhase(p) {
  updateNav(p);
  const s = UI_STRINGS[state.lang];
  const c = document.getElementById('phase-content');
  const phases = [null, phase1, phase2, phase3, phase4];
  
  document.getElementById('dash-title').textContent = Object.values(s.titles)[p-1];
  c.innerHTML = `<div class="fade-in max-w-2xl mx-auto">${phases[p](s)}</div>`;
  askAI(p);
  if(p===2) restoreChecklist();
  window.scrollTo(0,0);
}

function phase1(s) {
  const isReg = state.registered==='yes';
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <span class="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">${s.phases[0]}</span>
      <h2 class="text-xl font-bold text-gray-900 mt-2 mb-4">${s.titles.reg}</h2>
      ${isReg ? `
        <div class="bg-green-50 p-4 rounded-xl mb-4 text-green-800 text-sm font-medium border border-green-100">✅ Verification required. Ensure your name is in the roll.</div>
        <a href="${DATA.links.search}" target="_blank" class="btn-main bg-primary text-white w-full justify-center">🔍 Verify Roll</a>
      ` : `
        <div class="bg-red-50 p-4 rounded-xl mb-4 text-red-800 text-sm font-medium border border-red-100">⚠️ Registration is mandatory to vote.</div>
        <a href="${DATA.links.register}" target="_blank" class="btn-main bg-primary text-white w-full justify-center">📝 ${s.buttons.register}</a>
      `}
      <div id="ai-area" class="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[80px]" aria-live="polite"><span class="ai-loading">🤖 AI Loading...</span></div>
    </div>
    <button onclick="showPhase(2)" class="mt-4 btn-main bg-secondary text-white w-full justify-center">${s.buttons.next} →</button>
  `;
}

function phase2(s) {
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <span class="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">${s.phases[1]}</span>
      <h2 class="text-xl font-bold text-gray-900 mt-2 mb-4">${s.titles.docs}</h2>
      <div class="space-y-2" id="doc-checklist">
        ${s.docs.map((d,i)=>`<label class="flex items-center gap-3 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50"><input type="checkbox" onchange="saveDoc(${i},this.checked)" class="accent-primary"> <span class="text-sm font-medium text-gray-700">${d}</span></label>`).join('')}
      </div>
      <div id="ai-area" class="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[80px]" aria-live="polite"><span class="ai-loading">🤖 AI Loading...</span></div>
    </div>
    <div class="flex gap-3 mt-4">
      <button onclick="showPhase(1)" class="btn-main bg-white border border-gray-200 text-gray-700 flex-1 justify-center">${s.buttons.back}</button>
      <button onclick="showPhase(3)" class="btn-main bg-secondary text-white flex-1 justify-center">${s.buttons.next}</button>
    </div>
  `;
}

function phase3(s) {
  const pin = state.pincode || '395006';
  const mapsUrl = `https://www.google.com/maps/search/Polling+Station+near+${pin}`;
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <span class="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">${s.phases[2]}</span>
      <h2 class="text-xl font-bold text-gray-900 mt-2 mb-4">${s.titles.booth}</h2>
      <a href="${mapsUrl}" target="_blank" class="btn-main bg-primary text-white w-full justify-center mb-3">🗺️ Open Google Maps (Near ${pin})</a>
      ${pin.startsWith('395') ? `<a href="surat-north-booths.pdf" target="_blank" class="btn-main bg-white border border-primary text-primary w-full justify-center text-sm">📄 Official Surat List (PDF)</a>` : ''}
      <button onclick="generateICS()" class="mt-3 btn-main bg-amber-500 text-white w-full justify-center text-sm">📅 Set Calendar Reminder</button>
      <div id="ai-area" class="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[80px]" aria-live="polite"><span class="ai-loading">🤖 AI Loading...</span></div>
    </div>
    <div class="flex gap-3 mt-4">
      <button onclick="showPhase(2)" class="btn-main bg-white border border-gray-200 text-gray-700 flex-1 justify-center">${s.buttons.back}</button>
      <button onclick="showPhase(4)" class="btn-main bg-secondary text-white flex-1 justify-center">${s.buttons.next}</button>
    </div>
  `;
}

function phase4(s) {
  return `
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <span class="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">${s.phases[3]}</span>
      <h2 class="text-xl font-bold text-gray-900 mt-2 mb-4">${s.titles.vote}</h2>
      <div class="space-y-4">
        ${s.steps.map(st=>`<div class="flex gap-4 items-start"><div class="w-7 h-7 rounded-full bg-blue-50 text-primary flex items-center justify-center font-bold text-xs shrink-0">${st.n}</div><div><p class="font-bold text-sm text-gray-900">${st.e} ${st.t}</p><p class="text-xs text-gray-500">${st.d}</p></div></div>`).join('')}
      </div>
      <div id="ai-area" class="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[80px]" aria-live="polite"><span class="ai-loading">🤖 AI Loading...</span></div>
    </div>
    <div class="bg-primary rounded-2xl p-6 text-white text-center mt-4">
      <p class="font-bold text-lg">🎉 Ready to Vote!</p>
      <button onclick="share()" class="mt-3 btn-main bg-white text-primary text-sm justify-center">${s.buttons.share}</button>
    </div>
  `;
}

// ── AI & Utilities ───────────────────────────────────────────────────────────
async function askAI(phase) {
  const area = document.getElementById('ai-area');
  if(!area) return;
  const prompts = [null, 
    `Tip for registration status "${state.registered}". Gujarat 2026. Max 2 sentences.`,
    `Tip for ID prep. Max 2 sentences.`,
    `Tip for booth discovery near ${state.pincode}. Max 2 sentences.`,
    `Motivational poll day tip. Max 2 sentences.`
  ];
  const system = `You are CivicGuide AI. Reply in ${state.lang==='gu'?'Gujarati':state.lang==='hi'?'Hindi':'English'}. Be helpful.`;
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        system_instruction: {parts:[{text:system}]},
        contents: [{parts:[{text: prompts[phase]}]}]
      })
    });
    const data = await res.json();
    area.innerHTML = `<strong>🤖 AI:</strong> ${data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Check ECI website.'}`;
  } catch(e) { area.innerHTML = '🤖 Tip: Be early at the booth!'; }
}

function saveDoc(i, c) { let d = JSON.parse(localStorage.getItem('cg-docs')||'{}'); d[i]=c; localStorage.setItem('cg-docs', JSON.stringify(d)); }
function restoreChecklist() { let d = JSON.parse(localStorage.getItem('cg-docs')||'{}'); document.querySelectorAll('#doc-checklist input').forEach((el,i)=>el.checked=!!d[i]); }
function generateICS() { window.location.href = 'data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:20260426T060000Z%0ADTEND:20260426T170000Z%0ASUMMARY:Gujarat Election 2026%0AEND:VEVENT%0AEND:VCALENDAR'; }
function share() { navigator.share ? navigator.share({title:'CivicGuide', url:location.href}) : alert('Link copied!'); }
function downloadChecklist() {
  const txt = `CivicGuide AI Checklist\nPincode: ${state.pincode||'N/A'}\n\nPolling Date: April 26, 2026\nVerify at: civic-guideai-391613367603.us-central1.run.app`;
  const blob = new Blob([txt],{type:'text/plain'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Voter_Checklist.txt';
  a.click();
}

function share() {
  const url = location.href;
  if (navigator.share) {
    navigator.share({title:'CivicGuide AI', text:'Your voter guide!', url});
  } else {
    navigator.clipboard.writeText(url).then(()=>alert('Link copied!'));
  }
}

// Security: Log start but don't expose keys in console
console.log('CivicGuide AI Engine Initialized.');

