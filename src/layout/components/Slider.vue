<template>
  <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible class="scrollbar">
    <div class="logo" />
    <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys" @click="handleGoRouter">
      <template v-for="item in routerList" :key="item.path">
        <template v-if="!item.children">
          <!-- 如果没有子菜单，显示的就应该是第一层菜单 -->
          <a-menu-item v-if="!item.meta.hidden" :key="item.path">
            <svg-icon :name="item.meta.icon" :size="14" class="anticon" />
            <span>{{ item.meta.title }}</span>
          </a-menu-item>
        </template>
        <template v-else>
          <!-- 递归调用自身组件 -->
          <sub-menu :menu-info="item" :key="item.path" />
        </template>
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { MenuType } from '@/router/index'
import SubMenu from './SubMenu.vue'
import { useStore } from 'vuex'
defineProps({
  collapsed: Boolean
})
defineComponent({ SubMenu })

const router = useRouter()
const route = useRoute()
const store = useStore()
let routerList = ref<MenuType[]>([])
let selectedKeys = ref<string[]>([])

watch(
  () => route.path,
  () => {
    selectedKeys.value = [route.path]
  },
  {
    immediate: true
  }
)
onMounted(() => {
  routerList.value = store.getters['user/getMenu'][0].children || []
})
interface MenuClickType {
  key: string
}
const handleGoRouter = (menuItem: MenuClickType) => {
  router.push(menuItem.key)
}
</script>

<style lang="scss" scoped>
.logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
</style>
