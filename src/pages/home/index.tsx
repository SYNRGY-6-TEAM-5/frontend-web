// import BookingSteps from "../organs/BookingSteps"
import HeroSection from "@/pages/home/components/containers/HeroSection"
import BrandBanner from "./components/containers/brandsBanner"
import { BestDealsBanner } from "./components/containers/BestDealsBanner"
import { TicketPromosBanner } from "./components/containers/TicketPromosBanner"
import { Services } from "./components/containers/OurServices"
import { NewsSection } from "./components/containers/NewsSection"
import { CtaSection } from "./components/containers/CtaSection"
// import NewsLetter from "../organs/NewsLetter"
// import Partners from "../organs/Partners"
// import Services from "../organs/Services"
// import Testimonials from "../organs/Testimonials"
// import TopDestination from "../organs/TopDestination"

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
            {/* <Services /> */}
            {/* <TopDestination /> */}
            {/* <BookingSteps /> */}
            {/* <Testimonials /> */}
            {/* <Partners /> */}
            {/* <NewsLetter /> */}
        </>
    )
}

export default Home