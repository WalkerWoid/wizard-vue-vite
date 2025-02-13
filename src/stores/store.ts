import {ref, watch} from 'vue'
import { defineStore } from 'pinia'
import { dataString } from "@/data.ts"

export const useWizardState = defineStore('mainState', () => {
    const data: Object = ref(JSON.parse(dataString))
    const currentStep: Object = ref(1)
    const result: Object = ref(0)

    function clearCheckedVariants(step: Number) {
        data.value[step-1].variants.forEach(variant => {
            variant.chosen = false
        })
    }

    function changeStep(nextStep: number = currentStep.value) {
        if (nextStep < currentStep.value) {
            currentStep.value = nextStep+1
            return;
        }

        if (!data.value[nextStep-1].selected) {
            return;
        }

        if (nextStep+1 > data.value.length) {
            return
        }
        currentStep.value += 1
    }

    watch(data, (newData, oldData) => {
        result.value = 0
        newData.forEach(dataItem => {
            if (dataItem.selected) {
                result.value = dataItem.selected.reduce((acc, selectedItem) => acc + selectedItem.price, result.value)
            }
        })
        console.log(newData)
    }, {deep: true})

    return {
        data,
        currentStep,
        result,
        clearCheckedVariants,
        changeStep
    }
})
