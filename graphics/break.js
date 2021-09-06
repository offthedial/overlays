// Scene Switcher
const sceneSwitch = {
  brb: {
    targets: [
      document.getElementById("scene-brb-image"),
      document.getElementById("scene-brb-flavor"),
      document.getElementById("scene-brb-comms"),
      document.getElementById("scene-brb-social"),
    ],
    elements: [
      document.getElementById("scene"),
      document.getElementById("scene-brb"),
    ],
  },
  maplist: {
    targets: [
      ".textbox--shadow--map",
      document.getElementById("scene-info-scoreboard"),
      document.getElementById("scene-info-image"),
    ],
    elements: [
      document.getElementById("scene"),
      document.getElementById("scene-info"),
      document.getElementById("scene-info-maps"),
    ],
  },
  rosters: {
    targets: [
      document.getElementById("scene-info-roster-a"),
      document.getElementById("scene-info-roster-vs"),
      document.getElementById("scene-info-roster-b"),
      document.getElementById("scene-info-scoreboard"),
      document.getElementById("scene-info-image"),
    ],
    elements: [
      document.getElementById("scene"),
      document.getElementById("scene-info"),
      document.getElementById("scene-info-rosters"),
    ],
  },
};

currentBreakScreen.on("change", (newValue, oldValue) => {
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
        complete: () => {
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
    complete: () => {
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
const boardAscore = document.getElementById("board-a-score");
const boardBscore = document.getElementById("board-b-score");
currentScores.on("change", (newValue, oldValue) => {
  if (!oldValue || oldValue[0] !== newValue[0]) {
    subtleFade([boardAscore], newValue[0]);
  }
  if (!oldValue || oldValue[1] !== newValue[1]) {
    subtleFade([boardBscore], newValue[1]);
  }
});

// Team Updates
const boardAname = document.getElementById("board-a-name");
const boardBname = document.getElementById("board-b-name");
const rostersA = document.getElementById("rosters-a");
const rostersB = document.getElementById("rosters-b");
currentTeams.on("change", (newValue, oldValue) => {
  if (!oldValue || oldValue[0].name !== newValue[0].name) {
    subtleFade([boardAname], newValue[0].name);
  }
  if (!oldValue || oldValue[1].name !== newValue[1].name) {
    subtleFade([boardBname], newValue[1].name);
  }

  if (
    !oldValue ||
    JSON.stringify(oldValue[0].roster) !== JSON.stringify(newValue[0].roster)
  ) {
    subtleFade(
      [rostersA],
      newValue[0].roster.map((player) => Roster(player)).join(""),
      "<div></div>"
    );
  }
  if (
    !oldValue ||
    JSON.stringify(oldValue[1].roster) !== JSON.stringify(newValue[1].roster)
  ) {
    subtleFade(
      [rostersB],
      newValue[1].roster.map((player) => Roster(player, true)).join(""),
      "<div></div>"
    );
  }
});

// Maps Updates
const maplist = document.getElementById("scene-info-maps");
currentRound.on("change", (newValue) => {
  if (currentBreakScreen.value === "maplist") {
    subtleFade([maplist], Maps(newValue.value), true);
    anime({
      duration: 601,
      complete: () => {
        if (currentMapWinners.value) {
          setMapWinners(currentMapWinners.value, []);
        }
      },
    });
  } else {
    maplist.innerHTML = Maps(newValue.value);
    anime({
      duration: 300,
      easing: "easeInOutExpo",
      delay: anime.stagger(50),
      targets: ".textbox--shadow--map",
      scale: 0.9,
      opacity: 0,
    });
    NodeCG.waitForReplicants(currentTeams, currentMapWinners).then(() => {
      setMapWinners(currentMapWinners.value, []);
    });
  }
});

currentMapWinners.on("change", (newValue, oldValue) => {
  if (oldValue) {
    NodeCG.waitForReplicants(currentTeams, currentRound).then(() => {
      setMapWinners(newValue, oldValue);
    });
  }
});

const setMapWinners = (newValue, oldValue) => {
  const teamNames = {
    A: currentTeams.value ? currentTeams.value[0].name : undefined,
    B: currentTeams.value ? currentTeams.value[1].name : undefined,
  };
  currentRound.value.value.forEach((_, i) => {
    const gameImage = document.getElementById(`game-image-${i}`);
    const gameWinner = document.getElementById(`game-winner-${i}`);
    if (oldValue ? oldValue[i] : undefined !== newValue[i]) {
      // Animate text
      anime({
        duration: (oldValue ? oldValue[i] : undefined) ? 300 : 0,
        easing: "easeInOutExpo",
        targets: gameWinner,
        opacity: 0,
        complete: () => {
          if (newValue[i]) {
            gameWinner.innerText = teamNames[newValue[i]];
            anime({
              duration: 300,
              easing: "easeInOutExpo",
              targets: gameWinner,
              opacity: 1,
            });
          }
        },
      });
      // Animate filter change
      if (
        oldValue
          ? oldValue[i]
          : undefined === undefined || newValue[i] === undefined
      ) {
        anime({
          duration: 300,
          easing: "easeInOutSine",
          targets: gameImage,
          filter: [
            "brightness(1) grayscale(0)",
            "brightness(0.5) grayscale(0.75)",
          ],
          direction: newValue[i] ? "normal" : "reverse",
        });
      }
    }
  });
};

// Commentators Updates
const brbComms = document.getElementById("brbComms");
currentBlock.on("change", (newValue) => {
  subtleFade(
    [brbComms],
    BrbComms(newValue.value),
    BrbComms([{ twitter: "@", pronouns: "-" }])
  );
});

// Flavor Text Updates
const brbFlavor = document.getElementById("brb-flavor");
currentFlavorText.on("change", (newValue) => {
  subtleFade([brbFlavor], newValue);
});

// Social Cycle
const socialText = document.getElementById("social-text");
const socialIcon = document.getElementById("social-icon");
const socials = [
  { link: "otd.ink/discord", icon: Discord() },
  { link: "@Off_The_Dial", icon: Twitter() },
];
let socialIndex = 0;
anime({
  duration: 15000,
  loop: true,
  loopBegin: () => {
    socialIndex++;
    const social = socials[socialIndex % socials.length];
    subtleFade([socialText], social.link);
    subtleFade([socialIcon], social.icon, `<span></span>`);
  },
});
