<template>
  <div>
    Detail
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data () {
      return {

      }
    },
    mounted() {
      console.log(this.$route.query,'--------query')
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
