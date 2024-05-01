"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [items, setItems] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all"); // Nilai default adalah "all"
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [totalIncome, setTotalIncome] = useState(0);
  const [showContainer, setShowContainer] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);
  const [inputValue, setInputValue] = useState({
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    const formattedValue = value.replace(/\./g, "");
    setInputValue((prevValues) => ({
      ...prevValues,
      [name]: formattedValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.amount.trim() !== "" && inputValue.category.trim() !== "") {
      const formattedAmount = inputValue.amount.replace(/\./g, "");
      const amountAsNumber = parseFloat(formattedAmount);
      if (updateIndex !== -1) {
        const updatedItems = [...items];
        const updatedItem = {
          amount: amountAsNumber,
          category: inputValue.category,
          note: inputValue.note,
          date: inputValue.date,
        };
        updatedItems[updateIndex] = updatedItem;
        setItems(updatedItems);
        setShowContainer(!showContainer);
        const updatedTotalIncome = updatedItems
          .filter((item) => item.category === "income")
          .reduce((total, item) => total + parseFloat(item.amount), 0);
        const updatedTotalExpense = updatedItems
          .filter((item) => item.category === "expense")
          .reduce((total, item) => total + parseFloat(item.amount), 0);
        setTotalIncome(updatedTotalIncome);
        setTotalExpense(updatedTotalExpense);
        setUpdateIndex(-1);
      } else {
        setItems((prevItems) => [...prevItems, inputValue]);
        setShowContainer(!showContainer);
        if (inputValue.category === "income") {
          setTotalIncome(
            (prevTotal) => prevTotal + parseFloat(inputValue.amount)
          );
        } else if (inputValue.category === "expense") {
          setTotalExpense(
            (prevTotal) => prevTotal + parseFloat(inputValue.amount)
          );
        }
      }
      setInputValue({
        amount: "",
        category: "income",
        note: "",
        date: "",
      });
    }
  };

  // const handleDelete = (index) => {
  //   const deletedItem = items[index];
  //   setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  //   if (deletedItem.category === "income") {
  //     setTotalIncome(
  //       (prevTotalIncome) => prevTotalIncome - parseFloat(deletedItem.amount)
  //     );
  //   } else if (deletedItem.category === "expense") {
  //     setTotalExpense(
  //       (prevTotalExpense) => prevTotalExpense - parseFloat(deletedItem.amount)
  //     );
  //   }
  // };

  const handleDelete = (i, category, amount) => {
    const filteredItems = items.filter(
      (item) => selectedFilter === "all" || item.category === selectedFilter
    );
    const itemToDelete = filteredItems[i];
    const updatedItems = items.filter((item) => item !== itemToDelete);
    setItems(updatedItems);
    const deletedAmount = parseFloat(amount);
    if (category === "income") {
      setTotalIncome((prevTotalIncome) => prevTotalIncome - deletedAmount);
    } else if (category === "expense") {
      setTotalExpense((prevTotalExpense) => prevTotalExpense - deletedAmount);
    }
  };

  const handleUpdate = (i, category) => {
    setShowContainer(!showContainer);
    const filteredItems = items.filter(
      (item) => selectedFilter === "all" || item.category === selectedFilter
    );
    const itemUpdated = filteredItems[i];
    const originalIndex = items.indexOf(itemUpdated);
    setInputValue({
      amount: itemUpdated.amount,
      category: itemUpdated.category,
      note: itemUpdated.note,
      date: itemUpdated.date,
    });
    setUpdateIndex(originalIndex);
  };

  const handleCancel = () => {
    setInputValue({
      amount: "",
      category: "",
      note: "",
      date: "",
    });
    setUpdateIndex(-1);
    setShowContainer(!showContainer);
  };

  const toggleContainer = () => {
    setShowContainer(!showContainer);
  };

  const rounded = {
    borderRadius: "10px",
  };

  return (
    <div className="w-[100%] flex justify-center items-start bg-stone-100">
      <div className="w-[100%] md:max-w-[500px] h-auto flex flex-col items-start ">
        <div className="w-[100%] md:max-w-[500px] flex items-start ">
          <div className="content my-10 mx-auto w-full max-w-[90%] md:max-w-[450px]">
            <h1 className="grid font-semibold tracking-wide text-black border-b pb-4 leading-4">
              <div className="text-blue-500 font-extrabold text-2xl">
                Tech Tarik
              </div>
              <div className="font-medium text-md">Money App</div>
              <div className="text-blue-500 font-extrabold text-2xl">
                Tech Tarik
              </div>
            </h1>

            <button
              className="w-full max-w-full h-auto"
              type="button"
              onClick={toggleContainer}
            >
              <section>
                <div className="w-full max-w-full h-auto">
                  <div className="container mx-auto relative max-w-[100%] ">
                    <div className="absolute top-[24px] -left-[0px] z-0 bg-[#1E1E1E] flex flex-wrap justify-center items-center w-[100%] p-6 h-[200px] rounded-[28px] drop-shadow-md">
                      <div className="w-full pb-4">
                        <div className="flex flex-col  text-start pb-3 mb-4 border-b border-stone-700">
                          <p className="text-xs font-semibold tracking-wide text-[#6F6F6F] pb-3">
                            Start Income
                          </p>
                          <h1 className="font-semibold tracking-wide text-white text-4xl">
                            <div className="flex justify-between items-center">
                              <div className="flex justify-between">
                                <span className="text-xl text-stone-500 flex items-start pr-4 ">
                                  Rp
                                </span>
                                {formatNumber(totalIncome)}
                              </div>
                              <div className="text-2xl text-stone-500">,-</div>
                            </div>
                          </h1>
                        </div>
                        <div className="flex flex-col-2 justify-between text-start">
                          <div className="text-start w-[100%]">
                            <p className="text-xs tracking-wide pb-1 text-[#6F6F6F]">
                              Your Balance
                            </p>
                            <h1 className="font-semibold tracking-wide text-lg text-white">
                              {formatNumber(totalIncome - totalExpense)}
                            </h1>
                          </div>
                          <div className="text-end w-[100%]">
                            <p className="text-xs tracking-wide pb-1 text-[#FF6262]">
                              Your Expenses
                            </p>
                            <h1 className="font-semibold tracking-wide text-[#FF6262] text-lg">
                              - {formatNumber(totalExpense)}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </button>
          </div>
        </div>
        <section className="flex justify-center w-full ">
          <div className="mt-[56%] w-[100%] h-auto overflow-y-auto max-w-[90%]">
            <div className="">
              <div>
                <div className="w-full flex justify-between items-center">
                  <h1 className="font-bold tracking-wide text-lg">
                    All Transaction
                  </h1>
                  <div className="">
                    <select
                      className="p-2  text-white rounded-lg bg-[#1E1E1E] pr-10"
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      value={selectedFilter}
                    >
                      <option value="all">All</option>
                      <option value="income">Income</option>
                      <option value="expense">Expense</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="w-full h-auto pt-4">
                <div className="h-[48vh] overflow-auto pb-10">
                  <div className="w-full ">
                    <div>
                      <ul className="">
                        {items
                          .filter(
                            (item) =>
                              selectedFilter === "all" ||
                              item.category === selectedFilter
                          )
                          .map((item, i) => {
                            return (
                              <li
                                className="flex w-full items-center h-[106px] bg-white my-6 rounded-[18px] px-3 py-3  shadow-md"
                                key={i}
                              >
                                <div
                                  style={rounded}
                                  className={
                                    item.category === "income"
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                  }
                                >
                                  <div className="px-[2px] py-10 mr-2">
                                    <span className="hidden">
                                      {item.category}
                                    </span>
                                  </div>
                                </div>
                                <div className="ml-4 w-full">
                                  <div className="flex justify-end items-start w-[100%] h-auto">
                                    <div className="text-[10px] tracking-wide text-stone-400 w-full flex justify-between">
                                      <div className="text-xs">
                                        {item.category}
                                      </div>
                                      <div>{item.date}</div>
                                    </div>
                                  </div>
                                  <h1 className="text-xl font-bold tracking-wide text-[#242424] flex justify-between items-center">
                                    <div
                                      className={
                                        item.category === "income"
                                          ? "text-green-500"
                                          : "text-red-500"
                                      }
                                    >
                                      {item.category === "income"
                                        ? `+ ${formatNumber(item.amount)}`
                                        : `- ${formatNumber(item.amount)}`}
                                    </div>

                                    <div className="flex flex-col-2 gap-2">
                                      <button
                                        className="flex justify-between items-center"
                                        onClick={() =>
                                          handleDelete(
                                            i,
                                            item.category,
                                            item.amount
                                          )
                                        }
                                      >
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5 text-[#FF6262]"
                                          >
                                            <path
                                              fill-rule="evenodd"
                                              d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                              clip-rule="evenodd"
                                            />
                                          </svg>
                                        </span>
                                      </button>
                                      <button
                                        className="flex justify-between items-center"
                                        onClick={() => {
                                          toggleContainer;
                                          handleUpdate(i, item.category);
                                        }}
                                      >
                                        <span>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            class="w-5 h-5 text-[#6299ff]"
                                          >
                                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                          </svg>
                                        </span>
                                      </button>
                                    </div>
                                  </h1>
                                  <p className="text-sm tracking-wide text-gray-500 ">
                                    {item.note}
                                  </p>
                                </div>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="flex items-center">
          <section className="fixed-button flex justify-end items-center px-0">
            <div className="w-[100%] max-w-[100%]">
              <div className="flex justify-end items-center">
                <button type="button" onClick={toggleContainer}>
                  <div className="px-[20px] rounded-[20px] py-[20px] bg-[#1E1E1E] text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </section>
          {showContainer && (
            <form
              onSubmit={handleSubmit}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[60px] h-[80vh] p-6 shadow-xl filter"
            >
              <div className="w-[100%] md:max-w-[500px]flex items-start">
                <div className="content my-2 mx-auto w-full max-w-[90%] md:max-w-[450px]">
                  <div className="flex flex-col-3 gap-14 items-center">
                    <div>
                      <button onClick={toggleContainer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="w-5 h-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    {updateIndex !== -1 ? (
                      <div>
                        <h1 className="font-semibold tracking-wide text-md">
                          Update Transaction
                        </h1>
                      </div>
                    ) : (
                      <div>
                        <h1 className="font-semibold tracking-wide text-md">
                          Add New Transaction
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <section className="flex justify-center w-full ">
                <div className="mt-[6%] w-[100%] max-w-[90%]">
                  <div className="">
                    <div className="w-full flex justify-between">
                      <h1 className="font-semibold tracking-wide text-sm">
                        Amount :
                      </h1>
                    </div>
                    <div className="mt-2 w-full justify-center items-center ">
                      <input
                        className="bg-[#1E1E1E] text-stone-400 p-4 rounded-lg w-full text-xs"
                        type="text"
                        name="amount"
                        placeholder="Enter amount..."
                        value={formatNumber(inputValue.amount)}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="w-full flex justify-between">
                      <h1 className="font-semibold tracking-wide text-sm">
                        Category :
                      </h1>
                    </div>
                    <div className="mt-2 w-full justify-center items-center">
                      <form class="space-y-2 flex flex-col border border-stone-200 p-4 rounded-xl">
                        <div className="pb-4 border-b border-stone-200">
                          <label className="flex justify-between items-center">
                            <h1 className="font-medium text-md">Income</h1>
                            <input
                              type="radio"
                              name="category"
                              value="income"
                              checked={inputValue.category === "income"}
                              onChange={handleChange}
                              className=""
                            />
                          </label>
                        </div>
                        <div>
                          <label className="flex justify-between items-center">
                            <h1 className="font-medium text-md">Expense</h1>
                            <input
                              type="radio"
                              name="category"
                              value="expense"
                              checked={inputValue.category === "expense"}
                              onChange={handleChange}
                            />
                          </label>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="w-full flex justify-between">
                      <h1 className="font-semibold tracking-wide text-sm">
                        Note :
                        <span className="ml-2 font-reguler text-xs">
                          ( Your Balance:{" "}
                          {formatNumber(totalIncome - totalExpense)} )
                        </span>
                      </h1>
                    </div>
                    <div className="mt-2 w-full justify-center items-center ">
                      <input
                        className="bg-[#1E1E1E] text-stone-400 p-4 rounded-xl w-full text-sm"
                        type="text"
                        name="note"
                        placeholder="Enter notes..."
                        value={inputValue.note}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="w-full flex justify-between">
                      <h1 className="font-semibold tracking-wide text-sm">
                        Date :
                      </h1>
                    </div>
                    <div className="mt-1 w-full justify-center items-center ">
                      <input
                        className="bg-[#1E1E1E] text-stone-400 p-4 w-full rounded-xl my-2 text-sm"
                        type="date"
                        name="date"
                        value={inputValue.date}
                        onChange={handleChange}
                        placeholder="Date..."
                      />
                    </div>
                  </div>
                  {updateIndex !== -1 ? (
                    <div className="flex flex-col-2 gap-4 mt-8">
                      <button
                        className="bg-[#ff5c5c] text-white w-full p-4 text-sm rounded-xl focus:border-none"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-[#1E1E1E] text-white w-full p-4 text-sm rounded-xl focus:border-none"
                        type="submit"
                        // onClick={toggleContainer}
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="mt-10">
                      <button
                        className={`bg-[#1E1E1E] text-white w-full p-4 rounded-xl focus:border-none ${
                          inputValue.category === "income"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }}`}
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  )}
                </div>
              </section>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
