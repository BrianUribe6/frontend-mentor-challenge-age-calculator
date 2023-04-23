import { useEffect } from "react";
import { RegisterOptions, useForm } from "react-hook-form";
import IconArrow from "./IconArrow";
import Input from "./Input";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export type FormValues = {
  day: number;
  month: number;
  year: number;
};

type FormProps = {
  onSubmit?(data: FormValues): void;
};

export default function AgeForm({ onSubmit }: FormProps) {
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const handleValidSubmit = (data: FormValues) => {
    onSubmit?.(data);
  };

  useEffect(() => setFocus("day"), []);

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} noValidate>
      <div className="grid grid-cols-3 gap-4 max-w-md">
        <Input
          type="number"
          label="Day"
          placeholder="DD"
          error={errors.day}
          helperText={errors.day?.message}
          {...register("day", {
            required: "Day is required",
            min: { value: 1, message: "Must be a valid day" },
            max: { value: 31, message: "Must be a valid day" },
            validate: {
              isValidDate(_, { day, month, year }) {
                if (!day || !month || !year) return true;
                const padZero = (value: number) =>
                  value.toString().padStart(2, "0");

                // pad month and day to 2 digits, to allow for 1 digit months and days
                const date = dayjs(
                  `${year}-${padZero(month)}-${padZero(day)}`,
                  "YYYY-MM-DD",
                  true
                );

                return date.isValid() || "Must be a valid date";
              },
            },
          })}
        />
        <Input
          type="number"
          label="Month"
          placeholder="MM"
          error={errors.month}
          helperText={errors.month?.message}
          {...register("month", {
            required: "Month is required",
            min: { value: 1, message: "Must be a valid month" },
            max: { value: 12, message: "Must be a valid month" },
            deps: ["day", "year"],
          })}
        />
        <Input
          type="number"
          label="Year"
          placeholder="YYYY"
          error={errors.year}
          helperText={errors.year?.message}
          {...register("year", {
            required: "Year is required",
            min: { value: 1, message: "Must be a valid year" },
            validate: {
              isPast(_, { day, month, year }) {
                if (!day || !month || !year) return true;

                const date = dayjs(`${year}-${month}-${day}`);
                const today = dayjs();
                return date.isBefore(today) || "Must be in the past";
              },
            },
            deps: ["day"],
          })}
        />
      </div>
      <div className="relative text-center desktop:text-end my-9">
        <div
          className="h-[1px] bg-lightGray absolute 
          left-0 right-0 top-1/2"
        />
        <button
          type="submit"
          className="bg-purple rounded-full p-5 hover:bg-offBlack relative"
          aria-label="calculate"
        >
          <IconArrow className="text-2xl desktop:stroke-2 desktop:text-4xl stroke-[4]" />
        </button>
      </div>
    </form>
  );
}
