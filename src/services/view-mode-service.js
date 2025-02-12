document.addEventListener("DOMContentLoaded", function () {
  const toggleTheme = document.querySelector(".toggle")
  const html = document.documentElement

  const getMode = localStorage.getItem("theme")

  if (getMode) {
    html.classList.add(getMode)
  } else {
    html.classList.add("light")
  }

  toggleTheme.addEventListener("click", function () {

    if (html.classList.contains("light")) {
      html.classList.remove("light")
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      html.classList.add("light")
      localStorage.setItem("theme", "light")
    }
  })
})
