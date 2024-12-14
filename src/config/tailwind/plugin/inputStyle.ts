const inputStyle = ({ addComponents, theme, variants }: any) => {
  const inputStyles = {
    '.form-input, .form-textarea, .form-select, form-multiselect': {
      border: `1px solid ${theme('colors.greyscale.4')}`,
      borderRadius: '4px',
      color: theme('colors.greyscale.7'),
      display: 'inline-block',
      fontFamily: theme('fontFamily.manrope'),
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '18px',
      minHeight: '42px',
      padding: theme('spacing.3'),
      width: '100%',

      '&:disabled': {
        backgroundColor: theme('colors.greyscale.2'),
        color: theme('colors.greyscale.4'),
        opacity: 0.5,
      },

      '&::placeholder': {
        fontSize: '14px',
        color: theme('colors.greyscale.5'),
      },

      '&:focus': {
        borderColor: theme('colors.blue.base'),
      },

      '&.error': {
        borderColor: theme('colors.red.base'),
      },

      '&.success': {
        borderColor: theme('colors.green.base'),
      },

      '&.warning': {
        borderColor: theme('colors.yellow.base'),
      },
    },
  }

  addComponents(inputStyles, variants('input'))
}

export default inputStyle
