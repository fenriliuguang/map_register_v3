export interface GlobalSetting {
  /** 根据点位坐标将地图移动到点集中心 */
  moveToCenter: boolean
  /** 在筛选器满足条件时自动跳转到下一级 */
  autoTurnNext: boolean
  /** 定时更新的时间间隔 */
  autoUpdateInterval: number
}

// TODO 云同步设置
export const localSettings = useLocalStorage<GlobalSetting>('__ys_global_settings', {
  moveToCenter: true,
  autoTurnNext: true,
  autoUpdateInterval: 20,
})
