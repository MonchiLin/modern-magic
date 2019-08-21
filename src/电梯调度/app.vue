<template>
    <div ref="emitter">
        <template v-for="floor of floors">
            <input style="display: block;" type="button" :value="floor"/>
        </template>
        <div>
            F{{curr}}
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {concat, fromEvent, interval, merge} from "rxjs";
    import {range, curry} from 'ramda'
    import {map, mergeMap, switchMap, take} from "rxjs/operators";

    const plusOne = (x) => x + 1
    const minusX = curry((x1, x) => x1 - x)
    const intervalOneThousand$ = interval(1000)

    export default Vue.extend({
        data() {
            return {
                floors: range(1, 11).reverse(),
                curr: 1
            }
        },
        mounted() {
            const emitter = this.$refs.emitter

            const getStream = (emitter, type) => {
                return fromEvent(emitter, type)
                    .pipe(
                        switchMap(({target, curr}) => {
                            const value = parseInt(target.value, 10)

                            const up$ = intervalOneThousand$
                                .pipe(
                                    map(plusOne),
                                    take(value)
                                )
                            const down$ = intervalOneThousand$
                                .pipe(
                                    map(minusX(value)),
                                    take(value)
                                )
                            return concat(up$, down$)
                        })
                    )
            }

            getStream(emitter, "click")
                .subscribe(e => this.curr = e)
        }
    })
</script>

<style lang="scss" scoped>

</style>