(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/helper/notify.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV, Fragment: _Fragment } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
const React = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const Notify = ({ text })=>{
    return /*#__PURE__*/ _jsxDEV(_Fragment, {
        children: /*#__PURE__*/ _jsxDEV("div", {
            className: "fixed top-10 mx-auto transition-transform rounded-2xl px-2 py-3 bg-purple-700 text-blue-600",
            children: text
        }, void 0, false, {
            fileName: "[project]/app/helper/notify.tsx",
            lineNumber: 8,
            columnNumber: 5
        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
    }, void 0, false);
};
module.exports = Notify;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/roster/page.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const { jsxDEV: _jsxDEV } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
const React = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const { useState } = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
const Image = __turbopack_context__.r("[project]/node_modules/.pnpm/next@16.0.10_@babel+core@7.28.5_react-dom@19.2.1_react@19.2.1__react@19.2.1/node_modules/next/image.js [app-client] (ecmascript)");
const ReactMarkdown = __turbopack_context__.r("[project]/node_modules/.pnpm/react-markdown@10.1.0_@types+react@19.2.7_react@19.2.1/node_modules/react-markdown/index.js [app-client] (ecmascript)");
const { RiCloseLargeLine } = __turbopack_context__.r("[project]/node_modules/.pnpm/react-icons@5.5.0_react@19.2.1/node_modules/react-icons/ri/index.js [app-client] (ecmascript)");
const Notify = __turbopack_context__.r("[project]/app/helper/notify.tsx [app-client] (ecmascript)");
const RosterPage = ()=>{
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [bannerReview, setBannerReview] = useState("fkjflskdf");
    const [profilePicReview, setProfilePicReview] = useState("sskfjadf");
    const [bio, setBio] = useState("**heheh**fkjdldk");
    const [about, setAbout] = useState(null);
    const [featured, setFeatured] = useState(null);
    const handleImageUpload = (e)=>{
        const selectedFile = e.target.files?.[0];
        if (selectedFile == null) {
            return;
        }
        // if (selectedFile.size > 5) {
        //   return "Please upload image size less than 5MB";
        // }
        const reader = new FileReader();
        reader.onload = (event)=>{
            setImage(event.target?.result);
            setFile(selectedFile);
        };
        reader.readAsDataURL(selectedFile);
    };
    const handleDrop = (e)=>{
        e.preventDefault();
        const filedrop = e.dataTransfer.files[0];
        if (filedrop == null) {
            return;
        }
        setFile(filedrop);
        const reader = new FileReader();
        reader.onload = (event)=>{
            setImage(event.target?.result);
        };
        reader.readAsDataURL(e.dataTransfer.files[0]);
    };
    const handleDragOver = (e)=>{
        e.preventDefault();
    };
    const handleClose = ()=>{
        setImage(null);
        setFile(null);
    };
    const filedata = new FormData();
    const handleRoster = async ()=>{
        if (file) {
            filedata.append('file', file);
            // Call the roster function with the image data
            await fetch('/api/upload', {
                method: 'POST',
                body: filedata
            }).then((response)=>response.json()).then((data)=>{
                setBannerReview(data.banner);
                setProfilePicReview(data.profilePicture);
                setBio(data.bio);
                setAbout(data.about);
                setFeatured(data.featured);
            }).catch((error)=>{
                console.error(error);
            });
        }
    };
    return /*#__PURE__*/ _jsxDEV("div", {
        className: " h-screen p-8 bg-background grid md:grid-cols-3 gap-8",
        children: [
            /*#__PURE__*/ _jsxDEV("div", {
                className: "md:col-span-1 flex flex-col bg-background",
                children: [
                    /*#__PURE__*/ _jsxDEV("h1", {
                        className: "text-3xl font-bold mb-4 text-text",
                        children: "LinkedIn Profile Reviewer"
                    }, void 0, false, {
                        fileName: "[project]/app/roster/page.tsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("p", {
                        className: "mb-6 text-text-secondary",
                        children: "Upload your LinkedIn Profile Screenshot to get the feedback."
                    }, void 0, false, {
                        fileName: "[project]/app/roster/page.tsx",
                        lineNumber: 93,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    image && /*#__PURE__*/ _jsxDEV("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ _jsxDEV("div", {
                                className: "fixed px-2 py-2",
                                children: /*#__PURE__*/ _jsxDEV(RiCloseLargeLine, {
                                    className: "",
                                    onClick: handleClose
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 96,
                                    columnNumber: 46
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("img", {
                                src: image,
                                alt: "Uploaded",
                                className: "max-w-full mx-auto h-120 z-0 rounded-lg"
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            /*#__PURE__*/ _jsxDEV("button", {
                                onClick: handleRoster,
                                type: "button",
                                disabled: !image,
                                className: "mt-4 w-full h-fit rounded-md bg-stone-600 p-2",
                                children: "Feed it to Roster"
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 98,
                                columnNumber: 13
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/roster/page.tsx",
                        lineNumber: 95,
                        columnNumber: 11
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                    /*#__PURE__*/ _jsxDEV("div", {
                        className: "flex-grow w-full border-2 border-dashed rounded-lg flex items-center justify-center text-center p-4 transition-all border-bg-elevated text-text-secondary",
                        onDrop: handleDrop,
                        onDragOver: handleDragOver,
                        children: /*#__PURE__*/ _jsxDEV("div", {
                            children: [
                                /*#__PURE__*/ _jsxDEV("p", {
                                    className: "mb-2",
                                    children: "Drag & drop an Image"
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 13
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                /*#__PURE__*/ _jsxDEV("p", {
                                    className: "my-2 text-sm",
                                    children: "or"
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                /*#__PURE__*/ _jsxDEV("label", {
                                    className: "cursor-pointer px-4 py-2 rounded-md transition-all bg-primary text-text-primary",
                                    children: [
                                        "Browse Files",
                                        /*#__PURE__*/ _jsxDEV("input", {
                                            type: "file",
                                            onChange: handleImageUpload,
                                            className: "hidden",
                                            accept: "image/jpeg, image/png, image/jpg"
                                        }, void 0, false, {
                                            fileName: "[project]/app/roster/page.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 116,
                                    columnNumber: 13
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/roster/page.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                    }, void 0, false, {
                        fileName: "[project]/app/roster/page.tsx",
                        lineNumber: 108,
                        columnNumber: 9
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                ]
            }, void 0, true, {
                fileName: "[project]/app/roster/page.tsx",
                lineNumber: 91,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
            /*#__PURE__*/ _jsxDEV("div", {
                className: "md:col-span-2 h-full overflow-y-auto pl-8",
                children: /*#__PURE__*/ _jsxDEV("div", {
                    className: "p-6 rounded-lg shadow-md bg-bg-surface",
                    children: /*#__PURE__*/ _jsxDEV("div", {
                        className: "space-y-6",
                        children: [
                            bannerReview && /*#__PURE__*/ _jsxDEV("div", {
                                className: "prose border border-gray-900 rounded-lg p-4 border-bg-elevated",
                                children: /*#__PURE__*/ _jsxDEV(ReactMarkdown, {
                                    children: bannerReview
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 134,
                                columnNumber: 30
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            profilePicReview && /*#__PURE__*/ _jsxDEV("div", {
                                className: "prose border rounded-lg p-4 border-bg-elevated",
                                children: /*#__PURE__*/ _jsxDEV(ReactMarkdown, {
                                    children: profilePicReview
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 140,
                                    columnNumber: 15
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 139,
                                columnNumber: 34
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            bio && /*#__PURE__*/ _jsxDEV("div", {
                                className: "prose border rounded-lg p-4 border-bg-elevated",
                                children: /*#__PURE__*/ _jsxDEV(ReactMarkdown, {
                                    children: bio
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 144,
                                columnNumber: 21
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            about && /*#__PURE__*/ _jsxDEV("div", {
                                className: "prose border rounded-lg p-4 border-bg-elevated",
                                children: /*#__PURE__*/ _jsxDEV(ReactMarkdown, {
                                    children: about
                                }, void 0, false, {
                                    fileName: "[project]/app/roster/page.tsx",
                                    lineNumber: 150,
                                    columnNumber: 15
                                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                            }, void 0, false, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 149,
                                columnNumber: 23
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                            featured && /*#__PURE__*/ _jsxDEV("div", {
                                className: "prose border rounded-lg p-4 border-bg-elevated",
                                children: [
                                    /*#__PURE__*/ _jsxDEV("h3", {
                                        children: "Featured"
                                    }, void 0, false, {
                                        fileName: "[project]/app/roster/page.tsx",
                                        lineNumber: 155,
                                        columnNumber: 15
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e),
                                    /*#__PURE__*/ _jsxDEV(ReactMarkdown, {
                                        children: featured
                                    }, void 0, false, {
                                        fileName: "[project]/app/roster/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/roster/page.tsx",
                                lineNumber: 154,
                                columnNumber: 26
                            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/roster/page.tsx",
                        lineNumber: 132,
                        columnNumber: 11
                    }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
                }, void 0, false, {
                    fileName: "[project]/app/roster/page.tsx",
                    lineNumber: 131,
                    columnNumber: 9
                }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
            }, void 0, false, {
                fileName: "[project]/app/roster/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, /*TURBOPACK member replacement*/ __turbopack_context__.e)
        ]
    }, void 0, true, {
        fileName: "[project]/app/roster/page.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, /*TURBOPACK member replacement*/ __turbopack_context__.e);
};
module.exports = RosterPage;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=app_39278d0b._.js.map