import { PDFDocument, StandardFonts } from 'pdf-lib'
import basePdf from './certificate.pdf'

class Certificate {
    
    constructor({profile:{firstName,lastName,birthDate,birthPlace,address},reasons:{work,shopping,health,family,sport,justice,missions}}){
        this.fields = {};
        this.fields.name = `${firstName} ${lastName}`;
        this.fields.birthDate = birthDate
        this.fields.birthPlace = birthPlace
        this.fields.address = address
        this.fields.work = work ? 'x' : '';
        this.fields.shopping = shopping ? 'x' : '';
        this.fields.health = health ? 'x' : '';
        this.fields.family = family ? 'x' : '';
        this.fields.sport = sport ? 'x' : '';
        this.fields.justice = justice ? 'x' : '';
        this.fields.missions = missions ? 'x' : '';
        this.pdfBlob = null
    }

    template = {
        name: {x: 123, y: 686, size:11},
        birthDate: {x: 123, y: 661, size:11},
        birthPlace: {x: 92, y: 638, size:11},
        address: {x: 134, y: 616, size:11},
        work: {x: 76, y:527, size:19},
        shopping: {x:76, y:478, size:19},
        health: {x:76, y:436, size:19 },
        family: {x:76, y:400, size:19 },
        sport: {x:76, y:345, size:19 },
        justice: {x:76, y:298, size:19 },
        missions: {x:76, y:260, size:19 }
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