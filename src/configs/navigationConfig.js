import React from "react";
import * as Icon from "react-feather";
const navigationConfig = [
  {
    id: "home",
    title: "Home",
    type: "item",
    icon: <Icon.Home size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/",
  },
  {
    id: "Report card",
    title: "Report card",
    type: "item",
    icon: <Icon.Circle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/reportcard",
  },
  {
    id: "Awards and achievements",
    title: "Awards and achievements",
    type: "item",
    icon: <Icon.Circle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/awards",
  },
  {
    id: "Teachers",
    title: "Teachers",
    type: "item",
    icon: <Icon.Circle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/teachers",
  },
  {
    id: "Friends",
    title: "Friends",
    type: "item",
    icon: <Icon.Circle size={20} />,
    permissions: ["admin", "editor"],
    navLink: "/friends",
  },
];

export default navigationConfig;
