<template>
  <v-container class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6" class="text-center">
        <h1 class="text-h1 mb-4">404</h1>
        <p class="text-h5 mb-8">お探しのページが見つかりません</p>
        <p class="text-body-1 mb-8">
          申し訳ございませんが、お探しのページは存在しないか、移動した可能性があります。
        </p>
        <v-btn color="primary" size="large" to="/">
          ホームに戻る
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// 404 Not Found page
</script>

<style scoped>
.fill-height {
  min-height: calc(100vh - 64px); /* ヘッダーの高さを考慮 */
}
</style>
