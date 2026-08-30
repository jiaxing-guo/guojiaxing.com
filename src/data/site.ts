export const site = {
  name: 'Guo Jiaxing',
  title: 'Guo Jiaxing — Research & Engineering',
  description:
    'Research on reliable decision-making, strategic interaction, and computational game theory.',
  url: 'https://guojiaxing.com',
  alternateName: 'Jiaxing Guo',
  email: 'jiaxing.guo11@outlook.com',
  github: 'https://github.com/jiaxing-guo',
  linkedin: 'https://www.linkedin.com/in/jiaxing-guo11/',
  arxiv: 'https://arxiv.org/a/guo_j_7.html',
  affiliations: ['Imperial College London'],
  role: 'Co-Founder',
  company: 'FIFTEEN AI Inc.',
} as const;

export const navigation = [
  { label: 'Research', href: '/research/' },
  { label: 'Project', href: '/project/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
] as const;
