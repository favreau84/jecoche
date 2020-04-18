import { PDFDocument, StandardFonts } from 'pdf-lib'
import basePdf from './certificate.pdf'
import Qrcode from '../qrcode'

class Certificate {
    
    constructor({profile:{firstName,lastName,birthDate,birthPlace,address},reasons:{work,shopping,health,family,sport,justice,missions}}){
        this.fields = {};
        this.inputs = {};
        this.inputs.firstName = firstName;
        this.inputs.lastName = lastName;
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
        //Add qrcode
        const qr = new Qrcode(
            {
                createdAtDate:'TODO', 
                createdAtTime:'TODO', 
                lastName: this.fields.lastName, 
                firstName: this.fields.firstName, 
                birthDate: this.fields.birthDate, 
                birthPlace: this.fields.birthDate, 
                addressStreet: this.fields.address, 
                addressZipcode: 'TODO', 
                addressCity: 'TODO', 
                outingDate: 'TODO', 
                outingHour : 'TODO', 
                outingMinutes : 'TODO', 
                reasons: 'TODO'
            }
        );
        const generatedQR = await qr.generateQR()
        const qrImage = await pdf.embedPng(generatedQR)
        p1.drawImage(qrImage, {
            x: p1.getWidth() - 170,
            y: 155,
            width: 100,
            height: 100,
        })

        // add page2 with QRcode
        pdf.addPage()
        const p2 = pdf.getPages()[1]
        p2.drawImage(qrImage, {
            x: 50,
            y: p2.getHeight() - 350,
            width: 300,
            height: 300,
        })

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