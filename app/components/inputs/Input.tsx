"use client";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
   id: string;
   label: string;
   type?: string;
   disabled?: boolean;
   logo?: boolean;
   required?: boolean;
   register: UseFormRegister<FieldValues>;
   errors: FieldErrors;
}
const Input: React.FC<InputProps> = ({
   id,
   label,
   type,
   disabled,
   logo,
   required,
   register,
   errors,
}) => {
   return (
      <div className="w-full relative">
         {logo && <BiDollar size={24} className="text-neutral-700 absolute top-5 left-2" />}
         <input
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder=" "
            type={type}
            className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition pl-4 disabled:opacity-70 disabled:cursor-not-allowed  ${
               errors[id]
                  ? "border-rose-500 focus:border-rose-500"
                  : "border-neutral-300 focus:border-neutral-800"
            }`}
         />
         <label
            className={`absolute text-md duration-150 transform -translate-y-3 top-6 z-10 origin-[0] left-4 text-neutral-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 peer-focus:text-neutral-700 ${
               errors[id] ? "text-rose-500" : "text-zinc-400"
            }`}
         >
            {label}
         </label>
      </div>
   );
};
export default Input;
