import type { DefaultDateTimeFormatSchema } from 'vue-i18n';

export interface useBigModel {
  getAnswer: (questions: questionType[], tools?: toolType[]) => Promise<any>;
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
