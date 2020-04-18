import { PDFDocument, StandardFonts } from 'pdf-lib'
import basePdf from './certificate.pdf'
import Qrcode from '../qrcode'

class Certificate {
    
    constructor({outingDateTime: {outingDate, outingTime}, profile:{firstName,lastName,birthDate,birthPlace,addressCity,addressStreet, addressZipcode},reasons}){
        
        const {work,shopping,health,family,sport,justice,missions} = reasons
        function _setReasons(reasonsObject){
            const mapping = {
                work: "travail",
                shopping : "courses",
                health : "sante",
                family: "famille",
                sport: "sport",
                justice: "judiciaire",
                missions: "missions"
            };
            const reasons = Object.keys(mapping).map(reason => reasonsObject[reason] ? mapping[reason] : '')
            .filter(reasonFr => !!reasonFr).join("-")
            console.log(reasons)
            return reasons
        }

        this.fields = {};
        this.inputs = {};
        this.inputs.firstName = firstName;
        this.inputs.lastName = lastName;
        this.inputs.addressStreet = addressStreet;
        this.inputs.addressCity = addressCity;
        this.inputs.addressZipcode = addressZipcode;
        this.fields.name = `${firstName} ${lastName}`;
        this.fields.birthDate = birthDate
        this.fields.birthPlace = birthPlace
        this.fields.address = `${addressStreet} ${addressZipcode} ${addressCity}`
        this.fields.work = work ? 'x' : '';
        this.fields.shopping = shopping ? 'x' : '';
        this.fields.health = health ? 'x' : '';
        this.fields.family = family ? 'x' : '';
        this.fields.sport = sport ? 'x' : '';
        this.fields.justice = justice ? 'x' : '';
        this.fields.missions = missions ? 'x' : '';
        this.fields.outingLocation = addressCity;
        this.fields.outingDate = outingDate;
        this.fields.outingHours = outingTime.split('h')[0];
        this.fields.outingMinutes = outingTime.split('h')[1];
        this.inputs.reasons = _setReasons(reasons)
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
        missions: {x:76, y:260, size:19 },
        outingLocation: {x:111, y:226,size:11},
        outingHours : {x:200, y:201, size:11 },
        outingMinutes : {x:220, y:201, size:11 },
        outingDate : {x:92, y:200, size:11 },
    };

    generatePdf =  async function(){
        const pdfGenerationDate = new Date().toLocaleDateString('fr-FR')
        const pdfGenerationTime = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')

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
        // Date création
            p1.drawText('Date de création:', {x:464,y:150,size:7,font:font});
            p1.drawText(`${pdfGenerationDate} à ${pdfGenerationTime}`,{x:455,y:144,size:7,font:font});

        //Add qrcode
        const qr = new Qrcode(
            {
                createdAtDate: pdfGenerationDate, 
                createdAtTime:pdfGenerationTime, 
                lastName: this.inputs.lastName, 
                firstName: this.inputs.firstName, 
                birthDate: this.fields.birthDate, 
                birthPlace: this.fields.birthPlace, 
                addressStreet: this.inputs.addressStreet, 
                addressZipcode: this.inputs.addressZipcode, 
                addressCity: this.inputs.addressCity, 
                outingDate: this.fields.outingDate, 
                outingHours : this.fields.outingHours, 
                outingMinutes : this.fields.outingMinutes, 
                reasons: this.inputs.reasons
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