import { PDFDocument, StandardFonts } from "pdf-lib";
import { openDB } from "idb";
import basePdf from "./certificate.pdf";
import Qrcode from "../qrcode";

class Certificate {
  constructor({
    outingDateTime: { outingDate, outingTime },
    profile: {
      firstName,
      lastName,
      birthDate,
      birthPlace,
      addressCity,
      addressStreet,
      addressZipcode,
    },
    reasons,
  }) {
    const {
      work,
      shopping,
      health,
      family,
      sport,
      justice,
      missions,
      handicap,
      school,
    } = reasons;
    function _setReasons(reasonsObject) {
      const mapping = {
        work: "travail",
        shopping: "achats",
        health: "sante",
        family: "famille",
        sport: "sport",
        justice: "judiciaire",
        missions: "missions",
        school: "enfants",
        handicap: "handicap",
      };
      const reasons = Object.keys(mapping)
        .map((reason) => (reasonsObject[reason] ? mapping[reason] : ""))
        .filter((reasonFr) => !!reasonFr)
        .join("-");
      console.log(reasons);
      return reasons;
    }

    this.fields = {};
    this.inputs = {};
    this.inputs.firstName = firstName;
    this.inputs.lastName = lastName;
    this.inputs.addressStreet = addressStreet;
    this.inputs.addressCity = addressCity;
    this.inputs.addressZipcode = addressZipcode;
    this.fields.name = `${firstName} ${lastName}`;
    this.fields.birthDate = birthDate;
    this.fields.birthPlace = birthPlace;
    this.fields.address = `${addressStreet} ${addressZipcode} ${addressCity}`;
    this.fields.work = work ? "x" : "";
    this.fields.shopping = shopping ? "x" : "";
    this.fields.health = health ? "x" : "";
    this.fields.family = family ? "x" : "";
    this.fields.sport = sport ? "x" : "";
    this.fields.justice = justice ? "x" : "";
    this.fields.missions = missions ? "x" : "";
    this.fields.handicap = handicap ? "x" : "";
    this.fields.school = school ? "x" : "";
    this.fields.outingLocation = addressCity;
    this.fields.outingDate = outingDate;
    this.fields.outingHours = outingTime.split("h")[0];
    this.fields.outingMinutes = outingTime.split("h")[1];
    this.inputs.reasons = _setReasons(reasons);
    this.pdfBlob = null;
    this.pdfGenerationDate = null;
    this.pdfGenerationTime = null;
  }

  template = {
    name: { x: 119, y: 696, size: 11 },
    birthDate: { x: 119, y: 674, size: 11 },
    birthPlace: { x: 297, y: 674, size: 11 },
    address: { x: 133, y: 652, size: 11 },
    work: { x: 84, y: 578, size: 18 },
    shopping: { x: 84, y: 533, size: 18 },
    health: { x: 84, y: 477, size: 18 },
    family: { x: 84, y: 435, size: 18 },
    sport: { x: 84, y: 358, size: 18 },
    justice: { x: 84, y: 295, size: 18 },
    missions: { x: 84, y: 255, size: 18 },
    handicap: { x: 84, y: 396, size: 18 },
    school: { x: 84, y: 211, size: 18 },
    outingLocation: { x: 105, y: 177, size: 11 },
    outingHours: { x: 264, y: 153, size: 11 },
    outingMinutes: { x: 284, y: 153, size: 11 },
    outingDate: { x: 91, y: 153, size: 11 },
  };

  generatePdf = async function () {
    this.pdfGenerationDate = new Date().toLocaleDateString("fr-FR");
    this.pdfGenerationTime = new Date()
      .toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })
      .replace(":", "h");

    const basePdfBytes = await fetch(basePdf).then((res) => res.arrayBuffer());
    const pdf = await PDFDocument.load(basePdfBytes);

    // set pdf metadata
    pdf.setTitle("COVID-19 - Déclaration de déplacement");
    pdf.setSubject("Attestation de déplacement dérogatoire");
    pdf.setKeywords([
      "covid19",
      "covid-19",
      "attestation",
      "déclaration",
      "déplacement",
      "officielle",
      "gouvernement",
    ]);
    pdf.setProducer("DNUM/SDIT");
    pdf.setCreator("");
    pdf.setAuthor("Ministère de l'intérieur");

    const font = await pdf.embedFont(StandardFonts.Helvetica);
    const p1 = pdf.getPages()[0];
    // Add content here
    for (let field in this.fields) {
      p1.drawText(this.fields[field], {
        x: this.template[field].x,
        y: this.template[field].y,
        size: this.template[field].size,
        font: font,
      });
    }
    // Date création
    //p1.drawText("Date de création:", { x: 464, y: 150, size: 7, font: font });
    //p1.drawText(`${this.pdfGenerationDate} à ${this.pdfGenerationTime}`, {
    //x: 455,
    //   y: 144,
    //   size: 7,
    //   font: font,
    // });

    //Add qrcode
    const qr = new Qrcode({
      createdAtDate: this.pdfGenerationDate,
      createdAtTime: this.pdfGenerationTime,
      lastName: this.inputs.lastName,
      firstName: this.inputs.firstName,
      birthDate: this.fields.birthDate,
      birthPlace: this.fields.birthPlace,
      addressStreet: this.inputs.addressStreet,
      addressZipcode: this.inputs.addressZipcode,
      addressCity: this.inputs.addressCity,
      outingDate: this.fields.outingDate,
      outingHours: this.fields.outingHours,
      outingMinutes: this.fields.outingMinutes,
      reasons: this.inputs.reasons,
    });
    const generatedQR = await qr.generateQR();
    const qrImage = await pdf.embedPng(generatedQR);
    p1.drawImage(qrImage, {
      x: p1.getWidth() - 156,
      y: 100,
      width: 92,
      height: 92,
    });

    // add page2 with QRcode
    pdf.addPage();
    const p2 = pdf.getPages()[1];
    p2.drawImage(qrImage, {
      x: 50,
      y: p2.getHeight() - 350,
      width: 300,
      height: 300,
    });

    const newPdfBytes = await pdf.save();

    this.pdfBlob = new Blob([newPdfBytes], { type: "application/pdf" });
  };

  downloadPdf = function () {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(this.pdfBlob);
    link.download = "certificate.pdf";
    document.body.appendChild(link);
    link.click();
  };

  storePdf = async function () {
    const db = await openDB("Certificates", 1, {
      upgrade(db) {
        const store = db.createObjectStore("pdfOS", {
          keyPath: "id",
          autoIncrement: true,
        });
        return store;
      },
    });
    await db.clear("pdfOS");
    await db.add("pdfOS", this.pdfBlob);
  };
}

export default Certificate;
