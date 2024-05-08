export const SearchEnginesConfig = {
    "en": {
        default: "Bing",
        searchEngines:
        {
            "Bing": {
                key: "Bing",
                name: "bingName",
                entries: [
                    {
                        type: "serp",
                        title: "bingSearchTooltip",
                        url_temple: "https://www.bing.com/search?form=ancmsce&q=",
                    },
                    {
                        type: "ai",
                        title: "copilotTooltip",
                        url_temple: "https://www.bing.com/search?form=ancmsce&showconv=1&sendquery=1&q=",
                    }
                ]
            },
            "DuckDuckGo": {
                key: "DuckDuckGo",
                name: "duckDuckGoName",
                entries: [{
                    type: "serp",
                    title: "duckduckGoSearchTooltip",
                    url_temple: "https://duckduckgo.com/?va=g&t=hj&ia=web&q=",
                }]
            },
            "Google": {
                key: "Google",
                name: "googleName",
                entries: [
                    {
                        type: "serp",
                        title: "googleSearchTooltip",
                        url_temple: "https://www.google.com/search?ie=UTF-8&q=",
                    }
                ]
            },
            "Yahoo": {
                key: "Yahoo",
                name: "yahooName",
                entries: [
                    {
                        type: "serp",
                        title: "yahooSearchTooltip",
                        url_temple: "https://search.yahoo.com/search?fr=yfp-t&ei=UTF-8&fp=1&p=",
                    }
                ]
            }
        }
    },
    "zh": {
        default: "Bing",
        searchEngines: {
            "360": {
                key: "360",
                name: "360Name",
                entries: [
                    {
                        type: "serp",
                        title: "360SearchTooltip",
                        url_temple: "https://www.so.com/s?_re=0&q=",
                    }
                ]
            },
            "Baidu": {
                key: "Baidu",
                name: "baiduName",
                entries: [
                    {
                        type: "serp",
                        title: "baiduSearchTooltip",
                        url_temple: "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=",
                    }
                ]
            },
            "Bing": {
                key: "Bing",
                name: "bingName",
                entries: [
                    {
                        type: "serp",
                        title: "bingSearchTooltip",
                        url_temple: "https://cn.bing.com/search?form=ancmsce&q=",
                    }
                ]
            },
            "Sogou": {
                key: "Sogou",
                name: "sogouName",
                entries: [{
                    type: "serp",
                    title: "sogouSearchTooltip",
                    url_temple: "https://www.sogou.com/web?query=",
                }]
            }
        }
    }
};