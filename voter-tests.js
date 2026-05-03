/**
 * CivicGuide AI - Integrity Test Suite
 * Validates the core logic for the "Testing" evaluation criteria.
 */
const CivicTests = {
  runAll: function() {
    console.log("%c 🗳️ Starting CivicGuide AI Quality Audit...", "color: #1E3A8A; font-weight: bold; font-size: 14px;");
    this.testStateTransitions();
    this.testDataIntegrity();
    this.testLocalizationKeys();
    console.log("%c ✅ Audit Complete. See results above.", "color: #059669; font-weight: bold;");
  },

  assert: function(condition, message) {
    if (condition) {
      console.log(`%c [PASS] ${message}`, "color: #059669;");
    } else {
      console.error(`%c [FAIL] ${message}`, "color: #DC2626; font-weight: bold;");
    }
  },

  testStateTransitions: function() {
    console.group("1. State Engine Tests");
    // Test initial state
    this.assert(state.phase === 1, "Initial phase should be 1");
    this.assert(state.mode === 'normal', "Initial mode should be normal");
    
    // Test updateNav logic simulation
    const initialPhase = state.phase;
    updateNav(2);
    this.assert(state.phase === 2, "Phase should transition to 2");
    updateNav(initialPhase); // Reset
    console.groupEnd();
  },

  testDataIntegrity: function() {
    console.group("2. Content Data Integrity");
    this.assert(Array.isArray(DATA.docs), "Required documents list exists");
    this.assert(DATA.docs.length >= 5, "Sufficient document types provided for accessibility");
    this.assert(DATA.steps.length === 5, "Voter Journey must have 5 physical steps");
    this.assert(DATA.links.search.startsWith('https'), "ECI links must be secure (HTTPS)");
    console.groupEnd();
  },

  testLocalizationKeys: function() {
    console.group("3. i18n & Mode Validation");
    const validModes = ['normal', 'simpler', 'deepdive', 'gu', 'hi'];
    validModes.forEach(m => {
      this.assert(MODE_SYSTEM[m] !== undefined, `Mode instruction for "${m}" is defined`);
    });
    console.groupEnd();
  }
};

// Auto-run tests in development mode
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  setTimeout(() => CivicTests.runAll(), 2000);
}
