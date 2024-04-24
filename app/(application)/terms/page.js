import Navbar from "@/app/_components/navs/navbar";
import Footer from "@/app/_components/navs/footer";
import BottomNavbar from "@/app/_components/navs/bottom_navbar";

export default function Terms() {
  return (
    <>
      <Navbar />

      <div className="container my-5 px-md-5">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6">Terms Of Use</h1>

            <p>
              Welcome to Exclusive Travel! By accessing or using our mobile
              application or website, you agree to comply with and be bound by
              the following terms and conditions. If you do not agree with these
              terms, please refrain from using our services.
            </p>

            <h5>1. Acceptance of Terms</h5>
            <p>
              By using Exclusive Travel, you acknowledge that you have read,
              understood, and accepted these Terms of Use. We reserve the right
              to modify, update, or change these terms at any time, and it is
              your responsibility to review them periodically.
            </p>

            <h5>2. Use of Services</h5>
            <p>
              Exclusive Travel provides a platform for users to search, book,
              and manage travel services. You agree to use our services for
              lawful purposes only and in accordance with these terms. You must
              not engage in any activities that may disrupt or interfere with
              the functionality of the platform.
            </p>

            <h5>3. User Accounts</h5>
            <p>
              To access certain features, you may be required to create a user
              account. You are responsible for maintaining the confidentiality
              of your account information and ensuring its accuracy. Exclusive
              Travel reserves the right to suspend or terminate accounts that
              violate our terms or pose a security risk.
            </p>

            <h5>4. Booking and Payments</h5>
            <p>
              When making bookings through Exclusive Travel, you agree to
              provide accurate and complete information. Payments are processed
              securely through our designated payment gateways. We are not
              responsible for any errors or discrepancies in the information
              provided during the booking process.
            </p>

            <h5>5. Content and Intellectual Property</h5>
            <p>
              All content provided on Exclusive Travel, including text, images,
              logos, and software, is the property of Exclusive Travel or its
              licensors. You may not reproduce, distribute, or use any content
              without our express written permission.
            </p>

            <h5>6. Privacy Policy</h5>
            <p>
              Your privacy is important to us. Please review our Privacy Policy
              to understand how we collect, use, and protect your personal
              information.
            </p>

            <h5>7. Termination of Services</h5>
            <p>
              Exclusive Travel reserves the right to terminate or suspend
              services at any time without prior notice, for any reason. We are
              not liable for any loss or inconvenience resulting from the
              termination of services.
            </p>

            <h5>8. Limitation of Liability</h5>
            <p>
              In no event shall Exclusive Travel be liable for any direct,
              indirect, incidental, special, or consequential damages arising
              out of or in any way connected with the use of our services.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <BottomNavbar />
    </>
  );
}
