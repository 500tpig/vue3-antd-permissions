<template>
  <a-sub-menu :key="menuInfo.name" v-bind="$attrs">
    <template #title>
      <span>
        <svg-icon :name="menuInfo.meta.icon" :size="14" class="anticon" />
        <span>{{ menuInfo.meta.title }}</span>
      </span>
    </template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children">
        <a-menu-item :key="item.path">
          <svg-icon v-if="item?.meta?.icon" :name="item.meta.icon" :size="14" class="anticon" />
          <span>
            {{ item?.meta?.title }}
          </span>
        </a-menu-item>
      </template>
      <template v-else>
        <!-- 递归调用自身组件 -->
        <sub-menu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
import { MenuType } from '@/router/index'
defineProps({
  menuInfo: {
    type: Object as () => MenuType,
    default: () => ({})
  }
})
</script>

<style lang="scss" scoped></style>
