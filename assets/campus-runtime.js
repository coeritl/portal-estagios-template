(() => {
  const config = window.CAMPUS_CONFIG || {};
  window.SUPABASE_CONFIG = {
    url: config.supabaseUrl || "",
    anonKey: config.supabaseAnonKey || "",
    turnstileSiteKey: config.turnstileSiteKey || ""
  };

  const replacements = new Map([
    ["IFMS Campus SEU CAMPUS", config.campusName],
    ["Campus SEU CAMPUS", config.campusShortName],
    ["SUA CIDADE", config.campusCity],
    ["coeri.SEUCAMPUS@ifms.edu.br", config.coeriEmail],
    ["(00) 0000-0000", config.phoneDisplay],
    ["+550000000000", config.phoneHref],
    ["https://SEU-DOMINIO/", config.publicBaseUrl]
  ]);

  const replace = value => {
    let result = value;
    replacements.forEach((replacement, source) => {
      if (replacement) result = result.replaceAll(source, replacement);
    });
    return result;
  };

  document.addEventListener("DOMContentLoaded", () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.parentElement?.closest("script, style")) node.nodeValue = replace(node.nodeValue);
    });

    document.querySelectorAll("[href], [alt], [title], [aria-label], [content]").forEach(element => {
      ["href", "alt", "title", "aria-label", "content"].forEach(attribute => {
        if (element.hasAttribute(attribute)) element.setAttribute(attribute, replace(element.getAttribute(attribute)));
      });
    });

    document.querySelectorAll('img[src*="logo-campus"]').forEach(image => {
      image.src = config.logoUrl || "assets/logo-campus.png";
    });

    const projectLink = document.querySelector('a[href*="supabase.com/dashboard/project/"]');
    const usageLink = document.querySelector('a[href*="supabase.com/dashboard/org/"][href*="/usage"]');
    if (projectLink && config.supabaseProjectDashboardUrl) projectLink.href = config.supabaseProjectDashboardUrl;
    if (usageLink && config.supabaseUsageUrl) usageLink.href = config.supabaseUsageUrl;
  });
})();
