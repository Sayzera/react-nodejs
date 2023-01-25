import React, { useRef } from "react"
import { Link } from "react-router-dom"
import Logo from "../../svg/logo"
import Search from "../../svg/search"
import Friends from "../../svg/friends"
import Watch from "../../svg/watch"
import Market from "../../svg/market"
import Gaming from "../../svg/gaming"
import HomeActive from "../../svg/homeActive"
import { useDispatch, useSelector } from "react-redux"
import { selectUser } from "../../reducers/userSlice"
import Menu from "../../svg/menu"
import Messenger from "../../svg/messenger"
import Notifications from "../../svg/notifications"
import ArrowDown from "../../svg/arrowDown"
import SearchMenu from "./SearchMenu"
import {
  selectShowSearchMenu,
  setShowSearchMenu,
} from "../../reducers/generalSlice"
export default function Header() {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)
  const color = "#65676b"
  const showSearchMenu = useSelector(selectShowSearchMenu)

  return (
    <header className="fixed top-0 h-[56px] z-50 bg-primary w-full shadow-sm grid  grid-cols-1  md:grid-cols-3 text-primary ">
      <div className="header_left flex items-center gap-2 py-[5px] px-4">
        <Link to={"/"} className="header_logo">
          <div className="circle">
            <Logo />
          </div>
        </Link>

        <div
          className="search search1 flex items-center justify-center gap-[8px] 
         bg-forth pt-[10px] pr-[32px] pb-[10px] pl-[10px]
         rounded-full cursor-text
         "
          onClick={() => {
            dispatch(setShowSearchMenu(true))
          }}
        >
          <Search color={color} />
          <input
            type="text"
            placeholder="Search Facebook"
            className="hide_input outline-none border-none bg-transparent text-[15px]
            placeholder:translate-y-[-1px]
            "
            style={{
              fontFamily: "inherit",
            }}
          />
        </div>
      </div>

      {showSearchMenu && <SearchMenu />}
      <div className="header_middle flex items-center gap-[14px] translate-x-[3px]">
        <Link
          to={"/"}
          className="middle_icon active
          "
        >
          <HomeActive />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Friends color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Watch color={color} />
          <div
            className="middle_notification absolute top-0 right-[1.9rem]
        bg-red-500 py-[1px] px-[5px] text-xs rounded-full text-white  


          "
          >
            9+
          </div>
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Market color={color} />
        </Link>
        <Link to={"/"} className="middle_icon hover1">
          <Gaming color={color} />
        </Link>
      </div>
      <div className="header_right flex justify-between md:justify-start mt-8 md:mt-0 md:absolute right-0 top-[50%] translate-y-[-50%]">
        <Link
          to={"/profile"}
          className="profile_link hover1 flex items-center gap-[5px] cursor-pointer rounded-full
          text-[14px] mr-[10px]
          "
          style={{
            padding: "3px 10px 3px 6px",
            lineHeight: "19px",
          }}
        >
          <img
            src={user?.picture}
            alt=""
            className="w-[28.7px] h-[28.7px] rounded-full "
            style={{
              border: "1px solid #b0b3b8",
            }}
          />
          <span className="mb-[3px]">{user?.first_name}</span>
        </Link>
        <div className="circle_icon">
          <Menu />
        </div>
        <div className="circle_icon">
          <Messenger />
        </div>
        <div className="circle_icon">
          <Notifications />
          <div
            className="right_notification absolute -top-2 -right-1 
          h-5 w-5 flex 
          items-center justify-center bg-red-500 rounded-full text-white text-xs"
          >
            5
          </div>
        </div>
        <div className="circle_icon">
          <ArrowDown />
        </div>
      </div>
    </header>
  )
}
