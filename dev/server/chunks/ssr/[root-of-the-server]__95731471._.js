module.exports = [
"[externals]/crypto [external] (crypto, cjs, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.resolve().then(() => {
        return parentImport("[externals]/crypto [external] (crypto, cjs)");
    });
});
}),
"[project]/node_modules/.pnpm/https-proxy-agent@7.0.6/node_modules/https-proxy-agent/dist/index.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[root-of-the-server]__deaf1290._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/.pnpm/https-proxy-agent@7.0.6/node_modules/https-proxy-agent/dist/index.js [app-ssr] (ecmascript)");
    });
});
}),
"[project]/node_modules/.pnpm/node-fetch@3.3.2/node_modules/node-fetch/src/index.js [app-ssr] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/3f000_node-fetch_src_utils_multipart-parser_f11e5e2b.js",
  "server/chunks/ssr/node_modules__pnpm_1a1aba93._.js",
  "server/chunks/ssr/[root-of-the-server]__c5ee3993._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[project]/node_modules/.pnpm/node-fetch@3.3.2/node_modules/node-fetch/src/index.js [app-ssr] (ecmascript)");
    });
});
}),
];