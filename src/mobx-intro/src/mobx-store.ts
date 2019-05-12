import {action, computed, observable} from "mobx";

export interface IMobxStore {
    name: string;
    greeting: string;

    setName(name: string): void;
}

class MobxStore implements IMobxStore {
    @observable name = "";

    @computed
    get greeting(): string {
        return `Hello ${this.name}`
    }

    @action.bound
    public setName(name: string): void {
        this.name = name
    }

}

export default new MobxStore()