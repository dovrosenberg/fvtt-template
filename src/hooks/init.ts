import { Autocompleter } from '@/autocomplete/autocompleter';
import { ModuleSettings, updateModuleSettings } from '@/settings/ModuleSettings';

let autocompleter = null as Autocompleter | null;

export function registerForInitHook() {
  Hooks.once('init', init);
}

async function init(): Promise<void> {
  // initialize settings first, so other things can use them
  updateModuleSettings(new ModuleSettings());
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
