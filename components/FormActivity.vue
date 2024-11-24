<template>
  <div>
    <div v-if="complete">
      <h2 class="text-xl text-green-500">Submission successful!</h2>
    </div>
    <div v-else class="mb-4">
      <h2>{{ $t('Request information') }}</h2>
      <p v-html="$t('reservationInfo')"></p>
    </div>
    <FormKit type="form" id="form-activity" :form-class="complete ? 'hide' : 'show'" :submit-label="$t('Send')"
      @submit="submitHandler" :submit-attrs="{
      inputClass: `btn btn-bloc btn`,
      wrapperClass: '',
      // help: 'My button help text',
      ignore: false,
    }" :actions="true" #default="{ value }">
      <div class=" grid md:grid-cols-2 gap-4">
        <FormKit type="text" name="firstname" id="firstname" validation="required" :label="$t('Firstname')"
          class="w-full" />
        <FormKit type="text" name="lastname" id="lastname" validation="required" :label="$t('Lastname')" />
        <FormKit type="tel" name="telephone" id="telephone" validation="required" :label="$t('Phone')" />
        <FormKit type="email" name="email" id="email" validation="required|email" :label="$t('Email')" />
        <FormKit type="text" name="city" id="city" validation="required" :label="$t('City')" />
      </div>
      <FormKit type="textarea" name="message" :label="$t('Your message')" validation="required|length:0,400"
        validation-visibility="live" :validation-messages="{
      length: 'Instructions cannot be more than 400 characters.',
    }" />
      <FormKit type="checkbox" name="privacy" id="privacy" validation="accepted" :label="$t('Privacy')" />
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const { activity = '', category = '' } = defineProps<{ activity?: any; category: string }>()

const complete = ref(false)

const submitHandler = async (data: any) => {
  try {
    const body = {
      ...data,
      activity: activity,
      category: category
    }

    const res = await $fetch('/api/activity', {
      method: 'POST',
      body,
    })

    if (res.ok) {
      console.log('Form submitted successfully')
    } else {
      console.log('Error submitting form:', res)
    }
  } catch (error) {
    console.log('Error submitting form:', error)
  } finally {
    complete.value = true
  }
}
</script>
