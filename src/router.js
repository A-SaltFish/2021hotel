import Vue from "vue";
import VueRouter from "vue-router";
import Container from "./views/Container.vue";
import Login from "./views/Login";
import customerOrderSelect from "./views/customer/CustomerAllOrder";
import CustomerInfo from "./views/customer/CustomerInfo";
import CustomerPreOrder from "./views/customer/CustomerPreOrder";
import HotelInfo from "./views/manager/HotelInfo";
import BreakfastInfo from "./views/manager/BreakfastInfo";
import HotelPreOrder from "./views/manager/HotelPreOrder";
import HotelAllOrder from "./views/manager/HotelAllOrder";
import HotelAfterSales from "./views/manager/HotelAfterSales";
import AdminDepartment from "./views/admin/AdminDepartment";
import AdminMajor from "./views/admin/AdminMajor";
import AdminClass from "./views/admin/AdminClass";
import AdminStudent from "./views/admin/AdminStudent";
import AdminTeacher from "./views/admin/AdminTeacher";
import AdminCourse from "./views/admin/AdminCourse";
import AdminCustomerOrder from "./views/admin/AdminCustomerOrder";
import AdminAdmin from "./views/admin/AdminAdmin";
import Home from "./views/Home";
import Index from "./views/Index"
import HotelDetail from "./views/HotelDetail";
import CustomerRegister from "./views/customer/CustomerRegister";
import ManagerRegister from "./views/manager/ManagerRegister";

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
        component: customerOrderSelect
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
        //经理首页
      {
        path: "/manager",
        name: "teacher-home",
        component: Home
      },
        //经理
      {
        path: "/manager/hotel/preorder",
        name: "pre-order",
        component: HotelPreOrder
      },
      {
        path: "/manager/hotel/allorder",
        name: "all-order",
        component: HotelAllOrder
      },
        //售后
      {
        path: "/manager/aftersales",
        name: "after-sales",
        component: HotelAfterSales
      },
        //酒店信息
      {
        path: "/manager/hotel/info",
        name: "hotel-info",
        component: HotelInfo
      },
        //酒店早餐
      {
        path: "/manager/hotel/breakfast",
        name: "hotel-breakfast",
        component: BreakfastInfo
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
        component: AdminCustomerOrder
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
  },
  {
    path: "/index",
    name: "index",
    component: Index
  },
  {
    path: "/hotel/:hotel_id",
    component: HotelDetail,
    name: "hotelDetail",
    props: true
  },
  {
    path: "/register/customer",
    component: CustomerRegister,
    name:"customerRegister",
  },
  {
    path: "/register/manager",
    name: "managerRegister",
    component: ManagerRegister
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
