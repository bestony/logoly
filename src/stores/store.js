import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';

const hasDom = typeof window !== 'undefined' && typeof document !== 'undefined';
const textNodeFilter = typeof NodeFilter === 'undefined' ? 4 : NodeFilter.SHOW_TEXT;

function getEditableAncestor(node) {
  if (!node) return null;
  if (node.nodeType === 3) {
    return node.parentElement?.closest?.("[contenteditable='true']") ?? null;
  }
  if (node.nodeType === 1) {
    return node.closest?.("[contenteditable='true']") ?? null;
  }
  return null;
}

function getOffsetWithinRoot(root, node, offset) {
  const range = document.createRange();
  range.selectNodeContents(root);
  range.setEnd(node, offset);
  return range.toString().length;
}

function captureSelectionSnapshot() {
  if (!hasDom) return null;
  const selection = window.getSelection();
  if (!selection?.rangeCount) return null;
  const range = selection.getRangeAt(0);
  const editableElement = getEditableAncestor(range.startContainer);

  if (!editableElement || !editableElement.contains(range.endContainer)) {
    return null;
  }

  return {
    editableElement,
    startOffset: getOffsetWithinRoot(editableElement, range.startContainer, range.startOffset),
    endOffset: getOffsetWithinRoot(editableElement, range.endContainer, range.endOffset)
  };
}

function resolvePosition(root, targetOffset) {
  const walker = document.createTreeWalker(root, textNodeFilter, null);
  let remaining = targetOffset;

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const length = node.textContent?.length ?? 0;

    if (remaining <= length) {
      return { node, offset: remaining };
    }

    remaining -= length;
  }

  return { node: root, offset: root.childNodes.length };
}

function restoreSelectionSnapshot(snapshot) {
  if (!hasDom) return;
  const { editableElement } = snapshot;
  if (!editableElement?.isConnected) return;

  const selection = window.getSelection();
  if (!selection) return;

  const totalLength = editableElement.textContent?.length ?? 0;
  const start = Math.min(snapshot.startOffset, totalLength);
  const end = Math.min(snapshot.endOffset, totalLength);

  const startPosition = resolvePosition(editableElement, start);
  const endPosition = resolvePosition(editableElement, end);

  if (!startPosition || !endPosition) return;

  const range = document.createRange();
  range.setStart(startPosition.node, startPosition.offset);
  range.setEnd(endPosition.node, endPosition.offset);

  selection.removeAllRanges();
  selection.addRange(range);
}

export const useStore = defineStore('store', () => {
  const prefix = ref('edit');
  const suffix = ref('me');
  const font = ref('Roboto');
  //Needed for the SVG Export (otherwise you can edit the SVG in the browser which breaks and and leads into new issues)
  const editable = ref(true);

  async function updatePrefix(text) {
    const selectionSnapshot = captureSelectionSnapshot();
    prefix.value = text;
    if (!selectionSnapshot) return;
    await nextTick();
    restoreSelectionSnapshot(selectionSnapshot);
  }

  async function updateSuffix(text) {
    const selectionSnapshot = captureSelectionSnapshot();
    suffix.value = text;
    if (!selectionSnapshot) return;
    await nextTick();
    restoreSelectionSnapshot(selectionSnapshot);
  }

  return { prefix, suffix, font, editable, updatePrefix, updateSuffix };
});
