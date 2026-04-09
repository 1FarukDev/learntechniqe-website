import React from "react";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";

export const metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and conditions for Technique Learning Solutions training services, bookings, payments, cancellations, and website usage.",
  alternates: { canonical: "https://www.learntechnique.com/terms-and-conditions" },
};

export default function TermsAndConditionsPage() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Terms and Conditions"
          description="Please read these terms carefully before using our services."
        />
      </AnimatedSection>

      <div className="max-w-4xl mx-auto px-4 md:px-0 py-12 sm:py-20">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <p>
            These Terms and Conditions are entered into between you and Technique Learning Solutions (Technique Training Ltd t/a Technique Learning Solutions), a company registered in the United Kingdom with Registration Number 14634051 and registered office at Technique Tower Business Park, High Street, Clay Cross, Chesterfield, S45 9EA, referred to in these Terms and Conditions as &quot;Learn Technique&quot;. These Terms and Conditions set out the obligations between the parties and the terms herein shall prevail over any marketing material or other representation made by or on behalf of Learn Technique whether electronic written or oral in nature.
          </p>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
            <p className="font-semibold text-amber-900">
              YOU SHOULD READ THESE TERMS AND CONDITIONS IN FULL CAREFULLY, IN PARTICULAR (BUT NOT LIMITED TO) YOUR CANCELLATION RIGHTS UNDER TERMS 4 &amp; 5. &quot;LEARN TECHNIQUES&quot; EXCLUSION OF LIABILITY AT TERM 9 AND YOUR CONSENT TO THE PROCESSING OF YOUR PERSONAL DATA AT TERM 6.
            </p>
          </div>

          <p>
            These terms apply to you whether you are booking a course for yourself or on behalf of one or more other people (such as a relative, employee or contractor). Where these terms refer to &apos;you&apos; this means the person or organisation on whose behalf the booking is made, whether or not you are the person attending the course.
          </p>

          <p>
            Where these terms refer to the &apos;Student&apos; this means the person or people who will be attending the course, whether that is you or a person you are booking on behalf of.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">1. BOOKING</h2>
            <p className="mb-2"><strong>1.1</strong> Learn Technique reserves the right at its sole discretion to decline to accept any booking for enrolment on any course. If your enrolment is accepted, but it subsequently transpires (at Learn Technique&apos;s sole discretion) that the course is not appropriate for you, Learn Technique shall be entitled to cancel your enrolment at any time [subject to a refund of fees already paid by you, unless cancellation is because of your or the Students misconduct or non-compliance with any of the Terms and Conditions herein or failure to adhere, at the sole discretion of Learn Technique, to any of the Rules of Learn Technique or the centre within which the course is being held.]</p>
            <p className="mb-2"><strong>1.2</strong> Upon booking and Enrolment for any course you agree to pay for the course in accordance with these Terms and Conditions. This is subject (if applicable) to any right of cancellation you may have by law to cancel the booking on the course. The date of the Agreement shall be the date referred to in the Acknowledgement of Booking letter that you will be sent following our acceptance of your Booking onto our system. You should read the Acknowledgement letter carefully as it includes many of the obligations of both parties and any errors or omissions should be notified to us within 3 working days of the date of the letter. Should you not notify us of any issue within the time period set out above we will assume that all of the details are correct.</p>
            <p className="mb-2"><strong>1.3</strong> It is your responsibility to provide the correct details for the Student at the time of booking. You should carefully read the Joining Instructions Email containing the Booking Form. Should you need to amend any of the Registration details once the Initial booking has been made, you will be responsible for any extra administration fees that we incur on your behalf. Learn Technique cannot be held responsible for any Act or omission contained in the Booking Form and it in no way accepts liability for any Certificate or Licence subsequently issued with incorrect details following your completion of the Booking.</p>
            <p><strong>1.4</strong> By placing a booking, you confirm that the Student can understand Spoken English and write and read to a Standard that would enable the Student to successfully complete the qualification for which they are booked. Learn Technique is an Inclusive organisation and does not discriminate in any way whatsoever. We do ask that you inform us at the time of booking if you have any requirements that we need to be aware of prior to your attending the course. Learn Technique will use its best endeavours to make such necessary arrangements at the request of the student as are reasonable and conform to all appropriate Health and Safety Legislation.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">2. PAYMENT OF FEES</h2>
            <p className="mb-2"><strong>2.1</strong> All course deposits are to be paid at the time of booking.</p>
            <p className="mb-2"><strong>2.2</strong> No booking will be confirmed until the Booking form has been completed either by you, or on your behalf by any employee of Learn Technique in their normal course of business and Learn Technique has received payment of the Deposit fee.</p>
            <p className="mb-2"><strong>2.3</strong> This Deposit fee to reserve a place on the course is non-refundable under any circumstances.</p>
            <p className="mb-2"><strong>2.4.1</strong> All Course fees, (the balance of the total amount due less any deposit received) is to be received and cleared funds in the bank of Learn Technique no less than 14 days prior to the start of the course.</p>
            <p className="mb-2"><strong>2.4.2</strong> All amounts are expressed as EXCLUSIVE of VAT unless otherwise stated.</p>
            <p className="mb-2"><strong>2.5</strong> Payment can be made either in person or by telephone by any of the following methods: Credit / Debit Cards, BACS Transfer or PayPal</p>
            <p className="mb-2"><strong>2.6</strong> All information entered on the Learn Technique website is covered within the terms of our Privacy policy details of which are available upon request or by clicking the link on the website.</p>
            <p className="mb-2"><strong>2.7</strong> Learn Technique will by prior arrangement accept payment by cheque provided that the payment is cleared prior to the start date of the course. If your payment is subsequently declined after being banked by Learn Technique, we reserve the right to charge £25 to cover our Banking Charges incurred.</p>
            <p className="mb-2"><strong>2.8</strong> Learn Technique may at its sole discretion accept payment by means of instalments. However, Learn Technique does reserve the right to demand payment in full at any time throughout the duration of the agreement if you fail to pay any instalment on the agreed instalment date.</p>
            <p className="mb-2"><strong>2.9</strong> Learn Technique offers payment through Klarna on any courses that are 10 days or over. You will be redirected to the Klarna website to complete checkout. When using Klarna as a payment method, you are entering into a separate agreement with Klarna Bank AB. You can view Klarna&apos;s terms and conditions here.</p>
            <p className="mb-2"><strong>2.10</strong> The Directors of Learn Technique have the unfettered authority to agree payment terms with any other business provided that the arrangement of Payment Terms is arranged prior to the booking of any course. Any such arrangement will be made on the basis that all payments thereunder will be made on time and in accordance with the arrangement, if any payment or part thereof be unpaid or be paid late then the Entire fee shall be immediately payable irrespective of any terms previously agreed.</p>
            <p><strong>2.11</strong> Learn Technique retains the right at its sole discretion to exclude any Student whose fees are not paid under such payment arrangement without notice and shall not in these circumstances be liable for any refund of fees.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">3. NON-PAYMENT OF BALANCES</h2>
            <p><strong>3.1</strong> Learn Technique may terminate this agreement at any time, without notice and at their sole discretion, if you fail to make payment of any obligation due under the Terms of this agreement. Learn Technique will immediately seek recovery of all sums due under the Terms of this agreement. should this matter be referred to a collection agency or a solicitors then you will be liable for all costs incurred Should Learn Technique cancel your agreement due to non-payment, we will not be liable to provide a refund of any sums already paid.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">4. YOUR RIGHTS TO CANCEL – PHONE AND INTERNET BOOKINGS</h2>
            <p className="mb-2"><strong>4.1</strong> Any booking made via the Internet or telephone is considered by Law to be a Contract at Distance and as such is governed by the Consumer Contracts [Information, Cancellation &amp; Additional Charges] Regulations 2013 [Distance Selling Regulations]</p>
            <p className="mb-2"><strong>4.2</strong> The Regulations provide you 14 Days (starting the day after you entered the agreement) to cancel the contract (the &apos;Cooling Off Period&apos;) unless the course you have booked starts within that 14 day &apos;Cooling Off Period.&apos;</p>
            <p className="mb-2"><strong>4.3</strong> Booking a course that commences within the 14 day &apos;Cooling Off Period&apos; means that the Regulations will not apply, and you will therefore be giving up your right to cancel. Any money paid will therefore not be capable of refund.</p>
            <p className="mb-2"><strong>4.4</strong> Cancelling a course inside the &apos;Cooling Off Period&apos;. You acknowledge and consent to the fact that it will sometimes be necessary to register for courses booked by you, within the 14 day &apos;Cooling Off Period&apos; in order to ensure that your place is secured on the course. In these circumstances you consent to the commencement of our services [being the arrangement and booking of the course for you] within the &apos;Cooling Off Period&apos; pursuant to the Regulations.</p>
            <p className="mb-2"><strong>4.5</strong> In these circumstances should you decide to cancel the Booked course within the 14 day &apos;Cooling Off Period&apos; you will be charged a fee to cover the costs related to that Booking which have already been incurred. The usual registration fees (subject to change) are as follows: Single Courses £60.00 Package Courses £60.00 per examination</p>
            <p className="mb-2"><strong>4.6</strong> All cancellations must be in writing. We do not accept receipt of cancellation by email, or any other form of communication.</p>
            <p className="mb-2"><strong>4.7</strong> Trade and Commercial bookings (i.e; Bookings made by a business rather than by Individual consumers) will be deemed to amount to a Business to Business transaction in respect of which the Regulations will not apply. You will therefore be liable to pay the full course fee if you cancel before the date of the course.</p>
            <p><strong>4.8</strong> Where the product is a digital product such as an online training course, from the first login or download you waive your cancellation rights as well as the right to cancel within 14 days due to starting the course.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">5. CANCELLATION CHANGES BY YOU</h2>
            <p className="mb-2"><strong>5.1</strong> Due to the nature of Learn Technique courses and the limited number of places on the courses, the Course cost less any deposit paid is Refundable only when written cancellation is received at our Head Office, TECHNIQUE TOWER BUSINESS PARK, High Street, Clay Cross, Chesterfield S45 9EA at least 21 days prior to the Course Commencement date in the Acknowledgement Letter.</p>
            <p className="mb-2"><strong>5.2</strong> Booked courses are non-transferable. Learn Technique will not reimburse any fees paid under the terms of this agreement if you fail to attend the course for any reason.</p>
            <p className="mb-2"><strong>5.3.1</strong> Extreme weather conditions: – In the event of extreme weather conditions Learn Technique will ensure that we are able to provide a full service by using a number of contingencies. We expect that all Students plan ahead to ensure that they are able to attend the course on the relevant dates.</p>
            <p className="mb-2"><strong>5.3.2</strong> If you are unable to attend due to extreme weather conditions or public transport disruption and/or cancellation. Learn Technique will not be deemed liable. Refunds will not be issued, and Learn Technique will not be obligated to offer any alternative course dates.</p>
            <p className="mb-2"><strong>5.4</strong> Should you be unable to attend for reason of illness or accident then provided that we receive satisfactory documentary evidence from a suitably qualified doctor then we will arrange for you to complete you course on an alternative date.</p>
            <p className="mb-2"><strong>5.5.1</strong> Learn Technique will at its absolute discretion consider each such event on its merits and should the circumstances be considered exceptional in the view of Learn Technique then it may review each such case and take such action as it shall deem appropriate.</p>
            <p className="mb-2"><strong>5.5.2</strong> Where a Student chooses after starting a course with Learn Technique, to discontinue with any aspect of the course then we will not be liable to make any reimbursement of any part of the Entire Course Fee.</p>
            <p className="mb-2"><strong>5.6</strong> Provided that you have paid the entire 10 % deposit and that there is more than 14 days prior to the course start date Learn Technique will amend the date of the course on one occasion only subject to a payment of a £20.00 administration fee.</p>
            <p><strong>5.7</strong> We are unable to change the date of a course within 14 days of the Course Start Date. And in such circumstances the entire course fee is payable and no refund is possible. Where you have booked either a practical assessment or Online examination, we require a minimum of 14 days&apos; notice to change the date. Should you want to reschedule within that 14-day period, you will be charged the entire Assessment and/or Examination Fee to reschedule. Learn Technique will not be liable to refund any fees in respect of Assessments and/or Examinations where you fail to attend or reschedule within 14 days of the Date booked for the initial Assessment or Examination.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">6. DATA PROTECTION</h2>
            <p><strong>6.1</strong> Any telephone calls may be recorded by Learn Technique for administrative or training purposes (which you consent to). By marking the relevant box on your Booking form, you agree that, Learn Technique may use your personal data for administrative purposes and may keep this information for a reasonable period and you give your consent to Learn Technique doing so. Learn Technique may contact you by email, postal mail, or telephone to let you know about any courses or promotions which might be of interest to you. Subsequently if you do not wish to receive such emails, postal mails, SMS or telephone communications, please email us at info@LearnTechnique.com stating that you wish to opt-out from such communications.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">7. GENERAL</h2>
            <p className="mb-2"><strong>7.1</strong> Learn Technique agrees to provide you with all necessary tuition, supervision, tools, safety equipment to complete the course booked and obtain subsequent to appropriate successful examination completion (if applicable) provided you attend the entire qualification.</p>
            <p className="mb-2"><strong>7.2</strong> At the point at which you book your course with Learn Technique we will write to you with details of the course, course qualifications, directions, local accommodation, any relevant offers where appropriate and a copy of our Terms and Conditions.</p>
            <p className="mb-2"><strong>7.3</strong> Learn Technique will use its best endeavours to ensure that all examinations are completed and marked in a timely manner. We cannot be held responsible for delay in certification where the delay is caused by the Accredited Awarding Body. We will subsequently forward all certificates to your nominated UK address by tracked mail delivery.</p>
            <p className="mb-2"><strong>7.4</strong> If you need to Re-sit any examination or assessment then we will charge the appropriate fee. You will be required to book the resit using the booking system.</p>
            <p className="mb-2"><strong>7.5</strong> All candidates must provide appropriate photographic identity evidence on the first day of your course. Acceptable photographic evidence includes valid Passport, Photocard driving licence or other official documentary evidence.</p>
            <p className="mb-2"><strong>7.6</strong> Learn Technique makes no representation or warranty that successful completion of the course will lead to future employment or earnings, nor do we give any guarantee or representation as to competence or ability, and the student must take care to ensure that any work that they subsequently undertake is within their own competence and ability and where necessary that they seek further practical help and advice.</p>
            <p className="mb-2"><strong>7.7.1</strong> Learn Technique may offer tools and books for sale at the centre. No guarantee is provided that any particular tools or books will be available at any particular time. Please enquire at the centre for more information about current stock.</p>
            <p className="mb-2"><strong>7.7.2</strong> These Terms and Conditions do not govern any purchase of tools and books from Learn Technique, and if you (or a person you booked the course on behalf of) choose to purchase any tools and books this will form a separate agreement between Learn Technique and the purchaser.</p>
            <p className="mb-2"><strong>7.7.3</strong> Please note that any tools purchased can only be returned in accordance with our returns policy, a copy of which is available on request. Learn Technique does not accept returns of books.</p>
            <p className="mb-2"><strong>7.8</strong> Learn Technique reserves the right to remove a student from any course, qualification or examination immediately it becomes aware of any allegation of inappropriate behaviour, personal conduct or malpractice on the part of the Student. Any such removal shall be considered by the Compliance Officer and his decision shall be final. For the avoidance of doubt should any student be removed under these powers no refunds will be given.</p>
            <p className="mb-2"><strong>7.9</strong> All students must wear clothing and footwear considered suitable under the terms of the Health and Safety at Work Act 1974. For the avoidance of doubt, we expect candidates to wear appropriate protective footwear at all times while on the course.</p>
            <p className="mb-2"><strong>7.10</strong> Learn Technique shall not be held liable for any failure in performance of any of the terms and Obligations under this agreement caused by factors which are outside its control.</p>
            <p className="mb-2"><strong>7.11</strong> If for any reason any of these terms or part of any one of these terms is found by a court of law to be illegal, invalid or unenforceable, then that term or part of that term shall be amended to the minimum extent necessary to make it legal, valid and enforceable and the remaining terms and (if applicable) part of term shall remain in full force notwithstanding the amendment made.</p>
            <p><strong>7.12</strong> These Terms and Conditions (including any associated non-contractual disputes or claims) shall be subject to English law and any disputes arising under or in connection with these terms and conditions, if not capable of resolution between the parties, shall be subject to the exclusive jurisdiction of the English Courts.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">8. COMPLAINTS</h2>
            <p><strong>8.1</strong> All complaints must be reported to Learn Technique at the earliest possible opportunity. All complaints will be handled in a professional and timely manner. We will use our best endeavours to liaise with you in reaching a satisfactory conclusion of your complaint. All matters brought to our attention help us to ensure that each student has the best experience while training with Learn Technique.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">9. EXCLUSION OF LIABILITY</h2>
            <p className="mb-2"><strong>9.1</strong> Subject thereto, Learn Technique shall have no liability whatsoever to any person for any loss or damage or expense, however occurring or incurred, whether direct or indirect, resulting from your participation in the course.</p>
            <p><strong>9.2</strong> Learn Technique&apos;s Liability in any event, except for death or personal injury resulting from its negligence, or for its own fraud (or that of its employees) shall at all times be limited to the fees paid by you for participation in the course.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Coupon Code&apos;s</h2>
            <p className="mb-4">Course must be paid for in full at time of booking. Single course bookings only (no group bookings). On-site courses not applicable. Unavailable for ELCAS. Excludes one-day courses.</p>
            <p className="mb-2">10% discount codes may not be used on the following courses:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>1 Day Update – 18th Edition Wiring Regulations</li>
              <li>City and Guilds 2393-10 – Building Regulations for Electrical Installations in Dwellings</li>
              <li>Emergency Lighting</li>
              <li>Essential Electrics</li>
              <li>Refrigeration Electrics</li>
              <li>Domestic Burglar Alarm Systems</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
