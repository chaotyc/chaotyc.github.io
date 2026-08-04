export type ProjectSlug =
  | "polarization-tracking"
  | "optical-native-computing"
  | "pypcl"
  | "deliberate-occlusion";

export type ProjectType = "research" | "software" | "publication";

export type ProjectStatus =
  | "published"
  | "accepted"
  | "open-source"
  | "ongoing"
  | "public-summary"
  | "archived";

export type DisclosureLevel =
  | "publication"
  | "open-source"
  | "public-summary";

export type MeasurementType =
  | "measured"
  | "simulated"
  | "projected"
  | "preliminary";

export type ArtifactKind =
  | "paper"
  | "abstract"
  | "slides"
  | "repository"
  | "documentation"
  | "demo"
  | "doi"
  | "citation";

export type ArtifactAvailability =
  | "available"
  | "awaiting-release"
  | "not-public";

export interface Metric {
  value: string;
  label: string;
  comparison: string;
  measurementType: MeasurementType;
  source: string;
  notes: string;
}

export interface FigurePlan {
  title: string;
  alt: string;
  caption: string;
  source: "Original conceptual illustration" | "Publication";
}

interface SourceSection {
  id: string;
  eyebrow?: string;
  title: string;
  body: readonly string[];
  bullets?: readonly string[];
  figure?: FigurePlan;
}

interface SourceTechnicalDecision {
  title: string;
  rationale: string;
}

export interface Artifact {
  label: string;
  kind: ArtifactKind;
  href: string | null;
  availability: ArtifactAvailability;
  note?: string;
}

export interface RelatedWork {
  slug: ProjectSlug;
  label: string;
  relationship: string;
}

interface ProjectSource {
  slug: ProjectSlug;
  title: string;
  shortTitle: string;
  summary: string;
  cardSummary: string;
  startDate: string;
  endDate: string | null;
  dateLabel: string;
  status: ProjectStatus;
  type: ProjectType;
  organization: string | null;
  role: string | null;
  collaborators: readonly string[];
  tags: readonly string[];
  featured: boolean;
  disclosure: DisclosureLevel;
  hero: {
    motif:
      | "state-trajectory"
      | "optical-signal-path"
      | "candidate-labels"
      | "facial-regions";
    alt: string;
    caption: string;
  };
  thirtySecondSummary: string;
  sections: readonly SourceSection[];
  contributions: readonly string[];
  metrics: readonly Metric[];
  technicalDecisions: readonly SourceTechnicalDecision[];
  limitations: readonly string[];
  artifacts: readonly Artifact[];
  relatedWork: readonly RelatedWork[];
}

export interface PublicationEntry {
  id: string;
  kind: "paper" | "talk";
  title: string | null;
  displayTitle: string;
  authors: readonly string[];
  venue: string;
  year: number;
  status: "published" | "accepted" | "forthcoming";
  citation: string;
  pages: string | null;
  doi: string | null;
  links: readonly Artifact[];
  note: string | null;
  relatedProject: ProjectSlug;
}

export interface TimelineEntry {
  id: string;
  organization: string;
  role: string;
  period: string;
  summary: string;
  relatedProject: ProjectSlug;
}

export interface MethodGroup {
  title: string;
  items: readonly string[];
}

export interface ContactConfig {
  email: string | null;
  github: string | null;
  linkedIn: string | null;
  location: string | null;
}

export interface SiteConfig {
  name: string;
  heroLine: string;
  introduction: string;
  secondaryIntroduction: string;
  contact: ContactConfig;
  cvHref: string | null;
  resumeHref: string | null;
  notesEnabled: boolean;
  cvEnabled: boolean;
}

export const siteConfig: SiteConfig = {
  name: "Tim Chao",
  heroLine:
    "I work on hard technical problems across machine learning, photonics, and quantum systems.",
  introduction:
    "I'm an electrical engineering and mathematics student at Northwestern. I like projects that require learning a new domain, forming a technical argument, and building enough of the system to understand which assumptions actually matter.",
  secondaryIntroduction:
    "My work has included optical-native computing architectures, differentiable photonic simulation, real-time polarization tracking for quantum fiber links, and learning with ambiguous labels.",
  contact: {
    email: null,
    github: null,
    linkedIn: null,
    location: null,
  },
  cvHref: null,
  resumeHref: null,
  notesEnabled: false,
  cvEnabled: false,
};

