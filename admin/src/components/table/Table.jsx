import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      products: ["Acer Nitro 5","Acer Nitro 6"],
      customer: "John Smith",
      phone: "555-21313",
      date: "19:21",
      totalPrice: 78.80,
      payment: "Gotówka",
      status: "Realizacja",
      delivery: true,
    },
    {
      id: 2235235,
      products: "Playstation 5",
      customer: "Michael Doe",
      phone: "555-21313",
      date: "19:14",
      totalPrice: 90,
      payment: "Online",
      status: "Realizacja",
      delivery: true,
    },
    {
      id: 2342353,
      products: "Redragon S101",
      customer: "John Smith",
      phone: "555-21313",
      date: "19:11",
      totalPrice: 38.9,
      payment: "Gotówka",
      status: "Realizacja",
      delivery: true,
    },
    {
      id: 2357741,
      products: "Razer Blade 15",
      customer: "Jane Smith",
      phone: "555-21313",
      date: "18:36",
      totalPrice: 92.70,
      payment: "Online",
      status: "Zrealizowane",
      delivery: false,
    },
    {
      id: 2342355,
      products: "ASUS ROG Strix",
      customer: "Harold Carol",
      phone: "555-21313",
      date: "18:11",
      totalPrice: 213.75,
      payment: "Online",
      status: "Zrealizowane",
      delivery: true,
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Numer telefonu</TableCell>
            <TableCell className="tableCell">Produkty</TableCell>
            <TableCell className="tableCell">Klient</TableCell>
            <TableCell className="tableCell">Data</TableCell>
            <TableCell className="tableCell">Dostawa</TableCell>
            <TableCell className="tableCell">Suma</TableCell>
            <TableCell className="tableCell">Metoda płatności</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.phone}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  {row.products}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">
                <span className={`delivery ${row.delivery}`}>
                  {row.delivery ? "dostawa" : "odbiór"}
                </span>
              </TableCell>
              <TableCell className="tableCell">{row.totalPrice}<span>zł</span></TableCell>
              <TableCell className="tableCell">{row.payment}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
