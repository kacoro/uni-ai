import type { questionType, toolType } from '@/types/useBigModel';
// import axios from 'axios';
import { ref, type Ref } from 'vue';
import useToken from '../useToken';
// import jwt from 'jsonwebtoken';
// const answerList: answer[] = reactive([]);
// const contentList: Ref<string[]> = reactive([]);
const content: Ref<string> = ref('');
// let choices: Ref<choices[]> = ref([]);
const { getToken } = useToken();

// 定义正则表达式，匹配被大括号包裹的数据
const regex = /"choices":\[(.*?)\]/g;
// 存储匹配结果的数组
const matches: string[] = [];
export function extractDataFromString(text: string): string[] {
  // 执行匹配
  let match;
  while ((match = regex.exec(text)) !== null) {
    // 将匹配的数据添加到数组中
    // ["{\"index\":0,\"delta\":{\"role\":\"assistant\",\"content\":\"\"I\"}}","{\"index\":0,\"finish_reason\":\"stop\",\"delta\":{\"role\":\"assistant\",\"content\":\"\"}}"]

    matches.push(JSON.parse(match[1])); // match[1] 是第一个捕获组的内容
  }
  return matches;
}
// 您提供的文本
// const text = `
// data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":"\"I"}}]}
// data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":" love"}}]}
// data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":" you"}}]}
// data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":".\""}}]}
// data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"finish_reason":"stop","delta":{"role":"assistant","content":""}}],"usage":{"prompt_tokens":22,"completion_tokens":6,"total_tokens":28}}
// data: [DONE]`;
// \"content\":\"[\w\s\.\"\']+\"

function extractContentFromText(text: string): string[] {
  // 定义正则表达式，匹配所有JSON格式的数据
  const regex = /(?<="choices":\[{"index":\d,"delta":{"role":"assistant","content":").*?(?="})/g;
  // 存储匹配结果的数组
  const matches: string[] = [];
  // 执行匹配
  let match;
  while ((match = regex.exec(text)) !== null) {
    // console.log(match);
    matches.push(match[0]);
    // contentList.push(match[0]);

    // 提取content值
    // const contentMatch = match[0].match(/"content":"([^"]*)"/);
    // if (contentMatch && contentMatch[1]) {
    //   matches.push(contentMatch[1]);
    // }
  }
  return matches;
}

export default function useBigModel() {
  // watch(choices, newValue => {
  //   console.log(newValue);
  //   newValue?.map(({ delta }) => {
  //     console.log(delta);
  //     contentList.value.push(delta.content);
  //   });
  // });
  async function getAnswer(questions: questionType[], tools?: toolType[]) {
    // 调用函数并打印结果

    // const token = localStorage.getItem('token');
    const token = uni.getStorageSync('token');
    console.log('getToekn:', token);
    // try {
    // const { data } = await axios.post(
    //   'https://open.bigmodel.cn/api/paas/v4/chat/completions',
    //   {
    //     model: 'glm-4',
    //     messages: questions,
    //     tools: tools,
    //     stream: true
    //   },
    //   {
    //     headers: {
    //       withCredentials: true,
    //       'Content-Type': 'application/json',
    //       Authorization: token
    //     }
    //   }
    // );
    // catch (error: any) {
    //   // console.log('error:', error);
    //   if (error.message.indexOf('401') !== -1) {
    //     console.log('4Token已过期，请重新生成/获取。');
    //     getToken();
    //   }
    //   return null;
    // }

    uni.request({
      method: 'POST',
      url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      data: {
        model: 'glm-4',
        messages: questions,
        tools: tools,
        stream: true
      },
      header: {
        withCredentials: true,
        'Content-Type': 'application/json',
        'custom-header': 'hello',
        Authorization: token
      },
      fail: error => {
        getToken();
        console.log('失败了：', error);
      },
      success: ({ data }) => {
        console.log(data);
        if (data instanceof Object && 'error' in data) {
          //使用 instanceof 或 typeof 来创建一个类型守卫
          if (data.error?.message.indexOf('Token已过期')) {
            //1001 1003
            console.log('失败了：', data.error);
            getToken();
          }
        } else {
          console.log(data);
          const extractedData = extractContentFromText(String(data));
          content.value = extractedData.toString();
          console.log('成功了！：', extractedData);
        }
      }
    });

    // .then(function (response) {
    //   //哈喽，用程序表示
    //   // console.log(count++);
    //   // console.log(response.data.replace('data: ', ''));
    //   // return JSON.parse(response.data.replaceAll('data: ', ''));
    // });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }
  return { getAnswer, content }; // [] or {}
}
