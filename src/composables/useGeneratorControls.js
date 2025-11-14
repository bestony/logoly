import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useStore } from '@/stores/store';
import { loadGeneratorState, saveGeneratorState } from '@/utils/persistentState';

export function useGeneratorControls(options = {}) {
  const store = useStore();
  const persistenceAvailable =
    typeof options.persistenceEnabled === 'boolean'
      ? options.persistenceEnabled
      : typeof window !== 'undefined';
  const persistedState = persistenceAvailable ? loadGeneratorState() : {};
  const backgroundColor = options.backgroundColor ?? '#000000';
  let isHydrating = true;

  const hasPersistedState = Object.keys(persistedState).length > 0;

  const prefixColor = ref(persistedState.prefixColor ?? options.prefixColor ?? '#ffffff');
  const suffixColor = ref(persistedState.suffixColor ?? options.suffixColor ?? '#000000');
  const postfixBgColor = ref(persistedState.postfixBgColor ?? options.postfixBgColor ?? '#ff9900');
  const fontSize = ref(persistedState.fontSize ?? options.fontSize ?? 60);
  const transparentBg = ref(persistedState.transparentBg ?? options.transparentBg ?? false);
  const reverseHighlight = ref(persistedState.reverseHighlight ?? options.reverseHighlight ?? false);

  const updateText = (updater) => (event) => {
    if (!event?.target) return;
    const value = event.target.textContent ?? event.target.innerText ?? '';
    updater(value);
  };

  const updatePrefix = updateText(store.updatePrefix);
  const updateSuffix = updateText(store.updateSuffix);

  const transparentBgColor = computed(() =>
    transparentBg.value ? 'transparent' : backgroundColor
  );

  const suffixMargin = computed(() => {
    if (!options.suffixMarginScale) return undefined;
    return `-${fontSize.value / options.suffixMarginScale}rem`;
  });

  const twitter = () => {
    const url = 'https://logoly.pro';
    const text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`);
  };

  const persistState = () => {
    if (!persistenceAvailable || isHydrating) return;
    saveGeneratorState({
      prefix: store.prefix,
      suffix: store.suffix,
      font: store.font,
      prefixColor: prefixColor.value,
      suffixColor: suffixColor.value,
      postfixBgColor: postfixBgColor.value,
      fontSize: fontSize.value,
      transparentBg: transparentBg.value,
      reverseHighlight: reverseHighlight.value
    });
  };

  watch(
    [
      () => store.prefix,
      () => store.suffix,
      () => store.font,
      prefixColor,
      suffixColor,
      postfixBgColor,
      fontSize,
      transparentBg,
      reverseHighlight
    ],
    persistState
  );

  const hasPersistedPrefix = Object.prototype.hasOwnProperty.call(persistedState, 'prefix');
  const hasPersistedSuffix = Object.prototype.hasOwnProperty.call(persistedState, 'suffix');
  const hasPersistedFont = Object.prototype.hasOwnProperty.call(persistedState, 'font');

  if (hasPersistedFont && typeof persistedState.font === 'string') {
    store.font = persistedState.font;
  }

  const hydrateState = () => {
    const hydrationTasks = [];
    const queueTask = (task) => {
      if (!task) return;
      if (typeof task.then === 'function') {
        hydrationTasks.push(task);
        return;
      }
      hydrationTasks.push(Promise.resolve(task));
    };

    if (hasPersistedPrefix) {
      queueTask(store.updatePrefix(persistedState.prefix));
    } else if (options.initialText?.prefix !== undefined) {
      queueTask(store.updatePrefix(options.initialText.prefix));
    }

    if (hasPersistedSuffix) {
      queueTask(store.updateSuffix(persistedState.suffix));
    } else if (options.initialText?.suffix !== undefined) {
      queueTask(store.updateSuffix(options.initialText.suffix));
    }

    const finalizeHydration = () => {
      isHydrating = false;
      if (hasPersistedState) {
        persistState();
      }
    };

    if (hydrationTasks.length === 0) {
      finalizeHydration();
      return;
    }

    Promise.all(hydrationTasks).catch(() => {}).finally(finalizeHydration);
  };
  hydrateState();

  if (options.resetText && !persistenceAvailable) {
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
    twitter
  };
}
