import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Entrepreneurship - GCSP',
  description: 'Tansen: AI-powered music transcription and learning',
}

export default function Entrepreneurship() {
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
        Viable Business/Entrepreneurship: Tansen 💼
      </h1>

      <div className="mb-8">
        <h2 className="font-semibold text-xl mb-3">
          FSE 301: Startup Pitch & Business Development
        </h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
          Spring 2025 | Prof. Brent Sebold
        </p>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          I took FSE 301 in Spring 2025 under Prof. Brent Sebold. As part of FSE 301, I learnt how to scale a 
          startup and create a value proposition of the product/service. The course teaches us about how to grow 
          startups and prepare pitches that convince users to pay for the product/service.
        </p>
      </div>

      {/* Image Gallery */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4">Tansen Demo & Presentation</h3>
        <div className="relative w-full rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-2">
          <Image
            src="/images/gcsp/entrepreneurship/presentation.png"
            alt="Tansen Startup Presentation and Demo"
            width={1200}
            height={800}
            className="w-full h-auto"
          />
        </div>
        <p className="text-xs text-neutral-600 dark:text-neutral-400 text-center italic mb-6">
          Tansen presentation showcasing AI-powered music transcription technology and business model
        </p>
      </div>

      <div className="mb-8 p-6 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">The Product: Tansen</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Tansen helps any music hobbyist learn how to play an instrument of their choice and play any song on 
          their preferred scale and instrument after getting the right song notes. This perfectly aligns with the 
          GCSP theme of "Joy of Living" as it helps musicians improve their music and practise their art in a 
          more efficient way.
        </p>
        <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
          <p className="text-sm text-neutral-700 dark:text-neutral-300">
            <span className="font-semibold">Mission:</span> Making music learning accessible and enjoyable for 
            everyone through AI-powered transcription and personalized instruction.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Key Features</h3>
        <div className="space-y-4">
          <div className="p-4 border-l-4 border-purple-500 bg-neutral-50 dark:bg-neutral-900">
            <h4 className="font-semibold mb-2">🎵 Music Transcription</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              AI-powered transcription converts any song into playable notes for your preferred instrument using 
              advanced audio processing models.
            </p>
          </div>
          <div className="p-4 border-l-4 border-purple-500 bg-neutral-50 dark:bg-neutral-900">
            <h4 className="font-semibold mb-2">🎹 Multi-Instrument Support</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Learn and practice on any instrument of your choice with customized sheet music and tutorials.
            </p>
          </div>
          <div className="p-4 border-l-4 border-purple-500 bg-neutral-50 dark:bg-neutral-900">
            <h4 className="font-semibold mb-2">🎼 Scale Conversion</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Automatically transpose songs to your preferred scale and key, making learning more accessible.
            </p>
          </div>
          <div className="p-4 border-l-4 border-purple-500 bg-neutral-50 dark:bg-neutral-900">
            <h4 className="font-semibold mb-2">📚 Personalized Lessons</h4>
            <p className="text-sm text-neutral-700 dark:text-neutral-300">
              Get instant lessons and practice materials tailored to your skill level and musical preferences.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Technical Innovation</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Tansen leverages cutting-edge deep learning models for audio engineering and music transcription:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <p className="text-sm font-medium">Onsets & Frames</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <p className="text-sm font-medium">Demucs</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <p className="text-sm font-medium">Basic Pitch</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <p className="text-sm font-medium">Flutter</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <p className="text-sm font-medium">FastAPI</p>
          </div>
          <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded text-center">
            <p className="text-sm font-medium">PyTorch</p>
          </div>
        </div>
        <p className="mt-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          The model is trained over 20,000+ MP3 & MIDI files, ensuring high-quality transcription across a wide 
          variety of musical genres and styles.
        </p>
      </div>

      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-3">Business Model & Value Proposition</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          Through FSE 301, I developed a comprehensive business strategy that includes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-neutral-700 dark:text-neutral-300 ml-4">
          <li>Freemium model with basic transcription features</li>
          <li>Premium subscription for advanced features and unlimited transcriptions</li>
          <li>B2B partnerships with music schools and instructors</li>
          <li>API access for music education platforms</li>
        </ul>
      </div>

      {/* Reflective Writeup */}
      <div className="mb-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 rounded-lg border-l-4 border-purple-500">
        <h3 className="font-semibold text-lg mb-4 text-purple-900 dark:text-purple-100">
          Connection to "Joy of Living" & Personal Impact
        </h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-md mb-2 text-purple-800 dark:text-purple-200">
              GCSP Theme Relevance
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Tansen directly embodies the "Joy of Living" theme by making music—one of humanity's most universal 
              sources of joy—more accessible to everyone. Music has the power to bring people together, provide 
              emotional release, and offer a creative outlet that enriches daily life. However, learning an 
              instrument can be frustrating and expensive, often requiring private lessons and sheet music that 
              many people cannot afford. By using AI to instantly transcribe any song to any instrument and key, 
              Tansen democratizes music education, allowing anyone with a smartphone to learn their favorite songs 
              at their own pace. Whether someone wants to play guitar at campfires, piano for personal relaxation, 
              or any other instrument to express themselves creatively, Tansen removes barriers and makes the joy 
              of making music accessible to all. This aligns perfectly with creating opportunities for people to 
              pursue hobbies and passions that enhance their quality of life and bring daily happiness.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-purple-800 dark:text-purple-200">
              Professional Development
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Developing Tansen through FSE 301 has given me comprehensive experience in the startup journey—from 
              ideation to product development to business strategy. I learned to identify market opportunities, 
              define target customers, and create value propositions that resonate with users. Building the 
              technical product required integrating multiple AI models (Onsets & Frames, Demucs, Basic Pitch) and 
              creating a full-stack application with Flutter and FastAPI, which deepened my skills in audio 
              processing, deep learning, and mobile development. Perhaps most importantly, I learned how to pitch 
              a technical product to both technical and non-technical audiences, translating complex AI capabilities 
              into clear user benefits. The course taught me about unit economics, customer acquisition strategies, 
              and scaling challenges—knowledge that's invaluable whether I pursue entrepreneurship or work at a 
              tech company. This experience has prepared me to launch products, understand business models, and 
              think about technology through the lens of real user needs and market viability.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-md mb-2 text-purple-800 dark:text-purple-200">
              Personal Growth
            </h4>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
              As someone passionate about both music and technology, creating Tansen has been uniquely fulfilling—it 
              combines my technical skills with my love for music in a way that could genuinely help people. Working 
              on this project has taught me that the most meaningful innovations often come from addressing problems 
              you personally understand. I've experienced the frustration of wanting to learn songs but finding 
              transcriptions unavailable or inaccurate, and building a solution to this problem has been deeply 
              satisfying. The entrepreneurship process has also taught me resilience and adaptability—from dealing 
              with model performance issues to refining the business model based on feedback. Most importantly, this 
              experience has shown me that I can take an idea from concept to working prototype to viable business 
              plan. It has given me the confidence to pursue my own ventures and the understanding that entrepreneurship 
              isn't just about having ideas, but about execution, persistence, and genuinely understanding your users' 
              needs. This project has reinforced that I want to build products that enhance people's lives and bring 
              them joy, whether through my own startups or innovative work within established companies.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 p-6 border-2 border-purple-500 rounded-lg">
        <h3 className="font-semibold text-lg mb-3">Skills Developed</h3>
        <p className="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">
          I personally learnt new tech skills and gained experience with:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm">Audio Engineering</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm">Deep Learning</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm">Full-Stack Development</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm">Pitching Skills</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm">Business Strategy</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span className="text-sm">Market Analysis</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
        <p className="text-sm text-neutral-700 dark:text-neutral-300">
          <span className="font-semibold">View Project:</span>
        </p>
        <a
          href="https://github.com/darthvader58/tansen"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
        >
          github.com/darthvader58/tansen →
        </a>
      </div>
    </section>
  )
}