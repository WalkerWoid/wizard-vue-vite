<script setup>
import {useWizardState} from "@/stores/store.js"
import {provide, reactive, ref, watch} from "vue"
import {storeToRefs} from "pinia"
import Variant from "@/components/Variant.vue"

const store = useWizardState()
const {data, currentStep, result} = storeToRefs(store)
const inputCheckbox = ref([])
const inputSelect = ref('')
const inputPrice = reactive({})

provide('inputCheckbox', inputCheckbox)
provide('inputSelect', inputSelect)
provide('inputPrice', inputPrice)


watch(() => inputCheckbox.value, (newCheck, oldCheck) => {
  inputPrice[`step${currentStep.value}Check`] = inputCheckbox.value
  console.log(newCheck)

  if (newCheck.length === 0) {
    delete data.value[currentStep.value-1].selected
  }
})
watch(() => inputSelect.value, (newSelect, oldSelect) => {
  inputPrice[`step${currentStep.value}Select`] = inputSelect.value

  if (Object.keys(newSelect).length === 0) {
    delete data.value[oldSelect.step].selected
  }
})


</script>

<template>
  <form action="#" class="wizard__container">
    <ul class="steps__container">
      <li class="step" v-for="(step, index) of data">
        <h3 :class="{_disabled: index !== currentStep-1}"
            @click="store.changeStep(index)">{{step.title}}</h3>

        <ul class="subSteps__container" v-show="index === currentStep-1">
          <Variant v-for="(variant, index) of step.variants"
                   :variant="variant"
                   :index="index"
                   :key="variant.title" />
        </ul>
      </li>
    </ul>


    <button type="button" class="result">
      Итого к оплате <span>{{result}} ₽</span>
    </button>
  </form>
</template>

<style>
.wizard__container {
  max-width: 980px;
  width: 100%;
  padding: var(--gap);
  margin: 0 auto;
}

.step {
  border-top: 2px solid var(--color-border);
  padding-top: var(--gap);
  transition-duration: var(--transition);

}
.step h3 {
  cursor: pointer;
}
.step h3._disabled {
  color: var(--color-gray)
}
.step._hidden {
  overflow: hidden;
}

.result {
  background-color: var(--color-green);
  font-size: 30px;
  display: flex;
  align-items: center;
  gap: var(--gap);
  padding: var(--gap);
  color: white;
  width: 100%;
  border-radius: calc(2 * var(--radius));
  margin-top: var(--gap);
  justify-content: space-between;
  cursor: pointer;
}
</style>