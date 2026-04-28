import { PageShell, ProseSection } from "@/components/repsine/page-shell"

export const metadata = {
  title: "Privacy Policy | Repsine",
  description:
    "How Repsine collects, uses, and protects your personal information when you use our website and courses.",
}

const sections = [
  {
    title: "1. Introduction",
    body: `We are committed to maintaining the accuracy, confidentiality, and security of your personally identifiable information ("Personal Information"). As part of this commitment, our privacy policy governs our actions as they relate to the collection, use, and disclosure of Personal Information. We are responsible for maintaining and protecting the Personal Information under our control and have designated individuals responsible for compliance with our privacy policy.`,
  },
  {
    title: "2. Identifying Purposes",
    body: `We collect, use, and disclose Personal Information to provide you with the product or service you have requested and to offer you additional products and services we believe you might be interested in. The purposes for which we collect Personal Information will be identified before or at the time we collect the information. In certain circumstances, the purposes for which information is collected may be clear, and consent may be implied, such as where your name, address, and payment information is provided as part of the order process.`,
  },
  {
    title: "3. Consent",
    body: `Knowledge and consent are required for the collection, use, or disclosure of Personal Information except where required or permitted by law. Providing us with your Personal Information is always your choice. However, your decision not to provide certain information may limit our ability to provide you with our products or services.`,
  },
  {
    title: "4. Limiting Collection",
    body: `The Personal Information collected will be limited to those details necessary for the purposes identified by us. With your consent, we may collect Personal Information from you in person, over the telephone, or by corresponding with you via mail or the Internet.`,
  },
  {
    title: "5. Limiting Use, Disclosure, and Retention",
    body: `Personal Information may only be used or disclosed for the purpose for which it was collected unless you have otherwise consented, or when it is required or permitted by law. Personal Information will only be retained for the period of time required to fulfill the purpose for which we collected it or as may be required by law.`,
  },
  {
    title: "6. Accuracy",
    body: `Personal Information will be maintained in as accurate, complete, and up-to-date form as is necessary to fulfill the purposes for which it is to be used.`,
  },
  {
    title: "7. Safeguarding Customer Information",
    body: `Personal Information will be protected by security safeguards that are appropriate to the sensitivity level of the information. We take all reasonable precautions to protect your Personal Information from any loss or unauthorized use, access, or disclosure.`,
  },
  {
    title: "8. Customer Access",
    body: `Upon request, you will be informed of the existence, use, and disclosure of your Personal Information and will be given access to it. You may verify the accuracy and completeness of your Personal Information, and may request that it be amended, if appropriate.`,
  },
  {
    title: "9. Handling Customer Complaints and Suggestions",
    body: `You may direct any questions or inquiries with respect to our privacy policy or our practices by contacting us at repsine.agency@gmail.com.`,
  },
  {
    title: "10. Data Subject Rights",
    body: `In accordance with applicable data protection laws, you have the following rights regarding your personal information: Right to Access, Right to Rectification, Right to Erasure, Right to Restrict Processing, Right to Data Portability, Right to Object, and Right to Withdraw Consent. If you wish to exercise any of these rights, please contact us at the contact information provided above.`,
  },
  {
    title: "11. Sharing of Personal Information with Third Parties",
    body: `We may share your personal information with trusted third parties for specific purposes such as processing payments, providing customer support, or delivering products and services. These third parties are obligated to protect your personal information in accordance with this privacy policy. We will never sell, rent, or trade your personal information to third parties without your explicit consent, except as necessary to fulfill the services you request.`,
  },
  {
    title: "12. Data Retention",
    body: `We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected or as required by law. Once the information is no longer needed for the purposes it was collected for, we will securely delete or anonymize it.`,
  },
  {
    title: "13. Children's Privacy",
    body: `Our services are not intended for individuals under the age of 13. We do not knowingly collect or maintain personal information from individuals under 13 years of age. If we become aware that we have inadvertently collected personal information from a child under 13, we will take steps to delete such information as soon as possible.`,
  },
  {
    title: "14. Changes to This Privacy Policy",
    body: `We may update this privacy policy from time to time. When we make significant changes, we will notify you via email or by posting a prominent notice on our website. We encourage you to review this policy periodically to stay informed about how we are protecting your personal information.`,
  },
  {
    title: "15. International Data Transfers",
    body: `If you are located outside of India, please be aware that we may transfer your personal information to countries that may have different data protection laws. By using our services, you consent to the transfer of your personal information to these countries for the purposes outlined in this policy.`,
  },
  {
    title: "16. Cookies",
    body: `A cookie is a small computer file or piece of information that may be stored in your computer's hard drive when you visit our website. We may use cookies to improve our website's functionality and in some cases, to provide visitors with a customized online experience. You may change your browser settings to prevent your computer from accepting cookies. Please note, however, if you disable cookies, you may not experience optimal performance of our website.`,
  },
  {
    title: "17. Other Websites",
    body: `Our website may contain links to other third-party sites that are not governed by this privacy policy. Although we endeavor to only link to sites with high privacy standards, our privacy policy will no longer apply once you leave our website. We suggest that you examine the privacy statements of those sites to learn how your information may be collected, used, shared, and disclosed.`,
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      eyebrow="Legal"
      title="Privacy Policy"
      description="Your privacy matters. Here's how Repsine collects, uses, and protects your personal information."
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
