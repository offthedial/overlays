const sceneSwitch = {
  "Empty Scene": {
    targets: [],
    elements: [document.getElementById("scores")],
  },
  "BRB Scene": {
    targets: [],
    elements: [document.getElementById("scores")],
  },
  "Maplist Scene": {
    targets: [],
    elements: [document.getElementById("scores")],
  },
  "Rosters Scene": {
    targets: [],
    elements: [document.getElementById("scores")],
  },
  "Scores Scene": {
    targets: [
      document.getElementById("board-scores"),
      document.getElementById("board-comms"),
    ],
    elements: [document.getElementById("scores")],
  },
};

currentScene.on("change", (newValue, oldValue) => {
  const hide = { targets: [], elements: [] };
  const show = { targets: [], elements: [] };
  if (oldValue) {
    sceneSwitch[oldValue].targets.forEach((element) => {
      if (!sceneSwitch[newValue].targets.includes(element)) {
        hide.targets.push(element);
      }
    });
    sceneSwitch[oldValue].elements.forEach((element) => {
      if (!sceneSwitch[newValue].elements.includes(element)) {
        hide.elements.push(element);
      }
    });
    sceneSwitch[newValue].targets.forEach((element) => {
      if (!sceneSwitch[oldValue].targets.includes(element)) {
        show.targets.push(element);
      }
    });
    sceneSwitch[newValue].elements.forEach((element) => {
      if (!sceneSwitch[oldValue].elements.includes(element)) {
        show.elements.push(element);
      }
    });
  } else {
    Object.values(sceneSwitch).forEach((hide) => {
      anime({
        targets: hide.targets,
        duration: 1,
        scale: 0.9,
        opacity: 0,
        complete: (anim) => {
          hide.elements.forEach((element) => {
            element.style.display = "none";
          });
        },
      });
    });
    sceneSwitch[newValue].targets.forEach((element) => {
      show.targets.push(element);
    });
    sceneSwitch[newValue].elements.forEach((element) => {
      show.elements.push(element);
    });
  }
  anime({
    duration: 300,
    easing: "easeInOutExpo",
    delay: anime.stagger(50),
    targets: hide.targets,
    scale: 0.9,
    opacity: 0,
    complete: (anim) => {
      hide.elements.forEach((element) => {
        element.style.display = "none";
      });
      show.elements.forEach((element) => {
        element.style.display = "flex";
      });
      anime({
        duration: 300,
        easing: "easeInOutExpo",
        delay: anime.stagger(50),
        targets: show.targets,
        scale: 1,
        opacity: 1,
      });
    },
  });
});

// Score Updates
const scoreAname = document.getElementById("score-a-name");
const scoreBname = document.getElementById("score-b-name");
const scoreAscore = document.getElementById("score-a-score");
const scoreBscore = document.getElementById("score-b-score");
const scoreAcolor = document.getElementById("score-a-color");
const scoreBcolor = document.getElementById("score-b-color");
currentTeams.on("change", (newValue, oldValue) => {
  if (!oldValue || oldValue[0].name !== newValue[0].name) {
    subtleFade([scoreAname], newValue[0].name, oldValue);
  }
  if (!oldValue || oldValue[1].name !== newValue[1].name) {
    subtleFade([scoreBname], newValue[1].name, oldValue);
  }
  if (!oldValue || oldValue[0].score !== newValue[0].score) {
    subtleFade([scoreAscore], newValue[0].score, oldValue);
  }
  if (!oldValue || oldValue[1].score !== newValue[1].score) {
    subtleFade([scoreBscore], newValue[1].score, oldValue);
  }
  if (!oldValue || oldValue[0].color !== newValue[0].color) {
    colorFade(scoreAcolor, newValue[0].color, oldValue);
  }
  if (!oldValue || oldValue[1].color !== newValue[1].color) {
    colorFade(scoreBcolor, newValue[1].color, oldValue);
  }
});

// Commentators Updates
const boardComms = document.getElementById("boardComms");
currentCommentators.on("change", (newValue, oldValue) => {
  subtleFade(
    [boardComms],
    newValue.map((comm) => BoardComm(comm.twitter, comm.pronouns)).join(""),
    oldValue,
    "<div></div>"
  );
});

// Flavor Text Updates
const scoresFlavor = document.getElementById("scores-flavor");
currentFlavorText.on("change", (newValue, oldValue) => {
  subtleFade([scoresFlavor], newValue, oldValue);
});

// Components
const BoardComm = (twitter, pronouns) => `
  <div class="textbox--scores__text">
    <div>
      @${twitter}
    </div>
    <div class="textbox--scores__text__pronouns">
      ${pronouns}
    </div>
  </div>
`;
