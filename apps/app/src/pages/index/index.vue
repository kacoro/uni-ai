<template>
  <view class="content uni-flex uni-column">
    <view class="text-area">
      <view class="text-area">{{ contentList }}</view>
    </view>
    <view>
      <view>
        <view>rich-text:</view>
        <rich-text :nodes="contentList"></rich-text>
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
            @input=""
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
        <input
          class="uni-flex"
          style="flex: 1 1 0%; justify-content: space-between"
          type="text"
          v-model="message"
          placeholder=" 向我发出指令，我可以完成对话聊天、智能问答、创作文章、生成代码等多种任务 "
          placeholder-class="input-placeholder"
          @input=""
        />
      </view>
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
import { roleEnum, type questionType } from '@/types/useBigModel';
import { ref, watch, watchEffect, type Ref } from 'vue';
const { getAnswer, contentList } = useBigModel();
let message = ref('');
let questions: questionType[] = [];
const title = ref('Hello');
// useBigMoDel().generatToken();
let question: Ref<string> = ref('');
let length = ref(0);
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
  console.dir(ansers);
  message.value = '';
}
//
watchEffect(() => {
  console.log('contentList,变化了', contentList);
});
watch(contentList, (newValue, oldValue) => {
  console.log('contentList2变化了', newValue, oldValue);
});
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
