# GRE Mock Test

A full practice test in the current order: the essay, then four timed sections, with the second section harder or easier based on the first.

Part of the [GRE and TOEFL Study Suite](https://github.com/Apurba94/gre-toefl-study-suite): 100 free study apps for the GRE General Test and more. It works offline, as a Windows program or in the browser.

## Download and run

- **Windows:** download `GRE Mock Test.exe` from the [latest release](https://github.com/Apurba94/gre-mock-test/releases/latest) and open it. Nothing to install. It opens in its own window and saves your progress in your user folder.
- **Browser:** open it online in the suite's web edition at https://gre-toefl-study-suite.vercel.app/apps/gre-mock-test/ . Progress stays in that browser.
- **From source:** `python launcher.py` (Python 3.10 or later, no packages needed).

## What it does

A full-length practice GRE in the current format, about 2 hours: the 30-minute Issue essay first, then Verbal and Quant sections of 12 and then 15 questions, with the second section of each measure harder or easier depending on the first. All questions are original or generated.

Sections: Essay, Sections, Progress, About.

## How to use it

1. Set aside two hours without breaks, as on the real test.
2. Write the essay in **Essay**, then press **Start the sections** in **Sections**.
3. Your raw scores appear at the end. They are not official scaled scores.
4. Afterwards, study your mistakes in the GRE Error Log.

## Good to know

- All questions, passages and definitions were written for this suite. None are official ETS questions. For official practice, use the materials on ets.org.
- It follows the GRE General Test as shortened in September 2023 and the TOEFL iBT as updated in January 2026. Formats change, so check ets.org before your test.
- Feedback on writing and speaking counts things a program can count honestly, such as length and linking words. It does not give an official score.
- Not endorsed by or affiliated with ETS. GRE and TOEFL are registered trademarks of ETS.

## For developers

The app is plain HTML and JavaScript in `web/`, run by a small Python launcher that serves it on 127.0.0.1 only and needs a secret token for saving. Tests: `node --test "tests/*.test.js"` (24 tests) and `python -m unittest discover -s tests`. Build the .exe with `python build_exe.py`.

Built with AI assistance (Claude Code). MIT licence. By JANIN A APURBA.
