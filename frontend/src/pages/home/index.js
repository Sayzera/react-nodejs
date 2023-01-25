import React, { useRef } from "react"
import { useSelector } from "react-redux"
import Header from "../../components/header"
import useClickOutside from "../../helpers/clickOutside"
import { selectVisibleHeaderCard } from "../../reducers/generalSlice"

export default function Home() {
  const el = useRef()
  const visible = useSelector(selectVisibleHeaderCard)
  useClickOutside(el, () => {
    if (!visible) return
    el.current.style.display = "none"
  })

  return (
    <div>
      <Header />
      {visible && <div className="my-card" ref={el}></div>}
    </div>
  )
}
