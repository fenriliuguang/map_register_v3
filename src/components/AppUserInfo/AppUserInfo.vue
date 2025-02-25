<script lang="ts" setup>
import { ElNotification } from 'element-plus'
import { PasswordEditor } from '.'
import { useUserStore } from '@/stores'
import { GSTab } from '@/components'

const userStore = useUserStore()

const checkArchive = () => {
  ElNotification.closeAll()
  ElNotification.warning({
    position: 'bottom-right',
    message: '暂无存档',
  })
}

const tabs: { title: string; value: string }[] = [
  { title: '云存档', value: 'archive' },
  { title: '编辑信息', value: 'info' },
  { title: '修改密码', value: 'password' },
]
const tab = ref('archive')
</script>

<template>
  <div class="user-info-dialog relative overflow-visible grid grid-cols-2 place-items-center genshin-text">
    <div class="bg-card rounded" />

    <div class="user-info rounded flex flex-col items-center gap-6 p-8 pt-28">
      <div class="banner absolute top-0 left-0 text-center text-xl p-4" />

      <div class="user-avatar flex justify-center items-center">
        <div class="user-avatar-img w-40 h-40" />
      </div>

      <div class="w-full flex flex-col items-center">
        <div class="flex items-center gap-2 text-3xl">
          {{ userStore.info.nickname }}
        </div>
        <div class="text-sm">
          UID: {{ userStore.info.id }}
        </div>
        <el-tag v-for="role in userStore.info.roleList" :key="role.id" type="success">
          {{ role.name }}
        </el-tag>
      </div>

      <div class="w-full flex flex-col text-2xl gap-2">
        <div class="flex justify-between bg-green">
          <div>手机</div>
          <div>{{ userStore.info.phone || '--' }}</div>
        </div>
        <div class="flex justify-between bg-brown">
          <div>QQ</div>
          <div>{{ userStore.info.qq }}</div>
        </div>
      </div>

      <div
        class="archive-preview flex-1 w-full grid place-items-center transition-all cursor-pointer active:brightness-95 select-none"
        @click="checkArchive"
      >
        当前存档: 无
      </div>
    </div>

    <div class="user-action w-full h-full p-8 pl-0">
      <GSTab v-model="tab" :tabs="tabs" class="h-full">
        <template #password>
          <PasswordEditor />
        </template>
      </GSTab>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-info-dialog {
  width: 1200px;
  height: 720px;
  color: #424F65;
  --paint-padding: 2;
  background: paint(user-card-border);
}

.bg-card {
  @keyframes rotateIn2 {
    from { rotate: 5deg }
    to { rotate: -1.5deg }
  }
  position: absolute;
  width: 540px;
  height: calc(100% + 4px);
  top: -2px;
  left: 30px;
  background: #F0EBE3;
  filter: drop-shadow(0 0 12px rgba(150, 150, 150, 0.2));
  animation: rotateIn2 400ms forwards;
}

.user-info {
  @keyframes rotateIn {
    from { rotate: 3deg }
    to { rotate: 0deg }
  }
  width: 540px;
  height: calc(100% + 4px);
  background: paint(user-card-info-border);
  filter: drop-shadow(0 0 12px rgba(150, 150, 150, 0.2));
  animation: rotateIn 400ms forwards;
  position: relative;
}

.banner {
  width: calc(100% - 8px);
  transform: translate(4px, 4px);
  height: 200px;
  background-image: url('https://webstatic.mihoyo.com/upload/static-resource/2023/02/17/2aef4ca8d191bb4a20465f32c2efdd75_7689351784861390069.jpg');
  background-size: cover;
  color: #F0EBE3;
  text-shadow: 0 0 2px #000;
}

.user-avatar {
  border-radius: 50%;
  background: radial-gradient(
    #CE9B76,
    #CE9B76 calc(61% + 2px),
    #F0EBE1 calc(61% + 3px),
    #F0EBE1 calc(61% + 8px),
    #D6C299 calc(61% + 9px),
    #D6C299);
  overflow: hidden;
  position: relative;
  filter: drop-shadow(0 0 6px #00000010);
  &::before {
    border-radius: 50%;
    content: '';
    background-image: url('https://webstatic.mihoyo.com/upload/contentweb/2022/10/20/62cb7fb1815d9d05d3ece2e0d8e85c7d_8731082942818264376.png');
    background-position: 50% 50%;
    position: absolute;
    background-size: cover;
    width: calc(90% - 1px);
    aspect-ratio: 1 / 1;
  }
}

.bg-green {
  background-color: #A7B982;
  color: #fff;
  padding: 4px 8px;
}

.bg-brown {
  background-color: #CDBBA5;
  color: #fff;
  padding: 4px 8px;
}

.archive-preview {
  border: 2px solid #E0D7C9;
  &:hover {
    background-color: #E9DFCE;
  }
}

.user-action {
  @keyframes slideIn {
    from {
      translate: -20px 0;
    }
    to {
      translate: 0 0;
    }
  }
  animation: slideIn 400ms forwards;
}
</style>
