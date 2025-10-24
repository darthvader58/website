import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Talent - GCSP',
  description: 'Research on Reinforcement Learning for Autonomous Satellite Orientation',
}

export default function Talent() {
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
        Talent: Research & Innovation 🔬
      </h1>

      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-3">
          Fulton Undergraduate Research Initiative (FURI)
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Fall 2024, Spring 2025, Summer 2025 | Faculty Mentor: Dr. Paul Grogan
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          As part of FURI in Fall 2024, I started pursuing research under Dr. Paul Grogan on Reinforcement Learning 
          Techniques for autonomous satellite orientation in agile space missions for Earth Observation Systems. 
          Dynamic Targeting is an extensively researched concept used by satellites to point the instruments in 
          the optimal direction to get the maximum scientific yield.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Research Poster & Presentation</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="relative w-full h-auto rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800">
            <Image
              src="/images/gcsp/talent/research-poster.png"
              alt="FURI Research Poster - Optimizing Earth Science Observations"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center italic">
            Research poster presented at FURI Symposium showcasing methodology and results
          </p>
        </div>
      </div>

      <div className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">The Challenge</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Conventional methods use scheduling systems for determining points on the map that are worth observing. 
          Auto-scheduler systems are effective in selecting priority observations but these methods are not 
          real-time or fully accurate. Incorrect decisions by satellites lead to wastage of power and redundant 
          data. This research aims to enable satellites to autonomously determine valid observation locations in 
          real time during Earth Science Missions.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Research Approach</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The project focuses on creating an RL environment that emulates the satellite's decisions to measure 
          over the priority observational points. This involves:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 ml-4">
          <li>Usage of large simulated environmental data in NASA GEOS-5 dataset</li>
          <li>Model selection and training</li>
          <li>Testing and tuning of the model</li>
          <li>Evaluation through comparison with a random forest classifier model</li>
        </ul>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Current Results</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Ongoing research has seen a policy-based DQN model and a Quantile-Regression DQN model perform with 
          79% recall. However, the results showed a low F1 score due to more false positive actions. The low 
          precision is potentially due to oversampling near the 0° latitude and the huge class imbalance in the 
          datasets derived from NASA GEOS-5.
        </p>
      </div>

      <div className="mb-8 p-6 border-2 border-blue-500 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Future Work</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The project focuses on preparing larger training datasets of 8-12 months with additional features like 
          cloud optical thickness and incoming shortwave flux. The project further aims to use Decision 
          Transformers or STTNs in ensemble with reinforcement learning to tackle the oversampling challenge.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The research will be considered a success when the results correspond with the simulated data on 
          convective precipitation storms, proving a greater precision than predictive supervised learning models 
          like the random forest classifier.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Impact & Skills</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The ultimate goal of the research is to autonomously enable satellites in prioritizing areas with high 
          atmospheric activity, enhancing environmental monitoring and providing deeper insights to Earth's 
          atmospheric dynamics. This aligns with the theme "Joy of Living" as it leads to more useful data yielded 
          that affect a variety of applications like:
        </p>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <p className="text-sm font-medium">Meteorological predictions</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <p className="text-sm font-medium">Disaster relief</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <p className="text-sm font-medium">Geological surveys</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded">
            <p className="text-sm font-medium">Defense strategies</p>
          </div>
        </div>
        <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
          This research also made me competent in industrial skills like Python, handling big data servers like 
          OpenDAP, and heavy mathematical concepts behind deep reinforcement learning.
        </p>
      </div>

      {/* Reflective Writeup */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 rounded-lg border-l-4 border-blue-500">
        <h3 className="font-semibold text-lg mb-4 text-blue-900 dark:text-blue-100">
          Connection to "Joy of Living" & Personal Impact
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-md mb-2 text-blue-800 dark:text-blue-200">
              GCSP Theme Relevance
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              This research directly contributes to the "Joy of Living" theme by improving the quality and 
              accuracy of Earth observation data. Better satellite targeting means more effective disaster 
              preparedness and response, saving lives during hurricanes, floods, and severe storms. Enhanced 
              meteorological predictions help farmers optimize crop yields, coastal communities prepare for 
              weather events, and cities better manage resources. By making satellite systems smarter and more 
              autonomous, we enable better decision-making that protects communities and improves daily life 
              for millions of people worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-blue-800 dark:text-blue-200">
              Professional Development
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              This research experience has been transformative for my career trajectory in aerospace engineering 
              and machine learning. Working with cutting-edge reinforcement learning techniques and NASA datasets 
              has given me hands-on experience with technologies used by leading space agencies and tech companies. 
              I've developed proficiency in Python, PyTorch, handling large-scale environmental data through 
              OpenDAP servers, and implementing complex deep learning architectures. The experience of presenting 
              at the FURI Symposium has improved my scientific communication skills, while regular meetings with 
              Dr. Grogan have taught me how to approach research methodically and think critically about results. 
              These skills are directly applicable to careers in autonomous systems, satellite engineering, and 
              AI research.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-blue-800 dark:text-blue-200">
              Personal Growth
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Beyond technical skills, this research has deepened my appreciation for how engineering can address 
              real-world challenges. Working through setbacks—like the class imbalance issues and low precision 
              scores—has taught me resilience and the importance of iterative problem-solving. I've learned that 
              research is not just about achieving perfect results, but about understanding why things work or 
              don't work, and persistently refining approaches. This experience has reinforced my passion for using 
              technology to make a tangible positive impact on society, particularly in environmental monitoring 
              and climate science. It has also shown me the joy that comes from contributing to something larger 
              than myself—work that will benefit communities around the world through better disaster preparedness 
              and resource management.
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          <span className="font-semibold">Funding:</span> FURI and GCSP Research funding ($4,600 total)
        </p>
      </div>
    </section>
  )
}