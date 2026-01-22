
<template>
  <section class="py-12 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div class="max-w-2xl mx-auto">
        <div v-for="(faq, i) in faqs" :key="i" class="mb-4">
          <button
            @click="toggle(i)"
            :aria-expanded="open === i"
            :aria-controls="`faq-panel-${i}`"
            class="w-full text-left px-4 py-3 bg-white rounded shadow flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-red-600 transition-colors"
          >
            <span>{{ faq.q }}</span>
            <span class="text-red-600 text-xl">{{ open === i ? '-' : '+' }}</span>
          </button>
          <transition name="faq-fade">
            <div
              v-if="open === i"
              :id="`faq-panel-${i}`"
              class="px-4 py-2 text-gray-600 bg-gray-50 border-l-4 border-red-600"
              tabindex="0"
            >
              {{ faq.a }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const faqs = [
  { q: 'Apa itu Operasi Semut?', a: 'Operasi Semut adalah gerakan kolektif untuk menjaga kebersihan lingkungan.' },
  { q: 'Kapan dan di mana Operasi Semut dilaksanakan?', a: 'Aksi dilakukan di berbagai lokasi secara berkala.' },
  { q: 'Siapa saja yang bisa ikut Operasi Semut?', a: 'Siapa saja yang peduli lingkungan dapat bergabung.' },
  { q: 'Apa yang perlu dibawa saat mengikuti kegiatan?', a: 'Bawa semangat, alat kebersihan, dan perlengkapan pribadi.' },
];
const open = ref(null);
function toggle(i) { open.value = open.value === i ? null : i; }
</script>

<style scoped>
.faq-fade-enter-active, .faq-fade-leave-active {
  transition: opacity 0.3s, max-height 0.3s;
  max-height: 200px;
}
.faq-fade-enter-from, .faq-fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
