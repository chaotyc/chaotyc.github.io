export interface WorkImage {
  src: string;
  /** Empty for purely decorative conceptual illustrations. */
  alt: string;
}

export interface WorkItem {
  id: string;
  title: string;
  summary: string;
  meta: string;
  href?: string;
  linkLabel?: string;
  image?: WorkImage;
}

export const workItems = [
  {
    id: "enkhora",
    title: "Enkhora",
    summary:
      "A distributed mixture-of-experts inference system that serves large models from the idle GPU memory and compute of jobs already running on shared HPC clusters, handing resources back the moment a host job needs them while keeping output bit-identical to single-machine inference.",
    meta: "Systems software · Python, PyTorch, C++, CUDA, Slurm · 2026–present",
    href: "https://enkhora.ai/",
    linkLabel: "Website",
    image: {
      src: "/work/enkhora.webp",
      alt: "Enkhora homepage: “Your GPUs are busy. The memory inside them isn’t.” above a cluster dashboard",
    },
  },
  {
    id: "helix",
    title: "Helix: An AI Tutor That Maps What You Know",
    summary:
      "A desktop AI tutor that turns a learning goal into a prerequisite concept graph, then diagnoses and teaches through a multi-agent LLM pipeline, with a Bayesian knowledge-tracing learner model that propagates evidence through the graph.",
    meta: "Open-source software · TypeScript, React, Node.js, Electron, SQLite · 2026–present",
    href: "https://github.com/chaotyc/Helix",
    linkLabel: "GitHub",
    image: {
      src: "/work/helix.webp",
      alt: "A Helix concept map for Bayes’ theorem: concepts linked by prerequisite arrows, each with a depth meter",
    },
  },
  {
    id: "polarization-tracking",
    title:
      "Real-Time Polarization Stabilization of Optical Signals in Quantum Networks via Physics-Informed Sequence Modeling",
    summary:
      "A physics-informed selective state-space model for real-time polarization tracking across deployed quantum fiber links, using 11× fewer parameters and running inference 7.2× faster while matching a transformer baseline’s accuracy.",
    meta: "Conference paper · FiO LS 2026 · Emil Wolf Outstanding Student Paper Award",
    href: "/papers/real-time-polarization-stabilization.pdf",
    linkLabel: "PDF",
    image: {
      src: "/work/polarization-tracking.webp",
      alt: "Illustration of a polarization state drifting across the Poincaré sphere, with a dashed predicted track following the reference track",
    },
  },
  {
    id: "optical-native-computing",
    title: "Optical-Native Computing and Differentiable Photonic Simulation",
    summary:
      "Photonic-electronic algorithms for multi-head latent attention and a differentiable PyTorch simulator of CMOS-integrated photonic circuits that models fabrication variation and device nonidealities.",
    meta: "Research · MITRE Labs · 2026–present",
    image: {
      src: "/work/optical-native-computing.svg",
      alt: "",
    },
  },
  {
    id: "pypcl",
    title: "PyPCL: Learning with Ambiguous Labels",
    summary:
      "A PyTorch research framework for comparing partial-label and complementary-label learning methods under ambiguous supervision.",
    meta: "Research software · Python, PyTorch · 2025",
    href: "https://github.com/chaotyc/PyPCL",
    linkLabel: "GitHub",
    image: {
      src: "/work/pypcl.svg",
      alt: "",
    },
  },
  {
    id: "deliberate-occlusion",
    title: "Deliberate Occlusion: Asymmetry in Facial Expression",
    summary:
      "A conference paper on deliberate facial-region occlusion, attention mechanisms, and asymmetry in facial-expression recognition.",
    meta: "Conference paper · ICKII 2023",
    href: "https://www.researchgate.net/profile/Chan-Hung-Tse-2/publication/376227413_Deliberate_Occlusion_Asymmetry_in_Facial_Expression/links/660a3b18b839e05a20b52621/Deliberate-Occlusion-Asymmetry-in-Facial-Expression.pdf",
    linkLabel: "PDF",
    image: {
      src: "/work/deliberate-occlusion.webp",
      alt: "Two copies of a face with opposite halves covered by a black block",
    },
  },
] as const satisfies readonly WorkItem[];

const selectedWorkIds = new Set(["enkhora", "helix"]);

export const selectedWorkItems = workItems.filter((item) =>
  selectedWorkIds.has(item.id),
);
