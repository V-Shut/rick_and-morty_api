import Select, { StylesConfig, SingleValue, ActionMeta, GroupBase } from "react-select";

// Визначте тип для вашого Select
type OptionType = { value: string; label: string };

interface Props {
  sortParam: (value: string) => void;
}

const customStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FAFBFC" : "#fff",
    boxShadow: "none",
    borderColor: "#B4BDC3",
    borderRadius: '8px',
    fontFamily: "Mont, sans-serif",
    fontSize: "14px",
    outline: "none",
    width: "128px",
    height: "30px",
    "&:hover": {
      borderColor: "#89939A",
    },
    "&:focus": {
      borderColor: "#313237",
      backgroundColor: "#313237",
    },
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: "#89939A",
  }),
  option: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    color: "#89939A",
    fontFamily: "Mont, sans-serif",
    fontSize: "14px",
    fontWeight: "500",
    "&:hover": {
      backgroundColor: "#f8f9fa",
      color: "#313237",
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    display: "none",
  }),
  // Додайте інші стилі тут, якщо потрібно
};

const options: OptionType[] = [
  { value: "no", label: "No Sorting" },
  { value: "name", label: "Name" },
  { value: "species", label: "Species" },
  { value: "status", label: "Status" },
  { value: "gender", label: "Gender" },
];

export const ReactSelect: React.FC<Props> = ({ sortParam }) => (
  <Select
    options={options}
    defaultValue={options[0]}
    isSearchable={false}
    styles={customStyles}
    onChange={(newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => {
      if (newValue) {
        sortParam(newValue.value);
      }
    }}
  />
);
