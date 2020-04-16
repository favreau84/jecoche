import React from 'react'
import { PDFDocument } from 'pdf-lib'
import {Button} from '@material-ui/core'

import basePdf from './certificate.pdf'


const style = {
    margin: "10px"
}
export default function CreateCertificateButton() {
    
    const generatePdf = async function(){
        const basePdfBytes = await fetch(basePdf).then(res => res.arrayBuffer())
        const pdf = await PDFDocument.load(basePdfBytes)

        // Add content here

        const newPdfBytes = await pdf.save();
    
        return new Blob([newPdfBytes], { type: 'application/pdf' })
    }

   const downloadPdf = function(pdfBlob,fileName){
        const link = document.createElement('a')
        link.href = URL.createObjectURL(pdfBlob)
        link.download = fileName
        document.body.appendChild(link)
        link.click()
   }
    
    const  onClick = async function(){
        const pdf = await generatePdf();
        downloadPdf(pdf,'certificat.pdf');
    }

    return (
        <div>
            <Button 
                variant="contained" 
                color='primary' 
                style={style}
                onClick = {onClick}
            > 
                Générer l'attestation 
            </Button>    
        </div>
    )
}
