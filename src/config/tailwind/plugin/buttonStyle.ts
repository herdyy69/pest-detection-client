const buttonStyle = ({ addComponents, theme, variants }: any) => {
  const buttonStyles = {
    '.btn': {
      // Base button styles
      border: '1px solid transparent',
      borderRadius: theme('borderRadius.md'),
      cursor: 'pointer',
      color: theme('colors.greyscale.0'),
      display: 'inline-block',
      fontFamily: theme('fontFamily.manrope'),
      fontSize: '14px',
      fontWeight: '500',
      padding: `${theme('spacing.3')} ${theme('spacing.3')}`,
      transition: 'background-color 0.3s ease',

      '&:disabled': {
        borderColor: 'transparent !important',
        cursor: 'not-allowed',
      },

      // Size button styles
      '&.btn-sm': {
        padding: `${theme('spacing.3')} ${theme('spacing.4')}`,
        fontSize: '12px',
      },

      '&.btn-lg': {
        padding: `${theme('spacing.4')} ${theme('spacing.5')}`,
        fontSize: '16px',
      },

      // Primary button styles
      '&.btn-blue': {
        backgroundColor: theme('colors.blue.base'),
        color: theme('colors.greyscale.0'),
        '&:hover:enabled': {
          backgroundColor: theme('colors.blue.6'),
        },
        '&:active:enabled': {
          backgroundColor: theme('colors.blue.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.1'),
          backgroundColor: theme('colors.greyscale.5'),
        },
      },

      '&.btn-red': {
        backgroundColor: theme('colors.red.base'),
        color: theme('colors.greyscale.0'),
        '&:hover:enabled': {
          backgroundColor: theme('colors.red.6'),
        },
        '&:active:enabled': {
          backgroundColor: theme('colors.red.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.1'),
          backgroundColor: theme('colors.greyscale.5'),
        },
      },

      '&.btn-yellow': {
        backgroundColor: theme('colors.yellow.base'),
        color: theme('colors.greyscale.10'),
        '&:hover:enabled': {
          backgroundColor: theme('colors.yellow.6'),
        },
        '&:active:enabled': {
          backgroundColor: theme('colors.yellow.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.1'),
          backgroundColor: theme('colors.greyscale.5'),
        },
      },

      '&.btn-green': {
        backgroundColor: theme('colors.green.base'),
        color: theme('colors.greyscale.0'),
        '&:hover:enabled': {
          backgroundColor: theme('colors.green.6'),
        },
        '&:active:enabled': {
          backgroundColor: theme('colors.green.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.1'),
          backgroundColor: theme('colors.greyscale.5'),
        },
      },

      // Outline button styles
      '&.btn-outline-blue': {
        borderColor: theme('colors.blue.base'),
        color: theme('colors.blue.base'),
        '&:hover:enabled': {
          borderColor: theme('colors.blue.6'),
          color: theme('colors.blue.6'),
        },
        '&:active:enabled': {
          borderColor: theme('colors.blue.8'),
          color: theme('colors.blue.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
          backgroundColor: theme('colors.greyscale.3'),
        },
      },

      '&.btn-outline-red': {
        borderColor: theme('colors.red.base'),
        color: theme('colors.red.base'),
        '&:hover:enabled': {
          borderColor: theme('colors.red.6'),
          color: theme('colors.red.6'),
        },
        '&:active:enabled': {
          borderColor: theme('colors.red.8'),
          color: theme('colors.red.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
          backgroundColor: theme('colors.greyscale.3'),
        },
      },

      '&.btn-outline-yellow': {
        borderColor: theme('colors.yellow.base'),
        color: theme('colors.yellow.base'),
        '&:hover:enabled': {
          borderColor: theme('colors.yellow.6'),
          color: theme('colors.yellow.6'),
        },
        '&:active:enabled': {
          borderColor: theme('colors.yellow.8'),
          color: theme('colors.yellow.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
          backgroundColor: theme('colors.greyscale.3'),
        },
      },

      '&.btn-outline-green': {
        borderColor: theme('colors.green.base'),
        color: theme('colors.green.base'),
        '&:hover:enabled': {
          borderColor: theme('colors.green.6'),
          color: theme('colors.green.6'),
        },
        '&:active:enabled': {
          borderColor: theme('colors.green.8'),
          color: theme('colors.green.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
          backgroundColor: theme('colors.greyscale.3'),
        },
      },

      '&.btn-outline-greyscale': {
        borderColor: theme('colors.greyscale.6'),
        color: theme('colors.greyscale.6'),
        '&:hover:enabled': {
          borderColor: theme('colors.greyscale.7'),
          color: theme('colors.greyscale.7'),
        },
        '&:active:enabled': {
          borderColor: theme('colors.greyscale.8'),
          color: theme('colors.greyscale.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
          backgroundColor: theme('colors.greyscale.3'),
        },
      },

      // Text button styles
      '&.btn-text-blue': {
        color: theme('colors.blue.base'),
        padding: 0,
        '&:hover:enabled': {
          color: theme('colors.blue.6'),
        },
        '&:active:enabled': {
          color: theme('colors.blue.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
        },
      },

      '&.btn-text-red': {
        color: theme('colors.red.base'),
        padding: 0,
        '&:hover:enabled': {
          color: theme('colors.red.6'),
        },
        '&:active:enabled': {
          color: theme('colors.red.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
        },
      },

      '&.btn-text-yellow': {
        color: theme('colors.yellow.base'),
        padding: 0,
        '&:hover:enabled': {
          color: theme('colors.yellow.6'),
        },
        '&:active:enabled': {
          color: theme('colors.yellow.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
        },
      },

      '&.btn-text-green': {
        color: theme('colors.green.base'),
        padding: 0,
        '&:hover:enabled': {
          color: theme('colors.green.6'),
        },
        '&:active:enabled': {
          color: theme('colors.green.8'),
        },
        '&:disabled': {
          color: theme('colors.greyscale.5'),
        },
      },
    },
  }

  addComponents(buttonStyles, variants('button'))
}

export default buttonStyle
