const fontConfig = {
  fontTypes: [
    {
      name: 'display',
      family: 'manrope',
      unit: 'px',
      sizes: [
        {
          size: 54,
          lineHeight: 58,
          letterSpacing: '-2%',
        },
        {
          size: 48,
          lineHeight: 52,
          letterSpacing: '-2%',
        },
        {
          size: 42,
          lineHeight: 44,
          letterSpacing: '-2%',
        },
      ],
    },
    {
      name: 'headline',
      family: 'manrope',
      unit: 'px',
      sizes: [
        {
          size: 36,
          lineHeight: 40,
          letterSpacing: '-2%',
        },
        {
          size: 28,
          lineHeight: 32,
          letterSpacing: '-2%',
        },
        {
          size: 24,
          lineHeight: 28,
          letterSpacing: '-2%',
        },
      ],
    },
    {
      name: 'title',
      family: 'manrope',
      unit: 'px',
      sizes: [
        {
          size: 20,
          lineHeight: 26,
          letterSpacing: '0%',
        },
        {
          size: 16,
          lineHeight: 20,
          letterSpacing: '0%',
        },
        {
          size: 14,
          lineHeight: 18,
          letterSpacing: '0%',
        },
        {
          size: 12,
          lineHeight: 16,
          letterSpacing: '0%',
        },
        {
          size: 10,
          lineHeight: 12,
          letterSpacing: '0%',
        },
      ],
    },
    {
      name: 'caption',
      family: 'manrope',
      unit: 'px',
      sizes: [
        {
          size: 20,
          lineHeight: 28,
          letterSpacing: '0%',
        },
        {
          size: 16,
          lineHeight: 22,
          letterSpacing: '0%',
        },
        {
          size: 14,
          lineHeight: 18,
          letterSpacing: '0%',
        },
        {
          size: 12,
          lineHeight: 16,
          letterSpacing: '0%',
        },
        {
          size: 10,
          lineHeight: 12,
          letterSpacing: '0%',
        },
      ],
    },
    {
      name: 'body',
      family: 'manrope',
      unit: 'px',
      sizes: [
        {
          size: 20,
          lineHeight: 32,
          letterSpacing: '0%',
        },
        {
          size: 16,
          lineHeight: 26,
          letterSpacing: '0%',
        },
        {
          size: 14,
          lineHeight: 22,
          letterSpacing: '0%',
        },
        {
          size: 12,
          lineHeight: 20,
          letterSpacing: '0%',
        },
      ],
    },
  ],
  fontWeights: [
    {
      name: 'regular',
      weight: 400,
    },
    {
      name: 'medium',
      weight: 500,
    },
    {
      name: 'semibold',
      weight: 600,
    },
    {
      name: 'bold',
      weight: 700,
    },
  ],
} as const

export default fontConfig
