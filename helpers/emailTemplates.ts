export function generateRentalEmailTemplate({
  customer,
  email,
  telephone,
  category,
  dayStart,
  dayEnd,
  height,
  weight,
  feet,
  where,
  privacy,
}) {
  return `
      <h1>Richiesta di noleggio</h1>
      <hr>
      <h2>Dati cliente</h2>
      <div>Cliente: ${customer}</div>
      <div>Email: ${email}</div>
      <div>Telefono: ${telephone || 'Non fornito'}</div>
      <hr>
      <h2>Data</h2>
      <div>Da ${dayStart} a ${dayEnd}</div>
      <hr>
      <h2>Dati noleggio</h2>
      <div>Tipo: ${category}</div>
      <div>Altezza: ${height || 'Non fornito'}</div>
      <div>Peso: ${weight || 'Non fornito'}</div>
      <div>Numero di piede: ${feet || 'Non fornito'}</div>
      <hr>
      <h2>Luogo di ritiro</h2>
      <div>${where || 'Non fornito'}</div>
      <hr>
      <h2>Consensi privacy</h2>
      <div>Privacy: ${privacy ? 'Accettato' : 'Non accettato'}</div>
    `;
}

export function generateReservationEmailTemplate({
  activityTitle,
  customer,
  city,
  email,
  telephone,
  category,
  dayStart,
  dayEnd,
  lessonStartAt,
  lessonEndAt,
  level,
  participants,
  notes,
  privacyFlag,
  marketingFlag,
  reservationId,
}) {
  return `
    <h1>Prenotazione per <b>${activityTitle}</b></h1>
    <hr>
    <h2>Dati cliente</h2>
    <div>Cliente: ${customer}</div>
    <div>Città: ${city}/div>
    <div>Email: ${email}</div>
    <div>Telefono: ${telephone}</div>
    <hr>
    <h2>Dati lezione</h2>
    <div>Categoria lezione: ${category}</div>
    <div>Periodo: ${dayStart} ${dayEnd}</div>
    <div>Orari: ${lessonStartAt} ${lessonEndAt}</div>
    <div>Livello: ${level}</div>
    <div>Partecipanti: ${participants}</div>
    <hr>
    <h2>Info aggiuntive</h2>
    <div>Extra: ${notes}</div>
    <hr>
    <h2>Consensi checkbox</h2>
    <div>Privacy: ${privacyFlag}</div>
    <div>Marketing: ${marketingFlag}</div>
    <h2>Id prenotazione</h2>
    <div>${reservationId}</div>
`;
}

export function generateActivityEmailTemplate({
  activity,
  customer,
  city,
  email,
  telephone,
  category,
  message,
  privacyFlag,
}) {
  return `
    <h1>Prenotazione per <b>${activity}</b></h1>
    <hr>
    <h2>Dati cliente</h2>
    <div>Cliente: ${customer}</div>
    <div>Email: ${email}</div>
    <div>Telefono: ${telephone}</div>
    <div>Città: ${city}</div>
    <div>Categoria: ${category}</div>
    <hr>
    Messaggio: 
    <br>
    ${message}
    <hr>
    <h2>Consensi</h2>
    <div>Privacy: ${privacyFlag}</div>
`;
}
