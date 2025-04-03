import { useState } from "react";

export default function CustomCheckbox({ checked, onChange }) {
  //   const [checked, setChecked] = useState(false);

  return (
    <label className="relative flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-8 h-8 rounded-md border-2 border-gray-300 peer-checked:bg-black peer-checked:border-black flex items-center justify-center transition-all">
        {checked && (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        )}
      </div>
    </label>
  );
}
