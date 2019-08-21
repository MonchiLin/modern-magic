import {ComponentPropsOptions, ExtractPropTypes} from './component-props';
import {VueConstructor, VNode, ComponentOptions as Vue2ComponentOptions} from 'vue';

type Data = { [key: string]: unknown };

type ComponentInstance = InstanceType<VueConstructor>

type ComponentRenderProxy<P = {}, S = {}, PublicProps = P> = {
    $data: S;
    $props: PublicProps;
    $attrs: Data;
    $refs: Data;
    $slots: Data;
    $root: ComponentInstance | null;
    $parent: ComponentInstance | null;
    $emit: (event: string, ...args: unknown[]) => void;
} & P & S;



export {
    Data,
    ComponentInstance,
    ComponentRenderProxy,
}
