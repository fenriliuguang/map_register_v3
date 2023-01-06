import Api from '@/api/api'
import { useFetchHook } from '@/hooks'
import { messageFrom } from '@/utils'

export const useMarkerEdit = (init: API.MarkerVo = {}) => {
  const loading = ref(false)

  const markerData = ref<API.MarkerVo>(init)

  const { refresh: createMarker, onSuccess: onCreateSuccess, onError: onCreateError } = useFetchHook({
    loading,
    onRequest: () => Api.marker.createMarker(markerData.value),
  })

  const { refresh: updateMarker, onSuccess: onEditSuccess, onError: onEditError } = useFetchHook({
    loading,
    onRequest: () => Api.marker.updateMarker(markerData.value),
  })

  const deleteSuccessHook = createEventHook<void>()
  const deleteErrorHook = createEventHook<Error>()
  const deleteMarker = async () => {
    if (markerData.value.id === undefined)
      return
    try {
      loading.value = true
      await Api.marker.deleteMarker({ markerId: markerData.value.id })
      deleteSuccessHook.trigger()
    }
    catch (err) {
      deleteErrorHook.trigger(new Error(messageFrom(err)))
    }
    finally {
      loading.value = false
    }
  }

  return {
    markerData,
    loading,
    createMarker,
    updateMarker,
    deleteMarker,
    onCreateSuccess,
    onCreateError,
    onEditSuccess,
    onEditError,
    onDeleteSuccess: deleteSuccessHook.on,
    onDeleteError: deleteErrorHook.on,
  }
}
