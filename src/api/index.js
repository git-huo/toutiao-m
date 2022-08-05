//export * from './user'
//从路径下，引入所有‘按需导出’的东西，在原封不动暴露出去
//不包含默认导出的东西

export * from './user'

export { default as getUser } from './user'

export * from './channel'

export * from './news'

export * from './search'
