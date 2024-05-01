import DefaultModal from "@/components/core/modal/DefaultModal";

type Props = {
  toggler: () => void;
};

const CreateModulePermission = ({ toggler }: Props) => {
  return (
    <DefaultModal size="3xl" title="Create Permission" toggler={toggler}>
      {/* <FirstCategoryCreateForm toggler={toggler} /> */}Hello
    </DefaultModal>
  );
};

export default CreateModulePermission;
