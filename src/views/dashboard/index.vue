<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <image-upload></image-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ImageUpload from "@/components/imageUpload/index";

export default {
    name: "Dashboard",
    computed: {
        ...mapGetters([
            "name"
        ])
    },
    components: { ImageUpload }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
 

 
  
</style>
