import { PageShell, ProseSection } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Terms & Conditions | Repsine",
  description: "The terms and conditions that govern your use of the Repsine website and courses.",
}

const sections = [
  {
    title: "1. Introduction",
    body: `This website is operated by Repsine. The terms "we", "us", and "our" refer to Repsine. The use of our website is subject to the following terms and conditions of use, as amended from time to time (the "Terms"). The Terms are to be read together by you with any terms, conditions, or disclaimers provided in the pages of our website. Please review the Terms carefully. The Terms apply to all users of our website, including without limitation, users who are browsers, customers, merchants, vendors, and/or contributors of content. If you access and use this website, you accept and agree to be bound by and comply with the Terms and our Privacy Policy. If you do not agree to the Terms or our Privacy Policy, you are not authorized to access our website, use any of our website's services, or place an order on our website.`,
  },
  {
    title: "2. Use of our Website",
    body: `You agree to use our website for legitimate purposes and not for any illegal or unauthorized purpose, including without limitation, in violation of any intellectual property or privacy law. By agreeing to the Terms, you represent and warrant that you are at least the age of majority in your state or province of residence and are legally capable of entering into a binding contract. You agree not to use our website to conduct any activity that would constitute a civil or criminal offense or violate any law. You agree not to attempt to interfere with our website's network or security features or to gain unauthorized access to our systems. You agree to provide us with accurate personal information, such as your email address, mailing address, and other contact details in order to complete your order or contact you as needed. You agree to promptly update your account and information.`,
  },
  {
    title: "3. General Conditions",
    body: `We reserve the right to refuse service to anyone, at any time, for any reason. We reserve the right to make any modifications to the website, including terminating, changing, suspending, or discontinuing any aspect of the website at any time, without notice. We may impose additional rules or limits on the use of our website. You agree to review the Terms regularly, and your continued access or use of our website will mean that you agree to any changes. You agree that we will not be liable to you or any third party for any modification, suspension, or discontinuance of our website or for any service, content, feature, or product offered through our website.`,
  },
  {
    title: "4. Products or Services",
    body: `All purchases through our website are subject to product availability. We may, at our sole discretion, limit or cancel the quantities offered on our website or limit the sales of our products or services to any person, household, geographic region, or jurisdiction. Prices for our products are subject to change without notice. Unless otherwise indicated, prices displayed on our website are quoted in Indian Rupees. We reserve the right, in our sole discretion, to refuse orders, including without limitation, orders that appear to be placed by distributors or resellers. If we believe that you have made a false or fraudulent order, we will be entitled to cancel the order and inform the relevant authorities.`,
  },
  {
    title: "5. Links to Third-Party Websites",
    body: `Links from or to websites outside our website are meant for convenience only. We do not review, endorse, approve, or control, and are not responsible for any sites linked from or to our website, the content of those sites, the third parties named therein, or their products and services. Linking to any other site is at your sole risk and we will not be responsible or liable for any damages in connection with linking.`,
  },
  {
    title: "6. Use of Comments, Feedback, and Other Submissions",
    body: `You acknowledge that you are responsible for the information, profiles, opinions, messages, comments, and any other content (collectively, the "Content") that you post, distribute, or share on or through our website. You agree that any Content submitted by you in response to a request by us for a specific submission may be edited, adapted, modified, recreated, published, or distributed by us. You agree that you will not post, distribute, or share any Content on our website that is protected by copyright, trademark, patent, or any other proprietary right without the express consent of the owner of such proprietary right. We reserve the right to terminate your ability to post on our website and to remove and/or delete any Content that we deem objectionable.`,
  },
  {
    title: "7. Your Personal Information",
    body: `Please see our Privacy Policy to learn about how we collect, use, and share your personal information.`,
  },
  {
    title: "8. Errors and Omissions",
    body: `Please note that our website may contain typographical errors or inaccuracies and may not be complete or current. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update information at any time, without prior notice (including after an order has been submitted). Such errors, inaccuracies, or omissions may relate to product description, pricing, promotion, and availability, and we reserve the right to cancel or refuse any order placed based on incorrect pricing or availability information, to the extent permitted by applicable law.`,
  },
  {
    title: "9. Disclaimer and Limitation of Liability",
    body: `You assume all responsibility and risk with respect to your use of our website, which is provided "as is" without warranties, representations, or conditions of any kind, either express or implied. We do not warrant that our website or its functioning or the content and material of the services made available thereby will be timely, secure, uninterrupted, or error-free, that defects will be corrected, or that our websites or the servers that make our website available are free of viruses or other harmful components. In no event will we, or our affiliates, or their respective content or service providers be liable to you for any direct, indirect, special, incidental, consequential, exemplary, or punitive damages arising from your use of our website.`,
  },
  {
    title: "10. Indemnification",
    body: `You agree to defend and indemnify us, and hold us and our affiliates harmless, and our and their respective directors, officers, agents, contractors, and employees against any losses, liabilities, claims, or expenses (including legal fees) in any way arising from, related to, or in connection with your use of our website, your violation of the Terms, or the posting or transmission of any materials on or through the website by you.`,
  },
  {
    title: "11. Entire Agreement",
    body: `The Terms and any documents expressly referred to in them represent the entire agreement between you and us in relation to the subject matter of the Terms and supersede any prior agreement, understanding, or arrangement between you and us, whether oral or in writing.`,
  },
  {
    title: "12. Waiver",
    body: `Our failure to exercise or enforce any right or provision of the Terms will not constitute a waiver of such right or provision. A waiver by us of any default will not constitute a waiver of any subsequent default. No waiver by us is effective unless it is communicated to you in writing.`,
  },
  {
    title: "13. Severability",
    body: `If any of the provisions of the Terms are determined by any competent authority to be invalid, unlawful, or unenforceable, such provision will to that extent be severed from the remaining Terms, which will continue to be valid and enforceable to the fullest extent permitted by law.`,
  },
  {
    title: "14. Questions or Concerns",
    body: `Please send all questions, comments, and feedback to us at repsine.agency@gmail.com.`,
  },
]

export default function TermsPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Terms & Conditions"
      description="Please review these terms carefully before using our website or purchasing our courses."
    >
      <div className="space-y-6">
        {sections.map((section) => (
          <ProseSection key={section.title}>
            <h2 className="font-display text-xl font-bold text-foreground">{section.title}</h2>
            <p>{section.body}</p>
          </ProseSection>
        ))}
      </div>
    </PageShell>
  )
}
