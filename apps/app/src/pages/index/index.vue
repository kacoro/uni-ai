<template>
  <view class="content uni-flex uni-column">
    <view class="text-area"></view>
    <view>
      <view>
        <view>content-text:</view>
        <view>
          {{ content }}
        </view>
        <view>content-html:</view>
        <view>
          <template v-html="content"></template>
        </view>
        <view>rich-text:</view>
      </view>
      <view class="uni-flex uni-row">
        <view class="text uni-flex">
          <input
            class="uni-flex"
            style="flex: 1 1 0%; justify-content: space-between"
            type="text"
            v-model="message"
            placeholder=" 向我发出指令，我可以完成对话聊天、智能问答、创作文章、生成代码等多种任务 "
            placeholder-class="input-placeholder"
          />
        </view>
        <view class="text uni-flex">
          <button @click="send" style="width: 35px; height: 35px">发送</button>
        </view>
      </view>
    </view>
    <view class="uni-flex uni-row">
      <navigator url="/pages/news/index?title=news" hover-class="navigator-hover">
        <button url="/pages/news">新闻页</button>
      </navigator>
    </view>
    <u-tabbar :fixed="true" :value="value1" @change="change1" :placeholder="false" :safeAreaInsetBottom="false">
      <view class="text uni-flex">
        <button @click="send" style="width: 35px; height: 35px">发送</button>
      </view>
    </u-tabbar>
    <u-tabbar :fixed="true" :value="value1" @change="change1" :placeholder="false" :safeAreaInsetBottom="false">
      <u-tabbar-item text="首页" icon="home" @click="click1"></u-tabbar-item>
      <u-tabbar-item text="我的" icon="account" @click="click1"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script setup lang="ts">
import useBigModel from '@/hooks/useBigModel';
import { roleEnum, type questionType } from '@/types/useBigModel.d';
import { ref, watch, type Ref } from 'vue';
const { getAnswer, content } = useBigModel();
let message = ref('接口测试中，你可以不太在意我的行为');
let questions: questionType[] = [];
// let content = ref('测试');
// const title = ref('Hello');
// useBigMoDel().generatToken();
let question: Ref<string> = ref('接口测试中，你可以不太在意我的行为');
let length = ref(5);
watch(message, newValue => {
  length.value = newValue.length;
  question.value = newValue;
});
function click1() {
  console.log('click1');
}
let value1 = ref(0);
function change1() {}
function send() {
  if (length.value <= 4) {
    console.log('长度不能小于4');
    return 0;
  }
  console.log('长度大于4，继续执行');
  questions.push({ role: roleEnum.user, content: question.value });
  let ansers = getAnswer(questions);
  console.log(ansers);
  message.value = '';
}
//
// watchEffect(() => {
//   console.log('contentList,变化了', contentList);
// });
// watch(contentList, newValue => {
//   content.value = newValue.toString();
//   console.log('内容变化了', content.value);
//   console.log('contentList2变化了', newValue);
// });
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100% - 4px);
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
