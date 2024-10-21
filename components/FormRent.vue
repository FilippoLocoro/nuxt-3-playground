<template>
    <div>
        <div v-if="submitted">
            <h2 class="text-xl text-green-500">Submission successful!</h2>
        </div>
        <FormKit v-else type="form" id="form-rent" :form-class="submitted ? 'hide' : 'show'"
            submit-label="This is a submit label" @submit="submitHandler" :submit-attrs="{
            inputClass: 'my-input-class',
            wrapperClass: 'my-wrapper-class',
            'data-theme': `dark`,
            help: 'My button help text',
            ignore: false
        }" :actions="true" #default="{ value }">
            <FormKit type="text" name="firstname" id="firstname" validation="required" label="name"
                help="This is an help" placeholder="Enter first name" />

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

            <FormKit type="date" name="start" id="start" validation="required" label="days.sta}}" />

            <FormKit type="date" name="end" id="end" label="days.e}}" />

            <FormKit type="checkbox" name="privacy" id="privacy" validation="required" label="privacy" />

            <pre wrap>{{ value }}</pre>
        </FormKit>
    </div>
</template>

<script setup lang="ts">

const submitted = ref(false)

const submitHandler = async (data: any) => {
    console.log(data)
    try {
        const res = await $fetch('/api/rent', {
            method: 'POST',
            body: {
                ...data
            }
        })
        console.log('res', res);
    } catch (error) {

    } finally {
        submitted.value = true
    }
}
</script>