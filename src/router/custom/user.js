export default [
  {
    path: '/setting',
    name: 'setting',
    meta: {
      roles: [],
    },

    //   component: () => import("../../views/setting/AccountSettings.vue"),
  },
  {
    path: '/goodsTransfer',
    name: 'goodsTransfer.index',
    component: () => import('../../view/goodsTransfer/index.vue'),
  },
  {
    path: '/goodsTransfer/create',
    name: 'goodsTransfer.create',
    component: () => import('../../view/goodsTransfer/create.vue'),
  },

  // car
  {
    path: '/car',
    name: 'car.index',
    component: () => import('../../view/car/index.vue'),
  },
  {
    path: '/car/create',
    name: 'car.create',
    component: () => import('../../view/car/create.vue'),
  },
  {
    path: '/car/:car/edit',
    name: 'car.edit',
    component: () => import('../../view/car/edit.vue'),
  },
  // driver
  {
    path: '/driver',
    name: 'driver.index',
    component: () => import('../../view/driver/index.vue'),
  },
  {
    path: '/driver/create',
    name: 'driver.create',
    component: () => import('../../view/driver/create.vue'),
  },
  {
    path: '/driver/:driver/edit',
    name: 'driver.edit',
    component: () => import('../../view/driver/edit.vue'),
  },

  // branch

  {
    path: '/branch',
    name: 'branch.index',
    component: () => import('../../view/branch/index.vue'),
  },
  {
    path: '/branch/create',
    name: 'branch.create',
    component: () => import('../../view/branch/create.vue'),
  },
  {
    path: '/branch/:branch/edit',
    name: 'branch.edit',
    component: () => import('../../view/branch/edit.vue'),
    meta: {
      roles: ['branch'],
    },
  },

  // user

  {
    path: '/user',
    name: 'user.index',
    component: () => import('../../view/user/index.vue'),
  },
  {
    path: '/user/create',
    name: 'user.create',
    component: () => import('../../view/user/create.vue'),
  },
  {
    path: '/user/:user/edit',
    name: 'user.edit',
    component: () => import('../../view/user/edit.vue'),
  },

  // group

  {
    path: '/roleGroup',
    name: 'roleGroup.index',
    component: () => import('../../view/roleGroup/index.vue'),
  },
  {
    path: '/roleGroup/create',
    name: 'roleGroup.create',
    component: () => import('../../view/roleGroup/create.vue'),
  },
  {
    path: '/roleGroup/:roleGroup/edit',
    name: 'roleGroup.edit',
    component: () => import('../../view/roleGroup/edit.vue'),
  },
  // role
  {
    path: '/role',
    name: 'role.index',
    component: () => import('../../view/role/index.vue'),
  },
  {
    path: '/role/create',
    name: 'role.create',
    component: () => import('../../view/role/create.vue'),
  },
  {
    path: '/role/:role/edit',
    name: 'role.edit',
    component: () => import('../../view/role/edit.vue'),
  },

  // staff
  {
    path: '/staff',
    name: 'staff.index',
    component: () => import('../../view/staff/index.vue'),
  },
  {
    path: '/staff/create',
    name: 'staff.create',
    component: () => import('../../view/staff/create.vue'),
  },
  {
    path: '/staff/:staff/edit',
    name: 'staff.edit',
    component: () => import('../../view/staff/edit.vue'),
  },

  // destination

  {
    path: '/category',
    name: 'category.index',
    component: () => import('../../view/category/index.vue'),
  },
  {
    path: '/category/create',
    name: 'category.create',
    component: () => import('../../view/category/create.vue'),
  },
  {
    path: '/category/:id/edit',
    name: 'category.edit',
    component: () => import('../../view/category/edit.vue'),
  },

  // brands
  {
    path: '/brand',
    name: 'brand.index',
    component: () => import('../../view/brands/index.vue'),
  },
  {
    path: '/brand/create',
    name: 'brand.create',
    component: () => import('../../view/brands/create.vue'),
  },
  {
    path: '/brand/:id/edit',
    name: 'brand.edit',
    component: () => import('../../view/brands/edit.vue'),
  },
  // color
  {
    path: '/color',
    name: 'color.index',
    component: () => import('../../view/color/index.vue'),
  },
  {
    path: '/color/create',
    name: 'color.create',
    component: () => import('../../view/color/create.vue'),
  },
  {
    path: '/color/:id/edit',
    name: 'color.edit',
    component: () => import('../../view/color/edit.vue'),
  },

]
