import dayjs from "dayjs";
import { useState } from "react";
import AgeForm, { FormValues } from "./components/AgeForm";

type ResultProps = {
  // Overengineered, lol
  [TName in keyof FormValues as `${TName}s`]?: number;
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
    <main className="min-h-screen bg-offWhite p-4">
      <div className="bg-white mt-20 rounded-3xl rounded-br-[5rem] px-8 py-14 desktop:px-10 max-w-2xl mx-auto">
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
          key={label}
        >
          <span className="text-purple">{value ?? "--"}</span> {label}
        </p>
      ))}
    </div>
  );
}

export default App;
