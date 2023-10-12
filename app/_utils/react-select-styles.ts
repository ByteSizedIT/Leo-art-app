// The recommended way to provide custom styles to react-select is to use the styles prop. styles takes an object with keys to represent the various inner components that react-select is made up of. Each inner component takes a callback function with the following signature:

// <Select
//   styles={{
//     control: (baseStyles, state) => ({
//       ...baseStyles,
//       borderColor: state.isFocused ? 'grey' : 'red',
//     }),
//   }}
// />

// The first argument is an object with the base styles. Spreading the base styles into your returned object lets you extend it however you like while maintaining existing styles. Alternatively, you can omit the provided styles and completely take control of the component's styles.

// The second argument is the current state (features like isFocused, isSelected etc). This allows you to implement dynamic styles for each of the components.

export const customStyles = {
  container: (base: any) => ({
    ...base,
    flex: 1,
    width: "100%",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    // "*": {
    //   boxShadow: "none !important",
    // },
    boxShadow: "none",
    borderWidth: "0.125rem",
    borderRadius: "0.5rem",
    borderColor: state.isFocused ? "#64748B" : "#e5e7eb",
    "&:hover": {
      borderColor: state.isFocused ? "#64748B" : "#e5e7eb",
    },
    marginLeft: "0.5rem",
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#FFC000"
      : state.isFocused
      ? "#EDA7FF"
      : base.backgroundColor,
    "&:hover": {
      backgroundColor: state.isSelected ? "#FFC000" : "#EDA7FF",
    },
  }),
};
