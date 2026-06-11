import { useEffect, useState } from "react";
import { api } from "@/lib/rp";
import { defaultSiteContent, mergeSiteContent } from "@/content/siteContent";

export default function useSiteContent() {
    const [content, setContent] = useState(defaultSiteContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;
        api.get("/site-content")
            .then(({ data }) => {
                if (active) setContent(mergeSiteContent(defaultSiteContent, data?.content));
            })
            .catch(() => {
                if (active) setContent(defaultSiteContent);
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
