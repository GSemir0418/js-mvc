// 因为history路由需要后端支持，这里选择hash路由
export default function (el) {
  const app = document.querySelector(el);
  // 路由表
  const routes = [
    {
      path: "/",
      view: () => "<h1>HOME</h1",
    },
    {
      path: "/list",
      view: () => "<h1>LIST</h1",
    },
    {
      path: "/detail/:id",
      view: () => "<h1>DETAIL</h1",
    },
  ];
  const init = () => {
    bindEvent();
  };
  const bindEvent = () => {
    // 浏览器触发load事件和hashchange事件时要重新渲染页面
    window.addEventListener("load", loadView);
    window.addEventListener("hashchange", loadView);
  };
  const loadView = () => {
    // 通过当前location.hash与routes对应匹配，渲染视图
    // 解析path
    const pathInfo = getRouteInfo(location.hash);
    // 匹配route
    routes.forEach((item) => {
      // 解析route
      const routeInfo = getRouteInfo(item.path);
      if (routeInfo.viewName === pathInfo.viewName) {
        const result = {};
        // 两个数组进行匹配
        // [id] | [1]
        routeInfo.params.map((routeInfoItem, routeInfoItemIndex) => {
          pathInfo.params.map((pathInfoItem, pathInfoItemIndex) => {
            if (routeInfoItemIndex === pathInfoItemIndex) {
              result[routeInfoItem] = pathInfoItem;
            }
          });
        });
        // 最终调用view传参并渲染即可
        app.innerHTML = item.view(result);
      }
    });
  };
  // 分析路由数据，返回路由数据对象
  const getRouteInfo = (hash) => {
    const pathItem = hash // #/detail/:id
      .substring(1) // /detail/:id
      .split("/") // [ ,detail, :id]
      .filter((item) => item !== ""); // [detail, :id]
    return {
      viewName: pathItem[0], // detail
      params: pathItem.slice(1).map((item) => item.replace(":", "")), // [id]
    };
  };
  init();
}
