<template>
  <div>

  </div>
</template>

<script>


  const concatAll = () => {
    const result = [];

    // 用 apply 完成
    this.forEach((array) => {
      result.push.apply(result, array);
    });

    return result
  }

  export default {
    data() {

    },
    mounted() {

    },
  }
</script>
