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

// Scene Switcher
let tl = anime.timeline({
  duration: 300,
  easing: "easeInOutExpo",
  delay: anime.stagger(50),
});

const scores = document.getElementById("scores");
const switchScores = (action) => {
  if (action === "hide") {
    scores.style.display = "none";
  } else if (action === "show") {
    scores.style.display = "flex";
  }
};
const scene = document.getElementById("scene");
const switchScene = (action) => {
  if (action === "hide") {
    scene.style.display = "none";
  } else if (action === "show") {
    scene.style.display = "flex";
  }
};
const sceneBrb = document.getElementById("scene-brb");
const switchSceneBrb = (action) => {
  if (action === "hide") {
    sceneBrb.style.display = "none";
  } else if (action === "show") {
    sceneBrb.style.display = "flex";
  }
};
const sceneInfo = document.getElementById("scene-info");
const sceneInfoTargets = [];
const switchSceneInfo = (action) => {
  if (action === "hide") {
    // anime({
    //   targets:
    // })
    sceneInfo.style.display = "none";
  } else if (action === "show") {
    sceneInfo.style.display = "flex";
  }
};
const sceneInfoRosters = document.getElementById("scene-info-rosters");
const sceneInfoRostersTargets = [
  document.getElementById("scene-info-roster-a"),
  document.getElementById("scene-info-roster-vs"),
  document.getElementById("scene-info-roster-b"),
];
const switchSceneInfoRosters = (action) => {
  if (action === "hide") {
    console.log("roster hide");
    tl = tl.add({
      targets: sceneInfoRostersTargets,
      scale: 0.9,
      opacity: 0,
      complete: (anim) => {
        sceneInfoRosters.style.display = "none";
      },
    });
  } else if (action === "show") {
    console.log("roster show");
    tl = tl.add({
      targets: sceneInfoRostersTargets,
      scale: 1,
      opacity: 1,
      begin: (anim) => {
        sceneInfoRosters.style.display = "flex";
      },
    });
  }
};
const sceneInfoMaps = document.getElementById("scene-info-maps");
const switchSceneInfoMaps = (action) => {
  if (action === "hide") {
    console.log("maps hide");
    tl = tl.add({
      targets: ".textbox--shadow--map",
      scale: 0.9,
      opacity: 0,
      complete: (anim) => {
        sceneInfoMaps.style.display = "none";
      },
    });
  } else if (action === "show") {
    console.log("maps show");
    tl = tl.add({
      targets: ".textbox--shadow--map",
      scale: 1,
      opacity: 1,
      begin: (anim) => {
        sceneInfoMaps.style.display = "flex";
      },
    });
  }
};

const sceneSwitch = {
  "Empty Scene": [],
  "BRB Scene": [switchSceneBrb, switchScene],
  "Maplist Scene": [switchSceneInfoMaps, switchSceneInfo, switchScene],
  "Rosters Scene": [switchSceneInfoRosters, switchSceneInfo, switchScene],
  "Scores Scene": [switchScores],
};

switchScores("hide");
switchScene("hide");
switchSceneBrb("hide");
switchSceneInfo("hide");
switchSceneInfoRosters("hide");
switchSceneInfoMaps("hide");

currentScene.on("change", (newValue, oldValue) => {
  if (oldValue) {
    sceneSwitch[oldValue].forEach((element) => {
      if (!sceneSwitch[newValue].includes(element)) {
        element("hide");
      }
    });
  }
  sceneSwitch[newValue].forEach((element) => {
    element("show");
  });
});

// Score Updates
const boardAname = document.getElementById("board-a-name");
const boardAscore = document.getElementById("board-a-score");
const boardBname = document.getElementById("board-b-name");
const boardBscore = document.getElementById("board-b-score");
const scoreAname = document.getElementById("score-a-name");
const scoreAscore = document.getElementById("score-a-score");
const scoreBname = document.getElementById("score-b-name");
const scoreBscore = document.getElementById("score-b-score");
currentTeams.on("change", (newValue) => {
  boardAname.innerText = newValue[0].name;
  boardAscore.innerText = newValue[0].score;
  boardBname.innerText = newValue[1].name;
  boardBscore.innerText = newValue[1].score;
  scoreAname.innerText = newValue[0].name;
  scoreAscore.innerText = newValue[0].score;
  scoreBname.innerText = newValue[1].name;
  scoreBscore.innerText = newValue[1].score;
});

// Roster Updates
const rostersA = document.getElementById("rosters-a");
const rostersB = document.getElementById("rosters-b");
currentRosters.on("change", (newValue) => {
  rostersA.innerHTML = newValue[0].map((name) => Roster(name)).join("");
  rostersB.innerHTML = newValue[1].map((name) => Roster(name, true)).join("");
});

// Maps Updates
const maplist = document.getElementById("scene-info-maps");
currentMaps.on("change", (newValue) => {
  maplist.innerHTML = newValue
    .map((mapInfo) => MapCard(mapInfo.map, mapInfo.mode))
    .join("");
});

// Commentators Updates
const brbComms = document.getElementById("brbComms");
const boardComms = document.getElementById("boardComms");
currentCommentators.on("change", (newValue) => {
  newValue = [
    { twitter: "Chaedr_", pronouns: "ce/cim" },
    { twitter: "StrangedQuark", pronouns: "he/him" },
  ];

  brbComms.innerHTML = newValue
    .map((comm) => BrbComm(comm.twitter, comm.pronouns))
    .join(CommsSeparator());
  boardComms.innerHTML = newValue
    .map((comm) => BoardComm(comm.twitter, comm.pronouns))
    .join("");
});

// Flavor Text Updates
const brbFlavor = document.getElementById("brb-flavor");
const scoresFlavor = document.getElementById("scores-flavor");
currentFlavorText.on("change", (newValue) => {
  brbFlavor.innerText = newValue;
  scoresFlavor.innerText = newValue;
});

// Components
const Roster = (name, right = false) => `
  <div class="roster ${right && "roster--right"}">
    <div>${name}</div>
    <div style="color: var(--color-cyan); padding: var(--space-2)">
      <svg width="0.5em" height="0.5em" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="circle" class="svg-inline--fa fa-circle fa-w-16" role="img" viewBox="0 0 512 512">
        <path
          fill="currentColor"
          d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
        />
      </svg>
    </div>
  </div>
`;

const MapCard = (map, mode, winner) => `
  <div class="textbox textbox--shadow--map textbox--shadow--card textbox--shadow">
    <div style="background-image: url('./stages/${map}.png');" class="textbox textbox__main--map textbox__main ${
  winner && "textbox__main--map--played"
}">
    </div>
    <div class="textbox__main--map__text">
      ${map}
    </div>
    <div class="textbox__main--map__text--mode textbox__main--map__text">
      ${mode}
    </div>
  </div>
`;

const BrbComm = (twitter, pronouns) => `
  <span class="textbox__main--commentators__text">
    @${twitter}
  </span>
  <span class="textbox__main--commentators__text textbox__main--commentators__text--pronouns">
    ${pronouns}
  </span>
`;

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

const CommsSeparator = () => `
  <span class="textbox__main--commentators__text">&</span>
`;
