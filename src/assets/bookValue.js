const values = {
  貸出可: "Available",
  蔵書あり: "In collection",
  館内のみ: "Viewable inside library only",
  貸出中: "Lent out",
  予約中: "Reserved",
  準備中: "Being prepared or whatever",
  休館中: "Library closed!!!",
  蔵書なし: "NOPE",
};

const bookValue = (property) => {
  if (values.hasOwnProperty(property)) {
    return values[property];
  } else return "Other";
};

export default bookValue;

//Possible values  貸出可、 蔵書あり、 館内のみ、 貸出中、 予約中、 準備中、 休館中、 蔵書なし
//EXCEPT there might be unique values, so make sure to include an extra option showing "other" and Japanese