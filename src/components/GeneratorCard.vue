<template>
    <v-flex xs12 md6 xl3>
            <v-card class="mb-2 mx-2">
              <v-img :src="image" aspect-ratio="2"></v-img>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">{{title?title:'No Title'}}</h3>
                  <div>{{description?description:'No Description'}}</div>
                </div>
              </v-card-title>

              <v-card-actions>
                <v-btn flat color="orange" :to="to">Try it</v-btn>
                <v-btn flat color="orange" :to="inspiredPath">Get Inspired</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
</template>

<script>
export default {
    props:{
        image:String,
        to:String,
        mode:String,
        description: String,
        title: String,
    },
    computed:{
        inspiredPath(){
            return "/" + this.mode
        }
    }
}
</script>
