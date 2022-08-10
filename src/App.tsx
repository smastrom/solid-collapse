import { Component, createEffect, createSignal, on, onMount } from "solid-js";

import styles from "./App.module.css";

const App: Component = () => {
    const [isOpen, setIsOpen] = createSignal(false);
    let element: HTMLDivElement;

    onMount(() => {
        element.style.height = "0";
        element.style.overflow = "hidden";
    });

    createEffect(
        on(
            isOpen,
            () => {
                element.style.display = "";
                element.style.height = `${element.scrollHeight}px`;
                if (isOpen() === false) {
                    setTimeout(() => {
                        console.log("Ciao!");
                        element.style.height = "0";
                        element.style.overflow = "hidden";
                    });
                }
            },
            { defer: true }
        )
    );

    const handleTransitionEnd = () => {
        if (isOpen()) {
            element.style.height = "";
            element.style.overflow = "";
            console.log("Just Opened");
        } else {
            element.style.display = "none";
        }
    };

    return (
        <div class={styles.App}>
            <div>{`${isOpen()}`}</div>

            <button onClick={() => setIsOpen((isOpen) => !isOpen)}>Open / Close</button>
            <header class={styles.header}>
                <div style="max-width: 600px; padding: 20px">
                    <div
                        class="collapseTransition"
                        onTransitionEnd={handleTransitionEnd}
                        ref={element}
                    >
                        Phasellus sit amet bibendum mauris. Aliquam in euismod leo, eu posuere
                        ipsum. Class aptent taciti sociosqu ad litora torquent per conubia
                        nostra, per inceptos himenaeos. Nunc eleifend nunc tortor, id bibendum
                        mi rutrum vel. Nulla id tortor posuere, placerat urna at, tincidunt
                        justo. Vivamus interdum, velit interdum hendrerit pharetra, lorem leo
                        tincidunt ex, id varius odio lacus ut risus. Maecenas urna urna, tempus
                        eget varius vitae, dapibus eu tortor. Sed venenatis id orci vitae
                        suscipit. Fusce porta, lectus quis consequat eleifend, lacus neque
                        congue purus, eget suscipit dolor arcu nec est. Morbi vitae
                        sollicitudin sem. Nulla condimentum orci vitae placerat rhoncus.
                        Integer suscipit id metus et cursus. Aenean a gravida urna, at porta
                        ex.
                    </div>
                </div>
            </header>
        </div>
    );
};

export default App;