const projectSources: readonly ProjectSource[] = [
  {
    slug: "polarization-tracking",
    title: "Real-time polarization tracking for quantum fiber links",
    shortTitle: "Polarization tracking",
    summary:
      "A selective state-space model for tracking time-varying polarization through deployed fiber, trained with an objective that respects the geometry of polarization states.",
    cardSummary:
      "A selective state-space model and geometry-aware objective for predicting polarization through deployed fiber networks.",
    startDate: "2025",
    endDate: null,
    dateLabel: "2025–present",
    status: "ongoing",
    type: "research",
    organization: "Center for Photonic Communication and Computing",
    role: "Undergraduate Researcher",
    collaborators: [],
    tags: [
      "Quantum communications",
      "State-space models",
      "Physics-informed ML",
    ],
    featured: true,
    disclosure: "public-summary",
    hero: {
      motif: "state-trajectory",
      alt: "Conceptual trajectories tracing target and predicted polarization states on a sphere.",
      caption:
        "A newly drawn conceptual view of state tracking on the Poincaré sphere; it is not an experimental figure.",
    },
    thirtySecondSummary:
      "Polarization drifts as light travels through deployed fiber, which complicates systems that depend on maintaining or recovering a known state. This project studies a streaming model that estimates that changing state while training against distance on the Poincaré sphere rather than treating the output as an ordinary flat vector.",
    sections: [
      {
        id: "problem",
        eyebrow: "The problem",
        title: "A moving state in a deployed channel",
        body: [
          "Environmental and mechanical changes can alter polarization as light propagates through deployed fiber. A tracking system therefore has to infer a state that evolves over time, quickly enough to be useful in a potential compensation loop.",
          "The public description focuses on the modeling argument and system abstraction. It does not expose private datasets, hardware parameters, or lab implementation details.",
        ],
        figure: {
          title: "Tracking loop",
          alt: "A signal passes through a changing fiber channel into a state estimator and a possible compensation loop.",
          caption:
            "A public-safe system abstraction: signal, fiber channel, state estimate, and potential compensation.",
          source: "Original conceptual illustration",
        },
      },
      {
        id: "streaming-model",
        eyebrow: "How it works",
        title: "A model shaped for temporal streaming",
        body: [
          "An earlier transformer-style approach made sequence modeling computationally expensive. A selective state-space model offers a more natural way to carry information through a streaming temporal sequence without relying on all-pairs attention.",
          "The model predicts the evolving polarization state from the observed sequence. This page stays at the level of the public research idea; model dimensions, training parameters, and unreleased code are intentionally omitted.",
        ],
      },
      {
        id: "geometry",
        eyebrow: "Physical representation",
        title: "Learning on the Poincaré sphere",
        body: [
          "Polarization states can be represented as points on the Poincaré sphere. That geometry matters: two predictions that appear similar in ordinary coordinates do not necessarily have the same physically meaningful separation on the sphere.",
          "The training objective therefore uses geodesic error—the angular distance along the sphere—instead of only a naive Euclidean distance through the surrounding space.",
        ],
        figure: {
          title: "Chord distance and geodesic distance",
          alt: "Two points on a sphere connected by a straight chord and by a curved path along the surface.",
          caption:
            "The surface path reflects spherical geometry; the chord treats the state space as flat.",
          source: "Original conceptual illustration",
        },
      },
      {
        id: "evaluation",
        eyebrow: "Evaluation",
        title: "Methodology first; numeric claims pending verification",
        body: [
          "The evaluation is intended to compare temporal predictions under a documented dataset split, baseline, metric definition, and run protocol. Those details must be reconciled with the accepted work before public numeric results are added.",
          "No performance percentage is published here because the exact metric, baseline, split, run count, and supporting figure or table have not yet been confirmed for public presentation.",
        ],
      },
      {
        id: "publication",
        eyebrow: "Publication status",
        title: "Accepted at Frontiers in Optics 2026",
        body: [
          "An abstract has been accepted and an oral presentation is forthcoming. The exact title, author order, abstract text, and sharing permissions remain unset until the final accepted citation and rights are confirmed.",
          "Presentation materials and any journal-extension plans will be added only after they become public and are approved for sharing.",
        ],
      },
    ],
    contributions: [
      "Under research supervision, I formulated the problem and developed the model and geometry-aware loss.",
      "I ran the experiments and contributed to the research writing.",
    ],
    metrics: [],
    technicalDecisions: [
      {
        title: "Use a selective state-space model for the stream",
        rationale:
          "The problem is sequential and potentially real-time, so the model should carry temporal state without the cost pattern of all-pairs attention.",
      },
      {
        title: "Represent the target on the Poincaré sphere",
        rationale:
          "The representation keeps the learning problem aligned with the physical state space instead of treating polarization as an unconstrained vector.",
      },
      {
        title: "Optimize geodesic error",
        rationale:
          "Angular distance along the sphere is a more physically meaningful training signal than a naive Euclidean objective.",
      },
    ],
    limitations: [
      "The page does not yet publish quantitative performance claims; the metric ledger, baseline, split, run count, and supporting evidence still require reconciliation.",
      "The accepted abstract's exact title, author order, and public-sharing permissions have not been supplied.",
      "No code, private data, lab parameters, or unpublished figures are exposed.",
      "A tracking model is not, by itself, evidence of an experimentally demonstrated end-to-end compensation system.",
    ],
    artifacts: [
      {
        label: "Accepted abstract",
        kind: "abstract",
        href: null,
        availability: "awaiting-release",
        note: "Add only after the final citation and sharing permission are confirmed.",
      },
      {
        label: "Presentation slides",
        kind: "slides",
        href: null,
        availability: "awaiting-release",
        note: "May be added after the conference if public release is allowed.",
      },
    ],
    relatedWork: [
      {
        slug: "optical-native-computing",
        label: "Optical-native computing",
        relationship:
          "Another project at the boundary between learning systems and photonic hardware.",
      },
    ],
  },
  {
    slug: "optical-native-computing",
    title: "Optical-native computing and differentiable photonic simulation",
    shortTitle: "Optical-native computing",
    summary:
      "An exploratory architecture that maps neural computation to reciprocal photonic primitives, paired with a differentiable simulator used to test hardware-aware assumptions.",
    cardSummary:
      "An exploratory computing architecture built around photonic primitives, together with a differentiable model used to interrogate the physical assumptions.",
    startDate: "2026",
    endDate: "2026",
    dateLabel: "2026",
    status: "public-summary",
    type: "research",
    organization: "MITRE Labs",
    role: "Quantum Photonics Research Intern",
    collaborators: [],
    tags: [
      "Photonic computing",
      "Algorithm-hardware co-design",
      "Differentiable simulation",
    ],
    featured: true,
    disclosure: "public-summary",
    hero: {
      motif: "optical-signal-path",
      alt: "A conceptual optical signal path passing through encode, activate, and decode stages beside a differentiable model loop.",
      caption:
        "A newly drawn, high-level architecture sketch using only public concepts and hardware primitives.",
    },
    thirtySecondSummary:
      "This work asks how a computing architecture changes when optical hardware is treated as a first-class design constraint rather than a drop-in replacement for a digital operation. One case study explores an optical-native architecture; the other uses a differentiable abstraction to test how physical assumptions can affect a photonic circuit model.",
    sections: [
      {
        id: "problem",
        eyebrow: "The problem",
        title: "Interrogate the hardware assumptions early",
        body: [
          "Photonic components can support useful operations, but an architecture still has to account for how information is encoded, how weights are programmed, where nonlinear behavior occurs, and how nonidealities propagate.",
          "The project pairs architecture exploration with differentiable modeling so that algorithm and hardware assumptions can be studied together at a public conceptual level.",
        ],
      },
      {
        id: "architecture",
        eyebrow: "Part I · Architecture exploration",
        title: "Compose computation from photonic primitives",
        body: [
          "The architecture explores ways to reduce repeated weight programming by arranging reciprocal photonic operations around an encode–activate–decode pattern.",
          "The public summary can name the conceptual ingredients without exposing an internal design or implementation.",
        ],
        bullets: [
          "Reciprocal hybrid MZI meshes",
          "Electro-optic modulation",
          "RSAM nonlinearities",
          "Encode–activate–decode operations",
          "Slot-based associative memory",
          "Hardware-aware in-situ training",
        ],
        figure: {
          title: "Architecture-level signal path",
          alt: "Abstract reciprocal optical blocks arranged into encode, activate, and decode stages with a separate weight-programming path.",
          caption:
            "A conceptual explanation drawn from public primitives; it does not reproduce an internal architecture diagram.",
          source: "Original conceptual illustration",
        },
      },
      {
        id: "simulation",
        eyebrow: "Part II · Differentiable simulation",
        title: "Use gradients to study sensitivity and calibration",
        body: [
          "A differentiable model makes it possible to explore architecture and calibration questions while keeping the modeled operations connected to physical assumptions.",
          "At a public-safe level, the work models an eight-channel tree-modulated piezoelectric photonic circuit and represents wavelength variation, reciprocal reflections, and nonidealities. The abstraction can be used to study sensitivity and calibration assumptions.",
          "Module structure, parameter values, calibration data, device-specific interfaces, source code, and internal figures are not disclosed.",
        ],
      },
      {
        id: "result",
        eyebrow: "Public result",
        title: "An architecture-level projection",
        body: [
          "The architectural model projected a 98.4% reduction in weight-programming operations for a modeled 8 × 8 configuration.",
          "This was a simulation- and architecture-level projection, not a fabricated or experimentally demonstrated end-to-end accelerator result.",
          "The comparison is to the reference weight-programming schedule used by the architecture study for the same modeled configuration; the supporting operation-count table is not public.",
        ],
      },
      {
        id: "additional-work",
        eyebrow: "Additional work",
        title: "Adjacent photonics studies",
        body: [
          "Related work included a contribution to an ARPA-E technical review on photonic spiking neural networks and C-band 100 GHz DWDM transceiver characterization for spike encoding.",
          "The review is not linked because public release and distribution authorization have not been established.",
        ],
      },
    ],
    contributions: [
      "I developed the algorithms and implemented the simulator around existing hardware concepts.",
      "My contribution was at the algorithm, architecture-study, and simulation layers; I do not claim invention of the underlying hardware components or fabrication of a chip.",
    ],
    metrics: [
      {
        value: "98.4%",
        label: "Projected reduction in weight-programming operations",
        comparison:
          "Relative to the reference weight-programming schedule used by the architecture study for the same modeled 8 × 8 configuration.",
        measurementType: "projected",
        source:
          "Architectural model for a modeled 8 × 8 configuration; supporting internal materials are not published.",
        notes:
          "This was a simulation- and architecture-level projection, not a fabricated or experimentally demonstrated end-to-end accelerator result. The supporting reference schedule and operation-count table are not public.",
      },
    ],
    technicalDecisions: [
      {
        title: "Treat weight programming as an architectural cost",
        rationale:
          "The study examines whether changing the computational organization can reduce repeated programming operations rather than assuming they are free.",
      },
      {
        title: "Pair the architecture with a differentiable model",
        rationale:
          "Differentiability supports sensitivity and calibration studies while keeping the architecture tied to a hardware-aware abstraction.",
      },
      {
        title: "Keep public diagrams at the conceptual layer",
        rationale:
          "Newly drawn abstractions can explain the argument without reproducing internal slides, simulator structure, parameters, or device-specific interfaces.",
      },
    ],
    limitations: [
      "The 98.4% value is projected from a simulation- and architecture-level model of an 8 × 8 configuration; it is not measured chip performance.",
      "The work did not fabricate or experimentally demonstrate an end-to-end accelerator.",
      "The summary does not disclose simulator internals, parameter values, calibration data, source code, internal figures, or raw data.",
      "The underlying photonic components are existing hardware concepts; the contribution described here is limited to algorithms, architecture study, and simulator implementation.",
    ],
    artifacts: [
      {
        label: "Public project summary",
        kind: "documentation",
        href: null,
        availability: "not-public",
        note: "This page is the public summary; no external project artifact was supplied.",
      },
      {
        label: "ARPA-E technical review",
        kind: "paper",
        href: null,
        availability: "not-public",
        note: "Do not link unless it is publicly released and distribution is authorized.",
      },
    ],
    relatedWork: [
      {
        slug: "polarization-tracking",
        label: "Polarization tracking",
        relationship:
          "A second project connecting temporal learning with photonic and quantum systems.",
      },
      {
        slug: "pypcl",
        label: "PyPCL",
        relationship:
          "A software-focused example of building an experimental framework to test a technical argument.",
      },
    ],
  },
  {
    slug: "pypcl",
    title: "PyPCL: learning with ambiguous labels",
    shortTitle: "PyPCL",
    summary:
      "A PyTorch research framework for implementing and comparing partial-label and complementary-label learning methods on common image datasets.",
    cardSummary:
      "A PyTorch research framework for comparing partial-label and complementary-label learning methods under ambiguous supervision.",
    startDate: "2025",
    endDate: "2025",
    dateLabel: "2025",
    status: "open-source",
    type: "software",
    organization: "Computational Learning Lab",
    role: "Undergraduate Researcher",
    collaborators: [],
    tags: ["Weak supervision", "PyTorch", "Research software"],
    featured: true,
    disclosure: "open-source",
    hero: {
      motif: "candidate-labels",
      alt: "A matrix of samples and possible labels, with candidate sets and excluded labels highlighted.",
      caption:
        "A conceptual comparison of learning from candidate labels and learning from labels known to be incorrect.",
    },
    thirtySecondSummary:
      "Ordinary supervised learning assumes that every training example has one known correct label. Partial-label learning instead supplies a set containing the answer, while complementary-label learning supplies labels known not to be the answer. PyPCL places methods for both settings in one PyTorch research framework so their assumptions and experiment setups can be compared more consistently.",
    sections: [
      {
        id: "labels",
        eyebrow: "The problem",
        title: "Supervision can be ambiguous in different ways",
        body: [
          "A partial label gives a candidate set that includes the correct class but does not identify which candidate is correct. A complementary label identifies one or more classes that are not correct.",
          "Both settings weaken ordinary supervision, but they express different information. Comparing them in one framework makes configuration and implementation differences easier to examine.",
        ],
        figure: {
          title: "Two forms of ambiguous supervision",
          alt: "One sample has several possible labels while another has labels marked as known incorrect.",
          caption:
            "Candidate sets narrow the answer from within; complementary labels rule answers out.",
          source: "Original conceptual illustration",
        },
      },
      {
        id: "methods",
        eyebrow: "Implemented methods",
        title: "A shared home for six research methods",
        body: [
          "The framework implements methods from both paradigms so experiments can share configuration and data-generation conventions.",
        ],
        bullets: ["PiCo", "Proden", "SoLar", "MCL-LOG", "MCL-MAE", "MCL-EXP"],
      },
      {
        id: "data",
        eyebrow: "Data",
        title: "Generated and human-annotated ambiguous labels",
        body: [
          "The framework supports dataset generation for ambiguous supervision as well as human-annotated datasets. Exact datasets, generation settings, preprocessing, and splits must accompany any published comparison.",
          "No dataset-specific benchmark is claimed here because those definitions and the supporting result table were not supplied for public verification.",
        ],
      },
      {
        id: "experiments",
        eyebrow: "Experiment design",
        title: "Unify configuration without erasing method differences",
        body: [
          "A unified experiment configuration makes it easier to vary datasets, supervision settings, and methods without rebuilding the surrounding workflow for every comparison.",
          "Published results should state exact dataset definitions, seeds, uncertainty, hardware, and any implementation differences from the original papers. Those details remain pending, so this page presents no comparative metric.",
        ],
      },
      {
        id: "software",
        eyebrow: "Software structure",
        title: "A research framework, not yet a polished library",
        body: [
          "The code organizes method implementations, ambiguous-label generation, datasets, and experiment configuration for research use.",
          "Before the repository is presented as a flagship public artifact, it still needs a verified clone path, license, supported Python and PyTorch versions, reproducible environment, tests, continuous integration, benchmark documentation, dataset instructions, contributor credits, citations, and a minimal example.",
        ],
      },
    ],
    contributions: [
      "The public brief confirms the framework and its research scope but does not provide a verified individual contribution statement.",
      "Authorship and contributor credits should be added before assigning implementation ownership on the public page.",
    ],
    metrics: [],
    technicalDecisions: [
      {
        title: "Compare two supervision paradigms in one framework",
        rationale:
          "A shared experimental surface helps expose which differences come from the learning assumption, configuration, data construction, or implementation.",
      },
      {
        title: "Centralize experiment configuration",
        rationale:
          "Consistent configuration supports more reproducible comparisons while still allowing method-specific behavior to be documented.",
      },
      {
        title: "Treat implementation deviations as results metadata",
        rationale:
          "Research comparisons are interpretable only when known differences from the original papers are made explicit.",
      },
    ],
    limitations: [
      "PyPCL is a research framework, not a production-ready or general-purpose library.",
      "No public benchmark is shown until dataset definitions, seeds, uncertainty, hardware, and reproducible instructions are supplied.",
      "The repository cleanup, test coverage, continuous integration, license, environment specification, citations, and contributor credits are not yet confirmed complete.",
      "Known deviations from original method implementations must be documented before method-level comparisons are presented as reproducible results.",
    ],
    artifacts: [
      {
        label: "Repository",
        kind: "repository",
        href: null,
        availability: "awaiting-release",
        note: "The repository URL and pre-launch cleanup status were not supplied.",
      },
      {
        label: "Documentation",
        kind: "documentation",
        href: null,
        availability: "awaiting-release",
        note: "Add after setup, data, method-citation, and reproducibility guidance is ready.",
      },
    ],
    relatedWork: [
      {
        slug: "deliberate-occlusion",
        label: "Deliberate Occlusion",
        relationship:
          "Earlier work on learning and interpretation in visual classification.",
      },
      {
        slug: "polarization-tracking",
        label: "Polarization tracking",
        relationship:
          "A later application of learning-system design to a physically structured temporal problem.",
      },
    ],
  },
  {
    slug: "deliberate-occlusion",
    title: "Deliberate Occlusion: Asymmetry in Facial Expression",
    shortTitle: "Deliberate Occlusion",
    summary:
      "A conference paper studying deliberate facial-region occlusion, attention, and salient regions in facial-expression analysis.",
    cardSummary:
      "Earlier research on deliberate facial-region occlusion and attention in facial-expression analysis.",
    startDate: "2022",
    endDate: "2023",
    dateLabel: "2022–2023",
    status: "published",
    type: "publication",
    organization: "National Ilan University",
    role: "Student Researcher",
    collaborators: ["Hung-Tse Chan", "Chih-Hsien Hsia"],
    tags: ["Machine learning", "Computer vision", "Facial expression"],
    featured: false,
    disclosure: "publication",
    hero: {
      motif: "facial-regions",
      alt: "An abstract face divided into regions, with one region occluded and attention concentrated elsewhere.",
      caption:
        "A newly drawn summary of deliberate region occlusion and attention; it does not reproduce a paper figure.",
    },
    thirtySecondSummary:
      "The paper asks how deliberately occluding facial regions can be used in facial-expression analysis and what attention maps reveal about salient regions. It combines an occlusion-based data-augmentation strategy with channel and spatial attention, then examines heatmap visualizations and the evaluation reported in the publication.",
    sections: [
      {
        id: "question",
        eyebrow: "Research question",
        title: "What changes when a facial region is deliberately hidden?",
        body: [
          "Facial-expression models can rely unevenly on different regions of a face. Deliberate occlusion provides a way to vary which evidence remains visible and to study asymmetry in that evidence.",
          "This summary stays within the paper-level description; it does not add a causal interpretation or a broader generalization that the supplied citation does not verify.",
        ],
      },
      {
        id: "approach",
        eyebrow: "Approach",
        title: "Occlusion, channel attention, and spatial attention",
        body: [
          "The work uses deliberate occlusion as a data-augmentation strategy and combines channel and spatial attention to examine how facial information is weighted.",
          "Heatmap visualization provides a view of salient facial regions. Any figure added to this page should be newly drawn or used only with publication authorization.",
        ],
        figure: {
          title: "Facial-region attention",
          alt: "A face-region grid showing an occluded area beside an abstract attention heatmap.",
          caption:
            "A conceptual illustration of the analysis, not a reproduction of a result figure.",
          source: "Original conceptual illustration",
        },
      },
      {
        id: "evaluation",
        eyebrow: "Evaluation",
        title: "Use only the paper-supported result",
        body: [
          "The publication reports the evaluation and improvement associated with the method. No numeric improvement is repeated here because the supplied brief does not include the metric definition, baseline, dataset configuration, or value needed to contextualize it responsibly.",
          "The paper should remain the source of record until those details are extracted and verified for a metric block.",
        ],
      },
      {
        id: "citation",
        eyebrow: "Publication",
        title: "ICKII 2023",
        body: [
          "Hung-Tse Chan, Yen-Chun Chao, and Chih-Hsien Hsia. “Deliberate Occlusion: Asymmetry in Facial Expression.” 2023 IEEE 6th International Conference on Knowledge Innovation and Invention, pp. 338–341. DOI: 10.1109/ICKII58656.2023.10332758.",
        ],
      },
    ],
    contributions: [
      "Tim's individual contribution has not yet been confirmed for public description.",
      "This page records coauthorship without inferring sole ownership of the method, experiments, or writing.",
    ],
    metrics: [],
    technicalDecisions: [
      {
        title: "Use deliberate occlusion as data augmentation",
        rationale:
          "The intervention varies which facial-region evidence is available to the model and supports the paper's asymmetry question.",
      },
      {
        title: "Pair channel and spatial attention",
        rationale:
          "The two forms of attention provide complementary views of how features and locations are weighted in the analysis.",
      },
      {
        title: "Inspect heatmaps alongside evaluation",
        rationale:
          "Visualization can help describe salient regions, while remaining separate from the quantitative evidence reported by the paper.",
      },
    ],
    limitations: [
      "Tim's individual contribution must be confirmed before the public page attributes specific parts of the work to him.",
      "No numeric improvement is shown without the paper-supported metric definition, baseline, dataset configuration, and value.",
      "A hosted paper or paper figure should be added only when the hosting arrangement and reuse rights are authorized.",
      "Attention heatmaps describe model salience and should not be presented as a causal explanation of facial expression.",
    ],
    artifacts: [
      {
        label: "DOI",
        kind: "doi",
        href: "https://doi.org/10.1109/ICKII58656.2023.10332758",
        availability: "available",
      },
      {
        label: "Paper",
        kind: "paper",
        href: null,
        availability: "awaiting-release",
        note: "Add a hosted paper only when distribution is authorized.",
      },
      {
        label: "Citation",
        kind: "citation",
        href: null,
        availability: "not-public",
        note: "The complete citation is provided on the page; no citation-export file was supplied.",
      },
    ],
    relatedWork: [
      {
        slug: "pypcl",
        label: "PyPCL",
        relationship:
          "A later project focused on learning when label supervision itself is ambiguous.",
      },
    ],
  },
];

