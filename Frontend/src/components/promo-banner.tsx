;

import { useState } from "react";
import Marquee from "react-fast-marquee";
import { IconX } from "@tabler/icons-react";

interface PromoBannerProps {
  textOne: string;
  textTwo: string;
}

export function PromoBanner({ textOne, textTwo }: PromoBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div role="banner" className="relative h-10 bg-zinc-900 flex items-center">
      <p className="sr-only">{textOne} · {textTwo}</p>

      <Marquee pauseOnHover delay={2} speed={50} gradient={false} className="overflow-hidden">
        <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white px-10">
          {textOne}
        </span>
        <span className="text-zinc-600 text-xs select-none px-2" aria-hidden="true">
          ◆
        </span>
        <span className="whitespace-nowrap text-sm font-medium tracking-wide text-white px-10">
          {textTwo}
        </span>
        <span className="text-zinc-600 text-xs select-none px-2" aria-hidden="true">
          ◆
        </span>
      </Marquee>

    </div>
  );
}