export default function ResumePage() {
  const resumes = [
    {
      title: "Machine Learning / AI Focus",
      description: "Highlights research experience, ML projects, and deep learning expertise.",
      filename: "Final_Resume_Shashwat_Raj_ML.pdf",
      color: "from-blue-900/40 to-purple-900/40"
    },
    {
      title: "Software Development Focus",
      description: "Emphasizes full-stack development, web applications, and software engineering skills.",
      filename: "Final_Resume_Shashwat_Raj_Dev.pdf",
      color: "from-green-900/40 to-emerald-900/40"
    },
    {
      title: "Hardware / Embedded Systems Focus",
      description: "Showcases embedded systems, robotics, and hardware projects.",
      filename: "Final_Resume_Shashwat_Raj_Hardware.pdf",
      color: "from-orange-900/40 to-red-900/40"
    }
  ]

  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Resume
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        Download my resume tailored for different roles and focus areas.
      </p>

      <div className="grid gap-6">
        {resumes.map((resume, index) => (
          <div key={index} className={`border border-slate-800 rounded-lg p-8 bg-gradient-to-br ${resume.color} hover:border-purple-700/50 transition-all duration-300`}>
            <h3 className="text-2xl font-semibold text-slate-100 mb-3">{resume.title}</h3>
            <p className="text-slate-300 mb-6">{resume.description}</p>
            <a
              href={`/${resume.filename}`}
              download
              className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download PDF
            </a>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-slate-800 rounded-lg p-6 bg-slate-950/30">
        <h3 className="text-xl font-semibold text-slate-100 mb-4">Skills Overview</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Programming Languages</h4>
            <p className="text-slate-400 text-sm">Python, C, C++, Java, JavaScript, TypeScript, Swift, Rust, Go, Ruby</p>
          </div>
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Frameworks & Libraries</h4>
            <p className="text-slate-400 text-sm">React, Next.js, Flutter, PyTorch, TensorFlow, FastAPI, Node.js</p>
          </div>
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Tools & Platforms</h4>
            <p className="text-slate-400 text-sm">Git, Docker, Firebase, AWS, Vercel, MongoDB, PostgreSQL</p>
          </div>
          <div>
            <h4 className="text-purple-400 font-medium mb-2">Embedded Systems</h4>
            <p className="text-slate-400 text-sm">Arduino, FRDM-KL46Z, I2C, PID Control, Verilog, FPGA</p>
          </div>
        </div>
      </div>
    </section>
  )
}