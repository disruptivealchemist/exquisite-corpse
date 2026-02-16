import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#161616] text-[#f4f4f4] flex flex-col overflow-hidden">
      <main className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-16">
        <Image
          src="/assets/pencil-left.png"
          alt="Red pencil"
          width={905}
          height={1253}
          className="pointer-events-none select-none hidden md:block absolute -left-48 lg:-left-36 bottom-8 w-[250px] lg:w-[330px] h-auto"
          priority
        />

        <Image
          src="/assets/pencil-right.png"
          alt="Wood pencil"
          width={923}
          height={1688}
          className="pointer-events-none select-none hidden md:block absolute -right-48 lg:-right-24 top-4 lg:top-8 w-[260px] lg:w-[350px] h-auto"
          priority
        />

        <Image
          src="/assets/key.png"
          alt="Small key"
          width={107}
          height={184}
          className="pointer-events-none select-none hidden md:block absolute right-[14%] bottom-[5%] w-[42px] h-auto opacity-90"
        />

        <div className="text-center max-w-[760px] relative z-10">
          <h1 className="text-[3.2rem] md:text-[5.35rem] leading-[0.94] tracking-tight text-[#f4f4f4] mb-2 font-display">
            <span className="font-bold italic">Exquisite</span>{' '}
            <span className="font-normal not-italic">Corpse</span>
          </h1>

          <p className="font-subhead text-[2rem] md:text-[3.15rem] leading-[1.06] text-[#f4f4f4] mb-8">
            Create Like a Surrealist.
            <br />
            Prompt Like a Pro.
          </p>

          <Link
            href="/play"
            className="inline-flex px-9 py-3 bg-[#c71f2d] text-[#f4f4f4] text-lg font-semibold rounded-full border border-[#f4f4f4]/35 shadow-[0_5px_0_0_rgba(244,244,244,0.25)] hover:bg-[#b61b28] transition-all duration-200 active:translate-y-[2px] active:shadow-[0_3px_0_0_rgba(244,244,244,0.25)] font-body"
          >
            Start Creating
          </Link>
        </div>

        <div className="mt-14 md:mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 max-w-[860px] w-full relative z-10">
          <Step
            number={1}
            title="Design the Head"
            description="Pick a style, character, and extras to craft your prompt"
          />
          <Step
            number={2}
            title="Add Body & Legs"
            description="Each part is hidden so you can't peek at what came before"
          />
          <Step
            number={3}
            title="Reveal!"
            description="Unfold your creature and share the glorious result"
          />
        </div>

        <div className="mt-10 md:mt-12 max-w-[760px] bg-[#f4f4f4] border border-black/20 rounded-[18px] px-6 py-7 md:px-8 md:py-8 text-center relative z-10 shadow-md">
          <p className="text-[2.15rem] md:text-[2.45rem] font-bold italic text-[#292928] mb-2 font-display leading-none">
            Did you know?
          </p>
          <p className="text-[1.03rem] text-[#292928]/85 leading-relaxed font-body">
            The Surrealists invented Exquisite Corpse in 1925 as a parlour game.
            Each player draws a section of a figure without seeing what came before.
            We have added AI to the mix so you can learn image prompting while you play.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center px-6 py-5 md:px-5 md:py-6 rounded-2xl bg-[#f4f4f4] border border-black/20 shadow-sm min-h-[188px] flex flex-col items-center justify-start">
      <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#292928] text-[#f4f4f4] flex items-center justify-center font-black text-lg font-body">
        {number}
      </div>
      <h3 className="text-[1.95rem] font-bold text-[#292928] mb-1 font-display leading-tight">
        {title}
      </h3>
      <p className="text-[1.02rem] text-[#292928]/75 font-body leading-snug">{description}</p>
    </div>
  );
}
