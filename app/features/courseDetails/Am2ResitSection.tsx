import React from "react";
import {
  am2PaymentInformation,
  am2PricingEffectiveDate,
  am2RecommendedAssessments,
  am2ResitColumnLegacy,
  am2ResitColumnV1,
  am2ResitCompositeSections,
  am2ResitDomesticNote,
  am2ResitIndividualSections,
  am2ResitIntro,
  am2SupplementaryUnits,
  am2SupplementaryUnitsHeading,
  am2SupplementaryUnitsIntro,
} from "@/content/am2-assessment-course";

function AssessmentFeeTable() {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#016068] text-white">
            <th scope="col" className="px-4 py-3 font-semibold">
              Item
            </th>
            <th scope="col" className="px-4 py-3 font-semibold min-w-[12rem]">
              Applicable to / further information
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Fee from {am2PricingEffectiveDate}
            </th>
          </tr>
        </thead>
        <tbody>
          {am2RecommendedAssessments.map((row) => (
            <tr
              key={row.item}
              className="border-b border-gray-100 last:border-b-0 odd:bg-gray-50/80"
            >
              <th
                scope="row"
                className="px-4 py-3 font-semibold text-gray-900 align-top"
              >
                {row.item}
              </th>
              <td className="px-4 py-3 text-gray-700 align-top">{row.info}</td>
              <td className="px-4 py-3 font-semibold text-[#016068] whitespace-nowrap align-top">
                {row.fee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function TwoColumnResitTable({
  heading,
  rows,
}: {
  heading: string;
  rows: readonly { section: string; legacy: string; v1: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#016068] text-white">
            <th scope="col" className="px-4 py-3 font-semibold">
              {heading}
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              {am2ResitColumnLegacy}
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              {am2ResitColumnV1}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.section}
              className="border-b border-gray-100 last:border-b-0 odd:bg-gray-50/80"
            >
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-800 align-top"
              >
                {row.section}
              </th>
              <td className="px-4 py-3 font-semibold text-[#016068] whitespace-nowrap">
                {row.legacy}
              </td>
              <td className="px-4 py-3 font-semibold text-[#016068] whitespace-nowrap">
                {row.v1}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SupplementaryTable() {
  return (
    <div className="overflow-x-auto rounded-sm border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-[#016068] text-white">
            <th scope="col" className="px-4 py-3 font-semibold">
              Item
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              Total fee (inc. NET fee)
            </th>
            <th scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
              NET processing fee
            </th>
          </tr>
        </thead>
        <tbody>
          {am2SupplementaryUnits.map((row) => (
            <tr
              key={row.item}
              className="border-b border-gray-100 last:border-b-0 odd:bg-gray-50/80"
            >
              <th
                scope="row"
                className="px-4 py-3 font-medium text-gray-800 align-top"
              >
                {row.item}
              </th>
              <td className="px-4 py-3 font-semibold text-[#016068] whitespace-nowrap">
                {row.totalFee}
              </td>
              <td className="px-4 py-3 font-semibold text-gray-700 whitespace-nowrap">
                {row.netFee}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Am2ResitSection() {
  return (
    <section
      className="bg-white border-t border-gray-200"
      aria-labelledby="am2-pricing-resits-heading"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 sm:py-14">
        <h2
          id="am2-pricing-resits-heading"
          className="font-outfit font-bold text-xl sm:text-2xl text-[#016068] mb-2"
        >
          Recommended Price for Assessments
        </h2>
        <p className="text-sm text-gray-600 mb-8 max-w-3xl">
          The fees for initial assessments depend on the specific standard or
          version the learner is registered under. Figures below are recommended
          fees from {am2PricingEffectiveDate}.
        </p>

        <AssessmentFeeTable />

        <p className="mt-4 text-sm font-semibold text-gray-900">
          <a
            href="tel:08001123310"
            className="text-[#016068] underline underline-offset-2 hover:opacity-80"
          >
            Ring us on 0800 112 3310 to book
          </a>
        </p>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mt-12 mb-3">
          Course duration
        </h3>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-10">
          <li>AM2 — two and a half days</li>
          <li>AM2S — three days</li>
          <li>AM2E — three days</li>
        </ul>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mb-3">
          Resit fees
        </h3>
        <p className="text-sm text-gray-700 mb-6 max-w-3xl leading-relaxed">
          {am2ResitIntro}
        </p>

        <p className="text-sm font-semibold text-gray-900 mb-2">
          Sections A1, B, C, D, E
        </p>
        <TwoColumnResitTable
          heading="Section / assessment"
          rows={am2ResitIndividualSections}
        />

        <p className="text-sm font-semibold text-gray-900 mt-10 mb-2">
          Sections A2–A6
        </p>
        <TwoColumnResitTable
          heading="Resit sections"
          rows={am2ResitCompositeSections}
        />

        <p className="mt-4 text-sm text-gray-600 italic">{am2ResitDomesticNote}</p>

        <h3 className="font-outfit font-semibold text-base text-gray-900 mt-12 mb-2">
          {am2SupplementaryUnitsHeading}
        </h3>
        <p className="text-sm text-gray-700 mb-4 max-w-3xl">
          {am2SupplementaryUnitsIntro}
        </p>
        <SupplementaryTable />

        <h3 className="font-outfit font-semibold text-base text-gray-900 mt-12 mb-2">
          Payment information
        </h3>
        <p className="text-sm text-gray-700">{am2PaymentInformation}</p>
      </div>
    </section>
  );
}
