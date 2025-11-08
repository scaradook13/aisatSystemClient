<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800">
    <div class="flex flex-col items-center space-y-4">
      <!-- Spinner -->
      <div
        v-if="status === 'connecting'"
        class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
      ></div>

      <!-- Disconnected -->
      <div v-else-if="status === 'disconnected'" class="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto text-red-600 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m0 3.75h.007M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="font-semibold text-lg">Server Not Reachable</p>
        <p class="text-gray-500 mt-1">Please check your internet or try again later.</p>
        <button
          @click="checkConnection"
          class="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry Connection
        </button>
      </div>

      <!-- Connected -->
      <div v-else-if="status === 'connected'" class="text-center text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p class="font-semibold text-lg">Connected Successfully</p>
      </div>
    </div>

    <p v-if="status === 'connecting'" class="mt-6 text-gray-600 text-lg font-medium">
      Connecting to AISAT System API...
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { apiStatus } from "@/stores/apiStatus";
import { useRouter } from 'vue-router';
import AuthService from "@/api/AuthService";

const router = useRouter();
const status = ref("connecting"); // connecting | connected | disconnected
let retryTimer = null; // store timer reference

const checkConnection = async () => {
  status.value = "connecting";

  try {
    const res = await AuthService.ping();

    if (res.success) {
      apiStatus.reachable = true;
      status.value = "connected";

      // ✅ Clear retry timer if running
      if (retryTimer) clearTimeout(retryTimer);

      // ✅ Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 500);
    } else {
      throw new Error("Ping failed");
    }
  } catch (err) {
    apiStatus.reachable = false;
    status.value = "disconnected";

    // 🔁 Retry after 3 seconds
    if (!retryTimer) {
      retryTimer = setTimeout(() => {
        retryTimer = null;
        checkConnection();
      }, 3000);
    }
  }
};

onMounted(() => {
  checkConnection();
});
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
