export function castToNumberOrKeepString(value: string) {
  const number = Number(value)
  return isNaN(number) ? value : number
}

export const formatRupiah = (number?: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
    .format(number || 0)
    .replace(',00', '')
}

export const parseRupiah = (value: string) => {
  const number = parseFloat(value.replace(/[^0-9,-]+/g, '').replace(',', '.'))

  return isNaN(number) ? 0 : number
}

export const castTimeToSting = (hour: number, minute: number, second: number, format?: any) => {
  let time: any = []

  if (hour > 0) {
    const hourText = format ? `${hour}${format['hour']}` : `${hour} Hour${hour > 1 ? 's' : ''}`

    time.push(hourText)
  }

  if (minute > 0) {
    const minuteText = format ? `${minute}${format['minute']}` : `${minute} Minute${minute > 1 ? 's' : ''}`

    time.push(minuteText)
  }

  if (second > 0) {
    const secondText = format ? `${second}${format['second']}` : `${second} Second${second > 1 ? 's' : ''}`

    time.push(secondText)
  }

  time = time.join(' ')

  return time
}

export const capitalizeFirstLetter = (string?: string) => {
  if (!string) return

  return string.charAt(0).toUpperCase() + string.slice(1)
}
