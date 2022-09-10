import type { JSONSchema } from 'json-schema-to-typescript'

export interface UpdateApiDtsOptions {
  /** api 文档 id */
  id: string
  /** 登录密码 */
  password: string
  /** 保留原始数据到缓存的 json 对象上 */
  saveRaw?: boolean
  /**
   * 类型文件的输出目录
   * @default `${viteConfig.root}/src/api/definitions`
   */
  outDir?: string
  /**
   * 缓存文件的输出路径
   * @default `${viteConfig.root}/temp`
   */
  tempDir?: string
  /**
   * 类型文件的文件名
   * @default 'index'
   */
  name?: string
  /**
   * 缓存文件的输出名称
   * @default 'api_dts'
   */
  tempName?: string
}

export type ApifoxHttpMethods = 'post' | 'get' | 'put' | 'delete' | 'options'

export interface ApifoxObjectBase {
  auth?: {
    type: string
    bearer: {
      token: string
    }
  }
  id: number
  name: string
  ordering: number
  createdAt?: string
  updatedAt?: string
  deletedAt?: string
  description?: string
  projectId?: number
  folderId?: number
  creatorId?: number
  editorId?: number
}

export interface ApiFolders extends ApifoxObjectBase {
  children: string[]
  preProcessors: unknown[]
  postProcessors: unknown[]
  type: 'root' | 'http'
  parentId: number
  serverId: string
}

export interface ApifoxDocData {
  apiFolders: Record<string, any>
  auth: boolean
  environments: Record<string, any>
  expiredAt?: string
  favicon?: string
  icon?: string
  id: string
  language: string
  name: string
  options: {
    collapseTopFolder: boolean
    isShowMaintainer: boolean
    isShowUpdatedAt: boolean
    isShowPrefixUrl: boolean
  }
  projectId: number
  teamId: number
}

export interface ApifoxDocResponse<T> {
  data: T
  success: boolean
}

export interface ApiTree {
  doc?: {
    content: string
    folderId: number
    id: number
  }
  folder?: {
    id: number
    parentId: number
    type: 'http'
  }
  api?: {
    folderId: number
    id: number
    method: 'post' | 'get' | 'put' | 'delete'
    path: string
    responsibleId: number
    status: 'developing'
    tags: unknown[]
    type: 'http'
  }
  children?: ApiTree[]
  key: string
  name: string
  type: 'doc' | 'apiDetailFolder' | 'apiDetail'
}

export interface ApifoxJSONSchema extends JSONSchema {
  'x-apifox-overrides'?: Record<string, ApifoxJSONSchema>
  'x-apifox-refs'?: Record<string, ApifoxJSONSchema>
  'x-apifox-orders'?: string[]
}

export interface ApiDetailResponse extends ApifoxObjectBase {
  jsonSchema: ApifoxJSONSchema
  defaultEnable: boolean
  apiDetailId: number
  projectId: number
  code: 200
  contentType: string
}

export interface ApiDetail extends ApifoxObjectBase {
  tags: unknown[]
  status: 'developing'
  requestBody: {
    type: 'application/json'
    parameters: []
    jsonSchema: ApifoxJSONSchema
  }
  parameters: {
    path: unknown[]
    query: unknown[]
    cookie: unknown[]
    header: unknown[]
  }
  commonParameters: {
    query: unknown[]
    body: unknown[]
    cookie: unknown[]
    header: unknown[]
  }
  commonResponseStatus: Record<string, any>
  advancedSettings: Record<string, any>
  mockScript: Record<string, any>
  type: 'http'
  serverId: string
  operationId: string
  sourceUrl: string
  method: ApifoxHttpMethods
  path: string
  customApiFields?: string
  responsibleId?: number
  responses: ApiDetailResponse[]
  responseExamples: unknown[]
}

export interface DataSchema extends ApifoxObjectBase {
  jsonSchema: ApifoxJSONSchema
}

/**
 * @example
 * ```
 * const apiTypeMap = {
 *   post: {
 *     type: 'object',
 *     properties: {
 *       '/login': {
 *           type: 'object',
 *           properties: {
 *             request: {
 *               username: { type: 'string' },
 *               password: { type: 'string' },
 *             },
 *             response: {
 *               token: { type: 'string' },
 *             },
 *           },
 *         },
 *       },
 *     },
 *   },
 * }
 * ```
 */
export interface ApiTypeMap {
  [method: string]: {
    type: 'object'
    properties: {
      [path: string]: {
        /** 名称，生成接口名称 */
        title: string
        /** 描述，生成注释 */
        description: string
        type: 'object'
        properties: {
          type: 'object'
          properties: {
            /** 生成请求类型 */
            request: Record<string, any>
            /** 生成响应类型 */
            response: Record<string, any>
          }
        }
      }
    }
  }
}
