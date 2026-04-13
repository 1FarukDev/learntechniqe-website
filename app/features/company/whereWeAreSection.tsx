import React from "react";
import { MapPin } from "lucide-react";

/** Matches `HotelCard` in `accomodationSection.tsx` (header strip + body). */
function LocationAddressCard({
  title,
  lines,
}: {
  title: string;
  lines: string[];
}) {
  return (
    <div
      className="rounded-md overflow-hidden"
      style={{
        backgroundColor: "#f8f9fa",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        className="flex items-center gap-2 px-5 py-3 justify-center"
        style={{ backgroundColor: "#0f172a" }}
      >
        <MapPin className="size-5 shrink-0 text-[#F5A623]" aria-hidden />
        <span
          className="text-white font-bold text-sm"
          style={{ fontFamily: "'Barlow', sans-serif" }}
        >
          {title}
        </span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-3 items-center">
        <div className="text-sm text-black leading-relaxed text-center">
          {lines.map((line, i) => (
            <p key={`${line}-${i}`}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function WhereWeAreSection() {
  return (
    <section
      id="location"
      className="w-full bg-white px-4 sm:px-8 md:px-12 py-12 md:py-20 scroll-mt-28"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-black text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 md:mb-12 text-center">
          Where are we?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 mb-12 md:mb-16">
          <LocationAddressCard
            title="Head Office"
            lines={[
              "Technique Learning Solutions",
              "Technique Tower Business Park",
              "High Street",
              "Clay Cross",
              "Chesterfield",
              "Derbyshire",
              "S45 9EA",
            ]}
          />
          <LocationAddressCard
            title="Stirling"
            lines={[
              "Technique Learning Solutions",
              "Stirling Business Centre",
              "Wellgreen Road",
              "Stirling",
              "Scotland",
              "FK8 2DZ",
            ]}
          />
        </div>

        <div className="prose prose-zinc max-w-none text-black text-base leading-relaxed space-y-5">
          <h3 className="text-xl md:text-2xl font-semibold text-black not-prose">
            Our Centres:
          </h3>
          <p>
            We take a lot of pride in our centres and you&apos;ll see for
            yourself the time and effort we have invested in them. With a control
            centre focusing on PLC training in the north we work hard to supply
            the very best training as close to you as possible. Our
            ever-expanding business and centres shows how committed we are to
            the very best professional training and we don&apos;t stop there.
            With our comfortable lounge area fitted with plenty of sofas,
            chairs, dining areas, vending machines, tool promotions, magazines
            and a large TV for your entertainment. Our classrooms are kitted
            out with the latest projector screens, heating/cooling systems and
            all the technical gear you will need to learn whichever course you
            learn on your visit.
          </p>
          <p>
            Since the formation of Technique Learning Solutions, on-going
            re-investment and diversity has demonstrated our commitment to our
            clients, staff and the future. This can be evidenced by viewing our
            own facility in Derbyshire, which sets new standards in quality and
            training our competitors can only dream of. We have classrooms,
            workshops and an IT suite making use of an array of test rigs,
            enabling candidate&apos;s virtual &quot;real life&quot; situations.
            Not to mention dining and relaxation areas.
          </p>
          <p>
            Whether you are a sole trader, from a blue chip company, unemployed,
            or retraining… we will have the appropriate course for you.
          </p>
          <blockquote className="border-l-4 border-[#016068] pl-5 md:pl-6 my-6 not-italic text-black">
            <p className="mb-4">
              &ldquo;Our motivation is to ensure that all our candidates will
              obtain the highest level of training and attain nationally
              recognized qualifications, giving the ability to exceed national
              standards and contribute to the professionalism of the industry.
            </p>
            <p className="mb-4">
              When sourcing training providers, I strongly recommend that you
              look closely at what facilities and training options they offer.
              Companies who don&apos;t include pictures or detailed information
              about their centres, usually suggests they do not have dedicated
              student orientated classrooms and workshops to facilitate sound
              learning. If you can, visit..
            </p>
            <p className="mb-4">
              Our mission is to provide all our candidates with the very best
              usable knowledge at a fair price. We pride ourselves in our
              extensive range of up to date training equipment, enabling the
              candidate to work &apos;individually&apos; in &apos;true to
              life&apos; situations.
            </p>
            <p>
              We know the Technique Learning experience is unique, enjoyable,
              rewarding and will support your professional development.&rdquo;
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
