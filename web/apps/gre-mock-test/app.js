/* GRE Mock Test: the essay, then four timed sections, with the second section of each measure adapting to the first. */
(function () {
  'use strict';
  const EASY = ['percentOf', 'linear', 'thirdAngle', 'mean', 'remainder', 'qcSwap', 'polygon', 'rectangle', 'arithSeq', 'ratioSplit', 'slope', 'circle', 'evaluate', 'qcAverage'];
  const HARD = ['percentChange', 'quadratic', 'system', 'roundTrip', 'work', 'noReplace', 'arrange', 'successive', 'reversePercent', 'qcSquare', 'qcNegative', 'absCount', 'overlapPct', 'sdCompare', 'arithSum'];
  const verbal = (data, n, hard, seed) => {
    const r = SK.rng(seed);
    const tc = SK.fromBank(r, data.tc.filter((x) => (hard ? x.blanks.length >= 2 : x.blanks.length <= 2)), 'All', Math.round(n * 0.3));
    const se = SK.fromBank(r, data.se, 'All', Math.round(n * 0.25));
    const arg = SK.fromBank(r, data.arguments, 'All', 1);
    const rc = SK.takeGroups(r, SK.passageItems(data.gre_reading).filter((x) => hard || data.gre_reading.find((p) => p.id === x.group).length === 'short'), n).slice(0, n - tc.length - se.length - arg.length);
    return tc.concat(se, arg, rc);
  };
  const quant = (n, hard, seed) => SK.makeQuant(hard ? HARD : EASY, n, seed);
  const plan = (data, seed) => [
    { title: 'Verbal section 1', seconds: 18 * 60, items: verbal(data, 12, false, seed) },
    { title: 'Quant section 1', seconds: 21 * 60, items: quant(12, false, seed + 1) },
    { title: 'Verbal section 2', seconds: 23 * 60, items: (res) => verbal(data, 15, res[0].correct >= 8, seed + 2) },
    { title: 'Quant section 2', seconds: 26 * 60, items: (res) => quant(15, res[1].correct >= 8, seed + 3) },
  ];
  const App = {
    about: 'A full-length practice GRE in the current format, about 2 hours: the 30-minute Issue essay first, then Verbal and Quant sections of 12 and then 15 questions, with the second section of each measure harder or easier depending on the first. All questions are original or generated.',
    how: ['Set aside two hours without breaks, as on the real test.', 'Write the essay in **Essay**, then press **Start the sections** in **Sections**.', 'Your raw scores appear at the end. They are not official scaled scores.', 'Afterwards, study your mistakes in the GRE Error Log.'],
    tabs: [
      { id: 'essay', label: 'Essay', render(el, ctx) {
        const p = SK.pick(SK.rng(SK.daySeed('gre-mock-test')), ctx.data.issue_prompts.prompts);
        SK.writer(el, { key: 'mock-' + p.id, title: 'Analyze an Issue (30 minutes)', prompt: p.text + '\n\n' + ctx.data.issue_prompts.instructions[p.ins], promptText: p.text, minutes: 30, target: [400, 650], paragraphs: 4 });
      } },
      { id: 'sections', label: 'Sections', render(el, ctx) {
        const intro = () => {
          SK.clear(el);
          el.appendChild(SK.card('Four timed sections', SK.table(['Section', 'Questions', 'Time'], [['Verbal 1', '12', '18 min'], ['Quant 1', '12', '21 min'], ['Verbal 2 (adapts)', '15', '23 min'], ['Quant 2 (adapts)', '15', '26 min']], false),
            SK.h('div', { style: { marginTop: '12px' } }, SK.btn('Start the sections', () => SK.sectionRun(el, plan(ctx.data, SK.seedNow()), (res) => {
              SK.clear(el);
              const v = res[0].correct + res[2].correct, q = res[1].correct + res[3].correct;
              SK.store.set('gre-mock-test.last', { day: SK.dayKey(), verbal: v, quant: q });
              el.appendChild(SK.card('Mock test results', SK.stats([['Verbal', v + ' / 27'], ['Quant', q + ' / 27'], ['Verbal 2', res[0].correct >= 8 ? 'Harder' : 'Easier'], ['Quant 2', res[1].correct >= 8 ? 'Harder' : 'Easier']]),
                SK.table(['Section', 'Right', 'Time used'], res.map((x) => [x.title, x.correct + ' / ' + x.total, SK.formatTime(x.seconds)])), SK.h('p', { class: 'sk-muted', text: 'Raw scores only. ETS converts raw scores to the 130 to 170 scale with its own method.' }), SK.btn('Back', intro, 'ghost', { 'data-auto': 'once' })));
            }), '', { 'data-auto': 'once' }))));
        };
        intro();
      } },
    ],
    plan, verbal, quant,
    checks: {
      'sections have the official lengths and timings': (data, assert) => {
        const p = plan(data, 7);
        assert.deepEqual(p.map((s) => s.seconds / 60), [18, 21, 23, 26]);
        assert.equal(p[0].items.length, 12); assert.equal(p[1].items.length, 12);
        assert.equal(p[2].items([{ correct: 10 }, { correct: 3 }]).length, 15);
        assert.equal(p[3].items([{ correct: 10 }, { correct: 3 }]).length, 15);
      },
      'every question is valid': (data, assert) => { for (let s = 1; s < 10; s++) for (const it of verbal(data, 15, s % 2 === 0, s).concat(quant(15, s % 2 === 0, s))) assert.deepEqual(SK.validateItem(it), []); },
    },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
