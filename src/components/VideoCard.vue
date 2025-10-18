<template>
  <div class="video-card" :class="{ 'dark-theme': isDarkMode }">
    <img :src="thumbnail" :alt="title" class="thumbnail" />
    <div class="video-info">
      <h3 class="title">{{ title }}</h3>
      <p class="channel">{{ channel }}</p>
      <div class="meta">
        <span class="views">{{ views }} views</span>
        <button
            @click="handleLikeClick"
            class="like-btn"
            :class="{ liked: isLiked }"
            :disabled="isLiked"
        >
          {{ isLiked ? '❤️ Liked' : '🤍 Like' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  channel: {
    type: String,
    required: true
  },
  views: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  liked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['liked'])

const isLiked = ref(props.liked)

const isDarkMode = inject('isDarkMode', ref(false))

const handleLikeClick = () => {
  if (!isLiked.value) {
    isLiked.value = true
    emit('liked', props.id)
  }
}
</script>

<style scoped>
.video-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
}

.video-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.video-card.dark-theme {
  background: #2d2d2d;
  color: #e0e0e0;
}

.thumbnail {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}

.video-info {
  padding: 12px;
}

.title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dark-theme .title {
  color: #ffffff;
}

.channel {
  font-size: 14px;
  color: #606060;
  margin: 0 0 8px 0;
}

.dark-theme .channel {
  color: #aaaaaa;
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.views {
  font-size: 13px;
  color: #606060;
}

.dark-theme .views {
  color: #aaaaaa;
}

.like-btn {
  background: #f0f0f0;
  border: none;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.like-btn:hover:not(:disabled) {
  background: #e0e0e0;
  transform: scale(1.05);
}

.like-btn.liked {
  background: #ffd6d6;
  cursor: not-allowed;
}

.dark-theme .like-btn {
  background: #3d3d3d;
  color: #e0e0e0;
}

.dark-theme .like-btn:hover:not(:disabled) {
  background: #4d4d4d;
}

.dark-theme .like-btn.liked {
  background: #4d2626;
}

.like-btn:disabled {
  opacity: 0.7;
}
</style>