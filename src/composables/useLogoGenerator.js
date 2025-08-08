import { computed, ref } from 'vue';
import { useStore } from '@/stores/store';

export function useLogoGenerator(defaultColors = {}) {
  const prefixColor = ref(defaultColors.prefix || '#ffffff');
  const suffixColor = ref(defaultColors.suffix || '#000000');
  const postfixBgColor = ref(defaultColors.background || '#ff9900');
  const fontSize = ref(60);
  const transparentBg = ref(false);
  const reverseHighlight = ref(false);
  
  const store = useStore();

  const updatePrefix = (e) => {
    if (!navigator.userAgent.toLowerCase().includes('firefox')) {
      store.updatePrefix(e.target.childNodes[0].nodeValue);
    }
  };

  const updateSuffix = (e) => {
    if (!navigator.userAgent.toLowerCase().includes('firefox')) {
      store.updateSuffix(e.target.childNodes[0].nodeValue);
    }
  };

  const twitter = () => {
    let url = 'https://logoly.pro';
    let text = encodeURIComponent(`Built with #LogolyPro, by @xiqingongzi ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`);
  };

  const transparentBgColor = computed(() => {
    if (transparentBg.value) {
      return 'transparent';
    } else {
      return '#000000';
    }
  });

  return {
    prefixColor,
    suffixColor,
    postfixBgColor,
    fontSize,
    transparentBg,
    reverseHighlight,
    store,
    updatePrefix,
    updateSuffix,
    twitter,
    transparentBgColor
  };
}