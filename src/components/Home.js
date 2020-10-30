import React from "react";
import { withRouter } from "react-router-dom";
import { Container, Grid, Paper, Divider } from "@material-ui/core";
import db from "../services/db";

import CreateButton from "./CreateButton";
import ProfileSummary from "./ProfileSummary";
import ReasonsForm from "./ReasonsForm";
import ProfileButton from "./ProfileButton";
import OutingDateTime from "./OutingDateTime";
import Certificate from "../services/certificate/certificate";
import LastCertificate from "./LastCertificate";
import Header from "./Header";

// Helpers to save Blob in indexedDB
function arrayBufferToBlob(buffer, type) {
  return new Blob([buffer], { type: type });
}
function blobToArrayBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("loadend", (e) => {
      resolve(reader.result);
    });
    reader.addEventListener("error", reject);
    reader.readAsArrayBuffer(blob);
  });
}

function Home(props) {
  const profile = props.profile;
  const outingDateTime = props.outingDateTime;

  const [reasons, setReasons] = React.useState({
    work: false,
    shopping: false,
    health: false,
  });
  const [storedPdf, setStoredPdf] = React.useState({
    pdfBlob: null,
    generatedDate: null,
    generatedTime: null,
  });

  React.useEffect(() => {
    async function store() {
      const pdfCount = await db.pdfOS?.toCollection().count();
      if (pdfCount && pdfCount !== 0) {
        const {
          pdfArrayBuffer,
          generatedDate,
          generatedTime,
        } = await db.pdfOS.toCollection().last();
        const pdfBlob = arrayBufferToBlob(pdfArrayBuffer, "application/pdf");
        setStoredPdf({ pdfBlob, generatedDate, generatedTime });
      }
    }
    store();
  }, []);

  const handleReasonsFormChange = function (newReasons) {
    setReasons(newReasons);
  };

  async function handleCreateButtonClick() {
    const newCertif = new Certificate({ outingDateTime, profile, reasons });
    await newCertif.generatePdf();
    const { pdfGenerationDate, pdfGenerationTime, pdfBlob } = newCertif;
    const pdfArrayBuffer = await blobToArrayBuffer(pdfBlob);
    const newPDF_state = {
      pdfBlob,
      generatedDate: pdfGenerationDate,
      generatedTime: pdfGenerationTime,
    };
    const newPDF_db = {
      pdfArrayBuffer,
      generatedDate: pdfGenerationDate,
      generatedTime: pdfGenerationTime,
    };
    await db.pdfOS.clear();
    await db.pdfOS.add(newPDF_db);
    setStoredPdf(newPDF_state);
    newCertif.downloadPdf();
  }

  function handleProfileButtonClick() {
    props.history.push("/profile");
  }

  function handleOutingDateTimeChange(newOutingDateTime) {
    return props.onOutingDateTimeChange(newOutingDateTime);
  }

  // direct to 'Profile' if no username.
  React.useEffect(() => {
    if (!profile.firstName) {
      props.history.push("/profile");
    }
  });

  // alert message
  const lastCertificateContainer = (
    <React.Fragment>
      {storedPdf && storedPdf.generatedTime ? (
        <>
          <Grid item>
            <LastCertificate lastCertificate={storedPdf} />
          </Grid>
          <Grid item>
            <Divider />
          </Grid>{" "}
        </>
      ) : (
        <Container style={{ backgroundColor: "#F5E9F6", padding: "20px" }}>
          <span role="img" aria-label="/!\">
            {" "}
            ⚠️ Aucune attestation disponible 😷 💸 💸 👮
          </span>
        </Container>
      )}
    </React.Fragment>
  );

  return (
    <div>
      <Container maxWidth="xs">
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="stretch"
          justify="space-around"
        >
          <Grid item>
            <Grid container alignItems="flex-end" justify="space-between">
              <Grid item style={{ marginTop: 8 }}>
                <ProfileSummary profile={profile} />
              </Grid>
              <Grid item>
                <ProfileButton onClick={handleProfileButtonClick} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          {lastCertificateContainer}
          <Grid item>
            <OutingDateTime
              onChange={handleOutingDateTimeChange}
              outingDateTime={props.outingDateTime}
            />
          </Grid>
          <Grid item>
            <Paper elevation={6}>
              <ReasonsForm onChange={handleReasonsFormChange} />
            </Paper>
          </Grid>
          <Grid item>
            <Grid container justify="flex-end">
              <Grid item>
                <CreateButton onClick={handleCreateButtonClick} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <div style={{ height: 100 }} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default withRouter(Home);
