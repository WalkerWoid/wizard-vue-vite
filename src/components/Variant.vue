<script setup>
import {computed, inject} from "vue";
import {useWizardState} from "@/stores/store.js";
import {storeToRefs} from "pinia";

const definedProps = defineProps({
  variant: Object,
  index: Number
})
const store = useWizardState()
const {currentStep, data} = storeToRefs(store)

const inputCheckbox = inject('inputCheckbox')
const inputSelect = inject('inputSelect')
const inputPrice = inject('inputPrice')

const nextStep = () => {
  const {options, select, price_default: priceDefault} = definedProps.variant
  const step = currentStep.value-1

  if (options.length > 0 && inputCheckbox.value.length > 0) {
    store.clearCheckedVariants(currentStep.value)
    delete data.value[step].selected
    data.value[step].selected = inputCheckbox.value.map(checkItem => checkItem)
    definedProps.variant.chosen = true
    store.changeStep()
  }
  if (Object.keys(select).length > 0 && Object.keys(inputSelect.value).length > 0) {
    store.clearCheckedVariants(currentStep.value)
    delete data.value[step].selected
    data.value[step].selected = [inputSelect.value]
    definedProps.variant.chosen = true
    store.changeStep()
  }
  if (options.length === 0 && Object.keys(select).length === 0) {
    store.clearCheckedVariants(currentStep.value)
    delete data.value[step].selected
    data.value[step].selected = [{price: priceDefault}]
    definedProps.variant.chosen = true
    store.changeStep()
  }
}

const variantPriceCheck = computed(() => {
  return inputPrice[`step${currentStep.value}Check`]
      ? inputPrice[`step${currentStep.value}Check`].reduce((accum, option) => accum + option.price, 0)
      : definedProps.variant.price_default
})
const variantPriceSelect = computed(() => {
  return inputPrice[`step${currentStep.value}Select`]
      ? inputPrice[`step${currentStep.value}Select`].price
      : definedProps.variant.price_default
})
</script>

<template>
  <li class="subStep">
    <div class="block__left">
      <h4 class="block__header">{{ variant.title }}</h4>
      <div class="block__text">
        <p v-for="paragraph of variant.description.split('\n')">{{ paragraph }}</p>
      </div>
    </div>

    <div class="block__right">
      <span class="price" v-if="variant.options.length >= 1">
        {{variantPriceCheck}}
      </span>
      <span class="price" v-else-if="variant.select.length >= 1">
        {{ variantPriceSelect }}
      </span>
      <span class="price" v-else>
        {{ variant.price_default }}
      </span>

      <div class="form__block">
        <template v-if="variant.options">
          <label v-for="option of variant.options" class="label__option">
            <input type="checkbox" name="option"
                   :value="option" v-model="inputCheckbox">
            <span class="checked"><img src="@/assets/images/check-icon.png" alt="check-icon"></span>
            {{ option.title }}
          </label>
        </template>

        <template v-if="variant.select">
          <label v-for="selectUnit of variant.select" class="container">
            <span class="select__title">{{ selectUnit.title }}</span>
            <select name="LUX" id="LUX" required v-model="inputSelect">
              <option v-for="(selectItem, selectItemIndex) of selectUnit.items"
                      :value="selectItem">{{ selectItem.title }}
              </option>
            </select>
          </label>
        </template>
        <button type="button"
                :class="{_green: variant.chosen}"
                class="choose-btn"
                @click="nextStep"
                ref="choose-btn">
          <span v-if="!variant.chosen">Выбрать</span>
          <span v-else>Выбрано</span>
        </button>
      </div>
    </div>
  </li>
</template>

<style>
.subStep {
  flex-direction: row;
  background-color: var(--color-block-bg);
  border-radius: var(--radius);
  justify-content: space-between;
  min-height: 200px;
  position: relative;
  overflow: hidden;
}
.subStep:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 6px;
  background-color: var(--color-gray);
  transition-duration: var(--transition);
}
.subStep:hover:before {
  background-color: var(--color-green);
}

.block__left {
  padding: var(--gap);
  padding-left: 21px;
  flex: 1;
}
.block__text {
  color: var(--color-block-text);
  padding-right: var(--gap);
  border-right: 1px solid var(--color-border);
  flex: 1;
}
.block__right {
  flex: 0 0 300px;
  padding: var(--gap) var(--gap) var(--gap) 0;
}

.price {
  align-self: flex-end;
  font-size: 20px;
}
.form__block {
  flex: 1;
}
.choose-btn {
  margin-top: auto;
  cursor: pointer;
  background-color: var(--color-button);
  color: white;
  border-radius: var(--radius);
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: var(--transition);
}
.choose-btn._green {
  background-color: var(--color-green);
}
.choose-btn:hover {
  background-color: var(--color-green)
}

</style>