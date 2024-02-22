// 利用三杠 规定可以隐式调用
// 在.d.ts 声明文件中，规定不允许 import 否则外部将无法使用声明，从而导致类型校验失败
// import type { DefaultDateTimeFormatSchema } from 'vue-i18n';

//可以使用

export interface useBigModel {
  getAnswer: (questions: questionType[], tools?: toolType[]) => Promise<unknown>;
  contentList: string[];
}
export enum roleEnum {
  user = 'user',
  system = 'system',
  assistant = 'assistant',
  tool = 'tool'
}

export interface retrievalType {
  knowledge_id: string;
  prompt_template: string;
}

export interface toolType {
  type: string;
  retrieval: retrievalType;
}

export interface questionType {
  role: roleEnum;
  content: string;
}

export enum modelEnum {
  'glm-4',
  'glm-3'
}

export type choices = {
  index: string;
  delta: {
    role: roleEnum;
    content: string;
  };
};

export interface answer {
  id: string;
  created: DefaultDateTimeFormatSchema;
  modle: modelEnum;
  choices: choices[];
}
