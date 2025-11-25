export default function EntrepreneurshipPage() {
  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Entrepreneurship - Tansen
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        AI-powered music transcription platform converting audio to musical notation.
      </p>

      <div className="prose prose-invert max-w-none">
        <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 mb-8">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">FSE 301 Project</h2>
          <p className="text-slate-300 mb-4">
            Tansen is an innovative music transcription application developed as part of FSE 301 (Introduction to Entrepreneurship). The platform uses advanced deep learning models to automatically convert audio recordings into accurate musical notation, making music more accessible to learners and professionals alike.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-400 font-medium">Course:</span>
              <span className="text-slate-400 ml-2">FSE 301 - Introduction to Entrepreneurship</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Semester:</span>
              <span className="text-slate-400 ml-2">Fall 2024</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Platform:</span>
              <span className="text-slate-400 ml-2">Mobile & Web Application</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Status:</span>
              <span className="text-slate-400 ml-2">Prototype Complete</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Product Overview</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          Tansen addresses a significant pain point in music education and production by automating the tedious process of transcription. Musicians, students, and educators can simply record or upload audio to receive professional-quality sheet music, saving hours of manual work and making music more accessible to those who cannot read traditional notation fluently.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Technical Implementation</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          The system leverages state-of-the-art deep learning models from Huggingface and custom-trained neural networks using PyTorch. The Flutter frontend provides a seamless user experience across mobile and web platforms, while FastAPI handles the backend processing efficiently.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Technology Stack</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {["Flutter", "FastAPI", "PyTorch", "Huggingface", "TensorFlow", "Python"].map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50 text-sm">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Market Opportunity</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          The music education market is valued at over $25 billion globally, with growing demand for technology-assisted learning tools. Tansen targets music students, educators, composers, and professional musicians who need accurate transcription services without the high cost of manual transcription.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Business Model</h3>
        <p className="text-slate-300 leading-relaxed">
          Tansen operates on a freemium model, offering basic transcription services for free with premium features including multi-instrument separation, advanced editing tools, and export options available through subscription. This approach allows us to build a user base while generating sustainable revenue.
        </p>
      </div>
    </section>
  )
}