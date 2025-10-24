import Link from 'next/link'

export const metadata = {
  title: 'Multicultural - GCSP',
  description: 'EPICS in Action - Barcelona: Cultural Exchange and Learning',
}

export default function Multicultural() {
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
        Multicultural: EPICS in Spain 🌍
      </h1>

      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-3">
          EPICS in Action - Barcelona
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          March 8-16, 2025 | Spring Break Study Abroad
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          In Spring Break of 2025, I had the opportunity to participate in the EPICS in Action - Barcelona. 
          Those 8 days from March 8-16 have become lifelong memories now. The trip was intended to teach students 
          about human-centered design approach but it ended up teaching much more.
        </p>
      </div>

      <div className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Learning Objectives</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The program combined technical learning with cultural immersion, providing a unique perspective on how 
          engineering and design principles are applied across different cultures and contexts.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-3 border-l-4 border-orange-500 bg-white dark:bg-neutral-800">
            <p className="text-sm font-semibold mb-1">Technical Learning</p>
            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              Human-centered design principles and methodologies
            </p>
          </div>
          <div className="p-3 border-l-4 border-orange-500 bg-white dark:bg-neutral-800">
            <p className="text-sm font-semibold mb-1">Cultural Exchange</p>
            <p className="text-xs text-neutral-700 dark:text-neutral-300">
              Understanding Spanish culture and international collaboration
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Technical Visits</h3>
        <div className="space-y-4">
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <h4 className="font-semibold mb-2">🏭 CDEI-UPC Centre de Disseny d'Equips Industrials</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Learned about technological developments in agriculture and irrigation systems. Gained insights into 
              how engineering solutions are adapted for Mediterranean agricultural challenges.
            </p>
          </div>
          <div className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg">
            <h4 className="font-semibold mb-2">🌊 Spain Beach Cleanup Project</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Our team working on the Spain Beach Cleanup project gained deeper insights on the user needs as well 
              as what could be improved on the current prototype through direct interaction with local communities.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Cultural Immersion</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The week forged strong cultural connections and new friendships. It was a journey that let us explore 
          the cultural differences and similarities as well as the beautiful tourist attractions.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <h4 className="font-semibold mb-2">🏛️ Gaudí's Architecture</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Witnessed the architectural intricacies of Antoni Gaudí's masterpieces, including Park Güell and 
              Sagrada Familia, understanding how art and engineering intersect.
            </p>
          </div>
          <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg">
            <h4 className="font-semibold mb-2">💃 Flamenco Dance</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Learning traditional Flamenco dance provided a deeper appreciation for Spanish cultural expression 
              and the importance of preserving cultural heritage.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Key Takeaways</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <span className="text-orange-500 mt-1 mr-3">✓</span>
            <div>
              <p className="font-semibold text-sm mb-1">Cross-Cultural Collaboration</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Learned to work effectively with international teams and navigate cultural differences in 
                professional settings.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-orange-500 mt-1 mr-3">✓</span>
            <div>
              <p className="font-semibold text-sm mb-1">Global Engineering Perspectives</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Understood how engineering challenges and solutions vary across different cultural and 
                geographical contexts.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-orange-500 mt-1 mr-3">✓</span>
            <div>
              <p className="font-semibold text-sm mb-1">Human-Centered Design in Practice</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Applied design thinking principles in a real-world international context, understanding the 
                importance of cultural sensitivity in engineering solutions.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <span className="text-orange-500 mt-1 mr-3">✓</span>
            <div>
              <p className="font-semibold text-sm mb-1">Lifelong Connections</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                Built lasting friendships with students from diverse backgrounds, creating a global network of 
                future engineers and innovators.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 border-2 border-orange-500 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Impact on Personal Growth</h3>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          This experience fundamentally shaped my understanding of global engineering challenges and the 
          importance of cultural competence in addressing them. It reinforced the "Joy of Living" theme by 
          demonstrating how diverse perspectives and international collaboration can create more inclusive and 
          effective solutions that improve lives across cultures.
        </p>
      </div>

      <div className="p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h4 className="font-semibold mb-2">Program Highlights</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 text-center text-sm">
          <div>
            <p className="font-bold text-2xl text-orange-500">8</p>
            <p className="text-neutral-600 dark:text-neutral-400">Days</p>
          </div>
          <div>
            <p className="font-bold text-2xl text-orange-500">5+</p>
            <p className="text-neutral-600 dark:text-neutral-400">Cultural Activities</p>
          </div>
          <div>
            <p className="font-bold text-2xl text-orange-500">∞</p>
            <p className="text-neutral-600 dark:text-neutral-400">Memories</p>
          </div>
        </div>
      </div>
    </section>
  )
}