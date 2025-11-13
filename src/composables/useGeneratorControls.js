import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "@/stores/store";

export function useGeneratorControls(options = {}) {
  const store = useStore();

  const prefixColor = ref(options.prefixColor ?? "#ffffff");
  const suffixColor = ref(options.suffixColor ?? "#000000");
  const postfixBgColor = ref(options.postfixBgColor ?? "#ff9900");
  const fontSize = ref(options.fontSize ?? 60);
  const transparentBg = ref(options.transparentBg ?? false);
  const reverseHighlight = ref(options.reverseHighlight ?? false);

  const updateText = (updater) => (event) => {
    if (!event?.target) return;
    const value = event.target.textContent ?? event.target.innerText ?? "";
    updater(value);
  };

  const updatePrefix = updateText(store.updatePrefix);
  const updateSuffix = updateText(store.updateSuffix);

  const transparentBgColor = computed(() =>
    transparentBg.value ? "transparent" : options.backgroundColor ?? "#000000",
  );

  const suffixMargin = computed(() => {
    if (!options.suffixMarginScale) return undefined;
    return `-${fontSize.value / options.suffixMarginScale}rem`;
  });

  const twitter = () => {
    const url = "https://logoly.pro";
    const text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`);
  };

  if (options.initialText) {
    onMounted(() => {
      if (options.initialText?.prefix) {
        store.updatePrefix(options.initialText.prefix);
      }
      if (options.initialText?.suffix) {
        store.updateSuffix(options.initialText.suffix);
      }
    });
  }

  if (options.resetText) {
    onBeforeUnmount(() => {
      if (options.resetText?.prefix) {
        store.updatePrefix(options.resetText.prefix);
      }
      if (options.resetText?.suffix) {
        store.updateSuffix(options.resetText.suffix);
      }
    });
  }

  return {
    store,
    prefixColor,
    suffixColor,
    postfixBgColor,
    fontSize,
    transparentBg,
    reverseHighlight,
    transparentBgColor,
    suffixMargin,
    updatePrefix,
    updateSuffix,
    twitter,
  };
}
