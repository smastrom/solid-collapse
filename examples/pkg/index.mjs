import { createComponent as d, Dynamic as f } from "solid-js/web";
import { mergeProps as m, onMount as h, createEffect as u, untrack as y, onCleanup as p } from "solid-js";
const v = (n) => {
  let e;
  const t = m({
    class: "",
    as: "div",
    state: !1
  }, n);
  h(() => {
    t.state || (e.style.overflow = "hidden", e.style.height = "0px", e.style.display = "none");
  }), u((l) => {
    const r = t.state;
    return y(() => {
      if (l !== r) {
        let a, s;
        const i = (c) => {
          if (typeof s > "u")
            return s = c, r ? (e.style.height = "0px", requestAnimationFrame(i)) : (e.style.height = `${e.scrollHeight}px`, requestAnimationFrame(i));
          typeof s == "number" && (r ? (e.style.display = "", e.style.height = `${e.scrollHeight}px`) : (e.style.overflow = "hidden", e.style.height = "0px"));
        };
        a = requestAnimationFrame(i), p(() => cancelAnimationFrame(a));
      }
    }), r;
  });
  const o = () => {
    t.state ? (e.style.overflow = "", e.style.height = "") : e.style.display = "none";
  };
  return d(f, {
    get id() {
      return t.id;
    },
    ref: (l) => e = l,
    get ["aria-labelledby"]() {
      return n["aria-labelledby"];
    },
    get ["aria-role"]() {
      return n["aria-role"];
    },
    get component() {
      return t.as;
    },
    get class() {
      return t.class;
    },
    onTransitionEnd: o,
    get children() {
      return t.children;
    }
  });
};
export {
  v as Collapse
};
