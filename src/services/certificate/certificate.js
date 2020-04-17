import { PDFDocument, StandardFonts } from 'pdf-lib'
import basePdf from './certificate.pdf'

class Certificate {
    
    constructor({profile:{firstName,lastName},reasons:{work,shopping,health}}){
        this.fields = {};
        this.fields.name = `${firstName} ${lastName}`;
        this.fields.work = work ? 'x' : '';
        this.fields.shopping = shopping ? 'x' : '';
        this.fields.health = health ? 'x' : '';
        this.pdfBlob = null
    }

    template = {
        name: {x: 123, y: 686, size:11},
        work: {x: 76, y:527, size:19},
        shopping: {x:76, y:478, size:19},
        health: {x:76, y:436, size:19 }
    };

    generatePdf =  async function(){
        const basePdfBytes = await fetch(basePdf).then(res => res.arrayBuffer())
        const pdf = await PDFDocument.load(basePdfBytes)
        const font = await pdf.embedFont(StandardFonts.Helvetica)
        const p1 = pdf.getPages()[0]
        // Add content here
        for (let field in this.fields){
            p1.drawText(this.fields[field], {
                x:this.template[field].x, 
                y:this.template[field].y, 
                size:this.template[field].size,
                font:font
            })
        }
        const newPdfBytes = await pdf.save();
    
        this.pdfBlob =  new Blob([newPdfBytes], { type: 'application/pdf' })
    }

    downloadPdf = function(){
        const link = document.createElement('a')
        link.href = URL.createObjectURL(this.pdfBlob)
        link.download = 'certificate.pdf'
        document.body.appendChild(link)
        link.click()
    }
} 

export default Certificate