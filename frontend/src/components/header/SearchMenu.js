import React, { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import useClickOutside from "../../helpers/clickOutside"
import { setShowSearchMenu } from "../../reducers/generalSlice"

import Return from "../../svg/return"
import Search from "../../svg/search"
export default function SearchMenu() {
  const menu = useRef(null)
  const input = useRef(null)
  const [iconVisible, setIconVisible] = useState(true)
  const dispatch = useDispatch()
  useClickOutside(menu, () => {
    dispatch(setShowSearchMenu(false))
  })
  const color = "#65676b"
  return (
    <div
      className="header_left search_area scrollbar 
    absolute  flex flex-col items-start gap-[6px] bg-primary shadow-lg
    z-40 min-h-[400px] max-h-[70vh]  min-w-[310px]
    "
      style={{
        padding: "8px 16px 10px 6px",
      }}
      ref={menu}
    >
      <div className="search_wrap flex items-center gap-[6px] w-full">
        <div className="header_logo">
          <div className="circle hover1">
            <Return color={color} />
          </div>
        </div>
        <div
          className="search search1 flex items-center justify-center gap-[8px] 
         bg-forth pt-[10px] pr-[32px] pb-[10px] pl-[10px]
         rounded-full cursor-text w-full
         "
          onClick={() => {
            input.current.focus()
            setIconVisible(false)
          }}
        >
          {iconVisible && (
            <div>
              <Search color={color} />
            </div>
          )}

          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input outline-none border-none bg-transparent text-[15px]
            placeholder:translate-y-[-1px] w-full
            "
            ref={input}
            style={{
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>
      <div
        className="search_history_header 
      w-full flex items-center justify-between p-[10px] text-[14px]
      "
      >
        <span className="font-[700] text-[16px]">Recent Searches</span>
        <a href="" className="cursor-pointer text-blue">
          Edit
        </a>
      </div>
      <div className="span_history w-full"></div>
      <div className="search_results scrollbar"></div>
    </div>
  )
}
