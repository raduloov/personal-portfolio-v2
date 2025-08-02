export const languageColors: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  'C++': '#f34b7d',
  Swift: '#FA7343',
  Kotlin: '#A97BFF',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  'C#': '#178600',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dart: '#00B4AB',
  Vue: '#41b883',
  React: '#61dafb',
  Default: '#586069'
}

export const getLanguageColor = (language?: string): string => {
  if (!language) return languageColors.Default
  return languageColors[language] || languageColors.Default
}