<template>
    <div>
        <ul class="steps">
            <!-- NEW: uses new checkStepValidity method to check validation on step blur -->
            <li v-for="(step, stepName) in steps" :class="['step', { 'has-errors': checkStepValidity(stepName) }]"
                @click="activeStep = stepName" :data-step-valid="step.valid && step.errorCount === 0"
                :data-step-active="activeStep === stepName">
                <!-- NEW: output total number of errors in a little red bubble -->
                <span v-if="checkStepValidity(stepName)" class="step--errors"
                    v-text="step.errorCount + step.blockingCount" />
                {{ camel2title(stepName) }}
            </li>
        </ul>
        <FormKit type="form" #default="{ value }" :plugins="[stepPlugin]" @submit="submitHandler">
            <div class="form-body">
                <section v-show="activeStep === 'categoryStep'">
                    <FormKit type="group" name="categoryStep">
                        <FormKit type="radio" label="Category" :options="{ ski: 'Ski', snowboard: 'Snowboard' }" />
                    </FormKit>
                </section>
                <section v-show="activeStep === 'activityStep'">
                    <FormKit type="group" name="activityStep">
                        List of activities
                    </FormKit>
                </section>
                <section v-show="activeStep === 'reservationStep'">
                    <FormKit type="group" name="reservationStep">
                        <FormKit type="text" name="firstname" label="firstname" validation="required" />
                        <FormKit type="text" name="lastname" label="lastname" validation="required" />
                        <FormKit type="tel" name="telephone" label="phone" validation="required" />
                        <FormKit type="email" name="email" label="email" validation="required|email" />
                        <FormKit type="text" name="city" label="city" validation="required" />
                        <FormKit type="date" name="days.start" label="days start"
                            :min="new Date().toISOString().split('T')[0]" validation="required" />
                        <FormKit type="date" name="days.end" label="Days end"
                            :min="new Date().toISOString().split('T')[0]" validation="required" />
                        <FormKit type="select" name="startAt" label="Start at"
                            :options="['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00']"
                            validation="required" />
                        <FormKit type="select" name="endAt" label="End at"
                            :options="['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']"
                            validation="required" />

                        <FormKit type="number" name="level" label="Level" min="1" validation="required|min:1" max="5" />
                        <FormKit type="number" name="participants" label="Participants" min="1"
                            validation="required|min:1" />

                        <FormKit type="textarea" name="description" label="Description" rows="5" />
                        <FormKit type="checkbox" name="privacy" label="privacy" validation="required" />

                        <!-- <FormKit type="submit" label="Send reservation" /> -->

                    </FormKit>
                </section>

                <!-- NEW: Adds Next / Previous navigation buttons. -->
                <div class="step-nav">
                    <FormKit type="button" :disabled="activeStep == 'contactInfo'" @click="setStep(-1)"
                        v-text="'Previous step'" />
                    <FormKit type="button" class="next" :disabled="activeStep == 'application'" @click="setStep(1)"
                        v-text="'Next step'" />
                </div>
                <details>
                    <summary>Form data</summary>
                    <pre>{{ value }}</pre>
                </details>
            </div>
        </FormKit>
    </div>

</template>

<script setup lang="ts">
import useSteps from '../composables/useSteps'
import { camel2title } from '../utils/utils'

const apiEndpoint = '/api/reservation'

const {
    steps,
    activeStep,
    stepPlugin,
    visitedSteps,
    setStep
} = useSteps()

// NEW: helper function to check step validity on step blur
const checkStepValidity = (stepName) => {
    return (steps[stepName].errorCount > 0 || steps[stepName].blockingCount > 0) && visitedSteps.value.includes(stepName)
}

const completed = ref(false)

const formSubmitAttrs = {
    inputClass: 'my-input-class',
    wrapperClass: 'my-wrapper-class',
    'data-theme': `dark`,
    help: 'My button help text',
    ignore: false,
}

const form = ref({
    firstname: "",
    lastname: "",
    telephone: "",
    email: "",
    city: "",
    days: {
        start: "",
        end: "",
    },
    startAt: "",
    endAt: "",
    participants: 1,
    description: "",
    privacy: false,
});

const submitHandler = async (formData, node) => {
    try {
        const res = await $fetch(apiEndpoint, {
            method: 'POST',
            body: {
                ...formData,
            },
        })

        node.clearErrors()
    } catch (error) {
        node.setErrors(error.formErrors, error.fieldErrors)
    } finally {
        completed.value = true
    }
}
</script>../utils