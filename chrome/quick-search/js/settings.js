import { SearchEngines } from "./search-engines.js"

export class Settings {
    static #PrefsKey = "userPrefs";
    static #DefaultSearchEngine = "bing";
    static #PreferedSearchEngineKey = "search_engine";

    static getAllSearchEngines() {
        // todo: based on locale.
        return Object.entries(SearchEngines);
    }

    static async getPreferedSearchEngine() {
        // todo: default based on locale.
        const preferedSearchEngine = await Settings.#getUserPrefsValue(Settings.#PreferedSearchEngineKey) || Settings.#DefaultSearchEngine;
        return SearchEngines[preferedSearchEngine];
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
}