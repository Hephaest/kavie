<template>
  <main>
    <!-- Header -->
    <div
      class="flex md:flex-row flex-col justify-around items-center bg-gradient-to-r from-green-300 to-blue-300 p-8 md:space-x-4 space-y-6"
    >
      <!-- Slogan -->
      <figure>
        <blockquote class="flex flex-col bg-transparent text-gray-900 text-3xl">
          <svg
            width="45"
            height="36"
            class="mb-5 fill-current text-white self-start"
            style="transform: scale(0.8)"
          >
            <path
              d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"
            ></path>
          </svg>
          <p
            class="text-white px-14 font-semibold self-center"
            v-html="$t('brand.slogan')"
          ></p>
          <svg
            width="45"
            height="36"
            class="mt-5 fill-current text-white self-end"
            style="transform: rotate(180deg) scale(0.8)"
          >
            <path
              d="M13.415.001C6.07 5.185.887 13.681.887 23.041c0 7.632 4.608 12.096 9.936 12.096 5.04 0 8.784-4.032 8.784-8.784 0-4.752-3.312-8.208-7.632-8.208-.864 0-2.016.144-2.304.288.72-4.896 5.328-10.656 9.936-13.536L13.415.001zm24.768 0c-7.2 5.184-12.384 13.68-12.384 23.04 0 7.632 4.608 12.096 9.936 12.096 4.896 0 8.784-4.032 8.784-8.784 0-4.752-3.456-8.208-7.776-8.208-.864 0-1.872.144-2.16.288.72-4.896 5.184-10.656 9.792-13.536L38.183.001z"
            ></path>
          </svg>
        </blockquote>
      </figure>
      <!-- Figure -->
      <figure class="flex flex-col">
        <img
          class="shadow-2xl rounded-lg self-end h-48 w-auto"
          src="assets/img/about/header.jpg"
          alt="Red Velvet's 'Summer Magic'"
        />
        <figcaption class="bg-transparent text-white text-sm text-right">
          {{ $t('about.copyright') }}
        </figcaption>
      </figure>
    </div>
    <!-- Content -->
    <div
      class="container mx-auto my-2 flex flex-row items-start rubik-font text-gray-600 py-8 px-6"
    >
      <div class="md:w-9/12 w-full text-lg flex flex-col px-2">
        <!-- title -->
        <p class="text-4xl font-bold">{{ $t('about.title') }}</p>
        <!-- Author -->
        <div class="md:hidden self-start flex flex-col justify-center items-center mt-6 text-sm">
          <img
            class="rounded-full h-16 w-16 shadow-xl bg-white object-cover"
            src="/assets/img/about/me.JPG"
            alt="Creator Avatar"
          />
          <span class="text-gray-400 font-normal">{{ $t('about.creator') }}</span>
          <span class="font-medium">Miao Cai</span>
        </div>
        <!-- date -->
        <p class="text-gray-400 mt-4">{{ publishDate }}</p>
        <p
          class="self-start py-2 px-2 border-l-4 border-green-400 text-xl text-gray-500 my-4"
        >
          TL;DR {{ $t('brand.description') }}
        </p>
        <div class="mt-2 space-y-4">
          <p>{{ $t('about.body.para-1') }}</p>
          <p>{{ $t('about.body.para-2') }}</p>
          <p>{{ $t('about.body.para-3') }}</p>
          <p>{{ $t('about.body.para-4') }}</p>
        </div>
      </div>
      <div class="md:w-3/12 hidden md:flex flex-col justify-center items-center pt-6">
        <img
          class="rounded-full h-32 w-32 shadow-xl bg-white object-cover"
          src="/assets/img/about/me.JPG"
          alt="Creator Avatar"
        />
        <span class="text-lg text-gray-400 font-normal mt-3">{{ $t('about.creator') }}</span>
        <span class="text-2xl font-medium">Miao Cai</span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'About',
  computed: {
    publishDate() {
      return this.$t('timeFormat.fullDate', { year: 2021, month: 9, day: 3 });
    },
  },
};
</script>
