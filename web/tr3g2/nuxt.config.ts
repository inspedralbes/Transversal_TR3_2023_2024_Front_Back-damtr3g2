// https://nuxt.com/docs/api/configuration/nuxt-config
//defineNuxtConfig
export default ({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },

  modules: [
    'nuxt-socket-io',
    '@nuxtjs/tailwindcss',
    '@formkit/auto-animate'
  ],

  io: {
    sockets: [{
      name: 'main',
      url: 'http://localhost:3001'
    }]  
}
});