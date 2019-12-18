import { configure } from "@storybook/react";
import requireContext from "require-context.macro";

const req = requireContext("../projects", true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(req);
}
configure(loadStories, module);
