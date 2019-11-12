import loginUserLoginView from "../../../login/view/Login.vue";
import loginUserRegisterView from "../../../login/view/register/Register.vue";
import loginUserPasswordResetView from "../../../login/view/PasswordReset.vue";

let loginRouter = [
  {
    path: '',
    name: "default_user_login",
    component: loginUserLoginView,
    meta: {requiresAuth: false}
  },
  {
    path: 'register',
    name: "default_user_register",
    component: loginUserRegisterView,
    meta: {requiresAuth: false}
  },
  {
    path: 'password/reset',
    name: "default_user_password_reset",
    component: loginUserPasswordResetView,
    meta: {requiresAuth: false}
  }
];

export default loginRouter;
