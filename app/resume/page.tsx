export const metadata = {
    title: 'Resume',
    description: 'Download my resume.',
  }
  
  export default function Resume() {
    const resumes = [
      {
        name: 'ML/AI Engineering',
        description: 'Highlights machine learning, AI, and research experience',
        file: '/Final_Resume_Shashwat_Raj_ML.pdf',
      },
      {
        name: 'Software Development/Engineering',
        description: 'Emphasizes full-stack development and software engineering',
        file: '/Final_Resume_Shashwat_Raj_Dev.pdf',
      },
      {
        name: 'Hardware Engineering/Verification',
        description: 'Focuses on embedded systems, robotics, and hardware projects',
        file: '/Final_Resume_Shashwat_Raj_Hardware.pdf',
      },
    ]
  
    return (
      <section>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Resume</h1>
        <p className="mb-8 text-neutral-700 dark:text-neutral-300">
          Download my resume in different formats, each tailored to highlight specific skill sets and experiences.
        </p>
        <div className="space-y-4">
          {resumes.map((resume, index) => (
            <a
              key={index}
              href={resume.file}
              download
              className="block p-4 border border-neutral-200 dark:border-neutral-800 rounded-lg hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-semibold text-lg tracking-tight mb-1">{resume.name}</h2>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{resume.description}</p>
                </div>
                <svg
                  className="w-5 h-5 text-neutral-600 dark:text-neutral-400 flex-shrink-0 mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-12 p-4 bg-neutral-50 dark:bg-neutral-900 rounded-lg">
          <h3 className="font-semibold mb-2">Quick Overview</h3>
          <ul className="space-y-1 text-sm text-neutral-700 dark:text-neutral-300">
            <li>• <span className="font-medium">Education:</span> B.S.E. Computer Systems Engineering + B.S. Mathematics (Dual Major)</li>
            <li>• <span className="font-medium">University:</span> Arizona State University (GPA: 3.78/4.0)</li>
            <li>• <span className="font-medium">Expected Graduation:</span> 2027</li>
            <li>• <span className="font-medium">Key Skills:</span> Machine Learning, Systems Design, Full-Stack Development, Embedded Systems, Robotics</li>
          </ul>
        </div>
      </section>
    )
  }