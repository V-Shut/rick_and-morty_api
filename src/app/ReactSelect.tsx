import Select, { StylesConfig } from "react-select";

interface Props {
  sortParam: (value: string) => void;
}

const customStyles: StylesConfig = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "#FAFBFC" : "#fff",
    boxShadow: "none",
    borderColor: "#B4BDC3",
    fontFamily: "Mont, sans-serif",
    fontSize: "14px",
    outline: "none",
    width: "128px",
    hight: "30px",
    "&:hover": {
      borderColor: "#89939A",
    },
    "&:focus": {
      borderColor: "#313237",
      backgroundColor: "#313237",
    },
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
};

const options = [
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
    onChange={(e) => sortParam(e.value)}
  />
);
