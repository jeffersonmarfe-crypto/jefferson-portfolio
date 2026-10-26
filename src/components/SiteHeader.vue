<script setup>
import { ref } from 'vue'
const menu = ref(false)
const links = [{ label: 'About', href: '#about' }, { label: 'Projects', href: '#projects' }, { label: 'Contact', href: '#contact' }]
</script>

<template>
  <header class="site-header">
    <a class="brand" href="#home" aria-label="Marfee home"><span class="brand-mark">M</span><span>marfee<span class="brand-dot">.</span></span></a>
    <nav class="desktop-nav" aria-label="Main navigation"><a v-for="item in links" :key="item.label" :href="item.href">{{ item.label }}</a></nav>
    <a class="nav-cta" href="#contact">Let’s talk <v-icon icon="mdi-arrow-top-right" size="16" /></a>
    <v-btn class="mobile-menu" :icon="menu ? 'mdi-close' : 'mdi-menu'" variant="text" aria-label="Toggle navigation" aria-controls="mobile-navigation" :aria-expanded="menu" @click="menu = !menu" @keydown.esc="menu = false" />
    <div v-if="menu" id="mobile-navigation" class="mobile-links" @keydown.esc="menu = false"><a v-for="item in links" :key="item.label" :href="item.href" @click="menu = false">{{ item.label }}</a></div>
  </header>
</template>
