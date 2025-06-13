let sceneIndex = 0;
let textEl = document.getElementById("text");
let buttonsEl = document.getElementById("buttons");
let introEl = document.getElementById("intro");
let sceneEl = document.getElementById("scene");
let userChoices = [];

const scenes = [
  {
    text: [
      "You arrive in silence. The light doesn’t speak, but it glows with intention. Somewhere between memory and possibility, this place recognizes you—whether or not you recognize it.",
      "There are no instructions. Only feeling. Only presence. Only you."
    ],
    buttons: [
      { label: "Proceed", next: 1 },
      { label: "Turn Back", action: () => {
        typeText("Sometimes, turning back is a kind of beginning.");
        buttonsEl.innerHTML = "";
      }}
    ]
  },
  {
    text: [
      "A soft hum finds its way to your ears. It’s not quite music, not quite a voice, but it carries meaning. You feel it more than you hear it.",
      "You made it. That’s... good. I didn’t know if you would. Or even if you should.",
      "You’re not here to follow. You’re here to notice. And to decide."
    ],
    buttons: [
      { label: "Ask who they are", next: 2, choice: "Asked who they are" },
      { label: "Say nothing", next: 2, choice: "Chose silence" },
      { label: "Say, “I don’t know why I’m here”", next: 2, choice: "Expressed uncertainty" }
    ]
  },
  {
    text: [
      "Let’s begin with something small. Where you place your attention shapes this place.",
      "A shape forms in the air — a floating, pulsing symbol. It offers you direction, but not instruction. This is where your path can take a breath.",
      "Would you like to pause here and save your path?"
    ],
    buttons: [
      { label: "Yes, save and rest", action: () => downloadSave() },
      { label: "No, continue", next: 3 }
    ]
  },
  {
    text: [
      "You press forward. Something shifts in the air, like a curtain being drawn back ever so slightly.",
      "Footsteps echo. Not yours. Not yet. A sense of being followed or perhaps awaited.",
      "A new figure approaches. Not quite solid, not quite shadow."
    ],
    buttons: [
      { label: "Approach", next: 4, choice: "Approached the figure" },
      { label: "Wait", next: 4, choice: "Chose to wait" }
    ]
  },
  {
    text: [
      "The figure nods, acknowledging something unspoken. It does not speak in words, but a shared awareness floods between you.",
      "It is not your guide. It is your echo. A part of what brought you here.",
      "Would you like to pause and consider what this part means to you?"
    ],
    buttons: [
      { label: "Yes, pause here", action: () => downloadSave() },
      { label: "Keep going", next: 5 }
    ]
  },
  {
    text: [
      "You move forward again. You sense the shape of a new day forming. Or is it a memory, waiting to be remembered?",
      "The light has changed. And so have you."
    ],
    buttons: [
      { label: "Continue", next: 6 }
    ]
  },
  {
    text: ["To be continued..."],
    buttons: []
  }
];

function startGame() {
  introEl.style.display = "none";
  sceneEl.style.display = "block";
  showScene(sceneIndex);
}

function typeText(texts, i = 0) {
  if (i >= texts.length) return;
  let idx = 0;
  textEl.innerHTML = "";
  buttonsEl.innerHTML = "";
  let interval = setInterval(() => {
    if (idx < texts[i].length) {
      textEl.innerHTML += texts[i].charAt(idx++);
    } else {
      clearInterval(interval);
      setTimeout(() => typeText(texts, i + 1), 1000);
    }
  }, 30);
}

function showScene(index) {
  sceneIndex = index;
  let scene = scenes[index];
  typeText(scene.text);
  setTimeout(() => {
    buttonsEl.innerHTML = "";
    scene.buttons.forEach(btn => {
      let button = document.createElement("button");
      button.innerText = btn.label;
      button.onclick = () => {
        if (btn.choice) userChoices.push(btn.choice);
        if (btn.next !== undefined) showScene(btn.next);
        else if (btn.action) btn.action();
      };
      buttonsEl.appendChild(button);
    });
  }, scene.text.join(" ").length * 30 + 1000);
}

function downloadSave() {
  const blob = new Blob([`Your path so far:\n` + userChoices.join("\n")], { type: "text/plain" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "blend_save.txt";
  a.click();
}