export interface Section {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  eyebrow?: string;
  figure?: FigurePlan;
}

export interface Decision {
  title: string;
  body: string;
}

export interface ProjectArtifact {
  label: string;
  href?: string;
  note?: string;
  kind: ArtifactKind;
  availability: ArtifactAvailability;
}

export interface RelatedProject {
  slug: ProjectSlug;
  title: string;
  relationship: string;
}

export interface Project {
  slug: ProjectSlug;
  title: string;
  homepageTitle?: string;
  cardSummary: string;
  shortSummary: string;
  date: string;
  status: ProjectStatus;
  type: ProjectType;
  organization: string | null;
  role: string | null;
  disclosure: DisclosureLevel;
  tags: string[];
  visual: "polarization" | "photonic" | "pypcl" | "occlusion";
  visualAlt: string;
  visualCaption: string;
  collaborators?: string[];
  sections: Section[];
  contribution: string[];
  decisions: Decision[];
  metrics: Metric[];
  limitations: string[];
  artifacts: ProjectArtifact[];
  related: RelatedProject[];
  startDate: string;
  endDate: string | null;
  thirtySecondSummary: string;
  featured: boolean;
}

export const projects: readonly Project[] = projectSources.map((project) => ({
  slug: project.slug,
  title: project.title,
  homepageTitle: project.shortTitle,
  cardSummary: project.cardSummary,
  shortSummary: project.summary,
  date: project.dateLabel,
  status: project.status,
  type: project.type,
  organization: project.organization,
  role: project.role,
  disclosure: project.disclosure,
  tags: [...project.tags],
  visual:
    project.hero.motif === "state-trajectory"
      ? "polarization"
      : project.hero.motif === "optical-signal-path"
        ? "photonic"
        : project.hero.motif === "candidate-labels"
          ? "pypcl"
          : "occlusion",
  visualAlt: project.hero.alt,
  visualCaption: project.hero.caption,
  collaborators: [...project.collaborators],
  sections: project.sections.map((section) => ({
    id: section.id,
    title: section.title,
    paragraphs: [...section.body],
    bullets: section.bullets ? [...section.bullets] : undefined,
    eyebrow: section.eyebrow,
    figure: section.figure,
  })),
  contribution: [...project.contributions],
  decisions: project.technicalDecisions.map((decision) => ({
    title: decision.title,
    body: decision.rationale,
  })),
  metrics: project.metrics.map((metric) => ({ ...metric })),
  limitations: [...project.limitations],
  artifacts: project.artifacts.map((artifact) => ({
    label: artifact.label,
    href: artifact.href ?? undefined,
    note: artifact.note,
    kind: artifact.kind,
    availability: artifact.availability,
  })),
  related: project.relatedWork.map((item) => ({
    slug: item.slug,
    title: item.label,
    relationship: item.relationship,
  })),
  startDate: project.startDate,
  endDate: project.endDate,
  thirtySecondSummary: project.thirtySecondSummary,
  featured: project.featured,
}));

