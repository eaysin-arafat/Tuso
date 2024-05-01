/*
 * Created by: Max
 * Date created: 10.11.2023
 * Modified by: Max
 * Last modified: 03.12.2023
 * Reviewed by:
 * Date Reviewed:
 */

/**
 * PageLayout component
 * @description Component representing a layout for pages with a heading, button, filter, pagination, and children content.
 * @param {Object} heading - Optional heading configuration.
 * @param {string} heading.title - The title of the page.
 * @param {string} heading.subtitle - The subtitle of the page.
 * @param {string} heading.headingClass - Additional CSS class for the heading.
 * @param {Object} button - Optional button configuration.
 * @param {string} button.buttonName - The name of the button.
 * @param {JSX.Element} button.buttonIcon - The icon of the button.
 * @param {() => void} button.onClick - The click handler for the button.
 * @param {JSX.Element} filter - Optional filter component.
 * @param {JSX.Element} children - The children elements of the layout.
 * @param {string} childrenClassName - Additional CSS class for the children container.
 * @param {JSX.Element} pagination - Optional pagination component.
 * @returns {JSX.Element} PageLayout component
 */

type Heading = {
  title: string;
  subtitle?: string;
  headingClass?: string;
};

type Button = {
  buttonName: string;
  buttonIcon: JSX.Element;
  onClick: () => void;
};

type Props = {
  heading?: Heading;
  button?: Button;
  filter?: JSX.Element;
  children: JSX.Element;
  childrenClassName?: string;
  pagination?: JSX.Element;
  isNotCreatePermission?: boolean;
};

const PageLayout = ({
  heading,
  filter,
  children,
  pagination,
  button,
  childrenClassName = "",
  isNotCreatePermission = false,
}: Props) => {
  return (
    <div className="bg-bgColor w-full px-4">
      <div className="flex flex-col">
        {/* Heading */}
        <div
          className={`flex justify-between items-end ${heading?.headingClass}`}
        >
          <div className="pt-2">
            <h1>{heading?.title}</h1>
            {heading?.subtitle && <h5>{heading?.subtitle}</h5>}
          </div>

          {button && !isNotCreatePermission && (
            <button className="main_btn" onClick={button.onClick}>
              {button?.buttonIcon} {button?.buttonName}
            </button>
          )}
        </div>

        {/* Filter */}
        {filter && <div className="leading-[125%] mt-2">{filter}</div>}

        {/* Table */}
        <div
          className={`bg-whiteColor rounded-xl min-w-full my-3 shadow-sm ${childrenClassName}`}
        >
          {children}
          {/* Pagination */}
          {pagination && (
            <div className="mb-4 pl-5 mr-[13px]">{pagination}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
