import "./style.css"
import React, { useEffect, useState } from "react"
import { useField, ErrorMessage } from "formik"
export default function RegisterInput({ placeholder, bottom, ...props }) {
  const [isDesktop, setIsDesktop] = useState(false)
  const [field, meta] = useField(props)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 850) {
        setIsDesktop(true)
        console.log("work")
      } else {
        setIsDesktop(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className="input_wrap">
      {meta.touched && meta.error && !bottom && (
        <div
          className={
            isDesktop ? "input_error input_error_desktop" : "input_error"
          }
          style={{
            transform: "translateY(5px)",
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_top"></div>
          )}
        </div>
      )}

      <input
        className={meta.touched && meta.error ? "input_error_border" : ""}
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />

      {meta.touched && meta.error && bottom && (
        <div
          className={
            isDesktop ? "input_error input_error_desktop" : "input_error"
          }
          style={{
            transform: "translateY(5px)",
          }}
        >
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
          {meta.touched && meta.error && (
            <div className="error_arrow_bottom"></div>
          )}
        </div>
      )}
      {meta.touched && meta.error && (
        <i
          className="error_icon"
          style={{
            top: `${!bottom && !isDesktop && "63%"}} `,
          }}
        ></i>
      )}
    </div>
  )
}
