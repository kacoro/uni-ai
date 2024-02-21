import { createPinia } from 'pinia';
//eslint-disable-next-line
import uviewPlus from 'uview-plus';
import { createSSRApp } from 'vue';
import App from './App.vue';

export function createApp() {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);
  app.use(uviewPlus);
  // 需要在app.use(uview-plus)之后执行

  //  eslint-disable-next-line
  uni.$u.setConfig({
    // 修改$u.config对象的属性
    config: {
      // 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
      unit: 'rpx'
    },
    // 修改$u.props对象的属性
    props: {
      // 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
      radio: {
        size: 15
      }
      // 其他组件属性配置
      // ......
    }
  });
  return {
    app,
    pinia
  };
}
