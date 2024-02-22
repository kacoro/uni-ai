<template>
  <view class="content">
    <view class="uni-list">
      <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index) in list" :key="index">
        <view class="uni-media-list">
          <image class="uni-media-list-logo" :src="item.cover" mode="scaleToFill"></image>
          <view class="uni-media-list-text-top">{{ item.title }}</view>
          <view class="uni-media-list-text-bottom uni-ellipsis">{{ item.summary }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup lang="ts">
import type { NewslistType } from '@/types';
import { ref, watchEffect, type Ref } from 'vue';
const API_URL = `https://unidemo.dcloud.net.cn/api/news`;
const list: Ref<NewslistType[]> = ref([]);

watchEffect(async () => {
  // eslint-disable-next-line no-undef
  uni.request({
    url: API_URL,
    dataType: 'json',
    success: ({ data }) => {
      // eslint-disable-next-line
      list.value = <NewslistType[]>data;
      console.log(list.value);
    }
  });
});
// watchEffect(async () => {
//   // 该 effect 会立即运行，
//   // 并且在 currentBranch.value 改变时重新运行

//   list.value = await (await fetch(url)).json();
// });
</script>
