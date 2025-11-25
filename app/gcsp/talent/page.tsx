export default function TalentPage() {
  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Talent - Research
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        Undergraduate research in reinforcement learning and satellite observation optimization.
      </p>

      <div className="prose prose-invert max-w-none">
        <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 mb-8">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">FURI Research Grant</h2>
          <p className="text-slate-300 mb-4">
            Awarded $4,600 through the Fulton Undergraduate Research Initiative (FURI) to investigate reinforcement learning approaches for optimizing satellite observation priorities.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-400 font-medium">Duration:</span>
              <span className="text-slate-400 ml-2">January 2025 - Present</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Lab:</span>
              <span className="text-slate-400 ml-2">CoDe Lab, Arizona State University</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Focus:</span>
              <span className="text-slate-400 ml-2">Machine Learning, Satellite Systems</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Funding:</span>
              <span className="text-slate-400 ml-2">$4,600 USD</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Research Overview</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          My research focuses on developing reinforcement learning algorithms to optimize satellite observation scheduling. The project addresses the challenge of efficiently allocating limited satellite resources to maximize coverage of high-priority targets while considering constraints such as orbital mechanics, sensor capabilities, and ground station availability.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Technical Approach</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          Using PyTorch and GeoPandas, I'm developing deep reinforcement learning models that learn optimal observation policies through interaction with a simulated satellite environment. The system processes spatial-temporal data to make real-time decisions about which targets to observe, balancing immediate rewards with long-term strategic objectives.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Tools & Technologies</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {["Python", "PyTorch", "GeoPandas", "TAT-C", "Jupyter", "NumPy", "Pandas"].map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50 text-sm">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Impact</h3>
        <p className="text-slate-300 leading-relaxed">
          This research has applications in Earth observation, disaster response, and scientific data collection. By improving satellite scheduling efficiency, we can enhance our ability to monitor climate change, respond to natural disasters, and support critical infrastructure.
        </p>
      </div>
    </section>
  )
}