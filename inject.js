const { existsSync } = require("fs");
const { mkdir, writeFile, readdir } = require("fs").promises;
const { join } = require("path");

const PATHS = {
  stable: "Discord",
  ptb: "DiscordPTB",
  publictestbeta: "DiscordPTB",
  canary: "DiscordCanary",
  dev: "DiscordDevelopment",
  development: "DiscordDevelopment"
};

const getAppDir = async (platform) => {
  if (!PATHS[platform]) {
    return console.error(
      "Platform does not exist or is unsupported"
      +
      `\n`
      +
      "Supported platforms are stable, ptb, publictestbeta, canary, dev, development"
    )
  }
  const discordPath = join(process.env.LOCALAPPDATA, PATHS[platform]);
  const discordDirectory = await readdir(discordPath);

  const currentBuild = discordDirectory
    .filter(path => path.startsWith("app-"))
    .reverse()[0];

  return join(discordPath, currentBuild, "resources", "app");
};

(async () => {
  const appDir = await getAppDir(process.argv[2] || "stable")
  if (existsSync(appDir)) {
    return console.log("Looks like you already have a mod injected,\nCatCord can\'t run with other mods,\nplease uninject it first.\n");
  }

  await mkdir(appDir);
  await Promise.all([
    writeFile(
      join(appDir, "index.js"),
      `require("${process.cwd()}\\index.js")`.replaceAll("\\", "\\\\")
    ),
    writeFile(
      join(appDir, "package.json"),
      JSON.stringify({
        main: "index.js",
        name: "discord"
      })
    )
  ]);
  console.log("Please reopen Discord from the tray menu.")
})()