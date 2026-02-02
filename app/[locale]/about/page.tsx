import StripTitleMarquee from "@/components/StripTitleMarquee";
import BackgroundPattern from "@/components/BackgroundPattern";
import AboutLeaders from "@/components/AboutLeaders";
import { aboutCopy } from "@/lib/data";

export default async function AboutPage() {
  return (
    <main className="relative min-h-screen bg-black">
      <div className="relative z-10 h-[130px] overflow-hidden">
        <BackgroundPattern fixed={false} />
        <StripTitleMarquee text="אודות" speed={200} repeat={100} spacesBetween={2} />
      </div>
      <div className="absolute inset-x-0 top-[130px] bottom-0 bg-black z-0" aria-hidden />
      <section className="relative z-10 min-h-[calc(100vh-130px)] px-4 md:px-8 py-12 max-w-6xl mx-auto" dir="rtl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <p className="about-body whitespace-pre-line">
            {aboutCopy.column1}
          </p>
          <p className="about-body whitespace-pre-line">
            {aboutCopy.column2}
          </p>
        </div>
        <div className="mt-[90px]">
          <AboutLeaders />
        </div>
        <div className="mt-[240px] about-contact whitespace-pre-line text-right" dir="rtl">
          {`לפרטים נוספים
tamirh@sapir.ac.il  |  lihib@sapir.ac.il
077-9802787  |  077-9802549


משרדי הפסטיבל
המכללה האקדמית ספיר, בניין 2
ד.נ. חוף אשקלון, שער הנגב 7916500`}
        </div>
      </section>
    </main>
  );
}
