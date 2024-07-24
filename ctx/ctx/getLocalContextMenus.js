const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exepctions = []) => {
  let localContextMenus = [];
  const menuFiles = getAllFiles(path.join(__dirname, "..", "contextmenus"));

  for (const menuFile of menuFiles) {
    const menuObject = require(menuFile);

    if (exepctions.includes(menuObject.name)) continue;
    localContextMenus.push(menuObject);
  };

  return localContextMenus;
};
//having a MenuObject it will allow you, to put 