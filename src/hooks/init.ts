import { Autocompleter } from '@/autocomplete/autocompleter';
import { ModuleSettings, updateModuleSettings } from '@/settings/ModuleSettings';

let autocompleter = null as Autocompleter | null;

export function registerForInitHook() {
  Hooks.once('init', init);
}

async function init(): Promise<void> {
  // initialize settings first, so other things can use them
  updateModuleSettings(new ModuleSettings());

  registerListener();
}

// register the main listener
function registerListener() {
  jQuery(document).on('keydown', '.ProseMirror.editor-content[contenteditable="true"]', onKeydown);
}

function onKeydown(event: KeyboardEvent) {
  // watch for the @
  if (event.key === '@') {
      event.preventDefault();
      activateAutocompleter(event.target);
  }
}

function activateAutocompleter(targetElement) {
  autocompleter?.close();

  // Otherwise, create a new autocompleter
  autocompleter = new Autocompleter(targetElement, () => {
      // When this Autocompleter gets closed, clean up the registration for this element.
      autocompleter = null;
  });
  
  autocompleter.render(true);
}