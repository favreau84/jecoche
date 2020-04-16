import { PDFDocument } from 'pdf-lib'
import basePdf from './certificate.pdf'

function certificate(data){

    this.generatePdf = async function(){
        const basePdfBytes = await fetch(basePdf).then(res => res.arrayBuffer())
        const pdf = await PDFDocument.load(basePdfBytes)

        // Add content here

        const newPdfBytes = await pdf.save();
    
        return new Blob([newPdfBytes], { type: 'application/pdf' })
    }

    this.downloadPdf = function(pdfBlob,fileName){
        const link = document.createElement('a')
        link.href = URL.createObjectURL(pdfBlob)
        link.download = fileName
        document.body.appendChild(link)
        link.click()
    }
} 


export default certificate