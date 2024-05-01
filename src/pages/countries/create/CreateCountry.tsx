/*
 * Created by: Max
 * Date created: 10.01.2024
 * Modified by: Max
 * Last modified: 05.02.2024
 * Reviewed by:
 * Date Reviewed:
 */

import DefaultModal from "@/components/core/modal/DefaultModal";
import CountryCreateForm from "@/components/country/create/CreateForm";

type Props = {
  toggler: () => void;
};

const CreateCountry = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Add Country" toggler={toggler}>
      {/* Country Create form  */}

      <CountryCreateForm toggler={toggler} />
    </DefaultModal>
  );
};

export default CreateCountry;
