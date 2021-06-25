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
    index: "/admin/department",
    title: "系管理",
    userType: UserType.admin,
    permission: Permission.department
  },
  {
    icon: "el-icon-fa fa-graduation-cap",
    index: "/admin/major",
    title: "专业管理",
    userType: UserType.admin,
    permission: Permission.major
  },
  {
    icon: "el-icon-fa fa-group",
    index: "/admin/class",
    title: "班级管理",
    userType: UserType.admin,
    permission: Permission.class
  },
  {
    icon: "el-icon-fa fa-user",
    index: "/admin/student",
    title: "学生管理",
    userType: UserType.admin,
    permission: Permission.student
  },
  {
    icon: "el-icon-fa fa-user-plus",
    index: "/admin/teacher",
    title: "教师管理",
    userType: UserType.admin,
    permission: Permission.teacher
  },
  {
    icon: "el-icon-fa fa-book",
    index: "/admin/course",
    title: "课程管理",
    userType: UserType.admin,
    permission: Permission.course
  },
  {
    icon: "el-icon-fa fa-edit",
    index: "/admin/student/course",
    title: "选课修改",
    userType: UserType.admin,
    permission: Permission.studentCourse
  },
  {
    icon: "el-icon-fa fa-id-badge",
    index: "/admin/admin",
    title: "管理员管理",
    userType: UserType.admin,
    permission: Permission.admin
  }
];

export default SideBarItem;
