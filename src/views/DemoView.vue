<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { projects } from '../data/projects.js'

const route = useRoute()
const project = computed(() => projects.find((item) => item.slug === route.params.slug))
const watered = ref(false)
const savedCoffeeNotes = ref([])
const tasks = ref([
  { text: 'Sketch homepage concept', done: false },
  { text: 'Review project notes', done: false },
  { text: 'Take a mindful break', done: false },
])
const newTask = ref('')
const coffeePlaces = [
  { name: 'The slow morning', area: 'YOUR NEIGHBORHOOD', note: 'A quiet corner, a warm cup, and nowhere else to be.' },
  { name: 'A little afternoon pause', area: 'A PLACE TO UNWIND', note: 'Find a window seat and let the day soften around you.' },
  { name: 'One more good cup', area: 'SAVED FOR LATER', note: 'A new spot to explore when you have an open afternoon.' },
]
const coffeeIndex = ref(0)
const coffeePlace = computed(() => coffeePlaces[coffeeIndex.value])
const coffeeSaved = computed(() => savedCoffeeNotes.value.includes(coffeeIndex.value))
const completedCount = computed(() => tasks.value.filter((task) => task.done).length)
const demoRoot = ref(null)
let motionContext
onMounted(() => {
  try {
    const storedTasks = JSON.parse(localStorage.getItem('marfee-focus-tasks') || 'null')
    if (Array.isArray(storedTasks)) tasks.value = storedTasks
    const savedNotes = JSON.parse(localStorage.getItem('marfee-coffee-saved-notes') || '[]')
    if (Array.isArray(savedNotes)) savedCoffeeNotes.value = savedNotes
    watered.value = localStorage.getItem('marfee-verdant-watered') === 'true'
  } catch { /* Keep the starter tasks if browser storage is unavailable. */ }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  motionContext = gsap.context(() => gsap.from('.demo-panel', { y: 22, opacity: 0, duration: 0.65, ease: 'power2.out' }), demoRoot.value)
})
onUnmounted(() => motionContext?.revert())
watch(tasks, (value) => {
  try { localStorage.setItem('marfee-focus-tasks', JSON.stringify(value)) } catch { /* The checklist still works without storage. */ }
}, { deep: true })

function addTask() {
  const text = newTask.value.trim()
  if (!text) return
  tasks.value.push({ text, done: false })
  newTask.value = ''
}

function saveCoffeeNote() {
  savedCoffeeNotes.value = coffeeSaved.value
    ? savedCoffeeNotes.value.filter((index) => index !== coffeeIndex.value)
    : [...savedCoffeeNotes.value, coffeeIndex.value]
  try { localStorage.setItem('marfee-coffee-saved-notes', JSON.stringify(savedCoffeeNotes.value)) } catch { /* Saving remains available for this session. */ }
}

function waterPlant() {
  watered.value = !watered.value
  try { localStorage.setItem('marfee-verdant-watered', String(watered.value)) } catch { /* The reminder still works for this session. */ }
}
</script>

<template>
  <main class="demo-page" v-if="project">
    <header class="demo-header"><RouterLink class="brand" to="/"><span class="brand-mark">M</span><span>marfee<span class="brand-dot">.</span></span></RouterLink><RouterLink class="demo-back" to="/#projects"><v-icon icon="mdi-arrow-left" size="16" /> Back to portfolio</RouterLink></header>
    <section ref="demoRoot" class="demo-content"><p class="eyebrow">{{ project.category }} · INTERACTIVE PREVIEW</p><h1>{{ project.title }}</h1><p class="demo-description">{{ project.description }}</p>
      <div v-if="project.slug === 'verdant'" class="demo-panel plant-demo"><v-icon icon="mdi-leaf" size="42" /><small>YOUR GARDEN · PLANT 01</small><h2>Monstera Deliciosa</h2><p>{{ watered ? 'Watered today — nice work.' : 'Your plant is ready for a little care.' }}</p><v-btn color="primary" @click="waterPlant">{{ watered ? 'Undo watering' : 'Mark as watered' }}</v-btn></div>
      <div v-else-if="project.slug === 'daily-focus'" class="demo-panel focus-demo"><small>YOUR FOCUS LIST</small><h2>Make room for what matters.</h2><div v-for="(task, index) in tasks" :key="`${task.text}-${index}`" class="demo-task"><label><input v-model="task.done" type="checkbox" /><span :class="{ completed: task.done }">{{ task.text }}</span></label><button type="button" class="remove-task" :aria-label="`Remove ${task.text}`" @click="tasks.splice(index, 1)"><v-icon icon="mdi-close" size="16" /></button></div><form class="add-task" @submit.prevent="addTask"><input v-model="newTask" aria-label="New task" maxlength="80" placeholder="Add a task…" /><button type="submit" aria-label="Add task"><v-icon icon="mdi-plus" /></button></form><p class="task-count">{{ completedCount }} of {{ tasks.length }} complete</p><div class="task-progress"><span :style="{ width: tasks.length ? `${completedCount / tasks.length * 100}%` : '0%' }"></span></div></div>
      <div v-else class="demo-panel coffee-demo"><span class="coffee-cup">☕</span><small>{{ coffeePlace.area }} · FIELD NOTES</small><h2>{{ coffeePlace.name }}</h2><p>{{ coffeePlace.note }}</p><div class="coffee-actions"><v-btn color="primary" @click="saveCoffeeNote">{{ coffeeSaved ? 'Saved to your journal ✓' : 'Save this note' }}</v-btn><button class="next-note" type="button" @click="coffeeIndex = (coffeeIndex + 1) % coffeePlaces.length">Discover another <v-icon icon="mdi-arrow-right" size="16" /></button></div></div>
      <p class="demo-footnote">A small project preview, built as part of my learning journey.</p>
    </section>
  </main>
  <main v-else class="demo-page"><section class="demo-content"><p class="eyebrow">PROJECT NOT FOUND</p><h1>Let’s head back.</h1><RouterLink class="button button-primary" to="/">Return home</RouterLink></section></main>
