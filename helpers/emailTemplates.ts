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
