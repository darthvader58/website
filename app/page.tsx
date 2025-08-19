import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hello There! I'm Shashwat Raj.
      </h1>
      <p className="mb-4">
        {`I am a sophomore majoring in Computer Systems Engineering  with a minor in Mathematics at Arizona State University.`}</p>
      <p className= "mb-4">{`I am passionate about math, robotics and software development. I love to learn new technologies and work around Machine Learning projects. Currently being an undergraduate student researcher, I am developing reinforcement learnings for optimising Earth Science Observations for autonomously determining priority observations in a dynamic environment. I am also learning about cloud computing and languages like Go and Cuda. I am also a founder of 2 startups and host of a podcast - Write It Out.`}</p>
      <p className= "mb-4">{`Checkout my startup WoofCare and some of my other popular projects - Formath, Terrader, Whatrobe and Tansen.`}</p>
      
    </section>
  )
}
