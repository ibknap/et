import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";

export default function Policy() {
  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">Privacy Policy</h1>

            <p>
              Welcome to Exclusive Travel&apos;s Privacy Policy. Your privacy is
              important to us, and we are committed to protecting your personal
              information. This policy outlines how we collect, use, disclose,
              and safeguard your data when you use our mobile application or
              website. By using Exclusive Travel, you agree to the terms
              outlined in this policy.
            </p>

            <h5>1. Information We Collect</h5>
            <p>
              We collect various types of information to provide and improve our
              services:
            </p>
            <ul>
              <li>
                Personal Information: When you create an account, make bookings,
                or use certain features, we may collect personal information
                such as your name, email address, and payment details.
              </li>
              <li>
                Usage Data: We collect data about your interactions with our
                platform, including pages visited, searches performed, and other
                usage patterns.
              </li>
              <li>
                Device Information: We may collect information about your
                device, including its type, model, operating system, and unique
                identifiers.
              </li>
            </ul>

            <h5>2. How We Use Your Information</h5>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>To provide and maintain our services.</li>
              <li>To process bookings and payments.</li>
              <li>To personalize and improve your user experience.</li>
              <li>
                To communicate with you about bookings, promotions, and updates.
              </li>
              <li>To analyze usage patterns and enhance our platform.</li>
            </ul>

            <h5>3. Sharing of Information</h5>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li>
                With service providers and partners involved in delivering our
                services.
              </li>
              <li>
                In response to legal requests or to comply with applicable laws.
              </li>
              <li>
                To protect our rights, privacy, safety, or the rights, privacy,
                and safety of others.
              </li>
            </ul>

            <h5>4. Security Measures</h5>
            <p>
              We implement industry-standard security measures to protect your
              personal information. However, no method of transmission over the
              internet or electronic storage is completely secure, and we cannot
              guarantee absolute security.
            </p>

            <h5>5. Cookies and Tracking Technologies</h5>
            <p>
              Exclusive Travel uses cookies and similar technologies to collect
              information about your interactions with our platform. You can
              manage your preferences related to cookies through your browser
              settings.
            </p>

            <h5>6. Third-Party Links</h5>
            <p>
              Our platform may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these
              third-party sites. We encourage you to review the privacy policies
              of these sites before providing any personal information.
            </p>

            <h5>7. Children&apos;s Privacy</h5>
            <p>
              Exclusive Travel is not intended for individuals under the age of
              18. We do not knowingly collect personal information from
              children. If you believe that a child has provided us with their
              information, please contact us, and we will take appropriate steps
              to remove the information.
            </p>

            <h5>8. Changes to this Privacy Policy</h5>
            <p>
              We may update this Privacy Policy to reflect changes in our
              practices or for legal and regulatory reasons. We will notify you
              of any significant changes through our platform or other
              communication channels.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
