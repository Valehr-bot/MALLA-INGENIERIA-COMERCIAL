document.addEventListener("DOMContentLoaded", () => {
  const courses = document.querySelectorAll(".course");

  const isApproved = code =>
    localStorage.getItem(`approved-${code}`) === "true";

  const updateStates = () => {
    courses.forEach(c => {
      const code = c.dataset.code;
      if (isApproved(code)) {
        c.classList.add("approved");
      } else {
        c.classList.remove("approved");
      }
      const pre = c.dataset.prereq;
      if (pre && !isApproved(pre)) {
        c.classList.add("locked");
      } else {
        c.classList.remove("locked");
      }
    });
  };

  courses.forEach(c => {
    c.addEventListener("click", () => {
      if (c.classList.contains("locked")) return;
      const code = c.dataset.code;
      const aprovedNow = !isApproved(code);
      localStorage.setItem(`approved-${code}`, aprovedNow);
      updateStates();
    });
  });

  updateStates();
});