export const publications = [
  {
    id: "deliberate-occlusion-ickii-2023",
    kind: "paper",
    title: "Deliberate Occlusion: Asymmetry in Facial Expression",
    displayTitle: "Deliberate Occlusion: Asymmetry in Facial Expression",
    authors: ["Hung-Tse Chan", "Yen-Chun Chao", "Chih-Hsien Hsia"],
    venue:
      "2023 IEEE 6th International Conference on Knowledge Innovation and Invention",
    year: 2023,
    status: "published",
    citation:
      "Hung-Tse Chan, Yen-Chun Chao, and Chih-Hsien Hsia. “Deliberate Occlusion: Asymmetry in Facial Expression.” 2023 IEEE 6th International Conference on Knowledge Innovation and Invention, pp. 338–341.",
    pages: "338–341",
    doi: "10.1109/ICKII58656.2023.10332758",
    links: [
      {
        label: "DOI",
        kind: "doi",
        href: "https://doi.org/10.1109/ICKII58656.2023.10332758",
        availability: "available",
      },
    ],
    note: "A hosted paper should be linked only if distribution is authorized.",
    relatedProject: "deliberate-occlusion",
  },
  {
    id: "frontiers-in-optics-2026",
    kind: "talk",
    title: null,
    displayTitle: "Accepted abstract at Frontiers in Optics 2026",
    authors: [],
    venue: "Frontiers in Optics 2026",
    year: 2026,
    status: "accepted",
    citation:
      "Frontiers in Optics 2026. Accepted abstract; oral presentation forthcoming.",
    pages: null,
    doi: null,
    links: [],
    note:
      "The exact title, author order, accepted citation, abstract text, and sharing rights have not been supplied; no PDF or performance claim should be published yet.",
    relatedProject: "polarization-tracking",
  },
] as const satisfies readonly PublicationEntry[];

