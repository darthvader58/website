import type { BlogPost } from '../types'

export const astraNomicallyClosePost: BlogPost = {
  slug: 'gpt-6-astra-almost-agi',
  title: 'Astra-nomically Close',
  subtitle: 'Not AGI yet, but clearly in its orbit.',
  excerpt:
    'GPT-6 Astra can operate computers, write tools, navigate novel environments, and carry context across long tasks. It is not AGI, but it may be our clearest picture yet of almost-AGI.',
  author: 'Shashwat Raj',
  tags: [
    'AI',
    'GPT-6 Astra',
    'OpenAI',
    'benchmarks',
    'ARC-AGI',
    'AGI',
    'near-AGI',
    'context engineering',
    'evaluation',
  ],
  category: 'AI Systems',
  readTime: '10 min read',
  publishedAt: '2026-09-07',
  issueLabel: 'Issue No. 005',
  imageDirectory: 'blog5',
  blocks: [
    {
      type: 'html',
      html: `
        <p class="lead blog-dropcap">Most conversations about AGI begin with a definition. Astra makes a different question more useful: what would <em>almost-AGI</em> look like from the outside?</p>
        <p>It might look like a model that can operate a computer, work across long tasks, write its own tools, reconstruct 3D objects as CAD, lay out a circuit board, reverse-engineer software, and enter an unfamiliar environment with no instructions, infer its rules, and act with a plan. Not one model doing one narrow trick, but one system showing the beginnings of a much broader ability to understand and act.</p>
        <p>That does not make Astra AGI. Its world is still largely digital, its strongest results live inside defined tasks, and much of its performance depends on the system built around it. But the overall shape is new. Astra feels less like a model that simply answers questions and more like an early general-purpose operator: uneven, bounded, and incomplete, but capable across enough domains that the phrase <em>almost-AGI</em> no longer feels purely theoretical.</p>
        <p>On September 3, 2026, OpenAI released <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">GPT-6 Astra</a>. The most interesting way to understand it is to begin with what it can actually do, then look at how quickly and efficiently it does it, and only then turn to the benchmark numbers. Those numbers matter. They just make more sense after seeing the system they are trying to measure.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'Hero_16x9.png',
      alt: 'GPT-6 Astra announcement artwork',
      captionHtml:
        'GPT-6 Astra, released September 3, 2026. Image: <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">OpenAI</a>.',
    },
    {
      type: 'html',
      html: `
        <h2>What Astra actually is</h2>
        <p>Worth being precise here, because the launch coverage blurred it: Astra is not a video or image generator. It is not Sora. It is a reasoning and <strong>computer-use</strong> model, and the pitch is that anything you can do on a computer, it can attempt to do for you. The benchmark selection reflects that: Agents' Last Exam at 59.3%, ScreenSpot-Pro at 92.7%, AutomationBench at 41.4%, and 95.9% on BenchCAD, which tests reconstructing 3D objects from multi-view renders by generating CAD code. One of the launch demos is Astra doing printed circuit board layout in KiCad, turning a schematic into a manufacturable board by placing components and routing copper.</p>
        <p>The number I keep coming back to is OSWorld 2.0, because it reads like a product decision rather than a research result. Astra scores 72.6% at roughly 40 minutes per task, where Sol scored 65.7% at roughly 75 minutes. Higher score, roughly 47% less wall-clock time. Paired with an updated Codex harness, OpenAI reports 1.9x faster task completion on Mind2Web. Anyone who has tried to put a computer-use agent into a real workflow knows latency was always the thing that killed it, not accuracy. A model taking 75 minutes to do a 6-minute task is a great demo and a terrible tool.</p>
        <p>There is a cost story underneath too. Astra hits its Agents' Last Exam score using roughly 65% fewer output tokens than Claude Opus 5. API pricing is $10 per million input tokens and $50 per million output. Not cheap, except token efficiency is doing quiet work there. A model that costs more per token and uses a third of them is cheaper, and nobody puts that on a slide.</p>

        <h2>The size of the capability jump</h2>
        <p>The shift becomes easier to understand when Astra is placed beside the previous frontier. GPT-5.6 Sol was state of the art only a few months earlier, yet the individual results make Astra look less like an incremental upgrade and more like a step into a different capability range.</p>
        <p>On <strong>ARC-AGI-3</strong>, Sol scores <strong>7.8%</strong>. Astra scores <strong>99.9%</strong>. Same benchmark, same table, same company, one generation apart.</p>
        <p>It keeps going. On <strong>Terminal-Bench Science 0.1</strong>, a scientific-workflow eval, Sol gets 22.4% and Astra gets 64.6%. On <strong>AutomationBench</strong>, 18.1% to 41.4%. On <strong>Terminal-Bench 4.0</strong>, 37.3% to 57.9%. On <strong>SRE-Bench</strong>, which tests reverse-engineering binaries without source, Sol solves 55.9% on a single attempt and Astra solves 88.0%. On an internal ExploitBench built from June-August 2026 Chrome vulnerabilities, 5.5% to 39.0%, roughly a sevenfold jump. On long-context retrieval at 512K to 1M tokens, 73.8% to 96.3%.</p>
        <p>Then my favourite, because it is so specific and so odd: <strong>OpenScore String Quartets</strong>, a sheet-music transcription eval, where Sol scores 0.19 and Astra scores 0.84. That is not a model getting incrementally better at something it could already do. That is a capability that did not exist in the previous generation showing up in this one.</p>
        <p>The reliability numbers moved the same direction. On OpenAI's internal computer-use safety benchmark, where lower is better, Sol sits at 22.0% and Astra at 2.4%. Internal hallucination benchmark: 12.2% down to 4.2%. On an ExploitGym honeypot designed to catch models going after unauthorized targets, Sol took the bait 48.2% of the time and Astra took it 0.0% of the time.</p>
        <p>Put those side by side and the scale of the transition becomes difficult to describe as a normal generational improvement. This is not a point release. Whatever happened between these two models happened fast.</p>

        <h2>When every tool becomes an Astra capability</h2>
        <p>The benchmarks tell us how Astra performs. The demos show what that performance could actually be for.</p>
        <p>OpenAI showed Astra modeling a house in Blender and turning it into a walkable scene in Unreal Engine 5. It laid out a printed circuit board in KiCad by placing components and routing copper from a schematic. It scored 95.9% on BenchCAD by reconstructing 3D objects from multi-view renders as editable CAD programs. Elsewhere, it worked across Excel, Power BI, scientific software, websites, forms, and frontend testing.</p>
        <p>Notice what is happening in those examples. Astra is not replacing Blender, KiCad, or Unreal. It is operating them. The geometry, materials, lighting, copper traces, and simulations still come from professional software built over decades. Astra provides a new way to reach that depth.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'blender_52_panthera_joanna_kobierska.jpg',
      alt: 'Blender 5.2 LTS splash artwork by Joanna Kobierska, featuring the extinct cave lion Panthera spelaea',
      captionHtml:
        'Blender is thirty years of accumulated depth. Blender 5.2 LTS splash artwork by <a href="https://www.artstation.com/joanna_kobierska" target="_blank" rel="noopener noreferrer">Joanna Kobierska</a>, based on a model by <a href="https://theartofken.com/" target="_blank" rel="noopener noreferrer">Ken Barthelmey</a>, via <a href="https://www.blender.org/download/releases/5-2" target="_blank" rel="noopener noreferrer">blender.org</a>.',
    },
    {
      type: 'html',
      html: `
        <p>Blender did not suddenly become more capable in September. It has been absurdly capable for years, and so have KiCad, Unreal, and most professional tools with decades of accumulated features. The limiting factor was how few people had enough time and expertise to reach beyond the top few percent of what those tools could do.</p>
        <p>A strong computer-use model changes that relationship. If Astra can navigate the full surface area of a tool, the tool effectively becomes easier to use without losing its depth. A designer can move from a description to a walkable prototype. An engineer can move from a schematic to a board layout. An analyst can move from raw records to a polished model or dashboard. A developer can move from an idea to a website and then have the same system test the result.</p>
        <p><a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener noreferrer">MCP</a> broadens the same idea. Computer use lets an agent work through the interfaces people already use. MCP gives AI applications a standard way to connect directly to external data, tools, and workflows. One gives the model hands on the screen; the other gives it clean connectors behind the screen. Together, they turn every well-built tool into another capability an agent can potentially call on.</p>
        <p>That is where the business story gets interesting. The value is not merely that Astra can finish one task faster. It is that the same system can move across the entire chain of work: research, design, analysis, implementation, testing, documentation, and revision. Businesses can test more ideas, shorten the distance between departments, and reach a useful first version while an opportunity is still fresh.</p>
        <p>The human role does not disappear in that picture. Direction, taste, constraints, and final judgment become more important when execution gets cheaper. Astra does not replace thirty years of Blender engineering or the expertise needed to recognize a good result. It makes far more of that accumulated capability reachable.</p>
        <p>That is the practical meaning of almost-AGI. Not a machine that already knows everything, but one general enough to enter a new tool, understand what needs to happen, and begin building.</p>

        <h2>Now the benchmark part, which is where it gets weird</h2>
        <p>ARC-AGI-3 is not a knowledge test. It is a set of novel, abstract, turn-based environments where the agent gets no instructions. It has to poke at the environment, work out the rules, infer what the goal even is, build a model of the mechanics, and plan. The environments use only core knowledge priors and are difficulty-calibrated against real human testers. <a href="https://arcprize.org/blog/astra" target="_blank" rel="noopener noreferrer">Humans solve 100% of them.</a></p>
        <p>ARC Prize's stated purpose for the series is to measure the "residual gap" between current AI and AGI, and they define AGI as a system's ability to acquire <em>any</em> skill a human can, as <em>efficiently</em> as a human can. That efficiency clause is not decoration. It becomes important twice in this post.</p>
        <p>So here is the 99.9%, in context:</p>
      `,
    },
    {
      type: 'image',
      fileName: 'astra-arc-agi-3-leaderboard.png',
      alt: 'ARC-AGI-3 leaderboard showing GPT-6 Astra results under the Standard and Provider Adapter harnesses',
      captionHtml:
        'ARC-AGI-3 results for Astra under two different harnesses. Chart: <a href="https://arcprize.org/blog/astra" target="_blank" rel="noopener noreferrer">ARC Prize Foundation</a>.',
      expandable: true,
    },
    {
      type: 'html',
      html: `
        <p>Under ARC Prize's <strong>Standard harness</strong>, a minimal provider-neutral interface, Astra scores <strong>62.7%</strong> for about $26,000 of compute. Under the <strong>Provider Adapter harness</strong>, which lets the model use OpenAI's own context-management machinery and preserve its opaque reasoning state between requests, it scores <strong>99.9%</strong> for about $19,000.</p>
        <p>Same model. Same benchmark. Same day. 62.7 and 99.9.</p>
        <p>This is not a gotcha, and ARC Prize does not present it as one. They are explicit that these are two different questions: how does a model do under a shared neutral interface, versus how does it do when it can use everything its provider built for it. Both are legitimate, and they are reporting both going forward, clearly labeled.</p>
        <p>But it does mean "Astra scored 99.9% on ARC-AGI-3" is doing a lot of unlabeled work when it travels. The harness is not a footnote to the result. On this benchmark, the harness <em>is</em> about 37 points of the result. Hold onto that, because it is the thread running through the whole post.</p>

        <h2>The result that actually impressed me</h2>
        <p>It is not the 99.9%. It is this:</p>
      `,
    },
    {
      type: 'image',
      fileName: 'astra-action-efficiency.png',
      alt: 'Scatter plot comparing Astra\'s action count against the human baseline for each ARC-AGI-3 level completed',
      captionHtml:
        'Each dot is one completed level. Points below the line mean fewer actions than the median human. Chart: <a href="https://arcprize.org/blog/astra" target="_blank" rel="noopener noreferrer">ARC Prize Foundation</a>.',
      expandable: true,
    },
    {
      type: 'html',
      html: `
        <p>ARC Prize tested approximately 500 members of the general public, not selected for puzzle-solving ability, to establish a median human action count per level. In the Provider Adapter harness, Astra used <strong>fewer actions than that baseline on 96.0% of levels</strong>, and <strong>51.7% fewer actions per level on average</strong>.</p>
        <p>Most benchmarks measure cost efficiency, which is really just compute. Action efficiency measures something harder to fake: how much experience with the environment you needed before you understood it. You cannot brute-force your way to fewer actions than a human. Fewer actions means it worked the rules out faster, not that it tried more things.</p>
        <p>ARC Prize had specifically hypothesized that action efficiency would stay a dividing line, expecting AI to solve environments only after flailing around far more than a person would. That prediction did not hold. Their words: a "material milestone," and Astra "matched and surpassed human parity" on their measure.</p>
        <p>The behavioral detail underneath is the fun part. Astra invents its own shorthand. It writes compact, code-like symbolic notes to track state, things like <code>L8: hub q2 (8↓)</code> for a level and rotation index, or <code>extend8 to3; retract10 to2; shorten8 to1</code> for an ordered plan. Not a real language, just an on-the-fly algebraic notation it generates per environment because it needs somewhere to put its working memory.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'astra-symbolic-model.gif',
      alt: 'Astra playing an ARC-AGI-3 environment while recording its own symbolic notation',
      captionHtml:
        'Astra generating compact symbolic notes while playing. Source: <a href="https://arcprize.org/blog/astra" target="_blank" rel="noopener noreferrer">ARC Prize Foundation</a>.',
    },
    {
      type: 'html',
      html: `
        <p>In a separate harness that gave it a code sandbox, it went further and just wrote software. On a maze game with guards and patrols it built <code>maze_solver.py</code>, then <code>combat_solver.py</code> for the combat rules, then <code>patrol_solver.py</code> to model the moving patrols, then <code>sync_state.py</code> to check its predictions against what it was actually observing.</p>
        <p>That last file is the one that got me. It wrote a tool to check whether its model of the world was wrong.</p>

        <h2>About that 100%</h2>
        <p>Astra scored <strong>100% on ExploitBench</strong>, up from Sol's 78.5%, and it is the first OpenAI model to reach the Critical cybersecurity threshold under their Preparedness Framework. During the fresh June-August evaluation it <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">found and used two previously unknown zero-days</a>, which OpenAI is disclosing to maintainers.</p>
        <p>Two things are true about that 100% at once.</p>
        <p>The first is that it reflects a real capability jump, and the reverse-engineering numbers back it up.</p>
        <p>The second is that a 100% is a benchmark's obituary. It is the last useful reading that eval will ever produce. Whatever ExploitBench was measuring, it cannot measure it anymore, and every future model will also score 100%, which tells you nothing about which is better.</p>
        <p>Two caveats got flattened in most coverage, and both matter. Those runs were done <strong>without production safeguards</strong>, which is a research configuration, not what you get through the API. And the same model scores <strong>42.4% on ExploitGym</strong>, a harder sibling benchmark. Capability is jagged. One eval saturating does not mean a domain is solved. It means that particular ruler ran out of markings.</p>

        <h2>The thing nobody wants to say about benchmarks</h2>
        <p>In February 2026, OpenAI published a post explaining <a href="https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/" target="_blank" rel="noopener noreferrer">why they stopped reporting SWE-bench Verified</a>, a benchmark they created in 2024 and that the whole industry had standardized on. The two findings are brutal.</p>
        <p>They audited 138 problems their own models kept failing, and <strong>59.4% of them had material defects</strong> that made them extremely difficult or impossible to solve correctly: tests enforcing implementation details never mentioned in the problem, or tests checking for functionality the description never asked for. Models were producing correct fixes and being marked wrong.</p>
        <p>Then the contamination finding. Every frontier model they tested, across providers, could reproduce the original human-written fix or verbatim problem details when prompted. The post includes transcripts of models reciting exact diffs from memory, down to the inline comments. Their conclusion: improvements on that benchmark "no longer reflect meaningful improvements in models' real-world software development abilities," and instead reflect how much the model saw the benchmark during training.</p>
        <p>This is not isolated. An <a href="https://arxiv.org/abs/2605.19999" target="_blank" rel="noopener noreferrer">ICML 2026 position paper</a> documents contamination levels reaching up to 45% on commonly used benchmarks and argues contamination resistance has to become a baseline design requirement rather than a nice-to-have.</p>
        <p>So when you look at Astra's table, notice what is <em>not</em> in it. There is no SWE-bench Verified row. That absence is the healthiest thing on the page.</p>
        <p>And notice Astra does not sweep. On Humanity's Last Exam with tools it scores 57.2% against Claude Fable 5.1's 65.0%. On the Artificial Analysis Intelligence Index, in OpenAI's own published table, it sits behind Fable 5.1, Opus 5, and Fable 5. A model that beat everything on everything would be more suspicious, not less.</p>

        <h2>So how close is this to AGI?</h2>
        <p>ARC Prize is the most useful anchor here, and they are not disinterested in the hype direction. They call Astra "a noticeable step-function change in frontier model capabilities" and "meaningful progress towards generalization." They also say plainly that when they launched ARC-AGI-3 they made clear saturating it would not be proof of AGI, and they are <strong>not claiming Astra is AGI</strong>.</p>
        <p>Their reasoning is right. ARC-AGI-3 has a tightly bounded scope. Its environments are deterministic and closed-ended, with a fixed format. Clearing it means the model can synthesize causal world models efficiently inside a well-defined box. Genuinely hard, and nothing could do it a year ago. Not the same as the box being gone.</p>
        <p>We are also burning through evaluations faster than we can build them. FrontierMath Tier 4 at 97.6%. ARC-AGI-1 at 98.5%. ARC-AGI-2 at 95.0%. GPQA Diamond at 96.0%. ExploitBench at 100%. ARC-AGI-3, built specifically because the earlier ones fell, went from 7.8% to saturated in a single model generation.</p>
        <p>Every one of those is a test we can no longer use. ARC Prize is already working on what the next generation should measure. That is the correct response, and it is also a treadmill.</p>
        <p>But the treadmill is not the interesting problem. Go back to that 37-point gap, because I do not think most people looked closely enough at what caused it.</p>

        <h2>The 37 points were memory</h2>
        <p>Here is what actually separates the two harnesses.</p>
        <p>In the <strong>Standard harness</strong>, ARC Prize gives the model everything it needs to solve the game, but, in their words, "leaves the model responsible for deciding what to preserve in its visible notes." The model has to manage its own memory, by hand, in the open.</p>
        <p>In the <strong>Provider Adapter harness</strong>, Astra gets to preserve its opaque reasoning state between requests and use OpenAI's compaction to manage long conversations. Somebody else handles the memory.</p>
        <p>That is the entire difference. Not more intelligence, not more compute, not a better model. Just who is responsible for remembering things. The second option was 37 points better.</p>
        <p>Read that again. Better memory management made the model faster <em>and</em> cheaper <em>and</em> dramatically more capable, simultaneously. That is not a tradeoff. That is a free lunch sitting in the part of the stack nobody puts on a leaderboard.</p>
        <p>And it explains the symbolic notation from earlier. When Astra invents <code>L8: hub q2 (8↓)</code>, it is not being clever for fun. It is hand-rolling a memory system because it does not have one. It is writing notes because the alternative is forgetting. Same with <code>sync_state.py</code>. Those are the behaviors of a very smart system with no persistent storage, improvising a filing cabinet out of whatever is in reach.</p>
        <p>OpenAI clearly knows this is the bottleneck, because they shipped a fix alongside the model. In Codex, Astra <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">can now keep notes across context windows</a>, "preserving accumulated details without repeatedly compressing them into a single summary," and earlier context windows stay searchable so it can retrieve a requirement or a test result that its notes never captured. It is an experimental flag today and becomes the default soon.</p>
        <p>That is a memory system. OpenAI built one for its model, inside its harness.</p>
        <p>Which brings us back to the split. The 62.7% run shows Astra working through a minimal, provider-neutral interface. The 99.9% run shows the same model inside a system designed to preserve and manage its work. Neither score is the one true measure of Astra. Together, they reveal something more useful: intelligence is becoming a property of the whole stack, not only the weights.</p>
        <p>The most surprising detail is that the stronger setup was not merely more capable. It was <strong>3.66x faster, used 49% fewer tokens, and cost less</strong> across the games both harnesses solved. Good scaffolding did not make Astra think longer. It helped Astra waste less thought.</p>
        <p>That is a much more interesting ending for the benchmark than 99.9%. The score says Astra nearly cleared the test. The split tells us why systems built from the same model may feel like completely different levels of intelligence.</p>

        <h2>My take</h2>
        <p>The 99.9% is not the story. The 62.7% next to it is.</p>
        <p>What Astra shows is that the gap between a model's raw capability and its delivered capability is now enormous, and it is filled by scaffolding: harnesses, context management, tool access, sandboxes, interfaces, and what gets carried between turns. Same weights, 37 points apart. If you are building on these systems, that is the most actionable sentence in this post.</p>
        <p>This does not make benchmarks irrelevant. It changes what the next benchmark needs to ask. We should not only measure what a model can solve in isolation. We should measure what a complete system helps people accomplish in the environments where real work happens.</p>
        <p>That brings the story back to Blender, Unreal, KiCad, Power BI, websites, scientific tools, and the expanding MCP ecosystem. For decades, software has accumulated more capability than most people or businesses could fully use. Astra can begin turning that dormant depth into something accessible. The important shift is not that the software suddenly learned new tricks. It is that the distance between an idea and the right tool is collapsing.</p>
        <p>If this performance holds up in production, the largest business effect may be cycle time. A small team could explore more product ideas, build prototypes earlier, test them sooner, and improve them while the feedback still matters. A larger company could move work across design, engineering, analysis, operations, and customer support without every handoff becoming a new bottleneck. Businesses will not grow faster because an AI can write another paragraph. They will grow faster if the loop from idea to artifact to feedback becomes dramatically shorter.</p>
        <p>That is the positive case for almost-AGI. It does not have to be an omniscient machine that can do everything perfectly on its own. It has to be general enough to pick up the tool a task requires, capable enough to work through unfamiliar problems, reliable enough to finish, and fast enough to belong in the real workflow.</p>
        <p>Astra is not fully there. The benchmark caveats still matter, the harness still matters, and human judgment still matters. But for the first time, it is easy to imagine one model moving from a spreadsheet to a circuit board, from a blank Blender scene to a walkable world, or from a product idea to a tested first version without the whole process breaking into disconnected pieces.</p>
        <p>Maybe the most important Astra benchmark will not be a percentage at all. It will be the first company, studio, lab, or one-person team that builds something previously too expensive, too specialized, or too slow to attempt.</p>
        <blockquote>
          <p>62.7% showed us the model. 99.9% showed us the system. What people build with it will show us the point.</p>
        </blockquote>

        <h2>References</h2>
        <ul>
          <li><a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">OpenAI: GPT-6 Astra: A new generation of intelligence</a></li>
          <li><a href="https://arcprize.org/blog/astra" target="_blank" rel="noopener noreferrer">ARC Prize: OpenAI's GPT-6 Astra on ARC-AGI-3</a></li>
          <li><a href="https://arcprize.org/arc-agi/3" target="_blank" rel="noopener noreferrer">ARC Prize: ARC-AGI-3</a></li>
          <li><a href="https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/" target="_blank" rel="noopener noreferrer">OpenAI: Why SWE-bench Verified no longer measures frontier coding capabilities</a></li>
          <li><a href="https://openai.com/index/path-to-astra/" target="_blank" rel="noopener noreferrer">OpenAI: Path to Astra: critical capabilities and frontier safeguards</a></li>
          <li><a href="https://deploymentsafety.openai.com/gpt-6-astra" target="_blank" rel="noopener noreferrer">OpenAI: GPT-6 Astra System Card</a></li>
          <li><a href="https://arxiv.org/abs/2605.19999" target="_blank" rel="noopener noreferrer">LLM Benchmark Datasets Should Be Contamination-Resistant (ICML 2026)</a></li>
          <li><a href="https://modelcontextprotocol.io/docs/getting-started/intro" target="_blank" rel="noopener noreferrer">Model Context Protocol: Introduction</a></li>
          <li><a href="https://www.blender.org/download/releases/5-2" target="_blank" rel="noopener noreferrer">Blender 5.2 LTS</a></li>
        </ul>
      `,
    },
  ],
}
