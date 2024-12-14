import { useRef, useState } from 'react'
import { CaptionProps, useNavigation } from 'react-day-picker'
import moment from 'moment'
import { cn } from '@/lib/utils'
import { useClickOutsideElement } from '@/hooks/useClickOutsideElement'
import  Icons  from '@/components/ui/icons'

interface CaptionDateProps extends CaptionProps {
  displayMonth: CaptionProps['displayMonth']
  navigation: any
  onClick: () => void
}

interface CaptionMonthAndYearProps {
  navigation: any
  onClose: () => void
}

export function CustomCaption(props: CaptionProps) {
  const navigation = useNavigation()
  const [showMonth, setShowMonth] = useState<boolean>(false)
  const monthRef = useRef<HTMLDivElement>(null)

  useClickOutsideElement(monthRef, () => {
    setShowMonth(false)
  })

  return (
    <>
      <CaptionDate displayMonth={props.displayMonth} navigation={navigation} onClick={() => setShowMonth(!showMonth)} />

      {showMonth && (
        <div id='show_list_month' className='absolute -top-4 left-0 w-full h-full z-20' ref={monthRef}>
          <CaptionMonth navigation={navigation} onClose={() => setShowMonth(false)} />
        </div>
      )}
    </>
  )
}

const CaptionDate = ({ onClick, navigation, displayMonth }: CaptionDateProps) => {
  return (
    <CaptionComponent
      onPreviousClick={() => navigation.previousMonth && navigation.goToMonth(navigation.previousMonth)}
      onNextClick={() => navigation.nextMonth && navigation.goToMonth(navigation.nextMonth)}
      onDateClick={onClick}
      disablePrevious={!navigation.previousMonth}
      disableNext={!navigation.nextMonth}
      formattedDate={moment(displayMonth).format('MMMM, YYYY')}
    />
  )
}

const CaptionMonth = ({ navigation, onClose }: CaptionMonthAndYearProps) => {
  const getMonths = moment.months()
  const currentYear = moment(navigation.currentMonth).year()
  const currentMonth = moment(navigation.currentMonth).month()

  const [rangeYear, setRangeYear] = useState<boolean>(false)
  const yearRef = useRef<HTMLDivElement>(null)

  useClickOutsideElement(yearRef, () => {
    setRangeYear(false)
  })

  const months = getMonths.map((month, index) => {
    return {
      label: month,
      value: index,
      disabled: index === currentMonth,
    }
  })

  const handleChange = (month: { value: number; disabled: boolean }) => {
    const newMonth = moment(navigation.currentMonth).month(month.value).toDate()
    navigation.goToMonth(newMonth)
    onClose()
  }

  const goToYear = (year: number) => {
    const newYear = moment(navigation.currentMonth).year(year).toDate()
    navigation.goToMonth(newYear)
  }

  return (
    <>
      <div className='relative bg-white py-3 px-4 shadow-xl'>
        <CaptionComponent
          onPreviousClick={() => goToYear(currentYear - 1)}
          onNextClick={() => goToYear(currentYear + 1)}
          onDateClick={() => setRangeYear(!rangeYear)}
          formattedDate={moment(navigation.currentMonth).format('YYYY')}
        />

        <div className='mt-2 grid grid-cols-3 gap-x-4 gap-y-2'>
          {months.map((month, index) => {
            return (
              <button
                key={index}
                className={`flex items-center justify-center py-2 text-sm font-medium px-3 rounded-md cursor-pointer ${
                  index === currentMonth ? 'bg-blue-base text-white' : ''
                }`}
                onClick={() => handleChange(month)}
                type='button'
              >
                {month.label.slice(0, 3).toUpperCase()}
              </button>
            )
          })}
        </div>
      </div>

      {rangeYear && (
        <div className='absolute top-0 left-0 w-full h-full z-20'>
          <div ref={yearRef}>
            <CaptionRangeYear navigation={navigation} onClose={() => setRangeYear(false)} />
          </div>
        </div>
      )}
    </>
  )
}

const CaptionRangeYear = ({ navigation, onClose }: CaptionMonthAndYearProps) => {
  const currentYear = moment(navigation.currentMonth).year()

  const yearList = () => {
    const years = []

    const startYear = currentYear - 5
    const endYear = currentYear + 6

    for (let year = startYear; year <= endYear; year++) {
      years.push({
        label: year,
        value: year,
        selected: year === currentYear,
      })
    }

    return years
  }

  const handleChange = (year: { value: number; selected: boolean }) => {
    const newYear = moment(navigation.currentMonth).year(year.value).toDate()
    navigation.goToMonth(newYear)
    onClose()
  }

  const goToYear = (year: number) => {
    const newYear = moment(navigation.currentMonth).year(year).toDate()
    navigation.goToMonth(newYear)
  }

  const handlePreviousClick = () => {
    const previousYear = yearList()[0].value - 11
    goToYear(previousYear)
  }

  const handleNextClick = () => {
    const nextYear = yearList()[yearList().length - 1].value + 11
    goToYear(nextYear)
  }

  const disableFirstYear = yearList()[0].value
  const disableLastYear = yearList()[yearList().length - 1].value

  return (
    <div className='relative bg-white py-3 px-4 shadow-xl'>
      <CaptionComponent
        onPreviousClick={handlePreviousClick}
        onNextClick={handleNextClick}
        formattedDate={`${yearList()[0].label} - ${yearList()[yearList().length - 1].label}`}
      />

      <div className='mt-2 grid grid-cols-3 gap-x-4 gap-y-2'>
        {yearList().map((year: any) => {
          return (
            <button
              key={year.value}
              className={cn(
                `flex items-center justify-center py-2 text-sm font-medium px-3 rounded-md cursor-pointer`,
                [
                  year.value === disableFirstYear || year.value === disableLastYear ? 'text-greyscale-5' : '',
                  year.selected ? 'bg-blue-base text-white' : '',
                ],
              )}
              onClick={() => handleChange(year)}
              disabled={year.value === disableFirstYear || year.value === disableLastYear}
              type='button'
            >
              {year.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

const CaptionComponent = ({
  onPreviousClick,
  onNextClick,
  disablePrevious,
  disableNext,
  formattedDate,
  onDateClick,
}: {
  onPreviousClick: () => void
  onNextClick: () => void
  disablePrevious?: boolean
  disableNext?: boolean
  formattedDate: string
  onDateClick?: () => void
}) => {
  return (
    <div className='flex items-center justify-between bg-[#F6F8FA] rounded-lg px-1.5 py-1.5'>
      <button
        disabled={disablePrevious}
        onClick={onPreviousClick}
        className='h-6 w-6 bg-transparent p-0 flex justify-center items-center rounded-md bg-white drop-shadow-md  hover:bg-greysctext-greyscale-5 duration-200 ease-in-out'
        type='button'
      >
        <Icons.ChevronLeft className='h-3 w-3' />
      </button>
      <button className='plabs-caption-regular-sm text-text-black' onClick={onDateClick} type='button'>
        {formattedDate}
      </button>
      <button
        disabled={disableNext}
        onClick={onNextClick}
        className='h-6 w-6 bg-transparent p-0 flex justify-center items-center rounded-md bg-white drop-shadow-md  hover:bg-greysctext-greyscale-5 duration-200 ease-in-out'
        type='button'
      >
        <Icons.ChevronRight className='h-3 w-3' />
      </button>
    </div>
  )
}
