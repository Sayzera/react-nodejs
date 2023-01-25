import { useEffect } from "react"

export default function useClickOutside(ref, fun) {
  useEffect(() => {
    const listener = (e) => {
      // Do nothing if clicking ref's element or descendent elements
      if (ref?.current?.contains(e.target)) {
        return
      }

      //exits function
      if (typeof fun === "function") fun()
    }
    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref])
}
