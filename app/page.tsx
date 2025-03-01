import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello There! I'm Shashwat Raj.
      </h1>
      <p className="mb-4">
        {`I am a sophomore majoring in Computer Systems Engineering  with a minor in Mathematics at Arizona State University. 
        
        I am a passionate software developer and a tech enthusiast. I love to learn new technologies and work on projects that challenge me. I am currently working on a project that involves building a web application using React, TypeScript, and Firebase. I am also learning about cloud computing and machine learning. I am looking for internships in software development and software engineering roles. I am open to learning new technologies and working on projects that challenge me.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
