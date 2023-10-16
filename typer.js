function typeText(inputText) {
  const initialText = inputText;
  let currentPosition = 0;
  const input = document.querySelector(".docs-texteventtarget-iframe").contentDocument.activeElement;

  const typeCharacter = (char) => {
    const eventObj = document.createEvent("Event");
    eventObj.initEvent("keypress", true, true);

    // Set the character code for the current character
    eventObj.keyCode = char.charCodeAt(0);

    // Dispatch the keypress event
    input.dispatchEvent(eventObj);
  }

  const keyPressed = [];

  const keyupHandler = (event) => {
    // Remove the key from the keyPressed array
    keyPressed.splice(keyPressed.indexOf(event.key), 1);
  };

  // List of keys that should act as its default action
  const defaultKeys = ["Enter", "Shift", "Control", "Alt", "Meta", "Tab", "CapsLock", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"];
  let toolActivated = true;
  const keydownHandler = (event) => {
    keyPressed.push(event.key);
    // Allows cmd+key and ctrl+key to work
    if (keyPressed.find(key => key === 'Meta') || keyPressed.find(key => key === 'Control')) return;
    // Allows Esc to toggle the tool
    if (event.key === "Escape") toolActivated = !toolActivated;
    // Allow the keys to perform its default action
    if (defaultKeys.includes(event.key) || !toolActivated) return;

    if (event.key === "Backspace") {
      // Allow the "Backspace" key to perform its default action
      currentPosition--;
      return;
    }

    event.preventDefault();
    // Check if the current position is within the length of the initial text
    if (currentPosition < initialText.length) {
      // Replace the typed character with the corresponding character from the initial text
      typeCharacter(initialText.charAt(currentPosition));
      // Increment the current position
      currentPosition++;

      // Check if all characters from the initial text have been typed
      if (currentPosition === initialText.length) {
        // Release control and make the keyboard back to normal
        input.removeEventListener('keydown', keydownHandler);
      }
    }
  };

  input.addEventListener('keydown', keydownHandler);
  input.addEventListener('keyup', keyupHandler);
}

// Usage:
// Call the function with your desired input text
const inputText = `
Ideally, the­ project aims to expand the working range­ of the technology to 200 fee­t. This would make it versatile for use­ in various situations. Additionally, enhancing its ability to capture sound from refle­ctive surfaces like windows and mirrors would incre­ase versatility and ensure­ discreet eave­sdropping. By leveraging AI solutions such as NVIDIA RTX Voice, we­ can effectively e­nhance captured sound quality by reducing noise­ and improving clarity. Moreover, for user conve­nience, not only can the capture­d sound be accurately played back but it can also be­ converted into text using AI te­chnologies like Whisper and othe­r Speech-to-Text tools. This wide­ns the applicability of the captured data across diffe­rent platforms and applications.
`;
typeText(inputText);