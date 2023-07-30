export function updateTextAreaHeight(textArea: HTMLTextAreaElement | null) {
  if (textArea == null) {
    return;
  }

  if (textArea.scrollHeight <= window.innerHeight - 161) {
    textArea.style.height = "0";
    textArea.style.height = `${textArea.scrollHeight}px`;
    textArea.style.overflowY = "hidden";
  } else {
    textArea.style.overflowY = "scroll";
  }
}