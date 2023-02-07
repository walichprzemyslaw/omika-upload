export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "Użytkownik",
    width: 100,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "firstName",
    headerName: "Imię",
    width: 100,
  },
  {
    field: "lastName",
    headerName: "Nazwisko",
    width: 120,
  },
  {
    field: "address",
    headerName: "Adres",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.street}&nbsp;
          {params.row.homeNumber}
        </div>
      );
    },
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
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "category",
    headerName: "Kategoria",
    width: 100,
  },
  {
    field: "ingredients",
    headerName: "Składniki",
    width: 250,
  },
  {
    field: "price",
    headerName: "Cena",
    width: 150,
    renderCell: (params) => {
      return (
        <span>{params.row.price ? params.row.price.length > 1
          ? params.row.price[0] + " zł | " + params.row.price[1] + " zł"
          : params.row.price + " zł" : "loading..."}
        </span>
      );
    },
  },
  {
    field: "isAvailable",
    headerName: "Dostępny",
    width: 150,
    renderCell: (params) => {
      return <span>{params.row.isAvailable ? "dostępny" : "niedostępny"}</span>;
    },
  },
];

export const orderColumns = [
  { field: "_id", headerName: "ID", width: 40 },
  {
    field: "createdAt",
    headerName: "Data",
    width: 150,
    renderCell: (params) => {
      return new Date(params.row.createdAt).toLocaleString();
    },
  },
  { field: "customerId", headerName: "ID klienta", width: 110 },
  { field: "phone", headerName: "Numer telefonu", width: 140 },
  {
    field: "delivery",
    headerName: "Dostawa",
    width: 80,
    renderCell: (params) => {
      return (
        <span className={`delivery ${params.row.delivery}`}>
          {params.row.delivery ? "dostawa" : "odbiór"}
        </span>
      );
    },
  },
  {
    field: "address",
    headerName: "Adres",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          {params.row.street}&nbsp;
          {params.row.homeNumber}
        </div>
      );
    },
  },
  {
    field: "totalPrice",
    headerName: "Suma",
    width: 80,
    renderCell: (params) => {
      return <div className="cellWithImg">{params.row.totalPrice}&nbsp;zł</div>;
    },
  },
  { field: "paymentMethod", headerName: "Płatność", width: 100 },
  { field: "paymentReciver", headerName: "Pracownik", width: 100 },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
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

