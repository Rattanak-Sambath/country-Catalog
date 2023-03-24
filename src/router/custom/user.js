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
    // car
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
    {
      path: "/car/:car/edit",
      name: "car.edit",
      component: () => import("../../view/car/edit.vue"),
    },
    // driver
    {
      path: "/driver",
      name: "driver.index",
      component: () => import("../../view/driver/index.vue"),
    },
    {
      path: "/driver/create",
      name: "driver.create",
      component: () => import("../../view/driver/create.vue"),
    },
    {
      path: "/driver/:driver/edit",
      name: "driver.edit",
      component: () => import("../../view/driver/edit.vue"),
    },

    // branch

    {
      path: "/branch",
      name: "branch.index",
      component: () => import("../../view/branch/index.vue"),
    },
    {
      path: "/branch/create",
      name: "branch.create",
      component: () => import("../../view/branch/create.vue"),
    },
    {
      path: "/branch/:branch/edit",
      name: "branch.edit",
      component: () => import("../../view/branch/edit.vue"),
    },

    // user

    {
      path: "/user",
      name: "user.index",
      component: () => import("../../view/user/index.vue"),
    },
    {
      path: "/user/create",
      name: "user.create",
      component: () => import("../../view/user/create.vue"),
    },
    {
      path: "/user/:user/edit",
      name: "user.edit",
      component: () => import("../../view/user/edit.vue"),
    },
]