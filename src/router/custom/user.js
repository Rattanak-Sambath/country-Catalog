export default [
    {
      path: "/setting",
      name: "setting",
    //   component: () => import("../../views/setting/AccountSettings.vue"),
    },
    {
      path: "/goodsTransfer",
      name: "goodsTransfer.index",
      component: () => import("../../view/goodsTransfer/index.vue"),
    },
    {
      path: "/car",
      name: "car.index",
      component: () => import("../../view/car/index.vue"),
    },
    {
      path: "/car/create",
      name: "car.create",
      component: () => import("../../view/car/create.vue"),
    },
]