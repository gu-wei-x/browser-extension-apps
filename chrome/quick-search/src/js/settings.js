import { SearchEnginesConfig } from "./search-engines.js"

export class Settings {
    static #PrefsKey = "userPrefs";
    static #PreferedSearchEngineKey = "search_engine";

    static async getSearchEngineConfig() {
        return await Settings.#getAllSearchEnginesWithLocal();
    }

    static async getPreferedSearchEngine() {
        let searchEngineConfig = await Settings.getSearchEngineConfig();
        let preferedSearchEngine = await Settings.#getUserPrefsValue(Settings.#PreferedSearchEngineKey);
        if (searchEngineConfig.searchEngines.hasOwnProperty(preferedSearchEngine)) {
            return searchEngineConfig.searchEngines[preferedSearchEngine];
        } else {
            return searchEngineConfig.searchEngines[searchEngineConfig.default];
        }
    }

    static async updatePreferedSearchEngine(preferedSearchEngine) {
        return await Settings.#updateUserPrefs(Settings.#PreferedSearchEngineKey, preferedSearchEngine);
    }

    static async #getUserPrefs() {
        let prefs = await chrome.storage.sync.get(Settings.#PrefsKey);
        if (prefs && Object.keys(prefs).length > 0) {
            return prefs;
        }

        prefs = {}
        prefs[Settings.#PrefsKey] = {};
        return prefs;
    }

    static async #updateUserPrefs(key, value) {
        let prefs = await Settings.#getUserPrefs();
        prefs[Settings.#PrefsKey][key] = value;
        await chrome.storage.sync.set(prefs);
    }

    static async #getUserPrefsValue(key) {
        let prefs = await Settings.#getUserPrefs();
        return prefs[Settings.#PrefsKey][key];
    }

    static async #getAllSearchEnginesWithLocal() {
        let uiLang = await chrome.i18n.getUILanguage();
        if (!uiLang) {
            uiLang = "en";
        }

        let locale = uiLang.split("-")[0];
        if (SearchEnginesConfig.hasOwnProperty(uiLang) || SearchEnginesConfig.hasOwnProperty(locale)) {
            return SearchEnginesConfig[uiLang] || SearchEnginesConfig[locale];
        } else {
            //fall back to en.
            return SearchEnginesConfig["en"];
        }
    }
}