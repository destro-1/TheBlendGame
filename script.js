let sceneIndex = 0;
let textEl = document.getElementById("text");
let buttonsEl = document.getElementById("buttons");
let introEl = document.getElementById("intro");
let sceneEl = document.getElementById("scene");
let userChoices = [];

const scenes = [
  {
    id: 1,
    text: "You're not here to follow. You're here to notice. And to decide.",
    choices: [{ text: "Continue", nextScene: 1 }]
  },
  {
    id: 2,
    text: "There’s a quiet place inside you — somewhere you’ve always known, but sometimes forget to visit.",
    choices: [{ text: "Go there", nextScene: 3 }]
  },
  {
    id: 3,
    text: "In the quiet, shapes form slowly. Faces, feelings, memories. Some are clear. Others are shadows.",
    choices: [{ text: "Reach out", nextScene: 4 }, { text: "Step back", nextScene: 4 }]
  },
  {
    id: 4,
    text: "You sense something watching you — not with eyes, but with intention. You feel a choice to make.",
    choices: [{ text: "Face it", nextScene: 5 }, { text: "Hide", nextScene: 5 }]
  },
  {
    id: 5,
    text: "The moment passes, and you realize this is only the beginning. The blend of all things is waiting.",
    choices: [{ text: "Proceed", nextScene: 6 }]
  },
  {
    id: 6,
    text: "You begin to sense patterns in the silence. Not words, exactly. Not commands. Just presence.",
    choices: [{ text: "Lean into it", nextScene: 7 }, { text: "Resist", nextScene: 7 }]
  },
  {
    id: 7,
    text: "The world responds not with a reward or a punishment, but with reflection. Like a mirror that listens. You’re shown a glimpse of something familiar—maybe a dream, maybe a memory.",
    choices: [{ text: "Reach toward the memory", nextScene: 8 }, { text: "Turn away", nextScene: 8 }]
  },
  {
    id: 8,
    text: "You walk through a place that might have been yours once. It feels quiet but alive. You see a stone, a name, an unfinished sentence.",
    choices: [{ text: "Pause here", nextScene: 9 }, { text: "Keep going", nextScene: 9 }]
  },
  {
    id: 9,
    text: "⟡ You’ve reached a pause point. This is a good moment to rest.\n\nIf you’d like to continue later, your progress will be saved.",
    isPausePoint: true,
    choices: [{ text: "Download Save", action: "download" }, { text: "Continue", nextScene: 10 }]
  },
  {
    id: 10,
    text: "The quiet place lingers in your mind, like a fading echo. You feel a soft nudge — the invitation to explore deeper, or to rest a little longer.",
    choices: [{ text: "Explore deeper", nextScene: 11 }, { text: "Rest here", nextScene: 12 }]
  },
  {
    id: 11,
    text: "With careful steps, you enter a grove bathed in shifting light. The air is warm, yet the path ahead is unclear, woven with half-remembered stories.",
    choices: [{ text: "Follow the stories", nextScene: 13 }, { text: "Turn back", nextScene: 12 }]
  },
  {
    id: 12,
    text: "You sit quietly, letting the silence wrap around you. Sometimes the stillness speaks louder than any words could.",
    isPausePoint: true,
    choices: [{ text: "Download Save", action: "download" }, { text: "Continue", nextScene: 13 }]
  },
  {
    id: 13,
    text: "Stories ripple through the leaves like whispers. You sense there’s more to uncover, yet the journey is yours to shape.",
    choices: [{ text: "Listen carefully", nextScene: 14 }, { text: "Walk forward without listening", nextScene: 14 }]
  },
  {
    id: 14,
    text: "Ahead, a figure appears — a friend, a stranger, or maybe a part of yourself. Their gaze holds questions that only you can answer.",
    choices: [{ text: "Speak with the figure", nextScene: 15 }, { text: "Stay silent", nextScene: 15 }]
  },
  {
    id: 15,
    text: "⟡ You’ve reached another pause point. Your journey continues whenever you’re ready.",
    isPausePoint: true,
    choices: [{ text: "Download Save", action: "download" }, { text: "End session", action: "end" }]
  }
];

function startGame() {
  introEl.style.display = "none";
  sceneEl.style.display = "block";
  showScene(0);
}

function typeText(text, callback) {
  let idx = 0;
  textEl.innerHTML = "";
  buttonsEl.innerHTML = "";

  let interval = setInterval(() => {
    if (idx < text.length) {
      textEl.innerHTML += text.charAt(idx++);
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 30);
}

function showScene(index) {
  sceneIndex = index;
  const scene = scenes[index];

  typeText(scene.text, () => {
    buttonsEl.innerHTML = "";
    scene.choices.forEach(choice => {
      let button = document.createElement("button");
      button.innerText = choice.text;
      button.onclick = () => {
        if (choice.text) userChoices.push(choice.text);
        if (choice.nextScene !== undefined) {
          showScene(choice.nextScene - 1);
        } else if (choice.action) {
          if (choice.action === "download") {
            downloadSave();
          } else if (choice.action === "end") {
            alert("Thank you for playing! See you next time.");
            location.reload();
          }
        }
      };
      buttonsEl.appendChild(button);
    });
  });
}

function downloadSave() {
  const blob = new Blob(
    [
      `Your path so far:\n` + userChoices.join("\n")
    ],
    { type: "text/plain" }
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "blend_save.txt";
  a.click();
}
