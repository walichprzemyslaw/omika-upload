import "./checkout.scss";
import { useContext, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import Select from "react-select";
import Creatable from "react-select/creatable";
import OrderItems from "../orderItems/OrderItems";
import { resetCart } from "../../redux/cartReducer";
import useFetch from "../../hooks/useFetch";

const Checkout = ({ closeCheckout }) => {
  const options = [
    { value: "kościan", label: "Kościan", id: "city", strefa: "A" },
    { value: "kawczyn", label: "Kawczyn", id: "city", strefa: "A" },
    { value: "kiełczewo", label: "Kiełczewo", id: "city", strefa: "A" },
    { value: "kurowo", label: "Kurowo", id: "city", strefa: "A" },
    { value: "kurza góra", label: "Kurza Góra", id: "city", strefa: "A" },
    { value: "sierakowo", label: "Sierakowo", id: "city", strefa: "A" },
    { value: "pelikan", label: "Pelikan", id: "city", strefa: "A" },
    { value: "pianowo", label: "Pianowo", id: "city", strefa: "A" },
    { value: "nowy lubosz", label: "Nowy Lubosz", id: "city", strefa: "A" },
    {
      value: "nowe oborzyska",
      label: "Nowe Oborzyska",
      id: "city",
      strefa: "A",
    },
    {
      value: "stare oborzyska",
      label: "Stare Oborzyska",
      id: "city",
      strefa: "A",
    },

    { value: "bonikowo", label: "Bonikowo", id: "city", strefa: "B" },
    { value: "jasień", label: "Jasień", id: "city", strefa: "B" },
    { value: "słonin", label: "Słonin", id: "city", strefa: "B" },
    { value: "betkowo", label: "Betkowo", id: "city", strefa: "B" },
    { value: "witkówki", label: "Witkówki", id: "city", strefa: "B" },
    { value: "stary lubosz", label: "Stary Lubosz", id: "city", strefa: "B" },
    { value: "darnowo", label: "Darnowo", id: "city", strefa: "B" },
    { value: "racot", label: "Racot", id: "city", strefa: "B" },
    { value: "nacław", label: "Nacław", id: "city", strefa: "B" },
    { value: "czarkowo", label: "Czarkowo", id: "city", strefa: "B" },
    { value: "kokorzyn", label: "Kokorzyn", id: "city", strefa: "B" },
    { value: "szczodrowo", label: "Szczodrowo", id: "city", strefa: "B" },
    { value: "kobylniki", label: "Kobylniki", id: "city", strefa: "B" },

    { value: "jarogniewice", label: "Jarogniewice", id: "city", strefa: "C" },
    { value: "piotrkowice", label: "Piotrkowice", id: "city", strefa: "C" },
    { value: "piechanin", label: "Piechanin", id: "city", strefa: "C" },
    { value: "głuchowo", label: "Głuchowo", id: "city", strefa: "C" },
    { value: "czempiń", label: "Czempiń", id: "city", strefa: "C" },
    { value: "nowe borówko", label: "Nowe Borówko", id: "city", strefa: "C" },
    { value: "stare borówko", label: "Stare Borówko", id: "city", strefa: "C" },
    { value: "borowo", label: "Borowo", id: "city", strefa: "C" },
    { value: "gorzyce", label: "Gorzyce", id: "city", strefa: "C" },
    { value: "stary gołębin", label: "Stary Gołębin", id: "city", strefa: "C" },
    { value: "spytkówki", label: "Spytkówki", id: "city", strefa: "C" },
    { value: "nielęgowo", label: "Nielęgowo", id: "city", strefa: "C" },
    { value: "gryżyna", label: "Gryżyna", id: "city", strefa: "C" },
    { value: "nowy dębiec", label: "Nowy Dębiec", id: "city", strefa: "C" },
  ];

  const streets = [
    { value: "baraniaka", label: "abpa Antoniego Baraniaka", id: "street" },
    { value: "mickiewicza", label: "Adama Mickiewicza", id: "street" },
    {
      value: "aleja koszewskiego",
      label: "Aleja Stanisława Koszewskiego",
      id: "street",
    },
    {
      value: "aleja kościuszki",
      label: "Aleja Tadeusza Kościuszki",
      id: "street",
    },
    { value: "bukowieckiej", label: "Aleksandry Bukowieckiej", id: "street" },
    { value: "grątkowskiej", label: "Anny Grątkowskiej", id: "street" },
    { value: "kaźmierczaka", label: "Antoniego Kaźmierczaka", id: "street" },
    { value: "armii krajowej", label: "Armii Krajowej", id: "street" },
    { value: "bernardyńska", label: "Bernardyńska", id: "street" },
    { value: "boczna", label: "Boczna", id: "street" },
    { value: "igłowicza", label: "Bolesława Igłowicza", id: "street" },
    { value: "prusa", label: "Bolesława Prusa", id: "street" },
    { value: "brzozowa", label: "Brzozowa", id: "street" },
    { value: "bukowa", label: "Bukowa", id: "street" },
    { value: "cedrowa", label: "Cedrowa", id: "street" },
    { value: "cienista", label: "Cienista", id: "street" },
    { value: "cisowa", label: "Cisowa", id: "street" },
    { value: "czempińska", label: "Czempińska", id: "street" },
    { value: "czereśniowa", label: "Czereśniowa", id: "street" },
    { value: "długa", label: "Długa", id: "street" },
    { value: "dworcowa", label: "Dworcowa", id: "street" },
    { value: "działkowa", label: "Działkowa", id: "street" },
    { value: "fabiańczyka", label: "Edwarda Fabiańczyka", id: "street" },
    { value: "fabryczna", label: "Fabryczna", id: "street" },
    { value: "nowowiejskiego", label: "Feliksa Nowowiejskiego", id: "street" },
    { value: "stamma", label: "Feliksa Stamma", id: "street" },
    { value: "marciniaka", label: "Floriana Marciniaka", id: "street" },
    { value: "winowicza", label: "Franciszka Winowicza", id: "street" },
    { value: "narutowicza", label: "Gabriela Narutowicza", id: "street" },
    { value: "garbarska", label: "Garbarska", id: "street" },
    {
      value: "chłapowskiego",
      label: "Gen. Dezyderego Chłapowskiego",
      id: "street",
    },
    {
      value: "taczanowskiego",
      label: "Gen. Edmunda Taczanowskiego",
      id: "street",
    },
    {
      value: "pułaskiego",
      label: "Generała Kazimierza Pułaskiego",
      id: "street",
    },
    { value: "gostyńska", label: "Gostyńska", id: "street" },
    { value: "górna", label: "Górna", id: "street" },
    { value: "graniczna", label: "Graniczna", id: "street" },
    { value: "grodziska", label: "Grodziska", id: "street" },
    { value: "gryczana", label: "Gryczana", id: "street" },
    { value: "dąbrowskiego", label: "Henryka Dąbrowskiego", id: "street" },
    { value: "sienkiewicza", label: "Henryka Sienkiewicza", id: "street" },
    { value: "kołłątaja", label: "Hugo Kołłątaja", id: "street" },
    { value: "krasickiego", label: "Ignacego Krasickiego", id: "street" },
    { value: "richtera", label: "Ignacego Richtera", id: "street" },
    { value: "kasprowicza", label: "Jana Kasprowicza", id: "street" },
    { value: "kilińskiego", label: "Jana Kilińskiego", id: "street" },
    { value: "kochanowskiego", label: "Jana Kochanowskiego", id: "street" },
    { value: "czaplickiego", label: "Janusza Czaplickiego", id: "street" },
    { value: "korczaka", label: "Janusza Korczaka", id: "street" },
    { value: "iwaszkiewicza", label: "Jarosława Iwaszkiewicza", id: "street" },
    { value: "jasna", label: "Jasna", id: "street" },
    { value: "fellmanna", label: "Jerzego Fellmanna", id: "street" },
    { value: "jesionowa", label: "Jesionowa", id: "street" },
    { value: "jęczmienna", label: "Jęczmienna", id: "street" },
    { value: "jodłowa", label: "Jodłowa", id: "street" },
    { value: "chociszewskiego", label: "Józefa Chociszewskiego", id: "street" },
    {
      value: "kraszewskiego",
      label: "Józefa Ignacego Kraszewskiego",
      id: "street",
    },
    { value: "niemcewicza", label: "Juliana Ursyna Niemcewicza", id: "street" },
    { value: "słowackiego", label: "Juliusza Słowackiego", id: "street" },
    { value: "bojanowskiego", label: "Karola Bojanowskiego", id: "street" },
    { value: "kurpińskiego", label: "Karola Kurpińskiego", id: "street" },
    { value: "marcinkowskiego", label: "Karola Marcinkowskiego", id: "street" },
    { value: "kątna", label: "Kątna", id: "street" },
    { value: "kruszewskiego", label: "Klemensa Kruszewskiego", id: "street" },
    { value: "klonowa", label: "Klonowa", id: "street" },
    { value: "kosynierów", label: "Kosynierów", id: "street" },
    { value: "kościelna", label: "Kościelna", id: "street" },
    { value: "krańcowa", label: "Krańcowa", id: "street" },
    { value: "kręta", label: "Kręta", id: "street" },
    { value: "krótka", label: "Krótka", id: "street" },
    { value: "krzywa", label: "Krzywa", id: "street" },
    {
      value: "wyszyńskiego",
      label: "Ks. Prym. Stefana Wyszyńskiego",
      id: "street",
    },
    {
      value: "surzyńskiego",
      label: "Księdza Józefa Surzyńskiego",
      id: "street",
    },
    { value: "stępniaka", label: "Księdza Leona Stępniaka", id: "street" },
    {
      value: "bączkowskiego",
      label: "Księdza Piotra Bączkowskiego",
      id: "street",
    },
    { value: "kwiatowa", label: "Kwiatowa", id: "street" },
    { value: "ciszaka", label: "Leona Ciszaka", id: "street" },
    { value: "łąkowa", label: "Łąkowa", id: "street" },
    { value: "żółtowskiego", label: "Marcelego Żółtowskiego", id: "street" },
    { value: "konopnickiej", label: "Marii Konopnickiej", id: "street" },
    {
      value: "skłodowskiej-curie",
      label: "Marii Skłodowskiej-Curie",
      id: "street",
    },
    {
      value: "piłsudskiego",
      label: "Marszałka Józefa Piłsudskiego",
      id: "street",
    },
    { value: "balcera", label: "Mieczysława Balcera", id: "street" },
    { value: "kopernika", label: "Mikołaja Kopernika", id: "street" },
    { value: "reja", label: "Mikołaja Reja", id: "street" },
    { value: "młyńska", label: "Młyńska", id: "street" },
    { value: "modrzewiowa", label: "Modrzewiowa", id: "street" },
    { value: "mostowa", label: "Mostowa", id: "street" },
    { value: "nacławska", label: "Nacławska", id: "street" },
    { value: "nadobrzańska", label: "Nadobrzańska", id: "street" },
    { value: "ogrodowa", label: "Ogrodowa", id: "street" },
    { value: "okrężna", label: "Okrężna", id: "street" },
    { value: "orląt polskich", label: "Orląt Polskich", id: "street" },
    {
      value: "osiedle bitwy warszawskiej",
      label: "Osiedle Bitwy Warszawskiej 1920",
      id: "street",
    },
    {
      value: "osiedle sikorskiego",
      label: "Osiedle Gen. Wł. Sikorskiego",
      id: "street",
    },
    {
      value: "osiedle nad łąkami",
      label: "Osiedle Nad Łąkami",
      id: "street",
    },
    {
      value: "osiedle literatów",
      label: "Osiedle Literatów",
      id: "street",
    },
    {
      value: "osiedle andersa",
      label: "Osiedle Generała Władysława Andersa",
      id: "street",
    },
    {
      value: "osiedle konstytucji 3 maja",
      label: "Osiedle Konstytucji 3 Maja",
      id: "street",
    },
    {
      value: "osiedle ogrody",
      label: "Osiedle Ogrody",
      id: "street",
    },
    {
      value: "osiedle piastowskie",
      label: "Osiedle Piastowskie",
      id: "street",
    },
    {
      value: "osiedle jagiellońskie",
      label: "Osiedle Jagiellońskie",
      id: "street",
    },
    { value: "piaskowa", label: "Piaskowa", id: "street" },
    { value: "piastowska", label: "Piastowska", id: "street" },
    {
      value: "plac paderewskiego",
      label: "Plac Ignacego Paderewskiego",
      id: "street",
    },
    { value: "plac wolności", label: "Plac Wolności", id: "street" },
    { value: "pileckiego", label: "płk. Witolda Pileckiego", id: "street" },
    { value: "podgórna", label: "Podgórna", id: "street" },
    { value: "pogodna", label: "Pogodna", id: "street" },
    { value: "polna", label: "Polna", id: "street" },
    { value: "południowa", label: "Południowa", id: "street" },
    { value: "poprzeczna", label: "Poprzeczna", id: "street" },
    {
      value: "powstańców wielkopolskich",
      label: "Powstańców Wielkopolskich",
      id: "street",
    },
    { value: "poznańska", label: "Poznańska", id: "street" },
    { value: "północna", label: "Północna", id: "street" },
    { value: "półwiejska", label: "Półwiejska", id: "street" },
    { value: "promienista", label: "Promienista", id: "street" },
    { value: "prosta", label: "Prosta", id: "street" },
    { value: "przemysłowa", label: "Przemysłowa", id: "street" },
    { value: "pszenna", label: "Pszenna", id: "street" },
    { value: "rezerwy skautowej", label: "Rezerwy Skautowej", id: "street" },
    { value: "rolna", label: "Rolna", id: "street" },
    { value: "traugutta", label: "Romualda Traugutta", id: "street" },
    { value: "różana", label: "Różana", id: "street" },
    { value: "rynek", label: "Rynek", id: "street" },
    { value: "berwińskiego", label: "Ryszarda Berwińskiego", id: "street" },
    { value: "składowa", label: "Składowa", id: "street" },
    { value: "słoneczna", label: "Słoneczna", id: "street" },
    { value: "moniuszki", label: "Stanisława Moniuszki", id: "street" },
    { value: "sosnowa", label: "Sosnowa", id: "street" },
    {
      value: "szczepanowskiego",
      label: "Stanisława Szczepanowskiego",
      id: "street",
    },
    {
      value: "wojciechowskiego",
      label: "Stanisława Wojciechowskiego",
      id: "street",
    },
    { value: "wyspiańskiego", label: "Stanisława Wyspiańskiego", id: "street" },
    { value: "żeromskiego", label: "Stefana Żeromskiego", id: "street" },
    { value: "strzelecka", label: "Strzelecka", id: "street" },
    { value: "szewska", label: "Szewska", id: "street" },
    { value: "szkolna", label: "Szkolna", id: "street" },
    { value: "szpitalna", label: "Szpitalna", id: "street" },
    { value: "śmigielska", label: "Śmigielska", id: "street" },
    { value: "świerkowa", label: "Świerkowa", id: "street" },
    { value: "świętego ducha", label: "Świętego Ducha", id: "street" },
    { value: "świętego jana", label: "Świętego Jana", id: "street" },
    { value: "zawadzkiego", label: "Tadeusza Zawadzkiego", id: "street" },
    { value: "topolowa", label: "Topolowa", id: "street" },
    { value: "torowa", label: "Torowa", id: "street" },
    { value: "towarowa", label: "Towarowa", id: "street" },
    { value: "uczniowska", label: "Uczniowska", id: "street" },
    { value: "czajki", label: "Wawrzyńca Czajki", id: "street" },
    { value: "wiatraczna", label: "Wiatraczna", id: "street" },
    { value: "wichrowa", label: "Wichrowa", id: "street" },
    { value: "wielichowska", label: "Wielichowska", id: "street" },
    { value: "wierzbowa", label: "Wierzbowa", id: "street" },
    { value: "wiśniowa", label: "Wiśniowa", id: "street" },
    { value: "radomskieg", label: "Władysława Radomskiego", id: "street" },
    { value: "broniewskiego", label: "Władysława Broniewskiego", id: "street" },
    {
      value: "reymonta",
      label: "Władysława Stanisława Reymonta",
      id: "street",
    },
    { value: "maya", label: "Wojciecha Maya", id: "street" },
    { value: "wodna", label: "Wodna", id: "street" },
    { value: "wojska polskiego", label: "Wojska Polskiego", id: "street" },
    { value: "wrocławska", label: "Wrocławska", id: "street" },
    { value: "wschodnia", label: "Wschodnia", id: "street" },
    { value: "wyzwolenia", label: "Wyzwolenia", id: "street" },
    { value: "zachodnia", label: "Zachodnia", id: "street" },
    { value: "zielona", label: "Zielona", id: "street" },
    { value: "sierakowskiego", label: "Zygmunta Sierakowskiego", id: "street" },
    { value: "żarnowa", label: "Żarnowa", id: "street" },
    { value: "żwirki i wigury", label: "Żwirki i Wigury", id: "street" },
  ];

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosInstance = axios.create({baseURL: process.env.REACT_APP_API_URL, withCredentials: true})
 //ok

  const {
    data: bankData,
    loading,
    error,
  } = useFetch(`/orders/onlinepayment`); 

  const [bankId, setBankId] = useState();
  const [delivery, setDelivery] = useState(true);
  const [err, setErr] = useState();
  const [tip, setTip] = useState(0);
  const [info, setInfo] = useState({
    customerId: user?._id || undefined,
    firstName: user?.firstName || undefined,
    lastName: user?.lastName || undefined,
    email: user?.email || undefined,
    // street: user?.street || undefined,
    homeNumber: user?.homeNumber || undefined,
    // city: user?.city || undefined,
    phone: user?.phone || undefined,
    deliveryTime: "jak najszybciej",
    paymentMethod: "cash",
    status: "pending",
  });
  const products = useSelector((state) => state.cart.products);

  const getTimeRange = (delivery, startTime) => {
    const start = new Date(startTime);
    const end = new Date();
    if (start.getHours() < 13) {
      start.setHours(13);
      start.setMinutes(0);
    }
    // console.log(start);
    // zmienic na 21 !!!!!
    end.setHours(24, 0, 0);

    if (delivery === "false") {
      start.setMinutes(start.getMinutes() + 20);
    } else {
      start.setMinutes(start.getMinutes() + 50);
    }

    let timeRange = [];
    while (start <= end) {
      let x = start.getMinutes();
      let y = 0;
      while (x > y && x < 60) {
        start.setMinutes(y + 10);
        y = y + 10;
      }
      // start.setMinutes(start.getMinutes() + 5);

      timeRange.push(
        new Date(start).toLocaleTimeString("pl-PL", {
          hour: "2-digit",
          minute: "2-digit",
        }) +
          " - " +
          new Date(
            start.setMinutes(start.getMinutes() + 10)
          ).toLocaleTimeString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
    }
    return timeRange;
  };
  let timeRange = getTimeRange(delivery, new Date());

  const deliveryTotal = () => {
    let deliveryCost = 0;
    if (delivery !== "false") {
      if (info.strefa === "A") {
        if (info.city === "kościan") {
          if (
            info.street !== "poznańska" &&
            info.street !== "osiedle konstytucji 3 maja"
          ) {
            deliveryCost += 2;
          }
        } else {
          deliveryCost += 2;
        }
      }
      if (info.strefa === "B") {
        deliveryCost += 7;
      }
      if (info.strefa === "C") {
        deliveryCost += 14;
      }
    }
    return deliveryCost.toFixed(2);
  };

  const cartTotal = () => {
    let cartTotal = 0;
    products.forEach((item) => (cartTotal += item.quantity * item.price));
    return cartTotal.toFixed(2);
  };

  let deliveryCost = deliveryTotal();
  let cartAmount = cartTotal();
  let tipAmount = (
    (parseFloat(cartAmount) + parseFloat(deliveryCost)) *
    tip
  ).toFixed(2);
  let totalPrice = (
    parseFloat(cartAmount) +
    parseFloat(tipAmount) +
    parseFloat(deliveryCost)
  ).toFixed(2);

  const handleChange = (e) => {
    if (e.target) {
      setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    } else {
      if (e.id) {
        setInfo((prev) => ({ ...prev, [e.id]: e.value }));
        if (e.strefa) {
          setInfo((prev) => ({
            ...prev,
            [e.id]: e.value,
            ["strefa"]: e.strefa,
          }));
        }
      } else {
        setInfo((prev) => ({ ...prev, ["street"]: e.value }));
      }
    }
  };

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
    // timeRange = getTimeRange(e.target.value, new Date());
    timeRange = getTimeRange(new Date());
    setInfo((prev) => ({ ...prev, deliveryTime: timeRange[0] }));
  };

  const validate = () => {
    let errors = {};
    if (!info.firstName) {
      errors.firstName = "Wpisz swoje imię!";
    }
    if (!info.lastName) {
      errors.lastName = "Wpisz swoje nazwisko!";
    }
    if (!info.phone) {
      errors.phone = "Wpisz swój numer telefonu!";
    }
    if (!info.email) {
      errors.email = "Wpisz swój adres email!";
    }

    if (delivery !== "false") {
      if (!info.street) {
        errors.street = "Wpisz swoją ulicę!";
      }
      if (!info.homeNumber) {
        errors.homeNumber = "Wpisz swój numer domu!";
      }
      if (!info.city) {
        errors.city = "Wpisz swoje miasto!";
      }
    }

    if (!info.deliveryTime) {
      errors.deliveryTime = "Wybierz czas realizacji zamówienia!";
    }
    setErr(errors);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    validate();
    if (Object.keys(err).length === 0 || err === {}) {
      try {
        // const totalPrice = cartTotal();
        const newOrder = {
          ...info,
          deliveryCost,
          tip,
          tipAmount,
          totalPrice,
          products,
          delivery,
          bankId,
        };
        const response = await axiosInstance.post("/orders", newOrder);
        
        if (response.data.paymentMethod === "online") {
          navigate(response.data.url);
        } else {
          navigate(`/order/${response.data._id}`);
        }
        dispatch(resetCart());
        if (info.email) {
          let tableHtml = "";
          products.map(
            (product) =>
              (tableHtml += `
            <tr>
              <td>${product.name}</td>
              <td>${product.quantity}</td>
              <td>${product.price}</td>
            </tr>`)
          );
          const emailBody = `
  <html>
    <head>
      <style>
        table {
          border-collapse: collapse;
          width: 100%;
        }
        th, td {
          text-align: left;
          padding: 8px;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
        }
      </style>
    </head>
    <body>
      <h2>Nowe zamówienie</h2>
      <p>Cześć ${info.firstName},</p>
      <p>Twoje zamówienie nr ${response.data._id} zostało złożone.</p>
      <table>
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Ilość</th>
            <th>Cena</th>
          </tr>
        </thead>
        <tbody>
          ${tableHtml}
        </tbody>
      </table>
      <p>Kwota zamówienia: ${totalPrice}zł</p>
      <p>Przewidywany czas dostawy: ${info.deliveryTime}</p>
      <p>Więcej szczegółów na temat swojego zamówienia znajdziesz pod tym adresem: www.omika.pl/order/${response.data._id}</p>
    </body>
  </html>
`;
          const emailConfig = {
            SecureToken: "55495557-279c-497f-a48d-625642525521",
            To: info.email,
            From: "Pizzeria Omika <omikapizza@gmail.com>",
            Subject: `Nowe zamówienie nr ${response.data._id}`,
            Body: emailBody,
            IsHTML: true,
          };
          window.Email.send(emailConfig).then((message) =>
            console.log(message)
          );
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(err);
    }
  };

  return (
    <div className="checkout">
      <div className="checkoutContainer">
        <div className="checkoutTop">
          <div className="checkoutHeader">
            <div className="checkoutHeaderLeft">
              <h1>Podsumowanie</h1>
            </div>
            <div className="checkoutHeaderRight">
              <button
                className="closeButton"
                onClick={() => closeCheckout(false)}
              >
                &times;
              </button>
            </div>
          </div>
        </div>
        <div className="checkoutBottom">
          <div className="bottomLeft">
            <div className="contactData">
              <div className="formInput">
                <label>Imię</label>
                <input
                  type="text"
                  placeholder="Imię"
                  id="firstName"
                  defaultValue={user?.firstName}
                  onChange={handleChange}
                />
                {err?.firstName && !info.firstName && (
                  <span className="errorMessage">{err.firstName}</span>
                )}
              </div>
              <div className="formInput">
                <label>Nazwisko</label>
                <input
                  type="text"
                  placeholder="Nazwisko"
                  id="lastName"
                  defaultValue={user?.lastName}
                  onChange={handleChange}
                />
                {err?.lastName && !info.lastName && (
                  <span className="errorMessage">{err.lastName}</span>
                )}
              </div>
            </div>
            <div className="contactData">
              <div className="formInput">
                <label>Numer telefonu</label>
                <input
                  type="number"
                  placeholder="Numer telefonu"
                  id="phone"
                  defaultValue={user?.phone}
                  onChange={handleChange}
                />
                {err?.phone && !info.phone && (
                  <span className="errorMessage">{err.phone}</span>
                )}
              </div>

              <div className="formInput">
                <label>NIP (opcjonalnie)</label>
                <input
                  type="number"
                  placeholder="NIP"
                  id="nip"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="emailInput">
              <label>Email</label>
              <input
                type="email"
                placeholder="Adres email"
                id="email"
                defaultValue={user?.email}
                onChange={handleChange}
              />
              {err?.email && !info.email && (
                <span className="errorMessage">{err.email}</span>
              )}
            </div>
            <div className="deliveryData">
              <div className="deliveryButtons">
                <button
                  id="delivery"
                  value={true}
                  onClick={handleDelivery}
                  className={
                    delivery !== "false"
                      ? "deliveryOption active"
                      : "deliveryOption"
                  }
                >
                  Dostawa
                </button>
                <button
                  id="delivery"
                  value={false}
                  onClick={handleDelivery}
                  className={
                    delivery !== "false"
                      ? "deliveryOption"
                      : "deliveryOption active"
                  }
                >
                  Odbiór osobisty
                </button>
              </div>
              <div className="deliveryDetails">
                {delivery !== "false" && (
                  <>
                    <Creatable
                      options={streets}
                      onChange={handleChange}
                      placeholder="Ulica"
                    />
                    {err?.street && !info.street && (
                      <span className="errorMessage">{err.street}</span>
                    )}
                    <div className="homeNumber">
                      <input
                        type="text"
                        placeholder="Numer domu"
                        id="homeNumber"
                        defaultValue={user?.homeNumber}
                        onChange={handleChange}
                      />
                      {err?.homeNumber && !info.homeNumber && (
                        <span className="errorMessage">{err.homeNumber}</span>
                      )}
                    </div>
                    <Select
                      options={options}
                      onChange={handleChange}
                      placeholder="Miasto"
                    />
                    {err?.city && !info.city && (
                      <span className="errorMessage">{err.city}</span>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="commentsData">
              <div className="comments">
                <label>Uwagi do zamówienia</label>
                <textarea
                  placeholder="Uwagi do zamówienia"
                  onChange={handleChange}
                  id="comments"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="bottomRight">
            <h1>Twoje zamówienie:</h1>
            <OrderItems products={products} editable={false} />
            <p className="totalPrice">Koszt dostawy: {deliveryCost}</p>
            <p className="totalPrice">Napiwek: {tipAmount}zł</p>
            <p className="totalPrice">Łączny koszt: {totalPrice}zł</p>
            <div className="tipData">
              <p className="title">Czy chcesz dodać napiwek do zamówienia?</p>
              <div className="tipButtons">
                <button
                  className={tip === 0 ? "tipOption active" : "tipOption"}
                  onClick={() => setTip(0)}
                >
                  Bez napiwku
                </button>
                <button
                  className={tip === 0.05 ? "tipOption active" : "tipOption"}
                  onClick={() => setTip(0.05)}
                >
                  Dodaj 5%
                </button>
                <button
                  className={tip === 0.1 ? "tipOption active" : "tipOption"}
                  onClick={() => setTip(0.1)}
                >
                  Dodaj 10%
                </button>
              </div>
            </div>
            <div className="paymentData">
              <p className="title">Wybierz metodę płatności:</p>
              <div className="paymentButtons">
                <button
                  id="paymentMethod"
                  value={"cash"}
                  onClick={handleChange}
                  className={
                    info.paymentMethod === "cash"
                      ? "paymentOption active"
                      : "paymentOption"
                  }
                >
                  Gotówka
                </button>
                <button
                  id="paymentMethod"
                  value={"terminal"}
                  onClick={handleChange}
                  className={
                    info.paymentMethod === "terminal"
                      ? "paymentOption active"
                      : "paymentOption"
                  }
                >
                  Kartą przy odbiorze
                </button>
                <button
                  id="paymentMethod"
                  value={"online"}
                  onClick={handleChange}
                  className={
                    info.paymentMethod === "online"
                      ? "paymentOption active"
                      : "paymentOption"
                  }
                >
                  Online
                </button>
              </div>
              {info.paymentMethod === "online" && (
                <div className="bankCards">
                  {Object.values(bankData).map((bank) => (
                    <div
                      className={
                        bankId === bank.id ? "bankCard active" : "bankCard"
                      }
                      key={bank.id}
                      onClick={() => setBankId(bank.id)}
                    >
                      <div className="logo">
                        <img src={bank.img} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="deliveryData">
              <p className="title">
                Wybierz czas {delivery !== "false" ? "dostawy" : "odbioru"}:
              </p>
              <select
                id="deliveryTime"
                className="select"
                onChange={handleChange}
                value={info.deliveryTime}
              >
                {delivery !== "false" && (
                  <option value="jak najszybciej">Jak najszybciej</option>
                )}
                {timeRange.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
              {err?.deliveryTime && !info.deliveryTime && (
                <span className="errorMessage">{err.deliveryTime}</span>
              )}
            </div>
            <div className="checkoutButton">
              {new Date().getHours() < 24 && new Date().getHours() > -1 ? (
                <button onClick={handleClick}>ZAMAWIAM</button>
              ) : (
                <span>
                  Zamówienia można składać tylko w godzinach działania lokalu.{" "}
                  {new Date().getHours()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
