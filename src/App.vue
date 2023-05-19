<script setup lang="ts">
import { ref, onMounted } from "vue";
const currentRange = ref(10);
const includeUpperCase = ref(false);
const includeLowerCase = ref(false);
const includeNumbers = ref(false);
const includeSymbols = ref(false);
const randPassword = ref("P4$5W0rD1");
const disable_copy = ref(true);
const pass_test = ref({
  weak: false,
  medium: false,
  strong: false,
});
const genPassword = () => {
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowerCase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+~`|}{[]\:;?><,./-=";
  // const charset = `${upperCase}${lowerCase}${numbers}${symbols}`;

  let password = "";
  let pass_chars = [];
  while (pass_chars.length < currentRange.value) {
    if (includeUpperCase.value) {
      pass_chars.push(upperCase[Math.floor(Math.random() * upperCase.length)]);
    }
    if (includeLowerCase.value) {
      pass_chars.push(lowerCase[Math.floor(Math.random() * lowerCase.length)]);
    }
    if (includeNumbers.value) {
      pass_chars.push(numbers[Math.floor(Math.random() * numbers.length)]);
    }
    if (includeSymbols.value) {
      pass_chars.push(symbols[Math.floor(Math.random() * symbols.length)]);
    }
  }
  password = pass_chars.slice(0, currentRange.value).join("");
  console.log(password);
  console.log(password);
  console.log(pass_chars);
  // console.log(upperCase[Math.floor(Math.random() * upperCase.length)]);
  // for (let index = 0; index < currentRange.value; index++) {
  //   if (includeUpperCase.value) {
  //     password += upperCase[Math.floor(Math.random() * upperCase.length)];
  //     console.log(password);
  //   }
  //   if (includeLowerCase.value) {
  //     password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  //     console.log(password);
  //   }
  //   if (includeNumbers.value) {
  //     password += numbers[Math.floor(Math.random() * numbers.length)];
  //     console.log(password);
  //   }
  //   if (includeSymbols.value) {
  //     password += symbols[Math.floor(Math.random() * symbols.length)];
  //     console.log(password);
  //   }
  //   if (
  //     !includeUpperCase.value &&
  //     !includeLowerCase.value &&
  //     !includeNumbers.value &&
  //     !includeSymbols.value
  //   ) {
  //     password = "SELECT ONE CHOICE";
  //     disable_copy.value = true;
  //     randPassword.value = password;
  //   }
  // }
  // for (let i = 0; i < Number(currentRange.value); i++) {
  //   if (includeUpperCase.value) {
  //     password += upperCase[Math.floor(Math.random() * upperCase.length)];
  //     console.log(password);
  //   }
  //   if (includeLowerCase.value) {
  //     password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
  //     console.log(password);
  //   }
  //   if (includeNumbers.value) {
  //     password += numbers[Math.floor(Math.random() * numbers.length)];
  //     console.log(password);
  //   }
  //   if (includeSymbols.value) {
  //     password += symbols[Math.floor(Math.random() * symbols.length)];
  //     console.log(password);
  //   }
  //   if (
  //     !includeUpperCase.value &&
  //     !includeLowerCase.value &&
  //     !includeNumbers.value &&
  //     !includeSymbols.value
  //   ) {
  //     password = "SELECT ONE CHOICE";
  //     disable_copy.value = true;
  //     randPassword.value = password;
  //     return password;
  //   }
  // }
  console.log(password);
  disable_copy.value = false;
  randPassword.value = password;
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );
  if (strongPassword.test(password)) {
    pass_test.value.strong = true;
    pass_test.value.weak = false;
    pass_test.value.medium = false;
    console.log("strong password");
  } else if (mediumPassword.test(password)) {
    console.log("medium password");
    pass_test.value.medium = true;
    pass_test.value.weak = false;
    pass_test.value.strong = false;
  } else {
    console.log("weak password");
    pass_test.value.weak = true;
    pass_test.value.medium = false;
    pass_test.value.strong = false;
  }

  return password;
};
const copyPassword = () => {
  navigator.clipboard.writeText(randPassword.value);
};
onMounted(() => {
  disable_copy.value = true;
});
</script>

<template>
  <div
    class="app-container bg-main h-screen w-full text-white flex justify-center items-center"
  >
    <div class="password-gen-container flex flex-col gap-10 w-[400px]">
      <div class="pass-gen-title text-gray-500 text-center text-2xl">
        Password Generator
      </div>
      <div
        class="pass-gen-output flex justify-between items-center bg-seconday p-5"
      >
        <p
          class="gened-pass text-2xl text-gray-600 whitespace-nowrap overflow-x-scroll"
        >
          {{ randPassword }}
        </p>
        <button
          class="copy-pass text-light-green cursor-pointer p-2 rounded-xl disabled:text-gray-500"
          @click="copyPassword()"
          :disabled="disable_copy"
          :class="!disable_copy ? 'hover:bg-gray-600' : ''"
        >
          <svg
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
          >
            <path
              d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"
            />
          </svg>
        </button>
      </div>
      <div class="pass-gen-body bg-seconday p-5 py-10">
        <div class="pass-gen-body-length">
          <div class="text flex justify-between items-center">
            <p>Character Length</p>
            <p class="text-light-green">{{ currentRange }}</p>
          </div>
          <div class="length-input relative">
            <input
              class="overflow-hidden h-4 w-full accent-light-green"
              type="range"
              min="5"
              max="100"
              step="1"
              v-model="currentRange"
            />
          </div>
        </div>
        <div class="pass-gen-choices flex flex-col">
          <div class="include-upper-case flex gap-3">
            <input
              type="checkbox"
              name=""
              id=""
              class="accent-light-green w-5"
              v-model="includeUpperCase"
            />
            <p>Include Uppercase Letters</p>
          </div>
          <div class="include-upper-case flex gap-3">
            <input
              type="checkbox"
              name=""
              id=""
              class="accent-light-green w-5"
              v-model="includeLowerCase"
            />
            <p>Include Lowercase Letters</p>
          </div>
          <div class="include-upper-case flex gap-3">
            <input
              type="checkbox"
              name=""
              id=""
              class="accent-light-green w-5"
              v-model="includeNumbers"
            />
            <p>Include Numbers</p>
          </div>
          <div class="include-upper-case flex gap-3">
            <input
              type="checkbox"
              name=""
              id=""
              class="accent-light-green w-5"
              v-model="includeSymbols"
            />
            <p>Include Symbols</p>
          </div>
        </div>
        <div
          class="pass-strength flex justify-between items-center mt-7 bg-dark p-5"
        >
          <p class="text-gray-500">STRENGTH</p>
          <template v-if="pass_test.weak">
            <div class="strength-levels flex gap-2">
              <div class="level-1 border-2 p-1 h-10 w-2 bg-red-500"></div>
              <div class="level-2 border-2 p-1 h-10 w-2"></div>
              <div class="level-3 border-2 p-1 h-10 w-2"></div>
              <div class="level-4 border-2 p-1 h-10 w-2"></div>
            </div>
          </template>
          <template v-else-if="pass_test.medium">
            <div class="strength-levels flex gap-2">
              <div class="level-1 border-2 p-1 h-10 w-2 bg-yellow-300"></div>
              <div class="level-2 border-2 p-1 h-10 w-2 bg-yellow-300"></div>
              <div class="level-3 border-2 p-1 h-10 w-2 bg-yellow-300"></div>
              <div class="level-4 border-2 p-1 h-10 w-2"></div>
            </div>
          </template>
          <template v-else-if="pass_test.strong">
            <div class="strength-levels flex gap-2">
              <div class="level-1 border-2 p-1 h-10 w-2 bg-green-500"></div>
              <div class="level-2 border-2 p-1 h-10 w-2 bg-green-500"></div>
              <div class="level-3 border-2 p-1 h-10 w-2 bg-green-500"></div>
              <div class="level-4 border-2 p-1 h-10 w-2 bg-green-500"></div>
            </div>
          </template>
          <template v-else>
            <div class="strength-levels flex gap-2">
              <div class="level-1 border-2 p-1 h-10 w-2"></div>
              <div class="level-2 border-2 p-1 h-10 w-2"></div>
              <div class="level-3 border-2 p-1 h-10 w-2"></div>
              <div class="level-4 border-2 p-1 h-10 w-2"></div>
            </div>
          </template>
        </div>
        <div class="pass-gen-submit">
          <button
            class="bg-light-green flex justify-center items-center gap-2 p-5 w-full text-dark mt-10"
            @click="genPassword"
          >
            <span class="text-2xl font-bold"> GENERATE </span>
            <span class="font-bold">
              <svg
                width="20"
                height="20"
                viewBox="0 0 27 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3201 0.778931L25.5684 8.36682C26.002 8.78596 26.2188 9.35686 26.2188 9.98557C26.2188 10.6143 26.002 11.178 25.5684 11.6043L18.3201 19.2211C17.4602 20.1244 16.0582 20.1244 15.1982 19.2211C14.3383 18.3178 14.3383 16.858 15.1982 15.9547L18.6814 12.3125H2.9998C1.77129 12.3125 0.78125 11.2791 0.78125 10C0.78125 8.72092 1.77129 7.68752 2.99258 7.68752H18.6742L15.191 4.04534C14.3311 3.14202 14.3311 1.68225 15.191 0.778931C16.0582 -0.12439 17.4529 -0.12439 18.3201 0.778931Z"
                  fill="black"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gened-pass::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
