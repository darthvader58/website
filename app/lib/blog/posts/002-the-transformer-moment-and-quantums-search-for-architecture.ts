import type { BlogPost } from '../types'

export const theTransformerMomentAndQuantumsSearchForArchitecturePost: BlogPost = {
  slug: 'the-transformer-moment-and-quantums-search-for-architecture',
  title: "Is Quantum Computing also awaiting a Transformers Moment?",
  subtitle:
    "How Transformers became modern AI's default architecture, and why quantum is still looking for its own scalable abstraction/convergence",
  excerpt:
    "Transformers won because they matched model design, hardware, and economics at the same time. Quantum computing becomes interesting when AI's next bottlenecks stop being purely algorithmic and start becoming physical.",
  category: 'AI Systems',
  readTime: '14 min read',
  publishedAt: '2026-05-17',
  issueLabel: 'Issue No. 002',
  imageDirectory: 'blog2',
  blocks: [
    {
      type: 'html',
      html: `
        <p class="lead blog-dropcap">Why did one architecture become the common grammar of foundation models in the first place? </p>
        <p>And once that architecture scaled, what did it reveal about the limits of the physical world underneath AI? That is the trail that kept leading me from Transformers to power demand, from GPUs to energy systems, and from there to quantum computing. Not because quantum is some clean replacement for AI, but because once the bottlenecks stop being purely algorithmic, the conversation gets dragged into physics whether we like it or not.</p>

        <h2>Why Transformers walked in and took over the room</h2>
        <p>AI used to feel like a crowded engineering party.</p>
        <p>CNNs were standing near the vision table with quiet confidence. RNNs and LSTMs were trying very hard to remember the order of every conversation. Decision trees were in the corner solving business problems without making a big deal out of it. GANs were showing everyone suspiciously realistic faces. Reinforcement learning had arrived wearing sunglasses indoors and was teaching a robot to fall over with purpose.</p>
        <p>Then Transformers walked in.</p>
        <p>Not politely. Not quietly. More like someone joining a group project two hours before the deadline and somehow carrying the final submission.</p>
        <blockquote>
          <p>Transformers did not win because every other model became useless.</p>
          <p>They won because they arrived at the exact intersection of flexibility, parallelism, and scale.</p>
        </blockquote>
        <p>That is the part worth studying.</p>
        <p>The original 2017 paper, <em>Attention Is All You Need</em>, proposed a sequence-transduction architecture based entirely on attention, removing recurrence and convolutions from the core model while reporting strong translation performance with significantly more parallelizable training.<sup><a href="#reference-1">1</a></sup> That last part mattered more than the joke-friendly title. Parallelism was not just a nice engineering detail. It was the feature that aligned the model with the hardware era.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'architecture-party.png',
      alt: 'Placeholder image for a humorous machine learning architecture party scene.',
    },
    {
      type: 'html',
      html: `
        <p>Before Transformers, recurrent models processed sequences more like someone reading a novel one page at a time. Useful, sometimes elegant, but stubbornly sequential. Transformers changed that rhythm. Self-attention let tokens relate directly to other tokens in the sequence. A word could attend to another word. A code token could attend to another code token. An image patch could attend to another image patch. The model was not simply walking through a sequence anymore. It was building a relationship map across it.</p>
        <p>That makes for a better fit with accelerators. GPUs and TPUs reward workloads that can be parallelized. Transformers were not just conceptually expressive. They were computationally convenient.</p>

        <h2>The architecture became a language</h2>
        <p>Then came portability.</p>
        <p>Language became tokens. Code became tokens. Images became patch tokens. Audio could be represented as sequences. Even some biological data could be treated as sequence-like under the right framing. Once many domains could be translated into token-ish representations, the same broad architectural pattern started traveling unusually well.</p>
        <p>BERT showed that Transformer-based pretraining on unlabeled text could be adapted across a wide range of NLP tasks with minimal task-specific architectural surgery.<sup><a href="#reference-2">2</a></sup> GPT-3 showed that scaling autoregressive Transformer language models unlocked broader few-shot performance across many tasks.<sup><a href="#reference-3">3</a></sup> Vision Transformer pushed the same basic story into image recognition by splitting images into patches and treating them like sequence elements.<sup><a href="#reference-4">4</a></sup></p>
        <p>That is when Transformers stopped feeling like one clever neural-network block and started feeling like a general-purpose interface for large-scale learning.</p>
        <p>A little funny, honestly. The architecture that made "attention" famous ended up getting most of the attention.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'rnn-vs-transformer.png',
      alt: 'Placeholder image comparing sequential recurrent processing with Transformer attention across tokens.',
    },
    {
      type: 'html',
      html: `
        <p>Of course, none of this means the rest of machine learning packed up and left. That would be too clean, and machine learning does not believe in clean narratives.</p>
        <p>Tree-based models still perform extremely well on many tabular problems. A large benchmark comparing 19 algorithms across 176 datasets found that the "neural nets versus boosted trees" debate is often overstated, and that small differences in tuning can matter more than switching model families entirely.<sup><a href="#reference-5">5</a></sup> Diffusion models became one of the defining paradigms in image generation, with research showing they can outperform GANs on image synthesis benchmarks.<sup><a href="#reference-6">6</a></sup> Even sequence modeling is no longer a one-team league; Mamba was explicitly proposed as a selective state-space alternative to address Transformer inefficiencies on long sequences, while noting how thoroughly foundation models had already converged on Transformer-style design.<sup><a href="#reference-7">7</a></sup></p>
        <p>So the honest picture is not monoculture.</p>
        <p>It is more like a dominant dialect.</p>
        <p>Modern AI still speaks many architectural languages, but the foundation-model world increasingly sounds fluent in Transformer.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'tokens-across-domains.png',
      alt: 'Placeholder image showing text, code, image patches, and other modalities flowing into Transformer blocks.',
      captionHtml: 'Tokens across domains. (Image adapted from <a href="https://blog.bytebytego.com/p/multimodal-llms-basics-how-llms-process" target="_blank" rel="noopener noreferrer"Multimodal LLMs Basics"</a>.)',
    },
    {
      type: 'html',
      html: `
        <h2>Scaling turns into an infrastructure story</h2>
        <p>And that fluency came with a cost.</p>
        <p>The same design pattern that made modern AI feel general also made it resource-hungry. Hungry for chips. Hungry for memory bandwidth. Hungry for power. Hungry for cooling. Hungry for data centers that make local grids wonder whether they accidentally signed up for a stress test.</p>
        <p>This is where the story stops being only about algorithms and becomes a story about infrastructure. The bottleneck is no longer just whether we can design a smarter model. It is whether we can power it, cool it, manufacture enough accelerators for it, connect enough data centers for it, and do all of that without turning every utility planner into the unwilling protagonist of an industrial panic attack.</p>
        <blockquote>
          <p>The model is digital.</p>
          <p>The bill is physical.</p>
        </blockquote>
        <p>The International Energy Agency projects that global data-center electricity consumption could more than double to around 945 TWh by 2030, with AI as a major driver of that growth.<sup><a href="#reference-8">8</a></sup> RAND's 2025 analysis sharpens the point further: global AI data-center power demand could reach 68 GW by 2027, and individual AI training runs could require up to 1 GW in a single location by 2028 under exponential-growth assumptions.<sup><a href="#reference-9">9</a></sup></p>
        <p>So yes, Transformers helped AI scale.</p>
        <p>But scaling has receipts.</p>

        <h2>Where quantum actually enters the conversation</h2>
        <p>This is where quantum computing starts to matter more naturally.</p>
        <p>Not as "the next architecture after Transformers." That is too direct and probably wrong. Quantum becomes interesting because the AI era is exposing bottlenecks that are not purely software bottlenecks anymore. Some are compute bottlenecks. Some are optimization bottlenecks. Some are chemistry and materials bottlenecks hiding under the infrastructure layer.</p>
        <p>Better chips require better materials. Better batteries require better chemistry. Better cooling systems require better thermal engineering. Better grids require better optimization. Better AI infrastructure may depend not only on better neural networks, but on better physics.</p>
        <p>Quantum computing, in its most credible long-term form, is a bet that some problems rooted in quantum physics may be better handled by machines that use quantum physics directly. The National Academies report emphasizes both the original motivation for quantum computing and the more realistic framing that quantum machines are unlikely to replace classical computers outright. They are better thought of as specialized accelerators or co-processors for certain problem classes.<sup><a href="#reference-10">10</a></sup></p>
        <p>That framing matters because it keeps the argument honest. Quantum computing will probably not make tomorrow's chatbot cheap. It is not going to walk into a hyperscale data center, pat the GPU cluster on the back, and cut the electricity bill in half.</p>
        <p>The stronger argument is more indirect and, because of that, more believable: quantum computing may eventually help with the scientific and optimization problems that surround the AI economy. Materials discovery. Chemistry simulation. Semiconductor design. Battery chemistry. Thermal management. Energy systems. Maybe even certain machine-learning workflows, though that part remains much more speculative.</p>
        <p>In other words, quantum is not interesting because it replaces AI.</p>
        <p>Quantum is interesting because some of AI's next bottlenecks may not be solvable by AI alone.</p>
      `,
    },
    {
      type: 'html',
      html: `
        <h2>Quantum is still searching for its abstraction layer</h2>
        <p>This is also exactly where the hype needs discipline.</p>
        <p>Quantum computers are not magic GPU dust. Current and near-term machines are noisy, difficult to control, and limited by error rates. The National Academies report points to noisy gates, limited measurement, difficulty loading large amounts of classical data efficiently, and the central challenge of error correction.<sup><a href="#reference-10">10</a></sup> That data-loading problem is especially important for AI. Modern AI runs on enormous classical datasets. If moving classical data into quantum states is itself inefficient, then quantum computing does not automatically become a shortcut for training large neural networks. The bottleneck just changes clothes and becomes even less friendly.</p>
        <p>John Preskill's NISQ framing still feels useful here. Noisy intermediate-scale quantum devices may help explore many-body quantum physics and possibly some other applications, but a 100-qubit machine is not instantly world-changing just because it sounds futuristic.<sup><a href="#reference-11">11</a></sup></p>
        <p>One of the most credible near-term bridges may actually run from AI to quantum, not quantum to AI. AI is already being studied as a tool for developing and operating quantum systems: designing hardware, tuning devices, optimizing control, improving error correction, and managing complicated experimental setups. A 2025 <em>Nature Communications</em> review explicitly centers this "AI for quantum" direction and separates it from the more speculative long-term idea of "quantum for AI."<sup><a href="#reference-12">12</a></sup></p>
        <p>That relationship matters. AI may help build better quantum systems. Quantum systems may eventually help solve scientific and infrastructure problems that support the next generation of AI. The relationship is less "replacement" and more "feedback loop."</p>
        <p>The long-term prize is fault-tolerant quantum computing, where many imperfect physical qubits are combined into more reliable logical qubits. Recent work from Google Quantum AI reported below-threshold surface-code memories on its Willow superconducting processor, meaning logical error rates were suppressed as code distance increased. That is an important step for scalable error correction.<sup><a href="#reference-13">13</a></sup></p>
        <p>But it is still a milestone on the road, not the destination.</p>
        <p>This is where the comparison to Transformers gets interesting again.</p>
        <p>AI found a powerful abstraction: tokens plus attention plus scale.</p>
        <p>Quantum computing is still searching for the abstraction layer that lets it scale.</p>
        <p>Maybe that layer is hardware. Maybe superconducting qubits win. Maybe trapped ions win. Maybe neutral atoms scale better. Maybe photonics becomes the surprise platform. Maybe silicon spin qubits benefit from semiconductor manufacturing. Maybe the field has not yet identified the eventual winner.</p>
        <p>Or maybe convergence does not happen at the physical layer at all.</p>
        <p>Maybe the real "Transformer moment" for quantum is a common logical layer: fault-tolerant, gate-based quantum computing where developers work with logical qubits and circuits without caring too much about the underlying hardware. In AI, the convergence happened around a software architecture. In quantum, it may happen around error correction, logical qubits, compilers, programming models, and hybrid quantum-classical workflows.</p>
        <p>That would look a lot more like cloud computing than like model architecture fandom. Most people writing Python are not thinking about transistor physics. They assume the abstraction works, and then they blame the API when it doesn't, as tradition demands.</p>
        <p>But another possibility is more plural and maybe more realistic: quantum computing may not converge cleanly. Different problem classes may favor different machines. Chemistry, materials simulation, cryptography, optimization, and many-body physics may not all want the same architecture. The physical world is stubborn. It does not always allow the kind of elegant abstraction software people keep trying to bully it into.</p>
        <p>AI could flatten many things into tokens.</p>
        <p>Quantum still has to negotiate with matter.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'quantum-abstraction-layer.png',
      alt: 'Placeholder image showing multiple physical qubit types feeding into logical qubits, compilers, and applications.',
    },
    {
      type: 'html',
      html: `
        <h2>The question I keep returning to</h2>
        <p>That, to me, is the real lesson from Transformers. Not that every field eventually finds one architecture and everyone else goes home. The lesson is more specific: a field starts to feel unified when one approach becomes technically strong, hardware-compatible, economically scalable, and easy for the ecosystem to build around.</p>
        <p>Transformers did that for foundation models.</p>
        <p>Quantum computing has not found that shape yet.</p>
        <p>Maybe it will. Maybe the winning abstraction will be logical qubits rather than physical qubits. Maybe the future is hybrid quantum-classical computing. Maybe it is a messy ecosystem of specialized quantum machines, each optimized for a different problem class.</p>
        <p>Either way, the question is too good to ignore.</p>
        <p>The Transformer became the architecture of attention because it gave AI a scalable way to model relationships. But once AI scaled, it slammed into the physical world: power, chips, cooling, materials, grids, and energy. Quantum computing matters not because it is the next shiny object after AI, but because some of AI's hardest future bottlenecks may live in places where physics itself becomes the problem.</p>
        <p>And if physics is the problem, maybe physics also becomes part of the computer.</p>
        <p>This is probably why the topic keeps pulling me back. As a math major, I like fields when they are still searching for the abstraction that makes everything click. That moment right before a messy collection of ideas becomes a framework is intellectually chaotic in the best way. It is also where a lot of the interesting questions live.</p>
        <p>So that is where blog number two leaves me: somewhere between Transformer scaling laws, utility-grid anxiety, quantum error correction, and the vague feeling that the future of computing is going to be decided by people who understand both software and the physical limits underneath it.</p>
        <blockquote>
          <p>If Transformers became the architecture of attention,</p>
          <p>what becomes the architecture of entanglement?</p>
        </blockquote>
        <hr />
        <h3>References</h3>
        <ol>
          <li id="reference-1"><a href="https://arxiv.org/abs/1706.03762" target="_blank" rel="noopener noreferrer">Ashish Vaswani et al., "Attention Is All You Need."</a></li>
          <li id="reference-2"><a href="https://arxiv.org/abs/1810.04805" target="_blank" rel="noopener noreferrer">Jacob Devlin et al., "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding."</a></li>
          <li id="reference-3"><a href="https://arxiv.org/abs/2005.14165" target="_blank" rel="noopener noreferrer">Tom B. Brown et al., "Language Models are Few-Shot Learners."</a></li>
          <li id="reference-4"><a href="https://arxiv.org/abs/2010.11929" target="_blank" rel="noopener noreferrer">Alexey Dosovitskiy et al., "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale."</a></li>
          <li id="reference-5"><a href="https://arxiv.org/abs/2305.02997" target="_blank" rel="noopener noreferrer">Duncan McElfresh et al., "When Do Neural Nets Outperform Boosted Trees on Tabular Data?"</a></li>
          <li id="reference-6"><a href="https://arxiv.org/abs/2105.05233" target="_blank" rel="noopener noreferrer">Prafulla Dhariwal and Alexander Nichol, "Diffusion Models Beat GANs on Image Synthesis."</a></li>
          <li id="reference-7"><a href="https://arxiv.org/abs/2312.00752" target="_blank" rel="noopener noreferrer">Albert Gu and Tri Dao, "Mamba: Linear-Time Sequence Modeling with Selective State Spaces."</a></li>
          <li id="reference-8"><a href="https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai" target="_blank" rel="noopener noreferrer">International Energy Agency, "Energy and AI: Energy demand from AI."</a></li>
          <li id="reference-9"><a href="https://www.rand.org/pubs/research_reports/RRA3572-1.html" target="_blank" rel="noopener noreferrer">Lennart Heim et al., "Managing the Growing Electricity Demand of AI."</a></li>
          <li id="reference-10"><a href="https://www.nationalacademies.org/read/25196/chapter/2" target="_blank" rel="noopener noreferrer">National Academies of Sciences, Engineering, and Medicine, <em>Quantum Computing: Progress and Prospects</em>.</a></li>
          <li id="reference-11"><a href="https://quantum-journal.org/papers/q-2018-08-06-79/" target="_blank" rel="noopener noreferrer">John Preskill, "Quantum Computing in the NISQ era and beyond."</a></li>
          <li id="reference-12"><a href="https://www.nature.com/articles/s41467-025-65836-3" target="_blank" rel="noopener noreferrer">Huatang Tan et al., "Artificial intelligence for quantum computing."</a></li>
          <li id="reference-13"><a href="https://www.nature.com/articles/s41586-024-08449-y" target="_blank" rel="noopener noreferrer">Rajeev Acharya et al., "Quantum error correction below the surface code threshold."</a></li>
        </ol>
      `,
    },
  ],
}
