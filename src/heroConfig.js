export const heroConfig = {
  name: 'Raya',
  role: 'Software Developer & Software Engineer',
  ticker: 'BUILD YOUR IDEA',
  cta: "Let's work together",
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85',
  objects: [
    { id: 'vscode', kind: 'vscode', label: 'VS Code', mark: '</>', asset: '/assets/vscode.png', x: '18%', y: '18%', mobileX: '6%', mobileY: '20%', size: 132, rotateX: 12, rotateY: -24, rotateZ: -11, float: 18, duration: 5.6, delay: 0.1, parallax: -100 },
    { id: 'react', kind: 'react', label: 'React', mark: '⚛', asset: '/assets/react.png', x: '76%', y: '16%', mobileX: '74%', mobileY: '18%', size: 132, rotateX: -18, rotateY: 22, rotateZ: 10, float: 15, duration: 4.9, delay: 0.7, parallax: 90 },
    { id: 'laravel', kind: 'laravel', label: 'Laravel', mark: 'Lr', asset: '/assets/laravel.png', x: '14%', y: '52%', mobileX: '3%', mobileY: '55%', size: 132, rotateX: 8, rotateY: 18, rotateZ: -8, float: 18, duration: 6.1, delay: 0.4, parallax: 70 },
    { id: 'node', kind: 'node', label: 'Node.js', mark: 'N', asset: '/assets/tailwind.png', x: '22%', y: '77%', mobileX: '6%', mobileY: '79%', size: 125, rotateX: 20, rotateY: -22, rotateZ: -14, float: 21, duration: 5.2, delay: 1.1, parallax: -130 },
    { id: 'tailwind', kind: 'tailwind', label: 'Tailwind', mark: '≈', asset: '/assets/javascript.png', x: '78%', y: '53%', mobileX: '76%', mobileY: '54%', size: 132, rotateX: -20, rotateY: 25, rotateZ: 15, float: 16, duration: 6.5, delay: 0.2, parallax: 110 },
    { id: 'figma', kind: 'figma', label: 'Figma', mark: '●', asset: '/assets/git.png', x: '73%', y: '78%', mobileX: '72%', mobileY: '80%', size: 122, rotateX: 18, rotateY: -24, rotateZ: 18, float: 21, duration: 5.8, delay: 0.9, parallax: -80 },
  ],
}

export const stackConfig = {
  frontend: [
    { id: 'react', label: 'React', icon: '/assets/react.png' },
    { id: 'javascript', label: 'JavaScript', icon: '/assets/javascript.png' },
    { id: 'tailwind', label: 'Tailwind', icon: '/assets/tailwind.png' },
    { id: 'vscode', label: 'VS Code', icon: '/assets/vscode.png' },
  ],
  backend: [
    { id: 'laravel', label: 'Laravel', icon: '/assets/laravel.png' },
    { id: 'git', label: 'Git', icon: '/assets/git.png' },
    { id: 'node', label: 'Node.js', icon: '/assets/tailwind.png' },
  ],
  deployment: [
    { id: 'dep-vscode', label: 'Vercel', icon: '/assets/vscode.png' },
    { id: 'dep-git', label: 'Docker', icon: '/assets/git.png' },
    { id: 'dep-js', label: 'Nginx', icon: '/assets/javascript.png' },
  ],
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]
