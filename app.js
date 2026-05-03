// ── Configuration & Security ────────────────────────────────────────────────
const CONFIG = {
  API_KEY: 'AIzaSyC9JFBaS5xnNt6CYXHWTzNIl7hBMSJrUCQ',
  BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'
};

const API_URL = `${CONFIG.BASE_URL}?key=${CONFIG.API_KEY}`;

const DATA = {
  docs: ['Voter ID (EPIC Card)','Aadhaar Card','PAN Card','Driving License','Passport','Class X/XII Certificate'],
  steps: [
    {n:1,e:'🏫',t:'Reach the Booth',d:'Arrive early. Carry your Voter ID or any valid photo ID.'},
    {n:2,e:'🪪',t:'Identity Check',d:'Officer checks your name in the electoral roll & verifies your ID.'},
    {n:3,e:'👆',t:'Ink & Register',d:'Finger inked with indelible ink. Sign register (Form 17A).'},
    {n:4,e:'🗳️',t:'Cast Your Vote',d:'Press the blue button beside your candidate on the EVM. Wait for the beep.'},
    {n:5,e:'📋',t:'VVPAT Check',d:'Check VVPAT window for 7 seconds to confirm your vote.'}
  ],
  etiquette: ['No phones/cameras inside booth','Maintain vote secrecy','Follow queue — seniors/PWD get priority','No campaigning within 100m of booth'],
  links: {
    search: 'https://electoralsearch.eci.gov.in/',
    register: 'https://voters.eci.gov.in/registration/form6',
    booth: 'https://voters.eci.gov.in/know-your-polling-station'
  }
};

let state = { phase: 1, mode: 'normal', registered: null, hasID: null, pincode: '' };

// ── Onboarding ──────────────────────────────────────────────────────────────
const questions = [
  {
    id: 'q1', label: 'Are you registered to vote?',
    hint: 'This helps us guide your first step.',
    chips: [
      {v:'yes', label:'✅ Yes, I am registered'},
      {v:'no',  label:'❌ No, I\'m not registered'},
      {v:'unsure', label:'🤔 Not sure / Don\'t know'}
    ]
  },
  {
    id: 'q2', label: 'Do you have your Voter ID card?',
    hint: 'You can vote with other valid IDs too.',
    chips: [
      {v:'yes', label:'📄 Yes, I have it'},
      {v:'no',  label:'😟 No / Lost it'}
    ]
  },
  {
    id: 'q3', label: 'Enter your Area Pincode',
    hint: 'e.g. 395006 for Varachha, Surat',
    input: true
  }
];

let currentQ = 0;

function startOnboarding() {
  document.getElementById('screen-hero').classList.add('hidden');
  document.getElementById('screen-onboarding').classList.remove('hidden');
  renderQuestion(0);
}

function renderQuestion(idx) {
  const area = document.getElementById('onboarding-area');
  const q = questions[idx];
  if (!q) { launchDashboard(); return; }

  const div = document.createElement('div');
  div.className = 'bg-white rounded-2xl border border-gray-200 p-6 shadow-sm fade-in';
  div.innerHTML = `
    <div class="flex items-center justify-between mb-1" aria-hidden="true">
      <span class="text-xs font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-full">Question ${idx+1} of 3</span>
      <div class="flex gap-1">${[0,1,2].map(i=>`<div class="h-1.5 w-8 rounded-full ${i<=idx?'bg-primary':'bg-gray-200'}"></div>`).join('')}</div>
    </div>
    <h3 class="text-lg font-bold text-gray-900 mt-3 mb-1" id="q-label-${idx}">${q.label}</h3>
    <p class="text-sm text-gray-500 mb-4">${q.hint}</p>
    ${q.input ? `
      <input id="pincode-input" type="tel" maxlength="6" aria-labelledby="q-label-${idx}" placeholder="Enter 6-digit pincode" 
        class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none focus:border-primary transition-colors">
      <button onclick="submitPincode()" class="mt-3 w-full btn-main bg-primary text-white justify-center">Continue →</button>
    ` : `
      <div class="flex flex-col gap-2" role="radiogroup" aria-labelledby="q-label-${idx}">
        ${q.chips.map(c=>`<button onclick="selectChip('${q.id}','${c.v}')" role="radio" 
          class="chip text-left px-4 py-3 rounded-xl border-2 border-gray-200 font-semibold text-gray-800 hover:border-primary hover:bg-blue-50">
          ${c.label}
        </button>`).join('')}
      </div>
    `}
  `;
  area.appendChild(div);
  // Accessibility: Focus the new question
  const firstBtn = div.querySelector('button, input');
  if (firstBtn) setTimeout(() => firstBtn.focus(), 500);
}

