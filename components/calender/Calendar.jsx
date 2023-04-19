import { useState, useEffect } from "react";
import "./Calendar.css";

const Calendar = ({
  parentTaskFormOpen,
  setParentTaskForm,
  setParentNowDate,
  parentTasks,
  parentTheme,
}) => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [daysArray, setDaysArray] = useState([]);

  const [allTasks, setAllTasks] = useState();

  useEffect(() => {
    setCurrentMonthYear();
  }, []);

  useEffect(() => {
    let daysArrayTemp = [];
    let date = new Date();

    if (currentMonthIndex > 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    }

    if (currentMonthIndex < 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    }

    let firstDayofMonth = new Date(currentYear, currentMonthIndex, 1).getDay();
    let lastDateofMonth = new Date(
      currentYear,
      currentMonthIndex + 1,
      0
    ).getDate();
    let lastDayofMonth = new Date(
      currentYear,
      currentMonthIndex,
      lastDateofMonth
    ).getDay();
    let lastDateofLastMonth = new Date(
      currentYear,
      currentMonthIndex,
      0
    ).getDate();

    /* Getting Days from Previous Month */
    for (let i = firstDayofMonth; i > 0; i--) {
      let x = new Date(
        `${currentYear}-${currentMonthIndex}-${lastDateofLastMonth - i + 1}`
      ).toLocaleDateString();

      daysArrayTemp.push({
        date: lastDateofLastMonth - i + 1,
        class: `prev-month-date`,
        span: allTasks
          ?.map((obj) =>
            x == obj["completionDate"].toLocaleDateString() ? "has-tasks" : ""
          )
          .join(" "),
      });
    }

    /* Getting Days from Current Month */
    for (let i = 1; i <= lastDateofMonth; i++) {
      let x = new Date(
        `${currentYear}-${currentMonthIndex + 1}-${i}`
      ).toLocaleDateString();

      if (
        i === date.getDate() &&
        currentMonthIndex === date.getMonth() &&
        currentYear === date.getFullYear()
      ) {
        daysArrayTemp.push({
          date: i,
          class: `isToday`,
          span: allTasks
            ?.map((obj) =>
              x == obj["completionDate"].toLocaleDateString() ? "has-tasks" : ""
            )
            .join(" "),
        });
      } else {
        daysArrayTemp.push({
          date: i,
          class: ``,
          span: allTasks
            ?.map((obj) =>
              x == obj["completionDate"].toLocaleDateString()
                ? `has-tasks ${parentTheme} `
                : ""
            )
            .join(" "),
        });
      }
    }

    /* Getting Days from Coming Month */
    for (let i = lastDayofMonth; i < 6; i++) {
      let x = new Date(
        `${currentYear}-${currentMonthIndex + 2}-${i - lastDayofMonth + 1}`
      ).toLocaleDateString();

      daysArrayTemp.push({
        date: i - lastDayofMonth + 1,
        class: "prev-month-date",
        span: allTasks
          ?.map((obj) =>
            x == obj["completionDate"].toLocaleDateString() ? "has-tasks" : ""
          )
          .join(" "),
      });
    }

    setDaysArray(daysArrayTemp);
  }, [currentMonthIndex, parentTasks]);

  const monthArray = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const setCurrentMonthYear = () => {
    const date = new Date();
    setCurrentMonthIndex(date.getMonth());
    setCurrentYear(date.getFullYear());
    setParentNowDate({
      date: date.getDate(),
      month: monthArray[date.getMonth()],
    });
  };

  const nextMonth = () => {
    setCurrentMonthIndex(currentMonthIndex + 1);
  };

  const prevMonth = () => {
    setCurrentMonthIndex(currentMonthIndex - 1);
  };

  const openTaskForm = () => {
    setParentTaskForm(!parentTaskFormOpen);
  };

  useEffect(() => {
    if (parentTasks) {
      let tasksObj = parentTasks.map((obj) => ({
        completionDate: new Date(obj["toBeDoneOn"].seconds * 1000),
        title: obj["title"],
        duration: obj["duration"],
        at: new Date(obj["toBeDoneOn"].seconds * 1000).toLocaleTimeString(),
        id: obj["id"],
        isDone: obj["isDone"],
      }));

      setAllTasks(tasksObj);

      if (allTasks) {
        let x = daysArray.map((day, index) => [
          new Date(
            `${currentYear}-${currentMonthIndex}-${day.date}`
          ).toLocaleDateString(),
          index,
          currentMonthIndex,
          currentYear,
          day.date,
        ]);

        let y = allTasks.map((obj) =>
          obj["completionDate"].toLocaleDateString()
        );
      }

      /* `${currentYear}-0${currentMonthIndex}-${daysArray[11].date}` */
    }
  }, [parentTasks, currentMonthIndex, currentYear, daysArray]);

  return (
    <div className={`calendar-container ${parentTheme}`}>
      <div className="calendar-header">
        <h1>Calendar</h1>
        <button
          className={`create-task-btn ${parentTheme}`}
          onClick={openTaskForm}
        >
          <span
            className={`material-icons-round create-task-icon ${parentTheme}`}
          >
            add
          </span>
          <p className={`create-task-btn-label ${parentTheme}`}>Create</p>
        </button>
      </div>
      <div className="calendar">
        <div className="calendar-top">
          <h2 className="calendar-month">
            {monthArray[currentMonthIndex]} {currentYear}
          </h2>
          <div className="prev-next-btn-container">
            <button
              className={`prev-next-btn ${parentTheme}`}
              onClick={prevMonth}
            >
              <span className="material-icons-round ">chevron_left</span>
            </button>

            <button
              className={`prev-next-btn ${parentTheme}`}
              onClick={nextMonth}
            >
              <span className="material-icons-round">chevron_right</span>
            </button>
          </div>
        </div>

        <ul className="calendar-weeks">
          <li>S</li>
          <li>M</li>
          <li>T</li>
          <li>W</li>
          <li>T</li>
          <li>F</li>
          <li>S</li>
        </ul>
        <ul className="calendar-days">
          {daysArray.map((value, index) => (
            <li
              key={index}
              className={`${value.class} calendar-days-elems ${parentTheme}`}
            >
              {value.date}
              <span className={value.span}></span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calendar;
