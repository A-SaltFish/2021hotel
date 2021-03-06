import Vue from "vue";
import VueRouter from "vue-router";
import Container from "./views/Container.vue";
import Login from "./views/Login";
import CustomerAllOrder from "./views/customer/CustomerAllOrder";
import CustomerInfo from "./views/customer/CustomerInfo";
import CustomerPreOrder from "./views/customer/CustomerPreOrder";
import TeacherCourse from "./views/teacher/TeacherCourse";
import TeacherTimetable from "./views/teacher/TeacherTimetable";
import TeacherGrade from "./views/teacher/TeacherGrade";
import AdminDepartment from "./views/admin/AdminDepartment";
import AdminMajor from "./views/admin/AdminMajor";
import AdminClass from "./views/admin/AdminClass";
import AdminStudent from "./views/admin/AdminStudent";
import AdminTeacher from "./views/admin/AdminTeacher";
import AdminCourse from "./views/admin/AdminCourse";
import AdminStudentCourse from "./views/admin/AdminStudentCourse";
import AdminAdmin from "./views/admin/AdminAdmin";
import Home from "./views/Home";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "container",
    component: Container,
    children: [
      //用户首页，注意该首页同时为管理员，经理和顾客的首页
      {
        path: "/customer",
        name: "customer-home",
        component: Home
      },
      //用户
      {
        path: "/customer/order/all",
        name: "customer-all-order",
        component: CustomerAllOrder
      },
      //用户订单
      {
        path: "/customer/order",
        name: "customer-course",
        component: CustomerPreOrder
      },
      //用户信息
      {
        path: "/customer/info",
        name: "customer-info",
        component: CustomerInfo
      },
      {
        path: "/teacher",
        name: "teacher-home",
        component: Home
      },
      {
        path: "/teacher/course",
        name: "teacher-course",
        component: TeacherCourse
      },
      {
        path: "/teacher/timetable",
        name: "teacher-timetable",
        component: TeacherTimetable
      },
      {
        path: "/teacher/grade",
        name: "teacher-grade",
        component: TeacherGrade
      },
      {
        path: "/admin",
        name: "admin-home",
        component: Home
      },
      {
        path: "/admin/department",
        name: "admin-department",
        component: AdminDepartment
      },
      {
        path: "/admin/major",
        name: "admin-major",
        component: AdminMajor
      },
      {
        path: "/admin/class",
        name: "admin-class",
        component: AdminClass
      },
      {
        path: "/admin/student",
        name: "admin-student",
        component: AdminStudent
      },
      {
        path: "/admin/teacher",
        name: "admin-teacher",
        component: AdminTeacher
      },
      {
        path: "/admin/course",
        name: "admin-course",
        component: AdminCourse
      },
      {
        path: "/admin/student/course",
        name: "admin-student-course",
        component: AdminStudentCourse
      },
      {
        path: "/admin/admin",
        name: "admin-admin",
        component: AdminAdmin
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
