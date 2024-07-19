<template>
  <div class="attr">
    <div class="three-category">
      <Category></Category>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.attr {
  height: 100%;
  width: 100%;
  padding: 20px;
  .three-category {
    width: 100%;
    :deep(.el-card__body){
      display: flex;
      .category {
        margin-right: 20px;
      }
    }
  }
}
</style>