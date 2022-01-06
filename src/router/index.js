import Home from "../views/Home";

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
    children: [
      {
        name: 'Requete',
        path: "/requete",
      },
      {
        name: "Inventaire",
        path: "/inventaire",
      },
      {
        name: "Aventurier",
        path: "/aventurier",
      },
      {
        name: "Finances",
        path: "/Finances",
      },
    ],
  },
];

export default routes;
