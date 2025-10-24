import Link from 'next/link'

export const metadata = {
  title: 'Service Learning - GCSP',
  description: 'WoofCare: Making a difference in the lives of stray dogs',
}

export default function Service() {
  return (
    <section>
      <Link
        href="/gcsp"
        className="inline-flex items-center text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 mb-6 transition-colors"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to GCSP
      </Link>

      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">
        Service Learning: WoofCare 🐾
      </h1>

      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-3">
          Engineering Projects in Community Service (EPICS@ASU)
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Fall 2024 – Present | Stage 3 Project
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          After attending a semester of EPICS in Spring 2024, a passionate spark for innovation lit in me as I 
          proposed my own stage 1 project in Fall 2024 for EPICS@ASU. Over 300 million dogs are abandoned to a 
          cruel "street-dog-life" in the world, without any human care, medical attention and population control.
        </p>
      </div>

      <div className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">The Mission</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          WoofCare is a mobile app designed to make a real difference in the lives of stray dogs in India. By 
          connecting everyday people with crowd-funded donation services, veterinary care, rescue shelters, and 
          potential adopters, we're striving to create a compassionate community that cares for our four-legged 
          friends.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          <span className="font-semibold">Tagline:</span> "Where Every Bark Finds a Helping Hand"
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <h4 className="font-semibold mb-2">📍 Location-Based Services</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Connect with dog-help resources in your vicinity to find home and care for abandoned stray dogs.
            </p>
          </div>
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <h4 className="font-semibold mb-2">💰 Crowdfunding</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Support stray dogs through community-driven fundraising initiatives.
            </p>
          </div>
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <h4 className="font-semibold mb-2">🏥 Veterinary Network</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Access to veterinary care and medical attention for stray dogs.
            </p>
          </div>
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <h4 className="font-semibold mb-2">🏠 Adoption Services</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Find loving homes for stray dogs through our adoption platform.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Partnerships & Growth</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          WoofCare and EPICS at ASU has partnered with Mr. Anantkumar Malikaveetil and subsequently 'The Voice of 
          Stray Dogs' Trust (VOSD - Trust) to engineer the solution and test it in India. With my teammate Jesus 
          Aguilar, together we presented WoofCare as a Stage 1 project at the EPICS Fall 2024 Project Marketplace 
          on August 30.
        </p>
        <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg mb-4">
          <p className="text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">The response was incredible:</span> More than 40 students expressed 
            interest in joining us on this journey to make a significant social impact!
          </p>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Currently, the project is a Stage 3 team, partnered with 60+ NGOs to help stray dogs all over the state 
          of Maharashtra, India.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Technical Implementation</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Developing a mobile app using Flutter + Firebase + a Python backend, connecting dog lovers & dog care 
          services. Integrated Google's Admob & Apps API to facilitate seamless location-based services & 
          crowdfunds.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">Flutter</span>
          <span className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">Firebase</span>
          <span className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">Python</span>
          <span className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">Google Admob</span>
          <span className="text-xs px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full">Google Apps API</span>
        </div>
      </div>

      <div className="mb-8 p-6 border-2 border-green-500 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Impact on "Joy of Living"</h3>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          This embodies the values of Service Learning and shows how it's not limited to only helping humankind 
          but also creatures who sometimes need us to be their voice and show how world could be a better place 
          for everyone. The project demonstrates how engineering and compassion can combine to create meaningful 
          change in communities.
        </p>
      </div>

      <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          <span className="font-semibold">Learn More:</span>
        </p>
        <a
          href="https://woofcare-solutions.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          woofcare-solutions.org →
        </a>
      </div>
    </section>
  )
}