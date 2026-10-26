<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SiteHeader from '../components/SiteHeader.vue'
import Hero from '../components/Hero.vue'
import About from '../components/About.vue'
import Projects from '../components/Projects.vue'
import Contact from '../components/Contact.vue'
import SiteFooter from '../components/SiteFooter.vue'

const page = ref(null)
let revealContext
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  gsap.registerPlugin(ScrollTrigger)
  revealContext = gsap.context(() => {
    gsap.utils.toArray('.reveal-on-scroll').forEach((element) => {
      gsap.from(element, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      })
    })
  }, page.value)
})
onUnmounted(() => revealContext?.revert())
</script>

<template><div ref="page" class="site-shell"><SiteHeader /><Hero /><About /><Projects /><Contact /><SiteFooter /></div></template>
