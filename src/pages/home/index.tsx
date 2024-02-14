// import BookingSteps from "../organs/BookingSteps"
import HeroSection from "@/pages/home/components/containers/HeroSection"
import BrandBanner from "./components/containers/brandsBanner"
import { BestDealsBanner } from "./components/containers/BestDealsBanner"
import { TicketPromosBanner } from "./components/containers/TicketPromosBanner"
import { Services } from "./components/containers/OurServices"
import { NewsSection } from "./components/containers/NewsSection"
import { CtaSection } from "./components/containers/CtaSection"

const Home = () => {
    return (
        <>
            <HeroSection />
            <BrandBanner />
            <BestDealsBanner />
            <TicketPromosBanner />
            <Services />
            <NewsSection />
            <CtaSection />
        </>
    )
}

export default Home