import fs from "fs/promises"
import path from "path"

const TEMPLATE_CONTENT_PH = "%content%"

async function buildRoutes(app, routes) {
  const { template, dir, ...rest } = routes;

  const templateFile = await fs.readFile(path.join(dir, template), "utf-8");

  for (const [route, resource] of Object.entries(rest)) {
    switch (typeof(resource)) {
      case "function":
        app.get(route, resource);
        break;
      case "string":
        app.get(route, async (req, res) => {
          const content = await fs.readFile(path.join(dir, resource), "utf-8");
          const response = templateFile.replace(TEMPLATE_CONTENT_PH, content);
          res.send(response);
        });
        break;
      default:
        break;
    }
  }
}

export { buildRoutes };
