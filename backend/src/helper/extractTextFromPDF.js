import { extractText, getDocumentProxy } from 'unpdf';

export const extractTextFromPDF = async (pdfPath) => {

    const buffer = await readFile(pdfPath);

    const pdf = await getDocumentProxy(new Uint8Array(buffer));

    const {totalPages, text} = await extractText(pdf, {mergePages: true});

    console.log('totalpages: ',totalPages,'text: ', text);

    return text;
}