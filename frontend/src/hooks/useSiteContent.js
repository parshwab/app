import { useEffect, useState } from "react";
import { api } from "@/lib/rp";
import { defaultSiteContent, mergeSiteContent } from "@/content/siteContent";

const SITE_CONTENT_CACHE_KEY = "rightpolicy_site_content_v1";

function readCachedContent() {
    try {
        const cached = window.localStorage.getItem(SITE_CONTENT_CACHE_KEY);
        return cached ? mergeSiteContent(defaultSiteContent, JSON.parse(cached)) : defaultSiteContent;
    } catch {
        return defaultSiteContent;
    }
}

export function cacheSiteContent(content) {
    try {
        window.localStorage.setItem(SITE_CONTENT_CACHE_KEY, JSON.stringify(content));
    } catch {
        // Ignore storage failures; the live API remains the source of truth.
    }
}

export default function useSiteContent() {
    const [content, setContent] = useState(readCachedContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        api.get("/site-content")
            .then(({ data }) => {
                const merged = mergeSiteContent(defaultSiteContent, data?.content);
                cacheSiteContent(merged);
                if (active) setContent(merged);
            })
            .catch(() => {
                if (active) setContent(readCachedContent());
            })
            .finally(() => {
                if (active) setLoading(false);
            });
        return () => {
            active = false;
        };
    }, []);

    return { content, loading };
}
