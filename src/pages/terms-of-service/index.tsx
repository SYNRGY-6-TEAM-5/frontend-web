import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TermsOfService = () => {
  const navigate = useNavigate();

  const [isChecked, setChecked] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contentElement = document.querySelector(".content");

      if (contentElement) {
        const isScrolledToBottom =
          contentElement.scrollHeight - contentElement.scrollTop - 1 >=
          contentElement.clientHeight;

        setShowScrollButton(isScrolledToBottom);
      }
    };

    const contentElement = document.querySelector(".content");

    if (contentElement) {
      contentElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (contentElement) {
        contentElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToBottom = () => {
    document.querySelector(".content")?.scrollTo({
      top: document.querySelector(".content")?.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="min-h-screen w-[500px] pt-12 font-sans">
          <div className="content max-h-[calc(100vh-200px)] overflow-y-scroll p-4">
            {/* section terms of service */}
            <p className="mb-1 text-sm font-normal text-gray-500">
              Latest update Dec 2023
            </p>
            <h1 className="mb-6 text-2xl font-medium text-black">
              Terms of Service
            </h1>

            <h2 className="mb-2 text-sm font-medium text-black">1. Terms</h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              By accessing this Website, accessible from www.aeroswift.com, you
              are agreeing to be bound by these Website Terms and Conditions of
              Use and agree that you are responsible for the agreement with any
              applicable local laws. If you disagree with any of these terms,
              you are prohibited from accessing this site. The materials
              contained in this Website are protected by copyright and trade
              mark law.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              2. Use License
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              Permission is granted to temporarily download one copy of the
              materials on Aero Swift's Website for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>

            <ul className="mb-3 list-disc pl-4 text-sm font-normal text-gray-700">
              <li>Modify or copy the materials;</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display;
              </li>
              <li>
                Attempt to reverse engineer any software contained on Aero
                Swift's Website;
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials; or
              </li>
              <li>
                Transferring the materials to another person or "mirror" the
                materials on any other server.
              </li>
            </ul>

            <p className="mb-3 text-sm font-normal text-gray-700">
              This will let Aero Swift to terminate upon violations of any of
              these restrictions. Upon termination, your viewing right will also
              be terminated and you should destroy any downloaded materials in
              your possession whether it is printed or electronic format. These
              Terms of Service has been created with the help of the{" "}
              <a href="https://www.termsofservicegenerator.net">
                Terms Of Service Generator
              </a>
              .
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              3. Disclaimer
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              All the materials on Aero Swift's Website are provided "as is".
              Aero Swift makes no warranties, may it be expressed or implied,
              therefore negates all other warranties. Furthermore, Aero Swift
              does not make any representations concerning the accuracy or
              reliability of the use of the materials on its Website or
              otherwise relating to such materials or any sites linked to this
              Website.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              4. Limitations
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              Aero Swift or its suppliers will not be hold accountable for any
              damages that will arise with the use or inability to use the
              materials on Aero Swift's Website, even if Aero Swift or an
              authorize representative of this Website has been notified, orally
              or written, of the possibility of such damage. Some jurisdiction
              does not allow limitations on implied warranties or limitations of
              liability for incidental damages, these limitations may not apply
              to you.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              5. Revisions and Errata
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              The materials appearing on Aero Swift's Website may include
              technical, typographical, or photographic errors. Aero Swift will
              not promise that any of the materials in this Website are
              accurate, complete, or current. Aero Swift may change the
              materials contained on its Website at any time without notice.
              Aero Swift does not make any commitment to update the materials.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">6. Links</h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              Aero Swift has not reviewed all of the sites linked to its Website
              and is not responsible for the contents of any such linked site.
              The presence of any link does not imply endorsement by Aero Swift
              of the site. The use of any linked website is at the user's own
              risk.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              7. Site Terms of Use Modifications
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              Aero Swift may revise these Terms of Use for its Website at any
              time without prior notice. By using this Website, you are agreeing
              to be bound by the current version of these Terms and Conditions
              of Use.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              8. Your Privacy
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              Please read our Privacy Policy.
            </p>

            <h2 className="mb-2 text-sm font-medium text-black">
              9. Governing Law
            </h2>

            <p className="mb-3 text-sm font-normal text-gray-700">
              Any claim related to Aero Swift's Website shall be governed by the
              laws of id without regards to its conflict of law provisions.
            </p>
          </div>

          {/* section scroll button */}
          {showScrollButton && (
            <div className="scroll-button absolute bottom-44 left-1/2 -translate-x-1/2 transform">
              <div
                className="flex h-14 w-14 cursor-pointer items-center rounded-full bg-primary-500 p-4"
                onClick={scrollToBottom}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-8 w-8 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  ></path>
                </svg>
              </div>
            </div>
          )}

          {/* checkbox dan button continue */}
          <div className="mt-6 px-4 xs:px-2">
            <label className="flex items-center justify-center gap-2 text-sm font-medium text-black xs:justify-start">
              <input
                type="checkbox"
                name=""
                id=""
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span>I accept and agree to the Terms of Service</span>
            </label>
            <button
              className="mt-4 w-full rounded-xl bg-primary-500 py-4 text-sm text-white disabled:bg-gray-300"
              disabled={!isChecked}
              onClick={() => {
                navigate(-1);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
