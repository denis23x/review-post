import { Link2, Palette, Download } from 'lucide-react'

const HOW_IT_WORKS = [
  {
    step: 1,
    Icon: Link2,
    title: 'Paste your link',
    body: "Drop in your Google Maps business URL. We'll fetch all your latest reviews instantly.",
  },
  {
    step: 2,
    Icon: Palette,
    title: 'Pick your style',
    body: 'Choose from dark, light, or branded themes. Customize colors to match your brand identity.',
  },
  {
    step: 3,
    Icon: Download,
    title: 'Download & share',
    body: 'Get a ready-to-post image with AI-written caption. Share to Instagram, Facebook, or LinkedIn.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="flex flex-col items-center gap-12 bg-[#F7F8FA] px-6 py-20 md:px-12 lg:px-[120px] scroll-mt-16"
    >
      <div className="flex flex-col items-center gap-12 max-w-[1440px] mx-auto">
        <div className="text-center">
          <h2 className="font-geist text-[36px] font-bold tracking-[-1px] text-[#1a1a1a]">How It Works</h2>
          <p className="mt-4 text-base text-[#666666]">
            Three simple steps to turn reviews into social gold
          </p>
        </div>

        <div className="flex w-full flex-col gap-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {HOW_IT_WORKS.map(({ step, Icon, title, body }) => (
              <div key={step} className="flex flex-col items-center gap-2 text-center max-w-[368px]">
                <Icon size={28} className="text-[#4A9FD8]" />
                <h3 className="text-xl font-semibold text-[#1a1a1a]">{title}</h3>
                <p className="text-sm leading-normal text-[#666666]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
