import { useState } from "react";
import { useForm } from "react-hook-form";
import IconArrow from "./components/IconArrow";
import Input from "./components/Input";
import dayjs from "dayjs";

type FormValues = {
  day: number;
  month: number;
  year: number;
};

type ResultProps = {
  // Overengineered, lol
  [TName in keyof FormValues as `${TName}s`]?: number;
};

type FormProps = {
  onSubmit?(data: FormValues): void;
};

function App() {
  const [age, setAge] = useState<ResultProps>({});

  const handleSubmit = ({ day, month, year }: FormValues) => {
    // Display age in years, months and days since the given date, e.g.
    // between 05/28/1998 and 04/15/2023, the age is 24 years, 10 months and 18 days
    const today = dayjs();
    const birthday = dayjs(`${year}-${month}-${day}`);
    const years = today.diff(birthday, "year");
    const months = today.subtract(years, "year").diff(birthday, "month");

    console.log("Today - years", today.subtract(years, "year").toString());
    console.log(
      "Today - years - months",
      today.subtract(years, "year").subtract(months, "month").toString()
    );

    const days = today
      .subtract(years, "year")
      .subtract(months, "month")
      .diff(birthday, "day");

    setAge({ days, months, years });
  };

  return (
    <main className="min-h-screen bg-offWhite p-4">
      <div className="bg-white mt-20 rounded-3xl rounded-br-[5rem] px-8 py-14 desktop:px-10 max-w-2xl mx-auto">
        <Form onSubmit={handleSubmit} />
        <Result {...age} />
      </div>
    </main>
  );
}

function Form({ onSubmit }: FormProps) {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
  });

  const handleValid: Parameters<typeof handleSubmit>[0] = (data) => {
    onSubmit?.(data);
  };

  const handleInvalid = () => {
    // Clear error messages, but display generic error on the first invalid field
    setError("month", {});
    setError("year", {});
    setError("day", { message: "Must be a valid date" });
  };

  return (
    <form onSubmit={handleSubmit(handleValid, handleInvalid)} noValidate>
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
            min: { value: 1, message: "year cannot be negative" },
            max: {
              value: new Date().getFullYear() - 1,
              message: "Must be in the past",
            },
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

function Result({ days, months, years }: ResultProps) {
  const results = [
    { value: years, label: "years" },
    { value: months, label: "months" },
    { value: days, label: "days" },
  ];

  return (
    <div className="space-y-3">
      {results.map(({ value, label }) => (
        <p
          className="text-5xl desktop:text-6xl font-extrabold italic"
          key={label}
        >
          <span className="text-purple">{value ?? "--"}</span> {label}
        </p>
      ))}
    </div>
  );
}

export default App;
