<template>
  <div>
    <Navbar 
      @openLogin="showLogin = true" 
      @openBlog="showBlogManagement = true"
    />
    
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
    
    <ScrollAnimated>
      <Faq />
    </ScrollAnimated>
    
    <Footer />
    
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
    
    <LoginModal 
      :isOpen="showLogin" 
      @close="showLogin = false"
      @login="handleLogin"
      @signup="handleSignup"
    />
    
    <AllCollaborations 
      :isOpen="showAllCollaborations" 
      @close="showAllCollaborations = false"
    />
    
    <BlogManagement 
      :isOpen="showBlogManagement" 
      @close="showBlogManagement = false"
      @viewBlog="viewBlogDetail"
    />
    
    <BlogDetail 
      :isOpen="showBlogDetail" 
      :blog="selectedBlog"
      @close="showBlogDetail = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import ScrollAnimated from './components/ScrollAnimated.vue';
import VisiMisiSlider from './components/VisiMisiSlider.vue';
import AnimatedStat from './components/AnimatedStat.vue';
import Kolaborasi from './components/Kolaborasi.vue';
import RuangAksi from './components/RuangAksi.vue';
import Edukasi from './components/Edukasi.vue';
import Testimoni from './components/Testimoni.vue';
import Blog from './components/Blog.vue';
import Faq from './components/Faq.vue';
import Footer from './components/Footer.vue';
import DaftarRelawan from './components/DaftarRelawan.vue';
import DaftarKolaborasi from './components/DaftarKolaborasi.vue';
import LoginModal from './components/LoginModal.vue';
import AllCollaborations from './components/AllCollaborations.vue';
import BlogManagement from './components/BlogManagement.vue';
import BlogDetail from './components/BlogDetail.vue';

const showRelawan = ref(false);
const showKolaborasi = ref(false);
const showLogin = ref(false);
const showAllCollaborations = ref(false);
const showBlogManagement = ref(false);
const showBlogDetail = ref(false);
const selectedBlog = ref(null);

const handleRelawanSubmit = (data) => {
  console.log('Pendaftaran Relawan:', data);
  alert('Terima kasih telah mendaftar sebagai relawan!');
};

const handleKolaborasiSubmit = (data) => {
  console.log('Pengajuan Kolaborasi:', data);
  alert('Terima kasih! Proposal kolaborasi Anda akan segera kami review.');
};

const handleLogin = (data) => {
  console.log('Login:', data);
  alert('Login berhasil!');
};

const handleSignup = (data) => {
  console.log('Sign Up:', data);
  alert('Akun berhasil dibuat!');
};

const viewBlogDetail = (blog) => {
  selectedBlog.value = blog;
  showBlogManagement.value = false;
  showBlogDetail.value = true;
};
</script>
