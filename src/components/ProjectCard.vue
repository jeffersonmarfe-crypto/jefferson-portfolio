<script setup>
defineProps({ project: { type: Object, required: true } })
</script>

<template>
  <article class="project-card reveal-on-scroll">
    <div class="project-art" :class="`art-${project.art}`">
      <div class="art-window"><div class="window-bar"><span></span><span></span><span></span><i>{{ project.title }}</i></div>
        <div v-if="project.art === 'plant'" class="plant-ui"><div class="ui-side"><b>v.</b><span>⌂</span><span>♧</span><span>◷</span></div><div class="ui-main"><small>YOUR GARDEN</small><strong>Grow beautifully.</strong><div class="plant-feature"><span>Monstera Deliciosa<br /><small>Next watering · Tomorrow</small></span><div class="plant-illustration">♧</div></div><div class="ui-stats"><span>03 plants</span><span>02 tasks today</span></div></div></div>
        <div v-else-if="project.art === 'focus'" class="focus-ui"><small>MONDAY, 09:41 AM</small><strong>Make room<br />for what matters.</strong><div class="task-line"><span class="task-check">✓</span> Sketch homepage concept</div><div class="task-line"><span class="task-check"></span> Review project notes</div><div class="task-line"><span class="task-check"></span> Take a mindful break</div></div>
        <div v-else class="coffee-ui"><small>FIELD NOTES · ISSUE 04</small><div class="coffee-photo"><span>☕</span></div><strong>Slow mornings,<br />good coffee.</strong><div class="coffee-meta">PHILIPPINES&nbsp; · &nbsp;COFFEE NOTES</div></div>
      </div><span class="art-label">{{ project.category }}</span>
    </div>
    <div class="project-details"><div class="project-title-row"><span class="project-number">{{ project.number }}</span><h3>{{ project.title }}</h3><v-icon :icon="project.icon" size="21" class="project-icon" /></div><p>{{ project.description }}</p><div class="tag-list"><span v-for="tag in project.tags" :key="tag">{{ tag }}</span></div><div class="project-links"><RouterLink :to="`/projects/${project.slug}`">Explore project <v-icon icon="mdi-arrow-top-right" size="15" /></RouterLink></div></div>
  </article>
</template>
