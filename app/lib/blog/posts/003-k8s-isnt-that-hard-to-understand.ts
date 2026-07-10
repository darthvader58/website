import type { BlogPost } from '../types'

export const k8sIsntThatHardToUnderstandPost: BlogPost = {
  slug: 'k8s-isnt-that-hard-to-understand',
  title: 'K8s isn\'t that hard to understand',
  subtitle:
    'A beginner-friendly tour of Kubernetes, kubectl, and why AI infrastructure gets real after the demo works.',
  excerpt:
    'Kubernetes helps keep containerized applications running across machines. This is the simple explanation I wish I had when I started learning it, plus the kubectl commands that are actually useful.',
  category: 'AI Infrastructure',
  readTime: '13 min read',
  publishedAt: '2026-07-10',
  issueLabel: 'Issue No. 003',
  imageDirectory: 'blog3',
  blocks: [
    {
      type: 'html',
      html: `
        <p class="lead blog-dropcap">Last month, I attended Meta's <strong>@Scale: Systems &amp; Reliability</strong> conference in Bellevue. The conference focused on AI systems, infrastructure, and reliability, and I learned a lot about how large companies think about Kubernetes, including Meta's internal infrastructure and Microsoft's Azure Kubernetes Service.</p>
        <p>The conference also made me notice an interesting gap.</p>
        <p>Right now, there is endless information about how to use AI models. People are learning how to prompt them, build agents, connect models to applications, and switch to a new model every time someone posts a benchmark on Twitter.</p>
        <p>But there is much less beginner-friendly information about what happens after the AI demo starts working.</p>
        <p>How do you deploy it? What happens when thousands of users arrive? How do you decide which machines should run your model? What happens when a server crashes?</p>
        <p>And how do you make sure the GPU you are paying an unreasonable amount of money for is actually doing something?</p>
        <p>That is the infrastructure side of AI, and Kubernetes is becoming a major part of it.</p>
        <p>So I decided to write the simple Kubernetes explanation I wish I had when I started learning it, along with the <code>kubectl</code> commands that are actually useful in everyday workflows.</p>
        <p>Before we get to Kubernetes, though, we need to talk briefly about Docker.</p>
        <p>Only briefly. I promise.</p>
        <p>If Docker is completely new to you, I recommend reading Dhravya's amazing article, <a href="https://dhravya.dev/writing/docker-explained-to-5-years-old/" target="_blank" rel="noopener noreferrer">Docker Explained to a 5-Year-Old</a>. It gives a simple and approachable introduction to containers without immediately throwing a networking diagram at you.</p>
        <p>The one-sentence explanation is that Docker packages your application and the things it needs into a container, allowing it to run more consistently across different computers.</p>
        <p>Your code, libraries, runtime, and tools travel together inside the same package.</p>
        <p>Docker helps solve the classic developer problem:</p>
        <blockquote>
          <p>"It worked perfectly on my laptop."</p>
        </blockquote>
        <p>That is great when you have one container.</p>
        <p>The situation becomes more complicated when your application becomes popular and you suddenly need 50 containers running across several machines. Some containers crash, some machines run out of memory, traffic triples, and one server ends up doing all the work while another appears to be enjoying paid leave.</p>
        <p>Managing all of that manually is where things begin to fall apart.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'meme1.png',
      alt: 'Meme about trying to manually manage production while containers keep multiplying.',
    },
    {
      type: 'html',
      html: `
        <p>This is the problem Kubernetes tries to solve.</p>

        <h2>What Kubernetes actually does</h2>
        <p>Kubernetes is a system for managing containers across one or more computers.</p>
        <p>Docker helps package the application.</p>
        <p>Kubernetes helps operate it.</p>
        <p>It decides where containers should run, how many copies should exist, what should happen when one crashes, and how users should reach the application. It can also add more copies when demand increases and gradually replace older versions when an application is updated.</p>
        <p>The technical term for this is <strong>container orchestration</strong>.</p>
        <p>That sounds complicated.</p>
        <p>The simpler explanation is:</p>
        <blockquote>
          <p>You describe what you want running, and Kubernetes keeps trying to make it true.</p>
        </blockquote>
        <p>Kubernetes is also commonly called <strong>K8s</strong> because there are eight letters between the <code>K</code> and the <code>s</code>.</p>
        <p>Apparently, typing the full word created unacceptable operational overhead.</p>

        <h2>Imagine a restaurant</h2>
        <p>Suppose you own a restaurant.</p>
        <p>Your application is the food that customers want, and containers are the cooks preparing it.</p>
        <p>When three customers arrive, one cook may be enough. When 3,000 customers arrive because your restaurant accidentally went viral, things become slightly more stressful.</p>
        <p>You now need someone to decide how many cooks should be working, which kitchen each cook should use, what happens when one disappears, and whether more cooks are needed during busy hours.</p>
        <p>Kubernetes is the restaurant manager handling those decisions.</p>
        <p>With that analogy in mind, the main Kubernetes terms become much easier to understand.</p>

        <h2>Containers are the cooks</h2>
        <p>A container holds your application and the software it needs to run. That may include your code, libraries, programming-language runtime, system tools, and startup instructions.</p>
        <p>In the restaurant analogy, the container is a cook who arrives with the recipe and all the equipment required to prepare one particular dish.</p>
        <p>Docker helps package the cook.</p>
        <p>Kubernetes decides where the cook should work.</p>

        <h2>Pods are the workstations</h2>
        <p>Kubernetes does not normally manage a container directly. It places the container inside something called a <strong>Pod</strong>.</p>
        <p>A Pod is the smallest unit that Kubernetes deploys. You can think of it as a cooking workstation where the cook does their work.</p>
        <p>Most beginner examples have one main container inside each Pod, although a Pod can contain multiple containers when they need to work very closely together.</p>
        <p>Pods are also temporary. They can be deleted, replaced, restarted, or moved to another machine.</p>
        <p>You should not treat a Pod like a beloved family pet.</p>
        <p>It is closer to a paper cup.</p>
        <p>Useful, replaceable, and probably gone sooner than expected.</p>

        <h2>Nodes and clusters are the kitchens</h2>
        <p>A <strong>Node</strong> is a computer that runs Pods. In our restaurant, a Node is one kitchen, and each kitchen can contain several workstations.</p>
        <p>A Node might be your laptop, a virtual machine, a cloud server, or a very expensive machine containing one or more GPUs.</p>
        <p>A <strong>cluster</strong> is the complete group of Nodes managed by Kubernetes.</p>
        <p>One kitchen is a Node.</p>
        <p>All the kitchens together form the cluster.</p>
        <p>When Kubernetes needs to run a new Pod, it looks across the cluster and chooses a suitable Node. It considers things such as available CPU, memory, and specialized hardware.</p>
        <p>In other words, Kubernetes is playing Tetris with computers.</p>
        <p>Except every block has a monthly cloud bill.</p>

        <h2>Deployments describe what should exist</h2>
        <p>Imagine telling the restaurant manager:</p>
        <blockquote>
          <p>"I always want three burger stations running."</p>
        </blockquote>
        <p>That instruction is similar to a Kubernetes <strong>Deployment</strong>.</p>
        <p>A Deployment describes how you want an application to run. For example, you might tell Kubernetes that you want three copies of your application.</p>
        <p>Kubernetes then checks whether three Pods actually exist.</p>
        <p>If one Pod crashes, Kubernetes creates a replacement. If you change the desired number from three to five, Kubernetes creates two more.</p>
        <p>You describe the <strong>desired state</strong>.</p>
        <p>Kubernetes observes the <strong>actual state</strong>.</p>
        <p>When the two do not match, Kubernetes tries to fix the difference.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'meme2.png',
      alt: 'Meme showing Kubernetes recreating a Pod after the user deletes one.',
    },
    {
      type: 'html',
      html: `
        <p>This is one of the most important ideas in Kubernetes.</p>
        <p>You do not normally tell it every individual step.</p>
        <p>You describe the result you want.</p>
        <p>Kubernetes handles the babysitting.</p>

        <h2>Services give users a stable entrance</h2>
        <p>Pods can disappear and return with different network addresses. That creates a problem because users need a consistent way to reach your application.</p>
        <p>A <strong>Service</strong> gives the application a stable network entry point.</p>
        <p>In the restaurant analogy, the Service is the front desk.</p>
        <p>Customers do not need to know which cook is available, which workstation is free, or which kitchen is preparing the order. They go to the same front desk, and the restaurant routes the order internally.</p>
        <p>Similarly, a Kubernetes Service sends traffic to the appropriate Pods.</p>
        <p>The individual Pods may change.</p>
        <p>The Service remains.</p>

        <h2>Meet kubectl</h2>
        <p>Kubernetes may be the manager, but you still need a way to give that manager instructions.</p>
        <p>That is what <code>kubectl</code> does.</p>
        <p><code>kubectl</code> is the command-line tool used to communicate with a Kubernetes cluster. You use it to view resources, create and update objects, delete things, inspect logs, run commands inside containers, and scale applications.</p>
        <p>For example:</p>
        <pre><code class="language-bash">kubectl get pods</code></pre>
        <p>This asks Kubernetes to show you the Pods.</p>
        <pre><code class="language-bash">kubectl delete pod broken-pod-123</code></pre>
        <p>This deletes a particular Pod.</p>
        <pre><code class="language-bash">kubectl scale deployment burger-app --replicas=5</code></pre>
        <p>This tells Kubernetes that five copies of the application should be running.</p>
        <p>Most commands follow a simple pattern:</p>
        <pre><code class="language-bash">kubectl &lt;action&gt; &lt;resource&gt; &lt;name&gt;</code></pre>
        <p>The action tells Kubernetes what to do, the resource tells it what type of object you mean, and the name identifies the specific object.</p>
        <p>There is also no universal agreement on how to pronounce <code>kubectl</code>.</p>
        <p>Some people say "cube control."</p>
        <p>Some say "cube C-T-L."</p>
        <p>Some say "cube cuddle."</p>
        <p>The safest strategy is to say it quickly and continue speaking before anyone can correct you.</p>

        <h2>Why AI infrastructure cares about Kubernetes</h2>
        <p>Kubernetes was already important for websites, payment systems, streaming platforms, cloud applications, and internal company tools.</p>
        <p>Then AI arrived and asked for every GPU on Earth.</p>
        <p>A small AI experiment might run in a notebook on your laptop. A real AI product may involve an API, a database, several model servers, background workers, request queues, monitoring systems, and a collection of GPU machines capable of producing a cloud invoice that causes physical pain.</p>
        <p>AI models do not float magically inside the cloud.</p>
        <p>They run on computers.</p>
        <p>Those computers need to be allocated, monitored, scaled, repaired, and shared.</p>
        <p>Imagine that your AI application normally receives 100 requests per hour, but a new customer suddenly sends 10,000. Kubernetes can help run more copies of the model server.</p>
        <p>When traffic falls, those additional copies can be removed. If one model server crashes, Kubernetes can replace it. If a workload requires a GPU, Kubernetes can place it on a Node where that hardware is available.</p>
        <p>This is especially relevant for two common AI workloads: <strong>training</strong> and <strong>inference</strong>.</p>
        <p>Training is the process of teaching a model using data. It may require several powerful machines and GPUs working together for hours or days.</p>
        <p>Inference happens when a trained model receives an input and produces an output.</p>
        <p>Every time you send a prompt to a model and receive a response, inference is happening somewhere.</p>
        <p>Kubernetes can help organize both training jobs and long-running inference servers. It does not make the model smarter, but it helps manage the machines, services, and workloads around the model.</p>
        <p>Not every AI application needs Kubernetes.</p>
        <p>If your chatbot has four users and three of them share your last name, you probably do not need a large cluster.</p>
        <p>However, once an AI product has real traffic, multiple services, specialized hardware, and reliability requirements, infrastructure becomes just as important as the model itself.</p>
        <p>Building the demo is one problem.</p>
        <p>Keeping the demo alive is another.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'meme3.png',
      alt: 'Meme showing the path from a small AI demo to becoming an infrastructure engineer by accident.',
    },
    {
      type: 'html',
      html: `
        <h2>Let's run something</h2>
        <p>Enough theory.</p>
        <p>Let's create a small Kubernetes cluster on our computer.</p>
        <p>For local learning, we can use <strong>Minikube</strong>, which creates a small Kubernetes cluster locally. You will need Docker, Minikube, and <code>kubectl</code>.</p>
        <p>Start the cluster:</p>
        <pre><code class="language-bash">minikube start</code></pre>
        <p>Now check the Nodes:</p>
        <pre><code class="language-bash">kubectl get nodes</code></pre>
        <p>You should see something similar to:</p>
        <pre><code class="language-text">NAME       STATUS   ROLES           AGE   VERSION
minikube   Ready    control-plane   1m    v1.x.x</code></pre>
        <p>You now have a Kubernetes cluster containing one Node.</p>
        <p>It is not Meta's infrastructure.</p>
        <p>Please remain humble.</p>

        <h2>Deploy an application</h2>
        <p>Let's deploy an NGINX web server:</p>
        <pre><code class="language-bash">kubectl create deployment hello-k8s --image=nginx:alpine</code></pre>
        <p>This command tells Kubernetes to create a Deployment named <code>hello-k8s</code> using the <code>nginx:alpine</code> container image. Kubernetes then creates a Pod and places it on the available Node.</p>
        <p>Check the Deployment:</p>
        <pre><code class="language-bash">kubectl get deployments</code></pre>
        <p>Then check the Pods:</p>
        <pre><code class="language-bash">kubectl get pods</code></pre>
        <p>You should see something similar to:</p>
        <pre><code class="language-text">NAME                         READY   STATUS    RESTARTS   AGE
hello-k8s-7c9d88f6d8-x9k2p   1/1     Running   0          20s</code></pre>
        <p>The Pod name looks like a password generated by someone who does not want visitors.</p>
        <p>That is normal.</p>
        <p>The important part is that the status says <code>Running</code>.</p>
        <p>Your application is alive.</p>

        <h2>Make the application reachable</h2>
        <p>The Pod is running, but we still need a way to reach it.</p>
        <p>Create a Service:</p>
        <pre><code class="language-bash">kubectl expose deployment hello-k8s --port=80</code></pre>
        <p>Check the Service:</p>
        <pre><code class="language-bash">kubectl get services</code></pre>
        <p>Now forward port <code>8080</code> on your computer to port <code>80</code> on the Service:</p>
        <pre><code class="language-bash">kubectl port-forward service/hello-k8s 8080:80</code></pre>
        <p>Open the following address in your browser:</p>
        <pre><code class="language-text">http://localhost:8080</code></pre>
        <p>You should see the NGINX welcome page. Your browser is now talking to an application inside a container, inside a Pod, inside a Node, inside a Kubernetes cluster.</p>
        <p>It is infrastructure all the way down.</p>
        <p>Press <code>Ctrl+C</code> when you want to stop the port forwarding.</p>

        <h2>The kubectl commands you will use most often</h2>
        <p>You do not need to memorize every <code>kubectl</code> command.</p>
        <p>Start with four:</p>
        <p><code>get</code>, <code>describe</code>, <code>logs</code>, and <code>exec</code>.</p>
        <p>The <code>get</code> command lists resources and shows their current status:</p>
        <pre><code class="language-bash">kubectl get pods
kubectl get nodes
kubectl get deployments
kubectl get services</code></pre>
        <p>The <code>describe</code> command gives you more detail about a resource:</p>
        <pre><code class="language-bash">kubectl describe deployment hello-k8s</code></pre>
        <p>It can show labels, container images, configuration, current conditions, and recent events.</p>
        <p>When something is broken, the Events section is often a good place to look.</p>
        <p>The <code>logs</code> command shows the output produced by your application:</p>
        <pre><code class="language-bash">kubectl logs deployment/hello-k8s</code></pre>
        <p>This is useful when the application is technically running but emotionally unavailable.</p>
        <p>Finally, <code>exec</code> lets you run a command inside a container:</p>
        <pre><code class="language-bash">kubectl exec -it &lt;pod-name&gt; -- sh</code></pre>
        <p>Replace <code>&lt;pod-name&gt;</code> with the name shown by <code>kubectl get pods</code>.</p>
        <p>Type <code>exit</code> when you are done.</p>

        <h2>Scale the application</h2>
        <p>Right now, the Deployment has one Pod.</p>
        <p>Let's ask for three:</p>
        <pre><code class="language-bash">kubectl scale deployment hello-k8s --replicas=3</code></pre>
        <p>Check again:</p>
        <pre><code class="language-bash">kubectl get pods</code></pre>
        <p>You should now see three Pods. You did not manually create three containers. You changed the desired number of copies, and Kubernetes created the rest.</p>
        <p>Now copy the name of one Pod and delete it:</p>
        <pre><code class="language-bash">kubectl delete pod &lt;pod-name&gt;</code></pre>
        <p>Check the Pods again:</p>
        <pre><code class="language-bash">kubectl get pods</code></pre>
        <p>Kubernetes will create a replacement.</p>
        <p>The Deployment says three Pods should exist.</p>
        <p>You deleted one.</p>
        <p>Kubernetes reviewed your decision and rejected it.</p>
        <p>To watch this happen live, run:</p>
        <pre><code class="language-bash">kubectl get pods --watch</code></pre>
        <p>Press <code>Ctrl+C</code> when you are finished watching Kubernetes quietly disagree with you.</p>

        <h2>The YAML situation</h2>
        <p>Typing commands is useful while learning, but Kubernetes configurations are commonly stored in YAML files.</p>
        <p>A YAML file describes the resources you want Kubernetes to create and acts as a written version of your desired state.</p>
        <p>Create a file named <code>hello-k8s.yaml</code> and add the following:</p>
        <pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment

metadata:
  name: hello-k8s

spec:
  replicas: 3

  selector:
    matchLabels:
      app: hello-k8s

  template:
    metadata:
      labels:
        app: hello-k8s

    spec:
      containers:
        - name: nginx
          image: nginx:alpine
          ports:
            - containerPort: 80</code></pre>
        <p>This file tells Kubernetes to create a Deployment named <code>hello-k8s</code>, keep three Pods running, and place an NGINX container inside each one.</p>
        <p>The labels and selector help the Deployment identify which Pods belong to it.</p>
        <p>That is enough YAML for one day.</p>
      `,
    },
    {
      type: 'image',
      fileName: 'meme4.png',
      alt: 'Meme about YAML indentation causing a new Kubernetes validation error.',
    },
    {
      type: 'html',
      html: `
        <p>Delete the Deployment we created earlier:</p>
        <pre><code class="language-bash">kubectl delete deployment hello-k8s</code></pre>
        <p>Now create it using the YAML file:</p>
        <pre><code class="language-bash">kubectl apply -f hello-k8s.yaml</code></pre>
        <p>The word <code>apply</code> roughly means:</p>
        <blockquote>
          <p>"Please make the cluster match this file."</p>
        </blockquote>
        <p>Check the result:</p>
        <pre><code class="language-bash">kubectl get deployments
kubectl get pods</code></pre>
        <p>Now change <code>replicas: 3</code> to <code>replicas: 5</code>, save the file, and apply it again:</p>
        <pre><code class="language-bash">kubectl apply -f hello-k8s.yaml</code></pre>
        <p>When you check the Pods, you should see five.</p>
        <p>You changed one number in a file.</p>
        <p>Kubernetes changed the running infrastructure.</p>
        <p>That is the part that feels like magic until the YAML indentation breaks.</p>

        <h2>A small kubectl cheat sheet</h2>
        <pre><code class="language-bash"># Show resources
kubectl get pods
kubectl get deployments
kubectl get services
kubectl get nodes

# View more detail
kubectl describe pod &lt;pod-name&gt;
kubectl describe deployment hello-k8s

# Read logs
kubectl logs &lt;pod-name&gt;

# Run a command inside a Pod
kubectl exec -it &lt;pod-name&gt; -- sh

# Apply a YAML file
kubectl apply -f hello-k8s.yaml

# Scale a Deployment
kubectl scale deployment hello-k8s --replicas=3

# Delete resources
kubectl delete pod &lt;pod-name&gt;
kubectl delete deployment hello-k8s

# Ask for help
kubectl --help
kubectl get --help</code></pre>
        <p>You can also create an alias:</p>
        <pre><code class="language-bash">alias k=kubectl</code></pre>
        <p>Then:</p>
        <pre><code class="language-bash">kubectl get pods</code></pre>
        <p>becomes:</p>
        <pre><code class="language-bash">k get pods</code></pre>
        <p>Seven fewer keystrokes.</p>
        <p>Your terminal now assumes you are senior.</p>

        <h2>Cleaning up</h2>
        <p>Delete the resources created from the YAML file:</p>
        <pre><code class="language-bash">kubectl delete -f hello-k8s.yaml</code></pre>
        <p>Delete the Service:</p>
        <pre><code class="language-bash">kubectl delete service hello-k8s</code></pre>
        <p>Finally, stop Minikube:</p>
        <pre><code class="language-bash">minikube stop</code></pre>
        <p>And that's it! Now you know enough about K8s that you can easily use it in any of your projects!'.</p>
        <p>In our restaurant analogy, containers are the cooks, Pods are the workstations, Nodes are the kitchens, and the cluster is the entire operation. Deployments describe how many workstations should exist, Services give customers a stable entrance, and <code>kubectl</code> is the control panel used to manage everything.</p>
        <p>The reason I wanted to write this was not simply to explain another developer tool. My experience at @Scale made me think more seriously about the growing gap between building AI applications and understanding the infrastructure required to operate them.</p>
        <p>Calling an AI model is becoming easier.</p>
        <p>Running one reliably at scale is still difficult. That's what most big tech companies are tackling right now.</p>
        <p>As AI systems grow to include more models, APIs, agents, workers, inference servers, training jobs, and GPUs, Kubernetes will continue to play an important role in keeping everything organized.</p>
        <p>This is also closely connected to a project I have been building called <a href="https://github.com/darthvader58/kcavo" target="_blank" rel="noopener noreferrer">KCAVO</a>. KCAVO is a <code>kubectl</code> plugin designed to help developers visualize Kubernetes resources, understand infrastructure costs, and identify possible optimization opportunities within their existing Kubernetes workflow.</p>
        <p>Try it out, tell me what breaks, and consider leaving the repository a GitHub star.</p>
        <p>It helps the project and my sanity for the most part lol.</p>
        <p>This post was about Kubernetes.</p>
        <p>The next one will be more personal.</p>
        <p>My summer has already been surprisingly eventful, and I will soon be writing about how I have spent it, what I learned and the restaurant recommendations of course!</p>
        <p>Until then, keep DEVELOPING.</p>
      `,
    },
  ],
}
