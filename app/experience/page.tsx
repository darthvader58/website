export const metadata = {
  title: 'Experience',
  description: 'My work experience and professional journey.',
}

interface Experience {
  company: string
  role: string
  period: string
  location: string
  description: string[]
}

const experiences: Experience[] = [
  {
    company: 'WoofCare Solutions Pvt. Ltd.',
    role: 'Founder & CEO',
    period: 'May 2025 – Present',
    location: 'India',
    description: [
      'Developing a mobile app using Flutter + Firebase + a Python backend, connecting dog lovers & dog care services to improve lives of stray dogs in India. Project funded by EPICS (Engineering Projects In Community Service) at ASU.',
      'Integrated Google\'s Admob & Apps API to facilitate seamless location-based services & crowdfunds, partnering with over 60+ local and large NGOs in Pune, India including Voice of Stray Dogs (VOSD) and Dogs Friendly Pune.',
    ],
  },
  {
    company: 'Collective Design (CoDe) lab, Arizona State University',
    role: 'Machine Learning Developer and Researcher',
    period: 'May 2024 – Present',
    location: 'Tempe, Arizona',
    description: [
      'Developing Reinforcement Learning techniques to optimize Earth science missions to autonomously determine priority observations in space, under the mentorship of Dr. Paul Grogan of SCAI Faculty at ASU.',
      'Co-authoring a review paper discussing relation between OSSEs & Mission Engineering.',
      'Trained DQN and QRDQN models using Pytorch, GeoPandas, TAT-C, Seaborn on NASA\'s Geos5 dataset, achieving 67% precision and 87% recall resp. Receiving total $4600 through FURI and GCSP Research funding.',
    ],
  },
  {
    company: 'MentorU',
    role: 'Product Development Manager',
    period: 'July 2025 – August 2025',
    location: 'Los Angeles, California',
    description: [
      'Managed/Led a team of 5 developers developing a full-stack online platform for college admission counseling startup, to automate features like scholarship finder and personal story-building. Increased UX Research success by 150%.',
    ],
  },
  {
    company: 'SAG, DRDO',
    role: 'Applied AI and Cryptography Engineering Intern',
    period: 'July 2025 – August 2025',
    location: 'Delhi, India',
    description: [
      'Worked under Dr. Shantanu and Dr. Girish in the ML & Cryptography Lab on a distinguisher model using ensemble learning, involving RNN, LSTM and Encoder-based Transformer model-architecture to classify random text and encrypted text in AES in CBC mode, achieving 74% precision.',
    ],
  },
  {
    company: 'Invincibles Robotics',
    role: 'Hardware Engineer',
    period: 'August 2022 – December 2023',
    location: 'New Delhi, India',
    description: [
      'Designed and built power distribution boards, safety mechanisms, TX/RX configurations and ESC modifications for Battlebots, ranging from 15lbs to 60lbs.',
      'Led the team (sponsored by Roboverse) to 30+ international and national wins, with 100k+ collected over prize money.',
    ],
  },
  {
    company: 'Team Inferno, Delhi Technological University (DTU)',
    role: 'Systems Engineer',
    period: 'December 2022 – February 2023',
    location: 'New Delhi, India',
    description: [
      'Developed custom PCBs on Allegro for incorporating embedded systems on-board the prototype Mars Rover for University Rover Challenge (URC). Programmed perception and navigation systems using ROS, OpenGL and SLAM on Python, along with various other system simulations on Gazebo.',
    ],
  },
  {
    company: 'IIRIS Consultancy Pvt. Ltd.',
    role: 'Software Development Intern',
    period: 'June 2022',
    location: 'Gurgaon, India',
    description: [
      'Maintained customer/client databases for more than 100 clients using Python and PostgreSQL. Automated Meetings Scheduler and Emailing System for Marketing Leads for 20+ distinct Services.',
    ],
  },
]

export default function Experience() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Experience</h1>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div key={index} className="border-l-2 border-neutral-200 dark:border-neutral-800 pl-4 pb-8">
            <div className="mb-2">
              <h2 className="font-semibold text-lg tracking-tight">{exp.company}</h2>
              <p className="text-neutral-800 dark:text-neutral-200 font-medium">{exp.role}</p>
              <div className="flex flex-col md:flex-row md:items-center md:space-x-2 text-sm text-neutral-600 dark:text-neutral-400">
                <span>{exp.period}</span>
                <span className="hidden md:inline">•</span>
                <span>{exp.location}</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-1 text-neutral-700 dark:text-neutral-300">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-sm leading-relaxed">{desc}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}