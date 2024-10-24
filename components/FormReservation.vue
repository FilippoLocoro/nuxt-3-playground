<template>
    <FormKit type="form">
        <FormKit type="text" name="firstname" label="* 'form.reservation.name')" validation="required" />
        <FormKit type="text" name="lastname" label="* 'form.reservation.surname')" validation="required" />
        <FormKit type="tel" name="telephone" label="* 'form.reservation.phone')" validation="required" />
        <FormKit type="email" name="email" label="* 'form.reservation.email')" validation="required|email" />
        <FormKit type="text" name="city" label="* 'form.reservation.city')" validation="required" />
        <FormKit type="date" name="days.start" label="* 'form.reservation.days.start')"
            :min="new Date().toISOString().split('T')[0]" validation="required" />
        <FormKit type="date" name="days.end" label="'form.reservation.days.end')"
            :min="new Date().toISOString().split('T')[0]" />

        <FormKit type="select" name="startAt" label="'form.reservation.startAt')" :options="[
                '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'
            ]" validation="required" />
        <FormKit type="select" name="endAt" label="'form.reservation.endAt')" :options="[
                '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'
            ]" validation="required" />

        <FormKit type="number" name="participants" label="* 'form.reservation.participants')" min="1"
            validation="required|min:1" />

        <FormKit type="textarea" name="description" label="'form.reservation.description')" rows="5" />

        <FormKit type="checkbox" name="privacy" label="* 'form.reservation.privacy')" validation="required" />

        <FormKit type="submit" label="'label.sendReservation')"
            class="bg-white my-3 p-2 block mx-auto rounded-full font-bold text-black min-w-[200px] w-full text-center uppercase text-xl" />
    </FormKit>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

const onSubmit = () => {

};
</script>