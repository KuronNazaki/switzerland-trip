import { LogoSvg } from '@component/Svg'
import { Hero } from './pages'

export default function Home() {
  return (
    <main className="relative flex w-full min-h-screen max-h-screen flex-col items-center justify-center">
      <Hero />
      <div className="text-neutral-300 text-sm fixed flex items-center gap-2 bottom-0 left-0 px-10 py-5 font-mono">
        <p>2024 |</p>
        <div className="flex gap-1.5 items-center">
          <p>Powered by</p>
          <LogoSvg className="h-5 w-5 text-neutral-500" />
        </div>
      </div>
      <div className="w-full h-full absolute bg-grid opacity-30 -z-50"></div>
    </main>
  )
}
