export default function ServicePage() {
  return (
    <section className="fade">
      <h1 className="mb-8 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Service - WoofCare
      </h1>
      <p className="text-slate-400 text-lg mb-12">
        Connecting dog owners, shelters, and veterinarians across India through technology.
      </p>

      <div className="prose prose-invert max-w-none">
        <div className="border border-slate-800 rounded-lg p-6 bg-slate-950/30 mb-8">
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">EPICS Project Overview</h2>
          <p className="text-slate-300 mb-4">
            WoofCare is a comprehensive mobile application that addresses the critical need for better pet care infrastructure in India. The platform connects dog owners with local shelters, veterinarians, and fellow pet lovers, creating a supportive community focused on animal welfare.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-purple-400 font-medium">Duration:</span>
              <span className="text-slate-400 ml-2">August 2024 - Present</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Team Size:</span>
              <span className="text-slate-400 ml-2">6 members</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">NGO Partners:</span>
              <span className="text-slate-400 ml-2">60+ organizations</span>
            </div>
            <div>
              <span className="text-purple-400 font-medium">Region:</span>
              <span className="text-slate-400 ml-2">Pune, India</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-slate-100 mb-4">Key Features</h2>
        <ul className="space-y-3 mb-6">
          <li className="text-slate-300">Social network for dog owners to share experiences and advice</li>
          <li className="text-slate-300">Shelter marketplace connecting rescues with potential adopters</li>
          <li className="text-slate-300">Veterinary directory with ratings and location-based search</li>
          <li className="text-slate-300">Real-time chat between owners, shelters, and vets</li>
          <li className="text-slate-300">Emergency assistance locator for urgent pet care needs</li>
        </ul>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Technology Stack</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {["Flutter", "Firebase", "Python", "Google Maps API", "Cloud Functions", "Firestore"].map((tech, i) => (
            <span key={i} className="px-3 py-1 rounded-full bg-purple-950/50 text-purple-300 border border-purple-900/50 text-sm">
              {tech}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">Community Impact</h3>
        <p className="text-slate-300 leading-relaxed mb-4">
          By partnering with over 60 NGOs and shelters across Pune, WoofCare has created a unified platform that makes pet care more accessible. The application facilitates adoption processes, provides reliable veterinary information, and builds a supportive community of pet owners.
        </p>

        <h3 className="text-xl font-semibold text-slate-100 mb-3">My Role</h3>
        <p className="text-slate-300 leading-relaxed">
          As project lead, I manage the development team, coordinate with NGO partners, and oversee technical architecture. I'm responsible for implementing core features including the real-time chat system, location-based services, and backend infrastructure.
        </p>
      </div>
    </section>
  )
}