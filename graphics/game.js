// Commentator Updates
const cycle = [10, 50];
const element = document.getElementById("board-comms");
const tl = anime
  .timeline({
    loop: true,
  })
  .add({
    duration: cycle[0] * 1000,
    changeComplete: () =>
      anime({
        complete: () => {
          element.style.visibility = "hidden";
        },
        duration: 300,
        easing: "easeInOutExpo",
        targets: element,
        scale: 0.9,
        opacity: 0,
      }),
  })
  .add({
    duration: cycle[1] * 1000,
    changeComplete: () =>
      anime({
        begin: () => {
          element.style.visibility = "visible";
        },
        duration: 300,
        easing: "easeInOutExpo",
        targets: element,
        scale: 1,
        opacity: 1,
      }),
  });

// Score Updates
currentGameScreen.on("change", (newValue) => {
  if (newValue.showCommentators) {
    tl.play();
  } else {
    tl.pause();
    tl.seek(tl.duration - 1);
  }
  showHide(
    [
      document.getElementById("board-scores"),
      document.getElementById("board-score-comms"),
    ],
    newValue ? newValue.showScores : undefined
  );
});

const showHide = (elements, newValue) => {
  if (newValue) {
    anime({
      duration: 300,
      easing: "easeInOutExpo",
      delay: anime.stagger(50),
      targets: elements,
      scale: 1,
      opacity: 1,
      begin: () => {
        elements.forEach((elem) => (elem.style.visibility = "visible"));
      },
    });
  } else {
    anime({
      duration: 300,
      easing: "easeInOutExpo",
      delay: anime.stagger(50),
      targets: elements,
      scale: 0.9,
      opacity: 0,
      complete: () => {
        elements.forEach((elem) => (elem.style.visibility = "hidden"));
      },
    });
  }
};

// Name Updates
const scoreAname = document.getElementById("score-a-name");
const scoreBname = document.getElementById("score-b-name");
currentTeams.on("change", (newValue, oldValue) => {
  if (!oldValue || oldValue[0].name !== newValue[0].name) {
    subtleFade([scoreAname], newValue[0].name);
  }
  if (!oldValue || oldValue[1].name !== newValue[1].name) {
    subtleFade([scoreBname], newValue[1].name);
  }
});

// Score Updates
const scoreAscore = document.getElementById("score-a-score");
const scoreBscore = document.getElementById("score-b-score");
currentScores.on("change", (newValue, oldValue) => {
  if (!oldValue || oldValue[0] !== newValue[0]) {
    subtleFade([scoreAscore], newValue[0]);
  }
  if (!oldValue || oldValue[1] !== newValue[1]) {
    subtleFade([scoreBscore], newValue[1]);
  }
});

// Color Updates
const scoreAcolor = document.getElementById("score-a-color");
const scoreBcolor = document.getElementById("score-b-color");
currentColors.on("change", (newValue, oldValue) => {
  if (!oldValue || oldValue[0] !== newValue[0]) {
    colorFade(scoreAcolor, newValue[0]);
  }
  if (!oldValue || oldValue[1] !== newValue[1]) {
    colorFade(scoreBcolor, newValue[1]);
  }
});

// Commentators Updates
const boardComms = document.getElementById("boardComms");
currentBlock.on("change", (newValue) => {
  subtleFade(
    [boardComms],
    BoardComms(newValue.value),
    BoardComms(newValue.value.map(() => ({ twitter: "@", pronouns: "-" })))
  );
});

// Flavor Text Updates
const scoresFlavor = document.getElementById("scores-flavor");
currentRound.on("change", (newValue) => {
  subtleFade([scoresFlavor], newValue.name);
});
