import init, { graphviz } from "@hpcc-js/wasm/graphviz";

async function renderDOT(dotText) {
  await init();
  const svg = graphviz.layout(dotText, "svg", "dot");
  document.getElementById("graph-container").innerHTML = svg;
}

document.getElementById("fileInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const dotText = event.target.result;
      try {
        await renderDOT(dotText);
      } catch (err) {
        alert("Error rendering DOT file: " + err.message);
      }
    };
    reader.readAsText(file);
  }
});