function selectChip(qid, val) {
  if (qid==='q1') state.registered = val;
  if (qid==='q2') state.hasID = val;
  currentQ++;
  renderQuestion(currentQ);
}

function submitPincode() {
  const v = document.getElementById('pincode-input').value.trim();
  if (v.length < 4) { 
    alert('Please enter a valid pincode'); 
    return; 
  }
  state.pincode = v;
  launchDashboard();
}

function launchDashboard() {
  document.getElementById('screen-onboarding').classList.add('hidden');
  document.getElementById('screen-dashboard').classList.remove('hidden');
  showPhase(1);
}

// ── Dashboard ────────────────────────────────────────────────────────────────
function setMode(v) { 
  state.mode = v; 
  showPhase(state.phase); 
}

function updateNav(p) {
  state.phase = p;
  document.querySelectorAll('.sidebar-nav').forEach((el,i)=>{
    const isActive = i+1===p;
    el.classList.toggle('bg-blue-50', isActive);
    el.classList.toggle('text-primary', isActive);
    el.classList.toggle('font-bold', isActive);
    el.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  [1,2,3,4].forEach(n=>{
    const el = document.getElementById('step-'+n);
    if (!el) return;
    const circle = el.querySelector('div');
    const lbl = el.querySelector('span');
    if (n < p) {
      circle.className='w-8 h-8 rounded-full border-2 border-secondary bg-secondary text-white flex items-center justify-center text-xs font-bold transition-all';
      circle.innerHTML='✓';
      circle.setAttribute('aria-label', `Step ${n} completed`);
    } else if (n===p) {
      circle.className='w-8 h-8 rounded-full border-2 border-primary bg-primary text-white flex items-center justify-center text-xs font-bold transition-all';
      circle.innerHTML=n;
      circle.setAttribute('aria-label', `Step ${n} active`);
      if(lbl){lbl.className='text-xs font-bold text-primary hidden sm:block';}
    } else {
      circle.className='w-8 h-8 rounded-full border-2 border-gray-300 bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold transition-all';
      circle.innerHTML=n;
      circle.setAttribute('aria-label', `Step ${n} pending`);
      if(lbl){lbl.className='text-xs font-medium text-gray-400 hidden sm:block';}
    }
    const line = document.getElementById('line-'+n);
    if(line) line.className='flex-1 h-0.5 '+(n<p?'bg-secondary':'bg-gray-200');
  });
  document.getElementById('phase-label').textContent=`Phase ${p} of 4`;
}

function showPhase(p) {
  updateNav(p);
  const c = document.getElementById('phase-content');
  const phases = [null, phase1, phase2, phase3, phase4];
  
  // Announcement for screen readers
  const announcer = document.getElementById('sr-announcer');
  if (announcer) announcer.textContent = `Navigated to Phase ${p}`;

  c.innerHTML = '<div class="fade-in">' + phases[p]() + '</div>';
  
  // Re-run AI
  const ai = document.getElementById('ai-area');
  if (ai) askAI(p);
  
  if (p===2) restoreChecklist();
  
  // Scroll to top of content
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function phase1() {
  const isReg = state.registered==='yes';
  const isUnsure = state.registered==='unsure';
  return `
  <div class="max-w-2xl space-y-4">
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <header class="flex items-start justify-between mb-4">
        <div>
          <span class="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">Phase 1 of 4</span>
          <h2 class="text-xl font-bold text-gray-900 mt-2 flex items-center gap-2">📋 Registration Status</h2>
          <p class="text-gray-500 text-sm mt-1">First, let's make sure you're on the electoral roll.</p>
        </div>
      </header>
      ${isReg ? `
        <div class="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-start gap-3">
          <span class="text-2xl" aria-hidden="true">✅</span>
          <div>
            <p class="font-bold text-green-800">You're registered! Great start.</p>
            <p class="text-sm text-green-700 mt-0.5">Your name should be in the electoral roll. Verify it below.</p>
          </div>
        </div>
        <a href="${DATA.links.search}" target="_blank" rel="noopener" class="btn-main bg-primary text-white w-full justify-center">🔍 Verify My Name on Electoral Roll</a>
      ` : isUnsure ? `
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 flex items-start gap-3">
          <span class="text-2xl" aria-hidden="true">🤔</span>
          <div>
            <p class="font-bold text-amber-800">Let's check your registration status.</p>
            <p class="text-sm text-amber-700 mt-0.5">Search the electoral roll — it takes under 2 minutes.</p>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <a href="${DATA.links.search}" target="_blank" rel="noopener" class="btn-main bg-primary text-white justify-center">🔍 Search Electoral Roll</a>
          <a href="${DATA.links.register}" target="_blank" rel="noopener" class="btn-main bg-white border border-gray-200 text-gray-700 justify-center">📝 Register Now (Form 6)</a>
        </div>
      ` : `
        <div class="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-start gap-3">
          <span class="text-2xl" aria-hidden="true">⚠️</span>
          <div>
            <p class="font-bold text-red-800">You need to register first.</p>
            <p class="text-sm text-red-700 mt-0.5">Fill Form 6 on the ECI Voter Portal to get registered.</p>
          </div>
        </div>
        <a href="${DATA.links.register}" target="_blank" rel="noopener" class="btn-main bg-primary text-white w-full justify-center">📝 Register to Vote — Form 6</a>
      `}
      <div id="ai-area" class="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[60px]" aria-live="polite">
        <span class="ai-loading">🤖 Getting AI guidance…</span>
      </div>
    </div>
    <button onclick="showPhase(2)" class="btn-main bg-secondary text-white w-full justify-center">Next: Document Prep →</button>
  </div>`;
}

function phase2() {
  const stored = JSON.parse(localStorage.getItem('cg-docs')||'{}');
  return `
  <div class="max-w-2xl space-y-4">
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <span class="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">Phase 2 of 4</span>
      <h2 class="text-xl font-bold text-gray-900 mt-2 mb-1">📄 Document Preparation</h2>
      <p class="text-gray-500 text-sm mb-5">Carry <strong>any one</strong> of these valid photo IDs on polling day.</p>
      <div class="space-y-2" id="doc-checklist" role="group" aria-label="Valid documents checklist">
        ${DATA.docs.map((d,i)=>`
          <label class="checklist-item flex items-center gap-3 p-3 rounded-xl border border-gray-200 cursor-pointer hover:border-secondary transition-all ${stored[i]?'bg-green-50 border-green-200':''}">
            <input type="checkbox" class="w-4 h-4 accent-green-600" ${stored[i]?'checked':''} onchange="saveDoc(${i},this.checked)">
            <span class="font-medium text-gray-800 text-sm ${stored[i]?'line-through text-green-700':''}">${d}</span>
          </label>
        `).join('')}
      </div>
      <div id="ai-area" class="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[60px]" aria-live="polite">
        <span class="ai-loading">🤖 Getting AI guidance…</span>
      </div>
    </div>
    <div class="flex gap-3">
      <button onclick="showPhase(1)" class="btn-main bg-white border border-gray-200 text-gray-700 flex-1 justify-center">← Back</button>
      <button onclick="showPhase(3)" class="btn-main bg-secondary text-white flex-1 justify-center">Next: Booth Finder →</button>
    </div>
  </div>`;
}

function saveDoc(i, checked) {
  const d = JSON.parse(localStorage.getItem('cg-docs')||'{}');
  d[i] = checked;
  localStorage.setItem('cg-docs', JSON.stringify(d));
}

function restoreChecklist() {
  const stored = JSON.parse(localStorage.getItem('cg-docs')||'{}');
  document.querySelectorAll('#doc-checklist input').forEach((el,i)=>{
    el.checked = !!stored[i];
  });
}

function phase3() {
  const pin = state.pincode || '395006';
  const mapsUrl = `https://www.google.com/maps/search/Polling+Station+near+${pin}`;
  return `
  <div class="max-w-2xl space-y-4">
    <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">Phase 3 of 4</span>
      <h2 class="text-xl font-bold text-gray-900 mt-2 mb-1">📍 Find Your Polling Booth</h2>
      <p class="text-gray-500 text-sm mb-5">Your pincode: <strong>${pin}</strong>. Use these to find your exact booth.</p>
      
      <div class="space-y-3">
        <a href="${mapsUrl}" target="_blank" rel="noopener" class="btn-main bg-primary text-white w-full justify-center">
          🗺️ Open Google Maps — Booths near ${pin}
        </a>
        <button onclick="generateICS()" class="btn-main bg-amber-500 text-white w-full justify-center">
          📅 Set Poll Day Reminder (April 26, 2026)
        </button>
      </div>
      <div id="ai-area" class="mt-4 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[60px]" aria-live="polite">
        <span class="ai-loading">🤖 Getting AI guidance…</span>
      </div>
    </div>
    <div class="flex gap-3">
      <button onclick="showPhase(2)" class="btn-main bg-white border border-gray-200 text-gray-700 flex-1 justify-center">← Back</button>
      <button onclick="showPhase(4)" class="btn-main bg-secondary text-white flex-1 justify-center">Next: Poll Day →</button>
    </div>
  </div>`;
}

function phase4() {
  return `
  <div class="max-w-3xl space-y-4">
    <div class="grid sm:grid-cols-3 gap-4">
      <article class="sm:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <span class="text-xs font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">Phase 4 of 4</span>
        <h2 class="text-xl font-bold text-gray-900 mt-2 mb-1">🗳️ Poll Day Guide</h2>
        <p class="text-gray-500 text-sm mb-5">Step-by-step — what happens inside the booth.</p>
        
        <div class="relative space-y-5">
          <div class="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200" aria-hidden="true"></div>
          ${DATA.steps.map(s=>`
            <div class="relative flex gap-4 pl-2">
              <div class="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold shrink-0 relative z-10">${s.n}</div>
              <div>
                <h4 class="font-bold text-gray-900 text-sm">${s.e} ${s.t}</h4>
                <p class="text-xs text-gray-500 mt-0.5">${s.d}</p>
              </div>
            </div>
          `).join('')}
        </div>
        <div id="ai-area" class="mt-5 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 min-h-[60px]" aria-live="polite">
          <span class="ai-loading">🤖 Getting AI guidance…</span>
        </div>
      </article>

      <aside class="space-y-4">
        <div class="bg-green-50 rounded-2xl border border-green-200 p-4">
          <h3 class="font-bold text-gray-900 text-sm mb-3">✅ Poll Day Checklist</h3>
          <ul class="space-y-2 text-xs text-gray-700">
            <li><span class="text-green-600" aria-hidden="true">✓</span> Voter ID / Photo ID</li>
            <li><span class="text-green-600" aria-hidden="true">✓</span> Booth Location Known</li>
            <li><span class="text-green-600" aria-hidden="true">✓</span> Plan travel & timing</li>
            <li><span class="text-green-600" aria-hidden="true">✓</span> Carry water bottle</li>
          </ul>
        </div>
        <button onclick="downloadChecklist()" class="btn-main bg-primary text-white w-full justify-center text-sm">⬇️ Download Checklist</button>
      </aside>
    </div>

    <footer class="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white text-center">
      <div class="text-3xl mb-2" aria-hidden="true">🎉</div>
      <h3 class="font-bold text-lg">You're ready to vote!</h3>
      <p class="text-blue-100 text-sm mt-1">Share CivicGuide AI with family & friends</p>
      <button onclick="share()" class="mt-3 btn-main bg-white text-primary text-sm justify-center">📤 Share Project</button>
    </footer>
  </div>`;
}

// ── AI Integration (Efficiency & Security) ───────────────────────────────────
const PROMPTS = {
  1: (s) => `User registration status: "${s.registered}". Tip about voter registration for 2026 Gujarat election. Max 3 sentences.`,
  2: (s) => `User has ID: ${s.hasID==='yes'?'Yes':'No'}. Tip about valid docs for voting. Max 3 sentences.`,
  3: (s) => `Pincode: ${s.pincode||'unknown'}. Tip about finding polling booth. Max 3 sentences.`,
  4: () => `Motivational tip for first-time voters on poll day. Max 3 sentences.`
};

const MODE_SYSTEM = {
  normal: 'Be clear and helpful.',
  simpler: 'Use 5th-grade level English. Emojis. Short sentences.',
  deepdive: 'Provide detailed ECI rules and legal context.',
  gu: 'Reply in Gujarati (ગુજરાતી). Be warm and clear.',
  hi: 'Reply in Hindi (हिंदी). Be warm and clear.'
};

async function askAI(phase) {
  const area = document.getElementById('ai-area');
  if (!area) return;
  
  // Efficiency: Check Session Cache first
  const cacheKey = `ai_p${phase}_m${state.mode}_reg${state.registered}`;
  const cached = sessionStorage.getItem(cacheKey);
  if (cached) {
    displayAIResponse(area, cached);
    return;
  }

  const prompt = PROMPTS[phase](state);
  const system = MODE_SYSTEM[state.mode] || MODE_SYSTEM.normal;
  
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        system_instruction: {parts:[{text:`You are CivicGuide AI. ${system}`}]},
        contents: [{parts:[{text: prompt}]}],
        generationConfig: {maxOutputTokens:150, temperature:0.7}
      })
    });
    
    if (!res.ok) throw new Error('API request failed');
    
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Check ECI website for info.';
    
    sessionStorage.setItem(cacheKey, text);
    displayAIResponse(area, text);
  } catch(e) {
    console.error('AI Error:', e);
    area.innerHTML = '🤖 Tip: Check <a href="https://voters.eci.gov.in" target="_blank" class="text-primary underline">voters.eci.gov.in</a>.';
  }
}

function displayAIResponse(area, text) {
  const modeText = document.getElementById('mode-select')?.options[document.getElementById('mode-select')?.selectedIndex]?.text || 'AI';
  area.innerHTML = `<span class="text-xs font-bold text-primary block mb-1">🤖 AI Guidance (${modeText})</span>${text.replace(/\n/g,'<br>')}`;
}

// ── Utilities ────────────────────────────────────────────────────────────────
function generateICS() {
  const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:20260426T060000Z\nDTEND:20260426T170000Z\nSUMMARY:Gujarat Election 2026 — Polling Day\nDESCRIPTION:Cast your vote! Check your booth at voters.eci.gov.in\nLOCATION:Your Polling Booth\\, ${state.pincode||'Gujarat'}\nEND:VEVENT\nEND:VCALENDAR`;
  const blob = new Blob([ics],{type:'text/calendar'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'PollDay2026.ics';
  a.click();
}

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

