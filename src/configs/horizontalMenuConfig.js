import React from "react";
import * as Icon from "react-feather";

const horizontalMenuConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
];

export default horizontalMenuConfig;
