import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { defineComponent, nextTick } from "vue";
import { createPinia, setActivePinia } from "pinia";
import { useGeneratorControls } from "@/composables/useGeneratorControls";
import { useStore } from "@/stores/store";

const mountComposable = (options) => {
  let api;
  const Comp = defineComponent({
    template: "<div />",
    setup() {
      api = useGeneratorControls(options);
      return api;
    },
  });

  const wrapper = mount(Comp);
  return { wrapper, api };
};

describe("useGeneratorControls", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("provides sensible defaults and computed helpers", () => {
    const { api } = mountComposable();

    expect(api.prefixColor.value).toBe("#ffffff");
    expect(api.suffixColor.value).toBe("#000000");
    expect(api.transparentBgColor.value).toBe("#000000");
    expect(api.suffixMargin.value).toBeUndefined();

    api.transparentBg.value = true;
    expect(api.transparentBgColor.value).toBe("transparent");

    const custom = mountComposable({ suffixMarginScale: 30 });
    custom.api.fontSize.value = 90;
    expect(custom.api.suffixMargin.value).toBe("-3rem");
  });

  it("forwards text updates to the store", () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, "updatePrefix");
    const suffixSpy = vi.spyOn(store, "updateSuffix");

    const { api } = mountComposable();
    api.updatePrefix({ target: { textContent: "Porn" } });
    api.updateSuffix({ target: { innerText: "hub" } });
    api.updatePrefix({ target: { innerText: "Only" } });
    api.updateSuffix({ target: {} });
    api.updatePrefix(null);

    expect(prefixSpy).toHaveBeenCalledWith("Porn");
    expect(prefixSpy).toHaveBeenLastCalledWith("Only");
    expect(suffixSpy).toHaveBeenCalledWith("hub");
    expect(suffixSpy).toHaveBeenLastCalledWith("");
  });

  it("hydrates initial text on mount and resets on unmount", async () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, "updatePrefix");
    const suffixSpy = vi.spyOn(store, "updateSuffix");

    const { wrapper } = mountComposable({
      backgroundColor: "#222222",
      initialText: { prefix: "Only", suffix: "Fans" },
      resetText: { prefix: "edit", suffix: "me" },
    });

    await nextTick();
    expect(prefixSpy).toHaveBeenCalledWith("Only");
    expect(suffixSpy).toHaveBeenCalledWith("Fans");

    wrapper.unmount();
    await nextTick();
    expect(prefixSpy).toHaveBeenLastCalledWith("edit");
    expect(suffixSpy).toHaveBeenLastCalledWith("me");
  });

  it("handles partial initial and reset payloads", async () => {
    const store = useStore();
    const prefixSpy = vi.spyOn(store, "updatePrefix");
    const suffixSpy = vi.spyOn(store, "updateSuffix");

    const suffixOnly = mountComposable({ initialText: { suffix: "Fans" } });
    await nextTick();
    expect(prefixSpy).not.toHaveBeenCalled();
    expect(suffixSpy).toHaveBeenCalledWith("Fans");
    suffixOnly.wrapper.unmount();
    await nextTick();

    prefixSpy.mockClear();
    suffixSpy.mockClear();

    const prefixOnly = mountComposable({ initialText: { prefix: "Only" } });
    await nextTick();
    expect(prefixSpy).toHaveBeenCalledWith("Only");
    expect(suffixSpy).not.toHaveBeenCalled();
    prefixOnly.wrapper.unmount();
    await nextTick();

    prefixSpy.mockClear();
    suffixSpy.mockClear();

    const resetPrefixOnly = mountComposable({ resetText: { prefix: "reset" } });
    resetPrefixOnly.wrapper.unmount();
    await nextTick();
    expect(prefixSpy).toHaveBeenCalledWith("reset");
    expect(suffixSpy).not.toHaveBeenCalled();

    prefixSpy.mockClear();
    suffixSpy.mockClear();

    const resetSuffixOnly = mountComposable({ resetText: { suffix: "again" } });
    resetSuffixOnly.wrapper.unmount();
    await nextTick();
    expect(suffixSpy).toHaveBeenCalledWith("again");
    expect(prefixSpy).not.toHaveBeenCalled();
  });

  it("builds the Twitter intent url with the expected payload", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => {});
    const { api } = mountComposable();

    api.twitter();

    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy.mock.calls[0][0]).toContain("twitter.com/intent/tweet");
    expect(openSpy.mock.calls[0][0]).toContain("logoly.pro");

    openSpy.mockRestore();
  });
});
