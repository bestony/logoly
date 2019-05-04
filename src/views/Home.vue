<template>
  <div id="home">
    <Carousel></Carousel>

    <div class="list">
      <h3 class="display-2 my-4 font-weight-bold text-uppercase text-xs-center">Generators</h3>
      <v-container fluid grid-list-xs>
        <v-layout row wrap>
          <GeneratorCard 
            image="p0rnhub.jpg"
            to="/generator/pornhub"
            mode="pornhub"
            title="P0rnhub Style"
            description="P*rnHub Style Logo Generator"
            ></GeneratorCard>
          <GeneratorCard 
            image="p0rnhub-app.jpg"
            to="/generator/pornhub-app"
            mode="pornhub"
            title="P0rnhub App Style"
            description="P*rnHub Style Logo Generator"
            ></GeneratorCard>

        </v-layout>
      </v-container>
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel.vue'
import GeneratorCard from '@/components/GeneratorCard.vue'
export default {
  components: {
    Carousel,
    GeneratorCard
  },
}
</script>
