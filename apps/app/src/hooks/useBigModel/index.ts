import type { answer, choices, questionType, toolType } from '@/types/useBigModel';
import axios from 'axios';
import { reactive, ref, type Ref } from 'vue';
import useToken from '../useToken';
// import jwt from 'jsonwebtoken';
let answerList: answer[] = reactive([]);
let contentList: Ref<string[]> = ref([]);
let choices: Ref<choices[]> = ref([]);
const { getToken } = useToken();

// 定义正则表达式，匹配被大括号包裹的数据
const regex = /"choices":\[(.*?)\]/g;
// 存储匹配结果的数组
const matches: string[] = [];
function extractDataFromString(text: string): string[] {
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
const text = `
data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":"\"I"}}]}
data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":" love"}}]}
data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":" you"}}]}
data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"delta":{"role":"assistant","content":".\""}}]}
data: {"id":"8367749749104713937","created":1708484452,"model":"glm-4","choices":[{"index":0,"finish_reason":"stop","delta":{"role":"assistant","content":""}}],"usage":{"prompt_tokens":22,"completion_tokens":6,"total_tokens":28}}
data: [DONE]`;
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
    contentList.value.push(match[0]);
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

    try {
      let token = localStorage.getItem('token');
      let count = 0;
      let { data } = await axios.post(
        'https://open.bigmodel.cn/api/paas/v4/chat/completions',
        {
          model: 'glm-4',
          messages: questions,
          tools: tools,
          stream: true
        },
        {
          headers: {
            withCredentials: true,
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      );
      const extractedData = extractContentFromText(data);
      console.log('结果：', extractedData);
      // .then(function (response) {
      //   //哈喽，用程序表示
      //   // console.log(count++);
      //   // console.log(response.data.replace('data: ', ''));
      //   // return JSON.parse(response.data.replaceAll('data: ', ''));
      // });
    } catch (error: any) {
      console.log('error:', error);
      if (error.message.indexOf('401') !== -1) {
        console.log('4Token已过期，请重新生成/获取。');
        getToken();
      }
      return null;
    }
  }
  return { getAnswer, contentList }; // [] or {}
}
