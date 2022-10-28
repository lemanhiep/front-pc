console.log("Generating...");
var fs = require("fs");

function renderImageResource() {
  fs.readdir("./src/app/assets/images/", function (err, fileName) {
    if (err) {
      console.log(err);
      return;
    }
    fs.writeFileSync(
      "./src/app/assets/ImagesAssets.ts",
      `const icons = {
    ${fileName
      .filter((e) => e !== ".DS_Store")
      .map((iconName) => {
        // eslint-disable-next-line no-undef
        let path = `
    ${iconName
      .replace(".png", "")
      .replace(".gif", "")
      .replace(".jpg", "")
      .replace(".jpeg", "")}: require("./images/${iconName}")`;
        // eslint-disable-next-line no-undef
        return path;
      })}
    }
export default icons`,
      { encoding: "utf8", flag: "w" }
    );
    console.log(
      `============== Linked ${fileName.length} images ==============`
    );
  });
}

renderImageResource();
