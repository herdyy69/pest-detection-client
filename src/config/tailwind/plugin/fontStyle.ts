import fontConfig from '../setting/font'

const fontStyle = ({ addUtilities, theme, variants }: any) => {
  const fontFamilies = theme('fontFamily', {})

  const { fontTypes, fontWeights } = fontConfig

  const utilities: any = {}

  fontWeights.forEach((fontWeight) => {
    fontTypes.forEach((fontType) => {
      fontType.sizes.forEach((fontSize) => {
        let className = `.plabs-${fontType.name}-${fontWeight.name}-${fontSize.size}`
        const utility = {
          fontSize: fontSize.size + fontType.unit,
          lineHeight: fontSize.lineHeight + fontType.unit,
          fontWeight: fontWeight.weight,
          fontFamily: fontFamilies[fontType.family].join(','),
          letterSpacing: fontSize.letterSpacing,
        }
        utilities[className] = utility
      })
    })
  })

  addUtilities(utilities, variants('fontSize', []))
}

export default fontStyle
