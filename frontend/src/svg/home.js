import React from "react"

function Home({ color }) {
  return (
    <svg width="28" height="28" fill={color} viewBox="0 0 28 28">
      <path d="M17.5 23.979h3.75c.136 0 .25-.115.25-.25v-9.75c0-.552.449-1 1-1h1.83L14.017 4.046 3.672 12.979H5.5a1 1 0 011 1v9.75c0 .135.115.25.25.25h3.75v-6.25c0-.689.561-1.25 1.25-1.25h4.5c.689 0 1.25.561 1.25 1.25v6.25zm3.75 1.5H17a1 1 0 01-1-1v-6.152a.348.348 0 00-.348-.348h-3.304a.348.348 0 00-.348.348v6.152a1 1 0 01-1 1H6.75A1.75 1.75 0 015 23.729v-9.25H3.069c-.502 0-.99-.264-1.201-.72a1.243 1.243 0 01.307-1.469l10.826-9.378c.247-.237.607-.385.988-.391.403.006.764.154 1.038.416l10.794 9.349.004.004c.419.368.546.955.308 1.469-.212.456-.699.72-1.202.72H23v9.25a1.75 1.75 0 01-1.75 1.75z"></path>
    </svg>
  )
}

export default Home
