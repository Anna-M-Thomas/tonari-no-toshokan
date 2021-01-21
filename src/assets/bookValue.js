const values = {
  貸出可: "Available",
  蔵書あり: "In collection",
  館内のみ: "Viewable inside library",
  貸出中: "Lent out",
  予約中: "Reserved",
  準備中: "Being prepared",
  休館中: "Library closed",
  蔵書なし: "Not in collection",
};

const bookValue = (property) => {
  if (values.hasOwnProperty(property)) {
    return values[property];
  } else return "Other";
};

export default bookValue;

//Possible values 貸出可、 蔵書あり、 館内のみ、 貸出中、 予約中、 準備中、 休館中、 蔵書なし
//EXCEPT there might be unique values, so I'm including an extra value if something else comes back
//Double check what 蔵書あり and 蔵書なし mean. Do they just mean "yes/no there is a collection??" It's in/not in collection?