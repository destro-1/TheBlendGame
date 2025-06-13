document.addEventListener("DOMContentLoaded", function () {
  const introImage = document.getElementById("intro-image");

  introImage.addEventListener("click", () => {
    document.body.innerHTML = '<div id="text-container"></div><button id="proceed">Proceed</button><button id="quit">Quit</button>';
    const text = "In a world half-formed by thought and memory, your presence begins to take shape...";
    const container = document.getElementById("text-container");
    let i = 0;

    function typeText() {
      if (i < text.length) {
        container.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeText, 50);
      }
    }
    typeText();

    document.getElementById("proceed").addEventListener("click", () => {
      // Placeholder for main game page logic
      alert("Game begins...");
    });
    document.getElementById("quit").addEventListener("click", () => {
      window.location.reload();
    });
  });
});
