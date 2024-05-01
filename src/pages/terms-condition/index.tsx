import PageLayout from "@/layout/PageLayout";
import { Link, useNavigate } from "react-router-dom";

/**
 * @description Terms & Conditions component
 */
const TermsCondition = () => {
  // navigator
  const navigate = useNavigate();

  return (
    <div>
      {/* PAGE LAYOUT */}
      <PageLayout heading={{ title: "Terms & Conditions" }}>
        <div className="w-full px-7 py-5 space-y-3">
          <div className="grid gap-3">
            <div className="uppercase">
              {/* IMPORTANT */}
              <h4 className="font-semibold inline">IMPORTANT&nbsp;: &nbsp;</h4>
              <h5 className="inline text-[12px]">
                PLEASE READ THIS AGREEMENT CAREFULLY BEFORE USING THE TUSO
                REMOTE CONTROL FEATURE. BY INSTALLING OR USING THE TUSO REMOTE
                CONTROL FEATURE, YOU ACCEPT AND AGREE TO BE BOUND BY THE TERMS
                OF THIS EULA. IF YOU DO NOT AGREE TO THESE TERMS, DO NOT USE THE
                TUSO REMOTE CONTROL FEATURE.
              </h5>
            </div>
            <h5>
              This End User License Agreement ("EULA") is a legal agreement
              between you and TUSO Helpdesk Service Provider for the use of the
              TUSO Remote Control Feature. This EULA governs your use of the
              Software and any associated documentation.
            </h5>

            {/* GRANT OF LICENSE */}
            <div>
              <h4 className="mb-1">GRANT OF LICENSE</h4>
              <h5>
                Subject to your compliance with the terms and conditions of this
                EULA, the Provider grants you a limited, non-exclusive,
                non-transferable, and revocable license to use the Software
                solely for the purpose of enabling the Provider's helpdesk
                service to remotely control the Client Device (as defined below)
                whenever it is required, as specified in this EULA.
              </h5>
            </div>

            {/* DEFINITIONS */}
            <div>
              <h4 className="mb-1">DEFINITIONS</h4>
              <h5>
                2.1 "Client Device" refers to the device owned or controlled by
                the Client that may be remotely controlled by the Provider's
                helpdesk service using the Software.
              </h5>
            </div>

            {/* USE OF SOFTWARE */}
            <div>
              <h4 className="mb-1">USE OF SOFTWARE</h4>
              <h5>
                3.1 Use of the Software. The Software is provided to the Client
                solely for the purpose of facilitating remote control of the
                Client Device by the Provider's helpdesk service whenever it is
                required, subject to the Client's ongoing consent.
              </h5>
            </div>

            <h5>
              3.1 Use of the Software. The Software is provided to the Client
              solely for the purpose of facilitating remote control of the
              Client Device by the Provider's helpdesk service whenever it is
              required, subject to the Client's ongoing consent.
            </h5>

            {/* RESTRICTIONS */}
            <div>
              <h4 className="mb-1">RESTRICTIONS</h4>
              <div className="space-y-2">
                <h5>
                  2.1 "Client Device" refers to the device owned or controlled
                  by the Client that may be remotely controlled by the
                  Provider's helpdesk service using the Software.
                </h5>
                <h5>
                  4.2 Remove, alter, or obscure any proprietary notices or
                  labels on the Software.
                </h5>
                <h5>
                  4.3 Transfer, sublicense, lease, lend, rent, or otherwise
                  distribute the Software to any third party without the prior
                  written consent of the Provider.
                </h5>
              </div>
            </div>

            {/* TERMINATION */}
            <div>
              <h4 className="mb-1">TERMINATION</h4>
              <h5>
                This EULA is effective until terminated. The Provider may
                terminate this EULA if the Client fails to comply with any of
                the terms and conditions herein. Upon termination, all rights
                granted to the Client under this EULA will cease, and the Client
                must immediately cease using the Software.
              </h5>
            </div>

            {/* DISCLAIMER OF WARRANTY */}
            <div>
              <h4 className="mb-1">DISCLAIMER OF WARRANTY</h4>
              <h5>
                THE SOFTWARE IS PROVIDED "AS IS" WITHOUT ANY WARRANTY OF ANY
                KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                PARTICULAR PURPOSE, OR NON INFRINGEMENT.
              </h5>
            </div>

            {/* LIMITATION OF LIABILITY */}
            <div>
              <h4 className="mb-1">LIMITATION OF LIABILITY</h4>
              <h5>
                IN NO EVENT SHALL THE PROVIDER OR ITS LICENSORS BE LIABLE FOR
                ANY DAMAGES, INCLUDING BUT NOT LIMITED TO DIRECT, INDIRECT,
                SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, ARISING OUT OF
                THE USE OR INABILITY TO USE THE SOFTWARE.
              </h5>
            </div>

            {/* MISCELLANEOUS */}
            <div>
              <h4 className="mb-1">MISCELLANEOUS</h4>
              <h5>
                8.1 Entire Agreement. This EULA constitutes the entire agreement
                between the Client and the Provider and supersedes any prior or
                contemporaneous understandings regarding the Software.
              </h5>
            </div>

            <h5>
              By installing or using the TUSO Remote Control Feature, the Client
              acknowledges that they have read and understood this EULA, and
              they agree to be bound by its terms.
            </h5>
          </div>
        </div>
      </PageLayout>

      {/* REJECT BUTTON */}
      <div className="flex gap-5 bg-bgColor py-4 px-4">
        <button
          onClick={() => navigate(-1)}
          className="main_btn px-9 bg-redColor hover:bg-redColor"
        >
          No
        </button>

        {/* ACCEPT BUTTON */}
        <Link to="/download-rdp-agent" className="main_btn px-8">
          Accept
        </Link>
      </div>
    </div>
  );
};

export default TermsCondition;
