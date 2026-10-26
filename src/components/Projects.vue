<script setup>
import ProjectCard from './ProjectCard.vue'
import { projects } from '../data/projects.js'
</script>

<template>
  <section id="projects" class="projects-section section-wrap"><div class="projects-intro reveal-on-scroll"><div><p class="eyebrow">LEARNING PROJECTS</p><h2>Small ideas,<br /><span>made with care.</span></h2></div><p class="projects-note">A few learning projects exploring useful ideas, thoughtful interfaces, and the details that make a product feel good to use.</p></div><div class="project-grid"><ProjectCard v-for="project in projects" :key="project.number" :project="project" /></div></section>
</template>
