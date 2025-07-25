// Système de couleurs basé sur la palette Code 212
export const colorSystem = {
  // Couleurs principales (basées sur l'image)
  primary: {
    magenta: '#c5027f', // Identité principale
    roseRouge: '#ff005b', // Accent dynamique  
    turquoise: '#00adbc', // Énergie digitale
    jauneOr: '#ffc000', // Éclat/lumière
    vertElectrique: '#00e87e', // Innovation
    violetIndigo: '#300069', // Profondeur institutionnelle
    marronBeige: '#b17f49', // Chaleur organique
    vertLime: '#7bc600', // Fraîcheur & jeunesse
    cyanBleuClair: '#00dfff', // Accent moderne
    violetBleuViolace: '#6701e6', // Équilibre high-tech
    rosePale: '#c5027f', // Douceur
    noirGrisFonce: '#121214', // Fond neutre sombre
    bleuTechno: '#0a1f44', // Fond principal
    vertElectriqueClair: '#2cd3a3', // Accent numérique
    grisClair: '#f4f4f4', // Secondaire neutre
    rougeMarocain: '#b82929' // Accent institutionnel
  },
  
  // Système de couleurs pour les composants
  components: {
    cards: {
      primary: 'bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-900',
      secondary: 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-purple-900',
      success: 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-900 dark:to-green-900',
      warning: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-slate-900 dark:to-yellow-900',
      danger: 'bg-gradient-to-br from-red-50 to-pink-50 dark:from-slate-900 dark:to-red-900',
      info: 'bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-slate-900 dark:to-cyan-900'
    },
    borders: {
      primary: 'border-blue-200 dark:border-blue-700',
      secondary: 'border-purple-200 dark:border-purple-700',
      success: 'border-green-200 dark:border-green-700',
      warning: 'border-yellow-200 dark:border-yellow-700',
      danger: 'border-red-200 dark:border-red-700',
      info: 'border-cyan-200 dark:border-cyan-700'
    },
    text: {
      primary: 'text-blue-700 dark:text-blue-300',
      secondary: 'text-purple-700 dark:text-purple-300',
      success: 'text-green-700 dark:text-green-300',
      warning: 'text-yellow-700 dark:text-yellow-300',
      danger: 'text-red-700 dark:text-red-300',
      info: 'text-cyan-700 dark:text-cyan-300'
    },
    buttons: {
      primary: 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white',
      secondary: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white',
      success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white',
      warning: 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white',
      danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white',
      info: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white'
    }
  }
};

// Utility function pour obtenir les couleurs d'un thème
export const getThemeColors = (theme: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info') => ({
  card: colorSystem.components.cards[theme],
  border: colorSystem.components.borders[theme],
  text: colorSystem.components.text[theme],
  button: colorSystem.components.buttons[theme]
});
