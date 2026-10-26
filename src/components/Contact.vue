<script setup>
import { reactive, ref } from 'vue'

const form = reactive({ name: '', email: '', message: '' })
const sending = ref(false)
const feedback = ref('')
const feedbackType = ref('')

async function submitMessage() {
  if (sending.value) return
  sending.value = true
  feedback.value = ''

  try {
    const endpoint = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/contact'
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(form),
    })
    const result = await response.json().catch(() => ({}))
    if (!response.ok) {
      const firstError = Object.values(result.errors || {})[0]
      throw new Error(Array.isArray(firstError) ? firstError[0] : result.message || 'Please check your details and try again.')
    }
    form.name = ''
    form.email = ''
    form.message = ''
    feedbackType.value = 'success'
    feedback.value = 'Thanks for reaching out. Your message has been received.'
  } catch (error) {
    feedbackType.value = 'error'
    feedback.value = error instanceof TypeError
      ? 'The contact service is unavailable right now. Please try again in a little while.'
      : error.message
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <section id="contact" class="contact-section section-wrap reveal-on-scroll">
    <div class="contact-layout">
      <div class="contact-copy-column">
        <div class="contact-top"><p class="eyebrow">HAVE A PROJECT IN MIND?</p><span class="contact-star">✳</span></div>
        <h2>Let’s make<br /><span>something meaningful.</span></h2>
        <p class="contact-copy">I’m always glad to meet kind people, exchange ideas, and learn about interesting projects. Leave a note and share what you’re working on.</p>
        <div class="contact-prompt"><span class="prompt-mark"><v-icon icon="mdi-message-text-outline" /></span><span>Tell me a little about what you’re working on.</span></div>
      </div>
      <form class="contact-form" @submit.prevent="submitMessage">
        <label for="contact-name">Your name</label>
        <input id="contact-name" v-model.trim="form.name" name="name" type="text" autocomplete="name" maxlength="100" placeholder="How should I address you?" required />
        <label for="contact-email">Email address</label>
        <input id="contact-email" v-model.trim="form.email" name="email" type="email" autocomplete="email" maxlength="255" placeholder="you@example.com" required />
        <label for="contact-message">Your message</label>
        <textarea id="contact-message" v-model.trim="form.message" name="message" rows="4" maxlength="5000" placeholder="A few details about your idea..." required></textarea>
        <p v-if="feedback" class="form-feedback" :class="`feedback-${feedbackType}`" role="status" aria-live="polite">{{ feedback }}</p>
        <button class="contact-button" type="submit" :disabled="sending"><span>{{ sending ? 'Sending…' : 'Send message' }}</span><v-icon :icon="sending ? 'mdi-loading' : 'mdi-arrow-top-right'" :class="{ spinning: sending }" /></button>
      </form>
    </div>
  </section>
</template>
