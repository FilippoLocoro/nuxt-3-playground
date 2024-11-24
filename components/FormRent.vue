<template>
  <div>
    <div v-if="complete">
      <h2 class="text-xl text-green-500">Submission successful!</h2>
    </div>
    <FormKit type="form" id="rentForm" :form-class="complete ? 'hide' : 'show'" submit-label="This is a submit label"
      @submit="submitHandler" :submit-attrs="{
      inputClass: 'my-input-class',
      wrapperClass: 'my-wrapper-class',
      'data-theme': `dark`,
      help: 'My button help text',
      ignore: false,
    }" :actions="true" #default="{ value }">
      <FormKit type="text" name="firstname" id="firstname" validation="required" label="name" help="This is an help"
        placeholder="Enter first name" />
      <FormKit type="text" name="lastname" id="lastname" validation="required" label="surname"
        placeholder="Enter last name" />
      <FormKit type="tel" name="telephone" id="telephone" validation="required" label="phone"
        placeholder="Enter phone number" />
      <FormKit type="email" name="email" id="email" validation="required|email" label="email"
        placeholder="Enter email" />
      <FormKit type="number" name="height" id="height" validation="required|between:40,250" label="height"
        placeholder="Your height" />
      <FormKit type="number" name="weight" id="weight" validation="required|between:10,200" label="weight"
        placeholder="Your weight" />
      <FormKit type="number" name="feet" id="feet" validation="required|between:20,50" label="feet"
        placeholder="Your feet number" />
      <FormKit type="select" name="category" id="category" validation="required" label="category" :options="{
      sky: 'Ski',
      snowboard: 'Snowboard',
    }" />
      <FormKit type="date" name="start" id="start" validation="required" label="Start" />
      <FormKit type="date" name="end" id="end" label="End" />
      <FormKit type="select" name="category" id="category" validation="required" label="category" :options="{
      sky: 'Ski',
      snowboard: 'Snowboard',
    }" />
      <FormKit type="select" name="where" id="where" validation="required" label="where" :options="{
      'san-domenico': 'Sede Sandomenico di Varzo',
      'alpe-ciamporino': 'Sede Alpe Ciamporino',
    }" />
      <FormKit type="checkbox" name="privacy" id="privacy" validation="accepted" label="privacy" />
      <pre wrap>{{ value }}</pre>
    </FormKit>
  </div>
</template>

<script setup lang="ts">
const complete = ref(false)

const submitHandler = async (data: any) => {
  try {
    const res = await $fetch('/api/rent', {
      method: 'POST',
      body: {
        ...data,
      },
    })
  } catch (error) {

  } finally {
    complete.value = true
  }
}

const resetForm = () => {
  complete.value = false
  // this.$formkit.reset('rentForm')
}
</script>
