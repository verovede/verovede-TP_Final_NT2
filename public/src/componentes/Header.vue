<template>
  <section>
    <div class="container-fluid">
      <img class="d-block w-100" src="img/slide01.jpg" />
    </div>
  </section>
</template>

<script>
export default {
  components: { },

  name: "src-componentes-header",

  props: [],

  mounted() {},
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  methods: {
    onSlideStart(slide) {
      console.log(slide);
      this.sliding = true;
    },
    onSlideEnd(slide) {
      console.log(slide);
      this.sliding = false;
    },
  },
  computed: {},
};
</script>

<style scoped lang="css">
</style>
