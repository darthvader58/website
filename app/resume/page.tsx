'use client';

import { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { Shell, SectionHeader } from '../components/Shell';

export default function ResumePage() {
  const resume = {
    title: "Resume",
    description: "Download my current resume as a PDF.",
    filename: "Final_Shash_Gen_resume.pdf"
  };
  const resumePath = `/${resume.filename}`;
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const openPreview = () => {
    setIsPreviewOpen(true);
    window.setTimeout(() => {
      document.getElementById('resume-preview')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  return (
    <div className="fade">
      <SectionHeader title="Resume" />
      <Shell className="px-6 py-6 sm:px-8">
        <ScrollReveal>
          <p className="text-[14px] leading-relaxed text-[var(--muted)] mb-8">
            Download my current resume.
          </p>
        </ScrollReveal>

        <div className="grid gap-6">
          <ScrollReveal>
            <div className="relative overflow-hidden rounded-xl border border-[var(--line)] bg-[var(--card)] p-8 transition-colors duration-300 hover:border-[var(--soft)]">
              <div className="absolute inset-y-0 left-0 w-px bg-purple-500/70" />
              <h3 className="text-2xl font-semibold text-[var(--fg)] mb-3">{resume.title}</h3>
              <p className="text-[var(--muted)] mb-6">{resume.description}</p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={openPreview}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] px-5 py-3 text-sm font-medium text-[var(--muted)] transition-all duration-200 hover:border-[var(--soft)] hover:text-[var(--fg)]"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12s-3.75 6.75-9.75 6.75S2.25 12 2.25 12z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Preview
                </button>
                <a
                  href={resumePath}
                  download
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--fg)] text-[var(--bg)] font-medium rounded-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download PDF
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {isPreviewOpen && (
          <ScrollReveal delay={100}>
            <div id="resume-preview" className="mt-12 scroll-mt-24">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-[var(--fg)]">Preview</h3>
                <button
                  type="button"
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-lg border border-[var(--line)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--soft)] hover:text-[var(--fg)]"
                >
                  Close
                </button>
              </div>
              <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--card)]">
                <img
                  src="/resume-preview.png"
                  alt="Preview of Shashwat Raj's resume"
                  width={1224}
                  height={1584}
                  className="h-auto w-full bg-white"
                />
                <div className="border-t border-[var(--line)] px-4 py-3 text-center text-sm text-[var(--muted)]">
                  Need a closer look?{' '}
                  <a
                    href={resumePath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-purple-400 hover:text-purple-300"
                  >
                    Open the full PDF
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal delay={300}>
          <div className="mt-12 border border-[var(--line)] rounded-lg p-6 bg-[var(--card)] hover:border-[var(--soft)] transition-all duration-300">
            <h3 className="text-xl font-semibold text-[var(--fg)] mb-4">Skills Overview</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Programming Languages</h4>
                <p className="text-[var(--muted)] text-sm">Python, C, C++, Java, JavaScript, TypeScript, Swift, Rust, Go, Ruby</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Frameworks &amp; Libraries</h4>
                <p className="text-[var(--muted)] text-sm">React, Next.js, Flutter, PyTorch, TensorFlow, FastAPI, Node.js</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Tools &amp; Platforms</h4>
                <p className="text-[var(--muted)] text-sm">Git, Docker, Firebase, AWS, Vercel, MongoDB, PostgreSQL</p>
              </div>
              <div>
                <h4 className="text-purple-400 font-medium mb-2">Embedded Systems</h4>
                <p className="text-[var(--muted)] text-sm">Arduino, FRDM-KL46Z, I2C, PID Control, Verilog, FPGA</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Shell>
    </div>
  )
}
