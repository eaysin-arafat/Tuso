/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import CountryEditForm from "@/components/country/edit/EditForm";

type Props = {
  toggler: () => void;
};

const EditCountry = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Edit Country" toggler={toggler}>
      {/* Country Edit Form  */}

      <CountryEditForm toggler={toggler} />
    </DefaultModal>
  );
};

export default EditCountry;
