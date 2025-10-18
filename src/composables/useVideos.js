import { ref, computed, watch, onMounted } from 'vue'

export function useVideos() {
    const videos = ref([])
    const totalLikes = ref(0)
    const searchQuery = ref('')
    const isLoading = ref(true)

    const mockVideos = [
        {
            id: 1,
            title: 'Vue 3 Composition API Tutorial',
            channel: 'Vue Mastery',
            views: '125K',
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQoCpq4nNshZoWwgB72lAr1ETkwRBAAJk6g&s',
            liked: false
        },
        {
            id: 2,
            title: 'Meme compilation',
            channel: 'Meme',
            views: '89K',
            thumbnail: 'https://i.ytimg.com/vi/_JQP0kJNYqw/maxresdefault.jpg',
            liked: false
        },
        {
            id: 3,
            title: 'Brainrot Compilation',
            channel: 'Brbr Patapim',
            views: '234K',
            thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkeBQ4OljDBhQ3IzKDcui6ediE3_0FyJsTAw&s',
            liked: false
        },
        {
            id: 4,
            title: 'Doing UI in C to Piss Off the React devs\n',
            channel: 'Tsoding Daily',
            views: '156K',
            thumbnail: 'data:image/jpeg;base64,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',
            liked: false
        },
        {
            id: 5,
            title: 'Olise highlights',
            channel: 'BayernFan',
            views: '298K',
            thumbnail: 'https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_82,w_3711,h_2087/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/391/01jexr7v0c8pz643e5fp.jpg',
            liked: false
        },
    ]

    const filteredVideos = computed(() => {
        if (!searchQuery.value) {
            return videos.value
        }

        const query = searchQuery.value.toLowerCase()
        return videos.value.filter(video =>
            video.title.toLowerCase().includes(query) ||
            video.channel.toLowerCase().includes(query)
        )
    })

    const videoCount = computed(() => filteredVideos.value.length)

    watch(searchQuery, (newQuery) => {
        console.log(`Search query changed to: "${newQuery}"`)
        console.log(`Found ${videoCount.value} video(s)`)
    })

    const handleLike = (videoId) => {
        const video = videos.value.find(v => v.id === videoId)
        if (video && !video.liked) {
            video.liked = true
            totalLikes.value++
        }
    }

    const sortByViews = () => {
        videos.value.sort((a, b) => {
            const viewsA = parseInt(a.views.replace('K', '')) * 1000
            const viewsB = parseInt(b.views.replace('K', '')) * 1000
            return viewsB - viewsA
        })
    }

    onMounted(() => {
        setTimeout(() => {
            videos.value = mockVideos
            isLoading.value = false
            console.log('Videos loaded successfully')
        }, 1500)
    })

    return {
        videos,
        totalLikes,
        searchQuery,
        isLoading,
        filteredVideos,
        videoCount,
        handleLike,
        sortByViews
    }
}