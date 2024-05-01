/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import FundingAgencyCreateForm from "@/components/funding-agency/CreateForm";

type Props = {
  toggler: () => void;
};

const CreateFundingAgency = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Create Funding Agency" toggler={toggler}>
      {/* Funding Agency Create Form */}
      <FundingAgencyCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateFundingAgency;
