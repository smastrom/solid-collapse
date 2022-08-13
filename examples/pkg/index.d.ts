import { ParentComponent } from 'solid-js';
declare type CollapseProps = {
    state: boolean;
    as?: keyof HTMLElementTagNameMap;
    class?: string;
    id?: string;
    'aria-labelledby'?: string;
    'aria-role'?: string;
};
/** Thank you for using **solid-collapse**. For more info read
 * the documentation at https://github.com/smastrom/solid-collapse.
 */
export declare const Collapse: ParentComponent<CollapseProps>;
export {};
