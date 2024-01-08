import { Image } from "@/components/ui/Image";

import NewsCard from "../../../../assets/news-card.png";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section>
      <div className="flex h-96 w-full flex-row items-center justify-start gap-20 bg-zinc-900 pl-20">
        <div className="inline-flex w-3/5 flex-col items-start justify-center gap-14">
          <div className="flex h-48 flex-col items-start justify-center gap-5 self-stretch">
            <div className="text-4xl font-medium text-white">
              Sign up now and Get a 30% Discount on All Cabin Class
            </div>
            <div className="w-96 text-base font-normal leading-normal text-white">
              Don't miss out on this opportunity to make every trip a luxurious
              escape. Join us today and elevate your travel with unparalleled
              savings.
            </div>
          </div>
          <div className="inline-flex items-start justify-start gap-6">
          <Button
              type="button"
              variant="transparent"
              className={`hover:border-gray-400 border border-white text-white px-5 py-1.5 text-base shadow-sm`}
            >
              More Info
            </Button>
            <Button
              type="button"
              className={`hover:border-gray-400 bg-primary-500 text-white px-5 py-1.5 text-base shadow-sm`}
            >
              Signup Now
            </Button>
          </div>
        </div>
        <Image
          className="h-[100%] w-[100%] md:h-[100%] md:w-[100%] lg:h-[100%] lg:w-3/5"
          image={NewsCard}
          objectCover="cover"
          alt="Hero Background Vector"
        />
      </div>
    </section>
  );
}
