/*
 * Created by: Andrew
 * Date created: 10.02.2024
 * Modified by: Andrew
 * Last modified: 03.03.2024
 * Reviewed by:
 * Date Reviewed:
 */

import PageLayout from "@/layout/PageLayout";
import { FaFilePdf, FaLinux, FaWindows } from "react-icons/fa";

/**
 * @description DownloadRdpAgent component
 */
const DownloadRdpAgent = () => {
  // windows agent download handler
  const downloadWidowsAgent = () => {
    const path = `Tuso.exe`;
    const a = document.createElement("a");
    a.href = path;
    a.download = "Tuso.exe";
    a.target = "_blank";
    a.click();
  };

  // linux agent download handler
  const downloadLinuxAgent = () => {
    const path = `Tuso-Installer.sh`;
    const a = document.createElement("a");
    a.href = path;
    a.download = "Tuso-Installer.sh";
    a.target = "_blank";
    a.click();
  };

  // windows manual download handler
  const downloadWindowsManual = () => {
    const path = `TUSO-Desktop-Agent-Installation-Manual.pdf`;
    const a = document.createElement("a");
    a.href = path;
    a.download = "TUSO-Desktop-Agent-Installation-Manual.pdf";
    // a.target = "_blank";
    a.click();
  };

  // linux manual download handler
  const downloadLinuxManual = () => {
    const path = `TUSO-Linux-Agent-Manual.pdf`;
    const a = document.createElement("a");
    a.href = path;
    a.download = "TUSO-Linux-Agent-Manual.pdf";
    // a.target = "_blank";
    a.click();
  };

  return (
    <PageLayout childrenClassName="!bg-bgColor shadow-none">
      <div className="flex items-center justify-center px-5">
        <div className="">
          {/* TITLE */}
          <h1 className="mb-3 font-medium">
            Download Agent or Installation Manual
          </h1>
          <div className="mt-4">
            <div className="grid xs:grid-cols-2 justify-center gap-5 bg-whiteColor py-8 md:py-16 2xl:py-30 px-6 md:px-20 lg:px-28 2xl:px-36 rounded-lg">
              {/* WINDOWS DOWNLOAD BUTTON */}
              <DownloadButton
                icon={<FaWindows size={30} />}
                label="Windows Agent"
                clickHandler={downloadWidowsAgent}
              />

              {/* LINUX DOWNLOAD BUTTON */}
              <DownloadButton
                icon={<FaLinux size={30} />}
                label="Linux Agent"
                clickHandler={downloadLinuxAgent}
              />

              {/* WINDOWS MANUAL DOWNLOAD BUTTON */}
              <DownloadButton
                icon={<FaFilePdf size={30} />}
                label="Windows Manual"
                clickHandler={downloadWindowsManual}
              />

              {/* LINUX MANUAL DOWNLOAD BUTTON */}
              <DownloadButton
                icon={<FaFilePdf size={30} />}
                label="Linux Manual"
                clickHandler={downloadLinuxManual}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

/**
 * @description DownloadButton component
 */
const DownloadButton = ({
  icon,
  label,
  clickHandler,
}: {
  icon: JSX.Element;
  label: string;
  clickHandler?: () => void;
}) => (
  <button
    className="flex flex-col items-center justify-center gap-3 border border-borderColor rounded-lg text-sm px-5 py-5 text-textColor"
    onClick={clickHandler}
  >
    {icon} {label}
  </button>
);

export default DownloadRdpAgent;
