const Input = ({
  type,
  leftIcon,
  rightIcon,
  label,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div className="text-left my-3">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {leftIcon}
        </div>
        <input
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id={name}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
        <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3">
          {rightIcon}
        </div>
      </div>
    </div>
  );
};

export default Input;
