<template>
  <div>

    <Gauge t="14.5" h="46.8" title="Средние температура и влажность в доме"/>
    <Gauge t="25.6" h="63.7" title="Температура и влажность в зале"/>
    <Chartkick title="Средние температура и влажность в доме"/>
    
    
  </div>
</template>

<script>
import Gauge from '@/components/Gauge.vue';
import Chartkick from '@/components/Chartkick.vue';

export default { 
  data: () => ({
    
  }),
  components: {
    Gauge, Chartkick
  },
  created () {
     
  },
};
</script>

<style>

</style>