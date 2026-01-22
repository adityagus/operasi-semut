<template>
  <div>
    <Hero 
      @openRelawan="showRelawan = true" 
      @openKolaborasi="showKolaborasi = true"
    />
    
    <ScrollAnimated>
      <Kolaborasi />
    </ScrollAnimated>
    
    <ScrollAnimated>
      <RuangAksi />
    </ScrollAnimated>
    
    <ScrollAnimated>
      <VisiMisiSlider />
    </ScrollAnimated>
    
    <ScrollAnimated>
      <AnimatedStat />
    </ScrollAnimated>
    
    <ScrollAnimated>
      <Edukasi />
    </ScrollAnimated>
    
    <ScrollAnimated>
      <Testimoni @openCollaborations="showAllCollaborations = true" />
    </ScrollAnimated>
    
    <ScrollAnimated>
      <Blog />
    </ScrollAnimated>
    
    <!-- <ScrollAnimated>
      <InstagramFeed />
    </ScrollAnimated> -->
    
    <ScrollAnimated>
      <Faq />
    </ScrollAnimated>
    
    <!-- Modals -->
    <DaftarRelawan 
      :isOpen="showRelawan" 
      @close="showRelawan = false"
      @submit="handleRelawanSubmit"
    />
    
    <DaftarKolaborasi 
      :isOpen="showKolaborasi" 
      @close="showKolaborasi = false"
      @submit="handleKolaborasiSubmit"
    />
    
    <AllCollaborations 
      :isOpen="showAllCollaborations" 
      @close="showAllCollaborations = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Hero from '@/components/Hero.vue'
import ScrollAnimated from '@/components/ScrollAnimated.vue'
import VisiMisiSlider from '@/components/VisiMisiSlider.vue'
import AnimatedStat from '@/components/AnimatedStat.vue'
import Kolaborasi from '@/components/Kolaborasi.vue'
import RuangAksi from '@/components/RuangAksi.vue'
import Edukasi from '@/components/Edukasi.vue'
import Testimoni from '@/components/Testimoni.vue'
import Blog from '@/components/Blog.vue'
import InstagramFeed from '@/components/InstagramFeed.vue'
import Faq from '@/components/Faq.vue'
import DaftarRelawan from '@/components/DaftarRelawan.vue'
import DaftarKolaborasi from '@/components/DaftarKolaborasi.vue'
import AllCollaborations from '@/components/AllCollaborations.vue'

const showRelawan = ref(false)
const showKolaborasi = ref(false)
const showAllCollaborations = ref(false)

const handleRelawanSubmit = (data) => {
  console.log('Pendaftaran Relawan:', data)
  alert('Terima kasih telah mendaftar sebagai relawan!')
}

const handleKolaborasiSubmit = (data) => {
  console.log('Pengajuan Kolaborasi:', data)
  alert('Terima kasih! Proposal kolaborasi Anda akan segera kami review.')
}
</script>
