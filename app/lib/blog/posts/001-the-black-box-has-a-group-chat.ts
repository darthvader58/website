import type { BlogPost } from '../types'

export const theBlackBoxHasAGroupChatPost: BlogPost = {
  slug: 'the-black-box-has-a-group-chat',
  title: 'The Black Box Has a Group Chat',
  subtitle: 'Mechanistic interpretability, AI safety, and my first blog',
  excerpt:
    'Mechanistic interpretability is the field of asking what actually happens inside the model, and why that matters once the systems stop being toys and start becoming infrastructure.',
  category: 'AI Safety',
  readTime: '8 min read',
  publishedAt: '2026-04-30',
  issueLabel: 'Issue No. 001',
  imageDirectory: 'blog1',
  blocks: [
    {
      type: 'html',
      html: `
        <p class="lead blog-dropcap">This is my first blog, so naturally I decided to start with something light and casual: the internal mechanics of large language models, AI safety, privacy leakage, and the tiny existential question of whether the systems we are building actually understand what they are doing.</p>
        <p>Very normal. Very beginner-friendly. Extremely "I had one coffee too many during exam season."</p>
        <p>I am writing this as a math major at ASU, which means half my brain is usually occupied by problem sets, proofs, exams, and the deeply humbling experience of staring at a theorem and realizing the theorem is staring back. The other half, for some reason, has recently been stuck on mechanistic interpretability.</p>

        <h2>Why this keeps pulling me back</h2>
        <p>Mechanistic interpretability is basically the field of asking: <strong>What is actually happening inside the model?</strong></p>
        <p>Not just what the AI says. Not just whether the answer looks good. But what internal features, circuits, attention heads, and mathematical gremlins caused the answer to appear in the first place.</p>
        <blockquote>
          <p>User: "Can you help me with this?"</p>
          <p>Model: "Absolutely."</p>
          <p>User: "Why did you answer that way?"</p>
          <p>Model: "Here is a very confident explanation."</p>
          <p>Mechanistic interpretability researchers: "Okay but what actually happened inside your little neuron casino?"</p>
        </blockquote>
        <p>That is the part I find fascinating.</p>
        <p>AI models are often called black boxes, and that phrase gets thrown around so much that it has almost become background noise. But the problem is real. These systems are increasingly being used in medicine, law, education, software, finance, and every other domain where mistakes are not just funny screenshots for Twitter. If a model gives a good answer, that is nice. But if we cannot understand <em>why</em> it gave that answer, we are still basically trusting vibes.</p>
        <p>And vibes are not a safety framework.</p>
        <p>They are barely a group project strategy.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'carfeatures.png',
      alt: 'Blog illustration placed after the introduction and before the safety section.',
    },
    {
      type: 'html',
      html: `
        <h2>Safety needs more than vibes</h2>
        <p>Researchers at Anthropic and in the broader transformer-circuits community have shown that models appear to contain internal "features" and "circuits" associated with concepts and behaviors. Anthropic's work on Claude Sonnet, for example, identified millions of interpretable features inside a production-grade language model, while earlier transformer-circuits work studied mechanisms like induction heads, which help models recognize and continue patterns from context.<sup><a href="#reference-3">3</a>, <a href="#reference-5">5</a></sup></p>
      `,
    },
    {
      type: 'image',
      fileName: 'mechanisticinterpretability.png',
      alt: 'Blog illustration placed after the first safety paragraph and before the technical interpretability section.',
    },
    {
      type: 'html',
      html: `
        <p>To make this less mystical, an LLM like GPT, Claude, or MiniMax is basically a giant learned function that turns text into tokens, tokens into vectors, and vectors into a long chain of internal transformations. GPT-4, for example, is described by OpenAI as a Transformer-style model trained to predict the next token in a document; so at the lowest level, the model is not "thinking in English" first, it is updating high-dimensional numerical representations that make the next word, symbol, or code fragment more or less likely.<sup><a href="#reference-1">1</a>, <a href="#reference-2">2</a></sup> Inside those layers, attention heads move information between positions in the context, MLP layers transform and store abstract features, and residual streams carry information forward through the network. This is why mechanistic interpretability cares about things like "features," "circuits," and "induction heads": an induction head, for example, is a specific kind of attention behavior that can help a model recognize a repeated pattern and continue it, like seeing "A B ... A" and predicting "B."<sup><a href="#reference-5">5</a></sup> Claude is especially relevant here because Anthropic has shown that millions of human-interpretable features can be identified inside Claude 3 Sonnet, including features connected to concepts, behaviors, and safety-relevant topics.<sup><a href="#reference-3">3</a></sup> MiniMax makes the picture even more interesting because MiniMax-Text-01 uses a hybrid architecture combining Lightning Attention, Softmax Attention, and Mixture-of-Experts routing, with 456 billion total parameters and 45.9 billion activated per token.<sup><a href="#reference-7">7</a></sup> So when a model gives a safe-looking answer, there is a lot hidden under the rug: which attention heads routed information, which features activated, whether the model used a stable safety-related circuit, whether sensitive information survived in an internal representation, and whether the final answer reflects faithful reasoning or just a polished post-hoc explanation. Mechanistic interpretability is the attempt to reverse-engineer that middle zone between prompt and output. It asks not just "what did the model say?" but "what internal mechanism made it say that?" That is why it matters for AI safety: if GPT, Claude, MiniMax, and the next wave of frontier models are going to sit inside real workflows, we need to understand the machinery that converts prompts into behavior.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'fe4d42c004bf43efda0f5921adfedd2f8f42e417-2200x2140.webp',
      alt: 'Blog illustration placed after the technical interpretability paragraph in the safety section.',
    },
    {
      type: 'html',
      html: `
        <p>That is genuinely cool because it suggests that models are not just mystical autocomplete fog machines. There are internal structures we can begin to map.</p>
        <p>But it is also terrifyingly funny because the map is not clean.</p>
        <p>One neuron does not necessarily mean one concept. A neuron can be involved in multiple things, and one concept can be spread across many neurons. This is where words like <em>polysemanticity</em> and <em>superposition</em> enter the chat. In normal English, it means the model is packing concepts into its internal space like an ASU student trying to fit clothes, books, snacks, laundry, and emotional instability into one backpack before class.<sup><a href="#reference-6">6</a></sup></p>
        <p>This is where AI safety gets interesting.</p>
        <p>A model refusing a harmful request is not enough. I want to know <em>why</em> it refused.</p>
        <p>Did it understand the safety boundary?</p>
        <p>Or did it just see danger-shaped words and press the "polite refusal" button?</p>
        <p>Those are very different. One is closer to actual safety. The other is a bouncer checking outfits instead of IDs.</p>
        <p>That difference matters because AI systems can look safe on the outside while being fragile on the inside. They can pass a test because the prompt looked familiar. They can explain themselves in a way that sounds reasonable but does not reflect what actually happened internally. Anthropic's circuit-tracing work has already shown that the mechanism behind a model's behavior is not always obvious from the polished explanation it gives you afterward.<sup><a href="#reference-4">4</a></sup></p>
        <p>This is why I keep coming back to the same thought:</p>
        <blockquote>
          <p>Behavior is not enough. We need receipts from the black box.</p>
        </blockquote>
      `,
    },
    {
      type: 'image',
      fileName: 'hackprinceton.png',
      alt: 'Blog illustration placed before the HackPrinceton section.',
    },
    {
      type: 'html',
      html: `
        <h2>HackPrinceton made it concrete</h2>
        <p>This became more real to me while working on Asclepius at HackPrinceton Spring 2026. I will not go too deep into the technicals here, but the experience made the safety question feel a lot less abstract: sometimes the danger is not that a model says something evil. Sometimes the danger is that the system is useful in exactly the wrong way. And people are usually much more willing to optimize for the faster, easier, working process than to sit with the ethical implications.</p>
        <p>Also, small personal side quest and unexpectedly great news: Asclepius ended up winning Best Overall Hack at HackPrinceton Spring '26, along with recognition in the d_model AI Research and Alignment track and the Regeneron clinical trials track. That was unreal. Winning was already a "wait, did that actually happen?" moment, but winning an entire PS5 for it made the whole thing feel even more ridiculous in the best way. Yes, we did not sleep for an entire weekend and somehow our half-dead team of four walked away with four PlayStations. You can check out <a href="https://devpost.com/software/asclepius-4rthsu" target="_blank" rel="noopener noreferrer">Asclepius on Devpost</a>.</p>
        <p>I also met really cool people like Mr. Andrew Gordon and Dr. Henry Wei, both industry professionals in this space, and those conversations shifted how I think about safety, especially my convo with Dr. Wei.</p>
        <p>Before that, I thought of safety mostly as guardrails. You build the model, test it, patch the obvious bad behavior, and then hope the thing behaves.</p>
        <p>Now I think that is only one layer.</p>
        <p>Real safety has to ask deeper questions:</p>
        <ul class="blog-questions">
          <li>What information is flowing through the system?</li>
          <li>What internal mechanism caused the output?</li>
          <li>What happens when the input changes slightly?</li>
          <li>What does the model know, infer, memorize, hide, or reconstruct?</li>
          <li>What breaks when the system is put under pressure?</li>
        </ul>
      `,
    },
    {
      type: 'image',
      fileName: 'ChatGPTGenerated.png',
      alt: 'Main blog illustration placed after the questions list.',
    },
    {
      type: 'html',
      html: `
        <h2>What I want from this field</h2>
        <p>That is where mechanistic interpretability feels less like an academic niche and more like a necessary microscope.</p>
        <p>As a math person, I think part of the appeal is that mechanistic interpretability feels like trying to prove something about a system instead of just observing it. In math, you do not just say, "This seems true because it worked on three examples and the graph looked friendly." You need the argument. You need the structure. You need the reason.</p>
        <p>AI safety needs that same energy.</p>
        <p>Not just: "The model gave a safe answer."</p>
        <p>But: "Here is the internal mechanism that produced the safe behavior, and here is why we believe it will generalize."</p>
        <p>That is a much harder standard. But it is also the standard that matters if AI systems are going to keep moving into high-stakes environments.</p>
        <p>The funny part is that I am writing all this while juggling exams, assignments, and the usual student calendar that looks like someone rage-clicked "add deadline" fifteen times. There is something very on-brand about studying math during the day, then spending late nights reading about model internals and thinking, "What if the neurons are doing side quests?"</p>
        <p>But that is also why this topic has been sticking with me.</p>
        <p>Mechanistic interpretability feels like curiosity with consequences.</p>
        <p>It is not curiosity for the sake of sounding smart. It is curiosity because we are building systems that may soon become too important to leave unexplained.</p>
        <p>I do not think interpretability magically solves AI safety. It will not. The field is still early, messy, expensive, and sometimes looks like a conspiracy board made by someone who had three cold brews and a deadline.</p>
        <p>But I do think it gives us one of the best chances to move from:</p>
        <blockquote>
          <p>"Trust us, the model is aligned."</p>
        </blockquote>
        <p>to:</p>
        <blockquote>
          <p>"Here is what we found inside the model, here is how it caused the behavior, and here is what still scares us."</p>
        </blockquote>
        <p>That honesty matters.</p>
        <p>Because if the future of AI depends on systems we cannot inspect, then we are basically asking the black box to pinky-promise that it will behave.</p>
        <p>And respectfully, I would prefer more than a pinky promise from a stochastic parrot with great branding and a suspiciously polished apology template.</p>
        <p>So that is where I am starting with this blog: somewhere between ASU exam season, math-brain overthinking, hackathon adrenaline, and a genuine belief that understanding models is one of the most important steps toward making them safer.</p>
        <p>Thanks for reading till the end, especially since this is my first blog. I am still figuring out the voice, the structure, and how much technical chaos is socially acceptable in a personal post. But if there is one idea I want to leave you with, it is this:</p>
        <blockquote>
          <p>The output is only the screenshot.</p>
          <p>The mechanism is the story.</p>
        </blockquote>
        <p><strong>P.S.</strong> If this was boring, answer one question for me: what brand is your microwave?</p>
        <hr />
        <h3>References</h3>
        <ol>
          <li id="reference-2"><a href="https://openai.com/index/gpt-4-research" target="_blank" rel="noopener noreferrer">OpenAI, "GPT-4."</a></li>
          <li id="reference-3"><a href="https://www.anthropic.com/research/mapping-mind-language-model" target="_blank" rel="noopener noreferrer">Anthropic, "Mapping the Mind of a Large Language Model."</a></li>
          <li id="reference-4"><a href="https://www.anthropic.com/research/tracing-thoughts-language-model" target="_blank" rel="noopener noreferrer">Anthropic, "Tracing the thoughts of a large language model."</a></li>
          <li id="reference-5"><a href="https://arxiv.org/abs/2209.11895" target="_blank" rel="noopener noreferrer">Olsson et al., "In-context Learning and Induction Heads."</a></li>
          <li id="reference-6"><a href="https://transformer-circuits.pub/2022/toy_model/index.html" target="_blank" rel="noopener noreferrer">Elhage et al., "Toy Models of Superposition."</a></li>
          <li id="reference-7"><a href="https://arxiv.org/abs/2501.08313" target="_blank" rel="noopener noreferrer">MiniMax, "MiniMax-01: Scaling Foundation Models with Lightning Attention."</a></li>
        </ol>
      `,
    },
  ],
}
