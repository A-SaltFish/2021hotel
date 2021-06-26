import UserType from "./userType";
import Permission from "./permission";

let SideBarItem = {};

SideBarItem.items = [
  {
    icon: "el-icon-fa fa-bar-chart",
    index: "/customer",
    title: "个人中心",
    userType: UserType.customer,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-book",
    index: "/customer/order/all",
    title: "用户订单",
    userType: UserType.customer,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-edit",
    index: "/customer/order",
    title: "当前订单",
    userType: UserType.customer,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-id-badge",
    index: "/customer/info",
    title: "个人信息",
    userType: UserType.customer,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-bar-chart",
    index: "/manager",
    title: "酒店管理",
    userType: UserType.manager,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-book",
    index: "/manager/hotel/preorder",
    title: "当前订单",
    userType: UserType.manager,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-table",
    index: "/manager/hotel/allorder",
    title: "历史订单",
    userType: UserType.manager,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-edit",
    index: "/manager/aftersales",
    title: "售后管理",
    userType: UserType.manager,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-edit",
    index: "/manager/hotel/room",
    title: "房间管理",
    userType: UserType.manager,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-edit",
    index: "/manager/hotel/info",
    title: "酒店信息",
    userType: UserType.manager,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-bar-chart",
    index: "/admin",
    title: "管理员首页",
    userType: UserType.admin,
    permission: Permission.no
  },
  {
    icon: "el-icon-fa fa-fort-awesome",
    index: "/admin/customer",
    title: "用户管理",
    userType: UserType.admin,
    permission: Permission.customer
  },
  {
    icon: "el-icon-fa fa-graduation-cap",
    index: "/admin/manager",
    title: "经理管理",
    userType: UserType.admin,
    permission: Permission.major
  },
  {
    icon: "el-icon-fa fa-group",
    index: "/admin/hotel",
    title: "酒店管理",
    userType: UserType.admin,
    permission: Permission.class
  },
  {
    icon: "el-icon-fa fa-user",
    index: "/admin/order",
    title: "订单管理",
    userType: UserType.admin,
    permission: Permission.student
  },
];

export default SideBarItem;
