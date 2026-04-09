import React from "react";
import { AnimatedSection } from "@/components/animated-section";
import HeroSection from "@/app/shared/heroBackground";

export const metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for Technique Learning Solutions. Learn how we collect, use, and protect your personal information, including cookies and GDPR compliance.",
  alternates: { canonical: "https://www.learntechnique.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <AnimatedSection variant="fade-in" visibleOnLoad>
        <HeroSection
          title="Privacy Policy"
          description="How we collect, use, and protect your personal information."
        />
      </AnimatedSection>


      <div className="max-w-4xl mx-auto px-4 md:px-0 py-12 sm:py-20">
        <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">What is this Privacy Policy for?</h2>
            <p>This privacy policy is for this website [www.learntechnique.com] and served by Technique Learning Solutions and governs the privacy of its users who choose to use it.</p>
            <p>The policy sets out the different areas where user privacy is concerned and outlines the obligations &amp; requirements of the users, the website and website owners. Furthermore the way this website processes, stores and protects user data and information will also be detailed within this policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">The Website</h2>
            <p>This website and its owners take a proactive approach to user privacy and ensure the necessary steps are taken to protect the privacy of its users throughout their visiting experience. This website complies to all UK national laws and requirements for user privacy.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Use of Cookies</h3>
            <p>This website uses cookies to better the users experience while visiting the website. Cookies are small files saved to the user&apos;s computers hard drive that track, save and store information about the user&apos;s interactions and usage of the website. This allows the website, through its server to provide the users with a tailored experience within this website.</p>
            <p>Users are advised that if they wish to deny the use and saving of cookies from this website on to their computers hard drive they should take necessary steps within their web browsers security settings to block all cookies from this website and its external serving vendors. Different browsers provide different methods to block and delete cookies used by websites. To find out more about how to manage and delete cookies, visit wikipedia.org, www.allaboutcookies.org.</p>
            <p>This website uses tracking software to monitor its visitors to better understand how they use it. This software is provided by Google Analytics which uses cookies to track visitor usage. The software will save a cookie to your computers hard drive in order to track and monitor your engagement and usage of the website, but will not store, save or collect personal information. You can read Google&apos;s privacy policy here for further information [http://www.google.com/privacy.html].</p>
            <p>Other cookies may be stored to your computers hard drive by external companies such as Twitter, YouTube and Pinterest. Such cookies are used for conversion and referral tracking and typically expire after 30 days, though some may take longer. No personal information is stored, saved or collected.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">User Consent Policy</h3>
            <p>We comply with the EU User Consent Policy and GDPR requirements regarding user consent for cookies. When you visit our website, we will ask for your consent to use cookies. You can change your cookie settings at any time by clicking on the Cookie Settings link on our website.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">Cookies We Collect For Advertising</h3>
            <p>Some of the services listed below may use Cookies to identify Users or they may use the behavioural retargeting technique, i.e. displaying ads tailored to the User&apos;s interests and behaviour, including those detected outside this Website. For more information, please check the privacy policies of the relevant services.</p>
            <p>In addition to any opt-out offered by any of the services below, the User may opt out of a third-party service&apos;s use of cookies for certain advertising features by visiting the Network Advertising Initiative opt-out page. http://optout.networkadvertising.org/?c=1</p>
            <p>Users may also opt-out of certain advertising features through applicable device settings, such as the device advertising settings for mobile phones or ads settings in general.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">DIRECT EMAIL MARKETING (DEM) (THIS WEBSITE)</h4>
            <p>This Website uses the User Data to propose services and products provided by third parties or unrelated to the product or service provided by this Website. Personal Data collected: email address; first name.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">ANALYTICS</h4>
            <p>The services contained in this section enable the Owner to monitor and analyse web traffic and can be used to keep track of User behaviour.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">GOOGLE ANALYTICS (GOOGLE INC.)</h4>
            <p>Google Analytics is a web analysis service provided by Google Inc. (&quot;Google&quot;). Google utilises the Data collected to track and examine the use of this Website, to prepare reports on its activities and share them with other Google services. Google may use the Data collected to contextualize and personalize the ads of its own advertising network.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">GOOGLE ADS &amp; REMARKETING</h4>
            <p>Some information is collected every time you visit the website. We share data with Google for advertising &amp; remarketing by way of using a cookie (which is a small text file that allows a user to be identified) and then used to serve ads to them across a range of other websites or apps based on the visitor&apos;s history. These will also allow us to deliver personalised ads based on your behaviour and interests shown on the website. Users can opt-out of Google&apos;s use of cookies with the following link https://support.google.com/ads/answer/2662922?hl=en-GB. Personal data collected: cookies; usage data. Place of processing: United States – Privacy Policy – Opt Out.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">FACEBOOK ADS CONVERSION TRACKING (FACEBOOK PIXEL) (FACEBOOK, INC.)</h4>
            <p>Facebook Ads conversion tracking (Facebook pixel) is an analytics service provided by Facebook, Inc. that connects data from the Facebook advertising network with actions performed on this Website. The Facebook pixel tracks conversions that can be attributed to ads on Facebook, Instagram and Audience Network. Personal Data collected: Cookies; Usage Data. Place of processing: United States – Privacy Policy.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Contacting the User</h4>
            <p><strong>Contact Form/Course Details form on this website</strong> – By filling in the contact form with their Data, the User authorises this Website to use these details to reply to requests for information, quotes or any other kind of request as indicated by the form&apos;s header. Personal Data collected: email address; first name.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">MAILING LIST OR NEWSLETTER (THIS WEBSITE)</h4>
            <p>By registering on the mailing list or for the newsletter, the User&apos;s email address will be added to the contact list of those who may receive email messages containing information of commercial or promotional nature concerning this Website. Your email address might also be added to this list as a result of signing up to this Website or after making a purchase. Personal Data collected: email address; first name.</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">FACEBOOK COMMENTS (FACEBOOK, INC.)</h4>
            <p>Facebook Comments is a content commenting service provided by Facebook, Inc. enabling the User to leave comments and share them on the Facebook platform. Personal Data collected: Cookies; Usage Data. Place of processing: United States – Privacy Policy.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Legal Basis of Processing</h2>
            <p>The Owner may process Personal Data relating to Users if one of the following applies:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users have given their consent for one or more specific purposes. Note: Under some legislations the Owner may be allowed to process Personal Data until the User objects to such processing (&quot;opt-out&quot;), without having to rely on consent or any other of the following legal bases. This, however, does not apply, whenever the processing of Personal Data is subject to European data protection law;</li>
              <li>provision of Data is necessary for the performance of an agreement with the User and/or for any pre-contractual obligations thereof;</li>
              <li>processing is necessary for compliance with a legal obligation to which the Owner is subject;</li>
              <li>processing is related to a task that is carried out in the public interest or in the exercise of official authority vested in the Owner;</li>
              <li>processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third party.</li>
            </ul>
            <p>In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement necessary to enter into a contract.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Retention Time</h2>
            <p>Personal Data shall be processed and stored for as long as required by the purpose they have been collected for. Therefore, Personal Data collected for purposes related to the performance of a contract between the Owner and the User shall be retained until such contract has been fully performed.
              Personal Data collected for the purposes of the Owner&apos;s legitimate interests shall be retained as long as needed to fulfil such purposes. Users may find specific information regarding the legitimate interests pursued by the Owner within the relevant sections of this document or by contacting the Owner.
              The Owner may be allowed to retain Personal Data for a longer period whenever the User has given consent to such processing, as long as such consent is not withdrawn. Furthermore, the Owner may be obliged to retain Personal Data for a longer period whenever required to do so for the performance of a legal obligation or upon order of an authority.
              Once the retention period expires, Personal Data shall be deleted. Therefore, the right to access, the right to erasure, the right to rectification and the right to data portability cannot be enforced after expiration of the retention period.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Contact &amp; Communication</h2>
            <p>Users contacting this website and/or its owners do so at their own discretion and provide any such personal details requested at their own risk. Your personal information is kept private and stored securely until a time it is no longer required or has no use, as detailed in the Data Protection Act 1998. Every effort has been made to ensure a safe and secure form to email submission process but advise users using such form to email processes that they do so at their own risk.</p>
            <p>This website and its owners use any information submitted to provide you with further information about the products / services they offer or to assist you in answering any questions or queries you may have submitted. This includes using your details to subscribe you to any email newsletter program the website operates but only if this was made clear to you and your express permission was granted when submitting any form to email process. Or whereby you the consumer have previously purchased from or enquired about purchasing from the company a product or service that the email newsletter relates to. This is by no means an entire list of your user rights in regard to receiving email marketing material. Your details are not passed on to any third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Email Newsletter</h2>
            <p>This website operates an email newsletter program, used to inform subscribers about products and services supplied by this website. Users can subscribe through an online automated process should they wish to do so but do so at their own discretion. Some subscriptions may be manually processed through prior written agreement with the user.</p>
            <p>Subscriptions are taken in compliance with UK Spam Laws detailed in the Privacy and Electronic Communications Regulations 2003. All personal details relating to subscriptions are held securely and in accordance with the Data Protection Act 1998. No personal details are passed on to third parties nor shared with companies/people outside of the company that operates this website. Under the Data Protection Act 1998 you may request a copy of personal information held about you by this website&apos;s email newsletter program. A small fee will be payable. If you would like a copy of the information held on you please write to the business address at the bottom of this policy.</p>
            <p>Email marketing campaigns published by this website or its owners may contain tracking facilities within the actual email. Subscriber activity is tracked and stored in a database for future analysis and evaluation. Such tracked activity may include; the opening of emails, forwarding of emails, the clicking of links within the email content, times, dates and frequency of activity [this is by no far a comprehensive list]. This information is used to refine future email campaigns and supply the user with more relevant content based around their activity.</p>
            <p>In compliance with UK Spam Laws and the Privacy and Electronic Communications Regulations 2003 subscribers are given the opportunity to un-subscribe at any time through an automated system. This process is detailed at the footer of each email campaign. If an automated un-subscription system is unavailable clear instructions on how to un-subscribe will by detailed instead.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">External Links</h2>
            <p>Although this website only looks to include quality, safe and relevant external links, users are advised to adopt a policy of caution before clicking any external web links mentioned throughout this website.</p>
            <p>The owners of this website cannot guarantee or verify the contents of any externally linked website despite their best efforts. Users should therefore note they click on external links at their own risk and this website and its owners cannot be held liable for any damages or implications caused by visiting any external links mentioned.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Social Media Platforms</h2>
            <p>Communication, engagement and actions taken through external social media platforms that this website and its owners participate on are custom to the terms and conditions as well as the privacy policies held with each social media platform respectively.</p>
            <p>Users are advised to use social media platforms wisely and communicate/engage upon them with due care and caution in regard to their own privacy and personal details. This website nor its owners will ever ask for personal or sensitive information through social media platforms and encourage users wishing to discuss sensitive details to contact them through primary communication channels such as by telephone or email.</p>
            <p>This website may use social sharing buttons which help share web content directly from web pages to the social media platform in question. Users are advised before using such social sharing buttons that they do so at their own discretion and note that the social media platform may track and save your request to share a web page respectively through your social media platform account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Shortened Links in Social Media</h2>
            <p>This website and its owners through their social media platform accounts may share web links to relevant web pages. By default some social media platforms shorten lengthy urls. Users are advised to take caution and good judgement before clicking any shortened urls published on social media platforms by this website and its owners. Despite the best efforts to ensure only genuine urls are published many social media platforms are prone to spam and hacking and therefore this website and its owners cannot be held liable for any damages or implications caused by visiting any shortened links.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">1. Your data protection rights under the General Data Protection Regulation (GDPR)</h2>
            <p>If you are a resident of the EEA, you have the following data protection rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>If you wish to access, correct, update, or request deletion of your personal information, you can do so at any time by emailing info@learntechnique.com.</li>
              <li>In addition, you can object to the processing of your personal information, ask us to restrict the processing of your personal information or request portability of your personal information. Again, you can exercise these rights by emailing info@learntechnique.com.</li>
              <li>You have the right to opt-out of marketing communications we send you at any time. You can exercise this right by clicking on the &quot;unsubscribe&quot; or &quot;opt-out&quot; link in the marketing emails we send you. To opt-out of other forms of marketing, please contact us by emailing info@learntechnique.com.</li>
              <li>Similarly, if we have collected and processed your personal information with your consent, then you can withdraw your consent at any time. Withdrawing your consent will not affect the lawfulness of any processing we conducted prior to your withdrawal, nor will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</li>
              <li>You have the right to complain to a data protection authority about our collection and use of your personal information. For more information, please contact your local data protection authority.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">2. Information we collect</h2>
            <h3 className="text-xl font-semibold mt-4 mb-2">Information You Provide</h3>
            <p><strong>Account Registration / Booking Form.</strong> When you book a course, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number. If you choose to refer a friend to our Services, we may also collect your friend&apos;s email address so that we may send them a referral or promotional code.</p>
            <p><strong>Payment Information.</strong> When you add your financial account information to your Account, that information is directed to our third-party payment processor. We do not store your financial account information on our systems; however, we have access to, and may retain, subscriber information through our third-party payment processor.</p>
            <p><strong>Communications.</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide. We may also receive a confirmation when you open an email from us.</p>
            <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>

            <h3 className="text-xl font-semibold mt-4 mb-2">Information We Collect When You Use Our Services.</h3>
            <p><strong>Cookies and Other Tracking Technologies.</strong> As is true of most websites, we gather certain information automatically and store it in log files. In addition, when you use our Services, we may collect certain information automatically from your device. This information may include internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, operating system, date/time stamp, clickstream data, landing page, and referring URL. To collect this information, a cookie may be set on your computer or device when you visit our Services. Cookies contain a small amount of information that allows our web servers to recognize you. We store information that we collect through cookies, log files, and/or clear gifs to record your preferences. We may also automatically collect information about your use of features of our Services, about the functionality of our Services, frequency of visits, and other information related to your interactions with the Services. We may track your use across different websites and services. In some countries, including countries in the European Economic Area (&quot;EEA&quot;), the information referenced above in this paragraph may be considered personal information under applicable data protection laws.</p>
            <p><strong>Usage of our Services.</strong> When you use our Services, we may collect information about your engagement with and utilization of our Services, such as processor and memory usage, storage capacity, navigation of our Services, and system-level metrics. We use this data to operate the Services, maintain and improve the performance and utilization of the Services, develop new features, protect the security and safety of our Services and our customers, and provide customer support. We also use this data to develop aggregate analysis and business intelligence that enable us to operate, protect, make informed decisions, and report on the performance of our business.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">How do we use your data?</h2>
            <p>We use your data to provide our services to you, to communicate with you about your account and our services, to improve our services, deliver personalised messages and to comply with legal obligations.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">3. How we share information</h2>
            <p>We may share your data with third-party service providers who perform services on our behalf, such as payment processing, advertising, and email delivery. We require these third-party service providers to protect your personal data and not use it for any other purpose.</p>
            <p>We may share the information we collect in various ways, including the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Vendors and Service Providers.</strong> We may share information with third-party vendors and service providers that provide services on our behalf, such as helping to provide our Services, for promotional and/or marketing purposes, and to provide you with information relevant to you such as product announcements, software updates, special offers, or other information.</li>
              <li><strong>Aggregate Information.</strong> Where legally permissible, we may use and share information about users with our partners in aggregated or de-identified form that can&apos;t reasonably be used to identify you.</li>
              <li><strong>Information We Share When You Sign Up Through a Referral.</strong> If you sign up for our Services through a referral from a friend, we may share information with your referrer to let them know that you used their referral to sign up for our Services.</li>
              <li><strong>Analytics.</strong> We use analytics providers such as Google Analytics. Google Analytics uses cookies to collect non-identifying information. Google provides some additional privacy options regarding its Analytics cookies at http://www.google.com/policies/privacy/partners/.</li>
              <li><strong>Business Transfers.</strong> Information may be disclosed and otherwise transferred to any potential acquirer, successor, or assignee as part of any proposed merger, acquisition, debt financing, sale of assets, or similar transaction, or in the event of insolvency, bankruptcy, or receivership in which information is transferred to one or more third parties as one of our business assets.</li>
              <li><strong>As Required By Law and Similar Disclosures.</strong> We may also share information to (i) satisfy any applicable law, regulation, legal process, or governmental request; (ii) enforce this Privacy Policy and our Terms of Service, including investigation of potential violations hereof; (iii) detect, prevent, or otherwise address fraud, security, or technical issues; (iv) respond to your requests; or (v) protect our rights, property or safety, our users and the public. This includes exchanging information with other companies and organizations for fraud protection and spam/malware prevention.</li>
            </ul>
            <p className="mt-4">We may update this privacy policy and cookie policy from time to time. Any changes will be posted on our website, and you will be deemed to have accepted the updated policy if you continue to use our website and services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Contact Details</h2>
            <p><strong>By Post</strong><br />Technique Learning Solutions<br />Technique Tower Business Park<br />High Street<br />Clay Cross<br />Chesterfield<br />S45 9EA</p>
            <p className="mt-4"><strong>By Telephone</strong><br />Tel: +44 (0)1246 802222</p>
            <p className="mt-4"><strong>By Email</strong><br />info@LearnTechnique.com</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-[#016068] mb-4">Cookie List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">Cookie</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Duration</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td className="border border-gray-300 px-4 py-2">ckid</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">never</td><td className="border border-gray-300 px-4 py-2">Adara yield sets this cookie to deliver advertisements tailored to user interests on other websites and track transactions</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">CONSENT</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">2 years</td><td className="border border-gray-300 px-4 py-2">YouTube sets this cookie via embedded YouTube videos and registers anonymous statistical data.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">cookielawinfo-checkbox-advertisement</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">Set by the GDPR Cookie Consent plugin, this cookie records the user consent for the cookies in the &quot;Advertisement&quot; category.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">cookielawinfo-checkbox-analytics</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">Set by the GDPR Cookie Consent plugin, this cookie records the user consent for the cookies in the &quot;Analytics&quot; category.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">cookielawinfo-checkbox-functional</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">The GDPR Cookie Consent plugin sets the cookie to record the user consent for the cookies in the category &quot;Functional&quot;.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">cookielawinfo-checkbox-necessary</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">Set by the GDPR Cookie Consent plugin, this cookie records the user consent for the cookies in the &quot;Necessary&quot; category.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">cookielawinfo-checkbox-others</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">Set by the GDPR Cookie Consent plugin, this cookie stores user consent for cookies in the category &quot;Others&quot;.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">cookielawinfo-checkbox-performance</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">Set by the GDPR Cookie Consent plugin, this cookie stores the user consent for cookies in the category &quot;Performance&quot;.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">CookieLawInfoConsent</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year</td><td className="border border-gray-300 px-4 py-2">CookieYes sets this cookie to record the default button state of the corresponding category and the status of CCPA.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">fr</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">3 months</td><td className="border border-gray-300 px-4 py-2">Facebook sets this cookie to show relevant advertisements by tracking user behaviour across the web.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">IDE</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year 24 days</td><td className="border border-gray-300 px-4 py-2">Google DoubleClick IDE cookies store information about how the user uses the website to present them with relevant ads.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">_ga</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 year 1 month 4 days</td><td className="border border-gray-300 px-4 py-2">Google Analytics sets this cookie to calculate visitor, session and campaign data and track site usage.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">_gid</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">1 day</td><td className="border border-gray-300 px-4 py-2">Google Analytics sets this cookie to store information on how visitors use a website.</td></tr>
                  <tr><td className="border border-gray-300 px-4 py-2">__cf_bm</td><td className="border border-gray-300 px-4 py-2"></td><td className="border border-gray-300 px-4 py-2">30 minutes</td><td className="border border-gray-300 px-4 py-2">Cloudflare set the cookie to support Cloudflare Bot Management.</td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

    </main>
  );
}
