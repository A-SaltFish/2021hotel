import Vue from "vue";
import VueRouter from "vue-router";
import Container from "./views/Container.vue";
import Login from "./views/Login";
import customerOrderSelect from "./views/customer/CustomerAllOrder";
import CustomerInfo from "./views/customer/CustomerInfo";
import CustomerPreOrder from "./views/customer/CustomerPreOrder";
import HotelInfo from "./views/manager/HotelInfo";
import RoomInfo from "./views/manager/HotelRoomInfo";
import HotelPreOrder from "./views/manager/HotelPreOrder";
import HotelAllOrder from "./views/manager/HotelAllOrder";
import HotelAfterSales from "./views/manager/HotelAfterSales";
import AdminCustomer from "./views/admin/AdminCustomer";
import AdminManager from "./views/admin/AdminManager";
import AdminHotel from "./views/admin/AdminHotel";
import AdminOrder from "./views/admin/AdminOrder";
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
        //酒店全部订单
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
        //酒店房间
      {
        path: "/manager/hotel/room",
        name: "hotel-breakfast",
        component: RoomInfo
      },
      {
        path: "/admin",
        name: "admin-home",
        component: Home
      },
        //管理员-用户管理
      {
        path: "/admin/customer",
        name: "admin-customer",
        component: AdminCustomer
      },
      {
        path: "/admin/manager",
        name: "admin-manager",
        component: AdminManager
      },
      {
        path: "/admin/hotel",
        name: "admin-hotel",
        component: AdminHotel
      },
      {
        path: "/admin/order",
        name: "admin-order",
        component: AdminOrder
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
