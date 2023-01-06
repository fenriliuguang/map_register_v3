import Api from '@/api/api'
import { useFetchHook } from '@/hooks'
import { messageFrom } from '@/utils'

/** 暂存点位管理 */
export const useMarkerStage = (init: API.MarkerPunctuateVo = {}) => {
  const loading = ref(false)

  const markerData = ref<API.MarkerPunctuateVo>(init)

  const successHook = createEventHook<API.RBoolean>()
  const errorHook = createEventHook<Error>()

  const { refresh: stageMarker, onSuccess: onStageSuccess, onError: onStageError } = useFetchHook({
    loading,
    onRequest: () => Api.punctuate.addPunctuate({}, markerData.value),
  })

  const { refresh: pushStagedMarker, onSuccess: onPushStagedSuccess, onError: onPushStagedError } = useFetchHook({
    loading,
    onRequest: () => {
      if (markerData.value.author === undefined)
        throw new Error('用户 id 为空')
      return Api.punctuate.pushPunctuate({ authorId: markerData.value.author })
    },
  })

  const { refresh: updateStagedMarker, onSuccess: onUpdateStagedSuccess, onError: onUpdateStagedError } = useFetchHook({
    loading,
    onRequest: () => Api.marker.updateMarker(markerData.value),
  })
  onUpdateStagedSuccess(successHook.trigger)
  onUpdateStagedError(errorHook.trigger)

  const deleteStagedMarker = async (markerId?: number) => {
    if (markerId === undefined)
      return
    try {
      loading.value = true
      const res = await Api.marker.deleteMarker({ markerId })
      successHook.trigger(res)
    }
    catch (err) {
      errorHook.trigger(new Error(messageFrom(err)))
    }
    finally {
      loading.value = false
    }
  }

  return {
    markerData,
    loading,
    stageMarker,
    pushStagedMarker,
    updateStagedMarker,
    deleteStagedMarker,
    onStageSuccess,
    onStageError,
    onPushStagedSuccess,
    onPushStagedError,
    onSuccess: successHook.on,
    onError: errorHook.on,
  }
}
