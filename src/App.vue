<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <header class="header">
      <div class="header-content">
        <h1 class="logo">📺 MiniTube</h1>
        <div class="header-actions">
          <span class="likes-counter">❤️ {{ totalLikes }} Total Likes</span>
          <button @click="toggleTheme" class="theme-toggle">
            {{ isDarkMode ? '☀️ Light' : '🌙 Dark' }}
          </button>
        </div>
      </div>
    </header>

    <div class="controls">
      <div class="search-section">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Search videos by title or channel..."
            class="search-input"
        />
        <div class="search-info">
          <span class="video-count">
            {{ videoCount }} video{{ videoCount !== 1 ? 's' : '' }} found
          </span>
          <button @click="sortByViews" class="sort-btn">
            📊 Sort by Views
          </button>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      <div class="spinner"></div>
      <p>Loading videos...</p>
    </div>

    <div v-else class="container">
      <div v-if="filteredVideos.length === 0" class="empty-state">
        <h2>No videos found.</h2>
        <p>Try adjusting your search query.</p>
      </div>

      <div v-else class="video-grid">
        <VideoCard
            v-for="video in filteredVideos"
            :key="video.id"
            :id="video.id"
            :title="video.title"
            :channel="video.channel"
            :views="video.views"
            :thumbnail="video.thumbnail"
            :liked="video.liked"
            @liked="handleLike"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import VideoCard from './components/VideoCard.vue'
import { useVideos } from './composables/useVideos'

const {
  totalLikes,
  searchQuery,
  isLoading,
  filteredVideos,
  videoCount,
  handleLike,
  sortByViews
} = useVideos()

const isDarkMode = ref(false)

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
}

provide('isDarkMode', isDarkMode)
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f9f9f9;
  transition: background-color 0.3s;
}

#app {
  min-height: 100vh;
  transition: background-color 0.3s;
}

#app.dark-mode {
  background: #181818;
  color: #e0e0e0;
}

.header {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark-mode .header {
  background: #212121;
  border-bottom-color: #303030;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 700;
  color: #ff0000;
  margin: 0;
}

.header-actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.likes-counter {
  font-size: 16px;
  font-weight: 600;
  padding: 8px 16px;
  background: #f0f0f0;
  border-radius: 20px;
}

.dark-mode .likes-counter {
  background: #2d2d2d;
  color: #e0e0e0;
}

.theme-toggle {
  padding: 8px 16px;
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 600;
}

.theme-toggle:hover {
  background: #e0e0e0;
  transform: scale(1.05);
}

.dark-mode .theme-toggle {
  background: #2d2d2d;
  color: #e0e0e0;
}

.dark-mode .theme-toggle:hover {
  background: #3d3d3d;
}

.controls {
  max-width: 1400px;
  margin: 24px auto;
  padding: 0 24px;
}

.search-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.search-input {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 24px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #ff0000;
}

.dark-mode .search-input {
  background: #2d2d2d;
  border-color: #3d3d3d;
  color: #e0e0e0;
}

.dark-mode .search-input:focus {
  border-color: #ff0000;
}

.search-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.video-count {
  font-size: 14px;
  color: #606060;
  font-weight: 600;
}

.dark-mode .video-count {
  color: #aaaaaa;
}

.sort-btn {
  padding: 8px 16px;
  background: #ff0000;
  color: white;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.sort-btn:hover {
  background: #cc0000;
  transform: scale(1.05);
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top-color: #ff0000;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.dark-mode .spinner {
  border-color: #2d2d2d;
  border-top-color: #ff0000;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #606060;
}

.dark-mode .empty-state {
  color: #aaaaaa;
}

.empty-state h2 {
  font-size: 28px;
  margin-bottom: 8px;
}

.empty-state p {
  font-size: 16px;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 12px;
  }

  .video-grid {
    grid-template-columns: 1fr;
  }

  .search-info {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .sort-btn {
    width: 100%;
  }
}
</style>