export const timeline = [
  {
    id: "mitre-labs",
    organization: "MITRE Labs",
    role: "Quantum Photonics Research Intern",
    period: "2026–present",
    summary:
      "Exploring optical-native computing architectures and differentiable models for hardware-aware photonics studies.",
    relatedProject: "optical-native-computing",
  },
  {
    id: "center-photonic-communication-computing",
    organization: "Center for Photonic Communication and Computing",
    role: "Undergraduate Researcher",
    period: "2025–present",
    summary:
      "Developing real-time polarization-tracking methods for deployed quantum fiber links.",
    relatedProject: "polarization-tracking",
  },
  {
    id: "computational-learning-lab",
    organization: "Computational Learning Lab",
    role: "Undergraduate Researcher",
    period: "2025",
    summary:
      "Studying ambiguous supervision through a shared PyTorch research framework for partial- and complementary-label methods.",
    relatedProject: "pypcl",
  },
  {
    id: "national-ilan-university",
    organization: "National Ilan University",
    role: "Student Researcher",
    period: "2022",
    summary:
      "Contributed as a coauthor to published research on deliberate occlusion and facial-expression asymmetry.",
    relatedProject: "deliberate-occlusion",
  },
] as const satisfies readonly TimelineEntry[];

export const aboutCopy = {
  preview:
    "I enjoy problems that are difficult enough to require learning a new field, building a model or system, and figuring out which assumptions actually matter. My work so far has taken me through machine learning, photonics, quantum communications, and emerging computing architectures. The variety is intentional: this site is a record of that exploration rather than a claim that I have already chosen one narrow specialization.",
  opening:
    "I'm Tim Chao, an electrical engineering and mathematics student at Northwestern. I enjoy problems that are difficult enough to require learning a new field, building a model or system, and figuring out which assumptions actually matter. My work so far has taken me through machine learning, photonics, quantum communications, and emerging computing architectures. The variety is intentional: this site is a record of that exploration rather than a claim that I have already chosen one narrow specialization.",
  education:
    "Northwestern University — Electrical Engineering and Mathematics, with an intended combined M.S. path in Electrical Engineering; full course of study expected to conclude in 2028.",
  currentInterests: [
    "Machine learning",
    "Photonics",
    "Quantum communications",
    "Emerging computing architectures",
  ],
  languages: ["English", "Chinese"],
  distinctions: ["Dean's List High Honors", "Four-time AIME qualification"],
} as const;

export const methodGroups = [
  {
    title: "Modeling and learning",
    items: [
      "Python",
      "PyTorch",
      "State-space models",
      "Weak supervision",
      "Numerical experimentation",
    ],
  },
  {
    title: "Physical systems",
    items: [
      "Photonics",
      "Polarization",
      "Differentiable hardware models",
      "Quantum communications",
    ],
  },
  {
    title: "Foundations",
    items: ["Algorithms", "Probability", "Linear algebra", "Quantum mechanics"],
  },
] as const satisfies readonly MethodGroup[];
