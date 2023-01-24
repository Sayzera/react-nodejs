import React from "react"

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  dateError,
  handleRegisterChange,
  birtYearOptions,
}) {
  return (
    <>
      {dateError && <div className="input_error">{dateError}</div>}

      <div className="reg_line_header">
        Date of birth <i className="info_icon"></i>
      </div>
      <div
        className="reg_grid"
        style={{
          border: dateError ? "1px solid red" : "",
        }}
      >
        <select name="bDay" defaultValue={bDay} onChange={handleRegisterChange}>
          {Array.from(new Array(31), (val, index) => (
            <option key={index} value={index + 1}>
              {" "}
              {index + 1}{" "}
            </option>
          ))}
        </select>
        <select
          name="bMonth"
          defaultValue={bMonth}
          onChange={handleRegisterChange}
        >
          {Array.from(new Array(12), (val, index) => (
            <option key={index} value={index + 1}>
              {" "}
              {index + 1}{" "}
            </option>
          ))}
        </select>
        <select
          name="bYear"
          defaultValue={bYear}
          onChange={handleRegisterChange}
        >
          {birtYearOptions.map((year) => (
            <option key={year} value={year}>
              {" "}
              {year}{" "}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}
