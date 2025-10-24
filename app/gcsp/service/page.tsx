import Link from 'next/link'
import Image from 'next/image'

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

      {/* Image Gallery */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">WoofCare App & Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src="/images/gcsp/service/woofcare-mockup.png"
              alt="WoofCare Mobile App Interface Mockups"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
          <div className="relative w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src="/images/gcsp/service/woofcare-screens.png"
              alt="WoofCare App Screens and Features"
              width={800}
              height={600}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="relative w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-2">
          <Image
            src="/images/gcsp/service/marketplace-photo.png"
            alt="EPICS Fall 2024 Project Marketplace Presentation"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center italic">
          WoofCare presentation at EPICS Fall 2024 Project Marketplace (August 30, 2024)
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

      {/* Reflective Writeup */}
      <div className="mb-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border-l-4 border-green-500">
        <h3 className="font-semibold text-lg mb-4 text-green-900 dark:text-green-100">
          Connection to "Joy of Living" & Personal Impact
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-md mb-2 text-green-800 dark:text-green-200">
              GCSP Theme Relevance
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              WoofCare embodies the "Joy of Living" theme by recognizing that quality of life extends beyond 
              humans to all living creatures who share our world. Stray dogs face daily suffering—hunger, disease, 
              injury, and neglect—and by creating a platform that connects compassionate people with resources to 
              help these animals, we're fostering a more empathetic and caring society. When people can easily 
              contribute to animal welfare, report dogs in need, and facilitate adoptions, it creates ripples of 
              joy: for the dogs who find care and homes, for the adopters who gain loyal companions, for the 
              communities that become safer and more humane, and for the volunteers and donors who experience the 
              fulfillment of making a difference. This project demonstrates that engineering solutions can address 
              not just human needs, but create a more compassionate world for all beings.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-green-800 dark:text-green-200">
              Professional Development
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Leading WoofCare from a Stage 1 concept to a Stage 3 project with 60+ NGO partnerships has been an 
              invaluable lesson in project management, team leadership, and stakeholder engagement. Presenting at 
              the EPICS Marketplace and recruiting 40+ interested students taught me how to articulate a vision and 
              inspire others to join a cause. Working with our Indian partners, including Mr. Malikaveetil and VOSD 
              Trust, has given me experience in cross-cultural collaboration, understanding different organizational 
              structures, and adapting solutions to local contexts. Technically, developing a production mobile app 
              with Flutter, Firebase, and integrating Google APIs has strengthened my full-stack development skills. 
              Managing a large team, coordinating with NGOs, and balancing technical development with community 
              outreach has prepared me for roles that require both technical expertise and people management—skills 
              essential for any engineering leader or social entrepreneur.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-green-800 dark:text-green-200">
              Personal Growth
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              This project has been deeply meaningful on a personal level. Growing up in India, I witnessed firsthand 
              the challenges faced by stray animals, and being able to create a solution that addresses this issue 
              connects my engineering education with my personal values of compassion and service. Seeing the project 
              grow from an idea to a Stage 3 initiative partnered with 60+ NGOs has been incredibly rewarding and has 
              reinforced my belief that one person's initiative can spark meaningful change. Working with Jesus Aguilar 
              and leading a diverse team has taught me the power of collaboration and how different perspectives 
              strengthen solutions. Most importantly, this experience has shown me that the most fulfilling engineering 
              work comes when technical skills are applied to problems that genuinely matter to me. It has given me 
              confidence that I can identify problems in my community and lead efforts to solve them, and it has 
              deepened my commitment to using my engineering career to create positive social impact.
            </p>
          </div>
        </div>
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