'use client'

import { HeroArrowSvg, PointingArrowSvg } from '@component/Svg'
import { Caption, Display } from '@lib/typography'
import { formatLeadingZero } from '@util/index'
import moment from 'moment'
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

interface Duration {
  days: number | string
  hours: number | string
  minutes: number | string
  seconds: number | string
}

const calculateDuration = (eventTime: number) =>
  moment.duration(
    Math.max((eventTime - new Date().getTime()) / 1000, 0),
    'seconds',
  )

const ALPHABETS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const DEPARTURE_NATION = 'VIETNAM'
const DEPARTURE_CITY = 'Ho Chi Minh'
const ARRIVAL_NATION = 'SWITZERLAND'
const ARRIVAL_CITY = 'Bern'

export const Hero = () => {
  const [duration, setDuration] = useState(calculateDuration(0))
  const [isLoading, setLoading] = useState(true)
  const [hoverState, setHoverState] = useState({
    departureNation: false,
    departureCity: false,
    arrivalNation: false,
    arrivalCity: false,
  })
  const timerRef = useRef(0)
  const timerCallback = useCallback(() => {
    setDuration(calculateDuration(new Date('2024-08-09T00:00:00').getTime()))
    if (isLoading) {
      setLoading(false)
    }
  }, [isLoading])

  useEffect(() => {
    timerRef.current = setInterval(timerCallback, 1000) as unknown as number
    return () => {
      clearInterval(timerRef.current)
    }
  }, [timerCallback])

  const handleHackerEffect: MouseEventHandler<HTMLDivElement> = (event) => {
    let iterations = 0
    const target = event.target as HTMLElement & { dataset: { value: string } }

    const interval = setInterval(() => {
      target.innerText = target.innerText
        ?.split('')
        .map((letter: string, index: number) => {
          if (index < iterations) {
            return target.dataset.value[index]
          }
          return ALPHABETS[Math.floor(Math.random() * 52)]
        })
        .join('')

      if (iterations >= target.dataset.value.length) clearInterval(interval)

      iterations += 1 / 2
    }, 50)
  }
  const generateMaskString = useCallback(
    (original: string) =>
      original
        .split('')
        .map(() => {
          return ALPHABETS[Math.floor(Math.random() * 52)]
        })
        .join(''),
    [],
  )

  const maskedDepartureNation = useMemo(
    () => generateMaskString(DEPARTURE_NATION),
    [generateMaskString],
  )
  const maskedDepartureCity = useMemo(
    () => generateMaskString(DEPARTURE_CITY),
    [generateMaskString],
  )
  const maskedArrivalNation = useMemo(
    () => generateMaskString(ARRIVAL_NATION),
    [generateMaskString],
  )
  const maskedArrivalCity = useMemo(
    () => generateMaskString(ARRIVAL_CITY),
    [generateMaskString],
  )

  return isLoading ? (
    <div className="px-10 py-5 bg-gradient-round">
      <Display className="font-serif text-neutral-500 font-light">
        Please wait...
      </Display>
    </div>
  ) : (
    <div className="w-fit md:py-20 md:px-32 flex flex-col gap-2 bg-gradient-round">
      <div className="w-full px-10 flex justify-between gap-2">
        <div className="mb-4 cursor-default">
          <div className="relative font-mono font-bold uppercase">
            <div
              data-value={DEPARTURE_NATION}
              className="relative p-1.5 leading-none bg-rose-500 text-white uppercase inline-block font-bold font-mono"
              onMouseOver={(event) => {
                setHoverState((prev) => ({ ...prev, departureNation: true }))
                handleHackerEffect(event)
              }}
            >
              {maskedDepartureNation}
            </div>
            <div
              className={`${hoverState.departureNation && hoverState.departureCity ? 'opacity-0 invisible' : 'invisible opacity-0 md:opacity-100 md:visible'} text-neutral-400 absolute -left-full -translate-x-2 -top-2`}
            >
              <PointingArrowSvg className="w-20 h-auto" />
              <p className="font-sans absolute bottom-0 left-0 text-[0.25rem] -translate-x-[80%] -translate-y-1/3 font-black">
                Hover to reveal
              </p>
            </div>
          </div>
          <div
            data-value={DEPARTURE_CITY}
            className="mt-0.5 font-semibold text-sm text-neutral-400 font-mono"
            onMouseOver={(event) => {
              setHoverState((prev) => ({ ...prev, departureCity: true }))
              handleHackerEffect(event)
            }}
          >
            {maskedDepartureCity}
          </div>
        </div>
        <div
          className={`${hoverState.departureNation && hoverState.departureCity ? 'opacity-100 visible' : 'opacity-0 invisible'} h-full relative grow`}
        >
          <HeroArrowSvg className="invisible opacity-0 md:visible md:opacity-100 md:w-[15rem] md:h-[15rem] text-neutral-400 absolute rotate-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] -scale-y-100" />
        </div>
        <div className="mb-4 cursor-default shrink-0 grow-0">
          <div
            data-value={ARRIVAL_NATION}
            className={`${hoverState.departureNation && hoverState.departureCity ? 'opacity-100 visible' : 'opacity-0 invisible'} relative p-1.5 leading-none bg-rose-500 text-white uppercase inline-block font-bold font-mono`}
            onMouseOver={handleHackerEffect}
          >
            {maskedArrivalNation}
          </div>
          <div
            data-value={ARRIVAL_CITY}
            className={`${hoverState.departureNation && hoverState.departureCity ? 'opacity-100 visible' : 'opacity-0 invisible'} mt-0.5 font-semibold text-sm text-neutral-400 font-mono`}
            onMouseOver={handleHackerEffect}
          >
            {maskedArrivalCity}
          </div>
        </div>
      </div>
      <div className="w-[350px] md:w-[600px] grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className="font-serif leading-[0.75] text-9xl">
            {formatLeadingZero(Math.floor(duration.asDays()))}
          </span>
          <span className="text-neutral-400">
            {Math.floor(duration.asDays()) < 2 ? 'day' : 'days'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-serif leading-[0.75] text-9xl">
            {formatLeadingZero(duration.hours())}
          </span>
          <span className="text-neutral-400">
            {duration.hours() < 2 ? 'hour' : 'hours'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-serif leading-[0.75] text-9xl">
            {formatLeadingZero(duration.minutes())}
          </span>
          <span className="text-neutral-400">
            {duration.minutes() < 2 ? 'minute' : 'minutes'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-serif leading-[0.75] text-9xl grow-0">
            {formatLeadingZero(duration.seconds())}
          </span>
          <span className="text-neutral-400 shrink-0">
            {duration.seconds() < 2 ? 'second' : 'seconds'}
          </span>
        </div>
      </div>
    </div>
  )
}