</template>

<style scoped>
.demo-page{min-height:100vh;background:#10251c;color:#e9eee8}.demo-header{height:78px;width:min(1120px,calc(100% - 48px));margin:auto;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(223,239,222,.12)}.demo-back{font-size:12px;color:#b8c8ba;display:flex;align-items:center;gap:7px}.demo-content{width:min(660px,calc(100% - 40px));margin:0 auto;padding:90px 0}.demo-content h1{font:700 clamp(42px,8vw,68px)/1.1 Manrope,sans-serif;letter-spacing:-3px;margin:0}.demo-description{font-size:14px;line-height:1.8;color:#a9b8ac;max-width:510px}.demo-panel{margin-top:34px;background:#1a3426;border:1px solid rgba(223,239,222,.14);border-radius:7px;padding:32px;min-height:250px}.demo-panel small{display:block;font-size:9px;letter-spacing:1.5px;color:#a5b6a7;margin:13px 0}.demo-panel h2{font:600 24px Manrope;margin:7px 0}.demo-panel p{font-size:13px;color:#a9b8ac;line-height:1.7}.plant-demo>.v-icon,.coffee-cup{color:#bbd89a}.demo-panel :deep(.v-btn){margin-top:14px;color:#17291f}.demo-task{display:flex;align-items:center;gap:12px;border-top:1px solid rgba(223,239,222,.1);padding:15px 0;font-size:13px;color:#d7e1d7}.demo-task label{display:flex;align-items:center;gap:12px;flex:1;cursor:pointer}.demo-task input{accent-color:#bbd89a;width:16px;height:16px}.demo-task .completed{text-decoration:line-through;color:#869789}.remove-task{margin-left:auto;color:#93a394;cursor:pointer;border:0;background:transparent}.remove-task:hover{color:#ffb6a9}.add-task{display:flex;margin-top:8px;border:1px solid rgba(223,239,222,.14);border-radius:3px}.add-task input{flex:1;min-width:0;background:transparent;color:#e9eee8;border:0;padding:11px;font:inherit;font-size:12px;outline:none}.add-task button{border:0;background:transparent;color:#bbd89a;padding:0 12px;cursor:pointer}.task-progress{height:3px;background:#2b4434;border-radius:4px;overflow:hidden}.task-progress span{display:block;height:100%;background:#bbd89a;transition:width .25s}.demo-panel .task-count{font-size:11px}.coffee-cup{font-size:45px}.coffee-actions{display:flex;align-items:center;gap:20px;flex-wrap:wrap}.next-note{display:flex;align-items:center;gap:5px;background:none;color:#c7d4c8;border:0;cursor:pointer;font:inherit;font-size:11px}.next-note:hover{color:#bbd89a}.demo-footnote{margin-top:25px;font-size:11px;color:#829487}@media(max-width:600px){.demo-header{width:calc(100% - 36px)}.demo-content{padding-top:65px}.demo-panel{padding:23px}.coffee-actions{align-items:flex-start;flex-direction:column;gap:10px}}
</style>
