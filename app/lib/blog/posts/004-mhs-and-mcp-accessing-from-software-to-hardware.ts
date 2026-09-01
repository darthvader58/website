import type { BlogPost } from '../types'

export const mhsAndMcpAccessingFromSoftwareToHardwarePost: BlogPost = {
  slug: 'mhs-and-mcp-accessing-from-software-to-hardware',
  title: 'MHS and MCP : Accessing from Software to Hardware',
  subtitle:
    'Anthropic is moving AI from “please summarize this” to “please calibrate the laser, carefully”',
  excerpt:
    "Anthropic's MCP connected AI agents to software and data. MHS is an attempt to give them a safer, more standard way to operate physical hardware.",
  author: 'Shashwat Raj',
  tags: ['AI', 'MCP', 'MHS', 'Anthropic', 'AI infrastructure', 'robotics', 'hardware'],
  category: 'AI Infrastructure',
  readTime: '9 min read',
  publishedAt: '2026-09-01',
  issueLabel: 'Issue No. 004',
  imageDirectory: 'blog4',
  blocks: [
    {
      type: 'html',
      html: `
        <p class="lead blog-dropcap">AI assistants used to live mostly inside chat boxes. You gave them a question, they gave you an answer, and everyone pretended that the answer was grounded in reality.</p>
        <p>Then we connected them to files, GitHub repositories, databases, calendars, Slack, and APIs. Suddenly, the assistant was not just talking about the world. It could look things up, call tools, and act on information outside its conversational bubble.</p>
        <p>That shift is what the <strong>Model Context Protocol</strong>, or MCP, is about. Now Anthropic is taking the same idea one layer closer to reality with the <strong>Model Hardware Standard</strong>, or MHS. MCP helps AI agents work with the digital world, while MHS helps AI agents work with the physical world.</p>
        <p>One gives the model access to your documents. The other might eventually give it access to a microscope, a liquid handler, a robotic arm, or a laser calibration setup. This feels like a small naming update until you think about the difference between deleting a file and moving a robot arm: one gives you a bad afternoon, while the other gives you a bad incident report.</p>

        <h2>First, what problem was MCP solving?</h2>
        <p>Before MCP, connecting an AI assistant to a new data source usually meant building a custom integration. Want the model to read Google Drive? Build a connector. Want it to search GitHub? Build another connector. Want it to interact with Slack, Postgres, or an internal business tool? More connectors.</p>
        <p>Every tool had its own authentication, data format, API conventions, and failure modes. The model might be intelligent, but it was surrounded by disconnected islands of information.</p>
        <p>Anthropic introduced MCP as an open standard on November 25, 2024. Its goal was to create a common way for AI applications to connect to external systems instead of requiring a new one-off integration for every data source.</p>
        <p>The architecture is fairly simple:</p>
        <ul>
          <li>An <strong>MCP server</strong> exposes data or capabilities.</li>
          <li>An <strong>MCP client</strong> connects an AI application to those servers.</li>
          <li>The model can then discover and use available tools, resources, and prompts.</li>
        </ul>
        <p>You can think of MCP as a universal adapter between an AI application and the systems around it. It is not exactly a USB-C port for intelligence, but it is close enough for a Tuesday afternoon explanation.</p>
        <p>The important idea is that the model should not need to understand every company’s internal API from scratch. It should be able to interact with a consistent interface. Instead of teaching the assistant 50 completely different dialects, we give it a common grammar.</p>
        <p>That is useful because context is often the difference between a confident answer and a useful answer. An assistant that only sees your current prompt may give you something plausible, but an assistant that can inspect the relevant code, documentation, issue history, database records, and team discussions has a better chance of giving you something that actually fits.</p>
        <p>That does not make it automatically correct. It just means we have stopped asking it to solve a puzzle while hiding half the pieces.</p>

        <h2>A small piece of MCP history</h2>
        <p>MCP was created at Anthropic by David Soria Parra and Justin Spahr-Summers. The initial release included an open specification, SDKs, local Claude Desktop support, and open-source server implementations for systems such as Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer.</p>
        <p>There is a funny pattern in infrastructure history: a technology becomes important not only when it is powerful, but when it becomes boring enough for other people to build on.</p>
        <p>HTTP became boring. Linux became boring. Containers became boring. That is not an insult. It is the dream.</p>
        <p>MCP is trying to become boring in the same way. If it works, developers should not need to care which connector was hand-built by which team on which sleep-deprived weekend. They should be able to connect an agent to a system and focus on the actual problem.</p>
        <p>Of course, the moment you give an AI assistant access to real systems, security becomes part of the conversation. A tool that can read your documents is one thing. A tool that can send emails, delete records, deploy code, or move money is another.</p>
        <p>MCP creates a standardized connection layer, but it does not magically make every connected tool safe. Permissions, authentication, approval flows, logging, and human oversight still matter. The adapter can be universal, but your security policy should not be.</p>

        <h2>Then Anthropic introduced MHS</h2>
        <p>On August 27, 2026, Anthropic announced a research preview of the <strong>Model Hardware Standard</strong>. MHS is designed to help AI agents safely operate physical devices with programmable interfaces, including scientific instruments, manufacturing equipment, microscopes, liquid handlers, and robotic arms.</p>
        <p>This is the part where the phrase “AI agent” starts feeling less like a software product category and more like a job description.</p>
        <p>MHS addresses a problem that researchers and engineers have dealt with for years: hardware is fragmented. A lab may have a camera from one vendor, a laser from another, a motorized focuser from a third, and a control system written by somebody who left the institution in 2014. All of these devices may work perfectly on their own. Together, they speak different languages.</p>
        <p>MHS introduces a standardized driver layer. The driver translates between the device and the software controlling it. Anthropic describes simple primitives such as <strong>read</strong>, for retrieving something like temperature, and <strong>write</strong>, for changing something like a set point.</p>
        <p>The idea is not to make every machine identical. The idea is to make every machine understandable.</p>
        <p>A microscope does not need to pretend it is a robot arm. A centrifuge does not need to become a database. They just need to expose their state, capabilities, and constraints in a format that an agent can discover and reason about.</p>
        <p>MHS also includes information that usually lives in manuals, setup notes, or someone’s memory: how heavy the robot arm is, what temperatures are safe, what the machine can measure, what must never happen, and what a particular error means physically.</p>
        <p>Some of this information is technical. Some of it is tacit knowledge. Some of it is the sentence a lab technician says while pointing at a machine:</p>
        <blockquote>
          <p>“Do not touch that button unless you want the entire afternoon to become a story.”</p>
        </blockquote>
        <p>MHS tries to make that knowledge explicit and available to the agent.</p>

        <h2>MCP and MHS are different layers</h2>
        <p>The cleanest way I understand the relationship is this: <strong>MCP connects the agent to software, data, and digital tools, while MHS connects the agent to devices and physical processes.</strong></p>
        <p>MHS can use MCP, along with command-line interfaces and code files, to control and orchestrate multiple devices.</p>
        <p>So an agent might read an experimental protocol from a document, inspect the current state of several instruments, adjust a device, observe the result through a camera or sensor, update the next step, and save the successful process as a deterministic script.</p>
        <p>That last step is especially interesting. Anthropic describes Claude exploring a laser setup, observing how adjustments changed the laser beam, and eventually packaging what it learned into a script that could repeat the alignment without requiring the model to reason through every tiny step again.</p>
        <p>This is a useful division of labor. The agent explores, the script repeats, and the human supervises. The hardware does not need a language model narrating every millisecond of a procedure. Once the correct sequence is known, normal code can execute it faster and more predictably.</p>
        <blockquote>
          <p>AI agent: “I have discovered a procedure.”<br />Engineer: “Great. Now put it in a script before you get creative again.”</p>
        </blockquote>

        <h2>The most exciting part is the boring part</h2>
        <p>The headline is “AI operates laboratory equipment.” The deeper story is standardization.</p>
        <p>The exciting thing is not necessarily that a model can call a function named <code>set_temperature</code>. We have had software interfaces for a long time. The exciting thing is that the model may be able to discover an unfamiliar device, understand its operating limits, coordinate it with other devices, and recover from certain failures through a shared interface.</p>
        <p>That is a much bigger shift than simply adding a chatbot to a machine. It moves us from asking, “Can AI control this device?” to asking, “Can AI understand an entire environment made of many devices?”</p>
        <p>That is the difference between giving someone a remote control and giving them responsibility for a factory floor.</p>
        <p>My perspective is that MHS is not really “MCP 2.0.” It is MCP with consequences.</p>
        <p>MCP deals with context in the digital world. If an agent reads the wrong document, the result may be inaccurate. MHS deals with context in the physical world. If an agent misunderstands a temperature limit, a sample could be ruined. If it misreads a sensor, a robot could move incorrectly. If it mistakes a physical failure for a software failure, it may try the wrong fix repeatedly.</p>
        <p>The error is no longer just a bad paragraph. The error has mass, heat, motion, and sometimes a very expensive replacement part.</p>

        <h2>A quick history fact from the lab</h2>
        <p>MHS began as a collaboration between Anthropic and HHMI Janelia Research Campus.</p>
        <p>At Janelia, researcher Arco Bast was working with a brain-imaging setup involving lasers, motorized focusers, and specialized cameras from different vendors. He created a shared-memory dictionary so the instruments could communicate with one another quickly. Anthropic’s Alek Kemeny then worked with him to integrate AI models into that interface.</p>
        <p>I like this origin story because it is not “someone had a futuristic idea in a conference room.” It is a practical engineering problem: several machines needed to cooperate, their interfaces did not line up, and someone built a layer to make them communicate.</p>
        <p>That is how a lot of important infrastructure begins. Not with a perfect master plan, but with one person being tired of manually translating between systems.</p>

        <h2>The safety problem is much harder now</h2>
        <p>MHS is still a research preview, not a finished universal solution. Anthropic explicitly notes that current models have limitations in spatial and physical reasoning and still require expert oversight. It also notes that MHS does not yet work with hardware that lacks a programmable interface.</p>
        <p>That limitation is important. A model may understand the sentence “the sample is foaming,” but that does not mean it understands the physical consequences of foam inside a biological workflow.</p>
        <p>Software often gives us clean abstractions. The physical world is less cooperative. A function either returns an error or it does not, but a real machine can be technically online while something inside it is misaligned, overheated, contaminated, empty, vibrating, or about to become a problem.</p>
        <p>This is why safety cannot just mean “the agent has a list of forbidden commands.” A safe hardware system also needs state awareness, physical limits, sensor validation, emergency stops, permission boundaries, human escalation, reversible actions where possible, and clear logs of what happened and why.</p>
        <p>The word “write” sounds harmless in an API. In the real world, “write” might mean “move a robot,” “increase pressure,” “open a valve,” or “change the conditions of a biological experiment.”</p>
        <p>The interface can be simple. The consequences are not.</p>

        <h2>What happens when MCP meets MHS?</h2>
        <p>Imagine an agent with access to a research paper through an MCP server, an internal experiment plan, historical results in a database, a microscope through MHS, a robotic liquid handler through MHS, a sensor stream from another device, and a code environment for writing repeatable procedures.</p>
        <p>The agent could connect knowledge to action. It could read what researchers want to test, inspect the instruments available, plan a sequence, run the experiment, monitor the result, and save the outcome for the next iteration.</p>
        <p>That does not mean fully autonomous science is arriving tomorrow morning. It means the walls between software, data, and equipment are becoming thinner.</p>
        <p>Today, many scientific workflows are limited by integration work. The instrument may be capable, but connecting it to the rest of the workflow takes weeks or months. If a standard reduces that work to hours or minutes, the impact may come less from making individual machines smarter and more from making entire environments easier to reconfigure.</p>
        <p>The future may not be one magical robot scientist. It may be thousands of ordinary instruments that can finally coordinate with each other.</p>

        <h2>My take</h2>
        <p>MCP gave AI a way to leave the chat window. MHS gives that idea a path toward leaving the screen entirely.</p>
        <p>But the winner will not be the system that gives agents the most power. It will be the system that makes their power understandable, constrained, inspectable, and boring enough to trust.</p>
        <p>The best hardware agent should not feel like a reckless genius improvising near a laser. It should feel like a careful operator that knows what it can do, knows what it cannot do, and asks for help before turning a small uncertainty into a large repair bill.</p>
        <p>MCP made context portable. MHS is trying to make capability portable. That is a much bigger responsibility.</p>
        <p>So I have a few questions for you:</p>
        <ul class="blog-questions">
          <li>Would you trust an AI agent to run a lab experiment if every action required approval?</li>
          <li>What should always require human confirmation?</li>
          <li>Is a standardized interface enough, or do we also need standardized safety policies?</li>
          <li>Which industry would benefit most from MHS: biotech, robotics, manufacturing, or quantum computing?</li>
          <li>Would you let an agent operate your 3D printer unattended?</li>
        </ul>
        <p>Personally, I am excited by the boring infrastructure layer: drivers, manifests, state dictionaries, limits, logs, and repeatable scripts. The flashy demo is an agent moving a robot arm, but the real breakthrough may be that the robot arm, the camera, the sensor, and the database finally agree on what is happening.</p>
        <p>That is when AI stops being just a model with tools and becomes part of a system. Systems, unlike chatbots, have to live with the physical world.</p>
        <blockquote>
          <p>MCP gave AI a context window. MHS may give it a workshop. The hard part is making sure it reads the safety manual before touching anything.</p>
        </blockquote>

        <h2>Sources</h2>
        <ul>
          <li><a href="https://www.anthropic.com/news/model-hardware-standard-research-preview" target="_blank" rel="noopener noreferrer">Anthropic: Previewing the Model Hardware Standard</a></li>
          <li><a href="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noopener noreferrer">Anthropic: Introducing the Model Context Protocol</a></li>
          <li><a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer">Model Context Protocol documentation</a></li>
        </ul>
      `,
    },
  ],
}
