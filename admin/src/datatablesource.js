export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Użytkownik",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 100,
  },

  {
    field: "address",
    headerName: "Adres",
    width: 200,
  },
  {
    field: "city",
    headerName: "Miasto",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Telefon",
    width: 170,
  },
];

export const productColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "Nazwa",
    width: 150,
  },
  {
    field: "category",
    headerName: "Kategoria",
    width: 150,
  },
  {
    field: "ingredients",
    headerName: "Składniki",
    width: 150,
  },
  {
    field: "isAvailable",
    headerName: "Dostępny",
    width: 150,
  },
];

export const customerColumns = [
  { field: "_id", headerName: "ID", width: 70 },
   {
    field: "firstName",
    headerName: "Imię",
    width: 80,
  },
  {
    field: "lastName",
    headerName: "Nazwisko",
    width: 80,
  },
  {
    field: "address",
    headerName: "Adres",
    width: 380,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.address},&nbsp;
          {params.row.city}
        </div>
      );
    },
  },
  {
    field: "phone",
    headerName: "Telefon",
    width: 180,
  },
];

export const orderColumns = [
  { field: "_id", headerName: "ID", width: 40 },
  { field: "customerId", headerName: "ID klienta", width: 110 },
  { field: "orderedProducts", headerName: "Produkty", width: 120 },
  {
    field: "totalPrice",
    headerName: "Suma",
    width: 80,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.totalPrice}&nbsp;zł 
        </div>
      );
    },
  },
  { field: "paymentMethod", headerName: "Płatność", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>{params.row.status}</div>
      );
    },
  },
  { field: "delivery", headerName: "Dostawa", width: 80, renderCell: (params) => {
    return (<span className={`delivery ${params.row.delivery}`}>
    {params.row.delivery ? "dostawa" : "odbiór"}
  </span>)
  } 
  },
  { field: "deliveryAddress", headerName: "Adres dostawy", width: 150 },
];

export const employeeColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "firstName",
    headerName: "Imię",
    width: 120,
  },
  {
    field: "lastName",
    headerName: "Nazwisko",
    width: 120,
  },
  {
    field: "phone",
    headerName: "Telefon",
    width: 150,
  },
];
