import QRCode from "qrcode";

class Qrcode {
  constructor({
    createdAtDate,
    createdAtTime,
    lastName,
    firstName,
    birthDate,
    birthPlace,
    addressStreet,
    addressZipcode,
    addressCity,
    outingDate,
    outingHours,
    outingMinutes,
    reasons,
  }) {
    this.qrcodeText = [
      `Cree le: ${createdAtDate} a ${createdAtTime}`,
      `Nom: ${lastName}`,
      `Prenom: ${firstName}`,
      `Naissance: ${birthDate} a ${birthPlace}`,
      `Adresse: ${addressStreet} ${addressZipcode} ${addressCity}`,
      `Sortie: ${outingDate} a ${outingHours}h${outingMinutes}`,
      `Motifs: ${reasons}`,
    ].join(";\n ");
  }

  generateQR = async function () {
    try {
      var opts = {
        errorCorrectionLevel: "M",
        type: "image/png",
        quality: 0.92,
        margin: 1,
      };
      return await QRCode.toDataURL(this.qrcodeText, opts);
    } catch (err) {
      console.error(err);
    }
  };
}

export default Qrcode;
