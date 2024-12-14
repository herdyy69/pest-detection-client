const badgeStyle = ({ addComponents, theme, variants }: any) => {
  const badgeStyles = {
    '.badge': {
      // Base badge styles
      border: `1px solid ${theme('colors.greyscale.6')}`,
      borderRadius: theme('borderRadius.full'),
      color: theme('colors.greyscale.6'),
      display: 'inline-block',
      fontFamily: theme('fontFamily.manrope'),
      fontSize: '12px',
      fontWeight: '400',
      padding: `${theme('spacing.1')} ${theme('spacing.2')}`,

      // Primary badge styles
      '&.badge-blue': {
        backgroundColor: theme('colors.blue.base'),
        color: theme('colors.greyscale.0'),
      },

      '&.badge-red': {
        backgroundColor: theme('colors.red.base'),
        color: theme('colors.greyscale.0'),
      },

      '&.badge-yellow': {
        backgroundColor: theme('colors.yellow.base'),
        color: theme('colors.greyscale.10'),
      },

      '&.badge-green': {
        backgroundColor: theme('colors.green.base'),
        color: theme('colors.greyscale.0'),
      },

      // Outline badge styles
      '&.badge-outline-blue': {
        borderColor: theme('colors.blue.base'),
        color: theme('colors.blue.base'),
      },

      '&.badge-outline-red': {
        borderColor: theme('colors.red.base'),
        color: theme('colors.red.base'),
      },

      '&.badge-outline-yellow': {
        borderColor: theme('colors.yellow.base'),
        color: theme('colors.yellow.base'),
      },

      '&.badge-outline-green': {
        borderColor: theme('colors.green.base'),
        color: theme('colors.green.base'),
      },
    },
  }

  addComponents(badgeStyles, variants('badge'))
}

export default badgeStyle
