import "./edit.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../redux/cartReducer";
import useFetch from "../../hooks/useFetch";
import Select from "react-select";
import Creatable from "react-select/creatable";
import axios from "axios";
import Duo from "../duo/Duo";
import OrderItems from "../orderItems/OrderItems";
import Item from "../item/Item";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";


const Edit = ({ order, closeEditor, closeModal }) => {
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

  const categories = [
    { id: 1, name: "pizza" },
    { id: 2, name: "burgery" },
    { id: 3, name: "zapiekanki" },
    { id: 4, name: "sałatki" },
    { id: 5, name: "dodatki" },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [info, setInfo] = useState(order);
  const [delivery, setDelivery] = useState(info.delivery);
  const [tip, setTip] = useState(info.tip);
  const [openDuo, setOpenDuo] = useState(false);
  const [category, setCategory] = useState("pizza");
  const [customer, setCustomer] = useState(false);
  const { data, loading, error } = useFetch(`/products/category/${category}`);
  const {
    data: employeeData,
    loading: employeeLoading,
    error: employeeError,
  } = useFetch(`/employees`);

  const products = useSelector((state) => state.cart.products);

  const getTimeRange = (startTime) => {
    const start = new Date(startTime);
    const end = new Date();
    start.setHours(13, 0 ,0);
    end.setHours(22, 0, 0);

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
  let timeRange = getTimeRange(new Date());

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

  // const cartTotal = () => {
  //   let cartTotal = 0;
  //   products.forEach((item) => (cartTotal += item.quantity * item.price));
  //   if (delivery !== "false") {
  //     if (info.strefa === "A") {
  //       if (info.city === "kościan") {
  //         if (
  //           info.street !== "poznańska" &&
  //           info.street !== "osiedle konstytucji 3 maja"
  //         ) {
  //           cartTotal += 2;
  //         }
  //       } else {
  //         cartTotal += 2;
  //       }
  //     }
  //     if (info.strefa === "B") {
  //       cartTotal += 7;
  //     }
  //     if (info.strefa === "C") {
  //       cartTotal += 14;
  //     }
  //   }
  //   return cartTotal.toFixed(2);
  // };

  const deliveryTotal = () =>{
    let deliveryCost = info.deliveryCost;
    // deliveryCost = 0;
    if (delivery !== "false") {
      if (info.strefa === "A") {
        if (info.city === "kościan") {
          if (
            info.street !== "poznańska" &&
            info.street !== "osiedle konstytucji 3 maja"
          ) {
            deliveryCost = 0;
          }
        } else {
          deliveryCost = 0;
        }
      }
      if (info.strefa === "B") {
        deliveryCost = 7;
      }
      if (info.strefa === "C") {
        deliveryCost = 14;
      }
    }
    return deliveryCost.toFixed(2);
  }
  
  const cartTotal = () => {
    let cartTotal = 0;
    products.forEach((item) => (cartTotal += item.quantity * item.price));
    // if (delivery !== "false") {
    //   if (info.strefa === "A") {
    //     if (info.city === "kościan") {
    //       if (
    //         info.street !== "poznańska" &&
    //         info.street !== "osiedle konstytucji 3 maja"
    //       ) {
    //         cartTotal += 2;
    //       }
    //     } else {
    //       cartTotal += 2;
    //     }
    //   }
    //   if (info.strefa === "B") {
    //     cartTotal += 7;
    //   }
    //   if (info.strefa === "C") {
    //     cartTotal += 14;
    //   }
    // }

    // if(tip>0){
    //   cartTotal = cartTotal + (cartTotal*tip);
    // }
    return cartTotal.toFixed(2);
  };

  let deliveryCost = deliveryTotal();
  let cartAmount = cartTotal();
  let tipAmount = (
    (parseFloat(cartAmount) + parseFloat(deliveryCost)) *
    tip
  ).toFixed(2);
  let totalPrice = (parseFloat(cartAmount) + parseFloat(tipAmount) + parseFloat(deliveryCost)).toFixed(2);


  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // let totalPrice = cartTotal();
      if (info.totalPriceNew) {
        totalPrice = info.totalPriceNew;
      }
      const newOrder = {
        ...info,
        products,
        delivery,
        deliveryCost,
        tip,
        tipAmount,
        totalPrice,
      };
      console.log(newOrder);
      await axios.put(`/orders/${order._id}`, newOrder);
      navigate("/");
      closeEditor(false);
        // closeModal(false);
      dispatch(resetCart());
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelivery = (e) => {
    setDelivery(e.target.value);
    timeRange = getTimeRange(e.target.value, new Date());
    setInfo((prev) => ({ ...prev, deliveryTime: timeRange[0] }));
  };

  return (
    <div className="editOrder">
      <div className="editOrderContainer">
        <div className="top">
          <div className="info">
            <h1>Edytuj zamówienie</h1>
          </div>
          <button className="closeButton" onClick={() => closeEditor(false)}>
            &times;
          </button>
        </div>
        <div className="customerContainer">
          <h1 onClick={() => setCustomer(!customer)}>WPROWADŹ DANE KLIENTA</h1>
        </div>

        {customer && (
          <div className="modalWrapper">
            <div className="customerData">
              <div className="formInput">
                <label htmlFor="phone">Numer telefonu:</label>
                <input
                  onChange={handleChange}
                  type="number"
                  id="phone"
                  defaultValue={info.phone}
                />
              </div>
              <div className="formInput">
                <label htmlFor="customerId">ID klienta:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="customerId"
                  defaultValue={info.customerId}
                />
              </div>
            </div>
            <div className="customerData">
              <div className="formInput">
                <label htmlFor="firstName">Imię:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="firstName"
                  defaultValue={info.firstName}
                />
              </div>
              <div className="formInput">
                <label htmlFor="lastName">Nazwisko:</label>
                <input
                  onChange={handleChange}
                  type="text"
                  id="lastName"
                  defaultValue={info.lastName}
                />
              </div>
            </div>
            <div className="emailInput">
              <label>Email</label>
              <input
                type="email"
                placeholder="Adres email"
                id="email"
                defaultValue={info.email}
                onChange={handleChange}
              />
            </div>
            <div className="deliveryData">
              <div className="deliveryButtons">
                <button
                  id="delivery"
                  value={true}
                  onClick={handleDelivery}
                  className={
                    delivery !== "false" && delivery !== false
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
                    delivery !== "false" && delivery !== false
                      ? "deliveryOption"
                      : "deliveryOption active"
                  }
                >
                  Odbiór osobisty
                </button>
              </div>
              <div className="deliveryDetails">
                {delivery !== "false" && delivery !== false && (
                  <>
                    <Creatable
                      options={streets}
                      onChange={handleChange}
                      defaultInputValue={info.street}
                      placeholder="Ulica"
                    />
                    <div className="homeNumber">
                      <input
                        type="text"
                        placeholder="Numer domu"
                        id="homeNumber"
                        defaultValue={info.homeNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <Select
                      options={options}
                      defaultInputValue={info.city}
                      onChange={handleChange}
                      placeholder="Miasto"
                    />
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
                  defaultValue={info.comments}
                ></textarea>
              </div>
            </div>
            <div className="tipData">
              <p className="tipTitle">Czy chcesz dodać napiwek do zamówienia?</p>
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
            <div className="customerData">
              <div className="formInput">
                <label htmlFor="totalPriceNew">Łączna cena:</label>
                <input
                  onChange={handleChange}
                  type="number"
                  id="totalPriceNew"
                  defaultValue={info.totalPrice}
                />
              </div>
              <div className="formInput">
                <label htmlFor="paymentReciver">Pracownik:</label>
                <select
                  id="paymentReciver"
                  onChange={handleChange}
                  defaultValue={info.paymentReciver}
                >
                  <option value="wybierz pracownika">Wybierz pracownika</option>
                  {employeeData.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {employee.firstName} {employee.lastName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="customerData">
              <div className="formInput">
                <label>
                  Wybierz czas {delivery !== "false" ? "dostawy" : "odbioru"}:
                </label>
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
              </div>
              <div className="formInput">
                <label>Wybierz metodę płatności:</label>
                <select
                  id="paymentMethod"
                  className="select"
                  defaultValue={info.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="cash">Gotówka</option>
                  <option value="terminal">Kartą przy odbiorze</option>
                  <option value="online">Płatność online</option>
                </select>
              </div>
            </div>
            <div className="checkoutButton">
              <button onClick={handleClick}>Wyślij</button>
            </div>
          </div>
        )}

        <div className="cartItemsContainer">
          {products.length > 0 && (
            <div className="orderedProductsInfo">
              <DeleteForeverOutlinedIcon
                className="cartDelete"
                onClick={() => dispatch(resetCart())}
              />
              <h1>Zamówione produkty:</h1>
            </div>
          )}
          <OrderItems products={products} editable={true} />
          {products.length > 0 && (
            <div className="priceDetails">
              <h1>Łączna kwota: {totalPrice}zł</h1>
              <h1>Koszt dostawy: {deliveryCost}zł</h1>
              <h1>Napiwek: {tipAmount}zł</h1>
            </div>
          )}
        </div>

        <div className="productsContainer">
          <h1>WYBIERZ PRODUKTY</h1>
        </div>
        <div className="categoriesContainer">
          <ul className="categories">
            {categories.map((category) => (
              <div
                className="categoryItem"
                key={category.id}
                onClick={() => setCategory(category.name)}
              >
                <li>
                  <LocalPizzaIcon className="icon" />
                </li>
                <p className="categoryTitle">{category.name}</p>
              </div>
            ))}
          </ul>
        </div>
        <div className="productsWrapper">
          {category === "pizza" && (
            <div className="itemCard">
              <div className="itemContainer" onClick={() => setOpenDuo(true)}>
                <img
                  className="itemImage"
                  src="http://res.cloudinary.com/dqknlkpku/image/upload/v1675902485/upload/yhli9sounakp2iymdmyx.png"
                  alt="duo"
                />
                <div className="details">
                  <p className="title">pół na pół</p>
                </div>
              </div>
            </div>
          )}
          {loading
            ? "ładowanie..."
            : data.map((product) => (
                <Item product={product} key={product._id} />
              ))}
        </div>
      </div>
      {openDuo && <Duo closeDuo={setOpenDuo} />}
    </div>
  );
};

export default Edit;
