import Link from 'next/link';

export default function BlogPost({ params }: { params: { id: string } }) {
  // In a real app, you'd fetch the blog post from a database or CMS
  const post = {
    id: params.id,
    title: "Building Scalable ML Systems",
    date: "2024-11-20",
    readTime: "8 min read",
    category: "Machine Learning",
    content: `
      <p>Machine learning systems in production require careful consideration of scalability, reliability, and maintainability. In this post, we'll explore best practices for deploying ML models at scale.</p>
      
      <h2>Key Considerations</h2>
      <p>When building production ML systems, there are several critical factors to consider:</p>
      
      <h3>1. Model Serving</h3>
      <p>Choosing the right serving infrastructure is crucial. Options include:</p>
      <ul>
        <li>REST APIs with frameworks like FastAPI or Flask</li>
        <li>gRPC for high-performance scenarios</li>
        <li>Batch prediction for offline use cases</li>
      </ul>
      
      <h3>2. Monitoring and Observability</h3>
      <p>Continuous monitoring helps detect model drift and performance degradation. Key metrics include:</p>
      <ul>
        <li>Prediction latency</li>
        <li>Model accuracy over time</li>
        <li>Data distribution shifts</li>
      </ul>
      
      <h3>3. Scalability</h3>
      <p>Design your system to handle varying loads efficiently. Consider:</p>
      <ul>
        <li>Horizontal scaling with load balancers</li>
        <li>Caching strategies for frequently requested predictions</li>
        <li>Asynchronous processing for non-real-time scenarios</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Building scalable ML systems requires a holistic approach that considers infrastructure, monitoring, and operational excellence. Start small, measure everything, and iterate based on real-world performance.</p>
    `
  };

  return (
    <section className="fade">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <article className="max-w-3xl">
        <div className="mb-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-900/50 text-purple-300 border border-purple-700/50 mb-4">
            {post.category}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-3 text-slate-400">
            <time>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 mb-4">
            Enjoyed this post? Subscribe to get notified about new articles.
          </p>
          <Link 
            href="/blog#newsletter"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Subscribe to Newsletter
          </Link>
        </div>
      </article>
    </section>
  );
}
