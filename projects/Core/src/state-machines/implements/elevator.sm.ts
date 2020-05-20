import {Machine} from '../state-machine'

type Floor = 1 | 2 | 3

type AllowedEvents = { 1: void, 2: void, 3: void }

type ExtraState = {
    direction: "up" | "down"
}

const elevator = new Machine<Floor, ExtraState, AllowedEvents>(
    {direction: "up"},
    1,
    {
        1: ((event, currentState, extraState) => {
            extraState.direction = "up"
            return 2
        }),
        2: ((event, currentState, extraState) => {
            return extraState.direction === "up" ? 3 : 1
        }),
        3: ((event, currentState, extraState) => {
            extraState.direction = "down"
            return 2
        }),
    }
)
