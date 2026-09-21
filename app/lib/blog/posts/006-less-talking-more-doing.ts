import type { BlogPost } from '../types'

export const lessTalkingMoreDoingPost: BlogPost = {
  slug: 'less-talking-more-doing',
  title: 'Less talking, more doing',
  subtitle: 'What happens when AI stops generating paragraphs and starts making decisions?',
  excerpt:
    'Jev is built for fast, typed, probabilistic decisions instead of long-form generation. It is a useful glimpse at what AI looks like when the goal is not to chat, but to quietly make software faster and smarter.',
  author: 'Shashwat Raj',
  tags: [
    'AI',
    'TypeSafe AI',
    'Jev',
    'System One Models',
    'RLCD',
    'AI agents',
    'automation',
    'structured outputs',
    'inference',
  ],
  category: 'AI Systems',
  readTime: '12 min read',
  publishedAt: '2026-09-20',
  issueLabel: 'Issue No. 006',
  imageDirectory: 'blog6',
  blocks: [
    {
      type: 'html',
      html: `
        <p class="lead blog-dropcap">September has been a stupid month to try to keep up with AI. Every time I think I have finally caught up, I open X again and apparently three new models have dropped, somebody has given an agent access to another piece of software it probably should not have access to, and there is a 38-post benchmark thread explaining why the thing everyone was excited about four days ago is already old.</p>
        <p>Anthropic basically opened the month with <a href="https://www.anthropic.com/claude-fable-and-mythos-5-1" target="_blank" rel="noopener noreferrer">Claude Fable 5.1 and Mythos 5.1</a>, Google followed with <a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/" target="_blank" rel="noopener noreferrer">Gemini 3.8 Flash</a>, and then OpenAI dropped <a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">GPT-6 Astra</a>. Astra has probably been the easiest one for me to actually feel in my day-to-day workflow. I have been using it quite a bit recently for social media workflows and some really fun 3D animation stuff in Blender. I have also somehow started using <a href="https://instinct.com/" target="_blank" rel="noopener noreferrer">Instinct</a> way more than I expected.</p>
        <p>Then <a href="https://www.deepseek.com/en/news/deepseek-v4-1-flash/" target="_blank" rel="noopener noreferrer">DeepSeek V4.1 Flash</a> showed up, Google kept shipping across Gemini, and PrismML dropped <a href="https://prismml.com/news/bonsai-2-27b" target="_blank" rel="noopener noreferrer"><strong>Bonsai 2 27B</strong></a>, which I still think has been weirdly underrated compared with everything else happening this month. It is a 27.8B-parameter model squeezed into 5.9 GB using ternary weights, and PrismML reports that it retains 98.2% of the aggregate benchmark performance of full-precision Qwen3.8 27B. That is the kind of release I expected people to talk about for a week, but September has apparently decided nobody gets a week anymore.</p>
      `,
    },
    {
      type: 'html',
      html: `
        <figure style="margin: 2.25rem 0;">
          <img src="https://cdn.prod.website-files.com/699604cc2b9dd89bdbda0608/6aac504ec0cef3807f35bcba_2%2027B%20ID.png" alt="PrismML chart comparing the intelligence density of Ternary Bonsai 2 27B with other 27B-class models" style="display:block;width:100%;height:auto;border-radius:12px;" loading="lazy" />
          <figcaption>PrismML's intelligence-density comparison for Ternary Bonsai 2 27B. Image: <a href="https://prismml.com/news/bonsai-2-27b" target="_blank" rel="noopener noreferrer">PrismML</a>.</figcaption>
        </figure>
      `,
    },
    {
      type: 'html',
      html: `
        <p>My tabs were becoming a problem.</p>
        <p>And then I found Jev.</p>
        <p><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">TypeSafe AI released it on September 15</a>, and at first glance it almost looks boring compared with everything else happening right now. It is not trying to control your computer. It is not making videos. It cannot write you an app. It is definitely not spending six hours inside Minecraft developing a personal vendetta against Creepers.</p>
        <p>Jev barely even talks. Actually, it does not talk at all. You give it some state, ask it a constrained question, and it gives you a typed decision with probabilities.</p>
        <p>That is basically the product.</p>
        <p>I kept reading.</p>

        <h2>we make LLMs yap way too much</h2>
        <p>There is a slightly ridiculous pattern in a lot of AI software right now. Imagine you have an incoming customer message and all you want to know is whether it belongs to <code>billing</code>, <code>technical_support</code>, <code>sales</code>, or <code>spam</code>.</p>
        <p>So naturally, you send it to a model capable of writing software, browsing the internet, solving reasonably hard mathematics, interpreting images, operating a computer and explaining the collapse of the Roman Empire. Then you tell it:</p>
        <blockquote><p>Only return one of these four options. Do not explain yourself. Do not include markdown. Do not include any additional text. Follow this JSON schema EXACTLY.</p></blockquote>
        <p>The model thinks. It generates some tokens. Maybe it burns through reasoning tokens that you never even see. Then eventually:</p>
        <pre><code>{
  "category": "technical_support"
}</code></pre>
        <p>Fantastic. Several billion parameters have successfully reinvented a <code>switch</code> statement.</p>
        <p>I am obviously being slightly unfair here. Structured outputs in modern LLM APIs have gotten much better, and there are plenty of cases where using an LLM for classification is completely reasonable. But once I started looking for this pattern, I started seeing it everywhere. Is this email spam? Should this payment be reviewed? Which tool should my agent call? Does this customer sound frustrated? Is this log suspicious? Does this webpage look malicious? Should this memory be stored? Is this action risky? Does this document match this other document? Should I even bother sending this task to the expensive model?</p>
        <p>These are not really writing problems. They are judgment problems. And we keep solving them using machines whose fundamental output primitive is <strong>text</strong>.</p>
        <p>TypeSafe basically looked at that and asked: what if the model did not need to generate the text in the first place?</p>

        <h2>okay, so what is Jev?</h2>
        <p>TypeSafe calls Jev its first <strong>System One Model</strong>. The naming comes from the familiar System 1 / System 2 framing: System 1 is fast, intuitive and reactive, while System 2 is slower and more deliberate.</p>
        <p>Most of the interesting progress in frontier LLMs lately has been pushing them further toward that second category. Give Astra a complicated task and it can browse around, interact with applications, write code, inspect the result, change its approach and keep going. That is extremely useful when the problem deserves several minutes or hours of actual work.</p>
        <p>Jev is designed for the other stuff: the small decisions that happen around that work.</p>
        <p>TypeSafe's own description is basically <strong>machine-native intelligence</strong>. Instead of producing a string that another program has to interpret, Jev produces structured values that software can directly use. Its public API revolves around three kinds of questions: <code>Noul</code>, <code>Choice</code>, and <code>Score</code> — probability-like yes/no judgments, choosing between predefined alternatives, and scoring something along a scale.</p>
        <p>Say you are reviewing a security alert. You could ask one large model to read all the information and decide what the security team should do. Or you could break the judgment down. Was this activity unauthorized? Does an existing change request explain it? How strong is the evidence that something malicious happened?</p>
        <p>Then normal code takes those answers alongside things it already knows — how important the machine is, where it is deployed, what policies apply — and decides whether to close the alert, escalate it or immediately contain something. That is essentially the shape of TypeSafe's own <a href="https://evals.typesafe.ai/security_incidents" target="_blank" rel="noopener noreferrer">security-incidents workflow</a>.</p>
        <p>I like this approach a lot because it makes the model responsible for the part where models are actually useful: the fuzzy part.</p>

        <h2>please let code continue doing code things</h2>
        <p>This might be the bit I like most about Jev's philosophy. We have spent the last few years slowly putting more and more of our applications inside prompts. We give the model the business policy, the customer state, the transaction history, the exceptions, twelve edge cases, output requirements and a paragraph saying PLEASE THINK CAREFULLY. Then we ask it to do everything.</p>
        <p>There is something very funny about eventually reaching a point where the prompt is basically an entire slightly worse programming language.</p>
        <p>Jev pushes in the opposite direction. Let the machine-learning model answer the questions that normal deterministic logic struggles with. Let normal software handle everything that is already deterministic.</p>
        <p>TypeSafe's <a href="https://evals.typesafe.ai/invoice_processing" target="_blank" rel="noopener noreferrer">invoice-processing eval</a> is a nice example. Things like sums, dates, account numbers and statuses are calculated in code. The AI is used for the parts that actually require interpretation: does the document appear fraudulent, does what was delivered match what was ordered, does some description imply a problem, and so on.</p>
        <p>If an invoice contains <code>$482 + $71 + $19</code>, please do not ask a language model to emotionally process the arithmetic. We have calculators. But if the invoice says <code>priority infrastructure consultation - phase 2</code> and somebody needs to figure out whether that description actually corresponds to the purchase order, now we have a much fuzzier question.</p>
        <p>That separation feels obvious once you see it, which usually means we probably should have been doing more of it already.</p>
      `,
    },
    {
      type: 'html',
      html: `
        <figure style="margin: 2.25rem 0;">
          <img src="https://framerusercontent.com/images/ih1bFwZGYJxlnijbTuXx3f9NeM.png" alt="TypeSafe AI workflow diagram showing decomposed questions and code-driven branching" style="display:block;width:100%;height:auto;border-radius:12px;" loading="lazy" />
          <figcaption>A TypeSafe workflow showing the basic idea: decompose fuzzy judgments, then let ordinary code own the final branching. Image: <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">TypeSafe AI</a>.</figcaption>
        </figure>
      `,
    },
    {
      type: 'html',
      html: `
        <h2>the architecture is also completely different</h2>
        <p>This is where Jev gets more interesting technically.</p>
        <p>Traditional language-model inference is autoregressive. The model produces one token, then the next token conditioned on everything before it, then another, and another, until it has produced the response. That is a perfectly sensible architecture when you are generating language, because sentences are sequential things.</p>
        <p>But if your answer space is literally <code>BUY</code>, <code>SELL</code>, or <code>HOLD</code>, why are we generating a sentence?</p>
        <p>Jev removes string generation from the output altogether. TypeSafe says it built a new model architecture specifically around structured decisions, along with a <strong>parallel sampler</strong> and a post-training technique called <strong>Reinforcement Learning for Calibrated Decisions</strong>, or RLCD. Instead of sequentially decoding a pile of text tokens, Jev can answer multiple structured questions in parallel and return probabilities and confidence values alongside them.</p>
        <p>I should be slightly careful here because TypeSafe has <strong>not</strong> publicly released enough low-level details of the actual network architecture for me to pretend I can tell you exactly what every layer inside Jev is doing. And I refuse to draw six rectangles, label one of them <code>RLCD</code> and another <code>PARALLEL MAGIC</code>, and call it an architecture diagram.</p>
        <p>What TypeSafe has explained much more clearly is the computational model around it.</p>
        <pre><code>LLM:
state → token → token → token → token → parse output → validate

Jev:
state → [decision₁, decision₂, decision₃ ...]</code></pre>
        <p>The output space is known beforehand. That restriction is doing a lot of work.</p>
        <p>Strings are absurdly flexible. A language model can return Python, poetry, JSON, a table, an email to your professor explaining why you missed class, or 800 words confidently describing an API endpoint that has never existed. Jev gives up that flexibility. But if you never needed the paragraph in the first place, that is a pretty good trade.</p>
        <p>TypeSafe currently lists Jev's end-to-end response time at roughly <strong>70–500 ms</strong> and input pricing at <strong>$0.042 per million tokens</strong>, with output tokens described as too cheap to meter. Those are TypeSafe's own published numbers, and the company is very explicitly benchmarking Jev on "System One shaped" workloads rather than pretending it is a general replacement for frontier LLMs.</p>
        <p>That qualification matters. I would not use Jev to write this blog. Thankfully, neither would Jev.</p>
      `,
    },
    {
      type: 'html',
      html: `
        <figure style="margin: 2.25rem 0;">
          <img src="https://framerusercontent.com/images/z4Uu1YpJeEZPBSMTCMI0CN2PX0.png" alt="TypeSafe AI chart plotting workflow intelligence against cost for Jev and frontier language models" style="display:block;width:100%;height:auto;border-radius:12px;" loading="lazy" />
          <figcaption>TypeSafe's workflow evaluation places Jev on a very different cost/latency frontier for System-One-shaped tasks. These are TypeSafe's own evaluations, not an independent benchmark. Image: <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">TypeSafe AI</a>.</figcaption>
        </figure>
      `,
    },
    {
      type: 'html',
      html: `
        <h2>RLCD might be the more important idea</h2>
        <p>The other interesting part is what Jev is trained to optimize for.</p>
        <p>RLHF was enormously important for chat models because raw next-token predictors were not necessarily pleasant things to interact with. We wanted assistants that followed instructions, understood what humans meant, refused certain requests, adapted to feedback and generally behaved like something you could actually talk to.</p>
        <p>That worked pretty well. The issue is that being a good conversational partner and being a predictable component inside software are not exactly the same skill.</p>
        <p>Jev uses <strong>Reinforcement Learning for Calibrated Decisions</strong>. The key word is <em>calibrated</em>.</p>
        <p>Suppose a model makes a large collection of predictions at roughly 80% confidence. If those confidence scores are well calibrated, predictions around that level should actually be correct around 80% of the time. That does <strong>not</strong> mean the individual answer sitting in front of you right now has some magical guarantee attached to it. An 80% answer can be wrong. That is sort of what the other 20% means.</p>
        <p>But if the probabilities are meaningful across many decisions, the software around the model can actually use them. Maybe an internal content-routing system can automatically act above 90%. Maybe a payment workflow requires 99%. Maybe anything below 75% gets escalated to a bigger reasoning model. Maybe a medical or financial workflow has completely different thresholds and additional verification regardless of confidence.</p>
        <p>The point is that uncertainty becomes part of the architecture instead of an awkward sentence the model writes after you ask, "How confident are you?" Anyone who has used LLMs for long enough knows how useful <em>that</em> question can be.</p>
        <blockquote><p>Model: 95% confident.<br />Narrator: it had absolutely no idea.</p></blockquote>
        <p>If Jev's calibration holds up across real-world deployments, having probabilities that your software can actually reason about is a very big deal.</p>

        <h2>now we need to talk about the "zero hallucinations" claim</h2>
        <p>This was obviously the part of the announcement that made me stop.</p>
        <p>TypeSafe describes Jev as having <strong>zero hallucinations</strong>. Whenever any AI company places the word "zero" next to the word "hallucinations", I become approximately 700% more interested in the fine print.</p>
        <p>And there is a genuinely interesting distinction here.</p>
        <p>Jev's output structure is defined before inference. If you ask it to choose between <code>BUY</code>, <code>SELL</code>, and <code>HOLD</code>, it cannot return <code>probably sell but honestly the vibes are complicated</code>. It cannot make up a fourth enum. It cannot decide to wrap the answer in prose. It cannot produce malformed JSON because there is no generated JSON string to begin with.</p>
        <p>TypeSafe's claim is that Jev therefore has no <strong>type errors</strong>: possible values and structure are defined in advance, so the model cannot hallucinate its way outside that contract. Under that definition, I understand the claim.</p>
        <p>But that is not really how most people use the word hallucination anymore.</p>
        <p>Imagine I give Jev a terrible earnings report and ask whether the event is <code>positive</code>, <code>neutral</code>, or <code>negative</code>. Jev returns <code>positive: 0.92</code>.</p>
        <p>Perfect structure. Perfect type. Perfectly awful answer.</p>
        <p>If my trading agent now decides to buy based on that output, I am not going to be sitting there looking at the losses thinking, "At least the schema validation was incredible."</p>
        <p>TypeSafe itself is clear that Jev can still get things wrong. Its public workflow evaluations include cases where Jev differs from the reference while other models get the answer, cases where another model differs, and even cases where all of the evaluated systems miss.</p>
        <p>So I think there are really two definitions getting mixed together. There is <strong>generative hallucination</strong>: the model invents some unsupported text, field, citation, tool argument, output shape or other thing outside what the software expected. Jev can structurally prevent a lot of that.</p>
        <p>Then there is the much more practical definition: <strong>the AI confidently gives you the wrong answer.</strong> Jev can still do that.</p>
        <p>Maybe technically we call that a misclassification rather than a hallucination. If I am the user whose money just disappeared, this linguistic distinction is probably not going to improve my evening.</p>
        <p>But I also do not think this undermines Jev. A model that can still be wrong but <strong>cannot break its interface</strong> is already extremely useful. Production software is full of things that occasionally fail. The goal is not always to make failure impossible. Sometimes the goal is to make failure boring.</p>
      `,
    },
    {
      type: 'html',
      html: `
        <figure style="margin: 2.25rem 0;">
          <img src="https://framerusercontent.com/images/KEoJ6ZaJkOZG6mcjBsOlB3NCqek.png" alt="TypeSafe AI chart comparing hallucination and type-error behavior across Jev and language models" style="display:block;width:100%;height:auto;border-radius:12px;" loading="lazy" />
          <figcaption>TypeSafe's type-safety comparison. The important caveat: Jev's zero is a schema guarantee, not a claim that every semantic judgment is correct. Image: <a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">TypeSafe AI</a>.</figcaption>
        </figure>
      `,
    },
    {
      type: 'html',
      html: `
        <h2>the trading-agent use case is kind of perfect</h2>
        <p>Trading was one of the first places my brain went with this.</p>
        <p>Not: give Jev my brokerage credentials and let it discover leveraged options. I would personally like to continue paying rent.</p>
        <p>I mean the enormous amount of filtering and triage that happens <em>before</em> any serious financial reasoning. Imagine an agent receiving a constant stream of earnings releases, SEC filings, news stories, macro announcements, analyst notes, social-media posts, unusual price moves and volume changes.</p>
        <p>Most of this information does not deserve expensive reasoning. You have dozens of tiny questions first. Is this actually new information? Is this source credible? Does it relate to a company I care about? Is the sentiment materially positive or negative? Does it contradict what management said previously? Is this move unusual enough to investigate? Is this event likely relevant to the current position? Should the serious reasoning agent look at this?</p>
        <p>You can absolutely send every incoming item to a frontier reasoning model. You can also call your smartest friend every 15 seconds and ask "important?" until they eventually stop picking up.</p>
        <p>A System One model sitting in front of the expensive reasoning system makes a lot more sense. Most events get processed quickly and disappear. Some cross a confidence threshold and trigger deeper analysis. Then the slower model reads the filing, compares historical context, researches the company and builds an actual thesis.</p>
        <p>Your deterministic code handles portfolio limits, permissions, execution rules, stop conditions and all the other things you absolutely do not want an AI improvising because it feels particularly bullish that morning. Depending on the stakes, a human still approves the actual trade.</p>
        <pre><code>market feeds / news / filings
            ↓
           Jev
     "does this matter?"
            ↓
     ┌──────┴──────┐
     no            yes
     ↓              ↓
   ignore      reasoning agent
                    ↓
              hard risk rules
                    ↓
              human / execute</code></pre>
        <p>The exciting part is not Jev becoming the trader. It is Jev becoming the reflexes around the trader.</p>

        <h2>browser extensions could get much weirder</h2>
        <p>I also think browser extensions are almost an ideal environment for this type of model.</p>
        <p>Most AI browsers today still make the AI extremely visible. There is a sidebar. You open it. You ask a question. The model reads the page. The model tells you something. That is useful, but it is still mostly a chatbot attached to Chrome.</p>
        <p>A truly AI-native browser probably has a huge number of tiny judgments happening continuously. Is this website suspicious? Is this form asking for sensitive information? Is the page trying to trick me into subscribing to something? Is this claim worth fact-checking? Is this email urgent? Does this tab belong to the project I am currently working on? Is this page relevant to the research I have been doing for the last hour? Should the browser agent be allowed to click this button automatically? Does this action change something irreversible? Should this page be summarized? Should anything from this page enter memory? Should I invoke a larger model at all?</p>
        <p>A frontier LLM can answer basically all of these questions. The problem is that if each one takes several seconds, your browser is going to feel like it is running through the Wi-Fi at a Delhi airport lounge.</p>
        <p>Around 100 milliseconds changes the interaction. The user does not necessarily need to know a model was called. The browser simply behaves a little differently because it understands more about what is happening.</p>
        <p>That is a very different kind of AI UX. We have spent years asking <strong>where should we put the AI button?</strong> Maybe eventually that becomes the wrong question. There may not be an AI button. The software just has more judgment built into it.</p>

        <h2>agents are probably going to need reflexes anyway</h2>
        <p>This connects to something else I have been thinking about a lot recently.</p>
        <p>Agents are getting access to increasingly serious things. MCP gives them access to software and data, hardware interfaces are beginning to push that access toward physical systems, and the agents themselves are becoming capable of much longer and more complicated workflows.</p>
        <p>I have been using Astra quite a bit recently, and I have also somehow started using Instinct a lot more than I expected. What is interesting to me is not really any one of these products by itself, but how normal it is becoming to hand an AI a task and expect it to actually go do something rather than just explain how I could do it myself.</p>
        <p>But as an agent becomes capable of doing more, the amount of small decision-making <em>inside</em> the loop explodes. Which tool should I call? Did that call succeed? Is this output suspicious? Did anything important change? Should I retry? Is the user expecting confirmation here? Is this operation reversible? Is this shell command dangerous? Do I need more information? Does this result contradict something from three steps ago? Do I need the expensive model again? Should I stop?</p>
        <p>Right now, we often solve all of those with another LLM call because an LLM is simply the intelligent primitive we have lying around.</p>
        <p>Jev suggests an agent might eventually contain several different forms of intelligence: a large reasoning model for planning, a fast decision model for reflexes, deterministic software for policies and invariants, specialized models for perception, and perhaps a hardware safety layer underneath all of that when the agent starts touching real machines.</p>
        <p>That begins to look less like <code>LLM + 14,000-word system prompt</code> and more like an actual computer system.</p>
        <p>Good. Markdown has carried this industry for long enough.</p>

        <h2>and Jev is named after an economist</h2>
        <p>There is one more bit of the whole thing that I really like.</p>
        <p>Jev is named after <strong>William Stanley Jevons</strong>, the economist associated with the Jevons paradox. Very roughly, Jevons observed that when technological improvements make using a resource more efficient, total consumption of that resource can actually go <em>up</em>.</p>
        <p>You would think making coal consumption more efficient means society uses less coal. But if coal becomes much more useful and economical, people find more places to use it.</p>
        <p>TypeSafe's bet is that intelligence works similarly. If an AI decision suddenly becomes 50x or 100x cheaper, you probably do not make the exact same number of AI calls and pocket the savings. You start using AI for decisions that were previously too small to justify AI at all.</p>
        <p>Should this notification interrupt me? Should this log line be investigated? Should this database record be reviewed? Should this pull request receive extra scrutiny? Should this email be moved to my priority inbox? Should this agent remember this fact? Should this request be sent to a more capable model? Should this camera frame trigger an alert?</p>
        <p>None of these are impossible with a frontier LLM today. They are just often ridiculous things to spend frontier-model latency and money on.</p>
        <p>Make intelligent decisions cheap enough and suddenly the number of places where they are useful becomes enormous. That is the Jevons-paradox angle TypeSafe is going after, and I think it is probably more interesting than any individual benchmark number.</p>
        <p>Because the really big shift would not be that we made the same AI applications cheaper. It would be that we started putting intelligence into places where previously it was not worth having any.</p>
        <p>That changes the design space quite a lot.</p>

        <h2>I don't think Jev replaces LLMs</h2>
        <p>This is also why I think comparing Jev directly with something like Astra misses the point.</p>
        <p>Astra is useful because it can deal with an enormous output space. You can give it an unfamiliar task and let it explore. It can browse, use applications, write software, troubleshoot, change plans halfway through and spend a long time figuring something out.</p>
        <p>Jev gives up almost all of that. It wants small questions. It wants predefined outputs. It wants to answer them very quickly.</p>
        <p>These two things are not competitors as much as they are potentially parts of the same architecture. Jev handles the hundred little judgments surrounding a task. Astra handles the point where somebody actually needs to sit down and think.</p>
        <p>Your code sits around both of them making sure nobody accidentally connects:</p>
        <pre><code>confidence &gt; 0.87</code></pre>
        <p>directly to:</p>
        <pre><code>transfer_entire_bank_balance()</code></pre>
        <p>A beautiful collaboration between AI and traditional software engineering.</p>

        <h2>the part I keep coming back to</h2>
        <p>I have no idea whether <strong>System One Models</strong> becomes an actual model category that we are still talking about five years from now.</p>
        <p>Jev is extremely new. The architecture is not fully public. Most of the benchmarks we have are from TypeSafe. The workflows they evaluate are specifically designed around the kind of structured decision-making Jev is meant to be good at. TypeSafe itself explicitly says its headline speed and cost gains are likely on the higher end of real-world improvements.</p>
        <p>So no, I am not rewriting every backend I have around Jev this weekend.</p>
        <p>But I think the question underneath Jev is a really good one: <strong>why does all machine intelligence need to speak human language?</strong></p>
        <p>Humans love strings. Unfortunately, software does not.</p>
        <p>Software likes booleans, enums, probabilities, numbers and functions that return the exact thing they said they were going to return.</p>
        <p>The first generation of modern AI products needed models that were really good at talking to people. We got very good at that. Now we are starting to build systems where models spend a lot of their time talking to <strong>other software</strong> instead.</p>
        <p>And software does not need the model to be charming. It does not care whether the prose flows. It does not want a thoughtful conclusion. It would really prefer that you just return the enum.</p>
        <p>That is why Jev feels like such a weirdly appropriate release for this particular month. September has mostly been about models learning to do <em>more</em>: use more tools, work for longer, reason harder, control more software, understand more modalities, compress more intelligence into less memory.</p>
        <p>Jev shows up in the middle of all of this and goes: what if the model did less?</p>
        <p>No essay. No generated JSON. No unnecessary tokens. Just make the decision and move on.</p>
        <p>After spending an entire month trying and failing to keep up with AI models that seemingly want to do everything, I have to admit: there is something very appealing about one that simply knows when to shut up.</p>

        <h2>References</h2>
        <ul>
          <li><a href="https://typesafe.ai/blog/introducing-system-one-models-and-jev" target="_blank" rel="noopener noreferrer">TypeSafe AI: Introducing System One Models &amp; Jev</a></li>
          <li><a href="https://typesafe.ai/" target="_blank" rel="noopener noreferrer">TypeSafe AI: System One Models and Jev</a></li>
          <li><a href="https://evals.typesafe.ai/invoice_processing" target="_blank" rel="noopener noreferrer">TypeSafe AI Evals: Invoice Processing</a></li>
          <li><a href="https://evals.typesafe.ai/security_incidents" target="_blank" rel="noopener noreferrer">TypeSafe AI Evals: Security Incidents</a></li>
          <li><a href="https://prismml.com/news/bonsai-2-27b" target="_blank" rel="noopener noreferrer">PrismML: Introducing Bonsai 2 27B</a></li>
          <li><a href="https://www.anthropic.com/claude-fable-and-mythos-5-1" target="_blank" rel="noopener noreferrer">Anthropic: Claude Fable 5.1 and Mythos 5.1</a></li>
          <li><a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/" target="_blank" rel="noopener noreferrer">Google: Gemini 3.8 Flash and 3.8 Flash Cyber</a></li>
          <li><a href="https://www.deepseek.com/en/news/deepseek-v4-1-flash/" target="_blank" rel="noopener noreferrer">DeepSeek: DeepSeek-V4.1-Flash</a></li>
          <li><a href="https://openai.com/index/gpt-6-astra/" target="_blank" rel="noopener noreferrer">OpenAI: GPT-6 Astra</a></li>
          <li><a href="https://instinct.com/" target="_blank" rel="noopener noreferrer">Instinct</a></li>
        </ul>
      `,
    },
  ],
}
