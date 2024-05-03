import { SearchEngines } from "./search-engines.js"

export class Settings {
    constructor() {
    }

    static async getDefaultSearchEngine() {
        const value = await chrome.storage.sync.get("search_engine");
        if (value && value["search_engine"]) {
            return value["search_engine"];
        }

        return "bing";
    }

    static async setDefaultSearchEngine(name) {
        await chrome.storage.sync.set({ search_engine: name });
    }

    static getAllSearchEngines() {
        return Object.entries(SearchEngines);
    }

    static async getDefaultSearchEntry() {
        const searchEngineId = await Settings.#getDefaultSearchEngineId();
        return SearchEngines[searchEngineId];
    }

    static async #getDefaultSearchEngineId() {
        const value = await chrome.storage.sync.get("search_engine");
        if (value && value["search_engine"]) {
            return value["search_engine"];
        }

        return "bing";
    }
}