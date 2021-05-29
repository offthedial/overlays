// Replicants
const currentCommentators = nodecg.Replicant(
  "currentCommentators",
  "cq-overlay-controls"
);
const currentFlavorText = nodecg.Replicant(
  "currentFlavorText",
  "cq-overlay-controls"
);
const currentMaps = nodecg.Replicant("currentMaps", "cq-overlay-controls");
const currentMusic = nodecg.Replicant("currentMusic", "cq-overlay-controls");
const currentRosters = nodecg.Replicant(
  "currentRosters",
  "cq-overlay-controls"
);
const currentScene = nodecg.Replicant("currentScene", "cq-overlay-controls");
const currentTeams = nodecg.Replicant("currentTeams", "cq-overlay-controls");
const loadedData = nodecg.Replicant("loadedData", "cq-overlay-controls");

// Fades
const subtleFade = (elements, value, oldValue = true, html = false) => {
  elements.forEach((element) => {
    const tl = anime.timeline({
      targets: elements,
      backgroundColor: value,
      duration: 300,
      easing: "easeInOutSine",
    });

    console.log(measureText(value, element, html));
    if (oldValue) {
      tl.add({
        opacity: 0,
        complete: (anim) => {
          if (html) {
            element.innerText = "\xa0";
          } else {
            element.innerHTML = html;
          }
        },
      })
        .add({
          minWidth: measureText(value, element, html),
          complete: (anim) => {
            if (html) {
              element.innerHTML = value;
            } else {
              element.innerText = value;
            }
          },
        })
        .add({
          opacity: 1,
        });
    } else {
      tl.add({
        opacity: 1,
        complete: (anim) => {
          if (html) {
            element.innerHTML = value;
          } else {
            element.innerText = value;
          }
        },
      });
    }
  });
};

const colorFade = (elements, value) => {
  anime({
    targets: elements,
    backgroundColor: value,
    duration: 300,
    easing: "easeInOutSine",
  });
};

const measureText = (text, element, html = false) => {
  const measurer = document.createElement("div");
  measurer.style.position = "absolute";
  measurer.style.top = "1100px";
  measurer.style.opacity = "0";
  measurer.style.zIndex = "-99999";
  if (!html) {
    measurer.style.padding = 0;
  }
  measurer.classList = element.classList;
  if (html) {
    measurer.innerHTML = text;
  } else {
    measurer.innerText = text;
  }
  document.body.appendChild(measurer);
  let width = measurer.getBoundingClientRect().width;
  measurer.parentNode.removeChild(measurer);
  console.log(width);
  return width;
};
