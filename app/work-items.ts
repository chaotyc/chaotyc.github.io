export interface WorkItem {
  id: string;
  title: string;
  summary: string;
  meta: string;
  href?: string;
  linkLabel?: string;
}

export const workItems = [
  {
    id: "polarization-tracking",
    title:
      "Real-Time Polarization Stabilization of Optical Signals in Quantum Networks via Physics-Informed Sequence Modeling",
    summary:
      "A physics-informed selective state-space model for real-time polarization stabilization across deployed quantum fiber links.",
    meta: "Conference paper · FIO LS 2026",
    href: "/papers/real-time-polarization-stabilization.pdf",
    linkLabel: "PDF",
  },
  {
    id: "optical-native-computing",
    title: "Optical-Native Computing and Differentiable Photonic Simulation",
    summary:
      "A public-safe exploration of optical-native computing architectures and differentiable photonic simulation, with projected results kept distinct from measured hardware performance.",
    meta: "Research · MITRE Labs · 2026",
  },
  {
    id: "pypcl",
    title: "PyPCL: Learning with Ambiguous Labels",
    summary:
      "A PyTorch research framework for comparing partial-label and complementary-label learning methods under ambiguous supervision.",
    meta: "Research software · 2025",
    href: "https://github.com/chaotyc/PyPCL",
    linkLabel: "GitHub",
  },
  {
    id: "deliberate-occlusion",
    title: "Deliberate Occlusion: Asymmetry in Facial Expression",
    summary:
      "A conference paper on deliberate facial-region occlusion, attention mechanisms, and asymmetry in facial-expression recognition.",
    meta: "Conference paper · ICKII 2023",
    href: "https://www.researchgate.net/profile/Chan-Hung-Tse-2/publication/376227413_Deliberate_Occlusion_Asymmetry_in_Facial_Expression/links/660a3b18b839e05a20b52621/Deliberate-Occlusion-Asymmetry-in-Facial-Expression.pdf",
    linkLabel: "PDF",
  },
] as const satisfies readonly WorkItem[];

const selectedWorkIds = new Set(["optical-native-computing", "pypcl"]);

export const selectedWorkItems = workItems.filter((item) =>
  selectedWorkIds.has(item.id),
);
