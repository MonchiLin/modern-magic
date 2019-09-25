export const ErrorConstant = {
  RouteNameNotFound: {
    message: '[内部错误:] route 未设置 name',
    status: 1002
  },
  RequiredAuth: {
    message: `
      <div class="row justify-around">
       <span>请登录后在继续操作</span><a href="/#/login" class="color-accent" >登录</a>
      </div>
    `,
    status: 1003
  }
};
