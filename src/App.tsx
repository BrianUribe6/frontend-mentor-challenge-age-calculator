import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import AgeForm, { FormValues } from "./components/AgeForm";

type ResultProps = {
  // Overengineered, lol
  [TName in keyof FormValues as `${TName}s`]?: number;
};

type AnimatedCounterProps = {
  duration?: number;
  value: number;
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
    const days = today
      .subtract(years, "year")
      .subtract(months, "month")
      .diff(birthday, "day");

    setAge({ days, months, years });
  };

  return (
    <main className="min-h-screen bg-offWhite p-4 desktop:grid desktop:place-items-center">
      <div className="bg-white mt-20 rounded-3xl rounded-br-[12rem] px-8 py-14 desktop:px-10 max-w-2xl mx-auto desktop:mt-0">
        <AgeForm onSubmit={handleSubmit} />
        <Result {...age} />
      </div>
    </main>
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
          key={`${value}-${label}`}
        >
          <span className="text-purple">
            {Number.isFinite(value) ? (
              <AnimatedCounter value={value!} duration={200} />
            ) : (
              "--"
            )}
          </span>{" "}
          {label}
        </p>
      ))}
    </div>
  );
}

function AnimatedCounter({ value, duration = 1000 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => Math.min(prevCount + 1, value));
      if (count === value) clearInterval(interval);
    }, duration / value);
    return () => clearInterval(interval);
  }, []);
  return <>{count}</>;
}

export default App;
