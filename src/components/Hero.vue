<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
const root = ref(null)
let context
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  context = gsap.context(() => {
    gsap.from('.hero-reveal', { y: 30, opacity: 0, duration: 0.85, stagger: 0.12, ease: 'power3.out', delay: 0.15 })
    gsap.from('.portrait-card', { y: 35, opacity: 0, rotate: 2, duration: 1, ease: 'power3.out', delay: 0.45 })
  }, root.value)
})
onUnmounted(() => context?.revert())
</script>

<template>
  <section id="home" ref="root" class="hero page-wrap">
    <div class="hero-copy">
      <div class="availability hero-reveal"><span class="pulse"></span> OPEN TO LEARNING & COLLABORATION</div>
      <p class="eyebrow hero-reveal">HELLO, I’M</p>
      <h1 class="hero-reveal">Marfee<span class="period">.</span><br /><span class="hero-light">Building with</span><br /><span class="hero-green">curiosity.</span></h1>
      <p class="hero-description hero-reveal">Aspiring full-stack developer creating thoughtful, useful digital experiences — one project at a time.</p>
      <div class="hero-actions hero-reveal"><a class="button button-primary" href="#projects">View my work <v-icon icon="mdi-arrow-down" size="17" /></a><a class="button button-quiet" href="#contact">Get in touch <v-icon icon="mdi-arrow-top-right" size="17" /></a></div>
      <div class="hero-socials hero-reveal"><span>EXPLORING</span><span class="hero-skill">Vue</span><span class="hero-skill">Laravel</span><span class="hero-skill">PostgreSQL</span></div>
    </div>
    <div class="hero-visual">
      <div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div>
      <div class="portrait-card"><div class="portrait-top"><span>DEVELOPER IN PROGRESS</span><v-icon icon="mdi-arrow-top-right" size="18" /></div><div class="portrait-avatar" role="img" aria-label="Marfee monogram avatar"><div class="avatar-aura"></div><span class="avatar-monogram">M</span></div><div class="portrait-caption"><div><span class="caption-label">CURRENTLY LEARNING</span><strong>Full-stack development</strong></div><span class="caption-spark">✳</span></div></div>
      <div class="floating-note note-top"><v-icon icon="mdi-code-tags" /> <span>Curious by nature</span></div><div class="floating-note note-bottom"><span class="note-dot"></span> Design-minded developer</div>
      <span class="visual-index">01 — PORTFOLIO</span>
    </div>
    <a class="scroll-cue" href="#about"><span>SCROLL TO EXPLORE</span><i></i></a>
  </section>
</template>
