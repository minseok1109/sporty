import React, { useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Select from "react-select";
import "react-date-picker/dist/DatePicker.css";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: "1px solid black",
    color: state.isSelected ? "blue" : "black",
    padding: 20,
    width: 100,
  }),
  indicatorsContainer: () => ({
    // none of react-select's styles are passed to <Control />
    width: "2rem",
    postion: "relative",
  }),
  valueContainer: (provided, state) => ({
    ...provided,
    height: "1.875rem",
    width: "10rem",
    padding: "0 0.375rem",
  }),
  menu: (provided, state) => ({
    ...provided,
    width: "5rem",
    height: "18rem",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

export default function GetPeople() {
  // 날짜 선택
  const [day, setDay] = useState(new Date());
  // 운동종목 선택
  const [selected_sports_option, set_selected_sports_option] = useState(null);

  // 운동시간 선택
  const [selected_time_option, set_selected_time_option] = useState(null);

  //인원 선택
  const [selected_people_option, set_people_option] = useState(null);

  //상세내용
  const [content, setContent] = useState("");

  //운동종목 State
  const on_change_sports = ({ sports_value }) => {
    set_selected_sports_option(sports_value);
    console.log(sports_value);
  };

  //날짜 State
  const onChangeDay = (day) => {
    setDay(day);
    console.log(day);
  };

  //시간 state
  const on_change_time = ({ time_value }) => {
    set_selected_time_option(time_value);
    console.log(value);
  };

  //인원 state
  const on_change_people = ({ people_value }) => {
    set_people_option(people_value);
    console.log(people_value);
  };

  //상세내용 state
  const onChangeContent = (e) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div>
      <div className="select-container">
        <span>운동종목</span>
        <Select
          defaultValue={selected_sports_option}
          onChange={on_change_sports}
          options={sports_options}
          placeholder={"운동종목을 선택하세요"}
          styles={customStyles}
          name={"sports_value"}
        />
      </div>
      <div className="select-container">
        <span>운동날짜</span>
        <DatePicker onChange={onChangeDay} value={day} format={"y-MM-dd"} />
      </div>
      <div className="select-container">
        <span>운동시간</span>
        <Select
          defaultValue={selected_time_option}
          onChange={on_change_time}
          options={time_options}
          placeholder={"00"}
          styles={customStyles}
        />
        <span>부터</span>
        <Select
          defaultValue={selected_time_option}
          onChange={on_change_time}
          options={time_options}
          placeholder={"00"}
          styles={customStyles}
        />
        <span>까지</span>
      </div>
      <div className="select-container">
        <span>모집인원</span>
        <Select
          defaultValue={selected_people_option}
          onChange={on_change_people}
          options={people_options}
          placeholder={"인원을 선택하세요"}
          styles={customStyles}
        />
      </div>
      <div className="select-container">
        <span>상세내용</span>
        <textarea value={content} onChange={onChangeContent} />
      </div>
      <style jsx>{`
        span {
          padding: 0.625rem;
          margin: 0.625rem;
        }
        .select-container {
          display: flex;
          align-items: center;
          margin: 0.625rem;
        }
      `}</style>
    </div>
  );
}

//종목 옵션
const sports_options = [
  { sports_value: "축구", label: "축구" },
  { sports_value: "농구", label: "농구" },
  { sports_value: "야구", label: "야구" },
  { sports_value: "배구", label: "배구" },
  { sports_value: "풋살", label: "풋살" },
];

//시간 옵션
const time_options = [
  { time_value: "00", label: "00" },
  { time_value: "01", label: "01" },
  { time_value: "02", label: "02" },
  { time_value: "03", label: "03" },
  { time_value: "04", label: "04" },
  { time_value: "05", label: "05" },
  { time_value: "06", label: "06" },
  { time_value: "07", label: "07" },
  { time_value: "08", label: "08" },
  { time_value: "09", label: "09" },
  { time_value: "10", label: "10" },
  { time_value: "11", label: "11" },
  { time_value: "12", label: "12" },
];

// 인원 옵션
const people_options = [
  { people_value: "00", label: "00" },
  { people_value: "01", label: "01" },
  { people_value: "02", label: "02" },
  { people_value: "03", label: "03" },
  { people_value: "04", label: "04" },
  { people_value: "05", label: "05" },
  { people_value: "06", label: "06" },
  { people_value: "07", label: "07" },
  { people_value: "08", label: "08" },
  { people_value: "09", label: "09" },
  { people_value: "10", label: "10" },
];
